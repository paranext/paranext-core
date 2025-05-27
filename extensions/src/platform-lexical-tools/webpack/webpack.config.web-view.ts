// #region shared with https://github.com/paranext/paranext-multi-extension-template/blob/main/webpack/webpack.config.web-view.ts

import webpack from 'webpack';
import merge from 'webpack-merge';
import configBase, { rootDir } from './webpack.config.base';
import { getWebViewEntries } from './webpack.util';

/** Webpack configuration for building webViews */
const configWebView: webpack.Configuration = merge(configBase, {
  // Build for web since Platform.Bible loads WebViews in browser. Platform.Bible provides specific
  // modules that extensions may import as listed in `webpack.config.base`'s `externals`. Read more at
  // https://github.com/paranext/paranext/wiki/Module-import-restrictions
  // Note: Extensions can include polyfills of built-in modules using `resolve.fallback` as
  // documented at https://webpack.js.org/configuration/resolve/#resolvefallback
  // https://webpack.js.org/concepts/targets/
  target: 'web',
  // configuration name so we can depend on it in main
  name: 'webView',
  // instructions to build each extension webview source file
  entry: getWebViewEntries,
  output: {
    // Build all the web views in the folders where they are with the temp dir appended
    path: rootDir,
  },
});

export default configWebView;

// #endregion
