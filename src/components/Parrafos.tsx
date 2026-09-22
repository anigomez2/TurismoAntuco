/** Renderiza texto plano en párrafos (separados por líneas en blanco). */
export function Parrafos({ texto, className = "" }: { texto?: string; className?: string }) {
  if (!texto) return null;
  const parrafos = texto.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  return (
    <div className={`space-y-4 leading-relaxed text-tinta ${className}`}>
      {parrafos.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}
