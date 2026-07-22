"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export type PlatformFieldKey = "trigger" | "catalog" | "tracking";

export type PlatformFilter = {
  field: PlatformFieldKey;
  value: string;
};

export type PlatformCardFields = {
  trigger: string;
  catalog: string;
  tracking: string;
};

export function splitTags(value: string): string[] {
  return value
    .split("|")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function matchesFilters(fields: PlatformCardFields, filters: PlatformFilter[]): boolean {
  return filters.every((filter) => splitTags(fields[filter.field]).includes(filter.value));
}

type PlatformFilterContextValue = {
  filters: PlatformFilter[];
  isActive: (field: PlatformFieldKey, value: string) => boolean;
  toggleFilter: (field: PlatformFieldKey, value: string) => void;
  clearFilters: () => void;
};

const PlatformFilterContext = createContext<PlatformFilterContextValue | null>(null);

export function usePlatformFilters() {
  const context = useContext(PlatformFilterContext);
  if (!context) {
    throw new Error("usePlatformFilters deve ser usado dentro de PlatformFilterProvider");
  }
  return context;
}

function sameFilter(a: PlatformFilter, b: PlatformFilter): boolean {
  return a.field === b.field && a.value === b.value;
}

export function PlatformFilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<PlatformFilter[]>([]);

  const toggleFilter = useCallback((field: PlatformFieldKey, value: string) => {
    setFilters((prev) => {
      const next = { field, value };
      const exists = prev.some((filter) => sameFilter(filter, next));
      return exists ? prev.filter((filter) => !sameFilter(filter, next)) : [...prev, next];
    });
  }, []);

  const clearFilters = useCallback(() => setFilters([]), []);

  const isActive = useCallback(
    (field: PlatformFieldKey, value: string) =>
      filters.some((filter) => filter.field === field && filter.value === value),
    [filters]
  );

  const value = useMemo(
    () => ({ filters, isActive, toggleFilter, clearFilters }),
    [filters, isActive, toggleFilter, clearFilters]
  );

  return <PlatformFilterContext.Provider value={value}>{children}</PlatformFilterContext.Provider>;
}
