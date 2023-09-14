import React, { useState } from "react";
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
} from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from "@mui/system";
import TriggeredDialog from "../popups/confirmationDialog";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import {useRouter} from "next/router";
import {timePassed} from "../../util/dateUtils";

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

export default function PendingOrders({...props}) {
  const router = useRouter();
  const {ordersArr, role, updateStatus, cancelOrder, declineOrder}=props;
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

  const cancelBtn=(handleClickOpen)=>{
    return(
      <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
         <Typography>
          Pending...
        </Typography>
        <IconButton
          onClick={()=>{
            handleClickOpen()
        }}
        sx={{fontSize:"1rem", color:"red"}}
        >
          <CloseIcon />
        </IconButton>
      </div>

    );
  }
  const cancelPrompt = () =>{
    return "Are you sure you want to cancel order?";
    // return(
    //   <Typography>
    //     Are you sure you want to cancel order?
    //   </Typography>
    // );
   
  }

  const DeclineDialog=({orderId})=>{

    const [open, setOpen] = useState(false);
    const [reason, setReason] = useState("Problem with the Product.");

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
    <div>
        {/* {triggerComponent && triggerComponent(handleClickOpen)} */}
        <Button
          variant="contained"
          size="small"
          sx={{
            borderRadius: "20px",
            backgroundColor: "red",
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
          onClick={() => handleClickOpen()}
        >
          Decline
        </Button>
        {open && <Dialog
        fullWidth
        maxWidth={"xs"}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Decline Order
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
          <DialogContentText>
            Please Indicate a reason for declining order.
          </DialogContentText>
            <TextField
              value={reason}
              onChange={(e)=>{
                e.preventDefault();
                setReason(e.target.value)}}
              label="Reason"
              variant="standard"
              multiline
              fullWidth
            />

        </DialogContent>
        <DialogActions>     
          <Button autoFocus onClick={()=>{
            declineOrder({
              variables:{
                "orderId":orderId,
                "reason":reason
              }
            });
            router.reload();
          }} variant="contained" color="error">
              Decline
          </Button>
          <Button autoFocus onClick={handleClose} variant="outlined" color="error">
              Cancel
          </Button>
        </DialogActions>
        </Dialog>}
    </div>
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
                <div>
                  {role =="FARMER"? (
                    <>
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
                        width: "75px",
                        height: "20px",
                        fontSize: "0.6rem",
                      }}
                      onClick={() => {
                        updateStatus({
                          variables:{
                            "orderId":order._id
                          }
                        });
                        router.reload();
                      }}
                    >
                      Accept
                    </Button>
                    <DeclineDialog orderId={order._id}/>
                    {/* <Button
                      variant="contained"
                      size="small"
                      sx={{
                        borderRadius: "20px",
                        backgroundColor: "red",
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
                      onClick={() => handleAcceptOrder(order._id)}
                    >
                      Decline
                    </Button> */}
                    </>
                  ):(
                    <>
                      <TriggeredDialog
                      triggerComponent={cancelBtn}
                      title={"Order Cancelation"}
                      message={cancelPrompt()}
                      btnDisplay={0}
                      callback={()=>{
                        cancelOrder({
                          variables:{
                            "orderId":order._id
                          }
                        });
                        router.reload();
                      }}
                      />
                    </>
                    
                  )}
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
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
