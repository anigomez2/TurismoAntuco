# Turismo Antuco — sitio web oficial

Sitio oficial de turismo de la comuna de Antuco (Región del Biobío, Chile).
Administrado por la Cámara de Turismo de Antuco y la Municipalidad.

> **¿Eres editor de contenidos (no técnico)?** No necesitas este archivo.
> Lee **[MANUAL_EDICION.md](MANUAL_EDICION.md)**.

---

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Sanity** como gestor de contenidos, con el **Studio embebido en `/studio`**
- **GROQ** vía `next-sanity`; imágenes desde el CDN de Sanity con `@sanity/image-url`
- **Tailwind CSS** con los tokens de diseño en `tailwind.config.ts`
- **Vercel** para el hosting y despliegue automático
- Internacionalización **a nivel de documento** (`@sanity/document-internationalization`), `/es` y `/en`

## Requisitos

- Node.js 20 o superior
- Una cuenta gratuita en [sanity.io](https://www.sanity.io)

---

## Puesta en marcha (primera vez)

### 1. Instalar dependencias

```bash
npm install
```

### 2. Crear el proyecto en Sanity

Si aún no existe un proyecto de Sanity:

```bash
npx sanity@latest login
npx sanity@latest init --env .env.local
```

Elige **crear un proyecto nuevo**, dataset **`production`**, y acepta que
escriba las variables en `.env.local`. Anota el **Project ID**.

### 3. Configurar las variables de entorno

Copia el archivo de ejemplo y complétalo:

```bash
cp .env.example .env.local
```

Necesitas dos tokens (en [sanity.io/manage](https://www.sanity.io/manage) →
tu proyecto → **API → Tokens**):

| Variable | Permiso | Para qué |
|---|---|---|
| `SANITY_API_READ_TOKEN` | Viewer | Leer borradores en la vista previa |
| `SANITY_API_WRITE_TOKEN` | Editor | Formulario "Publica tu servicio" y datos semilla |

> ⚠️ El token de escritura **nunca** se expone en el navegador (no lleva el
> prefijo `NEXT_PUBLIC_`). Solo lo usa el servidor.

Inventa también un valor para `SANITY_REVALIDATE_SECRET` (cualquier cadena
aleatoria larga).

### 4. Cargar contenido de ejemplo (opcional pero recomendado)

```bash
npm run seed
```

Crea 6 prestadores, 4 experiencias, 3 eventos, 6 fichas, el estado del día y la
configuración, **todo con marcadores** `[COMO ESTE]`. Para reiniciarlo:
`npm run seed -- --reset`.

### 5. Levantar el sitio en local

```bash
npm run dev
```

- Sitio: <http://localhost:3000> (redirige a `/es`)
- Studio: <http://localhost:3000/studio>

---

## Scripts

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Compilación de producción |
| `npm run start` | Sirve la compilación de producción |
| `npm run typecheck` | Verifica los tipos de TypeScript |
| `npm run seed` | Carga datos de ejemplo (marcadores) |
| `npm run seed -- --reset` | Borra los datos de ejemplo y los vuelve a crear |

---

## Estructura del proyecto

```
src/
├── app/
│   ├── (site)/[lang]/     Sitio público por idioma (/es, /en)
│   ├── studio/            Sanity Studio embebido en /studio
│   └── api/               Webhook de revalidación, formulario, draft mode
├── sanity/
│   ├── schemaTypes/       Esquemas de contenido (en español)
│   ├── structure.ts       Secciones del Studio
│   └── lib/               Cliente, imágenes y consultas GROQ
├── components/            Componentes de interfaz
└── lib/                   Fuentes, i18n, utilidades, SEO
scripts/seed.ts            Datos semilla
```

## Despliegue en Vercel

1. Sube el repositorio a GitHub (o GitLab).
2. En [vercel.com](https://vercel.com) → **Add New… → Project** e importa el repo.
3. En **Environment Variables**, carga las mismas variables de `.env.local`
   (todas menos que aquí `NEXT_PUBLIC_SITE_URL` debe ser la URL de producción,
   por ejemplo `https://www.turismoantuco.cl`).
4. **Deploy**. Cada push a la rama principal vuelve a desplegar automáticamente.
5. En **Sanity → manage → API → CORS origins**, agrega la URL de producción
   (con credenciales) para que el Studio embebido funcione.

## Webhook de revalidación (estado del día en segundos)

Hace que el sitio (estático) se actualice a los pocos segundos de publicar en el
Studio, sin reconstruir todo.

1. Entra a [sanity.io/manage](https://www.sanity.io/manage) → tu proyecto →
   **API → Webhooks → Create webhook**.
2. Completa:
   - **Name:** `Revalidación del sitio`
   - **URL:** `https://TU-DOMINIO/api/revalidate`
   - **Trigger on:** Create, Update, Delete
   - **Filter:** `_type in ["estado","prestador","experiencia","evento","ficha","configuracion"]`
   - **Projection:** `{ _type }`
   - **HTTP method:** `POST`
   - **Secret:** el mismo valor de `SANITY_REVALIDATE_SECRET`
3. Guarda. Al publicar cualquier documento, Sanity firma la petición y el sitio
   revalida solo las páginas de ese tipo.

## Vista previa de borradores (Presentation)

- En el Studio (`/studio`), la herramienta **Presentation** muestra el sitio con
  los cambios **sin publicar**, para revisar antes de publicar.
- Usa el token de lectura (`SANITY_API_READ_TOKEN`) y las rutas
  `/api/draft-mode/enable` y `/api/draft-mode/disable`.

## Formulario "Publica tu servicio"

- Página: `/{es|en}/directorio/publicar`.
- Envía a `POST /api/publica-servicio`, que valida los datos y crea un
  **prestador en borrador** con el token de escritura (solo en el servidor).
- Protección anti-spam: campo trampa (honeypot) + límite de frecuencia por IP.
- El borrador aparece en el Studio para revisión antes de publicarse (ver
  `MANUAL_EDICION.md`, sección 6).

## SEO y analítica

- Metadatos y Open Graph por página (`generateMetadata`), `sitemap.xml` y
  `robots.txt` dinámicos, y datos estructurados JSON-LD (schema.org).
- Analítica sin cookies con **Vercel Analytics** y **Speed Insights** (se activan
  solos al desplegar en Vercel; no requieren banner de cookies).

## Pronóstico del tiempo

- Usa **Open-Meteo** (gratuito, sin API key). No requiere configuración.

---

## Notas de mantención

- **Idiomas:** el español es el idioma principal. El inglés puede quedar
  incompleto; si una página no tiene traducción, el sitio muestra el contenido
  en español como respaldo.
- **Slugs de fichas:** una vez impresos los códigos QR, **no cambies** la
  dirección (slug) de una ficha; el Studio la bloquea para evitarlo.
- **Nunca** subas `.env.local` al repositorio (ya está en `.gitignore`).
