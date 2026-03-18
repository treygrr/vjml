import type { ContentNavigationItem } from '@nuxt/content'
import {
  COMPONENT_DOCS_GROUP_ROUTE,
  getComponentDocsNavigationOrder,
} from '~/composables/useComponentDocs'

const DOCS_PREFIX = '/docs'
const TOP_LEVEL_NAV_ORDER = [
  '/docs',
  '/docs/getting-started',
  '/docs/rendering',
  '/docs/styling',
  '/docs/contributing',
  COMPONENT_DOCS_GROUP_ROUTE,
] as const

const TOP_LEVEL_NAV_INDEX = new Map<string, number>(
  TOP_LEVEL_NAV_ORDER.map((path, index) => [path, index]),
)

type DocsSearchFile = {
  id: string
  title: string
  titles: string[]
  level: number
  content: string
}

export function getDocsRoutePath(contentPath: string): string {
  const [pathname = '', hash] = contentPath.split('#')
  const normalizedPath = pathname === '/' ? '' : pathname.replace(/\/$/, '')
  const basePath = normalizedPath ? `${DOCS_PREFIX}${normalizedPath}` : DOCS_PREFIX

  return hash ? `${basePath}#${hash}` : basePath
}

export function getDocsContentPath(routePath: string): string {
  const strippedPath = routePath.startsWith(DOCS_PREFIX)
    ? routePath.slice(DOCS_PREFIX.length)
    : routePath
  const normalizedPath = strippedPath.replace(/\/$/, '')

  return normalizedPath || '/'
}

function mapNavigationItem(item: ContentNavigationItem): ContentNavigationItem {
  return {
    ...item,
    path: getDocsRoutePath(item.path),
    children: item.children
      ?.map(mapNavigationItem)
      .sort(compareNavigationItems),
  }
}

function compareNavigationItems(a: ContentNavigationItem, b: ContentNavigationItem): number {
  const aIndex = TOP_LEVEL_NAV_INDEX.get(a.path)
  const bIndex = TOP_LEVEL_NAV_INDEX.get(b.path)

  const aComponentIndex = getComponentDocsNavigationOrder(a.path)
  const bComponentIndex = getComponentDocsNavigationOrder(b.path)

  if (aIndex !== undefined || bIndex !== undefined) {
    if (aIndex === undefined) {
      return 1
    }

    if (bIndex === undefined) {
      return -1
    }

    return aIndex - bIndex
  }

  if (aComponentIndex !== undefined || bComponentIndex !== undefined) {
    if (aComponentIndex === undefined) {
      return 1
    }

    if (bComponentIndex === undefined) {
      return -1
    }

    return aComponentIndex - bComponentIndex
  }

  return a.title.localeCompare(b.title)
}

export function toDocsNavigation(items: ContentNavigationItem[]): ContentNavigationItem[] {
  return items
    .map(mapNavigationItem)
    .sort(compareNavigationItems)
}

export function toDocsSearchFiles(files: DocsSearchFile[]): DocsSearchFile[] {
  return files.map(file => ({
    ...file,
    id: getDocsRoutePath(file.id),
  }))
}

export function findDocsTrail(
  items: ContentNavigationItem[],
  targetPath: string,
): ContentNavigationItem[] {
  for (const item of items) {
    if (item.path === targetPath) {
      return [item]
    }

    if (item.children?.length) {
      const childTrail = findDocsTrail(item.children, targetPath)

      if (childTrail.length) {
        return [item, ...childTrail]
      }
    }
  }

  return []
}

export async function useDocsPage() {
  const route = useRoute()
  const contentPath = computed(() => getDocsContentPath(route.path))

  const page = await useAsyncData(
    () => `docs-page:${contentPath.value}`,
    () => queryCollection('content').path(contentPath.value).first(),
    {
      watch: [contentPath],
    },
  )

  return {
    ...page,
    contentPath,
  }
}