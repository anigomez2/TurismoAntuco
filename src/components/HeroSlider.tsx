"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import { urlForImage } from "@/sanity/lib/image";
import type { FotoConAlt } from "@/sanity/lib/types";
import { IconChevronDown } from "@/components/Icons";

const ANCHOS = [1000, 1400, 1800, 2200];
const INTERVALO_MS = 6000;

/**
 * Carrusel de fondo del hero: fotos de Antuco con cross-fade, avance
 * automático, controles (flechas y puntos) y deslizamiento táctil. El contenido
 * (slogan y botones) se pasa como children y queda fijo encima.
 * Respeta "reducir movimiento" y se pausa al pasar el cursor o al enfocar.
 */
export function HeroSlider({
  fotos,
  children,
  lang,
}: {
  fotos: FotoConAlt[];
  children: ReactNode;
  lang: "es" | "en";
}) {
  const n = fotos.length;
  const [idx, setIdx] = useState(0);
  const [pausado, setPausado] = useState(false);
  const reduce = usePrefersReducedMotion();
  const touchX = useRef<number | null>(null);
  const en = lang === "en";

  useEffect(() => {
    if (n <= 1 || pausado || reduce) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % n), INTERVALO_MS);
    return () => clearInterval(t);
  }, [n, pausado, reduce]);

  const ir = (i: number) => setIdx(((i % n) + n) % n);

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) ir(idx + (dx < 0 ? 1 : -1));
    touchX.current = null;
  };

  return (
    <section
      className="relative isolate overflow-hidden bg-tinta"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocus={() => setPausado(true)}
      onBlur={() => setPausado(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-roledescription={en ? "carousel" : "carrusel"}
      aria-label={en ? "Photos of Antuco" : "Fotos de Antuco"}
    >
      {/* Fotos de fondo */}
      <div className="absolute inset-0">
        {n === 0 && <div className="absolute inset-0 bg-[#c3d2d6]" aria-hidden />}
        {fotos.map((f, i) => (
          <img
            key={f._key ?? i}
            src={urlForImage(f).width(1800).quality(80).url()}
            srcSet={ANCHOS.map((w) => `${urlForImage(f).width(w).quality(80).url()} ${w}w`).join(", ")}
            sizes="100vw"
            alt={i === idx ? f.alt || "" : ""}
            aria-hidden={i !== idx}
            loading={i === 0 ? "eager" : "lazy"}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
              i === idx ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        {/* Velo para legibilidad */}
        <div className="absolute inset-0 bg-tinta/25" aria-hidden />
      </div>

      {/* Contenido (slogan + botones) */}
      <div className="relative z-10">{children}</div>

      {/* Controles */}
      {n > 1 && (
        <div className="absolute bottom-5 right-4 z-20 flex items-center gap-2 rounded-full bg-tinta/40 px-3 py-2 backdrop-blur sm:right-6">
          <button
            type="button"
            onClick={() => ir(idx - 1)}
            aria-label={en ? "Previous photo" : "Foto anterior"}
            className="flex h-7 w-7 items-center justify-center rounded-full text-white hover:bg-white/20"
          >
            <IconChevronDown size={18} className="rotate-90" />
          </button>

          <div className="flex items-center gap-1.5" role="tablist" aria-label={en ? "Choose photo" : "Elegir foto"}>
            {fotos.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => ir(i)}
                aria-label={`${en ? "Photo" : "Foto"} ${i + 1}`}
                aria-selected={i === idx}
                role="tab"
                className={`h-2 w-2 rounded-full transition-colors ${
                  i === idx ? "bg-white" : "bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => ir(idx + 1)}
            aria-label={en ? "Next photo" : "Foto siguiente"}
            className="flex h-7 w-7 items-center justify-center rounded-full text-white hover:bg-white/20"
          >
            <IconChevronDown size={18} className="-rotate-90" />
          </button>
        </div>
      )}
    </section>
  );
}

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(m.matches);
    const h = () => setReduce(m.matches);
    m.addEventListener("change", h);
    return () => m.removeEventListener("change", h);
  }, []);
  return reduce;
}
