import React, { useEffect, useState, useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import styles from '../../styles/Profile.module.css';
import coverPhoto from '../../public/images/coverphoto.jpg';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { TextField,Card, Button,Link,  Box, Stack, CardHeader, CardContent} from '@mui/material';
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
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Head from 'next/head';
import Image from "next/image";
import { GO_TO_PROFILE } from '../../graphql/operations/search';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import {formatWideAddress} from '../../util/addresssUtils.js';
import { useRouter } from "next/router";
import Rating from '@mui/material/Rating';
import toast from 'react-hot-toast';
import { REQUEST_CONNECTION, REMOVE_CONNECTION } from '../../graphql/operations/myNetwork';
import { GET_ALL_REVIEWS, CHECK_PERMISSION, WRITE_REVIEW, GET_MY_REVIEW, EDIT_REVIEW } from '../../graphql/operations/review';
import OptionsMenu from '../../components/popups/OptionsMenu';
import CircularLoading from '../../components/circularLoading';
import { AuthContext } from '../../context/auth'; 
import RateAndReviewModal from "../../components/Review/RateAndReviewModal";
import EditReviewModal from '../../components/Review/EditReviewModal';
import chaticonsIcon from "../../public/icons/chaticon.png";
import CustomDialog from '../../components/popups/customDialog';
import VerifiedIcon from '@mui/icons-material/Verified';

const ButtonsDisplay = ({userId, connStatus, requestConnection, disconnect, router}) =>{
    const [openDialog, setOpenDialog] = useState("");

    const DynamicBtn = () =>{
        if(!connStatus || connStatus == "disconnected"){
            return(
                
                <Button
                    variant="contained"
                    style={{
                      backgroundColor:"#32816B",
                      width: "100%",
                      borderRadius: "7px",
                      boxShadow: "0 3px 3px 3px rgba(0, 0, 0, 0.1)",
                    }}
                    onClick={()=>{
                            requestConnection({variables:{"connectTo":userId}})
                        }}
                  > 
                    Connect
                  </Button>
            )
        } else if(connStatus == "pending"){
            return(
                <Button
                    variant="contained"
                    style={{
                    backgroundColor:  "#F8F9F8",
                    width: "100%",
                    borderRadius: "7px",
                    boxShadow: "0 3px 3px 3px rgba(0, 0, 0, 0.1)",
                    }}
                    disabled={true}
                > 
                    Pending...
              </Button>
            )
        } else if(connStatus=="connected"){
            return(
                <Button
                    variant="contained"
                    startIcon={<CheckIcon/>}
                    style={{
                      backgroundColor:"#32816B",
                      width: "100%",
                      borderRadius: "7px",
                      boxShadow: "0 3px 3px 3px rgba(0, 0, 0, 0.1)",
                    }}
                    onClick={()=>{
                        setOpenDialog("disconnect");
                    }}
                  > 
                    Connected
                  </Button>
            )
        }
    }
    
    
//         <IconButton 
//         variant="outlined" 
//         // color="success" 
//         onClick={handleClickOpen}
//         sx={{
//             boxShadow: "0 3px 3px 3px rgba(0, 0, 0, 0.1)",
//         }}
//         >
//             <MoreHorizIcon/>
//         </IconButton>

    return(
    <>
    <Stack direction="row" spacing={2}>
        <DynamicBtn/>
        <Button
        variant="contained"
        style={{
            backgroundColor: "#FBF9F7",
            width: "100%",
            color: "#1D1E22",
            borderRadius: "7px",
            boxShadow: "0 3px 3px 3px rgba(0, 0, 0, 0.1)",
            display: "flex",
            alignItems: "center",
        }}
        onClick={()=>{
            router.push(`/Chats?userId=${userId}`);
        }}
        >
        <Image
            src={chaticonsIcon}
            alt="Chat Icon"
            width={20}
            height={20}
            style={{ marginRight: "5px" }}
        />
            Message
        </Button>

    </Stack>

    {/* Disconnect Dialog */}
    {openDialog == "disconnect" && (<CustomDialog
        openDialog={Boolean(openDialog)}
        setOpenDialog={setOpenDialog}
        title = {"Disconnect"}
        message={"Do you want to disconnect with this user?"}
        btnDisplay={0}
        callback={()=>{
            disconnect();
        }}
    />)}

    </>)

}

export default function FindUser(){
    const {user} = useContext(AuthContext);
    const router = useRouter();
    const id = router.query.id;

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [UserPostDescrip, setUserPostDescrip ] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const [reviews, setReviews] = useState([]);
    const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState("");

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
    // Get profile information
    const { loading, error, data } = useQuery(GO_TO_PROFILE,{
        variables:{
            userId:id
        }, 
        onError:(error)=>{
            toast.error(error.message);
            console.error(error);
        }
    });

    const [getAllReviews, {data:getReviewsData, loading:getReviewsLoading, error:getReviewsError}] = useLazyQuery(GET_ALL_REVIEWS, {
        variables:{
            subjectedUser:id
        }, 
        onError:(error)=>{
            toast.error(error.message);
            console.error(error);
        }
    });

    const [checkPermission, {data:getPermissionToReviewData, loading:getPermissionToReviewLoading}] = useLazyQuery(CHECK_PERMISSION, {
        onError:(error)=>{
            toast.error(error.message);
            console.error(error);
        }
    });

    const [getMyReview, {data:getMyReviewData, loading:getMyReviewLoading}] = useLazyQuery(GET_MY_REVIEW, {
        variables:{
            "subjectedUser":id
        },
        onError:(error)=>{
            toast.error(error.message);
            console.error(error);
        }
    });

    const [writeReview] = useMutation(WRITE_REVIEW);
    const [editReview] = useMutation(EDIT_REVIEW);

    // Remove Connection
    const [removeConnection] = useMutation(REMOVE_CONNECTION,{
        refetchQueries:[GO_TO_PROFILE],
        onError:(err)=>{
            toast.error(err.graphQLErrors[0].message);
        },
        onCompleted:(removeConnectionData)=>{
            toast.success(removeConnectionData.removeConnection.message);
        }
    });
    
    useEffect(() => {
        const handleResize = () => {
          setScreenWidth(window.innerWidth);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

      useEffect(()=>{
        if(data && !loading){
            getAllReviews();
            checkPermission();
        }
      },[data, loading]);

    useEffect(()=>{
        if(getReviewsData){
          setReviews(getReviewsData?.getAllReviews);
        }
      },[getReviewsData, getReviewsLoading]);

    useEffect(()=>{
    if(getPermissionToReviewData?.checkPermissionToReview){
        getMyReview();
    }

    }, [getPermissionToReviewData, getPermissionToReviewLoading])

      const handleWriteReview = async(rate, comment) => {
        try {
            await writeReview({
                variables:{
                    "reviewInput": {
                      "rate": rate,
                      "comment": comment,
                      "subjectedUser": id
                    }
                  },
                  refetchQueries:[{
                    query:GET_MY_REVIEW,
                    variables:{
                        "subjectedUser":id
                    },
                  },{
                    query:GO_TO_PROFILE,
                    variables:{
                        userId:id
                    },
                }],
                  update:(cache, {data})=>{
                    const existingData = cache.readQuery({
                        query:GET_ALL_REVIEWS,
                        variables:{
                            subjectedUser:id
                        }
                    });

                    cache.writeQuery({
                        query:GET_ALL_REVIEWS,
                        variables:{
                            subjectedUser:id
                        },
                        data:{
                            getAllReviews:[data.writeReview, ...existingData.getAllReviews]
                        }
                    })
                  },
                  onCompleted:()=>{
                    toast.success("Successfully written Review");
                  },
                  onError:(error)=>{
                    toast.error(error.message);
                  }
            })
        } catch (error) {
            toast.error(error?.message);
            console.error(error);
        }
      };

      const handleEditReview = async(reviewId, rate, comment) => {
        try {
            await editReview({
                variables:{
                    "reviewId": reviewId,
                    "rate": rate,
                    "comment": comment
                  },
                  refetchQueries:[{
                    query:GET_MY_REVIEW,
                    variables:{
                        subjectedUser:id
                    },
                  }, {
                    query:GET_ALL_REVIEWS,
                    variables:{
                        subjectedUser:id
                    },
                  },{
                    query:GO_TO_PROFILE,
                    variables:{
                        userId:id
                    },
                }],
                  onCompleted:()=>{
                    toast.success("Successfully edited Review");
                  },
                  onError:(error)=>{
                    toast.error(error.message);
                  }
            })
        } catch (error) {
            toast.error(error?.message);
            console.error(error);
        }
      };

      
    const handleCloseModal = () =>{
        setIsModalOpen("");
    }
    const handleNextReview = () => {
    if (currentReviewIndex < reviews.length - 1) {
        setCurrentReviewIndex(currentReviewIndex + 1);
    }
    };

    const handlePreviousReview = () => {
    if (currentReviewIndex > 0) {
        setCurrentReviewIndex(currentReviewIndex - 1);
    }
    };

    if (loading) return (
        <div style={{height:"100vh", display:"flex", justifyContent:"center", alignItems:"center"}}>
            <CircularLoading/>
        </div>
    
    );
    if (error) return <p>Error: {error.message}</p>;
    if(data && data.goToProfile.profile){
        const { _id, profile_pic, 
            username, address, 
            is_verified, role, 
            rating, 
            ratingStatistics, 
            account_mobile, 
            account_email, 
            cover_photo
        } = data?.goToProfile.profile;

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
                            {username} {is_verified?<VerifiedIcon color='success'/>:""}
                        </div>
                        <div className={styles.userJob}>
                            {role}
                        </div>
                    </div>

                    <div style={{display:"flex", justifyContent:"flex-end", width:"90%", paddingTop:"1em"}}>
                        <ButtonsDisplay userId={_id} connStatus={connStatus} requestConnection={requestConnection} disconnect={()=>{
                            removeConnection({variables:{connectedUserId:_id}})
                        }} router={router}/>
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
                                            {rating.toFixed(1)}
                                        </Typography>
                                        <Rating name="read-only" value={rating} readOnly />
                                    </div>
                                    <div style={{width:"60%"}}>
                                    <StarRatingChart ratings={ratingsData} />
                                    </div>
                                </div>
                            </Card>

                            {/* REVIEW CARDS*/}
                    {!getMyReviewData?.getMyReview && (<Card
                    className={styles.reviewCard}
                    sx={{
                        width: "100%",
                        height: "max-content",
                        borderRadius: "10px",
                        padding: "1em",
                        backgroundColor: "#FCFCFF",
                        boxShadow: "0 3px 3px 3px rgba(0, 0, 0, 0.1)",
                        cursor: "pointer",
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "center",
                        marginBlock:"1em"
                    }}
                    > 
                        {getPermissionToReviewLoading && (<div style={{display:"flex", margin:"auto"}}>
                            <CircularLoading/>
                        </div>)}

                        {getPermissionToReviewData && !getPermissionToReviewData?.checkPermissionToReview &&(
                            <Typography>Verify account to review</Typography>
                        )}

                        { getPermissionToReviewData?.checkPermissionToReview && !getMyReviewData?.getMyReview
                        && (
                            <div
                                style={{display:"flex", margin:"auto"}}
                            >
                                <Button
                                    endIcon={<ChevronRightIcon/>}
                                    onClick={()=>{
                                        setIsModalOpen("newReview");
                                    }}
                                >
                                    Rate and Review
                                </Button>
                            </div>
                        )}
                    </Card>)}
                            {getPermissionToReviewData?.checkPermissionToReview && getMyReviewData?.getMyReview && (
                                 <Card
                                 className={styles.reviewCard}
                                 sx={{
                                     width: "100%",
                                     height: "max-content",
                                     borderRadius: "10px",
                                     padding: "1em",
                                     backgroundColor: "#FCFCFF",
                                     boxShadow: "0 3px 3px 3px rgba(0, 0, 0, 0.1)",
                                     cursor: "pointer",
                                     marginBlock:"1em"
                                 }}
                                 > 
                                   <CardHeader
                                        
                                        action={
                                            <Button 
                                            onClick={()=>{
                                                setIsModalOpen("editReview");
                                            }}
                                            size="small"
                                            >
                                                Edit
                                            </Button>
                                        }
                                        title={"Your Review"}
                                    />
                                    <CardContent>
                                        <div style={{display:"flex"}}>
                                            <div >
                                                <Rating name="rate" 
                                                value={getMyReviewData?.getMyReview?.rate ?? 0} 
                                                readOnly />
                                                <Typography variant="body2" color="text.secondary">
                                                    {getMyReviewData?.getMyReview.comment ?? ""}
                                                </Typography>
                                            </div>
                                        </div>

                                    </CardContent>
                                 </Card>
                                )}

                            {getReviewsLoading && (
                            <div style={{display:"flex", margin:"auto"}}>
                                <CircularLoading/>
                            </div>
                            )}
                            
                            {getReviewsData && (
                            <Card
                            className={styles.reviewCard}
                            sx={{
                                width: "100%",
                                height: "max-content",
                                borderRadius: "10px",
                                padding: "2em 5em",
                                backgroundColor: "#FCFCFF",
                                boxShadow: "0 3px 3px 3px rgba(0, 0, 0, 0.1)",
                                cursor: "pointer",
                                position: "relative",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            >
                            
                            {getReviewsData.getAllReviews.length == 0 ? (<div style={{display:"flex", margin:"auto"}}>
                                <p>No Reviews</p>
                            </div>):(
                                <>
                                <FormatQuoteIcon
                                    sx={{
                                    position: "absolute",
                                    left: "10px",
                                    top: "10px",
                                    fontSize: "70px",
                                    color: "#F7F7F9",
                                    zIndex: 2,
                                    }}
                                />

                                {/* <div style={{display:"flex"}}>
                                    <div style={{flex:1, flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                                    <Avatar
                                    src={reviews[currentReviewIndex]?.profile_pic ?? ""}
                                    sx={{
                                        border: "4px solid #32806A",
                                        width: 50,
                                        height: 50,
                                    }}
                                    />
                                    <Typography
                                        sx={{
                                        fontSize: "1rem",
                                        marginTop: "10px",
                                        fontWeight: "bold",
                                        }}
                                    >
                                        {reviews[currentReviewIndex]?.username ?? ""}
                                    </Typography>

                                    </div>
                                    <div style={{flex:2}}>
                                    <Rating name="rate" 
                                    value={reviews[currentReviewIndex]?.rate ?? 0} 
                                    sx={{fontSize:"0.8rem"}}
                                    readOnly />

                                    <Typography
                                        sx={{
                                        fontSize: "0.8rem",
                                        // textAlign: "center",
                                        marginBottom: "1.5rem",
                                        marginTop: "10px",
                                        
                                        }}
                                    >
                                        {reviews[currentReviewIndex]?.comment ?? ""}
                                    </Typography>
                                    </div>
                                </div> */}
                                <div style={{ marginTop: "20px", zIndex: 1 }}>
                                    <Avatar
                                    src={reviews[currentReviewIndex]?.profile_pic ?? ""}
                                    sx={{
                                        border: "4px solid #32806A",
                                        width: "70px",
                                        height: "70px",
                                    }}
                                    />
                                </div>

                                <Typography
                                    sx={{
                                    fontSize: "1rem",
                                    textAlign: "center",
                                    marginTop: "10px",
                                    fontWeight: "bold",
                                    }}
                                >
                                    {reviews[currentReviewIndex]?.username ?? ""}
                                </Typography>

                                <Rating name="rate" 
                                value={reviews[currentReviewIndex]?.rate ?? 0} 
                                sx={{fontSize:"0.8rem"}}
                                readOnly />

                                <Typography
                                    sx={{
                                    fontSize: "0.8rem",
                                    textAlign: "center",
                                    marginBottom: "1.5rem",
                                    marginTop: "10px",
                                    
                                    }}
                                >
                                    {reviews[currentReviewIndex]?.comment ?? ""}
                                </Typography>

                                <FormatQuoteIcon
                                    sx={{
                                    position: "absolute",
                                    right: "10px",
                                    bottom: "10px",
                                    fontSize: "70px",
                                    color: "#F7F7F9",
                                    zIndex: 2,
                                    }}
                                />
                               

                                <IconButton
                                    sx={{
                                    position: "absolute",
                                    left: "5px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    zIndex: 2,
                                    }}
                                    onClick={handlePreviousReview}
                                    disabled={currentReviewIndex === 0}
                                >
                                    <ArrowBack />
                                </IconButton>

                                <IconButton
                                    sx={{
                                    position: "absolute",
                                    right: "5px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    zIndex: 2,
                                    }}
                                    onClick={handleNextReview}
                                    disabled={currentReviewIndex === reviews.length - 1}
                                >
                                    <ArrowForward />
                                </IconButton>
                                
                                </>
                            )}
                            {/* getPermissionToReviewData?.checkPermissionToReview */}
                            { isModalOpen == "newReview" && (
                            <RateAndReviewModal
                                isOpen={Boolean(isModalOpen)}
                                onClose={handleCloseModal}
                                handleWriteReview={handleWriteReview}
                            />)}
                            {isModalOpen == "editReview" && (
                                <EditReviewModal
                                    isOpen={Boolean(isModalOpen)}
                                    onClose={handleCloseModal}
                                    handleEditReview={handleEditReview}
                                    myReviewData={getMyReviewData?.getMyReview}
                                />
                            )}

                            </Card>
                            )
                        } 
                            
                            {/* {getReviewsData.getAllReviews.length > 0 && ()} */}
                            {/* <Card className={styles.aboutCard} sx={{width:'100%',
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
                            </Card> */}

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


}