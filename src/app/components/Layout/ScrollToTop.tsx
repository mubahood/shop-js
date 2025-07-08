// src/app/components/Layout/ScrollToTop.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component that automatically scrolls to the top of the page
 * whenever the route changes. This fixes the issue where navigating to a new
 * page doesn't start from the top if the previous page was scrolled down.
 */
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when pathname changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // Smooth scrolling for better UX
    });
  }, [pathname]);

  return null; // This component doesn't render anything
};

export default ScrollToTop;
