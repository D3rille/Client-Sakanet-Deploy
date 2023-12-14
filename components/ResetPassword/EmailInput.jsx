// EmailInput.js
import React, { useContext, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useLazyQuery } from "@apollo/client";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { GET_OTP } from "../../graphql/operations/email";
import { useState } from "react";

const EmailInput = ({handleChange, variables}) => {
    const [getOtp] = useLazyQuery(GET_OTP);
    const [localEmail, setLocalEmail] = useState("");
  
    const handleEmailSubmit = () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      if (!emailRegex.test(localEmail)) {
        toast.error("Invalid email format. Please enter a valid email address.");
        return;
      }
  
      getOtp({
        variables: { email: localEmail },
        onCompleted: (data) => handleSuccess(data),
        onError: (error) => handleError(error),
      });
    };
  
    const handleSuccess = (data) => {
        const otp = data?.generateOTP;
        console.log(otp)

        if (otp) {
          console.log(otp)
          console.log(localEmail)
          handleChange({
            target: { name: "otp", value: otp },
          });
          
          handleChange({
            target: { name: "page", value: "OTPInput" },
          });   
          
          handleChange({
            target: { name: "email", value: localEmail },
          });      
        } else {
          console.error("Empty OTP received");
        }
      };

    const handleError = (error) => {
      toast.error("Error fetching OTP. Please try again later.");
    };

  return (
    <Container maxWidth="sm">
    <Toaster />
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Box
        boxShadow={3}
        p={4}
        bgcolor="background.paper"
        borderRadius="16px"
        maxWidth="400px"
        width="100%"
        textAlign="center" // Add this line to center the content
      >
        <Typography variant="h5" align="center" gutterBottom>
          Forgot Your Password?
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          To reset your password, enter your email below. We will send you a 4-digit code
          in your email.
        </Typography>

        <TextField
          type="email"
          id="email"
          label="Enter your email"
          required
          value={localEmail}
          onChange={(e) => setLocalEmail(e.target.value)}
          sx={{ width: "100%", marginBottom: "1rem" }}
        />
        <Button
          type="submit"
          variant="contained"
          style={{ backgroundColor: "#2f613a", color: "#ffffff" }}
          onClick={handleEmailSubmit}
        >
          Submit
        </Button>
      </Box>
    </Box>
  </Container>
  );
};

export default EmailInput;
