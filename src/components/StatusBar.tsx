import Link from "next/link";
import { sanityFetch, TAGS } from "@/sanity/lib/fetch";
import { estadoQuery } from "@/sanity/lib/queries";
import type { Estado } from "@/sanity/lib/types";
import type { Idioma } from "@/lib/i18n";
import { getDiccionario } from "@/lib/dictionaries";
import { rutas } from "@/lib/navegacion";
import { IconChevronDown } from "@/components/Icons";

/**
 * Franja superior con el estado del día. Es la fuente oficial y creíble frente
 * a rumores. Se revalida en segundos vía webhook al publicar el "estado".
 */
export async function StatusBar({ lang }: { lang: Idioma }) {
  const estado = await sanityFetch<Estado | null>({
    query: estadoQuery,
    tags: [TAGS.estado],
  });

  const t = getDiccionario(lang).estado;
  const abierto = estado?.parqueAbierto ?? false;
  const aviso = lang === "en" ? estado?.avisoEn : estado?.avisoEs;

  return (
    <div className="bg-tinta text-white">
      <div className="mx-auto flex max-w-contenido flex-wrap items-center gap-x-4 gap-y-1 px-4 py-2 text-sm sm:px-6">
        {/* Estado del parque */}
        <span className="flex items-center gap-2 font-titulo font-semibold">
          <span
            className={`inline-block h-2.5 w-2.5 rounded-full ${
              abierto ? "bg-[#5fae86]" : "bg-[#d0715a]"
            }`}
            aria-hidden
          />
          {abierto ? t.parqueAbierto : t.parqueCerrado}
        </span>

        <Separador />

        {/* Camino */}
        {estado?.estadoCamino && (
          <span className="text-white/85">
            {t.camino}: {t.caminoEstados[estado.estadoCamino]}
          </span>
        )}

        {/* Nieve */}
        {typeof estado?.nieveCm === "number" && estado.nieveCm > 0 && (
          <>
            <Separador />
            <span className="text-white/85">
              {t.nieve}: {estado.nieveCm} cm
            </span>
          </>
        )}

        {/* Cupos */}
        {typeof estado?.cupos === "number" && estado.cupos > 0 && (
          <>
            <Separador />
            <span className="text-white/85">
              {t.cupos}: {estado.cupos}
            </span>
          </>
        )}

        {/* Aviso del día */}
        {aviso && (
          <>
            <Separador />
            <span className="text-white/70">{aviso}</span>
          </>
        )}

        {/* Enlace al detalle */}
        <Link
          href={rutas(lang).planifica}
          className="ml-auto flex items-center gap-1 font-titulo font-semibold text-white underline-offset-2 hover:underline"
        >
          {t.verDetalle}
          <IconChevronDown size={16} className="-rotate-90" />
        </Link>
      </div>
    </div>
  );
}

function Separador() {
  return <span className="hidden text-white/25 sm:inline" aria-hidden>·</span>;
}
