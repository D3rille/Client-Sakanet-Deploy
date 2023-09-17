import React, { useState } from 'react';
import {
    Box, 
    styled, 
    Avatar, 
    Typography, 
    Accordion, 
    AccordionSummary, 
    AccordionDetails, 
    ListItem, 
    ListItemText, 
    ListItemIcon, 
    List,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import ImageIcon from '@mui/icons-material/Image';
import SearchIcon from '@mui/icons-material/Search';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const StyledChatInfoPanel = styled(Box)({
    flex: 1, 
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'start',
    overflowY: 'auto',
    maxHeight: '80vh',
});

const StyledAvatar = styled(Avatar)({
    width: '70px',
    height: '70px',
    margin: '16px 0',
});

const StyledNameTypography = styled(Typography)({
    fontWeight: 500,
    fontSize: '1.2rem',
    marginBottom: '1rem',
});

const StyledAccordionSummary = styled(AccordionSummary)({
    fontWeight: '600',
    color:'#2C2C2C'
});

const StyledAccordion = styled(Accordion)({
    boxShadow: 'none',
    border: 'none',
    '&::before': {
        display: 'none',
    },
    width: '100%',
    background: 'transparent',
});

const StyledTextField = styled(TextField)({
    '& .Mui-focused': {
        color: '#2E613B',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#2E613B',
    },
});

const StyledCancelButton = styled(Button)({
    color: '#2C2C2C',
});

const ChatInfoPanel = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [chatNameInput, setChatNameInput] = useState("");
    const [isChanged, setIsChanged] = useState(false);

    const avatarSrc = ""; 
    const chatName = "Bongbong Marcos Jr.";
    const members = ["BongBong Marcos Jr.", "Inday Sara", "Another Member"];

    const handleInputChange = (event) => {
        setChatNameInput(event.target.value);
        setIsChanged(event.target.value !== chatName);
    };

    return (
        <StyledChatInfoPanel>
            <StyledAvatar src={avatarSrc} />
            <StyledNameTypography variant="h6">{chatName}</StyledNameTypography>

            <StyledAccordion>
                <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
                    Customize Chat
                </StyledAccordionSummary>
                <AccordionDetails>
                    <List>
                        <ListItem button onClick={() => setDialogOpen(true)}>
                            <ListItemIcon><EditIcon /></ListItemIcon> 
                            <ListItemText primary="Chat Name" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><ImageIcon /></ListItemIcon> 
                            <ListItemText primary="Chat Photo" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><SearchIcon /></ListItemIcon>
                            <ListItemText primary="Search in Conversation" />
                        </ListItem>
                    </List>
                </AccordionDetails>
            </StyledAccordion>

            <StyledAccordion>
                <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
                    Chat Members
                </StyledAccordionSummary>
                <AccordionDetails>
                    <List>
                        {members.map((member, index) => (
                            <ListItem key={index}>
                                <ListItemIcon><Avatar src={""} /></ListItemIcon>
                                <ListItemText primary={member} />
                            </ListItem>
                        ))}
                        {members.length > 2 && (
                            <ListItem button>
                                <ListItemIcon><GroupAddIcon /></ListItemIcon>
                                <ListItemText primary="Add people" />
                            </ListItem>
                        )}
                    </List>
                </AccordionDetails>
            </StyledAccordion>

            {members.length > 2 && (
                <StyledAccordion>
                    <ListItem button>
                        <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                        <ListItemText primary="Leave Chat" />
                    </ListItem>
                </StyledAccordion>
            )}

            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>Change chat name</DialogTitle>
                <DialogContent>
                    <Typography variant="caption">
                        Changing the name of a group chat changes it for everyone.
                    </Typography>
                    <StyledTextField 
                        margin="dense"
                        label="Chat Name"
                        type="text"
                        fullWidth
                        helperText={`${chatNameInput.length}/500`}
                        value={chatNameInput}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <StyledCancelButton onClick={() => setDialogOpen(false)}>
                        Cancel
                    </StyledCancelButton>
                    <Button 
                        color="primary" 
                        disabled={!isChanged} 
                        style={{ backgroundColor: isChanged ? '#2E613B' : undefined, borderRadius:'10px', color:'#FFFEFE' }}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </StyledChatInfoPanel>
    );
};

export default ChatInfoPanel;
