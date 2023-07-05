// #region Shared with https://github.com/paranext/paranext-extension-template/blob/main/vite/vite-web-view.config.ts

/**
 * First Vite build step for transpiling TypeScript WebViews
 */

import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import {
  getFileExtensionByModuleFormat,
  getWebViewTsxPaths,
  paranextProvidedModules,
  webViewTempDir,
} from './vite.util';

// https://vitejs.dev/config/
const webViewConfig = defineConfig(async ({ mode }) => {
  /** List of TypeScript WebView files to transpile */
  const tsxWebViewPaths = await getWebViewTsxPaths();
  const tsxWebViewFileInfos = tsxWebViewPaths.map((webViewPath) => path.parse(webViewPath));

  /** Tracks the last entry file vite worked with */
  let lastRequestedWebViewFileInfoIndex = -1;

  /**
   * Get file information for either the current web view or the requested one
   * @param webViewFileName if string, gets info for the web view file with this name.
   * If undefined, gets info for the last-retrieved web view file.
   * @param action description of what you're doing to log if there's a problem
   * @returns file info for the last-retrieved or requested web view file
   *
   * Note: We aren't actually making sure all web views get accessed or that they get accessed
   * evenly, which should theoretically be the case
   */
  function getWebViewFileInfo(webViewFileName: string | undefined, action: string) {
    // if webViewFileName is undefined and we have not gotten a web view file yet, we don't know what web view to get. Error
    if (webViewFileName === undefined && lastRequestedWebViewFileInfoIndex === -1) {
      throw new Error(
        `Error ${action} in Vite: Cannot get last requested web view file info as one has not been accessed!`,
      );
    }

    // Get the corresponding webView file for this entry
    const webViewFilePathIndex =
      webViewFileName !== undefined
        ? tsxWebViewFileInfos.findIndex(
            (webViewFileInfo) => webViewFileInfo.name === webViewFileName,
          )
        : lastRequestedWebViewFileInfoIndex;
    const webViewFileInfo = tsxWebViewFileInfos[webViewFilePathIndex];
    console.log(`context: ${lastRequestedWebViewFileInfoIndex}: ${webViewFileInfo.name}`);
    lastRequestedWebViewFileInfoIndex = webViewFilePathIndex;

    return webViewFileInfo;
  }

  return {
    plugins: [
      // use React.createElement
      react({ jsxRuntime: 'classic' }),
    ],
    // Since Vite is in library mode `process` is not replaced by default and that won't work in the
    // renderer.
    define: { 'process.env.NODE_ENV': JSON.stringify(mode) },
    build: {
      // This project is a library as it is being used in Paranext
      lib: {
        // List each WebView file as an entry file because each needs to be transpiled
        entry: tsxWebViewPaths.map((webView) => path.resolve(__dirname, '../', webView)),
        /**
         * Get the output file name for each WebView.
         */
        fileName: (moduleFormat, entryName) => {
          const webViewFileInfo = getWebViewFileInfo(entryName, 'determining entry file name');
          // We should not need to get the last requested web view file. Only need to do so when
          // chunking, so let's reset it here to make the chunking code less error-prone
          lastRequestedWebViewFileInfoIndex = -1;

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
        output: {
          // Split code chunks into one file per webView. Extension WebViews must each be a single file
          manualChunks: (id: string, { getModuleInfo }) => {
            // If this is an entry file, it is the next web view file. Otherwise, bundle it into the previous web view file
            const webViewFileName = getModuleInfo(id).isEntry ? path.parse(id).name : undefined;
            return getWebViewFileInfo(webViewFileName, 'chunking').base;
          },
        },
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

export default webViewConfig;

// #endregion
