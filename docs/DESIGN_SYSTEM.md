# Design system — Flagship

## Direction decision

The three side-by-side visual studies are in [design-directions.svg](design-directions.svg). Three concepts were evaluated against originality, clarity of offer, accessibility, implementation cost and fit with a solo studio. Scores below are design judgments, not user research.

| Direction | Idea | Strength | Cost / weakness | Judgment |
| --- | --- | --- | --- | --- |
| Nocturnal Observatory | Keep V4's continuous dark aurora, glass and colored cards | Familiar technology cue | Service grid and glowing hero felt generic; low editorial contrast | 3/5 |
| Precision Editorial | Ruled ivory sections, dark technical canvases, numbered index, angular S identity | Clear hierarchy, distinct rhythm, legible business story | Demands disciplined spacing and contrast | **4.5/5 chosen** |
| Kinetic Modules | Modular type grid, animated rearrangement and bold accent blocks | Memorable motion | Higher implementation and motion/accessibility cost; less direct service comprehension | 3.5/5 |

## Implemented language

- Color: obsidian `#080b10`, ivory `#f5f3ef`, graphite `#222934`, blue `#328cff`, cyan `#4bd7ef`. Blue/cyan signal interaction or technical structure; body copy is high-contrast ink.
- Type: locally hosted Inter Variable Latin with system fallback. Hero uses compact three-line statement. Section headings use short line breaks; body text uses comfortable line height and bounded width.
- Layout: 1200px container; 64px desktop and 36px narrow gutters. Sections alternate dark and ivory. Rules and numbered rows replace generic bento cards on the homepage. Cards remain where comparison is useful, such as starting packages.
- Components: shared `BrandLogo`, native `details`, `dialog`, responsive HTML study surfaces, existing buttons and forms. Brand mark enters once; all required content remains available with reduced motion.
- Interactions: the hero's three native disclosures explain the studio method. Portfolio dialog opens full artwork and returns focus. Commerce and dashboard studies reflow at desktop, tablet and mobile preview widths. Form reports success only after server storage succeeds.
- Small screens: content stacks before 900px, service rows use two lines, controls retain keyboard focus, portfolio demos use container queries.

Review the actual screenshots and browser results in `TEST_REPORT.md`. This document describes the design in source; it does not claim external preference testing.
