/**
 * Removes the build output a packaging build must not inherit.
 *
 * TypeScript, not JavaScript, and that is load-bearing rather than tidying. `webpack.paths.ts`
 * mixes `require()` with `export default`, so it compiles to CommonJS - and what a default import
 * of it resolves to depends on the MODULE KIND OF THE IMPORTER. From a `.ts` file the loader
 * applies interop and hands over the object; from a `.js` file Node parses as ESM it hands over the
 * CommonJS namespace, `{ default: … }`, whose every property is `undefined`.
 *
 * That failure is silent: `fs.existsSync(undefined)` returns false rather than throwing, so every
 * folder below reads as "not there" and `npm run package` cleans NOTHING while exiting 0.
 * `clean.test.ts` spawns this entry point rather than importing it, because an import from a test
 * cannot see it - a test is TypeScript and gets the working interop either way.
 */

import { rimrafSync } from 'rimraf';
import fs from 'fs';
import path from 'path';
import webpackPaths from '../configs/webpack.paths';

const foldersToRemove = [
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

function clean(): void {
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
