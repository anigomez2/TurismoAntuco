import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { esIdiomaValido } from "@/lib/i18n";
import { getDiccionario } from "@/lib/dictionaries";
import { rutas } from "@/lib/navegacion";
import { sanityFetch, TAGS } from "@/sanity/lib/fetch";
import { historiaQuery } from "@/sanity/lib/queries";
import type { Historia } from "@/sanity/lib/types";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { SeccionPromo } from "@/components/SeccionPromo";

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
      ? "The hydroelectric villages, the muleteers and the town of Antuco."
      : "Las villas hidroeléctricas, los arrieros y el pueblo de Antuco.",
  };
}

// Contenido de respaldo, por si el documento de Sanity aún no se ha completado.
const RESPALDO = [
  {
    tituloEs: "Las villas hidroeléctricas (Abanico)",
    tituloEn: "The hydroelectric villages (Abanico)",
    textoEs:
      "A comienzos del siglo XX, la central El Abanico trajo a la montaña a trabajadores y sus familias. Las villas que crecieron a su alrededor marcaron la identidad de la comuna alta, y su patrimonio construido aún se conserva junto al río Laja.",
    textoEn:
      "In the early 20th century, the El Abanico power plant brought workers and their families to the mountains. The villages that grew around it shaped the identity of the upper commune, and their heritage buildings still stand by the Laja river.",
    fotoEs: "Antigua casa de máquinas hidroeléctrica en Abanico",
    fotoEn: "Old hydroelectric power house in Abanico",
  },
  {
    tituloEs: "Arrieros y la ruta pehuenche",
    tituloEn: "Muleteers and the Pehuenche route",
    textoEs:
      "Mucho antes de los caminos, los arrieros cruzaban la cordillera por antiguas huellas pehuenches, comerciando entre el valle y el lado argentino por el Paso Pichachén. Esa cultura de montaña sigue viva en las cabalgatas y los guías locales de hoy.",
    textoEn:
      "Long before the roads, muleteers crossed the range along ancient Pehuenche paths, trading between the valley and the Argentine side through the Pichachén Pass. That mountain culture lives on in today's horseback rides and local guides.",
    fotoEs: "Arriero con caballos en un sendero de montaña",
    fotoEn: "Muleteer with horses on a mountain trail",
  },
  {
    tituloEs: "El pueblo de Antuco",
    tituloEn: "The town of Antuco",
    textoEs:
      "Al pie del volcán, el pueblo de Antuco conserva el ritmo tranquilo de una comuna rural: su plaza, sus tradiciones y su gente, que hoy abre las puertas a quienes buscan naturaleza y calma.",
    textoEn:
      "At the foot of the volcano, the town of Antuco keeps the calm pace of a rural commune: its plaza, its traditions and its people, who today open their doors to visitors seeking nature and quiet.",
    fotoEs: "Plaza del pueblo de Antuco con el volcán detrás",
    fotoEn: "Antuco town plaza with the volcano behind",
  },
];

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

  const bajada =
    (en ? historia?.bajadaEn : historia?.bajadaEs) ||
    (en
      ? "A century of mountain life between water, mules and the volcano."
      : "Un siglo de vida de montaña entre el agua, las mulas y el volcán.");

  // Usa las secciones de Sanity si existen; si no, el contenido de respaldo.
  const secciones =
    historia?.secciones && historia.secciones.length > 0
      ? historia.secciones.map((s) => ({
          titulo: (en ? s.tituloEn : s.tituloEs) || s.tituloEs,
          texto: (en ? s.textoEn : s.textoEs) || s.textoEs,
          foto: s.foto,
          descripcionFoto: undefined as string | undefined,
        }))
      : RESPALDO.map((s) => ({
          titulo: en ? s.tituloEn : s.tituloEs,
          texto: en ? s.textoEn : s.textoEs,
          foto: undefined,
          descripcionFoto: en ? s.fotoEn : s.fotoEs,
        }));

  return (
    <>
      <PageHeader
        migas={[{ label: d.nav.inicio, href: rutas(lang).inicio }, { label: d.nav.historia }]}
        titulo={en ? "History & heritage" : "Historia y patrimonio"}
        bajada={bajada}
      />

      <Container as="section" className="space-y-14 pb-16">
        {secciones.map((s, i) => (
          <SeccionPromo
            key={i}
            invertir={i % 2 === 1}
            titulo={s.titulo}
            texto={s.texto}
            hrefBoton={rutas(lang).explorando}
            etiquetaBoton={en ? "Field guide" : "Guía de campo"}
            foto={s.foto}
            descripcionFoto={s.descripcionFoto}
          />
        ))}
      </Container>
    </>
  );
}
