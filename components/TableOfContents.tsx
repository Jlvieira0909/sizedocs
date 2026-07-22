"use client";

import { useEffect, useState } from "react";
import type { ExtractedHeading } from "@/lib/utils";

export default function TableOfContents({ headings }: { headings: ExtractedHeading[] }) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? "");

  useEffect(() => {
    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-100px 0px -70% 0px" }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <aside className="toc">
      <span className="toc-title">Nesta página</span>
      <nav>
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={`toc-link toc-level-${heading.level} ${activeId === heading.id ? "active" : ""}`}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </aside>
  );
}
