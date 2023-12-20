import * as React from 'react';
import Table from '@mui/material/Table';
import { styled } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { formatToCurrency } from '../../util/currencyFormatter';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#2F603B',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
'&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
},
// hide last border
'&:last-child td, &:last-child th': {
    border: 0,
},
}));


export default function SalesOrOrdersTable({data, timeInterval}){
    const months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    function setDate(item){
        let setDate;
        if(timeInterval == "daily" ){
            setDate = `${item._id.year} - ${item._id.month} - ${item._id.day}`;
        } else if(timeInterval == "weekly"){
            setDate = `${item._id.year} - Week ${item._id.week}`;
        } else if(timeInterval == "monthly"){
            setDate = `${months[item._id.month]} ${item._id.year}`;
        } else if(timeInterval == "annual"){
            setDate = item._id.year;
        }

        return setDate
    }
    
    return (
        <TableContainer component={Paper} sx={{
            marginTop:"1em", 
            maxHeight:"22em", 
            overflow: "auto",
            '&::-webkit-scrollbar': {
            width: '6px', // Change the width of the scrollbar as per your requirement
            },
            '&::-webkit-scrollbar-thumb': {
                borderRadius: '6px', // Round the corners of the thumb
            },
        }}>
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell >No. of Orders</StyledTableCell>
                <StyledTableCell >Total Qty</StyledTableCell>
                <StyledTableCell >Total Sales</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <StyledTableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {setDate(row)}
                  </TableCell>
                  <TableCell >{row.numOfOrders}</TableCell>
                  <TableCell >{`${row.totalQuantity} ${row.unit}`}</TableCell>
                  <TableCell >{formatToCurrency(row.totalSales, 2)}</TableCell> 
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    );
}