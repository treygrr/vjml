---
title: Contributing
description: Development setup, coverage requirements, and GitHub pull request policy for VJML contributors.
---

# Contributing

VJML accepts changes through GitHub pull requests. This document is the merge policy for changes to the library, test suites, playground, and docs site.

## Working areas

- `src/` is the publishable library code that ships in the package.
- `test/` contains component parity suites, plugin tests, shared normalizers, and sample email parity coverage.
- `playground/` is the local app for manually exercising the package surface.
- `website/` is the Nuxt docs site and content source.

## Local setup

Use Node 20 when possible to match the checked-in GitHub workflow.

Install root dependencies before working on the library or tests:

```bash
npm ci
```

If you touch the docs app or its dependencies, install inside `website/` as well:

```bash
cd website
npm ci
```

## Coverage policy

- Every behavior change must ship with test coverage.
- Every new feature or component must ship with test coverage.
- Component and renderer changes should add or update parity fixtures under `test/components/<component>/`.
- Cross-cutting rendering, document shell, or multi-component changes should add or update coverage under `test/samples/`.
- Plugin or registration changes should add or update focused Vitest coverage such as `test/plugin/plugin.test.ts`.
- When parity output changes intentionally, commit the updated snapshot files under `test/**/snapshots/` in the same pull request.

## Required verification

For library, runtime, plugin, or test changes run:

```bash
npm run typecheck
npm run test
npm run build
```

For docs site changes run:

```bash
cd website
npm run build
```

If a pull request touches both the library and the docs, run both verification flows.

## Keeping the repo in sync

- If you change the public component surface, keep the metadata and generated runtime files in sync in the same pull request, including `src/metadata.generated.ts`, `src/runtime/manifest.generated.ts`, `src/runtime/components.generated.ts`, and `src/runtime/component-types.generated.ts`.
- Update docs under `website/content/` when public APIs, component behavior, or examples change.
- If you change dependencies, commit the matching lockfile in the directory you changed: `package-lock.json` at the repo root or `website/package-lock.json`.
- Do not commit local build output or caches such as `dist/`, `website/.nuxt/`, or `website/.output/`.

## GitHub pull request policy

- Open a GitHub pull request against `main`.
- Keep the pull request scoped to one logical change.
- Describe what changed, why it changed, and which commands you ran locally.
- Include screenshots when the docs UI changes and HTML evidence or snapshot diffs when rendered email output changes.
- A pull request is not ready to merge if changed behavior or new functionality is missing coverage.