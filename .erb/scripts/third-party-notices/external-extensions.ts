import * as fs from 'fs';
import * as path from 'path';
import { compareStrings } from './compare';
import { requireText } from './policy';
import type { PackagingConfig } from './product';
import type { ExternalExtension, ExternalExtensionCheckout } from './types';

/**
 * Extensions an installer packs from OUTSIDE this repository.
 *
 * A downstream build copies the zips its own extension repositories produce into a folder and maps
 * that folder to `./extensions` in `electron-builder.json5`, beside this repository's own
 * `./extensions/dist/`. Each zip bundles every dependency outside the extension host's externals
 * list, and the zip itself carries no manifest describing that bundle. An entry recorded `itemized:
 * true` names, as its `sourceCheckout`, the `externalExtensionCheckouts` entry for a checkout of
 * the repository that builds the zip, and `external-extension-packages.ts` itemizes the bundle from
 * that checkout's module manifests and installed packages. Each `externalExtensionCheckouts` entry
 * records its checkout's `path` and the package counts it must yield. An entry recorded `itemized:
 * false` - a zip built somewhere no checkout here can reach - states the reason instead, so the
 * omission is a recorded state rather than silence. Either way, every packed zip must have an
 * entry, and the document names it.
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
 * The file names of the packed extensions in one existing folder: the entries named `*.zip`, in any
 * letter case, that are files or symlinks.
 *
 * `isFile` because a DIRECTORY named `something.zip` is not a packed extension, and counting one
 * would invent a disclosure for an extension that does not ship. A symlink IS one: `readdirSync`
 * does not stat the target, so a staged bundle reports `isSymbolicLink` and nothing else, while
 * electron-builder follows it and packs the zip - the same treatment `readPackageFiles` gives the
 * case in `package-files.ts`.
 *
 * The disclosure table and the license-pointer check both read zips through this, so they cannot
 * disagree about which zips ship.
 *
 * @param dir An existing folder that electron-builder maps to `./extensions`.
 */
