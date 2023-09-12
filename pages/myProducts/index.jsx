import { useState } from "react";
import {
  Grid,
  Box,
  Avatar,
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
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styled from "@emotion/styled";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import styles from "../../styles/products.module.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Pagination from "@mui/material/Pagination";
import FarmerSideToggleButton from "../../components/FarmerSide/FarmerSideToggleButton";
import {
  GET_MY_PRODUCTS,
  SEARCH_MY_PRODUCTS,
} from "../../graphql/queries/productQueries";
import { useQuery, useLazyQuery } from "@apollo/client";
import CircularLoading from "../../components/circularLoading";
import {shortDate, timePassed} from "../../util/dateUtils";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useRouter} from "next/router";
import ConfirmationDialog from "../../components/popups/confirmationDialog";

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

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  // marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function ProductCard({ product, openDetails, setOpenDetails }) {
  
  const details =()=>{
    return(
      <>
        {product.product_description && (
          <Typography align="left" paragraph>
            Product Description:
            {product.product_description}
          </Typography>
        )}
        <Typography align="left" >
          Product Type: {product.item.product_type}
        </Typography>
        <Typography align="left" >
          Minimum_Order: {product.minimum_order}
        </Typography>
        <Typography align="left" >
          Area Limit: {product.area_limit}
        </Typography>
        <Typography align="left" >
          Created: {timePassed(product.createdAt)}
        </Typography>
      </>
    );
  }
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth:"20vw",
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
          <Box
            sx={{
              display:"flex",
              flex:1,
            }}
          >
            <Avatar
              src={product.item.photo}
              sx={{ width: 48, height: 48 }}
            />
          </Box>
          <Box
            sx={{
              marginLeft: 1,
              display: "flex",
              flex:2,
              flexDirection: "column",
              height: "fit-content",
              alignItems: "flex-start",
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: "bolder", fontSize:'0.9rem'}}>
            {product.item.tagalogName && (<>{product.item.tagalogName} |{" "} </> )}{product.item.englishName}
            </Typography>
            <Typography
              color="textSecondary"
              variant="body2"
              sx={{ fontWeight: "bolder", fontSize:'0.8rem' }}
            >
              Until: {shortDate(product.until)}
            </Typography>
          </Box>
          <Box 
            sx={{
              display:"flex",
              flex:1,
              justifyContent:"center",
              alignItems:"flex-start",
            }}
          >
            <IconButton aria-label=" product settings">
              <MoreVertIcon />
            </IconButton>
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
        alt={product.item.tagalogName ?? product.item.englishName}
        height="200"
        image={product.photo ? product.photo : product.item.photo}
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
          <Typography align="left" sx={{ fontWeight: "bolder" }}>
            ₱ {product.price}/kg
          </Typography>
          {product.status == "open"? (
            <Box
              sx={{
                backgroundColor: "#2E603A",
                borderRadius: "8px",
                width: "fit-content",
                padding: "2px 8px",
                fontSize: "0.7rem",
                color: "white",
              }}
            >
              {product.status}
            </Box>
          ):(
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
              {product.status}
            </Box>
          )}

        </Box>
        <Typography gutterBottom align="left" sx={{ fontWeight: "bold" }}>
          Available Stocks: {product.stocks}
        </Typography>
        <Typography align="left" >
          Mode of Delivery: {product.modeOfDelivery}
        </Typography>
        {product.modeOfDelivery == "pick-up" && (
          <>
            <Typography align="left" >
              Pick-up Location: {product.pickup_location}
            </Typography>
          </>
        )}
        {product.category == "Pre-Sell" && (
          <>
            <Typography align="left" >
              Harvest Date: {shortDate(product?.dateOfHarvest)}
            </Typography>
          </>
        )}
        
      </CardContent>
      
      <CardActions disableSpacing sx={{display:"flex", justifyContent:"center", alignItems:"center"}}>
        <Button onClick={()=>{
          setOpenDetails(true);
        }}>
          More Details
        </Button>
      </CardActions>
      <ConfirmationDialog open={openDetails} setOpen={setOpenDetails} message={details} title={"More Product Details"} btnDisplay={0}/>
    </Card>
  );
}

