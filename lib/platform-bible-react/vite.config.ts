import styleInject from '@senojs/rollup-plugin-style-inject';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import Markdown from '@pity/vite-plugin-react-markdown';
import { dependencies, peerDependencies } from './package.json';

const config = defineConfig({
  base: './',
  plugins: [
    tsconfigPaths(),
    react(),
    styleInject({
      insertAt: 'top',
    }),
    // Custom plugin to load markdown files
    /* {
      name: 'markdown-loader',
      // eslint-disable-next-line consistent-return
      transform(code, id) {
        if (id.slice(-3) === '.md') {
          // For .md files, get the raw content
          return `export default ${JSON.stringify(code)};`;
        }
      },
    }, */
    /* Markdown({
      wrapperComponentName: 'ReactMarkdown',
      wrapperComponentPath:
        './src/components/advanced/extension-marketplace/markdown-renderer.component.tsx',
      // if you want use components in md file, please add it in this
      // [ComponentName]: `componentPath`
      // ?‍?: the `ComponentName` must be `CamelCase`
      importComponentsPath: {
        ReactTest: './src/components/pages/mdtest',
      },
      // markdownItUses: [
      //   prism,
      // ],
    }), */
  ],
  assetsInclude: ['**/*.md'],
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
        '@mui/styled-engine-sc',
        '@mui/styled-engine',
      ],
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
