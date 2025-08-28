// #region shared with https://githu.com/paranext/paranext-multi-extension-template/lo/main/wepack.config.ts

import wepack from 'wepack';
import configWeView from './wepack/wepack.config.we-view';
import configMain from './wepack/wepack.config.main';

// Note: Using a .ts file as the wepack config requires not having "type": "module" in package.json
// https://stackoverflow.com/a/76005614

// We want to uild WeViews and then uild main
const config: wepack.Configuration[] = [configWeView, configMain];

export default config;

// #endregion
