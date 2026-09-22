import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { esIdiomaValido } from "@/lib/i18n";
import { getDiccionario } from "@/lib/dictionaries";
import { rutas } from "@/lib/navegacion";
import { sanityFetch, TAGS } from "@/sanity/lib/fetch";
import { historiaQuery } from "@/sanity/lib/queries";
import type { Historia } from "@/sanity/lib/types";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/Card";
import { SanityImage } from "@/components/SanityImage";
import { Parrafos } from "@/components/Parrafos";
import { Boton } from "@/components/Boton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const en = lang === "en";
  return {
    title: en ? "History & heritage" : "Historia y patrimonio",
    description: en
      ? "Geological history, hydroelectric villages, muleteers, the origins of Antuco and Fort Ballenar."
      : "Historia geológica, villas hidroeléctricas, arrieros, los orígenes de Antuco y el Fuerte Ballenar.",
  };
}

export default async function HistoriaPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!esIdiomaValido(lang)) notFound();
  const d = getDiccionario(lang);
  const en = lang === "en";

  const historia = await sanityFetch<Historia | null>({
    query: historiaQuery,
    tags: [TAGS.historia],
  });

  const heroTitulo =
    (en ? historia?.heroTituloEn : historia?.heroTituloEs) ||
    (en ? "The geological history of the Antuco Volcano" : "La historia geológica del Volcán Antuco");
  const heroTexto = en ? historia?.heroTextoEn : historia?.heroTextoEs;
  const secciones = historia?.secciones ?? [];

  return (
    <>
      <PageHeader
        migas={[{ label: d.nav.inicio, href: rutas(lang).inicio }, { label: d.nav.historia }]}
        titulo={en ? "History & heritage" : "Historia y patrimonio"}
        bajada={
          en
            ? "How the landscape formed and the people who have called it home."
            : "Cómo se formó el paisaje y la gente que lo ha habitado."
        }
      />

      {/* Hero: historia geológica */}
      <section className="bg-tinta text-white">
        <Container className="grid items-center gap-8 py-12 md:grid-cols-2 md:py-16">
          <div>
            <p className="font-titulo text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
              {en ? "Geological history" : "Historia geológica"}
            </p>
            <h2 className="mt-2 text-3xl text-white sm:text-4xl">{heroTitulo}</h2>
            <div className="mt-4 text-white/85">
              <Parrafos texto={heroTexto} className="text-white/85" />
            </div>
            <div className="mt-6">
              <Boton
                href={`${rutas(lang).historia}/geologia`}
                className="border border-white/40 bg-transparent text-white hover:border-white"
              >
                {en ? "Read the full story" : "Leer la historia completa"}
              </Boton>
            </div>
          </div>
          <div className="overflow-hidden rounded-tarjeta">
            <SanityImage
              foto={historia?.heroFoto}
              priority
              sizes="(min-width:768px) 520px, 100vw"
              className="w-full object-cover"
              descripcionPendiente={
                en ? "Antuco volcano and Laguna del Laja" : "Volcán Antuco y la Laguna del Laja"
              }
            />
          </div>
        </Container>
      </section>

      {/* Secciones temáticas */}
      <Container as="section" className="py-14">
        <ul className="grid gap-6 md:grid-cols-2">
          {secciones.map((s) => {
            const titulo = (en ? s.tituloEn : s.tituloEs) || s.tituloEs;
            const resumen = (en ? s.resumenEn : s.resumenEs) || s.resumenEs;
            const href = `${rutas(lang).historia}/${s.slug}`;
            return (
              <li key={s.slug}>
                <Card className="flex h-full flex-col">
                  <Link href={href} tabIndex={-1} aria-hidden className="block">
                    <SanityImage
                      foto={s.foto}
                      sizes="(min-width:768px) 520px, 100vw"
                      className="w-full object-cover"
                      descripcionPendiente={titulo}
                    />
                  </Link>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-2xl leading-tight">
                      <Link href={href} className="text-tinta no-underline hover:text-glaciar">
                        {titulo}
                      </Link>
                    </h3>
                    <p className="mt-2 flex-1 text-secundario">{resumen}</p>
                    <div className="mt-4">
                      <Boton href={href} variante="secundario">
                        {en ? "Read more" : "Leer más"}
                      </Boton>
                    </div>
                  </div>
                </Card>
              </li>
            );
          })}
        </ul>
      </Container>
    </>
  );
}
