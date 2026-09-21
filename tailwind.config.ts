import type { Config } from "tailwindcss";

/**
 * Tokens de diseño de Turismo Antuco.
 * La paleta y las tipografías del documento de diseño viven aquí una sola vez;
 * todos los componentes las heredan. No usar colores "sueltos" en el código.
 */
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta "brisa de montaña" — fría, aireada, neblinosa
        fondo: "#EDF3F4", // fondo general (neblina fría con matiz azulado)
        tinta: "#16303A", // texto principal / titulares (pizarra-pino)
        secundario: "#52686E", // texto secundario (gris frío)
        glaciar: "#216C82", // acento azul glaciar (enlaces, botones) — AA sobre fondo/blanco
        cipres: "#3F6B52", // verde fresco (estados positivos, distintivos)
        brisa: "#DCEAEE", // cielo tenue (tintes de sección, badges suaves)
        tarjeta: "#FFFFFF", // fondo de tarjetas
        // Estados operativos del "estado del día"
        alerta: "#9A3B2B", // cerrado / advertencia (rojo tierra, no chillón)
      },
      fontFamily: {
        // Cargadas con next/font en el layout; aquí referenciamos la variable CSS.
        titulo: ["var(--font-archivo)", "system-ui", "sans-serif"],
        texto: ["var(--font-source-serif)", "Georgia", "serif"],
      },
      fontSize: {
        // Escala editorial sobria
        "display": ["clamp(2.4rem, 6vw, 4rem)", { lineHeight: "1.02", letterSpacing: "-0.01em" }],
      },
      maxWidth: {
        contenido: "72rem", // ancho de lectura del sitio (~1152px)
      },
      borderRadius: {
        tarjeta: "0.5rem",
      },
      spacing: {
        // Objetivo táctil mínimo accesible (WCAG 44px)
        touch: "2.75rem",
      },
    },
  },
  plugins: [],
};

export default config;
