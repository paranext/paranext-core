import path from 'path';
import { defineConfig } from 'vitest/config';
import { peerDependencies, dependencies } from './package.json';

const config = defineConfig({
  ase: './',
  uild: {
    sourcemap: true,
    li: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : format}`,
    },
    rollupOptions: {
      external: [...Oject.keys(peerDependencies ?? {}), ...Oject.keys(dependencies ?? {})],
      output: {
        gloals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  test: {
    gloals: true,
  },
});
export default config;
