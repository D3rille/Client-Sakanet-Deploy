import React, { useEffect } from 'react';
import lottie from 'lottie-web';
import Head from 'next/head';
import { useRouter } from "next/router";
import Image from 'next/image';

const PageNotFoundAnimation = () => {
    useEffect(() => {
        const instance = lottie.loadAnimation({
            container: document.getElementById('lottie-animation'), 
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require('public/icons/404Page-Animation.json')
        });

        return () => instance.destroy();
    }, []);

    return <div id="lottie-animation" style={{ width: '100%', height: '80vh' }} />;
};

export default function PageNotFound() {
    const router = useRouter();

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100vh" }}>
            <Head>
                <title>Page not Found</title>
                <meta name="description" content="Page Not Found" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PageNotFoundAnimation />

            <div onClick={() => router.replace("/")}>
                <div style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#2E603A', cursor: 'pointer', fontSize: '20px' }}>
                    <Image src="/icons/back-arrow.svg" alt="Back Icon" width={20} height={20}/>
                    <span style={{ marginLeft: '5px' }}>Return to Product Page</span>
                </div>
            </div>

        </div>
    );
}
