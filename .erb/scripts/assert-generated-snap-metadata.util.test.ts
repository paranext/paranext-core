// @vitest-environment node

import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'fs';
import os from 'os';
import path from 'path';
import {
  checkGeneratedSnapMetadata,
  resolveSnapArtifact,
} from './assert-generated-snap-metadata.util';
import { GNOME_PLATFORM_TARGET } from './snap-platform-pairing';

/**
 * A minimal stand-in for `meta/snap.yaml` inside a built snap. Only the fields this check reads are
 * modelled; `plugs` is spliced in verbatim so a case can express a shape a typed builder would not
 * let it (two plugs on one mount point, a plug with no `interface`) — which is the point, since
 * those are the shapes being guarded against.
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

  it('rejects a plug whose content tag points at a different platform snap', () => {
    // `default-provider` decides which snap snapd installs; `content` decides whether the plug
    // connects to that snap's slot, and defaults to the plug's own name when absent. So a plug can
    // be named and provided correctly, install the right snap, and still auto-connect to nothing --
    // mounting an empty $SNAP/gnome-platform. The template declares no `content`, so today's
    // correctness is by default rather than by assertion, and `snap.plugs` accepts the attribute
    // form that would set it.
    const wrongContent = [
      '  gnome-42-2204:',
      '    interface: content',
      '    content: gnome-3-28-1804',
      `    target: ${GNOME_PLATFORM_TARGET}`,
      '    default-provider: gnome-42-2204',
    ].join('\n');

    const problems = checkGeneratedSnapMetadata(metadata('core22', wrongContent));

    expect(problems).toHaveLength(1);
    expect(problems[0]).toContain('content');
    expect(problems[0]).toContain('gnome-3-28-1804');
  });

  it('accepts a plug that states the content tag it would default to', () => {
    // Stating it explicitly is not a defect, so long as it matches. Without this the assertion
    // above could be satisfied by rejecting any `content` key at all.
    const explicitContent = [
      '  gnome-42-2204:',
      '    interface: content',
      '    content: gnome-42-2204',
      `    target: ${GNOME_PLATFORM_TARGET}`,
      '    default-provider: gnome-42-2204',
    ].join('\n');

    expect(checkGeneratedSnapMetadata(metadata('core22', explicitContent))).toEqual([]);
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

  it('reports metadata that parses but is not a mapping', () => {
    // A reshaped artifact should fail as a checked problem naming the file, not as a bare TypeError
    // from somewhere downstream. `just a string` is a valid YAML scalar, so this exercises the
    // not-a-mapping branch rather than the parser.
    expect(checkGeneratedSnapMetadata('just a string')).toHaveLength(1);
  });

  it('reports metadata that does not parse as YAML at all', () => {
    // Malformed YAML throws out of the parser rather than returning a value, so without this the
    // branch above is the only one covered and the failure reaches the user as a bare
    // YAMLParseError naming no snap and no file.
    const problems = checkGeneratedSnapMetadata('plugs:\n\tgnome-42-2204: {}\n');

    expect(problems).toHaveLength(1);
    expect(problems[0]).toContain('could not be parsed');
  });
});

describe('resolveSnapArtifact', () => {
  let outDir: string;

  beforeEach(() => {
    outDir = mkdtempSync(path.join(os.tmpdir(), 'snap-artifact-'));
  });

  afterEach(() => {
    // Guarded because `force` suppresses ENOENT but not an invalid path: if `beforeEach` threw,
    // `outDir` is undefined and an unguarded call fails with ERR_INVALID_ARG_TYPE, masking the
    // real cause behind a teardown error.
    if (outDir) rmSync(outDir, { recursive: true, force: true });
  });

  /** Puts a file in the output directory. Contents are irrelevant; only the name is matched on. */
  function writeArtifact(name: string): string {
    const file = path.join(outDir, name);
    writeFileSync(file, 'not really a squashfs\n');
    return file;
  }

  it('finds the snap a Linux packaging run leaves in the output directory', () => {
    const expected = writeArtifact('platform-bible_0.6.0-alpha.0_amd64.snap');
    expect(resolveSnapArtifact(outDir)).toBe(expected);
  });

  it('throws when the output directory does not exist', () => {
    // The failure this check exists to prevent is a silent pass, so a run that packaged nothing has
    // to be an error rather than "no problems found".
    expect(() => resolveSnapArtifact(path.join(outDir, 'never-packaged'))).toThrow(
      /No snap artifact found/,
    );
  });

  it('throws when the packaging run produced no snap', () => {
    // What a non-Linux leg leaves behind, and what a Linux run leaves if the snap target is dropped
    // from `linux.target`.
    writeArtifact('platform-bible-0.6.0-alpha.0.exe');
    writeArtifact('builder-debug.yml');
    expect(() => resolveSnapArtifact(outDir)).toThrow(/No snap artifact found/);
  });

  it('throws rather than picking one when several snaps are present', () => {
    // Two snaps mean two architectures, or one left over from an earlier run. Checking an arbitrary
    // one would report on a build nobody asked about.
    writeArtifact('platform-bible_0.6.0-alpha.0_amd64.snap');
    writeArtifact('platform-bible_0.6.0-alpha.0_arm64.snap');
    expect(() => resolveSnapArtifact(outDir)).toThrow(/Found 2 snap artifacts/);
  });

  it('does not mistake a directory named like a snap for the artifact', () => {
    // The name has to end in `.snap` for this to reach the isFile() check at all -- a directory
    // whose name merely starts that way is rejected by the extension test and proves nothing.
    mkdirSync(path.join(outDir, 'staging.snap'));
    expect(() => resolveSnapArtifact(outDir)).toThrow(/No snap artifact found/);
  });
});
