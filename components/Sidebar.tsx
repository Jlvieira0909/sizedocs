"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { useCommandPalette } from "@/components/CommandPalette";
import type { DocGroup } from "@/lib/docs";

export default function Sidebar({ navGroups }: { navGroups: DocGroup[] }) {
  const pathname = usePathname();
  const { openPalette } = useCommandPalette();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(navGroups.map((group) => [group.category, true]))
  );
  const [trackedPathname, setTrackedPathname] = useState(pathname);

  if (pathname !== trackedPathname) {
    setTrackedPathname(pathname);
    setMobileOpen(false);
    const activeGroup = navGroups.find((group) =>
      group.docs.some((doc) => `/docs/${doc.slug}` === pathname)
    );
    if (activeGroup) {
      setOpenGroups((prev) => ({ ...prev, [activeGroup.category]: true }));
    }
  }

  const toggleGroup = (category: string) => {
    setOpenGroups((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <>
      <header className="mobile-topbar">
        <button aria-label="Abrir menu de navegação" className="icon-button" onClick={() => setMobileOpen(true)}>
          <Menu size={20} />
        </button>
        <Link href="/" className="sidebar-logo-text">
          SizeDocs
        </Link>
        <button aria-label="Buscar na documentação" className="icon-button" onClick={openPalette}>
          <Search size={20} />
        </button>
      </header>

      {mobileOpen && <div className="sidebar-backdrop" onClick={() => setMobileOpen(false)} />}

      <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-header">
          <Link href="/" className="sidebar-logo-text">
            SizeDocs
          </Link>
          <button aria-label="Fechar menu" className="icon-button sidebar-close" onClick={() => setMobileOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <button className="sidebar-search-trigger" onClick={openPalette} type="button" aria-label="Buscar na documentação">
          <Search size={15} />
          <span>Buscar</span>
          <kbd>⌘K</kbd>
        </button>

        <nav className="sidebar-nav">
          <Link href="/" className={`nav-item-link nav-item-home ${pathname === "/" ? "active" : ""}`}>
            Início
          </Link>

          {navGroups.map((group) => {
            const isOpen = openGroups[group.category];
            return (
              <div key={group.category} className="nav-group">
                <button
                  className="nav-group-btn"
                  onClick={() => toggleGroup(group.category)}
                  aria-expanded={isOpen}
                  type="button"
                >
                  {group.category}
                  <ChevronDown size={16} className={`nav-group-icon ${isOpen ? "open" : ""}`} />
                </button>

                <div className={`nav-items-list ${isOpen ? "" : "closed"}`}>
                  <div className="nav-items-list-inner">
                    {group.docs.map((doc) => {
                      const href = `/docs/${doc.slug}`;
                      const active = pathname === href;
                      return (
                        <Link key={doc.slug} href={href} className={`nav-item-link ${active ? "active" : ""}`}>
                          {doc.title}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <a href="https://github.com/Jlvieira0909/sizedocs" target="_blank" rel="noopener noreferrer">
            Ver repositório no GitHub
          </a>
        </div>
      </aside>
    </>
  );
}
