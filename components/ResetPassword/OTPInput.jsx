import React, { useState, useEffect, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function EmailVerification({handleChange, variables}) {
  const [timerCount, setTimer] = useState(60);
  const [OTPinput, setOTPinput] = useState(["", "", "", ""]);
  const [disable, setDisable] = useState(true);

  const OTP = variables.otp
  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [disable]);

  const resendOTP = () => {
    if (disable) return;

    alert("Resending OTP...");
    setDisable(true);
    setTimer(60);
  };

  const verifyOTP = () => {
    const enteredOTP = OTPinput.join("");
      if (enteredOTP === OTP) {
        handleChange({
          target: { name: "page", value: "reset" },
        });  
    } else {
      alert("Incorrect OTP. Please try again.");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Box
        boxShadow={3}
        p={4}
        bgcolor="background.paper"
        borderRadius="16px"
        maxWidth="400px"
        width="100%"
      >
        <Typography variant="h4" align="center" fontWeight="bold" mb={2}>
          Email Verification
        </Typography>

        <Typography variant="body2" align="center" color="textSecondary" mb={4}>
          We have sent a code to your email {variables.email}. This could take 1-5 minutes.
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
                  style: { textAlign: "center", fontSize: "1.5rem" },
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

          <Box mt={2} display="flex" justifyContent="center" alignItems="center">
            <Typography variant="body2" color="textSecondary">
              Didn't receive code?{" "}
              <span
                style={{
                  color: disable ? "gray" : "blue",
                  cursor: disable ? "none" : "pointer",
                  textDecoration: disable ? "none" : "underline",
                }}
                onClick={resendOTP}
              >
                {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
              </span>
            </Typography>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
