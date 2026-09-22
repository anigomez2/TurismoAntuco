/**
 * Carga (o actualiza) el documento "Historia y patrimonio" en Sanity.
 * Uso:  npm run seed:historia
 */
import { createClient } from "@sanity/client";
import { config as loadEnv } from "dotenv";
import { historiaDoc } from "./data-historia";

loadEnv({ path: ".env.local" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("\n✗ Faltan variables en .env.local (projectId y SANITY_API_WRITE_TOKEN).\n");
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: "2024-10-01", useCdn: false });

client
  .createOrReplace(historiaDoc())
  .then(() => console.log("✓ Documento 'Historia y patrimonio' cargado con hero + 4 temas."))
  .catch((e) => {
    console.error("✗ Error:", e.message || e);
    process.exit(1);
  });
