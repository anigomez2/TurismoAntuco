import type { MetadataRoute } from "next";
import { IDIOMAS } from "@/lib/i18n";
import { sanityFetch, TAGS } from "@/sanity/lib/fetch";
import { experienciaSlugsQuery, fichaSlugsQuery } from "@/sanity/lib/queries";

const base = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

const RUTAS_FIJAS = [
  "",
  "/planifica",
  "/directorio",
  "/experiencias",
  "/agenda",
  "/explorando",
  "/historia",
  "/contacto",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [experiencias, fichas] = await Promise.all([
    sanityFetch<{ slug: string }[]>({ query: experienciaSlugsQuery, tags: [TAGS.experiencia] }),
    sanityFetch<{ slug: string }[]>({ query: fichaSlugsQuery, tags: [TAGS.ficha] }),
  ]);

  const urls: MetadataRoute.Sitemap = [];
  const hoy = new Date();

  for (const lang of IDIOMAS) {
    for (const r of RUTAS_FIJAS) {
      urls.push({ url: `${base}/${lang}${r}`, lastModified: hoy, changeFrequency: "weekly" });
    }
    for (const e of experiencias) {
      urls.push({ url: `${base}/${lang}/experiencias/${e.slug}`, lastModified: hoy });
    }
    for (const f of fichas) {
      urls.push({ url: `${base}/${lang}/ficha/${f.slug}`, lastModified: hoy });
    }
  }

  return urls;
}
