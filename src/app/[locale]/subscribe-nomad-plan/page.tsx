"use client";

import { useState, useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { SimpleDarkButton } from "@/components/buttons";
import { ToggleSwitch } from "@/components/inputs/toggle";
import { Check, Coffee, Globe, Users, Loader2, AlertCircleIcon, CurrencyIcon, DollarSignIcon, CircleDollarSignIcon, AlertTriangleIcon, CheckCircle2 } from "lucide-react";
import {
  getWompiPaymentReference,
  validateUserSubscription,
} from "@/services/wompi";
import Link from "next/link";

// Particle component for premium animation
const Particle = () => {
  // Create random values for natural movement
  const size = Math.random() * 4 + 2; // 2-6px
  const startPosition = Math.random() * 100; // 0-100%
  const delay = Math.random() * 10; // 0-10s
  const duration = Math.random() * 10 + 10; // 10-20s
  const pulseSpeed = Math.random() * 3 + 2; // 2-5s for pulse animation
  const opacity = Math.random() * 0.5 + 0.1; // 0.1-0.6
  const starPoints = Math.random() > 0.7 ? 5 : 4; // Mix of 4 and 5 pointed stars

  return (
    <div
      className="absolute bottom-0 pointer-events-none"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${startPosition}%`,
        opacity: opacity,
        backgroundColor: "rgba(190, 149, 255, 0.8)", // Light coffi purple
        boxShadow: "0 0 8px 2px rgba(190, 149, 255, 0.7)", // Enhanced purple glow
        animation: `float ${duration}s linear ${delay}s infinite, pulse ${pulseSpeed}s ease-in-out infinite alternate`,
        borderRadius: starPoints === 4 ? "50%" : "0", // Circle or star shape
        clipPath:
          starPoints === 5
            ? "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)"
            : "none",
        transform: `rotate(${Math.random() * 360}deg)`,
      }}
    />
  );
};

// Feature component with animation - Updated to use variants
const Feature = ({
  icon,
  title,
  description,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}) => {
  // Define interfaces for variant animations
  interface VariantAnimationProps {
    opacity: number;
    y: number;
    scale: number;
  }

  interface VariantTransition {
    duration: number;
    ease: number[];
    delay: number;
  }

  interface VariantWithTransition extends VariantAnimationProps {
    transition: VariantTransition;
  }

  interface FeatureVariants {
    hidden: VariantAnimationProps;
    visible: (index: number) => VariantWithTransition;
    [key: string]: any; // Add index signature to make it compatible with Variants type
  }

  const featureItemVariants: FeatureVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    visible: (index: number): VariantWithTransition => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.85,
        ease: [0.21, 0.45, 0.15, 1], // Custom easing for elegant motion
        delay: 0.1 * index, // Additional delay based on index for consecutive animation
      },
    }),
  };
  return (
    <motion.div
      className="flex items-start gap-3 mb-4"
      variants={featureItemVariants}
      custom={index}
    >
      <div className="mt-1 bg-coffi-purple-100/20 p-2 rounded-full">{icon}</div>
      <div>
        <h3 className="font-bold text-white text-lg">{title}</h3>
        <p className="text-sm text-coffi-white/80">{description}</p>
      </div>
    </motion.div>
  );
};

export default function NomadPlanPage() {
  const t = useTranslations();
  const locale = useLocale();
  const formRef = useRef<HTMLFormElement>(null);
  const [isYearly, setIsYearly] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [particles, setParticles] = useState<number[]>([]);
  const [isEmailFormatValid, setIsEmailFormatValid] = useState<boolean>(false);
  const [isEmailExisting, setIsEmailExisting] = useState<boolean>(false);
  const [isSubscriptionValid, setIsSubscriptionValid] = useState<boolean>(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState<boolean>(false);
  const [emailCheckTimeout, setEmailCheckTimeout] =
    useState<NodeJS.Timeout | null>(null);

  // Initialize particles on component mount
  useEffect(() => {
    setParticles(Array.from({ length: 42 }, (_, i) => i));

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

  // Validate email format
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setIsEmailFormatValid(isValid);

    // Clear previous timeout
    if (emailCheckTimeout) {
      clearTimeout(emailCheckTimeout);
    }

    // Reset existing email status when typing
    if (isEmailExisting) {
      setIsEmailExisting(false);
    }

    // If email format is valid, set a timeout before checking
    if (isValid && email.trim() !== "") {
      setIsCheckingEmail(true);

      // Create a new timeout - wait 1.5 seconds before checking
      const newTimeout = setTimeout(() => {
        validateUserSubscription({ email }).then((resp) => {
          setIsEmailExisting(resp?.userExists || false);
          setIsSubscriptionValid(resp?.isValid || false);
          setIsCheckingEmail(false);
        });
      }, 1500);

      // Save the timeout ID for cleanup
      setEmailCheckTimeout(newTimeout);
    } else {
      setIsCheckingEmail(false);
    }

    // Cleanup function
    return () => {
      if (emailCheckTimeout) {
        clearTimeout(emailCheckTimeout);
      }
    };
  }, [email]);

  const onToggle = () => setIsYearly(!isYearly);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isEmailFormatValid || !isEmailExisting) return;

    setIsLoading(true);

    try {
      const wompiKeys = await getWompiPaymentReference({
        email,
        isYearly: isYearly,
        currency: "COP",
      });

      if (!wompiKeys) return;

      const checkoutForm = document.createElement("form");
      checkoutForm.method = "GET";
      checkoutForm.action = process.env.NEXT_PUBLIC_WOMPI_CHECKOUT_URL || "";

      const addHiddenField = (name: string, value: string) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = value;
        checkoutForm.appendChild(input);
      };

      // Required fields
      addHiddenField("public-key", wompiKeys.wompiPublicKey);
      addHiddenField("currency", "COP");
      addHiddenField("amount-in-cents", wompiKeys.priceInCOP.toString());
      addHiddenField("reference", wompiKeys.coffiDbReferenceId);
      addHiddenField("signature:integrity", wompiKeys.wompiIntegrationSecret);

      // Restrict payment methods to credit/debit cards only
      addHiddenField("payment-methods", "CARD");

      const redirectUrl =
        window.location.origin +  `/${locale}/payment-status?email=${email}`;
      addHiddenField("redirect-url", redirectUrl);

      // Customer data
      addHiddenField("customer-data:email", email);

      document.body.appendChild(checkoutForm);
      checkoutForm.submit();
    } catch (error) {
      console.error("Error initiating checkout", error);
      setIsLoading(false);
    }
  };

  // Pricing details
  const earlyAdopterYearlyPrice = "$69";
  const yearlyPrice = "$99";
  const monthlyPrice = "$12";
  const secondaryYearlyPriceText = t(
    "home.subscriptions.plans.nomad.billendAnnually"
  );
  const secondaryMonthlyPriceText = t(
    "home.subscriptions.plans.nomad.billedMonthly"
  );

  // Animation variants - Enhanced for smoother animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Increased for more spacing between animations
        delayChildren: 0.5, // Increased initial delay
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1, y: 0,
      transition: {
        duration: 0.9, // Longer duration for smoother feeling
        ease: [0.1, 0.5, 0.3, 1], // Smoother easing curve
      },
    },
  };

  // Feature-specific animation variants for consecutive animation
  const featuresContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4, // Longer delay between each feature
        delayChildren: 0.2,
      },
    },
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-coffi-blue/80 to-coffi-purple/80 backdrop-blur-lg py-10 px-4 md:py-20">
      {/* Particle container */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {particles.map((index) => (
          <Particle key={index} />
        ))}
      </div>
      <motion.div
        className="max-w-6xl mx-auto bg-gradient-to-br from-coffi-purple/60 to-coffi-blue/60 backdrop-blur-lg rounded-2xl  overflow-hidden shadow-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.2, // Slower, more elegant entrance
          ease: [0.16, 1, 0.3, 1], // Custom easing for smoother feel
          delay: 0.15, // Slight delay for dramatic effect
        }}
      >
        <div className="flex flex-col md:flex-row">
          {/* Left Column - Plan Details */}
          <div className="w-full md:w-1/2 p-6 md:p-10 relative z-10">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="flex flex-row flex-nowrap items-center justify-between">
                <motion.h1
                  className="text-4xl md:text-5xl font-bold text-white"
                  variants={itemVariants}
                >
                  {t("home.subscriptions.plans.nomad.title")}
                </motion.h1>
                <ToggleSwitch
                  label={t("home.subscriptions.plans.nomad.yearly")}
                  isChecked={isYearly}
                  onToggle={onToggle}
                  whiteText
                />
              </div>

              <motion.p
                className="text-coffi-white/80 text-lg mb-3"
                variants={itemVariants}
              >
                {t("home.subscriptions.plans.nomad.description")}
              </motion.p>

              <motion.div className="mb-3" variants={itemVariants}>
               
                <motion.div
                  className="flex items-end"
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className={`text-coffi-white text-4xl font-bold ${isYearly ? 'line-through opacity-75' : 'mr-2'}`}>
                    {isYearly ? yearlyPrice : monthlyPrice}
                  </span>
                  {
                    isYearly && (
                      <span className="text-coffi-white text-4xl font-bold mr-2">
                        {earlyAdopterYearlyPrice}
                      </span>
                    ) 
                  }
                  <span className="text-coffi-white/70 mb-1">
                    {isYearly
                      ? secondaryYearlyPriceText
                      : secondaryMonthlyPriceText}
                  </span>
                </motion.div>

                {isYearly && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-coffi-purple-400/20 text-white px-3 rounded-full text-sm inline-block"
                    >
                      {t("home.subscriptions.plans.nomad.savePercentYearly", {
                        percent: "52",
                      })}
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="mt-2 bg-coffi-white/20 border border-coffi-white rounded-md p-2 text-sm text-coffi-white"
                    >
                      <div className="font-bold">{t('subscriptions.nomad.earlyAdopter.price')}</div>
                      <div className="text-white/80 text-xs">{t('subscriptions.nomad.earlyAdopter.forLimitedTime')}</div>
                    </motion.div>
                    
                  </>
                )}
              </motion.div>

              <motion.div className="mb-8" variants={itemVariants}>
                <h2 className="text-xl font-semibold text-coffi-white mb-4">
                  {t("home.subscriptions.plans.benefitsAndFeatures")}
                </h2>

                <motion.div
                  variants={featuresContainerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Feature
                    icon={<Globe className="text-coffi-white" size={20} />}
                    title={t(
                      "home.subscriptions.plans.nomad.benefits.officialAndCommunitySpotsAccess"
                    )}
                    description={t(
                      "home.subscriptions.plans.nomad.benefitsDescriptions.officialAndCommunitySpotsAccess"
                    )}
                    index={0}
                  />

                  <Feature
                    icon={<Users className="text-coffi-white" size={20} />}
                    title={t(
                      "home.subscriptions.plans.nomad.benefits.realTimeFilter"
                    )}
                    description={t(
                      "home.subscriptions.plans.nomad.benefitsDescriptions.realTimeFilter"
                    )}
                    index={1}
                  />

                  <Feature
                    icon={<Coffee className="text-coffi-white" size={20} />}
                    title={t(
                      "home.subscriptions.plans.nomad.benefits.exclusiveDiscounts"
                    )}
                    description={t(
                      "home.subscriptions.plans.nomad.benefitsDescriptions.exclusiveDiscounts"
                    )}
                    index={2}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column - CTA Form */}
          <div className="w-full md:w-1/2 bg-coffi-white/10 backdrop-blur-md p-6 md:p-10 relative z-10">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="h-full flex flex-col"
            >
              <motion.h2
                className="text-3xl font-bold text-white mb-4"
                variants={itemVariants}
              >
                {t("home.subscriptions.plans.nomad.checkout.getStarted")}
              </motion.h2>

              <motion.p
                className="text-coffi-white/80 mb-8"
                variants={itemVariants}
              >
                {t("home.subscriptions.plans.nomad.checkout.description")}
              </motion.p>

              <motion.form
                ref={formRef}
                className="flex flex-col space-y-3 flex-grow"
                variants={itemVariants}
                onSubmit={handleSubmit}
              >
                <div className="space-y-2">
                  <label className="text-coffi-white text-sm block">
                    {t(
                      "home.subscriptions.plans.nomad.checkout.coffiEmailAccount"
                    )}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className={`w-full bg-white/20 border ${
                      email && !isEmailFormatValid
                        ? "border-red-400"
                        : isEmailExisting
                        ? "border-emerald-400"
                        : "border-white/20"
                    } text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-coffi-purple-300 transition-all placeholder:text-white/50`}
                    required
                  />
                </div>

                {/* Email validation status */}
                <div className="space-y-1">
                  {email && (
                    <>
                      {!isEmailFormatValid && (
                        <div className="flex items-center">
                          <span className="text-red-400 text-sm">
                            {t(
                              "home.subscriptions.plans.nomad.checkout.invalidEmailFormat"
                            )}
                          </span>
                        </div>
                      )}

                      {
                     isEmailFormatValid && isCheckingEmail && (
                          <div className="flex items-center">
                            <Loader2
                              className="text-coffi-white/80 mr-2 animate-spin"
                              size={18}
                            />
                            <span className="text-sm text-coffi-white/80">
                              {t(
                                "home.subscriptions.plans.nomad.checkout.checkingEmail"
                              )}
                            </span>
                          </div>
                        )
                      }

                      {isEmailFormatValid &&
                        !isCheckingEmail &&
                        isEmailExisting && isSubscriptionValid ? (
                          <div className="flex items-center">
                            <Check
                              className="text-emerald-400 mr-2"
                              size={18}
                            />
                            <span className="text-sm text-coffi-white/80">
                              {t(
                                "home.subscriptions.plans.nomad.checkout.emailValidated"
                              )}
                            </span>
                          </div>
                        ) : isEmailExisting && !isSubscriptionValid && (
                          <div className="flex items-center">
                            <Check
                              className="text-emerald-400 mr-2"
                              size={18}
                            />
                            <span className="text-sm text-coffi-white/80">
                              {t(
                                "home.subscriptions.plans.nomad.checkout.emailWithValidSubscription"
                              )}
                            </span>
                          </div>
                        )}

                      {isEmailFormatValid &&
                        !isCheckingEmail &&
                        !isEmailExisting && (
                          <div className="flex items-center">
                            <span className="text-sm text-amber-400">
                              {t(
                                "home.subscriptions.plans.nomad.checkout.emailNotFound"
                              )}
                            </span>
                          </div>
                        )}
                    </>
                  )}
                </div>

                {/* Payment Information Section */}
                <div className="mt-4 p-3 bg-white/10 rounded-lg border border-white/20">
                  <h4 className="font-semibold text-white mb-2">{t('subscriptions.payments.title')}</h4>
                  
                  <div className="space-y-2 text-xs text-coffi-white/80">
                    <p className="flex items-center">
                      <AlertCircleIcon size={18} className="inline-flex mr-2" />
                      <span>
                        {t('subscriptions.payments.process.throughExternal')} <Link href="https://wompi.com/es/co/" target="_blank" rel="noopener noreferrer" className="inline underline font-bold">Wompi</Link> {t('subscriptions.payments.process.paymentPlatform')}
                      </span>
                    </p>
                    
                    <p className="flex flex-row  items-center">
                      <CircleDollarSignIcon size={27} className="inline-flex mr-2" />
                      {t('subscriptions.payments.process.chargesMayVary')}
                    </p>
                    
                    <p className="flex items-center">
                      <AlertTriangleIcon size={21} className="inline-flex mr-2" />
                      {t('subscriptions.payments.process.coffiIsNotResponsible')}
                    </p>
                  </div>
                </div>

                <div className="mt-auto pt-4">
                  <SimpleDarkButton
                    shimmer
                    action={() => {
                      if (formRef.current) {
                        formRef.current.dispatchEvent(
                          new Event("submit", {
                            cancelable: true,
                            bubbles: true,
                          })
                        );
                      }
                    }}
                    text={
                      isLoading
                        ? t(
                            "home.subscriptions.plans.nomad.checkout.processing"
                          )
                        : t(
                            "home.subscriptions.plans.nomad.checkout.continueToCheckout"
                          )
                    }
                    full
                    disabled={
                      (!isEmailFormatValid || !isEmailExisting || isLoading) || (isEmailFormatValid && isEmailExisting && !isSubscriptionValid)
                    }
                  />

                  <p className="text-xs text-center text-coffi-white/60 mt-4">
                    {t("home.subscriptions.plans.nomad.checkout.securePayment")}
                  </p>
                </div>
              </motion.form>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
