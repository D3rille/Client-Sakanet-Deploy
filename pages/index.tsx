//@ts-nocheck
import Head from 'next/head';
import { useRouter } from 'next/router.js';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import { AuthContext } from '@/context/auth';
import { useState, useContext, useEffect } from 'react';
import { Typography } from '@mui/material';
import styles from '../styles/Splashscreen.module.css';
import { PropagateLoader } from 'react-spinners';

import Logo from "../public/images/LOGO-FINAL.png";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const allowedRoles = ["BUYER", "FARMER", "ADMIN"];

  useEffect(() => {
    const redirectUser = () => {
      if (!user) {
        router.replace("/login");
      } else if (user?.role == "ADMIN") {
        router.replace('/Admin');
      } else if (!allowedRoles.includes(user.role)) {
        // replace with 404 page
        // router.replace("/404"); // You can add a custom 404 route
      } else {
        if (user.role == "FARMER") {
          router.replace("/myProducts");
        } else {
          router.replace("/Products");
        }
      }
    };

    const delay = 2000; // 2 seconds
    const timeoutId = setTimeout(redirectUser, delay);

    return () => clearTimeout(timeoutId); // Clean up the timer on unmount
  }, [user, router]);

  return (
    <>
      <Head>
        <title>Welcome to Sakanet</title>
        <meta name="description" content="Welcome to Sakanet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeScreen />
    </>
  );
}

function HomeScreen() {
  return (
    <div className={styles.splashContainer}>
      <div className={styles.logo}>
        <Image
          src="/images/LOGO-FINAL.png"
          alt="Our Logo"
          width={270}
          height={200}
        />
      </div>
      <div className={styles.loader}>
        <PropagateLoader color="#2E603A" />
      </div>
    </div>
  );
}