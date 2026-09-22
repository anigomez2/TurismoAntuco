import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { esIdiomaValido, type Idioma } from "@/lib/i18n";
import { getDiccionario } from "@/lib/dictionaries";
import { rutas } from "@/lib/navegacion";
import { sanityFetch, TAGS } from "@/sanity/lib/fetch";
import { historiaQuery } from "@/sanity/lib/queries";
import type { Historia } from "@/sanity/lib/types";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { SanityImage } from "@/components/SanityImage";
import { ArticuloRico } from "@/components/ArticuloRico";
import { Parrafos } from "@/components/Parrafos";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const en = lang === "en";
  return {
    title: en ? "The geological history of the Antuco Volcano" : "La historia geológica del Volcán Antuco",
    description: en
      ? "How the Antuco volcano, Sierra Velluda and the collapse that dammed Laguna del Laja shaped the landscape."
      : "Cómo el volcán Antuco, la Sierra Velluda y el colapso que represó la Laguna del Laja formaron el paisaje.",
  };
}

export default async function GeologiaPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!esIdiomaValido(lang)) notFound();
  const idioma = lang as Idioma;
  const d = getDiccionario(idioma);
  const en = idioma === "en";

  const historia = await sanityFetch<Historia | null>({
    query: historiaQuery,
    tags: [TAGS.historia],
  });

  const titulo =
    (en ? historia?.heroTituloEn : historia?.heroTituloEs) ||
    (en ? "The geological history of the Antuco Volcano" : "La historia geológica del Volcán Antuco");
  const contenido = en ? historia?.heroContenidoEn : historia?.heroContenidoEs;
  const textoRespaldo = en ? historia?.heroTextoEn : historia?.heroTextoEs;
  const fuentes = en ? historia?.heroFuentesEn : historia?.heroFuentesEs;

  return (
    <>
      <PageHeader
        migas={[
          { label: d.nav.inicio, href: rutas(idioma).inicio },
          { label: d.nav.historia, href: rutas(idioma).historia },
          { label: titulo },
        ]}
        titulo={titulo}
        bajada={
          en
            ? "Volcano, glaciers and a collapse that dammed a river to form the lagoon."
            : "Volcán, glaciares y un colapso que represó un río para formar la laguna."
        }
      />

      <Container as="article" className="pb-20">
        <div className="mx-auto max-w-3xl">
          {/* Portada del artículo */}
          {historia?.heroFoto && (
            <figure className="mb-10 overflow-hidden rounded-tarjeta">
              <SanityImage
                foto={historia.heroFoto}
                priority
                sizes="(min-width: 768px) 768px, 100vw"
                className="w-full object-cover"
              />
              {historia.heroFoto.alt && (
                <figcaption className="mt-2 text-sm text-secundario">{historia.heroFoto.alt}</figcaption>
              )}
            </figure>
          )}

          {/* Artículo */}
          {contenido && contenido.length > 0 ? (
            <ArticuloRico value={contenido} />
          ) : (
            <div className="text-lg">
              <Parrafos texto={textoRespaldo} />
            </div>
          )}

          {/* Fuentes */}
          {fuentes && (
            <div className="mt-14 border-t border-tinta/10 pt-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-secundario/70">
                {en ? "Sources" : "Fuentes"}
              </p>
              <p className="mt-1 text-sm text-secundario/80">{fuentes}</p>
            </div>
          )}
        </div>
      </Container>
    </>
  );
}
