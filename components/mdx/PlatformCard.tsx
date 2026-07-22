"use client";

import { Children, isValidElement, type CSSProperties, type ReactElement, type ReactNode } from "react";
import { X } from "lucide-react";
import { PlatformIcon, getPlatformEntry } from "@/components/icons/PlatformIcon";
import {
  PlatformFilterProvider,
  matchesFilters,
  splitTags,
  usePlatformFilters,
  type PlatformCardFields,
  type PlatformFieldKey,
} from "@/components/mdx/PlatformFilterContext";

type PlatformCardProps = PlatformCardFields & {
  slug: string;
  name: string;
};

function PlatformField({
  field,
  label,
  value,
}: {
  field: PlatformFieldKey;
  label: string;
  value: string;
}) {
  const { isActive, toggleFilter } = usePlatformFilters();
  const tags = splitTags(value);
  if (tags.length === 0) return null;

  return (
    <div className="platform-field">
      <span className="platform-field-label">{label}</span>
      <div className="platform-field-tags">
        {tags.map((tag) => {
          const active = isActive(field, tag);
          return (
            <button
              key={tag}
              type="button"
              className={`tag ${active ? "active" : ""}`}
              aria-pressed={active}
              onClick={() => toggleFilter(field, tag)}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function PlatformCard({ slug, name, trigger, catalog, tracking }: PlatformCardProps) {
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
      <PlatformField field="trigger" label="Disparo do provador" value={trigger} />
      <PlatformField field="catalog" label="Integração do catálogo" value={catalog} />
      <PlatformField field="tracking" label="Order tracking" value={tracking} />
    </div>
  );
}

function hasPlatformCardShape(node: ReactNode): node is ReactElement<PlatformCardProps> {
  if (!isValidElement(node)) return false;
  const props = node.props as Partial<PlatformCardProps> | null;
  return (
    !!props &&
    typeof props.slug === "string" &&
    typeof props.trigger === "string" &&
    typeof props.catalog === "string" &&
    typeof props.tracking === "string"
  );
}

function PlatformFilterBar({ total, visible }: { total: number; visible: number }) {
  const { filters, toggleFilter, clearFilters } = usePlatformFilters();

  if (filters.length === 0) {
    return <p className="platform-filter-hint">Clique em uma tag para filtrar as plataformas por ela.</p>;
  }

  return (
    <div className="platform-filter-bar">
      <div className="platform-filter-chips">
        {filters.map((filter) => (
          <button
            key={`${filter.field}-${filter.value}`}
            type="button"
            className="platform-filter-chip"
            onClick={() => toggleFilter(filter.field, filter.value)}
          >
            {filter.value}
            <X size={12} />
          </button>
        ))}
      </div>
      <div className="platform-filter-meta">
        <span>
          {visible} de {total} plataformas
        </span>
        <button type="button" className="platform-filter-clear" onClick={clearFilters}>
          Limpar filtros
        </button>
      </div>
    </div>
  );
}

function PlatformGridInner({ children }: { children: ReactNode }) {
  const { filters } = usePlatformFilters();
  const items = Children.toArray(children).filter(hasPlatformCardShape);
  const visible = items.filter((item) => matchesFilters(item.props, filters));

  return (
    <>
      <PlatformFilterBar total={items.length} visible={visible.length} />
      {visible.length > 0 ? (
        <div className="platform-grid">{visible}</div>
      ) : (
        <p className="platform-filter-empty">Nenhuma plataforma corresponde aos filtros selecionados.</p>
      )}
    </>
  );
}

export function PlatformGrid({ children }: { children: ReactNode }) {
  return (
    <PlatformFilterProvider>
      <PlatformGridInner>{children}</PlatformGridInner>
    </PlatformFilterProvider>
  );
}
