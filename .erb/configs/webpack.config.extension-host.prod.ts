/** Webpack config for production extension-host process */

import path from 'path';
import webpack from 'webpack';
import { mergeWithCustomize } from 'webpack-merge';
import mainConfig from './webpack.config.main.prod';
import webpackPaths from './webpack.paths';
import checkNodeEnv from '../scripts/check-node-env';
import deleteSourceMaps from '../scripts/delete-source-maps';

checkNodeEnv('production');
deleteSourceMaps();

const configuration: webpack.Configuration = {
  entry: {
    'extension-host': path.join(webpackPaths.srcExtensionHostPath, 'extension-host.ts'),
  },

  output: {
    path: webpackPaths.distExtensionHostPath,
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.type': 'undefined',
    }),
  ],
};

const extensionHostConfig = mergeWithCustomize({
  customizeObject(a, b, key) {
    // We don't want main's entry files
    if (key === 'entry') return b;

    // Otherwise we want to merge everything with main as usual
    return undefined;
  },
  customizeArray(a, b, key) {
    // We don't want main's DefinePlugin so we can have different ones
    if (key === 'plugins') {
      return [
        ...a.filter((plugin) => {
          if (!(plugin instanceof webpack.DefinePlugin)) return true;
          return false;
        }),
        ...b,
      ];
    }

    // Otherwise we want to merge everything with main as usual
    return undefined;
  },
})(mainConfig, configuration);
export default extensionHostConfig;
