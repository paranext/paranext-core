/** Webpack config for production extension-host process */

import path from 'path';
import webpack from 'webpack';
import { mergeWithCustomize } from 'webpack-merge';
import mainConfig from './webpack.config.main.prod';
import webpackPaths from './webpack.paths';
import checkNodeEnv from '../scripts/check-node-env';
import deleteSourceMaps from '../scripts/delete-source-maps';
import { EmitShippedModulesPlugin } from './emit-shipped-modules-plugin';

checkNodeEnv('production');
deleteSourceMaps();

const configuration: webpack.Configuration = {
  entry: {
    'extension-host': path.join(webpackPaths.srcExtensionHostPath, 'extension-host.ts'),
    'database.worker': path.join(
      webpackPaths.srcExtensionHostPath,
      'services',
      'database.worker.ts',
    ),
  },

  output: {
    path: webpackPaths.distExtensionHostPath,
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.type': 'undefined',
    }),

    // Writes .notices/modules/extension-host.json: the modules webpack actually compiled into this
    // bundle, for the third-party notices generator. Production only - a dev build's module graph
    // includes hot-reload machinery that does not ship. (This config only exists as a production
    // config, so no NODE_ENV guard is needed here the way the extension configs need one.)
    new EmitShippedModulesPlugin({
      bundleName: 'extension-host',
      outputDir: path.join(webpackPaths.rootPath, '.notices', 'modules'),
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
    // We don't want main's DefinePlugin so we can have different ones. We also don't want main's
    // EmitShippedModulesPlugin instance: this config is built by merging the fully-constructed
    // `mainConfig` object, whose plugins array already carries an EmitShippedModulesPlugin bound to
    // bundleName 'main'. Left in place, that instance would also get applied to this compiler (via
    // the `...a` spread below) alongside our own 'extension-host' instance, so this compilation
    // would incorrectly overwrite .notices/modules/main.json with the extension-host module graph.
    if (key === 'plugins') {
      return [
        ...a.filter((plugin: object) => {
          if (plugin instanceof webpack.DefinePlugin) return false;
          if (plugin instanceof EmitShippedModulesPlugin) return false;
          return true;
        }),
        ...b,
      ];
    }

    // Otherwise we want to merge everything with main as usual
    return undefined;
  },
})(mainConfig, configuration);
export default extensionHostConfig;
