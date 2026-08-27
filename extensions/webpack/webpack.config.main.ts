import webpack from 'webpack';
import path from 'path';
import merge from 'webpack-merge';
import CopyPlugin from 'copy-webpack-plugin';
import configBase, { rootDir } from './webpack.config.base';
import WebViewResolveWebpackPlugin from './web-view-resolve-webpack-plugin';
// paranext-core only: this import and the `EmitShippedModulesPlugin` registration it feeds have
// no counterpart in the extension template, so both must stay OUTSIDE the shared region below.
// The path also reaches past `extensions/` into `.erb/`, which the template does not carry at
// all. A paranext-core-only path inside that region either breaks the template on the next merge
// or is silently reverted by one - and reverting the registration stops `extension-main.json`
// being written, which drops this bundle's packages from the notices document with the build
// still exiting 0.
import { EmitShippedModulesPlugin } from '../../.erb/configs/emit-shipped-modules-plugin';
import {
  outputFolder,
  getExtensions,
  getMainCopyFilePatterns,
  getMainEntries,
  extensionCacheDirectory,
  LIBRARY_TYPE,
} from './webpack.util';

/** Webpack configuration for building main */
const configMain: () => Promise<webpack.Configuration> = async () => {
  const extensions = await getExtensions();

  return merge(configBase, {
    // #region shared with https://github.com/paranext/paranext-extension-template/blob/main/webpack/webpack.config.main.ts

    // Build for web (default) because, though Platform.Bible loads this in node, built-in node
    // modules are not available except specific exceptions which are included in
    // `webpack.config.base`'s `externals`. Building for web prevents webpack from assuming it can
    // `require` the built-in node modules. Read more at
    // https://github.com/paranext/paranext/wiki/Module-import-restrictions
    // Note: Extensions can include polyfills of built-in modules using `resolve.fallback` as
    // documented at https://webpack.js.org/configuration/resolve/#resolvefallback
    // https://webpack.js.org/concepts/targets/
    target: 'web',
    // configuration name
    name: 'main',
    // Wait until WebView bundling finishes - webpack.config.web-view.ts
    dependencies: ['webView'],
    // Instructions on what output to create
    output: {
      // Extension output directory
      path: path.resolve(rootDir, outputFolder),
      // Exporting the library https://webpack.js.org/guides/author-libraries/#expose-the-library
      library: {
        type: LIBRARY_TYPE,
      },
      // Empty the output folder before building
      clean: true,
      // Set the chunk format to build for a Node.js module even though our target is `web`
      // https://webpack.js.org/configuration/output/#outputchunkformat
      chunkFormat: 'commonjs',
    },
    resolve: {
      plugins: [
        // Get WebView files from the temp dir where they are built
        new WebViewResolveWebpackPlugin(),
      ],
    },

    // #endregion

    // instructions to build each extension main source file
    entry: () => getMainEntries(extensions),
    plugins: [
      // Copy static files to the output folder https://webpack.js.org/plugins/copy-webpack-plugin/
      new CopyPlugin({
        patterns: getMainCopyFilePatterns(extensions),
      }),
      // Writes .notices/modules/extension-main.json: the modules webpack actually compiled into
      // this bundle, for the third-party notices generator. Emitted on every build rather than only
      // a production one - see the matching comment in webpack.config.web-view.ts for why a
      // production gate silently costs the notices generator two of its five manifests.
      new EmitShippedModulesPlugin({
        bundleName: 'extension-main',
        outputDir: path.join(rootDir, '..', '.notices', 'modules'),
      }),
    ],

    // Its own cache directory, not the one `webpack.config.base.ts` names for every extension
    // bundle. This config declares `dependencies: ['webView']`, so it starts only after
    // `extension-web-view` has written its entries - and sharing a directory with it makes this
    // bundle read as warm on a build that is cold. See `extensionCacheDirectory`.
    cache: { cacheDirectory: extensionCacheDirectory('main') },
  });
};

export default configMain;
