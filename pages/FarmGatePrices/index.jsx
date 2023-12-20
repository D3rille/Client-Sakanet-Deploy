import React, {   useContext, useState, useEffect} from "react";
import Head from 'next/head';
import {
  Grid,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Divider,
  IconButton,
  Box,
  InputBase,
  Avatar,
  Checkbox,
} from "@mui/material";
import {useRouter} from "next/router";
import { styled } from "@mui/system";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from '@mui/icons-material/Close';
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import toast from "react-hot-toast";
import Tab from "@mui/material/Tab";
import NativeSelect from '@mui/material/NativeSelect';
import MenuItem from '@mui/material/MenuItem';

import { GET_ALL_CROPS, UPDATE_FARMGATE_PRICE } from "../../graphql/operations/admin";
import { SEARCH_ALL_PRODUCT } from "../../graphql/operations/product";
import CircularLoading from "../../components/circularLoading";
import { formatWideAddress } from "../../util/addresssUtils";
import { formatToCurrency } from "../../util/currencyFormatter";
import {formatDate} from "../../util/dateUtils";
import { AuthContext } from "../../context/auth";

const StyledGrid = styled(Grid)({
    background: '#F4F4F4',
  });
  
  const StyledPaper = styled(Paper)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: '#F9F8F8',
    textAlign: 'center',
    width: '95%',
    marginLeft: '1em',
    marginRight: '1em',
    marginBlock: '3rem',
    borderRadius: '20px',
    overflow: 'hidden',
    minHeight: '100vh'
  });
  
  const SearchPanel = styled(Box)({
    display: "flex",
    alignItems: "center",
    backgroundColor: "#F9FAFC",
    borderRadius: "5px",
    // marginLeft: "1.5rem",
    // marginRight: "1.5rem",
    // marginBottom: "0.5rem",
    border: "1px solid #DBE4EC",
  });
  
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: "#F4F4F4",
  }));
  
  const StyledOrderIdCell = styled(StyledTableCell)({
    width: "20%",
  });
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({}));
  
  const StyledTab = styled(Tab)({
    textTransform: "none",
    textAlign: "left",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    "&.Mui-selected": {
      color: "#2E603A",
    },
    "& .MuiSvgIcon-root": {
      color: "inherit",
      marginRight: "0.5rem",
    },
  });
  
  const More = (handleClickOpen) =>{
    return(
      <IconButton
        onClick={()=>{
          handleClickOpen();
        }}
      >
        <MoreVertIcon/>
      </IconButton>
    );
  } 

export default function FarmGatePricesPage(){
    const {user} = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (!user) {
          router.push('/404');
        }
      }, [user]);

      return user ? <FarmGatePrices/> : null;
}

