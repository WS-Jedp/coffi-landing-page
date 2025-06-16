"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import LanguageSelector from "../langSelector";
import { motion, AnimatePresence } from "framer-motion";
import { useRedirectToCoffiApp } from "@/hooks/useRedirectToCoffi";
import { SimpleButton } from "../buttons";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { usePathname } from "next/navigation";

export const Header: React.FC = () => {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const { redirectToCoffi } = useRedirectToCoffiApp();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollToElement } = useSmoothScroll(80); // Pass header height (80px)

  // Check if we're on homepage (either "/" or a locale version like "/en")
  const isHomePage = pathname === "/" || /^\/[a-z]{2}(?:\/)?$/.test(pathname);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleClickMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  // Prevent body scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const menuOptions = [
    {
      name: "Features",
      link: `/#features`,
    },
    {
      name: "Pricing",
      link: `/#pricing`,
    },
    {
      name: "About",
      link: `/#about`,
    },
    {
      name: "Contact",
      link: `/contact-us`,
    },
  ];

  // Function to handle link navigation and close menu
  function handleLinkClick() {
    setIsMenuOpen(false);
  }

  // Function to handle hash link navigation
  function handleHashLinkClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    link: string
  ) {
    e.preventDefault();
    setIsMenuOpen(false);

    // Extract the hash part without the # symbol
    const hash = link.split("#")[1];

    if (hash) {
      if (isHomePage) {
        // If on homepage, just scroll to the section
        window.history.pushState(null, "", link);
        scrollToElement(hash);
      } else {
        // If not on homepage, navigate to home with hash
        const homeWithHash = `/${hash ? "#" + hash : ""}`;
        router.push(homeWithHash);
      }
    } else {
      // If not a hash link, just navigate normally
      router.push(link);
    }
  }

  const menuVariants = {
    closed: {
      x: "-100%",
      opacity: 0,
      transition: {
        duration: 0.6, // Increased for smoother animation
        ease: [0.43, 0.13, 0.23, 0.96], // Custom ease-in-out curve for smoother motion
        staggerChildren: 0,
        when: "afterChildren",
      },
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.7, // Increased for smoother animation
        ease: [0.43, 0.13, 0.23, 0.96], // Custom ease-in-out curve for smoother motion
        staggerChildren: 0.1,
        delayChildren: 0.2,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    closed: {
      x: -20,
      opacity: 0,
      transition: {
        duration: 0.4, // Increased for smoother fade-out
        ease: [0.43, 0.13, 0.23, 0.96], // Custom ease-in-out curve
      },
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6, // Increased for smoother fade-in
        ease: [0.43, 0.13, 0.23, 0.96], // Custom ease-in-out curve
      },
    },
  };

  const footerVariants = {
    closed: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.4,
        ease: [0.43, 0.13, 0.23, 0.96], // Custom ease-in-out curve
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.6, // Increased for more staggered effect
        duration: 0.6, // Increased for smoother animation
        ease: [0.43, 0.13, 0.23, 0.96], // Custom ease-in-out curve
      },
    },
  };

  const currentYear = new Date().getFullYear();

  return (
    <header
      className={`
      sticky top-0 left-0 w-full h-20 flex flex-row flex-nowrap items-center justify-between px-6 z-[999]
      transition-all duration-300 ease-in-out
      ${
        isScrolled
          ? "drop-shadow-md bg-white/90 backdrop-blur-lg"
          : "bg-coffi-white"
      }
    `}
    >
      <div className="w-full max-w-[1200px] h-full flex items-center justify-between mx-auto">
        <article className="flex flex-row flex-nowrap items-center cursor-pointer text-coffi-black">
          <Image
            src="/assets/images/coffi-logo.svg"
            alt="Coffi logo - Coworking spaces and work cafés in Medellín, Colombia"
            width={45}
            height={45}
            className="mr-1"
          />
          <Link href="/" onClick={handleLinkClick}>
            <div className="flex flex-col items-start jusitfy-center h-full border-solid border-black">
              <span className="block font-black text-xl md:text-2xl cursor-pointer my-0 py-0">
                Coffi
              </span>
              <span className="font-light text-xs md:text-sm my-0 py-0 pl-[1px] mt-[-3px]">
                Be where you thrive
              </span>
            </div>
          </Link>
        </article>

        <menu className="relative flex items-center text-coffi-black">
          <ul className="hidden md:flex flex-row flex-nowrap items-center gap-4 ">
            {menuOptions.map((option) => (
              <li
                key={option.name}
                className="font-normal text-xs md:text-sm cursor-pointer hover:text-coffi-purple"
              >
                <Link
                  href={option.link}
                  onClick={(e) =>
                    option.link.includes("#")
                      ? handleHashLinkClick(e, option.link)
                      : handleLinkClick()
                  }
                >
                  {t(`utils.navigationLinks.${option.name.toLowerCase()}`)}
                </Link>
              </li>
            ))}

            <li>
              <LanguageSelector />
            </li>
          </ul>

          <motion.button
            className="block md:hidden p-2 focus:outline-none overflow-hidden"
            aria-label="Toggle Navigation"
            onClick={handleClickMenu}
            whileTap={{
              scale: 0.9,
              transition: { duration: 0.2, ease: "easeInOut" },
            }}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.3, ease: "easeInOut" },
            }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            <div
              className={`w-6 h-1 bg-gray-800 my-1 transition-all duration-300 ease-in-out 
                ${isMenuOpen ? "transform rotate-45 translate-y-2" : ""}`}
            ></div>
            <div
              className={`w-6 h-1 bg-gray-800 my-1 transition-all duration-300 ease-in-out 
                ${isMenuOpen ? "opacity-0" : "opacity-100"}`}
            ></div>
            <div
              className={`w-6 h-1 bg-gray-800 my-1 transition-all duration-300 ease-in-out 
                ${isMenuOpen ? "transform -rotate-45 -translate-y-2" : ""}`}
            ></div>
          </motion.button>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="fixed top-0 bottom-0 left-0 w-full h-screen 
                  bg-white/90 backdrop-blur-lg shadow-lg
                  flex flex-col items-stretch justify-between
                  z-[1000] overflow-y-auto"
                initial="closed"
                animate="open"
                exit="closed"
                variants={menuVariants}
              >
                <article className="w-full flex flex-row justify-between items-center py-3 px-3 border-b">
                  {/* CTA Button */}
                  <motion.div variants={itemVariants}>
                    <SimpleButton
                      action={() => {
                        setIsMenuOpen(false);
                        redirectToCoffi();
                      }}
                      text={t("actions.general.startDiscovering")}
                    />
                  </motion.div>
                  <motion.button
                    className="relative text-coffi-black p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md z-10"
                    onClick={() => setIsMenuOpen(false)}
                    whileTap={{
                      scale: 0.9,
                      transition: { duration: 0.2, ease: "easeInOut" },
                    }}
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: "rgba(0,0,0,0.05)",
                      transition: { duration: 0.3, ease: "easeInOut" },
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </motion.button>
                </article>

                {/* Main menu content */}
                <div className="flex flex-col items-start justify-start pt-24 pb-16 px-8 h-full">
                  <motion.h2
                    className="font-bold text-3xl mb-6 text-coffi-black"
                    variants={itemVariants}
                  >
                    Menu
                  </motion.h2>

                  <ul className="flex flex-col space-y-5 w-full max-w-xs mb-8">
                    {menuOptions.map((option, index) => (
                      <motion.li
                        key={option.name}
                        className="font-normal text-lg cursor-pointer hover:text-coffi-purple transition-colors duration-300"
                        variants={itemVariants}
                        custom={index}
                      >
                        <Link
                          href={option.link}
                          onClick={(e) =>
                            option.link.includes("#")
                              ? handleHashLinkClick(e, option.link)
                              : handleLinkClick()
                          }
                        >
                          {t(`utils.navigationLinks.${option.name.toLowerCase()}`)}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>

                  <motion.div variants={itemVariants}>
                    <LanguageSelector />
                  </motion.div>
                </div>

                {/* Footer section */}
                <motion.footer
                  className="w-full bg-gray-50/70 backdrop-blur-sm py-8 px-6 border-t border-gray-200"
                  variants={footerVariants}
                >
                  <div className="flex flex-col items-center gap-4 max-w-md mx-auto">
                    <div className="flex items-center justify-center mb-2">
                      <Image
                        src="/assets/images/coffi-logo.svg"
                        alt="Coffi logo"
                        width={30}
                        height={30}
                        className="mr-2"
                      />
                      <span className="font-semibold text-gray-800">Coffi</span>
                    </div>

                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-600">
                      <Link
                        href="/terms-of-service"
                        className="hover:text-coffi-purple transition-colors"
                        onClick={handleLinkClick}
                      >
                        {t("utils.navigationLinks.termsAndConditions")}
                      </Link>
                      <Link
                        href="/privacy-policy"
                        className="hover:text-coffi-purple transition-colors"
                        onClick={handleLinkClick}
                      >
                        {t("utils.navigationLinks.privacyPolicy")}
                      </Link>
                      <Link
                        href="/contact-us"
                        className="hover:text-coffi-purple transition-colors"
                        onClick={handleLinkClick}
                      >
                        {t("utils.navigationLinks.contact")}
                      </Link>
                    </div>

                    <div className="text-xs text-gray-500 mt-2 text-center">
                      © {currentYear} Coffi.{" "}
                      {t("utils.copyright.allRightsReserved")}
                    </div>
                  </div>
                </motion.footer>
              </motion.div>
            )}
          </AnimatePresence>
        </menu>
      </div>
    </header>
  );
};
