---
title: Contributing
description: Development setup, coverage requirements, and GitHub pull request policy for VJML contributors.
---

# Contributing

VJML accepts changes through GitHub pull requests. This page summarizes what contributors should do before a change is ready to merge.

<UAlert
  class="not-prose mt-6"
  color="warning"
  variant="subtle"
  title="Coverage is required"
  description="If you change behavior, add coverage. If you add behavior, add coverage. Pull requests without matching tests are not ready to merge."
/>

## Start in the right package

The repo has two main working areas:

- the publishable library at the repo root
- the Nuxt docs app in `website/`

Use Node 20 when possible to match the checked-in GitHub workflow.

Install dependencies at the repo root before working on the library, tests, or playground:

```bash
npm ci
```

If your change touches the docs app or its dependencies, install there as well:

```bash
cd website
npm ci
```

## Match coverage to the change

- Update or add coverage for every behavior change.
- Add coverage for every new feature or new component.
- Component and renderer changes should usually add or update parity fixtures under `test/components/<component>/`.
- Multi-component rendering, document shell, or broader email output changes should also be covered under `test/samples/`.
- Plugin changes should add or update focused tests such as `test/plugin/plugin.test.ts`.
- When parity output changes intentionally, commit the updated files under `test/**/snapshots/`.

## Verify locally before opening a pull request

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

If your pull request changes both the library and the docs, run both flows.

## Keep related repo files in sync

- Public API and component-surface changes should update the matching docs under `website/content/`.
- Public component-surface changes should also keep the generated metadata and runtime files in sync: `src/metadata.generated.ts`, `src/runtime/manifest.generated.ts`, `src/runtime/components.generated.ts`, and `src/runtime/component-types.generated.ts`.
- Dependency changes should include the matching lockfile update in the directory you changed.
- Do not commit local build output or caches such as `dist/`, `website/.nuxt/`, or `website/.output/`.

## GitHub pull request policy

- Open a GitHub pull request against `main`.
- Keep the change scoped to one logical unit of work.
- Explain what changed, why it changed, and which commands you ran locally.
- Include screenshots for docs UI changes and HTML evidence or snapshot diffs for email output changes.
- A pull request is not ready to merge if changed behavior or new functionality is missing coverage.