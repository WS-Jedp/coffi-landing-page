import { CREATORS, type Creator } from "@/features/map-intro/narrative/creators";
import { placeSeats, type PlacedSeat } from "./orbitGeometry";

/**
 * Apellidos, solo para las tres personas que esta tarjeta pone en órbita.
 *
 * Viven aquí y no en `creators.ts` a propósito: los pines del mapa nunca
 * muestran apellido — imprimen `creator.name` a secas — y no vale la pena
 * ensanchar datos compartidos por quince personas para cubrir una etiqueta de
 * hover de esta tarjeta.
 */
const SURNAME: Record<string, string> = {
  c1: "Restrepo",
  c2: "Zapata",
  c4: "Mejía",
  c5: "Cardona",
  c6: "Ochoa",
  c8: "Villa",
};

export type OrbitSeat = PlacedSeat & { creator: Creator };

/**
 * Ata el reparto a la geometría.
 *
 * Las personas salen del cast que ya existe para el mapa en vez de inventar
 * seis más. Dónde cae cada una y cuántas se ven lo decide `placeSeats` a
 * partir de la banda medida, no un breakpoint. Los roles son `design` / `code` / `marketing`; falta `founder` a
 * propósito, porque su etiqueta en inglés es "Founders" — plural, escrita para
 * un chip de filtro — y "Ana · Founders" no es una profesión.
 *
 * Revienta en vez de saltarse el asiento si un id no existe: un hueco silencioso
 * dejaría una órbita vacía en producción sin que nadie se entere.
 */
export const seatsFor = (
  w: number,
  h: number,
  labelled: boolean,
): readonly OrbitSeat[] =>
  placeSeats(w, h, labelled).map((seat: PlacedSeat) => {
    const creator = CREATORS.find((c) => c.id === seat.creatorId);
    if (!creator) {
      throw new Error(`orbitCast: no existe el creator "${seat.creatorId}"`);
    }
    return { ...seat, creator };
  });

export const fullName = (c: Creator): string =>
  SURNAME[c.id] ? `${c.name} ${SURNAME[c.id]}` : c.name;
