---
title: VJML Docs
description: Guides, rendering workflows, and component reference pages for the VJML email component library.
---

# VJML Docs

Use this area to move from installation, to rendering, to tag-level reference without leaving the same docs shell.

## What this site covers

The docs are organized around the parts you will actually reach for when building emails:

- getting started with the plugin and direct imports
- rendering to browser previews or raw HTML
- global styling, fonts, selectors, and head content
- individual reference pages for every component in the sidebar
- component categories grouped for faster tag lookup

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
  description="Use the left sidebar for deep component lookup, the top bar for global search, and the rendering and styling guides when you need shell-level workflows instead of isolated tags."
/>