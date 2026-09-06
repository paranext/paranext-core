// @vitest-environment node

import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'fs';
import os from 'os';
import path from 'path';
import {
  checkGeneratedSnapMetadata,
  resolveGeneratedSnapMetadataPath,
} from './assert-generated-snap-metadata.util';
import { GNOME_PLATFORM_TARGET } from './snap-platform-pairing';

/**
 * A minimal stand-in for the snapcraft metadata electron-builder writes into its snap stage
 * directory. Only the fields this check reads are modelled; `plugs` is spliced in verbatim so a
 * case can express a shape a typed builder would not let it (two plugs on one mount point, a plug
 * with no `interface`) — which is the point, since those are the shapes being guarded against.
 */
function metadata(base: string, plugs: string): string {
  return [
    'name: platform-bible',
    'version: 0.5.0',
    `base: ${base}`,
    'confinement: strict',
    'grade: devel',
    'plugs:',
    plugs,
  ].join('\n');
}

/** The plug a correct core22 build emits, as the patched template renders it. */
const CORRECT_CORE22_PLUG = [
  '  gnome-42-2204:',
  '    interface: content',
  `    target: ${GNOME_PLATFORM_TARGET}`,
  '    default-provider: gnome-42-2204',
].join('\n');

/** Plugs that share the snap with the GNOME one and must not be mistaken for it. */
const UNRELATED_PLUGS = [
  '  desktop: null',
  '  browser-support: null',
  '  shared-memory:',
  '    interface: shared-memory',
  '    private: true',
].join('\n');

describe('checkGeneratedSnapMetadata', () => {
  it('accepts the metadata a correct core22 build produces', () => {
    // The positive control. Without it, every assertion below could be passing because the checker
    // rejects everything rather than because it discriminates.
    expect(
      checkGeneratedSnapMetadata(metadata('core22', `${UNRELATED_PLUGS}\n${CORRECT_CORE22_PLUG}`)),
    ).toEqual([]);
  });

  it('rejects two plugs competing for the GNOME platform mount point', () => {
    // The case the unit-level guard cannot see: `snap.js` could merge in a second plug on this
    // mount point from a source neither the config nor the template shows. snapd breaks the tie by
    // renaming one mount aside arbitrarily, so the app may or may not start.
    const secondPlug = [
      '  gnome-3-28-1804:',
      '    interface: content',
      `    target: ${GNOME_PLATFORM_TARGET}`,
      '    default-provider: gnome-3-28-1804',
    ].join('\n');

    const problems = checkGeneratedSnapMetadata(
      metadata('core22', `${CORRECT_CORE22_PLUG}\n${secondPlug}`),
    );

    expect(problems).toHaveLength(1);
    expect(problems[0]).toContain('gnome-3-28-1804');
    expect(problems[0]).toContain('gnome-42-2204');
  });

  it('rejects the unpatched template, which pairs core22 with the Ubuntu 18.04 platform snap', () => {
    // Reverting the `app-builder-lib` patch produces exactly this: the template's own unconditional
    // default, left in place while `base` says core22.
    const stalePlug = [
      '  gnome-3-28-1804:',
      '    interface: content',
      `    target: ${GNOME_PLATFORM_TARGET}`,
      '    default-provider: gnome-3-28-1804',
    ].join('\n');

    const problems = checkGeneratedSnapMetadata(metadata('core22', stalePlug));

    expect(problems).toHaveLength(1);
    expect(problems[0]).toContain('gnome-3-28-1804');
  });

  it('rejects a plug whose default-provider does not match its name', () => {
    // snapd satisfies the plug from `default-provider`, so a mismatch mounts a platform snap from a
    // different Ubuntu release than the name claims.
    const mismatched = [
      '  gnome-42-2204:',
      '    interface: content',
      `    target: ${GNOME_PLATFORM_TARGET}`,
      '    default-provider: gnome-3-38-2004',
    ].join('\n');

    const problems = checkGeneratedSnapMetadata(metadata('core22', mismatched));

    expect(problems).toHaveLength(1);
    expect(problems[0]).toContain('default-provider');
  });

  it('rejects a plug that is not a content interface', () => {
    const wrongInterface = [
      '  gnome-42-2204:',
      '    interface: system-files',
      `    target: ${GNOME_PLATFORM_TARGET}`,
      '    default-provider: gnome-42-2204',
    ].join('\n');

    const problems = checkGeneratedSnapMetadata(metadata('core22', wrongInterface));

    expect(problems).toHaveLength(1);
    expect(problems[0]).toContain('interface');
  });

  it('rejects metadata with no GNOME platform plug at all', () => {
    // `confinement: classic` makes electron-builder delete the plugs map wholesale, so the plug can
    // vanish from a build whose inputs still declare it.
    const problems = checkGeneratedSnapMetadata(metadata('core22', UNRELATED_PLUGS));

    expect(problems).toHaveLength(1);
    expect(problems[0]).toContain(GNOME_PLATFORM_TARGET);
  });

  it('reports an unknown base rather than silently passing', () => {
    // A `base` this repo has no pairing for cannot be checked, and must not be read as success.
    const problems = checkGeneratedSnapMetadata(metadata('core99', CORRECT_CORE22_PLUG));

    expect(problems).toHaveLength(1);
    expect(problems[0]).toContain('core99');
  });

  it('reports missing base rather than comparing against undefined', () => {
    const noBase = ['name: platform-bible', 'plugs:', CORRECT_CORE22_PLUG].join('\n');

    const problems = checkGeneratedSnapMetadata(noBase);

    expect(problems).toHaveLength(1);
    expect(problems[0]).toContain('base');
  });

  it('reports metadata that is not a YAML mapping rather than throwing', () => {
    // A truncated or reshaped artifact should fail as a checked problem, not as a bare TypeError
    // from somewhere downstream.
    expect(checkGeneratedSnapMetadata('just a string')).toHaveLength(1);
  });
});

