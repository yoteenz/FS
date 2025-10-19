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
      
      // Auto-redirect to mobile version if on mobile device (but not for lobby page)
      if (mobile && window.location.pathname === '/' && !window.location.pathname.includes('/lobby')) {
        navigate('/build-a-wig-mobile');
      }
      
      // If on lobby page, don't redirect
      if (mobile && window.location.pathname === '/lobby') {
        // Stay on lobby page - no redirect
        return;
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
