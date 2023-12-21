import React, { useState, useContext } from "react";
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
import {timePassed, formatDate} from "../../util/dateUtils";
import { Waypoint } from "react-waypoint";
import { AuthContext } from "../../context/auth";

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

export default function CompletedOrders({...props}) {
  const {user} = useContext(AuthContext);
  const {orders, role, handleGetMoreOrders}=props;

  const orderDetails=(order)=>{
    
    return(
      <>
        <Typography align="left">
          {`Placed: ${timePassed(order?.createdAt)}`}
        </Typography>
        <Typography align="left">
          {`Order Id: ${order?._id}`}
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
        {order?.accomplishedAt && (<Typography align="left">
          {`Accomplished: ${formatDate(order?.accomplishedAt, "llll")}`}
        </Typography>)}
      </>


      );
         
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
        maxHeight:'65vh',
        overflow: "auto"
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <StyledOrderIdCell> Type </StyledOrderIdCell>
            <StyledOrderIdCell>{user.role == "FARMER" ? "Buyer" : "Seller"}</StyledOrderIdCell>
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
            <React.Fragment key={index}>
              <StyledTableRow >
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
                <TableCell>{user.role=="FARMER" ? order.buyer.name : order.seller.name}</TableCell>
                <TableCell>{order.marketProductName}</TableCell>
                {/* <TableCell>{role=="FARMER"?order.buyer.name:order.seller.name}</TableCell> */}
                <TableCell>{order.quantity} {order.unit}</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>₱{order.totalPrice}</TableCell>
                <TableCell>
                  <div>
                    <Typography>
                      Completed
                    </Typography>
                    
                  </div>
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
             {index == orders.length - 1 && (<Waypoint onEnter={()=>{handleGetMoreOrders()}}/>)}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
