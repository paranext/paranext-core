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
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : format}`,
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
  },
});
export default config;
