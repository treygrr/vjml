<script setup lang="ts">
import { getDefaultComponentDocsRoute } from '~/composables/useComponentDocs'

const defaultComponentDocsRoute = getDefaultComponentDocsRoute()

const footerLinks = [
  {
    label: 'Getting started',
    to: '/docs/getting-started',
  },
  {
    label: 'Components',
    to: defaultComponentDocsRoute,
  },
]
</script>

<template>
  <UFooter>
    <template #left>
      <div class="space-y-1">
        <p class="font-medium">VJML</p>
        <p class="max-w-xl text-sm">
          Vue-first MJML-style email components with browser previews, generated metadata, and component-focused docs.
        </p>
      </div>
    </template>

    <template #right>
      <div class="flex flex-wrap gap-1">
        <UButton
          v-for="link in footerLinks"
          :key="link.to"
          :to="link.to"
          color="neutral"
          variant="ghost"
          :label="link.label"
        />
      </div>
    </template>
  </UFooter>
</template>