import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  assertExternalExtensionsRecorded,
  externalExtensionFolders,
  externalExtensionNames,
} from './external-extensions';

let repo: string;
beforeEach(() => {
  repo = fs.mkdtempSync(path.join(os.tmpdir(), 'notices-external-extensions-'));
});
afterEach(() => {
  fs.rmSync(repo, { recursive: true, force: true });
});

function write(relative: string) {
  const full = path.join(repo, relative);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, '');
}

const config = {
  extraResources: [
    './assets/**',
    { from: './extensions/dist/', to: './extensions' },
    { from: './additional-extensions', to: './extensions' },
    { from: './c-sharp/bin/Release/net8.0/publish/linux-x64/', to: './dotnet/' },
  ],
};

describe('externalExtensionFolders', () => {
  it('names every folder mapped to ./extensions other than this repository’s own dist', () => {
    expect(externalExtensionFolders(config)).toEqual(['additional-extensions']);
    expect(externalExtensionFolders({ extraResources: ['./assets/**'] })).toEqual([]);
    expect(externalExtensionFolders({})).toEqual([]);
  });
});

describe('externalExtensionNames', () => {
  it('lists the zips by name, without their version suffix', () => {
    write('additional-extensions/paratext-bible-send-receive_0.4.0-alpha.1.zip');
    write('additional-extensions/paratext-bible-marketplace_0.4.0-alpha.1.zip');
    write('additional-extensions/README.md');
    expect(externalExtensionNames(repo, config)).toEqual([
      'paratext-bible-marketplace',
      'paratext-bible-send-receive',
    ]);
  });

  it('refuses a mapped folder that does not exist rather than reporting none', () => {
    expect(() => externalExtensionNames(repo, config)).toThrow(
      /additional-extensions does not exist.*maps it to \.\/extensions/s,
    );
  });

  it('refuses a zip that does not follow the name_version convention', () => {
    write('additional-extensions/mystery.zip');
    expect(() => externalExtensionNames(repo, config)).toThrow(/mystery\.zip/);
  });

  it('answers empty with no mapped folder', () => {
    expect(externalExtensionNames(repo, {})).toEqual([]);
  });
});

describe('assertExternalExtensionsRecorded', () => {
  const table = { a: { itemized: false, reason: 'no manifest yet' } };

  it('accepts a table naming exactly the packed set', () => {
    expect(() => assertExternalExtensionsRecorded(['a'], table)).not.toThrow();
    expect(() => assertExternalExtensionsRecorded([], {})).not.toThrow();
  });

  it('refuses a packed extension with no entry', () => {
    expect(() => assertExternalExtensionsRecorded(['a', 'b'], table)).toThrow(
      /"b".*externalExtensions/s,
    );
  });

  it('refuses an entry whose zip is not packed', () => {
    expect(() => assertExternalExtensionsRecorded([], table)).toThrow(/"a".*no longer packs/s);
  });

  it('refuses itemized: true until the generator can read an external manifest set', () => {
    expect(() =>
      assertExternalExtensionsRecorded(['a'], { a: { itemized: true, reason: 'r' } }),
    ).toThrow(/itemized.*not supported yet/s);
  });

  it('refuses an empty or placeholder reason', () => {
    expect(() =>
      assertExternalExtensionsRecorded(['a'], { a: { itemized: false, reason: '<why>' } }),
    ).toThrow(/"a".*"reason"/s);
  });
});
