import React, { useState } from "react";
import {
  Grid,
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
} from "@mui/material";
import { styled } from "@mui/system";
import TriggeredDialog from "../popups/confirmationDialog";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {timePassed} from "../../util/dateUtils";
import {useRouter} from "next/router";

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

export default function ForCompletionOrders({...props}) {
  const router = useRouter();
  const {ordersArr, role, updateStatus}=props;
  const [orders, setOrders] = useState(ordersArr);

  const handleAcceptOrder = (orderId) => {
    const updatedOrders = orders.filter((order) => order.orderId !== orderId);
    setOrders(updatedOrders);
  };

  const orderDetails=(order)=>{
    
    return(
      <>
        <Typography align="left">
          {`Placed: ${timePassed(order?.createdAt)}`}
        </Typography>
        <Typography align="left">
          {`Product Id: ${order?.productId}`}
        </Typography>
        {role=="FARMER"?(
          <Typography align="left">
            {`Buyer: ${order?.buyer.name}`}
          </Typography>
        ):(
          <Typography align="left">
            {`Seller: ${order?.seller.name}`}
          </Typography>
        )}
        <Typography align="left">
          {`Mode of Payment: ${order?.modeOfPayment}`}
        </Typography>
        <Typography align="left">
          {`Type: ${order?.type}`}
        </Typography>
      </>


      );
         
  }
  const forCompletionBtn = (order) =>{
    if(role=="FARMER"){
      if(order.sellerResponse=="completed"){
        return(
          <Typography>
            Waiting...
          </Typography>
        )
      } else{
        return (<Button
          variant="contained"
          size="small"
          sx={{
            borderRadius: "20px",
            backgroundColor: "#2E603A",
            color: "#FFF",
            mr: 1,
            alignItems: "center",
            "&:hover": {
              backgroundColor: "#FE8C47",
            },
            width: "75px",
            height: "20px",
            fontSize: "0.6rem",
          }}
          onClick={() =>{
            updateStatus({
              variables:{
                "orderId":order._id
              }
            });
            router.reload()
          }}
        >
          Completed
        </Button>)
      }
    } else{
      if(order.buyerResponse=="completed"){
        return(
          <Typography>
            Waiting...
          </Typography>
        )
      } else{
        return(
          <Button
            variant="contained"
            size="small"
            sx={{
              borderRadius: "20px",
              backgroundColor: "#2E603A",
              color: "#FFF",
              mr: 1,
              alignItems: "center",
              "&:hover": {
                backgroundColor: "#FE8C47",
              },
              width: "auto",
              height: "20px",
              fontSize: "0.6rem",
            }}
            onClick={() => {
              updateStatus({
                variables:{
                  "orderId":order._id
                }
              });
              router.reload()
            }}
          >
            Order Received
          </Button>
        );
      }
    }
    // {role =="FARMER"? (<Button
    //   variant="contained"
    //   size="small"
    //   sx={{
    //     borderRadius: "20px",
    //     backgroundColor: "#2E603A",
    //     color: "#FFF",
    //     mr: 1,
    //     alignItems: "center",
    //     "&:hover": {
    //       backgroundColor: "#FE8C47",
    //     },
    //     width: "75px",
    //     height: "20px",
    //     fontSize: "0.6rem",
    //   }}
    //   onClick={() => handleAcceptOrder(order._id)}
    // >
    //   Accept
    // </Button>):(
    //   <Typography>
    //     Pending...
    //   </Typography>
    // )}
  }

  return (
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
            <StyledOrderIdCell> Type </StyledOrderIdCell>
            <StyledOrderIdCell>Order Id </StyledOrderIdCell>
            <StyledTableCell>Product</StyledTableCell>
            {/* <StyledTableCell>{role=="FARMER"?"Buyer":"Seller"}</StyledTableCell> */}
            <StyledTableCell>Quantity</StyledTableCell>
            <StyledTableCell>Total</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order, index) => (
            <StyledTableRow key={index}>
              <TableCell>
                {order.type == "Pre-Order"?(
                  <Box
                  sx={{
                    backgroundColor: "#FE8C47",
                    borderRadius: "8px",
                    width: "fit-content",
                    padding: "2px 8px",
                    fontSize: "0.7rem",
                    
                    color: "white",
                  }}
                  >
                    PRE-ORDER
                  </Box>
                ):(
                  <Box
                  sx={{
                    backgroundColor: "#2F603B",
                    borderRadius: "8px",
                    width: "fit-content",
                    padding: "2px 8px",
                    fontSize: "0.7rem",
                    
                    color: "white",
                  }}
                  >
                    ORDER
                  </Box>
                )}
              </TableCell>
              <TableCell>{order._id}</TableCell>
              <TableCell>{order.marketProductName}</TableCell>
              {/* <TableCell>{role=="FARMER"?order.buyer.name:order.seller.name}</TableCell> */}
              <TableCell>{order.quantity}</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>₱{order.totalPrice}</TableCell>
              <TableCell>
                  {forCompletionBtn(order)}
              </TableCell>
              <TableCell>
                  <TriggeredDialog
                  triggerComponent={More}
                  title={"Order Details"}
                  message={orderDetails(order)}
                  btnDisplay={0}
                  />
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
