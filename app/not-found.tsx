import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="not-found">
      <span className="not-found-code">404</span>
      <h1>Essa página ainda não existe.</h1>
      <p>O conteúdo pode ter sido movido ou renomeado. Volte para a home ou use a busca (⌘K) para encontrar o que procura.</p>
      <Link href="/" className="not-found-link">
        <ArrowLeft size={16} />
        Voltar para a home
      </Link>
    </div>
  );
}
