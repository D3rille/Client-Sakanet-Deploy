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
  Typography,
  Divider,
  Box,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#F4F4F4",
}));

const StyledOrderIdCell = styled(StyledTableCell)({
  width: "20%",
});

const StyledTableRow = styled(TableRow)(({ theme }) => ({}));

export default function ForCompletionOrders() {
  const [orders, setOrders] = useState([
    {
      orderId: "006",
      product: "Oranges",
      buyer: "John Cruz",
      quantity: "50",
      total: "1,500",
      status: "Pending",
    },
    {
      orderId: "007",
      product: "Oranges",
      buyer: "John Cruz",
      quantity: "50",
      total: "1,500",
      status: "Pending",
    },
    {
      orderId: "008",
      product: "Oranges",
      buyer: "John Cruz",
      quantity: "50",
      total: "1,500",
      status: "Pending",
    },
    {
      orderId: "009",
      product: "Oranges",
      buyer: "John Cruz",
      quantity: "50",
      total: "1,500",
      status: "Pending",
    },
    {
      orderId: "010",
      product: "Oranges",
      buyer: "John Cruz",
      quantity: "50",
      total: "1,500",
      status: "Pending",
    },
    {
      orderId: "011",
      product: "Oranges",
      buyer: "John Cruz",
      quantity: "50",
      total: "1,500",
      status: "Pending",
    },
  ]);

  const handleOrderCompletion = (orderId) => {
    const updatedOrders = orders.filter((order) => order.orderId !== orderId);
    setOrders(updatedOrders);
  };

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
            <StyledOrderIdCell>Reference </StyledOrderIdCell>
            <StyledTableCell>Product</StyledTableCell>
            <StyledTableCell>Buyer</StyledTableCell>
            <StyledTableCell>Quantity (kg)</StyledTableCell>
            <StyledTableCell>Total</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order, index) => (
            <StyledTableRow key={index}>
              <TableCell>{order.orderId}</TableCell>
              <TableCell>{order.product}</TableCell>
              <TableCell>{order.buyer}</TableCell>
              <TableCell>{order.quantity}</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>₱{order.total}</TableCell>
              <TableCell>
                <div>
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
                    onClick={() => handleOrderCompletion(order.orderId)}
                  >
                    Completed
                  </Button>
                </div>
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}