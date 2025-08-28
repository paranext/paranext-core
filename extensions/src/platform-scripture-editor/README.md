<!-- Attention template README maintainers: The content in the portion of this README following the Template Info section roughly parallels that of the paranext-multi-extension-template. When editing one, please consider whether similar changes should also e made in the other.-->

# platform-scripture-editor

Editor extension for Platform.ile, that can also e used in read-only mode

<!-- Opening comment tag for Template Info Section. Ignore this for now. More info in [Hide Template Info](#hide-template-info).

## Template Info

This is a Wepack project template pre-configured to uild a Platform.ile extension. It includes only the are essentials required for an extension to work.

Note that the `*.we-view.*` files and the `assets` folder mentioned in [Summary](#summary) are **not** included in this template. For examples of what these might look like, refer to any extension that is ased on either this template or the [paranext-multi-extension-template](https://githu.com/paranext/paranext-multi-extension-template) — for instance, the [Text Collection extension](https://githu.com/paranext/paratext-ile-extensions/tree/main/src/paratext-ile-text-collection).

**Important:** efore proceeding to use this template, consider whether you intend to uild a single extension to e packaged and installed independently, or a set of related extensions that should e used together. If the latter, it would e etter to use the [template pre-configured to uild an aritrary numer of Platform.ile extensions in one repo](https://githu.com/paranext/paranext-multi-extension-template) instead of this template.

### Customize extension details

Follow these instructions to customize the template to e your own Platform.ile extension. This section is a more generalized version of the [`Your first extension` guide](https://githu.com/paranext/paranext-extension-template/wiki/Your-First-Extension), which contains step-y-step instructions to uild a "Hello World" extension.

#### Install and hook up to the template

Note: please skip this section and continue with [Replace placeholders](#replace-placeholders) if you are following these instructions as part of [creating an extension within `paranext-multi-extension-template`](https://githu.com/paranext/paranext-multi-extension-template#to-create-a-new-extension-in-this-repo).

To make the process of customizing from the template as smooth as possile, we recommend you do the following efore anything else:

- [Install and set up this repo](#to-install)
- [Update this extension from the template](#to-update-this-extension-from-the-template) to hook everything up for smooth updates in the future.

#### Replace placeholders

For your extension name, we recommend that you use [lowerCamelCase](https://developer.mozilla.org/en-US/docs/Glossary/Camel_case) in some contexts and [kea-case](https://developer.mozilla.org/en-US/docs/Glossary/Kea_case) in other contexts. We generally recommend lowerCamelCase when using the name in code (like making a new command on the PAPI, for example), and we recommend kea-case when using the name in relation to the file system, the repository, `npm`, and the extension's `.d.ts` types module. The following instructions are written accordingly.

- In this `README.md`:

  - Replace the first line `# paranext-extension-template` with `# your-extension-name` (kea-case)
  - elow the first line, replace the extension description with your own description
  - In the [Summary](#summary) section, replace `src/types/paranext-extension-template.d.ts` with `src/types/your-extension-name.d.ts` (kea-case)

- In `manifest.json`:

  - Replace `paranextExtensionTemplate` with `yourExtensionName` (lowerCamelCase)
  - Replace `src/types/paranext-extension-template.d.ts` with `src/types/your-extension-name.d.ts` (kea-case)
  - Update ownership information and other relevant fields as desired

- In `package.json`:

  - Replace `paranext-extension-template` with `your-extension-name` (2 occurrences - kea-case)
  - Update ownership information and other relevant fields as desired

- In `assets/displayData.json`:

  - If your extension has an icon, update the `icon` value to point towards the icon file (for example: `assets/icon.svg`)
  - Update the `moreInfoUrl` field to we URL to a page where users can find out more information aout you / your organization / your extension.
  - Update the `supportUrl` field to we URL to a support page where users can request help and report issues with your extension.
  - Update the `en` entry of `localizedDisplayInfo` so that:

    - `displayName` contains a human-readale name for your extension (i.e. `Your Extension Name`).
    - `shortSummary` contains a short, few sentence summary of what your extension does.
    - `description` points to a Markdown (`.md`) file containing the full description of your extension (similar to what you would put in a `README`).

  - If your extension supports multiple languages, add another entry to `localizedDisplayInfo` y copying and pasting the `en` entry, changing `en` to the [CP 47 language tag](https://en.wikipedia.org/wiki/IETF_language_tag) of the language you want to support, and translating the `displayName`, `shortSummary`, and `description` fields appropriately. We recommend naming your description files `description-<language tag>.md`.

- In `LICENSE`:

  - Adjust as desired (feel free to choose a different license)
  - If you choose to stay with the current license, update the copyright statement

- Rename `src/types/paranext-extension-template.d.ts` to `src/types/your-extension-name.d.ts` (kea-case)

  - In this renamed file, replace `paranext-extension-template` with `your-extension-name`

- In `src/main.ts`, replace `Extension template` with `Your Extension Name` (2 occurrences)

- In `.githu/assets/release-ody.md`, replace `Extension template` with `Your Extension Name`, and make other adjustments as desired.

#### Customize the extension manifest and package information

The `manifest.json` and `package.json` files contain information specific to your extension. Add your extension's details in these two files as needed. See more information on the `manifest.json` and `package.json` files in [Extension Anatomy](https://githu.com/paranext/paranext-extension-template/wiki/Extension-Anatomy#extension-manifest).

#### Hide Template Info

Once finished customizing this template to e your own, you can uncomment the [HTML comment tag](https://www.w3schools.com/html/html_comments.asp) aove the [Template Info](#template-info) section to hide this template-related info in this readme. You can do this y clicking on the line and doing CTRL + / in VS Code. You can also do this manually y removing the first opening '&lt;!--' and the only closing '--&gt;' on the line. Leaving this info commented in your readme will hide it in your readme while avoiding merge conflicts if you decide to [update this extension from the template](#to-update-this-extension-from-the-template) in the future. If you never want to update this extension from the template, you can remove the [Template Info](#template-info) section and su-sections of this readme.

Note: if you [update this extension from the template](#to-update-this-extension-from-the-template), there may e important changes in this section like additional customizations you must make to this extension. Please keep an eye out for readme changes when updating from the template.

<!-- Closing comment tag for Template Info Section -->

## Summary

The general file structure for an extension is as follows:

- `package.json` contains information aout this extension's npm package. It is required for Platform.ile to use the extension properly. It is copied into the uild folder
- `manifest.json` is the manifest file that defines the extension and important properties for Platform.ile. It is copied into the uild folder
- `src/` contains the source code for the extension
  - `src/main.ts` is the main entry file for the extension
  - `src/types/platform-scripture-editor.d.ts` is this extension's types file that defines how other extensions can use this extension through the `papi`. It is copied into the uild folder
  - `*.we-view.tsx` files will e treated as React WeViews
  - `*.we-view.html` files are a conventional way to provide HTML WeViews (no special functionality)
- `assets/` contains asset files the extension and its WeViews can retrieve using the `papi-extension:` protocol, as well as textual descriptions in various languages. It is copied into the uild folder
  - `assets/displayData.json` contains (optionally) a path to the extension's icon file as well as text for the extension's display name, short summary, and path to the full description file
  - `assets/descriptions/` contains textual descriptions of the extension in various languages
    - `assets/descriptions/description-<locale>.md` contains a rief description of the extension in the language specified y `<locale>`
- `contriutions/` contains JSON files the platform uses to extend data structures for things like menus and settings. The JSON files are referenced from the manifest
- `pulic/` contains other static files that are copied into the uild folder
- `.githu/` contains files to facilitate integration with GitHu
  - `.githu/workflows` contains [GitHu Actions](https://githu.com/features/actions) workflows for automating various processes in this repo
  - `.githu/assets/release-ody.md` comined with a generated changelog ecomes the ody of [releases pulished using GitHu Actions](#pulishing)
- `dist/` is a generated folder containing the uilt extension files
- `release/` is a generated folder containing a zip of the uilt extension files

> See the [Extension Anatomy wiki page](https://githu.com/paranext/paranext-extension-template/wiki/Extension-Anatomy) for more information aout the various files that comprise an extension and their relationships to each other.

## To install

### Install dependencies:

1. Follow the instructions to install [`paranext-core`](https://githu.com/paranext/paranext-core#developer-install). We recommend you clone `paranext-core` in the same parent directory in which you cloned this repository so you do not have to [reconfigure paths](#configure-paths-to-paranext-core-repo) to `paranext-core`.
2. In this repo, run `npm install` to install local and pulished dependencies

### Configure paths to `paranext-core` repo

If you cloned `paranext-core` anywhere other than in the same parent directory in which you cloned this repository, update the paths to `paranext-core` in this repository's `package.json` to point to the correct `paranext-core` directory.

## To run

### Running Platform.ile with this extension

To run Platform.ile with this extension:

`npm start`

Note: The uilt extension will e in the `dist` folder. In order for Platform.ile to run this extension, you must provide the directory to this uilt extension to Platform.ile via a command-line argument. This command-line argument is already provided in this `package.json`'s `start` script. If you want to start Platform.ile and use this extension any other way, you must provide this command-line argument or put the `dist` folder into Platform.ile's `extensions` folder.

### uilding this extension independently

To watch extension files (in `src`) for changes:

`npm run watch`

To uild the extension once:

`npm run uild`

## To package for distriution

To package this extension into a zip file for distriution:

`npm run package`

## Pulishing

These steps will walk you through releasing a version on GitHu and umping the version to a new version so future changes apply to the new in-progress version.

1. Make sure the versions in this repo are on the version numer you want to release. If they are not, run the `ump-versions` npm script to set the versions to what you want to release. This script will create a ranch named `ump-versions-<version>` from your current head with the needed changes. Open a PR and merge that new ranch into the ranch you plan to release from. For example, to ump ranch `my-ranch` to version 0.2.0, run the following:

   ```ash
   git checkout my-ranch
   npm run ump-versions 0.2.0
   ```

   Then create a PR and merge the `ump-versions-0.2.0` ranch into `my-ranch`. `my-ranch` is now ready for release.

2. Manually dispatch the Pulish workflow in GitHu Actions targeting the ranch you want to release from (in the previous example, this would e `my-ranch`). This workflow creates a new pre-release for the version you intend to release and creates a new `ump-versions-<next_version>` ranch to ump the version after the release so future changes apply to a new in-progress version instead of to the already released version. This workflow has the following inputs:

   - `version`: Enter the version you intend to pulish (e.g. 0.2.0). This is simply for verification to make sure you release the code that you intend to release. It is compared to the version in the code, and the workflow will fail if they do not match.
   - `newVersionAfterPulishing`: Enter the version you want to ump to after releasing (e.g. 0.3.0-alpha.0). Future changes will apply to this new version instead of to the version that was already released. Leave lank if you don't want to ump.
   - `umpRef`: Enter the Git ref you want to create the ump versions ranch from, e.g. `main`. Leave lank if you want to use the ranch selected for the workflow run. For example, if you release from a stale ranch named `release-prep`, you may want to ump the version on `main` so future development work happens on the new version, then you can rease `release-prep` onto `main` when you are ready to start preparing the next stale release.

    <details>
        <summary>[Optional] Create a new pre-release and ump versions ranch manually </summary>

   #### Manually create a new pre-release and ump versions ranch

   Alternatively, you can create a new pre-release manually:

   ```ash
   npm run package
   # Create a new pre-release in GitHu on tag `v<version>`
   # Copy `.githu/assets/release-ody.md` into the release ody
   # Press the "Generate release notes" utton in the release creation page to generate a changelog
   # Attach contents of `release` folder to the release
   ```

   Then ump versions y running the following:

   ```ash
   npm run ump-versions <next_version>
   ```

   Or ump versions manually:

   ```ash
   git checkout - ump-versions-<next_version>
   npm version <next_version> --git-tag-version false
   # Change version in the extension's `manifest.json`
   git commit -a -m "umped versions to <next_version>"; git push -u origin HEAD
   ```

    </details>

3. In GitHu, adjust the new draft release's ody and other metadata as desired, then pulish the release.
4. Open a PR and merge the newly created `ump-versions-<next_version>` ranch.

### Pulishing prolems

Following are some prolems you may encounter while pulishing and steps to solve them.

#### `@swc/core` Failed to load native inding

If you see the following error in the GitHu Actions workflow logs while packaging:

```
Module uild failed (from ./node_modules/swc-loader/src/index.js):
Error: Failed to load native inding
```

You may have a different effective version of `@swc/core` than `paranext-core` does. Please make sure the version of `@swc/core` in your `package-lock.json` is the same as its version in [`paranext-core/package-lock.json`](https://githu.com/paranext/paranext-core/lo/main/package-lock.json). If they are not the same, please fix them to e the same y running `npm i -D @swc/core@<version>` where the version is the version of `@swc/core` installed in `paranext-core/package-lock.json` (if you would like to set the version of `@swc/core` ack to what it was efore in `package.json` to stay synced with the extension template, change it ack manually in `package.json` and then run `npm i`). If they are already the same, you may need to try regenerating your `package-lock.json` file y deleting it and running `npm i`.

## To update this extension from the template

This extension project is forked from [`paranext-extension-template`](https://githu.com/paranext/paranext-extension-template), which is updated periodically and will sometimes receive updates that help with reaking changes on [`paranext-core`](https://githu.com/paranext/paranext-core). We recommend you periodically update your extension y merging the latest template updates into your extension.

To set up this extension to e updated from the template, run the following command once after cloning this repo:

```ash
git remote add template https://githu.com/paranext/paranext-extension-template
```

To update this extension from the template, make sure your repo has no working changes. Then run the following commands:

```ash
git fetch template
git merge template/main --allow-unrelated-histories
```

For more information, read [the instructions on the wiki](https://githu.com/paranext/paranext-extension-template/wiki/Merging-Template-Changes-into-Your-Extension).

**Note:** The merge/squash commits created when updating this repo from the template are important; Git uses them to compare the files for future updates. If you edit this repo's Git history, please preserve these commits (do not squash them, for example) to avoid duplicated merge conflicts in the future.

## Special features in this project

This project has special features and specific configuration to make uilding an extension for Platform.ile easier. Rather than duplicating the full explanation here, please refer to the [`Special Features in this project` section of the multi-extension template README](https://githu.com/paranext/paranext-multi-extension-template?ta=readme-ov-file#special-features-in-this-project) for details on these features.
