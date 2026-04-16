import { dirname, join } from 'path';
import type { StorybookConfig } from '@storybook/react-webpack5';
import { mergeWithCustomize } from 'webpack-merge';
import { RuleSetRule } from 'webpack';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
    '../extensions/src/**/*.stories.@(js|jsx|ts|tsx)', // Collect stories from bundled extensions - at lease until https://paratextstudio.atlassian.net/browse/PT-3307 is implemented
    '../lib/platform-bible-react/src/stories/**/*.stories.@(js|jsx|ts|tsx)', // Include only stories directory from platform-bible-react library
  ],
  staticDirs: [
    '../src/stories/assets', // static asset folder
    '../lib/platform-bible-react/src', // platform-bible-react static assets
    '../extensions/src/platform-scripture-editor/assets', // Scripture editor assets
  ],
  addons: [
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-webpack5-compiler-babel'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('storybook-addon-rtl'),
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
  webpackFinal: async (webpackConfig, { configType }) => {
    const rendererConfig =
      configType === 'PRODUCTION'
        ? // Webpack configs must be loaded dynamically based on configType (PRODUCTION vs DEVELOPMENT)
          // eslint-disable-next-line global-require
          require('../.erb/configs/webpack.config.renderer.prod').default
        : // Storybook is a build tool so this will not affect anything
          // eslint-disable-next-line global-require
          require('../.erb/configs/webpack.config.renderer.dev').default;
    // Strip Electron-specific configs that conflict with Storybook's own webpack setup.
    // devServer/entry/output are Electron-only; optimization/cache are managed by Storybook.
    // See https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { devServer, entry, output, optimization, cache, ...rendererConfigSanitized } =
      rendererConfig;

    // Filter out plugins that conflict with Storybook's own plugins.
    // HtmlWebpackPlugin causes Storybook 9's WebpackInjectMockerRuntimePlugin to
    // emit mocker-runtime-injected.js twice (one per HtmlWebpackPlugin instance).
    const conflictingPlugins = ['HtmlWebpackPlugin', 'BundleAnalyzerPlugin'];
    rendererConfigSanitized.plugins = (rendererConfigSanitized.plugins || []).filter(
      (plugin: { constructor?: { name?: string } }) =>
        !conflictingPlugins.includes(plugin?.constructor?.name ?? ''),
    );

    // Override the inherited postcss-loader's config path so Storybook uses
    // .storybook/postcss.config.ts (which scans extensions and platform-bible-react source)
    // rather than the root postcss.config.ts (app-scoped). postcss-loader is now supplied
    // by the shared renderer webpack config, so we just need to point it at the right config.
    // See docs/tailwind.md for the overall Tailwind architecture.
    const storybookPostcssConfigPath = join(__dirname, 'postcss.config.ts');
    if (rendererConfigSanitized.module?.rules) {
      const rendererRules: RuleSetRule[] = rendererConfigSanitized.module.rules;
      rendererConfigSanitized.module.rules = rendererRules.map((rule) => {
        if (!rule || typeof rule !== 'object' || !Array.isArray(rule.use)) return rule;
        return {
          ...rule,
          use: rule.use.map((u) => {
            if (u === 'postcss-loader') {
              return {
                loader: 'postcss-loader',
                options: { postcssOptions: { config: storybookPostcssConfigPath } },
              };
            }
            return u;
          }),
        };
      });
    }

    // Add path mapping for platform-bible-react's @/ alias and resolve the package from source
    if (webpackConfig.resolve) {
      webpackConfig.resolve.alias = {
        ...webpackConfig.resolve.alias,
        '@': join(__dirname, '../lib/platform-bible-react/src'),
        'platform-bible-react': join(__dirname, '../lib/platform-bible-react/src/index.ts'),
      };
    }

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
