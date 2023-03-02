import type { StorybookConfig } from '@storybook/react-webpack5';
import { merge, mergeWithCustomize } from 'webpack-merge';
import webpack, { RuleSetRule } from 'webpack';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
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
    const { devServer, entry, output, ...rendererConfigSanitized } =
      rendererConfig;

    // Remove the Storybook Webpack rules that we already have our own rules for
    return mergeWithCustomize({
      customizeObject(wpConfig: object, rConfig: object, key: string) {
        if (key === 'module') {
          return mergeWithCustomize({
            customizeArray(
              wpModule: object[],
              rModule: object[],
              moduleKey: string,
            ) {
              if (moduleKey === 'rules') {
                const wpRules = wpModule as RuleSetRule[];
                const rRules = rModule as RuleSetRule[];
                return [
                  ...wpRules.filter(
                    (rule) =>
                      !rule ||
                      !rule.test ||
                      (rule.test.toString() !== /\.css$/.toString() &&
                        rule.test.toString() !==
                          /\.(mjs|tsx?|jsx?)$/.toString()),
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
