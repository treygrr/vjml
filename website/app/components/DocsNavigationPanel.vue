<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { COMPONENT_DOCS_GROUP_ROUTE } from '~/composables/useComponentDocs'
import { useRoute } from '#imports'

type DocsNavigationMenuItem = {
  label: string
  to?: string
  type?: 'label' | 'link' | 'trigger'
  children?: DocsNavigationMenuItem[]
  defaultOpen?: boolean
  active?: boolean
}

const props = defineProps<{
  navigation: ContentNavigationItem[]
}>()

const route = useRoute()

const documentationNavigation = computed(() => {
  return props.navigation.filter(item => item.path !== COMPONENT_DOCS_GROUP_ROUTE)
})

const componentNavigation = computed(() => {
  return props.navigation.find(item => item.path === COMPONENT_DOCS_GROUP_ROUTE)?.children ?? []
})

function isRouteInTree(item: ContentNavigationItem): boolean {
  return item.path === route.path || item.children?.some(child => isRouteInTree(child)) === true
}

function toNavigationMenuItem(item: ContentNavigationItem): DocsNavigationMenuItem {
  const children = item.children?.map(toNavigationMenuItem)
  const isActive = isRouteInTree(item)

  return {
    label: item.title,
    ...(item.page === false ? {} : { to: item.path }),
    ...(children?.length ? { children, defaultOpen: isActive } : {}),
    ...(item.page === false ? { active: isActive } : {}),
  }
}

const navigationItems = computed<DocsNavigationMenuItem[]>(() => {
  const items: DocsNavigationMenuItem[] = []

  if (documentationNavigation.value.length) {
    items.push({
      label: 'Documentation',
      type: 'label',
    })
    items.push(...documentationNavigation.value.map(toNavigationMenuItem))
  }

  if (componentNavigation.value.length) {
    items.push({
      label: 'Components',
      type: 'label',
    })
    items.push(...componentNavigation.value.map(toNavigationMenuItem))
  }

  return items
})
</script>

<template>
  <UNavigationMenu
    :items="navigationItems"
    orientation="vertical"
    highlight
  />
</template>