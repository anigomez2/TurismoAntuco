import type { Idioma } from "@/lib/i18n";
import { getDiccionario } from "@/lib/dictionaries";

/** Construye las rutas del sitio para un idioma dado. */
export function rutas(lang: Idioma) {
  const b = `/${lang}`;
  return {
    inicio: b,
    planifica: `${b}/planifica`,
    directorio: `${b}/directorio`,
    experiencias: `${b}/experiencias`,
    agenda: `${b}/agenda`,
    explorando: `${b}/explorando`,
    historia: `${b}/historia`,
    contacto: `${b}/contacto`,
  };
}

/** Enlaces del menú principal en orden. */
export function enlacesNav(lang: Idioma) {
  const r = rutas(lang);
  const t = getDiccionario(lang).nav;
  return [
    { href: r.planifica, label: t.planifica },
    { href: r.experiencias, label: t.experiencias },
    { href: r.directorio, label: t.directorio },
    { href: r.explorando, label: t.explorando },
    { href: r.agenda, label: t.agenda },
    { href: r.historia, label: t.historia },
    { href: r.contacto, label: t.contacto },
  ];
}
