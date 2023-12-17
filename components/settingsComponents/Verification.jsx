import React, { useState } from "react";
import { TextField, Divider, Button, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";
import { useDropzone } from "react-dropzone";
import { uploadVerificationID } from "../../util/imageUtils";
import { UPDATE_VERIFICATION_STATUS, UPLOAD_VERIFICATION_PHOTO, UPLOAD_NAME_AND_BIRTHDATE } from "../../graphql/operations/verification";
import { GET_MY_PROFILE } from "../../graphql/operations/profile";
import { useMutation, useQuery } from "@apollo/client";
import VerifiedIcon from '@mui/icons-material/Verified';
import toast from 'react-hot-toast';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { useRouter } from "next/router";


const VerificationContainer = styled("div")({
  // paddingTop: "0.3rem",
  padding:"1em",
  margin: "2rem",
  height: "100%",
});

const StyledButton = styled(Button)({
  backgroundColor: "#2E603A",
  "&:hover": {
    backgroundColor: "#286652",
  },
  borderRadius:'12px',
});

const StyledDivider = styled(Divider)({
  marginTop: "10px",
  marginBottom: "10px",
});

const NameField = styled(TextField)({
  "& input": {
    height: "40px",
    // padding: "0 14px",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#2E603A",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#2E603A",
  },
});

const AccountVerification = ({profile}) => {
  const router = useRouter();
  const [uploadedID, setUploadedID] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [suffix, setSuffix] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("Not Verified");
  const [birthDate, setBirthDate] = useState(null);

  const [uploadVerificatonPhoto] = useMutation(UPLOAD_VERIFICATION_PHOTO, {
    refetchQueries: [GET_MY_PROFILE]
  });
  const [updateVerificationStatus] = useMutation(UPDATE_VERIFICATION_STATUS, {
    onError:(error)=>{
      toast.error(error.message)
    }
  });
  const [uploadNameAndBirthDate] = useMutation(UPLOAD_NAME_AND_BIRTHDATE, {
    variables:{
      firstName,
      lastName,
      middleName,
      birthDate: new Date(birthDate).toISOString(),
      suffix
    },
    refetchQueries:[GET_MY_PROFILE],
    onCompleted:()=>{
      router.reload();
    },
    onError:(error)=>{
      toast.error(error.message)
    }
  });


  const nameSuffixRegex = /^(jr|sr|Jr|Sr|jr\.|sr\.|Jr\.|Sr\.|I{1,3}|[A-Z]\.)$/;
  let canSave = (firstName && lastName && uploadedID && birthDate) && (suffix ? nameSuffixRegex.test(suffix):true);


  const { verification_photo, is_verified, verification_status } = profile;

  const handleIDUpload = (acceptedFiles) => {
    setUploadedID(acceptedFiles[0]);
  };

  //Upload ID
  const uploadID = async (uploadedID) => {
    try {
      const secureUrl = await uploadVerificationID(uploadedID);

      if (secureUrl) {
        // Upload Verification Photo
        try {
          await uploadVerificatonPhoto({
            variables: {
              verification_photo: secureUrl,
            },
            onCompleted:()=>{
              // toast.success("Verfication Photo Uploaded");
              uploadNameAndBirthDate();
            }
          });
        } catch (error) {
          toast.error('Error uploading image and storing URL:', error);
        }
        // Update Verification Status
        try {
          await updateVerificationStatus({
            variables: {
              verification_status: "pending",
            },
          });
        } catch (error) {
          toast.error('Error updating Verification Status:', error);
        }
      }
    } catch (error) {
      toast.error('Error uploading image:', error);
    }
  };

  const idUploadDropzone = useDropzone({
    accept: { 'image/jpeg': ['.jpeg', '.png'] },
    maxFiles: 1,
    onDrop: handleIDUpload,
  });

  return (
    <VerificationContainer>
      {/* Verification Status */}
      <div>
<div style={{ display: "flex", alignItems: "center" }}>
  <h4>Verification Status: </h4>
  {is_verified ? (
    <div style={{ display: "flex", alignItems: "center", color: "green", gap: "8px", marginLeft: "8px" }}>
      <VerifiedIcon fontSize="large" />
      <Typography variant="body1">Verified</Typography>
    </div>
  ) : (
    <div style={{ display: "flex", alignItems: "center", color: "red", gap: "8px", marginLeft: "8px" }}>
      <VerifiedIcon fontSize="large" />
      <Typography variant="body1">Not Verified</Typography>
    </div>
  )}
</div>

      </div>
      <StyledDivider />

      {/* (verification_status !== "pending" && (verification_status != null && (verification_photo != null || verification_photo === ""))) */}
      
            
      {!is_verified ? (
        <div>
          {verification_status === "pending" && verification_status != ""  && verification_status != null  ? (
            <div>
              <Typography variant="caption">You have a pending verification request.</Typography>
            </div>
          ) : (
            <div>
              <div style={{width:"100%", paddingBottom:"0.5em"}}>
                <h3 style={{textAlign:"center"}}>Account Verification</h3>
              </div>
              <div>
              <Typography variant="caption">
                Enter your first name and last name.
              </Typography>
              {/* <h3 style={{ marginBottom: "10px" }}>Profile Name</h3>   */}
              
              <div style={{marginBottom:'0.7rem', marginTop:"0.7em"}}>
                <NameField
                  variant="outlined"
                  placeholder="Juan"
                  label="First Name*"
                  size="small"
                  value={firstName}
                  onChange={(e)=>setFirstName(e.target.value)}
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
                  placeholder="Dela Cruz"
                  label="Last Name*"
                  value={lastName}
                  onChange={(e)=>setLastName(e.target.value)}
                  style={{ marginRight: "1rem" }}
                  size="small"
                  InputProps={{
                    style: {
                      borderColor: "#2E603A",
                      width:'200px'
                    },
                  }}
                />
                <NameField
                  variant="outlined"
                  label="Middle Name"
                  placeholder="Reyes"
                  value={middleName}
                  style={{ marginRight: "1rem" }}
                  onChange={(e)=>setMiddleName(e.target.value)}
                  size="small"
                  InputProps={{
                    style: {
                      borderColor: "#2E603A",
                      width:'200px'
                    },
                  }}
                />
                <NameField
                  variant="outlined"
                  label="Suffix"
                  placeholder="Jr"
                  value={suffix}
                  onChange={(e)=>setSuffix(e.target.value)}
                  size="small"
                  InputProps={{
                    style: {
                      borderColor: "#2E603A",
                      width:'100px'
                    },
                  }}
                />
              </div>
              <Typography variant="caption" sx={{paddingTop:1}}>
                Enter your birthdate.
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box display="flex" justifyContent="space-between" mt={1}>
                <DatePicker
                  label="BirthDate*"
                  sx={{ width: '50%', '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#2E603A' } }}
                  value={birthDate}
                  onChange={(newValue) => setBirthDate(newValue)}
                  slotProps={{ textField: { variant: 'outlined' } }}
                />
              </Box>
              </LocalizationProvider>
              
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
                    {...idUploadDropzone.getRootProps()}
                    style={{
                      width: "200px",
                      height: "200px",
                      marginBottom: "5px",
                      border: "2px dashed #ccc",
                      borderRadius: "4px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {uploadedID ? (
                      <img
                        src={URL.createObjectURL(uploadedID)}
                        alt="Uploaded ID"
                        style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: "4px" }}
                      />
                    ) : (
                      <Typography variant="caption" textAlign="center">Drop your ID here</Typography>
                    )}
                  </div>
                  <Typography variant="caption">Accepted formats: JPG, JPEG, PNG</Typography>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                  }}
                >
                    <h3>Verify Your Account</h3>
                    <Typography variant="caption">
                    Please upload a clear and legible image of a valid Philippine ID. 
                    Accepted file formats include JPEG, PNG, and PDF. This may include 
                    documents such as a passport, Philippine Identification, Social Security System ID,
                    Government Service Insurance System E-Card, Driver’s License, National Bureau of Investigation Clearance,
                    Police Clearance, Firearms’ License to Own and Possess ID, Professional Regulation Commission ID,
                    Integrated Bar of the Philippines ID, Overseas Workers Welfare Administration ID, Bureau of Internal Revenue ID,
                    Voter’s ID, Senior Citizen’s Card, Unified Multi-purpose Identification Card, 
                    Person with Disabilities Card, or Other valid government-issued ID with Photo
                    Ensure that the entire document is visible and well-lit for proper verification. Thank you!
                    </Typography>
                    <StyledButton
                      onClick={() => {
                        uploadID(uploadedID);
                        // uploadNameAndBirthDate();
                      }}
                      variant="contained"
                      style={{
                        width: "150px",
                        // margin: "auto 0",
                        marginLeft:"auto",
                        marginBottom: "5px",
                        marginTop: "7px",
                      }}
                      disabled={!canSave}
                    >
                      Verify
                    </StyledButton>
                  </div>
                </div>
              </div>
          )}
        </div>
      ) : null}


      
    </VerificationContainer>
  );
};

export default AccountVerification;
