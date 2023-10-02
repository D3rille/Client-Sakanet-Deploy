import React, {   useContext, useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Divider,
  IconButton,
  Box,
  InputBase,
  Avatar,
  Checkbox,
} from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import {useRouter} from "next/router";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from "@mui/system";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from '@mui/icons-material/Close';
import { useLazyQuery, useMutation } from "@apollo/client";
import toast from "react-hot-toast";

import { AuthContext } from '../../context/auth';
import {useAuthorizeRoute} from "../../util/hooks";
import { GET_USER_INFO, VERIFY_USER, UNVERIFY_USER } from "../../graphql/operations/admin";
import CircularLoading from "../../components/circularLoading";
import { formatWideAddress } from "../../util/addresssUtils";
import {formatDate} from "../../util/dateUtils";

const StyledGrid = styled(Grid)({
  background: '#F4F4F4',
});

const StyledPaper = styled(Paper)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  backgroundColor: '#F9F8F8',
  textAlign: 'center',
  width: '90%',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: '3rem',
  borderRadius: '20px',
  overflow: 'hidden',
  minHeight: '100vh'
});

const SearchPanel = styled(Box)({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#F9FAFC",
  borderRadius: "5px",
  // marginLeft: "1.5rem",
  // marginRight: "1.5rem",
  // marginBottom: "0.5rem",
  border: "1px solid #DBE4EC",
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#F4F4F4",
}));

const StyledOrderIdCell = styled(StyledTableCell)({
  width: "20%",
});

const StyledTableRow = styled(TableRow)(({ theme }) => ({}));

const More = (handleClickOpen) =>{
  return(
    <IconButton
      onClick={()=>{
        handleClickOpen();
      }}
    >
      <MoreVertIcon/>
    </IconButton>
  );
} 

function TopBar() {
    const { user, logout } = useContext(AuthContext);

  return(
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Admin
        </Typography>
        <Button 
        onClick={()=>{
            logout();
        }}
        color="inherit"
        >Logout</Button>
      </Toolbar>
    </AppBar>
  </Box>
);
}


export default function Admin(){
const router = useRouter();
const {user} = useContext(AuthContext);
const [authorized, setAuthorized] = useState(false);
const [searchInput, setSearchInput] = useState("");

const [findUserInfo, {data:findUserInfoData, loading:findUserInfoLoading, error:findUserInfoError}] = useLazyQuery(GET_USER_INFO);
const [verifyUser] = useMutation(VERIFY_USER);
const [unverifyUser] = useMutation(UNVERIFY_USER);

useEffect(()=>{
if(user.role != "ADMIN"){
  router.replace("/");
} 
else {
  setAuthorized(true);
}
}, []);

if(!authorized) return;



const handleFindUserInfo = () => {
  try {
    findUserInfo({
      variables:{
        searchInput
      },
      onError:(error)=>{
        toast.error(error.message);
      },
    })
    
  } catch (error) {
    toast.error("Something Went wrong: " + error)
  }
};

const handleVerifyUser = (userId) =>{
  try {
    verifyUser({
      variables:{
        userId
      },
      refetchQueries:[GET_USER_INFO],
      onCompleted:()=>{
        toast.success("Successfully verified.");
      }
    })
  } catch (error) {
    toast.error(error);
    console.error(error);
  }
};

const handleUnverifyUser = (userId) =>{
  try {
    unverifyUser({
      variables:{
        userId
      },
      refetchQueries:[GET_USER_INFO],
    })
  } catch (error) {
    toast.error(error);
    console.error(error);
  }
};

const handleKeyDown = (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleFindUserInfo();
  }
};

if(findUserInfoLoading){
  return(
    <div style={{display:"flex", margin:"auto"}}>
      <CircularLoading/>
    </div>
    
  )
}
// if(!findUserInfoData){
//   return (
//     <div style={{display:"flex", margin:"auto"}}>
//       {searchInput && (<Typography>
//         No Matching Results
//       </Typography>)}
//       {!searchInput && (
//         <Typography>
//           Search User Id or Username
//         </Typography>
//       )}
//     </div>
//   )
// }

