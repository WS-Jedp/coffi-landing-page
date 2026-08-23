/**
 * Run with: node --test src/containers/Benefits/orbitGeometry.test.ts
 *
 * Lo que vale la pena fijar aquí son invariantes geométricas, no capturas:
 *  - una burbuja tiene que caer SOBRE su órbita, porque una burbuja al lado de
 *    su anillo delata que el dibujo y la trigonometría se separaron;
 *  - nada puede salirse de la banda, porque la tarjeta lleva `overflow-hidden`
 *    y lo que se sale no desborda: se corta a la mitad;
 *  - con la etiqueta fija de móvil, tampoco pueden pisarse entre ellas: ahí no
 *    hay un "sólo una abierta a la vez" que rescate un solape.
 *
 * Los tamaños de banda están MEDIDOS sobre la página en marcha, con
 * `getBoundingClientRect` en cada viewport. Hubo una versión que los calculaba
 * como `alto = ancho / 2`, cierto mientras la banda tuvo `aspect-[2/1]` y falso
 * desde que pasó a `flex-1`: el test daba verde sobre cajas que ya no existían.
 * Si cambia el texto de la tarjeta, hay que volver a medirlos.
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  BUBBLE,
  PIN_H,
  PIN_W,
  SEAT_LAYOUT,
  SEAT_LAYOUT_LABELLED,
  orbitGeometry,
  placeSeats,
  type Rect,
} from "./orbitGeometry.ts";

type Band = { name: string; w: number; h: number; labelled: boolean };

const BANDS: readonly Band[] = [
  { name: "desktop 1440", w: 592, h: 212, labelled: false },
  { name: "md 768", w: 352, h: 216, labelled: false },
  { name: "móvil 375", w: 327, h: 190, labelled: true },
  { name: "móvil 320", w: 272, h: 190, labelled: true },
];

const seats = (b: Band) => placeSeats(b.w, b.h, b.labelled);
const overlap = (a: Rect, c: Rect) =>
  a.x0 < c.x1 && c.x0 < a.x1 && a.y0 < c.y1 && c.y0 < a.y1;

test("las órbitas son círculos, no elipses", () => {
  for (const b of BANDS) {
    for (const ring of orbitGeometry(b.w, b.h).rings) {
      assert.deepEqual(Object.keys(ring), ["r"], `${b.name}: anillo con 2 ejes`);
    }
  }
});

test("cada burbuja cae exactamente sobre su órbita", () => {
  for (const b of BANDS) {
    const geo = orbitGeometry(b.w, b.h);
    for (const s of seats(b)) {
      const d = Math.hypot(s.x - b.w / 2, s.y - geo.cy);
      assert.ok(
        Math.abs(d - geo.rings[s.orbit].r) < 1e-9,
        `${b.name}/${s.creatorId}: fuera de su círculo`,
      );
    }
  }
});

/**
 * Cubre la burbuja Y la etiqueta cuando ésta va fija: lo que se sale de la
 * banda no desborda, se corta.
 */
test("nada de lo que se dibuja se sale de la banda", () => {
  for (const b of BANDS) {
    for (const s of seats(b)) {
      for (const r of s.boxes) {
        assert.ok(
          r.x0 >= 0 && r.x1 <= b.w && r.y0 >= 0 && r.y1 <= b.h,
          `${b.name}/${s.creatorId}: caja fuera de 0..${b.w} x 0..${b.h}`,
        );
      }
    }
  }
});

test("nada se solapa con nada", () => {
  for (const b of BANDS) {
    const list = seats(b);
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        for (const p of list[i].boxes) {
          for (const q of list[j].boxes) {
            assert.ok(
              !overlap(p, q),
              `${b.name}: ${list[i].creatorId} y ${list[j].creatorId} se pisan`,
            );
          }
        }
      }
    }
  }
});

