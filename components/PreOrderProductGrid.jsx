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
import { useQuery } from "@apollo/client";
import { GET_AVAILABLE_PRODUCTS, GET_SUGGESTED_PRODUCT } from "../graphql/queries/productQueries";
import CircularLoading from "./circularLoading";
import { formatWideAddress } from "../util/addresssUtils";

function PreOrderProductCard({ product }) {
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
          <Box sx={{ display: "flex", alignItems: 'center'}}>
            <Avatar
              src={product.photo}
              sx={{ width: 48, height: 48 }}
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
              <Typography variant="body1" sx={{ fontWeight: "bolder", fontSize:'0.9rem'}}>
                {product.seller.name}
              </Typography>
              <Typography
                color="textSecondary"
                variant="body2"
                sx={{ fontWeight: "bolder", fontSize:'0.8rem' }}
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
                  {/* TO:DO fix ratings */}
                  {`${product.seller.rating} (${product.ratingCount} ratings)`} 
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
          alt={product.item.tagalogName}
          height="200"
          image={product.item.photo}
        />
  
        {/* Product details */}
        <CardContent sx={{ flexGrow: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#FE8C47",
                borderRadius: "8px",
                width: "fit-content",
                padding: "2px 8px",
                fontSize: "0.7rem",
                
                color: "white",
              }}
            >
              PRE-ORDER
            </Box>
            <Typography variant="body1" align="right" sx={{ fontWeight: "bold" }}>
              ₱ {product.price}/{product.unit}
            </Typography>
          </Box>
          <Typography gutterBottom align="left" sx={{ fontWeight: "bolder" }}>
            {product.item.tagalogName ? (
                `${product.item.tagalogName} | ${product.item.englishName}`
              ) : (
                product.item.englishName
              )}     
          </Typography>
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
            href={`/Products/productOverview?productId=${product.id}`}
          >
            Add to Cart
          </Button>
        </Box>
      </Card>
    );
  }

    const PreOrderProductGrid = ({ productId, sortBy, filter, currentPage, getTotalProduct }) => {
      let product = [];
      let totalProduct = 0;
    
      // Use different queries based on the sortBy property
      const { data, loading, error } = sortBy === 'available'
        ? useQuery(GET_AVAILABLE_PRODUCTS, { //Available Product
            variables: {
              category: 'Pre-Sell',
              itemId: productId,
              filter: filter,
              page: currentPage,
              limit: 6,
            },
          })
      : useQuery(GET_SUGGESTED_PRODUCT, { //Suggested Product
          variables: {
            category: 'Pre-Sell',
            itemId: productId,
            filter: filter,
            page: currentPage,
            limit: 6,
          },
        });

      if (loading) return CircularLoading; //TODO: Implement Loading and Error messaging
      if (error) return <p>Error: {error.message}</p>;

      if (sortBy === 'available') {
        product = data.getAvailableProducts.product;
        totalProduct = data.getAvailableProducts.totalProduct
      } else if (sortBy === 'suggested') {
          product = data.getSuggestedProducts.product;
          totalProduct = data.getSuggestedProducts.totalProduct;
      }

      getTotalProduct(totalProduct);

        return (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "16px",
              marginTop: "20px",
            }}
          >
            {product.map((product) => (
              <PreOrderProductCard key={product.id} product={product} />
            ))}
          </div>
        );
      };
      
      export default PreOrderProductGrid;