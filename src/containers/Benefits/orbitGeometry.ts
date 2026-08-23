/**
 * La geometría del sistema orbital, sin una sola importación.
 *
 * Vive aparte de `orbitCast` a propósito: ahí se importan los `CREATORS` del
 * mapa, que arrastran el alias `@/` y con él todo el modelo de lugares. Aquí no
 * hay nada de eso, así que `node --test` puede cargar este módulo tal cual y
 * las invariantes de abajo — que una burbuja caiga sobre su órbita, que una
 * etiqueta no se salga de la tarjeta — son comprobables en vez de opinables.
 */

/** Diámetro de la burbuja de usuario. */
export const BUBBLE = 34;

/**
 * Envolvente del pin "tú aquí" que ancla el centro del sistema.
 *
 * Dos medidas y no un diámetro porque el pin dejó de ser un punto: ahora es una
 * píldora con la palabra "Tú" dentro, y es ANCHA Y BAJA. Comprobar su holgura
 * como si fuera un círculo de 46 de diámetro rechazaba burbujas que pasan muy
 * por encima suyo, donde no hay nada que pisar.
 *
 * Son una cota generosa, no la medida renderizada: la píldora se dimensiona
 * sola según el texto, que cambia con el idioma ("Tú" mide bastante menos que
 * "You"). Pasarse por arriba cuesta como mucho una burbuja apartada de más;
 * quedarse corto pone un nombre encima de la palabra "Tú".
 */
export const PIN_W = 46;
export const PIN_H = 24;

/** Aire mínimo entre el borde del pin y el borde de una burbuja. */
const PIN_GAP = 6;


/** Aire entre el pin y el borde inferior de la banda. */
const BASE_MARGIN = 10;

/**
 * Cuánto sube el centro del sistema sobre el borde inferior de la banda.
 *
 * DERIVADO de la altura del pin, no escrito a mano. Fue un 12 fijo, que era
 * media altura del disco de 24px que ocupaba antes el centro; cuando el pin
 * pasó a ser una píldora de 19px de alto, ese 12 dejó de significar nada y la
 * píldora acabó a 3px del borde de la tarjeta — medido, y se leía pegada.
 * Atándolo a `PIN_H`, cambiar el pin vuelve a mover el centro con él.
 */
const BASE_INSET = PIN_H / 2 + BASE_MARGIN;

/** Aire entre el anillo exterior y el borde de la banda. */
const EDGE_PAD = 8;

/** Radios como fracción del exterior: interior → exterior. */
export const ORBIT_RATIOS = [0.34, 0.56, 0.78, 1] as const;

export type Ring = { r: number };
export type OrbitGeometry = { cy: number; rings: Ring[] };

/**
 * Un radio, no dos: las órbitas son CÍRCULOS.
 *
 * Hubo una versión con elipses achatadas, y la razón era que la banda medía
 * 120px de alto y un círculo que cupiera ahí quedaba diminuto. La solución no
 * era deformar el círculo sino darle a la banda la proporción que una media
 * cúpula necesita — de ahí el `aspect-[2/1]` en `Benefits`. Con eso el radio lo
 * limita el ANCHO de la tarjeta, que es la consecuencia geométrica de exigir
 * círculos de verdad: la cúpula nunca puede ser más ancha que la tarjeta.
 *
 * Se sigue tomando el mínimo contra la altura porque la banda no siempre acaba
 * en 2:1 exacto — el `flex` de la tarjeta puede darle un píxel de más o de
 * menos, y un ápice recortado se ve al instante.
 */
export function orbitGeometry(w: number, h: number): OrbitGeometry {
  const cy = h - BASE_INSET;
  const rMax = Math.min(
    cy - BUBBLE / 2 - EDGE_PAD,
    w / 2 - BUBBLE / 2 - EDGE_PAD,
  );

  return { cy, rings: ORBIT_RATIOS.map((k) => ({ r: rMax * k })) };
}

/** Punto de una órbita, en píxeles relativos a la banda. */
export function seatPoint(
  ring: Ring,
  angleDeg: number,
  w: number,
  cy: number,
): { x: number; y: number } {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: w / 2 + ring.r * Math.cos(rad), y: cy - ring.r * Math.sin(rad) };
}

