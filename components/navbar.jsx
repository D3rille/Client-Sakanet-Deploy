import React, { useEffect, useState, useContext } from 'react';
import Logo from '../public/images/LOGO-FINAL.png';
import message from '../public/icons/MessagesIcon.svg';
import notif from '../public/icons/NotificationsIcon.svg';
import drop from '../public/icons/DropdownIcon.svg';
import groupicon from '../public/images/Screenshot 2023-07-23 102237.png';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Profile from '../public/images/9fece8c293b6f0a500453f23fddd8f9b.jpg'
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { TextField,Card, Button,Link } from '@mui/material';
import SmsIcon from '@mui/icons-material/Sms';
import MenuIcon from '@mui/icons-material/Menu';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import styles from '../styles/Navbar.module.css';
import { AuthContext } from '@/context/auth';
import Image from "next/image";

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const Navbar = () => {

  const {user,logout} = useContext(AuthContext);
  const drawerWidth = 240;
  const [activeTab, setActiveTab] = useState(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const theme = useTheme();
  const [open, setOpen] = useState(false);

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

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getResponsiveCardStyle = () => {
    if (screenWidth <= 768) {
      return {
        borderRadius: '15px',
        width: '98%',
        display: 'flex',
        border: 'none',
        padding: '0px',
      };
    } else if (screenWidth <= 576) {
      return {
        borderRadius: '10px',
        width: '80%',
        display: 'flex',
        border: 'none',
        padding: '0px',
      };
    } else {
      return {
        borderRadius: '25px',
        width: '90%',
        display: 'flex',
        border: 'none',
        padding: '0px',
      };
    }
  };

  const cardStyle = getResponsiveCardStyle();

  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
            {/* <img style={{ width: '60px' }} alt="Travis Howard" src={Logo} /> */}
            <Image src ={Logo} alt = "Logo" width={60} height={60}/>
          </div>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Home', 'Products', 'My Network', 'Messages', 'Notifications'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                sx={{
                  '&:hover': {
                    backgroundColor: '#f1f1f1',
                    cursor: 'pointer',
                  },
                }}
              >
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Edit Profile', 'Change Password', 'Logout'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
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
            <Image src ={Logo} alt = "Logo" width={50} height={50}/>
            <TextField
              size="small"
              type="text"
              className={styles.searchicon}
              fullWidth
              sx={{
                borderRadius: '30px',
                backgroundColor: '#f1f3fa',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'transparent',
                    borderRadius: '30px',
                  },
                  '&:hover fieldset': {
                    borderColor: 'transparent',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'transparent',
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
              <li className={activeTab === 0 ? styles.active : ''} onClick={() => handleTabClick(0)}>
                Products
              </li>
              <li className={activeTab === 1 ? styles.active : ''} onClick={() => handleTabClick(1)}>
                Home
              </li>
              <li className={activeTab === 2 ? styles.active : ''} onClick={() => handleTabClick(2)}>
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
                avatar={
                  <Avatar>
                    <Image src={Logo} alt="Logo" width={40} height={40} />
                  </Avatar>
                }
                label={user?.username ?? "user"}
                // label = "Username Here"
                variant="outlined"
              />
            </div>
            <div className={styles.icons}>
              <Avatar
                sx={{
                  cursor: 'pointer',
                  bgcolor: 'transparent',
                  '& img': { width: 'auto', height: 'auto' }
                }}
                alt="Messaging"
              >
                <Image src={message} alt="Travis Howard" width={40} height={40} />
              </Avatar>
              <Avatar
                sx={{
                  cursor: 'pointer',
                  bgcolor: 'transparent',
                  '& img': { width: 'auto', height: 'auto' }
                }}
                alt="Notifications"
              >
                <Image src={notif} alt="Travis Howard" width={40} height={40} />
              </Avatar>
              <Avatar
                sx={{
                  cursor: 'pointer',
                  bgcolor: 'transparent',
                  '& img': { width: 'auto', height: 'auto' }
                }}
                alt="Drop"
              >
                <Image src={drop} alt="Travis Howard" width={40} height={40} />
              </Avatar>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Navbar;