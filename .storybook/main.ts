import { dirname, join } from 'path';
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  staticDirs: ['../src/stories/assets'], // static asset folder
  addons: [getAbsolutePath('@storybook/addon-links'), getAbsolutePath('@storybook/addon-docs')],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
  docs: {},
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      // speeds up storybook build time
      // @ts-expect-error The following line is interpreted as an error even though it isn't
      allowSyntheticDefaultImports: false,
      // speeds up storybook build time
      esModuleInterop: false,
    },
  },

  // Vite-specific configuration
  async viteFinal(viteConfig) {
    // Merge custom configuration into the default config
    const { mergeConfig } = await import('vite');

    return mergeConfig(viteConfig, {
      plugins: [],
      resolve: {
        alias: {
          '@renderer': join(__dirname, '../src/renderer'),
          '@shared': join(__dirname, '../src/shared'),
          '@main': join(__dirname, '../src/main'),
          '@client': join(__dirname, '../src/client'),
          '@extension-host': join(__dirname, '../src/extension-host'),
          '@node': join(__dirname, '../src/node'),
          '@assets': join(__dirname, '../assets'),
        },
      },
      css: {
        modules: {
          localsConvention: 'camelCase',
        },
      },
      define: {
        // Define environment variables for Storybook
        'process.type': '"renderer"',
        'webpackRenderer.isPackaged': 'false',
      },
    });
  },
};
export default config;

// Using `any` so the output doesn't conflict when used in `config.framework.name` above that has
// type `FrameworkName`, which is complicated and not exported.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}
