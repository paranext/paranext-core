# paranext-core

Backend webserver/extension host and frontend Electron client for Paranext

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

Clone the repo and install dependencies:

```bash
git clone https://github.com/paranext/paranext-core.git
cd paranext-core
npm install
```

## Starting Development

Start the app in the `dev` environment:

```bash
npm start
```

## Packaging for Production

To package apps for the local platform:

```bash
npm run package
```

## Publishing

1. Create a branch of the form `release/*`, e.g. `release/v1.2.3`, or `release/v1.2.3-rc1`.
2. Update the _version_ in your project's `package.json` file (e.g. _1.2.3_).
3. Run `npm i` to update `package-lock.json`.
4. Create a new draft [GitHub **Release**](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository), ensure the following are included:
   - a _Tag version_, e.g. `v1.2.3`.
   - a copy of the change log. Click **Generate release notes** as a starting point.
   - Click **Save draft**.
5. Update `CHANGELOG.md` with changes in this release from the GitHub draft **Release**.
6. Commit these changes to your release branch.
7. Push the commit to GitHub.
8. Once the GitHub build **Action** has finished, it will add build artifact files to the draft release. Remove the `.blockmap` files and leave the `.yml` files and the installers and executable, e.g. `.exe` on Windows.
9. Publish the release on GitHub.

## Linux Development

Add the system libraries needed for Electron, [Build Instructions (Linux)](https://www.electronjs.org/docs/latest/development/build-instructions-linux).

## Windows Development with WSL2

On Windows, you can install [WSL](https://learn.microsoft.com/en-us/windows/wsl/) (Windows Subsystem for Linux) so you can test cross-platform compatibility on Linux (as well as Windows). You'll need to use a Linux distribution with WSL2 (rather than WSL1) so the X-Server windows can be opened for Electron.

1. Here is how to [install Linux on Windows with WSL](https://learn.microsoft.com/en-us/windows/wsl/install).
2. You'll want to follow that by setting up to use **VS Code**, **Git** and **NodeJS** with WSL. See the various [tutorials](https://learn.microsoft.com/en-us/windows/wsl/setup/environment).
3. In the WSL distribution, add system libraries needed for Electron, see [Linux Development](#linux-development) above.
4. In the WSL distribution, clone the repo as described above under [Developer Install](#developer-install).

You'll be running a copy of the repo in both Windows and WSL so make sure they are both up-to-date.

## License

MIT © [SIL International](https://www.sil.org/)
