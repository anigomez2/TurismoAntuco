import type { Metadata } from "next";
import { esIdiomaValido } from "@/lib/i18n";
import { getDiccionario } from "@/lib/dictionaries";
import { rutas } from "@/lib/navegacion";
import { Container } from "@/components/Container";
import { Boton } from "@/components/Boton";
import { Forecast } from "@/components/Forecast";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const d = getDiccionario(esIdiomaValido(lang) ? lang : "es");
  return { title: "Antuco", description: d.slogan };
}

/**
 * Portada — interina (Etapa 2). En la Etapa 3 se agregan la franja hero con
 * fotografía, "Antuco en cada temporada", experiencias, "antes de venir",
 * alojamiento, agenda, guía de campo, historia y contacto.
 */
export default async function InicioPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const idioma = esIdiomaValido(lang) ? lang : "es";
  const d = getDiccionario(idioma);
  const r = rutas(idioma);

  return (
    <Container as="section" className="py-16 sm:py-24">
      <p className="font-titulo text-sm font-semibold uppercase tracking-[0.2em] text-secundario">
        Parque Nacional Laguna del Laja · Biobío
      </p>
      <h1 className="mt-3 max-w-3xl text-display">{d.slogan}</h1>
      <p className="mt-6 max-w-2xl text-lg text-secundario">
        {idioma === "en"
          ? "Official tourism site of the Antuco commune. Volcano, lagoon and native forest — in all four seasons."
          : "Sitio oficial de turismo de la comuna de Antuco. Volcán, laguna y bosque nativo — en las cuatro estaciones."}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Boton href={r.planifica}>{d.nav.planifica}</Boton>
        <Boton href={r.experiencias} variante="secundario">
          {d.nav.experiencias}
        </Boton>
      </div>

      <div className="mt-12">
        <Forecast lang={idioma} />
      </div>

      <p className="mt-12 max-w-2xl rounded-tarjeta border border-tinta/10 bg-white p-4 text-sm text-secundario">
        Etapa 2 lista. El pronóstico de arriba usa Open-Meteo (gratuito, sin API
        key). Las secciones de contenido llegan en la Etapa 3.
      </p>
    </Container>
  );
}
