# Styling

VJML supports the same main head-level styling tools you would expect from MJML: fonts, head styles, inline styles, selector-based attributes, and raw head content.

<div class="not-prose grid gap-4 md:grid-cols-2 xl:grid-cols-3">
  <UCard>
    <template #header><span class="font-semibold">Head styles</span></template>
    <p>Collect fonts, preview text, titles, and stylesheet rules before the final document shell is written.</p>
  </UCard>
  <UCard>
    <template #header><span class="font-semibold">Defaults and classes</span></template>
    <p>Prefer MJML-native defaults through Attributes, All, and Class before reaching for CSS selectors.</p>
  </UCard>
  <UCard>
    <template #header><span class="font-semibold">Literal head markup</span></template>
    <p>Use HtmlAttributes, selectors, and Raw when you need exact HTML attributes or raw fragments in the final head.</p>
  </UCard>
</div>

<UAlert
  class="not-prose mt-6"
  color="warning"
  variant="subtle"
  title="Keep docs CSS out of email output"
  description="The outer docs application and the rendered email live in different styling worlds. Import email CSS as raw text and pass it through Style instead of relying on the docs app stylesheet."
/>

## Use the head for global styling

Use `Head` to collect styles and metadata before the email shell is finalized.

```vue
<script setup lang="ts">
import { Font, Head, Preview, Style, Title } from '@treygrr/vjml'
</script>

<template>
  <Head>
    <Title>Weekly summary</Title>
    <Preview>Highlights from the last delivery cycle.</Preview>
    <Font name="Lora" href="https://fonts.googleapis.com/css?family=Lora:400,700" />
    <Style>
      .report-eyebrow div {
        letter-spacing: 0.18em;
        text-transform: uppercase;
      }
    </Style>
  </Head>
</template>
```

## Inline CSS rules after document wrapping

Use `inline="inline"` when a rule must end up on the matching element’s inline `style` attribute.

```vue
<Style inline="inline">
  div[role='article'] {
    border: 2px solid #d1b18d !important;
  }
</Style>
```

This repo’s renderer applies those rules after the document shell exists, which means selectors can target the root article wrapper as well as nested content.

## Import shared CSS as raw text

For reusable docs or app-level email styles, import the CSS file as raw text and feed it into `Style`.

```vue
<script setup lang="ts">
import emailHeadCss from './email-head.css?raw'
import emailInlineCss from './email-inline.css?raw'

import { Head, Style } from '@treygrr/vjml'
</script>

<template>
  <Head>
    <Style :content="emailHeadCss" />
    <Style inline="inline" :content="emailInlineCss" />
  </Head>
</template>
```

That is the recommended pattern for GitHub Pages docs or any static demo site. Do not try to style email content with the outer site CSS from the docs app.

## Prefer MJML-native defaults for component styling

Use `Attributes`, `All`, and `Class` when you want reusable component defaults instead of arbitrary CSS selectors.

```vue
<script setup lang="ts">
import { All, Attributes, Class, Head, Text } from '@treygrr/vjml'
</script>

<template>
  <Head>
    <Attributes>
      <All color="#425d64" font-size="14px" line-height="22px" />
      <Text color="#173540" font-size="15px" />
      <Class name="eyebrow" color="#db7636" font-weight="700" text-transform="uppercase" />
    </Attributes>
  </Head>
</template>
```

## Selector-based HTML attributes

Use `HtmlAttributes`, `Selector`, and `HtmlAttribute` when you need literal HTML attributes on rendered elements.

```vue
<script setup lang="ts">
import { Head, HtmlAttribute, HtmlAttributes, Selector } from '@treygrr/vjml'
</script>

<template>
  <Head>
    <HtmlAttributes>
      <Selector path="div[role='article']">
        <HtmlAttribute name="data-campaign">spring-brief</HtmlAttribute>
      </Selector>
    </HtmlAttributes>
  </Head>
</template>
```

## Raw head content

If you need literal head markup, use `Raw` with the `html` or `content` prop.

```vue
<script setup lang="ts">
import { Head, Raw } from '@treygrr/vjml'

const headRaw = `
  <meta name="x-token" content="docs" />
  <style type="text/css">.emphasis div { color: #db7636; }</style>
`
</script>

<template>
  <Head>
    <Raw :html="headRaw" />
  </Head>
</template>
```

<div class="not-prose grid gap-4 md:grid-cols-2 xl:grid-cols-3 mt-6">
  <UCard>
    <template #header><span class="font-semibold">When to use Style</span></template>
    <p>Use Style for selectors and reusable CSS rules that belong to the email document itself.</p>
  </UCard>
  <UCard>
    <template #header><span class="font-semibold">When to use Attributes</span></template>
    <p>Use Attributes, All, and Class when the goal is consistent component defaults instead of free-form CSS.</p>
  </UCard>
  <UCard>
    <template #header><span class="font-semibold">When to use Raw</span></template>
    <p>Use Raw only when the final head markup must be emitted literally, such as custom meta tags or unsupported fragments.</p>
  </UCard>
</div>