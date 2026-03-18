# vjml website

This workspace contains the Nuxt 4 documentation site for `vjml`.

## GitHub Pages

GitHub Pages deployment is handled by `.github/workflows/nuxtjs.yml` from the repository root. The workflow installs from the root workspace, builds the website with the Nuxt `github_pages` preset, and uploads `website/.output/public` as the Pages artifact.

## Setup

Install dependencies from the repository root:

```bash
npm install
```

## Root-level commands

Run these from the repository root:

```bash
npm run dev:website
npm run build:website
npm run generate:website
npm run preview:website
npm run docs:dev
npm run docs:build
npm run docs:generate
npm run docs:preview
```

## Workspace-local commands

If you need to run commands from inside `website`, these still work:

```bash
npm run dev
npm run build
npm run generate
npm run preview
npm run typecheck
```
