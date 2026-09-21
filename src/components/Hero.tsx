import { SanityImage } from "@/components/SanityImage";
import { Boton } from "@/components/Boton";
import type { FotoConAlt } from "@/sanity/lib/types";
import type { Idioma } from "@/lib/i18n";
import { getDiccionario } from "@/lib/dictionaries";
import { rutas } from "@/lib/navegacion";

/**
 * Hero de la portada: fotografía a pantalla completa con un panel oscuro que
 * contiene el slogan y dos accesos (qué hacer / estado del parque).
 */
export function Hero({ lang, foto }: { lang: Idioma; foto?: FotoConAlt }) {
  const d = getDiccionario(lang);
  const r = rutas(lang);
  const en = lang === "en";

  return (
    <section className="relative isolate overflow-hidden">
      {/* Fondo: fotografía */}
      <div className="absolute inset-0 -z-10">
        <SanityImage
          foto={foto}
          priority
          sizes="100vw"
          className="h-full w-full object-cover"
          descripcionPendiente={en ? "Full-width cover photo of Antuco" : "Fotografía de portada a pantalla completa de Antuco"}
        />
        <div className="absolute inset-0 bg-tinta/25" aria-hidden />
      </div>

      <div className="mx-auto flex max-w-contenido items-center px-4 py-20 sm:px-6 sm:py-28">
        <div className="max-w-2xl rounded-tarjeta bg-tinta/90 p-7 text-white backdrop-blur-sm sm:p-10">
          <h1 className="text-4xl leading-[1.03] text-white sm:text-5xl">{d.slogan}</h1>
          <p className="mt-5 text-lg text-white/85">
            {en
              ? "Volcano, lagoon, glaciers and Andean forest 65 km from Los Ángeles, inside the Nevados de Chillán–Laguna del Laja Biosphere Reserve."
              : "Volcán, laguna, glaciares y bosque andino a 65 km de Los Ángeles, dentro de la Reserva de la Biosfera Corredor Biológico Nevados de Chillán–Laguna del Laja."}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Boton href={r.experiencias} variante="secundario">
              {en ? "What to do in Antuco" : "Qué hacer en Antuco"}
            </Boton>
            <Boton
              href={r.planifica}
              className="border border-white/40 bg-transparent text-white hover:border-white"
            >
              {en ? "Park status today" : "Estado del parque hoy"}
            </Boton>
          </div>
        </div>
      </div>
    </section>
  );
}
