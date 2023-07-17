import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import styleInject from '@senojs/rollup-plugin-style-inject';

const config = defineConfig({
  base: './',
  plugins: [
    react(),
    styleInject({
      insertAt: 'top',
    }),
  ],
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
export default config;
