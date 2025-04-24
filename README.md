# paranext-core

Extensible Bible translation software

<div align="center">
  <img src="./assets/icon.svg" width="256" alt="Platform icon" />
</div>

<div align="center">

[![Build Status][github-actions-status]][github-actions-url]
[![CodeQL][gitghub-codeql-status]][gitghub-codeql-url]
[![Github Tag][github-tag-image]][github-tag-url]

</div>

## Summary

Platform.Bible is extensible Bible translation software. Its functionality is provided almost completely by extensions in order to be very powerful and flexible, giving developers the freedom to create and to share their desired Bible translation experience.

This repository contains the core Platform.Bible software (Electron client, extension host including the Platform API (PAPI), and .NET library) and the extensions that come bundled with it. There are many other repositories containing additional extensions.

## Users

This software is not yet ready for users. We'll update here with where you can install it when it is ready.

If you would still like to try it, you can [download early releases here on GitHub](https://github.com/paranext/paranext-core/releases).

### Linux Users

We produce [`snap` packages](<https://en.wikipedia.org/wiki/Snap_(software)>) available [on the snap store](https://snapcraft.io/platform-bible) for users to run our
software on Linux. Once you have all the `snap` tools installed for your flavor of Linux, run `sudo snap install platform-bible` for our most recent stable build (none yet) or `sudo snap install platform-bible --channel=edge` for our most recent, pre-release build that has passed our limited, automated testing suite.

To install a locally created `snap` package, run the following commands:

```sh
sudo snap install <path to snap file> --dangerous
sudo snap connect platform-bible:dot-platform-bible
```

Some users may find that not everything works properly in Linux without some additional setup. Please see [How to set up Platform.Bible on Linux](https://github.com/paranext/paranext/wiki/How-to-set-up-Platform.Bible-on-Linux) for more information.

### Mac Users

If you download and run the ARM release of Platform.Bible from [a computer running Apple Silicon](https://support.apple.com/en-us/116943), you will likely encounter a warning from Apple's Gatekeeper stating that "Platform.Bible is an app downloaded from the Internet. Are you sure you want to open it?":

![mac-arm-downloaded-internet-warning](doc-meta/mac-arm-downloaded-internet-warning.png)

Don't be alarmed! This is a typical warning, seen when downloading most apps from the Internet. It also says "Apple checked it for malicious software and none was detected." If you trust Platform.Bible and would like to run it select "Open."

Once the app is opened, you may see a dialog that says "Platform.Bible wants to use your confidential information stored in 'Platform.Bible Safe Storage' in your keychain."

![mac-arm-keychain-access-warning](doc-meta/mac-arm-keychain-access-warning.png)

We use encryption to keep your data safe, allowing access to keychain provides encryption services with `papi.dataProtection` so extensions can store user data securely. If you approve of this, please allow keychain access.

## Developer Install

Set up pre-requisites for building:

### Linux Development Pre-requisites

Add the system libraries needed for Electron, [Build Instructions (Linux)](https://www.electronjs.org/docs/latest/development/build-instructions-linux).

If you are developing on Ubuntu 24.04 with AppArmor, you will need to modify `package.json` locally to add the `--no-sandbox` flag to `electronmon`. For example:

```json
{
  "scripts": {
    "start:main": "concurrently -k -P \"cross-env NODE_ENV=development TS_NODE_TRANSPILE_ONLY=true webpack --watch --config ./.erb/configs/webpack.config.main.dev.ts\" \"electronmon --no-sandbox . {@}\" --"
  }
}
```

This should be a temporary workaround until we update to newer versions of `electron` and `electron-builder`.

### macOS Development Pre-requisites

macOS doesn't come preinstalled with all the
[icu4c](https://unicode-org.github.io/icu/userguide/icu4c/) libraries. They must be
installed separately to provide Unicode support to our .NET code. Platform.Bible is
configured to expect those libraries to be installed using
[MacPorts](https://www.macports.org/). The
[icu package on MacPorts](https://ports.macports.org/port/icu/) has the icu4c
libraries needed for icu.net to run properly.

The build processes are configured to automatically download and package icu4c
libraries with the application, but for development this has to be done manually.

The .NET data provider is configured to automatically copy the icu4c `dylib`s into
its build output directory. If for some reason you need to disable that, you will
need to set an environment variable for the OS to find them. For example:

```bash
export DYLD_FALLBACK_LIBRARY_PATH="$HOME/lib:/usr/local/lib:/usr/lib:/opt/local/lib"
```

If you need to set environment variables like the above, consider adding them to
your `.zprofile` so you don't have to remember to do it manually.

### All Platforms Development Pre-requisites

Install [`Node.js` version >=18.0.0](https://nodejs.org/) (18.0.0 or greater is required for using `fetch`). We recommend using [Volta](#javascript-tool-manager).

Install `dotnet` [.NET 8 SDK from here](https://learn.microsoft.com/en-us/dotnet/core/install/).

To check if `dotnet` is installed run (ensure you have a v8 SDK):

```bash
dotnet --version
dotnet --list-sdks
```

### Cloning and installing dependencies (all platforms)

Clone the repo:

```bash
git clone https://github.com/paranext/paranext-core.git
cd paranext-core
```

If you want to develop an extension for Platform.Bible, check out the Git reference (usually a [tag](https://github.com/paranext/paranext-core/tags)) corresponding to the version for which you want to develop your extension. We recommend you develop for the latest released version, _not_ `main`. Consult [the version table](https://github.com/paranext/paranext/wiki/Software-Version-Info) for more information. For example, if you want to develop your extension for version 0.3.0, run the following:

```bash
git checkout v0.3.0
```

Install dependencies:

```bash
npm install
```

To build, run the following:

```bash
npm run build
```

## Starting Development

Start the app in the `dev` environment:

```bash
npm start
```

After you run `npm start` (or, in VSCode, launch `Debug Platform`), you can edit the code, and the relevant processes will hot reload.

### Developing Extensions

Platfrom.Bible core extensions are found in the `extensions` folder. Please follow the instructions in
[extensions/README.md](extensions/README.md) to develop core extensions.

Please see the [Extension Template wiki](https://github.com/paranext/paranext-extension-template/wiki) for guides on developing additional extensions that are not part of the Platform.Bible core. Once you have packaged an extension, it can be distributed for Platform.Bible users to install. See [Running your extension in an app](https://github.com/paranext/paranext-extension-template/wiki/Debugging-Your-Extension-in-the-Production-Application#running-your-extension-in-an-app) for installation information.

## GitHub Pages

**[Platform.Bible API Documentation](https://paranext.github.io/paranext-core/papi-dts)**

- Explore the declarations of types available on the PAPI.

**[Platform.Bible React Components and Hooks Documentation](https://paranext.github.io/paranext-core/platform-bible-react)**

- Check out the React components and hooks available to use.

**[Platform.Bible Utilities Documentation](https://paranext.github.io/paranext-core/platform-bible-utils)**

- Check out the utility functions, types, and classes available to use.

**[Platform.Bible and Paratext 10 Studio Wiki](https://github.com/paranext/paranext-core/wiki/Platform.Bible-and-Paratext-10-Studio)**

- Explore links to other resources relevant to Platform.Bible and Paratext 10 Studio.

## JavaScript Tool Manager

You can use [Volta](https://volta.sh/) with this repo to use the right version of tools such as **node** and **npm**.

If you don't use Volta just look at the `volta` property in [package.json](https://github.com/paranext/paranext-core/blob/main/package.json) to see the right tool versions to install in your preferred way.

## Packaging for Production

To package apps for the local platform:

```bash
npm run package
```

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

3. In GitHub, adjust the new draft release's body and other metadata as desired, then publish the release.
4. Open a PR and merge the newly created `bump-versions-<next_version>` branch.
5. Update the [Software Version Info](https://github.com/paranext/paranext/wiki/Software-Version-Info) page with information about this release.
6. When appropriate, in [Snapcraft](https://snapcraft.io/platform-bible/releases), promote the newly uploaded release to the appropriate channel.

## Testing

The following tests run automatically on each GitHub PR (see [test.yml](https://github.com/paranext/paranext-core/blob/main/.github/workflows/test.yml)).

To run C# unit tests:

```bash
cd c-sharp-tests
dotnet test
```

To run C# unit tests watching for file changes:

```bash
cd c-sharp-tests
dotnet watch test
```

To run all TS unit tests:

```bash
npm test
```

To run an individual TS unit test watching for file changes:

```bash
npm test -- <path/to/test-file.test.ts> --watch
```

You can also use the [recommended VS Code extensions](#vs-code-extension-options) to run tests there.

## Storybook

To run Storybook locally:

```bash
npm run storybook
```

To build Storybook:

```bash
npm run storybook:build
```

To run Storybook as a web app, after it was built successfully:

```bash
npx http-server ./storybook-static
```

## Windows Development with WSL2

On Windows, you can install [WSL](https://learn.microsoft.com/en-us/windows/wsl/) (Windows Subsystem for Linux) so you can test cross-platform compatibility on Linux (as well as Windows). You'll need to use a Linux distribution with WSL2 (rather than WSL1) so the X-Server windows can be opened for Electron.

1. Here is how to [install Linux on Windows with WSL](https://learn.microsoft.com/en-us/windows/wsl/install).
2. You'll want to follow that by setting up to use **VS Code**, **Git** and **NodeJS** with WSL. See the various [tutorials](https://learn.microsoft.com/en-us/windows/wsl/setup/environment).
3. In the WSL distribution, add system libraries needed for Electron, see [Linux Development Pre-requisites](#linux-development-pre-requisites) above.
4. In the WSL distribution, clone the repo as described above under [Developer Install](#developer-install).

You'll be running a copy of the repo in both Windows and WSL so make sure they are both up-to-date.

You can use VS Code from your host to access code in your WSL repo clone using the Microsoft [Remote Development](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack) VS Code extension.

## VS Code Extension Options

Extensions highly recommended for this repo are already displayed in VS Code through the [Extensions Recommendations settings](https://github.com/paranext/paranext-core/blob/main/.vscode/extensions.json). These are optional extensions that our developers enjoy using:

- [TODO Highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight)
- [Version Lens](https://marketplace.visualstudio.com/items?itemName=pflannery.vscode-versionlens)

## Formatting and Linting

Formatting happens automatically when you commit. If you use VS Code with this repo's recommended extensions it will format when you save.

To check TypeScript for readability, maintainability, and functionality errors, and to check a few other files for proper formatting, run the following from the repo root (or just use VS Code with this repo's recommended extensions)

```bash
npm run format
npm run lint
```

To check C# for readability, maintainability, and functionality errors, run the following from the repo root (or just use VS Code with this repo's recommended extensions)

```bash
cd c-sharp
dotnet tool restore
dotnet csharpier .
```

## Documentation in `papi.d.ts`

VSCode renders JSDoc comments in the UI to make it easier for developers to use functions and properties as intended. However, those comments do not always propagate from modules to the `d.ts` type definition file when those modules are re-exported. To help with this problem in `papi.d.ts` that we export for extensions to reference, we added some custom functionality.

If you want comments to be copied from one location in `papi.d.ts` to another, do the following:

- In the JSDoc comments that you want copied elsewhere, add "JSDOC SOURCE myServiceName" (must have a blank line after) in the JSDoc comments like this:

```typescript
/**
 * JSDOC SOURCE myService
 *
 * myService is amazing. Here are more details about it.
 * ...
 */
const myService = {
  ...
}
```

- In the location where you want the docs copied, add "JSDOC DESTINATION myServiceName" like this:

```typescript
const papi = {
  ...
  /** JSDOC DESTINATION myService */
  myService,
```

## Thanks

Some important decisions in this project were inspired by the work done in [Visual Studio Code](https://code.visualstudio.com/api). Thanks VS Code developers for some great ideas!

## License

This project is licensed under the [MIT License](./LICENSE).
Copyright © 2017-2025 [SIL Global](https://www.sil.org/) and [United Bible Societies](https://unitedbiblesocieties.org/)

<!-- define variables used above -->

[github-actions-status]: https://github.com/paranext/paranext-core/workflows/Test/badge.svg
[github-actions-url]: https://github.com/paranext/paranext-core/actions
[gitghub-codeql-status]: https://github.com/paranext/paranext-core/actions/workflows/codeql-analysis.yml/badge.svg
[gitghub-codeql-url]: https://github.com/paranext/paranext-core/actions/workflows/codeql-analysis.yml
[github-tag-image]: https://img.shields.io/github/tag/paranext/paranext-core.svg?label=version
[github-tag-url]: https://github.com/paranext/paranext-core/releases/latest
