import React, { useEffect, useState, useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import styles from '../../styles/Profile.module.css';
import coverPhoto from '../../public/images/coverphoto.jpg';
import profilePhoto from '../../public/images/pfp.jpg';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { TextField,Card, Button,Link } from '@mui/material';
import locationIcon from '../../public/icons/location.svg';
import contactIcon from '../../public/icons/contact.svg';
import emailIcon from '../../public/icons/email.svg';
import uploadIcon from '../../public/icons/upload.svg';
import StarRatingChart from '../../components/StarRatingChart'
import IconButton from '@mui/material/IconButton';
import samplePost from '../../public/images/samplepost.jpg'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import Head from 'next/head';
import Image from "next/image";
import { GET_MY_PROFILE } from '../../graphql/queries/userProfileQueries';
import { useQuery } from '@apollo/client';
import {formatWideAddress} from '../../util/addresssUtils.js';
export default function MyProfile(){
    
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const [UserPostDescrip, setUserPostDescrip ] = useState("");

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

    const { loading, error, data } = useQuery(GET_MY_PROFILE);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const { profile_pic, username, address, is_verified, role, rating, ratingStatistics, account_mobile, account_email } = data.getMyProfile;

    const ratingsData = {
        5: ratingStatistics.oneStar ?? 0,
        4: ratingStatistics.twoStar ?? 0,
        3: ratingStatistics.threeStar ?? 0,
        2: ratingStatistics.fourStar ?? 0,
        1: ratingStatistics.fiveStar ?? 0,
    };


    const activeProfilePic = profile_pic || "https://img.freepik.com/free-icon/user_318-159711.jpg"

    return (
        <>
        <div key='profile' className={styles.mainProfile}>
            <div className={styles.profileContainer}>
                <div className={styles.topPortion}>
                    <div className={styles.userCoverImg}>
                        <Image className={styles.coverphoto} src={coverPhoto} alt="Cover Photo" />
                    </div>
                    <div className={styles.profileImg}>
                        <Avatar src={profile_pic} className={styles.profilephoto}/>
                        {/* <img className={styles.profilephoto} src={activeProfilePic} alt="Profile Photo" /> */}
                    </div>
                    <div className={styles.username}>
                        {username}
                    </div>
                    <div className={styles.userJob}>
                        {role}
                    </div>
                </div>
                <Divider textAlign="right" component="div" role="presentation" className={styles.numConnections}>
                    <Typography 
                    variant="h4" 
                    component="span" 
                    style={{ fontWeight: 'bolder', color: '#057a59' }}>
                        107  
                    </Typography>
                    <Typography 
                    variant="h6" 
                    component="span" 
                    style={{ fontWeight: 'normal', color: 'black'}}>
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
                            <div className={styles.contentheader}>
                                <Typography sx={{fontSize:'20px',
                                fontWeight: 'bolder'}}>
                                    Rating Overview
                                </Typography>
                            </div>
                            <StarRatingChart ratings={ratingsData} />
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
                                        <Avatar src={profilePhoto} alt="">
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
                                                <Avatar src={profilePhoto}></Avatar>
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
                                                <Avatar src={profilePhoto}></Avatar>
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
                                                <Avatar src={profilePhoto}></Avatar>
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
                                                <Avatar src={profilePhoto}></Avatar>
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