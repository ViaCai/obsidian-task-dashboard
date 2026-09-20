import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { resolve } from 'path'

export default defineConfig({
  plugins: [svelte()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      formats: ['cjs'],
      fileName: () => 'main.js'
    },
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      external: ['obsidian']
    }
  }
})
