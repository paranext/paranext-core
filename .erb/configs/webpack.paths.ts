const fs = require('fs');
const path = require('path');

const rootPath = path.join(__dirname, '../..');
const rootNodeModulesPath = path.join(rootPath, 'node_modules');

const dllPath = path.join(__dirname, '../dll');

// The dev webpack caches list these as `buildDependencies`, because webpack's default
// `snapshot.managedPaths` validates everything under `node_modules` by package `name@version`
// rather than content — so a patch-package edit would otherwise restore the patched module with no
// rebuild. Filtered to `.patch` on purpose: every entry becomes a build dependency, and webpack
// responds to one it cannot resolve by writing no pack at all, so a stray subdirectory here would
// silently switch dev caching off.
const patchesPath = path.join(rootPath, 'patches');
const patchFiles = fs
  .readdirSync(patchesPath)
  .filter((file: string) => file.endsWith('.patch'))
  .map((file: string) => path.join(patchesPath, file));

const srcPath = path.join(rootPath, 'src');
const srcMainPath = path.join(srcPath, 'main');
const srcExtensionHostPath = path.join(srcPath, 'extension-host');
const srcRendererPath = path.join(srcPath, 'renderer');
const srcSharedPath = path.join(srcPath, 'shared');
const srcDeclarationsPath = path.join(srcPath, 'declarations');

const releasePath = path.join(rootPath, 'release');
const appPath = path.join(releasePath, 'app');
const appPackagePath = path.join(appPath, 'package.json');
const appNodeModulesPath = path.join(appPath, 'node_modules');

const distPath = path.join(appPath, 'dist');
const distMainPath = path.join(distPath, 'main');
const distExtensionHostPath = path.join(distPath, 'extension-host');
const distRendererPath = path.join(distPath, 'renderer');

const buildPath = path.join(releasePath, 'build');

const extensionsPath = path.join(rootPath, 'extensions');
const extensionsDistPath = path.join(extensionsPath, 'dist');
const extensionsLibPath = path.join(extensionsPath, 'lib');

const webpackPaths = {
  rootPath,
  rootNodeModulesPath,
  dllPath,
  srcPath,
  srcMainPath,
  srcExtensionHostPath,
  srcRendererPath,
  srcSharedPath,
  srcDeclarationsPath,
  releasePath,
  appPath,
  appPackagePath,
  appNodeModulesPath,
  distPath,
  distMainPath,
  distExtensionHostPath,
  distRendererPath,
  buildPath,
  extensionsPath,
  extensionsDistPath,
  extensionsLibPath,
  patchesPath,
  patchFiles,
};
export default webpackPaths;
