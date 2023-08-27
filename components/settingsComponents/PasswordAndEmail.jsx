import React from "react";
import {
  TextField,
  Divider,
  Button,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";

const PasswordAndEmailContainer = styled("div")({
  paddingTop: "0.3rem",
  margin: "2rem",
});

const EmailField = styled(TextField)({
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

const PasswordField = styled(TextField)({
    flexDirection: "column",
    display:'flex',
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

const SaveButtonContainer = styled("div")({
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'flex-end',
});

const PasswordAndEmail = () => {
  return (
    <PasswordAndEmailContainer>
      <div style={{ marginTop: "1rem" }}>
        <h3>Email</h3>
        <EmailField
          variant="outlined"
          placeholder="Enter Email Address"
          InputProps={{
            style: {
              borderColor: "#2E603A",
              marginTop: "10px",
            },
          }}
        />
        <Typography variant="caption" style={{ display: "block" }}>
          Email address is optional
        </Typography>
      </div>

      <StyledDivider />

      <div>
        <h3 style={{ marginBottom: "10px" }}>Password</h3>
        <PasswordField
            variant="outlined"
            placeholder="Enter Old Password"
            style={{ marginBottom: "10px" }} 
            InputProps={{
              style: {
                borderColor: "#2E603A",
              },
            }}
        />
        <PasswordField
            variant="outlined"
            placeholder="Enter New Password"
            style={{ marginBottom: "10px" }} 
            InputProps={{
              style: {
                borderColor: "#2E603A",
              },
            }}
        />
        <PasswordField
            variant="outlined"
            placeholder="Confirm New Password"
            style={{ marginBottom: "5px" }} 
            InputProps={{
              style: {
                borderColor: "#2E603A",
              },
            }}
        />
        <Typography variant="caption" >
          Use a password that you will remember.
        </Typography>
      </div>

      <SaveButtonContainer>
        <StyledButton variant="contained" style={{marginBottom: '1rem'}}>Save Changes</StyledButton>
      </SaveButtonContainer>
    </PasswordAndEmailContainer>
  );
};

export default PasswordAndEmail;
