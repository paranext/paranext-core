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
