import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import {
  AMBIENCE_ICON,
  type Ambience,
} from "@/features/map-intro/map/pinVocabulary";
import { ConnectionsOrbit } from "./ConnectionsOrbit";

/**
 * Tope de altura de las dos tarjetas superiores en desktop.
 *
 * Es un objetivo de diseño, no una medida del contenido: sin él la tarjeta
 * manda sobre la sección, y con la banda orbital a proporción 2:1 se iba a
 * 811px y empujaba todo lo de abajo fuera de pantalla.
 *
 * Se cumple de 1024 en adelante, que es donde se pidió: ahí el texto ocupa
 * 268px y la banda se queda con los 212 restantes. Entre 768 y 1023 la tarjeta
 * es más estrecha, el párrafo envuelve hasta 392px y 480 dejaría de caber — ver
 * el `Math.max` de abajo, que es lo que evita que el tope corte texto.
 */
const CARD_H = 480;

/**
 * La curva de la casa: la misma que ya usan los artículos del blog y el resto
 * de entradas de la landing. Sale rápido y frena largo, que es lo que hace que
 * un bloque parezca ATERRIZAR en vez de deslizarse hasta pararse.
 */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const Benefits: React.FC = () => {
  const t = useTranslations();
  const reduced = useReducedMotion() ?? false;
  const sectionOneRef = useRef<HTMLDivElement>(null);
  const sectionTwoRef = useRef<HTMLDivElement>(null);
  /**
   * Si el contenido de las tarjetas ya puede poblarse.
   *
   * Lo dispara el `onViewportEnter` del artículo, el MISMO evento que revela
   * las tarjetas. Antes venía de un `useInView` propio sobre la tarjeta uno con
   * otro margen, así que los lugares podían empezar a caer antes de que su
   * tarjeta hubiera llegado — dos relojes para una sola entrada.
   */
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [sectionHeight, setSectionHeight] = useState<string | number>("auto");
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and when window resizes
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Equal height effect for sections
  useEffect(() => {
    const adjustHeights = () => {
      if (sectionOneRef.current && sectionTwoRef.current) {
        // Reset heights to auto to measure actual content height
        sectionOneRef.current.style.height = "auto";
        sectionTwoRef.current.style.height = "auto";

        // Get natural content heights after a small delay
        setTimeout(() => {
          if (sectionOneRef.current && sectionTwoRef.current) {
            const sectionOneHeight = sectionOneRef.current.scrollHeight;
            const sectionTwoHeight = sectionTwoRef.current.scrollHeight;

            // Set both sections to the height of the taller one
            const maxHeight = Math.max(sectionOneHeight, sectionTwoHeight);
            // En desktop, 480 es el OBJETIVO, no un recorte.
            //
            // `Math.min` contra el alto natural era lo obvio y cortaba texto:
            // medido a 768px de viewport, el párrafo de esta tarjeta envuelve
            // hasta 392px y el de la vecina hasta 448, así que ninguna de las
            // dos cabe en 480 y la diferencia se comía palabras contra el
            // `overflow-hidden`. Con `max`, las tarjetas valen 480 en cuanto el
            // contenido lo permite — de 1024 para arriba, que es donde se pidió
            // el tope — y crecen sólo cuando la alternativa sería cortar.
            setSectionHeight(
              window.innerWidth >= 768
                ? Math.max(maxHeight, CARD_H)
                : maxHeight,
            );
          }
        }, 0);
      }
    };

    // Initial adjustment
    adjustHeights();

    // Adjust on window resize
    window.addEventListener("resize", adjustHeights);

    return () => {
      window.removeEventListener("resize", adjustHeights);
    };
  }, []); // Run once on mount

  /*
    Cada tarjeta declara para qué es buena el lugar, que es lo que decide su
    icono. Es un dato inventado, como el nombre y la distancia que ya llevaban:
    la landing no tiene lugares reales que consultar aquí. Lo que NO se inventa
    es el icono — sale del mismo vocabulario que pinta los pines del mapa, para
    que el visitante no tenga que reaprender el símbolo al abrir el producto.
  */
  const allPlaceCards = [
    // Top row - spread across the width
    {
      name: "Coffee Club",
      ambience: "work" as Ambience,
      distance: "2.3",
      depth: 0,
      position: { x: "1%", y: 0 },
    },
    {
      name: "Espresso Lane",
      ambience: "study" as Ambience,
      distance: "3.4",
      depth: 2,
      position: { x: "42%", y: 6 },
    },
    {
      name: "Caffeine Corner",
      ambience: "cowork" as Ambience,
      distance: "1.9",
      depth: 0,
      position: { x: "76%", y: 3 },
    },

    // Middle row - offset from top row positions
    {
      name: "The Roastery",
      ambience: "fun" as Ambience,
      distance: "5.3",
      depth: 0,
      position: { x: "30%", y: 54 },
    },
    {
      name: "The Coffee Lab",
      ambience: "study" as Ambience,
      distance: "4.5",
      depth: 1,
      position: { x: "1%", y: 81 },
    },

    // Bottom row - balanced distribution
    {
      name: "Bitter Sweet",
      ambience: "romantic" as Ambience,
      distance: "2.1",
      depth: 1,
      position: { x: "69%", y: 66 },
    },
    {
      name: "Nights And Coffe",
      ambience: "fun" as Ambience,
      distance: "3.6",
      depth: 2,
      position: { x: "45%", y: 99 },
    },
  ];

  // Generate a reduced set of cards with optimal distribution
  const placeCards = useMemo(() => {
    if (isMobile) {
      return [
        { ...allPlaceCards[0], position: { x: "3%", y: "0%" } },
        { ...allPlaceCards[1], position: { x: "-6%", y: "66%" } },
        { ...allPlaceCards[2], position: { x: "30%", y: "42%" } },
        { ...allPlaceCards[3], position: { x: "60%", y: "1%" } },
        { ...allPlaceCards[4], position: { x: "60%", y: "66%" } },
        // { ...allPlaceCards[6], position: { x: '12%', y: '36%' } },
      ];
    }
    return allPlaceCards;
  }, [isMobile]);

  /**
   * La entrada de la sección, en dos tiempos.
   *
   * Primero ATERRIZAN las superficies — el titular y las tres tarjetas — y sólo
   * después se PUEBLA lo que vive dentro de ellas: los lugares que flotan, la
   * gente que orbita, los teléfonos. Es la promesa del copy contada con
   * movimiento: la tarjeta no llega llena, se llena a la vista. Antes las dos
   * cosas ocurrían a la vez y la sección aparecía ya terminada, que es justo lo
   * que la sección no dice.
   *
   * El escalonado es corto a propósito. La versión anterior colgaba el MISMO
   * objeto del artículo y de la rejilla, así que los dos `delayChildren` de 0.2
   * se sumaban a dos `staggerChildren` de 0.3 y la tercera tarjeta no arrancaba
   * hasta 1.3s: para entonces, quien venía bajando ya la tenía a media pantalla
   * y se perdía la entrada entera. Aquí la rejilla sólo REPARTE, no vuelve a
   * retrasar, y el montaje completo cabe en medio segundo.
   */
  const v = useMemo(() => {
    // Con `prefers-reduced-motion` desaparece el recorrido, no la secuencia: el
    // orden en que llegan las cosas es información — primero el continente,
    // luego el contenido — y eso se conserva aunque sólo quede la opacidad.
    const rise = reduced ? 0 : 28;
    const settle = reduced ? 1 : 0.985;
    const dur = reduced ? 0.3 : 0.55;

    return {
      /** El artículo sólo dirige el orden; no anima nada propio. */
      section: {
        hidden: {},
        visible: { transition: { staggerChildren: 0.1, delayChildren: 0.04 } },
      },
      /** La rejilla reparte entre sus tres tarjetas y nada más. */
      grid: {
        hidden: {},
        visible: { transition: { staggerChildren: 0.09 } },
      },
      title: {
        hidden: { opacity: 0, y: reduced ? 0 : 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: reduced ? 0.3 : 0.5, ease: EASE },
        },
      },
      /**
       * La escala arranca en 0.985 y no más abajo. Con las tarjetas superiores
       * a altura fija (ver CARD_H) una escala perceptible haría respirar al
       * sistema orbital de al lado, que mide su propia caja para sacar el radio.
       * A este valor el gesto se nota como peso al aterrizar y no como zoom.
       */
      card: {
        hidden: { opacity: 0, y: rise, scale: settle },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: dur, ease: EASE },
        },
      },
      /**
       * Los teléfonos entran desde fuera y se enderezan hasta 0.
       *
       * Hasta 0 y no hasta su inclinación final: el reposo lo pone el
       * `animate-float-*` de CSS, que vive en el div de dentro. Estaban los dos
       * en el MISMO elemento peleándose por `transform`, y como una animación
       * CSS gana al estilo en línea, el `rotate` de aquí no llegaba a verse
       * nunca — la entrada quedaba en un fundido. Al separarlos, las dos
       * rotaciones se componen: el teléfono entra pasado de vuelta y se posa en
       * los -6°/+6° de la flotación.
       */
      phoneLeft: {
        hidden: { opacity: 0, x: reduced ? 0 : -48, rotate: reduced ? 0 : -10 },
        visible: {
          opacity: 1,
          x: 0,
          rotate: 0,
          transition: {
            duration: reduced ? 0.3 : 0.65,
            delay: reduced ? 0 : 0.2,
            ease: EASE,
          },
        },
      },
      phoneRight: {
        hidden: { opacity: 0, x: reduced ? 0 : 48, rotate: reduced ? 0 : 10 },
        visible: {
          opacity: 1,
          x: 0,
          rotate: 0,
          transition: {
            duration: reduced ? 0.3 : 0.65,
            delay: reduced ? 0 : 0.32,
            ease: EASE,
          },
        },
      },
    };
  }, [reduced]);

  return (
    <motion.article
      className="relative flex flex-col items-end justify-start w-full h-min-screen h-auto text-end px-6 xl:px-0 mx-auto mt-9"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-15% 0px" }}
      onViewportEnter={() => setShouldAnimate(true)}
      variants={v.section}
    >
      <motion.h2
        className="font-bold text-4xl md:text-7xl mb-6"
        variants={v.title}
      >
        {t("home.benefits.enhanceYourJourney")}{" "}
        <br className="hidden md:block" />
        {t("home.benefits.coffiBenefits")}
      </motion.h2>

      <motion.section
        className="relative w-full h-auto grid grid-cols-4 grid-rows-2 gap-4 md:gap-4"
        variants={v.grid}
      >
        {/* Section One */}
        <motion.article
          className="flex flex-col items-start justify-start text-start col-span-4 md:col-span-2 bg-coffi-blue/20 text-coffi-purple rounded-md overflow-hidden"
          style={{ height: sectionHeight }}
          variants={v.card}
          ref={sectionOneRef}
        >
          <section className="px-6 pt-6 pb-4 md:flex-grow">
            <h2 className="font-extrabold text-3xl md:text-4xl mb-2">
              {t("home.benefits.matchYourFavoriteSpots.title")}
            </h2>
            <p className="font-light text-lg">
              {t("home.benefits.matchYourFavoriteSpots.description")}
            </p>
          </section>

          {/*
            Los lugares se POSAN, escalonados y por profundidad.

            Antes aparecían de golpe: `shouldAnimate` los montaba ya flotando,
            sin entrada. Al lado, en la tarjeta vecina, la gente del sistema
            orbital sí llega escalonada (escala 0→1, 0.12s entre una y otra), y
            la diferencia se veía — una tarjeta se poblaba y la otra ya estaba
            poblada. Esto le da al mapa el mismo idioma que su vecina.

            El orden del escalonado NO es el del array: se ordena por
            profundidad, así que primero aterrizan los lugares nítidos del
            frente y los borrosos del fondo llegan detrás. Es lo que convierte
            siete tarjetas en un espacio con capas en vez de en una lista.

            Dos divs y no uno, que es la parte que hay que respetar: la
            ENTRADA vive fuera y la flotación infinita dentro. Las dos escriben
            `transform`, y en un solo elemento los fotogramas del bucle
            machacan la entrada en cuanto arrancan.
          */}
          <div className="w-full relative flex-shrink-0 h-[160px]">
            {shouldAnimate &&
              placeCards.map((card, i) => {
                // Create depth effect
                const scale = 1 - card.depth * 0.08; // Slightly reduced depth effect
                const blur = card.depth * 1; // Slightly reduced blur
                const zIndex = 10 - card.depth;
                const opacity = 0.95 - card.depth * 0.1; // Slight opacity variation by depth

                // Create more subtle animation parameters with varied timing
                const floatY = 2 + (i % 4); // Reduced range (2-5px)
                const floatDuration = 4 + (i % 7) * 1.5; // Varied durations (4-13.5 seconds)
                const rotateAmount =
                  i % 3 === 0 ? 0.6 : i % 3 === 1 ? -0.6 : 0.3; // Three rotation patterns
                const delayAmount = (i * 0.3) % 3; // Shorter staggered delays for smoother overall effect

                // 0.32 es el hueco: la tarjeta que los contiene sale a 0.14 y
                // tarda 0.55 en asentarse, así que los lugares empiezan a caer
                // con ella todavía en movimiento. Esperar a que pare dejaba un
                // silencio a mitad de la secuencia.
                const enterDelay = 0.32 + card.depth * 0.12 + (i % 3) * 0.05;

                return (
                  <motion.div
                    key={`floating-card-${i}`}
                    className="pointer-events-none absolute"
                    style={{
                      filter: `blur(${blur}px)`,
                      zIndex,
                      left: card.position.x,
                      top: card.position.y,
                      transformOrigin: "center center",
                    }}
                    // Sin centrado: `left` es el BORDE IZQUIERDO, no el centro.
                    //
                    // Aquí había un `transform: translateX(-50%)` en `style` con
                    // el comentario "centra la tarjeta en su punto", y era
                    // mentira: motion COMPONE `style.transform` a partir de sus
                    // propios valores (`y`, `rotate`, `scale`), así que
                    // machacaba ese string en cuanto arrancaba la flotación. El
                    // centrado nunca llegó a existir y las posiciones de
                    // `allPlaceCards` están ajustadas a ojo contra lo que se ve
                    // de verdad. Pasarlo a `x: "-50%"` lo hace funcionar por fin
                    // — y por eso mismo corre las siete tarjetas 85px a la
                    // izquierda, media tarjeta, hasta salirse del recuadro. Si
                    // algún día se quiere centrado real hay que re-ajustar las
                    // doce posiciones (siete de escritorio, cinco de móvil), no
                    // reactivar esta línea.
                    initial={{
                      opacity: 0,
                      y: reduced ? 0 : 14,
                      scale: reduced ? scale : scale * 0.9,
                    }}
                    animate={{ opacity, y: 0, scale }}
                    transition={{
                      duration: reduced ? 0.3 : 0.5,
                      delay: reduced ? 0 : enterDelay,
                      ease: EASE,
                    }}
                  >
                    <motion.div
                      className="bg-white/90 backdrop-blur-sm rounded-xl w-[170px] h-14 flex flex-row items-center justify-start p-2 gap-2"
                      style={{ transformOrigin: "center center" }}
                      // La escala del bucle es relativa (1 → 1.01): la de
                      // profundidad ya la lleva el envoltorio de fuera.
                      animate={
                        reduced
                          ? undefined
                          : {
                              y: [0, floatY, 0],
                              rotate: [0, rotateAmount, 0],
                              scale: [1, 1.01, 1],
                            }
                      }
                      transition={{
                        duration: floatDuration,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut",
                        times: [0, 0.5, 1],
                        // El bucle arranca después de la entrada; si no, el
                        // lugar empieza a respirar antes de haber llegado.
                        delay: enterDelay + 0.5 + delayAmount,
                      }}
                    >
                      <figure className="bg-coffi-purple/20 rounded-lg w-9 h-9 flex items-center justify-center shrink-0 text-coffi-purple">
                        {/*
                          El disco se queda en el morado de la casa aunque el mapa
                          coloree estos pines por ambiente: aquí distingue el
                          icono, que es el mismo criterio que siguen las burbujas
                          de la tarjeta de al lado.
                        */}
                        {(() => {
                          const Icon = AMBIENCE_ICON[card.ambience];
                          return <Icon size={18} aria-hidden />;
                        })()}
                      </figure>
                      <div className="flex flex-col overflow-hidden">
                        <h3 className="text-sm font-medium truncate">
                          {card.name}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {card.distance}km
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
          </div>
        </motion.article>

        {/* Section Two */}
        <motion.article
          className="flex flex-col items-start justify-between text-start col-span-4 md:col-span-2 bg-coffi-purple/20 text-coffi-purple rounded-md overflow-hidden"
          style={{ height: sectionHeight }}
          variants={v.card}
          ref={sectionTwoRef}
        >
          <section className="px-6 pt-6 pb-4">
            <h2 className="font-extrabold text-3xl md:text-4xl mb-2">
              {t("home.benefits.realConnections.title")}
            </h2>
            <p className="font-light text-lg">
              {t("home.benefits.realConnections.description")}
              <br />
              {t("home.benefits.realConnections.2ndDescription")}
            </p>
          </section>

          {/*
            Sistema orbital alrededor de "tú aquí".

            `flex-1` y no una proporción fija. Hubo una versión con
            `aspect-[2/1]` — la mitad del ancho de alto, que es lo que una media
            cúpula necesita para llenar la tarjeta a lo ancho — y el problema no
            era la cúpula sino lo que arrastraba: a 592px de ancho pedía 296 solo
            de banda, la tarjeta se iba a 811px y estiraba la sección entera.

            Mandando la altura (ver CARD_H), la banda se queda con lo que sobre
            tras el texto y el sistema se adapta: `ConnectionsOrbit` mide su caja
            y saca el radio de ahí, así que una traducción más larga encoge las
            órbitas en vez de reventar la tarjeta.

            El `min-h` sólo manda en móvil — en desktop `flex-1` reparte más
            que eso. Son 190 y no un número redondo porque es la altura mínima
            con la que caben tres personas con su etiqueta fija en un teléfono
            de 375px; ver SEAT_LAYOUT_LABELLED.

            El `overflow-hidden` es de aquí y no heredado. De cada órbita sólo se
            dibuja la mitad de arriba, pero el círculo ENTERO existe en el DOM y
            asoma por debajo de la banda; sin recortarlo aquí, esos cientos de
            píxeles invisibles entraban en el `scrollHeight` que mide el efecto
            de altura igual. En desktop daba igual porque la altura es fija, pero
            en móvil, que sí usa la medida, habría inflado la tarjeta con el alto
            de unos anillos que nadie ve.
          */}
          <div className="relative w-full flex-1 min-h-[190px] overflow-hidden">
            <ConnectionsOrbit isMobile={isMobile} active={shouldAnimate} />
          </div>
        </motion.article>

        <motion.article
          className="flex flex-col md:flex-row items-center justify-start text-start col-span-4 bg-gradient-to-r from-coffi-purple/30 to-coffi-blue/30 text-coffi-purple rounded-md p-6 overflow-hidden"
          variants={v.card}
        >
          <section className="flex flex-col items-start justify-start w-full md:w-1/2 mb-8 md:mb-0 z-[99]">
            <h2 className="font-extrabold text-3xl md:text-4xl mb-2">
              {t("home.benefits.poweredByCommunity.title")} <br />{" "}
              {t("home.benefits.poweredByCommunity.subTitle")}
            </h2>

            <p className="font-light text-lg mb-2">
              {t("home.benefits.poweredByCommunity.description")}
            </p>
            <p className="font-light text-lg mb-2">
              {t("home.benefits.poweredByCommunity.2ndDescription")}
            </p>
            <p className="font-light text-lg">
              {t("home.benefits.poweredByCommunity.3rdDescription")}
            </p>
          </section>

          <section className="relative flex items-center justify-end md:justify-end w-full h-full md:w-1/2">
            {/*
              Los teléfonos entran CUANDO ENTRA LA SECCIÓN, no al cargar la
              página.

              Llevaban `initial`/`animate` literales, que se ejecutan al montar:
              esta sección vive muy por debajo del pliegue, así que la entrada se
              gastaba en un sitio donde nadie la veía y para cuando alguien
              bajaba hasta aquí los teléfonos ya estaban puestos. Con `variants`
              heredan el estado de la tarjeta que los contiene y llegan con
              ella. Los `exit` que había no hacían nada — no hay
              `AnimatePresence` que los active — y se han quitado.

              El envoltorio posiciona y anima la entrada; el div de dentro se
              queda con el aspecto y con `animate-float-*`. Separados porque
              ambos escriben `transform` y la animación CSS gana al estilo en
              línea: juntos, la entrada no se veía.
            */}
            <motion.div
              variants={v.phoneLeft}
              className="inline-block md:absolute right-48 bottom-[-120px] w-[210px] h-[300px] md:h-[440px] z-10"
            >
              <div
                className={`relative h-full w-full shadow-2xl shadow-coffi-purple/40
                                          rounded-2xl border-2 p-2 border-white/80 overflow-hidden
                                          animate-float-left bg-coffi-white/70 backdrop-blur-md`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 pointer-events-none" />
                <Image
                  alt="Coffi app screenshot - home"
                  src="/assets/images/screenshots/mobile/mobile-place-detail-premium-en.jpeg"
                  width={210}
                  height={350}
                  className="object-cover rounded-lg"
                />
              </div>
            </motion.div>

            <motion.div
              variants={v.phoneRight}
              className="inline-block md:absolute right-6 bottom-[-120px] w-[210px] h-[300px] md:h-[440px] z-20"
            >
              <div
                className={`relative h-full w-full shadow-2xl shadow-coffi-purple/40
                                         rounded-2xl border-2 p-2 border-white/80 overflow-hidden
                                         animate-float-right bg-coffi-white/70 backdrop-blur-md`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 pointer-events-none" />
                <Image
                  alt="Coffi app screenshot - map"
                  src="/assets/images/screenshots/mobile/mobile-home-search-en.jpeg"
                  width={210}
                  height={350}
                  className="object-cover rounded-lg"
                />
              </div>
            </motion.div>
          </section>
        </motion.article>
      </motion.section>
    </motion.article>
  );
};
