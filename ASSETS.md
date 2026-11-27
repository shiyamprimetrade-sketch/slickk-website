# Asset provenance

## Agency artwork

- `public/images/portfolio/*.svg`: five original code-native, self-initiated concept studies produced by `scripts/prepare-v4-assets.mjs`. NORTH, ATELIER, FOCUS and STILL are fictional presentation brands; dashboard values are sample data. These images do not represent commissioned client work or measured outcomes.
- `public/fonts/inter-latin.woff2`: locally hosted Inter Variable Latin, sourced from `@fontsource-variable/inter`. License: `public/fonts/OFL.txt` (SIL Open Font License).

Rebuild concept artwork with `node scripts/prepare-v4-assets.mjs`. Rebuild the brand exports, sharing JPEG and favicons with `node scripts/prepare-brand-assets.mjs`. Portfolio studies use explicitly sized responsive images. No stock photography, third-party client logos or unverified endorsements are required by these assets.

## Flagship identity

- `public/brand/slickk-wordmark-*.svg`, `slickk-symbol-*.svg`, and `slickk-horizontal-*.svg`: original geometric SLICKK outlines generated from `scripts/prepare-brand-assets.mjs`. Each has transparent PNG and opaque JPEG exports.
- `public/brand/slickk-avatar.svg`, PNG and JPEG: social profile icon.
- `public/brand/slickk-social.svg` is the 1200 × 630 master for `public/images/agency-social.jpg`.
- `public/favicon.svg`, three PNG favicons and `public/apple-touch-icon.png` use the same geometric S.

## Historical material

Obsolete product photographs, derivatives, wordmark and their generator have been removed from the active source and public output. Recoverable originals remain in Git history and the pre-flagship backup. See `docs/LEGACY_CLEANUP_REPORT.md` for the exact inventory. Historical text records under `docs/archive` are non-deployed release evidence, not current business content.
