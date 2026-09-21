import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { esIdiomaValido } from "@/lib/i18n";
import { getDiccionario } from "@/lib/dictionaries";
import { rutas } from "@/lib/navegacion";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { FormularioPublicar } from "@/components/FormularioPublicar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const en = lang === "en";
  return {
    title: en ? "Publish my service" : "Publicar mi servicio",
    description: en
      ? "Register your lodging, restaurant or guided tour in the Antuco directory."
      : "Registra tu alojamiento, restaurante o salida guiada en el directorio de Antuco.",
    robots: { index: false },
  };
}

export default async function PublicarPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!esIdiomaValido(lang)) notFound();
  const d = getDiccionario(lang);
  const en = lang === "en";

  return (
    <>
      <PageHeader
        migas={[
          { label: d.nav.inicio, href: rutas(lang).inicio },
          { label: en ? "Directory" : "Directorio", href: rutas(lang).directorio },
          { label: en ? "Publish my service" : "Publicar mi servicio" },
        ]}
        titulo={en ? "Publish my service" : "Publicar mi servicio"}
        bajada={
          en
            ? "Fill in the form and the Tourism Chamber will review your service before publishing it — free of charge."
            : "Completa el formulario y la Cámara de Turismo revisará tu servicio antes de publicarlo — sin costo."
        }
      />
      <Container as="section" className="pb-16">
        <FormularioPublicar lang={lang} />
      </Container>
    </>
  );
}
