"use client";

import { useState } from "react";
import type { Idioma } from "@/lib/i18n";

const TIPOS = [
  { v: "alojamiento", es: "Alojamiento", en: "Lodging" },
  { v: "comida", es: "Dónde comer", en: "Food" },
  { v: "guia", es: "Guía u operador", en: "Guide / operator" },
];
const LOCALIDADES = [
  { v: "antuco", t: "Antuco" },
  { v: "abanico", t: "Abanico" },
  { v: "villa-peluca", t: "Villa Peluca" },
  { v: "alto-antuco", t: "Alto Antuco" },
];

type Estado = "idle" | "enviando" | "ok" | "error";

export function FormularioPublicar({ lang }: { lang: Idioma }) {
  const en = lang === "en";
  const [estado, setEstado] = useState<Estado>("idle");
  const [mensaje, setMensaje] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEstado("enviando");
    setMensaje("");
    const fd = new FormData(e.currentTarget);
    const datos = Object.fromEntries(fd.entries());

    try {
      const res = await fetch("/api/publica-servicio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });
      const json = await res.json();
      if (res.ok) {
        setEstado("ok");
        (e.target as HTMLFormElement).reset();
      } else {
        setEstado("error");
        setMensaje(json.error || (en ? "Something went wrong." : "Algo salió mal."));
      }
    } catch {
      setEstado("error");
      setMensaje(en ? "Network error." : "Error de conexión.");
    }
  }

  if (estado === "ok") {
    return (
      <div className="rounded-tarjeta border border-cipres/30 bg-cipres/10 p-6 text-tinta">
        <h2 className="text-xl">{en ? "Request sent!" : "¡Solicitud enviada!"}</h2>
        <p className="mt-2 text-secundario">
          {en
            ? "Thank you. The Tourism Chamber will review your service and get in touch before publishing it."
            : "Gracias. La Cámara de Turismo revisará tu servicio y te contactará antes de publicarlo."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid max-w-2xl gap-4">
      {/* Honeypot anti-spam (oculto para humanos) */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />

      <Campo label={en ? "Service name" : "Nombre del servicio"} requerido>
        <input name="nombre" required className={inputCls} maxLength={120} />
      </Campo>

      <div className="grid gap-4 sm:grid-cols-2">
        <Campo label={en ? "Type" : "Tipo"} requerido>
          <select name="tipo" required defaultValue="" className={inputCls}>
            <option value="" disabled>
              {en ? "Choose…" : "Elige…"}
            </option>
            {TIPOS.map((t) => (
              <option key={t.v} value={t.v}>
                {en ? t.en : t.es}
              </option>
            ))}
          </select>
        </Campo>
        <Campo label={en ? "Locality" : "Localidad"} requerido>
          <select name="localidad" required defaultValue="" className={inputCls}>
            <option value="" disabled>
              {en ? "Choose…" : "Elige…"}
            </option>
            {LOCALIDADES.map((l) => (
              <option key={l.v} value={l.v}>
                {l.t}
              </option>
            ))}
          </select>
        </Campo>
      </div>

      <Campo label={en ? "Short description" : "Descripción breve"}>
        <textarea name="detalle" rows={3} className={inputCls} maxLength={400} />
      </Campo>

      <div className="grid gap-4 sm:grid-cols-2">
        <Campo label="WhatsApp">
          <input name="whatsapp" inputMode="numeric" placeholder="56912345678" className={inputCls} />
        </Campo>
        <Campo label={en ? "Booking link (optional)" : "Enlace de reserva (opcional)"}>
          <input name="enlaceReserva" type="url" placeholder="https://" className={inputCls} />
        </Campo>
      </div>

      <Campo label={en ? "Your contact (phone or email)" : "Tu contacto (teléfono o correo)"} requerido>
        <input name="contacto" required className={inputCls} maxLength={160} />
      </Campo>

      {estado === "error" && (
        <p role="alert" className="rounded bg-alerta/10 px-3 py-2 text-sm text-alerta">
          {mensaje}
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={estado === "enviando"}
          className="toque inline-flex items-center justify-center rounded-tarjeta bg-glaciar px-5 py-2.5 font-titulo text-sm font-semibold text-white hover:bg-[#195868] disabled:opacity-60"
        >
          {estado === "enviando"
            ? en
              ? "Sending…"
              : "Enviando…"
            : en
              ? "Send request"
              : "Enviar solicitud"}
        </button>
      </div>

      <p className="text-xs text-secundario">
        {en
          ? "Your request is reviewed before publishing. We only use your contact to reach you."
          : "Tu solicitud se revisa antes de publicarse. Usamos tu contacto solo para responderte."}
      </p>
    </form>
  );
}

const inputCls =
  "w-full rounded-tarjeta border border-tinta/20 bg-white px-3 py-2.5 text-tinta focus:border-glaciar";

function Campo({
  label,
  requerido = false,
  children,
}: {
  label: string;
  requerido?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block font-titulo text-sm font-semibold text-tinta">
        {label} {requerido && <span className="text-alerta">*</span>}
      </span>
      {children}
    </label>
  );
}
