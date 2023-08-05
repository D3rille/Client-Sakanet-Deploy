import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import bg from "../public/bg/welcome.jpg";
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
import { Radio, FormControl, FormLabel, RadioGroup, useForkRef } from '@mui/material';


import {useState, useContext, forwardRef , useRef } from 'react';
import { REGISTER_USER } from '../graphql/mutations/sampleMutations';//imported the mutation
import { useMutation } from '@apollo/client';
import toast, { Toaster } from 'react-hot-toast';
import CircularLoading from '../components/circularLoading';
import {useRouter} from 'next/router';
import {useForm} from '../util/hooks';
import {AuthContext} from '../context/auth';

import { Autocomplete, LoadScript, StandaloneSearchBox} from '@react-google-maps/api';

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
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#02452d',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#02452d',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#02452d',
            },
            'input:webkit autofill': {
              'webkit text fill color': '#02452d',
              'webkit box shadow': '0 0 0px 1000px transparent inset',
              transition: 'background-color 5000s ease-in-out 0s',
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: '#02452d',
            '&.Mui-focused': {
              color: '#02452d',
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
  height: "82%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "20px",
};

const center = {
  position: "relative",
  top: "50%",
  left: "30%",
};



export default function Register() {
  const [open, setOpen] = useState(false);
  const [remember, setRemember] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const vertical = "top";
  const horizontal = "right";
  const inputRef = useRef();

//Google Map AutoComplete Code
const handlePlaceChanged = () => {
  const [place] = inputRef.current.getPlaces();
  if (place) {
    const selectedAddress = place.formatted_address;

    // Extracting address components
    let barangayName = '';
    let municipality = '';
    let city = '';
    let province = '';
    let region = '';
    let postalCode = '';
    let country = '';
    const latitude = place.geometry.location.lat();
    const longitude = place.geometry.location.lng();

    place.address_components.forEach((component) => {
      const componentType = component.types[0];

      if (componentType === 'sublocality_level_1') {
        barangayName = component.long_name;
      }

      if (componentType === 'administrative_area_level_3') {
        municipality = component.long_name;
      }

      if (componentType === 'administrative_area_level_2') {
        city = component.long_name;
      }

      if (componentType === 'administrative_area_level_1') {
        province = component.long_name;
      }

      if (componentType === 'administrative_area_level_1' && component.short_name === 'PH') {
        region = component.long_name;
      }

      if (componentType === 'postal_code') {
        postalCode = component.long_name;
      }

      if (componentType === 'country') {
        country = component.long_name;
      }
    });


    console.log('Selected Address:', selectedAddress);
    console.log('Barangay:', barangayName);
    console.log('Municipality:', municipality);
    console.log('City:', city);
    console.log('Province:', province);
    console.log('Region:', region);
    console.log('Postal Code:', postalCode);
    console.log('Country:', country);
    console.log('Longitude', longitude );
    console.log('Latitude', latitude);
  }
};


//REgister
  const context = useContext(AuthContext);
  const router = useRouter();
    // Monitor state of errors, initializes empty object
  const [errors, setErrors] = useState({});

  const {onChange, onSubmit, values} = useForm(registerUser, {
        username: '',
        password: "",
        confirmPassword: "",
        account_email:"",
        account_mobile:"",
        role:"FARMER"
    });
    //upon changing something on input field, update that value(values)
    // const onChange = (event) =>{
    //     setValues({...values, [event.target.name]: event.target.value});
    // };

    // the Graphql Mutation
    const [addUser, {loading}] = useMutation(REGISTER_USER, {
        update(proxy, {data:{register:userData}}){
            //console.log(result);
            context.login(userData);
            
        },
        // Display error
        onError(err){
            //console.log(err.graphQLErrors[0].extensions.errors);
            setErrors(err.graphQLErrors[0].extensions.errors);
        },
        // display toast upon completion
        onCompleted:(data)=>{
            toast.success("User successfully Registered");
            router.push('/login');
        },
        //variables to pass on mutation, copy paste from apollo playground then only change the value
        variables:{
            "registerInput": {
              "username": values.username,
              "password": values.password,
              "confirmPassword": values.confirmPassword,
              "account_email": values.account_email,
              "account_mobile": values.account_mobile,
              "role": values.role
            }
          }
    });

    // The callback Function you pass on UseForm upon onSubmit
    function registerUser(){
        addUser();
    }




  // const handleSubmit = async (event) => {
  //   setOpen(true);
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  // };




  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };




  function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }


  if(loading){
        // if still loading, show circular loading
        return(<CircularLoading/>);
  } else{
  return (
    <>
      <Toaster />
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        TransitionComponent={TransitionLeft}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Failed! Enter correct username and password.
        </Alert>
      </Snackbar>
      <div
        style={{
          backgroundImage: `url(${bgimg})`,
          backgroundSize: "cover",
          height: "100vh",
          color: "#f5f5f5",
        }}
      >
        <Box sx={boxstyle}>
          <Grid container>
            <Grid item xs={12} sm={12} lg={6}>
              <Box
                style={{
                  backgroundImage: "url(../bg/welcomeback.jpg)",
                  backgroundSize: "cover",
                  marginTop: "15px",
                  marginLeft: "15px",
                  marginRight: "15px",
                  height: "66vh",
                  color: "#f5f5f5",
                  borderRadius: "20px",
                }}
              ></Box>
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
              <Box
                style={{
                  backgroundSize: "cover",
                  height: "82vh",
                  minHeight: "500px",
                  backgroundColor: "#ffffff",
                  borderTopRightRadius: "20px",
                  borderBottomRightRadius: "20px",
                }}
              >
                <ThemeProvider theme={theme}>
                  <Container>
                    <Box height={35} />
                    <Box sx={center}>
                      <Avatar
                        sx={{ ml: "85px", mb: "4px", bgcolor: "#ffffff" }}
                      >
                        <LockOutlinedIcon />
                      </Avatar>
                      <Typography component="h1" variant="h4" justifyContent="center"
                      style={{marginLeft: "12px", fontWeight: 'bold', color: "#013208", marginTop: "20px" }}>
                        Get Started
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
                        <Grid container spacing={1} sx={{display:(currentPage==1)?"block":"none"}}>
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
                                InputProps={{ style: { color: '#02452d' } }}
                                InputLabelProps={{ style: { color: '#02452d' } }}
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
                                        InputProps={{ style: { color: '#02452d' } }}
                                        InputLabelProps={{ style: { color: '#02452d' } }}
                                        />
                                    </Grid>
                                    <Grid item xs={1} sx={{color:"black"}}>
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
                                        InputProps={{ style: { color: '#02452d' } }}
                                        InputLabelProps={{ style: { color: '#02452d' } }}
                                        />  
                                    </Grid>
                                </Grid>
                            </Grid>
                            
                            {/* <Grid item xs={0.5} sx={{color:"black"}}>
                                
                            </Grid>

                            <Grid item xs={4} >
                            
                            </Grid> */}



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
                                InputProps={{ style: { color: '#02452d' } }}
                                InputLabelProps={{ style: { color: '#02452d' } }}
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
                                value = {values.confirmPassword} 
                                onChange={onChange}
                                InputProps={{ style: { color: '#02452d' } }}
                                InputLabelProps={{ style: { color: '#02452d' } }}
                            />
                            </Grid>


                            {/* Next Button */}
                            <Grid item xs={12} sx={{ ml: "5em", mr: "5em" }}>
                            <Button
                                type="button"
                                variant="contained"
                                fullWidth= {true}
                                onClick={()=>{setCurrentPage(currentPage+1)}}
                                size="large"
                                sx={{
                                mt: "15px",
                                mr: "20px",
                                borderRadius: 28,
                                color: "#ffffff",
                                minWidth: "170px",
                                backgroundColor: "#02452d",
                                '&:hover': {
                                    backgroundColor: '#FF9A01',
                                },
                                }}
                            >
                                Next
                            </Button>
                            </Grid>
                            
                            {/* <displayError err = {errors}/> */}
                            {/* Display if error */}
                            {Object.keys(errors).length > 0 && (
                                <div>
                                    <ul>
                                        {Object.values(errors).map ((value)=>(
                                            <li key={value}>{value}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}


                            
                            <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                            <Stack direction="row" spacing={2} justifyContent="center" textAlign="center" >
                                <Typography
                                variant="body1"
                                component="span"
                                style={{ marginTop: "10px", color: "#02452d"}}
                                >
                                Already have an Account?{" "}
                                <span
                                    style={{ color: "#FF9A01", cursor: "pointer" }}
                                    onClick={() => {
                                        router.push('/login');
                                    }}
                                >
                                    Log In
                                </span>



                                </Typography>
                            </Stack>
                            </Grid>
                        </Grid>
                        
                        {/* Page 2 */}
                        <Grid container spacing={1} sx={{display:(currentPage==2)?"block":"none"}}>
                            <Grid item xs={12} sx={{ ml: '3em', mr: '3em' }}>
                                <FormControl>
                                    <FormLabel id="demo-radio-buttons-group-label" sx={{color:"black"}}>Account Type</FormLabel>
                                    <RadioGroup
                                    row
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue=""
                                    name="radio-buttons-group"
                                    >
                                    <FormControlLabel
                                        value="FARMER" 
                                        checked = {values.role === "FARMER"}
                                        control={<Radio sx={{ color: '#000000' }} />}
                                        label="Farmer"
                                        name="role"
                                        onChange={onChange}
                                        sx={{
                                        color: '#000000', // Set the label color to black
                                        }}
                                    />
                                    <FormControlLabel
                                        control={<Radio sx={{ color: '#000000' }} />}
                                        label="Buyer"
                                        value="BUYER"
                                        checked = {values.role ==="BUYER"}
                                        name="role"
                                        onChange={onChange}
                                        sx={{
                                        color: '#000000', // Set the label color to black
                                        }}
                                    />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                           {/* Google Autocomplete Search BAr
                            <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                                <LoadScript
                                googleMapsApiKey="AIzaSyAdcZcD7Nq7CitMFBFAGBrLlOGtetZCcVg"
                                libraries={["places"]}
                                >
                                    <StandaloneSearchBox
                                    onLoad = {ref => (inputRef.current = ref) }
                                    onPlacesChanged = {handlePlaceChanged}
                                    >
                                    <TextField
                                    required
                                    fullWidth
                                    id="address"
                                    label="Quick Search"
                                    name="address"
                                    variant="outlined"
                                    InputProps={{ style: { color: '#02452d' } }}
                                    InputLabelProps={{ style: { color: '#02452d' } }}
                                    />
                                    </StandaloneSearchBox>
                                </LoadScript>
                            </Grid> */}

                            {/* Next Button */}
                            <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                                <Grid container spacing={1} >
                                    <Grid item xs={6}>
                                        <Button
                                            type="button"
                                            variant="contained"
                                            // fullWidth= {true}
                                            onClick={()=>{setCurrentPage(currentPage-1)}}
                                            size="large"
                                            sx={{
                                            mt: "15px",
                                            mr: "20px",
                                            borderRadius: 28,
                                            color: "#ffffff",
                                            minWidth: "170px",
                                            backgroundColor: "#02452d",
                                            '&:hover': {
                                                backgroundColor: '#FF9A01',
                                            },
                                            }}
                                        >
                                            Prev
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button
                                        type="submit"
                                        variant="contained"
                                        // fullWidth= {true}
                                        size="large"
                                        sx={{
                                        mt: "15px",
                                        mr: "20px",
                                        borderRadius: 28,
                                        color: "#ffffff",
                                        minWidth: "170px",
                                        backgroundColor: "#02452d",
                                        '&:hover': {
                                            backgroundColor: '#FF9A01',
                                        },
                                        }}
                                        >
                                        Sign-up
                                        </Button>
                                    </Grid>

                                </Grid>
                            </Grid>
                            
                            
                            {/* <displayError err = {errors}/> */}
                            {/* Display if error */}
                            {Object.keys(errors).length > 0 && (
                                <div>
                                    <ul>
                                        {Object.values(errors).map ((value)=>(
                                            <li key={value}>{value}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}


                            
                            <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                            <Stack direction="row" spacing={2} justifyContent="center" textAlign="center" >
                                <Typography
                                variant="body1"
                                component="span"
                                style={{ marginTop: "10px", color: "#02452d"}}
                                >
                                Already have an Account?{" "}
                                <span
                                    style={{ color: "#FF9A01", cursor: "pointer" }}
                                    onClick={() => {
                                        router.push('/login');
                                    }}
                                >
                                    Log In
                                </span>



                                </Typography>
                            </Stack>
                            </Grid>
                        </Grid>
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
