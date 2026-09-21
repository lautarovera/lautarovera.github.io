# lautarovera.github.io — Personal website and technical blog

## Purpose
Professional website of Lautaro Vera, Senior Embedded Firmware Engineer (10 years).
Goal: demonstrate technical judgment in embedded firmware, hardware and Edge AI,
and generate leads for remote roles, contracts and consulting.

Primary audience: tech leads, hiring managers and technical recruiters in embedded,
semiconductors, automotive, robotics and industrial. They skim fast and look for
evidence, not adjectives.

## Stack
- Astro (static site), content in Markdown/MDX under `src/content/`.
- Deployment: GitHub Pages (user site) via GitHub Actions, using the official Astro action.
- Live URL: https://lautarovera.github.io (served at the root, so no `base` path).
  `astro.config.mjs` must set `site: 'https://lautarovera.github.io'`.
- No custom domain for now. If one is added later, it goes in `public/CNAME`.
- No heavy UI frameworks. JavaScript only when it adds real value.
- No third-party trackers. If analytics are needed, use a privacy-respecting option.

## Structure
- `src/pages/` — home, about, blog, projects, contact
- `src/content/blog/` — one file per article, with frontmatter
- `src/content/projects/` — technical case studies (problem, decisions, validation, results)
- `public/` — images, CV as PDF
- `docs/` — style notes and design decisions (for Claude and for me)
- `.claude/skills/` — project skills (e.g. `/new-post`)

## Commands
- `npm run dev` — local dev server
- `npm run build` — production build (must pass with no errors before any commit)
- `npm run preview` — preview the build

## Language and voice
- Primary language: English. Some articles may have a Spanish version.
- Voice: first person, direct, technical, no marketing. Short sentences.
- Every performance claim comes with context: what was measured, how, and on which hardware.
- Banned: "passionate", "rockstar", "cutting-edge", empty superlatives.

## Confidentiality (critical rule)
- Never include code, internal names, diagrams, register details or data from
  clients or employers (NXP, MobileKnowledge or others) that is not public.
- When discussing past projects: patterns, decisions and lessons, not implementation.
- If a draft contains anything that could be under NDA, flag it before continuing.

## Technical article format
Required frontmatter: title, description, date, tags, lang, block
(`edge-ai`, `firmware` or `hardware`: where the article sits on the home-page die).
Recommended structure: the problem; the constraints (memory, power, real-time);
options considered; the decision and why; how it was validated on real hardware;
what went wrong and what I would do differently.
If AI was used during development, explain what was generated and what was verified by hand.

## Design direction
- The site should feel like it belongs to someone who works close to the silicon:
  precise, with well-organized information density. Not SaaS templates.
- Chosen direction (approved 2026-09-21): **silicon floorplan + live inference**.
  - Centerpiece: the home page is a chip-die floorplan in SVG. Each block is a
    domain (Edge AI, firmware, hardware); articles and case studies are cells
    inside their block. The pad ring on the die edge links the I/O pages
    (about, contact, profiles).
  - Inside the Edge AI block, a small quantized model runs in the browser
    (WASM) next to a live budget readout: RAM, inference time, ops. It is
    evidence, not decoration: every number shown must be real and measured.
- One visual language everywhere, one interactive centerpiece.
  - The die defines the language: its layer colors are the site-wide color
    tokens, and every page carries a small die locator in the header with
    the current section's block lit.
  - Article headers carry their block's color and position on the die.
  - Reading surfaces stay calm: body text, tables and code are plain and
    legible. Numbered sections are kept for skimming.
  - Interactivity (zoom, live inference) lives only on the home page.
- The floorplan never replaces accessible navigation: a normal nav and a
  plain list of the same content must always exist and work without JS.
- Avoid generated-page clichés: identical rounded cards with shadows, decorative
  gradients, uppercase eyebrow labels above every heading, fade-in animations on
  every section, cream background with terracotta accent, black background with
  acid green, PCB-trace wallpaper, glowing "AI" neural-network imagery.
- Typography chosen with intent; line length under 80 characters.
- Quality floor: responsive, light and dark mode, visible keyboard focus,
  respects reduced motion, accessible contrast, lightweight pages.

## How we work
- Before large changes (design, structure, new sections): propose a short plan
  and wait for my approval.
- Small, verifiable changes. Run `npm run build` before calling anything done.
- Commit messages in English, Conventional Commits format (`feat:`, `fix:`, `content:`, `style:`).
- Do not add dependencies without justifying them.
- When writing content, deliver a draft for review; never publish text I haven't read.

## Contact details
- Email: lautarovera@proton.me
- LinkedIn: linkedin.com/in/lautarovera
- GitHub: github.com/lautarovera