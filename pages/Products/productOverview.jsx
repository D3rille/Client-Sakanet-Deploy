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
    Avatar,
    Box,
    Rating,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
  } from "@mui/material";
  import styles from "../../styles/productOverview.module.css";
  
  export default function ProductOverview() {
    const productDetails = [
      { key: "Stocks", value: "130kg" },
      { key: "Location", value: "Pagbilao, Quezon" },
      { key: "Pick up", value: "Yes" },
      { key: "Time Limit", value: "September 1, 2023" },
    ];
  
    const product = {
      img: "https://images.pexels.com/photos/6097872/pexels-photo-6097872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Apple | Mansanas",
      price: 37,
      description: "Short description about the product.",
      seller: {
        name: "Juan Dela Cruz",
        avatar: "JD",
        rating: 4.7,
      },
    };
  
    return (
      <Grid container className={styles.gridContainer}>
        <Grid item xs={12}>
          <Paper elevation={3} className={styles.paperContainer}>
            <Paper className={`${styles.paperCardContainer} ${styles.mobilePaperCardContainer}`}
              
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
                    width: "50%", 
                    border: "20px solid #FEFEFF" }}

                    className={styles.mobileCardMedia}
        image={product.img}
        alt={product.title}
                  image={product.img}
                  alt={product.title}
                />
                <CardContent
                  sx={{
                    flexGrow: 1,
                    textAlign: "left",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Avatar
                        src={product.seller.avatar}
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
                      ₱ {product.price} /kg
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      gutterBottom
                      sx={{ marginTop: 2, marginBottom: 2 }}
                    >
                      {product.description}
                    </Typography>
                  </div>
                  <div>
                    <TextField
                      label="Quantity (kg)"
                      type="number"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">Kg</InputAdornment>
                        ),
                      }}
                      sx={{ width: "25%", marginBottom: -5 }}
                    />
                  </div>
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#2F613A",
                        borderRadius: 20,
                        flex: 2,
                      }}
                    >
                      Add to Cart
                    </Button>
                    <a href="availableProducts">
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#F6F6F6",
                          color: "#2F613A",
                          borderRadius: 20,
                          flex: 1,
                        }}
                      >
                        Cancel
                      </Button>
                    </a>
                  </Box>
                </CardContent>
              </Card>
            </Paper>
  

            <Paper
              className={styles.paperCardContainer2}
              elevation={3}
              style={{
                width: "70%",
                maxWidth: "100%",
                margin: "2rem auto",
                borderRadius: "20px",
                marginTop:'3rem'
              }}
            >
              <TableContainer>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Product Details</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {productDetails.map((detail, index) => (
                      <TableRow key={detail.key} className={styles.alternateRow}>
                        <TableCell>{detail.key}</TableCell>
                        <TableCell>{detail.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Paper>
        </Grid>
      </Grid>
    );
  }
  