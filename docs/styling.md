# Styling

VJML supports the same main head-level styling tools you would expect from MJML: fonts, head styles, inline styles, selector-based attributes, and raw head content.

## Use the head for global styling

Use `Head` to collect styles and metadata before the email shell is finalized.

```vue
<script setup lang="ts">
import { Font, Head, Preview, Style, Title } from 'vjml'
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

import { Head, Style } from 'vjml'
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
import { All, Attributes, Class, Head, Text } from 'vjml'
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
import { Head, HtmlAttribute, HtmlAttributes, Selector } from 'vjml'
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
import { Head, Raw } from 'vjml'

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