/**
 * Webpack config for production extension-host process
 */

import path from 'path';
import webpack from 'webpack';
import merge, { mergeWithCustomize } from 'webpack-merge';
import mainConfig from './webpack.config.main.prod';
import webpackPaths from './webpack.paths';
import checkNodeEnv from '../scripts/check-node-env';
import deleteSourceMaps from '../scripts/delete-source-maps';

checkNodeEnv('production');
deleteSourceMaps();

const configuration: webpack.Configuration = {
  entry: {
    'extension-host': path.join(
      webpackPaths.srcExtensionHostPath,
      'extension-host.ts',
    ),
  },

  output: {
    path: webpackPaths.distExtensionHostPath,
  },
};

export default mergeWithCustomize({
  customizeObject(a, b, key) {
    if (key === 'entry') return b;
    return merge(a, b);
  },
})(mainConfig, configuration);
