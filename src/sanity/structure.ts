import type { StructureResolver } from "sanity/structure";

/**
 * Estructura del Studio: secciones claras para editores no técnicos.
 * Orden pensado para el uso diario: "Estado del día" arriba de todo.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenido")
    .items([
      // 1) Estado del día — singleton, lo primero y más usado
      S.listItem()
        .title("⛰ Estado del día")
        .id("estado")
        .child(
          S.document().schemaType("estado").documentId("estado").title("Estado del día")
        ),

      S.divider(),

      // 2) Experiencias
      S.documentTypeListItem("experiencia").title("Experiencias"),

      // 3) Directorio — agrupado por tipo
      S.listItem()
        .title("Directorio")
        .id("directorio")
        .child(
          S.list()
            .title("Directorio")
            .items([
              S.listItem()
                .title("Alojamiento")
                .id("dir-alojamiento")
                .child(
                  S.documentList()
                    .title("Alojamiento")
                    .filter('_type == "prestador" && tipo == "alojamiento"')
                    .apiVersion("2024-10-01")
                ),
              S.listItem()
                .title("Dónde comer")
                .id("dir-comida")
                .child(
                  S.documentList()
                    .title("Dónde comer")
                    .filter('_type == "prestador" && tipo == "comida"')
                    .apiVersion("2024-10-01")
                ),
              S.listItem()
                .title("Guías y operadores")
                .id("dir-guia")
                .child(
                  S.documentList()
                    .title("Guías y operadores")
                    .filter('_type == "prestador" && tipo == "guia"')
                    .apiVersion("2024-10-01")
                ),
              S.divider(),
              S.documentTypeListItem("prestador").title("Todos los prestadores"),
            ])
        ),

      // 4) Agenda
      S.documentTypeListItem("evento").title("Agenda de eventos"),

      // 5) Fichas de la guía
      S.documentTypeListItem("ficha").title("Fichas de la guía"),

      S.divider(),

      // 6) Configuración — singleton
      S.listItem()
        .title("⚙ Configuración")
        .id("configuracion")
        .child(
          S.document()
            .schemaType("configuracion")
            .documentId("configuracion")
            .title("Configuración del sitio")
        ),
    ]);
