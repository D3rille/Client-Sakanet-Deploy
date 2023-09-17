import React, { useState } from "react";
import {
  Typography,
  Divider,
  Box,
  InputBase,
  Avatar,
  styled,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Checkbox,
} from "@mui/material";
import { darken } from "@mui/system";
import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

const StyledBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginTop: "1.5rem",
  marginBottom: "0.5rem",
  marginLeft: "1.5rem",
  marginRight: "1.5rem",
});

const StyledDivider = styled(Divider)({
  marginLeft: "1.5rem",
  marginRight: "1.5rem",
});

const StyledContainer = styled(Box)({
  flex: 1,
  minHeight: "90vh",
  minWidth: 0,
  overflowX: "hidden",
});

const SearchPanel = styled(Box)({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#F9FAFC",
  borderRadius: "5px",
  marginLeft: "1.5rem",
  marginRight: "1.5rem",
  marginBottom: "0.5rem",
  border: "1px solid #DBE4EC",
});

const ChatItem = styled(Box)(({ isActive }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "7px",
  backgroundColor: isActive ? "#F9FAFC" : "transparent",
  border: isActive ? "2px solid #DBE4EC" : "none",
  borderRadius: "8px",
  margin: "0.5rem 1rem",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: '#e9eef2',
  },
}));

const CreateChatBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginLeft: "1.5rem",
  marginRight: "1.5rem",
  marginBottom: "0.5rem",
  marginTop: "0.5rem",
});

const ChatListContainer = styled(Box)({
  maxHeight: "58vh",
  overflowY: "auto",
  overflowX: "hidden",
});

const UserInfo = styled(Box)({
  maxWidth: "65%",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  textAlign: "left",
  justifyContent: "flex-start",
});

const ModalTitle = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
});

const CloseButton = styled(IconButton)({
  position: "absolute",
  right: "20px",
  top: "50%",
  transform: "translateY(-50%)",
});

const ModalButton = styled(Button)({
  backgroundColor: "#2E613B",
  borderRadius: "10px",
  width: "100%",
  marginLeft: "1.5rem",
  marginRight: "1.5rem",
});

const StyledCheckbox = styled(Checkbox)({
  color: "#2E613B",
  "&.Mui-checked": {
    color: "#2E613B",
  },
});

const SuggestedUser = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginLeft: "1.5rem",
  marginBottom: "0.5rem",
});

const SuggestedContainer = styled(Box)({
  maxHeight: "40vh",
  overflowY: "auto",
  overflowX: "hidden",
  marginRight: "1.5rem",
});

const dummyData = [
  {
    id: 1,
    userName: "Bongbong Marcos Jr",
    message: "bente na ba bigas",
    time: "2:34 PM",
  },
  { id: 2, userName: "Inday Sara", message: "ge", time: "1:15 PM" },
  {
    id: 3,
    userName: "Jhan Derille Unlayao",
    message: "See you soon!",
    time: "3:45 PM",
  },
  {
    id: 4,
    userName: "Ralph Adrian Luna",
    message: "Thanks for the info.",
    time: "12:30 PM",
  },
  {
    id: 5,
    userName: "Stephanie Encomienda",
    message: "Thanks for the info.",
    time: "12:30 PM",
  },
  {
    id: 6,
    userName: "Alice Johnsonnnn",
    message: "Thanks for the info.",
    time: "12:30 PM",
  },
  {
    id: 7,
    userName: "Alice Johnson",
    message: "Thanks for the info.",
    time: "12:30 PM",
  },
  {
    id: 8,
    userName: "Alice Johnson",
    message: "Thanks for the info.",
    time: "12:30 PM",
  },
  {
    id: 9,
    userName: "Alice Johnson",
    message: "Thanks for the info.",
    time: "12:30 PM",
  },
  {
    id: 10,
    userName: "Alice Johnson",
    message: "Thanks for the info.",
    time: "12:30 PM",
  },
  {
    id: 11,
    userName: "Alice Johnson",
    message: "Thanks for the info.",
    time: "12:30 PM",
  },
];

