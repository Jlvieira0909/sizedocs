import type { ReactNode } from "react";
import { extractText, slugify } from "@/lib/utils";

function AnchorHeading({
  level,
  children,
}: {
  level: 2 | 3;
  children: ReactNode;
}) {
  const id = slugify(extractText(children));
  const Tag = level === 2 ? "h2" : "h3";

  return (
    <Tag id={id} className="heading-anchor-target">
      <a href={`#${id}`} className="heading-anchor-link">
        {children}
        <span className="heading-anchor-mark" aria-hidden="true">
          #
        </span>
      </a>
    </Tag>
  );
}

export function H2({ children }: { children: ReactNode }) {
  return <AnchorHeading level={2}>{children}</AnchorHeading>;
}

export function H3({ children }: { children: ReactNode }) {
  return <AnchorHeading level={3}>{children}</AnchorHeading>;
}