function FarmGatePrices(){
    const [cropList, setCropList] = useState([]);
    const [searchFocus, setSearchFocus] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [category, setCategory] = useState("");

    const [getAllCrops, {data:cropsData, loading:cropsLoading, error:cropsError}] = useLazyQuery(GET_ALL_CROPS);

    const [searchAllProduct,{data:cropSearchData, loading:cropSearchLoading}] = useLazyQuery(SEARCH_ALL_PRODUCT, {
        variables:{
            type:category,
            searchInput
        },
        onError:()=>{
            toast.error("Something went wrong, cannot search product.");
        }
    });

    useEffect(()=>{
        getAllCrops({
            variables:{
                "type": category,
            },
            onError:(error)=>{
                toast.success(error?.message);
            }
        });
    },[category]);

    useEffect(()=>{
        if(!searchFocus && cropsData?.getAllCrops && !cropsLoading){
            setCropList(cropsData.getAllCrops);
        } else if (searchFocus && cropSearchData?.searchAllMarketProduct && !cropSearchLoading){
            setCropList(cropSearchData.searchAllMarketProduct)
        }
    },[cropsData, cropsLoading, cropSearchData, cropSearchLoading, searchFocus]);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            searchAllProduct();
        }
    };

    if(cropsLoading){
        return(
            <div style={{position:"absolute", top:"50%", left:"50%"}}>
                <CircularLoading/>
            </div>
            
        )
    }

    return (
    <div style={{display:"flex", justifyContent:"center", paddingTop:"2em   "}}>
        <StyledPaper elevation={3}>
            <Box sx={{ display:"flex", flexDirection:"row", textAlign: 'left', margin:"3em"}}>
            <Box sx={{flex:1}}>
                <Typography variant="h5" component="div" sx={{ fontWeight: 'bolder', color: '#494948' }}>
                    Farm-Gate Prices
                </Typography>
            </Box>
            <Box sx={{display:"flex", flex:1, flexDirection:"row"}}>
                <Button 
                    variant="contained"
                    onClick = {()=>{
                        searchAllProduct()
                    }}
                    color="success"
                    sx={{
                        paddingInline:"1em",
                        marginInline:"0.5em"
                    }}
                >
                    Search
                </Button>
                <SearchPanel>
                    <SearchIcon
                        color="action"
                        style={{ marginInline: "5px", color: "#AEBAC6" }}
                    />
                    <InputBase  
                    value={searchInput}
                    onChange={(e)=>setSearchInput(e.target.value)}
                    onFocus={()=>setSearchFocus(true)}
                    onBlur={()=>{
                        if(!searchInput){
                            setSearchFocus(false)
                        }
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="Search product"
                    fullWidth
                    style={{ paddingLeft: "8px", color: "#AEBAC6", height:"100%" }}
                    />
                    {searchInput && (
                    <IconButton
                        onClick={()=>{
                            setSearchInput("");
                            setSearchFocus(false);
                        }}
                    >
                        <CloseIcon style={{fontSize:20}}/>
                    </IconButton>
                    )}
                    
                </SearchPanel>
            </Box>
            <Box style={{display:"flex", flex:1}}>
            <NativeSelect
                id="cropCategory"
                value={category}
                label="Category"
                onChange={(e)=>{
                    
                    setCategory(e.target.value);

                }}
                variant="outlined"
                // sx={{border:"1px solid black", paddingInline:"0.5em", borderRadius:"8px"}}
            >
                <option value="">All</option>
                <option value="Cereals">Cereals</option>
                <option value="Rootcrops">Root Crops</option>
                <option value="Beans and Legumes">Beans and Legumes</option>
                <option value="Condiments">Condiments</option>
                <option value="Fruit Vegetables">Fruit Vegetables</option>
                <option value="Leafy Vegetables">Leafy Vegetables</option>
                <option value="Fruits">Fruits</option>
                <option value="Commercial Crops">Commercial Crops</option>
                <option value="Livestock and Poultry (Backyard)">Livestock and Poultry (Backyard)</option>
                
            </NativeSelect>
            </Box>
            </Box>
            {cropList?.length > 0 && (
            <TableContainer
                component={Paper}
                sx={{
                width: "90%",
                borderRadius: "20px",
                elevation: 4,
                marginLeft: "auto",
                marginRight: "auto",
                display: "flex",
                flexDirection: "column",
                maxHeight:'70vh',
                overflow: "auto",
                '&::-webkit-scrollbar': {
                    width: '12px', // Change the width of the scrollbar as per your requirement
                },
                '&::-webkit-scrollbar-thumb': {
                    borderRadius: '6px', // Round the corners of the thumb
                },
                }}
            >
                
                <Table stickyHeader>
                <TableHead>
                    <TableRow>
                    <TableCell sx={{fontWeight:"bold"}}>Photo</TableCell>
                    <TableCell sx={{fontWeight:"bold"}}>Name</TableCell>
                    <TableCell sx={{fontWeight:"bold"}}>Type</TableCell>
                    <TableCell sx={{fontWeight:"bold"}}>Price / kg</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody >

                {cropList && cropList.map((crop, index)=>{
                return(
                    <StyledTableRow key={crop._id}>
                        <TableCell>
                            <Avatar src ={crop?.photo ?? ""} style={{width:"70px", height:"70px"}}/>
                        </TableCell>
                        
                        <TableCell>
                            <Typography>
                                {crop?.name?.tagalog ? `${crop?.name?.english} | ${crop?.name?.tagalog}` : crop?.name?.english}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>
                                {crop.type}
                            </Typography>
                        </TableCell>
                        <TableCell>{formatToCurrency(crop.farmGatePrice)}</TableCell>
                        <TableCell> 
                        </TableCell>
                    </StyledTableRow>
                    )})}
                    
                </TableBody>
                </Table>
            </TableContainer>)}
            </StyledPaper>
    </div>
  
    );
}
