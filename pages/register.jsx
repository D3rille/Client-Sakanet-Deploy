import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import bgimg from "../public/bg/backimg.jpg";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Head from 'next/head';
import {
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
  useForkRef,
  Checkbox,
  Link,
  Modal
} from "@mui/material";
import Logo from "../public/bg/LOGO-ONLY-FINAL.png";
import Image from "next/image";

import { useState, useContext, forwardRef, useRef } from "react";
import { REGISTER_USER, VALIDATE_REG_PERSONAL_INFO } from "../graphql/operations/auth"; //imported the mutation
import { useMutation, useLazyQuery } from "@apollo/client";
import toast, { Toaster } from "react-hot-toast";
import CircularLoading from "../components/circularLoading";
import { useRouter } from "next/router";
import { useForm } from "../util/hooks";
import { AuthContext } from "../context/auth";
import OTPInputRegister from "../components/Register/OTPInputRegister"
import { GET_OTP } from "../graphql/operations/email";
import {
  Autocomplete,
  LoadScript,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import DataPrivacyModal from '../components/Register/DataPrivacyModal';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const theme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#02452d",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#02452d",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#02452d",
          },
          "input:webkit autofill": {
            "webkit text fill color": "#02452d",
            "webkit box shadow": "0 0 0px 1000px transparent inset",
            transition: "background-color 5000s ease-in-out 0s",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#02452d",
          "&.Mui-focused": {
            color: "#02452d",
          },
        },
      },
    },
  },
});

const boxstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  height: "85%",
  // my:"auto",
  // mx:"auto",
  // width:"75%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "20px",
};

const center = {
  position: "relative",
  top: "50%",
  left: "30%",
};

const libraries = ["places"];

