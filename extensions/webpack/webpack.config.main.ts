import webpack from 'webpack';
import path from 'path';
import merge from 'webpack-merge';
import CopyPlugin from 'copy-webpack-plugin';
import configBase, { LIBRARY_TYPE, rootDir } from './webpack.config.base';
import WebViewResolveWebpackPlugin from './web-view-resolve-webpack-plugin';
import {
  outputFolder,
  getExtensions,
  getMainCopyFilePatterns,
  getMainEntries,
} from './webpack.util';

/** Webpack configuration for building main */
const configMain: () => Promise<webpack.Configuration> = async () => {
  const extensions = await getExtensions();

  return merge(configBase, {
    // #region shared with https://github.com/paranext/paranext-extension-template/blob/main/webpack/webpack.config.main.ts

    // Build for node since Platform.Bible loads this in node https://webpack.js.org/concepts/targets/
    target: 'node',
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
