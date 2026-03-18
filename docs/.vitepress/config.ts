import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vitepress'

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'vjml'
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true'

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
      { text: 'Components', link: '/components/layout' },
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
        items: [
          { text: 'Layout', link: '/components/layout' },
          { text: 'Content', link: '/components/content' },
          { text: 'Head and Global', link: '/components/head-and-global' },
          { text: 'Interactive', link: '/components/interactive' },
        ],
      },
    ],
  },
  title: 'VJML',
  vite: {
    resolve: {
      alias: {
        '@samples': fileURLToPath(new URL('../../test/samples', import.meta.url)),
        '@src': fileURLToPath(new URL('../../src', import.meta.url)),
        vjml: fileURLToPath(new URL('../../src/index.ts', import.meta.url)),
      },
    },
  },
})