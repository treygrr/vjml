import { fileURLToPath, URL } from 'node:url'

import ui from '@nuxt/ui/vite'
import { defineConfig } from 'vitepress'

import { VJML_COMPONENT_METADATA } from '../../src/metadata'

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'vjml'
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true'
const componentMetadataByTagName = new Map(
  VJML_COMPONENT_METADATA.map(metadata => [metadata.tagName, metadata] as const),
)

const componentGroupDefinitions = [
  {
    tags: ['mjml', 'mj-body', 'mj-wrapper', 'mj-section', 'mj-group', 'mj-column'],
    text: 'Layout',
  },
  {
    tags: ['mj-hero', 'mj-image', 'mj-text', 'mj-button', 'mj-divider', 'mj-spacer', 'mj-table'],
    text: 'Content',
  },
  {
    tags: ['mj-head', 'mj-title', 'mj-preview', 'mj-font', 'mj-style', 'mj-breakpoint', 'mj-attributes', 'mj-all', 'mj-class', 'mj-html-attributes', 'mj-selector', 'mj-html-attribute', 'mj-raw'],
    text: 'Head and Global',
  },
  {
    tags: ['mj-accordion', 'mj-accordion-element', 'mj-accordion-title', 'mj-accordion-text', 'mj-carousel', 'mj-carousel-image', 'mj-navbar', 'mj-navbar-link', 'mj-social', 'mj-social-element'],
    text: 'Interactive',
  },
] as const

function getComponentLink(tagName: string): string {
  return tagName === 'mjml'
    ? '/components/mjml'
    : `/components/${tagName.slice(3)}`
}

function getComponentSidebarItem(tagName: string) {
  const metadata = componentMetadataByTagName.get(tagName)

  if (!metadata) {
    throw new Error(`Missing component metadata for ${tagName}.`)
  }

  return {
    link: getComponentLink(tagName),
    text: metadata.componentBaseName,
  }
}

const groupedComponentTagNames = new Set(
  componentGroupDefinitions.flatMap(group => group.tags),
)
const ungroupedComponentTagNames = VJML_COMPONENT_METADATA
  .map(metadata => metadata.tagName)
  .filter(tagName => !groupedComponentTagNames.has(tagName))

if (ungroupedComponentTagNames.length > 0) {
  throw new Error(
    `Ungrouped component docs detected: ${ungroupedComponentTagNames.join(', ')}`,
  )
}

const componentSidebarItems = [
  { text: 'Overview', link: '/components/' },
  ...componentGroupDefinitions.map(group => ({
    collapsed: true,
    items: group.tags.map(getComponentSidebarItem),
    text: group.text,
  })),
]

export default defineConfig({
  appearance: false,
  base: isGitHubActions ? `/${repositoryName}/` : '/',
  description: 'Vue MJML-style email components with browser previews and parity-tested HTML output.',
  head: [
    ['meta', { content: '#16353f', name: 'theme-color' }],
  ],
  lang: 'en-US',
  lastUpdated: true,
  themeConfig: {
    footer: {
      copyright: 'Released for the VJML project.',
      message: 'Built with VitePress and powered by the local VJML runtime.',
    },
    nav: [
      { text: 'Get Started', link: '/getting-started' },
      { text: 'Rendering', link: '/rendering' },
      { text: 'Styling', link: '/styling' },
      { text: 'Components', link: '/components/' },
      { text: 'Samples', link: '/samples' },
    ],
    outline: {
      level: [2, 3],
      label: 'On this page',
    },
    search: {
      provider: 'local',
    },
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'Rendering', link: '/rendering' },
          { text: 'Styling', link: '/styling' },
          { text: 'Samples', link: '/samples' },
        ],
      },
      {
        text: 'Components',
        items: componentSidebarItems,
      },
    ],
  },
  title: 'VJML',
  vite: {
    plugins: [
      ui({
        colorMode: false,
        prose: true,
        router: false,
        ui: {
          colors: {
            neutral: 'slate',
            primary: 'orange',
          },
        },
      }),
    ],
    resolve: {
      alias: {
        '@samples': fileURLToPath(new URL('../../test/samples', import.meta.url)),
        '@src': fileURLToPath(new URL('../../src', import.meta.url)),
        vjml: fileURLToPath(new URL('../../src/index.ts', import.meta.url)),
      },
    },
  },
})