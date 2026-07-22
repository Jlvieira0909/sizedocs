import { type ReactNode, isValidElement } from "react";

export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function extractText(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (isValidElement(node)) {
    const props = node.props as { children?: ReactNode };
    return extractText(props.children);
  }
  return "";
}

export type HeadingLevel = 2 | 3;

export type ExtractedHeading = {
  id: string;
  text: string;
  level: HeadingLevel;
};

export function extractHeadings(markdown: string): ExtractedHeading[] {
  const headings: ExtractedHeading[] = [];
  const codeBlockPattern = /```[\s\S]*?```/g;
  const withoutCode = markdown.replace(codeBlockPattern, "");
  const lines = withoutCode.split("\n");

  for (const line of lines) {
    const match = /^(#{2,3})\s+(.*)$/.exec(line.trim());
    if (!match) continue;
    const level = match[1].length as HeadingLevel;
    const text = match[2]
      .replace(/<[^>]+>/g, "")
      .replace(/[*_`]/g, "")
      .trim();
    if (!text) continue;
    headings.push({ id: slugify(text), text, level });
  }

  return headings;
}

export function formatDate(value?: string): string | null {
  if (!value) return null;
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}
