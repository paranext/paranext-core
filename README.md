# paranext-core

Electron client, extension host, and C# library for Paranext

<div align="center" style="background-color: #b8d432;">
  <br />
  <img src="assets/pt-react.png" />
  <br />
  <br />
</div>

<div align="center">

[![Build Status][github-actions-status]][github-actions-url]
[![Github Tag][github-tag-image]][github-tag-url]

</div>

## Users

This software is not yet ready for users. We'll update here with where you can install it when its ready.

## Developer Install

Set up pre-requisites for building Node native dependencies (electron-edge-js):

### Windows Development Pre-requisites

1. Install Visual Studio 2022 (or something that enables `dotnet`. Probably can be older than 2022).
   - In the Visual Studio Installer, install ".NET desktop development" and "Desktop development with C++" workloads in VS Installer. Or install .NET 7 and C++ build tools separately from the Visual Studio Installer.
2. Install Python 3.6.x (or probably newer).
3. Install Node 16.17.1 (or install [nvm-windows](https://github.com/coreybutler/nvm-windows) and use Node 16.17.1 with the following steps)
   1. Uninstall Node
   2. Install [nvm-windows](https://github.com/coreybutler/nvm-windows)
   3. Run `nvm install 16.17.1`
   4. Run `nvm use 16.17.1`
   5. In this project folder, run `node --version` to make sure you are running Node 16.17.1
   6. [Optional] If desired, run `nvm install lts` or `nvm install latest` for LTS or latest to use in other projects

Please see [edge-js build requirements on Windows](https://github.com/agracio/edge-js#building-on-windows) for more information.

### OSX Development Pre-requisites

Please see [edge-js build requirements on OSX](https://github.com/agracio/edge-js#building-on-osx) for more information.

### Linux Development Pre-requisites

Please see [edge-js build requirements on Linux](https://github.com/agracio/edge-js#building-on-linux) for more information.

### Cloning and installing dependencies (all platforms)

Clone the repo and install dependencies:

```bash
git clone https://github.com/paranext/paranext-core.git
cd paranext-core
npm install
```

If you experience problems here or when running and trying to use C# calls, see [Troubleshooting C# Edge function calls](#troubleshooting-c-edge-function-calls).

## Starting Development

Start the app in the `dev` environment:

```bash
npm start
```

After you run `npm start`, you can edit the Electron and frontend files, and they will hot reload. To edit C# files, you must stop the `npm start` process (or only close Paranext), run `npm run build:edge`, and restart `npm start` (or if you only closed Paranext, make a trivial edit to `src/main/main.ts`, and save it to launch Paranext again).

If you experience problems here or when running and trying to use C# calls, see [Troubleshooting C#](#troubleshooting-c-edge-function-calls).

## Packaging for Production

To package apps for the local platform:

```bash
npm run package
```

## Publishing

1. Create a branch of the form `release/*`, e.g. `release/v1.2.3`, or `release/v1.2.3-rc1`.
2. Update the _version_ in your project's `package.json` file (e.g. _1.2.3_).
3. Run `npm i` to update `package-lock.json`.
4. Create a new draft GitHub **Release**, ensure the following are included:
   - a _Tag version_, e.g. `v1.2.3`.
   - a copy of the change log. Click **Generate release notes** as a starting point.
5. Update `CHANGELOG.md` with changes in this release from the GitHub draft **Release**.
6. Commit these changes to your release branch.
7. Tag your commit, e.g. `v1.2.3`.
8. Push the tag then the commit to GitHub.
9. Once the GitHub build **Action** has finished, it will add build artifact files to the draft release. Remove the `.blockmap` and `.yml` files and leave the executable, e.g. `.exe` on Windows.
10. Publish the release on GitHub.

## Linux Development

Add the system libraries needed for Electron, [Build Instructions (Linux)](https://www.electronjs.org/docs/latest/development/build-instructions-linux).

## Windows Development with WSL2

On Windows, you can install [WSL](https://learn.microsoft.com/en-us/windows/wsl/) (Windows Subsystem for Linux) so you can test cross-platform compatibility on Linux (as well as Windows). You'll need to use a Linux distribution with WSL2 (rather than WSL1) so the X-Server windows can be opened for Electron.

1. Here is how to [install Linux on Windows with WSL](https://learn.microsoft.com/en-us/windows/wsl/install).
2. You'll want to follow that by setting up to use **VS Code**, **Git** and **NodeJS** with WSL. See the various [tutorials](https://learn.microsoft.com/en-us/windows/wsl/setup/environment).
3. In the WSL distribution, add system libraries needed for Electron, see [Linux Development](#linux-development) above.
4. In the WSL distribution, clone the repo as described above under [Developer Install](#developer-install).

You'll be running a copy of the repo in both Windows and WSL so make sure they are both up-to-date.

## Troubleshooting C# Edge function calls

If you experience problems with installing/running Paranext and calling C# functions, try the following:

1. You can try rebuilding native dependencies like `electron-edge-js` and look at any problems that arise: navigate to `./release/app` and run `npm install`.
   - If you see an error stating that node-abi could not find the abi for Electron, try running `npm uninstall @electron/rebuild` and then `npm install @electron/rebuild --save-dev`.
   - If you see an error stating that it couldn't find Python or Visual Studio, try setting up the development environment as described in [Developer Install](#developer-install).
2. If you see an error like `Error invoking remote method 'electronAPI.edge.invoke': TypeError: edge.initializeClrFunc is not a function` when running Edge functions, your native dependencies are probably not rebuilding properly. See #1 above. If that does not solve the problem, ensure `main.ts` is setting the `EDGE_APP_ROOT` environment variable properly to the `c-sharp` dll build folder, and make sure you have built the `EdgeLibrary.csproj` project or run `npm run build:edge`.
3. If you see an error like `Error: Call to coreclr_create_delegate() for G failed with a return code of 0x80070002`, ensure your `EdgeLibrary.csproj`'s `EdgeJs.dll` reference is pointing to the right location. The `EdgeJs.dll` should be in `./release/app/node_modules/electron-edge-js/lib/bootstrap/bin/Release/netcoreapp1.1/EdgeJs.dll` by default after running `npm install`.

## License

MIT © [Paranext](https://github.com/paranext)
