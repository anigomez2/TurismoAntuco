import { notFound } from "next/navigation";
import { IDIOMAS, esIdiomaValido } from "@/lib/i18n";
import { StatusBar } from "@/components/StatusBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export function generateStaticParams() {
  return IDIOMAS.map((lang) => ({ lang }));
}

/** Layout del sitio público por idioma: estado del día + header + footer. */
export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!esIdiomaValido(lang)) notFound();

  return (
    <div lang={lang} className="flex min-h-screen flex-col">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-tinta focus:shadow"
      >
        {lang === "en" ? "Skip to content" : "Saltar al contenido"}
      </a>
      <StatusBar lang={lang} />
      <Header lang={lang} />
      <main id="contenido" className="flex-1">
        {children}
      </main>
      <Footer lang={lang} />
    </div>
  );
}
