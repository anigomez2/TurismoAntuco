import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Webhook de revalidación de Sanity.
 * Al publicar en el Studio, Sanity hace POST aquí y el sitio (estático) refresca
 * en segundos solo las páginas del tipo afectado. La petición se valida con la
 * firma HMAC que Sanity firma con SANITY_REVALIDATE_SECRET.
 */
const TIPOS_VALIDOS = [
  "estado",
  "prestador",
  "experiencia",
  "evento",
  "ficha",
  "historia",
  "configuracion",
];

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Falta SANITY_REVALIDATE_SECRET" }, { status: 500 });
  }

  const firma = req.headers.get("sanity-webhook-signature");
  const cuerpo = await req.text();

  if (!firmaValida(cuerpo, firma, secret)) {
    return NextResponse.json({ error: "Firma inválida" }, { status: 401 });
  }

  let datos: { _type?: string };
  try {
    datos = JSON.parse(cuerpo);
  } catch {
    return NextResponse.json({ error: "Cuerpo no válido" }, { status: 400 });
  }

  const tipo = datos._type;
  if (!tipo || !TIPOS_VALIDOS.includes(tipo)) {
    return NextResponse.json({ mensaje: "Tipo no revalidable", tipo }, { status: 200 });
  }

  revalidateTag(tipo);
  return NextResponse.json({ revalidado: true, tipo, fecha: Date.now() });
}

/**
 * Valida la firma de Sanity. Formato del header: "t=<ts>,v1=<sig-base64url>".
 * El contenido firmado es "<ts>.<cuerpo>" con HMAC-SHA256 y la clave secreta.
 */
function firmaValida(cuerpo: string, header: string | null, secret: string): boolean {
  if (!header) return false;
  const partes = Object.fromEntries(
    header.split(",").map((p) => p.split("=").map((s) => s.trim()))
  ) as { t?: string; v1?: string };

  if (!partes.t || !partes.v1) return false;

  const esperado = createHmac("sha256", secret)
    .update(`${partes.t}.${cuerpo}`)
    .digest("base64url");

  try {
    const a = Buffer.from(esperado);
    const b = Buffer.from(partes.v1);
    return a.length === b.length && timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