return (
  <div>
    <div>
      <TopBar/>
    </div>
    <StyledGrid container>
      <Grid item xs={12}>
          <StyledPaper elevation={3}>
          <Box sx={{ display:"flex", flexDirection:"row", textAlign: 'left', margin:"3em"}}>
            <Box sx={{flex:1}}>
              <Typography variant="h5" component="div" sx={{ fontWeight: 'bolder', color: '#494948' }}>
                  User Management
              </Typography>
            </Box>
            <Box sx={{flex:1}}>
            <SearchPanel>
            <Button 
              variant="contained"
              onClick = {()=>{
                handleFindUserInfo();
              }}
              sx={{
                paddingInline:"1em",
  
                marginRight:"1em"
              }}
            >
              Search
            </Button>
            <SearchIcon
              color="action"
              style={{ marginRight: "8px", color: "#AEBAC6" }}
            />
              <InputBase  
                value={searchInput}
                onChange={(e)=>setSearchInput(e.target.value)}
                onKeyDown={handleKeyDown}
                // onFocus={()=>{setFocus(true)}}
                // onBlur={()=>{
                //   if(!query){
                //     setFocus(false)
                //   }
                  
                // }}
                placeholder="Search Username or Id"
                fullWidth
                style={{ paddingLeft: "8px", color: "#AEBAC6" }}
              />
              {/* {query && (
                <IconButton onClick={()=>{
                  setQuery("");
                  setFocus(false);
                }}>
                  <CloseIcon sx={{fontSize:"1rem"}}/>
                </IconButton>
              )} */}
              
            </SearchPanel>
            
            </Box>
          </Box>
            <TableContainer
              component={Paper}
              sx={{
                width: "90%",
                borderRadius: "20px",
                elevation: 4,
                marginLeft: "auto",
                marginRight: "auto",
                display: "flex",
                flexDirection: "column",
                maxHeight:'55vh',
                overflow: "auto"
              }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{fontWeight:"bold"}}> Profile </TableCell>
                    <TableCell sx={{fontWeight:"bold"}}>Username </TableCell>
                    <TableCell sx={{fontWeight:"bold"}}>Address</TableCell>
                    <TableCell sx={{fontWeight:"bold"}}>role</TableCell>
                    {/* <StyledTableCell>{role=="FARMER"?"Buyer":"Seller"}</StyledTableCell> */}
                    <TableCell sx={{fontWeight:"bold"}}>Verified</TableCell>
                    <TableCell sx={{fontWeight:"bold"}}>Date Joined</TableCell>
                    {/* <StyledTableCell>Status</StyledTableCell> */}
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                  {findUserInfoData?.getUserInfo && findUserInfoData?.getUserInfo.map((user)=>{
                    return(
                    <StyledTableRow key={user._id}>
                      <TableCell>
                        <Avatar src ={user.profile_pic ?? ""} width={50} height={50}/>
                       
                      </TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{formatWideAddress(user.address)}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                      <Checkbox
                        checked={user.is_verified}
                        onChange={()=>{
                          if(!user.is_verified){
                            handleVerifyUser(user._id);
                          } else{
                            handleUnverifyUser(user._id);
                          }
                          
                        }}
                      />
                        </TableCell>
                      <TableCell>{formatDate(user.date_joined, "lll")}</TableCell>
                      <TableCell> 
                        <IconButton>
                          <MoreVertIcon/>
                        </IconButton>
                      </TableCell>
                    </StyledTableRow>)
                  })}
                  
                </TableBody>
              </Table>
            </TableContainer>
          </StyledPaper>
        </Grid>
    </StyledGrid>
    
  </div>
  
    );



  
}



