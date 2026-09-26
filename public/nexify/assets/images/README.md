# NexifyHost Image Assets

All site images live here and are **imported in `src/data/assets.ts`**, which
means the bundler **inlines them (base64) directly into the single-file
build**. There are no external image requests — that's what makes the site
display correctly no matter how `dist/index.html` is hosted.

> Do NOT put site images in `public/` — external paths 404 in a
> single-file deployment. Everything must be imported.

## How to replace an image

1. Drop your file into the matching folder below using the **exact same
   file name and extension**.
2. Run `npm run build` — your image is now compiled into the bundle.

### Banners (`.svg`, themed artwork — small & sharp at any size)
- `banners/minecraft.svg` — homepage hero + Minecraft page hero
- `banners/budget.svg` · `standard.svg` · `performance.svg` — plan families
  (each Minecraft plan card uses its family banner as a header image)
- `banners/bots.svg` — bot hosting page
- `banners/gameservers.svg` — game servers page
- `banners/domains.svg` — domains page
- Tip: prefer `.webp` `.jpg` or `.png` replacements of the same base name if
  you add photographic art, and update the import in `src/data/assets.ts`.

### Graphics (`.svg`, logos/icons/illustrations)
- `logo.svg` — navbar + footer brand
- `faq-side.svg` — illustration beside the FAQ
- `runtimes/{node,python,java,go,php,lua}.svg` — bot language icons
- `partners/{intel,amd,pterodactyl,cloudflare,hetzner}.svg` — partner logos
- `showcase/{shell,plugins,mods,analytics}.svg` — panel screenshots

### Changing a file's extension
If you want to use, say, `minecraft.webp` instead of `.jpg`, just drop the
`.webp` file here and update its import in `src/data/assets.ts` from
`../assets/images/banners/minecraft.jpg` to
`../assets/images/banners/minecraft.webp`. Any Vite-supported format works.

### Tips
- Keep photos under ~400 KB — the whole bundle ships to every visitor.
- Vector/SVG files are tiny and perfectly sharp — prefer them for logos.
