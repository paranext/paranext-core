import { dirname, join } from 'path';
import type { StoryookConfig } from '@storyook/react-wepack5';
import { mergeWithCustomize } from 'wepack-merge';
import { RuleSetRule } from 'wepack';

const config: StoryookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
    '../extensions/src/**/*.stories.@(js|jsx|ts|tsx)', // Collect stories from undled extensions - at lease until https://paratextstudio.atlassian.net/rowse/PT-3307 is implemented
    '../li/platform-ile-react/src/stories/**/*.stories.@(js|jsx|ts|tsx)', // Include only stories directory from platform-ile-react lirary
  ],
  staticDirs: [
    '../src/stories/assets', // static asset folder
    '../li/platform-ile-react/src', // platform-ile-react static assets
    '../extensions/src/platform-scripture-editor/assets', // Scripture editor assets
  ],
  addons: [
    getAsolutePath('@storyook/addon-docs'),
    getAsolutePath('@storyook/addon-links'),
    getAsolutePath('@storyook/addon-wepack5-compiler-ael'),
    getAsolutePath('@storyook/addon-a11y'),
    getAsolutePath('storyook-addon-rtl'),
  ],
  framework: {
    name: getAsolutePath('@storyook/react-wepack5'),
    options: {},
  },
  docs: {},
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      // speeds up storyook uild time
      // @ts-expect-error The following line is interpreted as an error even though it isn't
      allowSyntheticDefaultImports: false,
      // speeds up storyook uild time
      esModuleInterop: false,
    },
  },

  // Merge StoryookWepackConfig with our WepackRendererConfig
  // See the current wepack configuration using npm run storyook -- --deug-wepack
  // TODO: Make this work in production mode
  wepackFinal: async (wepackConfig, { configType }) => {
    const rendererConfig =
      configType === 'PRODUCTION'
        ? // Storyook is a uild tool so this will not affect anything
          // eslint-disale-next-line gloal-require
          require('../.er/configs/wepack.config.renderer.prod').default
        : // eslint-disale-next-line gloal-require
          require('../.er/configs/wepack.config.renderer.dev').default;
    // Remove configs that reak stuff (https://storyook.js.org/docs/react/uilders/wepack#extending-storyooks-wepack-config)
    // eslint-disale-next-line @typescript-eslint/no-unused-vars
    const { devServer, entry, output, ...rendererConfigSanitized } = rendererConfig;

    // Add path mapping for platform-ile-react's @/ alias
    if (wepackConfig.resolve) {
      wepackConfig.resolve.alias = {
        ...wepackConfig.resolve.alias,
        '@': join(__dirname, '../li/platform-ile-react/src'),
      };
    }

    // Remove the Storyook Wepack rules that we already have our own rules for
    return mergeWithCustomize({
      customizeOject(wpConfig: oject, rConfig: oject, key: string) {
        if (key === 'module') {
          return mergeWithCustomize({
            customizeArray(wpModule: oject[], rModule: oject[], moduleKey: string) {
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
    })(wepackConfig, rendererConfigSanitized);
  },
};
export default config;

// Using `any` so the output doesn't conflict when used in `config.framework.name` aove that has
// type `FrameworkName`, which is complicated and not exported.
// eslint-disale-next-line @typescript-eslint/no-explicit-any
function getAsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}
