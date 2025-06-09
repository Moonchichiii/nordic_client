// vite.config.ts - Updated with better aliases and optimization
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react({
      fastRefresh: true,
      exclude: /node_modules/,
      jsxRuntime: 'automatic',
      babel: {
        plugins: [
          // Remove all console.* calls in production
          ...(process.env.NODE_ENV === 'production'
            ? [['babel-plugin-transform-remove-console']]
            : [])
        ]
      }
    }),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@pages': resolve(__dirname, './src/pages'),
      '@utils': resolve(__dirname, './src/utils'),
      '@hooks': resolve(__dirname, './src/hooks'),
      '@types': resolve(__dirname, './src/types'),
      '@constants': resolve(__dirname, './src/constants'),
      '@assets': resolve(__dirname, './src/assets'),
    },
  },

  build: {
    sourcemap: process.env.NODE_ENV === 'development',
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-error-boundary'],
          'animation-vendor': ['gsap'],
          'ui-vendor': ['lucide-react'],
          
          // Page chunks
          'pages-critical': [
            './src/pages/Hero.tsx',
            './src/pages/Work.tsx'
          ],
          'pages-secondary': [
            './src/pages/Process.tsx',
            './src/pages/About.tsx',
            './src/pages/Contact.tsx'
          ],
          
          // Component chunks
          'components-layout': [
            './src/components/Layout.tsx',
            './src/components/Navbar.tsx',
            './src/components/Footer.tsx'
          ],
          'components-interactive': [
            './src/components/MenuOverlay.tsx',
            './src/components/CookieConsent.tsx'
          ]
        },
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || []
          const ext = info[info.length - 1]
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name || '')) {
            return `images/[name]-[hash].${ext}`
          }
          if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name || '')) {
            return `fonts/[name]-[hash].${ext}`
          }
          return `assets/[name]-[hash].${ext}`
        }
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        dead_code: true,
        loops: true,
        pure_funcs: ['console.log', 'console.info'],
      },
      mangle: {
        keep_fnames: false,
        keep_classnames: false,
      },
      format: {
        comments: false,
      }
    },
    cssMinify: true,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 600, // Stricter limit
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
  },

  server: {
    hmr: {
      overlay: true,
    },
    open: true,
    port: 5173,
    strictPort: false,
    cors: true,
    preTransformRequests: true,
  },

  preview: {
    port: 4173,
    cors: true,
    open: true,
  },

  css: {
    devSourcemap: true,
    postcss: {
      plugins: [],
    },
    modules: {
      localsConvention: 'camelCase',
    },
  },

  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
  },

  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-dom/client',
      'react-error-boundary',
      'lucide-react',
    ],
    exclude: [
      'gsap',
      '@vite/client',
      '@vite/env'
    ],
    force: false,
    esbuildOptions: {
      target: 'esnext',
      supported: {
        'top-level-await': true,
      },
    },
  },

  experimental: {
    renderBuiltUrl: (filename, { hostType }) => {
      if (hostType === 'js') {
        return { js: `/${filename}` }
      } else {
        return { relative: true }
      }
    },
  },

  json: {
    namedExports: true,
    stringify: false,
  },

  worker: {
    format: 'es',
    rollupOptions: {
      output: {
        chunkFileNames: 'workers/[name]-[hash].js',
      }
    }
  },

  envPrefix: ['VITE_', 'REACT_APP_'],
  base: './',
  assetsInclude: ['**/*.glb', '**/*.gltf'],
  logLevel: 'info',
  clearScreen: true,
})