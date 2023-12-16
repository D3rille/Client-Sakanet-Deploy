import React, {   useContext, useState, useEffect} from "react";
import Head from 'next/head';
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
import {useRouter} from "next/router";
import { styled } from "@mui/system";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from '@mui/icons-material/Close';
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import toast from "react-hot-toast";
import Tab from "@mui/material/Tab";
import Badge from '@mui/material/Badge';

import { GET_USER_INFO, VERIFY_USER, UNVERIFY_USER, DELETE_USER, GET_PENDING_VERIFICATIONS } from "../../graphql/operations/admin";
import CircularLoading from "../../components/circularLoading";
import { formatWideAddress } from "../../util/addresssUtils";
import {formatDate} from "../../util/dateUtils";
import VerificationViewDialog from "../../components/Admin/VerificationViewDialog";

const StyledGrid = styled(Grid)({
  background: '#F4F4F4',
});

const StyledPaper = styled(Paper)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  backgroundColor: '#F9F8F8',
  textAlign: 'center',
  width: '95%',
  marginLeft: '1em',
  marginRight: '1em',
  marginBlock: '3rem',
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

const StyledTab = styled(Tab)({
  textTransform: "none",
  textAlign: "left",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  "&.Mui-selected": {
    color: "#2E603A",
  },
  "& .MuiSvgIcon-root": {
    color: "inherit",
    marginRight: "0.5rem",
  },
});

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



export default function UserManagement({verifyUser, unverifyUser, deleteUser}){
const router = useRouter();
const [userList, setUserList] = useState([]);
const [searchInput, setSearchInput] = useState("");
const [isModalOpen, setIsModalOpen] = useState("");
const [currentUser, setCurrentUser] = useState({});
const [searchFocus, setSearchFocus] = useState(false);

const [findUserInfo, {data:findUserInfoData, loading:findUserInfoLoading, error:findUserInfoError}] = useLazyQuery(GET_USER_INFO);
const [getPendingVerifications, {data:pendingVerifications, loading:pendingLoading}] = useLazyQuery(GET_PENDING_VERIFICATIONS);
// const {data:pendingVerifications, loading:pendingLoading} = useQuery(GET_PENDING_VERIFICATIONS);
// const [verifyUser] = useMutation(VERIFY_USER);
// const [unverifyUser] = useMutation(UNVERIFY_USER);
// const [deleteUser] = useMutation(DELETE_USER);

useEffect(()=>{
    getPendingVerifications();
},[])

useEffect(()=>{
  if(!searchFocus && pendingVerifications?.getPendingVerifications && !pendingLoading){
    setUserList(pendingVerifications.getPendingVerifications);
  }
  else if(searchFocus && findUserInfoData?.getUserInfo && !findUserInfoLoading){
    setUserList(findUserInfoData?.getUserInfo);
  }

},[pendingVerifications, pendingLoading, findUserInfoData, findUserInfoLoading, searchFocus]);


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
      refetchQueries:[GET_USER_INFO, GET_PENDING_VERIFICATIONS],
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
      refetchQueries:[GET_USER_INFO, GET_PENDING_VERIFICATIONS],
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

const handleDeleteUser = async(userId, role) =>{
 await deleteUser({
    variables:{
      userId,
      role
    },
    refetchQueries:[GET_USER_INFO, GET_PENDING_VERIFICATIONS],
    onCompleted:()=>{
      toast.success("User Deleted");
    },
    onError:(error)=>{
      toast.error("Something went wrong: " + error);
    }
  })
}

if(findUserInfoLoading){
  return(
    <div style={{position:"absolute", top:"50%", left:"50%"}}>
      <CircularLoading/>
    </div>
    
  )
}

return (
  <div>
    <StyledPaper elevation={3}>
        <Box sx={{ display:"flex", flexDirection:"row", textAlign: 'left', margin:"3em"}}>
        <Box sx={{flex:1}}>
            <Typography variant="h5" component="div" sx={{ fontWeight: 'bolder', color: '#494948' }}>
                User Management
            </Typography>
        </Box>
        <Box sx={{display:"flex", flex:1, flexDirection:"row"}}>
        <Button 
            variant="contained"
            onClick = {()=>{
            handleFindUserInfo();
            }}
            sx={{
            paddingInline:"1em",
            marginInline:"0.5em"
            }}
        >
            Search
        </Button>
        <SearchPanel>
        <SearchIcon
            color="action"
            style={{ marginInline: "5px", color: "#AEBAC6" }}
        />
            <InputBase  
            value={searchInput}
            onChange={(e)=>setSearchInput(e.target.value)}
            onFocus={()=>setSearchFocus(true)}
            onBlur={()=>{
                if(!searchInput){
                setSearchFocus(false)
                }
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search Username or Id"
            fullWidth
            style={{ paddingLeft: "8px", color: "#AEBAC6", height:"100%" }}
            />
            {searchInput && (
            <IconButton
                onClick={()=>{
                    setSearchInput("");
                    setSearchFocus(false);
                }}
            >
                <CloseIcon style={{fontSize:20}}/>
            </IconButton>
            )}
            
        </SearchPanel>
        
        </Box>
        </Box>
        {!searchFocus && (<Box style={{display:"flex", justifyContent:"start", marginBlock:"1em",marginLeft:"5em"}}>
            <Badge badgeContent={userList?.length ?? 0} color="primary">
            <Typography style={{textAlign:"left", fontWeight:"bolder", paddingRight:"0.5em"}} variant="h5">
                Pending Verification Requests
            </Typography>
            </Badge>
        </Box>)}
        {userList?.length > 0 && (
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
            maxHeight:'70vh',
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

            {userList && userList.map((user)=>{
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
                    <IconButton
                        onClick={()=>{
                        setIsModalOpen("verificationView");
                        setCurrentUser(user);
                        }}
                    >
                        <MoreVertIcon/>
                    </IconButton>
                    </TableCell>
                </StyledTableRow>
                )})}
                
            </TableBody>
            </Table>
        </TableContainer>)}
        </StyledPaper>
    {isModalOpen == "verificationView" && (
      <VerificationViewDialog 
      open={Boolean(isModalOpen)} 
      setOpen={setIsModalOpen} 
      user={currentUser} 
      handleVerifyUser={()=>handleVerifyUser(currentUser?._id)}
      handleUnverifyUser={()=>handleUnverifyUser(currentUser?._id)}
      handleDeleteUser={handleDeleteUser}
      />
    )}
  </div>
  
    );

}



