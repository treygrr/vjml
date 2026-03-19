import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      vjml: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
    },
  },
  build: {
    copyPublicDir: false,
    minify: 'esbuild',
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: 'Vjml',
      fileName: (format) => {
        const extension = format === 'es' ? 'js' : 'cjs'

        return `vjml.${extension}`
      },
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
