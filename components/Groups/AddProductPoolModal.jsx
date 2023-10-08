import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Box,
  TextField,
  Typography,
  Divider
} from '@mui/material';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";

const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);
  const handleChange = e => {
    setValue(e.target.value);
  };
  return { value, onChange: handleChange };
};

const AddProductPoolModal = ({ open, onClose }) => {
  const productName = useInput('');
  const price = useInput('');
  const minimumContribution = useInput('');
  const dropOff = useInput('');
  const note = useInput('');
  const [pickup, setPickup] = useState('yes');
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{ "& .MuiPaper-root": { borderRadius: '25px', padding: '2rem' } }}
    >
      <DialogTitle sx={{fontWeight:'bold'}}>Add Product Pool</DialogTitle>
      <Divider />
      <DialogContent>
        <Box component="input" {...productName} placeholder="Product Name" sx={{ mt: 2, width: '100%', height: '2.5rem', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', background: 'transparent', color: '#2D2C2D' }} />
        
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Box component="input" type="number"  {...price} placeholder="Price" sx={{ width: '48%', height: '2.5rem', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', background: 'transparent', color: '#2D2C2D' }} />
          <Box component="input" type="number" {...minimumContribution} placeholder="Minimum Contribution" sx={{ width: '48%', height: '2.5rem', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', background: 'transparent', color: '#2D2C2D' }} />
        </Box>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Set Deadline"
            sx={{ width: '100%', marginTop: '1rem', '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#2E603A' } }}
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </LocalizationProvider>

        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
          <Box component="input" {...dropOff} placeholder="Drop-off Location" sx={{ width: '48%', height: '2.5rem', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', background: 'transparent', color: '#2D2C2D' }} />
          <Box width="48%" display="flex" alignItems="center">
            <Typography variant="subtitle1" component="span">
              Pick up:
            </Typography>
            <RadioGroup
              row
              aria-label="pickup"
              name="pickup-radio-buttons-group"
              defaultValue="yes"
              onChange={e => setPickup(e.target.value)}
              sx={{ '& .Mui-checked': { color: '#2E603A' }, "& .MuiSvgIcon-root": { width: '0.8em', height: '0.8em' }, ml: 2 }}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </Box>
        </Box>

        <TextField
          {...note}
          placeholder="Note.."
          multiline
          rows={4}
          sx={{ width: '100%', mt: 2, color: '#2D2C2D' }}
        />

        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button 
            variant="outlined" 
            sx={{ 
              borderColor: '#2E603A', 
              color: '#2E603A', 
              mr: 2, 
              '&:hover': { borderColor: '#286652', backgroundColor: 'rgba(0, 0, 0, 0.04)' },
              borderRadius: '13px'
            }} 
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            sx={{ 
              backgroundColor: '#2E603A', 
              color: '#fff', 
              '&:hover': { backgroundColor: '#286652' },
              borderRadius: '13px'
            }}
          >
            Add Pool
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductPoolModal;
