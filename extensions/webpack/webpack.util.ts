import webpack from 'webpack';
import path from 'path';
import { glob } from 'glob';
import fs from 'fs';
import { Pattern } from 'copy-webpack-plugin';
import { LIBRARY_TYPE } from './webpack.config.base';

// #region shared with https://github.com/paranext/paranext-extension-template/blob/main/webpack/webpack.util.ts

/**
 * String of what a web view needs to have in its name before the file extension to be considered a
 * web-view
 *
 * Web Views should be named <name>.web-view.<extension>
 */
const webViewTag = '.web-view';
/**
 * Glob filename matcher for React web views.
 * React Web Views should be named <name>.web-view.tsx
 */
const webViewTsxGlob = '**/*.web-view.tsx';
/**
 * Regex file name matcher for React web views.
 * React Web Views should be named <name>.web-view.tsx
 *
 * Note: this regex allows the extension to be optional.
 */
export const webViewTsxRegex = /.+\.web-view(\.[tj]sx)?$/;
/** Name of adjacent folder used to store bundled WebView files */
export const webViewTempDir = 'temp-build';

/** Folder containing the built extension files */
export const outputFolder = 'dist';

/**
 * Get a list of TypeScript WebView files to bundle.
 * Path relative to project root
 */
function getWebViewTsxPaths() {
  return glob(webViewTsxGlob, { ignore: 'node_modules/**' });
}

/**
 * Gets the bundled WebView path for a WebView file path
 * @param webViewPath relative path to webView e.g. './src/extension-template.web-view.tsx'
 * @param join function to use to join the paths together
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
 * @returns promise that resolves to the webView entry config
 */
export async function getWebViewEntries(): Promise<webpack.EntryObject> {
  const tsxWebViews = await getWebViewTsxPaths();
  const webViewEntries = Object.fromEntries(
    tsxWebViews.map((webViewPath) => [
      webViewPath,
      {
        import: webViewPath,
        filename: getWebViewTempPath(webViewPath),
      } as webpack.EntryObject[string],
    ]),
  );
  return webViewEntries;
}

// #endregion

// #region not shared with others

/** Folder containing the source files for the extensions */
const sourceFolder = 'src';

/** dirNames of extensions that should be copied to the output folder but not bundled */
const extensionsNotBundled = [
  // Webpack wouldn't leave the requires alone even with webpackIgnore: true. Apparently webpack
  // catches errors and returns {} when it can't find a module :(
  'evil',
];

/** List of static files to copy from each extension's source directory */
const staticFiles = [
  // Distribute the extension's assets
  'assets',
  // Distribute the extension manifest
  'manifest.json',
  // We need to distribute the package.json for Paranext to read the extension properly
  'package.json',
  // If the extension declares its types as an index.d.ts, copy that into the output
  'index.d.ts',
  // Copy the extension's type declaration file into the output folder
  // TODO: check each extension's package.json -> "types" property for this instead of assuming
  // it will be the same as the entry file name.
  '<entry_file_name>.d.ts',
];

/** Get the actual static file name from the template static file name */
function getStaticFileName(staticFile: string, extensionInfo: ExtensionInfo) {
  return staticFile.replace(/<entry_file_name>/g, extensionInfo.entryFileName);
}

/** Get CopyFile plugin patterns for copying static files for an extension */
function getCopyFilePatternsForExtension(extension: ExtensionInfo) {
  return staticFiles.map((staticFile): Pattern => {
    // If the extension should just be copied over, not bundled, copy the whole folder
    if (extensionsNotBundled.includes(extension.dirName)) {
      return {
        from: path.join(sourceFolder, extension.dirName),
        to: extension.dirName,
      };
    }

    // The extension should be bundled normally
    /** The path to the file to copy but without the source or the output folder */
    const internalFilePath = path.join(extension.dirName, getStaticFileName(staticFile, extension));
    return {
      from: path.join(sourceFolder, internalFilePath),
      to: internalFilePath,
      // Don't throw an error when you miss the file as not all of these files are present
      noErrorOnMissing: true,
    };
  });
}

/**
 * Get CopyFile plugin patterns for copying static files for each extension
 *
 * These patterns are used to copy files in each extension in the main build step
 */
