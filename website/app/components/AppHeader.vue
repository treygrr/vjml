<script setup lang="ts">
import { getDefaultComponentDocsRoute } from '~/composables/useComponentDocs'

const props = withDefaults(
  defineProps<{
    showSearch?: boolean
  }>(),
  {
    showSearch: false,
  },
)

const defaultComponentDocsRoute = getDefaultComponentDocsRoute()

const navigationItems = [
  {
    label: 'Docs',
    to: '/docs',
    icon: 'i-lucide-book-open',
  },
  {
    label: 'Components',
    to: defaultComponentDocsRoute,
    icon: 'i-lucide-library',
  },
]
</script>

<template>
  <UHeader title="VJML" to="/">
    <template #default>
      <div class="hidden items-center gap-1 lg:flex">
        <UButton
          v-for="item in navigationItems"
          :key="item.to"
          :to="item.to"
          color="neutral"
          variant="ghost"
          :label="item.label"
        />
      </div>
    </template>

    <template #right>
      <div class="flex items-center gap-2">
        <UContentSearchButton
          v-if="showSearch"
          class="hidden sm:inline-flex"
          :collapsed="false"
        />
        <UContentSearchButton
          v-if="showSearch"
          class="sm:hidden"
        />
        <UButton
          to="https://github.com/treygrr/vjml"
          target="_blank"
          rel="noreferrer"
          color="neutral"
          variant="ghost"
          icon="i-simple-icons-github"
          aria-label="Open VJML on GitHub"
          class="sm:hidden"
        />
        <UButton
          to="https://github.com/treygrr/vjml"
          target="_blank"
          rel="noreferrer"
          color="neutral"
          variant="ghost"
          icon="i-simple-icons-github"
          label="GitHub"
          class="hidden sm:inline-flex"
        />
        <UButton
          to="/docs/getting-started"
          color="neutral"
          variant="outline"
          label="Get started"
          class="hidden sm:inline-flex"
        />
        <UButton
          to="/docs"
          color="primary"
          label="Open docs"
          trailing-icon="i-lucide-arrow-right"
        />
      </div>
    </template>

    <template #content>
      <UPageLinks title="Navigation" :links="navigationItems" />
    </template>
  </UHeader>
</template>