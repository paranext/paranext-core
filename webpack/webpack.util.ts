import webpack from 'webpack';
import path from 'path';
import { glob } from 'glob';

// #region shared with https://github.com/paranext/paranext-multi-extension-template/blob/main/webpack/webpack.util.ts

/**
 * String of what a web view needs to have in its name before the file extension to be considered a
 * web-view
 *
 * Web Views should be named <name>.web-view.<extension>
 */
const webViewTag = '.web-view';
/** Glob filename matcher for React web views. React Web Views should be named <name>.web-view.tsx */
const webViewTsxGlob = '**/*.web-view.tsx';
/**
 * Regex file name matcher for React web views. React Web Views should be named <name>.web-view.tsx
 *
 * Note: this regex allows the extension to be optional.
 */
export const webViewTsxRegex = /.+\.web-view(\.[tj]sx)?$/;
/** Name of adjacent folder used to store bundled WebView files */
export const webViewTempDir = 'temp-build';

/** Folder containing the built extension files */
export const outputFolder = 'dist';

/** Get a list of TypeScript WebView files to bundle. Path relative to project root */
function getWebViewTsxPaths() {
  return glob(webViewTsxGlob, { ignore: 'node_modules/**' });
}

/**
 * Gets the bundled WebView path for a WebView file path
 *
 * @param webViewPath Relative path to webView e.g. './src/extension-template.web-view.tsx'
 * @param join Function to use to join the paths together
 * @returns WebView path with temporary WebView directory inserted into the module path
 */
export function getWebViewTempPath(
  webViewPath: string,
  join: (path: string, request: string) => string = path.join,
) {
  const webViewInfo = path.parse(webViewPath);

  // If the web view doesn't have a file extension, parsing makes it think the extension is
  // '.web-view', so we need to add it back
  const webViewName = webViewInfo.ext === webViewTag ? webViewInfo.base : webViewInfo.name;
  // Put transpiled WebViews in a temp folder in the same directory as the original WebView
  // Make sure to preserve the ./ to indicate it is a relative path
  return `${webViewPath.startsWith('./') ? './' : ''}${join(
    webViewInfo.dir,
    join(webViewTempDir, `${webViewName}.js`),
  )}`;
}

/**
 * Get webpack entry configuration to build each web-view source file and put it in a temporary
 * folder in the same directory
 *
 * @returns Promise that resolves to the webView entry config
 */
export async function getWebViewEntries(): Promise<webpack.EntryObject> {
  const tsxWebViews = await getWebViewTsxPaths();
  const webViewEntries = Object.fromEntries(
    tsxWebViews.map((webViewPath): [string, webpack.EntryObject[string]] => [
      webViewPath,
      {
        import: webViewPath,
        filename: getWebViewTempPath(webViewPath),
      },
    ]),
  );
  return webViewEntries;
}

// #endregion
