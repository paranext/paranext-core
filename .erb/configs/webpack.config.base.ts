/**
 * Base webpack config used across other specific configs
 */

import webpack from 'webpack';
import TsconfigPathsPlugins from 'tsconfig-paths-webpack-plugin';
import webpackPaths from './webpack.paths';
import { dependencies as externals } from '../../release/app/package.json';

let processType: string;
if (
  process.env.npm_lifecycle_script?.includes('webpack.config.renderer') ||
  process.env.npm_lifecycle_script?.includes('storybook')
)
  processType = 'renderer';
else if (process.env.npm_lifecycle_script?.includes('webpack.config.extension-host'))
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
    fallback: {
      crypto: false,
      // We don't really need crypto in the browser/renderer at least for now, otherwise do:
      // crypto: require.resolve('crypto-browserify'),
    },
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
    }),

    new webpack.IgnorePlugin({
      checkResource(resource, context) {
        // Don't include stuff from process folders in each others' packages.
        // Ex: Don't include stuff from the main folder or @main... in renderer and renderer folder in main folder

        const isInMain = (res: string) => res.startsWith('@main') || res.includes('main/');
        const isInExtensionHost = (res: string) =>
          res.startsWith('@extension-host') || res.includes('extension-host/');
        const isInRenderer = (res: string) =>
          res.startsWith('@renderer') ||
          (res.includes('renderer/') && !res.includes('electron-log-preload'));
        // Group of processes running in node: main, extension-host
        const isInNode = (res: string) => res.startsWith('@node') || res.includes('node/');
        // Group of processes running as network clients: renderer, extension-host
        const isInClient = (res: string) => res.startsWith('@client') || res.includes('client/');

        let exclude = false;
        switch (processType) {
          case 'renderer':
            exclude = isInMain(resource) || isInExtensionHost(resource) || isInNode(resource);
            break;
          case 'extension-host':
            exclude = isInMain(resource) || isInRenderer(resource);
            break;
          default: // main
            exclude = isInRenderer(resource) || isInExtensionHost(resource) || isInClient(resource);
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
