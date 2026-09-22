import { Fragment } from "react";
import { SanityImage } from "@/components/SanityImage";
import type { FotoConAlt } from "@/sanity/lib/types";

/**
 * Renderiza contenido enriquecido de Sanity (Portable Text): párrafos,
 * subtítulos, viñetas, negrita/cursiva e imágenes insertadas con pie de foto.
 * El primer párrafo se muestra como entradilla destacada.
 */

interface Span {
  _key?: string;
  _type: "span";
  text?: string;
  marks?: string[];
}
interface Bloque {
  _key?: string;
  _type: string;
  style?: string;
  listItem?: "bullet";
  children?: Span[];
  markDefs?: { _key: string; _type: string; href?: string }[];
  // imagen
  alt?: string;
  caption?: string;
  asset?: FotoConAlt["asset"];
  lqip?: string;
  dims?: FotoConAlt["dims"];
}

export function ArticuloRico({ value }: { value?: unknown }) {
  if (!Array.isArray(value) || value.length === 0) return null;
  const bloques = value as Bloque[];

  const nodos: React.ReactNode[] = [];
  let lista: Bloque[] = [];
  let primerParrafoUsado = false;

  const volcarLista = (i: number) => {
    if (!lista.length) return;
    nodos.push(
      <ul key={`ul-${i}`} className="my-4 list-disc space-y-1.5 pl-6 text-tinta">
        {lista.map((b, j) => (
          <li key={b._key ?? j}>{renderHijos(b)}</li>
        ))}
      </ul>
    );
    lista = [];
  };

  bloques.forEach((b, i) => {
    // Imagen insertada
    if (b._type === "image") {
      volcarLista(i);
      if (!b.asset) return;
      nodos.push(
        <figure key={b._key ?? i} className="my-8">
          <SanityImage
            foto={{ alt: b.alt ?? "", asset: b.asset, lqip: b.lqip, dims: b.dims }}
            sizes="(min-width: 768px) 768px, 100vw"
            className="w-full rounded-tarjeta object-cover"
          />
          {b.caption && (
            <figcaption className="mt-2 text-sm text-secundario">{b.caption}</figcaption>
          )}
        </figure>
      );
      return;
    }

    if (b._type !== "block") return;

    if (b.listItem === "bullet") {
      lista.push(b);
      return;
    }
    volcarLista(i);

    if (b.style === "h3") {
      nodos.push(
        <h2 key={b._key ?? i} className="mt-10 text-2xl text-tinta">
          {renderHijos(b)}
        </h2>
      );
      return;
    }

    // Párrafo normal; el primero es entradilla.
    const esEntradilla = !primerParrafoUsado;
    primerParrafoUsado = true;
    nodos.push(
      <p
        key={b._key ?? i}
        className={esEntradilla ? "text-xl leading-relaxed text-tinta" : "text-tinta"}
      >
        {renderHijos(b)}
      </p>
    );
  });
  volcarLista(bloques.length);

  return <div className="space-y-4 leading-relaxed">{nodos}</div>;
}

function renderHijos(bloque: Bloque) {
  return (bloque.children ?? []).map((span, i) => {
    let nodo: React.ReactNode = span.text ?? "";
    const marks = span.marks ?? [];
    if (marks.includes("strong")) nodo = <strong>{nodo}</strong>;
    if (marks.includes("em")) nodo = <em>{nodo}</em>;
    const enlace = marks
      .map((m) => bloque.markDefs?.find((def) => def._key === m && def._type === "link"))
      .find(Boolean);
    if (enlace?.href) {
      nodo = (
        <a href={enlace.href} target="_blank" rel="noopener noreferrer">
          {nodo}
        </a>
      );
    }
    return <Fragment key={span._key ?? i}>{nodo}</Fragment>;
  });
}
