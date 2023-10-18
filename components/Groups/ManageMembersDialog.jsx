import {useState, useContext} from 'react';
import React from "react";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import SearchIcon from '@mui/icons-material/Search';    
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CheckIcon from '@mui/icons-material/Check';
import InfiniteScroll from 'react-infinite-scroll-component';
import {useQuery, useMutation} from "@apollo/client";
import toast from "react-hot-toast";
import VerifiedIcon from '@mui/icons-material/Verified';
import StarIcon from '@mui/icons-material/Star';
import {Waypoint} from "react-waypoint";
import Link from "@mui/material/Link";
import {useRouter} from "next/router";

import { AuthContext } from '../../context/auth';
import OptionsMenu from '../popups/OptionsMenu';
import CircularLoading from '../circularLoading';
import {GET_POOL_GROUP_APPLICATIONS, ACCEPT_JOIN_APPLICATION, DECLINE_JOIN_APPLICATION} from "../../graphql/operations/poolGroup";
import {formatWideAddress} from "../../util/addresssUtils";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));


  const ManagementListItemContainer = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    // marginInline:"3em",
    marginBlock:"1em",
    // marginLeft: "1.5rem",
    // marginBottom: "0.5rem",
  });


const ManageMembersDialog = ({...props}) =>{
    const {user} = useContext(AuthContext);
    const router = useRouter();
    const {
        isOpen, 
        setIsOpen, 
        isAdmin, 
        isCreator, 
        poolGroupId, 
        membershipAppData, 
        membershipAppLoading, 
        membershipAppError,
        fetchMoreData,
        hasMore,
        members,
    } = props;
    
    const [tabValue, setTabValue] = useState("1");

    const [acceptJoinApplication, {error:acceptJoinAppErr}] = useMutation(ACCEPT_JOIN_APPLICATION,{
        refetchQueries:[GET_POOL_GROUP_APPLICATIONS],
        onCompleted:(data)=>{
            toast.success(data?.acceptJoinApplication);
        },
        onError:(error)=>{
            toast.error(error.message);
        }
    });

    const [declineJoinApplication, {error:declineJoinAppErr}] = useMutation(DECLINE_JOIN_APPLICATION,{
        refetchQueries:[GET_POOL_GROUP_APPLICATIONS],
        onError:(error)=>{
            toast.error(error.message);
        }
    });

    const handleDeclineApplication = (poolGroupId, userId) =>{
        declineJoinApplication({
            variables:{
                poolGroupId,
                userId
            },
            onError:(error)=>{
                toast.error(error.message);
            }
        }).catch((error)=>{
            console.log(error)
        })
    }

    const handleClose = () =>{
        setIsOpen(false);
    }

    const memberManagementOptions = [
        {name:"Promote to Admin", function:()=>{}},
        {name:"Remove from group", function:()=>{}}
    ]
    

    return (
        <>
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={isOpen}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                {isAdmin?"Management":"Pool Group"}
            </DialogTitle>
            <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
            }}
            >
            <CloseIcon />
            </IconButton>
            <DialogContent dividers>
            <Box sx={{ width: '100%', typography: 'body1'}}>
                <TabContext value={tabValue}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList 
                        onChange={(event, newValue)=>{
                            setTabValue(newValue);
                        }} 
                        sx={{width:"30em"}}
                    >
                        <Tab label="Group Members" value="1" />
                        {isAdmin && (<Tab label="Membership Applications" value="2" />)}
                        
                    </TabList>
                    </Box>
                    {/* Manage Members */}
                    <TabPanel value="1">
                        <div style={{overflowY:"auto", maxHeight:"50vh", paddingInline:"1em"}}>
                        {members && members.map((member, index)=>(
                            <React.Fragment key={member._id}>
                                <Divider/>
                                <ManagementListItemContainer>
                                    <Box sx={{display:"flex",flexDirection:"row", gap:"1em", alignItems:"center", justifyContent:"center"}}>
                                    <Avatar src ={member?.profile_pic ?? ""} />
                                    <Box>
                                        <Link
                                        sx={{textDecoration:"none", cursor: 'pointer', color:"green"}} 
                                        onClick={()=>{
                                            if(member._id != user.id){
                                                router.push(`/Find/${member._id}`);
                                            }else{
                                                router.push('/myProfile');
                                            }
                                        }}>
                                            <Typography>{member?.username ?? ""}</Typography>
                                        </Link>
                                        <Typography variant="caption" sx={{color:"grey"}}>{formatWideAddress(member?.address ?? "")}</Typography>
                                    </Box>
                                    </Box>
                                    {/* <StyledCheckbox /> */}
                                    {isAdmin && (<OptionsMenu 
                                        triggerComponent={(handleClick)=>{
                                            return(
                                                <IconButton
                                                    onClick={(event)=>{
                                                        handleClick(event);
                                                    }}
                                                >
                                                    <MoreHoriz/>
                                                </IconButton>
                                            )
                                        }}
                                        itemAndFunc={memberManagementOptions}
                                    />)}
                                </ManagementListItemContainer>
                                <Divider/>
                                {index == members.length - 1 && (<Waypoint onEnter={()=>{fetchMoreData()}}/>)}
                            </React.Fragment>
                        ))}
                        </div>
                    </TabPanel>

                    <TabPanel value="2">
                        <div style={{overflowY:"auto", maxHeight:"40vh", paddingInline:"1em"}}>
                            {membershipAppLoading && (
                                <div style={{display:"flex", margin:"auto"}}>
                                    <CircularLoading/>
                                </div>
                            )}
                            {acceptJoinAppErr || declineJoinAppErr && (
                                 <Typography sx={{textAlign:"center", height:"100%", color:"red"}}>
                                    *An Error Occured while getting membership applications
                                </Typography>
                            ) }
                            {membershipAppData?.getPoolGroupApplications.length == 0 && (
                                <Typography sx={{textAlign:"center", height:"100%", color:"#d5d5d5"}}>
                                    No Applicants
                                </Typography>
                            )}
                            {membershipAppData && !membershipAppLoading && membershipAppData.getPoolGroupApplications.map((applicant)=>
                            <div key={applicant._id}>
                                <Divider/>
                                <ManagementListItemContainer>
                                    <Box sx={{display:"flex",flexDirection:"row", gap:"1em", alignItems:"center", justifyContent:"center"}}>
                                        <Box sx={{display:"flex", flexDirection:"column",alignItems:"center"}}>
                                            <Avatar src ={applicant?.profile_pic ?? ""} />
                                            <Box sx={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                                            <Typography variant="caption">{applicant?.rating ?? 0}</Typography>
                                            <StarIcon sx={{color:"yellow", fontSize:"1rem"}}/>
                                        </Box> 

                                        </Box>

                                    <Box>
                                        <Box sx={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                                            <Typography variant="body1" sx={{fontWeight:"bold"}}>{applicant?.username}</Typography>
                                            <VerifiedIcon sx={{fontSize:"1rem", color:"green"}}/>
                                        </Box>  
                                        <Typography variant="caption" sx={{color:"grey"}}>{formatWideAddress(applicant?.address)?? ""}</Typography>
                                    </Box>
                                    
                                    </Box>
                                    {/* <StyledCheckbox /> */}
                                <div>
                                        <IconButton 
                                            onClick={()=>{
                                                acceptJoinApplication({
                                                    variables:{
                                                        poolGroupId,
                                                        userId:applicant._id
                                                    }
                                                })
                                            }}
                                        >
                                            <CheckIcon sx={{color:"green"}}/>
                                        </IconButton>
                                        <IconButton
                                            onClick={()=>{
                                                handleDeclineApplication(poolGroupId, applicant._id);
                                            }}
                                        >
                                            <CloseIcon sx={{color:"red"}}/>
                                        </IconButton>
                                </div>

                                </ManagementListItemContainer>
                                <Divider/>
                            </div>)}
                        </div>
                    </TabPanel>
                                            
                 
                </TabContext>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose}>
                    Close
                </Button>
            </DialogActions>
        </BootstrapDialog>
        </>
    );

    

}

export default ManageMembersDialog;

