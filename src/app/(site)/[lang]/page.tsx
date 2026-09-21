import type { Metadata } from "next";
import { esIdiomaValido } from "@/lib/i18n";
import { getDiccionario } from "@/lib/dictionaries";
import { rutas } from "@/lib/navegacion";
import { Container } from "@/components/Container";
import { Boton } from "@/components/Boton";
import { Forecast } from "@/components/Forecast";
import { MountainSilhouette } from "@/components/MountainSilhouette";

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
    <>
      {/* Hero con aire de brisa de montaña */}
      <section className="relative overflow-hidden bg-brisa/50">
        <Container className="relative z-10 pb-44 pt-16 sm:pb-56 sm:pt-24">
          <p className="font-titulo text-sm font-semibold uppercase tracking-[0.2em] text-glaciar">
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
        </Container>
        <MountainSilhouette className="pointer-events-none absolute inset-x-0 bottom-0 h-[150px] w-full sm:h-[190px]" />
      </section>

      {/* Pronóstico + nota */}
      <Container as="section" className="py-12">
        <Forecast lang={idioma} />
        <p className="mt-12 max-w-2xl rounded-tarjeta border border-tinta/10 bg-white p-4 text-sm text-secundario">
          Etapa 2 lista, con la paleta “brisa de montaña”. El pronóstico usa
          Open-Meteo (gratuito, sin API key). Las secciones de contenido llegan
          en la Etapa 3.
        </p>
      </Container>
    </>
  );
}
