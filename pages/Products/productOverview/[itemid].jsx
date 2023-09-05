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
import { useQuery } from "@apollo/client";
import { GET_PRODUCT } from "../../../graphql/queries/productQueries";
import { formatWideAddress } from "../../../util/addresssUtils";

export default function ProductOverview() {
  const router = useRouter();
  const queryData = router.query.itemid

  const [contactNumber, setContactNumber] = useState("");
  const [unit, setUnit] = useState("Kg");
  const [quantity, setQuantity] = useState("");
  const [modeOfPayment, setModeOfPayment] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const radioStyles = {
    checked: {
      color: "#2F613A",
    },
  };

  useEffect(() => {
    if (quantity && modeOfPayment && deliveryAddress) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [quantity, modeOfPayment, deliveryAddress]);


  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: {
      productId: queryData,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  
 
  const product = data.getProduct;


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
                image={product.item.photo}
                alt={product.title}
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
                      src={product.seller.profile_pic}
                      sx={{ mr: 3, width: "50px", height: "50px" }}
                    >
                      {product.seller.avatar}
                    </Avatar>
                    <div>
                      <Typography variant="subtitle1">
                        {product.seller.name}
                      </Typography>
                      <Rating
                        name="read-only"
                        value={product.seller.rating}
                        precision={0.1}
                        readOnly
                      />
                    </div>
                  </Box>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ marginTop: 2, marginBottom: 2 }}
                  >
                    {product.title}
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
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
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
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    sx={{
                      width: "71%",
                      marginLeft: 2,
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": { borderColor: "#2F603B" },
                        "&.Mui-focused fieldset": { borderColor: "#2F603B" },
                      },
                    }}
                  />

                  <TextField
                    label="Delivery Address"
                    variant="outlined"
                    multiline
                    rows={1}
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
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
                  />
                  <FormLabel component="legend" sx={{ marginTop: "0.7rem" }}>
                    Mode of Payment
                  </FormLabel>
                  <RadioGroup
                    value={modeOfPayment}
                    onChange={(event) => setModeOfPayment(event.target.value)}
                    style={{ display: "flex", flexDirection: "row" }}
                  >
                    <FormControlLabel
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
                  {/* <a href="availableProducts"> */}
                  <Button
                    variant="contained"
                    onClick={() => router.back()}
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
                        <TableCell>Location</TableCell>
                        <TableCell>{formatWideAddress(product.seller.address)}</TableCell>
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
                        <TableCell>Time Limit</TableCell>
                        <TableCell>{product.until}</TableCell>
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
