import { execFileSync } from 'child_process';
import { existsSync, mkdtempSync, readdirSync, readFileSync, rmSync } from 'fs';
import os from 'os';
import path from 'path';
import { parse as parseYaml } from 'yaml';
import { GNOME_PLATFORM_BY_BASE, GNOME_PLATFORM_TARGET } from './snap-platform-pairing';

/**
 * Where a built snap keeps the metadata snapd reads when it installs and connects it.
 *
 * This file rather than the `snapcraft.yaml` electron-builder stages, because that one is
 * snapcraft's INPUT: snapcraft reads it and emits this, so only this reflects what a machine
 * installs. Note the two are written by different tools -- electron-builder stages
 * `snap/snapcraft.yaml` (it would write `meta/snap.yaml` directly only on the template-app path,
 * which needs `buildPackages` empty and `stagePackages` at its defaults, and this repo is
 * neither).
 *
 * Also the practical reason: a completed packaging run leaves nothing at the staged path. That is
 * observed rather than explained -- electron-builder does not delete it (`snap.js` takes a raw path
 * from `createStageDirPath`, registering no cleanup, unlike the targets that use `createStageDir`),
 * so whatever removes it lives further down in app-builder or snapcraft.
 */
const METADATA_PATH_IN_SNAP = 'meta/snap.yaml';

/** A plain object, for walking into parsed YAML without asserting a shape. */
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && !!value && !Array.isArray(value);
}

/**
 * The one snap in an electron-builder output directory.
 *
 * Finding none has to be an error rather than a pass. This check exists because the input-level
 * guard cannot see the merge that produces the shipped plug list, so "found nothing to check" is
 * the one outcome that would reintroduce the blind spot it was written to close.
 *
 * @throws If the directory holds no snap, or more than one. The entry script turns that into a
 *   failed build, so the throw is the contract rather than an edge case.
 */
export function resolveSnapArtifact(outDir: string): string {
  const found = existsSync(outDir)
    ? readdirSync(outDir, { withFileTypes: true })
        .filter((entry) => entry.isFile() && entry.name.endsWith('.snap'))
        .map((entry) => path.join(outDir, entry.name))
    : [];

  if (found.length === 0)
    throw new Error(
      `No snap artifact found in ${outDir}. This check must run after a packaging run that built ` +
        'a snap, on the Linux leg.',
    );

  if (found.length > 1)
    throw new Error(
      `Found ${found.length} snap artifacts in ${outDir}, so it is ambiguous which one ships: ` +
        `${found.join(', ')}. Clean the output directory and package again.`,
    );

  return found[0];
}

/**
 * `meta/snap.yaml` read out of a built snap.
 *
 * A snap is a squashfs image, so this shells out to `unsquashfs` -- preinstalled on the Ubuntu
 * runners, and a dependency of snapd regardless -- to extract the one file rather than unpacking a
 * quarter-gigabyte image. The temporary directory is removed whether or not extraction succeeds.
 *
 * @throws If `unsquashfs` is unavailable or fails, or if the snap carries no `meta/snap.yaml`. As
 *   above, the entry script turns that into a failed build.
 */
export function readSnapMetadata(snapPath: string): string {
  const workDir = mkdtempSync(path.join(os.tmpdir(), 'snap-metadata-'));
  try {
    try {
      execFileSync('unsquashfs', ['-force', '-dest', workDir, snapPath, METADATA_PATH_IN_SNAP], {
        stdio: 'pipe',
      });
    } catch (error) {
      throw new Error(
        `Could not extract ${METADATA_PATH_IN_SNAP} from ${snapPath}. This needs \`unsquashfs\` ` +
          `(squashfs-tools) on PATH. Cause: ${error instanceof Error ? error.message : error}`,
      );
    }

    const extracted = path.join(workDir, METADATA_PATH_IN_SNAP);
    if (!existsSync(extracted))
      throw new Error(
        `${snapPath} contains no ${METADATA_PATH_IN_SNAP}. Every snap carries one, so this is ` +
          'either not a snap or a truncated one.',
      );

    return readFileSync(extracted, 'utf8');
  } finally {
    rmSync(workDir, { recursive: true, force: true });
  }
}

