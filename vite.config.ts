import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import type { PluginOption } from 'vite';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    }) as PluginOption,
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            // Core libraries
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            
            // UI/Icon libraries
            if (id.includes('lucide-react')) return 'vendor-icons';
            if (id.includes('@mui') || id.includes('@emotion')) return 'vendor-mui';
            if (id.includes('framer-motion')) return 'vendor-animations';
            
            // Utility libraries
            if (id.includes('lodash')) return 'vendor-lodash';
            if (id.includes('date-fns')) return 'vendor-dates';
            if (id.includes('axios')) return 'vendor-axios';
            
            // Group remaining medium-sized libs
            if (id.includes('zod') || id.includes('recharts')) return 'vendor-utils';
            
            // Everything else
            return 'vendor-misc';
          }
          
          // Split your own code by routes/pages if using SPA
          if (id.includes('src/pages/')) {
            const match = id.match(/src\/pages\/([^\/]+)/);
            return match ? `page-${match[1]}` : undefined;
          }
        },
      },
    },
    chunkSizeWarningLimit: 800,
    // Using esbuild as default minifier (faster and doesn't require additional installation)
    minify: 'esbuild',
    // Optional: For even smaller builds (requires terser installation)
    // minify: 'terser',
    // terserOptions: {
    //   compress: {
    //     drop_console: true,
    //   },
    // },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      // Add other frequently used pure ESM packages here
    ],
    exclude: [
      'lucide-react',
      // Add other large libraries that don't need pre-bundling
    ],
  },
});