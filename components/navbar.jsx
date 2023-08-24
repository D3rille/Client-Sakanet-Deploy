import React, { useEffect, useState, useContext } from "react";
import Logo from "../public/images/LOGO-FINAL.png";
import message from "../public/icons/MessagesIcon.svg";
import notif from "../public/icons/NotificationsIcon.svg";
import drop from "../public/icons/DropdownIcon.svg";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Profile from "../public/images/9fece8c293b6f0a500453f23fddd8f9b.jpg";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { TextField, Card, Button, Link } from "@mui/material";
import SmsIcon from "@mui/icons-material/Sms";
import MenuIcon from "@mui/icons-material/Menu";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import styles from "../styles/Navbar.module.css";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/auth";
import Image from "next/image";
import { GET_MY_PROFILE } from "../graphql/queries/userProfileQueries";
import { useQuery } from "@apollo/client";
import CartModal from "./CartModal";
import Notifications from './Notifications';

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Navbar = () => {
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const Dropdown = ["Orders", "Cart", "Settings", "Logout"];
  const { user, logout } = useContext(AuthContext);
  const drawerWidth = 240;
  const [activeTab, setActiveTab] = useState(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [notifAnchorEl, setNotifAnchorEl] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleNotifClick = (event) => {
    setNotifAnchorEl(event.currentTarget);
  };

  const handleNotifClose = () => {
    setNotifAnchorEl(null);
  };

  const [notificationOpen, setNotificationOpen] = useState(false);
const [notifications, setNotifications] = useState([
  { user: 'Rachel Green', activity: 'Liked your post.', time: '3 min ago', unread: true },
]);

const handleNotificationClick = () => {
  setNotificationOpen(!notificationOpen);
};

const markAllAsRead = () => {
  const updatedNotifications = notifications.map(notif => ({ ...notif, unread: false }));
  setNotifications(updatedNotifications);
};

  const handleCartModalOpen = () => {
    setCartModalOpen(true);
  };
  const handleCartModalClose = () => {
    setCartModalOpen(false);
  };

  const router = useRouter();

  const isActiveTab = (path) => {
    return router.pathname === path;
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getResponsiveCardStyle = () => {
    if (screenWidth <= 768) {
      return {
        borderRadius: "15px",
        width: "98%",
        display: "flex",
        border: "none",
        padding: "0px",
      };
    } else if (screenWidth <= 576) {
      return {
        borderRadius: "10px",
        width: "80%",
        display: "flex",
        border: "none",
        padding: "0px",
      };
    } else {
      return {
        borderRadius: "25px",
        width: "90%",
        display: "flex",
        border: "none",
        padding: "0px",
      };
    }
  };

  const cardStyle = getResponsiveCardStyle();

  const { loading, error, data } = useQuery(GET_MY_PROFILE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { profile_pic } = data.getMyProfile;

  // const activeProfilePic = profile_pic || "https://img.freepik.com/free-icon/user_318-159711.jpg"

  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <div
            style={{ display: "flex", alignItems: "flex-start", width: "100%" }}
          >
            {/* <img style={{ width: '60px' }} alt="Travis Howard" src={Logo} /> */}
            <Image src={Logo} alt="Logo" width={60} height={60} />
          </div>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Home", "Products", "My Network", "Messages", "Notifications"].map(
            (text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  sx={{
                    "&:hover": {
                      backgroundColor: "#f1f1f1",
                      cursor: "pointer",
                    },
                  }}
                >
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
        <Divider />
        <List>
          {["Edit Profile", "Change Password", "Logout"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={text === "Logout" ? logout : null}>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div key="element1" className={styles.header}>
        <Card className={styles.navsection} style={cardStyle} elevation={3}>
          <div className={styles.menu} onClick={handleDrawerOpen}>
            <MenuIcon />
          </div>
          <div className={styles.logosearchbar}>
            <Image src={Logo} alt="Logo" width={50} height={50} />
            <TextField
              size="small"
              type="text"
              className={styles.searchicon}
              fullWidth
              sx={{
                borderRadius: "30px",
                backgroundColor: "#f1f3fa",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "transparent",
                    borderRadius: "30px",
                  },
                  "&:hover fieldset": {
                    borderColor: "transparent",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "transparent",
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              placeholder="Search "
            />
          </div>
          <div className={styles.tabs}>
            <ul>
              <li
                style={
                  isActiveTab("/Products")
                    ? {
                        cursor: "pointer",
                        backgroundColor: "#2F613A",
                        color: "white",
                      }
                    : { cursor: "pointer" }
                }
                onClick={() => router.push("/Products")}
              >
                Products
              </li>
              <li
                style={
                  isActiveTab("/")
                    ? {
                        cursor: "pointer",
                        backgroundColor: "#2F613A",
                        color: "white",
                      }
                    : { cursor: "pointer" }
                }
                onClick={() => router.push("/")}
              >
                Home
              </li>
              <li
                style={
                  isActiveTab("/myNetwork")
                    ? {
                        cursor: "pointer",
                        backgroundColor: "#2F613A",
                        color: "white",
                      }
                    : { cursor: "pointer" }
                }
                onClick={() => router.push("/myNetwork")}
              >
                My Network
              </li>
            </ul>
          </div>
          <div className={styles.components}>
            <div className={styles.username}>
              {/* <Chip
                  variant="plain"
                  color="neutral"
                  size="lg"
                  sx={{marginLeft:'20px'}}
                  startDecorator={<Avatar size="lg" src={Profile} />}
              >
                  Juan Dela Cr...
              </Chip> */}
              {/* <Chip label="Chip Outlined" variant="outlined" /> */}

              <Chip
                avatar={<Avatar src={profile_pic} />}
                onClick={() => {
                  router.push("/myProfile");
                }}
                label={user?.username ?? "user"}
                variant="outlined"
              />
            </div>
            <div className={styles.icons}>
              <Avatar
                sx={{
                  cursor: "pointer",
                  bgcolor: "transparent",
                  "& img": { width: "auto", height: "auto" },
                }}
                alt="Messaging"
              >
                <Image
                  src={message}
                  alt="Travis Howard"
                  width={40}
                  height={40}
                />
              </Avatar>
              <Avatar onClick={handleNotifClick}
                sx={{
                  cursor: "pointer",
                  bgcolor: "transparent",
                  "& img": { width: "auto", height: "auto" },
                }}
                alt="Notifications"
              >
                <Image src={notif} alt="Notifications" width={40} height={40} />
              </Avatar>
              <Notifications anchorEl={notifAnchorEl} handleClose={handleNotifClose} />
              <Avatar
                sx={{
                  cursor: "pointer",
                  bgcolor: "transparent",
                  "& img": { width: "auto", height: "auto" },
                }}
                alt="Drop"
                onClick={handleClick}
              >
                <Image src={drop} alt="Travis Howard" width={40} height={40} />
              </Avatar>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleClose}>Orders</MenuItem>
                <MenuItem onClick={handleCartModalOpen}>Cart</MenuItem>
                <MenuItem onClick={handleClose}>Settings</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
              {notificationOpen && <Notifications markAsRead={markAllAsRead} />}
            </div>
            <CartModal
              open={cartModalOpen}
              handleClose={handleCartModalClose}
            />
          </div>
        </Card>
      </div>
    </>
  );
};

export default Navbar;
