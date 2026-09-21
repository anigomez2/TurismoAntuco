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

## Despliegue y webhook

Se documentan en la **Etapa 4** (Vercel + webhook de revalidación de Sanity).
Resumen: importar el repo en Vercel, cargar las mismas variables de entorno, y
crear en Sanity un webhook `GROQ-powered` que apunte a `/api/revalidate`
firmado con `SANITY_REVALIDATE_SECRET`.

---

_Este README se completa a medida que avanzan las etapas del proyecto._
