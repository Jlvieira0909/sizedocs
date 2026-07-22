"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import type { DocMeta } from "@/lib/docs";

type CommandPaletteContextValue = {
  openPalette: () => void;
};

const CommandPaletteContext = createContext<CommandPaletteContextValue | null>(null);

export function useCommandPalette() {
  const context = useContext(CommandPaletteContext);
  if (!context) {
    throw new Error("useCommandPalette deve ser usado dentro de CommandPaletteProvider");
  }
  return context;
}

function scoreMatch(doc: DocMeta, query: string): number | null {
  const title = doc.title.toLowerCase();
  const haystack = `${doc.title} ${doc.description} ${doc.category}`.toLowerCase();
  if (!haystack.includes(query)) return null;
  if (title.startsWith(query)) return 0;
  if (title.includes(query)) return 1;
  return 2;
}

function useFilteredDocs(docs: DocMeta[], query: string): DocMeta[] {
  return useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return docs;
    return docs
      .map((doc) => ({ doc, score: scoreMatch(doc, q) }))
      .filter((entry): entry is { doc: DocMeta; score: number } => entry.score !== null)
      .sort((a, b) => a.score - b.score)
      .map((entry) => entry.doc);
  }, [docs, query]);
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function CommandPaletteModal({
  docs,
  query,
  onQueryChange,
  onClose,
}: {
  docs: DocMeta[];
  query: string;
  onQueryChange: (value: string) => void;
  onClose: () => void;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useFilteredDocs(docs, query);
  const [activeIndex, setActiveIndex] = useState(0);
  const [trackedQuery, setTrackedQuery] = useState(query);

  if (query !== trackedQuery) {
    setTrackedQuery(query);
    setActiveIndex(0);
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const navigateTo = useCallback(
    (doc: DocMeta) => {
      router.push(`/docs/${doc.slug}`);
      onClose();
    },
    [router, onClose]
  );

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => Math.min(index + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const doc = results[activeIndex];
      if (doc) navigateTo(doc);
    } else if (event.key === "Escape") {
      onClose();
    }
  };

  return (
    <div className="command-palette-backdrop" onClick={onClose}>
      <div className="command-palette" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label="Buscar na documentação">
        <div className="command-palette-input-row">
          <SearchIcon />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Buscar guias, plataformas, links…"
            className="command-palette-input"
            aria-label="Buscar na documentação"
          />
          <kbd>Esc</kbd>
        </div>

        <div className="command-palette-results">
          {results.length === 0 && (
            <p className="command-palette-empty">Nenhum resultado para &quot;{query}&quot;.</p>
          )}
          {results.map((doc, index) => (
            <button
              key={doc.slug}
              className={`command-palette-item ${index === activeIndex ? "active" : ""}`}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => navigateTo(doc)}
              type="button"
            >
              <div className="command-palette-item-text">
                <span className="command-palette-item-category">{doc.category}</span>
                <span className="command-palette-item-title">{doc.title}</span>
              </div>
              <ArrowRightIcon />
            </button>
          ))}
        </div>

        <div className="command-palette-footer">
          <span><kbd>↑</kbd><kbd>↓</kbd> navegar</span>
          <span><kbd>Enter</kbd> abrir</span>
        </div>
      </div>
    </div>
  );
}

export function CommandPaletteProvider({
  docs,
  children,
}: {
  docs: DocMeta[];
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const openPalette = useCallback(() => setOpen(true), []);
  const closePalette = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const value = useMemo(() => ({ openPalette }), [openPalette]);

  return (
    <CommandPaletteContext.Provider value={value}>
      {children}
      {open && (
        <CommandPaletteModal docs={docs} query={query} onQueryChange={setQuery} onClose={closePalette} />
      )}
    </CommandPaletteContext.Provider>
  );
}
