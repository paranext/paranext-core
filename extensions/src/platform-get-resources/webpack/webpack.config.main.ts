import webpack from 'webpack';
import path from 'path';
import merge from 'webpack-merge';
import CopyPlugin from 'copy-webpack-plugin';
import configBase, { rootDir } from './webpack.config.base';
import WebViewResolveWebpackPlugin from './web-view-resolve-webpack-plugin';
import { LIBRARY_TYPE, outputFolder } from './webpack.util';

/** Webpack configuration for building main */
const configMain: webpack.Configuration = merge(configBase, {
  // #region shared with https://github.com/paranext/paranext-multi-extension-template/blob/main/webpack/webpack.config.main.ts

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

  // extension main source file to build
  // Note: this could have just been the import string if we put the filename in `output`, but
  // splitting it out like this allows us to share `output` with `paranext-core`.
  entry: {
    main: {
      import: './src/main.ts',
      filename: './src/main.js',
    },
  },
  plugins: [
    // Copy static files to the output folder https://webpack.js.org/plugins/copy-webpack-plugin/
    new CopyPlugin({
      patterns: [
        // We want all files from the public folder copied into the output folder
        { from: 'public', to: './', noErrorOnMissing: true },
        // We want all files from the assets folder copied into the output folder under assets
        { from: 'assets', to: './assets/', noErrorOnMissing: true },
        // We want all files from the contributions folder copied into the output folder under contributions
        { from: 'contributions', to: './contributions/', noErrorOnMissing: true },
        // Copy this extension's type declaration file into the output folder under src/types
        { from: 'src/types', to: './src/types', noErrorOnMissing: true },
        // We need to distribute the package.json for Platform.Bible to read the extension properly
        { from: 'package.json', to: './', noErrorOnMissing: true },
        // We need to distribute the manifest.json to inform Platform.Bible about the extension
        { from: 'manifest.json', to: './' },
      ],
    }),
  ],
});

export default configMain;
