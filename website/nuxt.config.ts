import { fileURLToPath } from 'node:url'

const workspaceRoot = fileURLToPath(new URL('..', import.meta.url))

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  alias: {
    vjml: fileURLToPath(new URL('../src/index.ts', import.meta.url)),
  },
  ssr: false,
  vite: {
    server: {
      fs: {
        allow: [workspaceRoot],
      },
    },
  },
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
})