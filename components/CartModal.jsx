import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";
import NumberPicker from "react-widgets/NumberPicker";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "react-widgets/styles.css";
import { styled } from "@mui/system";

const productsData = [
  {
    img: "https://images.pexels.com/photos/6097872/pexels-photo-6097872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Product A",
    seller: "Seller A",
    type: "Delivery",
    price: "₱100",
  },
  {
    img: "https://images.pexels.com/photos/6097872/pexels-photo-6097872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Product B",
    seller: "Seller B",
    type: "Pick Up",
    price: "₱150",
  },
  {
    img: "https://images.pexels.com/photos/6097872/pexels-photo-6097872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Product C",
    seller: "Seller C",
    type: "Delivery",
    price: "₱200",
  },
  {
    img: "https://images.pexels.com/photos/6097872/pexels-photo-6097872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Product D",
    seller: "Seller D",
    type: "Pick Up",
    price: "₱250",
  },
  {
    img: "https://images.pexels.com/photos/6097872/pexels-photo-6097872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Product D",
    seller: "Seller D",
    type: "Pick Up",
    price: "₱250",
  },
  {
    img: "https://images.pexels.com/photos/6097872/pexels-photo-6097872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Product D",
    seller: "Seller D",
    type: "Pick Up",
    price: "₱250",
  },
  {
    img: "https://images.pexels.com/photos/6097872/pexels-photo-6097872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Product D",
    seller: "Seller D",
    type: "Pick Up",
    price: "₱250",
  },
  {
    img: "https://images.pexels.com/photos/6097872/pexels-photo-6097872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Product D",
    seller: "Seller D",
    type: "Pick Up",
    price: "₱250",
  },
  {
    img: "https://images.pexels.com/photos/6097872/pexels-photo-6097872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Product D",
    seller: "Seller D",
    type: "Pick Up",
    price: "₱250",
  },
];

const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
  "&.MuiCheckbox-colorSecondary.Mui-checked": {
    color: "#2E613B",
  },
}));

const CartModal = ({ open, handleClose }) => {
  const [products, setProducts] = useState(
    productsData.map((product) => ({
      ...product,
      checked: false,
    }))
  );

  const handleCheckChange = (index) => {
    const updatedProducts = [...products];
    updatedProducts[index].checked = !updatedProducts[index].checked;
    setProducts(updatedProducts);
  };

  const handleDelete = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const getTotalPrice = () => {
    return products.reduce((acc, product) => {
      if (product.checked) {
        const price = parseInt(product.price.replace("₱", ""));
        return acc + price;
      }
      return acc;
    }, 0);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="cart-modal-title"
      aria-describedby="cart-modal-description"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          maxHeight: "80vh",
          backgroundColor: "#F8F9F8",
          boxShadow: 24,
          borderRadius: 20,
          outline: "none",
          padding: "2rem",
        }}
      >
        <Typography
          id="cart-modal-title"
          variant="h6"
          component="h2"
          sx={{ fontWeight: "bolder" }}
        >
          My Cart
        </Typography>

        <TableContainer
          style={{ flex: 1, maxHeight: "60vh", overflowY: "auto" }}
        >
          <Table sx={{ minWidth: 300 }} aria-label="cart table">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox"></TableCell>
                <TableCell style={{ width: "50%" }}>Product</TableCell>
                <TableCell style={{ width: "20%" }}>Quantity</TableCell>
                <TableCell style={{ width: "15%" }}>Price</TableCell>
                <TableCell style={{ width: "15%" }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product, index) => (
                <TableRow key={index}>
                  <TableCell padding="checkbox">
                    <CustomCheckbox
                      color="secondary"
                      checked={product.checked}
                      onChange={() => handleCheckChange(index)}
                    />
                  </TableCell>
                  <TableCell>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Image
                        src={product.img}
                        alt="Product"
                        width={50}
                        height={50}
                        layout="fixed"
                      />
                      <div style={{ marginLeft: 10 }}>
                        <Typography
                          variant="body2"
                          color="textPrimary"
                          sx={{ marginLeft: 2 }}
                        >
                          {product.name}
                        </Typography>

                        <Accordion
                          sx={{
                            backgroundColor: "transparent",
                            boxShadow: "none",
                            "&:before": {
                              opacity: 0,
                            },
                          }}
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            sx={{
                              "&.Mui-expanded": {
                                minHeight: "inherit",
                              },
                            }}
                          >
                            <Typography
                              variant="body2"
                              style={{ fontSize: "0.8rem" }}
                            >
                              More Details
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails
                            sx={{ flexDirection: "column", paddingTop: 0 }}
                          >
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              sx={{ marginTop: 0 }}
                            >
                              Seller: {product.seller}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              sx={{ marginTop: 0 }}
                            >
                              Type: {product.type}
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <NumberPicker defaultValue={1} style={{ width: "80px" }} />
                  </TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDelete(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div
          style={{
            alignSelf: "flex-end",
            marginTop: "1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Typography variant="h6">Total: ₱{getTotalPrice()}</Typography>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "10px",
              marginTop: "1rem",
            }}
          >
            <div>
              <Button
                variant="outlined"
                style={{
                  borderColor: "#2F9C65",
                  color: "#2F9C65",
                  marginRight: "10px",
                }}
                onClick={handleClose}
              >
                Continue Shopping
              </Button>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#2F9C65",
                  color: "white",
                }}
                onClick={handleClose}
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CartModal;
