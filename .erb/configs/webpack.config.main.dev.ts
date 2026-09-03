/** Webpack config for development electron main process */

import path from 'path';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { merge } from 'webpack-merge';
import checkNodeEnv from '../scripts/check-node-env';
import baseConfig from './webpack.config.base';
import webpackPaths from './webpack.paths';

// When an ESLint server is running, we can't set the NODE_ENV so we'll check if it's
// at the dev webpack config is not accidentally run in a production environment
if (process.env.NODE_ENV === 'production') {
  checkNodeEnv('development');
}

const configuration: webpack.Configuration = {
  devtool: 'inline-source-map',

  mode: 'development',

  target: 'electron-main',

  // Main only. The preload the unpackaged app loads is `.erb/dll/preload.js`, built by
  // `webpack.config.preload.dev.ts` (see `createWindow` in src/main/main.ts); a `preload` entry here
  // would emit a second, unread `preload.bundle.dev.js` and make `prestart` — which blocks Electron
  // launching — transpile the preload graph a second time. The production config still bundles both,
  // because packaging consumes them.
  entry: {
    main: path.join(webpackPaths.srcMainPath, 'main.ts'),
  },

  output: {
    path: webpackPaths.dllPath,
    filename: '[name].bundle.dev.js',
    library: {
      type: 'umd',
    },
  },

  // Persistent caching. This config is built twice per `npm start`: once blocking in `prestart` (so
  // the bundle exists before `electronmon` launches Electron) and again by `start:main` in watch
  // mode (which is what hot-reloads main). Both builds are unavoidable, so cache them instead -
  // otherwise the same work is done from scratch twice while the renderer is compiling.
  cache: {
    type: 'filesystem',
    cacheDirectory: path.join(webpackPaths.rootPath, 'node_modules', '.cache', 'webpack-main-dev'),
    // Keyed to NODE_ENV because nothing else is: `mode` is the literal 'development' regardless of
    // NODE_ENV, and webpack defaults `cache.name` to `${name}-${mode}` and `cache.version` to "".
    // Without this, a run with a different NODE_ENV would share this cache and could reuse modules
    // that already have the other run's value inlined by `EnvironmentPlugin`.
    version: process.env.NODE_ENV ?? 'development',
    buildDependencies: {
      config: [__filename, path.resolve(__dirname, 'webpack.config.base.ts')],
      tsconfig: [path.resolve(webpackPaths.rootPath, 'tsconfig.json')],
    },
    compression: 'gzip',
    maxMemoryGenerations: 5,
  },

  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.ANALYZE === 'true' ? 'server' : 'disabled',
      analyzerPort: 8888,
    }),

    new webpack.DefinePlugin({
      'process.type': '"browser"',
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
