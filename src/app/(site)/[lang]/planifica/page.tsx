import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { esIdiomaValido } from "@/lib/i18n";
import { getDiccionario } from "@/lib/dictionaries";
import { rutas } from "@/lib/navegacion";
import { sanityFetch, TAGS } from "@/sanity/lib/fetch";
import { estadoQuery, configuracionQuery } from "@/sanity/lib/queries";
import type { Estado, Configuracion } from "@/sanity/lib/types";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { EstadoDetalle } from "@/components/EstadoDetalle";
import { Forecast } from "@/components/Forecast";
import { Boton } from "@/components/Boton";
import { IconRoute, IconCalendar, IconMapPin } from "@/components/Icons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const en = lang === "en";
  return {
    title: en ? "Plan your visit" : "Planifica tu visita",
    description: en
      ? "Official, up-to-date information about the park, the road and the weather in Antuco."
      : "Información oficial y actualizada sobre el parque, el camino y el clima en Antuco.",
  };
}

export default async function PlanificaPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!esIdiomaValido(lang)) notFound();
  const d = getDiccionario(lang);
  const en = lang === "en";

  const [estado, config] = await Promise.all([
    sanityFetch<Estado | null>({ query: estadoQuery, tags: [TAGS.estado] }),
    sanityFetch<Configuracion | null>({ query: configuracionQuery, tags: [TAGS.configuracion] }),
  ]);

  const comoLlegar = [
    {
      icono: IconRoute,
      titulo: en ? "By car" : "En auto",
      texto: en
        ? "From Los Ángeles, take Route Q-45 for 65 km to Antuco and on to Abanico, the park gateway."
        : "Desde Los Ángeles, toma la Ruta Q-45 por 65 km hasta Antuco y sigue a Abanico, la puerta del parque.",
    },
    {
      icono: IconCalendar,
      titulo: en ? "By public transport" : "En transporte público",
      texto: en
        ? "Rural buses from Los Ángeles reach Abanico. From there, arrange private transport to the park entrance."
        : "Los buses rurales desde Los Ángeles llegan hasta Abanico. Desde ahí, coordina transporte particular hasta la entrada del parque.",
    },
    {
      icono: IconMapPin,
      titulo: en ? "From Argentina" : "Desde Argentina",
      texto: en
        ? "Via the Pichachén Pass, seasonal and weather-dependent. Check its opening status before traveling."
        : "Por el Paso Pichachén, de temporada y sujeto al clima. Consulta su estado de apertura antes de viajar.",
    },
  ];

  const queLlevar = en
    ? ["Warm, layered clothing and a waterproof jacket", "Sturdy footwear", "Water and food", "Sunscreen and sunglasses", "Cash (limited coverage and card use)", "A charged phone"]
    : ["Ropa de abrigo por capas y cortaviento impermeable", "Calzado firme para caminar", "Agua y alimento", "Protector solar y lentes de sol", "Efectivo (hay poca cobertura y uso de tarjeta)", "Teléfono cargado"];

  const faqs = en
    ? [
        { q: "Do I need to book in advance?", a: "For tours and lodging, yes, especially in winter. Park entry is paid at the gate or online via Conaf." },
        { q: "Is there mobile coverage?", a: "Coverage is limited in the area and inside the park. Download maps and check today's status before leaving." },
        { q: "Can I visit with children?", a: "Yes. There are easy activities and snow play. Always follow the guides and today's conditions." },
        { q: "Are pets allowed in the park?", a: "National parks generally restrict pets. Check with Conaf before your visit." },
      ]
    : [
        { q: "¿Necesito reservar con anticipación?", a: "Para tours y alojamiento, sí, sobre todo en invierno. La entrada al parque se paga en la portería o en línea a través de Conaf." },
        { q: "¿Hay cobertura de celular?", a: "La cobertura es limitada en la zona y dentro del parque. Descarga los mapas y revisa el estado del día antes de salir." },
        { q: "¿Puedo visitar con niños?", a: "Sí. Hay actividades fáciles y juego en la nieve. Sigue siempre a los guías y las condiciones del día." },
        { q: "¿Se permiten mascotas en el parque?", a: "Los parques nacionales suelen restringir mascotas. Consulta con Conaf antes de tu visita." },
      ];

  return (
    <>
      <PageHeader
        migas={[
          { label: d.nav.inicio, href: rutas(lang).inicio },
          { label: d.nav.planifica },
        ]}
        titulo={en ? "Plan your visit" : "Planifica tu visita"}
        bajada={
          en
            ? "Official, up-to-date information about the park, the road and the weather. Check it the same day you travel."
            : "Información oficial y actualizada sobre el parque, el camino y el clima. Revísala el mismo día de tu viaje."
        }
      />

      <Container as="section" className="space-y-6">
        <EstadoDetalle estado={estado} config={config} lang={lang} />
        <Forecast lang={lang} />
      </Container>

      {/* Cómo llegar */}
      <Container as="section" className="py-14">
        <h2 className="text-3xl">{en ? "How to get here" : "Cómo llegar"}</h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {comoLlegar.map((c) => {
            const Icono = c.icono;
            return (
              <li key={c.titulo} className="rounded-tarjeta border border-tinta/10 bg-white p-5">
                <Icono size={26} className="text-glaciar" />
                <h3 className="mt-3 text-lg">{c.titulo}</h3>
                <p className="mt-1 text-sm text-secundario">{c.texto}</p>
              </li>
            );
          })}
        </ul>
      </Container>

      {/* Tarifas de entrada */}
      <section className="bg-brisa/40 py-14">
        <Container>
          <div className="grid items-center gap-6 md:grid-cols-2">
            <div>
              <h2 className="text-3xl">{en ? "Park entrance fees" : "Tarifas de entrada"}</h2>
              <p className="mt-3 whitespace-pre-line text-secundario">
                {config?.tarifasEntrada ||
                  (en
                    ? "Fees are set by Conaf. Check the current values and buy your ticket on the official site."
                    : "Las tarifas las fija Conaf. Consulta los valores vigentes y compra tu entrada en el sitio oficial.")}
              </p>
            </div>
            {config?.enlaceEntradasConaf && (
              <div className="md:text-right">
                <Boton href={config.enlaceEntradasConaf} externo>
                  {en ? "Buy tickets (Conaf)" : "Comprar entradas (Conaf)"}
                </Boton>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Qué llevar */}
      <Container as="section" className="py-14">
        <h2 className="text-3xl">{en ? "What to bring" : "Qué llevar"}</h2>
        <ul className="mt-6 grid gap-2 sm:grid-cols-2">
          {queLlevar.map((x, i) => (
            <li key={i} className="flex items-start gap-2 text-tinta">
              <span aria-hidden className="mt-1 text-glaciar">•</span>
              {x}
            </li>
          ))}
        </ul>
      </Container>

      {/* Preguntas frecuentes */}
      <section className="bg-brisa/40 py-14">
        <Container>
          <h2 className="text-3xl">{en ? "Frequently asked questions" : "Preguntas frecuentes"}</h2>
          <div className="mt-6 divide-y divide-tinta/10 overflow-hidden rounded-tarjeta border border-tinta/10 bg-white">
            {faqs.map((f, i) => (
              <details key={i} className="group px-5 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-titulo font-semibold text-tinta">
                  {f.q}
                  <span aria-hidden className="text-glaciar transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-2 text-secundario">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
