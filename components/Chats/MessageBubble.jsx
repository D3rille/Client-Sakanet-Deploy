import React from 'react';
import { Box, Avatar, styled } from '@mui/material';

const StyledMessageBubble = styled(Box)(({ sender }) => ({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    padding: '12px 0',
    margin: '3px 0',
    justifyContent: sender ? 'flex-end' : 'flex-start',
}));

const StyledBubble = styled(Box)(({ sender }) => ({
    position: 'relative',
    padding: '12px 16px',
    borderRadius: '12px',
    backgroundColor: sender ? '#33816A' : '#FFFEFE',
    color: sender ? '#FFFFFF' : '#000000',
}));

const StyledAvatar = styled(Avatar)(({ sender }) => ({
    margin: '0 8px',
}));

const StyledTime = styled(Box)(({ sender }) => ({
    fontSize: '0.7rem',
    color: '#999',
    position: 'absolute',
    bottom: '-20px',
    left: sender ? 'auto' : '12px',
    right: sender ? '12px' : 'auto',
}));

const MessageBubble = ({ message, sender, avatar, time }) => (
    <StyledMessageBubble sender={sender}>
        {!sender && <StyledAvatar src={avatar} />}
        <Box position="relative">
            <StyledBubble sender={sender}>
                {message}
                <StyledTime sender={sender}>
                    {time}
                </StyledTime>
            </StyledBubble>
        </Box>
        {sender && <StyledAvatar src={avatar} />}
    </StyledMessageBubble>
);

export default MessageBubble;
