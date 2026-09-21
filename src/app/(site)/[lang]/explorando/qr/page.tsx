import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { esIdiomaValido, type Idioma } from "@/lib/i18n";
import { sanityFetch, TAGS } from "@/sanity/lib/fetch";
import { fichasQuery } from "@/sanity/lib/queries";
import type { Ficha } from "@/sanity/lib/types";
import { Container } from "@/components/Container";
import { urlFicha, generarQrDataUrl } from "@/lib/qr";

export const metadata: Metadata = { title: "QR", robots: { index: false } };

async function obtenerFichas(lang: Idioma): Promise<Ficha[]> {
  const res = await sanityFetch<Ficha[]>({ query: fichasQuery, params: { lang }, tags: [TAGS.ficha] });
  if (res.length === 0 && lang !== "es") {
    return sanityFetch<Ficha[]>({ query: fichasQuery, params: { lang: "es" }, tags: [TAGS.ficha] });
  }
  return res;
}

export default async function QrLotePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!esIdiomaValido(lang)) notFound();
  const en = lang === "en";
  const fichas = await obtenerFichas(lang);

  const conQr = await Promise.all(
    fichas.map(async (f) => ({ f, qr: await generarQrDataUrl(urlFicha(f.slug)) }))
  );

  return (
    <Container as="section" className="py-10">
      <h1 className="text-3xl">{en ? "QR codes for signage" : "Códigos QR para señalética"}</h1>
      <p className="mt-2 max-w-2xl text-secundario">
        {en
          ? "Print this page and cut out each code. Each QR links to its entry's stable URL."
          : "Imprime esta página y recorta cada código. Cada QR enlaza a la URL estable de su ficha."}
      </p>

      <ul className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {conQr.map(({ f, qr }) => (
          <li key={f._id} className="break-inside-avoid rounded-tarjeta border border-tinta/15 p-4 text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qr} alt={`QR ${f.nombreComun}`} className="mx-auto h-36 w-36" />
            <p className="mt-2 font-titulo text-sm font-bold text-tinta">{f.nombreComun}</p>
            {f.nombreCientifico && <p className="text-xs italic text-secundario">{f.nombreCientifico}</p>}
            <p className="mt-1 break-all text-[10px] text-secundario">{urlFicha(f.slug)}</p>
          </li>
        ))}
      </ul>
    </Container>
  );
}
