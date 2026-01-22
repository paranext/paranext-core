import path from 'path';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import webpack from 'webpack';
import { getExtensionFolderNamesSync, LIBRARY_TYPE } from './webpack.util';

// Exit if there are no extensions yet
const areExtensionsPresent = getExtensionFolderNamesSync().length > 0;
if (!areExtensionsPresent) {
  // This is a command-line utility for which it is fine to print to the console
  // eslint-disable-next-line no-console
  console.log(
    'No extensions found! Please run `npm run create-extension -- <extension-name>` (kebab-case) to create an extension. See README.md for more information.',
  );
  process.exit(0);
}

// #region shared with https://github.com/paranext/paranext-extension-template/blob/main/webpack/webpack.config.base.ts

const isDev = process.env.NODE_ENV !== 'production';
const shouldGenerateSourceMaps =
  (isDev || process.env.DEBUG_PROD) && process.env.PT_DISABLE_SOURCE_MAPS !== 'true';

/** The base directory from which webpack should operate (should be the root repo folder) */
export const rootDir = path.resolve(__dirname, '..');

// Note: we do not want to do any chunking because neither WebViews nor main can import dependencies
// other than those listed in configBase.externals. Each WebView must contain all its dependency
// code, and main must contain all its dependency code.
/** Webpack configuration shared by WebView building and main building */
const configBase: webpack.Configuration = {
  // The operating directory for webpack instead of current working directory
  context: rootDir,
  mode: isDev ? 'development' : 'production',
  // Bundle the sourcemap into the file since WebViews are injected as strings into the main file
  devtool: shouldGenerateSourceMaps ? 'inline-source-map' : false,
  watchOptions: {
    ignored: ['**/node_modules'],
  },
  // Enable persistent caching for faster rebuilds
  cache: {
    type: 'filesystem',
    cacheDirectory: path.resolve(rootDir, '..', 'node_modules', '.cache', 'webpack-extensions'),
    buildDependencies: {
      config: [__filename],
      postcss: [path.resolve(rootDir, 'postcss.config.ts')],
      tailwind: [path.resolve(rootDir, 'tailwind.config.ts')],
      tsconfig: [path.resolve(rootDir, 'tsconfig.json')],
      webpack: [path.resolve(rootDir, 'webpack.config.ts')],
    },
    compression: 'gzip',
    maxMemoryGenerations: 5,
  },
  // Use require for externals as it is the only type of importing that Platform.Bible supports
  // https://webpack.js.org/configuration/externals/#externalstypecommonjs
  externalsType: LIBRARY_TYPE,
  // Modules that Platform.Bible supplies to extensions. All other dependencies must be bundled into
  // the extension. Read more at https://github.com/paranext/paranext/wiki/Module-import-restrictions
  // https://webpack.js.org/configuration/externals/
  externals: [
    // Built-in node modules that are not blocked by Platform.Bible
    'crypto',
    // Additional modules provided by Platform.Bible
    'react',
    'react/jsx-runtime',
    'react-dom',
    'react-dom/client',
    '@papi/backend',
    '@papi/core',
    '@papi/frontend',
    '@papi/frontend/react',
    '@sillsdev/scripture',
    'platform-bible-utils',
  ],
  module: {
    // Please keep these JSDocs up-to-date with their counterparts in `webpack-env.d.ts`
    rules: [
      /**
       * Import fully loaded and transformed files as strings with "./file?inline"
       *
       * WARNING: These files are NOT bundled. The rules are applied, but webpack does not bundle
       * dependencies into these files before providing them, unfortunately. However, React WebView
       * files are an exception as they are fully bundled.
       */
      // This must be the first rule in order to be applied after all other transformations
      // https://webpack.js.org/guides/asset-modules/#replacing-inline-loader-syntax
      {
        resourceQuery: {
          and: [/inline/, { not: [/raw/] }],
        },
        type: 'asset/source',
      },
      // Load TypeScript with SWC https://swc.rs/docs/usage/swc-loader
      // If this seems to cause problems, you can try switching to ts-loader for more compatibility
      // https://github.com/TypeStrong/ts-loader#options
      {
        test: /\.tsx?$/,
        resourceQuery: { not: [/raw/] },
        use: {
          loader: 'swc-loader',
          options: {
            // Lots of configuration at https://swc.rs/docs/configuration/compilation - if building
            // isn't working because of some error that looks like normal code, it may be something
            // in swc isn't enabled.
            // Found how to configure at https://stackoverflow.com/questions/76671009/how-to-properly-configure-swc-loader-with-webpack-when-switching-from-ts-loader
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
      // https://webpack.js.org/loaders/sass-loader/#getting-started
      // Using oneOf to ensure only one sub-rule matches per file
      {
        test: /\.(sa|sc|c)ss$/,
        resourceQuery: { not: [/raw/] },
        oneOf: [
          /**
           * Import the pre-built Tailwind CSS file. The tailwind.css file is pre-built by the
           * `prebuild:tailwind` script before webpack runs, so we don't need to run Tailwind here.
           * This dramatically speeds up the build because Tailwind's content scanning only happens
           * once during prebuild instead of once per extension.
           */
          {
            test: /tailwind\.prebuild\.css$/,
            // No loaders needed - the CSS is already fully processed by the prebuild script
            type: 'asset/source',
          },
          /** All other CSS/SCSS files - process with autoprefixer and sass-loader */
          {
            use: [
              // We are not using style-loader since we are passing styles to papi, not inserting them
              // into dom. style-loader would add html style elements for our styles if we used it
              // We are not using css-loader since we are getting style files using ?inline. css-loader
              // would allow us to import CSS into CommonJS
              // Processes style transformations in PostCSS - after scss so PostCSS runs on just css
              // Using autoprefixer only (no tailwindcss) for non-tailwind CSS files for performance
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: ['autoprefixer'],
                  },
                },
              },
              // Compiles Sass to CSS
              'sass-loader',
            ],
          },
        ],
      },
      /**
       * Load images as data uris
       *
       * Note: it is generally advised to use the `papi-extension:` protocol to load assets
       */
      // https://webpack.js.org/guides/asset-management/#loading-images
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
      // https://webpack.js.org/guides/asset-management/#loading-fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        resourceQuery: { not: [/raw/] },
        type: 'asset/inline',
      },
      /** Import files with no transformation as strings with "./file?raw" */
      // This must be the last rule in order to be applied before all other transformations
      // https://webpack.js.org/guides/asset-modules/#replacing-inline-loader-syntax
      {
        resourceQuery: /raw/,
        type: 'asset/source',
      },
    ],
  },
  resolve: {
    // Redirect all tailwind.css imports to the pre-built file for faster builds.
    // The pre-built file is generated by `npm run prebuild:tailwind` before webpack runs.
    alias: {
      // Match any path ending in tailwind.css and redirect to the pre-built version
      // This regex matches paths like './tailwind.css', '../src/tailwind.css', etc.
    },
    // If no file extension is provided on file path imports, use these extensions left-to-right
    // https://webpack.js.org/guides/typescript/#basic-setup
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [
      // use tsconfig.json paths https://www.npmjs.com/package/tsconfig-paths-webpack-plugin
      new TsconfigPathsPlugin(),
      // Custom plugin to redirect tailwind.css imports to the pre-built version
      {
        apply(resolver: any) {
          const target = resolver.ensureHook('resolved');
          resolver
            .getHook('described-resolve')
            .tapAsync(
              'TailwindPrebuiltPlugin',
              (request: any, resolveContext: any, callback: any) => {
                // Check if the request is for a tailwind.css file
                if (request.request && request.request.endsWith('tailwind.css')) {
                  const prebuiltPath = path.resolve(rootDir, 'temp-build', 'tailwind.prebuild.css');
                  const newRequest = {
                    ...request,
                    request: prebuiltPath,
                    path: prebuiltPath,
                  };
                  return resolver.doResolve(
                    target,
                    newRequest,
                    `Redirecting tailwind.css to pre-built version`,
                    resolveContext,
                    callback,
                  );
                }
                return callback();
              },
            );
        },
      },
    ],
  },
};

export default configBase;

// #endregion
