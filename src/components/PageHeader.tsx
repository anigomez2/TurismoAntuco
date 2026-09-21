import Link from "next/link";
import { Container } from "@/components/Container";

export interface Miga {
  label: string;
  href?: string;
}

/**
 * Encabezado de página: miga de pan + título grande + bajada.
 * Replica la jerarquía de las maquetas (título condensado, bajada en serif).
 */
export function PageHeader({
  migas,
  titulo,
  bajada,
}: {
  migas?: Miga[];
  titulo: string;
  bajada?: string;
}) {
  return (
    <Container as="header" className="pb-6 pt-10 sm:pt-14">
      {migas && migas.length > 0 && (
        <nav aria-label="Miga de pan" className="mb-3 text-sm text-secundario">
          <ol className="flex flex-wrap items-center gap-1">
            {migas.map((m, i) => (
              <li key={i} className="flex items-center gap-1">
                {m.href ? (
                  <Link href={m.href} className="hover:text-tinta">
                    {m.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-secundario">
                    {m.label}
                  </span>
                )}
                {i < migas.length - 1 && <span aria-hidden className="text-tinta/30">/</span>}
              </li>
            ))}
          </ol>
        </nav>
      )}
      <h1 className="max-w-4xl text-4xl leading-[1.03] sm:text-5xl">{titulo}</h1>
      {bajada && <p className="mt-4 max-w-2xl text-lg text-secundario">{bajada}</p>}
    </Container>
  );
}
