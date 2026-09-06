import { existsSync, readdirSync } from 'fs';
import path from 'path';
import { parse as parseYaml } from 'yaml';
import { GNOME_PLATFORM_BY_BASE, GNOME_PLATFORM_TARGET } from './snap-platform-pairing';

/**
 * Where electron-builder leaves the snap metadata it generates, relative to a stage directory.
 *
 * Which of the two it writes depends on `isUseTemplateApp`, which app-builder-lib derives rather
 * than exposes: the template app is used only when `buildPackages` is empty and `stagePackages`
 * matches its own default set. This repo overrides `stagePackages`, so today it is the
 * `snap/snapcraft.yaml` form -- but trimming that list back to the default would silently move the
 * file, so both are looked for.
 */
const METADATA_PATHS_IN_STAGE_DIR = [
  path.join('snap', 'snapcraft.yaml'),
  path.join('meta', 'snap.yaml'),
];

/** A plain object, for walking into parsed YAML without asserting a shape. */
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && !!value && !Array.isArray(value);
}

/**
 * Every snap stage directory under an electron-builder output directory.
 *
 * Electron-builder names these `__<target>-<arch>`, so the architecture is not known ahead of time
 * and the directory is matched by prefix.
 */
function findSnapStageDirs(outDir: string): string[] {
  if (!existsSync(outDir)) return [];
  return readdirSync(outDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name.startsWith('__snap-'))
    .map((entry) => path.join(outDir, entry.name));
}

/**
 * The generated snap metadata files found under an electron-builder output directory.
 *
 * Returns every match rather than the first: more than one means the packaging run produced several
 * snaps (or left an earlier one behind), and checking an arbitrary one of those would report on a
 * build nobody asked about.
 */
export function findGeneratedSnapMetadataPaths(outDir: string): string[] {
  return findSnapStageDirs(outDir).flatMap((stageDir) =>
    METADATA_PATHS_IN_STAGE_DIR.map((relativePath) => path.join(stageDir, relativePath)).filter(
      (candidate) => existsSync(candidate),
    ),
  );
}

/**
 * The one generated snap metadata file to check, or an explanation of why there is not exactly one.
 *
 * A missing file has to be an error rather than a pass. This check exists because the input-level
 * guard cannot see the merge that produces this file, so "found nothing to check" is the one
 * outcome that would reintroduce the blind spot it was written to close.
 */
export function resolveGeneratedSnapMetadataPath(outDir: string): string {
  const found = findGeneratedSnapMetadataPaths(outDir);

  if (found.length === 0)
    throw new Error(
      `No generated snap metadata found under ${outDir}. Expected one of ` +
        `${METADATA_PATHS_IN_STAGE_DIR.join(' or ')} inside a __snap-<arch> stage directory. ` +
        'This check must run after a packaging run that built a snap, on the Linux runner.',
    );

  if (found.length > 1)
    throw new Error(
      `Found ${found.length} generated snap metadata files under ${outDir}, so it is ambiguous ` +
        `which one ships: ${found.join(', ')}. Clean the output directory and package again.`,
    );

  return found[0];
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
  const metadata: unknown = parseYaml(yamlText);
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

  return problems;
}