export function getMainCopyFilePatterns(extensions: ExtensionInfo[]): Pattern[] {
  const mainCopyFilePatterns = extensions.flatMap((extension) =>
    getCopyFilePatternsForExtension(extension),
  );
  return mainCopyFilePatterns;
}

/**
 * Replace the file extension on a file on a path
 * @param filePath path to file including the file name and extension
 * @param newExtension extension to replace the existing extension with
 * @returns file path with new extension
 */
function replaceExtension(filePath: string, newExtension: string): string {
  const fileInfo = path.parse(filePath);
  return path.join(fileInfo.dir, `${fileInfo.name}.${newExtension}`);
}

/**
 * Get webpack entry configuration to build each extension main source file
 *
 * @returns promise that resolves to the main entry config
 */
export function getMainEntries(extensions: ExtensionInfo[]): webpack.EntryObject {
  const mainEntries: webpack.EntryObject = Object.fromEntries(
    extensions
      // Don't bundle extensions with no main and and extensions that should just be copied over
      .filter(
        (extension) =>
          !extension.skipBuildingJavaScript && !extensionsNotBundled.includes(extension.dirName),
      )
      .map((extension) => [
        extension.entryFileName,
        {
          import: extension.entryFilePath,
          // Output to the extension output folder as .js
          filename: path.join(
            // Need to remove the source directory from the start of the path and the file name from
            // the end of the path
            ...extension.entryFilePath.split(path.sep).slice(1, -1),
            replaceExtension(extension.entryFileName, 'js'),
          ),
          // Exposing multiple libraries https://webpack.js.org/concepts/entry-points/#entrydescription-object
          library: {
            type: LIBRARY_TYPE,
          },
        } as webpack.EntryObject[string],
      ]),
  );
  return mainEntries;
}

// #endregion

// #region sort-of shared with extension.service.ts

/**
 * Information about an extension provided by the extension developer.
 * This will be transformed and frozen into an ExtensionInfo before use
 */
type ExtensionManifest = {
  name: string;
  version: string;
  /**
   * The JavaScript file to run in the extension host.
   *
   * Must be specified. Can be `null` if the extension does not have any JavaScript to run.
   */
  main: string | null;
  activationEvents: string[];
};

/** Build-related info for each extension */
export type ExtensionInfo = {
  /** The name directory that this extension is in */
  dirName: string;
  /** The name of the manifest.main file without the file extension */
  entryFileName: string;
  /** The path to the manifest.main file relative to root */
  entryFilePath: string;
  /** The extension's version */
  version: string;
  /**
   * Whether to skip this extension when building. If the manifest main is null, there is no
   * JavaScript to build
   */
  skipBuildingJavaScript?: boolean;
};

/**
 * Gets a list of the extension folders and their respective entry files
 *
 * Note that this does not transform the main file .ts into .js unlike extension.service
 */
// TODO: figure out if we can share this code with extension.service.ts.
export async function getExtensions(): Promise<ExtensionInfo[]> {
  // Get names of each folder in the source folder
  const extensionFolderNames = (
    await fs.promises.readdir(sourceFolder, {
      withFileTypes: true,
    })
  )
    .filter((dirEntry) => dirEntry.isDirectory())
    .map((dirEntry) => dirEntry.name);

  // Return extension info for each extension folder
  return Promise.all(
    extensionFolderNames.map(async (extensionFolderName) => {
      const extensionManifestJson = await fs.promises.readFile(
        path.join(sourceFolder, extensionFolderName, 'manifest.json'),
        'utf8',
      );
      const extensionManifest = Object.freeze({
        // Note that this does not transform the main file .ts into .js unlike extension.service
        ...(JSON.parse(extensionManifestJson) as ExtensionManifest),
      });

      // Get main file path from the manifest and return extension info
      return extensionManifest.main !== null
        ? {
            dirName: extensionFolderName,
            entryFileName: path.parse(extensionManifest.main).name,
            entryFilePath: path.join(sourceFolder, extensionFolderName, extensionManifest.main),
            version: extensionManifest.version,
          }
        : {
            dirName: extensionFolderName,
            entryFileName: '',
            entryFilePath: '',
            version: extensionManifest.version,
            skipBuildingJavaScript: true,
          };
    }),
  );
}
