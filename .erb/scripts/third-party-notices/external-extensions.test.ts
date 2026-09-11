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

  it.each(['mac', 'win', 'linux'] as const)(
    'reads the %s block as well as the top level',
    (os2) => {
      // electron-builder UNIONS a platform block's extraResources with the top-level list rather than
      // replacing it, so a folder declared for one platform still ships. Reading only the top level
      // answers "none" for such a build - and an empty answer keeps every refusal below silent and
      // drops the section from the document rather than failing.
      expect(
        externalExtensionFolders({
          extraResources: [{ from: './extensions/dist/', to: './extensions' }],
          [os2]: { extraResources: [{ from: './additional-extensions', to: './extensions' }] },
        }),
      ).toEqual(['additional-extensions']);
    },
  );

  it.each([
    ['a doubled slash', './/extensions/dist'],
    ['repeated dot segments', './././extensions/dist'],
    ['the Windows separator', 'extensions\\dist'],
  ])('still recognizes this repository’s own dist spelled with %s', (_label, from) => {
    // Each of these is the same folder. Treated as external, it is refused with a remedy about a
    // copy step that has in fact run.
    expect(externalExtensionFolders({ extraResources: [{ from, to: './extensions' }] })).toEqual(
      [],
    );
  });

  it('ignores an entry that is not an object', () => {
    // `typeof null === 'object'`, so without the object test such an element reaches `.to` and
    // throws a bare TypeError.
    // Parsed rather than written as a literal, which is both how the value really arrives - this
    // config is `JSON5.parse` output, not a typed object - and the only way to express a shape the
    // declared type forbids without asserting one.
    const extraResources = JSON.parse(
      '[null, { "from": "./additional-extensions", "to": "./extensions" }]',
    );
    expect(externalExtensionFolders({ extraResources })).toEqual(['additional-extensions']);
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

  it('refuses a mapped folder that exists and holds no zip', () => {
    // The state a packaging job actually reaches: the mapping is in place and the copy step has not
    // run. The other two refusals are tested above; this is the one the design exists for, and
    // relaxing it to `return []` would drop the section from the document with the lock agreeing -
    // so the byte-compare that catches a stale artifact could not catch a short one.
    fs.mkdirSync(path.join(repo, 'additional-extensions'), { recursive: true });
    write('additional-extensions/README.md');
    expect(() => externalExtensionNames(repo, config)).toThrow(
      /additional-extensions holds no \.zip/,
    );
  });

  it('counts a symlinked zip, which electron-builder packs like any other', () => {
    // `readdirSync` does not stat the target, so a staged bundle reports `isSymbolicLink` and
    // nothing else. Dropping it would omit a shipped extension from the disclosure, or - if every
    // zip is staged that way - report the folder as empty, whose remedy names the wrong cause.
    write('staged/paratext-bible-marketplace_0.4.0-alpha.1.zip');
    fs.mkdirSync(path.join(repo, 'additional-extensions'), { recursive: true });
    fs.symlinkSync(
      path.join(repo, 'staged/paratext-bible-marketplace_0.4.0-alpha.1.zip'),
      path.join(repo, 'additional-extensions/paratext-bible-marketplace_0.4.0-alpha.1.zip'),
    );
    expect(externalExtensionNames(repo, config)).toEqual(['paratext-bible-marketplace']);
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

  it.each([
    ['an object', { en: 'no manifest yet' }],
    ['a number', 42],
    ['a boolean', true],
  ])('refuses a reason recorded as %s rather than a string', (_label, reason) => {
    // `render.ts` interpolates this value straight into the document, so a coerced non-string
    // ships as the literal `[object Object]` in the sentence explaining the omission. The
    // separate-programs table refuses the same shape, and this one records the same kind of prose.
    // Round-tripped through JSON, which is how an overlay's table actually reaches this function
    // and what lets the case hold a value the declared type forbids.
    const malformed = JSON.parse(JSON.stringify({ a: { itemized: false, reason } }));
    expect(() => assertExternalExtensionsRecorded(['a'], malformed)).toThrow(
      /"externalExtensions" entry for "a" records "reason"/,
    );
  });
});
