import React from 'react';
import { Grid, Paper, styled } from '@mui/material';
import RecentChatsList from '../../components/Chats/RecentChatsList';
import ChatExchange from '../../components/Chats/ChatExchange';
import ChatInfoPanel from '../../components/Chats/ChatInfoPanel';

const StyledGridContainer = styled(Grid)({
    minHeight: '100vh',
    background: '#F4F4F4',
});

const StyledPaperContainer = styled(Paper)({
    minHeight: '80vh',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: '#FFFEFE',
    textAlign: 'center',
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '6rem',
    borderRadius: '20px',
    overflow: 'hidden',
});

const StyledRecentChatsList = styled(RecentChatsList)({
    flex: 1,
});

const ChatsPage = () => {
    return (
        <StyledGridContainer container>
            <Grid item xs={12}>
                <StyledPaperContainer elevation={3}>
                    <RecentChatsList />
                    <ChatExchange />  
                    <ChatInfoPanel /> 
                </StyledPaperContainer>
            </Grid>
        </StyledGridContainer>
    );
};


export default ChatsPage;
