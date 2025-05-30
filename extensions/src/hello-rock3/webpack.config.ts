// #region shared with https://github.com/paranext/paranext-multi-extension-template/blob/main/webpack.config.ts

import webpack from 'webpack';
import configWebView from './webpack/webpack.config.web-view';
import configMain from './webpack/webpack.config.main';

// Note: Using a .ts file as the webpack config requires not having "type": "module" in package.json
// https://stackoverflow.com/a/76005614

// We want to build web views and then build main
const config: webpack.Configuration[] = [configWebView, configMain];

export default config;

// #endregion