export function extensionZipsIn(dir: string): string[] {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter(
      (entry) =>
        (entry.isFile() || entry.isSymbolicLink()) && entry.name.toLowerCase().endsWith('.zip'),
    )
    .map((entry) => entry.name);
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
    const zips = extensionZipsIn(dir);
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

/** An itemized checkout: one `externalExtensionCheckouts` entry, and the extensions that name it. */
export type ItemizedCheckout = {
  /** The `externalExtensionCheckouts` key: the name the checkout is listed and reported under. */
  name: string;
  /** The absolute folder the entry's `path` resolves to. */
  root: string;
  extensions: string[];
  minimumPackages: ExternalExtensionCheckout['minimumPackages'];
};

/**
 * The absolute folder a checkout's `path` names, resolved against `policyDir`: the overlay's folder
 * when one is selected, else the base policy file's folder.
 *
 * Backslashes become `/` so a policy edited on Windows resolves identically elsewhere.
 */
function checkoutRoot(policyDir: string, checkoutPath: string): string {
  return path.resolve(policyDir, checkoutPath.replace(/\\/g, '/'));
}

/**
 * The refusal for an itemized entry whose `sourceCheckout` names no `externalExtensionCheckouts`
 * entry.
 *
 * @param subject The entry or entries naming the checkout, in a phrase that opens the sentence.
 * @param name The checkout name the entry records, which the remedy tells the reader to add.
 */
function missingCheckoutMessage(subject: string, name: string): string {
  return (
    `${subject} names sourceCheckout "${name}", and "externalExtensionCheckouts" has no entry by ` +
    `that name. Add "${name}" there with its "path" and "minimumPackages", or name an entry it ` +
    'already has.'
  );
}

/**
 * The checkouts `itemized: true` entries read from: one per `externalExtensionCheckouts` entry they
 * name, sorted by name.
 */
export function itemizedCheckouts(
  table: Record<string, ExternalExtension>,
  checkouts: Record<string, ExternalExtensionCheckout>,
  policyDir: string,
): ItemizedCheckout[] {
  const extensionsByName = new Map<string, string[]>();
  Object.entries(table).forEach(([extension, entry]) => {
    if (entry.itemized !== true || typeof entry.sourceCheckout !== 'string') return;
    extensionsByName.set(entry.sourceCheckout, [
      ...(extensionsByName.get(entry.sourceCheckout) ?? []),
      extension,
    ]);
  });
  return [...extensionsByName.entries()]
    .sort(([first], [second]) => compareStrings(first, second))
    .map(([name, extensions]) => {
      if (!Object.hasOwn(checkouts, name))
        throw new Error(
          missingCheckoutMessage(
            `the "externalExtensions" entry for ${extensions.map((n) => `"${n}"`).join(', ')}`,
            name,
          ),
        );
      const checkout = checkouts[name];
      return {
        name,
        root: checkoutRoot(policyDir, checkout.path),
        extensions: extensions.sort(compareStrings),
        minimumPackages: checkout.minimumPackages,
      };
    });
}

const MINIMUM_FIELDS = ['own', 'core', 'stylesheet'] as const;

/** A checkout name: one line, with no spaces at either end. */
const CHECKOUT_NAME = /^\S(?:.*\S)?$/;

/**
 * Which folder `root` is, for telling whether two checkout entries name the same one: its real
 * path, so a symlink or junction counts as the folder it points to, compared without case where the
 * filesystem usually ignores it.
 */
function folderIdentity(root: string): string {
  const real = fs.realpathSync.native(root);
  return process.platform === 'win32' || process.platform === 'darwin' ? real.toLowerCase() : real;
}

/**
 * Refuses a packed extension with no entry, an entry with no zip, and an unusable checkout.
 *
 * @param checkoutPolicy The policy's `externalExtensionCheckouts` table and the folder each
 *   checkout's `path` resolves against.
 */
export function assertExternalExtensionsRecorded(
  names: string[],
  table: Record<string, ExternalExtension>,
  {
    checkouts,
    policyDir,
  }: { checkouts: Record<string, ExternalExtensionCheckout>; policyDir: string },
): void {
  const unrecorded = names.filter((name) => !Object.hasOwn(table, name));
  if (unrecorded.length)
    throw new Error(
      `the installer packs ${unrecorded.map((name) => `"${name}"`).join(', ')} from outside this ` +
        'repository, and the notices policy has no "externalExtensions" entry for it. Its ' +
        'bundled dependencies are itemized nowhere, and the document has to say so rather than ' +
        'omit it. Record each, either itemized from a checkout of the repository that builds it ' +
        '(named by an "externalExtensionCheckouts" entry that records the checkout\'s path):\n' +
        `${unrecorded
          .map(
            (name) =>
              `    ${JSON.stringify(name)}: {\n      "itemized": true,\n` +
              '      "sourceCheckout": "<name of its externalExtensionCheckouts entry>",\n' +
              '      "reason": "<where it is built, and anything the itemization does not ' +
              'cover>"\n    }',
          )
          .join(',\n')}\n` +
        'or as not itemized:\n' +
        `${unrecorded
          .map(
            (name) =>
              `    ${JSON.stringify(name)}: {\n      "itemized": false,\n` +
              '      "reason": "<why it is not itemized>"\n    }',
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
  const named = new Set<string>();
  Object.entries(table).forEach(([name, entry]) => {
    const where = `the "externalExtensions" entry for "${name}"`;
    // A non-boolean is refused outright: the policy is untyped JSON, so an omitted key or a quoted
    // "true" would otherwise pass the gate that decides whether the generator reads a checkout.
    if (typeof entry.itemized !== 'boolean')
      throw new Error(
        `${where} records "itemized" as ${JSON.stringify(entry.itemized)}; record true or false.`,
      );
    if (entry.itemized) {
      if (typeof entry.sourceCheckout !== 'string' || !entry.sourceCheckout.trim())
        throw new Error(
          `${where} records "itemized": true with no "sourceCheckout". Name the ` +
            '"externalExtensionCheckouts" entry for the checkout of the repository that builds ' +
            'it, or record false with the reason.',
        );
      if (!Object.hasOwn(checkouts, entry.sourceCheckout))
        throw new Error(missingCheckoutMessage(where, entry.sourceCheckout));
      named.add(entry.sourceCheckout);
    } else if (entry.sourceCheckout !== undefined)
      throw new Error(
        `${where} records "itemized": false with a "sourceCheckout", which is contradictory. ` +
          'Record true to itemize it from that checkout, or remove "sourceCheckout".',
      );
    // The shared refusal, not a local coercion: `render.ts` interpolates this value straight into
    // the document, so a non-string would ship as the literal `[object Object]` in the sentence
    // that explains the omission. The separate-programs table refuses exactly that, and this one
    // records the same kind of reviewer-written prose.
    requireText(where, 'reason', entry.reason);
  });
  // Two entries for one folder are refused: that checkout would be read twice and listed under two
  // names, each with minimums of its own.
  const nameByFolder = new Map<string, string>();
  Object.entries(checkouts).forEach(([name, checkout]) => {
    const where = `"externalExtensionCheckouts" entry "${name}"`;
    // The name is the heading the checkout's packages are listed under, and Markdown ends a heading
    // at a line break.
    if (!CHECKOUT_NAME.test(name))
      throw new Error(
        `"externalExtensionCheckouts" records the name ${JSON.stringify(name)}, which the ` +
          'notices document uses as a heading. Use one line with no spaces at either end.',
      );
    if (!named.has(name))
      throw new Error(
        `"externalExtensionCheckouts" records "${name}", and no itemized "externalExtensions" ` +
          'entry names it as its sourceCheckout. A minimum nothing checks would read as ' +
          'protection that is not there - remove the entry.',
      );
    const checkoutPath: unknown = checkout?.path;
    if (typeof checkoutPath !== 'string' || !checkoutPath.trim())
      throw new Error(
        `${where} records "path" as ${JSON.stringify(checkoutPath)}. Record the folder holding ` +
          "the extensions' source and installed node_modules, relative to the overlay's folder " +
          "when one is selected, else the base policy file's folder.",
      );
    const root = checkoutRoot(policyDir, checkoutPath);
    if (!fs.existsSync(root))
      throw new Error(
        `${where} records path "${checkoutPath}", which resolves to ${root}, and that folder ` +
          "does not exist. Check the extensions' repository out there and install its " +
          'dependencies, or correct the path.',
      );
    if (!fs.statSync(root).isDirectory())
      throw new Error(
        `${where} records path "${checkoutPath}", which resolves to ${root}, and that is a ` +
          "file rather than a folder. Point it at the checkout's folder.",
      );
    const folder = folderIdentity(root);
    const earlier = nameByFolder.get(folder);
    if (earlier !== undefined)
      throw new Error(
        `"externalExtensionCheckouts" entries "${earlier}" and "${name}" both name the folder ` +
          `${fs.realpathSync.native(root)}, so that one checkout would be read and listed twice. ` +
          'Keep one of them, and name it in every sourceCheckout that names the other.',
      );
    nameByFolder.set(folder, name);
    MINIMUM_FIELDS.forEach((field) => {
      const value: unknown = checkout?.minimumPackages?.[field];
      if (typeof value !== 'number' || !Number.isInteger(value) || value < 1)
        throw new Error(
          `${where} records minimumPackages.${field} as ${JSON.stringify(value)}; it must be a ` +
            'positive integer, so a source that finds nothing is refused.',
        );
    });
  });
}
