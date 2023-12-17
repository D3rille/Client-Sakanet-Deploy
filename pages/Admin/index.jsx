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
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {useRouter} from "next/router";
import { styled } from "@mui/system";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useMutation} from "@apollo/client";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PriceChangeIcon from '@mui/icons-material/PriceChange';


import client from "../../graphql/apollo-client";
import { AuthContext } from '../../context/auth';
import { VERIFY_USER, UNVERIFY_USER, DELETE_USER } from "../../graphql/operations/admin";
import UserManagement from "../../components/Admin/userManagement";
import FarmGatePrices from "../../components/Admin/farmGatePrices";

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

function TopBar() {
  const { user, logout } = useContext(AuthContext);

  return(
    <Box sx={{ flexGrow: 1 }}>
      <Head>
          <title>Admin</title>
          <meta name="description" content="Admin page" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
      </Head>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Admin
        </Typography>
        <Button 
        onClick={()=>{
            logout();
            client.clearStore();
        }}
        color="inherit"
        >Logout</Button>
      </Toolbar>
    </AppBar>
  </Box>
);
}

export default function AdminPage() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (user.role !== 'ADMIN') {
      router.push('/404');
    }
  }, [user]);

  return user.role === 'ADMIN' ? <Admin /> : null;
}


function Admin(){
  const [tabIndex, setTabIndex] = useState(0);

  const [verifyUser] = useMutation(VERIFY_USER);
  const [unverifyUser] = useMutation(UNVERIFY_USER);
  const [deleteUser] = useMutation(DELETE_USER);

  const handleTabIndex = (event, newValue) =>{
    setTabIndex(newValue)
  }

  return (
    <div>
      <div>
        <TopBar/>
      </div>
      <StyledGrid container>
        <Grid xs={2}>
            <StyledPaper elevation={3} style={{padding:"1em"}}>
              <Tabs
                orientation="vertical"
                value={tabIndex}
                onChange={handleTabIndex}
                aria-label="Vertical tabs"
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                TabIndicatorProps={{ style: { backgroundColor: '#2E603A', } }}
            >
                <StyledTab 
                    icon={<ManageAccountsIcon />} 
                    label={
                        <div>
                          <h3>User Management</h3>
                            <div style={{ fontSize: '0.8em', color: 'grey' }}>
                                Find and manage user accounts
                            </div>
                        </div>
                    } 
                />
                <StyledTab 
                    icon={<PriceChangeIcon />} 
                    label={
                        <div>
                            <h3>Farm-gate Prices</h3>
                            <div style={{ fontSize: '0.8em', color: 'grey' }}>
                                Update suggested farm-gate prices.
                            </div>
                        </div>
                    } 
                />
            </Tabs>
          </StyledPaper>
        </Grid>

        <Grid item xs={10}>
          {tabIndex == 0 && (
            <UserManagement
            verifyUser={verifyUser}
            unverifyUser={unverifyUser}
            deleteUser={deleteUser}
            />
          )}
          {tabIndex == 1 && (
            <FarmGatePrices
            
            />
          )}
        </Grid>
      </StyledGrid>
    </div>
    
  );
}



