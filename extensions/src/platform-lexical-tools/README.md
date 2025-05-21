# platform-lexical-tools

Lexical tools integration with Platform.Bible

<!-- Opening comment tag for Template Info Section. Ignore this for now. More info in [Hide Template Info](#hide-template-info).

## Template Info

This is a Webpack project template pre-configured to build a Platform.Bible extension. It contains the bare minimum of what an extension needs. Note that the `*.web-view.*` files and the `public/assets` folder mentioned in [Summary](#summary) are not present in this template. For inspiration on what these could look like, refer to any extension that is built using this template. An example would be the [Text Collection extension](https://github.com/paranext/paranext-extension-text-collection).

There is also a [template pre-configured to build an arbitrary number of Platform.Bible extensions in one repo](https://github.com/paranext/paranext-multi-extension-template).

### Customize extension details

Follow these instructions to customize the template to be your own Platform.Bible extension. This section is a more generalized version of the [`Your first extension` guide](https://github.com/paranext/paranext-extension-template/wiki/Your-First-Extension), which contains step-by-step instructions to build a "Hello World" extension.

#### Install and hook up to the template

Note: please skip this section and continue with [Replace placeholders](#replace-placeholders) if you are following these instructions as part of [creating an extension within `paranext-multi-extension-template`](https://github.com/paranext/paranext-multi-extension-template#to-create-a-new-extension-in-this-repo).

To make the process of customizing from the template as smooth as possible, we recommend you do the following before anything else:

- [Install and set up this repo](#to-install)
- [Update this extension from the template](#to-update-this-extension-from-the-template) to hook everything up for smooth updates in the future.

#### Replace placeholders

For your extension name, we recommend that you use [lowerCamelCase](https://developer.mozilla.org/en-US/docs/Glossary/Camel_case) in some contexts and [kebab-case](https://developer.mozilla.org/en-US/docs/Glossary/Kebab_case) in other contexts. We generally recommend lowerCamelCase when using the name in code (like making a new command on the PAPI, for example), and we recommend kebab-case when using the name in relation to the file system, the repository, `npm`, and the extension's `.d.ts` types module. The following instructions are written accordingly.

- At the top of this `README.md`:

  - Replace the first line `# paranext-extension-template` with `# your-extension-name` (kebab-case)
  - Below the first line, replace the extension description with your own description
  - In the [Summary](#summary) section, replace `src/types/paranext-extension-template.d.ts` with `src/types/your-extension-name.d.ts` (kebab-case)

- In `manifest.json`:

  - Replace `paranextExtensionTemplate` with `yourExtensionName` (lowerCamelCase)
  - Replace `src/types/paranext-extension-template.d.ts` with `src/types/your-extension-name.d.ts` (kebab-case)
  - Update ownership information and other relevant fields as desired

- In `package.json`:

  - Replace `paranext-extension-template` with `your-extension-name` (2 occurrences - kebab-case)
  - Update ownership information and other relevant fields as desired

- In `assets/displayData.json`:

  - If your extension has an icon, update the `icon` value to point towards the icon file (for example: `assets/icon.svg`)
  - Update the `moreInfoUrl` field to web URL to a page where users can find out more information about you / your organization / your extension.
  - Update the `supportUrl` field to web URL to a support page where users can request help and report issues with your extension.
  - Update the `en` entry of `localizedDisplayInfo` so that:

    - `displayName` contains a human-readable name for your extension (i.e. `Your Extension Name`).
    - `shortSummary` contains a short, few sentence summary of what your extension does.
    - `description` points to a Markdown (`.md`) file containing the full description of your extension (similar to what you would put in a `README`).

  - If your extension supports multiple languages, add another entry to `localizedDisplayInfo` by copying and pasting the `en` entry, changing `en` to the [BCP 47 language tag](https://en.wikipedia.org/wiki/IETF_language_tag) of the language you want to support, and translating the `displayName`, `shortSummary`, and `description` fields appropriately. We recommend naming your description files `description-<language tag>.md`.

- In `LICENSE`:

  - Adjust as desired (feel free to choose a different license)
  - If you choose to stay with the current license, update the copyright statement

- Rename `src/types/paranext-extension-template.d.ts` to `src/types/your-extension-name.d.ts` (kebab-case)

  - In this renamed file, replace `paranext-extension-template` with `your-extension-name`

- In `src/main.ts`, replace `Extension template` with `Your Extension Name` (2 occurrences)

- In `.github/assets/release-body.md`, replace `Extension template` with `Your Extension Name`, and make other adjustments as desired.

#### Customize the extension manifest and package information

The `manifest.json` and `package.json` files contain information specific to your extension. Add your extension's details in these two files as needed. See more information on the `manifest.json` and `package.json` files in [Extension Anatomy](https://github.com/paranext/paranext-extension-template/wiki/Extension-Anatomy#extension-manifest).

#### Hide Template Info

Once finished customizing this template to be your own, you can uncomment the [HTML comment tag](https://www.w3schools.com/html/html_comments.asp) above the [Template Info](#template-info) section to hide this template-related info in this readme. You can do this by clicking on the line and doing CTRL + / in VS Code. You can also do this manually by removing the first opening '&lt;!--' and the only closing '--&gt;' on the line. Leaving this info commented in your readme will hide it in your readme while avoiding merge conflicts if you decide to [update this extension from the template](#to-update-this-extension-from-the-template) in the future. If you never want to update this extension from the template, you can remove the [Template Info](#template-info) section and sub-sections of this readme.

Note: if you [update this extension from the template](#to-update-this-extension-from-the-template), there may be important changes in this section like additional customizations you must make to this extension. Please keep an eye out for readme changes when updating from the template.

<!-- Closing comment tag for Template Info Section -->

## Summary

The general file structure is as follows:

- `package.json` contains information about this extension's npm package. It is required for Platform.Bible to use the extension properly. It is copied into the build folder
- `manifest.json` is the manifest file that defines the extension and important properties for Platform.Bible. It is copied into the build folder
- `src/` contains the source code for the extension
  - `src/main.ts` is the main entry file for the extension
  - `src/types/platform-lexical-tools.d.ts` is this extension's types file that defines how other extensions can use this extension through the `papi`. It is copied into the build folder
  - `*.web-view.tsx` files will be treated as React WebViews
  - `*.web-view.html` files are a conventional way to provide HTML WebViews (no special functionality)
- `assets/` contains asset files the extension and its WebViews can retrieve using the `papi-extension:` protocol, as well as textual descriptions in various languages. It is copied into the build folder
  - `assets/displayData.json` contains (optionally) a path to the extension's icon file as well as text for the extension's display name, short summary, and path to the full description file
  - `assets/descriptions/` contains textual descriptions of the extension in various languages
    - `assets/descriptions/description-<locale>.md` contains a brief description of the extension in the language specified by `<locale>`
- `contributions/` contains JSON files the platform uses to extend data structures for things like menus and settings. The JSON files are referenced from the manifest
- `public/` contains other static files that are copied into the build folder
- `.github/` contains files to facilitate integration with GitHub
  - `.github/workflows` contains [GitHub Actions](https://github.com/features/actions) workflows for automating various processes in this repo
  - `.github/assets/release-body.md` combined with a generated changelog becomes the body of [releases published using GitHub Actions](#publishing)
- `dist/` is a generated folder containing the built extension files
- `release/` is a generated folder containing a zip of the built extension files

## To install

### Install dependencies:

1. Follow the instructions to install [`paranext-core`](https://github.com/paranext/paranext-core#developer-install). We recommend you clone `paranext-core` in the same parent directory in which you cloned this repository so you do not have to [reconfigure paths](#configure-paths-to-paranext-core-repo) to `paranext-core`.
2. In this repo, run `npm install` to install local and published dependencies

### Configure paths to `paranext-core` repo

If you cloned `paranext-core` anywhere other than in the same parent directory in which you cloned this repository, update the paths to `paranext-core` in this repository's `package.json` to point to the correct `paranext-core` directory.

## To run

### Running Platform.Bible with this extension

To run Platform.Bible with this extension:

`npm start`

Note: The built extension will be in the `dist` folder. In order for Platform.Bible to run this extension, you must provide the directory to this built extension to Platform.Bible via a command-line argument. This command-line argument is already provided in this `package.json`'s `start` script. If you want to start Platform.Bible and use this extension any other way, you must provide this command-line argument or put the `dist` folder into Platform.Bible's `extensions` folder.

### Building this extension independently

To watch extension files (in `src`) for changes:

`npm run watch`

To build the extension once:

`npm run build`

## To package for distribution

To package this extension into a zip file for distribution:

`npm run package`

## Publishing

These steps will walk you through releasing a version on GitHub and bumping the version to a new version so future changes apply to the new in-progress version.

1. Make sure the versions in this repo are on the version number you want to release. If they are not, run the `bump-versions` npm script to set the versions to what you want to release. This script will create a branch named `bump-versions-<version>` from your current head with the needed changes. Open a PR and merge that new branch into the branch you plan to release from. For example, to bump branch `my-branch` to version 0.2.0, run the following:

   ```bash
   git checkout my-branch
   npm run bump-versions 0.2.0
   ```

   Then create a PR and merge the `bump-versions-0.2.0` branch into `my-branch`. `my-branch` is now ready for release.

2. Manually dispatch the Publish workflow in GitHub Actions targeting the branch you want to release from (in the previous example, this would be `my-branch`). This workflow creates a new pre-release for the version you intend to release and creates a new `bump-versions-<next_version>` branch to bump the version after the release so future changes apply to a new in-progress version instead of to the already released version. This workflow has the following inputs:

   - `version`: enter the version you intend to publish (e.g. 0.2.0). This is simply for verification to make sure you release the code that you intend to release. It is compared to the version in the code, and the workflow will fail if they do not match.
   - `newVersionAfterPublishing`: enter the version you want to bump to after releasing (e.g. 0.3.0-alpha.0). Future changes will apply to this new version instead of to the version that was already released. Leave blank if you don't want to bump
   - `bumpRef`: enter the Git ref you want to create the bump versions branch from, e.g. `main`. Leave blank if you want to use the branch selected for the workflow run. For example, if you release from a stable branch named `release-prep`, you may want to bump the version on `main` so future development work happens on the new version, then you can rebase `release-prep` onto `main` when you are ready to start preparing the next stable release.

    <details>
        <summary>[Optional] Create a new pre-release and bump versions branch manually </summary>

   #### Manually create a new pre-release and bump versions branch

   Alternatively, you can create a new pre-release manually:

   ```bash
   npm run package
   # Create a new pre-release in GitHub on tag `v<version>`
   # Copy `.github/assets/release-body.md` into the release body
   # Press the "Generate release notes" button in the release creation page to generate a changelog
   # Attach contents of `release` folder to the release
   ```

   Then bump versions by running the following:

   ```bash
   npm run bump-versions <next_version>
   ```

   Or bump versions manually:

   ```bash
   git checkout -b bump-versions-<next_version>
   npm version <next_version> --git-tag-version false
   # Change version in each extension's `manifest.json`
   git commit -a -m "Bumped versions to <next_version>"; git push -u origin HEAD
   ```

    </details>

3. In GitHub, adjust the new draft release's body and other metadata as desired, then publish the release.
4. Open a PR and merge the newly created `bump-versions-<next_version>` branch.

### Publishing problems

Following are some problems you may encounter while publishing and steps to solve them.

#### `@swc/core` Failed to load native binding

If you see the following error in the GitHub Actions workflow logs while packaging:

```
Module build failed (from ./node_modules/swc-loader/src/index.js):
Error: Failed to load native binding
```

You may have a different effective version of `@swc/core` than `paranext-core` does. Please make sure the version of `@swc/core` in your `package-lock.json` is the same as its version in [`paranext-core/package-lock.json`](https://github.com/paranext/paranext-core/blob/main/package-lock.json). If they are not the same, please fix them to be the same by running `npm i -D @swc/core <version>` where the version is the version of `@swc/core` installed in `paranext-core/package-lock.json` (if you would like to set the version of `@swc/core` back to what it was before in `package.json` to stay synced with the extension template, change it back manually in `package.json` and then run `npm i`). If they are already the same, you may need to try regenerating your `package-lock.json` file by deleting it and running `npm i`.

## To update this extension from the template

This extension project is forked from [`paranext-extension-template`](https://github.com/paranext/paranext-extension-template), which is updated periodically and will sometimes receive updates that help with breaking changes on [`paranext-core`](https://github.com/paranext/paranext-core). We recommend you periodically update your extension by merging the latest template updates into your extension.

To set up this extension to be updated from the template, run the following command once after cloning this repo:

```bash
git remote add template https://github.com/paranext/paranext-extension-template
```

To update this extension from the template, make sure your repo has no working changes. Then run the following commands:

```bash
git fetch template
git merge template/main --allow-unrelated-histories
```

For more information, read [the instructions on the wiki](https://github.com/paranext/paranext-extension-template/wiki/Merging-Template-Changes-into-Your-Extension).

**Note:** The merge/squash commits created when updating this repo from the template are important; Git uses them to compare the files for future updates. If you edit this repo's Git history, please preserve these commits (do not squash them, for example) to avoid duplicated merge conflicts in the future.

## Special features in this project

This project has special features and specific configuration to make building an extension for Platform.Bible easier. See [Special features of `paranext-multi-extension-template`](https://github.com/paranext/paranext-multi-extension-template#special-features-of-the-template) for information on these special features.
