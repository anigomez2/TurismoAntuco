import { type SchemaTypeDefinition } from "sanity";

import { fotoConAlt } from "./objetos/fotoConAlt";
import { estado } from "./documentos/estado";
import { configuracion } from "./documentos/configuracion";
import { experiencia } from "./documentos/experiencia";
import { prestador } from "./documentos/prestador";
import { evento } from "./documentos/evento";
import { ficha } from "./documentos/ficha";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // objetos reutilizables
    fotoConAlt,
    // documentos
    estado,
    experiencia,
    prestador,
    evento,
    ficha,
    configuracion,
  ],
};

/** Tipos que son singletons (documento único, no se crean ni borran). */
export const SINGLETONS = ["estado", "configuracion"] as const;
