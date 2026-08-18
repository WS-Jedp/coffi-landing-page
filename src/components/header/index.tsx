"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import LanguageSelector from "../langSelector";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useRedirectToCoffiApp } from "@/hooks/useRedirectToCoffi";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { usePathname } from "next/navigation";

/* ── Entrada del header ────────────────────────────────────────────────
   Sincronizada con el Hero (components/hero/HeroSearchForm): misma curva,
   mismo patrón contenedor/hijo. La píldora viaja hacia ABAJO y el Hero
   hacia ARRIBA, y ambos cierran a ~1.15s, así que se leen como una sola
   composición armándose en vez de dos animaciones sueltas:

     t=0.00  ▼ píldora            t=0.10  ▲ hero title
     t=0.15    logo               t=0.22  ▲ hero subtitle
     t=0.21    links ×4           t=0.34  ▲ hero searchbar
     t=0.45    idioma + CTAs
     ───────────────────────────────────────────────────────
     ~1.17s asentado          ≈     ~1.14s asentado

   Si se toca el Hero, este reloj hay que recalcularlo: la sincronía no la
   impone ningún mecanismo compartido, son dos líneas de tiempo calzadas a
   mano. Es animación de mount, y el Header vive en el layout, así que no
   se vuelve a disparar al navegar entre rutas — solo en carga completa. */

/** La curva de la casa: HeroSearchForm, CommunityBanner y el menú de abajo. */
const EASE_HOUSE = [0.43, 0.13, 0.23, 0.96] as const;

const ENTER_DELAY = 0.15;
const ENTER_STAGGER = 0.06;

/* Orden del escalonado dentro de la píldora, como índices explícitos en vez
   de `staggerChildren`. Entre el <nav> y sus items hay elementos planos (el
   <ul> centrado, el <div> de acciones) y un fondo decorativo que corre su
   propio `animate`; dejar que Framer infiera el índice ataría el orden a la
   forma del árbol DOM. Así el reloj queda escrito y sobrevive a un refactor
   del marcado. */
const ENTER_ORDER = {
  logo: 0,
  /** Móvil: la hamburguesa ocupa el turno que en desktop abre los links. */
  burger: 1,
  links: 1,
  lang: 5,
  planCta: 6,
  appCta: 7,
} as const;

