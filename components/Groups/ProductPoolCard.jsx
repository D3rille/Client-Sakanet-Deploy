import { useState } from 'react';
import { Paper, Typography, Button, Avatar, Card, Box, Dialog, DialogTitle, DialogContent } from '@mui/material';
import AddStock from './AddStocksModal'
import ContributorsList from './ContributorsListModal'

export const productDataList = [
    { 
        name: 'Cabbage | Repolyo', 
        price: '₱50.00 per kg', 
        image: '',
        minContribution: '5 kg',
        pickUp: 'Yes',
        dropOff: 'Lucena Public Market',
        note: 'ang bayaran ay idadaan sa gcash',
        contributors: 30,
        deadline: '11-25-2023',
        stocks: '150 / 1000 kg'
    },
    { 
        name: 'Apple | Mansanas', 
        price: '₱50.00 per kg', 
        image: '',
        minContribution: '5 kg',
        pickUp: 'Yes',
        dropOff: 'Lucena Public Market',
        note: 'ang bayaran ay idadaan sa gcash',
        contributors: 30,
        deadline: '11-25-2023',
        stocks: '150 / 1000 kg'
    },
    { 
        name: 'Onion | Sibuyas', 
        price: '₱50.00 per kg', 
        image: '',
        minContribution: '5 kg',
        pickUp: 'Yes',
        dropOff: 'Lucena Public Market',
        note: 'ang bayaran ay idadaan sa gcash',
        contributors: 30,
        deadline: '11-25-2023',
        stocks: '150 / 1000 kg'
    },
    { 
        name: 'Orange', 
        price: '₱50.00 per kg', 
        image: '',
        minContribution: '5 kg',
        pickUp: 'Yes',
        dropOff: 'Lucena Public Market',
        note: 'ang bayaran ay idadaan sa gcash',
        contributors: 30,
        deadline: '11-25-2023',
        stocks: '150 / 1000 kg'
    },

];

const ProductPoolCard = ({ productData }) => {
    const [isAddStockOpen, setAddStockOpen] = useState(false);
    const [isContributorsOpen, setContributorsOpen] = useState(false);
  
    const handleAddStockOpen = () => {
      setAddStockOpen(true);
    };
  
    const handleAddStockClose = () => {
      setAddStockOpen(false);
    };
  
    const handleContributorsOpen = () => {
      setContributorsOpen(true);
    };
  
    const handleContributorsClose = () => {
      setContributorsOpen(false);
    };

    return (
        <Paper
            elevation={1}
            sx={{
                position: 'relative',
                padding: 2,
                marginBottom: 2,
                borderRadius: 3,
                boxShadow: '0.6px 4px 6px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1, alignItems: 'center' }}>
                <Typography variant="body2" sx={{ position: 'absolute', top: 2, right: 2, fontWeight:500, padding:2 }}>
                    Stocks: {productData.stocks}
                </Typography>
                <Card 
                    sx={{ 
                        width: 170,
                        height: 190,
                        padding: 2, 
                        backgroundColor: '#FAF9F6',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center', 
                        marginRight: 2,
                        borderRadius: 2.5,
                        boxShadow: '2px 2px 8px rgba(250, 249, 246, 0.6)', 
                    }}
                >
                    <Avatar src={productData.image} alt={productData.name} sx={{ width: 100, height: 100, marginBottom: 1 }} /> 
                    <Typography variant="body2" sx={{ marginBottom: 1, fontSize:'0.98em', fontWeight:600 }}>{productData.name}</Typography>
                    <Typography variant="subtitle1" sx={{ marginBottom: 1, fontSize:'0.89em', fontWeight:520 }}>{productData.price}</Typography>
                </Card>
                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', ml:'1rem' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="body2" sx={{ fontWeight: 500, color: '#1A1A1A', mb:'0.3rem' }}>Minimum Contribution: {productData.minContribution}</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 500, color: '#1A1A1A', mb:'0.3rem' }}>Pick-up: {productData.pickUp}</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 500, color: '#1A1A1A', mb:'0.3rem' }}>Drop-off: {productData.dropOff}</Typography>
                        </Box>
                        <Box sx={{ flexGrow: 4 }}>
                            <Typography variant="body2" sx={{ fontWeight: 500, color: '#1A1A1A', mb:'0.3rem' }}>Current Contributors: {productData.contributors}</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 500, color: '#1A1A1A', mb:'0.3rem' }}>Deadline: {productData.deadline}</Typography>
                        </Box>
                    </Box>
                    <Typography variant="body2" sx={{ marginTop: 2, color: '#777777', fontWeight: 500 }}>Note: {productData.note}</Typography>
                </Box>
            </Box>

       <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginTop: 'auto',
          padding: '8px',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          size="small"
          sx={{
            backgroundColor: '#2E603A',
            '&:hover': {
              backgroundColor: '#286652',
            },
            borderRadius: '18px',
            marginRight: 1,
            minWidth: '100px',
          }}
          onClick={handleAddStockOpen}
        >
          Add Stock
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          sx={{
            borderColor: '#2E603A',
            borderRadius: '18px',
            minWidth: '100px',
            color: '#2E603A',
            '&:hover': {
              borderColor: '#286652',
            },
          }}
          onClick={handleContributorsOpen}
        >
          Contributors
        </Button>
      </Box>

      {/* Add Stock Modal, TODO: missing AddStock */}
      <Dialog open={isAddStockOpen} onClose={handleAddStockClose}>
        <DialogTitle>Add Stock</DialogTitle>
        <DialogContent>
          <AddStock onClose={handleAddStockClose} />
        </DialogContent>
      </Dialog>

      {/* Contributors List Modal,  */}
      <Dialog open={isContributorsOpen} onClose={handleContributorsClose}>
        <DialogTitle>Contributors</DialogTitle>
        <DialogContent>
          <ContributorsList onClose={handleContributorsClose} />
        </DialogContent>
      </Dialog>
    </Paper>
  );
};

export default ProductPoolCard;
