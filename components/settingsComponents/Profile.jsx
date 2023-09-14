import React from "react";
import {
  TextField,
  Divider,
  Avatar,
  Button,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { imageDelete, uploadCoverPhoto, uploadImage } from "../../util/imageUtils";
import { UPLOAD_COVER_PIC, UPLOAD_PROFILE_PIC } from "../../graphql/operations/image";
import { useMutation } from "@apollo/client";
import { GET_MY_PROFILE } from "../../graphql/operations/profile";
import { UPDATE_DISPLAY_NAME } from "../../graphql/operations/settings";



const ProfileContainer = styled("div")({
  paddingTop: "0.3rem",
  margin: "2rem",
  height: '100%'
});

const UsernameField = styled(TextField)({
  width: "420px",
  marginBottom: "5px",
  "& input": {
    height: "40px",
    padding: "0 14px",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#2E603A",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#2E603A",
  },
});

const NameField = styled(TextField)({
  "& input": {
    height: "40px",
    padding: "0 14px",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#2E603A",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#2E603A",
  },
});

const StyledButton = styled(Button)({
  backgroundColor: "#2E603A",
  "&:hover": {
    backgroundColor: "#FE8C47",
  },
});

const StyledDivider = styled(Divider)({
  marginTop: "10px",
  marginBottom: "10px",
});


const CoverPhoto = styled(Avatar)({
  width: '200px',
  height: '90px',
  marginBottom: '5px'
});

const SaveButtonContainer = styled("div")({
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'flex-end',
  });


const Profile = ({currentProfilePic, currentCoverPic}) => {
  const [profilePicture, setProfilePicture] = useState(null); //Profile Pic
  const [coverPhoto, setCoverPhoto] = useState(null); //Cover photo
  const [displayName, setDisplayName] = useState(""); // Display Name

  const [uploadProfilePic] = useMutation(UPLOAD_PROFILE_PIC,{
    refetchQueries:[
      GET_MY_PROFILE
    ]
  });
  const [uploadCoverPic] = useMutation(UPLOAD_COVER_PIC,{
    refetchQueries:[
      GET_MY_PROFILE
    ]
  });

  const [updateDisplayName] = useMutation(UPDATE_DISPLAY_NAME,{
    refetchQueries:[
      GET_MY_PROFILE
    ]
  });
  const handleSave = () => {
    if (displayName !== "") {
      updateDisplayName({
        variables: {
          displayName: displayName
        }
      });
  }
}
  const handleProfilePictureDrop = (acceptedFiles) => {
    setProfilePicture(acceptedFiles[0]);
  };

  const handleCoverPhotoDrop = (acceptedFiles) => {
    setCoverPhoto(acceptedFiles[0]);
  };
  
  const handleProfilePicUpload = async (profilePicture) =>
  {
      if (currentProfilePic !== "" || null)
    {
      imageDelete(currentProfilePic);
    }
    try {
      const secureUrl = await uploadImage(profilePicture);

      if (secureUrl) {
        try {
          await uploadProfilePic({
            
            variables: {
              profile_pic: secureUrl,
            },
          });
          console.log('Image uploaded and URL stored in MongoDB.');
        } catch (error) {
          console.error('Error uploading image and storing URL:', error);
        }
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  const handleCoverPhotoUpload = async (coverPhoto) => 
  {
    if (currentCoverPic !== "" || null)
    {
      imageDelete(currentCoverPic);
    }
    try {
      const secureUrl = await uploadCoverPhoto(coverPhoto);

      if (secureUrl) {
        try {
          await uploadCoverPic({
            variables: {
              cover_photo: secureUrl,
            },
          });
          console.log('Image uploaded and URL stored in MongoDB.');
        } catch (error) {
          console.error('Error uploading image and storing URL:', error);
        }
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const profilePictureDropzone = useDropzone({
    accept: {'image/jpeg': ['.jpeg', '.png']},
    maxFiles:1,
    onDrop: handleProfilePictureDrop,
  });

  const coverPhotoDropzone = useDropzone({
    accept:  {'image/jpeg': ['.jpeg', '.png']},
    maxFiles:1,
    onDrop: handleCoverPhotoDrop,
  });
  return (
    <ProfileContainer>
      
      {/* Display Name */}
      <div style={{ marginTop: "1rem" }}>
        <h3>Display Name</h3> 
        <UsernameField
          variant="outlined"
          placeholder="Enter your display name"
          InputProps={{
            style: {
              borderColor: "#2E603A",
              marginTop: "10px",
            },
          }}
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        {/*
        <Typography variant="caption" style={{ display: "block" }}>
          Username must be unique
        </Typography> */}
      </div>

      <StyledDivider />

      <div>
        <h3 style={{ marginBottom: "10px" }}>Profile Name</h3>
        <div>
          <NameField
            variant="outlined"
            placeholder="First name"
            style={{ marginRight: "1rem" }}
            InputProps={{
              style: {
                borderColor: "#2E603A",
                width:'200px'
              },
            }}
          />
          <NameField
            variant="outlined"
            placeholder="Last name"
            InputProps={{
              style: {
                borderColor: "#2E603A",
                width:'200px'
              },
            }}
          />
        </div>
        <Typography variant="caption">
          Change your personal name that will be displayed.
        </Typography>
      </div>

      <StyledDivider />
 {/* PROFILE PIC UPLOAD */}
         <div style={{ display: "flex", alignItems: "flex-start", marginTop: "20px" }}>
        <div
          style={{
            marginRight: "1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            {...profilePictureDropzone.getRootProps()}
            style={{
              width: "90px",
              height: "90px",
              marginBottom: "5px",
              border: "2px dashed #ccc",
              borderRadius: "4px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {profilePicture ? (
              <img
                src={URL.createObjectURL(profilePicture)}
                alt="Profile"
                style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: "4px" }}
              />
            ) : (
              <Typography variant="caption" textAlign="center">Drop profile picture here</Typography>
            )}
          </div>
          <Typography variant="caption">Max size 10mb</Typography>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <h3>Profile Picture</h3>
          <StyledButton
            onClick= {() => handleProfilePicUpload(profilePicture)} //Image upload 
            variant="contained"
            style={{
              width: "150px",
              margin: "auto 0",
              marginBottom: "5px",
              marginTop: "7px",
            }}
          >
            Upload New
          </StyledButton>
          <Typography variant="caption">
            This setting will change your profile's photo.
          </Typography>
        </div>
      </div>

      <StyledDivider />

      <div style={{ display: "flex", alignItems: "flex-start", marginTop: "20px" }}>
  <div
    style={{
      marginRight: "1rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <div
      {...coverPhotoDropzone.getRootProps()}
      style={{
        width: "200px", // Retain the width
        height: "120px", // Retain the height
        marginBottom: "5px",
        border: "2px dashed #ccc",
        borderRadius: "4px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {coverPhoto ? (
        <img
          src={URL.createObjectURL(coverPhoto)}
          alt="Cover"
          style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: "4px" }}
        />
      ) : (
        <Typography variant="caption" textAlign="center">Drop cover photo here</Typography>
      )}
    </div>
    <Typography variant="caption">Max size 10mb</Typography>
  </div>

  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "100%",
    }}
  >
    <h3>Cover Photo</h3>
    <StyledButton
      onClick={() => handleCoverPhotoUpload(coverPhoto)} // Cover Photo upload logic here
      variant="contained"
      style={{
        width: "150px",
        margin: "auto 0",
        marginBottom: "5px",
        marginTop: "7px",
      }}
    >
      Upload New
    </StyledButton>
    <Typography variant="caption">
      This setting will change your profile's cover photo.
    </Typography>
  </div>
</div>


      <StyledDivider />

      <div>
        <h3>Bio</h3>
        <TextareaAutosize
          minRows={5}
          placeholder="Write your bio..."
          style={{
            width: "100%",
            borderColor: "#2E603A",
            borderWidth: "1px",
            borderRadius: "4px",
            backgroundColor: "#F9F8F8",
            color: "#6E6F6F",
          }}
        />

        <Typography variant="caption">Max of 250 characters.</Typography>
      </div>

      <SaveButtonContainer>
        <StyledButton variant="contained" onClick={handleSave} style={{marginBottom: '1rem',}}>Save Changes</StyledButton>
      </SaveButtonContainer>
    </ProfileContainer>
  );
};

export default Profile;
