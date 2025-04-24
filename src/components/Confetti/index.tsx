"use client";

import { useEffect, useState } from 'react';
import './styles.css';

interface ConfettiProps {
  active: boolean;
}

const Confetti: React.FC<ConfettiProps> = ({ active }) => {
  const [particles, setParticles] = useState<React.ReactNode[]>([]);
  
  useEffect(() => {
    if (active) {
      const newParticles = [];
      const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff8800', '#8800ff'];
      
      // Create 60 confetti particles
      for (let i = 0; i < 60; i++) {
        const left = Math.random() * 100;
        const animationDuration = 3 + Math.random() * 2;
        const animationDelay = Math.random() * 0.5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = 5 + Math.random() * 10;
        
        newParticles.push(
          <div
            key={i}
            className="confetti-particle"
            style={{
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: color,
              animationDuration: `${animationDuration}s`,
              animationDelay: `${animationDelay}s`
            }}
          />
        );
      }
      
      setParticles(newParticles);
      
      // Clear particles after animation completes
      const timer = setTimeout(() => {
        setParticles([]);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [active]);
  
  if (!active && particles.length === 0) return null;
  
  return (
    <div className="confetti-container">
      {particles}
    </div>
  );
};

export default Confetti;
