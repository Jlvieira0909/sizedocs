import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ChevronRight } from "lucide-react";
import MDXLink from "@/components/MDXLink";
import { H2, H3 } from "@/components/mdx/Heading";
import { Callout } from "@/components/mdx/Callout";
import { PlatformCard, PlatformGrid } from "@/components/mdx/PlatformCard";
import TableOfContents from "@/components/TableOfContents";
import { getAllDocs, getDocBySlug } from "@/lib/docs";
import { extractHeadings, formatDate } from "@/lib/utils";

const mdxComponents = {
  a: MDXLink,
  h2: H2,
  h3: H3,
  Callout,
  PlatformCard,
  PlatformGrid,
};

export async function generateStaticParams() {
  return getAllDocs().map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDocBySlug(slug);
  if (!doc) return { title: "Página não encontrada — SizeDocs" };
  return {
    title: `${doc.title} — SizeDocs`,
    description: doc.description,
  };
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getDocBySlug(slug);

  if (!doc) {
    notFound();
  }

  const headings = extractHeadings(doc.content);
  const updatedAt = formatDate(doc.updatedAt);

  return (
    <article className="doc-page">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Docs</Link>
        <ChevronRight size={14} />
        <span>{doc.category}</span>
        <ChevronRight size={14} />
        <span className="breadcrumb-current">{doc.title}</span>
      </nav>

      <header className="doc-header">
        <h1>{doc.title}</h1>
        {doc.description && <p className="doc-description">{doc.description}</p>}
        {updatedAt && <p className="doc-updated-at">Atualizado em {updatedAt}</p>}
      </header>

      <div className="doc-layout">
        <div className="markdown-body">
          <MDXRemote source={doc.content} components={mdxComponents} />
        </div>
        {headings.length >= 2 && <TableOfContents headings={headings} />}
      </div>
    </article>
  );
}
