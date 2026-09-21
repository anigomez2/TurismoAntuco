import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { esIdiomaValido, type Idioma } from "@/lib/i18n";
import { getDiccionario } from "@/lib/dictionaries";
import { rutas } from "@/lib/navegacion";
import { sanityFetch, TAGS } from "@/sanity/lib/fetch";
import { eventosProximosQuery } from "@/sanity/lib/queries";
import type { Evento } from "@/sanity/lib/types";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { EventoCard } from "@/components/EventoCard";
import { JsonLd } from "@/components/JsonLd";
import { jsonLdAgenda } from "@/lib/jsonld";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const en = lang === "en";
  return {
    title: en ? "Events" : "Agenda de eventos",
    description: en
      ? "Upcoming events and festivals in the Antuco commune."
      : "Próximos eventos y fiestas de la comuna de Antuco.",
  };
}

async function obtenerEventos(lang: Idioma): Promise<Evento[]> {
  const hoy = new Date().toISOString().slice(0, 10);
  const res = await sanityFetch<Evento[]>({
    query: eventosProximosQuery,
    params: { lang, hoy },
    tags: [TAGS.evento],
  });
  if (res.length === 0 && lang !== "es") {
    return sanityFetch<Evento[]>({
      query: eventosProximosQuery,
      params: { lang: "es", hoy },
      tags: [TAGS.evento],
    });
  }
  return res;
}

export default async function AgendaPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!esIdiomaValido(lang)) notFound();
  const d = getDiccionario(lang);
  const en = lang === "en";
  const eventos = await obtenerEventos(lang);

  return (
    <>
      {eventos.length > 0 && <JsonLd data={jsonLdAgenda(eventos)} />}
      <PageHeader
        migas={[{ label: d.nav.inicio, href: rutas(lang).inicio }, { label: d.nav.agenda }]}
        titulo={en ? "Events calendar" : "Agenda de eventos"}
        bajada={
          en
            ? "Festivals, fairs and activities in Antuco. Past events are hidden automatically."
            : "Fiestas, ferias y actividades en Antuco. Los eventos pasados se ocultan automáticamente."
        }
      />

      <Container as="section" className="pb-16">
        {eventos.length === 0 ? (
          <p className="rounded-tarjeta border border-tinta/10 bg-white p-6 text-secundario">
            {en
              ? "No upcoming events for now. Check back soon."
              : "No hay eventos próximos por ahora. Vuelve pronto."}
          </p>
        ) : (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {eventos.map((e) => (
              <li key={e._id}>
                <EventoCard evento={e} lang={lang} />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </>
  );
}
