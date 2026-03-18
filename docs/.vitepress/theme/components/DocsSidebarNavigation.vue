<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { useSidebar } from 'vitepress/theme'

const props = withDefaults(defineProps<{
  collapsed?: boolean
}>(), {
  collapsed: false,
})

interface SidebarItem {
  collapsed?: boolean
  items?: SidebarItem[]
  link?: string
  text?: string
}

const ICONS_BY_LABEL: Record<string, string> = {
  Components: 'i-lucide-box',
  Content: 'i-lucide-square-stack',
  Guide: 'i-lucide-compass',
  'Getting Started': 'i-lucide-rocket',
  'Head and Global': 'i-lucide-globe',
  Interactive: 'i-lucide-sparkles',
  Layout: 'i-lucide-panels-top-left',
  Overview: 'i-lucide-layout-dashboard',
  Rendering: 'i-lucide-monitor-play',
  Samples: 'i-lucide-gallery-vertical-end',
  Styling: 'i-lucide-paintbrush',
}

const HASH_RE = /#.*$/
const HASH_OR_QUERY_RE = /[?#].*$/
const INDEX_OR_EXT_RE = /(?:(^|\/)index)?\.(?:md|html)$/
const EXTERNAL_URL_RE = /^(?:[a-z]+:|\/\/)/i

const { page, site } = useData()
const { sidebarGroups } = useSidebar()

function normalizePath(path: string): string {
  return decodeURI(path)
    .replace(HASH_OR_QUERY_RE, '')
    .replace(INDEX_OR_EXT_RE, '$1')
}

function isActiveLink(currentPath: string, matchPath?: string): boolean {
  if (!matchPath) {
    return false
  }

  if (normalizePath(matchPath) !== normalizePath(`/${currentPath}`)) {
    return false
  }

  const hashMatch = matchPath.match(HASH_RE)

  if (hashMatch) {
    return typeof window !== 'undefined' && window.location.hash === hashMatch[0]
  }

  return true
}

function normalizeLink(url: string): string {
  if (EXTERNAL_URL_RE.test(url) || url.startsWith('#')) {
    return url
  }

  const { hash, pathname, search } = new URL(url, 'http://vjml.local')
  const normalizedPath = pathname.endsWith('/') || pathname.endsWith('.html')
    ? `${pathname}${search}${hash}`
    : `${pathname.replace(/(\.md)?$/, site.value.cleanUrls ? '' : '.html')}${search}${hash}`

  return withBase(normalizedPath)
}

function toNavigationItem(item: SidebarItem, value: string): NavigationMenuItem {
  const label = item.text ?? 'Untitled'
  const isComponentLink = item.link?.startsWith('/components/')

  return {
    active: isActiveLink(page.value.relativePath, item.link),
    icon: isComponentLink ? 'i-lucide-file-text' : getItemIcon(label),
    label,
    to: item.link ? normalizeLink(item.link) : undefined,
    value,
  }
}

function getItemIcon(label: string, fallback = 'i-lucide-file-text'): string {
  return ICONS_BY_LABEL[label] ?? fallback
}

const navigationMenuItems = computed<NavigationMenuItem[][]>(() => {
  return sidebarGroups.value.map((group, index) => {
    const groupItem = group as SidebarItem
    const items: NavigationMenuItem[] = [{
      label: groupItem.text ?? 'Navigation',
      type: 'label',
      value: `section-${index}-label`,
    }]

    for (const [itemIndex, item] of (groupItem.items ?? []).entries()) {
      if (item.items?.length) {
        const hasActiveItem = item.items.some(child => isActiveLink(page.value.relativePath, child.link))

        items.push({
          active: hasActiveItem,
          children: item.items.map((child, childIndex) => {
            return toNavigationItem(child, `section-${index}-group-${itemIndex}-${childIndex}`)
          }),
          defaultOpen: item.collapsed === false || hasActiveItem,
          icon: getItemIcon(item.text ?? 'Section'),
          label: item.text ?? 'Section',
          type: 'trigger',
          value: `section-${index}-group-${itemIndex}`,
        })

        continue
      }

      items.push(toNavigationItem(item, `section-${index}-item-${itemIndex}`))
    }

    return items
  })
})
</script>

<template>
  <UNavigationMenu
    v-if="navigationMenuItems.length > 0"
    :key="page.relativePath"
    :collapsed="collapsed"
    :items="navigationMenuItems"
    :popover="collapsed"
    :tooltip="collapsed"
    orientation="vertical"
  />
</template>