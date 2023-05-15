# paranext-core/extensions

Official extensions provided by Paranext

## Summary

This is a Vite project configured to build Paranext's official extensions included in the product.

- `lib` contains the source code for each extension
  - Each sub-folder in `lib` with a `manifest.json` in it is an extension
    - The main entry file is likely named the same as the extension name
    - `manifest.json` is the manifest file that defines the extension
    - `package.json` defines the npm package for this extension and is required for Paranext to use it appropriately
    - `<extension_name>.d.ts` is this extension's types file that other extensions can use
    - `*.web-view.tsx` files are React WebViews
    - `*.web-view.ejs` files are HTML WebViews
- `dist` is a generated folder containing your built extension files

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

To watch extension files (in `lib`) for changes:

`npm start:vite`

To build the extensions once:

`npm run build:vite` or `npm run build`

## Vite Build Explanation

These extensions are built by Vite in two steps: a WebView transpilation step and a packaging step:

## Build 1: TypeScript WebView transpilation

Vite prepares TypeScript WebViews for use and outputs them into `temp-vite` folders adjacent to the WebView files:

- Formats WebViews to match how they should look to work in Paranext
- Transpiles React/TypeScript WebViews into JavaScript
- Packages dependencies into the WebViews
- Embeds Sourcemaps into the WebViews inline

## Built 2: Packaging

Vite packages the extensions together into the `dist` folder:

- Transpiles each main TypeScript file and its imported modules into JavaScript
- Injects the WebViews into the main files
- Packages dependencies into the main files
- Generates sourcemaps for the files
- Packages everything up into each extension folder in `dist`
