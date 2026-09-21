import { type ReactNode } from "react";

/** Contenedor central con el ancho de lectura del sitio. */
export function Container({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "main" | "nav";
}) {
  return (
    <Tag className={`mx-auto w-full max-w-contenido px-4 sm:px-6 ${className}`}>
      {children}
    </Tag>
  );
}
