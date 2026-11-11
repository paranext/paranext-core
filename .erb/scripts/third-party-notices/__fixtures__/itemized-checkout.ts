import * as fs from 'fs';
import * as path from 'path';

/**
 * An extension repository checkout, a policy overlay itemizing two of its extensions, and the two
 * zips a downstream build would pack from it, for the suites that drive `main.ts` in a child
 * process.
 *
 * The checkout's bundles reach two packages of its own (`own-a`, and `css-only` through a
 * stylesheet) and one of paranext-core's: the REAL `node_modules/react` of this repository, which
 * the bundles compile through the `file:` link and which `coreShippedPackages` puts in
 * paranext-core's set.
 */
export type ItemizedCheckoutFixture = {
  /** The checkout's folder; its basename is the listing's `checkoutName`. */
  checkout: string;
  /** The policy overlay naming the checkout, for `NOTICES_POLICY_OVERLAY`. */
  overlay: string;
  /** The folder this platform packs, holding both extensions' zips. */
  zipsHere: string;
  /** With `otherPlatformFolder`, a second folder holding both zips that only another platform packs. */
  zipsElsewhere: string | undefined;
  /** Paranext-core's package the checkout's web view compiles. */
  corePackage: { name: string; version: string; dir: string };
};

function writePackage(base: string, name: string, version: string): string {
  const dir = path.join(base, 'node_modules', name);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, 'package.json'),
    JSON.stringify({ name, version, license: 'MIT' }),
  );
  fs.writeFileSync(path.join(dir, 'index.js'), '');
  return dir;
}

function writeManifest(checkout: string, bundle: string, modules: string[]): void {
  const dir = path.join(checkout, '.notices', 'modules');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, `${bundle}.json`),
    JSON.stringify({ bundle, buildId: 'one-build', mode: 'production', modules }),
  );
}

/**
 * Writes the fixture. Both zips share one folder this platform packs; `otherPlatformFolder` adds a
 * second folder holding the same two zips that only another platform's block maps.
 */
export function writeItemizedCheckout(
  tmp: string,
  repo: string,
  { otherPlatformFolder = false }: { otherPlatformFolder?: boolean } = {},
): ItemizedCheckoutFixture {
  const checkout = path.join(tmp, 'extension-repo');
  fs.mkdirSync(checkout, { recursive: true });
  fs.writeFileSync(
    path.join(checkout, 'package.json'),
    JSON.stringify({ name: 'extension-repo', workspaces: ['src/*'] }),
  );
  fs.writeFileSync(
    path.join(checkout, 'package-lock.json'),
    JSON.stringify({ lockfileVersion: 3, packages: { '': {} } }),
  );
  const ownA = writePackage(checkout, 'own-a', '1.0.0');
  writePackage(checkout, 'css-only', '2.0.0');

  const source = path.join(checkout, 'src', 'ext-one', 'src');
  fs.mkdirSync(source, { recursive: true });
  fs.writeFileSync(path.join(source, 'main.ts'), "import a from 'own-a';\nexport default a;\n");
  fs.writeFileSync(path.join(source, 'tailwind.css'), '@import "css-only";\n');

  const coreDir = path.join(repo, 'node_modules', 'react');
  const { version: coreVersion } = JSON.parse(
    fs.readFileSync(path.join(coreDir, 'package.json'), 'utf8'),
  );
  writeManifest(checkout, 'extension-main', [path.join(ownA, 'index.js')]);
  writeManifest(checkout, 'extension-web-view', [path.join(coreDir, 'index.js')]);

  const zipsHere = path.join(tmp, 'zips-here');
  const zipsElsewhere = otherPlatformFolder ? path.join(tmp, 'zips-elsewhere') : undefined;
  [zipsHere, zipsElsewhere].forEach((folder) => {
    if (!folder) return;
    fs.mkdirSync(folder);
    fs.writeFileSync(path.join(folder, 'ext-one_1.0.0.zip'), '');
    fs.writeFileSync(path.join(folder, 'ext-two_1.0.0.zip'), '');
  });

  const overlay = path.join(tmp, 'overlay.json');
  const reason = 'Built in extension-repo and itemized from its checkout.';
  fs.writeFileSync(
    overlay,
    JSON.stringify({
      externalExtensions: {
        'ext-one': { itemized: true, sourceCheckout: 'extension-repo', reason },
        // A second spelling of the same folder: still one checkout.
        'ext-two': { itemized: true, sourceCheckout: './extension-repo/', reason },
      },
      externalExtensionCheckouts: {
        'extension-repo': { minimumPackages: { own: 1, core: 1, stylesheet: 1 } },
      },
    }),
  );

  return {
    checkout,
    overlay,
    zipsHere,
    zipsElsewhere,
    corePackage: { name: 'react', version: coreVersion, dir: coreDir },
  };
}

