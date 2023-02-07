/**
 * Base webpack config used across other specific configs
 */

import webpack from 'webpack';
/* import TsconfigPathsPlugins from 'tsconfig-paths-webpack-plugin'; */
import path from 'path';
import webpackPaths from './webpack.paths';
import { dependencies as externals } from '../../release/app/package.json';

const isRenderer =
  process.env.npm_lifecycle_script?.includes('webpack.config.renderer') ??
  false;

const configuration: webpack.Configuration = {
  externals: [...Object.keys(externals || {})],

  stats: 'errors-only',

  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            // Remove this line to enable type checking in webpack builds
            transpileOnly: true,
            compilerOptions: {
              module: 'esnext',
            },
          },
        },
      },
    ],
  },

  output: {
    path: webpackPaths.srcPath,
    // https://github.com/webpack/webpack/issues/1114
    library: {
      type: 'commonjs2',
    },
  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    modules: [webpackPaths.srcPath, 'node_modules'],
    // There is no need to add aliases here, the paths in tsconfig get mirrored
    /* plugins: [
      new TsconfigPathsPlugins({
        logLevel: 'INFO',
      }),
    ], */
    alias: {
      '@components': path.resolve(webpackPaths.srcRendererPath, 'components/'),
      '@services': path.resolve(webpackPaths.srcRendererPath, 'services/'),
      '@util': path.resolve(webpackPaths.srcRendererPath, 'util/'),
      '@shared': path.resolve(webpackPaths.srcPath, 'shared/'),
      '@node_modules': path.resolve(webpackPaths.srcPath, 'node_modules/'),
      '@assets': path.resolve(webpackPaths.srcPath, 'assets/'),
      '@mainServices': path.resolve(webpackPaths.srcPath, 'main/services/'),
    },
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
    }),

    new webpack.IgnorePlugin({
      checkResource(resource, context) {
        // Don't include stuff from the main folder in renderer and renderer folder in main folder
        const exclude = isRenderer
          ? /main\//.test(resource)
          : /renderer\//.test(resource);

        // Log if a file is excluded just fyi
        if (!context.includes('node_modules') && exclude)
          console.log(
            `${
              isRenderer ? 'Renderer' : 'Main'
            }: Resource ${resource}\n\tat context ${context}: ${
              exclude ? 'excluded' : 'included'
            }`,
          );
        return exclude;
      },
    }),
  ],
};

export default configuration;
