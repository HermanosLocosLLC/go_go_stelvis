import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // open: true,
    host: '0.0.0.0',
    port: 5150,
    // strictPort: true,
    https: false,
    hmr: {
      protocol: 'ws',
      port: 5150,
      host: '0.0.0.0',
    },
  },
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',

        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
            return 'assets/images/[name]-[hash][extname]'
          }

          if (/\.s?css$/.test(name ?? '')) {
            return 'assets/css/[name]-[hash][extname]'
          }

          // default value
          // ref: https://rollupjs.org/guide/en/#outputassetfilenames
          return 'assets/[name]-[hash][extname]'
        },
      },
    },
  },
  plugins: [react()],
})
