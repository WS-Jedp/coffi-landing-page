"use client"

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ArrowRight, Instagram, Linkedin } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

/** La curva de la casa, la misma que usan beneficios y precios. */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Los enlaces, en tres grupos y una sola estructura.
 *
 * Antes eran dos arrays — "producto" y "ayuda" — y este último mezclaba
 * atención al cliente con documentos legales: términos, privacidad, FAQs y
 * contacto en la misma pila. Son dos cosas distintas para quien busca. Al
 * separar lo legal queda una tercera columna que además libera la que ocupaban
 * las redes, que ahora son iconos abajo.
 */
const NAV_GROUPS = [
  {
    title: "product",
    links: [
      { name: "about", link: "/#about" },
      { name: "features", link: "/#features" },
      { name: "pricing", link: "/#pricing" },
      { name: "blog", link: "/blog" },
    ],
  },
  {
    title: "help",
    links: [
      { name: "faqs", link: "/faqs" },
      { name: "contact", link: "/contact-us" },
    ],
  },
  {
    title: "legal",
    links: [
      { name: "termsAndConditions", link: "/terms-of-service" },
      { name: "privacyPolicy", link: "/privacy-policy" },
    ],
  },
] as const;

/**
 * Las redes, con icono de verdad.
 *
 * Aquí había un campo `icon` apuntando a `/assets/images/social/*.svg` — una
 * carpeta que NO EXISTE — y el JSX nunca lo llegaba a pintar, así que la ruta
 * muerta no daba la cara en ningún 404. Se va: los glifos salen de
 * `lucide-react`, que ya es la librería de iconos de la casa, y así heredan el
 * grosor de trazo del resto del producto en vez de ser dos SVG sueltos.
 */
const SOCIAL_LINKS = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/coffi-be-where-you-thrive/",
    Icon: Linkedin,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/letscoffi",
    Icon: Instagram,
  },
] as const;

