import React from 'react';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import Popover from '@mui/material/Popover';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Tooltip from '@mui/material/Tooltip';

const notificationsData = [
    { id: 1,
    user: 'Rachel Green', 
    activity: 'Liked your post.', 
    time: '3 min ago' },
    { id: 2,
    user: 'Mikaela Quinsanos', 
    activity: 'Liked your post.', 
    time: '5 min ago' },
    { id: 3,
    user: 'Jhan Derille', 
    activity: 'commented on your post.', 
    time: '45 min ago' },
    { id: 4,
    user: 'Ralph Adrian', 
    activity: 'Liked your post.', 
    time: '1:15' },
    { id: 5,
        user: 'Ralph Adrian', 
        activity: 'Liked your post.', 
        time: '1:15' },
        { id: 6,
            user: 'Ralph Adrian', 
            activity: 'Liked your post.', 
            time: '1:15' },
            { id: 7,
                user: 'Ralph Adrian', 
                activity: 'Liked your post.', 
                time: '1:15' },
                { id: 8,
                    user: 'Ralph Adrian', 
                    activity: 'Liked your post.', 
                    time: '1:15' },

];

const markAsRead = () => {
    
};

const NotificationContainer = styled('div')({
    backgroundColor: '#FFFFFF',
    border: '1px solid #e1e1e1',
    borderRadius: '10px',
    width: '450px', 
    height: '600px', 
    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
    overflowY: "auto",
  });
  
  const NotificationHeader = styled('div')({
    display: 'flex',
    justifyContent:'center',
    alignItems: 'center',
    padding: '10px',
    fontWeight: 'bolder',
    color: '#323233',
    marginTop:'1rem',
    marginBottom:'1rem',
    fontSize:'17px',
    width: '100%',
  });

  const NotificationFooter = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: 'white',
    position: 'sticky',
    bottom: 0,
    fontSize:'13px',
    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
});

const FooterAction = styled('span')({
    flex: '1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    height: '90%',
    padding: '5px 10px',
    color:'#32816B',
    fontWeight:500
});

const VerticalDivider = styled('div')({
    width: '1px',
    height: '100%',
    backgroundColor: '#e1e1e1',
});

const clearAllNotifications = () => {
}

  const NotificationItem = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    cursor: 'pointer',
  });


  const LeftSection = styled('div')({
    display: 'flex',
    alignItems: 'center',
    marginLeft:'13px',
    marginTop:'0.6rem',
    marginBottom:'0.6rem',
    fontSize:'14px'
  });
  
  const UserInfo = styled('div')({
    marginLeft: '10px',
  });

  const StyledDivider = styled('div')({
    borderTop: '1px solid #e1e1e1',
    marginLeft: '1.2rem',
    marginRight: '1.2rem',
  });
  
  
  
  const Notifications = ({ anchorEl, handleClose }) => {
    return (
        <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      sx={{
        borderRadius:'10px'
      }}
    >
      <NotificationContainer>
        <NotificationHeader>
        <NotificationsActiveIcon color="action" style={{ color: "#2F613A", marginRight: "8px" }} />
                    Notifications
        </NotificationHeader>
        <StyledDivider />
        {notificationsData.map((notif, index) => (
           <React.Fragment key={index} onClick={() => handleNotificationClick(notif)}>
            <NotificationItem>
            <LeftSection>
              <Avatar />
              <UserInfo>
                <div>
                <span style={{fontWeight: 'bold'}}>{notif.user}</span>
                </div>
                <div>{notif.activity}</div>
              </UserInfo>
            </LeftSection>
            <span style={{ 
                fontSize: '0.77rem', 
                fontWeight:100, 
                marginRight:'1.1rem', 
                color:'#D4D4D4',
                margin:'0.6rem',
                 }}>{notif.time}</span>
                 </NotificationItem>
                 {index !== notificationsData.length - 1 && <StyledDivider />}
          </React.Fragment>
        ))}
        <NotificationFooter>
                    <FooterAction onClick={markAsRead}>Mark all as read</FooterAction>
                    <VerticalDivider />
                    <FooterAction onClick={clearAllNotifications}>Clear all</FooterAction>
                </NotificationFooter>
      </NotificationContainer>
      </Popover>
    );
  };
  
  export default Notifications;