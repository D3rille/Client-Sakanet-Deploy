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

    const {data, loading, error, fetchMore:fetchMoreOrders} = useQuery(GET_ORDERS,{
        variables:{
            status:tabEquivalents[tabValue],
            limit: 10,
            cursor:null
        },
        onCompleted:(data)=>{
          console.log(data)
        },
        onError:(error)=>{
            console.log(error);
        }
    });

    const handleGetMoreOrders = () =>{
      if(data?.getOrders?.hasNextPage){
        fetchMoreOrders({
          variables:{
            status:tabEquivalents[tabValue],
            limit:10,
            cursor:data?.getOrders?.endCursor
          },
          onError:(error)=>{
            toast.error(error.message)
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev;
            return Object.assign({}, prev, {
              getOrders: {
                ...prev.getOrders,
                endCursor:fetchMoreResult?.getOrders?.endCursor,
                hasNextPage: fetchMoreResult?.getOrders?.hasNextPage,
                orders:[...prev?.getOrders?.orders, ...fetchMoreResult?.getOrders?.orders],
              }
            });
            
          },
        })
      }
    }

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const [updateStatus] = useMutation(UPDATE_STATUS, {
        onError:(error)=>{
            toast.error(error.message);
            console.log(error);
        }
    });

    const handleUpdateStatus = async (orderId, currentStatus, nextStatus) => {
        try {
          await updateStatus({
            variables: {orderId},
            refetchQueries:[GET_ORDERS],
          });
        } catch (error) {
          console.error('Error updating status:', error);
        }
      };
    
    const [cancelOrder, {error:cancelOrderError}] = useMutation(CANCEL_ORDER, {
        onError:(cancelOrderError)=>{
            console.log(cancelOrderError);
        }
    });

    const handleCancelOrder = async (orderId) => {
        try {
          await cancelOrder({
            variables: { orderId },
            update: (cache) => {
              // Check if the query result exists in the cache
              const existingData = cache.readQuery({ query: GET_ORDERS});
              if (!existingData || !existingData.getOrders) {
                return;
              }
      
              // Fetch the existing data from the cache
              const { getOrders } = existingData;
      
              // Remove the canceled order from the cache
              const updatedOrders = getOrders.orders.filter((order) => order?._id !== orderId);
      
              // Write the updated data back to the cache
              cache.writeQuery({
                query: GET_ORDERS,
                data: {
                  getOrders: {
                    ...getOrders,
                    orders:updatedOrders
                  },
                },
              });
            },
          });
        } catch (error) {
          // Handle any errors
          console.log(error);
        }
    };

    const [declineOrder, {error:declineOrderError}] = useMutation(DECLINE_ORDER, {
        refetchQueries:[GET_ORDERS],
        onError:(declineOrderError)=>{
            console.log(cancelOrderError);
        }
    });

    const handleDeclineOrder = async (orderId, reason) => {
        try {
          await declineOrder({
            variables: { orderId, reason },
            update: (cache) => {
              // Check if the query result exists in the cache
              const existingData = cache.readQuery({ query: GET_ORDERS});
              if (!existingData || !existingData.getOrders) {
                return;
              }
      
              // Fetch the existing data from the cache
              const { getOrders } = existingData;
      
              // Remove the canceled order from the cache
              const updatedOrders = getOrders.orders.filter((order) => order?._id !== orderId);
      
              // Write the updated data back to the cache
              cache.writeQuery({
                query: GET_ORDERS,
                data: {
                  getOrders: {
                    ...getOrders,
                    orders:updatedOrders
                  },
                },
              });
            },
          });
        } catch (error) {
          // Handle any errors
          console.log(error);
        }
    };
    
    if(loading){return(<CircularLoading/>)};
    if(data){
        const ordersArr = data?.getOrders?.orders;
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
                    {tabValue===0 && 
                      <PendingOrders 
                        role={user.role} 
                        orders={ordersArr} 
                        handleUpdateStatus={handleUpdateStatus} 
                        handleCancelOrder={handleCancelOrder} 
                        handleDeclineOrder={handleDeclineOrder}
                        handleGetMoreOrders={handleGetMoreOrders}
                      />
                    }
                    {tabValue === 1 && 
                      <AcceptedOrders  
                        role={user.role} 
                        orders={ordersArr} 
                        handleUpdateStatus={handleUpdateStatus} 
                        handleGetMoreOrders={handleGetMoreOrders}
                      />
                    }
                    {tabValue === 2 && 
                      <ForCompletionOrders  
                        role={user.role} 
                        orders={ordersArr} 
                        handleUpdateStatus={handleUpdateStatus} 
                        handleGetMoreOrders={handleGetMoreOrders}
                      />
                    }
                    {tabValue === 3 && 
                      <CompletedOrders  
                        role={user.role} 
                        orders={ordersArr} 
                        updateStatus={updateStatus} 
                        handleGetMoreOrders={handleGetMoreOrders}
                      />
                    }
                </StyledPaper>
            </Grid>
        </StyledGrid>
    );
    }
    
}
