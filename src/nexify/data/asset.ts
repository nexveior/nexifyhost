/* ------------------------------------------------------------------ */
/*  Image assets — Next.js port.                                      */
/*  SVG artwork ships in public/nexify/assets and is resolved via a   */
/*  static manifest (replaces the Vite import.meta.glob lookup).      */
/* ------------------------------------------------------------------ */

const IMAGES_BASE = "/nexify/assets/images";
const IMAGES_SRC_BASE = "/nexify/assets/images-src";

/** preferred formats first — mirrors the original extension priority */
const EXTS = ["webp", "avif", "jpg", "jpeg", "png", "svg"] as const;

/* Files available under public/nexify/assets/images (user slot) */
const userFiles = new Set([
  "banners/bots.svg",
  "banners/budget.svg",
  "banners/domains.svg",
  "banners/gameservers.svg",
  "banners/minecraft.svg",
  "banners/performance.svg",
  "banners/standard.svg",
  "faq-side.svg",
  "logo.svg",
  "partners/amd.svg",
  "partners/cloudflare.svg",
  "partners/hetzner.svg",
  "partners/intel.svg",
  "partners/pterodactyl.svg",
  "runtimes/go.svg",
  "runtimes/java.svg",
  "runtimes/lua.svg",
  "runtimes/node.svg",
  "runtimes/php.svg",
  "runtimes/python.svg",
  "showcase/analytics.svg",
  "showcase/mods.svg",
  "showcase/plugins.svg",
  "showcase/shell.svg",
]);

/* Files available under public/nexify/assets/images-src (bundled art) */
const srcFiles = new Set(["banners/vps.svg"]);

export const getImage = (stem: string): string => {
  /* User-provided files in images/ always win. */
  for (const ext of EXTS) {
    const name = `${stem}.${ext}`;
    if (userFiles.has(name)) return `${IMAGES_BASE}/${name}`;
  }

  /* Persistent source artwork keeps every built-in slot working. */
  for (const ext of EXTS) {
    const name = `${stem}.${ext}`;
    if (srcFiles.has(name)) return `${IMAGES_SRC_BASE}/${name}`;
  }

  return "";
};

export const img = {
  partners: {
    intel: getImage("partners/intel"),
    amd: getImage("partners/amd"),
    pterodactyl: getImage("partners/pterodactyl"),
    cloudflare: getImage("partners/cloudflare"),
    hetzner: getImage("partners/hetzner"),
  },
};
