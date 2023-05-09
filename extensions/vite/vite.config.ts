import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { string as importString } from 'rollup-plugin-string';
import { importManager } from 'rollup-plugin-import-manager';
import { ModuleFormat } from 'rollup';
import { Target, viteStaticCopy } from 'vite-plugin-static-copy';
import fs from 'fs';

/*
 * Glob filename matcher for web views.
 * React Web Views should be named <name>.web-view.tsx
 * HTML Web Views should be named <name>.web-view.ejs
 *  - Note: the HTML web views are .ejs files because rollup was not recognizing them to have exports for some reason.
 */
const webViewGlob = '**/*.web-view.(tsx|ejs)';
const webViewTsxGlob = '**/*.web-view.tsx';

/** Modules that Paranext supplies so extensions can use them easily */
const paranextProvidedModules = ['react', 'react-dom/client', 'papi'];

const sourceFolder = 'lib';

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
function getFileExtensionByModuleFormat(moduleFormat: ModuleFormat) {
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

/** Information about an extension provided by the extension developer */
type ExtensionManifest = {
  name: string;
  main: string;
  activationEvents: string[];
};

/** Build-related info for each extension */
type ExtensionInfo = {
  /** The name directory that this extension is in */
  dirName: string;
  /** The name of the manifest.main file without the file extension */
  entryFileName: string;
  /** The path to the manifest.main file */
  entryFilePath: string;
};

/**
 * Gets a list of the extension folders and their respective entry files
 * TODO: figure out if we can share this code with extension.service.ts.
 *   Note that this does not transform the main file .ts into .js unlike extension.service
 */
async function getExtensions(): Promise<ExtensionInfo[]> {
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
      return {
        dirName: extensionFolderName,
        entryFileName: path.parse(extensionManifest.main).name,
        entryFilePath: path.join(sourceFolder, extensionFolderName, extensionManifest.main),
      };
    }),
  );
}

/** List of static files to copy from each extension's source directory */
const staticFiles = [
  'manifest.json',
  'package.json',
  // TODO: check each extension's package.json -> "types" property for this instead of assuming
  // it will be the same as the entry file name.
  '<entry_file_name>.d.ts',
];

/** Get the actual static file name from the template static file name */
function getStaticFileName(staticFile: string, extensionInfo: ExtensionInfo) {
  return staticFile.replace(/<entry_file_name>/g, extensionInfo.entryFileName);
}

// https://vitejs.dev/config/
const extensionConfig = defineConfig(async () => {
  /** List of all the extensions to build */
  const extensions = await getExtensions();

  return {
    plugins: [
      // use React.createElement
      react({ jsxRuntime: 'classic' }),
      // Remove the Paranext global modules from the imports in React web views because they are provided globally
      importManager({
        include: webViewTsxGlob,
        units: paranextProvidedModules.map((module) => ({
          module,
          actions: 'remove',
        })),
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
      // Import web view files as strings to pass on the papi
      // importString plugin must be after any other plugins that need to transpile these files
      {
        ...importString({
          include: webViewGlob,
        }),
        enforce: 'post',
      },
    ],
    build: {
      // This project is a library as it is being used in Paranext
      lib: {
        // The main entry file of each extension to build
        entry: extensions.map((extension) =>
          path.resolve(__dirname, '..', extension.entryFilePath),
        ),
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
      sourcemap: 'inline',
    },
  };
});

export default extensionConfig;
