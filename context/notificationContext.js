import React, { createContext, useContext, useEffect, useState } from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import { GET_NOTIFICATIONS, NOTIF_SUB } from '../graphql/subscriptions/notificationSub.js';
import { AuthContext } from '../context/auth'; 

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const { user } = useContext(AuthContext); 
  const { subscribeToMore, data: notifData } = useQuery(GET_NOTIFICATIONS);

  const [notificationData, setNotificationData] = useState(notifData?.getNotifications || []);

  useSubscription(NOTIF_SUB, {
    variables: { receiverId: user.id },
    onSubscriptionData: ({ subscriptionData }) => {
      const newNotif = subscriptionData.data.newNotification;
      setNotificationData(prevNotifications => [newNotif, ...prevNotifications]);
    },
  });

  const subscribeToMoreNotif = () => {
    return subscribeToMore({
      document: NOTIF_SUB,
      variables: { receiverId: user.id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newNotif = subscriptionData.data.newNotification;
        return Object.assign({}, prev, {
          getNotifications: [newNotif, ...prev.getNotifications]
        });
      },
    });
  };

  return (
    <NotificationContext.Provider value={{ notifData, subscribeToMoreNotif }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(NotificationContext);
};
