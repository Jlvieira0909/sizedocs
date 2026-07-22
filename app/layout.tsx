import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { CommandPaletteProvider } from "@/components/CommandPalette";
import { getAllDocs, getDocsGroupedByCategory } from "@/lib/docs";

export const metadata: Metadata = {
  title: "SizeDocs",
  description: "Documentação interna de integração da Sizebay.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const navGroups = getDocsGroupedByCategory();
  const allDocs = getAllDocs();

  return (
    <html lang="pt-BR" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <CommandPaletteProvider docs={allDocs}>
          <div className="app-shell">
            <Sidebar navGroups={navGroups} />
            <main className="main-content">{children}</main>
          </div>
        </CommandPaletteProvider>
      </body>
    </html>
  );
}
