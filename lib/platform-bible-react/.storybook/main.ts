import type { StorybookConfig } from '@storybook/react-vite';
import { join, dirname } from 'path';
import remarkGfm from 'remark-gfm';
import remarkGithubBlockquoteAlert from 'remark-github-blockquote-alert';
import { mergeConfig } from 'vite';

/**
 * This function is used to resolve the absolute path of a package. It is needed in projects that
 * use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-onboarding'),
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-interactions'),
    getAbsolutePath('@storybook/addon-a11y'),
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm, remarkGithubBlockquoteAlert],
          },
        },
      },
    },
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal: async (config) => {
    console.log('viteFinal is being executed! Configuration is being applied...');
    return mergeConfig(config, {
      plugins: [],
      optimizeDeps: {
        include: ['remark-gfm', 'remark-github-blockquote-alert'],
      },
      resolve: {
        dedupe: ['react', 'react-dom', 'remark-gfm', 'remark-github-blockquote-alert'],
      },
    });
  },
};

export default config;
