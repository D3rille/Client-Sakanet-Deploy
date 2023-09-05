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
import { GET_ALL_MARKET_PRODUCTS, GET_AVAILABLE_MARKET_PRODUCTS } from "../../graphql/queries/productQueries";
import { useQuery } from "@apollo/client";
import ProductCategories from "../../components/ProductCategory";

function ProductCard({ product }) {
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: "400px",
        height: "305px",
        borderRadius: "12px",
        mb: 1,
        boxShadow: 3,
        position: "relative",
      }}
    >
      <CardMedia
        sx={{ borderRadius: "10px" }}
        component="img"
        alt={product.name.english}
        height="200"
        image={product.photo}
      />
      <CardContent>
        <Typography
          gutterBottom
          align="left"
          sx={{ fontSize: "1.1rem", fontWeight: "bolder" }}
        >
        {product.name.tagalog && (<>{product.name.tagalog} |{" "} </> )}{product.name.english}       
         </Typography>
      </CardContent>
      <Button
        href={`/Products/${product._id}`}
        // passHref
        variant="contained"
        endIcon={<ArrowForwardIosIcon />}
        style={{
          backgroundColor: "#2F603B",
          color: "#C9D5CA",
          width: "100%",
          fontSize: "0.7rem",
          borderBottomLeftRadius: "12px",
          borderBottomRightRadius: "12px",
          position: "absolute",
          bottom: "0",
          left: "0", 
          right: "0",
        }}
      >
        View available products
      </Button>
    </Card>
  );
}

const ProductsGrid = ( { productData }) => {
  

  return (
  <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "16px",
    marginTop: "20px",
  }}
>
  {productData.map((product) => (
    <ProductCard key={product._id} product={product} />
  ))}
</div>

  );
};

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("Cereals");
  const [selectedProductType, setSelectedProductType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1); //Pagination

  const handlePageChange = (event, page) => { //Pagination
  setCurrentPage(page);
};

  const { loading, error, data } = useQuery(
    selectedProductType === "available"
      ? GET_AVAILABLE_MARKET_PRODUCTS
      : GET_ALL_MARKET_PRODUCTS,
    {
      variables: {
        type: selectedCategory,
        limit:10,
        page: currentPage,
      },
    }
  );


  const handleProductTypeChange = (newType) => {
    setSelectedProductType(newType);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // const productData = selectedProductType === "available"
  //   ? data.getAvailableMarketProducts.map(item => item.product)
  //   : data.getAllMarketProducts.map(item => item.product),   setTotalProduct(data?.getAllMarketProducts[0]?.totalProduct || 0);
;

let productData;
let totalProduct;

if (selectedProductType === "available") {
  productData = data.getAvailableMarketProducts.product;
  totalProduct = data?.getAvailableMarketProducts.totalProduct;
} else {
  productData = data.getAllMarketProducts.product;
  totalProduct = data?.getAllMarketProducts.totalProduct;
}

  
  // Access the product list from the data object


  const totalPages = Math.ceil(totalProduct/ 10);

  return (
    <Grid container className={styles.gridContainer}>
      <Grid item xs={12}>
        <Paper elevation={3} className={styles.paperContainer}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <ProductCategories categoryType={selectedCategory} onCategoryChange={setSelectedCategory} />
            <ProductsToggleButton productsType={selectedProductType} onProductTypeChange={handleProductTypeChange}/>
          </div>
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
            <ProductsGrid  productData={productData}/>
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
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
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
