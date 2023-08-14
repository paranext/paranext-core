# paranext-core/extensions

Official extensions provided by Paranext

## Summary

This is a webpack project configured to build Paranext's official extensions included in the product.

- `src` contains the source code for each extension
  - Each sub-folder in `src` with a `manifest.json` in it is an extension
    - The main entry file is likely named the same as the extension name
    - `manifest.json` is the manifest file that defines the extension and important properties for Paranext
    - `package.json` contains information about this extension npm package. It is required for Paranext to use the extension properly. It is copied into the build folder
    - `<extension_name>.d.ts` is this extension's types file that defines how other extensions can use this extension through the `papi`
    - `*.web-view.tsx` files will be treated as React WebViews
    - `*.web-view.html` files are a conventional way to provide HTML WebViews (no special functionality)
    - `assets` contains asset files the extension and its WebViews can retrieve using the `papi-extension:` protocol
- `dist` is a generated folder containing the built extension files
- `release` is a generated folder containing zips of the built extension files

## To install

Install dependencies:

1. Follow the instructions to install [`paranext-core`](https://github.com/paranext/paranext-core#developer-install).
2. In `paranext-core/extensions`, run `npm install` to install local and published dependencies

## To run

### Running Paranext with your extensions

To run Paranext with your extensions (these extensions are automatically included when running `paranext-core`):

`npm start`

Note: The extensions will be the `dist` folder. These extension files will be watched automatically for changes if you run `npm start` in `paranext-core` or `npm start` from this folder. There is no need to run `npm start` in both directories.

### Building your extension independently

To watch extension files (in `src`) for changes:

`npm run watch`

To build the extensions once:

`npm run build`

## To package for distribution

To package your extension into a zip file for distribution:

`npm run package`

## Working with extensions in ZIP files

To have Paranext recognize your extension ZIP files, run it with the `--extensions` or `--extensionDirs` command line argument. For example:

- `--extensionDirs C:\my-extensions` if you have your packaged extension ZIP files inside of the `C:\my-extensions` directory on your local computer
- `--extensions C:\path\to\my\extension.zip` if you want to load a specific extension from a ZIP file in a known location on your local computer

## Special features of this project

This project has special features and specific configuration to make building extensions for Paranext easier. See [Special features of `paranext-extension-template`](https://github.com/paranext/paranext-extension-template#special-features-of-the-template) for information on these special features.
