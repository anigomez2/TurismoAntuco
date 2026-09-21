"use client";

import { useState } from "react";
import { Boton } from "@/components/Boton";
import { IconWhatsApp } from "@/components/Icons";
import { formatearPrecio, etiquetaReserva, urlWhatsApp } from "@/lib/format";
import type { Idioma } from "@/lib/i18n";

/**
 * Panel de reserva de una experiencia. La fecha y el número de personas se
 * incluyen en el mensaje prellenado de WhatsApp y no ejecutan un pago (la
 * reserva se concreta con el prestador o en su plataforma externa).
 */
export function ReservaPanel({
  titulo,
  precioDesde,
  enlaceReserva,
  whatsapp,
  grupoMaximo,
  politicaCancelacion,
  lang,
}: {
  titulo: string;
  precioDesde?: number;
  enlaceReserva?: string;
  whatsapp?: string;
  grupoMaximo?: number;
  politicaCancelacion?: string;
  lang: Idioma;
}) {
  const en = lang === "en";
  const [fecha, setFecha] = useState("");
  const [personas, setPersonas] = useState(2);
  const precio = formatearPrecio(precioDesde);
  const max = grupoMaximo && grupoMaximo > 0 ? grupoMaximo : 12;

  const mensaje =
    (en
      ? `Hi, I'd like to book "${titulo}" from the Turismo Antuco website.`
      : `Hola, quiero reservar "${titulo}" desde el sitio de Turismo Antuco.`) +
    (fecha ? (en ? ` Date: ${fecha}.` : ` Fecha: ${fecha}.`) : "") +
    (en ? ` People: ${personas}.` : ` Personas: ${personas}.`);

  const waHref = urlWhatsApp(whatsapp, mensaje);

  return (
    <aside className="rounded-tarjeta border border-tinta/10 bg-white p-5 shadow-sm lg:sticky lg:top-24">
      {precio && (
        <p className="font-titulo text-tinta">
          <span className="text-sm font-normal text-secundario">{en ? "From" : "Desde"} </span>
          <span className="text-2xl font-extrabold">{precio}</span>
          <span className="text-sm font-normal text-secundario"> {en ? "per person" : "por persona"}</span>
        </p>
      )}

      <div className="mt-4 space-y-3">
        <label className="block">
          <span className="mb-1 block font-titulo text-sm font-semibold">{en ? "Date" : "Fecha"}</span>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="toque w-full rounded-tarjeta border border-tinta/20 bg-white px-3 py-2 text-tinta"
          />
        </label>

        <label className="block">
          <span className="mb-1 block font-titulo text-sm font-semibold">{en ? "People" : "Personas"}</span>
          <select
            value={personas}
            onChange={(e) => setPersonas(Number(e.target.value))}
            className="toque w-full rounded-tarjeta border border-tinta/20 bg-white px-3 py-2 font-titulo font-semibold text-tinta"
          >
            {Array.from({ length: max }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {enlaceReserva && (
          <Boton href={enlaceReserva} externo mostrarIconoExterno={false} className="w-full">
            {etiquetaReserva(enlaceReserva, lang)}
          </Boton>
        )}
        {waHref && (
          <Boton
            href={waHref}
            externo
            variante="secundario"
            icono={<IconWhatsApp size={18} />}
            className="w-full"
          >
            WhatsApp
          </Boton>
        )}
      </div>

      {politicaCancelacion && (
        <p className="mt-4 text-xs leading-relaxed text-secundario">
          <span className="font-semibold">{en ? "Cancellation: " : "Cancelación: "}</span>
          {politicaCancelacion}
        </p>
      )}
    </aside>
  );
}