/**
 * Problems with the snap metadata electron-builder generated, as messages naming what shipped and
 * what was expected. An empty array means the metadata is correct.
 *
 * This reads the generated artifact rather than the config that produced it, which is the whole
 * point: every mechanism that decides the shipped plugs -- merging by key, `confinement: 'classic'`
 * deleting the plugs map, `base` rewriting -- lives in app-builder-lib's `snap.js` and is invisible
 * from the inputs. `base` is read from this same file for the same reason; taking it from
 * `electron-builder.json5` would check the artifact against an input rather than against itself.
 */
export function checkGeneratedSnapMetadata(yamlText: string): string[] {
  let metadata: unknown;
  try {
    metadata = parseYaml(yamlText);
  } catch (error) {
    // Reported rather than thrown so the message names the metadata, like every other problem here.
    // A raw YAMLParseError reaching the caller says only that some YAML somewhere was malformed.
    return [
      "The generated snap's metadata could not be parsed as YAML: " +
        `${error instanceof Error ? error.message : String(error)}`,
    ];
  }

  if (!isRecord(metadata)) return ['The generated snap metadata is not a YAML mapping.'];

  const { base } = metadata;
  if (typeof base !== 'string')
    return ['The generated snap metadata declares no string `base`, so no pairing can be checked.'];

  const expected = GNOME_PLATFORM_BY_BASE[base];
  if (!expected)
    return [
      `The generated snap metadata declares base \`${base}\`, which has no known GNOME platform ` +
        'snap pairing. Teach snap-platform-pairing.ts the new pairing before bumping `base`.',
    ];

  const plugs = isRecord(metadata.plugs) ? metadata.plugs : {};
  const mounted = Object.entries(plugs).filter(
    ([, attributes]) => isRecord(attributes) && attributes.target === GNOME_PLATFORM_TARGET,
  );

  if (mounted.length === 0)
    return [
      `The generated snap mounts nothing at ${GNOME_PLATFORM_TARGET}, so the app would launch ` +
        'against no GNOME platform at all. Under `confinement: classic` electron-builder deletes ' +
        'the plugs map wholesale, which produces exactly this.',
    ];

  if (mounted.length > 1)
    return [
      `The generated snap declares ${mounted.length} plugs on ${GNOME_PLATFORM_TARGET} ` +
        `(${mounted.map(([key]) => key).join(', ')}), where base \`${base}\` needs exactly one, ` +
        `\`${expected}\`. snapd breaks a tie between two plugs on one mount point by renaming one ` +
        'aside arbitrarily, so the app may or may not start.',
    ];

  const [key, attributes] = mounted[0];
  const descriptor = isRecord(attributes) ? attributes : {};
  const problems: string[] = [];

  if (key !== expected)
    problems.push(
      `The generated snap mounts \`${key}\` at ${GNOME_PLATFORM_TARGET}, but base \`${base}\` ` +
        `pairs with \`${expected}\`. snapd matches stored connections by plug name across a ` +
        'refresh, so a stale name revives the stale connection on every existing install. An ' +
        'unpatched app-builder-lib template produces this, since its own default is pinned ' +
        'regardless of `base`.',
    );

  if (descriptor.interface !== 'content')
    problems.push(
      `The plug \`${key}\` declares interface \`${String(descriptor.interface)}\`, not ` +
        '`content`, so it does not mount a platform snap at all.',
    );

  if (descriptor['default-provider'] !== key)
    problems.push(
      `The plug \`${key}\` names default-provider ` +
        `\`${String(descriptor['default-provider'])}\`, which does not match its own name. snapd ` +
        'satisfies the plug from default-provider, so this mounts a platform snap from a ' +
        'different Ubuntu release than the plug claims.',
    );

  // `content` names the slot this plug connects to and defaults to the plug's own name, so a plug
  // can install the right snap via `default-provider` and still connect to nothing. Compared
  // against the key rather than against `expected`, like `default-provider` above: the key is
  // asserted separately, so a stale name reports once as a name problem instead of twice.
  const content = descriptor.content ?? key;
  if (content !== key)
    problems.push(
      `The plug \`${key}\` carries content tag \`${String(content)}\`, which does not match its ` +
        'own name. snapd connects a content plug to a slot of that tag, so this installs the ' +
        'right platform snap and then mounts nothing from it.',
    );

  return problems;
}
