// paranext-core only: this import and the plugin one below have no counterpart in the extension
// template, so both sit OUTSIDE the shared region. A paranext-core-only path inside that region
// either breaks the template on the next merge or is silently reverted by one - and reverting the
// plugin registration below stops `extension-web-view.json` being written at all, which drops
// `react-reverse-portal` (reached only through an extension web view) from the notices document
// with the build still exiting 0. `path` leads because `import/order` puts built-ins first.
import path from 'path';

// #region shared with https://github.com/paranext/paranext-extension-template/blob/main/webpack/webpack.config.web-view.ts

import webpack from 'webpack';
import merge from 'webpack-merge';
import configBase, { rootDir } from './webpack.config.base';
import { getWebViewEntries } from './webpack.util';

// #endregion

import { EmitShippedModulesPlugin } from '../../.erb/configs/emit-shipped-modules-plugin';

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

  // #endregion

  // Writes .notices/modules/extension-web-view.json: the modules webpack actually compiled into
  // this bundle, for the third-party notices generator.
  //
  // Emitted on EVERY build, not only a production one. It was production-gated on the theory that a
  // development graph carries hot-reload machinery that does not ship - but the root `npm run build`
  // does NOT set NODE_ENV for its extensions leg (unlike its main, renderer and extension-host
  // legs), so the gate meant this manifest and `extension-main` were never written by the one
  // command CI runs. On a fresh CI checkout, where `.notices/` does not exist at all, the generator
  // therefore built its shipping set from three manifests instead of five and silently dropped
  // `react-reverse-portal` - the very package ADR-0022 cites as the one a manifest-based scan
  // misses, reached only through an extension web view.
  //
  // The theory does not hold here either: a plain (non-devServer) webpack build injects no HMR
  // runtime NormalModules, and the two graphs were measured identical - 8,207 module paths and the
  // same 118 packages from the development and production builds alike. If that ever changes, the
  // build-id stamp is what catches a manifest written by a different build.
  plugins: [
    new EmitShippedModulesPlugin({
      bundleName: 'extension-web-view',
      outputDir: path.join(rootDir, '..', '.notices', 'modules'),
    }),
  ],
});

export default configWebView;