export default function Register() {
  const [open, setOpen] = useState(false);
  const [remember, setRemember] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const vertical = "top";
  const horizontal = "right";
  const inputRef = useRef();
  const [region, setRegion] = useState("");
  const [province, setProvince] = useState("");
  const [cityOrMunicipality, setCityOrMunicipality] = useState("");
  const [barangay, setBarangay] = useState("");
  const [street, setStreet] = useState("");
  const [getOtp] = useLazyQuery(GET_OTP);
  const [otp, setOtp] = useState("");

  
  // Privacy Policy Modal

  const [isModalOpen, setModalOpen] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleCheckboxClick = () => {
    if (!isModalOpen) {
      setIsCheckboxChecked(!isCheckboxChecked);
    }
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: 800, 
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
    overflowX: 'auto',
    maxHeight: '80vh',
    borderRadius:'20px',
    paddingLeft: 8,
    paddingRight:8
  };



  //Google Map Autocomplete Code
  const handlePlaceChanged = () => {
    const [place] = inputRef.current.getPlaces();
    if (place) {
      const selectedAddress = place.formatted_address;
      // Extracting address components
      let barangayName = "";
      let municipality = "";
      let city = "";
      let province = "";
      let region = "";
      let street = "";

      place.address_components.forEach((component) => {
        const componentType = component.types[0];

        if (componentType === "sublocality_level_1") {
          barangayName = component.long_name;
        }
        if (componentType === "locality") {
          municipality = component.long_name;
        }

        if (componentType === "administrative_area_level_3") {
          municipality = component.long_name;
        }

        if (componentType === "administrative_area_level_2") {
          province = component.long_name;
        }

        if (componentType === "administrative_area_level_1") {
          region = component.long_name;
        }

        if (componentType === "route") {
          street = component.long_name;
        }
      });

      // Update the state variables with the extracted address components
      setRegion(region);
      setProvince(province);
      setCityOrMunicipality(municipality);
      setBarangay(barangayName);
      setStreet(street);
    }
  };

  //REgister
  const context = useContext(AuthContext);
  const router = useRouter();
  // Monitor state of errors, initializes empty object
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    password: "",
    confirmPassword: "",
    account_email: "",
    account_mobile: "",
    role: "",
  });
  //upon changing something on input field, update that value(values)
  // const onChange = (event) =>{
  //     setValues({...values, [event.target.name]: event.target.value});
  // };
  // the Graphql Mutation
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, { data: { register: userData } }) {
      //console.log(result);
      context.login(userData);
    },
    // Display error
    onError(err) {
      try {
        // console.log(err.graphQLErrors[0].extensions.errors);
        setErrors(err?.graphQLErrors[0]?.extensions.errors);
        setOpen(true);
      } catch (e) {
        console.log("Error: ", e);
      }
    },
    // display toast upon completion
    onCompleted: (data) => {
      toast.success("User successfully Registered");
      // router.push('/login');
      router.replace("/");
    },
    //variables to pass on mutation, copy paste from apollo playground then only change the value
    variables: {
      registerInput: {
        username: values.username,
        password: values.password,
        confirmPassword: values.confirmPassword,
        account_email: values.account_email,
        account_mobile: values.account_mobile,
        role: values.role,
        address: {
          street: street,
          barangay: barangay,
          cityOrMunicipality: cityOrMunicipality,
          province: province,
          region: region,
        },
      },
    },
  });

  const [validateRegPersonalInfo, {data:personalInfoValData}] = useMutation(VALIDATE_REG_PERSONAL_INFO, {
    variables:{
      "registerInput": {
        "username": values?.username,
        "password": values?.password,
        "confirmPassword": values?.confirmPassword,
        "account_email": values?.account_email,
        "account_mobile": values?.account_mobile
      }
    },
    onCompleted:(data)=>{
      if(data?.validateRegPersonalInfo?.valid){
        setCurrentPage(currentPage + 1);
        setErrors({});
      } else{
        setOpen(true);
      }
    }
  })

  // The callback Function you pass on UseForm upon onSubmit
  function registerUser() {
    addUser();
  }

  function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }

  const sendOTP = () => {

    getOtp({
      variables: { email: values.account_email},
      onCompleted: (data) => handleSuccess(data),
      onError: (error) => handleError(error),
    });
  };

  const handleSuccess = (data) => {
      const otp = data?.generateOTP;

      if (otp) {
        setOtp(otp)
      } else {
        console.error("Empty OTP received");
      }
    };

  const handleError = (error) => {
    toast.error("Error fetching OTP. Please try again later.");
  };

  const validateAddress = () => {
    const missingFields = [];

    if (!region) {
      missingFields.push('Region');
    }

    if (!province) {
      missingFields.push('Province');
    }

    if (!cityOrMunicipality) {
      missingFields.push('City or Municipality');
    }

    if (!barangay) {
      missingFields.push('Barangay');
    }

    if (!street) {
      missingFields.push('Street');
    }

    if (missingFields.length > 0) {
      // Display individual error toasts for each missing field
      missingFields.forEach(field => {
        toast.error(`${field} is required`);
      });
      return;
    

    // Validation passed
    toast.success('Form submitted successfully');

    // You can perform further actions here, like submitting the form
  };
  setCurrentPage(currentPage + 1);

  };


  if (loading) {
    // if still loading, show circular loading
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // Adjust this if you want to center the loading spinner within a specific height
        }}
      >
        <CircularLoading />
      </Box>
    );
  } else {
    return (
      <>
      <Toaster />
      <Head>
        <title>Register</title>
        <meta name="description" content="Registration page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <div
      style={{
        backgroundImage: `url(${bgimg})`,
        backgroundSize: "cover",
        height: "100vh",
        color: "#f5f5f5",
        overflow: "auto",
      }}
    >
      <Box sx={{ ...boxstyle, height: "75vh" }}>
      {currentPage == 1 && (<Collapse in={open}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{
              position: "absolute",
              top: "0",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "50%",
              zIndex: 9999, 
            }}
          >
            {personalInfoValData?.validateRegPersonalInfo?.errors?.length > 0 && 
            personalInfoValData?.validateRegPersonalInfo?.errors.map((error, index)=>(
              <p key ={index}>{error}</p>
            ))}
          </Alert>
        </Collapse>)}
        {currentPage != 1 && (<Collapse in={open}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{
              position: "absolute",
              top: "-10%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "50%",
              zIndex: 9999, 
            }}
          >
            {Object.keys(errors).length > 0 &&
              Object.values(errors).map((value) => (
                <p key={value}>{value}</p>
              ))}
          </Alert>
        </Collapse>)}
        <Grid container>
          <Grid item xs={12} sm={12} lg={6}>
            <Box
              style={{
                backgroundImage: "url(../bg/womenbg.jpg)",
                backgroundSize: "cover",
                marginTop: "15px",
                marginLeft: "15px",
                marginRight: "15px",
                height: "71vh",
                color: "#f5f5f5",
                borderRadius: "20px",
              }}
            ></Box>
          </Grid>
          <Grid item xs={12} sm={12} lg={6}>
            <Box
              style={{
                backgroundSize: "cover",
                height: "71vh",
                backgroundColor: "#ffffff",
                borderTopRightRadius: "20px",
                borderBottomRightRadius: "20px",
              }}
            >
              <ThemeProvider theme={theme}>
                <Container>
                  <Box height={20} />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: "#ffffff",
                        width: 56,
                        height: 56,
                        position: "relative",
                      }}
                    >
                      <Image
                        src={Logo}
                        alt="Logo"
                        layout="fill"
                        objectFit="cover"
                      />
                    </Avatar>
                    <Typography
                      variant="h5"
                      style={{
                        fontWeight: "bold",
                        color: "#013208",
                        marginTop: "10px",
                      }}
                    >
                      CREATE AN ACCOUNT
                    </Typography>
                  </Box>


                      {/* if statement to change the content */}

                      {/* REGISTRATION FORM */}
                      <Box
                        component="form"
                        noValidate
                        onSubmit={onSubmit}
                        sx={{ mt: 2 }}
                      >
                        <Grid
                          container
                          spacing={1}
                          sx={{ display: currentPage == 1 ? "block" : "none" }}
                        >
                          <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                            <TextField
                              required
                              fullWidth
                              id="username"
                              label="Username"
                              name="username"
                              autoComplete="email"
                              variant="outlined"
                              value={values.username}
                              onChange={onChange}
                              InputProps={{ style: { color: "#02452d" } }}
                              InputLabelProps={{ style: { color: "#02452d" } }}
                            />
                          </Grid>

                          <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                            <Grid container spacing={1}>
                              <Grid item xs={6}>
                                <TextField
                                  required
                                  fullWidth
                                  id="account_email"
                                  value={values.account_email}
                                  onChange={onChange}
                                  label="Email Address"
                                  name="account_email"
                                  autoComplete="email"
                                  variant="outlined"
                                  InputProps={{ style: { color: "#02452d" } }}
                                  InputLabelProps={{
                                    style: { color: "#02452d" },
                                  }}
                                />
                              </Grid>
                              <Grid item xs={1} sx={{ color: "black" }}>
                                <p>Or</p>
                              </Grid>
                              <Grid item xs={5}>
                                <TextField
                                  required
                                  fullWidth
                                  id="account_mobile"
                                  label="Phone Number"
                                  name="account_mobile"
                                  autoComplete="phone"
                                  variant="outlined"
                                  value={values.account_mobile}
                                  onChange={onChange}
                                  InputProps={{ style: { color: "#02452d" } }}
                                  InputLabelProps={{
                                    style: { color: "#02452d" },
                                  }}
                                />
                              </Grid>
                            </Grid>
                          </Grid>


                          {/* Password */}
                          <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                            <TextField
                              required
                              fullWidth
                              name="password"
                              label="Password"
                              type="password"
                              id="password"
                              autoComplete="new-password"
                              variant="outlined"
                              value={values.password}
                              onChange={onChange}
                              InputProps={{ style: { color: "#02452d" } }}
                              InputLabelProps={{ style: { color: "#02452d" } }}
                            />
                          </Grid>

                          {/* Confirmpass */}
                          <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                            <TextField
                              required
                              fullWidth
                              name="confirmPassword"
                              label="Confirm Password"
                              type="password"
                              id="confirmPassword"
                              autoComplete="new-password"
                              variant="outlined"
                              value={values.confirmPassword}
                              onChange={onChange}
                              InputProps={{ style: { color: "#02452d" } }}
                              InputLabelProps={{ style: { color: "#02452d" } }}
                            />
                          </Grid>

                          {/* Data Privacy */}

                          
                            <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    sx={{
                                      color: '#2E603A',
                                      '&.Mui-checked': {
                                        color: '#2E603A',
                                      },
                                    }}
                                    checked={isCheckboxChecked}
                                    onClick={handleCheckboxClick}
                                    disabled={isModalOpen}
                                  />
                                }
                                label={
                                  <span>
                                    I have read and agree to SakaNet&apos;s{" "}
                                    <Link
                                      onClick={handleOpenModal}
                                      style={{ cursor: 'pointer', color: '#2E603A', fontWeight: 'bold', textDecoration: 'underline' }}
                                    >
                                      Data Privacy Policy
                                    </Link>
                                  </span>
                                }
                                sx={{
                                  color: "#02452d",
                                  '& .MuiFormControlLabel-label': {
                                    fontSize: '0.8em',
                                  },
                                }}
                              />
                            </Grid>
                            <Modal
                              open={isModalOpen}
                              onClose={handleCloseModal}
                              aria-labelledby="modal-title"
                              aria-describedby="modal-description"
                              sx={{ overflow: 'scroll' }}
                            >
                              <Box sx={modalStyle}>
                                <DataPrivacyModal />
                              </Box>
                            </Modal>
                          

                          {/* Next Button */}
                          <Grid item xs={12} sx={{ ml: "5em", mr: "5em" }}>
                            <Button
                              type="button"
                              variant="contained"
                              fullWidth={true}
                              onClick={() => {
                                // setCurrentPage(currentPage + 1);
                                validateRegPersonalInfo();
                              }}
                              size="large"
                              sx={{
                                
                                mr: "20px",
                                borderRadius: 28,
                                color: "#ffffff",
                                minWidth: "170px",
                                backgroundColor: "#02452d",
                                "&:hover": {
                                  backgroundColor: "#286652",
                                },
                              }}
                            >
                              Next
                            </Button>
                          </Grid>

                          <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                            <Stack
                              direction="row"
                              spacing={2}
                              justifyContent="center"
                              textAlign="center"
                            >
                              <Typography
                                variant="body1"
                                component="span"
                                style={{ marginTop: "5px", color: "#02452d" }}
                              >
                                Already have an Account?{" "}
                                <span
                                  style={{
                                    color: "#FF9A01",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => {
                                    router.push("/login");
                                  }}
                                >
                                  Log In
                                </span>
                              </Typography>
                            </Stack>
                          </Grid>
                        </Grid>

                        {/* Page 2 */}
                        <Grid
                          container
                          spacing={1}
                          sx={{ display: currentPage == 2 ? "block" : "none" }}
                        >
                          <Grid
                            container
                            spacing={2}
                            style={{ height: "100%" }}
                          >
                            {/* Account Type */}
                            <Grid item xs={12} style={{}}>
                              <FormControl
                                component="fieldset"
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  mt: 10,
                                }}
                              >
                                <FormLabel
                                  sx={{
                                    color: "black",
                                    fontWeight: "550",
                                    mr: "1em",
                                    mb: "0.1em",
                                    "&.Mui-focused": {
                                      color: "black",
                                    },
                                  }}
                                >
                                  Account Type:
                                </FormLabel>

                                <RadioGroup
                                  row
                                  aria-labelledby="demo-radio-buttons-group-label"
                                  defaultValue=""
                                  name="radio-buttons-group"
                                >
                                  <FormControlLabel
                                    value="FARMER"
                                    control={
                                      <Radio
                                        sx={{
                                          color:
                                            values.role === "FARMER"
                                              ? "#2E603A"
                                              : "#2E603A",
                                          "&.Mui-checked": {
                                            color: "#2E603A",
                                          },
                                        }}
                                      />
                                    }
                                    label="Farmer"
                                    name="role"
                                    onChange={onChange}
                                    sx={{
                                      color: "#000000",
                                      marginRight: "0.5em",
                                    }}
                                  />
                                  <FormControlLabel
                                    value="BUYER"
                                    control={
                                      <Radio
                                        sx={{
                                          color:
                                            values.role === "BUYER"
                                              ? "#2E603A"
                                              : "#2E603A",
                                          "&.Mui-checked": {
                                            color: "#2E603A",
                                          },
                                        }}
                                      />
                                    }
                                    label="Buyer"
                                    name="role"
                                    onChange={onChange}
                                    sx={{ color: "#000000" }}
                                  />
                                </RadioGroup>
                              </FormControl>
                            </Grid>

                            {/* Buttons */}
                            <Grid
                              container
                              justifyContent="center"
                              alignItems="center"
                              item
                              xs={12}
                              sx={{ mt: 14 }}
                            >
                              <Grid container spacing={1}>
                                <Grid
                                  item
                                  xs={6}
                                  style={{ textAlign: "center" }}
                                >
                                  <Button
                                    type="button"
                                    variant="outlined"
                                    onClick={() => {
                                      setCurrentPage(currentPage - 1);
                                      setErrors({});
                                    }}
                                    size="large"
                                    sx={{
                                      mt: "15px",
                                      borderRadius: 28,
                                      color: "#02452d",
                                      minWidth: "170px",
                                      borderColor: "#02452d",
                                      "&:hover": {
                                        borderColor: "#286652",
                                        color: "#286652",
                                        backgroundColor: "transparent",
                                      },
                                    }}
                                  >
                                    Prev
                                  </Button>
                                </Grid>
                                <Grid
                                  item
                                  xs={6}
                                  style={{ textAlign: "center" }}
                                >
                                  <Button
                                    type="button"
                                    onClick={() => {
                                      if(values.role){
                                        setCurrentPage(currentPage + 1);
                                        setErrors({});
                                      } else{
                                        setErrors({role:"Please select an account type or your role."});
                                        setOpen(true);
                                      }
                                    }}
                                    variant="contained"
                                    size="large"
                                    sx={{
                                      mt: "15px",
                                      borderRadius: 28,
                                      color: "#ffffff",
                                      minWidth: "170px",
                                      backgroundColor: "#02452d",
                                      "&:hover": {
                                        backgroundColor: "#286652",
                                      },
                                    }}
                                  >
                                    Next
                                  </Button>
                                </Grid>
                              </Grid>
                            </Grid>

                            {/* Already have an account */}
                            <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                              <Stack
                                direction="row"
                                spacing={2}
                                justifyContent="center"
                                textAlign="center"
                              >
                                <Typography
                                  variant="body1"
                                  component="span"
                                  style={{ color: "#02452d" }}
                                >
                                  Already have an Account?{" "}
                                  <span
                                    style={{
                                      color: "#FF9A01",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => {
                                      router.push("/login");
                                    }}
                                  >
                                    Log In
                                  </span>
                                </Typography>
                              </Stack>
                            </Grid>
                          </Grid>
                        </Grid>

                        {/* Page 3 */}
                        <Grid
                          container
                          spacing={1}
                          sx={{ display: currentPage == 3 ? "block" : "none" }}
                        >
                          <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                            <LoadScript
                              googleMapsApiKey="AIzaSyAdcZcD7Nq7CitMFBFAGBrLlOGtetZCcVg"
                              libraries={libraries}
                            >
                              <StandaloneSearchBox
                                onLoad={(ref) => (inputRef.current = ref)}
                                onPlacesChanged={handlePlaceChanged}
                              >
                                <TextField
                                  fullWidth
                                  id="quick_search"
                                  label="Address"
                                  placeholder="Quick Search"
                                  name="quick_search"
                                  variant="outlined"
                                  InputProps={{ style: { color: "#02452d" } }}
                                  InputLabelProps={{
                                    style: { color: "#02452d" },
                                  }}
                                />
                              </StandaloneSearchBox>
                            </LoadScript>
                          </Grid>

                          <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                            <Grid container spacing={1}>
                              <Grid item xs={6}>
                                <TextField
                                  required
                                  fullWidth
                                  id="street"
                                  onChange={(e) => setStreet(e.target.value)}
                                  label="Street"
                                  name="street"
                                  variant="outlined"
                                  InputProps={{ style: { color: "#02452d" } }}
                                  InputLabelProps={{
                                    style: { color: "#02452d" },
                                  }}
                                  value={street}
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <TextField
                                  required
                                  fullWidth
                                  id="barangay"
                                  label="Barangay"
                                  name="barangay"
                                  variant="outlined"
                                  value={barangay}
                                  onChange={(e) => setBarangay(e.target.value)}
                                  InputProps={{ style: { color: "#02452d" } }}
                                  InputLabelProps={{
                                    style: { color: "#02452d" },
                                  }}
                                />
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                            <Grid container spacing={1}>
                              <Grid item xs={6}>
                                <TextField
                                  required
                                  fullWidth
                                  id="city_municipality"
                                  value={cityOrMunicipality}
                                  onChange={(e) =>
                                    setCityOrMunicipality(e.target.value)
                                  }
                                  label="City/Municipality"
                                  name="city_municipality"
                                  variant="outlined"
                                  InputProps={{ style: { color: "#02452d" } }}
                                  InputLabelProps={{
                                    style: { color: "#02452d" },
                                  }}
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <TextField
                                  required
                                  fullWidth
                                  id="province"
                                  label="Province"
                                  name="province"
                                  variant="outlined"
                                  value={province}
                                  onChange={(e) => setProvince(e.target.value)}
                                  InputProps={{ style: { color: "#02452d" } }}
                                  InputLabelProps={{
                                    style: { color: "#02452d" },
                                  }}
                                />
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                            <TextField
                              required
                              fullWidth
                              id="region"
                              label="Region"
                              name="region"
                              variant="outlined"
                              value={region}
                              onChange={(e) => setRegion(e.target.value)}
                              InputProps={{ style: { color: "#02452d" } }}
                              InputLabelProps={{ style: { color: "#02452d" } }}
                            />
                          </Grid>

                          {/* Buttons Page 3 */}
                          <Grid
                            container
                            justifyContent="center"
                            alignItems="center"
                            item
                            xs={12}
                            sx={{}}
                          >
                            <Grid container spacing={1}>
                              <Grid item xs={6} style={{ textAlign: "center" }}>
                                <Button
                                  type="button"
                                  variant="outlined"
                                  onClick={() => {
                                    setCurrentPage(currentPage - 1);
                                    setErrors({});
                                  }}
                                  size="large"
                                  sx={{
                                    mt: "15px",
                                    borderRadius: 28,
                                    color: "#02452d",
                                    minWidth: "170px",
                                    borderColor: "#02452d",
                                    "&:hover": {
                                      borderColor: "#286652",
                                      color: "#286652",
                                      backgroundColor: "transparent",
                                    },
                                  }}
                                >
                                  Prev
                                </Button>
                              </Grid>
                              <Grid item xs={6} style={{ textAlign: "center" }}>
                                <Button
                                  type="button"
                                  variant="contained"
                                  onClick={() => {
                                    validateAddress()
                                    sendOTP();
                                  }}
                                  size="large"
                                  sx={{
                                    mt: "15px",
                                    borderRadius: 28,
                                    color: "#ffffff",
                                    minWidth: "170px",
                                    backgroundColor: "#02452d",
                                    "&:hover": {
                                      backgroundColor: "#286652",
                                    },
                                  }}
                                >
                                  Sign-up
                                </Button>
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                            <Stack
                              direction="row"
                              spacing={2}
                              justifyContent="center"
                              textAlign="center"
                            >
                              <Typography
                                variant="body1"
                                component="span"
                                style={{ marginTop: "5px", color: "#02452d" }}
                              >
                                Already have an Account?{" "}
                                <span
                                  style={{
                                    color: "#FF9A01",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => {
                                    router.push("/login");
                                  }}
                                >
                                  Log In
                                </span>
                              </Typography>
                            </Stack>
                          </Grid>
                        </Grid>

                        {/* PAGE 4  OTP Input*/}
                      {currentPage === 4 && <OTPInputRegister otp={otp} registerUser={registerUser}/>}

                      </Box>
                    </Container>
                  </ThemeProvider>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </div>
      </>
    );
  }
}
