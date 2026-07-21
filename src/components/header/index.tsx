"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import LanguageSelector from "../langSelector";
import { motion, AnimatePresence } from "framer-motion";
import { useRedirectToCoffiApp } from "@/hooks/useRedirectToCoffi";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { usePathname } from "next/navigation";

export const Header: React.FC = () => {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const { redirectToCoffi } = useRedirectToCoffiApp();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollToElement } = useSmoothScroll(96); // Floating pill offset

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

  // Function to handle hash link navigation (works for anchors and buttons)
  function handleHashLinkClick(
    e: React.MouseEvent<HTMLElement>,
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

  // Primary CTA — open the Coffi app
  function handleUseApp() {
    setIsMenuOpen(false);
    redirectToCoffi();
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
    <header className="fixed top-3 md:top-4 inset-x-0 z-[999] flex justify-center px-4 pointer-events-none">
      <nav
        className={`
          pointer-events-auto relative isolate w-full max-w-[1120px]
          flex items-center justify-between
          rounded-2xl px-4 md:px-5 py-2.5
          transition-all duration-300 ease-in-out
          ${
            isScrolled
              ? "bg-white/50 backdrop-blur-xl backdrop-saturate-150 shadow-lg shadow-coffi-purple/10 border border-white/50"
              : "bg-transparent border border-transparent"
          }
        `}
      >
        {/* Dynamic glass background — floating gradient + noise, only when scrolled */}
        <div
          aria-hidden
          className={`absolute inset-0 -z-10 rounded-2xl overflow-hidden transition-opacity duration-700 ${
            isScrolled ? "opacity-90" : "opacity-0"
          }`}
        >
          <motion.div
            className="absolute -inset-16 blur-3xl"
            style={{
              background:
                "radial-gradient(38% 60% at 22% 30%, rgba(110,144,255,0.4), transparent 72%), radial-gradient(42% 62% at 82% 45%, rgba(83,63,255,0.36), transparent 74%)",
            }}
            animate={{
              x: [0, 24, -14, 0],
              y: [0, -10, 8, 0],
              scale: [1, 1.1, 0.95, 1],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -inset-16 blur-3xl"
            style={{
              background:
                "radial-gradient(36% 58% at 65% 78%, rgba(148,148,255,0.32), transparent 72%)",
            }}
            animate={{
              x: [0, -20, 16, 0],
              y: [0, 10, -8, 0],
              scale: [1, 0.94, 1.08, 1],
            }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />
          <div
            className="absolute inset-0 mix-blend-overlay opacity-[0.12]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='coffiHeaderNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23coffiHeaderNoise)'/%3E%3C/svg%3E\")",
              backgroundSize: "180px 180px",
            }}
          />
        </div>

        {/* Left — logo */}
        <Link
          href="/"
          onClick={handleLinkClick}
          className="flex flex-row flex-nowrap items-center gap-1 cursor-pointer text-coffi-black"
        >
          <Image
            src="/assets/images/coffi-logo.svg"
            alt="Coffi logo - Coworking spaces and work cafés in Medellín, Colombia"
            width={42}
            height={42}
          />
          <div className="flex flex-col items-start justify-center">
            <span className="block font-black text-xl md:text-2xl leading-none -mt-1">
              Coffi
            </span>
            <span className="block font-normal text-xs leading-none text-coffi-black/50 md:-mt-0.5 pl-0.5">
              Be Where You Thrive
            </span>
          </div>
        </Link>

        {/* Center — navigation (desktop) */}
        <ul className="hidden md:flex absolute left-1/2 -translate-x-1/2 flex-row flex-nowrap items-center gap-6 text-coffi-black">
          {menuOptions.map((option) => (
            <li
              key={option.name}
              className="font-normal text-sm cursor-pointer hover:text-coffi-purple transition-colors"
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
        </ul>

        {/* Right — actions (desktop) */}
        <div className="hidden md:flex items-center gap-2 lg:gap-3 text-coffi-black">
          <LanguageSelector />

          {/* Secondary CTA — get a plan (scroll to pricing) */}
          <button
            onClick={(e) => handleHashLinkClick(e, "/#pricing")}
            className="rounded-full border border-coffi-purple-300 text-coffi-purple px-4 py-1.5 text-sm font-semibold hover:bg-coffi-purple-50 transition-colors duration-300"
          >
            {t("actions.general.getPlan")}
          </button>

          {/* Primary CTA — use the app */}
          <button
            onClick={handleUseApp}
            className="rounded-full coffi-gradient-blue-to-purple text-white px-5 py-1.5 text-sm font-semibold shadow-md shadow-coffi-purple/30 hover:shadow-lg hover:shadow-coffi-purple/50 transition-all duration-300"
          >
            {t("actions.general.useApp")}
          </button>
        </div>

        {/* Mobile — hamburger */}
        <motion.button
          className="flex md:hidden flex-col items-center justify-center p-2 focus:outline-none overflow-hidden"
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
        >
          <div
            className={`w-6 h-[3px] rounded-full bg-coffi-black my-[3px] transition-all duration-300 ease-in-out
              ${isMenuOpen ? "transform rotate-45 translate-y-[9px]" : ""}`}
          ></div>
          <div
            className={`w-6 h-[3px] rounded-full bg-coffi-black my-[3px] transition-all duration-300 ease-in-out
              ${isMenuOpen ? "opacity-0" : "opacity-100"}`}
          ></div>
          <div
            className={`w-6 h-[3px] rounded-full bg-coffi-black my-[3px] transition-all duration-300 ease-in-out
              ${isMenuOpen ? "transform -rotate-45 -translate-y-[9px]" : ""}`}
          ></div>
        </motion.button>

      </nav>

      {/* Mobile — slide-in menu (kept outside <nav> so the pill's backdrop-blur
          doesn't trap this fixed full-screen overlay inside the pill's box) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="pointer-events-auto fixed top-0 bottom-0 left-0 w-full h-screen
                bg-white/90 backdrop-blur-lg shadow-lg
                flex flex-col items-stretch justify-between
                z-[1000] overflow-y-auto"
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
            >
              <article className="w-full flex flex-row justify-between items-center py-4 px-4 border-b border-gray-200">
                <div className="flex flex-row items-center gap-1 text-coffi-black">
                  <Image
                    src="/assets/images/coffi-logo.svg"
                    alt="Coffi logo"
                    width={32}
                    height={32}
                  />
                  <span className="font-black text-xl leading-none">Coffi</span>
                </div>
                <motion.button
                  className="relative text-coffi-black p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md z-10"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close menu"
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
              <div className="flex flex-col items-start justify-start pt-16 pb-16 px-8 h-full">
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

                {/* CTAs */}
                <motion.div
                  className="flex flex-col gap-3 w-full max-w-xs mb-8"
                  variants={itemVariants}
                >
                  <button
                    onClick={handleUseApp}
                    className="w-full rounded-full coffi-gradient-blue-to-purple text-white px-5 py-3 text-base font-semibold shadow-md shadow-coffi-purple/30 transition-all duration-300"
                  >
                    {t("actions.general.useApp")}
                  </button>
                  <button
                    onClick={(e) => handleHashLinkClick(e, "/#pricing")}
                    className="w-full rounded-full border border-coffi-purple-300 text-coffi-purple px-5 py-3 text-base font-semibold hover:bg-coffi-purple-50 transition-colors duration-300"
                  >
                    {t("actions.general.getPlan")}
                  </button>
                </motion.div>

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
    </header>
  );
};
