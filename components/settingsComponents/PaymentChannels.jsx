import React, { useState, useEffect } from "react";
import { Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/system";
import { useSubs } from "../../context/SubscriptionProvider";
import PaymentModal from "./PaymentModal";

const PaymentChannelsContainer = styled("div")({
  paddingTop: "1rem",
  margin: "2rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  justifyContent: "flex-start",
  minHeight: "70vh",
  maxHeight: "100vh",
});

const HeaderContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  alignItems: "center",
});

const AddButtonContainer = styled("div")({
  marginTop: "1rem",
  alignSelf: "flex-end",
});

const StyledIconButton = styled(IconButton)({
  background: "#2E603A",
  color: "#ECECED",
  transition: "width 0.8s, background-color 0.5s",
  borderRadius: "50%",
  width: "48px",
  height: "48px",
  padding: "12px",
  "&:hover": {
    background: "#ECECED",
    borderRadius: "24px",
    width: "auto",
    paddingRight: "8px",
    paddingLeft: "12px",
    "& .MuiSvgIcon-root": {
      color: "#2E603A",
    },
    "& .hover-text": {
      display: "inline",
      color: "#2E603A",
      fontWeight: "bolder",
      fontSize: "15px",
    },
  },
});

const HoverText = styled("span")({
  display: "none",
  marginLeft: "8px",
  verticalAlign: "middle",
});

const PaymentBox = styled("div")({
  margin: "1rem 0",
  padding: "0.5rem",
  border: "1px solid #2E603A",
  borderRadius: "5px",
  cursor: "pointer",
  width: "300px",
});
const PaymentChannels = () => {
  const { profile } = useSubs();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentChannels, setPaymentChannels] = useState([]);
  const [channelToEdit, setChannelToEdit] = useState(null);

  useEffect(() => {
    if (profile) {
      setPaymentChannels(profile?.profile?.payment_channels);
    }
  }, [profile]);

  const onBoxClick = (channel) => {
    setChannelToEdit(channel);
    setIsModalOpen(true);
  };

  const handleNameChange = (name) => {
    if (channelToEdit) {
      setPaymentChannels(
        paymentChannels.map((item) =>
          item._id === channelToEdit._id ? { ...item, name } : item
        )
      );
    } else {
      setChannelToEdit({ name });
    }
  };

  if (profile) {
    return (
      <PaymentChannelsContainer>
        <HeaderContainer>
          <Typography variant="h6" style={{ fontWeight: "bolder" }}>
            Payment Channels
          </Typography>
          <StyledIconButton size="small" onClick={() => setIsModalOpen(true)}>
            <AddIcon />
            <HoverText className="hover-text">ADD PAYMENT CHANNEL</HoverText>
          </StyledIconButton>
        </HeaderContainer>

        {paymentChannels.map((item, index) => (
          <PaymentBox key={index} onClick={() => onBoxClick(item)}>
            <Typography variant="body1" style={{ fontWeight: "bolder", color: '#2E603A', textTransform: "uppercase" }}>
              {item.name}
            </Typography>
            <Typography variant="body1" style={{ fontWeight: "bolder", color: '#2E603A', textTransform: "uppercase" }}>
              {item.channel}
            </Typography>
            <Typography variant="body2">{item.details}</Typography>
          </PaymentBox>
        ))}

        <PaymentModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setChannelToEdit(null);
          }}
          channelToEdit={channelToEdit}
          onNameChange={handleNameChange}
        />
      </PaymentChannelsContainer>
    );
  }
};

export default PaymentChannels;
