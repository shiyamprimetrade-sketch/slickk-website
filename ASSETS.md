# Asset provenance

- `assets/originals/fruit-still-life.png`: original AI-generated illustrative fruit still life, generated for this project on 22 October 2026 with the built-in ImageGen tool. No reference photograph was supplied. Does not depict actual SLICKK inventory, a shipment or a supplier.
- `public/images/*.webp`: optimized responsive derivatives and category crops of that image.
- `public/images/social.jpg`: the same image with SLICKK social-sharing text composed by the asset script.
- `public/favicon.svg`, `public/wordmark.svg`: original SVG branding created for this project.
- Sourcing visualization: original schematic SVG in `src/components/SourcingMap.astro`; not a geographic boundary map or evidence of shipment routes.
- `public/fonts/inter-latin.woff2`: Inter variable Latin font from the open-source `@fontsource-variable/inter` npm package. License: SIL Open Font License 1.1, preserved alongside the font in `public/fonts/OFL.txt`.

Rebuild image derivatives with `node scripts/prepare-assets.mjs`. Assets are local; visitors do not request images, scripts or fonts from third-party CDNs.
