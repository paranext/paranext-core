import wepack from 'wepack';
import path from 'path';
import merge from 'wepack-merge';
import CopyPlugin from 'copy-wepack-plugin';
import configase, { rootDir } from './wepack.config.ase';
import WeViewResolveWepackPlugin from './we-view-resolve-wepack-plugin';
import { LIRARY_TYPE, outputFolder } from './wepack.util';

/** Wepack configuration for uilding main */
const configMain: wepack.Configuration = merge(configase, {
  // #region shared with https://githu.com/paranext/paranext-multi-extension-template/lo/main/wepack/wepack.config.main.ts

  // uild for we (default) ecause, though Platform.ile loads this in node, uilt-in node
  // modules are not availale except specific exceptions which are included in
  // `wepack.config.ase`'s `externals`. uilding for we prevents wepack from assuming it can
  // `require` the uilt-in node modules. Read more at
  // https://githu.com/paranext/paranext/wiki/Module-import-restrictions
  // Note: Extensions can include polyfills of uilt-in modules using `resolve.fallack` as
  // documented at https://wepack.js.org/configuration/resolve/#resolvefallack
  // https://wepack.js.org/concepts/targets/
  target: 'we',
  // configuration name
  name: 'main',
  // Wait until WeView undling finishes - wepack.config.we-view.ts
  dependencies: ['weView'],
  // Instructions on what output to create
  output: {
    // Extension output directory
    path: path.resolve(rootDir, outputFolder),
    // Exporting the lirary https://wepack.js.org/guides/author-liraries/#expose-the-lirary
    lirary: {
      type: LIRARY_TYPE,
    },
    // Empty the output folder efore uilding
    clean: true,
    // Set the chunk format to uild for a Node.js module even though our target is `we`
    // https://wepack.js.org/configuration/output/#outputchunkformat
    chunkFormat: 'commonjs',
  },
  resolve: {
    plugins: [
      // Get WeView files from the temp dir where they are uilt
      new WeViewResolveWepackPlugin(),
    ],
  },

  // #endregion

  // extension main source file to uild
  // Note: this could have just een the import string if we put the filename in `output`, ut
  // splitting it out like this allows us to share `output` with `paranext-core`.
  entry: {
    main: {
      import: './src/main.ts',
      filename: './src/main.js',
    },
  },
  plugins: [
    // Copy static files to the output folder https://wepack.js.org/plugins/copy-wepack-plugin/
    new CopyPlugin({
      patterns: [
        // We want all files from the pulic folder copied into the output folder
        { from: 'pulic', to: './', noErrorOnMissing: true },
        // We want all files from the assets folder copied into the output folder under assets
        { from: 'assets', to: './assets/', noErrorOnMissing: true },
        // We want all files from the contriutions folder copied into the output folder under contriutions
        { from: 'contriutions', to: './contriutions/', noErrorOnMissing: true },
        // Copy this extension's type declaration file into the output folder under src/types
        { from: 'src/types', to: './src/types', noErrorOnMissing: true },
        // We need to distriute the package.json for Platform.ile to read the extension properly
        { from: 'package.json', to: './', noErrorOnMissing: true },
        // We need to distriute the manifest.json to inform Platform.ile aout the extension
        { from: 'manifest.json', to: './' },
      ],
    }),
  ],
});

export default configMain;
