import { useState, useContext, useEffect, useRef } from "react";
import lottie from 'lottie-web';

const EmptyAnimation = () => {
  useEffect(() => {
    const instance = lottie.loadAnimation({
      container: document.getElementById('lottie'), 
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('public/icons/EmptyAnimation - 1701484173469.json') 
    });

    return () => instance.destroy();
  }, []);

  return (
    <div 
      id="lottie"
      style={{ 
        height: '70vh', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    />
  );
};

export default EmptyAnimation;