import type { ReactNode } from "react";

export type PlatformKey =
  | "shopify"
  | "vtex"
  | "vtex-legado"
  | "nuvemshop"
  | "tray"
  | "magento"
  | "magazord"
  | "woocommerce"
  | "convertr"
  | "wbuy"
  | "wake"
  | "vnda"
  | "uoou"
  | "loja-integrada"
  | "dooca"
  | "bagy"
  | "prestashop"
  | "canva"
  | "analytics"
  | "figma"
  | "api"
  | "github"
  | "default";

type PlatformEntry = {
  label: string;
  color: string;
  shapes: ReactNode;
};

const PLATFORMS: Record<PlatformKey, PlatformEntry> = {
  shopify: {
    label: "Shopify",
    color: "#95bf47",
    shapes: (
      <>
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </>
    ),
  },
  vtex: {
    label: "VTEX.IO",
    color: "#e31c58",
    shapes: <path d="M22 3L12 21 2 3h5l5 9 5-9h5z" />,
  },
  "vtex-legado": {
    label: "VTEX (Legado)",
    color: "#f43f5e",
    shapes: <path d="M22 3L12 21 2 3h5l5 9 5-9h5z" />,
  },
  nuvemshop: {
    label: "Nuvemshop",
    color: "#2a74e8",
    shapes: <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />,
  },
  tray: {
    label: "Tray",
    color: "#0052cc",
    shapes: (
      <path d="M20.38 3.46 16 2a8 8 0 0 0-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
    ),
  },
  magento: {
    label: "Magento",
    color: "#f26322",
    shapes: <path d="M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />,
  },
  magazord: {
    label: "Magazord",
    color: "#6b21a8",
    shapes: <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />,
  },
  woocommerce: {
    label: "WooCommerce",
    color: "#96588a",
    shapes: (
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    ),
  },
  convertr: {
    label: "Convertr",
    color: "#6366f1",
    shapes: (
      <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 0 0 4.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 0 1-15.357-2m15.357 2H15" />
    ),
  },
  wbuy: {
    label: "WBuy",
    color: "#0ea5e9",
    shapes: (
      <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13 5.4 5M7 13l-2.29 5.17c-.22.5.14 1.08.69 1.08H19M10 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm7 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
    ),
  },
  wake: {
    label: "Wake",
    color: "#ea580c",
    shapes: <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />,
  },
  vnda: {
    label: "VNDA",
    color: "#d4d4d8",
    shapes: <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8l-4 4v14a2 2 0 0 0 2 2z" />,
  },
  uoou: {
    label: "Uoou",
    color: "#8b5cf6",
    shapes: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      </>
    ),
  },
  "loja-integrada": {
    label: "Loja Integrada",
    color: "#10b981",
    shapes: (
      <>
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </>
    ),
  },
  dooca: {
    label: "Dooca",
    color: "#14b8a6",
    shapes: (
      <>
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </>
    ),
  },
  bagy: {
    label: "Bagy",
    color: "#ec4899",
    shapes: (
      <>
        <path d="M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </>
    ),
  },
  prestashop: {
    label: "PrestaShop",
    color: "#df0067",
    shapes: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  },
  canva: {
    label: "Canva",
    color: "#00c4cc",
    shapes: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </>
    ),
  },
  analytics: {
    label: "Analytics",
    color: "#f9ab00",
    shapes: (
      <>
        <path d="M3 3v18h18" />
        <path d="M18 17V9" />
        <path d="M13 17V5" />
        <path d="M8 17v-3" />
      </>
    ),
  },
  figma: {
    label: "Figma",
    color: "#a259ff",
    shapes: (
      <>
        <path stroke="#f24e1e" d="M5.5 5.5A3.5 3.5 0 0 1 9 2h3.5a3.5 3.5 0 0 1 0 7H9a3.5 3.5 0 0 1-3.5-3.5z" />
        <path d="M5.5 12.5A3.5 3.5 0 0 1 9 9h3.5v7H9a3.5 3.5 0 0 1-3.5-3.5z" />
        <path stroke="#1abc9c" d="M9 16v3.5A3.5 3.5 0 1 1 5.5 16H9z" />
        <path stroke="#0acf83" d="M12.5 12.5A3.5 3.5 0 1 1 16 9h-3.5v3.5z" />
      </>
    ),
  },
  api: {
    label: "API / Script",
    color: "#a1a1aa",
    shapes: (
      <>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </>
    ),
  },
  github: {
    label: "GitHub",
    color: "#e4e4e7",
    shapes: (
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
    ),
  },
  default: {
    label: "Link",
    color: "#a1a1aa",
    shapes: (
      <>
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </>
    ),
  },
};

const DETECTORS: [RegExp, PlatformKey][] = [
  [/vtex.{0,6}legado|legado.{0,6}vtex/, "vtex-legado"],
  [/vtex/, "vtex"],
  [/shopify/, "shopify"],
  [/nuvemshop|tiendanube/, "nuvemshop"],
  [/\btray\b/, "tray"],
  [/magazord/, "magazord"],
  [/magento/, "magento"],
  [/woo(commerce)?/, "woocommerce"],
  [/convertr/, "convertr"],
  [/wbuy/, "wbuy"],
  [/\bwake\b/, "wake"],
  [/vnda/, "vnda"],
  [/uoou/, "uoou"],
  [/loja integrada|loja-integrada/, "loja-integrada"],
  [/dooca/, "dooca"],
  [/\bbagy\b/, "bagy"],
  [/prestashop/, "prestashop"],
  [/canva/, "canva"],
  [/analytics|ga4/, "analytics"],
  [/figma/, "figma"],
  [/github/, "github"],
  [/\bapi\b|código|config|script/, "api"],
];

export function detectPlatformKey(input: string): PlatformKey {
  const value = input.toLowerCase();
  for (const [pattern, key] of DETECTORS) {
    if (pattern.test(value)) return key;
  }
  return "default";
}

export function getPlatformEntry(key: string): PlatformEntry {
  return PLATFORMS[key as PlatformKey] ?? PLATFORMS.default;
}

export function PlatformIcon({
  name,
  size = 22,
}: {
  name: string;
  size?: number;
}) {
  const entry = getPlatformEntry(name);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={entry.color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {entry.shapes}
    </svg>
  );
}
