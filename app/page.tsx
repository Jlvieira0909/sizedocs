import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import HeroSearchTrigger from "@/components/HeroSearchTrigger";
import { PlatformIcon } from "@/components/icons/PlatformIcon";
import { getAllDocs, getPlatformCount } from "@/lib/docs";

export default function Home() {
  const docs = getAllDocs();
  const platformCount = getPlatformCount();
  const guiaInicial = docs.find((doc) => doc.slug === "guia-inicial");
  const appLinks = docs.find((doc) => doc.slug === "app-links");

  return (
    <div className="home">
      <p className="eyebrow">Sizebay · Documentação técnica</p>
      <h1 className="home-title">Guias de integração, num só lugar.</h1>
      <p className="home-subtitle">
        Scripts, plataformas suportadas e atalhos para implantar o Provador Virtual em qualquer loja.
      </p>

      <HeroSearchTrigger />

      <div className="bento-wrapper">
        {guiaInicial && (
          <Link href={`/docs/${guiaInicial.slug}`} className="bento-card span-2-cols">
            <div className="glow-purple" />
            <ArrowUpRight className="bento-arrow" size={18} />
            <span className="bento-label">Comece por aqui</span>
            <h2 className="bento-title">{guiaInicial.title}</h2>
            <p className="bento-description">{guiaInicial.description}</p>
          </Link>
        )}

        <Link href="/docs/plataforms" className="bento-card span-2-rows bento-stat">
          <div className="glow-orange" />
          <ArrowUpRight className="bento-arrow" size={18} />
          <span className="bento-label">Integração</span>
          <span className="bento-stat-number">{platformCount}</span>
          <h2 className="bento-title">plataformas com suporte documentado</h2>
        </Link>

        {appLinks && (
          <Link href={`/docs/${appLinks.slug}`} className="bento-card">
            <ArrowUpRight className="bento-arrow" size={18} />
            <span className="bento-label">Referência rápida</span>
            <h2 className="bento-title">{appLinks.title}</h2>
          </Link>
        )}

        <a
          href="https://github.com/Jlvieira0909/sizedocs"
          target="_blank"
          rel="noopener noreferrer"
          className="bento-card"
        >
          <ArrowUpRight className="bento-arrow" size={18} />
          <span className="bento-label">Código-fonte</span>
          <h2 className="bento-title bento-title-with-icon">
            <PlatformIcon name="github" size={22} />
            Ver no GitHub
          </h2>
        </a>
      </div>
    </div>
  );
}
