import { useRouter } from "next/navigation";
import { SimpleLightButton } from "@/components/buttons";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Digital nomad characteristics or phrases
const nomadTraits = [
  "Remote worker", 
  "Explorer",
  "Creator",
  "Freelancer",
  "Developer",
  "Designer",
  "Traveler",
  "Blogger",
  "Entrepreneur",
  "Digital artist",
  "Marketer",
  "Writer",
  "Teacher",
  "Consultant",
  "Coder",
  "Photographer",
  "Investor",
  "Dreamer",
  "Adventurer",
  "Coffee lover",
  "Multilingual",
  "Early adopter",
  "Innovation",
  "Freedom",
  "Growth",
];

// Particle component for background animation with labels
const Particle = () => {
  // Create random values for natural movement
  const size = Math.random() * 6 + 4; // 2-6px
  const horizontalPosition = Math.random() * 100; // 0-100%
  const delay = Math.random() * 15; // 0-15s
  const duration = Math.random() * 25 + 20; // 20-45s
  const pulseSpeed = Math.random() * 4 + 3; // 3-7s
  const opacity = Math.random() * 0.5 + 0.1; // 0.1-0.6
  const starPoints = Math.random() > 0.7 ? 5 : 4; // Mix of shapes
  
  // Get random trait
  const randomTrait = nomadTraits[Math.floor(Math.random() * nomadTraits.length)];
  
  // Randomize label visibility - only ~35% of particles will have labels to avoid cluttering
  const showLabel = Math.random() < 0.35;
  
  return (
    <div
      className="absolute pointer-events-none z-0"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${horizontalPosition}%`,
        bottom: `0`,
        opacity: opacity,
        backgroundColor: 'rgba(190, 149, 255, 0.8)',
        boxShadow: '0 0 8px 2px rgba(190, 149, 255, 0.7)',
        animation: `floatUp ${duration}s linear ${delay}s infinite, pulse ${pulseSpeed}s ease-in-out infinite alternate`,
        borderRadius: starPoints === 4 ? '50%' : '0',
        clipPath: starPoints === 5 ? 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' : 'none',
        transform: `rotate(${Math.random() * 360}deg)`,
        zIndex: 1,
      }}
    >
      {showLabel && (
        <div className="absolute whitespace-nowrap select-none text-center" 
          style={{
            top: `calc(100% + 5px)`, // Position below the particle
            left: '50%', // Center horizontally
            transform: 'translateX(-50%)', // Ensure proper centering
            fontSize: `${Math.max(8, size + 4)}px`,
            color: 'rgba(190, 149, 255, 0.9)',
            textShadow: '0 0 8px rgba(190, 149, 255, 0.4), 0 0 3px rgba(0, 0, 0, 0.8)',
            fontWeight: '500',
            animation: `fadeText ${duration * 0.8}s ease-out ${delay + 2}s infinite`,
            opacity: 0.8,
            letterSpacing: '0.5px',
            fontFamily: 'Inter, sans-serif',
            width: 'max-content', // Ensure text doesn't get cut off
            maxWidth: '150px', // Limit maximum width
          }}
        >
          {randomTrait}
        </div>
      )}
    </div>
  );
};

export const Purpose: React.FC = () => {
  const t = useTranslations();
  const router = useRouter();
  const currentLocale = useLocale();
  const [particles, setParticles] = useState<number[]>([]);

  // Initialize particles on component mount
  useEffect(() => {
    setParticles(Array.from({ length: 40 }, (_, i) => i)); // Increased for more variety

    // Add animation keyframes to document if they don't exist
    if (!document.querySelector("#purpose-particle-animation-keyframes")) {
      const styleSheet = document.createElement("style");
      styleSheet.id = "purpose-particle-animation-keyframes";
      styleSheet.textContent = `
        @keyframes floatUp {
          0% {
            transform: translateY(20vh) scale(0);
            opacity: 0;
          }
          5% {
            opacity: var(--opacity);
            transform: translateY(18vh) scale(0.6);
          }
          15% {
            opacity: var(--opacity);
            transform: translateY(15vh) scale(1);
          }
          85% {
            opacity: var(--opacity);
            transform: translateY(-80vh) scale(0.8);
          }
          100% {
            transform: translateY(-100vh) scale(0.5);
            opacity: 0;
            transition: opacity 2s ease-out;
          }
        }
        
        @keyframes pulse {
          0% {
            box-shadow: 0 0 4px 1px rgba(190, 149, 255, 0.4);
            opacity: 0.3;
          }
          50% {
            box-shadow: 0 0 10px 4px rgba(190, 149, 255, 0.8);
            opacity: 0.6;
          }
          100% {
            box-shadow: 0 0 15px 6px rgba(190, 149, 255, 0.9);
            opacity: 0.9;
          }
        }

        @keyframes fadeText {
          0%, 100% {
            opacity: 0;
          }
          10%, 90% {
            opacity: 0.85;
          }
          40%, 60% {
            opacity: 0.95;
          }
        }
      `;
      document.head.appendChild(styleSheet);
    }
  }, []);

  const toAboutUs = () => {
    router.push(`/${currentLocale}/about-us`); // Replace with your target URL
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
        when: "beforeChildren",
        ease: [0.43, 0.13, 0.23, 0.96], // Custom ease-in-out curve
        duration: 0.8,
      },
    },
    exit: {
      opacity: 0,
      transition: { 
        staggerChildren: 0.3,
        staggerDirection: -1, 
        when: "afterChildren",
        ease: [0.43, 0.13, 0.23, 0.96], // Custom ease-in-out curve
        duration: 1.2, // Increased for smoother exit
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.9, // Increased for smoother motion
        ease: [0.43, 0.13, 0.23, 0.96], // Custom ease-in-out curve for smoother motion
      }
    },
    exit: {
      y: -30,
      opacity: 0,
      transition: { 
        duration: 1.0, // Increased for smoother exit
        ease: [0.20, 0.13, 0.23, 0.96], // Adjusted ease for smoother exit
      }
    }
  };

  return (
    <section 
      id="about" 
      className="w-full relative overflow-y-hidden"
    >
      {/* Particle container */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {particles.map((index) => (
          <Particle key={index} />
        ))}
      </div>
      
      <motion.article
        className="flex flex-col items-center justify-center w-full h-[90vh] text-center mx-auto px-6 xl:px-0 z-10 relative z-10"
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <motion.h1 
          className="font-bold text-4xl md:text-7xl mx-auto mb-9"
          variants={itemVariants}
        >
          {t("home.purpose.empoweringNomads")} <br />
          {t("home.purpose.oneAtATime")}
        </motion.h1>
        <motion.p 
          className="text-xl font-light mt-2 w-full md:w-8/12 mb-9"
          variants={itemVariants}
        >
          {t("home.purpose.description")}
        </motion.p>
        <motion.div 
          className="w-full md:w-4/12"
          variants={itemVariants}
        >
          <SimpleLightButton
            action={toAboutUs}
            text={t("home.purpose.action")}
            full
            disabled={false}
          />
        </motion.div>
      </motion.article>
    </section>
  );
};
