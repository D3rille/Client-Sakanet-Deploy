import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

function ProductCard({ product }) {
  return (
    <Card
      sx={{
        width: "100%",
        height: "350px",
        borderRadius: "12px",
        mb: 1,
        boxShadow: 3,
      }}
    >
      <CardMedia
        sx={{ borderRadius: "10px" }}
        component="img"
        alt={product.title}
        height="200"
        image={product.img}
      />
      <CardContent>
        <Typography
          variant="body1"
          align="right"
          sx={{ flexGrow: 1, fontWeight: "bold" }}
        >
          ₱ {product.price}/kg
        </Typography>
        <Typography
          gutterBottom
          align="left"
          sx={{ fontSize: "1.1rem", fontWeight: "bolder" }}
        >
          {product.title}
        </Typography>
        <Typography
          color="textSecondary"
          gutterBottom
          align="left"
          sx={{ fontSize: "0.8rem" }}
        >
          {product.location}
        </Typography>
      </CardContent>
      <div style={{ display: "flex", width: "100%" }}>
        <Typography
          style={{
            backgroundColor: "#ECEDEC",
            padding: "10px",
            color: "#2C2D2D",
            borderBottomLeftRadius: "12px",
            width: "50%",
            fontSize: "0.8rem",
            margin: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Stocks: {product.stock} kg
        </Typography>
        <Button
          variant="contained"
          endIcon={<AddShoppingCartIcon style={{ color: "#C9D5CA" }} />}
          style={{
            backgroundColor: "#2F603B",
            color: "#C9D5CA",
            width: "50%",
            fontSize: "0.7rem",
            borderBottomRightRadius: "12px",
            margin: 0,
            borderRadius: 0,
          }}
        >
          Add to Cart
        </Button>
      </div>
    </Card>
  );
}

export default ProductCard;
