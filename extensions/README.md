# paranext-core/extensions

Official extensions provided by Paranext

## Summary

This is a Vite project configured to build Paranext's official extensions.

- Each sub-folder with a `manifest.json` in it is an extension.
  - The main entry file is likely named the same as the extension name
  - `manifest.json` is the manifest file that defines the extension
  - `*.web-view.tsx` files are React WebViews
  - `*.web-view.ejs` files are HTML WebViews

## To run

Install dependencies:

1. In order to have types for `papi`, we must build the `papi-dts` package locally (currently, `papi-dts` is a local package and is not published on `npm`):
   - In `paranext-core/extensions` or in `paranext-core`, run `npm run build:types` to generate the `papi-dts` package.
2. In `paranext-core/extensions`, run `npm install` to install local and published dependencies

To watch extension files for changes:

`npm start`

Note: these extension files will be watched automatically for changes if you run `npm start` in `paranext-core` (or alternatively `npm run start:core` from this folder). There is no need to run `npm start` in `paranext-core/extensions` as well.

## To publish

To build the extension once:

`npm run build`

The extensions will be the `dist` folder. You can launch Paranext and see them run!
