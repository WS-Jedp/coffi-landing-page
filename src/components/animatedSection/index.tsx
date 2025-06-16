import { useScroll, useTransform, motion } from "motion/react";
import { useRef } from "react";

// Component for animated sections with configurable parameters
interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  animation?: "fadeUp" | "fadeIn" | "slideIn" | "rotate";
}


export function AnimatedSection({ 
  children, 
  delay = 0, 
  className = "", 
  animation = "fadeUp" // fadeUp, fadeIn, slideIn, etc.
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const animations = {
    fadeUp: {
      opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.7]),
      y: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 0, 0, -30]),
    },
    fadeIn: {
      opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.7]),
      scale: useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0.95, 1, 1, 0.98]),
    },
    slideIn: {
      opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.7]),
      x: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [-100, 0, 0, -30]),
    },
    rotate: {
      opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.7]),
      rotate: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [-10, 0, 0, 5]),
    }
  };

  const animationProps = animations[animation] || animations.fadeUp;
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
          delay
        }
      }}
      viewport={{ once: true, margin: "-100px" }}
      style={animationProps}
      className={className}
    >
      {children}
    </motion.div>
  );
}