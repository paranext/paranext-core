// paranext-core only: this import and the plugin one below have no counterpart in the extension
// template, so both sit OUTSIDE the shared region. A paranext-core-only path inside that region
// either breaks the template on the next merge or is silently reverted by one - and reverting the
// plugin registration below stops `extension-web-view.json` being written at all, which drops
// `react-reverse-portal` (reached only through an extension web view) from the notices document
// with the build still exiting 0. `path` leads because `import/order` puts built-ins first, and
// `terser-webpack-plugin` follows it for the same reason: an external import may not sit below the
// relative ones the shared region ends with, so the only place outside that region for it is above.
import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';

// #region shared with https://github.com/paranext/paranext-extension-template/blob/main/webpack/webpack.config.web-view.ts

import webpack from 'webpack';
import merge from 'webpack-merge';
import configBase, { rootDir } from './webpack.config.base';
import { getWebViewEntries } from './webpack.util';

// #endregion

import { EmitShippedModulesPlugin } from '../../.erb/configs/emit-shipped-modules-plugin';
import { extensionCacheDirectory } from './webpack.util';

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
  // `react-reverse-portal` - the very package `adr-notices-derived-from-what-ships` cites as the one
  // a manifest-based scan misses, reached only through an extension web view.
  //
  // The theory does not hold here either: a plain (non-devServer) webpack build injects no HMR
  // runtime NormalModules, and the two graphs were measured identical - 8,207 module paths and the
  // same 118 packages from the development and production builds alike. What catches it if that
  // ever changes is the MODE each manifest records, not the build id: `prebuild` mints an id for
  // the root `build` only, so the production extension build that follows re-stamps the same one.
  // `collectShippedPackages` refuses a set that mixes modes.
  plugins: [
    new EmitShippedModulesPlugin({
      bundleName: 'extension-web-view',
      outputDir: path.join(rootDir, '..', '.notices', 'modules'),
    }),
  ],

  // Keep the licence banners terser preserves INSIDE the bundle instead of extracting them to a
  // sidecar file.
  //
  // A web view is not shipped as a file: `web-view-resolve-webpack-plugin` inlines
  // `temp-build/<name>.js` into the extension's `main.js` as a string. terser-webpack-plugin's
  // default (`extractComments: true`, `format.comments: false`) moves every `@license`/`@preserve`
  // banner out of that file into `temp-build/<name>.js.LICENSE.txt` and leaves behind a pointer -
  // `/*! For license information please see <name>.js.LICENSE.txt */`. Only the string is inlined,
  // `temp-build` is a gitignored build intermediate that `copy-webpack-plugin` never copies into
  // `extensions/dist`, and `electron-builder.json5` packs `extensions/dist` into every installer.
  // The result is a redistributed artifact that points at a licence file it does not carry.
  //
  // `format.comments: 'some'` is terser's own "keep `@license`, `@preserve` and `/*!` banners"
  // rule, so the notices those packages require travel inside the bundle that ships them. The
  // three bundles under `release/app/dist` are files rather than strings, so their sidecars are
  // packed beside them and are left extracted.
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: { format: { comments: 'some' } },
      }),
    ],
  },

  // Its own cache directory, not the one `webpack.config.base.ts` names for every extension bundle
  // - see `extensionCacheDirectory` for why the manifest above cannot be trusted without that.
  cache: { cacheDirectory: extensionCacheDirectory('web-view') },
});

export default configWebView;
