import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MobileDetector() {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      const isSmallScreen = window.innerWidth <= 768;
      
      return isMobileDevice || isSmallScreen;
    };

    const handleResize = () => {
      const mobile = checkMobile();
      setIsMobile(mobile);
      
      // Auto-redirect to mobile version if on mobile device
      if (mobile && window.location.pathname === '/') {
        navigate('/build-a-wig-mobile');
      }
    };

    // Check on mount
    handleResize();

    // Listen for resize events
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [navigate]);

  return null; // This component doesn't render anything
}
