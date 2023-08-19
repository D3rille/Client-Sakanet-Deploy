import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ProductCard from "./ProductCard";

const productData = [
  {
    id: 1,
    title: "Apple",
    img: "https://images.pexels.com/photos/6097872/pexels-photo-6097872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    location: "Pagbilao, Quezon",
    price: 30.0,
    stock: 633,
  },
  {
    id: 2,
    title: "Banana",
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
];

const ProductsGrid = () => {
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

export default ProductsGrid;
