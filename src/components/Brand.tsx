export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`brand ${compact ? "brand--compact" : ""}`} aria-label="SenaFit">
      <div className="brand__mark" aria-hidden="true">
        <span className="brand__head" />
        <span className="brand__arms" />
        <span className="brand__body" />
      </div>
      <div className="brand__text">
        <strong>
          Sena<span>Fit</span>
        </strong>
        {!compact && <small>Bienestar al aprendiz</small>}
      </div>
    </div>
  );
}
