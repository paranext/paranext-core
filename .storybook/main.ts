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
  staticDirs: [
    '../src/stories/assets', // static asset folder
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

    // Inject postcss-loader into the renderer's CSS rules for Storybook only.
    // postcss-loader is intentionally omitted from the shared renderer webpack configs so that
    // Tailwind CSS is not processed in the Electron app build — only in Storybook.
    if (rendererConfigSanitized.module?.rules) {
      const rendererRules: RuleSetRule[] = rendererConfigSanitized.module.rules;
      rendererConfigSanitized.module.rules = rendererRules.map((rule) => {
        if (!rule || typeof rule !== 'object' || !Array.isArray(rule.use)) return rule;
        const useArr = rule.use;
        const cssIdx = useArr.findIndex(
          (u) =>
            u === 'css-loader' ||
            (!!u &&
              typeof u === 'object' &&
              typeof u !== 'function' &&
              'loader' in u &&
              u.loader === 'css-loader'),
        );
        if (cssIdx < 0) return rule;
        // Bump importLoaders by 1 so postcss-loader processes CSS @imports.
        // Handles both the plain string form ('css-loader') and the object form ({ loader: 'css-loader', options: {...} }).
        const newUse = useArr.map((u, i) => {
          if (i !== cssIdx) return u;
          // Plain string form: convert to object with importLoaders: 1
          if (u === 'css-loader') {
            return { loader: 'css-loader', options: { importLoaders: 1 } };
          }
          // Object form: bump existing importLoaders count
          if (
            !!u &&
            typeof u === 'object' &&
            typeof u !== 'function' &&
            'options' in u &&
            typeof u.options === 'object' &&
            !!u.options &&
            'importLoaders' in u.options &&
            typeof u.options.importLoaders === 'number'
          ) {
            return { ...u, options: { ...u.options, importLoaders: u.options.importLoaders + 1 } };
          }
          // Object form without importLoaders: add importLoaders: 1
          if (
            !!u &&
            typeof u === 'object' &&
            typeof u !== 'function' &&
            'loader' in u &&
            u.loader === 'css-loader' &&
            (!('options' in u) || typeof u.options !== 'function')
          ) {
            const existingOptions =
              'options' in u && typeof u.options === 'object' ? (u.options ?? {}) : {};
            return { ...u, options: { ...existingOptions, importLoaders: 1 } };
          }
          return u;
        });
        newUse.splice(cssIdx + 1, 0, 'postcss-loader');
        return { ...rule, use: newUse };
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
