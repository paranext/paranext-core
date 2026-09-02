// @vitest-environment node

// This covers the snap packaging setup rather than a sibling module: `electron-builder.json5` at
// the repo root plus the snapcraft template that the `app-builder-lib` patch under `patches/`
// rewrites. It lives here because `vitest.config.ts` only collects tests from `src/**`,
// `tools/pt9-css-converter/src/**` and `.erb/scripts/**`, and build config belongs to the last.

import { readdirSync, readFileSync } from 'fs';
import path from 'path';
import JSON5 from 'json5';
import { parse as parseYaml } from 'yaml';

/**
 * The GNOME platform content snap that pairs with each snap base.
 *
 * These must stay in step: a base and a platform snap from different Ubuntu releases put the app's
 * staged libraries and the mounted platform libraries out of sync, and the app fails to launch. The
 * full rationale lives beside `base` in `electron-builder.json5`.
 */
const GNOME_PLATFORM_BY_BASE: Readonly<Record<string, string>> = {
  core18: 'gnome-3-28-1804',
  core20: 'gnome-3-38-2004',
  core22: 'gnome-42-2204',
  core24: 'gnome-46-2404',
};

/**
 * The Ubuntu runner each snap base is built on.
 *
 * Parts of the snap are assembled in the host OS and parts in the snap environment, so a base that
 * disagrees with the runner mixes libraries from two Ubuntu releases into one snap.
 *
 * The `core18` and `core20` rows are historical: GitHub Actions has retired both of those runner
 * images, so those pairings document what was true rather than something reachable today.
 */
const UBUNTU_RUNNER_BY_BASE: Readonly<Record<string, string>> = {
  core18: 'ubuntu-18.04',
  core20: 'ubuntu-20.04',
  core22: 'ubuntu-22.04',
  core24: 'ubuntu-24.04',
};

/** Workflows that pin the Linux runner the snap is built on, via an `OS_LINUX` env value. */
const LINUX_RUNNER_WORKFLOWS = ['test.yml', 'package-main.yml', 'publish.yml'];

/** Mount point the snap's launch scripts read the GNOME platform from. */
const GNOME_PLATFORM_TARGET = '$SNAP/gnome-platform';

const REPO_ROOT = path.join(__dirname, '..', '..');

/**
 * The attributes of a single plug.
 *
 * Deliberately not called `PlugDescriptor`: electron-builder exports that name for the OUTER map of
 * plug-name to attributes, so reusing it here for the inner bag would read backwards to anyone who
 * knows the library.
 */
type PlugAttributes = {
  interface?: string;
  target?: string;
  'default-provider'?: string;
};

/** A found plug, keyed by the name it is declared under. */
type NamedPlug = { key: string; descriptor: PlugAttributes };

/** A plain object, for walking into parsed config and YAML without asserting a shape. */
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && !!value && !Array.isArray(value);
}

/**
 * A plug map holds one descriptor per plug name. A plug declared as a bare name has no descriptor
 * at all — electron-builder stores an empty value for it, and YAML yields one for `key:` with
 * nothing after it — so entries are treated as optional and absent ones are filtered out below.
 */
function isPlugMap(value: unknown): value is Record<string, PlugAttributes | undefined> {
  return isRecord(value);
}

let cachedConfig: unknown;

/** `electron-builder.json5`, parsed once for every reader below. */
function readConfig(): unknown {
  cachedConfig ??= JSON5.parse(
    readFileSync(path.join(REPO_ROOT, 'electron-builder.json5'), 'utf8'),
  );
  return cachedConfig;
}

/**
 * `snap.base` from `electron-builder.json5`.
 *
 * Validated rather than narrowed: a config restructure should say so, not surface as a bare
 * TypeError from somewhere downstream.
 */
function readSnapBase(): string {
  const config = readConfig();
  const base: unknown = isRecord(config) && isRecord(config.snap) ? config.snap.base : undefined;
  if (typeof base !== 'string')
    throw new Error(
      'electron-builder.json5 has no string `snap.base`. If the config was restructured, this ' +
        'test and the GNOME platform pairing it guards both need revisiting.',
    );
  return base;
}

/**
 * Every plug that mounts something at `$SNAP/gnome-platform` in the snap electron-builder would
 * actually emit, gathered from both places one can be declared: electron-builder's snapcraft
 * template, and this repo's own `snap.plugs`.
 *
 * Both are collected because a build-time collision is what breaks the snap: two plugs competing
 * for this one mount point make snapd rename one aside, arbitrarily, at install time. They are
 * merged by key last-wins to mirror electron-builder's own merge (`snap.plugs[plugName] =
 * plugOptions`), so a config entry that legitimately overrides the template's plug under the same
 * key stays one plug here, exactly as it would in the build.
 */
function findGnomePlatformPlugs(): NamedPlug[] {
  const template: unknown = parseYaml(readSnapTemplate());
  const templatePlugs = isRecord(template) && isPlugMap(template.plugs) ? template.plugs : {};

  const config = readConfig();
  // `snap.plugs` accepts a bare plug map as well as an array of names and maps.
  const rawConfigPlugs: unknown =
    isRecord(config) && isRecord(config.snap) ? config.snap.plugs : undefined;
  const configPlugEntries = (Array.isArray(rawConfigPlugs) ? rawConfigPlugs : [rawConfigPlugs])
    .filter(isPlugMap)
    .flatMap((plugMap) => Object.entries(plugMap));

  const mergedByKey = new Map(
    [...Object.entries(templatePlugs), ...configPlugEntries].filter(
      (entry): entry is [string, PlugAttributes] => Boolean(entry[1]),
    ),
  );

  return [...mergedByKey]
    .map(([key, descriptor]) => ({ key, descriptor }))
    .filter(({ descriptor }) => descriptor.target === GNOME_PLATFORM_TARGET);
}

