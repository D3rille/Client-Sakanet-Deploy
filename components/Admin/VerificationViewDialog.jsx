import * as React from 'react';
import {useState} from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Avatar from '@mui/material/Avatar';
import { TextField } from '@mui/material';
import { useMutation } from '@apollo/client';
import toast from "react-hot-toast";

import { formatWideAddress } from '../../util/addresssUtils';
import {GET_USER_INFO, REJECT_VERIFICATION} from "../../graphql/operations/admin";
import CustomDialog from "../popups/customDialog";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

//Full screen dialog
export default function VerificationViewDialog({open, setOpen, user, handleVerifyUser, handleUnverifyUser, handleDeleteUser}) {
  const [openDialog, setOpenDialog] = useState("");
  const [rejectVerification] = useMutation(REJECT_VERIFICATION);
  const handleRejectVerification = () => {
    rejectVerification({
      variables:{
        userId:user?._id ?? ""
      },
      refetchQueries:[GET_USER_INFO],
      onCompleted:(data)=>{
        toast.success(data?.rejectVerification);
      },
      onError:(error)=>{
        toast.error(error.message);
      }
    });
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
 
  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Close
            </Typography>
            <Button autoFocus color="inherit" onClick={()=>{
              setOpenDialog("delete");
            }}>
              Delete Account
            </Button>
          </Toolbar>
        </AppBar>
        <div style={{display:"flex", flexDirection:"column", padding:"5em"}}>
            <div style={{display:"flex", flexDirection:"row"}}>
              <div style={{ paddingBlock:"1em", paddingInline:"3em", marginInline:"1em", border:"1px solid grey", width:"30%"}}>
                <div style={{display:"flex", flexDirection:"row", justifyContent:"center", marginBottom:"1em"}}>
                  <Avatar
                    src={user.profile_pic}
                    sx={{width:"100px", height:"100px"}}
                  />
                  
                </div>
                <div style={{display:"flex", flexDirection:"row", gap:"8px"}}>
                  <TextField
                  fullWidth
                    label="Username"
                    defaultValue={user?.username ?? ""}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                  fullWidth
                    label="Role"
                    defaultValue={user?.role ?? ""}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </div>
                <div style={{display:"flex", flexDirection:"row", gap:"8px"}}>
                  <TextField  
                  fullWidth
                    label="First Name"
                    defaultValue={user?.firstName ?? "n/a"}
                    sx={{marginTop:"0.5em"}}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                  fullWidth
                    label="Last Name"
                    defaultValue={user?.lastName ?? "n/a"}
                    sx={{marginTop:"0.5em"}}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </div>
                <div style={{display:"flex", flexDirection:"row", gap:"8px"}}>
                  <TextField
                  fullWidth
                    label="Middle Name"
                    sx={{flex:2, marginTop:"0.5em"}}
                    defaultValue={user?.middleName ?? "n/a"}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                  fullWidth
                    label="Suffix"
                    sx={{flex:1, marginTop:"0.5em"}}
                    defaultValue={user?.suffix ?? "n/a"}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </div>
                <TextField
                fullWidth
                  label="Address"
                  sx={{marginTop:"0.5em"}}
                  defaultValue={formatWideAddress(user?.address) ?? ""}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              <div style={{display:"flex", marginBlock:"1em", gap:"8px"}}>
                {!user?.is_verified && user?.verification_status == "pending" && (
                  <>
                    <Button variant='contained'color="success" onClick={()=>{
                      handleVerifyUser();
                      setOpen("");
                    }}>
                      Verify
                    </Button>
                    <Button variant='outlined' color="error" onClick={()=>{
                      handleRejectVerification();
                      setOpen("");
                    }}>
                      Reject
                    </Button>
                  </>
                )}
              </div>
              </div>
                {user?.verification_photo ? (<img src={user?.verification_photo ?? ""} alt="Verification photo" style={{width:"60%", border:"1px solid black"}}/>)
                :(
                <div style={{display:"flex", width:"60%", border:"1px solid black", alignItems:"center", justifyContent:"center"}}>
                  <Typography style={{textAlign:"center"}}>No Verification Photo</Typography>
                </div>
                )}
                
            </div>
            {openDialog=="delete" && (
            <CustomDialog
              title={"Delete User"}
              message={"Are your sure you want to delete this user's account? This action once done is irreversible. Proceed?"}
              btnDisplay={0}
              openDialog={Boolean(openDialog)}
              setOpenDialog={setOpenDialog}
              callback={()=>handleDeleteUser(user?._id, user?.role).then(()=>handleClose())}
            />
            )}
        </div>
      </Dialog>
    </div>
  );

}