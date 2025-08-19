import remarkGfm from 'remark-gfm';

import type { StorybookConfig } from '@storybook/react-vite';
import { getCodeEditorStaticDirs } from 'storybook-addon-code-editor/getStaticDirs';

import { join, dirname } from 'path';

/**
 * This function is used to resolve the absolute path of a package. It is needed in projects that
 * use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}
const config: StorybookConfig = {
  /**
   * `storybook-addon-code-editor` (which integrates Monaco Editor) needs certain static assets
   * (such as web workers and language files) at runtime via `staticDirs`
   *
   * @see https://storybook.js.org/addons/storybook-addon-code-editor
   */
  staticDirs: [...getCodeEditorStaticDirs(__filename), '../src'],
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)', // Explicitly list supported extensions
  ],
  addons: [
    {
      name: getAbsolutePath('@storybook/addon-docs'),
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('storybook-addon-rtl'),
    getAbsolutePath('@storybook/addon-vitest'),
    {
      name: getAbsolutePath('storybook-addon-code-editor'),
      options: {
        // Inject global CSS into the code editor
        css: ['/index.css'],
      },
    },
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
};
export default config;
