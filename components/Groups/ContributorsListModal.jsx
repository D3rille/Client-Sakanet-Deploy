import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Button,
  IconButton,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CloseIcon from '@mui/icons-material/Close';

const ContributorsListModal = ({ onClose }) => {
  const nameLength = 20;

  const contributorsList = [
    {
      id: 1,
      name: 'Derillle Unlayao',
      avatarUrl: '', 
      stocks: '10kg',
    },
    {
      id: 2,
      name: 'Ralph Luna',
      avatarUrl: '', 
      stocks: '5kg',
    },
    {
      id: 1,
      name: 'Jhan Unlayao',
      avatarUrl: '', 
      stocks: '10kg',
    },
    {
      id: 2,
      name: 'Adrian Luna',
      avatarUrl: '', 
      stocks: '5kg',
    },
    {
      id: 1,
      name: 'Stephanie Encomienda',
      avatarUrl: '', 
      stocks: '10kg',
    },
    {
      id: 2,
      name: 'Steff Encomienda',
      avatarUrl: '', 
      stocks: '5kg',
    },
  ];

  const truncateName = (name) => {
    if (name.length > nameLength) {
      return name.slice(0, nameLength) + '...';
    }
    return name;
  };

  return (
    <Dialog 
      open={true} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        style: { borderRadius: 20, padding:'1.5rem' }, 
      }}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{fontWeight:'bold'}}>
          Contributors
          <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        {contributorsList.length === 0 ? (
          <Typography variant="body1">No contributors yet.</Typography>
        ) : (
          <Box maxHeight={400} overflow="auto">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Contribution</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contributorsList.map((contributor) => (
                  <TableRow key={contributor.id}>
                    <TableCell style={{ width: '50%' }}>
                      <Box display="flex" alignItems="center">
                        <Avatar src={contributor.avatarUrl} alt={contributor.name} />
                        <Typography variant="body2" style={{ marginLeft: 8, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' }}>
                          {truncateName(contributor.name)}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{contributor.stocks}</TableCell>
                    <TableCell align="right">
                      <IconButton>
                        <MoreHorizIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ContributorsListModal;
