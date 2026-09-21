import { Boton } from "@/components/Boton";
import type { Idioma } from "@/lib/i18n";
import { rutas } from "@/lib/navegacion";

/** Llamado a los prestadores para publicar su servicio. */
export function CtaPublica({ lang }: { lang: Idioma }) {
  const t =
    lang === "en"
      ? {
          titulo: "Do you run a tourism service in Antuco?",
          texto:
            "Publish your lodging, restaurant or guided tour for free. The Tourism Chamber helps you with the listing, the photos and the Sernatur registration.",
          boton: "Publish my service",
        }
      : {
          titulo: "¿Tienes un servicio turístico en Antuco?",
          texto:
            "Publica tu alojamiento, restaurante o salida guiada sin costo. La Cámara de Turismo te ayuda con la ficha, las fotos y la inscripción en Sernatur.",
          boton: "Publicar mi servicio",
        };

  return (
    <div className="rounded-tarjeta border border-tinta/10 bg-white p-6 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl">{t.titulo}</h2>
          <p className="mt-2 max-w-2xl text-secundario">{t.texto}</p>
        </div>
        <Boton href={`${rutas(lang).directorio}/publicar`} className="shrink-0">
          {t.boton}
        </Boton>
      </div>
    </div>
  );
}
