# paranext-multi-extension-template

Template for creating multiple Platform.Bible extensions in one repo

## Template Info

This is a webpack project template pre-configured to build an arbitrary number of Platform.Bible extensions. It contains the bare minimum of what a multi-extension repo needs. Note that many of the files mentioned in [Summary](#summary) are not present in this template because they describe extension code which must be added to this template. For inspiration on what extensions in a multi-extension repo could look like, refer to any repo forked from this template. An example would be the [paranext-sample-extensions]() [MISSING! PLEASE ADD WHEN AVAILABLE].

### Customize repo details

Follow these instructions to customize the template to be your own Platform.Bible extension repo.

#### Install and hook up to the template

To make the process of customizing from the template as smooth as possible, we recommend you do the following before anything else:

- [Install and set up this repo](#to-install)
- [Update this repo from the template](#to-update-this-repo-and-extensions-from-the-templates) to hook everything up for smooth updates in the future

#### Replace placeholders

- At the top of this `README.md`:

  - Replace the first line `# paranext-multi-extension-template` with `# your-extension-repo-name`
  - Below the first line, replace the repo description with your own description

- In `package.json`:

  - Replace `"paranext-multi-extension-template"` with `"your-extension-repo-name"`
  - Update ownership information and other relevant fields as desired

- In `LICENSE`:

  - Adjust as desired (feel free to choose a different license)
  - If you choose to stay with the current license, update the copyright statement

#### Create your first extension in this repo

Follow the steps in [To create a new extension in this repo](#to-create-a-new-extension-in-this-repo) to create your first extension in this repo! You can follow the same steps to create new extensions as desired.

#### Remove Template Info

Once finished customizing this template to be your own, you can remove the [Template Info](#template-info) section and sub-sections of this readme.

## Summary

This is a webpack project configured to build Platform.Bible extensions. The general file structure is as follows:

- `src/` contains the source code for all extensions
  - Each sub-folder in `src/` with a `manifest.json` in it is an extension
    - `package.json` contains information about this extension's npm package. It is required for Platform.Bible to use the extension properly. It is copied into the build folder
    - `manifest.json` is the manifest file that defines the extension and important properties for Platform.Bible. It is copied into the build folder
    - `src/` contains the source code for the extension
      - `src/main.ts` is the main entry file for the extension
      - `src/types/<extension_name>.d.ts` is this extension's types file that defines how other extensions can use this extension through the `papi`
      - `*.web-view.tsx` files will be treated as React WebViews
      - `*.web-view.html` files are a conventional way to provide HTML WebViews (no special functionality)
    - `assets/` contains asset files the extension and its WebViews can retrieve using the `papi-extension:` protocol, as well as textual descriptions in various languages. It is copied into the build folder
      - `assets/displayData.json` contains (optionally) a path to the extension's icon file as well as text for the extension's display name, short summary, and path to the full description file
      - `assets/descriptions/` contains textual descriptions of the extension in various languages
        - `assets/descriptions/description-<locale>.md` contains a brief description of the extension in the language specified by `<locale>`
    - `contributions/` contains JSON files the platform uses to extend data structures for things like menus and settings. The JSON files are referenced from the manifest
    - `public/` contains other static files that are copied into the build folder
- `dist/` is a generated folder containing the built extension files
- `release/` is a generated folder containing zips of the built extension files

## To install

### Install dependencies:

1. Follow the instructions to install [`paranext-core`](https://github.com/paranext/paranext-core#developer-install).
2. In this repo, run `npm install` to install local and published dependencies

Note: running `npm install` automatically adds remotes that help with [updating from the templates](#to-update-this-repo-and-extensions-from-the-templates).

<details>
    <summary>[Optional] Adding remotes manually</summary>

#### Adding remotes manually

To add these remotes manually, run the following commands:

```bash
git remote add paranext-multi-extension-template https://github.com/paranext/paranext-multi-extension-template

git remote add paranext-extension-template https://github.com/paranext/paranext-extension-template
```

</details>

### Configure paths to `paranext-core` repo

In order to interact with `paranext-core`, you must point `package.json` to your installed `paranext-core` repository:

1. Follow the instructions to install [`paranext-core`](https://github.com/paranext/paranext-core#developer-install). We recommend you clone `paranext-core` in the same parent directory in which you cloned this repository so you do not have to reconfigure paths to `paranext-core`.
2. If you cloned `paranext-core` anywhere other than in the same parent directory in which you cloned this repository, update the paths to `paranext-core` in this repository's `package.json` to point to the correct `paranext-core` directory.

## To run

### Running Platform.Bible with these extensions

To run Platform.Bible with these extensions:

`npm start`

Note: The built extensions will be the `dist` folder. In order for Platform.Bible to run these extensions, you must provide the directory to these built extensions to Platform.Bible via a command-line argument. This command-line argument is already provided in this `package.json`'s `start` script. If you want to start Platform.Bible and use these extensions any other way, you must provide this command-line argument or put the `dist` folder into Platform.Bible's `extensions` folder.

### Building these extensions independently

To watch extension files (in `src`) for changes:

`npm run watch`

To build the extensions once:

`npm run build`

## To package for distribution

To package these extensions into a zip file for distribution:

`npm run package`

## To create a new extension in this repo

To create a new extension in this repo, make sure your repo has no working changes, then run the following command (replace `<extension_name>` with the preferred extension name. This will also be the extension's folder name in the `src` folder):

```bash
npm run create-extension -- <extension_name>
```

Then follow [the instructions for customizing the new extension](https://github.com/paranext/paranext-extension-template#customize-extension-details).

**Note:** The merge/squash commits created when creating a new extension are important; Git uses them to compare the files for future updates. If you edit this repo's Git history, please preserve these commits (do not squash them, for example) to avoid duplicated merge conflicts in the future.

<details>
    <summary>[Optional] Creating a new extension manually</summary>

#### Manually create a new extension

Alternatively, you can create a new extension manually:

```bash
git fetch paranext-extension-template main

git subtree add --prefix src/<extension_name> paranext-extension-template main --squash
```

After running these commands, run a regex find and replace inside the new extension folder to fix
the file paths pointing to `paranext-core`:

- Find: `([^/])\.\.\/paranext-core`
- Replace with: `$1../../../paranext-core`

You can ignore occurrences from many files. Please see [`./lib/git.util.ts`](./lib/git.util.ts) -> `formatExtensionFolder` for more
information.

</details>

## To update this repo and extensions from the templates

This project is forked from [`paranext-multi-extension-template`](https://github.com/paranext/paranext-multi-extension-template), and its extensions are derived from [`paranext-extension-template`](https://github.com/paranext/paranext-extension-template). Both are updated periodically and will sometimes receive updates that help with breaking changes on [`paranext-core`](https://github.com/paranext/paranext-core). We recommend you periodically update your repo and extensions by merging the latest template updates into them.

To update this repo including all extensions to have the latest updates and upgrades from the templates, make sure your repo has no working changes, then run the following `npm` script:

```bash
npm run update-from-templates
```

If you encounter errors from merge conflicts, please resolve the merge conflicts, finish the commit, and run the script above again.

**Note:** The merge/squash commits created when updating this repo and its extensions from the templates are important; Git uses them to compare the files for future updates. If you edit this repo's Git history, please preserve these commits (do not squash them, for example) to avoid duplicated merge conflicts in the future.

<details>
    <summary>[Optional] Update from the templates manually</summary>

### Update from the templates manually

Alternatively, you can update from the templates manually.

#### Manually update this repo from `paranext-multi-extension-template`

```bash
git fetch paranext-multi-extension-template main

git merge paranext-multi-extension-template/main --allow-unrelated-histories
```

#### Manually update extensions from `paranext-extension-template`

```bash
git fetch paranext-extension-template main
```

For each extension, run the following (replace `<extension_name>` with each extension's folder name):

```bash
git subtree pull --prefix src/<extension_name> paranext-extension-template main --squash
```

</details>

## Special features in this project

This project has special features and specific configuration to make building extensions for Platform.Bible easier. In the following expandable section are a few important notes:

<details>
    <summary>Expand to read about special features in this project</summary>

### React WebView files - `.web-view.tsx`

Platform.Bible WebViews must be treated differently than other code, so this project makes doing that simpler:

- WebView code must be bundled and can only import specific packages provided by Platform.Bible (see `externals` in `webpack.config.base.ts`), so this project bundles React WebViews before bundling the main extension file to support this requirement. The project discovers and bundles files that end with `.web-view.tsx` in this way.
  - Note: while watching for changes, if you add a new `.web-view.tsx` file, you must either restart webpack or make a nominal change and save in an existing `.web-view.tsx` file for webpack to discover and bundle this new file.
- WebView code and styles must be provided to the `papi` as strings, so you can import WebView files with [`?inline`](#special-imports) after the file path to import the file as a string.

### Special imports

- Adding `?inline` to the end of a file import causes that file to be imported as a string after being transformed by webpack loaders but before bundling dependencies (except if that file is a React WebView file, in which case dependencies will be bundled). The contents of the file will be on the file's default export.
  - Ex: `import myFile from './file-path?inline`
- Adding `?raw` to the end of a file import treats a file the same way as `?inline` except that it will be imported directly without being transformed by webpack.

### Misc features

- Platform.Bible extensions' code must be bundled all together in one file, so webpack bundles all the code together into one main file per extension.
- Platform.Bible extensions can interact with other extensions, but they cannot import and export like in a normal Node environment. Instead, they interact through the `papi`. As such, each extension's `src/types` folder contains its declarations file that tells other extensions how to interact with it through the `papi`.

### Two-step webpack build

These extensions are built by webpack (`webpack.config.ts`) in two steps: a WebView bundling step and a main bundling step:

#### Build 1: TypeScript WebView bundling

Webpack (`./webpack/webpack.config.web-view.ts`) prepares TypeScript WebViews for use and outputs them into temporary build folders adjacent to the WebView files:

- Formats WebViews to match how they should look to work in Platform.Bible
- Transpiles React/TypeScript WebViews into JavaScript
- Bundles dependencies into the WebViews
- Embeds Sourcemaps into the WebViews inline

#### Build 2: Main and final bundling

Webpack (`./webpack/webpack.config.main.ts`) prepares the main extension files and bundles each extension together into the `dist` folder:

- Transpiles the main TypeScript file and its imported modules into JavaScript
- Injects the bundled WebViews into the main file
- Bundles dependencies into the main file
- Embeds Sourcemaps into the file inline
- Packages everything up into an extension folder `dist`

</details>
