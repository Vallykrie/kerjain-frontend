"use client";

import { useEffect } from 'react';

const TawkToChat = () => {
  useEffect(() => {
    const tawkToUrl = process.env.NEXT_PUBLIC_TAWKTO_URL;
    
    if (!tawkToUrl) {
      console.error('Tawk.to URL not found in environment variables');
      return;
    }
    
    const script = document.createElement('script');
    script.async = true;
    script.src = tawkToUrl;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    
    const s0 = document.getElementsByTagName('script')[0];
    if (s0 && s0.parentNode) {
      s0.parentNode.insertBefore(script, s0);
    } else {
      document.head.appendChild(script);
    }

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return null;
};

export default TawkToChat;