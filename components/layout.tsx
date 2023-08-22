import React, { ReactNode } from 'react';
import Navbar from './navbar';
import { useRouter } from 'next/router';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/auth';
import CircularProgress from '@mui/material/CircularProgress';
import { Toaster } from 'react-hot-toast';
import {NotificationProvider} from '../context/notificationContext'

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  if(user){
    return (
      <>
        <Toaster/>
        <NotificationProvider>
        <Navbar />
        <main>{children}</main>
        </NotificationProvider>
      </>
    );
  } else{
    router.push('/login');
    return(
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' , zIndex:"200"}}>
        <CircularProgress />
      </div>
    );
  }



}