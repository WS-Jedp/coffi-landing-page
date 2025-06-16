import { useEffect, useRef, useState } from "react";

// Custom hook for parallax effect
export function useParallax() {
    const [scrollY, setScrollY] = useState(0);
    const ref = useRef<HTMLElement>(null);
  
    useEffect(() => {
      const element = ref.current;
      if (!element) return;
  
      let ticking = false;
  
      const handleScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const rect = element.getBoundingClientRect();
            setScrollY(-rect.top);
            ticking = false;
          });
          ticking = true;
        }
      };
  
      // Initial calculation
      handleScroll();
  
      window.addEventListener("scroll", handleScroll, { passive: true });
  
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
  
    return { ref, scrollY };
  }