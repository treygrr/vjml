---
layout: home

hero:
  name: VJML
  text: Vue MJML-style email components
  tagline: Author MJML-like email templates with Vue, render them in the browser, and verify parity against official MJML.
  actions:
    - theme: brand
      text: Get Started
      link: /getting-started
    - theme: alt
      text: Browse Samples
      link: /samples

features:
  - title: Vue-first authoring
    details: Compose email templates as Vue components with typed props, plugin-based registration, and direct component imports.
  - title: Browser previews
    details: Render full HTML documents in the browser with iframe previews and renderer diagnostics.
  - title: Parity-tested output
    details: Compare rendered VJML output against official MJML snapshots across components and full email samples.
---

## What this site covers

The docs are organized around the parts you will actually reach for when building emails:

- getting started with the plugin and direct imports
- rendering to browser previews or raw HTML
- global styling, fonts, selectors, and head content
- individual reference pages for every component in the sidebar
- full sample emails you can inspect in Vue and MJML form

<div class="not-prose grid gap-4 md:grid-cols-2 xl:grid-cols-4">
  <UCard>
    <template #header>
      <div class="flex items-center gap-2">
        <UIcon name="i-lucide-play-circle" class="size-5 text-primary" />
        <span class="font-semibold">Get Started</span>
      </div>
    </template>
    <p>Install the library, choose plugin registration or direct imports, and get a first email on screen quickly.</p>
    <template #footer>
      <UButton label="Open guide" color="neutral" variant="outline" block href="./getting-started" />
    </template>
  </UCard>

  <UCard>
    <template #header>
      <div class="flex items-center gap-2">
        <UIcon name="i-lucide-monitor-up" class="size-5 text-primary" />
        <span class="font-semibold">Rendering</span>
      </div>
    </template>
    <p>Compare iframe previews, reusable renderer instances, one-off HTML output, and debug tree inspection.</p>
    <template #footer>
      <UButton label="See rendering paths" color="neutral" variant="outline" block href="./rendering" />
    </template>
  </UCard>

  <UCard>
    <template #header>
      <div class="flex items-center gap-2">
        <UIcon name="i-lucide-palette" class="size-5 text-primary" />
        <span class="font-semibold">Styling</span>
      </div>
    </template>
    <p>Use head-level styles, defaults, selectors, and raw content without leaking outer app CSS into email markup.</p>
    <template #footer>
      <UButton label="Review styling tools" color="neutral" variant="outline" block href="./styling" />
    </template>
  </UCard>

  <UCard>
    <template #header>
      <div class="flex items-center gap-2">
        <UIcon name="i-lucide-library" class="size-5 text-primary" />
        <span class="font-semibold">Components</span>
      </div>
    </template>
    <p>Browse every VJML tag with generated metadata, parent and child rules, defaults, and attribute coverage.</p>
    <template #footer>
      <UButton label="Browse reference" color="neutral" variant="outline" block href="./components/" />
    </template>
  </UCard>
</div>

<UAlert
  class="not-prose mt-6"
  color="neutral"
  variant="subtle"
  title="Docs workflow"
  description="Use the left sidebar for deep component lookup, the top bar for section-level navigation and search, and the sample pages when you need full end-to-end templates instead of isolated tags."
/>

## Featured sample

<ClientOnly>
  <SampleShowcase name="launch-announcement" />
</ClientOnly>