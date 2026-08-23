import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { roleLabelKey } from "@/features/map-intro/narrative/creators";
import { useElementSize } from "@/features/map-intro/scroll/useElementSize";
import { ROLE_VISUAL } from "@/features/map-intro/ui/chipVocabulary";
import { fullName, seatsFor } from "./orbitCast";
import { BUBBLE, LABEL_GAP, orbitGeometry } from "./orbitGeometry";

/**
 * El degradado que hace desaparecer la mitad de abajo.
 *
 * No es decoración. En los extremos de cada arco (0° y 180°) la tangente del
 * círculo es vertical, así que sin máscara los trazos entran RECTOS al
 * borde inferior de la banda y se leen como tres tubos cortados a ras. La
 * máscara los disuelve antes de llegar, que es lo que hace que la mitad que no
 * dibujamos parezca ausente en vez de amputada.
 *
 * Se aplica solo a los anillos: las burbujas y el pin central no se desvanecen.
 */
const RING_MASK =
  "linear-gradient(to bottom, #000 0%, #000 42%, rgba(0,0,0,0.35) 78%, transparent 96%)";

/**
 * Un sistema orbital 2D del que solo se ve la mitad de arriba.
 *
 * El centro se ancla cerca del borde inferior de la banda y los arcos suben, de
 * modo que la banda de 120px alcanza para órbitas de verdad en vez de para una
 * elipse aplastada. Cada anillo lleva UNA burbuja de usuario, que flota en su
 * punto — no lo recorre: el ángulo es constante y lo único que se anima es una
 * deriva de 3-4px, porque la promesa de la tarjeta es "hay gente cerca", no
 * "mira cómo giran".
 *
 * Los anillos son `div` redondeados y no un SVG. Un `<svg>` con `viewBox`
 * normalizado necesita `preserveAspectRatio="none"` para llenar una banda tan
 * apaisada, y eso deforma el grosor del trazo y obliga a rehacer la
 * trigonometría en dos espacios de coordenadas distintos. Con divs, anillos y
 * burbujas comen de los MISMOS radios en px, así que una burbuja no puede
 * quedar al lado de su órbita.
 */
