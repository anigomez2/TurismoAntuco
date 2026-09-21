import { SanityImage, PlaceholderImagen } from "@/components/SanityImage";
import { Boton } from "@/components/Boton";
import type { FotoConAlt } from "@/sanity/lib/types";

/** Bloque de dos columnas: imagen + texto con un llamado a la acción. */
export function SeccionPromo({
  titulo,
  texto,
  hrefBoton,
  etiquetaBoton,
  foto,
  descripcionFoto,
  invertir = false,
}: {
  titulo: string;
  texto: string;
  hrefBoton: string;
  etiquetaBoton: string;
  foto?: FotoConAlt;
  descripcionFoto?: string;
  invertir?: boolean;
}) {
  return (
    <div className="grid items-center gap-6 md:grid-cols-2 md:gap-10">
      <div className={`overflow-hidden rounded-tarjeta ${invertir ? "md:order-2" : ""}`}>
        {foto ? (
          <SanityImage foto={foto} sizes="(min-width:768px) 560px, 100vw" className="w-full object-cover" />
        ) : (
          <PlaceholderImagen texto={descripcionFoto} />
        )}
      </div>
      <div className={invertir ? "md:order-1" : ""}>
        <h2 className="text-3xl">{titulo}</h2>
        <p className="mt-3 text-secundario">{texto}</p>
        <div className="mt-5">
          <Boton href={hrefBoton} variante="secundario">
            {etiquetaBoton}
          </Boton>
        </div>
      </div>
    </div>
  );
}
