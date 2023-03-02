import type { StorybookConfig } from '@storybook/react-webpack5';
import { merge } from 'webpack-merge';
import webpack from 'webpack';
import rendererDevConfig from '../.erb/configs/webpack.config.renderer.dev';

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

  // webpackFinal: async (config) => {
  // const { devServer, ...rendererDevConfigSanitized} = rendererDevConfig
  // return merge(config, rendererDevConfigSanitized);
  // }

  webpackFinal: async (webpackConfig) => {
    const ourConfig: webpack.Configuration = {
      target: ['web'],
      devtool: 'inline-source-map',
    };
    return merge(webpackConfig, ourConfig);
  },
};
export default config;