export const Footer: React.FC = () => {
  const t = useTranslations();
  const reduced = useReducedMotion() ?? false;

  // Se calcula al renderizar, así que en enero cambia solo. Escrito a mano
  // decía 2025 estando ya en 2026, que es exactamente lo que pasa siempre con
  // los años literales.
  const year = new Date().getFullYear();

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
  };

  const item = {
    hidden: { opacity: 0, y: reduced ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0.3 : 0.45, ease: EASE },
    },
  };

  return (
    <footer className="relative w-full overflow-hidden bg-coffi-purple text-coffi-white">
      {/*
        El eco de las órbitas.

        Es lo único decorativo del footer y está aquí por una razón: la sección
        de beneficios cierra con anillos concéntricos alrededor de "Tú", y este
        resplandor los recuerda al pie sin volver a dibujarlos. Anclado detrás
        de la marca, no centrado en la página, para que se lea como la luz que
        emite el logo.

        Con el fondo en el morado de marca, ningún morado más claro sirve:
        estaría hecho del mismo tono que el suelo y se lee como una mancha, no
        como luz. Por eso el resplandor se va al AZUL de la casa — es el otro
        extremo del degradado de marca, así que enfría sin salirse de la paleta
        y sí se despega de un fondo saturado.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-40 h-[420px] w-[420px] rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(circle, rgba(194,211,255,0.30) 0%, rgba(194,211,255,0.10) 45%, transparent 70%)",
        }}
      />

      <motion.div
        className="relative mx-auto grid w-full max-w-[1200px] grid-cols-2 gap-x-8 gap-y-12 px-6 pb-10 pt-16 md:grid-cols-12 md:gap-x-12 xl:px-0"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* La marca y su llamada. Ocupa las dos filas de la rejilla en móvil. */}
        <motion.article
          variants={item}
          className="col-span-2 flex flex-col items-start md:col-span-5 lg:col-span-4"
        >
          <Image
            src="/assets/images/coffi-logo-positive-icon.svg"
            width={40}
            height={40}
            alt="Coffi"
            className="mb-5"
          />
          <strong className="mb-2 block text-xl font-bold leading-tight">
            Be where you thrive
          </strong>
          {/*
            Esta línea estaba abajo del todo, centrada, en inglés y escrita a
            pelo — en la página en español se leía en inglés. Sube aquí, donde
            explica de qué va la marca junto al logo en vez de flotar sola bajo
            una divisoria, y pasa por `t()` como el resto.
          */}
          {/*
            Sin opacidad, y ésta es LA restricción de este fondo.
            
            Sobre el morado de marca no existe un blanco tenue que pase AA: al
            70% da 3.70:1 y al 55% da 2.83:1, ambos por debajo de 4.5. El suelo
            está en blanco/85, que ya no se distingue del texto principal — o
            sea que la escala de opacidad simplemente no cabe aquí.
            
            Así que el segundo plano lo marca el PESO (`font-light` contra el
            `font-bold` del eslogan) y el tamaño, no un gris. El color es
            `coffi-purple-50`, que sobre este fondo da 4.99:1.
          */}
          <p className="mb-7 max-w-[34ch] text-sm font-light leading-relaxed text-coffi-purple-50">
            {t("utils.copyright.mission")}
          </p>

          {/*
            Botón blanco, no el degradado de marca.
            
            El degradado arranca justo en este morado, así que sobre este fondo
            la mitad del botón sería invisible. El blanco es lo más lejos que se
            puede llegar de aquí — 5.96:1 con el morado del texto — que es lo
            que se le pide a la acción principal.
          */}
          <a
            href="https://app.coffi.com.co"
            className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-coffi-purple shadow-lg shadow-coffi-purple-900/30 transition-shadow hover:shadow-xl hover:shadow-coffi-purple-900/45 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-coffi-purple"
          >
            {t("actions.general.startDiscovering")}
            {/*
              La flecha se desplaza en el hover, y sólo ella: es el único
              movimiento del footer aparte de la entrada. `motion-reduce`
              lo apaga desde CSS, sin necesitar el hook aquí.
            */}
            <ArrowRight
              size={16}
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
            />
          </a>
        </motion.article>

        {/* Las tres columnas de enlaces, empujadas al borde derecho. */}
        {NAV_GROUPS.map((group) => (
          <motion.nav
            key={group.title}
            variants={item}
            aria-label={t(`utils.navigationLinks.${group.title}`)}
            className="col-span-1 md:col-span-2 lg:col-span-2 lg:col-start-auto"
          >
            {/*
              Titulillo en versalita pequeña y no en `text-xl` como antes.
              Encabezaba con 20px negrita una lista de enlaces de 14px: el
              rótulo pesaba más que su propio contenido y las tres columnas
              competían con el titular de la marca. En versalita ordena sin
              gritar, que es todo lo que tiene que hacer una etiqueta.
            */}
            {/*
              Mismo motivo que la línea de misión: sin opacidad. Lo que baja
              este rótulo de rango no es el color — va casi al blanco — sino
              que mide 11px contra los 14 de sus enlaces, y que el `tracking`
              ancho lo hace leer como etiqueta y no como frase.
            */}
            <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-coffi-purple-50">
              {t(`utils.navigationLinks.${group.title}`)}
            </h3>
            <ul className="space-y-3">
              {group.links.map((option) => (
                <li key={option.name}>
                  <Link
                    href={option.link}
                    className="rounded text-sm font-light text-coffi-purple-50 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-coffi-purple"
                  >
                    {t(`utils.navigationLinks.${option.name}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        ))}
      </motion.div>

      {/* La barra de abajo: quién firma, a la izquierda; dónde encontrarnos, a la derecha. */}
      <motion.div
        variants={item}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative mx-auto flex w-full max-w-[1200px] flex-col-reverse items-center gap-6 border-t border-white/25 px-6 py-7 sm:flex-row sm:justify-between xl:px-0"
      >
        {/* La divisoria sube a /25: al 10% desaparecía sobre un fondo tan claro. */}
        <p className="text-xs text-coffi-purple-50">
          © Coffi, Inc. {year}. {t("utils.copyright.allRightsReserved")}.
        </p>

        <ul className="flex items-center gap-3">
          {SOCIAL_LINKS.map(({ name, href, Icon }) => (
            <li key={name}>
              {/*
                `aria-label` obligatorio: sin texto visible, un enlace de sólo
                icono llega mudo al lector de pantalla. Y `<a>` en vez del
                `Link` de next-intl porque son destinos externos — no hay
                locale que anteponer, y así se les puede poner el `rel` que les
                falta.
              */}
              <a
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={name}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-inset ring-white/35 transition-colors hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Icon size={18} aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
    </footer>
  );
};
