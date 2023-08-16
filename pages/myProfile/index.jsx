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

export default function MyProfile(){
    
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const [UserPostDescrip, setUserPostDescrip ] = useState("");

    const handleButtonClick=(e)=>{
        e.preventDefault();
    }

    const [isFocused, setIsFocused] = useState(false);

    const ratingsData = {
        5: 120,
        4: 80,
        3: 50,
        2: 20,
        1: 10,
      };

    useEffect(() => {
        const handleResize = () => {
          setScreenWidth(window.innerWidth);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    return (
        <>
        <div key='profile' className={styles.mainProfile}>
            <div className={styles.profileContainer}>
                <div className={styles.topPortion}>
                    <div className={styles.userCoverImg}>
                        <Image className={styles.coverphoto} src={coverPhoto} alt="Cover Photo" />
                    </div>
                    <div className={styles.profileImg}>
                        <Image className={styles.profilephoto} src={profilePhoto} alt="Profile Photo" />
                    </div>
                    <div className={styles.username}>
                        Juan Dela Cruz
                    </div>
                    <div className={styles.userJob}>
                        Quezon Local Farmer
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
                                <p className={styles.infoContent}>Lucena City, Quezon</p>
                            </div>
                            <div className={styles.contacttitle}>
                                <Image sx={{width:'10px',height:'15px',}} src ={contactIcon} alt = "Contact Number" width={20} height={25}/>
                                <p className={styles.infoContent}>09859403059</p>
                            </div>
                            <div className={styles.emailtitle}>
                                <Image sx={{width:'10px',height:'15px',}} src ={emailIcon} alt = "Email Address" width={20} height={25}/>
                                <p className={styles.infoContent}>juandcruz@email.com</p>
                            </div>
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
                                            <a className={styles.comment}>Comments</a>
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
                                            <a className={styles.comment}>Comments</a>
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
                                            <a className={styles.comment}>Comments</a>
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
                                            <a className={styles.comment}>Comments</a>
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