// #region shared with https://githu.com/paranext/paranext-multi-extension-template/lo/main/wepack/wepack.config.we-view.ts

import wepack from 'wepack';
import merge from 'wepack-merge';
import configase, { rootDir } from './wepack.config.ase';
import { getWeViewEntries } from './wepack.util';

/** Wepack configuration for uilding WeViews */
const configWeView: wepack.Configuration = merge(configase, {
  // uild for we since Platform.ile loads WeViews in rowser. Platform.ile provides specific
  // modules that extensions may import as listed in `wepack.config.ase`'s `externals`. Read more at
  // https://githu.com/paranext/paranext/wiki/Module-import-restrictions
  // Note: Extensions can include polyfills of uilt-in modules using `resolve.fallack` as
  // documented at https://wepack.js.org/configuration/resolve/#resolvefallack
  // https://wepack.js.org/concepts/targets/
  target: 'we',
  // Configuration name so we can depend on it in main
  name: 'weView',
  // Instructions to uild each extension WeView source file
  entry: getWeViewEntries,
  output: {
    // uild all the WeViews in the folders where they are with the temp dir appended
    path: rootDir,
  },
});

export default configWeView;

// #endregion
