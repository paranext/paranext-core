import * as path from 'path';
import { compareByNameThenVersion, compareStrings } from './compare';
import type { ItemizedCheckout } from './external-extensions';
import { platformProvidedPackages } from './platform-provided';
import { messageOf } from './read-json';
import { collectShippedPackages, importedPackages, missingImportedPackages } from './shipping-set';
import type { ExternalExtensionListing, ShippedPackage } from './types';

/**
 * The npm packages an external extension repository's zips bundle, read from that repository's own
 * checkout.
 *
 * The checkout's webpack build writes the same module manifests this repository's build does, so
 * its bundles are itemized the same way: from what webpack compiled, not from what a `package.json`
 * declares. Its web views also compile code webpack found in paranext-core through a `file:` link;
 * those packages are paranext-core's own and are listed from paranext-core's set, which is why
 * every one of them has to be found there.
 */

/** The bundles every extension repository's build writes a manifest for. */
export const EXTENSION_REQUIRED_BUNDLES: string[] = ['extension-main', 'extension-web-view'];

/** What one itemized checkout's bundles ship. */
export type CheckoutPackages = {
  checkout: ItemizedCheckout;
  /** The checkout's own installed packages. */
  packages: ShippedPackage[];
  /** The paranext-core packages the bundles compiled, as paranext-core's set describes them. */
  linkedPackages: ShippedPackage[];
  corePackageCount: number;
  unresolvedStylesheetSpecifiers: string[];
  warmBundles: string[];
};

/**
 * A folder spelled for comparison: resolved, and case-folded on Windows, whose file system ignores
 * case. Webpack reports real paths and paranext-core's set spells its own, so the two can differ in
 * case alone.
 */
function comparableDir(dir: string): string {
  const resolved = path.resolve(dir);
  return process.platform === 'win32' ? resolved.toLowerCase() : resolved;
}

/** The `externalExtensionCheckouts` entry a minimum is edited in, for the failure messages. */
function minimumHint(checkout: ItemizedCheckout, field: string): string {
  return (
    'If the extensions really ship fewer, lower ' +
    `externalExtensionCheckouts["${checkout.name}"].minimumPackages.${field} in the policy.`
  );
}

/**
 * `collectShippedPackages` over the checkout, with its refusals named for the checkout.
 *
 * Only production manifests are accepted: the installer packs production zips, and a development
 * graph can differ from them.
 *
 * Its own remedies are written for paranext-core, where `npm run build` writes the manifests. In an
 * extension checkout that command writes development manifests, which the next run refuses again.
 * So each refusal keeps its text and gains the checkout's name and the command that rebuilds it.
 */
function collectFromCheckout(
  { name, root }: ItemizedCheckout,
  coreRepo: string,
  manifestDir: string,
  warmCache: 'throw' | 'report',
): ReturnType<typeof collectShippedPackages> {
  try {
    return collectShippedPackages({
      manifestDir,
      repo: root,
      linkedRepo: coreRepo,
      requiredBundles: EXTENSION_REQUIRED_BUNDLES,
      requireUnbundledClosure: false,
      warmCache,
      requiredMode: 'production',
    });
  } catch (err) {
    throw new Error(
      `${name}: ${messageOf(err)}\n` +
        'For this extension checkout, build the zips the way the installer packs them, and not ' +
        `with any other build command named above:\n    cd ${root} && npm run package`,
      { cause: err },
    );
  }
}

/**
 * Collects the packages one checkout's bundles ship, refusing any result that could be short.
 *
 * Each refusal names the checkout's `name` - its `externalExtensionCheckouts` key - because a
 * downstream build may itemize several checkouts and the message has to say which one failed.
 */
