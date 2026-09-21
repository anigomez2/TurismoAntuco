import Link from "next/link";
import { sanityFetch, TAGS } from "@/sanity/lib/fetch";
import { configuracionQuery } from "@/sanity/lib/queries";
import type { Configuracion } from "@/sanity/lib/types";
import type { Idioma } from "@/lib/i18n";
import { getDiccionario } from "@/lib/dictionaries";
import { enlacesNav } from "@/lib/navegacion";
import { IconInstagram, IconFacebook, IconMapPin } from "@/components/Icons";

/** Pie de página con contacto, horario, redes y navegación. */
export async function Footer({ lang }: { lang: Idioma }) {
  const cfg = await sanityFetch<Configuracion | null>({
    query: configuracionQuery,
    tags: [TAGS.configuracion],
  });
  const d = getDiccionario(lang);
  const enlaces = enlacesNav(lang);

  return (
    <footer className="mt-16 border-t border-tinta/10 bg-white">
      <div className="mx-auto grid max-w-contenido gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        {/* Marca + slogan */}
        <div>
          <p className="font-titulo text-xl font-extrabold text-tinta">ANTUCO</p>
          <p className="mt-2 max-w-xs text-secundario">{d.slogan}</p>
        </div>

        {/* Oficina y contacto */}
        <div>
          <h2 className="font-titulo text-sm font-bold uppercase tracking-wide text-secundario">
            {d.footer.oficina}
          </h2>
          <ul className="mt-3 space-y-1 text-sm text-tinta">
            {cfg?.direccionOficina && (
              <li className="flex items-start gap-2">
                <IconMapPin size={16} className="mt-0.5 shrink-0 text-secundario" />
                {cfg.direccionOficina}
              </li>
            )}
            {cfg?.horarioOficina && (
              <li className="text-secundario">
                {d.footer.horario}: {cfg.horarioOficina}
              </li>
            )}
            {cfg?.telefono && (
              <li>
                <a href={`tel:${cfg.telefono}`}>{cfg.telefono}</a>
              </li>
            )}
            {cfg?.email && (
              <li>
                <a href={`mailto:${cfg.email}`}>{cfg.email}</a>
              </li>
            )}
          </ul>

          {(cfg?.instagram || cfg?.facebook) && (
            <div className="mt-4 flex items-center gap-3">
              {cfg?.instagram && (
                <a href={cfg.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-secundario hover:text-tinta">
                  <IconInstagram />
                </a>
              )}
              {cfg?.facebook && (
                <a href={cfg.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-secundario hover:text-tinta">
                  <IconFacebook />
                </a>
              )}
            </div>
          )}
        </div>

        {/* Navegación */}
        <nav aria-label="Pie de página">
          <h2 className="font-titulo text-sm font-bold uppercase tracking-wide text-secundario">
            {d.nav.inicio}
          </h2>
          <ul className="mt-3 space-y-1 text-sm">
            {enlaces.map((e) => (
              <li key={e.href}>
                <Link href={e.href} className="text-tinta no-underline hover:text-glaciar">
                  {e.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-tinta/10">
        <p className="mx-auto max-w-contenido px-4 py-4 text-xs text-secundario sm:px-6">
          © {new Date().getFullYear()} {d.footer.derechos}
        </p>
      </div>
    </footer>
  );
}
