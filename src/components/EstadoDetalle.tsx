import { IconExternal } from "@/components/Icons";
import type { Estado, Configuracion } from "@/sanity/lib/types";
import type { Idioma } from "@/lib/i18n";
import { getDiccionario } from "@/lib/dictionaries";
import { formatearFechaHora } from "@/lib/format";

/** Panel oscuro "Estado hoy" con las condiciones del día en detalle. */
export function EstadoDetalle({
  estado,
  config,
  lang,
}: {
  estado: Estado | null;
  config: Configuracion | null;
  lang: Idioma;
}) {
  const t = getDiccionario(lang).estado;
  const en = lang === "en";
  const abierto = estado?.parqueAbierto ?? false;

  const colorCamino =
    estado?.estadoCamino === "cerrado"
      ? "text-[#e08a6a]"
      : estado?.estadoCamino === "normal"
        ? "text-[#7dc79c]"
        : "text-[#e0c06a]";

  return (
    <div className="rounded-tarjeta bg-tinta p-5 text-white sm:p-7">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-2xl text-white">{en ? "Today's status" : "Estado hoy"}</h2>
        {estado?.actualizado && (
          <p className="text-sm text-white/60">
            {t.actualizado}: {formatearFechaHora(estado.actualizado, lang)}
          </p>
        )}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Parque */}
        <TarjetaEstado
          titulo={en ? "Laguna del Laja National Park" : "Parque Nacional Laguna del Laja"}
          valor={abierto ? (en ? "OPEN" : "ABIERTO") : en ? "CLOSED" : "CERRADO"}
          color={abierto ? "text-[#7dc79c]" : "text-[#e08a6a]"}
          nota={config?.horarioOficina ? `${en ? "Hours" : "Horario"}: ${config.horarioOficina}` : undefined}
        />
        {/* Camino */}
        <TarjetaEstado
          titulo={en ? "Route Q-45 to the park" : "Ruta Q-45 al parque"}
          valor={estado ? t.caminoEstados[estado.estadoCamino].toUpperCase() : "—"}
          color={colorCamino}
          nota={en ? "Source: Vialidad / Carabineros" : "Fuente: Vialidad / Carabineros"}
        />
        {/* Nieve */}
        <TarjetaEstado
          titulo={en ? "Snow at the ski center" : "Nieve en el centro de esquí"}
          valor={typeof estado?.nieveCm === "number" ? `${estado.nieveCm} cm` : "—"}
          nota={`${t.andariveles}: ${
            estado?.andarivelesOperativos ? t.operativos : t.detenidos
          }`}
        />
      </div>

      {/* Cámara web */}
      <div className="mt-4">
        {config?.camaraWebUrl ? (
          <a
            href={config.camaraWebUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-2 rounded-tarjeta bg-white/5 p-4 text-white ring-1 ring-white/10 hover:bg-white/10"
          >
            <span className="font-titulo font-semibold">
              {en ? "Live camera: park access" : "Cámara en vivo: acceso al parque"}
            </span>
            <IconExternal size={18} />
          </a>
        ) : (
          <div className="rounded-tarjeta bg-white/5 p-4 text-white/60 ring-1 ring-white/10">
            {en
              ? "Live camera: coming soon."
              : "Cámara en vivo del acceso al parque: próximamente."}
          </div>
        )}
      </div>
    </div>
  );
}

function TarjetaEstado({
  titulo,
  valor,
  color = "text-white",
  nota,
}: {
  titulo: string;
  valor: string;
  color?: string;
  nota?: string;
}) {
  return (
    <div className="rounded-tarjeta bg-white/5 p-4 ring-1 ring-white/10">
      <p className="text-sm text-white/70">{titulo}</p>
      <p className={`mt-1 font-titulo text-2xl font-extrabold ${color}`}>{valor}</p>
      {nota && <p className="mt-1 text-xs text-white/60">{nota}</p>}
    </div>
  );
}
