import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Box,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
} from "@mui/material";
import styles from "../../../styles/productOverview.module.css";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PRODUCT,GET_AVAILABLE_PRODUCTS  } from "../../../graphql/queries/productQueries";
import { PLACE_ORDER } from "../../../graphql/mutations/orderMutations";
import { formatWideAddress } from "../../../util/addresssUtils";
import {timePassed} from "../../../util/dateUtils";
import toast from 'react-hot-toast';
import TriggeredDialog from "../../../components/popups/confirmationDialog";
import CircularLoading from "../../../components/circularLoading";

export default function ProductOverview() {
  const router = useRouter();
  const queryData = router.query.itemid

  const [contactNumber, setContactNumber] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [modeOfPayment, setModeOfPayment] = useState("Cash");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [onSuccessOrder, setOnSuccessOrder] = useState(false);

  const radioStyles = {
    checked: {
      color: "#2F613A",
    },
  };

  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: {
      productId: queryData,
    },
  });

  const [placeOrder, {loading:placeOrderLoading, error:placeOrderError}] = useMutation(PLACE_ORDER,{
    //TODO: Refetch Orders
    onCompleted:()=>{
      toast.success("successfully placed an order");
      setOnSuccessOrder(true);

    },
    onError:(error)=>{
      console.log(error.message);
      toast.error(error.message);
    },

  });

  
  if (loading) return <CircularLoading/>;
  if(error) return <p>Error: {error.message}</p>;
  if(data){

    const product = data.getProduct.product;
    const seller = data.getProduct.seller;

    if(onSuccessOrder){
      router.push(`/Products/${product.item.id}`);
    }

    const executePlaceOrder=()=>{
    
      placeOrder({variables:{
        "order": {
          "type": product?.category == "Sell" ? "Order":"Pre-Order",
          "productId": product?._id,
          "seller": {
            "id": seller?.id,
            "name": seller?.name
          },
          "quantity": parseFloat(quantity),
          "modeOfPayment": modeOfPayment,
          "deliveryAddress": deliveryAddress,
          "phoneNumber": contactNumber,
          "unit": product?.unit
        }
      },
      refetchQueries:[
        {
          query:GET_AVAILABLE_PRODUCTS,
          variables:{
            category: 'Sell',
            itemId: queryData,
            filter: {
              modeOfDelivery: "",      
              area_limit: "",
              maxPrice: 1000,
              minPrice: 0,
              until: null,
            },
          }
        }
      ],
    });
      
    }

    const BtnSection = (handleClickOpen) =>{
      return(
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            width: "100%",
            padding: 2,
          }}
        >

          <Button
            variant="contained"
            disabled={isDisabled}
            onClick={()=>{handleClickOpen()}}
            sx={{
              backgroundColor: isDisabled ? "grey" : "#2F613A",
              "&:hover": {
                backgroundColor: isDisabled ? "grey" : "#FF8C46",
              },
              "&:active": {
                backgroundColor: "#FF8C46",
              },
              borderRadius: 20,
              flex: 2,
            }}
          >
            BUY NOW
          </Button>
          
          <Button
            variant="contained"
            onClick={() => router.push(`/Products/${product.item.id}`)}
            sx={{
              backgroundColor: "#F6F6F6",
              "&:hover": {
                backgroundColor: isDisabled ? "grey" : "#FF8C46",
              },
              "&:active": {
                backgroundColor: "#FF8C46",
              },
              color: "#2F613A",
              borderRadius: 20,
              flex: 1,
            }}
          >
            Cancel
          </Button>
        </Box>
      );
    }
    return (
      <Grid container className={styles.gridContainer}>
        <Grid item xs={12}>
          <Paper elevation={3} className={styles.paperContainer}>
            <Paper
              className={`${styles.paperCardContainer} ${styles.mobilePaperCardContainer}`}
              elevation={2}
              style={{
                width: "70%",
                maxWidth: "100%",
                margin: "0 auto",
                marginTop: "3rem",
                borderRadius: "20px",
              }}
            >
              <Card
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  height: { xs: "auto", sm: "400px" },
                  backgroundColor: "#FEFEFF",
                  borderRadius: "20px",
                }}
                className={styles.mobileLayout}
              >
                <CardMedia
                  component="img"
                  sx={{
                    width: { xs: "100%", sm: "50%" },
                    border: "20px solid #FEFEFF",
                  }}
                  className={styles.mobileCardMedia}
                  image={product.photo ?? product.item.photo}
                  alt={product.item.tagalogName ?? product.item.englishName}
                />
                <Box
                  sx={{
                    flexGrow: 1,
                    textAlign: "left",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    overflowY: "auto",
                    boxShadow: "0px 4px 4px rgba(255, 255, 255, 0.25)",
                    width: "50%",
                    padding: "1rem",
                  }}
                >
                  <CardContent sx={{ overflowY: "auto", flex: "1" }}>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Avatar
                        src={seller.profile_pic}
                        sx={{ mr: 3, width: "50px", height: "50px" }}
                      />
                        {/* {seller.profile_pic} */}
                      {/* </Avatar> */}
                      <div>
                        <Typography variant="subtitle1">
                          {seller.name}
                        </Typography>
                        <Box display="flex" sx={{flexDirection:"row"}}>
                          <Rating
                            name="read-only"
                            value={seller.rating}
                            precision={0.1}
                            readOnly
                          />
                          <Typography variant="body1">
                              {`${seller.rating}(${seller.reviewerCount ?? 0})`}
                            </Typography>
                        </Box>
                        
                      </div>
                    </Box>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ marginTop: 2, marginBottom: 2 }}
                    >
                      {product.item.tagalogName ? `${product.item.tagalogName} | 
                      ${product.item.englishName}`: product.item.englishName}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      ₱ {product.price} /{product.unit}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      gutterBottom
                      sx={{ marginTop: 2, marginBottom: 2 }}
                    >
                      {product.product_description}
                    </Typography>

                    {/* INPUT FIELDS */}

                    <TextField
                      label="Quantity"
                      type="number"
                      name="quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      // onChange={onChange}
                      sx={{
                        width: "25%",
                        marginBottom: -5,
                        "& .MuiOutlinedInput-root": {
                          "&:hover fieldset": { borderColor: "#2F613B" },
                          "&.Mui-focused fieldset": { borderColor: "#2F613B" },
                        },
                      }}
                    />

                    <TextField
                      label="Contact Number"
                      variant="outlined"
                      name="contactNumber"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      // onChange={onChange}
                      sx={{
                        width: "71%",
                        marginLeft: 2,
                        "& .MuiOutlinedInput-root": {
                          "&:hover fieldset": { borderColor: "#2F603B" },
                          "&.Mui-focused fieldset": { borderColor: "#2F603B" },
                        },
                      }}
                    />

                    {product.modeOfDelivery && product.modeOfDelivery == "delivery" 
                    && <TextField
                      label="Delivery Address"
                      variant="outlined"
                      multiline
                      rows={1}
                      name="deliveryAddress"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      // onChange={onChange}
                      sx={{
                        width: "100%",
                        marginTop: 2,
                        "& .MuiOutlinedInput-root": {
                          "&:hover fieldset": { borderColor: "#2F603B" },
                          "&.Mui-focused fieldset": { borderColor: "#2F603B" },
                        },
                      }}
                      InputProps={{
                        style: { overflowY: "auto" },
                      }}
                    />}
                    <FormLabel component="legend" sx={{ marginTop: "0.7rem" }}>
                      Mode of Payment
                    </FormLabel>
                    <RadioGroup
                      name = "modeOfPayment"
                      value={modeOfPayment}
                      onChange={(event) => setModeOfPayment(event.target.value)}
                      // onChange={onChange}
                      style={{ display: "flex", flexDirection: "row" }}
                    >
                      <FormControlLabel
                        name="modeOfPayment"
                        value="Cash"
                        control={
                          <Radio
                            style={
                              modeOfPayment === "Cash"
                                ? radioStyles.checked
                                : null
                            }
                          />
                        }
                        label="Cash"
                      />
                      <FormControlLabel
                        name="modeOfPayment"
                        value="Online"
                        control={
                          <Radio
                            style={
                              modeOfPayment === "Online"
                                ? radioStyles.checked
                                : null
                            }
                          />
                        }
                        label="Online"
                      />
                    </RadioGroup>
                  </CardContent>
                  <TriggeredDialog
                    triggerComponent={BtnSection}
                    title={"Place Order"}
                    message={"Continue to place this order?"}
                    btnDisplay={0}
                    callback={executePlaceOrder}
                  />
                </Box>
              </Card>
            </Paper>

            <Paper
              className={styles.paperCardContainer2}
              elevation={3}
              style={{
                width: "70%",
                maxWidth: "100%",
                margin: "0 auto",
                marginTop: "2rem",
                marginBottom: "5rem",
                borderRadius: "20px",
              }}
            >
              {/* Product Description */}
                <TableContainer>
                  <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Product Details</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow className={styles.alternateRow}>
                          <TableCell>Stocks</TableCell>
                          <TableCell>{product.stocks}</TableCell>
                        </TableRow>
                        <TableRow className={styles.alternateRow}>
                          <TableCell>Seller Address</TableCell>
                          <TableCell>{formatWideAddress(seller.address)}</TableCell>
                        </TableRow>
                        <TableRow className={styles.alternateRow}>
                          <TableCell>Delivery Method</TableCell>
                          <TableCell>{product.modeOfDelivery}</TableCell>
                        </TableRow>
                        {product.modeOfDelivery === "pick-up" ? ( //Check if delivery mode pick then display location
                          <TableRow className={styles.alternateRow}>
                            <TableCell>Pickup Location</TableCell>
                            <TableCell>{product.pickup_location}</TableCell>
                          </TableRow>
                        ) : null}
                        <TableRow className={styles.alternateRow}>
                          <TableCell>Closing</TableCell>
                          <TableCell>{timePassed(product.until)}</TableCell>
                        </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

            </Paper>
          </Paper>
        </Grid>
      </Grid>
      );

  }
  
 
  
  
}
