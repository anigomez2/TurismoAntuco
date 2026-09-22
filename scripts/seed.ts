/**
 * Datos semilla para Sanity — SOLO marcadores entre corchetes.
 * Uso:  npm run seed          (crea/reemplaza el contenido de ejemplo)
 *       npm run seed -- --reset (borra el contenido semilla antes de crearlo)
 *
 * Requiere en .env.local:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET,
 *   SANITY_API_WRITE_TOKEN  (permiso Editor; solo se usa aquí, en el servidor)
 */
import { createClient } from "@sanity/client";
import { config as loadEnv } from "dotenv";
import { randomUUID } from "node:crypto";

loadEnv({ path: ".env.local" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "\n✗ Faltan variables. Revisa .env.local: NEXT_PUBLIC_SANITY_PROJECT_ID y SANITY_API_WRITE_TOKEN.\n"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-10-01",
  useCdn: false,
});

const RESET = process.argv.includes("--reset");

// --- Imagen-marcador -------------------------------------------------------
// Genera un SVG con la descripción de la foto esperada y lo sube como asset.
// El texto alternativo (alt) lleva la descripción completa.
const cacheImagenes = new Map<string, string>();

function escaparXml(s: string) {
  return s.replace(/[<>&'"]/g, (c) =>
    ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[c]!)
  );
}

