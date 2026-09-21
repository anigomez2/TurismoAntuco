/**
 * Busca la clave de localidad (Location Key) de AccuWeather para Antuco.
 * Uso:  npm run accuweather:location
 *
 * Muestra las coincidencias para que copies la Key correcta en .env.local
 * (ACCUWEATHER_LOCATION_KEY). También sirve para verificar que la API key
 * funciona. No es obligatorio: si no la defines, el sitio la resuelve solo.
 */
import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env.local" });

const apiKey = process.env.ACCUWEATHER_API_KEY?.trim();
const BASE = "https://dataservice.accuweather.com";

if (!apiKey) {
  console.error("\n✗ Falta ACCUWEATHER_API_KEY en .env.local\n");
  process.exit(1);
}

async function main() {
  // 1) Por nombre
  const porNombre = await fetch(
    `${BASE}/locations/v1/cities/search?apikey=${apiKey}&q=${encodeURIComponent("Antuco")}&language=es`
  ).then((r) => r.json());

  console.log("\nCoincidencias por nombre 'Antuco':");
  for (const c of porNombre as Array<Record<string, unknown>>) {
    const admin = (c.AdministrativeArea as { EnglishName?: string })?.EnglishName;
    const pais = (c.Country as { EnglishName?: string })?.EnglishName;
    console.log(`  Key=${c.Key}  ${c.EnglishName} — ${admin}, ${pais}`);
  }

  // 2) Por coordenadas del pueblo de Antuco
  const porCoords = (await fetch(
    `${BASE}/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=-37.3336,-71.6785&language=es`
  ).then((r) => r.json())) as Record<string, unknown>;

  console.log("\nPor coordenadas de Antuco:");
  console.log(`  Key=${porCoords.Key}  ${porCoords.LocalizedName ?? porCoords.EnglishName}`);
  console.log(
    "\nCopia la Key adecuada en .env.local → ACCUWEATHER_LOCATION_KEY (opcional).\n"
  );
}

main().catch((e) => {
  console.error("\n✗ Error:", e.message || e);
  process.exit(1);
});
