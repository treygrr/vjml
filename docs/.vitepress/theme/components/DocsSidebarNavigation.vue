<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { computed, ref, watch } from 'vue'
import { useData, withBase } from 'vitepress'
import { useSidebar } from 'vitepress/theme'

const props = withDefaults(defineProps<{
  collapsed?: boolean
}>(), {
  collapsed: false,
})

interface SidebarItem {
  items?: SidebarItem[]
  link?: string
  text?: string
}

interface SidebarNavigationItem {
  active?: boolean
  labelIcon?: string
  label: string
  to?: string
  value: string
}

interface SidebarNavigationSection {
  groups: SidebarNavigationGroup[]
  id: string
  items: SidebarNavigationItem[]
  label: string
}

interface SidebarNavigationGroup {
  hasActiveItem: boolean
  id: string
  items: SidebarNavigationItem[]
  label: string
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
const openGroups = ref<Record<string, boolean>>({})

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
    labelIcon: item.link?.startsWith('/components/') ? 'i-lucide-file-text' : undefined,
    label: item.text ?? 'Untitled',
    to: item.link ? normalizeLink(item.link) : undefined,
    value,
  }
}

function getItemIcon(label: string, fallback = 'i-lucide-file-text'): string {
  return ICONS_BY_LABEL[label] ?? fallback
}

const navigationSections = computed<SidebarNavigationSection[]>(() => {
  return sidebarGroups.value.map((group, index) => {
    const groupItem = group as SidebarItem
    const items: SidebarNavigationItem[] = []
    const nestedGroups: SidebarNavigationGroup[] = []

    for (const [itemIndex, item] of (groupItem.items ?? []).entries()) {
      if (item.items?.length) {
        nestedGroups.push({
          hasActiveItem: item.items.some(child => isActiveLink(page.value.relativePath, child.link)),
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

watch(
  navigationSections,
  (sections) => {
    const nextOpenGroups = { ...openGroups.value }

    for (const section of sections) {
      for (const group of section.groups) {
        if (group.hasActiveItem) {
          nextOpenGroups[group.id] = true
          continue
        }

        if (!(group.id in nextOpenGroups)) {
          nextOpenGroups[group.id] = false
        }
      }
    }

    openGroups.value = nextOpenGroups
  },
  { immediate: true },
)

function isGroupOpen(group: SidebarNavigationGroup): boolean {
  return openGroups.value[group.id] ?? group.hasActiveItem
}

function getSectionOpenValues(section: SidebarNavigationSection): string[] {
  return section.groups
    .filter(group => isGroupOpen(group))
    .map(group => group.id)
}

function setSectionOpenValues(sectionId: string, value: string | string[] | undefined): void {
  const section = navigationSections.value.find(candidate => candidate.id === sectionId)

  if (!section) {
    return
  }

  const nextOpenValues = new Set(Array.isArray(value) ? value : value ? [value] : [])
  const nextOpenGroups = { ...openGroups.value }

  for (const group of section.groups) {
    nextOpenGroups[group.id] = nextOpenValues.has(group.id)
  }

  openGroups.value = nextOpenGroups
}

function toMenuItems(section: SidebarNavigationSection): NavigationMenuItem[] {
  const items: NavigationMenuItem[] = []

  if (!props.collapsed) {
    items.push({
      label: section.label,
      type: 'label',
      value: `${section.id}-label`,
    })
  }

  for (const item of section.items) {
    items.push({
      active: item.active,
      icon: item.labelIcon ?? getItemIcon(item.label, 'i-lucide-file-text'),
      label: item.label,
      to: item.to,
      value: item.value,
    })
  }

  for (const group of section.groups) {
    items.push({
      active: group.hasActiveItem,
      children: group.items.map(item => ({
        active: item.active,
        icon: item.labelIcon ?? 'i-lucide-file-text',
        label: item.label,
        to: item.to,
        value: item.value,
      })),
      icon: getItemIcon(group.label),
      label: group.label,
      type: 'trigger',
      value: group.id,
    })
  }

  return items
}

const navigationMenuUi = computed(() => {
  return {
    item: 'w-full',
    label: 'px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-highlighted',
    list: 'w-full',
    root: 'w-full',
    content: 'rounded-lg border border-default bg-default shadow-lg',
    link: props.collapsed ? 'justify-center' : 'justify-start',
  }
})
</script>

<template>
  <div v-if="navigationSections.length > 0" class="DocsSidebarNavigation">
    <UNavigationMenu
      v-for="section in navigationSections"
      :key="section.id"
      :collapsed="collapsed"
      :items="toMenuItems(section)"
      :model-value="getSectionOpenValues(section)"
      :popover="collapsed"
      :tooltip="collapsed"
      :ui="navigationMenuUi"
      class="w-full"
      color="neutral"
      highlight
      orientation="vertical"
      type="multiple"
      @update:model-value="setSectionOpenValues(section.id, $event)"
    />
  </div>
</template>

<style scoped>
.DocsSidebarNavigation {
  display: flex;
  flex-direction: column;
	gap: 0.75rem;
}
</style>