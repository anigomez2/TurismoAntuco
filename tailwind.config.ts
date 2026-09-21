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
        // Paleta oficial
        fondo: "#F3F1EC", // fondo general (papel cálido)
        tinta: "#1B2429", // texto principal / titulares
        secundario: "#52605F", // texto secundario
        glaciar: "#2A5D78", // acento azul glaciar (enlaces, botones)
        cipres: "#3E5A38", // verde ciprés (estados positivos, distintivos)
        tarjeta: "#FFFFFF", // fondo de tarjetas
        // Estados operativos del "estado del día"
        alerta: "#8A3B2B", // cerrado / advertencia (rojo tierra, no chillón)
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
