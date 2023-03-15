/**
 * Base webpack config used across other specific configs
 */

import webpack from 'webpack';
import TsconfigPathsPlugins from 'tsconfig-paths-webpack-plugin';
import webpackPaths from './webpack.paths';
import { dependencies as externals } from '../../release/app/package.json';

let processType: string;
if (process.env.npm_lifecycle_script?.includes('webpack.config.renderer'))
  processType = 'renderer';
else if (
  process.env.npm_lifecycle_script?.includes('webpack.config.extension-host')
)
  processType = 'extension-host';
else processType = 'main';

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
    plugins: [new TsconfigPathsPlugins()],
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
    }),

    new webpack.IgnorePlugin({
      checkResource(resource, context) {
        // Don't include stuff from the main folder or @main... in renderer and renderer folder in main folder
        let exclude = false;
        switch (processType) {
          case 'renderer':
            exclude =
              resource.startsWith('@main') ||
              resource.includes('main/') ||
              resource.startsWith('@extension-host') ||
              resource.includes('extension-host/') ||
              resource.startsWith('@node') ||
              resource.includes('node/');
            break;
          case 'extension-host':
            exclude =
              resource.startsWith('@main') ||
              resource.includes('main/') ||
              resource.startsWith('@renderer') ||
              (/renderer\//.test(resource) &&
                !resource.includes('electron-log-preload'));
            break;
          default: // main
            exclude =
              resource.startsWith('@renderer') ||
              (/renderer\//.test(resource) &&
                !resource.includes('electron-log-preload')) ||
              resource.startsWith('@extension-host') ||
              resource.includes('extension-host/') ||
              resource.startsWith('@client') ||
              resource.includes('client/');
            break;
        }

        // Log if a file is excluded just fyi
        if (!context.includes('node_modules') && exclude)
          console.log(
            `${processType}: Resource ${resource}\n\tat context ${context}: ${
              exclude ? 'excluded' : 'included'
            }`,
          );
        return exclude;
      },
    }),
  ],
};

export default configuration;
