import path from 'path';
import { defineConfig } from 'vitest/config';
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
    // Warm the lazy one-time ICU init behind Intl.* so it never lands inside a test's timeout window
    // on a slow CI worker. This workspace's intl/* tests construct Intl.NumberFormat/DateTimeFormat/
    // Collator directly. Shares the repo-root setup file. See vitest.setup.ts for rationale.
    setupFiles: [path.resolve(__dirname, '../../vitest.setup.ts')],
  },
});
export default config;
