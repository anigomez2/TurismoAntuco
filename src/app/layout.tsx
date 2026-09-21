import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { archivo, sourceSerif } from "@/lib/fonts";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Turismo Antuco",
    template: "%s · Turismo Antuco",
  },
  description:
    "Sitio oficial de turismo de la comuna de Antuco, Biobío. Ven, respira profundo y descubre Antuco.",
  openGraph: {
    type: "website",
    siteName: "Turismo Antuco",
    locale: "es_CL",
    title: "Turismo Antuco",
    description: "Ven, respira profundo y descubre Antuco.",
  },
  twitter: { card: "summary_large_image" },
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
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
