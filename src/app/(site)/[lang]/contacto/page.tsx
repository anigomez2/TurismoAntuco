import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { esIdiomaValido } from "@/lib/i18n";
import { getDiccionario } from "@/lib/dictionaries";
import { rutas } from "@/lib/navegacion";
import { sanityFetch, TAGS } from "@/sanity/lib/fetch";
import { configuracionQuery } from "@/sanity/lib/queries";
import type { Configuracion } from "@/sanity/lib/types";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { IconMapPin, IconCalendar, IconInstagram, IconFacebook } from "@/components/Icons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const en = lang === "en";
  return {
    title: en ? "Contact" : "Contacto",
    description: en
      ? "Antuco tourist information office: address, hours and contact."
      : "Oficina de información turística de Antuco: dirección, horario y contacto.",
  };
}

export default async function ContactoPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!esIdiomaValido(lang)) notFound();
  const d = getDiccionario(lang);
  const en = lang === "en";
  const cfg = await sanityFetch<Configuracion | null>({
    query: configuracionQuery,
    tags: [TAGS.configuracion],
  });

  return (
    <>
      <PageHeader
        migas={[{ label: d.nav.inicio, href: rutas(lang).inicio }, { label: d.nav.contacto }]}
        titulo={en ? "Contact" : "Contacto"}
        bajada={
          en
            ? "Tourist information office of the Antuco Tourism Chamber and Municipality."
            : "Oficina de información turística de la Cámara de Turismo y la Municipalidad de Antuco."
        }
      />

      <Container as="section" className="pb-16">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Datos */}
          <div className="rounded-tarjeta border border-tinta/10 bg-white p-6">
            <h2 className="text-xl">{d.footer.oficina}</h2>
            <ul className="mt-4 space-y-3 text-tinta">
              {cfg?.direccionOficina && (
                <li className="flex items-start gap-2">
                  <IconMapPin size={18} className="mt-0.5 shrink-0 text-glaciar" />
                  {cfg.direccionOficina}
                </li>
              )}
              {cfg?.horarioOficina && (
                <li className="flex items-start gap-2">
                  <IconCalendar size={18} className="mt-0.5 shrink-0 text-glaciar" />
                  <span>
                    <span className="text-secundario">{d.footer.horario}: </span>
                    {cfg.horarioOficina}
                  </span>
                </li>
              )}
              {cfg?.telefono && (
                <li>
                  <a href={`tel:${cfg.telefono}`}>{cfg.telefono}</a>
                </li>
              )}
              {cfg?.email && (
                <li>
                  <a href={`mailto:${cfg.email}`}>{cfg.email}</a>
                </li>
              )}
            </ul>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <WhatsAppButton
                numero={cfg?.whatsapp}
                variante="whatsapp"
                etiqueta={d.comun.whatsapp}
                mensaje={
                  en
                    ? "Hi, I have a question about visiting Antuco."
                    : "Hola, tengo una consulta sobre visitar Antuco."
                }
              />
              {cfg?.instagram && (
                <a href={cfg.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-secundario hover:text-tinta">
                  <IconInstagram />
                </a>
              )}
              {cfg?.facebook && (
                <a href={cfg.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-secundario hover:text-tinta">
                  <IconFacebook />
                </a>
              )}
            </div>
          </div>

          {/* Cómo llegar a la oficina / nota */}
          <div className="rounded-tarjeta border border-tinta/10 bg-white p-6">
            <h2 className="text-xl">{en ? "Getting to Antuco" : "Cómo llegar a Antuco"}</h2>
            <p className="mt-3 text-secundario">
              {en
                ? "Antuco is 65 km from Los Ángeles on Route Q-45. See the full route, transport and park status on the Plan your visit page."
                : "Antuco está a 65 km de Los Ángeles por la Ruta Q-45. Revisa la ruta completa, el transporte y el estado del parque en la página Planifica tu visita."}
            </p>
            <p className="mt-4">
              <a href={rutas(lang).planifica} className="font-titulo text-sm font-semibold text-glaciar">
                {d.nav.planifica} →
              </a>
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}
