import { useState } from 'react';
import { Paper, Button, Grid, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import ProductPoolCard, { productDataList } from './ProductPoolCard';
import AddProductPoolModal from './AddProductPoolModal'; 
import AddCircleIcon from '../../public/icons/add-circle.svg'; 
import MoreVertIcon from '@mui/icons-material/MoreVert'; // Import the Kebab icon
import Image from 'next/image';

const ProductPools = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, marginBottom: 2, borderRadius: 3, backgroundColor:'#FEFFFF' }}>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ marginBottom: '1rem' }}>
        <Grid item>
          <Typography variant="body1" align="left" sx={{ fontWeight: 'bold', fontSize: '1.1em', color: '#010100' }}>
            Product Pools
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            sx={{
              fontSize: '0.8em',
              backgroundColor: '#2E603A',
              '&:hover': {
                backgroundColor: '#286652'
              },
              borderRadius: '18px'
            }}
            startIcon={<Image src={AddCircleIcon} alt="Add" width={24} height={24} />}
            onClick={handleOpenModal}
          >
            Add Pool
          </Button>
          <IconButton
            aria-label="more"
            aria-controls="kebab-menu"
            aria-haspopup="true"
            onClick={handleMenuClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="kebab-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            {/* Add Kebab menu items here */}
            <MenuItem onClick={handleCloseMenu}>Edit</MenuItem>
            <MenuItem onClick={handleCloseMenu}>Delete</MenuItem>
          </Menu>
        </Grid>
      </Grid>
      <div style={{ maxHeight: '37.5rem', overflowY: 'auto' }}>
        {productDataList.map((product, index) => (
          <ProductPoolCard key={product.id || index} productData={product} />
        ))}
      </div>
      <AddProductPoolModal open={isModalOpen} onClose={handleCloseModal} />
    </Paper>
  );
};

export default ProductPools;
