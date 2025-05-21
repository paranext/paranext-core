import webpack from 'webpack';
import path from 'path';
import { glob } from 'glob';
import fs from 'fs';
import { Pattern } from 'copy-webpack-plugin';

// #region shared with https://github.com/paranext/paranext-extension-template/blob/main/webpack/webpack.util.ts

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

/**
 * The module format of library we want webpack to use for externals and create for our extensions
 *
 * @see webpack.Configuration['externalsType'] for info about external import format
 * @see webpack.LibraryOptions['type'] for info about library format
 */
// commonjs-static formats the code to export everything on module.exports.<export_name> so it works
// well in cjs or esm https://webpack.js.org/configuration/output/#type-commonjs-static
export const LIBRARY_TYPE: NonNullable<webpack.Configuration['externalsType']> = 'commonjs-static';

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
  const webViewEntries: webpack.EntryObject = Object.fromEntries(
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

// #region not shared with others

/** Folder containing the source files for the extensions */
export const sourceFolder = 'src';

/**
 * `dirNames` of extensions that should be copied to the output folder but not bundled
 *
 * Sometimes, you may want to make straight CommonJS JavaScript extensions without any webpack
 * involvement. Put those here to have them copied straight over.
 *
 * Webpack wouldn't leave the requires alone even with webpackIgnore: true. Apparently webpack
 * catches errors and returns {} when it can't find a module :(
 */
const extensionsNotBundled: string[] = [];

/** List of static files to copy from each extension's source directory */
const staticFiles: {
  /** Path to static file source relative to the extension's folder */
  from: string;
  /**
   * Path to static file destination relative to the extension's folder.
   *
   * If not provided, this will be the same as `from`
   */
  to?: string;
  /* If true, don't throw an error when you miss the file (not all of these files are always present) */
  noErrorOnMissing?: boolean;
}[] = [
  // Distribute the extension's public folder contents
  { from: 'public', to: './', noErrorOnMissing: true },
  // Distribute the extension's assets
  { from: 'assets', noErrorOnMissing: true },
  // Distribute the extension's contributions
  { from: 'contributions', noErrorOnMissing: true },
  // Distribute the extension manifest
  { from: 'manifest.json' },
  // We need to distribute the package.json for Platform.Bible to read the extension properly
  { from: 'package.json', noErrorOnMissing: true },
  // If the extension declares its types as an index.d.ts, copy that into the output
  { from: 'index.d.ts', noErrorOnMissing: true },
  // Copy the extension's type declaration file into the output folder if it's called the same as
  // the extension's name
  { from: '<name>.d.ts', noErrorOnMissing: true },
  // Copy the type declaration file into the output folder based on its listing in `manifest.types`
  { from: '<types>', noErrorOnMissing: true },
  // Copy the menu JSON file into the output folder based on its listing in `manifest.menus`
  { from: '<menus>', noErrorOnMissing: true },
  // Copy the settings JSON file into the output folder based on its listing in `manifest.settings`
  { from: '<settings>', noErrorOnMissing: true },
  // Copy the project settings JSON file into the output folder based on its listing in `manifest.projectSettings`
  { from: '<project_settings>', noErrorOnMissing: true },
  // Copy the localized strings JSON file into the output folder based on its listing in `manifest.localizedStrings`
  { from: '<localized_strings>', noErrorOnMissing: true },
  // Copy the themes JSON file into the output folder based on its listing in `manifest.themes`
  { from: '<themes>', noErrorOnMissing: true },
  // Copy the display data JSON file into the output folder based on its listing in `manifest.displayData`
  { from: '<display_data>', noErrorOnMissing: true },
];

/** Get the actual static file name from the template static file name */
function getStaticFileName(staticFile: string, extensionInfo: ExtensionInfo) {
  return staticFile
    .replace(/<name>/g, extensionInfo.name)
    .replace(/<types>/g, extensionInfo.types ?? '')
    .replace(/<menus>/g, extensionInfo.menus ?? '')
    .replace(/<settings>/g, extensionInfo.settings ?? '')
    .replace(/<project_settings>/g, extensionInfo.projectSettings ?? '')
    .replace(/<localized_strings>/g, extensionInfo.localizedStrings ?? '')
    .replace(/<themes>/g, extensionInfo.themes ?? '')
    .replace(/<display_data>/g, extensionInfo.displayData ?? '');
}

/** Get CopyFile plugin patterns for copying static files for an extension */
function getCopyFilePatternsForExtension(extension: ExtensionInfo) {
  // If the extension should just be copied over, not bundled, copy the whole folder
  if (extensionsNotBundled.includes(extension.dirName)) {
    return [
      {
        from: path.join(sourceFolder, extension.dirName),
        to: extension.dirName,
      },
    ];
  }

  // The extension should be bundled normally
  // Remove 'undefined' from the return value because the filter takes them out
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return staticFiles
    .map((staticFile): Pattern | undefined => {
      const staticFileFrom = getStaticFileName(staticFile.from, extension);
      if (!staticFileFrom) return undefined;
      // The input path to the file to copy but without the source or the output folder
      const internalFilePathFrom = path.join(extension.dirName, staticFileFrom);
      // The output path to the file to copy but without the source or the output folder
      const internalFilePathTo = staticFile.to
        ? path.join(extension.dirName, getStaticFileName(staticFile.to, extension))
        : internalFilePathFrom;
      return {
        from: path.join(sourceFolder, internalFilePathFrom),
        to: internalFilePathTo,
        noErrorOnMissing: staticFile.noErrorOnMissing,
      };
    })
    .filter((value) => !!value) as Pattern[];
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
 *
 * @param filePath Path to file including the file name and extension
 * @param newExtension Extension to replace the existing extension with
 * @returns File path with new extension
 */
function replaceExtension(filePath: string, newExtension: string): string {
  const fileInfo = path.parse(filePath);
  return path.join(fileInfo.dir, `${fileInfo.name}.${newExtension}`);
}

/**
 * Get webpack entry configuration to build each extension main source file
 *
 * @returns Promise that resolves to the main entry config
 */
export function getMainEntries(extensions: ExtensionInfo[]): webpack.EntryObject {
  const mainEntries: webpack.EntryObject = Object.fromEntries(
    extensions
      // Don't bundle extensions with no main and and extensions that should just be copied over
      .filter(
        (extension) =>
          !extension.shouldCopyOnly && !extensionsNotBundled.includes(extension.dirName),
      )
      .map((extension) => [
        extension.entryFilePath,
        {
          import: extension.entryFilePath,
          // Output to the extension output folder as .js
          filename: replaceExtension(path.join(extension.dirName, extension.main), 'js'),
          // Exposing multiple libraries https://webpack.js.org/concepts/entry-points/#entrydescription-object
          library: {
            type: LIBRARY_TYPE,
          },
        },
      ]),
  );
  return mainEntries;
}

/**
 * Get the path to the extension directory relative to root
 *
 * @param extensionDirName The name of the directory that this extension is in
 * @param shouldBeOSIndependent If true, use the OS-independent path separator. This path needs to
 *   be OS-independent in git commands identifying the git subtree for this extension
 * @returns Path to the extension to format relative to root
 */
export function getExtensionPath(extensionDirName: string, shouldBeOSIndependent: boolean) {
  return `${sourceFolder}${shouldBeOSIndependent ? '/' : path.sep}${extensionDirName}`;
}

// #endregion

// #region sort-of shared with extension.service.ts

/**
 * Information about an extension provided by the extension developer. This will be transformed and
 * frozen into an ExtensionInfo before use
 */
type ExtensionManifest = {
  /** The extension's name from the manifest */
  name: string;
  /** The extension's version from the manifest */
  version: string;
  /**
   * Path to the JavaScript file to run in the extension host. Relative to the extension's root
   * folder.
   *
   * Must be specified. Can be an empty string ('') if the extension does not have any JavaScript to
   * run.
   */
  main: string;
  /**
   * Path to the TypeScript type declaration file that describes this extension and its interactions
   * on the PAPI. Relative to the extension's root folder.
   *
   * If not provided, Platform.Bible will look in the following locations:
   *
   * 1. `<extension-name>.d.ts` (kebab-case version of the extension name)
   * 2. `<extension-name><other_stuff>.d.ts` (kebab-case version of the extension name)
   * 3. `index.d.ts`
   *
   * See [Extension Anatomy - Type Declaration
   * Files](https://github.com/paranext/paranext-extension-template/wiki/Extension-Anatomy#type-declaration-files-dts)
   * for more information about extension type declaration files.
   */
  types?: string;
  /** Path to the JSON file that defines the menu items this extension is adding. */
  menus?: string;
  /** Path to the JSON file that defines the settings this extension is adding. */
  settings?: string;
  /** Path to the JSON file that defines the project settings this extension is adding. */
  projectSettings?: string;
  /** Path to the JSON file that defines the localized strings this extension is adding. */
  localizedStrings?: string;
  /** Path to the JSON file that defines the themes this extension is adding. */
  themes?: string;
  /** Path to the JSON file that defines the localized display data this extension is adding. */
  displayData?: string;
  activationEvents: string[];
};

/** Build-related info for each extension */
export type ExtensionInfo = ExtensionManifest & {
  /** The name of the directory that this extension is in */
  dirName: string;
  /**
   * Path to the extension directory relative to root
   *
   * This uses the operating system's path separator
   */
  dirPath: string;
  /**
   * Path to the extension directory relative to root
   *
   * WARNING: This does not use the operating system's path separator because it needs to be
   * consistent for use in git commands. If you need an OS-dependent path separator, make a new
   * path
   */
  dirPathOSIndependent: string;
  /** The name of the manifest.main file without the file extension */
  entryFileName: string;
  /** The path to the manifest.main file relative to root */
  entryFilePath: string;
  /**
   * Whether to skip this extension when building and just copy all of its contents into the dist
   * folder. If the manifest main is an empty string or if the extension is listed as not bundled,
   * do not build anything but just copy the folder
   */
  shouldCopyOnly?: boolean;
  /** Path to the manifest file */
  manifestPath: string;
  /** The original manifest straight out of the file and run through `JSON.parse` */
  manifest: Readonly<ExtensionManifest>;
};

/** Cached list of extension folder names */
let extensionFolderNamesCached: string[] | undefined;

/**
 * Get a list of the names of the folders with extensions in them (in the source folder)
 *
 * Synchronous version of `getExtensionFolderNames`
 */
export function getExtensionFolderNamesSync(): string[] {
  if (extensionFolderNamesCached) return extensionFolderNamesCached;

  extensionFolderNamesCached = fs
    .readdirSync(sourceFolder, {
      withFileTypes: true,
    })
    .filter((dirEntry) => dirEntry.isDirectory())
    .map((dirEntry) => dirEntry.name);

  return extensionFolderNamesCached;
}

/**
 * Get a list of the names of the folders with extensions in them (in the source folder)
 *
 * Asynchronous version of `getExtensionFolderNamesSync`
 */
export async function getExtensionFolderNames(): Promise<string[]> {
  if (extensionFolderNamesCached) return extensionFolderNamesCached;

  extensionFolderNamesCached = (
    await fs.promises.readdir(sourceFolder, {
      withFileTypes: true,
    })
  )
    .filter((dirEntry) => dirEntry.isDirectory())
    .map((dirEntry) => dirEntry.name);

  return extensionFolderNamesCached;
}

/**
 * Gets a list of the extension folders and their respective entry files
 *
 * Note that this does not transform the main file .ts into .js unlike extension.service
 */
export async function getExtensions(): Promise<ExtensionInfo[]> {
  // Get names of each folder in the source folder
  const extensionFolderNames = await getExtensionFolderNames();

  // Return extension info for each extension folder
  // We're filtering out the `undefined` entries, so assert that there is no `undefined`
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return (
    await Promise.all(
      extensionFolderNames.map(async (extensionFolderName): Promise<ExtensionInfo | undefined> => {
        let extensionManifestJson: string;
        const manifestPath = path.join(sourceFolder, extensionFolderName, 'manifest.json');
        try {
          extensionManifestJson = await fs.promises.readFile(manifestPath, 'utf8');
        } catch {
          // This folder doesn't have a manifest.json, so it must not be an extension. Skip it
          return undefined;
        }
        let extensionManifest: Readonly<ExtensionManifest>;
        try {
          extensionManifest = Object.freeze({
            // Note that this does not transform the main file .ts into .js unlike extension.service
            ...JSON.parse(extensionManifestJson),
          });
        } catch (e) {
          console.error(
            `manifest.json for extension folder ${extensionFolderName} failed to parse. Error: ${e}`,
          );
          return undefined;
        }

        // Get main file path from the manifest and return extension info
        return extensionManifest.main !== ''
          ? {
              ...extensionManifest,
              dirName: extensionFolderName,
              dirPath: getExtensionPath(extensionFolderName, false),
              dirPathOSIndependent: getExtensionPath(extensionFolderName, true),
              entryFileName: path.parse(extensionManifest.main).name,
              entryFilePath: path.join(sourceFolder, extensionFolderName, extensionManifest.main),
              version: extensionManifest.version,
              manifestPath,
              manifest: extensionManifest,
            }
          : {
              ...extensionManifest,
              dirName: extensionFolderName,
              dirPath: getExtensionPath(extensionFolderName, false),
              dirPathOSIndependent: getExtensionPath(extensionFolderName, true),
              entryFileName: '',
              entryFilePath: '',
              version: extensionManifest.version,
              manifestPath,
              manifest: extensionManifest,
              shouldCopyOnly: true,
            };
      }),
    )
  ).filter((extensionInfo) => extensionInfo) as ExtensionInfo[];
}

// #endregion
