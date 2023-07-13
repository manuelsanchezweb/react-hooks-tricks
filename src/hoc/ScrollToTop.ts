import { useEffect } from 'react';
import { useLocation } from 'wouter';

const ScrollToTop = ({ children }: {children: React.ReactNode}) => {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return children;
};

export default ScrollToTop;