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
            src={product.userAvatar}
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
              {product.userName}
            </Typography>
            <Typography
              color="textSecondary"
              variant="body2"
              sx={{ fontWeight: "bolder", fontSize: '0.8rem' }}
            >
              {product.location}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Rating
                name="user-rating"
                value={product.rating}
                readOnly
                sx={{ color: "#2E603A", fontSize: "smaller" }}
              />
              <Typography
                variant="caption"
                sx={{ fontWeight: "bolder", marginLeft: 1 }}
              >
                {`${product.rating} (${product.ratingCount} ratings)`}
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
        image={product.img}
      />

      {/* Product details */}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="body1" align="right" sx={{ fontWeight: "bold" }}>
          ₱ {product.price}/kg
        </Typography>
        <Typography gutterBottom align="left" sx={{ fontWeight: "bolder" }}>
          {product.title}
        </Typography>
        <Typography align="left" sx={{}}>
          Stocks: {product.stock} kg
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
          href={`/Products/productOverviewBuy?productId=${product.id}`}
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
          href={`/Products/productOverview?productId=${product.id}`}
        >
          Add to Cart
        </Button>
      </Box>
    </Card>
  );
}

const productData = [
    {
      id: 1,
      title: "Apple | Mansanas",
      img: "https://images.pexels.com/photos/6097872/pexels-photo-6097872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      location: "Pagbilao, Quezon",
      price: 30.0,
      stock: 633,
      userName: "Juan Dela Cruz",
      userAvatar: "JD",
      rating: 4.7,
      ratingCount: 250
      },
      {
        id: 2,
        title: "Apple | Mansanas",
        img: "https://images.pexels.com/photos/6097872/pexels-photo-6097872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        location: "Gumaca, Quezon",
        price: 110.3,
        stock: 633,
        userName: "Stephanie Encomienda",
        userAvatar: "MC",
        rating: 4.7,
        ratingCount: 250
      },
      {
        id: 3,
        title: "Apple | Mansanas",
        img: "https://images.pexels.com/photos/6097872/pexels-photo-6097872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        location: "Tayabas, Quezon",
        price: 50.0,
        stock: 633,
        userName: "Juan Dela Cruz",
        userAvatar: "JD",
        rating: 4.7,
        ratingCount: 250
      },
      {
        id: 4,
        title: "Apple | Mansanas",
        img: "https://images.pexels.com/photos/6097872/pexels-photo-6097872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        location: "Gumaca, Quezon",
        price: 110.3,
        stock: 633,
        userName: "Maria Clara",
        userAvatar: "MC",
        rating: 4.7,
        ratingCount: 250
      },
      {
        id: 5,
        title: "Apple | Mansanas",
        img: "https://images.pexels.com/photos/6097872/pexels-photo-6097872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        location: "Mauban, Quezon",
        price: 70.0,
        stock: 633,
        userName: "Juan Dela Cruz",
        userAvatar: "JD",
        rating: 4.7,
        ratingCount: 250
      },
      {
        id: 6,
        title: "Apple | Mansanas",
        img: "https://images.pexels.com/photos/6097872/pexels-photo-6097872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        location: "Atimonan, Quezon",
        price: 100.0,
        stock: 633,
        userName: "Maria Clara",
        userAvatar: "MC",
        rating: 4.7,
        ratingCount: 250
      },
      {
        id: 7,
        title: "Apple | Mansanas",
        img: "https://images.pexels.com/photos/6097872/pexels-photo-6097872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        location: "Candelaria, Quezon",
        price: 40.5,
        stock: 633,
        userName: "Juan Dela Cruz",
        userAvatar: "JD",
        rating: 4.7,
        ratingCount: 250
      },
      {
        id: 8,
        title: "Apple | Mansanas",
        img: "https://images.pexels.com/photos/6097872/pexels-photo-6097872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        location: "Lopez, Quezon",
        price: 100.0,
        stock: 633,
        userName: "Maria Clara",
        userAvatar: "MC",
        rating: 4.7,
        ratingCount: 250
      },
      {
        id: 9,
        title: "Apple | Mansanas",
        img: "https://images.pexels.com/photos/6097872/pexels-photo-6097872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        location: "Pagbilao, Quezon",
        price: 90.7,
        stock: 633,
        userName: "Juan Dela Cruz",
        userAvatar: "JD",
        rating: 4.7,
        ratingCount: 250
      },
      {
        id: 10,
        title: "Apple | Mansanas",
        img: "https://images.pexels.com/photos/6097872/pexels-photo-6097872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        location: "Alabat, Quezon",
        price: 60.0,
        stock: 633,
        userName: "Maria Clara",
        userAvatar: "MC",
        rating: 4.7,
        ratingCount: 250
      },
      {
        id: 11,
        title: "Apple | Mansanas",
        img: "https://images.pexels.com/photos/6097872/pexels-photo-6097872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        location: "Calauag, Quezon",
        price: 112.0,
        stock: 633,
        userName: "Juan Dela Cruz",
        userAvatar: "JD",
        rating: 4.7,
        ratingCount: 250
      },
      {
        id: 12,
        title: "Apple | Mansanas",
        img: "https://images.pexels.com/photos/6097872/pexels-photo-6097872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        location: "Sariaya, Quezon",
        price: 90.0,
        stock: 633,
        userName: "Maria Clara",
        userAvatar: "MC",
        rating: 4.7,
        ratingCount: 250
      },
    ];

const OrderProductGrid = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "16px",
        marginTop: "20px",
      }}
    >
      {productData.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default OrderProductGrid;
