import 'webpack-dev-server';
import path from 'path';
import fs from 'fs';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import chalk from 'chalk';
import { merge } from 'webpack-merge';
import { ChildProcess, execSync, spawn } from 'child_process';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import baseConfig from './webpack.config.base';
import webpackPaths from './webpack.paths';
import checkNodeEnv from '../scripts/check-node-env';

// When an ESLint server is running, we can't set the NODE_ENV so we'll check if it's
// at the dev webpack config is not accidentally run in a production environment
if (process.env.NODE_ENV === 'production') {
  checkNodeEnv('development');
}

const port = process.env.PORT || 1212;
const manifest = path.resolve(webpackPaths.dllPath, 'renderer.json');
const skipDLLs =
  module.parent?.filename.includes('webpack.config.renderer.dev.dll') ||
  module.parent?.filename.includes('webpack.config.eslint');

/** Warn if the DLL is not built */
if (!skipDLLs && !(fs.existsSync(webpackPaths.dllPath) && fs.existsSync(manifest))) {
  console.log(
    chalk.black.bgYellow.bold(
      'The DLL files are missing. Sit back while we build them for you with "npm run build-dll"',
    ),
  );
  execSync('npm run postinstall');
}

const configuration: webpack.Configuration = {
  devtool: 'inline-source-map',

  mode: 'development',

  target: ['web', 'electron-renderer'],

  entry: [
    `webpack-dev-server/client?http://localhost:${port}/dist`,
    'webpack/hot/only-dev-server',
    path.join(webpackPaths.srcRendererPath, 'index.tsx'),
  ],

  output: {
    path: webpackPaths.distRendererPath,
    publicPath: '/',
    filename: 'renderer.dev.js',
    library: {
      type: 'umd',
    },
  },

  module: {
    rules: [
      {
        test: /\.s?(c|a)ss$/,
        resourceQuery: { not: [/raw/] },
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
            },
          },
          'sass-loader',
        ],
        include: /\.module\.s?(c|a)ss$/,
      },
      {
        test: /\.s?css$/,
        resourceQuery: { not: [/raw/] },
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: /\.module\.s?(c|a)ss$/,
      },
      // Fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        resourceQuery: { not: [/raw/] },
        type: 'asset/resource',
      },
      // Images
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        resourceQuery: { not: [/raw/] },
        type: 'asset/resource',
      },
      // SVG
      {
        test: /\.svg$/,
        resourceQuery: { not: [/raw/] },
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              prettier: false,
              svgo: false,
              svgoConfig: {
                plugins: [{ removeViewBox: false }],
              },
              titleProp: true,
              ref: true,
            },
          },
          'file-loader',
        ],
      },
    ],
  },
  plugins: [
    ...(skipDLLs
      ? []
      : [
          new webpack.DllReferencePlugin({
            context: webpackPaths.dllPath,
            manifest: require(manifest),
            sourceType: 'var',
          }),
        ]),

    new webpack.NoEmitOnErrorsPlugin(),

    /**
     * Create global constants which can be configured at compile time.
     *
     * Useful for allowing different behaviour between development builds and release builds
     *
     * NODE_ENV should be production so that modules do not perform certain development checks
     *
     * By default, use 'development' as NODE_ENV. This can be overriden with 'staging', for example,
     * by changing the ENV variables in the npm scripts
     */
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),

    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),

    new ReactRefreshWebpackPlugin(),

    new HtmlWebpackPlugin({
      filename: path.join('index.html'),
      template: path.join(webpackPaths.srcRendererPath, 'index.ejs'),
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true,
      },
      isBrowser: false,
      env: process.env.NODE_ENV,
      isDevelopment: process.env.NODE_ENV !== 'production',
      nodeModules: webpackPaths.appNodeModulesPath,
    }),

    new webpack.DefinePlugin({
      'process.type': '"renderer"',
      'webpackRenderer.isPackaged': 'false',
    }),
  ],

  node: {
    __dirname: false,
    __filename: false,
  },

  devServer: {
    port,
    compress: true,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    static: {
      publicPath: '/',
    },
    historyApiFallback: {
      verbose: true,
    },
    setupMiddlewares(middlewares) {
      type ChildProcessInfo = { process: ChildProcess | null; name: string };
      const childProcessInfos: ChildProcessInfo[] = [];

      console.log('Starting preload.js builder...');
      childProcessInfos.push({
        process: spawn('npm', ['run', 'start:preload'], {
          shell: true,
          stdio: 'inherit',
        }),
        name: 'Preload Builder',
      });

      console.log('Starting extensions builder...');
      childProcessInfos.push({
        process: spawn('npm', ['run', 'start:extensions'], {
          shell: true,
          stdio: 'inherit',
        }),
        name: 'Extension Builder',
      });

      console.log('Starting Main Process...');
      let args = ['run', 'start:main'];
      if (process.env.MAIN_ARGS) {
        args = args.concat(['--', ...process.env.MAIN_ARGS.matchAll(/"[^"]+"|[^\s"]+/g)].flat());
      }
      childProcessInfos.push({
        process: spawn('npm', args, {
          shell: true,
          stdio: 'inherit',
        }),
        name: 'Main',
      });

      function tryKillChildProcess(
        childProcessInfo: ChildProcessInfo,
        code: number,
        closingProcessName: string,
      ) {
        try {
          if (childProcessInfo.process) childProcessInfo.process.kill(code);
        } catch (e) {
          console.error(
            `${childProcessInfo.name} threw an error during closing of ${closingProcessName}! ${e}`,
          );
        }
      }

      // Link processes to each others' lifecycles
      childProcessInfos.forEach((childProcessInfo, i) => {
        if (childProcessInfo.process)
          childProcessInfo.process
            .on('close', (code: number) => {
              console.log(`${childProcessInfo.name} is closing!`);
              // Null to interact with external API
              // eslint-disable-next-line no-null/no-null
              childProcessInfo.process = null;
              // Close all other child processes and exit the main process
              childProcessInfos.forEach((otherProcessInfo, j) => {
                // Kill all processes but the one that is closing
                if (i !== j) tryKillChildProcess(otherProcessInfo, code, childProcessInfo.name);
              });
              process.exit(code);
            })
            .on('error', (spawnError) => console.error(spawnError));
      });

      // When this process closes, make sure all other processes shut down
      process.on('close', (code: number) => {
        console.log('Renderer (parent process) is closing!');
        childProcessInfos.forEach((childProcessInfo) =>
          tryKillChildProcess(childProcessInfo, code, 'Renderer (parent process)'),
        );
      });
      return middlewares;
    },
  },
};

const rendererConfig = merge(baseConfig, configuration);
export default rendererConfig;
