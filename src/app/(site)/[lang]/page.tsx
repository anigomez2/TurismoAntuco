/**
 * Página de inicio — marcador de posición de la Etapa 1.
 * La maquetación real (franja de estado, hero, temporadas, etc.) llega en las
 * Etapas 2 y 3.
 */
export default function InicioPage() {
  return (
    <section className="py-16">
      <p className="font-titulo text-sm uppercase tracking-widest text-secundario">
        Turismo Antuco
      </p>
      <h1 className="mt-2 text-display">
        Ven, respira profundo y descubre Antuco
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-secundario">
        Andamiaje del proyecto listo. Esta página se construye en la Etapa 2
        (diseño base y componentes) y Etapa 3 (páginas).
      </p>
    </section>
  );
}
