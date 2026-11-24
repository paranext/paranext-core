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
    { from: './c-sharp/bin/Release/net10.0/publish/linux-x64/', to: './dotnet/' },
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
  /** The checkout policy of an overlay that itemizes nothing. */
  const noCheckouts = () => ({ checkouts: {}, policyDir: repo });

  it('accepts a table naming exactly the packed set', () => {
    expect(() => assertExternalExtensionsRecorded(['a'], table, noCheckouts())).not.toThrow();
    expect(() => assertExternalExtensionsRecorded([], {}, noCheckouts())).not.toThrow();
  });

  it('refuses a packed extension with no entry', () => {
    expect(() => assertExternalExtensionsRecorded(['a', 'b'], table, noCheckouts())).toThrow(
      /"b".*externalExtensions/s,
    );
  });

  it('offers both an itemized and a not-itemized entry for an unrecorded zip', () => {
    expect(() => assertExternalExtensionsRecorded(['a', 'b'], table, noCheckouts())).toThrow(
      /"b": \{\n {6}"itemized": true,\n {6}"sourceCheckout": "<name of its externalExtensionCheckouts entry>",\n {6}"reason": "<[^>]+>"\n {4}\}[\s\S]*"b": \{\n {6}"itemized": false,\n {6}"reason": "<why it is not itemized>"\n {4}\}/,
    );
  });

  it('refuses an entry whose zip is not packed', () => {
    expect(() => assertExternalExtensionsRecorded([], table, noCheckouts())).toThrow(
      /"a".*no longer packs/s,
    );
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
      a: {
        itemized: true,
        reason: 'r',
        ...(sourceCheckout !== undefined ? { sourceCheckout } : {}),
      },
    });
    const checkoutAt = (checkoutPath: string) => ({
      co: { path: checkoutPath, minimumPackages },
    });

    it('is accepted with a named checkout whose folder exists and valid minimums', () => {
      expect(() =>
        assertExternalExtensionsRecorded(['a'], itemized('co'), {
          checkouts: checkoutAt('../co'),
          policyDir,
        }),
      ).not.toThrow();
    });

    it('resolves a path spelled with backslashes and a trailing separator', () => {
      expect(() =>
        assertExternalExtensionsRecorded(['a'], itemized('co'), {
          checkouts: checkoutAt('..\\co\\'),
          policyDir,
        }),
      ).not.toThrow();
    });

    it.each([
      ['no sourceCheckout', undefined],
      ['an empty sourceCheckout', ''],
      ['a sourceCheckout of only whitespace', '  '],
    ])('needs a sourceCheckout: refuses %s', (_label, sourceCheckout) => {
      expect(() =>
        assertExternalExtensionsRecorded(['a'], itemized(sourceCheckout), {
          checkouts: {},
          policyDir,
        }),
      ).toThrow(
        'the "externalExtensions" entry for "a" records "itemized": true with no "sourceCheckout"',
      );
    });

    it('needs the sourceCheckout to name an externalExtensionCheckouts entry', () => {
      expect(() =>
        assertExternalExtensionsRecorded(['a'], itemized('other'), {
          checkouts: checkoutAt('../co'),
          policyDir,
        }),
      ).toThrow(
        'the "externalExtensions" entry for "a" names sourceCheckout "other", and ' +
          '"externalExtensionCheckouts" has no entry by that name. Add "other" there',
      );
    });

    it('does not take a checkout path as its name', () => {
      expect(() =>
        assertExternalExtensionsRecorded(['a'], itemized('../co'), {
          checkouts: checkoutAt('../co'),
          policyDir,
        }),
      ).toThrow(/names sourceCheckout "\.\.\/co", and "externalExtensionCheckouts" has no entry/);
    });

    it.each([
      ['no path', undefined],
      ['an empty path', ''],
      ['a path of only whitespace', '   '],
      ['a path recorded as a number', 42],
    ])('needs a checkout path: refuses %s', (_label, checkoutPath) => {
      // Round-tripped through JSON, which is how the policy actually reaches this function.
      const checkouts = JSON.parse(JSON.stringify({ co: { path: checkoutPath, minimumPackages } }));
      expect(() =>
        assertExternalExtensionsRecorded(['a'], itemized('co'), { checkouts, policyDir }),
      ).toThrow('"externalExtensionCheckouts" entry "co" records "path" as');
    });

    it('needs the checkout folder to exist', () => {
      const missing = path.resolve(policyDir, '../nope');
      expect(() =>
        assertExternalExtensionsRecorded(['a'], itemized('co'), {
          checkouts: checkoutAt('../nope'),
          policyDir,
        }),
      ).toThrow(
        `"externalExtensionCheckouts" entry "co" records path "../nope", which resolves to ` +
          `${missing}, and that folder does not exist.`,
      );
    });

    it('refuses a checkout path that names a file rather than a folder', () => {
      const file = path.join(repo, 'not-a-folder.txt');
      fs.writeFileSync(file, '');
      expect(() =>
        assertExternalExtensionsRecorded(['a'], itemized('co'), {
          checkouts: checkoutAt('../not-a-folder.txt'),
          policyDir,
        }),
      ).toThrow(`which resolves to ${file}, and that is a file rather than a folder`);
    });

    it.each([
      ['own', { own: 0, core: 80, stylesheet: 3 }],
      ['core', { own: 15, core: -1, stylesheet: 3 }],
      ['stylesheet', { own: 15, core: 80, stylesheet: 1.5 }],
      ['own', { core: 80, stylesheet: 3 }],
      ['stylesheet', { own: 15, core: 80, stylesheet: '3' }],
    ])('refuses a bad minimumPackages.%s', (field, minimums) => {
      // Round-tripped through JSON, which is how the policy actually reaches this function.
      const checkouts = JSON.parse(
        JSON.stringify({ co: { path: '../co', minimumPackages: minimums } }),
      );
      expect(() =>
        assertExternalExtensionsRecorded(['a'], itemized('co'), { checkouts, policyDir }),
      ).toThrow(`"externalExtensionCheckouts" entry "co" records minimumPackages.${field} as`);
    });

    it('refuses a checkout entry no itemized entry names', () => {
      expect(() =>
        assertExternalExtensionsRecorded(
          ['a'],
          { a: { itemized: false, reason: 'r' } },
          { checkouts: checkoutAt('../co'), policyDir },
        ),
      ).toThrow(
        '"externalExtensionCheckouts" records "co", and no itemized "externalExtensions" entry ' +
          'names it as its sourceCheckout.',
      );
    });

    /** Checks two itemized entries, each naming its own checkout entry at the given path. */
    const assertTwoCheckouts = (first: string, second: string) =>
      assertExternalExtensionsRecorded(
        ['a', 'b'],
        {
          a: { itemized: true, reason: 'r', sourceCheckout: 'co' },
          b: { itemized: true, reason: 'r', sourceCheckout: 'co-again' },
        },
        {
          checkouts: {
            co: { path: first, minimumPackages },
            'co-again': { path: second, minimumPackages },
          },
          policyDir,
        },
      );
    const sameFolder = () =>
      `"externalExtensionCheckouts" entries "co" and "co-again" both name the folder ` +
      `${fs.realpathSync.native(path.join(repo, 'co'))}, so that one checkout would be read and ` +
      'listed twice.';

    it('refuses a second checkout entry reaching the folder through a link', () => {
      fs.symlinkSync(path.join(repo, 'co'), path.join(repo, 'co-link'), 'junction');
      expect(() => assertTwoCheckouts('../co', '../co-link')).toThrow(sameFolder());
    });

    it.runIf(process.platform === 'win32' || process.platform === 'darwin')(
      'refuses a second checkout entry spelling the folder in other letter case',
      () => {
        expect(() => assertTwoCheckouts('../co', '../CO')).toThrow(sameFolder());
      },
    );

    it.each([
      ['a line break', 'co\nsecond line'],
      ['a leading space', ' co'],
      ['a trailing space', 'co '],
    ])('refuses a checkout name with %s, which the document uses as a heading', (_label, name) => {
      expect(() =>
        assertExternalExtensionsRecorded(['a'], itemized(name), {
          checkouts: { [name]: { path: '../co', minimumPackages } },
          policyDir,
        }),
      ).toThrow(
        `"externalExtensionCheckouts" records the name ${JSON.stringify(name)}, which the ` +
          'notices document uses as a heading.',
      );
    });

    it('refuses two checkout entries whose paths resolve to one folder', () => {
      expect(() => assertTwoCheckouts('../co', '..\\co\\')).toThrow(sameFolder());
    });

    it('accepts two checkouts in folders that share a name', () => {
      fs.mkdirSync(path.join(repo, 'one', 'co'), { recursive: true });
      fs.mkdirSync(path.join(repo, 'two', 'co'), { recursive: true });
      expect(() =>
        assertExternalExtensionsRecorded(
          ['a', 'b'],
          {
            a: { itemized: true, reason: 'r', sourceCheckout: 'first' },
            b: { itemized: true, reason: 'r', sourceCheckout: 'second' },
          },
          {
            checkouts: {
              first: { path: '../one/co', minimumPackages },
              second: { path: '../two/co', minimumPackages },
            },
            policyDir,
          },
        ),
      ).not.toThrow();
    });
  });

  it('refuses itemized: false with a sourceCheckout as contradictory', () => {
    expect(() =>
      assertExternalExtensionsRecorded(
        ['a'],
        { a: { itemized: false, reason: 'r', sourceCheckout: 'co' } },
        noCheckouts(),
      ),
    ).toThrow(/contradictory/);
  });

  it('refuses itemized recorded as a string', () => {
    const malformed = JSON.parse('{"a":{"itemized":"true","reason":"r"}}');
    expect(() => assertExternalExtensionsRecorded(['a'], malformed, noCheckouts())).toThrow(
      /itemized/,
    );
  });

  it('refuses an empty or placeholder reason', () => {
    expect(() =>
      assertExternalExtensionsRecorded(
        ['a'],
        { a: { itemized: false, reason: '<why>' } },
        noCheckouts(),
      ),
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
    expect(() => assertExternalExtensionsRecorded(['a'], malformed, noCheckouts())).toThrow(
      /"externalExtensions" entry for "a" records "reason"/,
    );
  });
});

