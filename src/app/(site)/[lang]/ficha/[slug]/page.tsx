import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IDIOMAS, esIdiomaValido, type Idioma } from "@/lib/i18n";
import { getDiccionario } from "@/lib/dictionaries";
import { rutas } from "@/lib/navegacion";
import { sanityFetch, TAGS } from "@/sanity/lib/fetch";
import { fichaPorSlugQuery, fichaSlugsQuery } from "@/sanity/lib/queries";
import type { Ficha } from "@/sanity/lib/types";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { SanityImage } from "@/components/SanityImage";
import { PortableTextBasico } from "@/components/PortableTextBasico";
import { QrDescarga } from "@/components/QrDescarga";
import { urlFicha, generarQrDataUrl } from "@/lib/qr";

const TIPO_LABEL: Record<string, { es: string; en: string }> = {
  especie: { es: "Especie", en: "Species" },
  geositio: { es: "Geositio", en: "Geosite" },
  hito: { es: "Hito", en: "Landmark" },
};

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string; language?: string }[]>({
    query: fichaSlugsQuery,
    tags: [TAGS.ficha],
  });
  const params: { lang: string; slug: string }[] = [];
  for (const s of slugs) {
    const langs = s.language ? [s.language] : IDIOMAS;
    for (const lang of langs) if (esIdiomaValido(lang)) params.push({ lang, slug: s.slug });
  }
  return params;
}

async function obtenerFicha(slug: string, lang: Idioma): Promise<Ficha | null> {
  const f = await sanityFetch<Ficha | null>({
    query: fichaPorSlugQuery,
    params: { slug, lang },
    tags: [TAGS.ficha],
  });
  if (!f && lang !== "es") {
    return sanityFetch<Ficha | null>({
      query: fichaPorSlugQuery,
      params: { slug, lang: "es" },
      tags: [TAGS.ficha],
    });
  }
  return f;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!esIdiomaValido(lang)) return {};
  const f = await obtenerFicha(slug, lang);
  if (!f) return {};
  return { title: f.nombreComun, description: f.nombreCientifico };
}

export default async function FichaPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!esIdiomaValido(lang)) notFound();
  const f = await obtenerFicha(slug, lang);
  if (!f) notFound();

  const d = getDiccionario(lang);
  const en = lang === "en";
  const url = urlFicha(f.slug);
  const qr = await generarQrDataUrl(url);
  const tipo = TIPO_LABEL[f.tipo] ? (en ? TIPO_LABEL[f.tipo].en : TIPO_LABEL[f.tipo].es) : f.tipo;

  return (
    <>
      <PageHeader
        migas={[
          { label: d.nav.inicio, href: rutas(lang).inicio },
          { label: d.nav.explorando, href: rutas(lang).explorando },
          { label: f.nombreComun },
        ]}
        titulo={f.nombreComun}
        bajada={f.nombreCientifico ? undefined : tipo}
      />

      <Container as="section" className="pb-16">
        {f.nombreCientifico && (
          <p className="-mt-2 mb-6 text-lg italic text-secundario">
            {f.nombreCientifico} · <span className="not-italic">{tipo}</span>
          </p>
        )}

        <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
          <div>
            <SanityImage
              foto={f.fotos?.[0]}
              priority
              sizes="(min-width:1024px) 760px, 100vw"
              className="w-full rounded-tarjeta object-cover"
              descripcionPendiente={en ? "Photo of the entry" : "Foto de la ficha"}
            />
            <div className="mt-6">
              <PortableTextBasico value={f.texto} />
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <QrDescarga
              dataUrl={qr}
              nombreArchivo={`qr-${f.slug}.png`}
              url={url}
              lang={lang}
            />
          </aside>
        </div>
      </Container>
    </>
  );
}
