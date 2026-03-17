# vjml

Plain Vue port of the `vue-mjml` component runtime.

This package now contains:

- the copied MJML-style runtime components
- plugin-based global registration for Vue apps
- metadata and typed component prop exports
- server-side render helpers for converting a Vue email component into email-safe HTML

## Scripts

- `npm run dev` starts the local demo app.
- `npm run build` builds both library entries and emits declaration files.
- `npm run typecheck` validates the demo app and library source.

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

## Render an email component

```ts
import WelcomeEmail from './WelcomeEmail.vue'
import { createVjmlRenderer } from 'vjml/server'

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

Inside a setup context, `useVjmlRenderer()` is also available from `vjml/server` and merges the injected plugin config automatically.

## Important entries

- `src/index.ts` exports the plugin, components, metadata, and shared utilities.
- `src/server.ts` exports the renderer helpers.
- `src/runtime/components` contains the copied VJML component implementations.
- `src/runtime/internal` contains the render pipeline and document/context helpers.
- `src/metadata.ts` and `src/metadata.generated.ts` provide component metadata used by validation and serialization.
