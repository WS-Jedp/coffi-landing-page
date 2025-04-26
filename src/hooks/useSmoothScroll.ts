import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export const useSmoothScroll = (headerHeight: number = 80) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Function to handle smooth scrolling
    const scrollToHash = () => {
      // Get the hash from the URL
      const hash = window.location.hash;
      
      if (hash) {
        // Delay the scroll slightly to ensure DOM is ready
        setTimeout(() => {
          // Find the element to scroll to
          const element = document.querySelector(hash);
          
          if (element) {
            // Get the element's position relative to the viewport
            const elementPosition = element.getBoundingClientRect().top;
            // Get the current scroll position
            const offsetPosition = elementPosition + window.scrollY - headerHeight - 20; // Extra 20px padding
            
            // Use smooth scroll behavior if supported
            if ('scrollBehavior' in document.documentElement.style) {
              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
              });
            } else {
              // Fallback for browsers that don't support smooth scrolling
              animateScroll(offsetPosition, 800); // Increased duration for smoother effect
            }
          }
        }, 100);
      }
    };

    // Manual animation for browsers without smooth scroll support
    const animateScroll = (targetPosition: number, duration: number) => {
      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition;
      let startTime: number | null = null;

      const animation = (currentTime: number) => {
        if (startTime === null) {
          startTime = currentTime;
        }
        
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Enhanced easing function for smoother animation
        const easeInOutQuintic = (progress: number): number => {
          return progress < 0.5
            ? 16 * progress ** 5
            : 1 - Math.pow(-2 * progress + 2, 5) / 2;
        };
        
        window.scrollTo(0, startPosition + distance * easeInOutQuintic(progress));

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    };

    // Initial scroll if there's a hash in the URL
    if (window.location.hash) {
      scrollToHash();
    }

    // Handle hash clicks
    const handleHashClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.hash && link.pathname === window.location.pathname) {
        event.preventDefault();
        window.history.pushState(null, '', link.href);
        scrollToHash();
      }
    };

    document.addEventListener('click', handleHashClick);
    
    return () => {
      document.removeEventListener('click', handleHashClick);
    };
    
  }, [pathname, searchParams, headerHeight]);

  // Function to manually trigger scroll to an element
  const scrollToElement = (elementId: string) => {
    const element = document.getElementById(elementId);
    
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerHeight - 20;
      
      if ('scrollBehavior' in document.documentElement.style) {
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } else {
        animateScroll(offsetPosition, 800); // Increased duration for smoother effect
      }
    }
  };

  // Manual animation function with improved easing
  const animateScroll = (targetPosition: number, duration: number) => {
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
      if (startTime === null) {
        startTime = currentTime;
      }
      
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      // Enhanced easing function - quintic ease-in-out for super smooth effect
      const easeInOutQuintic = (progress: number): number => {
        return progress < 0.5
          ? 16 * progress ** 5
          : 1 - Math.pow(-2 * progress + 2, 5) / 2;
      };
      
      window.scrollTo(0, startPosition + distance * easeInOutQuintic(progress));

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  return { scrollToElement };
};
