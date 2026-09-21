import { Archivo, Source_Serif_4 } from "next/font/google";

/**
 * Tipografías del sitio, cargadas con next/font (sin peticiones a Google en
 * tiempo de ejecución; se auto-hospedan). Se exponen como variables CSS que
 * Tailwind consume (font-titulo / font-texto).
 *
 * Archivo es una fuente variable con eje de ancho: los titulares usan un ancho
 * condensado (~85%) definido en globals.css con font-stretch.
 */
export const archivo = Archivo({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-archivo",
  display: "swap",
});

export const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-source-serif",
  display: "swap",
});