/**
 * Tamaño de referencia de la etiqueta, MEDIDO en el navegador: la más ancha de
 * las seis (Samuel Cardona · Programación) da 116x40. Se redondea hacia arriba
 * para dejar aire a una traducción algo más larga.
 *
 * Generoso a propósito: sobrestimar cuesta abrir la etiqueta hacia el lado
 * menos bonito, subestimar la corta contra el borde de la tarjeta.
 */
export const LABEL_W = 132;

/** Alto de la etiqueta de hover, medido. */
export const LABEL_H = 44;

/**
 * Reserva de la etiqueta FIJA, medida aparte porque su tipografía es menor.
 *
 * La más ancha del reparto (Samuel Cardona · Programación) da 105x33 con los
 * tamaños compactos. Reservar los 132x36 de la de hover sobraba 27px de ancho
 * por etiqueta, y ése era justo el margen que faltaba para que en un teléfono
 * cupiera una tercera persona.
 */
export const LABEL_W_COMPACT = 112;

/**
 * La variante de móvil, donde la etiqueta no se abre: está siempre puesta.
 *
 * Más baja porque ahí el alto es el recurso escaso. En un teléfono el radio del
 * sistema lo capa el ANCHO de la tarjeta (~138px), así que la franja vertical
 * donde caben etiquetas apiladas es fija por mucho que se estire la banda; cada
 * píxel que sobra en la etiqueta es una persona menos en pantalla.
 */
export const LABEL_H_COMPACT = 34;

/** Separación entre la burbuja y su etiqueta. */
export const LABEL_GAP = 8;

/** Aire mínimo entre la etiqueta y el borde de la banda. */
const LABEL_EDGE = 4;

export type LabelSide = { toRight: boolean; maxWidth: number };

/**
 * Hacia qué lado se abre la etiqueta, y cuánto puede ocupar.
 *
 * Se abre a la DERECHA, que es lo pedido. La excepción no es cosmética: la
 * tarjeta que contiene la banda lleva `overflow-hidden`, así que una etiqueta
 * que se pase del borde no se sale — se corta a la mitad.
 *
 * Devuelve también un ancho máximo, y eso salió de un caso real: en un viewport
 * de 320px la etiqueta de una de las órbitas no cabía entera NI a la derecha ni
 * a la izquierda. Elegir lado no bastaba; hacía falta poder estrecharla. Con el
 * tope, el desbordamiento deja de ser posible por construcción en vez de por
 * suerte con los ángulos.
 */
export function labelSide(
  x: number,
  w: number,
  compact = false,
): LabelSide {
  const want = compact ? LABEL_W_COMPACT : LABEL_W;
  const edge = BUBBLE / 2 + LABEL_GAP + LABEL_EDGE;
  const right = w - x - edge;
  const left = x - edge;
  const toRight = right >= want || right >= left;
  return { toRight, maxWidth: Math.min(want, toRight ? right : left) };
}

export type SeatLayout = {
  /** Id en `CREATORS`; se resuelve en `orbitCast`. */
  creatorId: string;
  /** Índice en `ORBIT_RATIOS`: 0 es la órbita interior. */
  orbit: number;
  /** Grados desde la horizontal, hemisferio superior. */
  angleDeg: number;
  /** Amplitud y periodo de la flotación, en px y segundos. */
  drift: { x: number; y: number; dur: number };
};

