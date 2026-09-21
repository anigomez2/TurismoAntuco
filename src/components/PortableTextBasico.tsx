import { Fragment } from "react";

/**
 * Render básico de Portable Text (sin dependencias externas).
 * Soporta párrafos, encabezados, listas y marcas simples (negrita, cursiva,
 * enlaces). Suficiente para las descripciones que escriben los editores.
 */

interface Span {
  _key?: string;
  _type: "span";
  text?: string;
  marks?: string[];
}
interface MarkDef {
  _key: string;
  _type: string;
  href?: string;
}
interface Block {
  _key?: string;
  _type: string;
  style?: string;
  listItem?: "bullet" | "number";
  children?: Span[];
  markDefs?: MarkDef[];
}

export function PortableTextBasico({ value }: { value?: unknown }) {
  if (!Array.isArray(value) || value.length === 0) return null;
  const blocks = value as Block[];

  // Agrupa items de lista consecutivos en <ul>/<ol>.
  const nodos: React.ReactNode[] = [];
  let lista: Block[] = [];
  let listaTipo: "bullet" | "number" | null = null;

  const volcarLista = (i: number) => {
    if (!lista.length || !listaTipo) return;
    const Tag = listaTipo === "number" ? "ol" : "ul";
    nodos.push(
      <Tag
        key={`lista-${i}`}
        className={`my-3 space-y-1 pl-5 ${listaTipo === "number" ? "list-decimal" : "list-disc"}`}
      >
        {lista.map((b, j) => (
          <li key={b._key ?? j}>{renderHijos(b)}</li>
        ))}
      </Tag>
    );
    lista = [];
    listaTipo = null;
  };

  blocks.forEach((b, i) => {
    if (b._type !== "block") return;
    if (b.listItem) {
      if (listaTipo && listaTipo !== b.listItem) volcarLista(i);
      listaTipo = b.listItem;
      lista.push(b);
      return;
    }
    volcarLista(i);
    nodos.push(<Parrafo key={b._key ?? i} block={b} />);
  });
  volcarLista(blocks.length);

  return <div className="leading-relaxed text-tinta">{nodos}</div>;
}

function Parrafo({ block }: { block: Block }) {
  const hijos = renderHijos(block);
  switch (block.style) {
    case "h2":
      return <h2 className="mb-2 mt-6 text-2xl">{hijos}</h2>;
    case "h3":
      return <h3 className="mb-2 mt-5 text-xl">{hijos}</h3>;
    case "blockquote":
      return (
        <blockquote className="my-4 border-l-2 border-glaciar pl-4 italic text-secundario">
          {hijos}
        </blockquote>
      );
    default:
      return <p className="my-3">{hijos}</p>;
  }
}

function renderHijos(block: Block) {
  return (block.children ?? []).map((span, i) => {
    let nodo: React.ReactNode = span.text ?? "";
    const marks = span.marks ?? [];

    if (marks.includes("strong")) nodo = <strong>{nodo}</strong>;
    if (marks.includes("em")) nodo = <em>{nodo}</em>;

    const enlaceDef = marks
      .map((m) => block.markDefs?.find((def) => def._key === m && def._type === "link"))
      .find(Boolean);
    if (enlaceDef?.href) {
      nodo = (
        <a href={enlaceDef.href} target="_blank" rel="noopener noreferrer">
          {nodo}
        </a>
      );
    }
    return <Fragment key={span._key ?? i}>{nodo}</Fragment>;
  });
}
