import Link from "next/link";
import { Card } from "@/components/Card";
import { SanityImage } from "@/components/SanityImage";
import type { Ficha } from "@/sanity/lib/types";
import type { Idioma } from "@/lib/i18n";

const TIPO_LABEL: Record<string, { es: string; en: string }> = {
  especie: { es: "Especie", en: "Species" },
  geositio: { es: "Geositio", en: "Geosite" },
  hito: { es: "Hito", en: "Landmark" },
};

/** Tarjeta de ficha de la guía de campo. */
export function FichaCard({ ficha: f, lang }: { ficha: Ficha; lang: Idioma }) {
  const en = lang === "en";

  return (
    <Card className="flex h-full flex-col">
      <Link href={`/${lang}/ficha/${f.slug}`} tabIndex={-1} aria-hidden className="block">
        <SanityImage
          foto={f.fotos?.[0]}
          sizes="(min-width:1024px) 300px, (min-width:640px) 50vw, 100vw"
          className="w-full object-cover"
          descripcionPendiente={en ? "Photo of the entry" : "Foto de la ficha"}
        />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <p className="font-titulo text-xs uppercase tracking-wide text-secundario">
          {(TIPO_LABEL[f.tipo] && (en ? TIPO_LABEL[f.tipo].en : TIPO_LABEL[f.tipo].es)) || f.tipo}
        </p>
        <h3 className="mt-1 text-lg leading-tight">
          <Link href={`/${lang}/ficha/${f.slug}`} className="text-tinta no-underline hover:text-glaciar">
            {f.nombreComun}
          </Link>
        </h3>
        {f.nombreCientifico && <p className="text-sm italic text-secundario">{f.nombreCientifico}</p>}
      </div>
    </Card>
  );
}
