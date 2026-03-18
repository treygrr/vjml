# Rendering

VJML supports both interactive previews and direct HTML generation in the browser.

## Preview a component in an iframe

`VjmlRenderFrame` is the easiest way to embed a rendered email into an app or docs page.

```vue
<script setup lang="ts">
import LaunchAnnouncement from '../samples/launch-announcement.vue'
import { VjmlRenderFrame } from 'vjml'
</script>

<template>
  <VjmlRenderFrame :component="LaunchAnnouncement" height="520px" />
</template>
```

The frame renders the same email-safe HTML you would send or snapshot.

## Render HTML directly

Use `createVjmlRenderer()` when you want to reuse one renderer instance with shared config.

```ts
import LaunchAnnouncement from '../samples/launch-announcement.vue'
import { createVjmlRenderer } from 'vjml'

const renderer = createVjmlRenderer({
  render: {
    validation: 'strict',
  },
})

const { html, issues } = await renderer.renderToHtml(LaunchAnnouncement)
```

## One-off HTML rendering

If you only need a single render, `renderVjmlToHtml()` is the short path.

```ts
import BillingSummary from '../samples/billing-summary.vue'
import { renderVjmlToHtml } from 'vjml'

const result = await renderVjmlToHtml(BillingSummary, {
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
import WeeklyDigest from '../samples/weekly-digest.vue'
import { createVjmlRenderer } from 'vjml'

const renderer = createVjmlRenderer()
const debug = await renderer.renderToDebugTree(WeeklyDigest)

console.log(debug.document)
console.log(debug.tree)
```

## Docs-specific note

If you embed live previews inside a static docs site, wrap them in `ClientOnly`. The renderer relies on browser APIs when the preview actually runs.