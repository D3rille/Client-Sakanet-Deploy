import React, { useRef, useEffect, useState } from 'react';
import { Box, styled, TextField, InputAdornment, IconButton, Tooltip } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MessageBubble from './MessageBubble';
import { format } from 'date-fns';

const StyledChatExchange = styled(Box)({
    flex: 2,
    padding: '16px',
    height: '90vh',
    position: 'relative',
});

const StyledContainer = styled(Box)({
    paddingTop: 0,
    borderRadius: '10px 10px 0 0',
    border: '1px solid #DBE4EC',
    borderBottom: 'none',
    height: '100%',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
});

const StyledHeader = styled(Box)({
    backgroundColor: '#F4F4F9',
    padding: '8px 16px',
    borderBottom: '1px solid #DBE4EC',
    fontWeight: 'bold',
    margin: 0,
    textAlign: 'left',
    height: '4rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    color: '#4A5154',
});

const StyledChatBody = styled(Box)(({ inputHeight }) => ({
    backgroundColor: '#F9FAFC',
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
    paddingBottom: `calc(${inputHeight} + 16px)`,
}));

const MessageInputContainer = styled(Box)({
    position: 'absolute',
    bottom: '0px',
    left: '16px',
    right: '16px',
    backgroundColor: '#F9FAFC',
    borderRadius: '0 0 10px 10px',
    padding: '1rem',
    border: '1px solid #DBE4EC',
    borderTop: 'none',
    maxHeight: '144px',
});

const MessageInput = styled(TextField)(({ theme }) => ({
    backgroundColor: '#FFFEFE',
    borderRadius: '20px',
    '& .MuiOutlinedInput-root': {
        borderRadius: '20px',
        '&.Mui-focused fieldset': {
            borderColor: '#2E613B',
        },
    },
    '& textarea': {
        overflowY: 'auto',
        maxHeight: '90px',
        minHeight: '24px',
        resize: 'none',
        transition: 'height 0.3s',
    },
}));

const StyledSendIcon = styled(IconButton)(({ theme }) => ({
    backgroundColor: '#2E613B',
    borderRadius: '50%',
    padding: '6px',
    '& svg': {
        color: '#FFF',
        fontSize: '16px',
    },
    margin: '8px 0 8px 8px',
    transition: 'background-color 0.3s',
    '&:hover': {
        backgroundColor: '#1E4A2B',
    },
}));

const ChatExchange = () => {
    const [inputHeight, setInputHeight] = useState('24px');
    const [messageInput, setMessageInput] = useState('');
    const [messages, setMessages] = useState([
        { message: "hoy", sender: false, avatar: "", time: "09:15" },
        { message: "bente na ba bigas", sender: true, avatar: "", time: "09:16" },
        { message: "nope", sender: false, avatar: "", time: "09:18" },
        { message: "ge", sender: true, avatar: "", time: "09:20" }
    ]);

    const chatBodyRef = useRef(null);

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages]);

    const handleInputChange = (event) => {
        const targetValue = event.target.value;
        setMessageInput(targetValue);

        const targetValueLength = targetValue.length;
        const targetHeight = targetValueLength > 30 ? Math.min(event.target.scrollHeight, 90) : 24;
        setInputHeight(`${targetHeight}px`);
    };

    const handleSendMessage = () => {
        if (messageInput.trim() !== '') {
            const currentTime = format(new Date(), 'HH:mm');
            setMessages([...messages, { message: messageInput, sender: true, avatar: "", time: currentTime }]);
            setMessageInput('');
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <StyledChatExchange>
            <StyledContainer>
                <StyledHeader>
                    Bongbong Marcos Jr.
                </StyledHeader>
                <StyledChatBody ref={chatBodyRef} inputHeight={inputHeight}>
                {messages.map((msg, index) => (
                    <Tooltip key={index} title={msg.time} placement="left" arrow>
                        <MessageBubble
                            message={msg.message}
                            sender={msg.sender}
                            avatar={msg.avatar}
                            time={msg.time}
                        />
                    </Tooltip>
                ))}
                </StyledChatBody>
            </StyledContainer>
            <MessageInputContainer>
                <MessageInput
                    multiline
                    value={messageInput}
                    placeholder="Enter your message here"
                    variant="outlined"
                    size="small"
                    fullWidth
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    inputProps={{
                        style: { height: inputHeight },
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <StyledSendIcon onClick={handleSendMessage}>
                                    <SendIcon />
                                </StyledSendIcon>
                            </InputAdornment>
                        ),
                    }}
                />
            </MessageInputContainer>
        </StyledChatExchange>
    );
};

export default ChatExchange;
