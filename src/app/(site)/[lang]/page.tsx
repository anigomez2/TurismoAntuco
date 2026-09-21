import type { Metadata } from "next";
import Link from "next/link";
import { esIdiomaValido, type Idioma } from "@/lib/i18n";
import { getDiccionario } from "@/lib/dictionaries";
import { rutas } from "@/lib/navegacion";
import { sanityFetch, TAGS } from "@/sanity/lib/fetch";
import {
  configuracionQuery,
  experienciasQuery,
  prestadoresQuery,
  eventosProximosQuery,
} from "@/sanity/lib/queries";
import type { Configuracion, Experiencia, Prestador, Evento } from "@/sanity/lib/types";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Hero } from "@/components/Hero";
import { TemporadasSection } from "@/components/TemporadasSection";
import { ExperienciaCard } from "@/components/ExperienciaCard";
import { PrestadorCard } from "@/components/PrestadorCard";
import { EventoCard } from "@/components/EventoCard";
import { AntesDeVenir } from "@/components/AntesDeVenir";
import { SeccionPromo } from "@/components/SeccionPromo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const d = getDiccionario(esIdiomaValido(lang) ? lang : "es");
  return { title: "Antuco", description: d.slogan };
}

/** Trae contenido en el idioma pedido, con respaldo al español si está vacío. */
async function traer<T>(query: string, tags: (typeof TAGS)[keyof typeof TAGS][], lang: Idioma, params: Record<string, unknown> = {}) {
  const res = await sanityFetch<T[]>({ query, params: { ...params, lang }, tags });
  if (res.length === 0 && lang !== "es") {
    return sanityFetch<T[]>({ query, params: { ...params, lang: "es" }, tags });
  }
  return res;
}

export default async function InicioPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const idioma: Idioma = esIdiomaValido(lang) ? lang : "es";
  const d = getDiccionario(idioma);
  const r = rutas(idioma);
  const en = idioma === "en";
  const hoy = new Date().toISOString().slice(0, 10);

  const [config, experiencias, prestadores, eventos] = await Promise.all([
    sanityFetch<Configuracion | null>({ query: configuracionQuery, tags: [TAGS.configuracion] }),
    traer<Experiencia>(experienciasQuery, [TAGS.experiencia], idioma),
    traer<Prestador>(prestadoresQuery, [TAGS.prestador], idioma),
    traer<Evento>(eventosProximosQuery, [TAGS.evento], idioma, { hoy }),
  ]);

  const destacadas = experiencias.slice(0, 3);
  const alojamientos = prestadores.filter((p) => p.tipo === "alojamiento").slice(0, 3);
  const proximosEventos = eventos.slice(0, 3);

  return (
    <>
      <Hero lang={idioma} foto={config?.fotoPortada} />

      {/* Antuco en cada temporada */}
      <section className="bg-brisa/40 py-14">
        <Container>
          <SectionHeading
            titulo={en ? "Antuco in every season" : "Antuco en cada temporada"}
            bajada={
              en
                ? "There's a reason to come all year round — not only for the snow."
                : "Hay un motivo para venir todo el año — no solo por la nieve."
            }
          />
          <TemporadasSection experiencias={experiencias} lang={idioma} />
        </Container>
      </section>

      {/* Experiencias destacadas */}
      {destacadas.length > 0 && (
        <Container as="section" className="py-14">
          <SectionHeading
            titulo={en ? "Featured experiences" : "Experiencias destacadas"}
            accion={
              <Link href={r.experiencias} className="font-titulo text-sm font-semibold text-glaciar">
                {en ? "See all →" : "Ver todas →"}
              </Link>
            }
          />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {destacadas.map((e) => (
              <li key={e._id}>
                <ExperienciaCard experiencia={e} lang={idioma} />
              </li>
            ))}
          </ul>
        </Container>
      )}

      {/* Antes de venir */}
      <section className="bg-brisa/40 py-14">
        <Container>
          <SectionHeading
            titulo={en ? "Before you come" : "Antes de venir"}
            bajada={
              en
                ? "The essentials for a safe and responsible visit."
                : "Lo esencial para una visita segura y responsable."
            }
          />
          <AntesDeVenir lang={idioma} />
        </Container>
      </section>

      {/* Alojamiento */}
      {alojamientos.length > 0 && (
        <Container as="section" className="py-14">
          <SectionHeading
            titulo={en ? "Where to stay" : "Dónde alojar"}
            accion={
              <Link href={r.directorio} className="font-titulo text-sm font-semibold text-glaciar">
                {en ? "See directory →" : "Ver directorio →"}
              </Link>
            }
          />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {alojamientos.map((p) => (
              <li key={p._id}>
                <PrestadorCard prestador={p} lang={idioma} />
              </li>
            ))}
          </ul>
        </Container>
      )}

      {/* Agenda */}
      {proximosEventos.length > 0 && (
        <section className="bg-brisa/40 py-14">
          <Container>
            <SectionHeading
              titulo={en ? "Upcoming events" : "Agenda de eventos"}
              accion={
                <Link href={r.agenda} className="font-titulo text-sm font-semibold text-glaciar">
                  {en ? "Full calendar →" : "Ver agenda →"}
                </Link>
              }
            />
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {proximosEventos.map((e) => (
                <li key={e._id}>
                  <EventoCard evento={e} lang={idioma} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {/* Explorando Antuco */}
      <Container as="section" className="py-14">
        <SeccionPromo
          titulo={en ? "Exploring Antuco" : "Explorando Antuco"}
          texto={
            en
              ? "A field guide to the species and geosites of the territory. Download the PDF and scan the QR codes along the trails to read each entry."
              : "Una guía de campo de las especies y geositios del territorio. Descarga el PDF y escanea los códigos QR de los senderos para leer cada ficha."
          }
          hrefBoton={r.explorando}
          etiquetaBoton={en ? "Open the field guide" : "Abrir la guía de campo"}
          descripcionFoto={
            en ? "Field guide cover with an araucaria" : "Portada de la guía de campo con una araucaria"
          }
        />
      </Container>

      {/* Historia y patrimonio */}
      <section className="bg-brisa/40 py-14">
        <Container>
          <SeccionPromo
            invertir
            titulo={en ? "History & heritage" : "Historia y patrimonio"}
            texto={
              en
                ? "Hydroelectric villages in Abanico, the muleteers and the Pehuenche route, and the town of Antuco. A century of mountain life."
                : "Las villas hidroeléctricas de Abanico, los arrieros y la ruta pehuenche, y el pueblo de Antuco. Un siglo de vida de montaña."
            }
            hrefBoton={r.historia}
            etiquetaBoton={en ? "Learn the history" : "Conocer la historia"}
            descripcionFoto={
              en
                ? "Old hydroelectric power house in Abanico"
                : "Antigua casa de máquinas hidroeléctrica en Abanico"
            }
          />
        </Container>
      </section>
    </>
  );
}
