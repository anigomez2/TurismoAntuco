/** Inserta datos estructurados schema.org como JSON-LD. */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // El contenido es generado por nosotros (no entrada de usuario sin sanear).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
