import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  EXTENSION_REQUIRED_BUNDLES,
  checkoutStylesheetSpecifiers,
  collectCheckoutPackages,
  mergeCheckoutPackages,
  type CheckoutPackages,
} from './external-extension-packages';
import type { ItemizedCheckout } from './external-extensions';
import { buildLock } from './lock';
import type { ShippedPackage } from './types';

let root: string;
let core: string;

/** Writes an installed package under `base` and returns its folder. */
function writePackage(base: string, rel: string, name: string, version: string) {
  const dir = path.join(base, rel);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify({ name, version }));
  fs.writeFileSync(path.join(dir, 'index.js'), '');
  return dir;
}

/** Writes one of the checkout's module manifests, as the plugin stamps it. */
function writeManifest(
  bundle: string,
  modules: string[],
  { mode = 'production', buildId = 'one-build' }: { mode?: string; buildId?: string } = {},
) {
  const dir = path.join(root, '.notices', 'modules');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, `${bundle}.json`),
    JSON.stringify({ bundle, buildId, mode, modules }),
  );
}

/** Writes a file of the checkout's own source, under its one extension's `src/`. */
function writeSource(name: string, content: string) {
  const file = path.join(root, 'src', 'ext', 'src', name);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

/** A paranext-core shipping-set entry for a folder. */
function corePackage(dir: string, name: string, version: string): ShippedPackage {
  return { ecosystem: 'npm', name, version, dir, reachedVia: ['extension-web-view'] };
}

const checkout = (
  minimumPackages: Partial<ItemizedCheckout['minimumPackages']> = {},
): ItemizedCheckout => ({
  root,
  key: '../extension-repo',
  tableKey: '../extension-repo',
  extensions: ['ext'],
  minimumPackages: { own: 3, core: 2, stylesheet: 1, ...minimumPackages },
});

let ownA: string;
let ownB: string;
let coreA: string;
let staged: string;
let corePackages: ShippedPackage[];

/**
 * A checkout whose two bundles reach two packages of its own and two of paranext-core's (one
 * installed, one staged), and whose stylesheet imports a CSS-only package.
 */
beforeEach(() => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), 'notices-checkout-'));
  core = fs.mkdtempSync(path.join(os.tmpdir(), 'notices-core-'));
  fs.writeFileSync(
    path.join(root, 'package.json'),
    JSON.stringify({ name: 'extension-repo', workspaces: ['src/*'] }),
  );
  fs.writeFileSync(
    path.join(root, 'package-lock.json'),
    JSON.stringify({ lockfileVersion: 3, packages: { '': {} } }),
  );

  ownA = writePackage(root, 'node_modules/own-a', 'own-a', '1.0.0');
  ownB = writePackage(root, 'node_modules/own-b', 'own-b', '1.0.0');
  writePackage(root, 'node_modules/css-only', 'css-only', '2.0.0');
  writePackage(root, 'node_modules/platform-bible-react', 'platform-bible-react', '0.0.1');
  coreA = writePackage(core, 'node_modules/core-a', 'core-a', '1.0.0');
  staged = writePackage(core, 'dev-packages/staging/editor', 'editor-real-name', '3.0.0');
  corePackages = [
    corePackage(staged, 'editor-real-name', '3.0.0'),
    corePackage(coreA, 'core-a', '1.0.0'),
    corePackage(path.join(core, 'node_modules', 'unrelated'), 'unrelated', '1.0.0'),
  ];

  writeSource(
    'main.ts',
    "import a from 'own-a';\nimport react from 'platform-bible-react';\nexport default [a, react];\n",
  );
  writeSource('tailwind.css', '@import "css-only";\n');

  writeManifest('extension-main', [path.join(ownA, 'index.js')]);
  writeManifest('extension-web-view', [
    path.join(ownB, 'index.js'),
    path.join(coreA, 'index.js'),
    path.join(staged, 'index.js'),
  ]);
});
afterEach(() => {
  fs.rmSync(root, { recursive: true, force: true });
  fs.rmSync(core, { recursive: true, force: true });
});

const collect = (minimumPackages: Partial<ItemizedCheckout['minimumPackages']> = {}) =>
  collectCheckoutPackages({
    checkout: checkout(minimumPackages),
    coreRepo: core,
    corePackages,
    warmCache: 'throw',
  });

