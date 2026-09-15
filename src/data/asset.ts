/* ------------------------------------------------------------------ */
/*  Image assets — files in images/ and images-src/ are auto-imported   */
/*  and INLINED into the single-file build (base64).                    */
/*                                                                      */
/*  HOW TO ADD YOUR IMAGES — two steps:                                 */
/*    1. Drop your image into the matching folder below, using the      */
/*       SAME BASE NAME (any extension: .webp .png .jpg .jpeg .svg).    */
/*       e.g. src/assets/images/banners/budget.jpg                      */
/*    2. Run  npm run build                                             */
/*  No code edits needed — the lookup finds your file automatically     */
/*  (your custom file wins over the bundled .svg artwork).              */
/* ------------------------------------------------------------------ */

const files = import.meta.glob<string>(
  [
    "../assets/images/**/*.*",
    "../assets/images-src/**/*.*",
    "!../assets/images/**/*.md",
    "!../assets/images-src/**/*.md",
  ],
  { eager: true, import: "default" },
);

/** preferred formats first — your custom file beats bundled svg art */
const EXTS = ["webp", "avif", "jpg", "jpeg", "png", "svg"];

export const getImage = (stem: string): string => {
  /* User-provided files in images/ always win. */
  for (const ext of EXTS) {
    const key = `../assets/images/${stem}.${ext}`;
    if (files[key]) return files[key];
  }

  /* Persistent source artwork keeps every built-in slot working. */
  for (const ext of EXTS) {
    const key = `../assets/images-src/${stem}.${ext}`;
    if (files[key]) return files[key];
  }

  // Last resort: any imported file sharing the base name.
  const hit = Object.keys(files).find((key) =>
    key.toLowerCase().includes(`/${stem.toLowerCase()}.`),
  );
  return hit ? files[hit] : "";
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
