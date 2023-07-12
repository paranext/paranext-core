/**
 * Second Vite build step for transpiling main and packaging into an extension
 */

import { defineConfig } from 'vite';
import path from 'path';
import { importManager } from 'rollup-plugin-import-manager';
import escapeStringRegexp from 'escape-string-regexp';
import { Target, viteStaticCopy } from 'vite-plugin-static-copy';
import { string as importString } from 'rollup-plugin-string';
import {
  getExtensions,
  getFileExtensionByModuleFormat,
  getStaticFileName,
  getWebViewTsxPaths,
  insertWebViewTempDir,
  paranextProvidedModules,
  sourceFolder,
  staticFiles,
  webViewGlob,
  webViewTempGlob,
} from './vite.util';

// https://vitejs.dev/config/
const extensionConfig = defineConfig(async () => {
  /** tsxWebViews - List of TypeScript WebView files transpiled in the first build step */
  /** extensions - List of all the extensions to build */
  const [tsxWebViews, extensions] = await Promise.all([getWebViewTsxPaths(), getExtensions()]);

  return {
    plugins: [
      // Shared with https://github.com/paranext/paranext-extension-template/blob/main/vite/vite.config.ts
      // Redirect WebView imports to their version built in the first build step
      importManager({
        // Need to include all files that could import WebViews
        include: 'lib/**/*.{ts,tsx,js,jsx}',
        units: tsxWebViews.map((webView) => {
          const webViewInfo = path.parse(webView);
          // Get the file name without the extension if it is tsx as tsx is inferred when importing
          const webViewModuleName =
            webViewInfo.ext === '.tsx' ? webViewInfo.name : webViewInfo.base;
          return {
            module:
              // Match the whole module name, nothing more, nothing less
              new RegExp(`${escapeStringRegexp(webViewModuleName)}$`),
            actions: {
              select: 'module',
              rename: insertWebViewTempDir,
            },
          };
        }),
      }),
      // Copy the static files from each extension folder like manifest.json
      viteStaticCopy({
        targets: extensions.flatMap((extension) =>
          staticFiles.map(
            (staticFile): Target => ({
              // vite-static-copy-plugin does not accept path.join here as it does not work with backslashes
              src: `${sourceFolder}/${extension.dirName}/${getStaticFileName(
                staticFile,
                extension,
              )}`,
              dest: extension.dirName,
            }),
          ),
        ),
      }),
      // Shared with https://github.com/paranext/paranext-extension-template/blob/main/vite/vite.config.ts
      // Import web view files as strings to pass on the papi
      {
        ...importString({
          include: [webViewGlob, webViewTempGlob],
        }),
        // importString plugin must be after any other plugins that need to transpile these files
        enforce: 'post',
      },
    ],
    build: {
      // This project is a library as it is being used in Paranext
      lib: {
        // The main entry file of each extension to build
        entry: extensions
          .filter((extension) => !extension.skipBuildingJavaScript)
          .map((extension) => path.resolve(__dirname, '..', extension.entryFilePath)),
        // The output file name for the extension (file extension is appended)
        fileName: (moduleFormat, entryName) =>
          path.join(entryName, `${entryName}.${getFileExtensionByModuleFormat(moduleFormat)}`),
        // Output to cjs format as that's what Paranext supports. In production, es modules fail to
        // shim over import and deliver papi for some reason.
        formats: ['cjs'],
      },
      rollupOptions: {
        // Do not bundle papi because it will be imported in Paranext
        external: paranextProvidedModules,
      },
      // If watching, debounce building so we don't build off a build that was partially finished
      watch: process.argv.includes('--watch') ? { buildDelay: 1000 } : null,
      // Generate sourcemaps as separate files since VSCode can load them directly
      sourcemap: true,
    },
  };
});

export default extensionConfig;
