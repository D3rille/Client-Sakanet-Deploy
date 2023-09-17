import React, { useState, useContext, useEffect } from "react";
import {
    Grid, Typography, Divider, Box, Tabs, Tab, Paper
} from "@mui/material";
import { styled } from '@mui/material/styles';
import PendingOrders from "../../components/Orders/PendingOrders";
import AcceptedOrders from "../../components/Orders/AcceptedOrders";
import ForCompletionOrders from "../../components/Orders/ForCompletionOrders";
import CompletedOrders from "../../components/Orders/CompletedOrders";
import { useQuery, useMutation} from "@apollo/client";
import { GET_ORDERS, UPDATE_STATUS, CANCEL_ORDER, DECLINE_ORDER } from "../../graphql/operations/order";
import { AuthContext } from '@/context/auth';
import CircularLoading from  "../../components/circularLoading";
import toast from 'react-hot-toast';

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
    const { user } = useContext(AuthContext);
    const [tabValue, setTabValue] = useState(0);

    const tabEquivalents = ["Pending", "Accepted", "For Completion", "Completed"];

    const {data, loading, error} = useQuery(GET_ORDERS,{
        variables:{
            "status":tabEquivalents[tabValue]
        },
        onError:(error)=>{
            console.log(error);
        }
    });


    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleAcceptOrder = () => {
        setTabValue(1);
    };


    const [updateStatus] = useMutation(UPDATE_STATUS, {
        refetchQueries:[GET_ORDERS],
        onError:(error)=>{
            toast.error(error.message);
            console.log(error);
        }
    });

    const [cancelOrder, {error:cancelOrderError}] = useMutation(CANCEL_ORDER, {
        refetchQueries:[GET_ORDERS],
        onCompleted:()=>{
            toast
        },
        onError:(cancelOrderError)=>{
            console.log(cancelOrderError);
        }
    });

    const [declineOrder, {error:declineOrderError}] = useMutation(DECLINE_ORDER, {
        refetchQueries:[GET_ORDERS],
        onError:(cancelOrderError)=>{
            console.log(cancelOrderError);
        }
    });
    // const ordersArr = data?.getOrders;
    // console.log(ordersArr);
    if(loading){return(<CircularLoading/>)};
    if(data){
        const ordersArr = data?.getOrders;
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
                    {loading && <CircularLoading/>}
                    {tabValue===0 && <PendingOrders role={user.role} ordersArr={ordersArr} updateStatus={updateStatus} cancelOrder={cancelOrder}declineOrder={declineOrder}/>}
                    {tabValue === 1 && <AcceptedOrders  role={user.role} ordersArr={ordersArr} updateStatus={updateStatus} />}
                    {tabValue === 2 && <ForCompletionOrders  role={user.role} ordersArr={ordersArr} updateStatus={updateStatus} />}
                    {tabValue === 3 && <CompletedOrders  role={user.role} ordersArr={ordersArr} updateStatus={updateStatus} />}
                </StyledPaper>
            </Grid>
        </StyledGrid>
    );
    }
    
}