export const ConnectionsOrbit: React.FC<{
  isMobile: boolean;
  /** La sección entró en viewport: es lo que dispara la entrada escalonada. */
  active: boolean;
}> = ({ isMobile, active }) => {
  const t = useTranslations();
  const reduced = useReducedMotion() ?? false;
  const bandRef = useRef<HTMLDivElement>(null);
  const { w, h } = useElementSize(bandRef);

  // Qué burbuja tiene la etiqueta abierta. Una sola a la vez: son tres puntos
  // en un espacio estrecho y dos etiquetas abiertas se pisarían siempre.
  const [open, setOpen] = useState<string | null>(null);

  // Antes del primer ResizeObserver no hay caja que medir, y dibujar con w=0
  // pondría los tres anillos colapsados en el borde izquierdo.
  const ready = w > 0 && h > 0;
  const geo = orbitGeometry(w, h);
  // En móvil la etiqueta va siempre puesta: se cambian pines por información,
  // que es lo que pide una pantalla donde no existe el hover.
  const labelled = isMobile;
  const seats = seatsFor(w, h, labelled);

  return (
    <div
      ref={bandRef}
      // `group` y no `img`. Fue `img` y estaba mal: es un rol de HOJA, así que
      // un lector de pantalla anuncia la banda como una sola imagen y no expone
      // nada de dentro — los seis botones seguían siendo enfocables con el
      // tabulador pero llegaban sin nombre, que es peor que no poder enfocarlos.
      // `group` etiqueta el conjunto y deja ver a sus hijos.
      role="group"
      aria-label={t("home.benefits.realConnections.orbitAria")}
      className="relative h-full w-full"
    >
      {ready && (
        <>
          {/* Resplandor de base. Es lo que da la profundidad del sistema: sin
              él los anillos flotan sobre un plano liso y se ven dibujados. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(${geo.rings[geo.rings.length - 1].r}px ${geo.rings[geo.rings.length - 1].r}px at 50% ${geo.cy}px, rgba(83,63,255,0.16), transparent 72%)`,
            }}
          />

          {/* Los anillos, y solo los anillos, bajo la máscara. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ maskImage: RING_MASK, WebkitMaskImage: RING_MASK }}
          >
            {geo.rings.map((ring, i) => (
              <div
                key={`ring-${i}`}
                className="absolute rounded-full border"
                style={{
                  width: ring.r * 2,
                  height: ring.r * 2,
                  left: w / 2 - ring.r,
                  top: geo.cy - ring.r,
                  // Los anillos de fuera más tenues: el degradado de opacidad
                  // hace la mitad del trabajo de profundidad que en la
                  // referencia hacen las sombras concéntricas.
                  borderColor: `rgba(83, 63, 255, ${0.3 - i * 0.06})`,
                }}
              />
            ))}
          </div>

          {/*
            El ancla de la metáfora: todo lo demás orbita esto.

            Dice "Tú" en vez de ser un punto porque un punto no explicaba de
            quién era el centro; la palabra lo dice sin leyenda aparte. Va por
            `t()` y no escrita a mano: en inglés es "You" y mide bastante más.

            Píldora blanca con texto morado, al revés que las burbujas. Si
            llevara el relleno morado de ellas leería como una persona más, y lo
            que tiene que leerse es que ésta no es una de las que orbitan.

            El `aria-label` dice "Tú, aquí" — algo más que el texto visible, que
            es lo que `role="img"` permite: una etiqueta hablada más explícita
            que la de pantalla, sin repetirla.
          */}
          <div
            role="img"
            aria-label={t("home.benefits.realConnections.youAreHere")}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold leading-none text-coffi-purple shadow-[0_2px_10px_-2px_rgba(20,10,60,0.35)] ring-1 ring-coffi-purple/15"
            style={{ left: "50%", top: geo.cy, zIndex: 15 }}
          >
            {t("home.benefits.realConnections.you")}
          </div>

          {active &&
            seats.map((seat, i) => {
              const { creator, drift, x, y, toRight, labelW } = seat;
              // Un morado para todos, sin importar el rol. Es el mismo criterio
              // que `ROLE_VISUAL` aplica en los chips del mapa, y por eso los
              // dos tonos salen de ahí en vez de definirse aquí: los pines de
              // creador se colorean por ESTADO, no por profesión, así que un
              // color por rol enseñaría una correspondencia que el mapa nunca
              // cumple. Quien distingue la profesión es el icono.
              const { Icon, tint, ink } = ROLE_VISUAL[creator.role];
              const role = t(roleLabelKey(creator.role));
              const name = fullName(creator);
              const isOpen = labelled || open === creator.id;

              /*
                Con la etiqueta fija no hay nada que pulsar, así que deja de ser
                un botón. Un `<button>` que no hace nada es ruido para quien usa
                lector de pantalla: anuncia una acción inexistente. Como `div`,
                el nombre y la profesión se leen como el texto que son.
              */
              const Tag = labelled ? motion.div : motion.button;
              const interaction = labelled
                ? {}
                : {
                    type: "button" as const,
                    "aria-expanded": isOpen,
                    "aria-label": `${name} — ${role}`,
                    onClick: () =>
                      setOpen((o) => (o === creator.id ? null : creator.id)),
                    onFocus: () => setOpen(creator.id),
                    onBlur: () =>
                      setOpen((o) => (o === creator.id ? null : o)),
                    onMouseEnter: () => setOpen(creator.id),
                    onMouseLeave: () =>
                      setOpen((o) => (o === creator.id ? null : o)),
                  };

              return (
                <Tag
                  key={creator.id}
                  {...interaction}
                  className="absolute rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-coffi-purple focus-visible:ring-offset-2"
                  style={{
                    left: x,
                    top: y,
                    // Centrado con márgenes negativos y no con
                    // `translate(-50%,-50%)`: motion escribe `transform` para
                    // animar la deriva y machacaría el translate.
                    marginLeft: -BUBBLE / 2,
                    marginTop: -BUBBLE / 2,
                    width: BUBBLE,
                    height: BUBBLE,
                    zIndex: isOpen ? 30 : 20,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={
                    reduced
                      ? { scale: 1, opacity: 1 }
                      : {
                          scale: 1,
                          opacity: 1,
                          x: [0, drift.x, 0],
                          y: [0, drift.y, 0],
                        }
                  }
                  transition={{
                    duration: 0.45,
                    delay: 0.25 + i * 0.12,
                    x: {
                      duration: drift.dur,
                      repeat: Infinity,
                      repeatType: "mirror",
                      ease: "easeInOut",
                      delay: i * 0.4,
                    },
                    y: {
                      duration: drift.dur * 1.25,
                      repeat: Infinity,
                      repeatType: "mirror",
                      ease: "easeInOut",
                      delay: i * 0.4 + 0.3,
                    },
                  }}
                >
                  {/* La burbuja: inicial dentro, profesión colgando. */}
                  <span
                    aria-hidden
                    className="relative block h-full w-full rounded-full ring-2 ring-white/70"
                    style={{
                      // `ink` (#533FFF) y no `tint` (#9494FF): la inicial va en
                      // blanco encima y sobre el lila claro medía 2.65:1, muy
                      // por debajo de AA. `ink` da 5.96:1 y además despega la
                      // burbuja del lavanda de la tarjeta, que es casi el mismo
                      // tono que `tint`. El claro se queda para el resplandor,
                      // que no lleva texto y no tiene que cumplir nada.
                      background: ink,
                      boxShadow: `0 6px 18px -6px ${tint}`,
                    }}
                  >
                    <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold leading-none text-white">
                      {creator.name.slice(0, 1)}
                    </span>

                    {/* La ilustración de la profesión, en su propio disco
                        blanco: sobre el relleno de la burbuja un glifo del
                        mismo tono desaparece, y el disco además lo separa de
                        la inicial para que se lean como dos datos. */}
                    <span
                      className="absolute -bottom-1 -right-1 flex h-[17px] w-[17px] items-center justify-center rounded-full bg-white shadow-[0_1px_3px_rgba(20,10,60,0.28)]"
                      style={{ color: ink }}
                    >
                      <Icon size={11} />
                    </span>
                  </span>

                  {/*
                    `aria-hidden` sólo cuando es un botón: ahí el mismo texto ya
                    va en su `aria-label` y leerlo dos veces es peor que no
                    leerlo. Con la etiqueta fija no hay `aria-label` que
                    duplicar, así que ésta es la que habla.
                  */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.span
                        aria-hidden={labelled ? undefined : true}
                        className={`pointer-events-none absolute top-1/2 flex flex-col items-start rounded-xl bg-white/95 text-left shadow-[0_8px_22px_-8px_rgba(20,10,60,0.4)] backdrop-blur-sm ${
                          labelled ? "px-2 py-1" : "px-2.5 py-1.5"
                        }`}
                        style={{
                          maxWidth: labelW,
                          ...(toRight
                            ? { left: BUBBLE + LABEL_GAP }
                            : { right: BUBBLE + LABEL_GAP }),
                        }}
                        // Fija no "aparece": está desde el principio, o el
                        // sistema entero entraría dos veces en móvil.
                        initial={
                          labelled
                            ? { opacity: 1, y: "-50%" }
                            : { opacity: 0, y: "-50%", x: toRight ? -8 : 8, scale: 0.94 }
                        }
                        animate={{ opacity: 1, y: "-50%", x: 0, scale: 1 }}
                        exit={{
                          opacity: 0,
                          y: "-50%",
                          x: toRight ? -8 : 8,
                          scale: 0.94,
                        }}
                        transition={{
                          duration: 0.18,
                          ease: [0.28, 0.11, 0.32, 1],
                        }}
                      >
                        <span
                          className={`max-w-full truncate font-semibold leading-tight text-coffi-black ${
                            labelled ? "text-[11px]" : "text-xs"
                          }`}
                        >
                          {name}
                        </span>
                        <span
                          className={`max-w-full truncate font-medium leading-tight ${
                            labelled ? "text-[9px]" : "text-[10px]"
                          }`}
                          style={{ color: ink }}
                        >
                          {role}
                        </span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Tag>
              );
            })}
        </>
      )}
    </div>
  );
};
