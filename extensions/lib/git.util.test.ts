import * as fsPromises from 'fs/promises';
import * as os from 'os';
import * as path from 'path';
import { describe, expect, it } from 'vitest';
import { BUNDLED_EXTENSION_LICENSE, decideLicenseStamp, stampExtensionLicense } from './git.util';
import type { DeclaredLicense } from './git.util';

const declared = (file: string, license: unknown): DeclaredLicense => ({
  file,
  present: true,
  license,
});
const absent = (file: string): DeclaredLicense => ({ file, present: false, license: undefined });

describe('decideLicenseStamp', () => {
  it('stamps a folder whose files carry the template license', () => {
    expect(
      decideLicenseStamp([declared('package.json', 'MIT'), declared('manifest.json', 'MIT')]),
    ).toEqual({ stamp: true });
  });

  it('stamps a folder whose files declare nothing yet', () => {
    expect(
      decideLicenseStamp([
        declared('package.json', undefined),
        declared('manifest.json', undefined),
      ]),
    ).toEqual({ stamp: true });
  });

  it('stamps a folder already carrying this repository’s license', () => {
    expect(decideLicenseStamp([declared('manifest.json', BUNDLED_EXTENSION_LICENSE)])).toEqual({
      stamp: true,
    });
  });

  // Decided per FILE, this rewrote the manifest to AGPL while the package.json kept Apache-2.0:
  // two files in one folder declaring different licenses, and no text copied for either.
  it('leaves the whole folder alone when any file declares other terms', () => {
    const decision = decideLicenseStamp([
      declared('package.json', 'Apache-2.0'),
      declared('manifest.json', undefined),
    ]);
    expect(decision.stamp).toBe(false);
    expect(decision.reason).toContain('Apache-2.0');
    expect(decision.reason).toContain('package.json');
  });

  it('leaves the folder alone when the OTHER file is the one with its own terms', () => {
    expect(
      decideLicenseStamp([declared('package.json', 'MIT'), declared('manifest.json', 'Apache-2.0')])
        .stamp,
    ).toBe(false);
  });

  // `extensions/src/c-sharp-provider-test/` has a manifest and no package.json. Reading the
  // declaration from package.json alone leaves it permanently undefined, so the folder's
  // hand-placed LICENSE is never checked against the terms it declares.
  it('reads a manifest-only extension from its manifest', () => {
    expect(decideLicenseStamp([absent('package.json'), declared('manifest.json', 'MIT')])).toEqual({
      stamp: true,
    });
    expect(
      decideLicenseStamp([absent('package.json'), declared('manifest.json', 'Apache-2.0')]).stamp,
    ).toBe(false);
  });

  it('does nothing for a folder with neither file', () => {
    expect(decideLicenseStamp([absent('package.json'), absent('manifest.json')])).toEqual({
      stamp: false,
    });
  });
});

describe('stampExtensionLicense', () => {
  /** A throwaway repository root: a root `LICENSE`, and one extension folder under it. */
  async function makeTree(rootLicense: string, manifest: Record<string, unknown>) {
    const root = await fsPromises.mkdtemp(path.join(os.tmpdir(), 'stamp-license-'));
    await fsPromises.writeFile(path.join(root, 'LICENSE'), rootLicense, 'utf8');
    const folder = 'extensions/src/example';
    await fsPromises.mkdir(path.join(root, folder), { recursive: true });
    await fsPromises.writeFile(
      path.join(root, folder, 'manifest.json'),
      `${JSON.stringify(manifest, undefined, 2)}\n`,
      'utf8',
    );
    return { root, folder };
  }

  /** The `license` a JSON file declares, narrowed rather than asserted. */
  const declaredLicense = async (file: string): Promise<unknown> => {
    const parsed: unknown = JSON.parse(await fsPromises.readFile(file, 'utf8'));
    return parsed && typeof parsed === 'object' && 'license' in parsed ? parsed.license : undefined;
  };

  it('stamps the field and copies the text when the root LICENSE is the AGPL', async () => {
    const { root, folder } = await makeTree('GNU AFFERO GENERAL PUBLIC LICENSE\nVersion 3\n', {
      name: 'example',
      version: '0.0.1',
    });
    await stampExtensionLicense(folder, root);
    expect(await declaredLicense(path.join(root, folder, 'manifest.json'))).toBe(
      BUNDLED_EXTENSION_LICENSE,
    );
    expect(await fsPromises.readFile(path.join(root, folder, 'LICENSE'), 'utf8')).toContain(
      'GNU AFFERO GENERAL PUBLIC LICENSE',
    );
  });

  it('declares nothing it cannot also give the text for', async () => {
    // The failure this orders against: writing the `license` field first and reading the canonical
    // text afterwards leaves a folder whose root LICENSE is not the AGPL declaring
    // AGPL-3.0-or-later with a different license text beside it - and a re-run cannot repair that,
    // because a folder that already declares the value is short-circuited before any text is
    // copied. Nothing may be stamped unless the text that has to accompany it is in hand.
    const { root, folder } = await makeTree('MIT License\n\nPermission is hereby granted...\n', {
      name: 'example',
      version: '0.0.1',
    });
    await expect(stampExtensionLicense(folder, root)).rejects.toThrow(
      /is not the AGPL-3\.0-or-later text/,
    );
    expect(await declaredLicense(path.join(root, folder, 'manifest.json'))).toBeUndefined();
    await expect(fsPromises.readFile(path.join(root, folder, 'LICENSE'), 'utf8')).rejects.toThrow();
  });
});
