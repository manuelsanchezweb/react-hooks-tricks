import { useEffect, useState } from "react";

function useWindowWidth() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
  
    useEffect(() => {
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []); // Este efecto no depende de ninguna prop o estado, así que no tiene dependencias y se ejecutará una sola vez
  
    return windowWidth;
  }
  
  export default useWindowWidth;