"use client";

import { useState, type ReactNode } from "react";

export interface TabItem {
  id: string;
  label: string;
}

/**
 * Pestañas accesibles (patrón tablist/tab/tabpanel).
 * Los paneles se pasan ya renderizados y se muestran/ocultan según la pestaña
 * activa. Navegable con teclado (flechas, Home/End).
 */
export function Tabs({
  items,
  panels,
  idInicial,
  className = "",
}: {
  items: TabItem[];
  panels: ReactNode[];
  idInicial?: string;
  className?: string;
}) {
  const [activo, setActivo] = useState(idInicial ?? items[0]?.id);
  const indice = items.findIndex((i) => i.id === activo);

  function alTeclado(e: React.KeyboardEvent) {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) return;
    e.preventDefault();
    let nuevo = indice;
    if (e.key === "ArrowRight") nuevo = (indice + 1) % items.length;
    if (e.key === "ArrowLeft") nuevo = (indice - 1 + items.length) % items.length;
    if (e.key === "Home") nuevo = 0;
    if (e.key === "End") nuevo = items.length - 1;
    setActivo(items[nuevo].id);
  }

  return (
    <div className={className}>
      <div role="tablist" className="flex flex-wrap gap-1 border-b border-tinta/10" onKeyDown={alTeclado}>
        {items.map((item) => {
          const sel = item.id === activo;
          return (
            <button
              key={item.id}
              role="tab"
              id={`tab-${item.id}`}
              aria-selected={sel}
              aria-controls={`panel-${item.id}`}
              tabIndex={sel ? 0 : -1}
              onClick={() => setActivo(item.id)}
              className={`toque -mb-px border-b-2 px-4 py-2 font-titulo text-sm font-semibold transition-colors ${
                sel
                  ? "border-glaciar text-glaciar"
                  : "border-transparent text-secundario hover:text-tinta"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {items.map((item, i) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`panel-${item.id}`}
          aria-labelledby={`tab-${item.id}`}
          hidden={item.id !== activo}
          className="pt-6"
        >
          {panels[i]}
        </div>
      ))}
    </div>
  );
}
