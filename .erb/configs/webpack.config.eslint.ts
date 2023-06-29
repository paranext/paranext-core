/* eslint import/no-unresolved: off, import/no-self-import: off */
import webpack from 'webpack';
import { merge } from 'webpack-merge';
import webpackPaths from './webpack.paths';
import rendererConfig from './webpack.config.renderer.dev';

const configuration: webpack.Configuration = {
  resolve: {
    // Must add extensions dist path here so eslint knows about the types provided by extensions
    // Must add our special module config path so eslint knows about it as well
    modules: [webpackPaths.extensionsDistPath, webpackPaths.srcDeclarationsPath],
  },
};

const eslintConfig = merge(rendererConfig, configuration);
export default eslintConfig;
