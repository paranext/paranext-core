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
 * true` names the `sourceCheckout` of the repository that builds the zip, and
 * `external-extension-packages.ts` itemizes the bundle from that checkout's module manifests and
 * installed packages; `externalExtensionCheckouts` records, per checkout, the package counts it
 * must yield. An entry recorded `itemized: false` - a zip built somewhere no checkout here can
 * reach - states the reason instead, so the omission is a recorded state rather than silence.
 * Either way, every packed zip must have an entry, and the document names it.
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

/** An itemized checkout: one source folder, however many entries and spellings name it. */
export type ItemizedCheckout = {
  root: string;
  /** The first (sorted) spelling of the checkout found among the entries. */
  key: string;
  /**
   * The `externalExtensionCheckouts` key recorded for this checkout, verbatim. It may be spelled
   * differently from `key`, and it is the one a reader editing a minimum has to search for.
   */
  tableKey: string;
  extensions: string[];
  minimumPackages: ExternalExtensionCheckout['minimumPackages'];
};

/**
 * The absolute folder a `sourceCheckout` names, resolved against `policyDir`: the overlay's folder
 * when one is selected, else the base policy file's folder.
 *
 * Backslashes become `/` so a policy edited on Windows resolves identically elsewhere, and
 * `resolve` drops a trailing separator, so `../co` and `..\co\` are one root.
 */
function checkoutRoot(policyDir: string, sourceCheckout: string): string {
  return path.resolve(policyDir, sourceCheckout.replace(/\\/g, '/'));
}

/**
 * The refusal for an itemized entry whose `sourceCheckout` has no `externalExtensionCheckouts` key.
 *
 * @param subject The entry or entries naming the checkout, in a phrase that opens the sentence.
 * @param key The `sourceCheckout` spelling the entry uses, which the remedy tells the reader to
 *   add.
 */
function missingCheckoutKeyMessage(subject: string, key: string): string {
  return (
    `${subject} names sourceCheckout "${key}", and "externalExtensionCheckouts" has no key for ` +
    `it. Add "${key}" there with its minimumPackages.`
  );
}

/**
 * The checkouts `itemized: true` entries read from, one per distinct resolved root.
 *
 * Two distinct roots with one basename are refused: a checkout is listed and reported under its
 * folder's basename, so the document's headings and the rebuild messages could not tell them
 * apart.
 */
export function itemizedCheckouts(
  table: Record<string, ExternalExtension>,
  checkouts: Record<string, ExternalExtensionCheckout>,
  policyDir: string,
): ItemizedCheckout[] {
  const byRoot = new Map<string, { keys: string[]; extensions: string[] }>();
  Object.entries(table).forEach(([name, entry]) => {
    if (entry.itemized !== true || typeof entry.sourceCheckout !== 'string') return;
    const root = checkoutRoot(policyDir, entry.sourceCheckout);
    const found = byRoot.get(root) ?? { keys: [], extensions: [] };
    found.keys.push(entry.sourceCheckout);
    found.extensions.push(name);
    byRoot.set(root, found);
  });
  const roots = [...byRoot.keys()].sort(compareStrings);
  roots.forEach((root, index) => {
    const clash = roots
      .slice(index + 1)
      .find((other) => path.basename(other) === path.basename(root));
    if (clash)
      throw new Error(
        `the itemized checkouts ${root} and ${clash} share the folder name ` +
          `"${path.basename(root)}", which is the name each checkout is listed and reported ` +
          "under. The document's headings and the rebuild messages would not say which one they " +
          'mean. ' +
          'Rename one of the folders.',
      );
  });
  return [...byRoot.entries()]
    .map(([root, { keys, extensions }]) => {
      const key = keys.sort(compareStrings)[0];
      // The table is keyed by one spelling and an entry may use another, so match by resolved root.
      const recorded = Object.entries(checkouts).find(
        ([candidate]) => checkoutRoot(policyDir, candidate) === root,
      );
      if (!recorded)
        throw new Error(
          missingCheckoutKeyMessage(
            `the "externalExtensions" entry for ${extensions.map((n) => `"${n}"`).join(', ')}`,
            key,
          ),
        );
      return {
        root,
        key,
        tableKey: recorded[0],
        extensions: extensions.sort(compareStrings),
        minimumPackages: recorded[1].minimumPackages,
      };
    })
    .sort((a, b) => compareStrings(a.root, b.root));
}

const MINIMUM_FIELDS = ['own', 'core', 'stylesheet'] as const;

/**
 * Refuses a packed extension with no entry, an entry with no zip, and an unusable checkout.
 *
 * @param checkoutPolicy The policy's `externalExtensionCheckouts` table and the folder its
 *   `sourceCheckout` paths resolve against. Optional only for a table with no itemized entry, which
 *   reads no checkout.
 */
export function assertExternalExtensionsRecorded(
  names: string[],
  table: Record<string, ExternalExtension>,
  checkoutPolicy?: { checkouts: Record<string, ExternalExtensionCheckout>; policyDir: string },
): void {
  // Without the policy's folder an itemized entry's `sourceCheckout` would resolve against the
  // process's working directory, and the checks below would validate a folder nobody named.
  if (!checkoutPolicy && Object.values(table).some((entry) => entry.itemized === true))
    throw new Error(
      'assertExternalExtensionsRecorded was given an itemized "externalExtensions" entry and no ' +
        'checkout policy. Pass the policy\'s "externalExtensionCheckouts" and the folder its ' +
        'sourceCheckout paths resolve against.',
    );
  const { checkouts, policyDir } = checkoutPolicy ?? { checkouts: {}, policyDir: '' };
  const unrecorded = names.filter((name) => !Object.hasOwn(table, name));
  if (unrecorded.length)
    throw new Error(
      `the installer packs ${unrecorded.map((name) => `"${name}"`).join(', ')} from outside this ` +
        'repository, and the notices policy has no "externalExtensions" entry for it. Its ' +
        'bundled dependencies are itemized nowhere, and the document has to say so rather than ' +
        'omit it. Record each, either itemized from a checkout of the repository that builds it ' +
        '(which also needs an "externalExtensionCheckouts" entry for that checkout):\n' +
        `${unrecorded
          .map(
            (name) =>
              `    ${JSON.stringify(name)}: {\n      "itemized": true,\n` +
              '      "sourceCheckout": "<path to the checkout>",\n' +
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
  // Two keys for one folder are refused: `itemizedCheckouts` reads the minimums of whichever it
  // finds first, so the other would read as a minimum that is enforced when it is not.
  const keyByRoot = new Map<string, string>();
  Object.keys(checkouts).forEach((key) => {
    const root = checkoutRoot(policyDir, key);
    const earlier = keyByRoot.get(root);
    if (earlier !== undefined)
      throw new Error(
        `"externalExtensionCheckouts" records both "${earlier}" and "${key}", which resolve to ` +
          `the same folder, ${root}. Keep one of them.`,
      );
    keyByRoot.set(root, key);
  });
  const checkoutKeys = new Set(keyByRoot.keys());
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
          `${where} records "itemized": true with no "sourceCheckout". Name the folder ` +
            "holding the extension's source and installed node_modules, relative to the " +
            "overlay's folder when one is selected, else the base policy file's folder, or " +
            'record false with the reason.',
        );
      const root = checkoutRoot(policyDir, entry.sourceCheckout);
      named.add(root);
      if (!checkoutKeys.has(root))
        throw new Error(missingCheckoutKeyMessage(where, entry.sourceCheckout));
      if (!fs.existsSync(root) || !fs.statSync(root).isDirectory())
        throw new Error(
          `${where} names sourceCheckout "${entry.sourceCheckout}", which resolves to ` +
            `${root}, and that folder does not exist. Check the extension out there and install ` +
            'its dependencies, or correct the path.',
        );
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
  Object.entries(checkouts).forEach(([key, checkout]) => {
    if (!named.has(checkoutRoot(policyDir, key)))
      throw new Error(
        `"externalExtensionCheckouts" records "${key}", and no itemized "externalExtensions" ` +
          'entry names it as its sourceCheckout. A minimum nothing checks would read as ' +
          'protection that is not there - remove the entry.',
      );
    MINIMUM_FIELDS.forEach((field) => {
      const value: unknown = checkout?.minimumPackages?.[field];
      if (typeof value !== 'number' || !Number.isInteger(value) || value < 1)
        throw new Error(
          `"externalExtensionCheckouts" entry "${key}" records minimumPackages.${field} as ` +
            `${JSON.stringify(value)}; it must be a positive integer, so a source that finds ` +
            'nothing is refused.',
        );
    });
  });
}
