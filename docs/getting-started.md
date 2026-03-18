# Getting Started

VJML lets you author MJML-style email templates as Vue components. The library ships a Vue plugin, direct component exports, and browser-side render helpers.

## Install

```bash
npm install vjml vue
```

## Register the plugin

Use the plugin when you want global component registration and a shared renderer config.

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

With `includeUnprefixedAliases: true`, both `Mjml` and `VJMjml` style names are available.

## Import components directly

If you do not want global registration, import the components you use explicitly.

```vue
<script setup lang="ts">
import { Body, Button, Column, Mjml, Section, Text } from 'vjml'
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

1. Read [Rendering](/rendering) to wire previews and HTML output.
2. Read [Styling](/styling) for fonts, global CSS, and selector-based head rules.
3. Browse [Samples](/samples) to see complete end-to-end emails.