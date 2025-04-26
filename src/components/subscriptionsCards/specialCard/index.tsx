import {
  SimpleDarkButton,
} from "@/components/buttons";
import { ToggleSwitch } from "@/components/inputs/toggle";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

interface SubscriptionSpecialCardProps {
  full?: boolean;
  title: string;
  description: string;
  yearlyPrice: string;
  monthlyPrice: string;
  secondaryYearlyPriceText: string;
  secondaryMonthlyPriceText: string;
  actionButton: string;
}

// Particle component for premium animation
const Particle = () => {
  // Create random values for natural movement
  const size = Math.random() * 4 + 2; // 2-6px
  const startPosition = Math.random() * 100; // 0-100%
  const delay = Math.random() * 10; // 0-10s
  const duration = Math.random() * 10 + 10; // 10-20s
  const pulseSpeed = Math.random() * 3 + 2; // 2-5s for pulse animation
  const opacity = Math.random() * 0.5 + 0.1; // 0.1-0.6

  // Create star shape with clip-path or use a simple shape for better performance
  const starPoints = Math.random() > 0.7 ? 5 : 4; // Mix of 4 and 5 pointed stars

  return (
    <div
      className="absolute bottom-0 pointer-events-none"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${startPosition}%`,
        opacity: opacity,
        backgroundColor: 'rgba(190, 149, 255, 0.8)', // Light coffi purple
        boxShadow: '0 0 8px 2px rgba(190, 149, 255, 0.7)', // Enhanced purple glow
        animation: `float ${duration}s linear ${delay}s infinite, pulse ${pulseSpeed}s ease-in-out infinite alternate`,
        borderRadius: starPoints === 4 ? '50%' : '0', // Circle or star shape
        clipPath: starPoints === 5 ? 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' : 'none',
        transform: `rotate(${Math.random() * 360}deg)`,
      }}
    />
  );
};

export const SubscriptionSpecialCard: React.FC<
  SubscriptionSpecialCardProps
> = ({
  full = false,
  title,
  description,
  yearlyPrice,
  monthlyPrice,
  secondaryYearlyPriceText,
  secondaryMonthlyPriceText,
  actionButton,
}) => {
  const t = useTranslations();
  const [isYearly, setIsYearly] = useState<boolean>(true);
  const [particles, setParticles] = useState<number[]>([]);

  // Initialize particles on component mount
  useEffect(() => {
    setParticles(Array.from({ length: 20 }, (_, i) => i)); // Increase number of particles

    // Add animation keyframes to document
    if (!document.querySelector("#particle-animation-keyframes")) {
      const styleSheet = document.createElement("style");
      styleSheet.id = "particle-animation-keyframes";
      styleSheet.textContent = `
        @keyframes float {
          0% {
            transform: translateY(0) scale(0);
            opacity: 0;
          }
          10% {
            opacity: var(--opacity);
            transform: translateY(0) scale(1);
          }
          100% {
            transform: translateY(-100vh) scale(0.5);
            opacity: 0;
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
      `;
      document.head.appendChild(styleSheet);
    }
  }, []);

  const onToggle = () => setIsYearly(!isYearly);

  return (
    <article
      className={`
            relative flex flex-col items-tart justify-center
            ${full ? "w-full" : "w-full max-w-[270px]"}
            rounded-lg p-5 overflow-hidden
            bg-gradient-to-br from-coffi-purple from-40% to-coffi-blue/30 text-coffi-white
            shadow-xl shadow-coffi-purple-200
        `}
    >
      {/* Particle container */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {particles.map((index) => (
          <Particle key={index} />
        ))}
      </div>

      <section className="w-full flex flex-nowrap items-center justify-between">
        <h2 className="font-extrabold text-3xl md:text-4xl">{title}</h2>

        <ToggleSwitch
          label={t("home.subscriptions.plans.nomad.yearly")}
          isChecked={isYearly}
          onToggle={onToggle}
        />
      </section>
      <p className="text-md font-light mb-1">{description}</p>

      <section className="flex flex-row flex-nowrap items-end justify-start">
        <strong className="font-bold text-xl md:text-2xl mr-1">
          {isYearly ? yearlyPrice : monthlyPrice}
        </strong>
        {isYearly && (
          <p className="text-xs font-bold mb-1">
            {t("home.subscriptions.plans.nomad.billendAnnually")}
          </p>
        )}
      </section>
      <p className="font-light text-xs mb-3">
        {isYearly ? secondaryYearlyPriceText : secondaryMonthlyPriceText}
      </p>

        <div className="z-20">
          <SimpleDarkButton shimmer action={() => {}} text={actionButton} full />
        </div>
    </article>
  );
}