describe('resolveGeneratedSnapMetadataPath', () => {
  let outDir: string;

  beforeEach(() => {
    outDir = mkdtempSync(path.join(os.tmpdir(), 'snap-metadata-'));
  });

  afterEach(() => {
    rmSync(outDir, { recursive: true, force: true });
  });

  /** Writes a metadata file into a stage directory the way electron-builder lays one out. */
  function writeStagedMetadata(stageDirName: string, relativePath: string): string {
    const file = path.join(outDir, stageDirName, relativePath);
    mkdirSync(path.dirname(file), { recursive: true });
    writeFileSync(file, 'name: platform-bible\n');
    return file;
  }

  it('finds the snapcraft.yaml a custom-stagePackages build writes', () => {
    const expected = writeStagedMetadata('__snap-x64', path.join('snap', 'snapcraft.yaml'));
    expect(resolveGeneratedSnapMetadataPath(outDir)).toBe(expected);
  });

  it('finds the snap.yaml a template-app build writes instead', () => {
    // app-builder-lib switches to `meta/snap.yaml` when `stagePackages` matches its own defaults.
    // Trimming that list back would move the file silently, so both shapes have to be found.
    const expected = writeStagedMetadata('__snap-x64', path.join('meta', 'snap.yaml'));
    expect(resolveGeneratedSnapMetadataPath(outDir)).toBe(expected);
  });

  it('throws when the output directory does not exist', () => {
    // The failure this check exists to prevent is a silent pass, so a run that packaged nothing has
    // to be an error rather than "no problems found".
    expect(() => resolveGeneratedSnapMetadataPath(path.join(outDir, 'never-packaged'))).toThrow(
      /No generated snap metadata found/,
    );
  });

  it('throws when a stage directory exists but holds no metadata', () => {
    mkdirSync(path.join(outDir, '__snap-x64'), { recursive: true });
    expect(() => resolveGeneratedSnapMetadataPath(outDir)).toThrow(
      /No generated snap metadata found/,
    );
  });

  it('ignores output that is not a snap stage directory', () => {
    writeStagedMetadata('__appimage-x64', path.join('snap', 'snapcraft.yaml'));
    expect(() => resolveGeneratedSnapMetadataPath(outDir)).toThrow(
      /No generated snap metadata found/,
    );
  });

  it('throws rather than picking one when several builds are present', () => {
    // Two metadata files mean two snaps, or one left over from an earlier run. Checking an
    // arbitrary one would report on a build nobody asked about.
    writeStagedMetadata('__snap-x64', path.join('snap', 'snapcraft.yaml'));
    writeStagedMetadata('__snap-arm64', path.join('snap', 'snapcraft.yaml'));
    expect(() => resolveGeneratedSnapMetadataPath(outDir)).toThrow(/Found 2 generated snap/);
  });
});
