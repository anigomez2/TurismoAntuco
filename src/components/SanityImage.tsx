import { urlForImage } from "@/sanity/lib/image";
import type { FotoConAlt } from "@/sanity/lib/types";

const ANCHOS = [400, 640, 828, 1200, 1600];

/**
 * Imagen responsiva servida desde el CDN de Sanity (formato automático).
 * Si la foto no existe, muestra un marcador con la descripción esperada.
 *
 * `sizes` describe cuánto ancho ocupa la imagen en distintos anchos de pantalla
 * (mejora el rendimiento en móvil).
 */
export function SanityImage({
  foto,
  sizes = "100vw",
  className = "",
  priority = false,
  descripcionPendiente,
}: {
  foto?: FotoConAlt | null;
  sizes?: string;
  className?: string;
  priority?: boolean;
  descripcionPendiente?: string;
}) {
  if (!foto?.asset) {
    return <PlaceholderImagen texto={descripcionPendiente ?? foto?.alt} className={className} />;
  }

  const ratio = foto.dims ? foto.dims.width / foto.dims.height : 3 / 2;
  const src = urlForImage(foto).width(1200).url();
  const srcSet = ANCHOS.map((w) => `${urlForImage(foto).width(w).url()} ${w}w`).join(", ");

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={foto.alt || ""}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={className}
      style={{
        aspectRatio: String(ratio),
        backgroundColor: "#e7e3da",
        backgroundImage: foto.lqip ? `url(${foto.lqip})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
}

/** Marcador visible cuando aún no hay foto real. */
export function PlaceholderImagen({
  texto,
  className = "",
}: {
  texto?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center bg-[#e7e3da] p-4 text-center ${className}`}
      style={{ aspectRatio: "3 / 2" }}
      role="img"
      aria-label={texto ? `Foto pendiente: ${texto}` : "Foto pendiente"}
    >
      <span className="max-w-[28ch] font-titulo text-xs uppercase tracking-wide text-secundario">
        {texto ?? "Foto pendiente"}
      </span>
    </div>
  );
}
