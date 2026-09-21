import Link from "next/link";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { SanityImage } from "@/components/SanityImage";
import type { Experiencia } from "@/sanity/lib/types";
import type { Idioma } from "@/lib/i18n";
import { getDiccionario } from "@/lib/dictionaries";
import { rutas } from "@/lib/navegacion";
import { formatearPrecio } from "@/lib/format";

/** Tarjeta de experiencia para el listado de "qué hacer / lugares para visitar". */
export function ExperienciaCard({ experiencia: e, lang }: { experiencia: Experiencia; lang: Idioma }) {
  const d = getDiccionario(lang);
  const href = `${rutas(lang).experiencias}/${e.slug}`;
  const precio = formatearPrecio(e.precioDesde);
  const meta = [e.duracion, e.grupoMaximo ? `${d.comun.grupo}: ${e.grupoMaximo}` : null]
    .filter(Boolean)
    .join(" · ");

  return (
    <Card className="flex h-full flex-col">
      <Link href={href} className="block no-underline" tabIndex={-1} aria-hidden>
        <SanityImage
          foto={e.fotos?.[0]}
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
          className="w-full object-cover"
          descripcionPendiente={lang === "en" ? "Experience photo" : "Foto de la experiencia"}
        />
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex flex-wrap gap-1.5">
          <Badge tono="azul">{d.dificultades[e.dificultad]}</Badge>
          {e.temporadas?.slice(0, 2).map((t) => (
            <Badge key={t}>{d.temporadas[t]}</Badge>
          ))}
        </div>

        <h3 className="text-xl leading-tight">
          <Link href={href} className="text-tinta no-underline hover:text-glaciar">
            {e.titulo}
          </Link>
        </h3>
        {meta && <p className="mt-1 text-sm text-secundario">{meta}</p>}

        <div className="mt-auto flex items-end justify-between gap-2 pt-4">
          {precio ? (
            <p className="font-titulo text-tinta">
              <span className="text-sm font-normal text-secundario">{d.comun.desde} </span>
              <span className="text-lg font-bold">{precio}</span>
            </p>
          ) : (
            <span />
          )}
          <Link href={href} className="font-titulo text-sm font-semibold text-glaciar no-underline hover:underline">
            {d.comun.verMas} →
          </Link>
        </div>
      </div>
    </Card>
  );
}
