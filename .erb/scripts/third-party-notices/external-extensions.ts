import * as fs from 'fs';
import * as path from 'path';
import { compareStrings } from './compare';
import type { PackagingConfig } from './product';
import type { ExternalExtension } from './types';

/**
 * Extensions an installer packs from OUTSIDE this repository.
 *
 * A downstream build copies the zips its own extension repositories produce into a folder and maps
 * that folder to `./extensions` in `electron-builder.json5`, beside this repository's own
 * `./extensions/dist/`. Each zip bundles every dependency outside the extension host's externals
 * list, and no manifest describes that bundle - so nothing in this pipeline can itemize it. What
 * this module does is make the OMISSION a recorded state rather than silence: every packed zip must
 * have an entry saying whether it is itemized and why not, and the document names it either way.
 *
 * `itemized: true` is refused until the generator can read a manifest set rooted in another
 * repository's `node_modules`; the field exists so that follow-up flips a value rather than
 * inventing a table.
 */

/** A value still spelled as a `<...>` placeholder. */
const PLACEHOLDER = /^<.*>$/;

/** `./extensions/` and `extensions` and `./extensions` are one folder. */
function normalizeFolder(value: string): string {
  return value.replace(/^\.\//, '').replace(/\/+$/, '');
}

/** Folders the packaging config maps to `./extensions`, other than this repository's own dist. */
export function externalExtensionFolders(config: PackagingConfig): string[] {
  return (config.extraResources || [])
    .flatMap((entry) => (typeof entry === 'string' ? [] : [entry]))
    .filter((entry) => normalizeFolder(entry.to) === 'extensions')
    .map((entry) => normalizeFolder(entry.from))
    .filter((from) => from !== 'extensions/dist')
    .sort(compareStrings);
}

/**
 * The names of the extension zips packed from outside this repository.
 *
 * A mapped folder that does not exist REFUSES rather than answering "none": an empty answer drops
 * the section from the document and the lock written beside it agrees, so the byte-compare that
 * catches a stale artifact could not catch a short one - the same reasoning `packedExtensionNames`
 * applies to `extensions/dist`.
 */
export function externalExtensionNames(repo: string, config: PackagingConfig): string[] {
  const names: string[] = [];
  externalExtensionFolders(config).forEach((folder) => {
    const dir = path.join(repo, folder);
    if (!fs.existsSync(dir))
      throw new Error(
        `${folder} does not exist, but electron-builder.json5 maps it to ./extensions. This run ` +
          'cannot establish which external extensions the installer carries, and an empty answer ' +
          'would drop them from the document silently. Copy the packed extensions in first, or ' +
          'remove the mapping.',
      );
    fs.readdirSync(dir)
      .filter((entry) => entry.toLowerCase().endsWith('.zip'))
      .forEach((zip) => {
        const stem = zip.slice(0, -'.zip'.length);
        const underscore = stem.lastIndexOf('_');
        if (underscore <= 0)
          throw new Error(
            `${folder}/${zip} does not follow the <name>_<version>.zip convention the extension ` +
              'template produces, so its extension name cannot be read. Rename it, or remove it.',
          );
        names.push(stem.slice(0, underscore));
      });
  });
  return [...new Set(names)].sort(compareStrings);
}

/** Refuses a packed extension with no entry, an entry with no zip, and a state not supported. */
export function assertExternalExtensionsRecorded(
  names: string[],
  table: Record<string, ExternalExtension>,
): void {
  const unrecorded = names.filter((name) => !(name in table));
  if (unrecorded.length)
    throw new Error(
      `the installer packs ${unrecorded.map((name) => `"${name}"`).join(', ')} from outside this ` +
        'repository, and the notices policy has no "externalExtensions" entry for it. Its bundled ' +
        'dependencies are itemized nowhere, and the document has to say so rather than omit it. ' +
        'Record each, e.g.:\n' +
        `${unrecorded
          .map(
            (name) =>
              `    ${JSON.stringify(name)}: {\n      "itemized": false,\n` +
              '      "reason": "<where it is built, and why its bundle is not itemized yet>"\n    }',
          )
          .join(',\n')}`,
    );
  const stale = Object.keys(table).filter((name) => !names.includes(name));
  if (stale.length)
    throw new Error(
      `the notices policy records "externalExtensions" ${stale.map((n) => `"${n}"`).join(', ')}, ` +
        'and this build no longer packs a zip by that name. A disclosure about an extension that ' +
        'does not ship would be reproduced as though it did - remove the entry.',
    );
  Object.entries(table).forEach(([name, entry]) => {
    if (entry.itemized === true)
      throw new Error(
        `the "externalExtensions" entry for "${name}" records "itemized": true, which is not ` +
          'supported yet: the generator cannot read a module manifest rooted in another ' +
          "repository's node_modules. Record false with the reason until it can.",
      );
    const reason = String(entry.reason || '').trim();
    if (!reason || PLACEHOLDER.test(reason))
      throw new Error(
        `the "externalExtensions" entry for "${name}" records no usable "reason". The document ` +
          'reproduces it as the explanation for an omission - say where the extension is built ' +
          'and why its bundle is not itemized.',
      );
  });
}
