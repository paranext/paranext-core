import path from 'path';
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react-swc';
import styleInject from '@senojs/rollup-plugin-style-inject';
import packageInfo from './package.json';
import rootPackageInfo from '../../package.json';

// peerDependencies might not be in package.json, but that's fine. Just account for that
const packageInfoFull: typeof packageInfo & {
  peerDependencies?: Record<string, unknown>;
} = packageInfo;
const rootPackageInfoFull: typeof rootPackageInfo & {
  peerDependencies?: Record<string, unknown>;
} = rootPackageInfo;

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
  // React builds the component stack an error boundary logs out of function and class names, and
  // this package is consumed through its committed `dist`, so a name esbuild mangles here is gone
  // before the app's own minifier (which keeps names) ever sees it. Top-level, so it covers the
  // dev/Storybook and Vitest transforms too; only the `dist` build ships. See
  // `adr-keep-component-names-in-packaged-bundles` in `.context/standards/Architecture-Decisions.md`.
  esbuild: {
    keepNames: true,
  },
  build: {
    sourcemap: true,
    lib: {
      entry: {
        index: path.resolve(__dirname, 'src/index.ts'),
        experimental: path.resolve(__dirname, 'src/experimental.ts'),
      },
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => `${entryName}.${format === 'es' ? 'js' : format}`,
    },
    rollupOptions: {
      external: [
        ...Object.keys(packageInfoFull.peerDependencies ?? {}),
        ...Object.keys(packageInfoFull.dependencies ?? {}),
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        ...Object.keys(rootPackageInfoFull.peerDependencies ?? {}),
        ...Object.keys(rootPackageInfoFull.dependencies ?? {}),
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
