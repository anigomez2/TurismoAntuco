/**
 * Silueta de cordillera en capas planas (sin degradados), tonos fríos de brisa.
 * Decorativa: da el "aire de montaña" al pie de las secciones hero.
 * Insinúa el cono del volcán Antuco a la derecha.
 */
export function MountainSilhouette({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 260"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      {/* Cordillera de fondo (más clara) */}
      <path
        fill="#CFE1E7"
        d="M0 200 L160 120 L300 175 L470 90 L640 160 L820 70 L1010 150 L1180 95 L1320 160 L1440 120 L1440 260 L0 260 Z"
      />
      {/* Cono del volcán Antuco + Sierra Velluda (capa media) */}
      <path
        fill="#B4D0D8"
        d="M0 240 L200 190 L430 235 L760 150 L920 210
           L1080 235 L1150 205
           L1245 120 L1340 205
           L1440 185 L1440 260 L0 260 Z"
      />
      {/* Casquete nevado del cono */}
      <path fill="#EAF2F4" d="M1213 152 L1245 120 L1277 152 L1258 148 L1245 138 L1232 148 Z" />
      {/* Cordillera frontal (más saturada) */}
      <path
        fill="#8FB6C0"
        d="M0 260 L0 235 L230 210 L520 245 L780 205 L1040 245 L1300 215 L1440 240 L1440 260 Z"
      />
    </svg>
  );
}
