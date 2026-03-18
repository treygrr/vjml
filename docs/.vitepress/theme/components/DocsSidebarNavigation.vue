<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { useSidebar } from 'vitepress/theme'

interface SidebarItem {
  items?: SidebarItem[]
  link?: string
  text?: string
}

interface SidebarNavigationItem {
  active?: boolean
  children?: SidebarNavigationItem[]
  defaultOpen?: boolean
  href?: string
  label: string
  value: string
}

defineProps<{
  collapsed?: boolean
}>()

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

function toNavigationItem(item: SidebarItem, value: string): SidebarNavigationItem {
  const children = item.items?.map((child, index) => toNavigationItem(child, `${value}-${index}`))
  const active = isActiveLink(page.value.relativePath, item.link)
  const hasActiveChild = children?.some(child => child.active || child.defaultOpen) ?? false

  return {
    active: active || hasActiveChild,
    children,
    defaultOpen: children?.length ? hasActiveChild : undefined,
    href: item.link ? normalizeLink(item.link) : undefined,
    label: item.text ?? 'Untitled',
    value,
  }
}

const navigationItems = computed(() => {
  return sidebarGroups.value.flatMap((group, index) => {
    const groupItem = group as SidebarItem

    if (!groupItem.text) {
      return groupItem.items?.map((item, itemIndex) => {
        return toNavigationItem(item, `group-${index}-${itemIndex}`)
      }) ?? []
    }

    return [toNavigationItem(groupItem, `group-${index}`)]
  })
})
</script>

<template>
  <UNavigationMenu
    v-if="navigationItems.length > 0"
    class="VPNuxtSidebarNav w-full"
    :items="navigationItems as NavigationMenuItem[]"
    :collapsed="collapsed"
    collapsible
    orientation="vertical"
    popover
    tooltip
    type="multiple"
  />
</template>