describe('collectCheckoutPackages', () => {
  it('requires exactly the two extension bundles', () => {
    expect(EXTENSION_REQUIRED_BUNDLES).toEqual(['extension-main', 'extension-web-view']);
  });

  it("returns the checkout's own packages and the paranext-core packages its bundles reach", () => {
    const result = collect();

    expect(result.checkout.key).toBe('../extension-repo');
    expect(result.packages.map((pkg) => `${pkg.name}@${pkg.version}`)).toEqual([
      'css-only@2.0.0',
      'own-a@1.0.0',
      'own-b@1.0.0',
    ]);
    expect(result.linkedPackages.map((pkg) => pkg.name)).toEqual(['core-a', 'editor-real-name']);
    expect(result.corePackageCount).toBe(2);
    expect(result.unresolvedStylesheetSpecifiers).toEqual([]);
    expect(result.warmBundles).toEqual([]);
  });

  it.runIf(process.platform === 'win32')(
    'matches a paranext-core folder spelled in a different case on Windows',
    () => {
      corePackages = corePackages.map((pkg) => ({ ...pkg, dir: pkg.dir.toUpperCase() }));

      expect(collect().corePackageCount).toBe(2);
    },
  );

  it('refuses a bundle built in development mode, naming the command that builds it for release', () => {
    writeManifest('extension-main', [path.join(ownA, 'index.js')], { mode: 'development' });
    writeManifest(
      'extension-web-view',
      [path.join(ownB, 'index.js'), path.join(coreA, 'index.js'), path.join(staged, 'index.js')],
      { mode: 'development' },
    );

    expect(() => collect()).toThrow(
      /\.\.\/extension-repo[\s\S]*extension-main[\s\S]*npm run package/,
    );
  });

  it('refuses two manifests from different builds', () => {
    writeManifest('extension-main', [path.join(ownA, 'index.js')], { buildId: 'older-build' });

    expect(() => collect()).toThrow(/different builds/);
  });

  it.each(EXTENSION_REQUIRED_BUNDLES)('refuses a checkout missing the %s manifest', (bundle) => {
    fs.rmSync(path.join(root, '.notices', 'modules', `${bundle}.json`));

    expect(() => collect()).toThrow(
      new RegExp(`\\.\\./extension-repo: [\\s\\S]*missing the manifest for ${bundle}\\b`),
    );
  });

  it.each([
    ['an empty manifest folder', true],
    ['no manifest folder', false],
  ])('refuses an itemized checkout with no manifests at all: %s', (_label, keepFolder) => {
    fs.rmSync(path.join(root, '.notices'), { recursive: true });
    if (keepFolder) fs.mkdirSync(path.join(root, '.notices', 'modules'), { recursive: true });

    expect(() => collect()).toThrow(/\.\.\/extension-repo: no module manifests/);
  });

  it('refuses manifests that record no mode', () => {
    // Both, so they agree with each other and the mixed-mode check has nothing to catch.
    EXTENSION_REQUIRED_BUNDLES.forEach((bundle) => {
      const file = path.join(root, '.notices', 'modules', `${bundle}.json`);
      const { mode, ...withoutMode } = JSON.parse(fs.readFileSync(file, 'utf8'));
      expect(mode).toBe('production');
      fs.writeFileSync(file, JSON.stringify(withoutMode));
    });

    expect(() => collect()).toThrow(
      /\.\.\/extension-repo: [\s\S]*not written by a production build[\s\S]*extension-main: unrecorded/,
    );
  });

  it('refuses unstamped manifests, which cannot be placed in one build', () => {
    EXTENSION_REQUIRED_BUNDLES.forEach((bundle) => {
      const file = path.join(root, '.notices', 'modules', `${bundle}.json`);
      const { buildId, ...unstamped } = JSON.parse(fs.readFileSync(file, 'utf8'));
      expect(buildId).toBe('one-build');
      fs.writeFileSync(file, JSON.stringify(unstamped));
    });

    expect(() => collect()).toThrow(/\.\.\/extension-repo: [\s\S]*2 different builds/);
  });

  it('names the checkout, and the command that rebuilds it, on a refusal from the shared collection', () => {
    fs.rmSync(path.join(root, '.notices', 'modules', 'extension-main.json'));

    let error: unknown;
    try {
      collect();
    } catch (err) {
      error = err;
    }
    if (!(error instanceof Error) || !(error.cause instanceof Error))
      throw new Error('expected a refusal carrying the original one as its cause');
    expect(error.message).toMatch(/^\.\.\/extension-repo: /);
    expect(error.message).toContain(`rebuild in ${root} with \`npm run package\``);
    expect(error.cause.message).toMatch(/missing the manifest for extension-main/);
    expect(error.message).toContain(error.cause.message);
  });

  it("refuses a bundled staged dev-package folder that paranext-core's own list does not contain", () => {
    corePackages = corePackages.filter((pkg) => pkg.name !== 'editor-real-name');

    expect(() => collect()).toThrow(
      new RegExp(
        `\\.\\./extension-repo[\\s\\S]*belongs to ${staged.replace(/[\\.]/g, '\\$&')}, which ` +
          "paranext-core's own list doesn't contain",
      ),
    );
  });

  it("refuses a bundled paranext-core folder that paranext-core's own list does not contain", () => {
    corePackages = corePackages.filter((pkg) => pkg.name !== 'core-a');

    expect(() => collect()).toThrow(
      new RegExp(
        `\\.\\./extension-repo[\\s\\S]*belongs to ${coreA.replace(/[\\.]/g, '\\$&')}, which ` +
          "paranext-core's own list doesn't contain",
      ),
    );
  });

  describe('a manifest written against a warm webpack cache', () => {
    beforeEach(() => {
      const file = path.join(root, '.notices', 'modules', 'extension-main.json');
      fs.writeFileSync(
        file,
        JSON.stringify({ ...JSON.parse(fs.readFileSync(file, 'utf8')), cacheWarm: true }),
      );
    });

    it("in 'report' mode, returns the warm bundles without judging a set that may be short", () => {
      const result = collectCheckoutPackages({
        checkout: checkout({ own: 10, core: 10, stylesheet: 10 }),
        coreRepo: core,
        corePackages: [],
        warmCache: 'report',
      });

      expect(result.warmBundles).toEqual(['extension-main']);
    });

    it("in 'throw' mode, still refuses it", () => {
      expect(() => collect()).toThrow(/extension-main/);
    });
  });

  it('refuses fewer own packages than the policy minimum', () => {
    expect(() => collect({ own: 4 })).toThrow(
      /\.\.\/extension-repo[\s\S]*3 package\(s\) of its own[\s\S]*minimumPackages\.own/,
    );
  });

  it('refuses fewer paranext-core package folders than the policy minimum', () => {
    expect(() => collect({ core: 3 })).toThrow(
      /\.\.\/extension-repo[\s\S]*2 paranext-core package folder\(s\)[\s\S]*minimumPackages\.core/,
    );
  });

  it.each(['../extension-repo/', '..\\extension-repo\\'])(
    'names the minimum by the table key as the policy spells it: %s',
    (tableKey) => {
      expect(() =>
        collectCheckoutPackages({
          checkout: { ...checkout({ own: 4 }), tableKey },
          coreRepo: core,
          corePackages,
          warmCache: 'throw',
        }),
      ).toThrow(`externalExtensionCheckouts["${tableKey}"].minimumPackages.own`);
    },
  );

  it('refuses fewer stylesheet packages than the policy minimum', () => {
    expect(() => collect({ stylesheet: 2 })).toThrow(
      /\.\.\/extension-repo[\s\S]*1 package\(s\) through a stylesheet[\s\S]*minimumPackages\.stylesheet/,
    );
  });

  it('refuses a package the extension source imports that no bundle contains', () => {
    writePackage(root, 'node_modules/dropped', 'dropped', '1.0.0');
    writeSource('other.ts', "import dropped from 'dropped';\nexport default dropped;\n");

    expect(() => collect()).toThrow(
      /\.\.\/extension-repo[\s\S]*dropped \(imported in src\/ext\/src\/other\.ts\)/,
    );
  });

  it('names both causes of an import no bundle contains: short manifests, or an unbundled file', () => {
    writePackage(root, 'node_modules/dropped', 'dropped', '1.0.0');
    writeSource('other.ts', "import dropped from 'dropped';\nexport default dropped;\n");

    expect(() => collect()).toThrow(
      /npm run package[\s\S]*compiled by no bundle[\s\S]*`importedPackages` in shipping-set\.ts/,
    );
  });
});

