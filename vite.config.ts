import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react({
      // Enable React Fast Refresh
      fastRefresh: true,
      // Exclude node_modules from transformation
      exclude: /node_modules/,
    }),
    tailwindcss(),
  ],
  
  // Path aliases for clean imports
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@pages': resolve(__dirname, './src/pages'),
      '@utils': resolve(__dirname, './src/utils'),
      '@assets': resolve(__dirname, './src/assets'),
    },
  },

  // Performance optimizations
  build: {
    // Enable source maps for production debugging
    sourcemap: true,
    // Optimize chunk splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks
          vendor: ['react', 'react-dom'],
          // Separate GSAP into its own chunk
          gsap: ['gsap'],
          // Separate Lucide icons
          icons: ['lucide-react'],
        },
      },
    },
    // Target modern browsers for better performance
    target: 'esnext',
    // Minify for production
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },

  // Development server optimizations
  server: {
    // Enable HMR
    hmr: true,
    // Open browser automatically
    open: true,
    // Set port
    port: 5173,
    // Enable CORS
    cors: true,
  },

  // CSS optimizations
  css: {
    devSourcemap: true,
    postcss: {
      plugins: [],
    },
  },

  // Define environment variables
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
  },

  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'gsap', 'lucide-react'],
    exclude: ['@vite/client', '@vite/env'],
  },
})