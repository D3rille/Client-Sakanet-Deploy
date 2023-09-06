import React, { useState } from "react";
import {
    Grid, Typography, Divider, Box, Tabs, Tab, Paper
} from "@mui/material";
import { styled } from '@mui/material/styles';
import PendingOrders from "../../components/Orders/PendingOrders";
import AcceptedOrders from "../../components/Orders/AcceptedOrders";
import ForCompletionOrders from "../../components/Orders/ForCompletionOrders";
import CompletedOrders from "../../components/Orders/CompletedOrders";

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
    marginTop: '6.5rem',
    borderRadius: '20px',
    overflow: 'hidden',
    minHeight: '100vh'
});

export default function Orders() {
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleAcceptOrder = () => {
        setTabValue(1);
    };

    return (
        <StyledGrid container>
            <Grid item xs={12}>
                <StyledPaper elevation={3}>
                    <Box sx={{ textAlign: 'left', mt: 6, marginLeft: '5rem', marginRight: 'auto' }}>
                        <Typography variant="h5" component="div" sx={{ fontWeight: 'bolder', color: '#494948' }}>
                            Order Transactions
                        </Typography>
                        <Divider sx={{ width: '30%', mt: 1, mb: 2, height: '3px', backgroundColor: '#2E603A' }} />
                    </Box>
                    <Box sx={{ mt: 2, mb: 2 }}>
                        <Tabs 
                            value={tabValue} 
                            onChange={handleTabChange} 
                            centered 
                            textColor="inherit"
                            TabIndicatorProps={{style: {backgroundColor:"#2E613B"}}}
                        >
                            <Tab label="Pending" sx={{ color: tabValue === 0 ? '#2E613B' : "inherit" }} />
                            <Tab label="Accepted" sx={{ marginLeft:'8rem',color: tabValue === 1 ? '#2E613B' : "inherit" }} />
                            <Tab label="For Completion" sx={{ marginLeft:'8rem', color: tabValue === 2 ? '#2E613B' : "inherit" }} />
                            <Tab label="Completed" sx={{ marginLeft:'8rem', color: tabValue === 3 ? '#2E613B' : "inherit" }} />
                        </Tabs>
                    </Box>
                    {tabValue === 0 && <PendingOrders onAccept={handleAcceptOrder} />}
                    {tabValue === 1 && <AcceptedOrders />}
                    {tabValue === 2 && <ForCompletionOrders />}
                    {tabValue === 3 && <CompletedOrders />}
                </StyledPaper>
            </Grid>
        </StyledGrid>
    );
}
