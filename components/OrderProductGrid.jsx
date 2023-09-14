import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Avatar,
  Box,
  Rating,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Link from "next/link";
import { GET_AVAILABLE_PRODUCTS, GET_SUGGESTED_PRODUCT} from "../graphql/operations/product";
import { useQuery } from "@apollo/client";
import { formatWideAddress } from "../util/addresssUtils";
import CircularLoading from "./circularLoading";

function ProductCard({ product }) {
  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: "12px",
        mb: 1,
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#FEFFFE",
      }}
    >
      {/* User details */}
      <Box sx={{ paddingLeft: 2, paddingTop: 2, paddingBottom: 1 }}>
        <Box sx={{ display: "flex", alignItems: 'center' }}>
          <Avatar
            src={product.photo}
            sx={{
              width: 48,
              height: 48,
            }}
          />
          <Box
            sx={{
              marginLeft: 1,
              display: "flex",
              flexDirection: "column",
              height: "fit-content",
              alignItems: "flex-start",
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: "bolder", fontSize: '0.9rem' }}>
              {product.seller.name}
            </Typography>
            <Typography
              color="textSecondary"
              variant="body2"
              sx={{ fontWeight: "bolder", fontSize: '0.8rem' }}
            >
              {formatWideAddress(product.seller.address)}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Rating
                name="user-rating"
                value={product.seller.rating}
                readOnly
                sx={{ color: "#2E603A", fontSize: "smaller" }}
              />
              <Typography
                variant="caption"
                sx={{ fontWeight: "bolder", marginLeft: 1 }}
              >
                {/* TO:DO FIX RATINGS */}
                {`(${product.seller.rating})`} 
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Image */}
      <CardMedia
        sx={{
          borderRadius: "10px",
          borderTop: "7px solid #FEFFFE",
          borderRight: "15px solid #FEFFFE",
          borderLeft: "15px solid #FEFFFE",
        }}
        component="img"
        alt={product.title}
        height="200"
        image={product.item.photo}
      />

      {/* Product details */}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="body1" align="right" sx={{ fontWeight: "bold" }}>
          ₱ {product.price}/{product.unit}
        </Typography>
        <Typography gutterBottom align="left" sx={{ fontWeight: "bolder" }}>
            {product.item.tagalogName ? (
                `${product.item.tagalogName} | ${product.item.englishName}`
              ) : (
                product.item.englishName
              )}        </Typography>
        <Typography align="left" sx={{}}>
          Stocks: {product.stocks} {product.unit}
        </Typography>
      </CardContent>

      {/* Buttons */}
      <Box
        sx={{ display: "flex", gap: "1px", fontSize: "1rem", height: "40px" }}
      >
        <Button
          variant="contained"
          style={{
            backgroundColor: "#ECEDEC",
            color: "#2C2D2D",
            flex: 1,
            fontSize: "0.7rem",
            borderBottomLeftRadius: "12px",
            margin: 0,
            borderRadius: 0,
          }}
          component={Link}
          href={`/Products/productOverview/${product._id}`}
        >
          Buy Now
        </Button>
        <Button
          variant="contained"
          endIcon={<AddShoppingCartIcon style={{ color: "#C9D5CA" }} />}
          style={{
            backgroundColor: "#2F603B",
            color: "#C9D5CA",
            flex: 1,
            fontSize: "0.7rem",
            borderBottomRightRadius: "12px",
            margin: 0,
            borderRadius: 0,
          }}
          component={Link}
          href={`/Products/productOverview/${product._id}`}
        >
          Add to Cart
        </Button>
      </Box>
    </Card>
  );
}


const OrderProductGrid = ({ ...props }) => {
  const {products} = props;
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '16px',
        marginTop: '20px',
      }}
    >
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default OrderProductGrid;
