export const COMPONENT_DOC_GROUPS = [
  {
    slug: 'document-shell',
    title: 'Document shell',
    description: 'Root tags, document metadata, and preview-level helpers.',
    tags: ['mjml', 'mj-head', 'mj-body', 'mj-title', 'mj-preview'],
  },
  {
    slug: 'layout',
    title: 'Layout',
    description: 'Primary structure and spacing primitives for arranging email content.',
    tags: ['mj-wrapper', 'mj-section', 'mj-group', 'mj-column', 'mj-hero', 'mj-divider', 'mj-spacer'],
  },
  {
    slug: 'content',
    title: 'Content',
    description: 'Renderable leaf content and common CTA building blocks.',
    tags: ['mj-text', 'mj-button', 'mj-image', 'mj-table'],
  },
  {
    slug: 'head-and-global',
    title: 'Head and global',
    description: 'Head-level controls, defaults, and HTML-targeting helpers.',
    tags: ['mj-font', 'mj-style', 'mj-attributes', 'mj-all', 'mj-class', 'mj-selector', 'mj-breakpoint', 'mj-html-attributes', 'mj-html-attribute', 'mj-raw'],
  },
  {
    slug: 'interactive',
    title: 'Interactive',
    description: 'Accordion, carousel, navbar, and social structures with their companion child tags.',
    tags: ['mj-accordion', 'mj-accordion-element', 'mj-accordion-title', 'mj-accordion-text', 'mj-carousel', 'mj-carousel-image', 'mj-navbar', 'mj-navbar-link', 'mj-social', 'mj-social-element'],
  },
] as const

export const COMPONENT_DOCS_GROUP_ROUTE = '/docs/components'

const COMPONENT_DOC_GROUP_BY_TAG = new Map(
  COMPONENT_DOC_GROUPS.flatMap(group => group.tags.map(tag => [tag, group.slug] as const)),
)

function getComponentDocLeaf(tagName: string): string {
  return tagName.replace(/^mj-/, '')
}

export function getComponentDocGroupSlug(tagName: string): string | undefined {
  return COMPONENT_DOC_GROUP_BY_TAG.get(tagName)
}

export function getComponentDocsRoute(tagName: string): string {
  const groupSlug = getComponentDocGroupSlug(tagName)
  const leaf = getComponentDocLeaf(tagName)

  return groupSlug
    ? `/docs/components/${groupSlug}/${leaf}`
    : `/docs/components/${leaf}`
}

export function getDefaultComponentDocsRoute(): string {
  return getComponentDocsRoute(COMPONENT_DOC_GROUPS[0].tags[0])
}

const COMPONENT_DOC_NAV_ORDER = COMPONENT_DOC_GROUPS.flatMap(group => [
  `/docs/components/${group.slug}`,
  ...group.tags.map(tag => getComponentDocsRoute(tag)),
])

const COMPONENT_DOC_NAV_ORDER_INDEX = new Map(
  COMPONENT_DOC_NAV_ORDER.map((path, index) => [path, index]),
)

export function getComponentDocsNavigationOrder(path: string): number | undefined {
  return COMPONENT_DOC_NAV_ORDER_INDEX.get(path)
}