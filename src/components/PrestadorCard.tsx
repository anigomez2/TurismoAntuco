import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { Boton } from "@/components/Boton";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SanityImage } from "@/components/SanityImage";
import type { Prestador } from "@/sanity/lib/types";
import type { Idioma } from "@/lib/i18n";
import { getDiccionario } from "@/lib/dictionaries";
import { formatearPrecio, etiquetaReserva } from "@/lib/format";

/** Tarjeta del directorio: alojamiento, comida o guía/operador. */
export function PrestadorCard({ prestador: p, lang }: { prestador: Prestador; lang: Idioma }) {
  const d = getDiccionario(lang);
  const precio = formatearPrecio(p.precioDesde);
  const localidad = d.localidades[p.localidad] ?? p.localidad;

  const sufijoPrecio =
    p.tipo === "alojamiento" ? (lang === "en" ? " / night" : " la noche") : "";

  const meta = [localidad, p.detalle, precio ? `${d.comun.desde} ${precio}${sufijoPrecio}` : null]
    .filter(Boolean)
    .join(" · ");

  const mensajeWa =
    lang === "en"
      ? `Hi, I saw ${p.nombre} on the Turismo Antuco website and would like to ask about availability.`
      : `Hola, vi ${p.nombre} en el sitio de Turismo Antuco y quiero consultar disponibilidad.`;

  return (
    <Card className="flex flex-col">
      <div className="relative">
        <SanityImage
          foto={p.fotos?.[0]}
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
          className="w-full object-cover"
          descripcionPendiente={
            lang === "en" ? "Photo of the establishment" : "Foto del establecimiento"
          }
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          {p.subtipo && (
            <span className="font-titulo text-sm font-semibold text-secundario">
              {etiquetaSubtipo(p.subtipo, lang)}
            </span>
          )}
          {p.registradoSernatur && (
            <Badge tono="verde" icono>
              {d.comun.registradoSernatur}
            </Badge>
          )}
        </div>

        <h3 className="text-xl leading-tight">{p.nombre}</h3>
        {meta && <p className="mt-1 text-sm text-secundario">{meta}</p>}

        <div className="mt-4 flex flex-wrap gap-2 pt-1">
          {p.enlaceReserva && (
            <Boton href={p.enlaceReserva} externo mostrarIconoExterno={false}>
              {etiquetaReserva(p.enlaceReserva, lang)}
            </Boton>
          )}
          <WhatsAppButton numero={p.whatsapp} mensaje={mensajeWa} etiqueta={d.comun.whatsapp} />
        </div>
      </div>
    </Card>
  );
}

/** Traduce el subtipo a una etiqueta legible (fallback: el propio valor). */
function etiquetaSubtipo(subtipo: string, lang: Idioma): string {
  const mapa: Record<string, { es: string; en: string }> = {
    cabana: { es: "Cabañas", en: "Cabins" },
    hostal: { es: "Hostal / hospedaje", en: "Guesthouse" },
    camping: { es: "Camping", en: "Camping" },
    hotel: { es: "Hotel", en: "Hotel" },
    restaurante: { es: "Restaurante", en: "Restaurant" },
    cafe: { es: "Café", en: "Café" },
    cocineria: { es: "Cocinería", en: "Home cooking" },
    "guia-montana": { es: "Guía de montaña", en: "Mountain guide" },
    operador: { es: "Operador de turismo", en: "Tour operator" },
    arriero: { es: "Arriero / cabalgatas", en: "Horseback rides" },
  };
  const e = mapa[subtipo];
  return e ? (lang === "en" ? e.en : e.es) : subtipo;
}
