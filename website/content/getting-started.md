---
title: Getting Started
description: Install VJML, choose your registration strategy, and render a first email component.
---

# Getting Started

VJML lets you author MJML-style email templates as Vue components. The library ships a Vue plugin, direct component exports, and browser-side render helpers.

<div class="not-prose grid gap-4 md:grid-cols-3">
  <UCard>
    <template #header>
      <div class="flex items-center gap-2">
        <UIcon name="i-lucide-download" class="size-5 text-primary" />
        <span class="font-semibold">Install</span>
      </div>
    </template>
    <p>Start with a standard Vue app plus the library package. Nothing Nuxt-specific is required.</p>
  </UCard>

  <UCard>
    <template #header>
      <div class="flex items-center gap-2">
        <UIcon name="i-lucide-plug" class="size-5 text-primary" />
        <span class="font-semibold">Register</span>
      </div>
    </template>
    <p>Use the plugin when you want global aliases and a shared runtime configuration for previews and rendering.</p>
  </UCard>

  <UCard>
    <template #header>
      <div class="flex items-center gap-2">
        <UIcon name="i-lucide-component" class="size-5 text-primary" />
        <span class="font-semibold">Render</span>
      </div>
    </template>
    <p>Choose between direct component imports, iframe previews, or raw HTML rendering depending on your integration path.</p>
  </UCard>
</div>

<UAlert
  class="not-prose mt-6"
  color="primary"
  variant="subtle"
  title="Choose a starting path"
  description="If you are building a design surface or docs site, start with the plugin plus VjmlRenderFrame. If you only need email HTML once per request, jump straight to renderVjmlToHtml()."
/>

## Install

```bash
npm install @treygrr/vjml vue
```

## Register the plugin

Use the plugin when you want global component registration and a shared renderer config.

```ts
import { createApp } from 'vue'
import App from './App.vue'
import VjmlPlugin from '@treygrr/vjml'

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

With `includeUnprefixedAliases: true`, both `Mjml` and `VJMjml` style names are available.

## Import components directly

If you do not want global registration, import the components you use explicitly.

```vue
<script setup lang="ts">
import { Body, Button, Column, Mjml, Section, Text } from '@treygrr/vjml'
</script>

<template>
  <Mjml lang="en">
    <Body width="600px" background-color="#f6efe7">
      <Section>
        <Column>
          <Text>Hello from VJML</Text>
          <Button href="https://example.com">Open</Button>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>
```

## Core entry points

- `VjmlPlugin` registers components and provides runtime config
- `VjmlRenderFrame` renders a component into an iframe preview
- `createVjmlRenderer()` renders email components to HTML or a debug tree
- `renderVjmlToHtml()` is the fast path when you only need HTML once
- `getVjmlComponentMetadata()` exposes the same metadata used by validation and docs tables

## Next steps

<div class="not-prose grid gap-4 md:grid-cols-3">
  <UCard>
    <template #header><span class="font-semibold">Rendering guide</span></template>
    <p>Wire up previews, reusable renderer instances, and direct HTML output paths.</p>
    <template #footer>
      <UButton label="Read rendering" color="neutral" variant="outline" block href="./rendering" />
    </template>
  </UCard>

  <UCard>
    <template #header><span class="font-semibold">Styling guide</span></template>
    <p>See how fonts, selectors, inline rules, and raw head content fit into the final document shell.</p>
    <template #footer>
      <UButton label="Read styling" color="neutral" variant="outline" block href="./styling" />
    </template>
  </UCard>

  <UCard>
    <template #header><span class="font-semibold">Component reference</span></template>
    <p>Browse every VJML tag with generated metadata, parent and child rules, and attribute coverage.</p>
    <template #footer>
      <UButton label="Browse components" color="neutral" variant="outline" block href="./components/" />
    </template>
  </UCard>
</div>