# lautarovera.github.io

Source for my personal site and technical blog: embedded firmware,
hardware and Edge AI.

Live at <https://lautarovera.github.io>.

## Stack

- [Astro](https://astro.build), static output.
- Content in Markdown/MDX under `src/content/`.
- Deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

## Local development

Requires Node 22 (see `.nvmrc`).

```sh
npm install
npm run dev      # dev server at http://localhost:4321
npm run build    # production build into dist/
npm run preview  # serve the build locally
```

## License

- **Code** (source files, configuration and build scripts): [MIT](LICENSE).
- **Content** (articles and case studies in `src/content/`, and the
  diagrams and images made for them): [CC BY 4.0](LICENSE-CONTENT).
  You can reuse it with attribution to Lautaro Vera and a link to the
  original.
- **Not licensed for reuse:** my CV, photos of me, and my name and
  logo. All rights reserved.

Third-party material keeps its own license, noted where it appears.
