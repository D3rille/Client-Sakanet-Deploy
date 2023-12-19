import * as React from 'react';
import { useState, useContext, useEffect } from "react";
import Table from '@mui/material/Table';
import { styled } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import { Typography, Avatar, IconButton } from '@mui/material';
import { useMutation } from "@apollo/client";
import {
  GET_MY_PRODUCTS,
  SEARCH_MY_PRODUCTS,
  DELETE_PRODUCT,
} from "../../graphql/operations/product";

import { formatToCurrency } from '../../util/currencyFormatter';
import { formatDate, timePassed } from '../../util/dateUtils';
import TriggeredDialog from "../../components/popups/confirmationDialog";
import EditProductModal from "../../components/FarmerSide/EditProductModal";
import CustomDialog from "../../components/popups/customDialog";

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


export default function ProductListView({data, productStatus, selectedCategory, currentPage }){
    const [openOptions, setOpenOptions] = useState("");
    const [deleteProduct] = useMutation(DELETE_PRODUCT);
    const [subjectProd, setSubjectProd] = useState();

    const handleDeleteProduct = (product) => {
      deleteProduct({
        variables: {
          productId: product._id,
        },
        refetchQueries: [GET_MY_PRODUCTS],
      });
    };

    const moreDetails = (handleClickOpen) => {
      return (
        <IconButton
          onClick={() => {
            handleClickOpen();
          }}
          style={{ color: "#2E603A" }}
        >
          <InfoIcon/>
        </IconButton>
      );
    };

    const details = (product) => {
      return (
        <>
          <Typography align="left">Product Id: {product._id}</Typography>
          {product.product_description && (
            <Typography align="left" paragraph>
              Product Description:
              {product.product_description}
            </Typography>
          )}
          <Typography align="left">
            Product Type: {product.item.product_type}
          </Typography>
          <Typography align="left">
            Minimum_Order: {product.minimum_order}
          </Typography>
          <Typography align="left">Area Limit: {product.area_limit}</Typography>
          <Typography align="left">
            Created: {timePassed(product.createdAt)}
          </Typography>
        </>
      );
    };
    
    return (
      <div>
        <TableContainer component={Paper} sx={{marginTop:"1em", maxHeight:"50em"}}>
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Photo</StyledTableCell>
                <StyledTableCell >Product Name</StyledTableCell>
                <StyledTableCell >Price</StyledTableCell>
                <StyledTableCell >Available Stocks</StyledTableCell>
                <StyledTableCell >Mode of Delivery</StyledTableCell>
                
                <StyledTableCell >Closing Date</StyledTableCell>
                <StyledTableCell ></StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {data.map((product, index) => (
                <StyledTableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">
                    <Avatar src={product.photo ? product.photo : product.item.photo} sx={{width:60, height:60}} />
                    </TableCell>
                    <TableCell >
                    {product.item.tagalogName && <>{product.item.tagalogName} | </>}
                    {product.item.englishName}
                    </TableCell>
                    <TableCell >{formatToCurrency(product.price)}</TableCell>
                    <TableCell >{product.stocks} {product.unit}</TableCell>
                    <TableCell >{product.modeOfDelivery}</TableCell>
                    <TableCell >{formatDate(product.until, "ll")}</TableCell>
                    <TableCell >
                      <div style={{display:"flex", flexDirection:"row"}}>
                        <IconButton
                          onClick={()=>{
                            setSubjectProd(product);
                            setOpenOptions('edit');
                          }}
                        >
                          <EditIcon/>
                        </IconButton>
                        <IconButton
                          onClick={()=>{
                            setSubjectProd(product);
                            setOpenOptions('delete');
                          }}
                        >
                          <DeleteIcon/>
                        </IconButton>
                        <TriggeredDialog
                          triggerComponent={moreDetails}
                          message={details(product)}
                          title={"More Product Details"}
                          btnDisplay={0}
                        />
                      </div>
                    </TableCell> 
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {openOptions == "edit" && (
          <EditProductModal
            isOpen={Boolean(openOptions)}
            onClose={() => {
              setOpenOptions("");
            }}
            data={subjectProd}
            productStatus={productStatus}
            currentPage={currentPage}
            selectedCategory={selectedCategory}
          />
        )}
        {openOptions == "delete" && (
          <CustomDialog
            openDialog={Boolean(openOptions)}
            setOpenDialog={setOpenOptions}
            title={"Delete Product"}
            message={
              "Delete product? This will no longer be visible to buyers and your product list. Proceed?"
            }
            btnDisplay={0}
            callback={() => {
              handleDeleteProduct(subjectProd);
              setOpenOptions("");
            }}
          />
        )}

      </div>
    );
}