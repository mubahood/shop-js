import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    port: 5173,
    host: true,
    hmr: {
      overlay: true
    },
    watch: {
      usePolling: true
    }
  },
  define: {
    global: 'globalThis',
  },
  optimizeDeps: {
    exclude: ['bootstrap-icons']
  },
  build: {
    chunkSizeWarningLimit: 3000,
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser',
    target: 'es2015',
    sourcemap: false, // Disable source maps for production
    cssCodeSplit: true,
    emptyOutDir: true,
    rollupOptions: {
      output: {
        // Enhanced manual chunking for better caching
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-redux': ['@reduxjs/toolkit', 'react-redux'],
          'vendor-bootstrap': ['react-bootstrap', 'bootstrap'],
          'vendor-ui': ['lucide-react', '@fortawesome/react-fontawesome', '@fortawesome/fontawesome-svg-core', '@fortawesome/free-solid-svg-icons'],
          'vendor-router': ['react-router-dom'],
          'vendor-query': ['@tanstack/react-query', '@tanstack/react-query-devtools'],
          'vendor-table': ['@tanstack/react-table'],
          'vendor-utils': ['axios', 'clsx', 'react-helmet-async', 'react-intl', 'react-toastify'],
          'vendor-media': ['swiper', 'react-lazy-load-image-component', 'react-share'],
          'vendor-icons': ['react-icons']
        },
        // Optimize asset naming for caching
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
          if (facadeModuleId && facadeModuleId.includes('node_modules')) {
            return 'vendor/[name].[hash].js'
          }
          return 'js/[name].[hash].js'
        },
        entryFileNames: 'js/[name].[hash].js',
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || ''
          if (/\.(gif|jpe?g|png|svg|webp)$/.test(name)) {
            return 'images/[name].[hash].[ext]'
          }
          if (/\.css$/.test(name)) {
            return 'css/[name].[hash].[ext]'
          }
          return 'assets/[name].[hash].[ext]'
        }
      },
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
        reduce_vars: true,
        reduce_funcs: true,
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false,
      },
    },
  },
})