/**
 * Seis personas repartidas por cuatro órbitas, EN ORDEN DE PRIORIDAD.
 *
 * El orden importa tanto como los ángulos: `placeSeats` se queda con un
 * prefijo de esta lista, así que las tres primeras son las que sobreviven en
 * una banda estrecha. Son una de cada rol a propósito — diseño, programación y
 * marketing — para que un móvil siga mostrando las tres profesiones en vez de
 * tres personas del mismo oficio.
 *
 * Falta `founder` en todo el reparto, y es deliberado: su etiqueta en inglés es
 * "Founders" — plural, escrita para un chip de filtro — y "Ana · Founders" no
 * es una profesión.
 *
 * Los ángulos separan las burbujas en LAS DOS direcciones, y la vertical es la
 * que cuesta. Una media cúpula tiene dos extremos bajos y una sola cima, así
 * que unos ángulos repartidos "a ojo" acaban con casi todo el mundo en la
 * franja baja: el reparto anterior dejaba cinco de seis entre y=165 e y=208 y
 * el cuadrante superior izquierdo vacío.
 *
 * La composición de ahora es simétrica a propósito. Dos personas altas
 * flanqueando (118° y 62°, ambas en la órbita exterior) y cuatro apoyadas en el
 * arco bajo, cuyas alturas suben hacia el centro porque están en órbitas cada
 * vez más pequeñas. Una curva suave se lee como una órbita; una fila plana no.
 * Ninguna invariante distingue las dos: sólo se ve mirándolo.
 */
export const SEAT_LAYOUT: readonly SeatLayout[] = [
  { creatorId: "c1", orbit: 0, angleDeg: 100, drift: { x: 3, y: -4, dur: 6.5 } },
  { creatorId: "c2", orbit: 1, angleDeg: 40, drift: { x: -4, y: 3, dur: 8.2 } },
  { creatorId: "c6", orbit: 3, angleDeg: 118, drift: { x: 4, y: 3.5, dur: 7.1 } },
  { creatorId: "c5", orbit: 2, angleDeg: 20, drift: { x: -3, y: -3.5, dur: 9 } },
  { creatorId: "c8", orbit: 2, angleDeg: 160, drift: { x: 3.5, y: 3, dur: 7.8 } },
  { creatorId: "c4", orbit: 3, angleDeg: 62, drift: { x: -3.5, y: -3, dur: 6.9 } },
];

/**
 * Aire mínimo entre los bordes de dos burbujas.
 *
 * No basta con que no se toquen. A 0 de holgura quedaban a 40px de centro a
 * centro en la banda de móvil — 6px de aire entre bordes — y se leían como una
 * sola mancha de dos cabezas en vez de como dos personas en órbitas distintas.
 */
const BUBBLE_GAP = 10;

/**
 * El reparto de móvil, donde la etiqueta va SIEMPRE puesta.
 *
 * Es otra lista y no un recorte de la de escritorio porque el problema es otro.
 * Con la etiqueta abierta, cada persona ocupa una caja de 132x36 además de su
 * burbuja, y lo que decide cuántas caben es la franja vertical entre el ápice
 * del sistema y el pin — que en un teléfono mide poco más de 120px, porque el
 * radio lo capa el ancho de la tarjeta y no se puede ganar estirando la banda.
 *
 * Son TRES, y las tres caben por poco. Un primer intento se quedó en dos por
 * reservar para cada etiqueta fija los 132x36 de la de hover, cuando con la
 * tipografía compacta la más ancha mide 105x33: veintisiete píxeles de más por
 * etiqueta eran justo el margen que faltaba. De ahí LABEL_W_COMPACT.
 *
 * Los ángulos no están tanteados: salen de barrer el espacio de ángulos y
 * órbitas contra las mismas restricciones que aplica `placeSeats`, y éstos son
 * los que dan tres en un teléfono de 375px con la banda más baja posible.
 *
 * Van en filas y no repartidas alrededor de la cúpula como en escritorio: allí
 * la etiqueta de una caía sobre la burbuja de otra, y con las etiquetas fijas
 * eso no lo salva un z-index, porque no hay "sólo una abierta a la vez".
 *
 * En un teléfono de 320px siguen entrando sólo dos, y no por falta de ajuste:
 * ahí el radio lo capa el ANCHO de la tarjeta en 111px, la franja útil baja a
 * 63px y tres filas piden 88. `placeSeats` deja caer la última — por eso van
 * ordenadas una por profesión, para que lo que quede siga hablando de más de
 * un oficio.
 */
