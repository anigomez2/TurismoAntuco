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
    heroTextoEs: `El volcán Antuco (2.979 m) es un estratovolcán de composición basáltica y andesítico-basáltica, cuya actividad comenzó hace unos 130.000 años, a fines del Pleistoceno. Es uno de los volcanes más jóvenes y activos del sur de Chile.

Hace aproximadamente 9.700 años, un gran colapso de su flanco generó una avalancha que bajó decenas de kilómetros por el valle del río Laja y represó su desagüe: así nació la Laguna del Laja. Ese pasado explica el paisaje que vemos hoy, con el cono casi perfecto del Antuco junto a la laguna y los campos de lava negra.`,
    heroTextoEn: `Antuco volcano (2,979 m) is a stratovolcano of basaltic and basaltic-andesitic composition whose activity began about 130,000 years ago, in the late Pleistocene. It is one of the youngest and most active volcanoes in southern Chile.

About 9,700 years ago, a great collapse of its flank generated an avalanche that ran tens of kilometres down the Laja river valley and dammed its outlet: this is how Laguna del Laja was formed. That past explains the landscape we see today, with the almost perfect cone of Antuco beside the lagoon and the fields of black lava.`,
    heroContenidoEs: `El volcán Antuco, de 2.979 metros de altura, es un estratovolcán mixto de composición fundamentalmente basáltica y andesítico-basáltica. Es uno de los volcanes más jóvenes y activos del sur de Chile, y su historia geológica explica buena parte del paisaje que hoy protege el Parque Nacional Laguna del Laja.

El escenario previo: la Sierra Velluda. Antes de que existiera el Antuco, la zona ya estaba dominada por la Sierra Velluda, un estratovolcán mucho más antiguo (Pleistoceno medio, hace entre 600.000 y 300.000 años) ubicado al oeste de la actual laguna. Se estima que la Sierra Velluda llegó a embalsar el valle superior del Laja, dando lugar a un primitivo lago que después desapareció por la erosión de los glaciares. En efecto, todo el valle fue modelado por la acción glaciar del Pleistoceno antes de que la actividad volcánica pasara a dominar el paisaje.

Los dos Antucos. La actividad del volcán Antuco comenzó hace unos 130.000 años, a fines del Pleistoceno superior. Su historia tiene dos grandes edificios. El primero, llamado volcán Laja o «el gran cono» (Antuco 1), fue un cono de más de 2.000 metros y unos 12 kilómetros de diámetro basal, construido sobre rocas estratificadas del Mioceno y sobre los materiales de la vecina Sierra Velluda.

El gran colapso y el nacimiento de la Laguna del Laja. Hace aproximadamente 9.700 años (± 600), una erupción freatomagmática de tipo Bandai-San provocó el colapso gravitacional del flanco de Antuco 1. Se desprendió una voluminosa avalancha de escombros que descendió al menos 40 kilómetros por el valle del río Laja y represó su desagüe natural. Con el cauce bloqueado, el agua se acumuló y el nivel del lago llegó a subir cerca de 100 metros sobre la cota actual: así se formó la Laguna del Laja, embalsada por el propio volcán.

El Antuco de hoy. Sobre el anfiteatro que dejó ese colapso creció un segundo edificio, Antuco 2: el cono central casi perfecto que vemos hoy, acompañado de algunos centros de emisión adventicios en sus faldas. Es el cono negro y simétrico que domina la postal del parque.

Un volcán todavía activo. En tiempos históricos, el Antuco ha registrado al menos diecisiete erupciones entre 1739 y 1911, con una frecuencia cercana a una cada diez años. Entre los episodios más recordados están las coladas de lava en su flanco norte (1752), la gran erupción de 1828-1829 —que atrajo a naturalistas y en cuyo contexto el científico Eduardo Poeppig realizó en 1829 el primer ascenso, considerado el inicio del andinismo chileno— y las erupciones del cráter central y del centro Los Pangues (1852-1853). En la actualidad, el volcán solo presenta una débil actividad fumarólica y es vigilado por la Red Nacional de Vigilancia Volcánica del Sernageomin.

Hielo y paisaje. Las alturas de la Sierra Velluda y del macizo conservan glaciares, hoy en marcada retracción. La suma de todo —el volcanismo, los glaciares y el represamiento del río— dio origen al paisaje singular del Parque Nacional Laguna del Laja: el cono del Antuco, la laguna de aguas turquesas retenida por lava, los extensos campos de escoria negra y el bosque de araucarias.

Fuentes: Red Nacional de Vigilancia Volcánica, Sernageomin; Wikipedia (Volcán Antuco); «Evolución geológico-geomorfológica cuaternaria del tramo superior del valle del río Laja», SciELO Chile; Andeshandbook.`,
    heroContenidoEn: `Antuco volcano, 2,979 metres high, is a mixed stratovolcano of mainly basaltic and basaltic-andesitic composition. It is one of the youngest and most active volcanoes in southern Chile, and its geological history explains much of the landscape now protected by Laguna del Laja National Park.

The earlier stage: Sierra Velluda. Before Antuco existed, the area was already dominated by Sierra Velluda, a much older stratovolcano (Middle Pleistocene, between 600,000 and 300,000 years ago) located west of the present lagoon. Sierra Velluda is thought to have dammed the upper Laja valley, giving rise to a primitive lake that later disappeared through glacial erosion. Indeed, the whole valley was shaped by Pleistocene glaciation before volcanic activity came to dominate the landscape.

The two Antucos. Antuco's activity began about 130,000 years ago, in the late Upper Pleistocene. Its history has two great edifices. The first, called the Laja volcano or "the great cone" (Antuco 1), was a cone over 2,000 metres high and about 12 kilometres in basal diameter, built on stratified Miocene rocks and on materials from neighbouring Sierra Velluda.

The great collapse and the birth of Laguna del Laja. About 9,700 years ago (± 600), a phreatomagmatic eruption of the Bandai-San type caused the gravitational collapse of Antuco 1's flank. A voluminous debris avalanche broke off and ran at least 40 kilometres down the Laja river valley, damming its natural outlet. With the channel blocked, water accumulated and the lake rose about 100 metres above its current level: this is how Laguna del Laja was formed, dammed by the volcano itself.

Antuco today. Over the amphitheatre left by that collapse, a second edifice grew, Antuco 2: the almost perfect central cone we see today, accompanied by a few adventitious vents on its slopes. It is the black, symmetrical cone that dominates the postcard of the park.

A still-active volcano. In historical times, Antuco has recorded at least seventeen eruptions between 1739 and 1911, at a frequency of roughly one every ten years. Among the most remembered episodes are the lava flows on its northern flank (1752), the great eruption of 1828-1829 —which attracted naturalists and during which the scientist Eduard Poeppig made the first ascent in 1829, considered the start of Chilean mountaineering— and the eruptions of the central crater and the Los Pangues vent (1852-1853). Today the volcano shows only weak fumarolic activity and is monitored by Sernageomin's National Volcanic Surveillance Network.

Ice and landscape. The heights of Sierra Velluda and the massif hold glaciers, now in marked retreat. The sum of it all —volcanism, glaciers and the damming of the river— gave rise to the singular landscape of Laguna del Laja National Park: the cone of Antuco, the turquoise lagoon held back by lava, the vast fields of black scoria and the araucaria forest.

Sources: National Volcanic Surveillance Network, Sernageomin; Wikipedia (Volcán Antuco); "Quaternary geological-geomorphological evolution of the upper Laja river valley", SciELO Chile; Andeshandbook.`,
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
