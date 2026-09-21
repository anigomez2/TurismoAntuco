import { Boton } from "@/components/Boton";
import { IconWhatsApp } from "@/components/Icons";
import { urlWhatsApp } from "@/lib/format";

/**
 * Botón de WhatsApp con mensaje prellenado. No se muestra si falta el número.
 * Por defecto usa el estilo contorno (como en las maquetas del directorio).
 */
export function WhatsAppButton({
  numero,
  mensaje,
  etiqueta = "WhatsApp",
  variante = "secundario",
  className = "",
}: {
  numero?: string;
  mensaje?: string;
  etiqueta?: string;
  variante?: "whatsapp" | "secundario";
  className?: string;
}) {
  const href = urlWhatsApp(numero, mensaje);
  if (!href) return null;
  return (
    <Boton
      href={href}
      variante={variante}
      externo
      icono={<IconWhatsApp size={18} />}
      className={className}
      ariaLabel="Escribir por WhatsApp"
    >
      {etiqueta}
    </Boton>
  );
}
