# Rendering

VJML supports both interactive previews and direct HTML generation in the browser.

<div class="not-prose grid gap-4 md:grid-cols-2 xl:grid-cols-4">
  <UCard>
    <template #header><span class="font-semibold">Iframe preview</span></template>
    <p>Use VjmlRenderFrame when you want the simplest embedded browser preview.</p>
  </UCard>
  <UCard>
    <template #header><span class="font-semibold">Reusable renderer</span></template>
    <p>Create one renderer instance when multiple renders share the same runtime options.</p>
  </UCard>
  <UCard>
    <template #header><span class="font-semibold">One-off HTML</span></template>
    <p>Call renderVjmlToHtml() for the shortest path from component to final HTML.</p>
  </UCard>
  <UCard>
    <template #header><span class="font-semibold">Debug tree</span></template>
    <p>Inspect the normalized tree and collected document state when output is surprising.</p>
  </UCard>
</div>

<UAlert
  class="not-prose mt-6"
  color="neutral"
  variant="subtle"
  title="Browser-only previews"
  description="RenderFrame and live browser previews depend on client APIs. In static docs or SSR-like shells, wrap those previews in ClientOnly and keep server-side output paths separate."
/>

## Preview a component in an iframe

`VjmlRenderFrame` is the easiest way to embed a rendered email into an app or docs page.

```vue
<script setup lang="ts">
import WelcomeEmail from './WelcomeEmail.vue'
import { VjmlRenderFrame } from 'vjml'
</script>

<template>
  <VjmlRenderFrame :component="WelcomeEmail" height="520px" />
</template>
```

The frame renders the same email-safe HTML you would send or snapshot.

## Render HTML directly

Use `createVjmlRenderer()` when you want to reuse one renderer instance with shared config.

```ts
import WelcomeEmail from './WelcomeEmail.vue'
import { createVjmlRenderer } from 'vjml'

const renderer = createVjmlRenderer({
  render: {
    validation: 'strict',
  },
})

const { html, issues } = await renderer.renderToHtml(WelcomeEmail)
```

## One-off HTML rendering

If you only need a single render, `renderVjmlToHtml()` is the short path.

```ts
import InvoiceEmail from './InvoiceEmail.vue'
import { renderVjmlToHtml } from 'vjml'

const result = await renderVjmlToHtml(InvoiceEmail, {
  runtime: {
    render: {
      validation: 'warn',
    },
  },
})

console.log(result.html)
console.log(result.issues)
```

## Debug the render tree

Use `renderToDebugTree()` or `renderVjmlToDebugTree()` when you need to inspect the normalized tree and document state behind the final HTML.

```ts
import DigestEmail from './DigestEmail.vue'
import { createVjmlRenderer } from 'vjml'

const renderer = createVjmlRenderer()
const debug = await renderer.renderToDebugTree(DigestEmail)

console.log(debug.document)
console.log(debug.tree)
```

## Docs-specific note

If you embed live previews inside a static docs site, wrap them in `ClientOnly`. The renderer relies on browser APIs when the preview actually runs.

<div class="not-prose grid gap-4 md:grid-cols-2 xl:grid-cols-3 mt-6">
  <UCard>
    <template #header><span class="font-semibold">Preview during authoring</span></template>
    <p>Use an iframe in docs or a local app whenever designers and developers need to inspect final browser output quickly.</p>
  </UCard>

  <UCard>
    <template #header><span class="font-semibold">Render for delivery</span></template>
    <p>Use createVjmlRenderer() or renderVjmlToHtml() when your application needs the actual email HTML payload.</p>
  </UCard>

  <UCard>
    <template #header><span class="font-semibold">Diagnose mismatches</span></template>
    <p>Use debug trees when parity snapshots and browser renders diverge, especially around head output and layout wrappers.</p>
  </UCard>
</div>