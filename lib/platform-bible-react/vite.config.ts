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
  build: {
    // Source maps are generated on every build but gitignored: they are single-line files that
    // would conflict on every change. Never toggle this by environment; the committed scripts must
    // end with the same `sourceMappingURL` comment whether or not a map exists.
    sourcemap: true,
    // Unminified output keeps `dist/` line-based, so git can merge unrelated library changes.
    minify: false,
    lib: {
      entry: {
        index: path.resolve(__dirname, 'src/index.ts'),
        experimental: path.resolve(__dirname, 'src/experimental.ts'),
      },
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
      // Chunk names carry no content hash, so a changed chunk keeps its file name instead of two
      // branches adding different files. CommonJS needs `.cjs` because the package is ESM.
      output: [
        {
          format: 'es',
          chunkFileNames: '[name].js',
          globals: { react: 'React', 'react-dom': 'ReactDOM' },
        },
        {
          format: 'cjs',
          chunkFileNames: '[name].cjs',
          globals: { react: 'React', 'react-dom': 'ReactDOM' },
        },
      ],
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
export default config;
