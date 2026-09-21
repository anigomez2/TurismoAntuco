import { Boton } from "@/components/Boton";
import { urlWhatsApp } from "@/lib/format";

/** Botón de WhatsApp con mensaje prellenado. No se muestra si falta el número. */
export function WhatsAppButton({
  numero,
  mensaje,
  etiqueta = "WhatsApp",
  className = "",
}: {
  numero?: string;
  mensaje?: string;
  etiqueta?: string;
  className?: string;
}) {
  const href = urlWhatsApp(numero, mensaje);
  if (!href) return null;
  return (
    <Boton href={href} variante="whatsapp" externo className={className} ariaLabel={`Escribir por WhatsApp`}>
      {etiqueta}
    </Boton>
  );
}
