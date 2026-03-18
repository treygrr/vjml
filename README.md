# vjml

![Test coverage: 100%](https://img.shields.io/badge/test%20coverage-100%25-brightgreen)

VJML is a Vue-only MJML-style email component library for standard Vue apps. It provides a plugin for global component registration, typed component exports, and browser-side render helpers for turning Vue email components into email-safe HTML.

It includes:

- the copied MJML-style runtime components
- plugin-based global registration for Vue apps
- metadata and typed component prop exports
- browser-side render helpers for converting a Vue email component into email-safe HTML

## Repository layout

- `src` contains the publishable component library and is the only code compiled into `dist`.
- `test` contains the component parity suites, shared test utilities, and end-to-end sample email fixtures.
- `website` contains the Nuxt documentation site and is managed as a workspace from the repository root.
- `playground` contains the local development app used for previewing and testing the library.
- The playground imports the library through the local `vjml` source alias, so it exercises the same public entry surface a consumer would use.

Run `npm install` from the repository root. The root package manages both the publishable library and the `website` workspace.

## Scripts

- `npm run dev` starts the local playground.
- `npm run dev:playground` also starts the local playground explicitly.
- `npm run dev:website` starts the Nuxt docs site from the root workspace.
- `npm run docs:dev` is an alias for `npm run dev:website`.
- `npm run docs:build` builds the docs site from the root workspace.
- `npm run docs:generate` generates the static docs output from the root workspace.
- `npm run docs:preview` previews the built docs site locally.
- `npm run build` builds both the library and the website from the repository root.
- `npm run build:lib` runs the library build directly.
- `npm run build:website` runs only the Nuxt docs build.
- `npm run test` runs the renderer parity test suite.
- `npm run test:accordion` runs the first component parity suite against the accordion fixtures.
- `npm run typecheck` validates the playground and library source.
- `npm run typecheck:website` runs the Nuxt workspace typecheck from the repository root.

## Component parity tests

The parity harness lives under `test/components`.

- Each component gets its own folder.
- Each variant is represented by a `.vue` fixture and a matching `.mjml` fixture.
- The component test renders both sides, normalizes the generated HTML, and compares the results.

## Contributing

Contributions go through GitHub pull requests. Before opening a pull request, make sure the change is covered by tests, run the relevant verification commands, and update docs or generated metadata when the public surface changes.

- Changes to existing behavior need updated coverage.
- New features and new components need new coverage.
- Runtime and component changes should update parity fixtures under `test/components` or `test/samples`.
- Library changes should be verified with `npm run typecheck`, `npm run test`, and `npm run build`.
- Docs changes live under `website/` and should be verified with `cd website && npm run build`.

See `CONTRIBUTING.md` for the full contributor workflow and GitHub merge policy.

## License

MIT. See `LICENSE`.

## Install the plugin

```ts
import { createApp } from 'vue'
import App from './App.vue'
import VjmlPlugin from 'vjml'

createApp(App)
	.use(VjmlPlugin, {
		includeUnprefixedAliases: true,
		prefix: 'VJ',
		render: {
			validation: 'warn',
		},
	})
	.mount('#app')
```

Set `includeUnprefixedAliases: true` when you want both `VJText`-style prefixed names and bare aliases such as `Text` or `Mjml` available from the plugin.

You can also import components directly:

```ts
import { Body, Button, Column, Mjml, Section, Text } from 'vjml'
```

## Preview in the browser

The main `vjml` entry now includes a browser-side renderer and an iframe preview component.

```vue
<script setup lang="ts">
import WelcomeEmail from './WelcomeEmail.vue'
import { VjmlRenderFrame } from 'vjml'
</script>

<template>
	<VjmlRenderFrame :component="WelcomeEmail" />
</template>
```

If you want the generated HTML directly in a browser runtime, use `createVjmlRenderer()` from `vjml`.

```ts
import WelcomeEmail from './WelcomeEmail.vue'
import { createVjmlRenderer } from 'vjml'

const { renderToHtml } = createVjmlRenderer()
const { html, issues } = await renderToHtml(WelcomeEmail)
```

## Render an email component

```ts
import WelcomeEmail from './WelcomeEmail.vue'
import { createVjmlRenderer } from 'vjml'

const { renderToHtml } = createVjmlRenderer({
	render: {
		validation: 'strict',
	},
})

const { html, issues } = await renderToHtml(WelcomeEmail, {
	props: {
		firstName: 'Ada',
	},
})
```

Inside a setup context, `useVjmlRenderer()` is also available from `vjml` and merges the injected plugin config automatically.

## Important entries

- `src/index.ts` exports the plugin, components, metadata, and shared utilities.
- `src/runtime/components` contains the copied VJML component implementations.
- `src/runtime/internal` contains the browser render pipeline and document/context helpers.
- `src/metadata.ts` and `src/metadata.generated.ts` provide component metadata used by validation and serialization.
- `playground/App.vue` is the development catalog that imports and exercises the library.
