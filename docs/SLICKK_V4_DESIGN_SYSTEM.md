# SLICKK V4 design system

Updated 28 October 2026. Extend the matched Astro agency release; do not replace it with a framework or animation package.

## Tokens and layout

`src/styles/v4.css` owns the dark extension: canvas #080b14, surface #101626, raised surface #151e32, text #f8fafc, secondary text #adb9cf and border #2a3650. Accent colors are blue #4285f4, cyan #00d5ff, violet #8b5cf6, coral #ff5978, emerald #10d9a3 and amber #ffb347. Accents decorate surfaces; readable light text remains on dark backgrounds. Amber marks keyboard focus.

Use the existing local Inter variable font. Maximum content width is 1200px. Section spacing scales from 64px to 108px. Cards use 22px corners, restrained borders and visible text hierarchy. At 900px navigation switches to an accessible menu; at 690px cards and forms stack. Controls have at least 44px height where appropriate.

## Components and states

`AnimatedGradientButton.astro` renders a native anchor or button, with primary/secondary variants, hover, focus-visible, active, disabled and loading states. Disabled anchors lose their href; native buttons receive disabled. Loading sets aria-busy and a small spinner. `GradientButton.astro` forwards the existing API so callers remain compatible. Ordinary navigation and utility controls retain existing buttons.

Aurora surfaces, hero lighting and card spotlights use CSS gradients. Pointer updates use one requestAnimationFrame callback at a time, fine-pointer devices only and clamped numeric custom properties. IntersectionObserver pauses offscreen ambient animation. Reduced motion and hidden tabs pause ambient effects. Small screens suppress large motion. Content remains usable without animation, hover or pointer input.

## Content and assets

Portfolio thumbnails and galleries use five original, local SVG concept studies, with explicit dimensions, meaningful alternative text and lazy loading below the fold. They depict fictional identities, not clients. Social previews use a 1200 × 630 JPEG. See ASSETS.md for provenance.

## Validation boundaries

Browser tests cover all 37 indexable routes at desktop, tablet and phone widths, keyboard navigation, menu Escape behavior, portfolio filters, quote prefill and reduced motion. Automated Axe results and measured Lighthouse results belong in the performance and test reports. Automated checks do not establish complete accessibility conformance or physical-device behavior.