describe('mergeCheckoutPackages', () => {
  const pkg = (dir: string, name: string, version: string): ShippedPackage => ({
    ecosystem: 'npm',
    name,
    version,
    dir,
    reachedVia: ['extension-web-view'],
  });
  const collected = (packages: ShippedPackage[]): CheckoutPackages => ({
    checkout: checkout(),
    packages,
    linkedPackages: [],
    corePackageCount: 0,
    unresolvedStylesheetSpecifiers: [],
    warmBundles: [],
  });

  it("keeps paranext-core's entry for a version both ship and appends a version only the checkout ships", () => {
    const coreX = pkg('/core/node_modules/x', 'x', '1.0.0');
    const merged = mergeCheckoutPackages(
      [coreX],
      [
        collected([
          pkg('/checkout/node_modules/x', 'x', '1.0.0'),
          pkg('/checkout/node_modules/y/node_modules/x', 'x', '2.0.0'),
        ]),
      ],
    );

    expect(merged.map((entry) => `${entry.name}@${entry.version} ${entry.dir}`)).toEqual([
      'x@1.0.0 /core/node_modules/x',
      'x@2.0.0 /checkout/node_modules/y/node_modules/x',
    ]);

    const verdicts = merged.map((entry) => ({
      ecosystem: entry.ecosystem,
      name: entry.name,
      version: entry.version,
      verdict: 'allowed' as const,
      spdxId: 'MIT',
      reason: 'r',
      declared: 'MIT',
      detected: 'MIT',
      matchedFile: 'LICENSE',
      textSha256: 'abc',
    }));
    expect(() =>
      buildLock({ verdicts, licenseeVersion: '9.18.0', corpusVersion: '6.6.0' }, '# notices\n'),
    ).not.toThrow();
  });

  it('keeps the first checkout entry when two checkouts ship the same version', () => {
    const merged = mergeCheckoutPackages(
      [],
      [
        collected([pkg('/first/node_modules/z', 'z', '1.0.0')]),
        collected([pkg('/second/node_modules/z', 'z', '1.0.0')]),
      ],
    );

    expect(merged.map((entry) => entry.dir)).toEqual(['/first/node_modules/z']);
  });

  it("never drops a paranext-core row, so its own duplicate still reaches buildLock's refusal", () => {
    const merged = mergeCheckoutPackages(
      [
        pkg('/core/node_modules/d', 'd', '1.0.0'),
        pkg('/core/node_modules/a/node_modules/d', 'd', '1.0.0'),
      ],
      [collected([pkg('/checkout/node_modules/d', 'd', '1.0.0')])],
    );

    expect(merged.map((entry) => entry.dir)).toEqual([
      '/core/node_modules/d',
      '/core/node_modules/a/node_modules/d',
    ]);
    const verdicts = merged.map((entry) => ({
      ecosystem: entry.ecosystem,
      name: entry.name,
      version: entry.version,
      verdict: 'allowed' as const,
      spdxId: 'MIT',
      reason: 'r',
      declared: 'MIT',
      detected: 'MIT',
      matchedFile: 'LICENSE',
      textSha256: 'abc',
    }));
    expect(() =>
      buildLock({ verdicts, licenseeVersion: '9.18.0', corpusVersion: '6.6.0' }, '# notices\n'),
    ).toThrow(/npm:d@1\.0\.0/);
  });
});

describe('checkoutStylesheetSpecifiers', () => {
  it('prefixes each unresolved specifier with the name of the checkout it came from', () => {
    const collected: CheckoutPackages = {
      checkout: { ...checkout(), root: path.join(os.tmpdir(), 'extensions-repo') },
      packages: [],
      linkedPackages: [],
      corePackageCount: 0,
      unresolvedStylesheetSpecifiers: ['some-pkg/style.css'],
      warmBundles: [],
    };
    expect(checkoutStylesheetSpecifiers([collected])).toEqual([
      'extensions-repo: some-pkg/style.css',
    ]);
  });
});
