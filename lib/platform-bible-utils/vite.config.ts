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

const externalPackages = [
  ...Object.keys(packageInfoFull.peerDependencies ?? {}),
  ...Object.keys(packageInfoFull.dependencies ?? {}),
  ...Object.keys(rootPackageInfoFull.peerDependencies ?? {}),
  ...Object.keys(rootPackageInfoFull.dependencies ?? {}),
];

const config = defineConfig({
  base: './',
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
      // Keep dependencies external, including when imported through a subpath. Rollup compares an
      // `external` string to the whole import specifier, so a bare package name never matches
      // `package/subpath` and the dependency gets bundled instead — silently, since the build
      // still succeeds. `unicode-segmenter/grapheme` was vendored into `dist` that way, which also
      // hid it from `npm audit`. Matching on a prefix keeps every subpath external.
      external: externalPackages.map(
        (name) => new RegExp(`^${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:/|$)`),
      ),
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
    // Warm the lazy one-time ICU init behind Intl.* so it never lands inside a test's timeout window
    // on a slow CI worker. This workspace's intl/* tests construct Intl.NumberFormat/DateTimeFormat/
    // Collator directly. Shares the repo-root setup file. See vitest.setup.ts for rationale.
    setupFiles: [
      path.resolve(__dirname, '../../vitest.setup.ts'),
      path.resolve(__dirname, '../../vitest.setup.node.ts'),
    ],
    // The shared vitest.setup.ts raises testing-library's asyncUtilTimeout to 5 s so a `waitFor`
    // slowed by CI contention gives up on its own before the test's overall budget, rather than
    // sharing vitest's own testTimeout and losing the race to it. That budget must stay
    // comfortably below this one for testing-library's richer failure to ever be reachable.
    testTimeout: 15000,
  },
});
export default config;
