import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  Box,
  InputAdornment,
  IconButton,
  TextField,
  Paper,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const AddStocksModal = ({ onClose }) => {
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState('');

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setQuantity(value);
    }
  };

  const handleAddQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleRemoveQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddStock = () => {
    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose} PaperProps={{ sx: { borderRadius: '20px' } }}>
      <DialogTitle fontWeight="bold">Add Stock</DialogTitle>
      <DialogContent>
        <Box mt={2}>
          <Typography variant="subtitle1" sx={{ marginBottom: '8px' }}>Quantity: </Typography> {/* Add margin */}
          <TextField
            fullWidth
            variant="outlined"
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            inputProps={{ style: { borderColor: '#2E603A' } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton edge="start" onClick={handleRemoveQuantity}>
                    <RemoveIcon />
                  </IconButton>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={handleAddQuantity}>
                    <AddIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ width: '100%' }}
          />
        </Box>

        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button
            sx={{
              borderColor: '#2E603A',
              color: '#2E603A',
              mr: 2,
              '&:hover': {
                borderColor: '#286652',
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
              borderRadius: '13px',
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
              borderRadius: '13px',
            }}
            onClick={handleAddStock}
          >
            Add
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddStocksModal;
