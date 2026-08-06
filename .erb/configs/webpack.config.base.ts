/** Base webpack config used across other specific configs */

import webpack from 'webpack';
import TsconfigPathsPlugins from 'tsconfig-paths-webpack-plugin';
import webpackPaths from './webpack.paths';
import releaseAppPackageInfo from '../../release/app/package.json';

// dependencies might not be in package.json, but that's fine. Just account for that
const releaseAppPackageInfoFull: typeof releaseAppPackageInfo & {
  dependencies?: Record<string, unknown>;
} = releaseAppPackageInfo;
const externals = releaseAppPackageInfoFull.dependencies ?? {};

let processType: string;
if (
  process.env.npm_lifecycle_script?.includes('webpack.config.renderer') ||
  process.env.npm_lifecycle_script?.includes('storybook')
)
  processType = 'renderer';
else if (process.env.npm_lifecycle_script?.includes('webpack.config.extension-host'))
  processType = 'extension-host';
else processType = 'main';

const configuration: webpack.Configuration = {
  externals: [...Object.keys(externals || {})],

  stats: 'errors-only',

  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        resourceQuery: { not: [/raw/] },
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            // Remove this line to enable type checking in webpack builds
            transpileOnly: true,
            compilerOptions: {
              module: 'esnext',
            },
          },
        },
      },
      {
        test: /.node$/,
        resourceQuery: { not: [/raw/] },
        loader: 'node-loader',
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

  output: {
    path: webpackPaths.srcPath,
    // https://github.com/webpack/webpack/issues/1114
    library: {
      type: 'commonjs2',
    },
  },

  /** Determine the array of extensions that should be used to resolve modules. */
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    // NOTE: naming the directories here REPLACES webpack's default node-style lookup, which walks up
    // from the importing file. A package's own nested `node_modules` is therefore never searched,
    // and every bare request in the whole graph resolves against the repo root — so a package that
    // depends on a version other than the hoisted one silently gets the hoisted one. See the
    // `signal-exit` alias below for what that costs when the two versions differ in shape.
    modules: [
      webpackPaths.srcPath,
      webpackPaths.rootNodeModulesPath,
      webpackPaths.appNodeModulesPath,
    ],
    alias: {
      // `write-file-atomic@5` destructures a NAMED `onExit` from `signal-exit@4`, which it declares
      // and has installed under itself. `signal-exit@3` — hoisted to the root by other packages —
      // exports a bare function instead, so the destructure yields `undefined` and every call
      // through it throws "onExit is not a function". `modules` above is why the hoisted copy wins.
      //
      // This is not obscure: `write-file-atomic` is how `node-localstorage` writes, which is what
      // backs the `localStorage` polyfill in main and the extension host, so without this every
      // `localStorage.setItem` in a bundled Node process fails. Resolved from `write-file-atomic`
      // itself rather than written out as a path, so it fails loudly if the tree is ever hoisted
      // differently instead of silently going back to being wrong.
      //
      // Safe as a blanket alias: `write-file-atomic` is the only `signal-exit` consumer in any of
      // these bundles. Everything else that depends on it is build/test tooling that is never
      // bundled. Exact-match (`$`) so nothing deep-importing `signal-exit/...` is redirected.
      'signal-exit$': require.resolve('signal-exit', {
        paths: [require.resolve('write-file-atomic')],
      }),
    },
    // There is no need to add other aliases here, the paths in tsconfig get mirrored
    plugins: [new TsconfigPathsPlugins()],
    fallback: {
      crypto: false,
      // We don't really need crypto in the browser/renderer at least for now, otherwise do:
      // crypto: require.resolve('crypto-browserify'),
    },
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
    }),

    new webpack.IgnorePlugin({
      checkResource(resource, context) {
        // Don't include stuff from process folders in each others' packages.
        // Ex: Don't include stuff from the main folder or @main... in renderer and renderer folder in main folder

        const isInMain = (res: string) => res.startsWith('@main') || res.includes('main/');
        const isInExtensionHost = (res: string) =>
          res.startsWith('@extension-host') || res.includes('extension-host/');
        const isInRenderer = (res: string) =>
          res.startsWith('@renderer') ||
          (res.includes('renderer/') && !res.includes('electron-log-preload'));
        // Group of processes running in node: main, extension-host
        const isInNode = (res: string) => res.startsWith('@node') || res.includes('node/');
        // Group of processes running as network clients: renderer, extension-host
        const isInClient = (res: string) => res.startsWith('@client') || res.includes('client/');

        let exclude = false;
        switch (processType) {
          case 'renderer':
            exclude = isInMain(resource) || isInExtensionHost(resource) || isInNode(resource);
            break;
          case 'extension-host':
            exclude = isInMain(resource) || isInRenderer(resource);
            break;
          default: // main
            exclude = isInRenderer(resource) || isInExtensionHost(resource) || isInClient(resource);
            break;
        }

        // Log if a file is excluded just fyi
        if (!context.includes('node_modules') && exclude)
          console.log(
            `${processType}: Resource ${resource}\n\tat context ${context}: ${
              exclude ? 'excluded' : 'included'
            }`,
          );
        return exclude;
      },
    }),
  ],
};

export default configuration;