export function collectCheckoutPackages({
  checkout,
  coreRepo,
  corePackages,
  warmCache,
}: {
  checkout: ItemizedCheckout;
  coreRepo: string;
  corePackages: ShippedPackage[];
  warmCache: 'throw' | 'report';
}): CheckoutPackages {
  const { root, name, minimumPackages } = checkout;
  const manifestDir = path.join(root, '.notices', 'modules');
  const rebuild = `Rebuild in the checkout: cd ${root} && rm -rf .notices && npm run package`;

  const { packages, unresolvedStylesheetSpecifiers, warmBundles, linkedPackageDirs } =
    collectFromCheckout(checkout, coreRepo, manifestDir, warmCache);

  // A warm cache can leave the set short, and in `report` mode the caller reports the warm bundles
  // and stops instead of checking anything. Judging the set here would turn that into a refusal
  // about a set nobody trusts.
  if (warmCache === 'report' && warmBundles.length)
    return {
      checkout,
      packages,
      linkedPackages: [],
      corePackageCount: 0,
      unresolvedStylesheetSpecifiers,
      warmBundles,
    };

  const linkedDirs = new Set(linkedPackageDirs.map(comparableDir));
  const coreDirs = new Set(corePackages.map((pkg) => comparableDir(pkg.dir)));
  const unlisted = linkedPackageDirs.filter((dir) => !coreDirs.has(comparableDir(dir)));
  if (unlisted.length)
    throw new Error(
      `${name}: the extension bundles compile ${unlisted.length} package folder(s) from ` +
        `paranext-core that its own shipping set does not describe:\n` +
        `${unlisted
          .map(
            (dir) => `  a module belongs to ${dir}, which paranext-core's own list doesn't contain`,
          )
          .join('\n')}\n` +
        `Check that the checkout links to the paranext-core at ${coreRepo}, and that ` +
        "paranext-core's manifests are current (npm run build there), then rebuild the " +
        `extensions in the checkout: cd ${root} && npm run package`,
    );

  const linkedPackages = corePackages
    .filter((pkg) => linkedDirs.has(comparableDir(pkg.dir)))
    .sort(compareByNameThenVersion);

  if (packages.length < minimumPackages.own)
    throw new Error(
      `${name}: the extension bundles reach ${packages.length} package(s) of its own, below the ` +
        `minimum of ${minimumPackages.own}. A short list means the module manifests did not see ` +
        `the whole build.\n${rebuild}\n${minimumHint(checkout, 'own')}`,
    );

  if (linkedPackageDirs.length < minimumPackages.core)
    throw new Error(
      `${name}: the extension bundles reach ${linkedPackageDirs.length} paranext-core package ` +
        `folder(s), below the minimum of ${minimumPackages.core}. A short list means the bundles ` +
        `were not built against the paranext-core at ${coreRepo}, or the manifests are short.\n` +
        `${rebuild}\n${minimumHint(checkout, 'core')}`,
    );

  const stylesheetCount = packages.filter((pkg) => pkg.reachedVia.includes('stylesheet')).length;
  if (stylesheetCount < minimumPackages.stylesheet)
    throw new Error(
      `${name}: the extensions reach ${stylesheetCount} package(s) through a stylesheet, below ` +
        `the minimum of ${minimumPackages.stylesheet}. The stylesheet scan reads src/*/src under ` +
        `${root}; a short count means it found the stylesheets missing or their packages not ` +
        `installed.\nRun in the checkout: cd ${root} && npm ci\n` +
        `${minimumHint(checkout, 'stylesheet')}`,
    );

  // The exemption is the platform-provided names alone: `importedPackages` does not report where
  // a name resolved, so a package resolved into paranext-core is exempt only when the platform
  // provides it (`platform-bible-react`, `platform-bible-utils`).
  const missing = missingImportedPackages(
    packages,
    importedPackages(root, { workspaceSourcesOnly: true }),
    platformProvidedPackages(),
  ).sort((a, b) => compareStrings(a.name, b.name));
  if (missing.length)
    throw new Error(
      `${name}: the extension source imports ${missing.length} package(s) that no bundle ` +
        `contains:\n${missing
          .map((entry) => `  ${entry.name} (imported in ${entry.importedIn})`)
          .join('\n')}\n` +
        'An import the bundles do not contain means one of two things. Either the manifests are ' +
        `short or stale:\n${rebuild}\n` +
        'or the importing file is compiled by no bundle (test support or build tooling), and the ' +
        "generator's source filter, `importedPackages` in shipping-set.ts, has to learn to skip " +
        'it as it skips test files and the __mocks__/__fixtures__/__test-fixtures__ folders.',
    );

  return {
    checkout,
    packages,
    linkedPackages,
    corePackageCount: linkedPackages.length,
    unresolvedStylesheetSpecifiers,
    warmBundles,
  };
}

/**
 * Paranext-core's packages, then each checkout's own packages that are not already listed.
 *
 * Keyed by `name@version`, the lock's key: a package both ship is one row, and the first occurrence
 * wins. paranext-core's set comes first, so its `dir`, and the license text read from it, is the
 * one the document uses.
 *
 * Only the checkouts' rows are filtered. Paranext-core's rows pass through as they are, so a
 * duplicate within its own set still reaches `buildLock`'s refusal rather than collapsing here.
 */
export function mergeCheckoutPackages(
  corePackages: ShippedPackage[],
  collected: CheckoutPackages[],
): ShippedPackage[] {
  const seen = new Set(corePackages.map((pkg) => `${pkg.name}@${pkg.version}`));
  const added = collected
    .flatMap((entry) => entry.packages)
    .filter((pkg) => {
      const id = `${pkg.name}@${pkg.version}`;
      if (seen.has(id)) return false;
      seen.add(id);
      return true;
    });
  return [...corePackages, ...added];
}

/** Each checkout's unresolved stylesheet specifiers, prefixed with the checkout they came from. */
export function checkoutStylesheetSpecifiers(checkouts: CheckoutPackages[]): string[] {
  return checkouts.flatMap((collected) =>
    collected.unresolvedStylesheetSpecifiers.map(
      (specifier) => `${collected.checkout.name}: ${specifier}`,
    ),
  );
}

/**
 * What the document lists for one checkout: its own packages and the paranext-core packages its
 * bundles compile, since both ship inside its zips. One entry per `name@version`.
 */
export function externalExtensionListing(collected: CheckoutPackages): ExternalExtensionListing {
  const byId = new Map<string, { name: string; version: string }>();
  [...collected.packages, ...collected.linkedPackages].forEach(({ name, version }) =>
    byId.set(`${name}@${version}`, { name, version }),
  );
  return {
    checkoutName: collected.checkout.name,
    extensions: collected.checkout.extensions,
    packages: [...byId.values()].sort(compareByNameThenVersion),
  };
}