/**
 * The child-process setup that points `main.ts` at the fixture, for the `setup` argument of the
 * suites' runners (which provide `load` and `stub`).
 *
 * - The overlay is selected through `NOTICES_POLICY_OVERLAY`, so the checkout resolves against the
 *   overlay's folder.
 * - The packaging config maps `zipsHere` under this platform's block and, when the fixture has one,
 *   `zipsElsewhere` under ANOTHER platform's block.
 * - Paranext-core's own collection returns `corePackage` alone, and the checkout's runs for real (a
 *   call with `linkedRepo`), printing `COLLECTED-CHECKOUT <root>` each time. The floors and
 *   paranext-core's own cross-checks are stubbed out: this is a one-package fixture.
 */
export function itemizedCheckoutSetup(fixture: ItemizedCheckoutFixture): string {
  const core = [{ ecosystem: 'npm', ...fixture.corePackage, reachedVia: ['renderer'] }];
  return `
    process.env.NOTICES_POLICY_OVERLAY = ${JSON.stringify(fixture.overlay)};
    const realProduct = load('product.ts');
    const blockOf = { win32: 'win', darwin: 'mac', linux: 'linux' };
    const hereBlock = blockOf[process.platform];
    const elsewhereBlock = hereBlock === 'linux' ? 'win' : 'linux';
    const zipsElsewhere = ${fixture.zipsElsewhere ? JSON.stringify(fixture.zipsElsewhere) : 'undefined'};
    const mapFolder = (config, block, from) => ({
      ...config,
      [block]: {
        ...config[block],
        extraResources: [
          ...((config[block] || {}).extraResources || []),
          { from, to: 'extensions' },
        ],
      },
    });
    stub('./product', {
      ...realProduct,
      readPackagingConfig: (file) => {
        const config = mapFolder(
          realProduct.readPackagingConfig(file),
          hereBlock,
          ${JSON.stringify(fixture.zipsHere)},
        );
        return zipsElsewhere ? mapFolder(config, elsewhereBlock, zipsElsewhere) : config;
      },
    });
    const realShipping = load('shipping-set.ts');
    stub('./shipping-set', {
      ...realShipping,
      assertNpmFloor: (packages) => packages,
      assertNpmNotShrunk: (packages) => packages,
      collectPlatformOnlyPackages: () => [],
      acceptShrinkFromEnv: () => ({ accepted: false }),
      readDirectDependencies: () => [],
      missingDirectDependencies: () => [],
      // paranext-core's own source imports far more than this fixture's set; the checkout's
      // workspace scan stays real.
      importedPackages: (repo, options) =>
        options && options.workspaceSourcesOnly ? realShipping.importedPackages(repo, options) : [],
      collectShippedPackages: (options) => {
        if (!options.linkedRepo)
          return { packages: ${JSON.stringify(core)}, unresolvedStylesheetSpecifiers: [], warmBundles: [] };
        console.log('COLLECTED-CHECKOUT ' + options.repo);
        return realShipping.collectShippedPackages(options);
      },
    });
  `;
}
