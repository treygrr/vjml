# vjml

Plain Vue port of the `vue-mjml` component runtime.

This package now contains:

- the copied MJML-style runtime components
- plugin-based global registration for Vue apps
- metadata and typed component prop exports
- browser-side render helpers for converting a Vue email component into email-safe HTML

## Repository layout

- `src` contains the publishable component library and is the only code compiled into `dist`.
- `playground` contains the local development app used for previewing and testing the library.
- The playground imports the library through the local `vjml` source alias, so it exercises the same public entry surface a consumer would use.

## Scripts

- `npm run dev` starts the local playground.
- `npm run dev:playground` also starts the local playground explicitly.
- `npm run build` builds the library from `src` into `dist` and emits declaration files.
- `npm run build:lib` runs the library build directly.
- `npm run typecheck` validates both the playground and the library source.

## Install the plugin

```ts
import { createApp } from 'vue'
import App from './App.vue'
import VjmlPlugin from 'vjml'

createApp(App)
	.use(VjmlPlugin, {
		prefix: 'VJ',
		render: {
			validation: 'warn',
		},
	})
	.mount('#app')
```

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
