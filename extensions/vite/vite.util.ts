import path from 'path';
import fs from 'fs';
import { ModuleFormat } from 'rollup';
import { glob } from 'glob';

// #region not shared with others

export const sourceFolder = 'src';

/** List of static files to copy from each extension's source directory */
export const staticFiles = [
  'assets',
  'manifest.json',
  'package.json',
  'index.d.ts',
  // TODO: check each extension's package.json -> "types" property for this instead of assuming
  // it will be the same as the entry file name.
  '<entry_file_name>.d.ts',
];

/** Get the actual static file name from the template static file name */
export function getStaticFileName(staticFile: string, extensionInfo: ExtensionInfo) {
  return staticFile.replace(/<entry_file_name>/g, extensionInfo.entryFileName);
}

// #endregion

// #region Shared with https://github.com/paranext/paranext-extension-template/blob/main/vite/vite.util.ts

/**
 * Glob filename matcher for web views.
 * React Web Views should be named <name>.web-view.tsx
 * HTML Web Views should be named <name>.web-view.ejs
 *  - Note: the HTML web views are .ejs files because rollup was not recognizing them to have exports for some reason.
 */
export const webViewGlob = '**/*.web-view.{tsx,ejs}';
export const webViewTsxGlob = '**/*.web-view.tsx';

/**
 * Regex matcher for TypeScript WebView imports
 */
export const webViewTsxImportRegex = /^.+\.web-view(\.tsx)?$/;

/** Name of adjacent folder used to store WebView files transpiled in the first build step */
export const webViewTempDir = 'temp-vite';
export const webViewTempGlob = `**/${webViewTempDir}/*.web-view.js`;

/** Modules that Paranext supplies so extensions can use them easily */
export const paranextProvidedModules = [
  'react',
  'react-dom/client',
  'papi-frontend',
  'papi-backend',
];

/**
 * Gets a file extension based on the moduleFormat input.
 * Vite does this automatically for us if `fileName` is a string,
 * but we want our cjs module to be '.js' while still using ES Module
 * imports in our vite config.
 *
 * If package.json does not contain 'type': 'module', Vite swaps some file extensions out.
 * Short explanation in a note at https://vitejs.dev/guide/build.html#library-mode
 *
 * @param moduleFormat Vite-official module formats are listed at https://vitejs.dev/config/build-options.html#build-lib but you can use any rollup module format
 */
export function getFileExtensionByModuleFormat(moduleFormat: ModuleFormat) {
  switch (moduleFormat) {
    case 'es':
      return 'js';
    case 'cjs':
      return 'js'; // Vite uses '.cjs' if package.json has "type": "module", but Paranext uses commonjs modules, so let's just use 'js'
    case 'umd':
      return 'umd.cjs';
    default:
      return `${moduleFormat}.js`;
  }
}

/**
 * Get a list of TypeScript WebView files to transpile.
 * Path relative to project root
 */
export function getWebViewTsxPaths() {
  return glob(webViewTsxGlob, { ignore: 'node_modules/**' });
}

/**
 * Formats a WebView import module path to read its built version
 * @param moduleSourceRaw whole module import string including quotes e.g. `"./my.web-view"`
 * @returns WebView import module path with temporary WebView directory inserted into the module path
 */
export function insertWebViewTempDir(moduleSourceRaw: string) {
  // Note the style of quotes used
  const quote = moduleSourceRaw.at(0);
  // Get rid of the quotes
  const importPath = moduleSourceRaw.slice(1, -1);
  const importInfo = path.parse(importPath);
  const newPath = [importInfo.dir, webViewTempDir, importInfo.base].join('/');
  const finalModuleSource = `${quote}${newPath}${quote}`;
  return finalModuleSource;
}

// #endregion

// #region sort-of shared with extension.service.ts

/**
 * Information about an extension provided by the extension developer.
 * This will be transformed and frozen into an ExtensionInfo before use
 */
type ExtensionManifest = {
  name: string;
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
  /** The path to the manifest.main file */
  entryFilePath: string;
  /**
   * Whether to skip this extension when building. If the manifest main is null, there is no
   * JavaScript to build
   */
  skipBuildingJavaScript?: boolean;
};

/**
 * Gets a list of the extension folders and their respective entry files
 * TODO: figure out if we can share this code with extension.service.ts.
 *   Note that this does not transform the main file .ts into .js unlike extension.service
 */
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
          }
        : {
            dirName: extensionFolderName,
            entryFileName: '',
            entryFilePath: '',
            skipBuildingJavaScript: true,
          };
    }),
  );
}
