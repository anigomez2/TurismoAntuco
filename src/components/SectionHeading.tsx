import { type ReactNode } from "react";

/** Encabezado de sección con título y bajada opcional. */
export function SectionHeading({
  titulo,
  bajada,
  accion,
  as = "h2",
}: {
  titulo: string;
  bajada?: string;
  accion?: ReactNode;
  as?: "h1" | "h2" | "h3";
}) {
  const Tag = as;
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <Tag className="text-2xl sm:text-3xl">{titulo}</Tag>
        {bajada && <p className="mt-1 max-w-2xl text-secundario">{bajada}</p>}
      </div>
      {accion}
    </div>
  );
}
