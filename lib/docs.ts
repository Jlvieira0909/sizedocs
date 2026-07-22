import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type DocMeta = {
  slug: string;
  title: string;
  description: string;
  category: string;
  order: number;
  updatedAt?: string;
};

export type DocWithContent = DocMeta & { content: string };

export type DocGroup = {
  category: string;
  docs: DocMeta[];
};

type Frontmatter = {
  title?: string;
  description?: string;
  category?: string;
  order?: number;
  updatedAt?: string;
};

function readSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

function toDocMeta(slug: string, data: Frontmatter): DocMeta {
  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    category: data.category ?? "Geral",
    order: typeof data.order === "number" ? data.order : 999,
    updatedAt: data.updatedAt,
  };
}

export function getAllDocs(): DocMeta[] {
  const docs = readSlugs().map((slug) => {
    const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
    const raw = fs.readFileSync(filePath, "utf8");
    const { data } = matter(raw);
    return toDocMeta(slug, data as Frontmatter);
  });

  return docs.sort((a, b) => a.order - b.order);
}

export function getDocsGroupedByCategory(): DocGroup[] {
  const docs = getAllDocs();
  const order: string[] = [];
  const map = new Map<string, DocMeta[]>();

  for (const doc of docs) {
    if (!map.has(doc.category)) {
      map.set(doc.category, []);
      order.push(doc.category);
    }
    map.get(doc.category)!.push(doc);
  }

  return order.map((category) => ({ category, docs: map.get(category)! }));
}

export function getDocBySlug(slug: string): DocWithContent | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    ...toDocMeta(slug, data as Frontmatter),
    content,
  };
}

export function getPlatformCount(): number {
  const doc = getDocBySlug("plataforms");
  if (!doc) return 0;
  const matches = doc.content.match(/<PlatformCard\s/g);
  return matches ? matches.length : 0;
}
