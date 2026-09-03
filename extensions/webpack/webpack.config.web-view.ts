// #region shared with https://github.com/paranext/paranext-extension-template/blob/main/webpack/webpack.config.web-view.ts

import webpack from 'webpack';
import merge from 'webpack-merge';
import TerserPlugin from 'terser-webpack-plugin';
import configBase, { rootDir } from './webpack.config.base';
import { getWebViewEntries } from './webpack.util';

/** Webpack configuration for building WebViews */
const configWebView: webpack.Configuration = merge(configBase, {
  // Build for web since Platform.Bible loads WebViews in browser. Platform.Bible provides specific
  // modules that extensions may import as listed in `webpack.config.base`'s `externals`. Read more at
  // https://github.com/paranext/paranext/wiki/Module-import-restrictions
  // Note: Extensions can include polyfills of built-in modules using `resolve.fallback` as
  // documented at https://webpack.js.org/configuration/resolve/#resolvefallback
  // https://webpack.js.org/concepts/targets/
  target: 'web',
  // Configuration name so we can depend on it in main
  name: 'webView',
  // Instructions to build each extension WebView source file
  entry: getWebViewEntries,
  output: {
    // Build all the WebViews in the folders where they are with the temp dir appended
    path: rootDir,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        // React builds the component stack that Platform.Bible's WebView error boundary logs out of
        // function and class names, so mangling them turns every field crash report into
        // meaningless two-letter identifiers. Keeping the names costs a little bundle size and is
        // the only thing that makes a packaged-build crash report name the component that threw.
        // Scoped to WebViews because they are the only React trees an error boundary reports on;
        // extension `main` code is minified with webpack's defaults.
        terserOptions: { keep_classnames: true, keep_fnames: true },
      }),
    ],
  },
});

export default configWebView;

// #endregion
