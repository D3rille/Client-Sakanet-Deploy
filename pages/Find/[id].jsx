import React, { useEffect, useState, useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import styles from '../../styles/Profile.module.css';
import coverPhoto from '../../public/images/coverphoto.jpg';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { TextField,Card, Button,Link,  Box, Stack} from '@mui/material';
import locationIcon from '../../public/icons/location.svg';
import contactIcon from '../../public/icons/contact.svg';
import emailIcon from '../../public/icons/email.svg';
import uploadIcon from '../../public/icons/upload.svg';
import StarRatingChart from '../../components/StarRatingChart'
import IconButton from '@mui/material/IconButton';
import samplePost from '../../public/images/samplepost.jpg'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import SmsIcon from '@mui/icons-material/Sms';
import CheckIcon from '@mui/icons-material/Check';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Head from 'next/head';
import Image from "next/image";
import { GO_TO_PROFILE } from '../../graphql/queries/searchQueries';
import { useQuery, useMutation } from '@apollo/client';
import {formatWideAddress} from '../../util/addresssUtils.js';
import { useRouter } from "next/router";
import Rating from '@mui/material/Rating';
import toast from 'react-hot-toast';
import { REQUEST_CONNECTION } from '../../graphql/mutations/MyNetworkMutations';
// import { GET_SUGGESTED_USERS } from '../../graphql/queries/myNetworkQueries';

const ButtonsDisplay = ({userId, connStatus, requestConnection}) =>{
    var DynamicBtn = () =>{
        if(!connStatus || connStatus == "disconnected"){
            return(<Button variant="contained" disableElevation color="success" onClick={()=>{
                requestConnection({variables:{"connectTo":userId}})
            }}>Connect</Button>)
        } else if(connStatus == "pending"){
            return(<Button variant="contained" disableElevation color="success" disabled>Pending...</Button>)
        } else{
            return(<Button variant="contained" disableElevation color="success" endIcon={<CheckIcon/>}>Connected</Button>)
        }
    }
    
    return(
    <>
    <Stack direction="row" spacing={2}>
        {/* <Button variant="contained" disableElevation color="success" disabled>Connect</Button> */}
        <DynamicBtn/>
        <Button variant="outlined" color="success" startIcon={<SmsIcon/>}>
        Message
        </Button>
        <Button variant="outlined" color="success">
            <MoreHorizIcon/>
        </Button>
    </Stack>
    </>)

}

export default function FindUser(){
    const router = useRouter();
    const id = router.query.id;
    
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const [UserPostDescrip, setUserPostDescrip ] = useState("");

    // Request Connection
    const [requestConnection, {data:requestConnectionData}] = useMutation(REQUEST_CONNECTION,{
    refetchQueries:[GO_TO_PROFILE],
    onError:(err)=>{
        toast.error(err.graphQLErrors[0].message);
    },
    onCompleted:(requestConnectionData)=>{
        toast.success(requestConnectionData.requestConnection.message);
    }
    });

    const handleButtonClick=(e)=>{
        e.preventDefault();
    }

    const [isFocused, setIsFocused] = useState(false);


    useEffect(() => {
        const handleResize = () => {
          setScreenWidth(window.innerWidth);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    const { loading, error, data } = useQuery(GO_TO_PROFILE,{
        variables:{
            userId:id
        }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const { _id, profile_pic, 
        username, address, 
        is_verified, role, 
        rating, 
        ratingStatistics, 
        account_mobile, 
        account_email, 
        cover_photo
    } = data.goToProfile.profile;

    const ratingsData = {
        1: ratingStatistics.oneStar ?? 0,
        2: ratingStatistics.twoStar ?? 0,
        3: ratingStatistics.threeStar ?? 0,
        4: ratingStatistics.fourStar ?? 0,
        5: ratingStatistics.fiveStar ?? 0,
    };

    const connStatus = data.goToProfile.connectionStatus;

    const activeProfilePic = profile_pic || "https://img.freepik.com/free-icon/user_318-159711.jpg"
    const reviewerNumber = `Rating Overview (${ratingStatistics.reviewerCount ?? 0})`;
    return (
        <>
        <div key='profile' className={styles.mainProfile}>
            <div className={styles.profileContainer}>
                <div className={styles.topPortion}>
                    <div className={styles.userCoverImg}>
                        <img className={styles.coverphoto} src={cover_photo} alt="Cover Photo" />
                    </div>
                    <div className={styles.profileImg}>
                        <Avatar src={profile_pic ?? ""} alt="Profile"  className={styles.profilephoto}/>
                    </div>
                    <div className={styles.username}>
                        {username}
                    </div>
                    <div className={styles.userJob}>
                        {role}
                    </div>
                </div>

                <div style={{display:"flex", justifyContent:"flex-end", width:"90%", paddingTop:"1em"}}>
                    <ButtonsDisplay userId={_id} connStatus={connStatus} requestConnection={requestConnection}/>
                </div>

                <Divider textAlign="right" component="div" role="presentation" className={styles.numConnections}>
                    <Typography 
                    variant="h4" 
                    component="span" 
                    style={{ fontWeight: 'bolder', color: '#057a59' }}>
                        {data.goToProfile.connections}
                    </Typography>
                    <Typography 
                    variant="h6" 
                    component="span" 
                    style={{ fontWeight: 'normal', color: 'black', marginInline:"4px"}}>
                         Connections
                    </Typography>
                </Divider>
                <div className={styles.bottomPortion}>
                    <div className={styles.rightSide}>
                        <div key='element3' className={styles.content1}>
                        <Card className={styles.aboutCard} sx={{width:'100%',
                        height:'max-Content',
                        borderRadius:'10px',
                        padding:'15px 0px 10px 20px',
                        backgroundColor:"#FCFCFF",
                        boxShadow: '0 3px 3px 3px rgba(0, 0, 0, 0.1)'
                        }}>
                            <div className={styles.contentheader}>
                                <Typography sx={{fontSize:'20px',
                                fontWeight: 'bolder'}}>
                                    About Me
                                </Typography>
                            </div>
                            <div className={styles.locationtitle}>
                                <Image sx={{width:'10px',height:'15px',}} src ={locationIcon} alt = "Location" width={20} height={25}/>
                                <p className={styles.infoContent}>{formatWideAddress(address)}</p>
                            </div>
                            {account_mobile && <>
                                <div className={styles.contacttitle}>
                                    <Image sx={{width:'10px',height:'15px',}} src ={contactIcon} alt = "Contact Number" width={20} height={25}/>
                                    <p className={styles.infoContent}>{account_mobile}</p>
                                </div>
                            </>}
                            {account_email && <>
                                <div className={styles.emailtitle}>
                                    <Image sx={{width:'10px',height:'15px',}} src ={emailIcon} alt = "Email Address" width={20} height={25}/>
                                    <p className={styles.infoContent}>{account_email}</p>
                                </div>
                            </>}
                        </Card>
                        <Card className={styles.ratingsChart} sx={{width:'100%',
                        height:'max-Content',
                        borderRadius:'10px',
                        padding:'15px 0px 10px 20px',
                        backgroundColor:"#FCFCFF",
                        boxShadow: '0 3px 3px 3px rgba(0, 0, 0, 0.1)'
                        }}>
                            {/* <div className={styles.contentheader}>
                                
                            </div> */}
                            <div style={{display:"flex", flexDirection:"row", alignItems:'center'}}>
                                <div style={{width:"40%", textAlign:"center"}}>
                                    <Typography sx={{fontSize:'20px',
                                        fontWeight: 'bolder'}}>
                                             {reviewerNumber}
                                    </Typography>
                                    <Typography sx ={{fontSize:"5rem", fontWeight:"bold"}}>
                                        {rating}
                                    </Typography>
                                    <Rating name="read-only" value={rating} readOnly />
                                </div>
                                <div style={{width:"60%"}}>
                                <StarRatingChart ratings={ratingsData} />
                                </div>
                            </div>
                        </Card>

                        <Card className={styles.aboutCard} sx={{width:'100%',
                        height:'max-Content',
                        borderRadius:'10px',
                        padding:'15px 0px 10px 20px',
                        backgroundColor:"#FCFCFF",
                        boxShadow: '0 3px 3px 3px rgba(0, 0, 0, 0.1)'
                        }}>
                            <div className={styles.contentheader}>
                                <Typography sx={{fontSize:'20px',
                                fontWeight: 'bolder'}}>
                                    Ratings and Reviews
                                </Typography>
                            </div>
                        </Card>

                    </div>
                    </div>
                    <div className={styles.leftSide}>
                        <div className={styles.feedContainer}>
                            <div className={styles.topContainer}>
                                <div className={styles.feedInputContainer}>
                                    <div className={styles.avatarContainer}>
                                        <Avatar src={profile_pic ?? ""}>
                                        </Avatar>
                                    </div>
                                    <div className={styles.inputContainer}>
                                        <input className={styles.postDesc} placeholder='Write Something...'
                                        value={UserPostDescrip}
                                        onChange={(e)=>{setUserPostDescrip(e.target.value)}}
                                        style={{
                                            outline: isFocused ? 'none' : '',
                                            border: isFocused ? 'none' : ''
                                          }}
                                          onFocus={() => setIsFocused(true)}
                                          onBlur={() => setIsFocused(false)}
                                        />
                                        <IconButton>
                                            <Image src={uploadIcon} alt="Upload Icon" width={30} height={30} />
                                        </IconButton>
                                    </div>
                                    <div className={styles.postbtnContainer}>
                                        <Button onClick={handleButtonClick}>Post</Button>
                                    </div>
                                </div>
                            </div>
                        
                        </div>
                        <div className={styles.bottomContainer}>
                                <div className={styles.mainPostContainer}>
                                    <div className={styles.headPosition}>
                                        <div className={styles.userInfoPortion}>
                                            <div className={styles.userAvatar}>
                                                <Avatar src={profile_pic}></Avatar>
                                            </div>
                                            <div className={styles.userInfoDetails}>
                                                <div className={styles.userName}>Juan Dela Cruz</div>
                                                <div className={styles.creationDate}>1 day ago</div>
                                            </div>
                                        </div>
                                        <div className={styles.descriptionPortion}>
                                            Available products
                                        </div>
                                        <div className={styles.bodyportion}>
                                        <Image className={styles.postImage} sx={{}} src ={samplePost} alt = "post" />
                                        </div>
                                        
                                    </div>
                                    <hr className={styles.postDivider} />
                                    <div className={styles.footerPortion}>
                                        <div className={styles.likepost}>
                                            <IconButton sx={{ color: '#057a59'}}size="small"><ThumbUpIcon/>
                                            </IconButton>
                                        </div>
                                        <Link href="">
                                           Comments
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.bottomContainer}>
                                <div className={styles.mainPostContainer}>
                                    <div className={styles.headPosition}>
                                        <div className={styles.userInfoPortion}>
                                            <div className={styles.userAvatar}>
                                                <Avatar src={profile_pic}></Avatar>
                                            </div>
                                            <div className={styles.userInfoDetails}>
                                                <div className={styles.userName}>Juan Dela Cruz</div>
                                                <div className={styles.creationDate}>1 day ago</div>
                                            </div>
                                        </div>
                                        <div className={styles.descriptionPortion}>
                                            Available products
                                        </div>
                                        <div className={styles.bodyportion}>
                                        <Image className={styles.postImage} sx={{}} src ={samplePost} alt = "post" />
                                        </div>
                                        
                                    </div>
                                    <hr className={styles.postDivider} />
                                    <div className={styles.footerPortion}>
                                        <div className={styles.likepost}>
                                            <IconButton sx={{ color: '#057a59'}}size="small"><ThumbUpIcon/>
                                            </IconButton>
                                        </div>
                                        <Link href="">
                                           Comments
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.bottomContainer}>
                                <div className={styles.mainPostContainer}>
                                    <div className={styles.headPosition}>
                                        <div className={styles.userInfoPortion}>
                                            <div className={styles.userAvatar}>
                                                <Avatar src={profile_pic}></Avatar>
                                            </div>
                                            <div className={styles.userInfoDetails}>
                                                <div className={styles.userName}>Juan Dela Cruz</div>
                                                <div className={styles.creationDate}>1 day ago</div>
                                            </div>
                                        </div>
                                        <div className={styles.descriptionPortion}>
                                            Available products
                                        </div>
                                        <div className={styles.bodyportion}>
                                        <Image className={styles.postImage} sx={{}} src ={samplePost} alt = "post" />
                                        </div>
                                        
                                    </div>
                                    <hr className={styles.postDivider} />
                                    <div className={styles.footerPortion}>
                                        <div className={styles.likepost}>
                                            <IconButton sx={{ color: '#057a59'}}size="small"><ThumbUpIcon/>
                                            </IconButton>
                                        </div>
                                        <Link href="">
                                           Comments
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.bottomContainer}>
                                <div className={styles.mainPostContainer}>
                                    <div className={styles.headPosition}>
                                        <div className={styles.userInfoPortion}>
                                            <div className={styles.userAvatar}>
                                                <Avatar src={profile_pic}></Avatar>
                                            </div>
                                            <div className={styles.userInfoDetails}>
                                                <div className={styles.userName}>Juan Dela Cruz</div>
                                                <div className={styles.creationDate}>1 day ago</div>
                                            </div>
                                        </div>
                                        <div className={styles.descriptionPortion}>
                                            Available products
                                        </div>
                                        <div className={styles.bodyportion}>
                                        <Image className={styles.postImage} sx={{}} src ={samplePost} alt = "post" />
                                        </div>
                                        
                                    </div>
                                    <hr className={styles.postDivider} />
                                    <div className={styles.footerPortion}>
                                        <div className={styles.likepost}>
                                            <IconButton sx={{ color: '#057a59'}}size="small"><ThumbUpIcon/>
                                            </IconButton>
                                        </div>
                                        <Link href="">
                                           Comments
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            
                    </div>

                </div>

            </div>
        </div>
        </>
    )

}