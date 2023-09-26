import React, { useEffect, useState, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import styles from "../../styles/Profile.module.css";
import coverPhoto from "../../public/images/coverphoto.jpg";
// import profilePhoto from '../../public/images/pfp.jpg';
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { TextField, Card, Button, Link, Rating } from "@mui/material";
import locationIcon from "../../public/icons/location.svg";
import contactIcon from "../../public/icons/contact.svg";
import emailIcon from "../../public/icons/email.svg";
import uploadIcon from "../../public/icons/upload.svg";
import StarRatingChart from "../../components/StarRatingChart";
import IconButton from "@mui/material/IconButton";
import samplePost from "../../public/images/samplepost.jpg";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Head from "next/head";
import Image from "next/image";
import { GET_MY_PROFILE } from "../../graphql/operations/profile";
import { GET_ALL_REVIEWS } from "../../graphql/operations/review";
import CircularLoading from "../../components/circularLoading";
import {AuthContext} from "../../context/auth";
import { useQuery } from "@apollo/client";
import { formatWideAddress } from "../../util/addresssUtils.js";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import toast from "react-hot-toast";


// const initialReviews = [
//   {
//     id: 1,
//     name: "Jhan Derille Unlayao",
//     review: "Successful transaction, communicable.",
//   },
//   { id: 1, name: "Jhan Unlayao", review: "Successful transaction" },
// ];

export default function MyProfile() {
  const {user} = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  try {
    var { loading, error, data } = useQuery(GET_MY_PROFILE);
    var {data:getReviewsData, loading:getReviewsLoading, error:getReviewsError} = useQuery(GET_ALL_REVIEWS, {
      variables:{
        subjectedUser:user.id
      }
    });
    
  } catch (error) {
    toast.error("Cannot connect to server, Check your internet Connection");
    console.log(error);
  }

  useEffect(()=>{
    if(getReviewsData){
      setReviews(getReviewsData?.getAllReviews);
    }
  },[getReviewsData, getReviewsLoading])

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

  // const {
  //   _id:reviewId, 
  //   username:reviewerUsername, 
  //   profile_pic:reviewerProfile_Pic, 
  //   rate:reviewerRate,
  //   comment:reviewerComment,

  // } = ;

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const [UserPostDescrip, setUserPostDescrip] = useState("");

  const handleButtonClick = (e) => {
    e.preventDefault();
  };

  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


 
  if (loading) return(
    <div style={{display:"flex", margin:"auto"}}>
      <CircularLoading/>
    </div>
  
  );
  if (error) return <p>Error: {error.message}</p>;


  const {
    profile_pic,
    username,
    address,
    is_verified,
    role,
    rating,
    ratingStatistics,
    account_mobile,
    account_email,
    cover_photo,
  } = data.getMyProfile.profile;

  const ratingsData = {
    1: ratingStatistics.oneStar ?? 0,
    2: ratingStatistics.twoStar ?? 0,
    3: ratingStatistics.threeStar ?? 0,
    4: ratingStatistics.fourStar ?? 0,
    5: ratingStatistics.fiveStar ?? 0,
  };

  const activeProfilePic =
    profile_pic || "https://img.freepik.com/free-icon/user_318-159711.jpg";
  const reviewerNumber = `Rating Overview (${
    ratingStatistics.reviewerCount ?? 0
  })`;

  return (
    <>
      <div key="profile" className={styles.mainProfile}>
        <div className={styles.profileContainer}>
          <div className={styles.topPortion}>
            <div className={styles.userCoverImg}>
              <img
                className={styles.coverphoto}
                src={cover_photo}
                alt="Cover Photo"
              />
            </div>
            <div className={styles.profileImg}>
              <Avatar
                src={profile_pic ?? ""}
                alt="Profile"
                className={styles.profilephoto}
              />
            </div>
            <div className={styles.username}>{username}</div>
            <div className={styles.userJob}>{role}</div>
          </div>
          <Divider
            textAlign="right"
            component="div"
            role="presentation"
            className={styles.numConnections}
          >
            <Typography
              variant="h4"
              component="span"
              style={{ fontWeight: "bolder", color: "#057a59" }}
            >
              {data.getMyProfile.connections}
            </Typography>
            <Typography
              variant="h6"
              component="span"
              style={{
                fontWeight: "normal",
                color: "black",
                marginInline: "4px",
              }}
            >
              Connections
            </Typography>
          </Divider>
          <div className={styles.bottomPortion}>
            <div className={styles.rightSide}>
              <div key="element3" className={styles.content1}>
                <Card
                  className={styles.aboutCard}
                  sx={{
                    width: "100%",
                    height: "max-Content",
                    borderRadius: "10px",
                    padding: "15px 0px 10px 20px",
                    backgroundColor: "#FCFCFF",
                    boxShadow: "0 3px 3px 3px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div className={styles.contentheader}>
                    <Typography sx={{ fontSize: "20px", fontWeight: "bolder" }}>
                      About Me
                    </Typography>
                  </div>
                  <div className={styles.locationtitle}>
                    <Image
                      sx={{ width: "10px", height: "15px" }}
                      src={locationIcon}
                      alt="Location"
                      width={20}
                      height={25}
                    />
                    <p className={styles.infoContent}>
                      {formatWideAddress(address)}
                    </p>
                  </div>
                  {account_mobile && (
                    <>
                      <div className={styles.contacttitle}>
                        <Image
                          sx={{ width: "10px", height: "15px" }}
                          src={contactIcon}
                          alt="Contact Number"
                          width={20}
                          height={25}
                        />
                        <p className={styles.infoContent}>{account_mobile}</p>
                      </div>
                    </>
                  )}
                  {account_email && (
                    <>
                      <div className={styles.emailtitle}>
                        <Image
                          sx={{ width: "10px", height: "15px" }}
                          src={emailIcon}
                          alt="Email Address"
                          width={20}
                          height={25}
                        />
                        <p className={styles.infoContent}>{account_email}</p>
                      </div>
                    </>
                  )}
                </Card>
                <Card
                  className={styles.ratingsChart}
                  sx={{
                    width: "100%",
                    height: "max-Content",
                    borderRadius: "10px",
                    padding: "15px 0px 10px 20px",
                    backgroundColor: "#FCFCFF",
                    boxShadow: "0 3px 3px 3px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ width: "40%", textAlign: "center" }}>
                      <Typography
                        sx={{ fontSize: "20px", fontWeight: "bolder" }}
                      >
                        {reviewerNumber}
                      </Typography>
                      <Typography sx={{ fontSize: "5rem", fontWeight: "bold" }}>
                        {rating}
                      </Typography>
                      <Rating name="read-only" value={rating} readOnly />
                    </div>
                    <div style={{ width: "60%" }}>
                      <StarRatingChart ratings={ratingsData} />
                    </div>
                  </div>
                </Card>

                {/* REVIEW CARDS*/}
                {getReviewsLoading && (
                  <div style={{display:"flex", margin:"auto"}}>
                    <CircularLoading/>
                  </div>
                )}
                {!getReviewsData && (
                  <div style={{display:"flex", margin:"auto"}}>
                    <p>No Reviews</p>
                  </div>
                )}
                
                {getReviewsData && (<Card
                  className={styles.reviewCard}
                  sx={{
                    width: "100%",
                    height: "max-content",
                    borderRadius: "10px",
                    padding: "15px 20px",
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
                      fontSize: "14px",
                      textAlign: "center",
                      marginTop: "10px",
                    }}
                  >
                    {reviews[currentReviewIndex]?.username ?? ""}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "15px",
                      textAlign: "center",
                      marginBottom: "1.5rem",
                      marginTop: "10px",
                      fontWeight: "bold",
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
                </Card>)}
                {/*  */}
              </div>
            </div>
            <div className={styles.leftSide}>
              <div className={styles.feedContainer}>
                <div className={styles.topContainer}>
                  <div className={styles.feedInputContainer}>
                    <div className={styles.avatarContainer}>
                      <Avatar src={profile_pic ?? ""}></Avatar>
                    </div>
                    <div className={styles.inputContainer}>
                      <input
                        className={styles.postDesc}
                        placeholder="Write Something..."
                        value={UserPostDescrip}
                        onChange={(e) => {
                          setUserPostDescrip(e.target.value);
                        }}
                        style={{
                          outline: isFocused ? "none" : "",
                          border: isFocused ? "none" : "",
                        }}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                      />
                      <IconButton>
                        <Image
                          src={uploadIcon}
                          alt="Upload Icon"
                          width={30}
                          height={30}
                        />
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
                      <Image
                        className={styles.postImage}
                        sx={{}}
                        src={samplePost}
                        alt="post"
                      />
                    </div>
                  </div>
                  <hr className={styles.postDivider} />
                  <div className={styles.footerPortion}>
                    <div className={styles.likepost}>
                      <IconButton sx={{ color: "#057a59" }} size="small">
                        <ThumbUpIcon />
                      </IconButton>
                    </div>
                    <Link href="">Comments</Link>
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
                      <Image
                        className={styles.postImage}
                        sx={{}}
                        src={samplePost}
                        alt="post"
                      />
                    </div>
                  </div>
                  <hr className={styles.postDivider} />
                  <div className={styles.footerPortion}>
                    <div className={styles.likepost}>
                      <IconButton sx={{ color: "#057a59" }} size="small">
                        <ThumbUpIcon />
                      </IconButton>
                    </div>
                    <Link href="">Comments</Link>
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
                      <Image
                        className={styles.postImage}
                        sx={{}}
                        src={samplePost}
                        alt="post"
                      />
                    </div>
                  </div>
                  <hr className={styles.postDivider} />
                  <div className={styles.footerPortion}>
                    <div className={styles.likepost}>
                      <IconButton sx={{ color: "#057a59" }} size="small">
                        <ThumbUpIcon />
                      </IconButton>
                    </div>
                    <Link href="">Comments</Link>
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
                      <Image
                        className={styles.postImage}
                        sx={{}}
                        src={samplePost}
                        alt="post"
                      />
                    </div>
                  </div>
                  <hr className={styles.postDivider} />
                  <div className={styles.footerPortion}>
                    <div className={styles.likepost}>
                      <IconButton sx={{ color: "#057a59" }} size="small">
                        <ThumbUpIcon />
                      </IconButton>
                    </div>
                    <Link href="">Comments</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
