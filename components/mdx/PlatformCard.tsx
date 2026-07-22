import type { CSSProperties, ReactNode } from "react";
import { PlatformIcon, getPlatformEntry } from "@/components/icons/PlatformIcon";

function splitTags(value: string): string[] {
  return value
    .split("|")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function PlatformField({ label, value }: { label: string; value: string }) {
  const tags = splitTags(value);
  if (tags.length === 0) return null;

  return (
    <div className="platform-field">
      <span className="platform-field-label">{label}</span>
      <div className="platform-field-tags">
        {tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export function PlatformCard({
  slug,
  name,
  trigger,
  catalog,
  tracking,
}: {
  slug: string;
  name: string;
  trigger: string;
  catalog: string;
  tracking: string;
}) {
  const entry = getPlatformEntry(slug);
  const style = { "--platform-color": entry.color } as CSSProperties;

  return (
    <div className="platform-card" style={style}>
      <div className="platform-card-header">
        <span className="platform-card-icon">
          <PlatformIcon name={slug} size={24} />
        </span>
        <h3>{name}</h3>
      </div>
      <PlatformField label="Disparo do provador" value={trigger} />
      <PlatformField label="Integração do catálogo" value={catalog} />
      <PlatformField label="Order tracking" value={tracking} />
    </div>
  );
}

export function PlatformGrid({ children }: { children: ReactNode }) {
  return <div className="platform-grid">{children}</div>;
}
