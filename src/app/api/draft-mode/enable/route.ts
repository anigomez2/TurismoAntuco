import { createClient } from "next-sanity";
import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { apiVersion, dataset, projectId } from "@/sanity/env";

/**
 * Activa la vista previa de borradores (Draft Mode) desde la herramienta
 * Presentation del Studio. Valida el enlace con el token de lectura.
 */
const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
});

export const { GET } = defineEnableDraftMode({ client });
