import { notFound } from "next/navigation";
import { IDIOMAS, esIdiomaValido } from "@/lib/i18n";

export function generateStaticParams() {
  return IDIOMAS.map((lang) => ({ lang }));
}

/**
 * Layout del sitio público por idioma.
 * El header con la franja de estado y el footer se agregan en la Etapa 2.
 */
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
    <div className="min-h-screen">
      <main className="mx-auto max-w-contenido px-4">{children}</main>
    </div>
  );
}