export const SEAT_LAYOUT_LABELLED: readonly SeatLayout[] = [
  { creatorId: "c1", orbit: 3, angleDeg: 95, drift: { x: 3, y: -3, dur: 6.5 } },
  { creatorId: "c2", orbit: 2, angleDeg: 121, drift: { x: -3, y: 3, dur: 8.2 } },
  { creatorId: "c6", orbit: 1, angleDeg: 143, drift: { x: 3, y: 3, dur: 7.1 } },
];

export type Rect = { x0: number; y0: number; x1: number; y1: number };

const hits = (a: Rect, b: Rect, gap: number): boolean =>
  a.x0 - gap < b.x1 && b.x0 < a.x1 + gap && a.y0 - gap < b.y1 && b.y0 < a.y1 + gap;

/** Un asiento ya resuelto: dónde cae, hacia dónde abre y cuánto ocupa. */
export type PlacedSeat = SeatLayout & {
  x: number;
  y: number;
  toRight: boolean;
  labelW: number;
  boxes: Rect[];
};

/**
 * Coloca el reparto: dónde cae cada persona, hacia dónde abre su etiqueta y
 * quién se queda fuera.
 *
 * Todo junto y no en tres funciones porque son la misma decisión. El lado al
 * que abre una etiqueta cambia la caja que ocupa, la caja decide si choca con
 * la vecina, y el choque decide quién entra — separarlo dejaba al componente
 * recalculando posiciones que el test creía comprobadas.
 *
 * `labelled` es lo que separa los dos modos. En escritorio la etiqueta sólo
 * existe al pasar el ratón o al enfocar, así que sólo la burbuja ocupa sitio y
 * un solape momentáneo de etiqueta lo resuelve el z-index. En móvil van todas
 * puestas a la vez y sus cajas cuentan igual que las burbujas.
 */
export function placeSeats(
  w: number,
  h: number,
  labelled: boolean,
): readonly PlacedSeat[] {
  const geo = orbitGeometry(w, h);
  const cx = w / 2;
  const rb = BUBBLE / 2;
  const labelH = labelled ? LABEL_H_COMPACT : LABEL_H;
  const layout = labelled ? SEAT_LAYOUT_LABELLED : SEAT_LAYOUT;

  const pin: Rect = {
    x0: cx - PIN_W / 2,
    y0: geo.cy - PIN_H / 2,
    x1: cx + PIN_W / 2,
    y1: geo.cy + PIN_H / 2,
  };

  const kept: PlacedSeat[] = [];
  for (const seat of layout) {
    const { x, y } = seatPoint(geo.rings[seat.orbit], seat.angleDeg, w, geo.cy);
    const { toRight, maxWidth } = labelSide(x, w, labelled);

    const bubble: Rect = { x0: x - rb, y0: y - rb, x1: x + rb, y1: y + rb };
    const label: Rect = toRight
      ? {
          x0: x + rb + LABEL_GAP,
          x1: x + rb + LABEL_GAP + maxWidth,
          y0: y - labelH / 2,
          y1: y + labelH / 2,
        }
      : {
          x0: x - rb - LABEL_GAP - maxWidth,
          x1: x - rb - LABEL_GAP,
          y0: y - labelH / 2,
          y1: y + labelH / 2,
        };

    // Sólo la etiqueta fija ocupa sitio. La de hover aparece y se va, y una
    // sola a la vez: dejarla reservar espacio permanente vaciaría la cúpula
    // para nada.
    const boxes = labelled ? [bubble, label] : [bubble];

    const inside = boxes.every(
      (b) => b.x0 >= 0 && b.x1 <= w && b.y0 >= 0 && b.y1 <= h,
    );
    const fits =
      inside &&
      boxes.every((b) => !hits(b, pin, PIN_GAP)) &&
      !kept.some((k) =>
        k.boxes.some((kb) => boxes.some((b) => hits(b, kb, BUBBLE_GAP))),
      );

    // Se salta al que no cabe y se sigue, en vez de cortar la lista ahí. Con
    // corte, una sola pareja apretada a media lista se llevaba por delante a
    // los últimos, que tenían sitio de sobra en la otra punta de la cúpula.
    if (fits) kept.push({ ...seat, x, y, toRight, labelW: maxWidth, boxes });
  }
  return kept;
}
