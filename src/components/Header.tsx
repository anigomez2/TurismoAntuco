"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Idioma } from "@/lib/i18n";
import { IDIOMAS } from "@/lib/i18n";
import { enlacesNav, rutas } from "@/lib/navegacion";
import { IconMenu, IconClose } from "@/components/Icons";

/** Cabecera con logo, navegación, menú móvil y selector de idioma. */
export function Header({ lang }: { lang: Idioma }) {
  const [abierto, setAbierto] = useState(false);
  const pathname = usePathname();
  const enlaces = enlacesNav(lang);

  // Ruta equivalente en el otro idioma (cambia solo el primer segmento).
  const otroIdioma = (destino: Idioma) => {
    const partes = (pathname || `/${lang}`).split("/");
    partes[1] = destino;
    return partes.join("/") || `/${destino}`;
  };

  return (
    <header className="sticky top-0 z-40 border-b border-tinta/10 bg-fondo/95 backdrop-blur">
      <div className="mx-auto flex max-w-contenido items-center gap-4 px-4 py-3 sm:px-6">
        {/* Logo */}
        <Link href={rutas(lang).inicio} className="no-underline" onClick={() => setAbierto(false)}>
          <span className="block font-titulo text-xl font-extrabold leading-none tracking-tight text-tinta">
            ANTUCO
          </span>
          <span className="block font-titulo text-[0.65rem] uppercase tracking-[0.25em] text-secundario">
            Turismo
          </span>
        </Link>

        {/* Navegación de escritorio */}
        <nav className="ml-auto hidden items-center gap-5 lg:flex" aria-label="Principal">
          {enlaces.map((e) => (
            <NavLink key={e.href} href={e.href} pathname={pathname}>
              {e.label}
            </NavLink>
          ))}
        </nav>

        {/* Selector de idioma */}
        <div className="ml-auto flex items-center gap-1 lg:ml-2" role="group" aria-label="Idioma">
          {IDIOMAS.map((id) => (
            <Link
              key={id}
              href={otroIdioma(id)}
              aria-current={id === lang ? "true" : undefined}
              className={`rounded px-2 py-1 text-xs font-titulo font-semibold uppercase no-underline ${
                id === lang ? "bg-tinta text-white" : "text-secundario hover:text-tinta"
              }`}
            >
              {id}
            </Link>
          ))}
        </div>

        {/* Botón de menú móvil */}
        <button
          type="button"
          onClick={() => setAbierto((v) => !v)}
          className="toque flex items-center justify-center rounded text-tinta lg:hidden"
          aria-expanded={abierto}
          aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
        >
          {abierto ? <IconClose /> : <IconMenu />}
        </button>
      </div>

      {/* Panel de menú móvil */}
      {abierto && (
        <nav
          className="border-t border-tinta/10 bg-fondo lg:hidden"
          aria-label="Principal (móvil)"
        >
          <ul className="mx-auto max-w-contenido px-4 py-2 sm:px-6">
            {enlaces.map((e) => (
              <li key={e.href}>
                <Link
                  href={e.href}
                  onClick={() => setAbierto(false)}
                  className="block border-b border-tinta/5 py-3 font-titulo font-semibold text-tinta no-underline"
                >
                  {e.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

function NavLink({
  href,
  pathname,
  children,
}: {
  href: string;
  pathname: string | null;
  children: React.ReactNode;
}) {
  const activo = pathname === href || (href !== `/${pathname?.split("/")[1]}` && pathname?.startsWith(href + "/"));
  return (
    <Link
      href={href}
      aria-current={activo ? "page" : undefined}
      className={`text-sm font-titulo font-semibold no-underline ${
        activo ? "text-glaciar" : "text-tinta hover:text-glaciar"
      }`}
    >
      {children}
    </Link>
  );
}