const ProductsGrid = ({ ...props }) => {
  const {productData, openDetails, setOpenDetails} = props;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(1px, 1fr))",
        gap: "16px",
        marginTop: "20px",
      }}
    >
      {productData?.map((product) => (
        <ProductCard key={product._id} product={product} openDetails={openDetails} setOpenDetails={setOpenDetails}/>
      ))}
    </div>
  );
};

export default function FarmerSide() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("Sell");
  const [productStatus, setProductStatus] = useState("open");
  const [currentPage, setCurrentPage] = useState(1); //Pagination
  const [filter, setFilter] = useState("");
  const [searchFocus, setSearchFocus] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  // const [productId, setProductId] = useState("");
  

  const handleFilterChange = (event) => {
    event.preventDefault();
    const newFilter = event.target.value;
    setFilter(newFilter);
    searchProduct();
  };

  const handleProductStatChange=(event)=>{
    setProductStatus(event.target.value);
  }

  const handlePageChange = (event, page) => {
    //Pagination
    event.preventDefault();
    setCurrentPage(page);
  };

  const handleProductCategoryChange = (newType) => {
    setSelectedCategory(newType);
    setCurrentPage(1);
  };

  const { loading, error, data } = useQuery(
    GET_MY_PRODUCTS,
    {
      variables: {
        category:selectedCategory,
        limit:10,
        page:currentPage,
        status:productStatus
      },
    }
  );

  const [
    searchProduct,
    { data: searchData, error: searchError, loading: searchLoading },
  ] = useLazyQuery(
    SEARCH_MY_PRODUCTS,
    {
      variables: {
        category:selectedCategory,
        status:productStatus,
        searchInput: filter,
      },
    }
  );

  if (loading) return <CircularLoading />;
  if (error) return <p>Error: {error.message}</p>;
  if (searchError) return <p>Error: {searchError.message}</p>;

  if (data) {
    let productData;
    let totalProduct;

    const regex = new RegExp(`^${filter}`, "i");

    
    if (filter && searchData) {
      productData = searchData. searchMyProducts;
      totalProduct = productData.length;
    } else {
      productData = data.getMyProducts.product;
      totalProduct = data?.getMyProducts.totalProduct;
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
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div style={{
                display:"flex",
                flex:1,
                justifyContent:"start"

              }}>
                <StyledIconButton
                  size="small"
                  onClick ={()=>{
                    router.push("/myProducts/addProduct");
                  }

                  }
                >
                  <AddIcon />
                  <Typography className="hover-text">ADD PRODUCT</Typography>
                </StyledIconButton>
              </div>
              <div style={{
                display:"flex",
                flex:1,
                justifyContent:"space-evenly",
              }}>
                
                <Select
                    value={productStatus}
                    onChange={handleProductStatChange}
                    // displayEmpty
                    style={{
                      marginTop:"2rem",
                      height: "40px",
                      minWidth: "160px",
                      borderRadius: "10px",
                      backgroundColor: "#FEFEFF",
                    }}
                    IconComponent={ArrowDropDownIcon}
                    sx={{
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#2E603A",
                      },
                    }}
                  >
                    <MenuItem value={"open"}>Open</MenuItem>
                    <MenuItem value={"closed"}>Closed</MenuItem>
                  </Select>
                <FarmerSideToggleButton
                  productsCategory={selectedCategory}
                  onProductCategoryChange={handleProductCategoryChange}
                />
              </div>

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
              {searchLoading ? (
                <>
                   <CircularLoading />
                </>
              ) : (
                <ProductsGrid productData={productData} openDetails={openDetails} setOpenDetails={setOpenDetails}/>
              )}
             
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
            {/* <SellModal
              isOpen={isSellModalOpen}
              onClose={() => setIsSellModalOpen(false)}
            />
            <PreSellModal
              isOpen={isPreSellModalOpen}
              onClose={() => setIsPreSellModalOpen(false)}
            /> */}
          </Paper>
        </Grid>
      </Grid>
    );
  }
}
