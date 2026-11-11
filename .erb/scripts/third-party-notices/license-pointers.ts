import * as fs from 'fs';
import * as path from 'path';
import JSZip from 'jszip';
import { compareStrings } from './compare';
import { messageOf } from './read-json';

/**
 * A comment a minifier leaves where it moved a license text out of a bundle: `For license
 * information please see main.js.LICENSE.txt`. The named file must ship beside the bundle, or the
 * legal text it stands for is gone.
 *
 * The name stops at `\` because an extension's `main.js` carries each web view inlined as a
 * JavaScript string, where the comment may be escaped (`\/*! ... x.LICENSE.txt *\/`).
 */
export const LICENSE_POINTER = /For license information please see ([^\s*"'\\]+\.LICENSE\.txt)/g;

type PointerScan = { scanned: number; dangling: string[] };

/** The distinct license file names a script points at. */
function pointersIn(source: string): string[] {
  return [...new Set([...source.matchAll(LICENSE_POINTER)].map((match) => match[1]))];
}

function jsFilesUnder(root: string): string[] {
  const found: string[] = [];
  const walk = (dir: string): void => {
    fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.isFile() && entry.name.endsWith('.js')) found.push(full);
    });
  };
  walk(root);
  return found.sort(compareStrings);
}

/** Every `*.js` under `root` whose license pointer names a file that is not beside it. */
export function danglingPointersInFiles(root: string): PointerScan {
  const files = jsFilesUnder(root);
  const dangling: string[] = [];
  files.forEach((file) => {
    const relative = path.relative(root, file).split(path.sep).join('/');
    pointersIn(fs.readFileSync(file, 'utf8')).forEach((pointer) => {
      if (!fs.existsSync(path.resolve(path.dirname(file), pointer)))
        dangling.push(`${relative} -> ${pointer}`);
    });
  });
  return { scanned: files.length, dangling };
}

/**
 * The same check over the `.js` entries of a zip, resolving each pointer against the entry's folder
 * inside the zip. Entries are reported as `<zip file name>!<entry name>`.
 */
export async function danglingPointersInZip(zipPath: string): Promise<PointerScan> {
  let zip: JSZip;
  try {
    zip = await JSZip.loadAsync(fs.readFileSync(zipPath));
  } catch (error) {
    throw new Error(
      `Could not read ${zipPath} as a zip, so its license pointers were not checked: ` +
        `${messageOf(error)}. Rebuild the extension's package (npm run package in its ` +
        'repository) and copy the new zip in.',
    );
  }
  const zipName = path.basename(zipPath);
  const entryNames = Object.keys(zip.files).sort(compareStrings);
  const scripts = entryNames.filter((name) => !zip.files[name].dir && name.endsWith('.js'));
  const dangling: string[] = [];
  await scripts.reduce(async (previous, name) => {
    await previous;
    const source = await zip.files[name].async('string');
    pointersIn(source).forEach((pointer) => {
      const target = path.posix.join(path.posix.dirname(name), pointer);
      if (!zip.files[target]) dangling.push(`${zipName}!${name} -> ${pointer}`);
    });
  }, Promise.resolve());
  return { scanned: scripts.length, dangling };
}

/**
 * Refuses any license pointer, in this repository's built output or in an extension zip built
 * elsewhere, whose file does not ship.
 */
export async function assertNoDanglingLicensePointers({
  repo,
  externalZips,
}: {
  repo: string;
  externalZips: string[];
}): Promise<void> {
  const dangling: string[] = [];

  const appDist = path.join(repo, 'release', 'app', 'dist');
  const appScan = fs.existsSync(appDist) ? danglingPointersInFiles(appDist) : undefined;
  if (!appScan || appScan.scanned === 0)
    throw new Error(
      `${appDist} holds no .js files, so nothing was built and nothing was checked for license ` +
        'pointers; run npm run build.',
    );
  appScan.dangling.forEach((entry) => dangling.push(`release/app/dist/${entry}`));

  const extensionsDist = path.join(repo, 'extensions', 'dist');
  if (fs.existsSync(extensionsDist))
    danglingPointersInFiles(extensionsDist).dangling.forEach((entry) =>
      dangling.push(`extensions/dist/${entry}`),
    );

  const zipScans = await Promise.all(externalZips.map((zipPath) => danglingPointersInZip(zipPath)));
  zipScans.forEach((scan) => dangling.push(...scan.dangling));

  if (dangling.length > 0)
    throw new Error(
      'These scripts point at a license file that does not ship beside them, so its legal text ' +
        `would be lost:\n${dangling.map((entry) => `  ${entry}`).join('\n')}\n` +
        'Rebuild with npm run build (or rebuild the extension zip) so the bundler emits each ' +
        '.LICENSE.txt file, or stop it from extracting licenses.',
    );
}
