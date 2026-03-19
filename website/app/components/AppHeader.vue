<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

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
const route = useRoute()
const githubUrl = 'https://github.com/treygrr/vjml'

const navigationItems = computed<NavigationMenuItem[]>(() => {
  const isComponentDocsRoute = route.path.startsWith('/docs/components')
  const isDocsRoute = route.path === '/docs' || (route.path.startsWith('/docs/') && !isComponentDocsRoute)

  return [
    {
      label: 'Docs',
      to: '/docs',
      icon: 'i-lucide-book-open',
      active: isDocsRoute,
    },
    {
      label: 'Components',
      to: defaultComponentDocsRoute,
      icon: 'i-lucide-library',
      active: isComponentDocsRoute,
    },
  ]
})
</script>

<template>
  <UHeader title="VJML" to="/">
    <UNavigationMenu :items="navigationItems" />

    <template #right>
      <div class="flex items-center gap-2">
        <UContentSearchButton
          v-if="showSearch"
          class="lg:hidden"
        />
        <UContentSearchButton
          v-if="showSearch"
          class="hidden lg:inline-flex"
          :collapsed="false"
        />
        <UButton
          :to="githubUrl"
          target="_blank"
          rel="noreferrer"
          color="neutral"
          variant="ghost"
          icon="i-simple-icons-github"
          label="GitHub"
          class="hidden lg:inline-flex"
        />
        <UButton
          to="/docs/getting-started"
          color="neutral"
          variant="outline"
          label="Get started"
          class="hidden lg:inline-flex"
        />
        <UButton
          to="/docs"
          color="primary"
          label="Open docs"
          trailing-icon="i-lucide-arrow-right"
          class="hidden lg:inline-flex"
        />
      </div>
    </template>

    <template #body>
      <div class="space-y-6">
        <UNavigationMenu
          :items="navigationItems"
          orientation="vertical"
          class="-mx-2.5"
        />

        <template v-if="$slots['mobile-navigation']">
          <USeparator />

          <slot name="mobile-navigation" />
        </template>

        <USeparator />

        <div class="flex flex-col gap-3">
          <UContentSearchButton
            v-if="showSearch"
            :collapsed="false"
            class="w-full justify-center"
          />
          <UButton
            to="/docs/getting-started"
            color="neutral"
            variant="outline"
            label="Get started"
            class="w-full justify-center"
          />
          <UButton
            to="/docs"
            color="primary"
            label="Open docs"
            trailing-icon="i-lucide-arrow-right"
            class="w-full justify-center"
          />
          <UButton
            :to="githubUrl"
            target="_blank"
            rel="noreferrer"
            color="neutral"
            variant="ghost"
            icon="i-simple-icons-github"
            label="GitHub"
            class="w-full justify-center"
          />
        </div>
      </div>
    </template>
  </UHeader>
</template>