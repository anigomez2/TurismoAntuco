import Link from "next/link";
import { IconRoute, IconInfo, IconShield, IconLeaf } from "@/components/Icons";
import type { Idioma } from "@/lib/i18n";
import { rutas } from "@/lib/navegacion";

/** Bloque "Antes de venir": recomendaciones clave para el visitante. */
export function AntesDeVenir({ lang }: { lang: Idioma }) {
  const r = rutas(lang);
  const en = lang === "en";

  const items = [
    {
      icono: IconRoute,
      titulo: en ? "How to get here" : "Cómo llegar",
      texto: en
        ? "65 km from Los Ángeles on Route Q-45. Rural buses reach Abanico; from there, private transport."
        : "65 km desde Los Ángeles por la Ruta Q-45. Los buses rurales llegan hasta Abanico; desde ahí, transporte particular.",
      href: r.planifica,
    },
    {
      icono: IconInfo,
      titulo: en ? "Park entrance" : "Entrada al parque",
      texto: en
        ? "The national park is managed by Conaf, with an entrance fee. Buy your ticket before arriving."
        : "El parque nacional lo administra Conaf y tiene entrada pagada. Compra tu ticket antes de llegar.",
      href: r.planifica,
    },
    {
      icono: IconShield,
      titulo: en ? "Mountain safety" : "Seguridad en montaña",
      texto: en
        ? "Weather changes fast. Check today's status, bring layers, water and never go off-trail alone."
        : "El clima cambia rápido. Revisa el estado del día, lleva abrigo, agua y no salgas del sendero solo.",
      href: r.planifica,
    },
    {
      icono: IconLeaf,
      titulo: en ? "Leave no trace" : "No dejes basura",
      texto: en
        ? "Take all your waste back with you. It's a Biosphere Reserve — help keep it pristine."
        : "Llévate toda tu basura de vuelta. Es Reserva de la Biosfera: ayúdanos a mantenerla intacta.",
    },
  ];

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((it) => {
        const Icono = it.icono;
        const contenido = (
          <>
            <Icono size={26} className="text-glaciar" />
            <h3 className="mt-3 text-lg">{it.titulo}</h3>
            <p className="mt-1 text-sm text-secundario">{it.texto}</p>
          </>
        );
        return (
          <li key={it.titulo} className="rounded-tarjeta border border-tinta/10 bg-white p-5">
            {it.href ? (
              <Link href={it.href} className="block no-underline">
                {contenido}
              </Link>
            ) : (
              contenido
            )}
          </li>
        );
      })}
    </ul>
  );
}
