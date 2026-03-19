<script setup lang="ts">
import { VJML_COMPONENT_METADATA } from 'vjml'
import { getDefaultComponentDocsRoute } from '~/composables/useComponentDocs'

const defaultComponentDocsRoute = getDefaultComponentDocsRoute()

const featureCards = [
  {
    title: 'Vue-first authoring',
    description: 'Compose MJML-style email documents with typed Vue components instead of string templates and ad hoc HTML fragments.',
    icon: 'i-lucide-component',
  },
  {
    title: 'Browser preview loop',
    description: 'Render real email-safe HTML into an iframe while you author, inspect issues, and iterate without leaving the app shell.',
    icon: 'i-lucide-monitor-up',
  },
  {
    title: 'Parity-driven confidence',
    description: 'Use generated metadata and the Vitest parity suite to keep docs and runtime behavior aligned.',
    icon: 'i-lucide-scan-search',
  },
]

const docsEntries = [
  {
    title: 'Getting started',
    description: 'Install the package, register the plugin, and ship your first email component.',
    to: '/docs/getting-started',
    icon: 'i-lucide-rocket',
  },
  {
    title: 'Rendering paths',
    description: 'Move between iframe previews, reusable renderers, HTML generation, and debug trees.',
    to: '/docs/rendering',
    icon: 'i-lucide-orbit',
  },
  {
    title: 'Styling guide',
    description: 'Control fonts, selectors, defaults, and head content without leaking app CSS into email output.',
    to: '/docs/styling',
    icon: 'i-lucide-palette',
  },
  {
    title: 'Component reference',
    description: 'Browse every VJML tag by category, then drill into tag rules, defaults, and attribute coverage.',
    to: defaultComponentDocsRoute,
    icon: 'i-lucide-library-big',
  },
]

const workflow = [
  {
    title: 'Author',
    detail: 'Build emails from composable Vue components instead of maintaining parallel MJML and runtime wrappers.',
  },
  {
    title: 'Preview',
    detail: 'Render the compiled HTML in-browser to validate spacing, typography, and shell-level head output quickly.',
  },
  {
    title: 'Verify',
    detail: 'Use metadata-backed docs and parity checks to keep implementation details honest across component changes.',
  },
]

const heroLinks = [
  {
    label: 'Read the docs',
    to: '/docs/getting-started',
    icon: 'i-lucide-arrow-right',
    trailing: true,
    size: 'xl' as const,
  },
  {
    label: 'Explore components',
    to: defaultComponentDocsRoute,
    color: 'neutral' as const,
    variant: 'outline' as const,
    size: 'xl' as const,
  },
]

const starterSnippet = `import { Body, Button, Column, Mjml, Section, Text } from '@treygrr/vjml'

<Mjml lang="en">
  <Body width="600px" background-color="#f6efe7">
    <Section>
      <Column>
        <Text>Hello from VJML</Text>
        <Button href="https://example.com">Open</Button>
      </Column>
    </Section>
  </Body>
</Mjml>`

const componentCount = VJML_COMPONENT_METADATA.length

useSeoMeta({
  title: 'VJML',
  description: 'Vue-first MJML-style email components with browser previews, generated metadata, and component-focused docs.',
})
</script>

<template>
  <UContainer class="space-y-16 py-8">
    <UPageHero
      headline="VJML"
      title="Vue-first MJML-style email components"
      description="Author MJML-style email templates as Vue components, preview them in the browser, and keep docs aligned with runtime metadata."
      :links="heroLinks"
    >
      <UCard>
        <template #header>
          <div class="flex items-center justify-between gap-3">
            <span class="font-medium">Starter component</span>
            <UBadge color="neutral" variant="subtle" label="Email-safe" />
          </div>
        </template>

        <pre class="overflow-x-auto rounded-md border border-default bg-elevated/50 p-4 text-sm"><code>{{ starterSnippet }}</code></pre>
      </UCard>
    </UPageHero>

    <UAlert
      :title="`${componentCount} documented components`"
      description="Browser preview helpers, styling guidance, and metadata-backed reference pages in one default Nuxt UI docs shell."
      color="neutral"
      variant="subtle"
    />

    <section class="space-y-6">
      <div class="max-w-2xl space-y-2">
        <h2 class="text-3xl font-semibold">Why VJML</h2>
        <p class="text-base">
          Keep authoring velocity high without giving up on email constraints.
        </p>
      </div>

      <UPageGrid>
        <UPageCard
          v-for="card in featureCards"
          :key="card.title"
          :title="card.title"
          :description="card.description"
          :icon="card.icon"
        />
      </UPageGrid>
    </section>

    <section class="space-y-6">
      <div class="max-w-2xl space-y-2">
        <h2 class="text-3xl font-semibold">Explore the docs</h2>
        <p class="text-base">
          Start with installation, jump into rendering paths, or browse styling guidance and the component catalog.
        </p>
      </div>

      <UPageGrid>
        <UPageCard
          v-for="entry in docsEntries"
          :key="entry.title"
          :title="entry.title"
          :description="entry.description"
          :icon="entry.icon"
          :to="entry.to"
        />
      </UPageGrid>
    </section>

    <section class="space-y-6">
      <div class="max-w-2xl space-y-2">
        <h2 class="text-3xl font-semibold">Workflow</h2>
        <p class="text-base">
          Move from component authoring to final HTML without changing mental models.
        </p>
      </div>

      <UPageGrid>
        <UPageCard
          v-for="item in workflow"
          :key="item.title"
          :title="item.title"
          :description="item.detail"
        />
      </UPageGrid>
    </section>
  </UContainer>
</template>