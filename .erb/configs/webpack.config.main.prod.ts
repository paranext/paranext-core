/** Webpack config for production electron main process */

import path from 'path';
import webpack from 'webpack';
import { merge } from 'webpack-merge';
import TerserPlugin from 'terser-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import baseConfig from './webpack.config.base';
import webpackPaths from './webpack.paths';
import checkNodeEnv from '../scripts/check-node-env';
import deleteSourceMaps from '../scripts/delete-source-maps';
import { GenerateBuildInfoPlugin } from './generate-build-info-plugin';

checkNodeEnv('production');
deleteSourceMaps();

const configuration: webpack.Configuration = {
  devtool: 'source-map',

  mode: 'production',

  target: 'electron-main',

  entry: {
    main: path.join(webpackPaths.srcMainPath, 'main.ts'),
    preload: path.join(webpackPaths.srcMainPath, 'preload.ts'),
  },

  output: {
    path: webpackPaths.distMainPath,
    filename: '[name].js',
    library: {
      type: 'umd',
    },
  },

  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
    ],
  },

  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.ANALYZE === 'true' ? 'server' : 'disabled',
      analyzerPort: 8888,
    }),

    /**
     * Create global constants which can be configured at compile time.
     *
     * Useful for allowing different behaviour between development builds and release builds
     *
     * NODE_ENV should be production so that modules do not perform certain development checks
     */
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      DEBUG_PROD: false,
      START_MINIMIZED: false,
    }),

    new webpack.DefinePlugin({
      'process.type': '"browser"',
    }),

    // Don't generate this file in webpack dev config or else watch mode will get stuck in a loop
    // Matches the format of the buildInfo.json file generated by generate-dev-build-info.ts
    new GenerateBuildInfoPlugin({
      filename: 'release/app/buildInfo.json',
      prepare: () => ({
        build: `${process.env.GITHUB_ACTIONS ? 'github' : process.env.USERNAME || process.env.USER || 'unknown'}.${new Date()
          .toISOString()
          .replace(/[-:TZ]/g, '')
          .slice(0, 14)}.${
          process.env.GITHUB_RUN_ID ||
          require('child_process').execSync('git rev-parse HEAD').toString().trim()
        }`,
      }),
    }),
  ],

  /**
   * Disables webpack processing of __dirname and __filename. If you run the bundle in node.js it
   * falls back to these values of node.js. https://github.com/webpack/webpack/issues/2010
   */
  node: {
    __dirname: false,
    __filename: false,
  },
};

const mainConfig = merge(baseConfig, configuration);
export default mainConfig;
