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
      orderId: "007",
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
      orderId: "007",
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
      orderId: "007",
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
  ]);

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
        maxHeight: "55vh",
        overflow: "auto",
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
              <TableCell>Completed</TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