describe('itemizedCheckouts', () => {
  const minimumPackages = { own: 15, core: 80, stylesheet: 3 };

  it('refuses an itemized entry whose checkout the table does not record', () => {
    expect(() =>
      itemizedCheckouts(
        { a: { itemized: true, reason: 'r', sourceCheckout: 'co' } },
        {},
        path.resolve('/x/policy'),
      ),
    ).toThrow(
      'the "externalExtensions" entry for "a" names sourceCheckout "co", and ' +
        '"externalExtensionCheckouts" has no entry by that name.',
    );
  });

  it('gives one checkout for two entries naming it, listing both extensions', () => {
    const result = itemizedCheckouts(
      {
        b: { itemized: true, reason: 'r', sourceCheckout: 'co' },
        a: { itemized: true, reason: 'r', sourceCheckout: 'co' },
        c: { itemized: false, reason: 'r' },
      },
      { co: { path: '../co', minimumPackages } },
      path.resolve('/x/policy'),
    );
    expect(result).toEqual([
      {
        name: 'co',
        root: path.resolve('/x/co'),
        extensions: ['a', 'b'],
        minimumPackages,
      },
    ]);
  });

  it("resolves each checkout's path against the policy folder, sorted by name", () => {
    const result = itemizedCheckouts(
      {
        a: { itemized: true, reason: 'r', sourceCheckout: 'second' },
        b: { itemized: true, reason: 'r', sourceCheckout: 'first' },
      },
      {
        second: { path: '..\\two\\co\\', minimumPackages },
        first: { path: '../one/co', minimumPackages },
      },
      path.resolve('/x/policy'),
    );
    expect(result.map(({ name, root }) => [name, root])).toEqual([
      ['first', path.resolve('/x/one/co')],
      ['second', path.resolve('/x/two/co')],
    ]);
  });
});
