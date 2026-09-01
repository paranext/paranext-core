// This covers `electron-builder.json5` at the repo root, not a sibling module. It lives here
// because `vitest.config.ts` only collects tests from `src/**`, `tools/pt9-css-converter/src/**`
// and `.erb/scripts/**`, and build config belongs to the last of those.

import { readFileSync } from 'fs';
import path from 'path';
import JSON5 from 'json5';

/**
 * The GNOME platform content snap that pairs with each snap base.
 *
 * These must stay in step: a base and a platform snap from different Ubuntu releases put the app's
 * staged libraries and the mounted platform libraries out of sync, and the app fails to launch. The
 * full rationale, and why the plug is declared the way it is, lives beside the plug itself in
 * `electron-builder.json5`.
 */
const GNOME_PLATFORM_BY_BASE: Readonly<Record<string, string>> = {
  core18: 'gnome-3-28-1804',
  core20: 'gnome-3-38-2004',
  core22: 'gnome-42-2204',
  core24: 'gnome-46-2404',
};

/** Mount point the snap's launch scripts read the GNOME platform from. */
const GNOME_PLATFORM_TARGET = '$SNAP/gnome-platform';

const REPO_ROOT = path.join(__dirname, '..', '..');

type PlugDescriptor = {
  interface?: string;
  content?: string;
  target?: string;
  'default-provider'?: string;
};

/** Entries in `snap.plugs` are either a bare interface name or a keyed plug definition. */
type SnapPlug = string | Record<string, PlugDescriptor>;

type ElectronBuilderConfig = { snap: { base: string; plugs: SnapPlug[] } };

function readSnapConfig(): ElectronBuilderConfig['snap'] {
  const contents = readFileSync(path.join(REPO_ROOT, 'electron-builder.json5'), 'utf8');
  return JSON5.parse<ElectronBuilderConfig>(contents).snap;
}

/** The key and definition of whichever content plug mounts the GNOME platform snap. */
function findGnomePlatformPlug(plugs: SnapPlug[]) {
  return plugs
    .flatMap((plug) => (typeof plug === 'string' ? [] : Object.entries(plug)))
    .map(([key, descriptor]) => ({ key, descriptor }))
    .find(({ descriptor }) => descriptor?.target === GNOME_PLATFORM_TARGET);
}

/**
 * Electron-builder's snapcraft template, resolved through the module graph rather than an assumed
 * `node_modules` layout — `app-builder-lib` is a transitive dependency of `electron-builder`, so
 * nothing guarantees npm hoists it to the repo root. `templates/` is package-internal, so a bare
 * read failure is ambiguous; surface it as a prompt to re-check the override instead.
 */
function readSnapTemplate(): string {
  try {
    const packageRoot = path.dirname(require.resolve('app-builder-lib/package.json'));
    return readFileSync(path.join(packageRoot, 'templates', 'snap', 'snapcraft.yaml'), 'utf8');
  } catch (error) {
    throw new Error(
      "Could not read app-builder-lib's templates/snap/snapcraft.yaml. The GNOME platform plug in " +
        'electron-builder.json5 overrides an entry from that template, so if the template has ' +
        `moved or changed shape, check that the override still applies. Cause: ${error}`,
    );
  }
}

/**
 * The key electron-builder's template declares its GNOME content plug under.
 *
 * Our config can REPLACE a template plug entry but never delete one, so the override has to reuse
 * this exact key. Declaring it under a different name leaves the template's plug in place and
 * produces two content plugs competing for the same mount point.
 */
function readTemplateGnomePlugKey(): string | undefined {
  const lines = readSnapTemplate().split('\n');
  const targetIndex = lines.findIndex((line) => line.trim() === `target: ${GNOME_PLATFORM_TARGET}`);
  if (targetIndex < 0) return undefined;

  // The plug's key is the nearest two-space-indented mapping key above its `target:` line.
  const keyLine = lines
    .slice(0, targetIndex)
    .reverse()
    .find((line) => /^ {2}\S+:\s*$/.test(line));
  return keyLine ? /^ {2}(\S+):\s*$/.exec(keyLine)?.[1] : undefined;
}

describe('electron-builder snap configuration', () => {
  it('declares a snap base whose matching GNOME platform snap is known', () => {
    // Bumping `base` without teaching this map the new pairing should fail loudly rather than
    // silently leaving the previous release's platform snap mounted.
    expect(Object.keys(GNOME_PLATFORM_BY_BASE)).toContain(readSnapConfig().base);
  });

  it('mounts the GNOME platform content snap matching snap.base', () => {
    const { base, plugs } = readSnapConfig();
    const plug = findGnomePlatformPlug(plugs);
    if (!plug)
      throw new Error(
        `electron-builder.json5 declares no content plug targeting ${GNOME_PLATFORM_TARGET}, so ` +
          `the template's Ubuntu 18.04 default is left in place.`,
      );

    const expected = GNOME_PLATFORM_BY_BASE[base];
    // snapd matches content plugs on the `content` attribute, which defaults to the plug's key.
    // Overriding `content` is what actually rebinds the plug; `default-provider` only decides
    // which snap gets installed to satisfy it.
    expect(plug.descriptor.content).toBe(expected);
    expect(plug.descriptor['default-provider']).toBe(expected);
  });

  it("overrides the template's GNOME plug under the template's own key", () => {
    // If an electron-builder upgrade renames this plug or fixes the template itself, the override
    // silently stops applying. Failing here is the signal to revisit it.
    const templateKey = readTemplateGnomePlugKey();
    // Both sides can be absent, and `undefined === undefined` would pass while asserting nothing.
    // Pin the template side down first so the comparison below always has something to be wrong about.
    expect(templateKey).toBeDefined();
    expect(findGnomePlatformPlug(readSnapConfig().plugs)?.key).toBe(templateKey);
  });
});