/**
 * Electron-builder's snapcraft template, resolved through the module graph rather than an assumed
 * `node_modules` layout — `app-builder-lib` is a transitive dependency of `electron-builder`, so
 * nothing guarantees npm hoists it to the repo root. `templates/` is package-internal, so a bare
 * read failure is ambiguous; surface it as a prompt to re-check the patch instead.
 */
function readSnapTemplate(): string {
  try {
    const packageRoot = path.dirname(require.resolve('app-builder-lib/package.json'));
    return readFileSync(path.join(packageRoot, 'templates', 'snap', 'snapcraft.yaml'), 'utf8');
  } catch (error) {
    throw new Error(
      "Could not read app-builder-lib's templates/snap/snapcraft.yaml. " +
        'The app-builder-lib patch under patches/ rewrites the GNOME platform plug in that ' +
        'template, so if it has moved or changed shape, check that the patch still applies. ' +
        `Cause: ${error}`,
    );
  }
}

/**
 * The `app-builder-lib` patch files, found by glob rather than by name: patch-package stamps the
 * package version into the filename, so the name changes on every `electron-builder` bump.
 */
function readAppBuilderLibPatches(): string[] {
  const patchesDir = path.join(REPO_ROOT, 'patches');
  return readdirSync(patchesDir)
    .filter((name) => /^app-builder-lib\+.*\.patch$/.test(name))
    .map((name) => readFileSync(path.join(patchesDir, name), 'utf8'));
}

/** The `OS_LINUX` runner each snap-building workflow pins, named so a failure says which one. */
function readWorkflowLinuxRunners(): { workflow: string; runner: string | undefined }[] {
  return LINUX_RUNNER_WORKFLOWS.map((workflow) => {
    const contents = readFileSync(path.join(REPO_ROOT, '.github', 'workflows', workflow), 'utf8');
    return { workflow, runner: /^\s*OS_LINUX:\s*(\S+)/m.exec(contents)?.[1] };
  });
}

describe('electron-builder snap configuration', () => {
  it('declares a snap base whose matching GNOME platform snap and runner are known', () => {
    // Bumping `base` without teaching these maps the new pairings should fail loudly rather than
    // silently leaving the previous release's platform snap or runner in place.
    const base = readSnapBase();
    expect(Object.keys(GNOME_PLATFORM_BY_BASE)).toContain(base);
    expect(Object.keys(UBUNTU_RUNNER_BY_BASE)).toContain(base);
  });

  it('keeps a confinement that ships plugs at all', () => {
    // Under `confinement: 'classic'` electron-builder deletes the entire plugs map (`delete
    // snap.plugs`), so the GNOME platform plug would vanish from the snap while every other
    // assertion in this file still passed — they read the config and the template, not the effect
    // of confinement on them. Absent is fine; the template's default is strict.
    const config = readConfig();
    const confinement: unknown =
      isRecord(config) && isRecord(config.snap) ? config.snap.confinement : undefined;
    expect(confinement).not.toBe('classic');
  });

  it('builds the snap on the Ubuntu runner matching snap.base', () => {
    // `base` is coupled to three things: the GNOME platform snap (asserted below), and the runner
    // pinned by every workflow that builds a snap. That second coupling was comment-only until
    // now, so a `base` bump could leave the runners behind and mix two Ubuntu releases into one
    // snap -- the same class of mismatch this whole guard exists to prevent.
    const expected = UBUNTU_RUNNER_BY_BASE[readSnapBase()];
    expect(readWorkflowLinuxRunners()).toEqual(
      LINUX_RUNNER_WORKFLOWS.map((workflow) => ({ workflow, runner: expected })),
    );
  });

  it('mounts exactly one GNOME platform plug, named for snap.base', () => {
    const expected = GNOME_PLATFORM_BY_BASE[readSnapBase()];
    const plugs = findGnomePlatformPlugs();

    // Asserting on the KEY, and on there being exactly one, is what makes this guard meaningful.
    // snapd matches stored connections by plug name across a refresh, so a plug left under an
    // older name revives the stale connection on every existing install — and a second plug under
    // any other name leaves two competing for this mount point, which snapd breaks by renaming one
    // aside arbitrarily. Both failure modes ship an app that may or may not start.
    expect(plugs.map((plug) => plug.key)).toEqual([expected]);
    expect(plugs[0].descriptor.interface).toBe('content');
    expect(plugs[0].descriptor['default-provider']).toBe(expected);
  });

  it('keeps the rename in a committed patch, not just in an installed node_modules', () => {
    // The assertion above reads the INSTALLED template, which is what electron-builder consumes —
    // but that stays satisfied by a warm `node_modules` even if the patch file were deleted. A
    // fresh `npm ci` in CI is the real check; this catches the same mistake locally. It confirms
    // the patch is present and names the right plug, not that it would still apply.
    const expected = GNOME_PLATFORM_BY_BASE[readSnapBase()];
    const patches = readAppBuilderLibPatches();

    expect(patches.length).toBeGreaterThan(0);
    expect(patches.some((patch) => patch.includes(expected))).toBe(true);
  });
});
