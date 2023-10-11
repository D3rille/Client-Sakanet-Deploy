import React, { useState } from "react";
import { TextField, Divider, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useDropzone } from "react-dropzone";
import { uploadVerificationID } from "../../util/imageUtils";
import { UPDATE_VERIFICATION_STATUS, UPLOAD_VERIFICATION_PHOTO } from "../../graphql/operations/verification";
import { GET_MY_PROFILE } from "../../graphql/operations/profile";
import { useMutation, useQuery } from "@apollo/client";
import VerifiedIcon from '@mui/icons-material/Verified';
import toast from 'react-hot-toast';


const VerificationContainer = styled("div")({
  paddingTop: "0.3rem",
  margin: "2rem",
  height: "100%",
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

const AccountVerification = () => {
  const [uploadedID, setUploadedID] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState("Not Verified");
  const [uploadVerificatonPhoto] = useMutation(UPLOAD_VERIFICATION_PHOTO, {
    refetchQueries: [GET_MY_PROFILE]
  });
  const [updateVerificationStatus] = useMutation(UPDATE_VERIFICATION_STATUS, {
    refetchQueries: [GET_MY_PROFILE]
  });

  const { loading, error, data } = useQuery(GET_MY_PROFILE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;


  const { verification_photo, is_verified, verification_status } = data.getMyProfile.profile;

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
          });
          toast.success("Verfication Photo Uploaded");
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
        <h3>Verification Status</h3>
        <div style={{ display: "flex", alignItems: "center" }}>
          {is_verified ? (
            <div style={{ display: "flex", alignItems: "center", color: "green", gap: "8px"}}>
              <VerifiedIcon fontSize="large" />
              <Typography variant="body1">Verified</Typography>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", color: "red",  gap: "8px" }}>
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
          <h3>Account Verification</h3>
          <StyledDivider />
          {verification_status === "pending" && verification_status != ""  && verification_status != null  ? (
            <div>
              <Typography variant="caption">You have a pending verification request.</Typography>
            </div>
          ) : (
            <div>
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
                  <StyledButton
                    onClick={() => uploadID(uploadedID)}
                    variant="contained"
                    style={{
                      width: "150px",
                      margin: "auto 0",
                      marginBottom: "5px",
                      marginTop: "7px",
                    }}
                  >
                    Verify
                  </StyledButton>
                  <Typography variant="caption">Upload your ID to verify your account.</Typography>
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
