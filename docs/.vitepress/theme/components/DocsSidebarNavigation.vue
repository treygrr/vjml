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
  href?: string
  label: string
  value: string
}

interface SidebarNavigationSection {
  groups: SidebarNavigationGroup[]
  id: string
  items: SidebarNavigationItem[]
  label: string
}

interface SidebarNavigationGroup {
  id: string
  items: SidebarNavigationItem[]
  label: string
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

function toNavigationItem(item: SidebarItem, value: string): SidebarNavigationItem {
  return {
    active: isActiveLink(page.value.relativePath, item.link),
    href: item.link ? normalizeLink(item.link) : undefined,
    label: item.text ?? 'Untitled',
    value,
  }
}

const navigationSections = computed<SidebarNavigationSection[]>(() => {
  return sidebarGroups.value.map((group, index) => {
    const groupItem = group as SidebarItem
    const items: SidebarNavigationItem[] = []
    const nestedGroups: SidebarNavigationGroup[] = []

    for (const [itemIndex, item] of (groupItem.items ?? []).entries()) {
      if (item.items?.length) {
        nestedGroups.push({
          id: `section-${index}-group-${itemIndex}`,
          items: item.items.map((child, childIndex) => {
            return toNavigationItem(child, `section-${index}-group-${itemIndex}-${childIndex}`)
          }),
          label: item.text ?? 'Section',
        })

        continue
      }

      items.push(toNavigationItem(item, `section-${index}-item-${itemIndex}`))
    }

    return {
      groups: nestedGroups,
      id: `section-${index}`,
      items,
      label: groupItem.text ?? 'Navigation',
    }
  })
})
</script>

<template>
  <div v-if="navigationSections.length > 0" class="DocsSidebarNavigation">
    <section
      v-for="section in navigationSections"
      :key="section.id"
      class="space-y-3"
      :aria-labelledby="`${section.id}-label`"
    >
      <div class="px-3">
        <h2 :id="`${section.id}-label`" class="text-xs font-semibold uppercase tracking-wide text-muted">
          {{ section.label }}
        </h2>
      </div>

      <UNavigationMenu
        v-if="section.items.length > 0"
        class="w-full"
        :items="section.items as NavigationMenuItem[]"
        orientation="vertical"
        highlight
      />

      <div
        v-for="group in section.groups"
        :key="group.id"
        class="space-y-1"
        :aria-labelledby="`${group.id}-label`"
      >
        <div class="px-3 pt-2">
          <h3 :id="`${group.id}-label`" class="text-[11px] font-medium uppercase tracking-wide text-dimmed">
            {{ group.label }}
          </h3>
        </div>

        <UNavigationMenu
          class="w-full"
          :items="group.items as NavigationMenuItem[]"
          orientation="vertical"
          highlight
        />
      </div>

      <USeparator v-if="section !== navigationSections[navigationSections.length - 1]" />
    </section>
  </div>
</template>

<style scoped>
.DocsSidebarNavigation {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
</style>