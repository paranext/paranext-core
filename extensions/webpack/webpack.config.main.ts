import webpack from 'webpack';
import path from 'path';
import merge from 'webpack-merge';
import CopyPlugin from 'copy-webpack-plugin';
import configBase, { rootDir } from './webpack.config.base';
import WebViewResolveWebpackPlugin from './web-view-resolve-webpack-plugin';
import {
  outputFolder,
  getExtensions,
  getMainCopyFilePatterns,
  getMainEntries,
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
    // wait until webView bundling finishes - webpack.config.web-view.ts
    dependencies: ['webView'],
    // Instructions on what output to create
    output: {
      // extension output directory
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
        // Get web view files from the temp dir where they are built
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
    ],
  });
};

export default configMain;
