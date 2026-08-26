/**
 * Removes the build output a packaging build must not inherit.
 *
 * TypeScript, not JavaScript, and that is load-bearing rather than tidying. `webpack.paths.ts`
 * mixes `require()` with `export default`, so it compiles to CommonJS - and what a default import
 * of it resolves to depends on the MODULE KIND OF THE IMPORTER. From a `.ts` file the loader
 * applies interop and hands over the object; from a `.js` file Node parses as ESM (which this was,
 * and which its own runtime warning said) it hands over the CommonJS namespace, `{ default: … }`,
 * whose every property is `undefined`.
 *
 * `fs.existsSync(undefined)` returns false rather than throwing, so every folder below read as "not
 * there" and `npm run package` cleaned NOTHING - silently, exiting 0. The only reason that ever
 * surfaced is that `path.join` is strict where `fs.existsSync` is not, so adding `.notices` to the
 * list turned a silent no-op into a crash. `clean.test.ts` spawns this entry point to keep it that
 * way: importing this module from a test cannot see the bug, because a test is TypeScript and gets
 * the working interop either way.
 */

import { rimrafSync } from 'rimraf';
import fs from 'fs';
import path from 'path';
import webpackPaths from '../configs/webpack.paths';

export const foldersToRemove = [
  webpackPaths.distPath,
  webpackPaths.buildPath,
  webpackPaths.dllPath,
  webpackPaths.extensionsDistPath,
  // The webpack module manifests and build id the third-party notices generator reads. Nothing
  // removed them, which is why several of that pipeline's error messages tell the reader to run
  // `rm -rf .notices` by hand: a manifest for a bundle that no longer exists sits there
  // indefinitely, and a stale one silently shortens a legal document.
  path.join(webpackPaths.rootPath, '.notices'),
];

export function clean(): void {
  foldersToRemove.forEach((folder) => {
    if (fs.existsSync(folder)) rimrafSync(folder);
  });
}

// `--print` lists what would be removed and removes nothing, so the entry point can be exercised
// without deleting a tree - see the module docstring for why only the entry point can be.
if (require.main === module) {
  if (process.argv.includes('--print')) foldersToRemove.forEach((folder) => console.log(folder));
  else clean();
}
