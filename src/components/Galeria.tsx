"use client";

import { useState } from "react";
import { SanityImage } from "@/components/SanityImage";
import type { FotoConAlt } from "@/sanity/lib/types";

/** Galería: imagen principal grande + miniaturas seleccionables. */
export function Galeria({ fotos, lang }: { fotos?: FotoConAlt[]; lang: "es" | "en" }) {
  const lista = fotos && fotos.length > 0 ? fotos : [undefined];
  const [activa, setActiva] = useState(0);
  const principal = lista[activa];

  return (
    <div className="grid gap-3 sm:grid-cols-[1fr_88px]">
      <SanityImage
        foto={principal}
        priority
        sizes="(min-width: 1024px) 760px, 100vw"
        className="w-full rounded-tarjeta object-cover"
        descripcionPendiente={lang === "en" ? "Main photo" : "Foto principal"}
      />

      {lista.length > 1 && (
        <ul className="flex gap-3 sm:flex-col" aria-label={lang === "en" ? "Thumbnails" : "Miniaturas"}>
          {lista.map((f, i) => (
            <li key={f?._key ?? i}>
              <button
                onClick={() => setActiva(i)}
                aria-label={`${lang === "en" ? "Photo" : "Foto"} ${i + 1}`}
                aria-current={i === activa}
                className={`block overflow-hidden rounded border-2 ${
                  i === activa ? "border-glaciar" : "border-transparent hover:border-tinta/20"
                }`}
              >
                <SanityImage
                  foto={f}
                  sizes="88px"
                  className="h-[64px] w-[88px] object-cover sm:w-[84px]"
                  descripcionPendiente=""
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
