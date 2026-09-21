import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IDIOMAS, esIdiomaValido, type Idioma } from "@/lib/i18n";
import { getDiccionario } from "@/lib/dictionaries";
import { rutas } from "@/lib/navegacion";
import { sanityFetch, TAGS } from "@/sanity/lib/fetch";
import { experienciaPorSlugQuery, experienciaSlugsQuery } from "@/sanity/lib/queries";
import type { Experiencia } from "@/sanity/lib/types";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { Galeria } from "@/components/Galeria";
import { ReservaPanel } from "@/components/ReservaPanel";
import { PortableTextBasico } from "@/components/PortableTextBasico";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { IconCheck } from "@/components/Icons";

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string; language?: string }[]>({
    query: experienciaSlugsQuery,
    tags: [TAGS.experiencia],
  });
  const params: { lang: string; slug: string }[] = [];
  for (const s of slugs) {
    const langs = s.language ? [s.language] : IDIOMAS;
    for (const lang of langs) if (esIdiomaValido(lang)) params.push({ lang, slug: s.slug });
  }
  return params;
}

async function obtenerExperiencia(slug: string, lang: Idioma): Promise<Experiencia | null> {
  const exp = await sanityFetch<Experiencia | null>({
    query: experienciaPorSlugQuery,
    params: { slug, lang },
    tags: [TAGS.experiencia],
  });
  if (!exp && lang !== "es") {
    return sanityFetch<Experiencia | null>({
      query: experienciaPorSlugQuery,
      params: { slug, lang: "es" },
      tags: [TAGS.experiencia],
    });
  }
  return exp;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!esIdiomaValido(lang)) return {};
  const exp = await obtenerExperiencia(slug, lang);
  if (!exp) return {};
  return { title: exp.titulo };
}

export default async function ExperienciaDetallePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!esIdiomaValido(lang)) notFound();
  const exp = await obtenerExperiencia(slug, lang);
  if (!exp) notFound();

  const d = getDiccionario(lang);
  const en = lang === "en";
  const temporadasTxt = (exp.temporadas ?? []).map((t) => d.temporadas[t]).join(", ");

  const datos = [
    { etiqueta: d.comun.duracion, valor: exp.duracion },
    { etiqueta: d.comun.dificultad, valor: d.dificultades[exp.dificultad] },
    { etiqueta: en ? "Group" : "Grupo", valor: exp.grupoMaximo ? `${en ? "Up to" : "Hasta"} ${exp.grupoMaximo}` : undefined },
    { etiqueta: en ? "Season" : "Temporada", valor: temporadasTxt || undefined },
  ].filter((x) => x.valor);

  return (
    <>
      <PageHeader
        migas={[
          { label: d.nav.inicio, href: rutas(lang).inicio },
          { label: d.nav.experiencias, href: rutas(lang).experiencias },
          { label: exp.titulo },
        ]}
        titulo={exp.titulo}
      />

      <Container as="section">
        <Galeria fotos={exp.fotos} lang={lang} />

        {/* Fila de datos */}
        {datos.length > 0 && (
          <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {datos.map((x) => (
              <div key={x.etiqueta} className="rounded-tarjeta border border-tinta/10 bg-white p-4">
                <dt className="text-xs uppercase tracking-wide text-secundario">{x.etiqueta}</dt>
                <dd className="mt-1 font-titulo text-lg font-bold text-tinta">{x.valor}</dd>
              </div>
            ))}
          </dl>
        )}
      </Container>

      {/* Contenido + panel de reserva */}
      <Container as="section" className="mt-8 pb-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
          <div>
            {exp.descripcion && (
              <section className="mb-8">
                <h2 className="mb-2 text-2xl">{en ? "The experience" : "La experiencia"}</h2>
                <PortableTextBasico value={exp.descripcion} />
              </section>
            )}

            {exp.itinerario && exp.itinerario.length > 0 && (
              <section className="mb-8">
                <h2 className="mb-3 text-2xl">{en ? "Itinerary" : "Itinerario"}</h2>
                <ol className="list-decimal space-y-2 pl-5 text-tinta marker:text-secundario">
                  {exp.itinerario.map((paso, i) => (
                    <li key={i}>{paso}</li>
                  ))}
                </ol>
              </section>
            )}

            {((exp.incluye?.length ?? 0) > 0 || (exp.noIncluye?.length ?? 0) > 0) && (
              <section className="mb-8 grid gap-6 sm:grid-cols-2">
                {exp.incluye && exp.incluye.length > 0 && (
                  <div>
                    <h3 className="mb-2 text-xl">{en ? "What's included" : "Qué incluye"}</h3>
                    <ul className="space-y-1.5">
                      {exp.incluye.map((x, i) => (
                        <li key={i} className="flex items-start gap-2 text-tinta">
                          <IconCheck size={16} className="mt-1 shrink-0 text-cipres" />
                          {x}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {exp.noIncluye && exp.noIncluye.length > 0 && (
                  <div>
                    <h3 className="mb-2 text-xl">{en ? "Not included" : "Qué no incluye"}</h3>
                    <ul className="space-y-1.5 text-secundario">
                      {exp.noIncluye.map((x, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span aria-hidden className="mt-1 shrink-0">—</span>
                          {x}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            )}

            {exp.guia && (
              <section className="mb-8 rounded-tarjeta border border-tinta/10 bg-white p-5">
                <h3 className="text-sm uppercase tracking-wide text-secundario">{en ? "Guide" : "Guía"}</h3>
                <p className="mt-1 font-titulo text-lg font-bold text-tinta">{exp.guia.nombre}</p>
                <div className="mt-3">
                  <WhatsAppButton
                    numero={exp.guia.whatsapp}
                    etiqueta={d.comun.whatsapp}
                    mensaje={
                      en
                        ? `Hi, I have a question about "${exp.titulo}".`
                        : `Hola, tengo una consulta sobre "${exp.titulo}".`
                    }
                  />
                </div>
              </section>
            )}
          </div>

          <ReservaPanel
            titulo={exp.titulo}
            precioDesde={exp.precioDesde}
            enlaceReserva={exp.enlaceReserva}
            whatsapp={exp.whatsapp}
            grupoMaximo={exp.grupoMaximo}
            politicaCancelacion={exp.politicaCancelacion}
            lang={lang}
          />
        </div>
      </Container>
    </>
  );
}
