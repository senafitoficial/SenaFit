import type { ReactNode } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

export function PageIntro({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="page-intro">
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {action}
    </div>
  );
}

export function SearchField({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="search-field">
      <Search size={18} />
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </label>
  );
}

export function FilterButton({ label = "Filtros" }: { label?: string }) {
  return (
    <button className="button button--secondary">
      <SlidersHorizontal size={17} />
      {label}
    </button>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const slug = status.toLowerCase().replace(" ", "-");
  return (
    <span className={`status status--${slug}`}>
      <i />
      {status}
    </span>
  );
}
