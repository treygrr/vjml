<script setup lang="ts">
import { getDefaultComponentDocsRoute } from '~/composables/useComponentDocs'
import { useDocsToc } from '~/composables/useDocsToc'

const route = useRoute()
const showMobileNavigation = ref(false)
const defaultComponentDocsRoute = getDefaultComponentDocsRoute()
const pageContentRef = ref<HTMLElement | null>(null)

const quickLinks = [
  {
    label: 'Landing page',
    to: '/',
    icon: 'i-lucide-house',
  },
  {
    label: 'Getting started',
    to: '/docs/getting-started',
    icon: 'i-lucide-rocket',
  },
  {
    label: 'Components',
    to: defaultComponentDocsRoute,
    icon: 'i-lucide-library',
  },
]

const { data: rawNavigation } = await useAsyncData('docs-navigation', () => {
  return queryCollectionNavigation('content')
})

const { data: rawSearchFiles } = await useAsyncData('docs-search-files', () => {
  return queryCollectionSearchSections('content')
})

const docsNavigation = computed(() => {
  return toDocsNavigation(rawNavigation.value ?? [])
})

const searchFiles = computed(() => {
  return toDocsSearchFiles(rawSearchFiles.value ?? [])
})

const breadcrumbItems = computed(() => {
  if (route.path === '/docs') {
    return []
  }

  const trail = findDocsTrail(docsNavigation.value, route.path)
    .filter(item => item.path !== '/docs')
    .map(item => {
      if (item.page === false) {
        return {
          label: item.title,
        }
      }

      return {
        label: item.title,
        to: item.path,
      }
    })

  return [
    {
      label: 'Docs',
      to: '/docs',
    },
    ...trail,
  ]
})

const { tocLinks } = useDocsToc(pageContentRef)
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <UContentSearch
      :links="quickLinks"
      :navigation="docsNavigation"
      :files="searchFiles"
    />

    <AppHeader :show-search="true" />

    <main class="flex-1">
      <UContainer>
        <div class="space-y-4 lg:hidden">
          <UButton
            color="neutral"
            variant="outline"
            label="Browse docs"
            :trailing-icon="showMobileNavigation ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
            @click="showMobileNavigation = !showMobileNavigation"
          />

          <DocsNavigationPanel
            v-if="showMobileNavigation"
            :navigation="docsNavigation"
          />
        </div>

        <UPage>
          <template #left>
            <UPageAside class="hidden lg:block">
              <DocsNavigationPanel :navigation="docsNavigation" />
            </UPageAside>
          </template>

          <div ref="pageContentRef" class="space-y-6 mt-8">
            <UBreadcrumb v-if="breadcrumbItems.length" :items="breadcrumbItems" />

            <slot />
          </div>

          <template #right>
            <UPageAside v-if="tocLinks.length" class="hidden xl:block">
              <UContentToc
                title="On this page"
                :links="tocLinks"
                highlight
              />
            </UPageAside>
          </template>
        </UPage>
      </UContainer>
    </main>

    <AppFooter />
  </div>
</template>