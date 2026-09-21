import type { Metadata } from "next";
import { archivo, sourceSerif } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Turismo Antuco",
    template: "%s · Turismo Antuco",
  },
  description:
    "Sitio oficial de turismo de la comuna de Antuco, Biobío. Ven, respira profundo y descubre Antuco.",
};

/**
 * Layout raíz. Aplica a todo el proyecto, incluido el Studio (/studio).
 * El diseño del sitio público vive en src/app/(site)/[lang]/layout.tsx.
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${archivo.variable} ${sourceSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