function svgPlaceholder(etiqueta: string) {
  const t = escaparXml(etiqueta.slice(0, 60));
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
      <rect width="1200" height="800" fill="#3E5A38"/>
      <rect x="24" y="24" width="1152" height="752" fill="none" stroke="#F3F1EC" stroke-width="2" stroke-dasharray="10 8" opacity="0.6"/>
      <text x="600" y="380" fill="#F3F1EC" font-family="sans-serif" font-size="40" font-weight="700" text-anchor="middle">FOTO DE EJEMPLO</text>
      <text x="600" y="440" fill="#F3F1EC" font-family="sans-serif" font-size="28" text-anchor="middle" opacity="0.85">${t}</text>
    </svg>`,
    "utf-8"
  );
}

async function imagenMarcador(descripcion: string) {
  if (!cacheImagenes.has(descripcion)) {
    const asset = await client.assets.upload("image", svgPlaceholder(descripcion), {
      filename: `placeholder-${descripcion.slice(0, 20).replace(/\W+/g, "-")}.svg`,
    });
    cacheImagenes.set(descripcion, asset._id);
  }
  return {
    _type: "fotoConAlt",
    _key: randomUUID(),
    alt: descripcion,
    asset: { _type: "reference", _ref: cacheImagenes.get(descripcion)! },
  };
}

// --- Definición del contenido semilla --------------------------------------
async function construirDocumentos() {
  const prestadores = [
    {
      _id: "seed.prestador.1",
      _type: "prestador",
      language: "es",
      nombre: "[NOMBRE DEL ALOJAMIENTO 1]",
      tipo: "alojamiento",
      subtipo: "cabana",
      localidad: "antuco",
      detalle: "[Capacidad y detalle, ej.: 6 personas, 2 dormitorios]",
      precioDesde: 0,
      registradoSernatur: true,
      enlaceReserva: "https://ejemplo.cl/reserva",
      whatsapp: "56900000001",
      fotos: [await imagenMarcador("Fachada de una cabaña de madera con el volcán Antuco al fondo")],
    },
    {
      _id: "seed.prestador.2",
      _type: "prestador",
      language: "es",
      nombre: "[NOMBRE DEL ALOJAMIENTO 2]",
      tipo: "alojamiento",
      subtipo: "camping",
      localidad: "abanico",
      detalle: "[Detalle, ej.: 20 sitios con sombra y agua]",
      precioDesde: 0,
      registradoSernatur: false,
      whatsapp: "56900000002",
      fotos: [await imagenMarcador("Sitios de camping entre araucarias junto a un río")],
    },
    {
      _id: "seed.prestador.3",
      _type: "prestador",
      language: "es",
      nombre: "[NOMBRE DEL RESTAURANTE]",
      tipo: "comida",
      subtipo: "restaurante",
      localidad: "antuco",
      detalle: "[Tipo de cocina y capacidad]",
      precioDesde: 0,
      registradoSernatur: true,
      whatsapp: "56900000003",
      fotos: [await imagenMarcador("Mesa servida con comida típica chilena en un comedor rústico")],
    },
    {
      _id: "seed.prestador.4",
      _type: "prestador",
      language: "es",
      nombre: "[NOMBRE DE LA COCINERÍA]",
      tipo: "comida",
      subtipo: "cocineria",
      localidad: "villa-peluca",
      detalle: "[Detalle, ej.: comida casera, almuerzos]",
      precioDesde: 0,
      registradoSernatur: false,
      whatsapp: "56900000004",
      fotos: [await imagenMarcador("Plato de cazuela casera sobre mantel a cuadros")],
    },
    {
      _id: "seed.prestador.5",
      _type: "prestador",
      language: "es",
      nombre: "[NOMBRE DEL GUÍA / OPERADOR]",
      tipo: "guia",
      subtipo: "guia-montana",
      localidad: "antuco",
      detalle: "[Especialidad, ej.: ascensiones al volcán Antuco]",
      precioDesde: 0,
      registradoSernatur: true,
      whatsapp: "56900000005",
      fotos: [await imagenMarcador("Guía de montaña con casco y crampones en una ladera nevada")],
    },
    {
      _id: "seed.prestador.6",
      _type: "prestador",
      language: "es",
      nombre: "[NOMBRE DEL ARRIERO]",
      tipo: "guia",
      subtipo: "arriero",
      localidad: "alto-antuco",
      detalle: "[Detalle, ej.: cabalgatas por la ruta pehuenche]",
      precioDesde: 0,
      registradoSernatur: false,
      whatsapp: "56900000006",
      fotos: [await imagenMarcador("Arriero a caballo guiando mulas por un sendero cordillerano")],
    },
  ];

  const experiencias = [
    {
      _id: "seed.experiencia.1",
      _type: "experiencia",
      language: "es",
      titulo: "[EXPERIENCIA: Ascenso al volcán Antuco]",
      slug: { _type: "slug", current: "ascenso-volcan-antuco" },
      temporadas: ["primavera", "verano"],
      dificultad: "alta",
      duracion: "[Día completo]",
      grupoMaximo: 8,
      precioDesde: 0,
      guia: { _type: "reference", _ref: "seed.prestador.5" },
      itinerario: ["[Punto de encuentro]", "[Ascenso]", "[Cumbre]", "[Regreso]"],
      incluye: ["[Guía certificado]", "[Equipo de seguridad]"],
      noIncluye: ["[Traslados]", "[Alimentación]"],
      politicaCancelacion: "[Política de cancelación]",
      whatsapp: "56900000005",
      fotos: [await imagenMarcador("Cordada ascendiendo la ladera nevada del volcán Antuco")],
    },
    {
      _id: "seed.experiencia.2",
      _type: "experiencia",
      language: "es",
      titulo: "[EXPERIENCIA: Senderismo Laguna del Laja]",
      slug: { _type: "slug", current: "senderismo-laguna-del-laja" },
      temporadas: ["primavera", "verano", "otono"],
      dificultad: "media",
      duracion: "[Medio día]",
      grupoMaximo: 12,
      precioDesde: 0,
      guia: { _type: "reference", _ref: "seed.prestador.5" },
      itinerario: ["[Inicio del sendero]", "[Mirador]", "[Laguna]"],
      incluye: ["[Guía local]"],
      noIncluye: ["[Entrada al parque]"],
      politicaCancelacion: "[Política de cancelación]",
      whatsapp: "56900000005",
      fotos: [await imagenMarcador("Sendero junto a la Laguna del Laja con la Sierra Velluda al fondo")],
    },
    {
      _id: "seed.experiencia.3",
      _type: "experiencia",
      language: "es",
      titulo: "[EXPERIENCIA: Cabalgata ruta pehuenche]",
      slug: { _type: "slug", current: "cabalgata-ruta-pehuenche" },
      temporadas: ["verano", "otono"],
      dificultad: "baja",
      duracion: "[3 horas]",
      grupoMaximo: 6,
      precioDesde: 0,
      guia: { _type: "reference", _ref: "seed.prestador.6" },
      itinerario: ["[Salida]", "[Bosque de araucarias]", "[Regreso]"],
      incluye: ["[Caballo y montura]", "[Arriero]"],
      noIncluye: ["[Almuerzo]"],
      politicaCancelacion: "[Política de cancelación]",
      whatsapp: "56900000006",
      fotos: [await imagenMarcador("Grupo a caballo cruzando un bosque de araucarias")],
    },
    {
      _id: "seed.experiencia.4",
      _type: "experiencia",
      language: "es",
      titulo: "[EXPERIENCIA: Día de nieve en familia]",
      slug: { _type: "slug", current: "dia-de-nieve-en-familia" },
      temporadas: ["invierno"],
      dificultad: "baja",
      duracion: "[Medio día]",
      grupoMaximo: 20,
      precioDesde: 0,
      politicaCancelacion: "[Política de cancelación]",
      whatsapp: "56900000001",
      fotos: [await imagenMarcador("Familia jugando en la nieve con el volcán Antuco de fondo")],
    },
  ];

  const eventos = [
    {
      _id: "seed.evento.1",
      _type: "evento",
      language: "es",
      nombre: "[EVENTO: Fiesta costumbrista de Antuco]",
      fechaInicio: "2026-02-14",
      fechaTermino: "2026-02-15",
      lugar: "[Plaza de Antuco]",
      descripcion: "[Descripción del evento]",
      enlace: "https://ejemplo.cl/evento",
    },
    {
      _id: "seed.evento.2",
      _type: "evento",
      language: "es",
      nombre: "[EVENTO: Travesía de montaña]",
      fechaInicio: "2026-03-08",
      lugar: "[Sector Abanico]",
      descripcion: "[Descripción del evento]",
    },
    {
      _id: "seed.evento.3",
      _type: "evento",
      language: "es",
      nombre: "[EVENTO: Aniversario de la comuna]",
      fechaInicio: "2026-05-20",
      lugar: "[Antuco]",
      descripcion: "[Descripción del evento]",
    },
  ];

  const fichas = [
    {
      _id: "seed.ficha.1",
      _type: "ficha",
      language: "es",
      tipo: "especie",
      nombreComun: "Araucaria",
      nombreCientifico: "Araucaria araucana",
      slug: { _type: "slug", current: "araucaria" },
      fotos: [await imagenMarcador("Araucaria adulta contra el cielo cordillerano")],
    },
    {
      _id: "seed.ficha.2",
      _type: "ficha",
      language: "es",
      tipo: "especie",
      nombreComun: "Cóndor andino",
      nombreCientifico: "Vultur gryphus",
      slug: { _type: "slug", current: "condor-andino" },
      fotos: [await imagenMarcador("Cóndor andino planeando sobre la Sierra Velluda")],
    },
    {
      _id: "seed.ficha.3",
      _type: "ficha",
      language: "es",
      tipo: "geositio",
      nombreComun: "Volcán Antuco",
      slug: { _type: "slug", current: "volcan-antuco" },
      fotos: [await imagenMarcador("Cono del volcán Antuco cubierto de nieve")],
    },
    {
      _id: "seed.ficha.4",
      _type: "ficha",
      language: "es",
      tipo: "geositio",
      nombreComun: "Salto de las Chilcas",
      slug: { _type: "slug", current: "salto-de-las-chilcas" },
      fotos: [await imagenMarcador("Cascada entre rocas volcánicas negras")],
    },
    {
      _id: "seed.ficha.5",
      _type: "ficha",
      language: "es",
      tipo: "geositio",
      nombreComun: "Laguna del Laja",
      slug: { _type: "slug", current: "laguna-del-laja" },
      fotos: [await imagenMarcador("Laguna del Laja de aguas turquesas rodeada de montañas")],
    },
    {
      _id: "seed.ficha.6",
      _type: "ficha",
      language: "es",
      tipo: "hito",
      nombreComun: "Central hidroeléctrica El Abanico",
      slug: { _type: "slug", current: "central-el-abanico" },
      fotos: [await imagenMarcador("Antigua casa de máquinas de la central hidroeléctrica de Abanico")],
    },
  ];

  const estado = {
    _id: "estado",
    _type: "estado",
    parqueAbierto: true,
    estadoCamino: "normal",
    nieveCm: 0,
    andarivelesOperativos: false,
    cupos: 0,
    avisoEs: "[Aviso del día, ej.: Camino despejado hasta la portería del parque]",
    avisoEn: "[Notice of the day]",
    actualizado: new Date().toISOString(),
  };

  const seccionHistoria = (
    tituloEs: string,
    tituloEn: string,
    textoEs: string,
    textoEn: string
  ) => ({ _key: randomUUID(), _type: "seccion", tituloEs, tituloEn, textoEs, textoEn });

  const historia = {
    _id: "historia",
    _type: "historia",
    bajadaEs: "Un siglo de vida de montaña entre el agua, las mulas y el volcán.",
    bajadaEn: "A century of mountain life between water, mules and the volcano.",
    secciones: [
      seccionHistoria(
        "Las villas hidroeléctricas (Abanico)",
        "The hydroelectric villages (Abanico)",
        "A comienzos del siglo XX, la central El Abanico trajo a la montaña a trabajadores y sus familias. Las villas que crecieron a su alrededor marcaron la identidad de la comuna alta, y su patrimonio construido aún se conserva junto al río Laja.",
        "In the early 20th century, the El Abanico power plant brought workers and their families to the mountains. The villages that grew around it shaped the identity of the upper commune, and their heritage buildings still stand by the Laja river."
      ),
      seccionHistoria(
        "Arrieros y la ruta pehuenche",
        "Muleteers and the Pehuenche route",
        "Mucho antes de los caminos, los arrieros cruzaban la cordillera por antiguas huellas pehuenches, comerciando entre el valle y el lado argentino por el Paso Pichachén. Esa cultura de montaña sigue viva en las cabalgatas y los guías locales de hoy.",
        "Long before the roads, muleteers crossed the range along ancient Pehuenche paths, trading between the valley and the Argentine side through the Pichachén Pass."
      ),
      seccionHistoria(
        "El pueblo de Antuco",
        "The town of Antuco",
        "Al pie del volcán, el pueblo de Antuco conserva el ritmo tranquilo de una comuna rural: su plaza, sus tradiciones y su gente, que hoy abre las puertas a quienes buscan naturaleza y calma.",
        "At the foot of the volcano, the town of Antuco keeps the calm pace of a rural commune: its plaza, its traditions and its people."
      ),
    ],
  };

  const configuracion = {
    _id: "configuracion",
    _type: "configuracion",
    email: "[CORREO]",
    telefono: "[TELÉFONO]",
    whatsapp: "56900000000",
    direccionOficina: "[DIRECCIÓN DE LA OFICINA]",
    horarioOficina: "[HORARIO, ej.: Lunes a domingo 9:00-18:00]",
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    enlaceEntradasConaf: "https://www.conaf.cl/",
  };

  return [
    ...prestadores,
    ...experiencias,
    ...eventos,
    ...fichas,
    estado,
    historia,
    configuracion,
  ];
}

async function main() {
  if (RESET) {
    console.log("Borrando contenido semilla anterior…");
    await client.delete({ query: '*[_id in path("seed.**")]' });
  }

  console.log("Generando imágenes-marcador y documentos…");
  const docs = await construirDocumentos();

  const tx = client.transaction();
  for (const doc of docs) tx.createOrReplace(doc as never);
  await tx.commit();

  console.log(`\n✓ Listo. Se crearon/actualizaron ${docs.length} documentos.`);
  console.log("  Abre el Studio en /studio para verlos.\n");
}

main().catch((err) => {
  console.error("\n✗ Error al sembrar:", err.message || err);
  process.exit(1);
});
