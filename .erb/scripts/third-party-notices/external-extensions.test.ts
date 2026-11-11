import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  assertExternalExtensionsRecorded,
  extensionZipsIn,
  externalExtensionFolders,
  externalExtensionNames,
  itemizedCheckouts,
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

  describe('narrowed to one platform', () => {
    // Writing the document reads every platform's blocks, because the document covers every
    // platform. A check running beside a build reads only what THAT build packages: the folders
    // another platform's block maps were never copied in here, and refusing their absence would
    // report a missing copy step that was not supposed to run.
    const perPlatform = {
      extraResources: [{ from: './extensions/dist/', to: './extensions' }],
      win: { extraResources: [{ from: './windows-only-extensions', to: './extensions' }] },
      linux: { extraResources: [{ from: './linux-only-extensions', to: './extensions' }] },
    };

    it('unions every platform when no platform is named', () => {
      expect(externalExtensionFolders(perPlatform)).toEqual([
        'linux-only-extensions',
        'windows-only-extensions',
      ]);
    });

    it.each([
      ['win32', 'windows-only-extensions'],
      ['linux', 'linux-only-extensions'],
    ] as const)('reads only the %s block plus the top level', (platform, expected) => {
      expect(externalExtensionFolders(perPlatform, platform)).toEqual([expected]);
    });

    it('reads the top level alone for a platform with no block of its own', () => {
      expect(externalExtensionFolders(perPlatform, 'darwin')).toEqual([]);
      expect(
        externalExtensionFolders(
          { ...perPlatform, extraResources: [{ from: './everywhere', to: './extensions' }] },
          'darwin',
        ),
      ).toEqual(['everywhere']);
    });

    it('still refuses a folder this platform does map but has not copied in', () => {
      // The narrowing must not turn the refusal into an empty answer for the platform in hand -
      // that is the silence the whole module exists to prevent.
      expect(() => externalExtensionNames(repo, perPlatform, 'win32')).toThrow(
        /windows-only-extensions does not exist/,
      );
    });
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

describe('extensionZipsIn', () => {
  it('counts a zip whose extension is upper case', () => {
    write('zips/X_1.0.0.ZIP');
    expect(extensionZipsIn(path.join(repo, 'zips'))).toEqual(['X_1.0.0.ZIP']);
  });

  it('does not count a directory named like a zip', () => {
    fs.mkdirSync(path.join(repo, 'zips', 'y_1.0.0.zip'), { recursive: true });
    expect(extensionZipsIn(path.join(repo, 'zips'))).toEqual([]);
  });

  it('does not count a file that is not a zip', () => {
    write('zips/z_1.0.0.tar.gz');
    write('zips/README.md');
    expect(extensionZipsIn(path.join(repo, 'zips'))).toEqual([]);
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

  it('offers both an itemized and a not-itemized entry for an unrecorded zip', () => {
    expect(() => assertExternalExtensionsRecorded(['a', 'b'], table)).toThrow(
      /"b": \{\n {6}"itemized": true,\n {6}"sourceCheckout": "<path to the checkout>",\n {6}"reason": "<[^>]+>"\n {4}\}[\s\S]*"b": \{\n {6}"itemized": false,\n {6}"reason": "<why it is not itemized>"\n {4}\}/,
    );
  });

  it('refuses an entry whose zip is not packed', () => {
    expect(() => assertExternalExtensionsRecorded([], table)).toThrow(/"a".*no longer packs/s);
  });

  describe('an itemized entry', () => {
    const minimumPackages = { own: 15, core: 80, stylesheet: 3 };
    let policyDir: string;
    beforeEach(() => {
      policyDir = path.join(repo, 'policy');
      fs.mkdirSync(path.join(repo, 'co'), { recursive: true });
      fs.mkdirSync(policyDir, { recursive: true });
    });
    const itemized = (sourceCheckout?: string) => ({
      a: { itemized: true, reason: 'r', ...(sourceCheckout ? { sourceCheckout } : {}) },
    });

    it('is accepted with an existing checkout and valid minimums', () => {
      expect(() =>
        assertExternalExtensionsRecorded(['a'], itemized('../co'), {
          checkouts: { '../co': { minimumPackages } },
          policyDir,
        }),
      ).not.toThrow();
    });

    it('needs a sourceCheckout', () => {
      expect(() =>
        assertExternalExtensionsRecorded(['a'], itemized(), { checkouts: {}, policyDir }),
      ).toThrow(/sourceCheckout/);
    });

    it('needs the checkout to have a key in externalExtensionCheckouts', () => {
      expect(() =>
        assertExternalExtensionsRecorded(['a'], itemized('../co'), { checkouts: {}, policyDir }),
      ).toThrow(/"\.\.\/co"/);
    });

    it('needs the checkout folder to exist', () => {
      const missing = path.resolve(policyDir, '../nope');
      expect(() =>
        assertExternalExtensionsRecorded(['a'], itemized('../nope'), {
          checkouts: { '../nope': { minimumPackages } },
          policyDir,
        }),
      ).toThrow(missing);
    });

    it.each([
      ['own', { own: 0, core: 80, stylesheet: 3 }],
      ['core', { own: 15, core: -1, stylesheet: 3 }],
      ['stylesheet', { own: 15, core: 80, stylesheet: 1.5 }],
      ['own', { core: 80, stylesheet: 3 }],
    ])('refuses a bad minimumPackages.%s', (field, minimums) => {
      // Round-tripped through JSON, which is how the policy actually reaches this function.
      const checkouts = JSON.parse(JSON.stringify({ '../co': { minimumPackages: minimums } }));
      expect(() =>
        assertExternalExtensionsRecorded(['a'], itemized('../co'), { checkouts, policyDir }),
      ).toThrow(`minimumPackages.${field}`);
    });

    it('refuses a checkout key no entry names', () => {
      expect(() =>
        assertExternalExtensionsRecorded(
          ['a'],
          { a: { itemized: false, reason: 'r' } },
          { checkouts: { '../co': { minimumPackages } }, policyDir },
        ),
      ).toThrow(/remove the entry/);
    });

    it('does not count a spelling difference as an unnamed checkout', () => {
      expect(() =>
        assertExternalExtensionsRecorded(['a'], itemized('..\\co\\'), {
          checkouts: { '../co': { minimumPackages } },
          policyDir,
        }),
      ).not.toThrow();
    });

    it('refuses two checkout keys that spell one folder', () => {
      const root = path.resolve(policyDir, '../co');
      expect(() =>
        assertExternalExtensionsRecorded(['a'], itemized('../co'), {
          checkouts: { '../co': { minimumPackages }, '..\\co\\': { minimumPackages } },
          policyDir,
        }),
      ).toThrow(
        `"externalExtensionCheckouts" records both "../co" and "..\\co\\", which resolve to the ` +
          `same folder, ${root}. Keep one of them.`,
      );
    });

    it('refuses an itemized entry when no checkout policy is passed', () => {
      expect(() => assertExternalExtensionsRecorded(['a'], itemized('../co'))).toThrow(
        /no checkout policy/,
      );
    });
  });

  it('refuses itemized: false with a sourceCheckout as contradictory', () => {
    expect(() =>
      assertExternalExtensionsRecorded(['a'], {
        a: { itemized: false, reason: 'r', sourceCheckout: '../co' },
      }),
    ).toThrow(/contradictory/);
  });

  it('refuses itemized recorded as a string', () => {
    const malformed = JSON.parse('{"a":{"itemized":"true","reason":"r"}}');
    expect(() => assertExternalExtensionsRecorded(['a'], malformed)).toThrow(/itemized/);
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

describe('itemizedCheckouts', () => {
  const minimumPackages = { own: 15, core: 80, stylesheet: 3 };

  it('refuses an itemized entry whose checkout the table does not record', () => {
    expect(() =>
      itemizedCheckouts(
        { a: { itemized: true, reason: 'r', sourceCheckout: '../co' } },
        {},
        path.resolve('/x/policy'),
      ),
    ).toThrow(/"a".*externalExtensionCheckouts/s);
  });

  it('gives one checkout for two spellings of one folder, listing both extensions', () => {
    const result = itemizedCheckouts(
      {
        b: { itemized: true, reason: 'r', sourceCheckout: '..\\co\\' },
        a: { itemized: true, reason: 'r', sourceCheckout: '../co' },
        c: { itemized: false, reason: 'r' },
      },
      { '../co': { minimumPackages } },
      path.resolve('/x/policy'),
    );
    expect(result).toEqual([
      {
        root: path.resolve('/x/co'),
        key: '../co',
        tableKey: '../co',
        extensions: ['a', 'b'],
        minimumPackages,
      },
    ]);
  });

  it('carries the table key as recorded, however the entries spell the folder', () => {
    const [result] = itemizedCheckouts(
      { a: { itemized: true, reason: 'r', sourceCheckout: '../co' } },
      { '..\\co\\': { minimumPackages } },
      path.resolve('/x/policy'),
    );
    expect(result.key).toBe('../co');
    expect(result.tableKey).toBe('..\\co\\');
  });

  it('refuses two checkouts whose folders share a name', () => {
    expect(() =>
      itemizedCheckouts(
        {
          a: { itemized: true, reason: 'r', sourceCheckout: '../one/co' },
          b: { itemized: true, reason: 'r', sourceCheckout: '../two/co' },
        },
        { '../one/co': { minimumPackages }, '../two/co': { minimumPackages } },
        path.resolve('/x/policy'),
      ),
    ).toThrow(
      `the itemized checkouts ${path.resolve('/x/one/co')} and ${path.resolve('/x/two/co')} ` +
        'share the folder name "co"',
    );
  });
});