const RecentChatsList = () => {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchedUsers, setSearchedUsers] = useState([]);

  const handleChatClick = (chatId) => {
    setSelectedChatId(chatId);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <StyledContainer elevation={3}>
      <StyledBox>
        <Box marginRight={1}>
          <Image
            src="/icons/Chats.svg"
            alt="Chats Icon"
            width={48}
            height={48}
          />
        </Box>
        <Typography
          variant="h5"
          style={{ fontWeight: "bold", color: "#4A5154" }}
        >
          Chats
        </Typography>
      </StyledBox>
      <StyledDivider />

      <CreateChatBox>
        <Typography color="#4A5154">Create Chat</Typography>
        <IconButton onClick={handleOpenModal}>
          <AddIcon color="action" style={{ color: "#4A5154" }} />
        </IconButton>
      </CreateChatBox>

      <SearchPanel>
        <InputBase
          placeholder="Search"
          fullWidth
          style={{ paddingLeft: "8px", color: "#AEBAC6" }}
        />
        <SearchIcon
          color="action"
          style={{ marginRight: "8px", color: "#AEBAC6" }}
        />
      </SearchPanel>

      <ChatListContainer>
        {dummyData.map((chat) => (
          <ChatItem
            key={chat.id}
            isActive={chat.id === selectedChatId}
            onClick={() => handleChatClick(chat.id)}
          >
            <Box display="flex" alignItems="center">
              <Avatar
                style={{
                  marginRight: "12px",
                  borderColor: "#FFFEFE",
                  borderWidth: 2,
                  borderStyle: "solid",
                }}
              />
              <UserInfo>
                <Typography
                  variant="subtitle1"
                  noWrap
                  style={{ textAlign: "left" }}
                >
                  {chat.userName}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  noWrap
                  style={{ textAlign: "left" }}
                >
                  {chat.message}
                </Typography>
              </UserInfo>
            </Box>
            <Typography variant="caption" color="textSecondary">
              {chat.time}
            </Typography>
          </ChatItem>
        ))}
      </ChatListContainer>

      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="sm"
        PaperProps={{ style: { borderRadius: '20px', padding:'1rem' } }}
      >
        <ModalTitle>
          <DialogTitle style={{ fontWeight: 600 }}>Add People</DialogTitle>
          <CloseButton
            edge="end"
            color="inherit"
            onClick={handleCloseModal}
            aria-label="close"
          >
            <CloseIcon />
          </CloseButton>
        </ModalTitle>
        <DialogContent style={{ padding: '1rem' }}>
          <SearchPanel>
            <SearchIcon
              color="action"
              style={{
                marginLeft: "8px",
                marginRight: "8px",
                color: "#AEBAC6",
              }}
            />
            <InputBase
              placeholder="Search"
              fullWidth
              style={{ paddingLeft: "8px", color: "#AEBAC6" }}
            />
          </SearchPanel>
          {searchedUsers.length === 0 && (
            <Typography
              style={{
                marginTop: "1rem",
                marginBottom: "1rem",
                textAlign: "center",
              }}
            >
              No user selected
            </Typography>
          )}
          <Typography
            style={{
              fontWeight: 600,
              marginLeft: "1.5rem",
              marginBottom: "1rem",
            }}
          >
            Suggested
          </Typography>
          <SuggestedContainer>
            {dummyData.map((user) => (
              <SuggestedUser key={user.id}>
                <Typography>{user.userName}</Typography>
                <StyledCheckbox />
              </SuggestedUser>
            ))}
          </SuggestedContainer>
        </DialogContent>
        <DialogActions>
          <ModalButton variant="contained" onClick={handleCloseModal}>
            Add
          </ModalButton>
        </DialogActions>
      </Dialog>
    </StyledContainer>
  );
};

export default RecentChatsList;
