<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'

interface ThemeNavItem {
  link?: string
  text?: string
}

const HASH_OR_QUERY_RE = /[?#].*$/
const INDEX_OR_EXT_RE = /(?:(^|\/)index)?\.(?:md|html)$/
const EXTERNAL_URL_RE = /^(?:[a-z]+:|\/\/)/i

const { page, site, theme } = useData()

function normalizePath(path: string): string {
  return decodeURI(path)
    .replace(HASH_OR_QUERY_RE, '')
    .replace(INDEX_OR_EXT_RE, '$1')
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

function isActiveLink(currentPath: string, matchPath?: string): boolean {
  if (!matchPath || EXTERNAL_URL_RE.test(matchPath)) {
    return false
  }

  return normalizePath(matchPath) === normalizePath(`/${currentPath}`)
}

const items = computed<NavigationMenuItem[]>(() => {
  return ((theme.value.nav as ThemeNavItem[] | undefined) ?? []).map((item, index) => ({
    active: isActiveLink(page.value.relativePath, item.link),
    label: item.text ?? `Item ${index + 1}`,
    target: item.link && EXTERNAL_URL_RE.test(item.link) ? '_blank' : undefined,
    to: item.link ? normalizeLink(item.link) : undefined,
    value: `nav-${index}`,
  }))
})
</script>

<template>
  <UNavigationMenu
    v-if="items.length > 0"
    :items="items"
    highlight
    class="w-full"
  />
</template>