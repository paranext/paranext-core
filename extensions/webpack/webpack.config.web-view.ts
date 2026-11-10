// paranext-core only: this import and the plugin one below have no counterpart in the extension
// template, so both sit OUTSIDE the shared region. A paranext-core-only path inside that region
// either breaks the template on the next merge or is silently reverted by one - and reverting the
// plugin registration below stops `extension-web-view.json` being written at all, which drops
// `react-reverse-portal` (reached only through an extension web view) from the notices document
// with the build still exiting 0. `path` leads because `import/order` puts built-ins first.
//
// The shared config below keeps web-view license comments inline. The other bundles under
// `release/app/dist` are files rather than strings, so their `.LICENSE.txt` files ship beside them.
//
// TODO(PT-4477): each extension's own build (`extensions/src/<name>/webpack/`) gets that setting
// only when `npm run update-from-templates` pulls it in from the templates; until then, packaging
// one extension on its own still leaves a pointer to a license file the zip does not carry.
import path from 'path';

// #region shared with https://github.com/paranext/paranext-extension-template/blob/main/webpack/webpack.config.web-view.ts

import TerserPlugin from 'terser-webpack-plugin';
import webpack from 'webpack';
import merge from 'webpack-merge';
import configBase, { rootDir } from './webpack.config.base';
import { getWebViewEntries } from './webpack.util';

// #endregion

import { EmitShippedModulesPlugin } from '../../.erb/configs/emit-shipped-modules-plugin';
// `extensionCacheDirectory` is paranext-core only, so it cannot be added to the shared region's
// own `./webpack.util` import above without putting a core-only name inside that region. A
// namespace import is what lets a second statement name the same module here:
// `import/no-duplicates` expects named imports from one module to be merged into one statement.
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

  // Writes .notices/modules/extension-web-view.json: the modules webpack actually compiled into
  // this bundle, for the third-party notices generator.
  //
  // Emitted on EVERY build, not only a production one. A production gate here would rest on the
  // premise that a development graph carries hot-reload machinery that does not ship - but the root
  // `npm run build` does NOT set NODE_ENV for its extensions leg (unlike its main, renderer and
  // extension-host legs), so such a gate leaves this manifest and `extension-main` unwritten by the
  // one command CI runs. On a fresh CI checkout, where `.notices/` does not exist at all, the
  // generator would then build its shipping set from three manifests instead of five and silently
  // drop `react-reverse-portal` - the very package `adr-notices-derived-from-what-ships` cites as
  // the one a manifest-based scan misses, reached only through an extension web view.
  //
  // The premise does not hold here either: a plain (non-devServer) webpack build injects no HMR
  // runtime NormalModules, and the two graphs measure identical - 8,207 module paths and the same
  // 118 packages from the development and production builds alike. What catches it if that ever
  // changes is the MODE each manifest records, not the build id: `prebuild` mints an id for the
  // root `build` only, so the production extension build that follows re-stamps the same one.
  // `collectShippedPackages` refuses a set that mixes modes.
  plugins: [
    new EmitShippedModulesPlugin({
      bundleName: 'extension-web-view',
      outputDir: path.join(rootDir, '..', '.notices', 'modules'),
    }),
  ],

  // Its own cache directory, not the one `webpack.config.base.ts` names for every extension bundle
  // - see `extensionCacheDirectory` for why the manifest above cannot be trusted without that.
  cache: { cacheDirectory: webpackUtil.extensionCacheDirectory('web-view') },
});

export default configWebView;