export const Header: React.FC = () => {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const { redirectToCoffi } = useRedirectToCoffiApp();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollToElement } = useSmoothScroll(96); // Floating pill offset
  const reduceMotion = useReducedMotion() ?? false;

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

  /* La píldora entera bajando a su sitio. */
  const headerVariants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : -16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: EASE_HOUSE },
    },
  };

  /* Cada pieza de adentro. Viaja hacia abajo como la píldora que la
     contiene: invertirlo lee como que el contenido pelea con su marco.
     El `custom` es el índice de ENTER_ORDER. */
  const headerItemVariants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : -8 },
    visible: (order: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: EASE_HOUSE,
        delay: ENTER_DELAY + order * ENTER_STAGGER,
      },
    }),
  };

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
    <header className="fixed top-2 md:top-4 inset-x-0 z-[999] flex justify-center px-4 pointer-events-none">
      <motion.nav
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className={`
          pointer-events-auto relative isolate z-[1001] w-full max-w-[1120px]
          flex items-center justify-between
          rounded-2xl px-4 md:px-5 py-1.5 md:py-2.5
          transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ease-in-out
          ${
            isScrolled
              ? "bg-white/50 backdrop-blur-xl backdrop-saturate-150 shadow-lg shadow-coffi-purple/10 border border-white/50"
              : "bg-transparent border border-transparent"
          }
        `}
      >
        {/* La transición CSS lista sus propiedades una por una en vez de
            `transition-all`: `all` cubre también `transform` y `opacity`, que
            son justo las que Framer reescribe por frame en la entrada de
            arriba, y el navegador las interpolaría 300ms por detrás del
            valor objetivo — la píldora bajaría como con lastre. Las cuatro
            que quedan son exactamente las del estado glass al hacer scroll. */}
        {/* z-[1001] keeps this bar (and its hamburger/X button) rendered
            above the full-screen mobile menu overlay below (z-[1000]) — the
            SAME button toggles both open and close, so there's only ever
            one X on screen instead of two unsynced ones. */}
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

        {/* Left — logo. El motion va en un wrapper y no sobre el <Link>
            porque el <a> de adentro ya es el flex container del lockup; el
            div solo hereda el turno de entrada y no toca la caja. */}
        <motion.div variants={headerItemVariants} custom={ENTER_ORDER.logo}>
          <Link
            href="/"
            onClick={handleLinkClick}
            className="flex flex-row flex-nowrap items-center gap-1 cursor-pointer text-coffi-black"
          >
            {/* Smaller on phones: this bar sits over a scroll-driven map section
                whose copy is fighting for every vertical pixel, and the logo is
                what sets the bar's height. */}
            <Image
              src="/assets/images/coffi-logo.svg"
              alt="Coffi logo - Coworking spaces and work cafés in Medellín, Colombia"
              width={42}
              height={42}
              className="h-[34px] w-[34px] md:h-[42px] md:w-[42px]"
            />
            <div className="flex flex-col items-start justify-center">
              <span className="block font-black text-lg md:text-2xl leading-none -mt-0.5 md:-mt-1">
                Coffi
              </span>
              <span className="block font-normal text-xs leading-none text-coffi-black/50 md:-mt-0.5 pl-0.5">
                Be Where You Thrive
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Center — navigation (desktop) */}
        {/* El <ul> se queda como elemento plano a propósito: está centrado con
            `-translate-x-1/2`, y un transform escrito por Framer pisaría ese
            translate y descuadraría el menú. Anima cada <li>, que no lleva
            transform propio. La herencia de variantes viaja por contexto de
            React, no por el DOM, así que el <ul> intermedio no la corta. */}
        <ul className="hidden md:flex absolute left-1/2 -translate-x-1/2 flex-row flex-nowrap items-center gap-6 text-coffi-black">
          {menuOptions.map((option, index) => (
            <motion.li
              key={option.name}
              variants={headerItemVariants}
              custom={ENTER_ORDER.links + index}
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
            </motion.li>
          ))}
        </ul>

        {/* Right — actions (desktop) */}
        <div className="hidden md:flex items-center gap-2 lg:gap-3 text-coffi-black">
          {/* Envuelto, no convertido: el <button> de LanguageSelector lleva
              `transition` a secas, que en Tailwind incluye transform y opacity
              — las dos que anima la entrada. Con el motion en el wrapper, esa
              transición se queda solo para su propio hover. */}
          <motion.div variants={headerItemVariants} custom={ENTER_ORDER.lang}>
            <LanguageSelector />
          </motion.div>

          {/* Secondary CTA — get a plan (scroll to pricing) */}
          <motion.button
            variants={headerItemVariants}
            custom={ENTER_ORDER.planCta}
            onClick={(e) => handleHashLinkClick(e, "/#pricing")}
            className="rounded-full border border-coffi-purple-300 text-coffi-purple px-4 py-1.5 text-sm font-semibold hover:bg-coffi-purple-50 transition-colors duration-300"
          >
            {t("actions.general.getPlan")}
          </motion.button>

          {/* Primary CTA — use the app. `transition-all` -> `transition-shadow`
              por lo mismo que en el <nav>: el hover aquí solo mueve la sombra,
              pero `all` también interpolaba el transform de la entrada y la
              dejaba arrastrada 300ms detrás. */}
          <motion.button
            variants={headerItemVariants}
            custom={ENTER_ORDER.appCta}
            onClick={handleUseApp}
            className="rounded-full coffi-gradient-blue-to-purple text-white px-5 py-1.5 text-sm font-semibold shadow-md shadow-coffi-purple/30 hover:shadow-lg hover:shadow-coffi-purple/50 transition-shadow duration-300"
          >
            {t("actions.general.useApp")}
          </motion.button>
        </div>

        {/* Mobile — hamburger. Two bars (not three) morph into an X via
            coordinated spring physics — each just rotates and slides to
            center — instead of independent CSS transitions, plus a color
            shift to coffi-purple while open to reinforce the active state.
            No background chrome — just the bars themselves. */}
        {/* El `transition` spring de abajo es el default del componente, pero
            la variante de entrada trae el suyo propio y ese gana: el resorte
            sigue siendo solo de hover/tap, la entrada mantiene la curva de la
            casa como el resto de la píldora. */}
        <motion.button
          className="relative flex md:hidden h-10 w-10 items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-coffi-purple/40 rounded-full"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          onClick={handleClickMenu}
          variants={headerItemVariants}
          custom={ENTER_ORDER.burger}
          whileTap={{ scale: 0.88 }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
        >
          <span className="relative flex h-4 w-5 items-center justify-center">
            <motion.span
              className="absolute top-1/2 h-[2px] w-5 -translate-y-1/2 rounded-full"
              animate={{
                rotate: isMenuOpen ? 45 : 0,
                y: isMenuOpen ? 0 : -4,
                backgroundColor: isMenuOpen ? "#533FFF" : "#312F3D",
              }}
              transition={{ type: "spring", stiffness: 350, damping: 24 }}
            />
            <motion.span
              className="absolute top-1/2 h-[2px] w-5 -translate-y-1/2 rounded-full"
              animate={{
                rotate: isMenuOpen ? -45 : 0,
                y: isMenuOpen ? 0 : 4,
                backgroundColor: isMenuOpen ? "#533FFF" : "#312F3D",
              }}
              transition={{ type: "spring", stiffness: 350, damping: 24 }}
            />
          </span>
        </motion.button>

      </motion.nav>

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
              {/* No local logo/close row here — the fixed nav bar (with its
                  own logo and the hamburger-turned-X button) stays visible
                  above this overlay via z-[1001], so it's the single control
                  for both opening and closing. pt-24 below just clears that
                  bar's height instead of a second, redundant header row. */}

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
