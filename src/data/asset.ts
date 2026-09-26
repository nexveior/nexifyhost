/* ------------------------------------------------------------------ */
/*  Image assets — Next.js-safe static manifest.                       */
/*  SVG & image files are served from public images and static assets. */
/*  This avoids Vite-only import.meta.glob calls during Next builds.    */
/* ------------------------------------------------------------------ */

const IMAGES_BASE = "/images";
const IMAGES_SRC_BASE = "/nexify/assets/images-src";
const EXTS = ["webp", "avif", "jpg", "jpeg", "png", "svg"] as const;

const userFiles = new Set([
  "banners/bots.svg",
  "banners/budget.webp",
  "banners/domains.svg",
  "banners/gameservers.svg",
  "banners/minecraft.svg",
  "banners/performance.webp",
  "banners/standard.webp",
  "faq.webp",
  "logo.webp",
  "partners/amd.svg",
  "partners/cloudflare.svg",
  "partners/hetzner.svg",
  "partners/intel.svg",
  "partners/pterodactyl.svg",
  "runtimes/go.svg",
  "runtimes/java.webp",
  "runtimes/lua.svg",
  "runtimes/node.webp",
  "runtimes/php.webp",
  "runtimes/python.webp",
  "showcase/analytics.svg",
  "showcase/mods.svg",
  "showcase/plugins.svg",
  "showcase/shell.svg",
  "snowy.avif",
]);

const srcFiles = new Set([
  "banners/vps.svg",
  "partners/amd.svg",
  "partners/cloudflare.svg",
  "partners/hetzner.svg",
  "partners/intel.svg",
  "partners/pterodactyl.svg",
]);

export const getImage = (stem: string): string => {
  for (const ext of EXTS) {
    const name = `${stem}.${ext}`;
    if (userFiles.has(name)) return `${IMAGES_BASE}/${name}`;
  }

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
