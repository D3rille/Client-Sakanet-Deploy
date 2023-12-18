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


export default function SalesReportTable({data, timeInterval}){
    const months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    function setDate(data){
        let setDate;
        if(timeInterval == "daily"){
            setDate = `${data._id.year} - ${data._id.month} - ${data._id.day}`;
        } else if(timeInterval == 'weekly'){
            setDate = `${data.startOfWeek} to ${data.endOfWeek}`
        } else if(timeInterval == "monthly"){
            setDate = `${months[data._id.month]} - ${data._id.year}`
        } else if(timeInterval == "annual"){
            setDate = data._id.year
        }

        return setDate
    }
    
    return (
        <TableContainer component={Paper} sx={{marginTop:"1em", maxHeight:"50em"}}>
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Product Id</StyledTableCell>
                <StyledTableCell >Product Name</StyledTableCell>
                <StyledTableCell >Date</StyledTableCell>
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
                    {row._id.productId}
                  </TableCell>
                  <TableCell >{row._id.marketProductName}</TableCell>
                  <TableCell >{setDate(row)}</TableCell>
                  <TableCell >{`${row.totalQuantity} ${row.unit}`}</TableCell>
                  <TableCell >{formatToCurrency(row.totalValue, 2)}</TableCell> 
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    );
}