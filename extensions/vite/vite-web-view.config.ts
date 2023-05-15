// #region Shared with https://github.com/paranext/paranext-extension-template/blob/main/vite/vite-web-view.config.ts

/**
 * First Vite build step for transpiling TypeScript WebViews
 */

import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import { importManager } from 'rollup-plugin-import-manager';
import escapeStringRegexp from 'escape-string-regexp';
import {
  getFileExtensionByModuleFormat,
  getWebViewTsxPaths,
  paranextProvidedModules,
  webViewTempDir,
  webViewTsxGlob,
} from './vite.util';

// https://vitejs.dev/config/
const viteConfig = defineConfig(async () => {
  /** List of TypeScript WebView files to transpile */
  const tsxWebViews = await getWebViewTsxPaths();

  /** Tracks which entry file we're working with in determining the file name. */
  let entryFileIndex = 0;

  return {
    plugins: [
      // use React.createElement
      react({ jsxRuntime: 'classic' }),
      // Remove the Paranext global modules from the imports in React web views because they are provided globally
      importManager({
        include: webViewTsxGlob,
        units: paranextProvidedModules.map((module) => ({
          // Match the whole module name, nothing more, nothing less
          module: new RegExp(`^${escapeStringRegexp(module)}$`),
          actions: 'remove',
        })),
      }),
    ],
    build: {
      // This project is a library as it is being used in Paranext
      lib: {
        // List each WebView file as an entry file because each needs to be transpiled
        entry: tsxWebViews.map((webView) => path.resolve(__dirname, '../', webView)),
        /**
         * Get the output file name for each WebView.
         *
         * WARNING: We're assuming the file name function runs in order. We will
         * throw if we notice any issues with this assumption, but there is a
         * possibility that two different WebViews named the same in two different
         * files could get swapped if Vite doesn't play by our assumption.
         */
        fileName: (moduleFormat, entryName) => {
          // Get the corresponding webView file for this entry
          const webViewFilePath = tsxWebViews[entryFileIndex];
          const webViewFileInfo = path.parse(webViewFilePath);
          if (entryName !== webViewFileInfo.name)
            throw new Error(
              `Error building in Vite: entryName ${entryName} does not match WebView file name ${webViewFileInfo.name}! File path: ${webViewFilePath} entryFileIndex ${entryFileIndex}`,
            );

          // Set up the next call to this function to get the next WebView file
          // Vite does not get the config every time it rebuilds during watching, so we need to wrap the index manually as
          // Vite does not re-run the config and set the index back to zero
          entryFileIndex = (entryFileIndex + 1) % tsxWebViews.length;

          // Put transpiled WebViews in a temp folder in the same directory as the original WebView
          return path.join(
            webViewFileInfo.dir,
            webViewTempDir,
            `${webViewFileInfo.name}.${getFileExtensionByModuleFormat(moduleFormat)}`,
          );
        },
        // Output to cjs format as that's what Paranext supports. In production, es modules fail to
        // shim over import and deliver papi for some reason.
        formats: ['cjs'],
      },
      rollupOptions: {
        // Do not bundle papi because it will be imported in Paranext
        external: paranextProvidedModules,
      },
      // Bundle the sourcemap into the webview file since it will be injected as a string
      // into the main file
      sourcemap: 'inline',
      // We are placing the built WebView files next to their original files
      outDir: '',
      // We do not want to erase the entire project!
      emptyOutDir: false,
      // We do not want to copy the public files as we will do that in the next build step
      copyPublicDir: false,
    },
  };
});

export default viteConfig;

// #endregion
