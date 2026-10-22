import * as fs from 'fs';
import * as path from 'path';
import { compareStrings } from './compare';
import { requireText } from './policy';
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
 * TODO(PT-4604): `itemized: true` is refused until the generator can read a manifest set rooted in
 * another repository's `node_modules`; the field exists so that follow-up flips a value rather than
 * inventing a table. https://paratextstudio.atlassian.net/browse/PT-4604
 */

/**
 * `./extensions/` and `extensions` and `./extensions` are one folder.
 *
 * Takes `unknown` because electron-builder declares both `from` and `to` OPTIONAL on a `FileSet`,
 * so `PackagingConfig`'s shape is a claim about JSON nobody validated: an entry that omits either
 * would otherwise reach `.replace` on `undefined` and abort the run with a bare `TypeError`.
 */
function normalizeFolder(value: unknown): string {
  if (typeof value !== 'string' || !value.trim()) return '';
  // Backslashes and repeated `./` segments spell the same folder, and a config edited on Windows
  // produces both. Without collapsing them `extensions\dist` and `./././extensions/dist` fail the
  // exclusion below and are treated as folders from outside this repository, which then fail with a
  // remedy about a copy step that ran perfectly well.
  return path.posix.normalize(value.replace(/\\/g, '/')).replace(/^\.\//, '').replace(/\/+$/, '');
}

/** The `electron-builder.json5` platform block a Node `process.platform` value packages from. */
function platformExtraResources(
  config: PackagingConfig,
  platform: typeof process.platform,
): unknown[] | undefined {
  if (platform === 'darwin') return config.mac?.extraResources;
  if (platform === 'win32') return config.win?.extraResources;
  if (platform === 'linux') return config.linux?.extraResources;
  return undefined;
}

/**
 * Every `extraResources` list electron-builder reads, top-level and per-platform.
 *
 * App-builder-lib UNIONS a platform block's list with the top-level one rather than replacing it,
 * so a folder declared under `win` alone still ships. Reading only the top level would answer "no
 * external extensions" for such a build - and because that answer is empty rather than wrong, every
 * refusal below stays silent and the section drops out of the document.
 *
 * `platform` narrows that union to one platform's blocks. The document is generated on Linux and
 * describes EVERY platform, so writing it reads all four; a check running beside a build reads only
 * what that build packages, because the folders another platform maps are not copied in on this one
 * and refusing their absence would blame a copy step that was never meant to run here.
 */
function extraResourceEntries(
  config: PackagingConfig,
  platform?: typeof process.platform,
): unknown[] {
  const lists = platform
    ? [config.extraResources, platformExtraResources(config, platform)]
    : [
        config.extraResources,
        config.mac?.extraResources,
        config.win?.extraResources,
        config.linux?.extraResources,
      ];
  return lists.flatMap((list) => (Array.isArray(list) ? list : []));
}

/**
 * Whether an `extraResources` element is the object form rather than the string one.
 *
 * A string entry copies to `resources/` PRESERVING its relative path, so the only string that could
 * land zips in `resources/extensions` is one naming this repository's own `extensions` tree - which
 * the exclusion in `externalExtensionFolders` drops anyway. `typeof null` is `'object'`, hence the
 * truthiness test rather than `typeof` alone.
 */
function isFileSetEntry(entry: unknown): entry is { from?: unknown; to?: unknown } {
  return Boolean(entry) && typeof entry === 'object';
}

/**
 * Folders the packaging config maps to `./extensions`, other than this repository's own dist.
 *
 * `platform` narrows to what one platform's build packages - see `extraResourceEntries`.
 */
export function externalExtensionFolders(
  config: PackagingConfig,
  platform?: typeof process.platform,
): string[] {
  return extraResourceEntries(config, platform)
    .filter(isFileSetEntry)
    .filter((entry) => normalizeFolder(entry.to) === 'extensions')
    .map((entry) => normalizeFolder(entry.from))
    .filter((from) => from && from !== 'extensions/dist')
    .sort(compareStrings);
}

/**
 * The names of the extension zips packed from other repositories.
 *
 * A mapped folder that does not exist REFUSES rather than answering "none": an empty answer drops
 * the section from the document and the lock written beside it agrees, so the byte-compare that
 * catches a stale artifact could not catch a short one - the same reasoning `packedExtensionNames`
 * applies to `extensions/dist`.
 */
export function externalExtensionNames(
  repo: string,
  config: PackagingConfig,
  platform?: typeof process.platform,
): string[] {
  const names: string[] = [];
  externalExtensionFolders(config, platform).forEach((folder) => {
    // `resolve` rather than `join`: `join` does not reset on an absolute segment, so an absolute
    // `from` would be silently reinterpreted as a path under the repository.
    const dir = path.resolve(repo, folder);
    if (!fs.existsSync(dir))
      throw new Error(
        `${folder} does not exist, but electron-builder.json5 maps it to ./extensions. This run ` +
          'cannot establish which external extensions the installer carries, and an empty answer ' +
          'would drop them from the document silently. Copy the packed extensions in first, or ' +
          'remove the mapping.',
      );
    const zips = fs
      .readdirSync(dir, { withFileTypes: true })
      // `isFile` because a DIRECTORY named `something.zip` is not a packed extension, and counting
      // one would invent a disclosure for an extension that does not ship. A symlink IS one:
      // `readdirSync` does not stat the target, so a staged bundle reports `isSymbolicLink` and
      // nothing else, while electron-builder follows it and packs the zip - the same treatment
      // `readPackageFiles` gives the case in `package-files.ts`.
      .filter(
        (entry) =>
          (entry.isFile() || entry.isSymbolicLink()) && entry.name.toLowerCase().endsWith('.zip'),
      )
      .map((entry) => entry.name);
    // An existing folder holding no zip is refused for the same reason a missing one is: it answers
    // "none", the section drops out of the document, and the lock written beside it agrees - so the
    // byte-compare that catches a stale artifact cannot catch a short one. A copy step that has not
    // run yet reaches exactly this state.
    if (!zips.length)
      throw new Error(
        `${folder} holds no .zip, but electron-builder.json5 maps it to ./extensions. An empty ` +
          'answer would drop the extensions packed there from the document silently. Copy the ' +
          'packed extensions in first, or remove the mapping.',
      );
    zips.forEach((zip) => {
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
  const unrecorded = names.filter((name) => !Object.hasOwn(table, name));
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
  const packed = new Set(names);
  const stale = Object.keys(table).filter((name) => !packed.has(name));
  if (stale.length)
    throw new Error(
      `the notices policy records "externalExtensions" ${stale.map((n) => `"${n}"`).join(', ')}, ` +
        'and this build no longer packs a zip by that name. A disclosure about an extension that ' +
        'does not ship would be reproduced as though it did - remove the entry.',
    );
  Object.entries(table).forEach(([name, entry]) => {
    // `!== false` rather than `=== true`: the field is declared a required boolean, but the policy
    // is untyped JSON, so an omitted key or a quoted "true" would otherwise pass the one gate that
    // is supposed to hold this table to the only value the renderer can describe.
    if (entry.itemized !== false)
      throw new Error(
        `the "externalExtensions" entry for "${name}" records "itemized" as ` +
          `${JSON.stringify(entry.itemized)}; anything other than false is not supported yet: the ` +
          "generator cannot read a module manifest rooted in another repository's node_modules. " +
          'Record false with the reason until it can.',
      );
    // The shared refusal, not a local coercion: `render.ts` interpolates this value straight into
    // the document, so a non-string would ship as the literal `[object Object]` in the sentence
    // that explains the omission. The separate-programs table refuses exactly that, and this one
    // records the same kind of reviewer-written prose.
    requireText(`the "externalExtensions" entry for "${name}"`, 'reason', entry.reason);
  });
}
