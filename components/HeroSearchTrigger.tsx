"use client";

import { Search } from "lucide-react";
import { useCommandPalette } from "@/components/CommandPalette";

export default function HeroSearchTrigger() {
  const { openPalette } = useCommandPalette();

  return (
    <button className="hero-search-trigger" onClick={openPalette} type="button">
      <Search size={18} />
      <span>Buscar guias, plataformas, links…</span>
      <kbd>⌘K</kbd>
    </button>
  );
}
