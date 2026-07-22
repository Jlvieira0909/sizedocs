"use client";

import { useState, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { PlatformIcon, detectPlatformKey } from "@/components/icons/PlatformIcon";
import { extractText } from "@/lib/utils";

type MDXLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children?: ReactNode;
};

function CheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

export default function MDXLink({ href, children, ...props }: MDXLinkProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (!href) return;
    try {
      await navigator.clipboard.writeText(href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRedirect = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (href) window.open(href, "_blank", "noopener,noreferrer");
  };

  const platformKey = detectPlatformKey(`${href ?? ""} ${extractText(children)}`);

  return (
    <>
      <a href={href} onClick={handleCopy} className="mdx-custom-link" {...props}>
        {copied ? <CheckIcon /> : <PlatformIcon name={platformKey} size={22} />}
        <span className="mdx-link-text">{children}</span>
        <button onClick={handleRedirect} className="mdx-redirect-btn" title="Abrir link em nova guia" type="button">
          <ExternalLinkIcon />
        </button>
      </a>

      {copied &&
        createPortal(
          <div className="toast-alert">
            <CheckIcon />
            Link copiado para a área de transferência!
          </div>,
          document.body
        )}
    </>
  );
}
