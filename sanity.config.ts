"use client";

/**
 * Configuración del Sanity Studio embebido en /studio.
 */
import {
  defineConfig,
  useClient,
  type DocumentActionComponent,
} from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { presentationTool } from "sanity/presentation";
import { documentInternationalization } from "@sanity/document-internationalization";

import { apiVersion, dataset, projectId } from "@/sanity/env";
import { schema, SINGLETONS } from "@/sanity/schemaTypes";
import { structure } from "@/sanity/structure";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

/** Tipos que se traducen (español principal + inglés). */
const TIPOS_TRADUCIBLES = ["experiencia", "prestador", "evento", "ficha"];

export default defineConfig({
  name: "turismo-antuco",
  title: "Turismo Antuco",
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: {
        origin: SITE_URL,
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
    }),
    documentInternationalization({
      supportedLanguages: [
        { id: "es", title: "Español" },
        { id: "en", title: "English" },
      ],
      schemaTypes: TIPOS_TRADUCIBLES,
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  document: {
    // Ocultar acciones "crear" y "borrar" para los singletons.
    actions: (prev, { schemaType }) => {
      if ((SINGLETONS as readonly string[]).includes(schemaType)) {
        prev = prev.filter(
          ({ action }) => action !== "duplicate" && action !== "delete"
        );
      }
      // El "estado" guarda su fecha de actualización automáticamente al publicar.
      if (schemaType === "estado") {
        return prev.map((action) =>
          action.action === "publish" ? conFechaActualizacion(action) : action
        );
      }
      return prev;
    },
    // No permitir crear singletons desde el botón global "+".
    newDocumentOptions: (prev) =>
      prev.filter(
        (item) =>
          !(SINGLETONS as readonly string[]).includes(item.templateId)
      ),
  },
});

/**
 * Envuelve la acción "publicar" del estado para escribir la fecha/hora actual
 * en el campo "actualizado" justo antes de publicar. Así el editor no tiene
 * que tocar ese campo nunca.
 */
function conFechaActualizacion(
  publishAction: DocumentActionComponent
): DocumentActionComponent {
  const Wrapped: DocumentActionComponent = (props) => {
    const client = useClient({ apiVersion });
    const original = publishAction(props);
    if (!original) return original;
    return {
      ...original,
      onHandle: async () => {
        // Escribe la fecha/hora actual en el borrador antes de publicar.
        try {
          await client
            .patch(`drafts.${props.id}`)
            .set({ actualizado: new Date().toISOString() })
            .commit();
        } catch {
          // Si falla el parche, se publica igual con la fecha previa.
        }
        original.onHandle?.();
      },
    };
  };
  return Wrapped;
}
