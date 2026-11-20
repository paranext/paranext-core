// The notices plugin below and the `path` import it needs sit OUTSIDE the shared regions:
// paranext-core's copy of this file registers its own plugin from a different path, so inside a
// region they would merge into that copy as duplicate imports without a conflict.
import path from 'path';

// #region shared with https://github.com/paranext/paranext-extension-template/blob/main/webpack/webpack.config.web-view.ts

import TerserPlugin from 'terser-webpack-plugin';
import webpack from 'webpack';
import merge from 'webpack-merge';
import configBase, { rootDir } from './webpack.config.base';
import { getWebViewEntries } from './webpack.util';

// #endregion

import { EmitShippedModulesPlugin } from './emit-shipped-modules-plugin';
// A namespace import, so this second import of `./webpack.util` stays outside the shared region
// above: `import/no-duplicates` would otherwise want it merged into that region's named import.
import * as webpackUtil from './webpack.util';

/** Webpack configuration for building WebViews */
const configWebView: webpack.Configuration = merge(configBase, {
  // #region shared with https://github.com/paranext/paranext-extension-template/blob/main/webpack/webpack.config.web-view.ts

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
  // Keep license comments INSIDE each web view's code. A web view does not ship as a file: it is
  // pasted into the extension's `main.js` as a string. By default terser-webpack-plugin moves
  // license comments into a separate `temp-build/<name>.js.LICENSE.txt`, which never ships, and
  // leaves `/*! For license information please see <name>.js.LICENSE.txt */` behind, so the packed
  // extension would point to a license file it does not carry. `comments: 'some'` keeps them in
  // place: it is terser's filter for `@license`, `@preserve`, `@copyright`, `@cc_on` and `/*!`.
  //
  // `compress: { passes: 2 }` restates webpack's own default: an explicit `minimizer` list replaces
  // webpack's default minifier, so leaving it out would quietly minify every web view less.
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: { format: { comments: 'some' }, compress: { passes: 2 } },
      }),
    ],
  },

  // #endregion

  plugins: [
    // Lists the modules this build bundled, for third-party license notices
    new EmitShippedModulesPlugin({
      bundleName: 'extension-web-view',
      outputDir: path.join(rootDir, webpackUtil.noticesManifestFolder),
    }),
  ],
});

export default configWebView;
