"use client";

import type { Idioma } from "@/lib/i18n";

/** Muestra el código QR de la ficha y permite descargarlo como imagen. */
export function QrDescarga({
  dataUrl,
  nombreArchivo,
  url,
  lang,
}: {
  dataUrl: string;
  nombreArchivo: string;
  url: string;
  lang: Idioma;
}) {
  const en = lang === "en";
  return (
    <div className="rounded-tarjeta border border-tinta/10 bg-white p-5 text-center">
      <p className="font-titulo text-sm font-semibold text-secundario">
        {en ? "Entry QR code" : "Código QR de la ficha"}
      </p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={dataUrl}
        alt={en ? "QR code linking to this entry" : "Código QR que enlaza a esta ficha"}
        className="mx-auto mt-3 h-40 w-40"
      />
      <a
        href={dataUrl}
        download={nombreArchivo}
        className="mt-3 inline-flex items-center justify-center rounded-tarjeta bg-glaciar px-4 py-2 font-titulo text-sm font-semibold text-white hover:bg-[#195868]"
      >
        {en ? "Download QR" : "Descargar QR"}
      </a>
      <p className="mt-2 break-all text-xs text-secundario">{url}</p>
    </div>
  );
}