/** El pin es el ancla de la metáfora: encima suyo tapa la palabra "Tú". */
test("nada pisa el pin central", () => {
  for (const b of BANDS) {
    const geo = orbitGeometry(b.w, b.h);
    const pin: Rect = {
      x0: b.w / 2 - PIN_W / 2,
      y0: geo.cy - PIN_H / 2,
      x1: b.w / 2 + PIN_W / 2,
      y1: geo.cy + PIN_H / 2,
    };
    for (const s of seats(b)) {
      for (const r of s.boxes) {
        assert.ok(!overlap(r, pin), `${b.name}/${s.creatorId}: pisa el pin`);
      }
    }
  }
});

/**
 * La contracara de "nada se solapa": `placeSeats` cumple esa promesa quitando
 * gente, así que sin esto la haría trivial devolviendo cero.
 */
test("la banda de escritorio muestra el reparto completo", () => {
  assert.equal(placeSeats(592, 212, false).length, SEAT_LAYOUT.length);
});

/**
 * En móvil se cambian pines por información, que es el trato: la etiqueta va
 * fija y entra menos gente. Lo que no puede pasar es que entre tan poca que la
 * tarjeta deje de hablar de una comunidad.
 */
test("un teléfono normal muestra las tres con su información", () => {
  // 375px es el ancho de referencia, y ahí entra el reparto completo. Cabe por
  // poco: si alguien ensancha la etiqueta o sube su tipografía, esto avisa
  // antes de que la tercera desaparezca en silencio.
  assert.equal(placeSeats(327, 190, true).length, SEAT_LAYOUT_LABELLED.length);
});

test("un teléfono estrecho recorta el reparto en vez de amontonarlo", () => {
  // A 272px el radio lo capa el ancho de la tarjeta y la tercera no cabe.
  const n = placeSeats(272, 190, true).length;
  assert.ok(n >= 2, `sólo ${n}`);
  assert.ok(n < SEAT_LAYOUT_LABELLED.length, "no debería entrar el reparto entero");
});

/**
 * Las primeras de cada reparto son una por profesión. Quién se cae lo decide la
 * geometría, así que sin esto una banda estrecha podría dejar la tarjeta
 * hablando de un solo oficio — lo contrario de lo que la sección promete.
 */
test("siempre entran al menos dos profesiones distintas", () => {
  // Los repartos van ordenados por profesión distinta, así que basta con que
  // sobrevivan dos entradas para que sobrevivan dos oficios.
  for (const b of BANDS) {
    const ids = seats(b).map((s) => s.creatorId);
    assert.ok(new Set(ids).size >= 2, `${b.name}: [${ids.join(", ")}]`);
    assert.equal(ids[0], "c1", `${b.name}: la primera debería sobrevivir`);
  }
});

test("la etiqueta se abre a la derecha salvo que no quepa", () => {
  const list = placeSeats(592, 212, false);
  const derecha = list.filter((s) => s.toRight).length;
  assert.ok(derecha > list.length / 2, `sólo ${derecha} de ${list.length}`);
  for (const s of list) {
    assert.ok(s.labelW >= 90, `${s.creatorId}: etiqueta de ${s.labelW}px`);
  }
});

test("los anillos caben en la banda y no se pisan", () => {
  for (const b of BANDS) {
    const geo = orbitGeometry(b.w, b.h);
    const outer = geo.rings[geo.rings.length - 1];
    assert.ok(geo.cy - outer.r >= 0, `${b.name}: el ápice se sale por arriba`);
    assert.ok(outer.r * 2 <= b.w, `${b.name}: el anillo se sale de ancho`);
    for (let i = 1; i < geo.rings.length; i++) {
      assert.ok(geo.rings[i].r > geo.rings[i - 1].r, `${b.name}: anillo ${i}`);
    }
  }
});

test("la burbuja mide lo que dice medir", () => {
  const [s] = placeSeats(592, 212, false);
  assert.equal(s.boxes[0].x1 - s.boxes[0].x0, BUBBLE);
  assert.equal(s.boxes[0].y1 - s.boxes[0].y0, BUBBLE);
  // Sin etiqueta fija, la etiqueta no reserva sitio.
  assert.equal(s.boxes.length, 1);
  assert.equal(placeSeats(327, 190, true)[0].boxes.length, 2);
});
