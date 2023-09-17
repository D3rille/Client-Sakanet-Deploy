import React, { createContext, useContext, useEffect, useState } from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import { GET_NOTIFICATIONS, NOTIF_SUB } from '../graphql/operations/notification';
import { GET_MY_PROFILE } from '@/graphql/operations/profile';
import { AuthContext } from './auth.js';

const SubscriptionContext = createContext();

export const SubscriptionProvider = ({ children }) => {
  const { user } = useContext(AuthContext); 
  const { subscribeToMore, data } = useQuery(GET_NOTIFICATIONS);
  const {data:profileInfo} = useQuery(GET_MY_PROFILE);
  const [newNotifCount, setNewNotifCount] = useState(0);

  var profile;
  useEffect(()=>{
    if(profileInfo){
      profile = profileInfo.getMyProfile;
    }
  },[profileInfo]);

  useEffect(()=>{
    subscribeToMore({
      document:NOTIF_SUB,
      variables:{receiverId:user?.id ?? ""},
      updateQuery:(prev, {subscriptionData})=>{
        if(!subscriptionData.data) return prev;
        const newNotif = subscriptionData.data.newNotification;
        return Object.assign({}, prev, {
          getNotifications: [newNotif, ...prev.getNotifications]
        });
      }
    });
  }, []);

if(data){
  var notifData = {
    getNotifications:[...new Set(data.getNotifications)]
  }

}

useEffect(()=>{
  setNewNotifCount(()=>{
    var count=0;
    notifData && notifData.getNotifications.map((notification)=>{
      if(notification.read == false){
        count++;
      }
    });
    return count;
  })
}, [notifData]);
  
  return (
    <SubscriptionContext.Provider value={{notifData, newNotifCount, profile}}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubs = () => {
  return useContext(SubscriptionContext);
};
