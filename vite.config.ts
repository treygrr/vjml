import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    copyPublicDir: false,
    lib: {
      entry: {
        index: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
        server: fileURLToPath(new URL('./src/server.ts', import.meta.url)),
      },
      name: 'Vjml',
      fileName: (format, entryName) => {
        const extension = format === 'es' ? 'js' : 'cjs'

        return `${entryName === 'index' ? 'vjml' : entryName}.${extension}`
      },
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['cheerio', 'parse5', 'vue', 'vue/server-renderer'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
