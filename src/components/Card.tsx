import { type ReactNode } from "react";

/** Tarjeta blanca base del sistema de diseño. */
export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-tarjeta border border-tinta/10 bg-tarjeta ${className}`}
    >
      {children}
    </div>
  );
}
