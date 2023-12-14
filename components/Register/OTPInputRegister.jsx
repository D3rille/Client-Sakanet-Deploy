import React, { useState, useEffect, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import toast, { Toaster } from "react-hot-toast";

export default function EmailVerification({otp, registerUser}) {
  const [OTPinput, setOTPinput] = useState(["", "", "", ""]);

  
 

  const verifyOTP = () => {
    const enteredOTP = OTPinput.join(""); 
    console.log("OTP Input",enteredOTP)
    console.log("Generated:", otp)
    if (enteredOTP === otp) {
      toast.success('Password changed successfully');
      registerUser();

    } else {
      toast.error('Incorrect OTP. Please try again');
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
    
        maxWidth="400px"
        width="100%"
      >
        <Typography color="black" variant="h4" align="center" fontWeight="bold" mb={1}>
          Email Verification
        </Typography>

        <Typography variant="body2" align="center" color="black" mb={4}>
          Check your email to verify and complete your registration.       
        </Typography>

        <form>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            {Array.from({ length: 4 }, (_, index) => (
              <TextField
                key={index}
                variant="outlined"
                margin="normal"
                fullWidth
                size="medium"
                type="text"
                style={{ margin: "0 4px" }}
                inputProps={{
                  maxLength: 1,
                  style: { textAlign: "center", fontSize: "1.5rem", color: "black" },
                }}
                value={OTPinput[index]}
                onChange={(e) => {
                  const newOTPinput = [...OTPinput];
                  newOTPinput[index] = e.target.value;
                  setOTPinput(newOTPinput);
                }}
              />
            ))}
          </Box>

          <Box mt={4}>
            <Button
              fullWidth
              variant="contained"
              style={{ backgroundColor: "#2f613a", color: "#ffffff" }}
              onClick={verifyOTP}
            >
              Verify Account
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
