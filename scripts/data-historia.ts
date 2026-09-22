import { randomUUID } from "node:crypto";

/**
 * Contenido de "Historia y patrimonio", investigado en fuentes públicas
 * (ver la línea "Fuentes" al final de cada tema). Es el punto de partida
 * editable desde el Studio; se puede corregir o ampliar en cualquier momento.
 */
export function historiaDoc() {
  const seccion = (s: {
    tituloEs: string;
    tituloEn: string;
    slug: string;
    resumenEs: string;
    resumenEn: string;
    contenidoEs: string;
    contenidoEn: string;
  }) => ({
    _key: randomUUID(),
    _type: "seccion",
    tituloEs: s.tituloEs,
    tituloEn: s.tituloEn,
    slug: { _type: "slug", current: s.slug },
    resumenEs: s.resumenEs,
    resumenEn: s.resumenEn,
    contenidoEs: s.contenidoEs,
    contenidoEn: s.contenidoEn,
  });

  return {
    _id: "historia",
    _type: "historia",
    heroTituloEs: "La historia geológica de Antuco",
    heroTituloEn: "The geological history of Antuco",
    heroTextoEs: `El volcán Antuco es un estratovolcán de composición basáltica y andesítico-basáltica, cuya actividad comenzó hace unos 130.000 años, a fines del Pleistoceno. Se construyó sobre rocas estratificadas del Mioceno y sobre los materiales de su vecina, la Sierra Velluda, un macizo mucho más antiguo y glaciado.

Su historia tiene dos grandes edificios: un primer cono —conocido como volcán Laja o «el gran cono»— y un cono central más joven, anidado en su interior. Hace aproximadamente 6.200 años, ese primer edificio sufrió un enorme colapso lateral que liberó cerca de 5 km³ de material. La avalancha rellenó el valle del río Laja y lo represó: así nació la Laguna del Laja.

Desde entonces, el volcán reconstruyó su cono actual sobre la antigua estructura y ha registrado erupciones en los últimos siglos. Ese pasado explica el paisaje que vemos hoy: el cono casi perfecto del Antuco, la laguna de aguas cristalinas y los extensos campos de lava negra que la rodean.`,
    heroTextoEn: `Antuco is a stratovolcano of basaltic and basaltic-andesitic composition whose activity began about 130,000 years ago, in the late Pleistocene. It was built on stratified Miocene rocks and on materials from its neighbour, the Sierra Velluda, a much older, glaciated massif.

Its history has two great edifices: a first cone —known as the Laja volcano or "the great cone"— and a younger central cone nested inside it. About 6,200 years ago, that first edifice suffered an enormous lateral collapse that released some 5 km³ of material. The avalanche filled the valley of the Laja river and dammed it: this is how Laguna del Laja was formed.

Since then, the volcano rebuilt its present cone over the old structure and has recorded eruptions in recent centuries. That past explains the landscape we see today: the almost perfect cone of Antuco, the crystal-clear lagoon and the vast fields of black lava that surround it.`,
    secciones: [
      seccion({
        tituloEs: "Las villas hidroeléctricas (Abanico)",
        tituloEn: "The hydroelectric villages (Abanico)",
        slug: "villas-hidroelectricas",
        resumenEs:
          "La central El Abanico, inaugurada en 1948, trajo la electricidad y a cientos de familias a la montaña. Sus campamentos dieron forma a la comuna alta.",
        resumenEn:
          "The El Abanico power plant, opened in 1948, brought electricity and hundreds of families to the mountains. Its camps shaped the upper commune.",
        contenidoEs: `El 14 de mayo de 1948, el presidente Gabriel González Videla inauguró la Central Hidroeléctrica Abanico, sobre el río Laja, en el sector cordillerano de Antuco.

Fue una de las tres primeras centrales construidas por Endesa —junto a Pilmaiquén y Sauzal— dentro del Plan Nacional de Electrificación impulsado por la Corfo desde 1939. Aprovecha las aguas de la Laguna del Laja a través del túnel de desagüe del río Laja y de los esteros Los Cipreses y Trubunleo.

Para construir y operar la central se levantaron campamentos y villas para los trabajadores y sus familias, con casas, escuela y servicios. Esas villas hidroeléctricas marcaron la identidad de la comuna alta, y buena parte de su patrimonio construido aún se conserva junto al río Laja.

Con los años se sumaron otras centrales del complejo Laja, como El Toro y Antuco, consolidando a la zona como un polo hidroeléctrico de gran valor histórico para el país.

Fuentes: BiblioRedes (Central Hidroeléctrica Abanico); Enel Chile; Memoria Chilena, Biblioteca Nacional de Chile.`,
        contenidoEn: `On 14 May 1948, President Gabriel González Videla inaugurated the Abanico Hydroelectric Plant, on the Laja river, in the mountain sector of Antuco.

It was one of the first three plants built by Endesa —together with Pilmaiquén and Sauzal— within the National Electrification Plan promoted by Corfo from 1939. It uses the waters of Laguna del Laja through the Laja river drainage tunnel and the Los Cipreses and Trubunleo streams.

To build and operate the plant, camps and villages were raised for the workers and their families, with houses, a school and services. These hydroelectric villages shaped the identity of the upper commune, and much of their built heritage still stands by the Laja river.

Over the years, other plants of the Laja complex were added, such as El Toro and Antuco, consolidating the area as a hydroelectric hub of great historical value for the country.

Sources: BiblioRedes (Abanico Hydroelectric Plant); Enel Chile; Memoria Chilena, National Library of Chile.`,
      }),
      seccion({
        tituloEs: "Arrieros y la ruta pehuenche",
        tituloEn: "Muleteers and the Pehuenche route",
        slug: "arrieros-ruta-pehuenche",
        resumenEs:
          "Mucho antes de los caminos, los pehuenches cruzaban la cordillera por el Boquete de Antuco. Ese paso —hoy Pichachén— fue durante siglos ruta de intercambio y arriería.",
        resumenEn:
          "Long before the roads, the Pehuenche crossed the range through the Boquete de Antuco. That pass —today Pichachén— was for centuries a route of trade and droving.",
        contenidoEs: `El territorio de Antuco fue ancestralmente usado por los pehuenches como tierra de pastoreo, cruzando los Andes hacia el lado argentino, en Neuquén, por el llamado Boquete de Antuco, hoy Paso Internacional Pichachén.

Desde tiempos inmemoriales, el paso funcionó como punto de intercambio entre ambos lados de la cordillera: se comerciaba principalmente sal por cueros y trabajos de cuero, y más tarde ganado.

En 1778, Ambrosio O'Higgins propuso abrir un camino carretero por el Boquete de Antuco, pero el proyecto no prosperó por la resistencia de los grupos mapuches independientes de la pampa.

La vocación de paso siguió viva: a comienzos del siglo XX se proyectó incluso un ferrocarril trasandino, el ramal Monte Águila–Polcura, cuya construcción se suspendió en 1906. El paso fue reabierto al tránsito recién a fines de la década de 1990.

Esa herencia de arrieros y caminos de montaña sigue presente en las cabalgatas y los guías locales que hoy recorren la cordillera.

Fuentes: Wikipedia (Paso Pichachén); Municipalidad de Antuco; SciELO Chile.`,
        contenidoEn: `The territory of Antuco was ancestrally used by the Pehuenche as grazing land, crossing the Andes towards the Argentine side, in Neuquén, through the so-called Boquete de Antuco, today the Pichachén International Pass.

Since time immemorial, the pass worked as a point of exchange between both sides of the range: mainly salt was traded for hides and leatherwork, and later cattle.

In 1778, Ambrosio O'Higgins proposed opening a cart road through the Boquete de Antuco, but the project did not prosper because of the resistance of the independent Mapuche groups of the pampas.

Its calling as a pass lived on: in the early 20th century a trans-Andean railway was even projected, the Monte Águila–Polcura branch, whose construction was suspended in 1906. The pass was only reopened to traffic in the late 1990s.

That heritage of muleteers and mountain trails is still present in the horseback rides and local guides who cross the range today.

Sources: Wikipedia (Paso Pichachén); Municipality of Antuco; SciELO Chile.`,
      }),
      seccion({
        tituloEs: "Los orígenes del pueblo de Antuco",
        tituloEn: "The origins of the town of Antuco",
        slug: "origenes-de-antuco",
        resumenEs:
          "Su nombre viene del mapudungun «antü» (sol) y «ko» (agua): «agua del sol». El poblado nació entre haciendas ganaderas y parlamentos coloniales.",
        resumenEn:
          "Its name comes from the Mapudungun words «antü» (sun) and «ko» (water): «water of the sun». The town grew between cattle estates and colonial parliaments.",
        contenidoEs: `El nombre Antuco proviene del mapudungun antü (sol) y ko (agua): «agua del sol».

En 1689, estas tierras fueron entregadas a José Núñez de la Cantera, un español avecindado en Concepción, para la engorda de ganado. La hacienda se llamó La Cantera y, con el tiempo, el nombre se extendió a toda la zona.

En 1756, el Parlamento del río Laja —entre el gobernador Manuel de Amat y Junyent y líderes pehuenches y mapuches— acordó la creación de la Villa de Antuco y la apertura de misiones en el territorio.

Al momento de la independencia, el poblado formaba parte del antiguo Partido de Isla de La Laja, la franja de tierra comprendida entre los ríos Laja y Biobío.

Así, Antuco creció en el cruce de dos mundos: el de los pehuenches de la cordillera y el de las haciendas y villas del valle.

Fuentes: Wikipedia (Antuco); Municipalidad de Antuco.`,
        contenidoEn: `The name Antuco comes from the Mapudungun antü (sun) and ko (water): "water of the sun".

In 1689, these lands were granted to José Núñez de la Cantera, a Spaniard settled in Concepción, for cattle fattening. The estate was named La Cantera and, over time, the name spread to the whole area.

In 1756, the Parliament of the Laja river —between governor Manuel de Amat y Junyent and Pehuenche and Mapuche leaders— agreed to the creation of the Villa de Antuco and the opening of missions in the territory.

At the time of independence, the town was part of the old Partido de Isla de La Laja, the strip of land between the Laja and Biobío rivers.

Thus, Antuco grew at the crossroads of two worlds: that of the Pehuenche of the mountains and that of the estates and villages of the valley.

Sources: Wikipedia (Antuco); Municipality of Antuco.`,
      }),
      seccion({
        tituloEs: "El Fuerte Ballenar",
        tituloEn: "Fort Ballenar",
        slug: "fuerte-ballenar",
        resumenEs:
          "Levantado hacia 1787 por orden de Ambrosio O'Higgins, el fuerte custodiaba el paso cordillerano. Hoy es un patrimonio en estudio de la Universidad Católica.",
        resumenEn:
          "Built around 1787 by order of Ambrosio O'Higgins, the fort guarded the mountain pass. Today it is a heritage site studied by the Catholic University.",
        contenidoEs: `El Fuerte Ballenar se levantó hacia 1787, por orden de Ambrosio O'Higgins, entonces intendente de Concepción, como parte del sistema de defensa de la frontera del Biobío frente a las incursiones pehuenches que bajaban por el paso de Antuco.

Ubicado a unos 13 kilómetros de la Laguna del Laja, junto al río Laja, tenía planta hexagonal, un muro de contención de piedra sobre un montículo de unos 15 metros, un acceso en rampa para los caballos, una empalizada —hoy desaparecida—, un foso perpendicular con puente levadizo y un pozo de agua dulce. El foso, perpendicular al río, aislaba el recinto de posibles ataques de los grupos que descendían de la cordillera.

Hoy el fuerte está reducido a una plataforma y algunos muros. Es uno de los bienes patrimoniales más recientes adquiridos por la Pontificia Universidad Católica de Chile, que lo integró a un programa interdisciplinario de patrimonio cultural para su investigación y conservación.

Fuentes: Revista Diálogos UC (Fuerte Ballenar de Antuco); BioBioChile; La Tercera.`,
        contenidoEn: `Fort Ballenar was built around 1787, by order of Ambrosio O'Higgins, then intendant of Concepción, as part of the defensive system of the Biobío frontier against the Pehuenche raids that descended through the Antuco pass.

Located some 13 kilometres from Laguna del Laja, by the Laja river, it had a hexagonal plan, a stone retaining wall on a mound about 15 metres high, a ramped access for horses, a stockade —now gone—, a perpendicular ditch with a drawbridge and a freshwater well. The ditch, perpendicular to the river, isolated the enclosure from possible attacks by the groups coming down from the mountains.

Today the fort is reduced to a platform and some walls. It is one of the most recent heritage assets acquired by the Pontifical Catholic University of Chile, which added it to an interdisciplinary cultural-heritage programme for its research and conservation.

Sources: Revista Diálogos UC (Fuerte Ballenar de Antuco); BioBioChile; La Tercera.`,
      }),
    ],
  };
}
