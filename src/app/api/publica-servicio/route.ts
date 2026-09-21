import { NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

/**
 * Recibe el formulario "Publica tu servicio" y crea un prestador como BORRADOR
 * en Sanity, para que la Cámara de Turismo lo revise antes de publicarlo.
 * El token de escritura solo se usa aquí, en el servidor.
 */

// Cliente de escritura (solo servidor). El token nunca llega al navegador.
const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

const TIPOS = ["alojamiento", "comida", "guia"];
const LOCALIDADES = ["antuco", "abanico", "villa-peluca", "alto-antuco"];

// Limitación básica de frecuencia por IP (best-effort, en memoria).
const ultimasSolicitudes = new Map<string, number>();
const MIN_INTERVALO_MS = 30 * 1000;

export async function POST(req: NextRequest) {
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    return NextResponse.json({ error: "Servicio no configurado." }, { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Datos no válidos." }, { status: 400 });
  }

  // Anti-spam: honeypot (campo oculto que un humano deja vacío).
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true }, { status: 200 }); // fingir éxito
  }

  // Anti-spam: frecuencia por IP.
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "desconocida";
  const ahora = Date.now();
  const previa = ultimasSolicitudes.get(ip);
  if (previa && ahora - previa < MIN_INTERVALO_MS) {
    return NextResponse.json(
      { error: "Espera un momento antes de enviar otra solicitud." },
      { status: 429 }
    );
  }

  // Validación de campos.
  const nombre = str(body.nombre);
  const tipo = str(body.tipo);
  const localidad = str(body.localidad);
  const detalle = str(body.detalle);
  const whatsapp = str(body.whatsapp).replace(/\D/g, "");
  const enlaceReserva = str(body.enlaceReserva);
  const contacto = str(body.contacto);

  if (!nombre || nombre.length < 2) {
    return NextResponse.json({ error: "Escribe el nombre del servicio." }, { status: 400 });
  }
  if (!TIPOS.includes(tipo)) {
    return NextResponse.json({ error: "Elige un tipo válido." }, { status: 400 });
  }
  if (!LOCALIDADES.includes(localidad)) {
    return NextResponse.json({ error: "Elige una localidad válida." }, { status: 400 });
  }
  if (!contacto) {
    return NextResponse.json(
      { error: "Deja un contacto (teléfono o correo) para poder responderte." },
      { status: 400 }
    );
  }

  try {
    await writeClient.create({
      _id: `drafts.${crypto.randomUUID()}`,
      _type: "prestador",
      language: "es",
      nombre,
      tipo,
      localidad,
      ...(detalle ? { detalle } : {}),
      ...(whatsapp ? { whatsapp } : {}),
      ...(enlaceReserva ? { enlaceReserva } : {}),
      registradoSernatur: false,
      contactoSolicitante: contacto,
    });
  } catch {
    return NextResponse.json(
      { error: "No se pudo enviar la solicitud. Intenta más tarde." },
      { status: 502 }
    );
  }

  ultimasSolicitudes.set(ip, ahora);
  return NextResponse.json({ ok: true });
}

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}
