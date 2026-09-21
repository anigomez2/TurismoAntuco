import Link from "next/link";
import { type ReactNode } from "react";
import { IconExternal, IconWhatsApp } from "@/components/Icons";

type Variante = "primario" | "secundario" | "whatsapp";

const estilos: Record<Variante, string> = {
  primario:
    "bg-glaciar text-white hover:bg-[#195868] focus-visible:bg-[#195868]",
  secundario:
    "border border-tinta/20 bg-white text-tinta hover:border-tinta/40",
  whatsapp: "bg-cipres text-white hover:bg-[#335741]",
};

const claseBase =
  "inline-flex items-center justify-center gap-2 rounded-tarjeta px-4 py-2.5 " +
  "text-sm font-titulo font-semibold leading-none toque transition-colors " +
  "no-underline";

/** Botón/enlace consistente. Cumple el objetivo táctil mínimo (44px). */
export function Boton({
  href,
  children,
  variante = "primario",
  externo = false,
  className = "",
  ariaLabel,
}: {
  href: string;
  children: ReactNode;
  variante?: Variante;
  externo?: boolean;
  className?: string;
  ariaLabel?: string;
}) {
  const contenido = (
    <>
      {variante === "whatsapp" && <IconWhatsApp size={18} />}
      {children}
      {externo && variante !== "whatsapp" && <IconExternal size={16} />}
    </>
  );
  const clase = `${claseBase} ${estilos[variante]} ${className}`;

  if (externo) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={clase}
        aria-label={ariaLabel}
      >
        {contenido}
      </a>
    );
  }
  return (
    <Link href={href} className={clase} aria-label={ariaLabel}>
      {contenido}
    </Link>
  );
}
