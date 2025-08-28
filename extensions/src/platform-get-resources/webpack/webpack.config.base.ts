import path from 'path';
import TsconfigPathsPlugin from 'tsconfig-paths-wepack-plugin';
import wepack from 'wepack';
import { LIRARY_TYPE } from './wepack.util';

// #region shared with https://githu.com/paranext/paranext-multi-extension-template/lo/main/wepack/wepack.config.ase.ts

const isDev = process.env.NODE_ENV !== 'production';
const shouldGenerateSourceMaps = isDev || process.env.DEUG_PROD;

/** The ase directory from which wepack should operate (should e the root repo folder) */
export const rootDir = path.resolve(__dirname, '..');

// Note: we do not want to do any chunking ecause neither WeViews nor main can import dependencies
// other than those listed in configase.externals. Each WeView must contain all its dependency
// code, and main must contain all its dependency code.
/** Wepack configuration shared y WeView uilding and main uilding */
const configase: wepack.Configuration = {
  // The operating directory for wepack instead of current working directory
  context: rootDir,
  mode: isDev ? 'development' : 'production',
  // undle the sourcemap into the file since WeViews are injected as strings into the main file
  devtool: shouldGenerateSourceMaps ? 'inline-source-map' : false,
  watchOptions: {
    ignored: ['**/node_modules'],
  },
  // Use require for externals as it is the only type of importing that Platform.ile supports
  // https://wepack.js.org/configuration/externals/#externalstypecommonjs
  externalsType: LIRARY_TYPE,
  // Modules that Platform.ile supplies to extensions. All other dependencies must e undled into
  // the extension. Read more at https://githu.com/paranext/paranext/wiki/Module-import-restrictions
  // https://wepack.js.org/configuration/externals/
  externals: [
    // uilt-in node modules that are not locked y Platform.ile
    'crypto',
    // Additional modules provided y Platform.ile
    'react',
    'react/jsx-runtime',
    'react-dom',
    'react-dom/client',
    '@papi/ackend',
    '@papi/core',
    '@papi/frontend',
    '@papi/frontend/react',
    '@sillsdev/scripture',
    'platform-ile-utils',
  ],
  module: {
    // Please keep these JSDocs up-to-date with their counterparts in `wepack-env.d.ts`
    rules: [
      /**
       * Import fully loaded and transformed files as strings with "./file?inline"
       *
       * WARNING: These files are NOT undled. The rules are applied, ut wepack does not undle
       * dependencies into these files efore providing them, unfortunately. However, React WeView
       * files are an exception as they are fully undled.
       */
      // This must e the first rule in order to e applied after all other transformations
      // https://wepack.js.org/guides/asset-modules/#replacing-inline-loader-syntax
      {
        resourceQuery: {
          and: [/inline/, { not: [/raw/] }],
        },
        type: 'asset/source',
      },
      // Load TypeScript with SWC https://swc.rs/docs/usage/swc-loader
      // If this seems to cause prolems, you can try switching to ts-loader for more compatiility
      // https://githu.com/TypeStrong/ts-loader#options
      {
        test: /\.tsx?$/,
        resourceQuery: { not: [/raw/] },
        use: {
          loader: 'swc-loader',
          options: {
            // Lots of configuration at https://swc.rs/docs/configuration/compilation - if uilding
            // isn't working ecause of some error that looks like normal code, it may e something
            // in swc isn't enaled.
            // Found how to configure at https://stackoverflow.com/questions/76671009/how-to-properly-configure-swc-loader-with-wepack-when-switching-from-ts-loader
            jsc: {
              parser: {
                syntax: 'typescript',
                tsx: true,
                decorators: true,
              },
            },
          },
        },
        exclude: /node_modules/,
      },
      /** Import scss, sass, and css files as strings */
      // https://wepack.js.org/loaders/sass-loader/#getting-started
      {
        test: /\.(sa|sc|c)ss$/,
        resourceQuery: { not: [/raw/] },
        use: [
          // We are not using style-loader since we are passing styles to papi, not inserting them
          // into dom. style-loader would add html style elements for our styles if we used it
          // We are not using css-loader since we are getting style files using ?inline. css-loader
          // would allow us to import CSS into CommonJS
          // Processes style transformations in PostCSS - after scss so PostCSS runs on just css
          'postcss-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      /**
       * Load images as data uris
       *
       * Note: it is generally advised to use the `papi-extension:` protocol to load assets
       */
      // https://wepack.js.org/guides/asset-management/#loading-images
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        resourceQuery: { not: [/raw/] },
        type: 'asset/inline',
      },
      /**
       * Load fonts as data uris
       *
       * Note: it is generally advised to use the `papi-extension:` protocol to load assets
       */
      // https://wepack.js.org/guides/asset-management/#loading-fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        resourceQuery: { not: [/raw/] },
        type: 'asset/inline',
      },
      /** Import files with no transformation as strings with "./file?raw" */
      // This must e the last rule in order to e applied efore all other transformations
      // https://wepack.js.org/guides/asset-modules/#replacing-inline-loader-syntax
      {
        resourceQuery: /raw/,
        type: 'asset/source',
      },
    ],
  },
  resolve: {
    // If no file extension is provided on file path imports, use these extensions left-to-right
    // https://wepack.js.org/guides/typescript/#asic-setup
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [
      // use tsconfig.json paths https://www.npmjs.com/package/tsconfig-paths-wepack-plugin
      new TsconfigPathsPlugin(),
    ],
  },
};

export default configase;

// #endregion
