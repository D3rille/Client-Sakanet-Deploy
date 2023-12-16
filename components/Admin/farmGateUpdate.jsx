import React, {useState} from 'react';
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
  } from "@mui/material";
  import Dialog from '@mui/material/Dialog';
  import DialogActions from '@mui/material/DialogActions';
  import DialogContent from '@mui/material/DialogContent';
  import DialogContentText from '@mui/material/DialogContentText';
  import DialogTitle from '@mui/material/DialogTitle';
  import CloseIcon from '@mui/icons-material/Close';
  import Avatar from '@mui/material/Avatar';


const FarmGateUpdate=({open, setOpen, crop, callback})=>{

    const [price, setPrice] = useState(crop?.currentPrice ?? 0);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
        fullWidth
        maxWidth={"xs"}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Update Farm Gate Price
        </DialogTitle>
        <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
            }}
        >
            <CloseIcon />
        </IconButton>
        <DialogContent dividers>
            <Box sx={{display:"flex", flexDirection:"row", alignItems:"center", marginBottom:"0.5em"}}>
                <Avatar src={crop?.photo ?? ""} sx={{marginRight:"1em"}}/>
                <Typography sx={{fontWeight:"bold"}}>
                    {crop?.name}
                </Typography>
            </Box>
            <DialogContentText>
            Please indicate the new price value for this crop
            </DialogContentText>
            <TextField
                value={price}
                onChange={(e)=>{
                e.preventDefault();
                setPrice(e.target.value)}}
                // label="Price"
                variant="standard"
                fullWidth
                type="number"
            
            />

        </DialogContent>
        <DialogActions>     
            <Button autoFocus onClick={()=>{
                callback({
                    variables:{
                        cropId:crop.cropId,
                        newPrice:parseFloat(price)
                    }
                })
            }} variant="contained" color="success">
                Update
            </Button>
            <Button autoFocus 
            onClick={handleClose}
            variant="contained" color="error">
                Cancel
            </Button>
            {/* <Button autoFocus onClick={handleClose} variant="outlined" color="error">
                Cancel
            </Button> */}
        </DialogActions>
        </Dialog>
    
    );
}

export default FarmGateUpdate;