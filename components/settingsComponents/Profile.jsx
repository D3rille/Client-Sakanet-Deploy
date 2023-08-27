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


const Profile = () => {
  return (
    <ProfileContainer>
      <div style={{ marginTop: "1rem" }}>
        <h3>Username</h3>
        <UsernameField
          variant="outlined"
          placeholder="Enter your username"
          InputProps={{
            style: {
              borderColor: "#2E603A",
              marginTop: "10px",
            },
          }}
        />
        <Typography variant="caption" style={{ display: "block" }}>
          Username must be unique
        </Typography>
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

      <div
        style={{ display: "flex", alignItems: "flex-start", marginTop: "20px" }}
      >
        <div
          style={{
            marginRight: "1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            variant="square"
            style={{ width: "90px", height: "90px", marginBottom: "5px" }}
          />
          <Typography variant="caption">Max size 2mb</Typography>
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

      <div
        style={{ display: "flex", alignItems: "flex-start", marginTop: "20px" }}
      >
        <div
          style={{
            marginRight: "1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CoverPhoto variant="square" />
          <Typography variant="caption">Max size 5mb</Typography> 
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
        <StyledButton variant="contained" style={{marginBottom: '1rem',}}>Save Changes</StyledButton>
      </SaveButtonContainer>
    </ProfileContainer>
  );
};

export default Profile;
