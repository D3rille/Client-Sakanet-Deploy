import { useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Card,
  CardContent,
  CardMedia,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styles from "../../styles/products.module.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Pagination from "@mui/material/Pagination";
import ProductsToggleButton from "../../components/ProductsToggleButton";

const productData = [
  {
    id: 1,
    title: "Apple | Mansanas",
    img: "https://images.pexels.com/photos/6097872/pexels-photo-6097872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    location: "Pagbilao, Quezon",
    price: 30.0,
    stock: 633,
  },
  {
    id: 2,
    title: "Banana | Saging",
    img: "https://images.pexels.com/photos/2134272/pexels-photo-2134272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    location: "Lucban, Quezon",
    price: 103.0,
    stock: 633,
  },
  {
    id: 3,
    title: "Cabbage | Repolyo",
    img: "https://images.pexels.com/photos/12324985/pexels-photo-12324985.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    location: "Tayabas, Quezon",
    price: 50.0,
    stock: 633,
  },
  {
    id: 4,
    title: "Carrots",
    img: "https://images.pexels.com/photos/73640/pexels-photo-73640.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    location: "Gumaca, Quezon",
    price: 110.3,
    stock: 633,
  },
  {
    id: 5,
    title: "Eggplant | Talong",
    img: "https://images.pexels.com/photos/13195445/pexels-photo-13195445.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    location: "Mauban, Quezon",
    price: 70.0,
    stock: 633,
  },
  {
    id: 6,
    title: "Indian Mango | Mangga",
    img: "https://images.pexels.com/photos/16850673/pexels-photo-16850673/free-photo-of-close-up-of-mangoes.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    location: "Atimonan, Quezon",
    price: 100.0,
    stock: 633,
  },
  {
    id: 7,
    title: "Local Red Onion | Sibuyas",
    img: "https://images.pexels.com/photos/4258187/pexels-photo-4258187.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    location: "Candelaria, Quezon",
    price: 40.5,
    stock: 633,
  },
  {
    id: 8,
    title: "Tomato | Kamatis",
    img: "https://images.pexels.com/photos/6280399/pexels-photo-6280399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    location: "Lopez, Quezon",
    price: 100.0,
    stock: 633,
  },
  {
    id: 9,
    title: "Bottle Gourd | Upo",
    img: "https://images.pexels.com/photos/9580760/pexels-photo-9580760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    location: "Pagbilao, Quezon",
    price: 90.7,
    stock: 633,
  },
  {
    id: 10,
    title: "Pumpkin | Kalabasa",
    img: "https://images.pexels.com/photos/1366883/pexels-photo-1366883.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    location: "Alabat, Quezon",
    price: 60.0,
    stock: 633,
  },
  {
    id: 11,
    title: "Radish | Labanos",
    img: "https://images.pexels.com/photos/8827293/pexels-photo-8827293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    location: "Calauag, Quezon",
    price: 112.0,
    stock: 633,
  },
  {
    id: 12,
    title: "Bell Pepper",
    img: "https://images.pexels.com/photos/7129155/pexels-photo-7129155.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    location: "Sariaya, Quezon",
    price: 90.0,
    stock: 633,
  },
  {
    id: 13,
    title: "Bell Pepper",
    img: "https://images.pexels.com/photos/7129155/pexels-photo-7129155.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    location: "Sariaya, Quezon",
    price: 90.0,
    stock: 633,
  },
  {
    id: 14,
    title: "Bell Pepper",
    img: "https://images.pexels.com/photos/7129155/pexels-photo-7129155.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    location: "Sariaya, Quezon",
    price: 90.0,
    stock: 633,
  },
  {
    id: 15,
    title: "Bell Pepper",
    img: "https://images.pexels.com/photos/7129155/pexels-photo-7129155.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    location: "Sariaya, Quezon",
    price: 90.0,
    stock: 633,
  },
];

function ProductCard({ product }) {
  return (
    <Card
      sx={{
        width: "100%",
        height: "297px",
        borderRadius: "12px",
        mb: 1,
        boxShadow: 3,
        position: "relative",
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
          gutterBottom
          align="left"
          sx={{ fontSize: "1.1rem", fontWeight: "bolder" }}
        >
          {product.title}
        </Typography>
      </CardContent>
      <Button
        href="/Products/availableProducts"
        passHref
        variant="contained"
        endIcon={<ArrowForwardIosIcon />}
        style={{
          backgroundColor: "#2F603B",
          color: "#C9D5CA",
          width: "100%",
          fontSize: "0.7rem",
          borderBottomLeftRadius: "12px",
          borderBottomRightRadius: "12px",
          margin: 0,
          borderRadius: 0,
        }}
      >
        View available products
      </Button>
    </Card>
  );
}

const ProductsGrid = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
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

export default function Products() {

  return (
    <Grid container className={styles.gridContainer}>
      <Grid item xs={12}>
        <Paper elevation={3} className={styles.paperContainer}>
        <ProductsToggleButton />
          <Paper elevation={3} className={styles.logosearchbar}>
            <TextField
              size="small"
              type="text"
              fullWidth
              className={styles.searchicon}
              sx={{
                borderRadius: "30px",
                backgroundColor: "#FFFEFE",
                justifyItems: "right",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "transparent",
                    borderRadius: "30px",
                  },
                  "&:hover fieldset": {
                    borderColor: "transparent",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "transparent",
                  },
                  "& .MuiOutlinedInput-input": {
                    padding: "10px 10px 10px 15px",
                  },
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              placeholder="Search"
            />
          </Paper>
          <div className={styles.productGridContainer}>
            <ProductsGrid />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "1rem",
              marginBottom: "2rem",
            }}
          >
            <Pagination
              count={10}
              variant="outlined"
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "#2F603B",
                },
                "& .MuiPaginationItem-page.Mui-selected": {
                  backgroundColor: "#2F603B",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#2F603B",
                  },
                },
                "& .MuiPaginationItem-page.Mui-selected.Mui-focusVisible": {
                  backgroundColor: "#2F603B",
                },
              }}
            />
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
}
