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
  IconButton,
  Modal,
} from "@mui/material";
import styled from "@emotion/styled";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import styles from "../../styles/products.module.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Pagination from "@mui/material/Pagination";
import FarmerSideToggleButton from "../../components/FarmerSide/FarmerSideToggleButton";
import {
  GET_ALL_MARKET_PRODUCTS,
  GET_AVAILABLE_MARKET_PRODUCTS,
  SEARCH_ALL_PRODUCT,
  SEARCH_AVAILABLE_PRODUCT,
} from "../../graphql/queries/productQueries";
import { useQuery, useLazyQuery } from "@apollo/client";
import ProductCategories from "../../components/ProductCategory";
import CircularLoading from "../../components/circularLoading";
import SellModal from "../../components/FarmerSide/SellModal";
import PreSellModal from "../../components/FarmerSide/PreSellModal";

const StyledIconButton = styled(IconButton)({
  background: "#2E603A",
  color: "#ECECED",
  transition: "width 0.2s, background-color 0.5s",
  borderRadius: "50%",
  width: "48px",
  height: "48px",
  padding: "12px",
  marginLeft: "2rem",
  marginTop: "2rem",
  "& .hover-text": {
    display: "none",
    color: "#2E603A",
    fontWeight: "bolder",
    fontSize: "15px",
  },
  "&:hover": {
    background: "#ECECED",
    borderRadius: "24px",
    width: "200px",
    paddingRight: "8px",
    paddingLeft: "12px",
    "& .MuiSvgIcon-root": {
      color: "#2E603A",
    },
    "& .hover-text": {
      display: "inline",
    },
  },
});

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
          {product.name.tagalog && <>{product.name.tagalog} | </>}
          {product.name.english}
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

const ProductsGrid = ({ productData }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "16px",
        marginTop: "20px",
      }}
    >
      {productData?.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default function FarmerSide() {
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [isPreSellModalOpen, setIsPreSellModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProductType, setSelectedProductType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1); //Pagination
  const [filter, setFilter] = useState("");
  const [searchFocus, setSearchFocus] = useState(false);

  const handleFilterChange = (event) => {
    event.preventDefault();
    const newFilter = event.target.value;
    setFilter(newFilter);
    searchProduct();
  };

  const handlePageChange = (event, page) => {
    //Pagination
    event.preventDefault();
    setCurrentPage(page);
  };

  const handleProductTypeChange = (newType) => {
    setSelectedProductType(newType);
    setCurrentPage(1);
  };

  const { loading, error, data } = useQuery(
    selectedProductType === "available"
      ? GET_AVAILABLE_MARKET_PRODUCTS
      : GET_ALL_MARKET_PRODUCTS,
    {
      variables: {
        type: selectedCategory,
        // limit:(searchFocus && filter)?136:10,
        limit: 10,
        page: currentPage,
      },
    }
  );

  const [
    searchProduct,
    { data: searchData, error: searchError, loading: searchLoading },
  ] = useLazyQuery(
    selectedProductType === "available"
      ? SEARCH_AVAILABLE_PRODUCT
      : SEARCH_ALL_PRODUCT,
    {
      variables: {
        type: selectedCategory,
        searchInput: filter,
      },
    }
  );

  if (loading) return <CircularLoading />;
  if (error) return <p>Error: {error.message}</p>;

  if (data) {
    let productData;
    let totalProduct;

    const regex = new RegExp(`^${filter}`, "i");

    if (selectedProductType === "available") {
      if (searchFocus && filter && searchData) {
        productData = searchData.searchAvailableMarketProduct;
        totalProduct = productData.length;
      } else {
        productData = data.getAvailableMarketProducts.product;
        totalProduct = data?.getAvailableMarketProducts.totalProduct;
      }
    } else {
      if (searchFocus && filter && searchData) {
        productData = searchData.searchAllMarketProduct;
        totalProduct = productData.length;
      } else {
        productData = data.getAllMarketProducts.product;
        totalProduct = data?.getAllMarketProducts.totalProduct;
      }
    }

    const totalPages = Math.ceil(totalProduct / 10);
    return (
      <Grid container className={styles.gridContainer}
      style={{ minHeight: '100vh' }}>
        <Grid item xs={12}>
          <Paper elevation={3} className={styles.paperContainer}
          style={{ minHeight: '80vh' }}>
            {/*<h1 style={{paddingTop:"1rem"}}>Market Products</h1>*/}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <StyledIconButton
                size="small"
                onClick={() => {
                  if (selectedProductType === "all") {
                    setIsSellModalOpen(true);
                  } else {
                    setIsPreSellModalOpen(true);
                  }
                }}
              >
                <AddIcon />
                <Typography className="hover-text">ADD PRODUCT</Typography>
              </StyledIconButton>
              <FarmerSideToggleButton
                productsType={selectedProductType}
                onProductTypeChange={handleProductTypeChange}
              />
            </div>

            <Paper elevation={3} className={styles.logosearchbar}>
              <TextField
                size="small"
                type="text"
                onFocus={() => {
                  setSearchFocus(true);
                }}
                onBlur={() => {
                  setSearchFocus(false);
                }}
                value={filter}
                onChange={handleFilterChange}
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
              <ProductsGrid productData={productData} />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "1rem",
                marginBottom: "2rem",
              }}
            >
              {!searchFocus && (
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
              )}
            </div>
            {/* Modals */}
            <SellModal
              isOpen={isSellModalOpen}
              onClose={() => setIsSellModalOpen(false)}
            />
            <PreSellModal
              isOpen={isPreSellModalOpen}
              onClose={() => setIsPreSellModalOpen(false)}
            />
          </Paper>
        </Grid>
      </Grid>
    );
  }
}