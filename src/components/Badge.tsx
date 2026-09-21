import { type ReactNode } from "react";
import { IconCheck } from "@/components/Icons";

/** Distintivo pequeño (ej.: "Registrado Sernatur", temporada, dificultad). */
export function Badge({
  children,
  tono = "neutro",
  icono = false,
}: {
  children: ReactNode;
  tono?: "neutro" | "verde" | "azul";
  icono?: boolean;
}) {
  const tonos = {
    neutro: "bg-fondo text-secundario border-tinta/10",
    verde: "bg-cipres/10 text-cipres border-cipres/20",
    azul: "bg-glaciar/10 text-glaciar border-glaciar/20",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-titulo font-semibold ${tonos[tono]}`}
    >
      {icono && <IconCheck size={13} />}
      {children}
    </span>
  );
}
