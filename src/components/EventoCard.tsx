import { IconCalendar, IconMapPin, IconExternal } from "@/components/Icons";
import type { Evento } from "@/sanity/lib/types";
import type { Idioma } from "@/lib/i18n";
import { formatearFecha } from "@/lib/format";

/** Tarjeta de evento de la agenda. */
export function EventoCard({ evento: e, lang }: { evento: Evento; lang: Idioma }) {
  const en = lang === "en";
  const inicio = formatearFecha(e.fechaInicio, lang);
  const rango =
    e.fechaTermino && e.fechaTermino !== e.fechaInicio
      ? `${inicio} – ${formatearFecha(e.fechaTermino, lang)}`
      : inicio;

  return (
    <article className="flex flex-col rounded-tarjeta border border-tinta/10 bg-white p-5">
      <p className="flex items-center gap-2 font-titulo text-sm font-semibold text-glaciar">
        <IconCalendar size={16} />
        {rango}
      </p>
      <h3 className="mt-2 text-xl leading-tight">{e.nombre}</h3>
      {e.lugar && (
        <p className="mt-1 flex items-center gap-1.5 text-sm text-secundario">
          <IconMapPin size={15} />
          {e.lugar}
        </p>
      )}
      {e.descripcion && <p className="mt-2 text-sm text-secundario">{e.descripcion}</p>}
      {e.enlace && (
        <a
          href={e.enlace}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1 font-titulo text-sm font-semibold text-glaciar"
        >
          {en ? "More info" : "Más información"}
          <IconExternal size={14} />
        </a>
      )}
    </article>
  );
}
