import { dirname, join } from 'path';
import type { StorybookConfig } from '@storybook/react-webpack5';
import { mergeWithCustomize } from 'webpack-merge';
import { RuleSetRule } from 'webpack';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
    '../extensions/src/**/*.stories.@(js|jsx|ts|tsx)', // Collect stories from bundled extensions - at lease until https://paratextstudio.atlassian.net/browse/PT-3307 is implemented
  ],
  staticDirs: ['../src/stories/assets'], // static asset folder
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-interactions'),
    getAbsolutePath('@storybook/addon-webpack5-compiler-babel'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-webpack5'),
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

  // Merge StorybookWebpackConfig with our WebpackRendererConfig
  // See the current webpack configuration using npm run storybook -- --debug-webpack
  // TODO: Make this work in production mode
  webpackFinal: async (webpackConfig, { configType }) => {
    const rendererConfig =
      configType === 'PRODUCTION'
        ? // Storybook is a build tool so this will not affect anything
          // eslint-disable-next-line global-require
          require('../.erb/configs/webpack.config.renderer.prod').default
        : // eslint-disable-next-line global-require
          require('../.erb/configs/webpack.config.renderer.dev').default;
    // Remove configs that break stuff (https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { devServer, entry, output, ...rendererConfigSanitized } = rendererConfig;

    // Remove the Storybook Webpack rules that we already have our own rules for
    return mergeWithCustomize({
      customizeObject(wpConfig: object, rConfig: object, key: string) {
        if (key === 'module') {
          return mergeWithCustomize({
            customizeArray(wpModule: object[], rModule: object[], moduleKey: string) {
              if (moduleKey === 'rules') {
                const wpRules: RuleSetRule[] = wpModule;
                const rRules: RuleSetRule[] = rModule;
                return [
                  ...wpRules.filter(
                    (rule) =>
                      !rule ||
                      !rule.test ||
                      (rule.test.toString() !== /\.css$/.toString() &&
                        rule.test.toString() !== /\.(mjs|tsx?|jsx?)$/.toString()),
                  ),
                  ...rRules,
                ];
              }

              return undefined;
            },
          })(wpConfig, rConfig);
        }
        return undefined;
      },
    })(webpackConfig, rendererConfigSanitized);
  },
};
export default config;

// Using `any` so the output doesn't conflict when used in `config.framework.name` above that has
// type `FrameworkName`, which is complicated and not exported.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}
