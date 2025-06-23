import path from 'path';
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react-swc';
import styleInject from '@senojs/rollup-plugin-style-inject';
import { peerDependencies, dependencies } from './package.json';

const config = defineConfig({
  base: './',
  plugins: [
    tsconfigPaths(),
    react(),
    styleInject({
      // Insert the platform-bible-react styles after all other style tags so the color variables and
      // tailwind classes from platform-bible-react override those from extensions for consistency
      insertAt: 'after-all',
    }),
  ],
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : format}`,
    },
    rollupOptions: {
      external: [
        ...Object.keys(peerDependencies ?? {}),
        ...Object.keys(dependencies ?? {}),
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
export default config;
