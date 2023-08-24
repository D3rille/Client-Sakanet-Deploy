import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import DeleteIcon from '@mui/icons-material/Delete';
import Image from 'next/image';
import NumberPicker from "react-widgets/NumberPicker";
import Button from '@mui/material/Button';
import 'react-widgets/styles.css';

const productsData = [
  { img: "https://images.pexels.com/photos/6097872/pexels-photo-6097872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", 
  name: 'Product A', 
  seller: 'Seller A', 
  type: 'Delivery', 
  price: '₱100' },
  { img: "https://images.pexels.com/photos/6097872/pexels-photo-6097872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", 
  name: 'Product B', 
  seller: 'Seller B', 
  type: 'Pick Up', 
  price: '₱150' },
  { img: "https://images.pexels.com/photos/6097872/pexels-photo-6097872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", 
  name: 'Product C', 
  seller: 'Seller C', 
  type: 'Delivery', 
  price: '₱200' },
  { img: "https://images.pexels.com/photos/6097872/pexels-photo-6097872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", 
  name: 'Product D', 
  seller: 'Seller D', 
  type: 'Pick Up', 
  price: '₱250' },
];

const CartModal = ({ open, handleClose }) => {
  const [products, setProducts] = useState(productsData);

  const handleDelete = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  }

  const getTotalPrice = () => {
    return products.reduce((acc, product) => {
      const price = parseInt(product.price.replace('₱', ''));
      return acc + price;
    }, 0);
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="cart-modal-title"
      aria-describedby="cart-modal-description"
    >
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        maxHeight: '80vh',
        overflowY: 'auto',
        backgroundColor: '#F8F9F8',
        boxShadow: 24,
        padding: 4,
        borderRadius: 20,
        outline: 'none',
      }}>
        <Typography id="cart-modal-title" variant="h6" component="h2">
          Cart
        </Typography>
        
        <TableContainer>
          <Table sx={{ minWidth: 300 }} aria-label="cart table">
            <TableHead>
              <TableRow>
                <TableCell style={{ width: '50%' }}>Description</TableCell>
                <TableCell style={{ width: '20%' }}>Quantity</TableCell>
                <TableCell style={{ width: '15%' }}>Remove</TableCell>
                <TableCell style={{ width: '15%' }}>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Image src={product.img} alt="Product" width={50} height={50} layout="fixed" />
                      <div style={{ marginLeft: 10 }}>
                        <Typography variant="body2" color="textPrimary">
                          {product.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {product.seller}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {product.type}
                        </Typography>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <NumberPicker defaultValue={1} style={{ width: '80px' }} />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDelete(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>{product.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '10px', marginBottom:'1rem', marginTop:'2rem', marginRight:'2rem' }}>
          <Typography variant="h6">Total: ₱{getTotalPrice()}</Typography>
          <Button variant="contained" style={{ backgroundColor: '#2F603B', borderRadius: '10px', width: '150px' }}>Place Order</Button>
        </div>
      </div>
    </Modal>
  );
}

export default CartModal;
