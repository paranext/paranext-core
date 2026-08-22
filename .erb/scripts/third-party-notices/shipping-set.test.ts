import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  ACCEPT_SHRINK_ENV,
  NPM_MAX_SHRINK,
  NPM_MIN_PACKAGES,
  assertNpmNotShrunk,
  REQUIRED_BUNDLES,
  assertNpmFloor,
  collectShippedPackages,
  collectUnbundledPackages,
  containedPath,
  lockEntry,
  lockKeyOf,
  packageDirOf,
  resolveFromLock,
} from './shipping-set';

let repo: string;

function writePackage(rel: string, name: string, version: string) {
  const dir = path.join(repo, rel);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify({ name, version }));
  fs.writeFileSync(path.join(dir, 'index.js'), '');
  return dir;
}

/**
 * Writes a manifest stamped as part of ONE build, which is what the plugin does for every manifest
 * a single `npm run build` produces. Cases that deliberately mix vintages stamp their own.
 */
function writeManifest(bundle: string, modules: string[]) {
  const dir = path.join(repo, '.notices', 'modules');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, `${bundle}.json`),
    JSON.stringify({ bundle, buildId: 'one-build', modules }),
  );
}

/** Writes a stylesheet under one of the production roots the stylesheet leaf scan covers. */
function writeStylesheet(rel: string, content: string) {
  const file = path.join(repo, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
  return file;
}

/** Writes release/app/package.json with the given dependencies. */
function writeReleaseAppManifest(dependencies: Record<string, string>) {
  const dir = path.join(repo, 'release', 'app');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify({ dependencies }));
}

/**
 * Writes release/app's OWN package-lock.json - a separate lockfile from the repo root's, because
 * release/app keeps a separate install. Keys are install paths relative to release/app, exactly as
 * npm writes them.
 */
function writeReleaseAppLock(
  packages: Record<string, { version?: string; dependencies?: object }>,
) {
  const dir = path.join(repo, 'release', 'app');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, 'package-lock.json'),
    JSON.stringify({ lockfileVersion: 3, packages: { '': {}, ...packages } }),
  );
}

/** Writes a package into release/app's own, separate node_modules install. */
function writeReleaseAppDependency(name: string, version: string) {
  const dir = path.join(repo, 'release', 'app', 'node_modules', name);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify({ name, version }));
  return dir;
}

beforeEach(() => {
  repo = fs.mkdtempSync(path.join(os.tmpdir(), 'notices-shipping-'));
});
afterEach(() => {
  fs.rmSync(repo, { recursive: true, force: true });
});

describe('packageDirOf', () => {
  it('finds the owning package for a nested source file', () => {
    const dir = writePackage('node_modules/pkg-a', 'pkg-a', '1.0.0');
    fs.mkdirSync(path.join(dir, 'lib', 'deep'), { recursive: true });
    const file = path.join(dir, 'lib', 'deep', 'x.js');
    fs.writeFileSync(file, '');
    expect(packageDirOf(file, repo)).toBe(dir);
  });

  it('attributes a nested dependency to the inner package, not the outer', () => {
    writePackage('node_modules/outer', 'outer', '1.0.0');
    const inner = writePackage('node_modules/outer/node_modules/inner', 'inner', '2.0.0');
    expect(packageDirOf(path.join(inner, 'index.js'), repo)).toBe(inner);
  });

  it('handles scoped packages', () => {
    const dir = writePackage('node_modules/@scope/pkg', '@scope/pkg', '1.0.0');
    expect(packageDirOf(path.join(dir, 'index.js'), repo)).toBe(dir);
  });

  it('returns undefined for first-party source outside node_modules', () => {
    fs.mkdirSync(path.join(repo, 'src'), { recursive: true });
    const file = path.join(repo, 'src', 'main.ts');
    fs.writeFileSync(file, '');
    expect(packageDirOf(file, repo)).toBeUndefined();
  });

  it('walks past a directory-scoped package.json with no name to the real package root', () => {
    // Some packages (e.g. @babel/runtime/helpers/esm/package.json, real on-disk file: just
    // `{"type":"module"}`) drop a minimal package.json partway down their own tree purely to flip
    // Node's module-resolution algorithm for that subtree - it is not a package boundary. Treating it
    // as the nearest enclosing package.json attributes the file to a manifest with no name/version at
    // all, so this must keep walking up to the package that actually has a `name`.
    const dir = writePackage('node_modules/pkg-a', 'pkg-a', '1.0.0');
    const esmDir = path.join(dir, 'helpers', 'esm');
    fs.mkdirSync(esmDir, { recursive: true });
    fs.writeFileSync(path.join(esmDir, 'package.json'), JSON.stringify({ type: 'module' }));
    const file = path.join(esmDir, 'arrayLikeToArray.js');
    fs.writeFileSync(file, '');
    expect(packageDirOf(file, repo)).toBe(dir);
  });
});

describe('collectShippedPackages', () => {
  it('collects a package reached from a bundle', () => {
    const dir = writePackage('node_modules/pkg-a', 'pkg-a', '1.0.0');
    writeManifest('main', [path.join(dir, 'index.js')]);
    const { packages, unresolvedStylesheetSpecifiers } = collectShippedPackages({
      manifestDir: path.join(repo, '.notices', 'modules'),
      repo,
    });
    expect(packages.map((p) => p.name)).toEqual(['pkg-a']);
    expect(packages[0].version).toBe('1.0.0');
    expect(unresolvedStylesheetSpecifiers).toEqual([]);
  });

  it('does not include a module that no bundle references', () => {
    // An externalized module never enters the module graph, so it must not appear. This is what
    // makes the externals lists in the webpack configs load-bearing for licensing.
    writePackage('node_modules/externalized', 'externalized', '1.0.0');
    const used = writePackage('node_modules/used', 'used', '1.0.0');
    writeManifest('main', [path.join(used, 'index.js')]);
    const { packages } = collectShippedPackages({
      manifestDir: path.join(repo, '.notices', 'modules'),
      repo,
    });
    expect(packages.map((p) => p.name)).toEqual(['used']);
  });

  it('records every bundle that reaches a package', () => {
    const dir = writePackage('node_modules/shared', 'shared', '1.0.0');
    writeManifest('main', [path.join(dir, 'index.js')]);
    writeManifest('renderer', [path.join(dir, 'other.js')]);
    const { packages } = collectShippedPackages({
      manifestDir: path.join(repo, '.notices', 'modules'),
      repo,
    });
    expect(packages[0].reachedVia.sort()).toEqual(['main', 'renderer']);
  });

  it('collects a package reached only through a stylesheet import', () => {
    // webpack resolves a bare specifier in a CSS @import through node_modules and inlines the
    // result. Every extension's tailwind.css embeds a typeface that way.
    const dir = writePackage('node_modules/some-font', 'some-font', '1.0.0');
    const css = path.join(dir, 'font.css');
    fs.writeFileSync(css, '');
    writeManifest('renderer', [css]);
    const { packages } = collectShippedPackages({
      manifestDir: path.join(repo, '.notices', 'modules'),
      repo,
    });
    expect(packages.map((p) => p.name)).toEqual(['some-font']);
  });

  it('throws when a manifest names a module whose package cannot be resolved', () => {
    // Fail closed: a module path under node_modules with no readable package.json above it means
    // the environment is degraded. Silently skipping it produces a short document that looks whole.
    fs.mkdirSync(path.join(repo, 'node_modules', 'ghost'), { recursive: true });
    writeManifest('main', [path.join(repo, 'node_modules', 'ghost', 'index.js')]);
    expect(() =>
      collectShippedPackages({ manifestDir: path.join(repo, '.notices', 'modules'), repo }),
    ).toThrow(/ghost/);
  });

  it('throws when no manifests exist at all', () => {
    fs.mkdirSync(path.join(repo, '.notices', 'modules'), { recursive: true });
    expect(() =>
      collectShippedPackages({ manifestDir: path.join(repo, '.notices', 'modules'), repo }),
    ).toThrow(/no module manifests/);
  });

  it('includes a package from release/app/package.json (an unbundled, non-webpack dependency)', () => {
    writeManifest('main', []);
    writeReleaseAppManifest({ 'native-thing': '2.0.0' });
    writeReleaseAppLock({ 'node_modules/native-thing': { version: '2.0.0' } });
    const nativeDir = writeReleaseAppDependency('native-thing', '2.0.0');
    const { packages } = collectShippedPackages({
      manifestDir: path.join(repo, '.notices', 'modules'),
      repo,
    });
    expect(packages.find((p) => p.name === 'native-thing')).toEqual({
      ecosystem: 'npm',
      name: 'native-thing',
      version: '2.0.0',
      dir: nativeDir,
      reachedVia: ['release/app'],
    });
  });
});

describe('collectShippedPackages - stylesheet leaf scan', () => {
  // The module manifests (webpack's own compiled module graph) cannot see every stylesheet
  // pipeline in this repo - extensions run their tailwind.css through a standalone Tailwind
  // prebuild (extensions/lib/prebuild-tailwind.ts) that resolves bare `@import`s itself, in plain
  // Node, before webpack ever starts. Reading production stylesheet source directly is the only way
  // to observe what those `@import`s pull in. Every test here writes an empty `main` manifest solely
  // to satisfy collectShippedPackages's "at least one manifest" precondition - none of these cases
  // exercise the module-manifest path at all.

  it('finds a package reached only through a production stylesheet @import', () => {
    writePackage('node_modules/some-font', 'some-font', '1.0.0');
    writeStylesheet('src/renderer/app.css', "@import 'some-font';");
    writeManifest('main', []);
    const { packages } = collectShippedPackages({
      manifestDir: path.join(repo, '.notices', 'modules'),
      repo,
    });
    expect(packages.map((p) => p.name)).toEqual(['some-font']);
    expect(packages[0].reachedVia).toEqual(['stylesheet']);
  });

  it('adds a stylesheet-reached package as a leaf, without walking its own dependencies', () => {
    // tailwindcss's own package.json declares roughly three hundred build-only dependencies
    // (esbuild, jiti, the PostCSS plugin chain). None of those ship - only tailwindcss's own CSS
    // output does - so a stylesheet-reached package must never pull its "dependencies" in.
    writePackage('node_modules/leaf-dep', 'leaf-dep', '1.0.0');
    const hasDepDir = path.join(repo, 'node_modules', 'has-dep');
    fs.mkdirSync(hasDepDir, { recursive: true });
    fs.writeFileSync(
      path.join(hasDepDir, 'package.json'),
      JSON.stringify({ name: 'has-dep', version: '1.0.0', dependencies: { 'leaf-dep': '1.0.0' } }),
    );
    writeStylesheet('src/renderer/app.css', "@import 'has-dep';");
    writeManifest('main', []);
    const { packages } = collectShippedPackages({
      manifestDir: path.join(repo, '.notices', 'modules'),
      repo,
    });
    expect(packages.map((p) => p.name)).toEqual(['has-dep']);
  });

  it('ignores a relative @import in a stylesheet', () => {
    writeStylesheet('src/renderer/base.css', '');
    writeStylesheet('src/renderer/app.css', "@import './base.css';");
    writeManifest('main', []);
    const { packages, unresolvedStylesheetSpecifiers } = collectShippedPackages({
      manifestDir: path.join(repo, '.notices', 'modules'),
      repo,
    });
    expect(packages).toEqual([]);
    // A relative import names first-party source, not an unresolved package reference - it must
    // never appear in this list, which exists to surface genuine npm-package resolution failures.
    expect(unresolvedStylesheetSpecifiers).toEqual([]);
  });

  it('resolves a scoped package from a stylesheet @import', () => {
    writePackage('node_modules/@scope/font', '@scope/font', '1.0.0');
    writeStylesheet('src/renderer/app.css', "@import '@scope/font';");
    writeManifest('main', []);
    const { packages } = collectShippedPackages({
      manifestDir: path.join(repo, '.notices', 'modules'),
      repo,
    });
    expect(packages.map((p) => p.name)).toEqual(['@scope/font']);
  });

  it('resolves a subpath specifier to its owning package, e.g. shadcn/tailwind.css to shadcn', () => {
    writePackage('node_modules/shadcn', 'shadcn', '4.3.0');
    writeStylesheet('extensions/src/some-ext/src/tailwind.css', "@import 'shadcn/tailwind.css';");
    writeManifest('main', []);
    const { packages } = collectShippedPackages({
      manifestDir: path.join(repo, '.notices', 'modules'),
      repo,
    });
    expect(packages.map((p) => p.name)).toEqual(['shadcn']);
  });

  it('scans lib/*/src, where the component library keeps the stylesheet the whole app imports', () => {
    // `lib/platform-bible-react/src/index.css` imports `tailwindcss`, `tw-animate-css`,
    // `shadcn/tailwind.css` and `@fontsource-variable/ibm-plex-sans`, and Vite inlines the compiled
    // CSS into `lib/platform-bible-react/dist/index.js` - a path with no `node_modules` segment, so
    // neither the module manifests nor `packageDirOf` can see those packages through it. Three of
    // the four reach the document today ONLY through the ten extension `tailwind.css` files, which
    // are marked in their own headers as copies of that file: a coincidence, not a mechanism. A new
    // CSS or font package added where it naturally belongs would have shipped embedded in every
    // bundle and appeared nowhere, with the run exiting 0.
    writePackage(
      'node_modules/@fontsource-variable/some-face',
      '@fontsource-variable/some-face',
      '5.0.0',
    );
    writeStylesheet(
      'lib/platform-bible-react/src/index.css',
      "@import '@fontsource-variable/some-face';",
    );
    writeManifest('main', []);
    const { packages } = collectShippedPackages({
      manifestDir: path.join(repo, '.notices', 'modules'),
      repo,
    });
    expect(packages.map((p) => p.name)).toEqual(['@fontsource-variable/some-face']);
    expect(packages[0].reachedVia).toEqual(['stylesheet']);
  });

  it('surfaces an unresolved stylesheet specifier instead of dropping it silently', () => {
    // A regex-extracted specifier that looks like a real package reference but resolves to nothing
    // installed is real information - a pruned font, lockfile-vs-tree drift in CI - that must not
    // vanish silently, since nothing else in the pipeline is positioned to catch it now that the
    // regex-scan generator this replaces has been deleted. It must NOT throw (see the false positives
    // documented at resolvePackageLeaf) and must NOT affect the resolved package set.
    writeStylesheet('src/renderer/app.css', "@import 'nonexistent-package';");
    writeManifest('main', []);
    const { packages, unresolvedStylesheetSpecifiers } = collectShippedPackages({
      manifestDir: path.join(repo, '.notices', 'modules'),
      repo,
    });
    expect(packages).toEqual([]);
    expect(unresolvedStylesheetSpecifiers).toEqual(['nonexistent-package']);
  });
});

describe('collectUnbundledPackages', () => {
  // electron-builder packs from release/app (directories.app), not the repo root, so this reads
  // release/app's own closure - what ships unbundled alongside the webpack output rather than
  // through it. release/app keeps its own, separate node_modules install AND its own
  // package-lock.json (see .erb/scripts/check-native-dep.js and release/app/package.json's own
  // rebuild/postinstall scripts), so the closure is walked over THAT lockfile and resolved against
  // release/app/node_modules specifically, not the repo root's tree.

  it('resolves a declared dependency to a full ShippedPackage entry', () => {
    writeReleaseAppManifest({ 'some-native-module': '1.2.3' });
    writeReleaseAppLock({ 'node_modules/some-native-module': { version: '1.2.3' } });
    const dir = writeReleaseAppDependency('some-native-module', '1.2.3');
    expect(collectUnbundledPackages(repo)).toEqual([
      {
        ecosystem: 'npm',
        name: 'some-native-module',
        version: '1.2.3',
        dir,
        reachedVia: ['release/app'],
      },
    ]);
  });

  it('walks the TRANSITIVE closure, not only the direct dependencies', () => {
    // This path exists for a native module that cannot survive being webpacked, and a native module
    // never arrives alone - node-gyp packages bring `bindings`, `node-addon-api`,
    // `prebuild-install` and their trees, and electron-builder packs every one of them. Reading
    // only the direct `dependencies` would list the native module and silently omit everything
    // under it, in a document whose characteristic failure is exactly that.
    writeReleaseAppManifest({ 'native-thing': '^2.0.0' });
    writeReleaseAppLock({
      'node_modules/native-thing': { version: '2.0.0', dependencies: { bindings: '^1.5.0' } },
      'node_modules/bindings': {
        version: '1.5.0',
        dependencies: { 'file-uri-to-path': '1.0.0' },
      },
      'node_modules/file-uri-to-path': { version: '1.0.0' },
    });
    writeReleaseAppDependency('native-thing', '2.0.0');
    writeReleaseAppDependency('bindings', '1.5.0');
    writeReleaseAppDependency('file-uri-to-path', '1.0.0');
    expect(collectUnbundledPackages(repo).map((p) => `${p.name}@${p.version}`)).toEqual([
      'bindings@1.5.0',
      'file-uri-to-path@1.0.0',
      'native-thing@2.0.0',
    ]);
  });

  it('follows optionalDependencies, which electron-builder also packs', () => {
    writeReleaseAppManifest({ 'native-thing': '^2.0.0' });
    writeReleaseAppLock({
      'node_modules/native-thing': {
        version: '2.0.0',
        optionalDependencies: { 'fs-events-ish': '^1.0.0' },
      },
      'node_modules/fs-events-ish': { version: '1.0.0' },
    });
    writeReleaseAppDependency('native-thing', '2.0.0');
    writeReleaseAppDependency('fs-events-ish', '1.0.0');
    expect(collectUnbundledPackages(repo).map((p) => p.name)).toEqual([
      'fs-events-ish',
      'native-thing',
    ]);
  });

  it('does NOT follow devDependencies, which electron-builder does not pack', () => {
    writeReleaseAppManifest({ 'native-thing': '^2.0.0' });
    writeReleaseAppLock({
      'node_modules/native-thing': { version: '2.0.0', devDependencies: { 'test-only': '^1.0.0' } },
      'node_modules/test-only': { version: '1.0.0', dev: true },
    });
    writeReleaseAppDependency('native-thing', '2.0.0');
    expect(collectUnbundledPackages(repo).map((p) => p.name)).toEqual(['native-thing']);
  });

  it('resolves a NESTED copy rather than the hoisted one when the lockfile nests it', () => {
    // The reason the walk is over lockfile KEYS and not names: `node_modules/a/node_modules/b` and
    // `node_modules/b` are different copies at different versions, and which one an importer gets
    // is decided by where it is required FROM.
    writeReleaseAppManifest({ 'native-thing': '^2.0.0' });
    writeReleaseAppLock({
      'node_modules/native-thing': { version: '2.0.0', dependencies: { shared: '^1.0.0' } },
      'node_modules/native-thing/node_modules/shared': { version: '1.0.0' },
      'node_modules/shared': { version: '9.9.9' },
    });
    writeReleaseAppDependency('native-thing', '2.0.0');
    const nestedDir = path.join(
      repo,
      'release',
      'app',
      'node_modules',
      'native-thing',
      'node_modules',
      'shared',
    );
    fs.mkdirSync(nestedDir, { recursive: true });
    fs.writeFileSync(
      path.join(nestedDir, 'package.json'),
      JSON.stringify({ name: 'shared', version: '1.0.0' }),
    );
    const versions = collectUnbundledPackages(repo).map((p) => `${p.name}@${p.version}`);
    expect(versions).toContain('shared@1.0.0');
    expect(versions).not.toContain('shared@9.9.9');
  });

  it('returns an empty array when release/app/package.json declares no dependencies', () => {
    // Reflects the repository's actual current state: release/app/package.json has no
    // "dependencies" key today, and that is expected, not an error. It must not require the
    // separate release/app install - or even its lockfile - to exist at all, because that install
    // is a step many checkouts have never run.
    writeReleaseAppManifest({});
    expect(collectUnbundledPackages(repo)).toEqual([]);
  });

  it('returns an empty array when release/app/package.json does not exist', () => {
    expect(collectUnbundledPackages(repo)).toEqual([]);
  });

  it('throws when dependencies are declared but release/app has no lockfile', () => {
    // Without the lockfile there is no closure to walk, only the direct names - which is precisely
    // the under-report this walk exists to prevent, so it must not fall back to them.
    writeReleaseAppManifest({ 'missing-module': '1.0.0' });
    expect(() => collectUnbundledPackages(repo)).toThrow(/package-lock\.json does not exist/);
  });

  it('throws when the lockfile records no entry for a reached dependency', () => {
    writeReleaseAppManifest({ 'native-thing': '^2.0.0' });
    writeReleaseAppLock({
      'node_modules/native-thing': { version: '2.0.0', dependencies: { bindings: '^1.5.0' } },
    });
    writeReleaseAppDependency('native-thing', '2.0.0');
    expect(() => collectUnbundledPackages(repo)).toThrow(/"bindings"/);
  });

  it('throws when a package in the closure is not actually installed', () => {
    // A lockfile edge is an exact statement about what npm installed, unlike the stylesheet scan's
    // regex extraction - so a package that fails to resolve here means the release/app install is
    // genuinely incomplete, not a heuristic false positive.
    writeReleaseAppManifest({ 'missing-module': '1.0.0' });
    writeReleaseAppLock({ 'node_modules/missing-module': { version: '1.0.0' } });
    expect(() => collectUnbundledPackages(repo)).toThrow(/missing-module/);
  });
});

describe('a yalc dev link is described from package-lock.json, subtree and all', () => {
  // THE GUARANTEE UNDER TEST: the artifact must come out the same whether the generating tree is
  // linked or not. Both halves are needed for that, and neither is sufficient alone:
  //
  //   1. The linked package's own version, because `.yalc` holds whatever a moving branch of
  //      another repository last published (it held platform-editor 0.8.15 while the lockfile
  //      pinned 0.8.14, and it moved mid-task).
  //   2. Its DISPLACED dependencies, because yalc replaces `node_modules/<linked>` with a symlink
  //      and takes the copies nested underneath it off disk - so a dependency the lockfile nests
  //      resolves to the hoisted copy instead, at a different version.
  //
  // The first two fixtures make the lockfile and the tree DISAGREE on purpose, so a test that
  // passed by reading the tree could not also pass there - they are what actually pins the
  // guarantee. The three marked CONTROL do not disagree: they exist to prove the correction does
  // not OVER-fire, which is the other way a guard like this goes wrong and the way it gets deleted
  // later for being noisy.

  /** Writes a package whose directory is reached through `.yalc`, the way yalc installs one. */
  function writeLinkedPackage(name: string, onDiskVersion: string) {
    const target = path.join(repo, '.yalc', name);
    fs.mkdirSync(target, { recursive: true });
    fs.writeFileSync(
      path.join(target, 'package.json'),
      JSON.stringify({ name, version: onDiskVersion, license: 'Whatever-The-Branch-Says' }),
    );
    fs.writeFileSync(path.join(target, 'index.js'), '');
    const link = path.join(repo, 'node_modules', name);
    fs.mkdirSync(path.dirname(link), { recursive: true });
    fs.symlinkSync(target, link);
    return link;
  }

  function writeLock(packages: Record<string, object>) {
    fs.writeFileSync(
      path.join(repo, 'package-lock.json'),
      JSON.stringify({ lockfileVersion: 3, packages }),
    );
  }

  type Shipped = { name: string; version: string; fromLock?: boolean; devLinked?: boolean };

  function shipped(packages: Shipped[], name: string) {
    const entry = packages.find((candidate) => candidate.name === name);
    // A guard rather than a conditional expect: `vitest/no-conditional-expect` is an error here,
    // and a missing entry is a different failure than a wrong version.
    if (!entry) throw new Error(`no package named ${name} in: ${packages.map((p) => p.name)}`);
    return entry;
  }

  it("takes the linked package's version and declaration from the lockfile, not from the link", () => {
    // The link says 9.9.9; the lockfile pins 1.0.0. The lockfile has to win, or a push to that
    // branch changes this repository's committed legal artifact with no commit here at all.
    const link = writeLinkedPackage('linked-pkg', '9.9.9');
    writeManifest('main', [path.join(link, 'index.js')]);
    writeLock({ 'node_modules/linked-pkg': { version: '1.0.0', license: 'MIT' } });

    const { packages } = collectShippedPackages({
      manifestDir: path.join(repo, '.notices', 'modules'),
      repo,
    });

    expect(packages).toEqual([
      expect.objectContaining({
        name: 'linked-pkg',
        version: '1.0.0',
        devLinked: true,
        fromLock: true,
        declaredField: 'MIT',
      }),
    ]);
  });

  it('describes a link reported by its `.yalc` REAL path, which is what webpack emits', () => {
    // The live shape, and the one with no lockfile key of its own: `.yalc/<name>` is not a path npm
    // ever writes, so both the version and - through `lockKey` - the subtree resolution have to go
    // through the by-name lookup instead. Without that, the link resolves its dependencies from a
    // tree npm never wrote, finds only the hoisted copy, and the correction silently never fires.
    const link = writeLinkedPackage('linked-pkg', '9.9.9');
    const hoisted = writePackage('node_modules/dep', 'dep', '1.0.0');
    writeManifest('main', [
      // The REAL path, not the symlink - `fs.realpathSync` is what webpack applies.
      path.join(fs.realpathSync(link), 'index.js'),
      path.join(hoisted, 'index.js'),
    ]);
    writeLock({
      'node_modules/linked-pkg': { version: '1.0.0', license: 'MIT', dependencies: { dep: '^2' } },
      'node_modules/linked-pkg/node_modules/dep': { version: '2.0.0', license: 'Apache-2.0' },
      'node_modules/dep': { version: '1.0.0', license: 'MIT' },
    });

    const { packages } = collectShippedPackages({
      manifestDir: path.join(repo, '.notices', 'modules'),
      repo,
    });

    expect(shipped(packages, 'linked-pkg')).toMatchObject({ version: '1.0.0', devLinked: true });
    expect(shipped(packages, 'dep')).toMatchObject({ version: '2.0.0', fromLock: true });
  });

  it("takes a displaced dependency's version from the lockfile's NESTED copy, not the hoisted one on disk", () => {
    // The exact live case. The lockfile nests `dep` 2.0.0 under the linked package, but the link
    // took that nested copy off disk, so the bundle resolved the hoisted 1.0.0. An unlinked `npm ci`
    // tree would have compiled 2.0.0, so 2.0.0 is what ships and what must be recorded.
    const link = writeLinkedPackage('linked-pkg', '9.9.9');
    const hoisted = writePackage('node_modules/dep', 'dep', '1.0.0');
    writeManifest('main', [path.join(link, 'index.js'), path.join(hoisted, 'index.js')]);
    writeLock({
      'node_modules/linked-pkg': { version: '1.0.0', license: 'MIT', dependencies: { dep: '^2' } },
      'node_modules/linked-pkg/node_modules/dep': { version: '2.0.0', license: 'Apache-2.0' },
      'node_modules/dep': { version: '1.0.0', license: 'MIT' },
    });

    const { packages } = collectShippedPackages({
      manifestDir: path.join(repo, '.notices', 'modules'),
      repo,
    });

    const dep = shipped(packages, 'dep');
    expect(dep.version).toBe('2.0.0');
    // Described from the lockfile, so nothing of its directory may be read - the directory holds
    // the wrong copy, and therefore a different licence text.
    expect(dep).toMatchObject({ fromLock: true, declaredField: 'Apache-2.0' });
    // Not the link itself, which is a different fact and is reported differently.
    expect(dep.devLinked).toBeUndefined();
  });

  it('CONTROL: leaves a hoisted copy alone when another shipped package genuinely resolves to it', () => {
    // The soundness guard. If something outside the link depends on the hoisted copy, an unlinked
    // tree carries BOTH copies, so re-describing this one would replace a real row with a wrong one.
    const link = writeLinkedPackage('linked-pkg', '9.9.9');
    const hoisted = writePackage('node_modules/dep', 'dep', '1.0.0');
    const other = writePackage('node_modules/other', 'other', '1.0.0');
    writeManifest('main', [
      path.join(link, 'index.js'),
      path.join(hoisted, 'index.js'),
      path.join(other, 'index.js'),
    ]);
    writeLock({
      'node_modules/linked-pkg': { version: '1.0.0', license: 'MIT', dependencies: { dep: '^2' } },
      'node_modules/linked-pkg/node_modules/dep': { version: '2.0.0', license: 'Apache-2.0' },
      'node_modules/dep': { version: '1.0.0', license: 'MIT' },
      'node_modules/other': { version: '1.0.0', license: 'MIT', dependencies: { dep: '^1' } },
    });

    const { packages } = collectShippedPackages({
      manifestDir: path.join(repo, '.notices', 'modules'),
      repo,
    });

    const dep = shipped(packages, 'dep');
    expect(dep.version).toBe('1.0.0');
    expect(dep.fromLock).toBeUndefined();
  });

  it('CONTROL: leaves an already-nested resolution alone', () => {
    // A nested directory that exists on disk is the copy the lockfile records, so there is nothing
    // for a link to have distorted. Only a hoisted resolution can be the fallback a link forced.
    const link = writeLinkedPackage('linked-pkg', '9.9.9');
    const nested = writePackage('node_modules/other/node_modules/dep', 'dep', '3.0.0');
    writeManifest('main', [path.join(link, 'index.js'), path.join(nested, 'index.js')]);
    writeLock({
      'node_modules/linked-pkg': { version: '1.0.0', license: 'MIT' },
      'node_modules/linked-pkg/node_modules/dep': { version: '2.0.0', license: 'Apache-2.0' },
      'node_modules/other/node_modules/dep': { version: '3.0.0', license: 'MIT' },
    });

    const { packages } = collectShippedPackages({
      manifestDir: path.join(repo, '.notices', 'modules'),
      repo,
    });

    expect(shipped(packages, 'dep').version).toBe('3.0.0');
  });

  it('CONTROL: changes nothing at all on a tree with no links', () => {
    // The other half of any guard: one that fires when it should not is how a guard gets deleted.
    // The lockfile here nests a different copy, and with nothing linked it must be ignored.
    const hoisted = writePackage('node_modules/dep', 'dep', '1.0.0');
    writeManifest('main', [path.join(hoisted, 'index.js')]);
    writeLock({
      'node_modules/dep': { version: '1.0.0', license: 'MIT' },
      'node_modules/somebody/node_modules/dep': { version: '2.0.0', license: 'Apache-2.0' },
    });

    const { packages } = collectShippedPackages({
      manifestDir: path.join(repo, '.notices', 'modules'),
      repo,
    });

    expect(packages).toHaveLength(1);
    const dep = shipped(packages, 'dep');
    expect(dep.version).toBe('1.0.0');
    expect(dep.fromLock).toBeUndefined();
  });

  it('refuses rather than guessing when two links need two different nested copies', () => {
    // No single answer exists, and inventing one would put a version nobody can reproduce into a
    // legal document.
    const linkA = writeLinkedPackage('link-a', '9.9.9');
    const linkB = writeLinkedPackage('link-b', '9.9.9');
    const hoisted = writePackage('node_modules/dep', 'dep', '1.0.0');
    writeManifest('main', [
      path.join(linkA, 'index.js'),
      path.join(linkB, 'index.js'),
      path.join(hoisted, 'index.js'),
    ]);
    writeLock({
      'node_modules/link-a': { version: '1.0.0', license: 'MIT', dependencies: { dep: '^2' } },
      'node_modules/link-a/node_modules/dep': { version: '2.0.0', license: 'MIT' },
      'node_modules/link-b': { version: '1.0.0', license: 'MIT', dependencies: { dep: '^3' } },
      'node_modules/link-b/node_modules/dep': { version: '3.0.0', license: 'MIT' },
      'node_modules/dep': { version: '1.0.0', license: 'MIT' },
    });

    expect(() =>
      collectShippedPackages({ manifestDir: path.join(repo, '.notices', 'modules'), repo }),
    ).toThrow(/more than one nested copy/);
  });
});

describe('lockKeyOf and containedPath', () => {
  it('maps a package directory to its lockfile key', () => {
    // The lockfile's keys ARE install paths, so this is the exact inverse of npm's own layout.
    expect(lockKeyOf(path.join(repo, 'node_modules', 'a', 'node_modules', 'b'), repo)).toBe(
      'node_modules/a/node_modules/b',
    );
  });

  it('refuses a directory outside the repository rather than producing a `..` key', () => {
    // `path.relative` happily yields `../..`, and a key derived from that would either miss
    // silently or collide with a real one.
    expect(lockKeyOf(path.join(path.dirname(repo), 'elsewhere'), repo)).toBeUndefined();
    expect(containedPath(repo, '../escape')).toBeUndefined();
  });

  it('normalizes separators so a Windows-shaped path resolves the same way', () => {
    expect(containedPath(repo, 'node_modules\\pkg')).toBe(path.join(repo, 'node_modules', 'pkg'));
  });
});

describe('resolveFromLock and lockEntry', () => {
  const lock = {
    packages: {
      'node_modules/pkg': { version: '1.0.0' },
      'node_modules/outer/node_modules/pkg': { version: '2.0.0' },
      'node_modules/hello': { link: true, resolved: 'extensions/src/hello' },
      'extensions/src/hello': { version: '0.1.0', dependencies: { pkg: '^1' } },
    },
  };

  it("prefers the importer's own nested copy over the hoisted one", () => {
    // Resolving by bare name instead would pick whichever copy the lockfile lists first, and the
    // copies differ - which is the entire point.
    expect(resolveFromLock(lock, 'node_modules/outer', 'pkg')).toBe(
      'node_modules/outer/node_modules/pkg',
    );
  });

  it('walks up to the root when no nested copy exists', () => {
    expect(resolveFromLock(lock, 'node_modules/somewhere/deep', 'pkg')).toBe('node_modules/pkg');
  });

  it('reports nothing for a name the lockfile does not carry', () => {
    expect(resolveFromLock(lock, 'node_modules/outer', 'absent')).toBeUndefined();
  });

  it("follows a workspace link to the workspace's own entry, keeping both keys", () => {
    // The link key NAMES the package; the workspace key is where its version and dependencies live
    // and where its own dependencies resolve from. Naming a package after the workspace path puts a
    // path into the report, which then matches nothing and is published as a third party.
    expect(lockEntry(lock, 'node_modules/hello')).toEqual({
      key: 'node_modules/hello',
      dependsFrom: 'extensions/src/hello',
      entry: lock.packages['extensions/src/hello'],
    });
  });

  it('reports an ordinary entry against its own key', () => {
    expect(lockEntry(lock, 'node_modules/pkg')).toEqual({
      key: 'node_modules/pkg',
      dependsFrom: 'node_modules/pkg',
      entry: { version: '1.0.0' },
    });
  });
});

describe('packageDirOf stops at the package boundary', () => {
  // THE FAIL-OPEN THIS CLOSES: a walk that continues past a missing package directory reaches the
  // nearest package.json ABOVE it, so a module under a nested copy that is not on disk is silently
  // credited to the ENCLOSING package - a real directory, so the run resolves and exits 0 with the
  // missing package absent from the document entirely. The live shape: sixteen modules under
  // `.../scripture-utilities/node_modules/@xmldom/xmldom/` when a `yalc` refresh has taken that
  // directory off disk, all attributed to `scripture-utilities`.

  it('reports a module under a MISSING nested package as unresolved, not as its parent', () => {
    const outer = writePackage('node_modules/outer', 'outer', '1.0.0');
    const ghost = path.join(outer, 'node_modules', 'gone', 'index.js');
    expect(packageDirOf(ghost, repo)).toBeUndefined();
  });

  it('reports a module under a MISSING nested SCOPED package as unresolved', () => {
    // The live shape. A scoped name is two path segments, so a boundary computed for the unscoped
    // case would stop one level too high and land on the scope directory.
    const outer = writePackage('node_modules/outer', 'outer', '1.0.0');
    const ghost = path.join(outer, 'node_modules', '@scope', 'gone', 'lib', 'index.js');
    expect(packageDirOf(ghost, repo)).toBeUndefined();
  });

  it('still attributes a module to the nested package that DOES exist', () => {
    const inner = writePackage('node_modules/outer/node_modules/inner', 'inner', '2.0.0');
    expect(packageDirOf(path.join(inner, 'lib', 'index.js'), repo)).toBe(inner);
  });

  it('still walks past a resolution-scoped package.json inside the same package', () => {
    // `@babel/runtime/helpers/esm/package.json` is `{"type":"module"}` and no boundary at all. The
    // walk has to cross it and stop at the package root, which is still inside the boundary.
    const pkg = writePackage('node_modules/@babel/runtime', '@babel/runtime', '7.0.0');
    const marker = path.join(pkg, 'helpers', 'esm');
    fs.mkdirSync(marker, { recursive: true });
    fs.writeFileSync(path.join(marker, 'package.json'), JSON.stringify({ type: 'module' }));
    expect(packageDirOf(path.join(marker, 'typeof.js'), repo)).toBe(pkg);
  });

  it('reports first-party source outside an installed-package directory as not a package', () => {
    expect(packageDirOf(path.join(repo, 'src', 'main', 'main.ts'), repo)).toBeUndefined();
  });

  it('resolves a package by its `.yalc` REAL path, which is what webpack reports', () => {
    // webpack resolves symlinks to their real path, so a package installed as a node_modules
    // symlink into `.yalc` is reported by its `.yalc` path. Treating that as first-party source -
    // which is ignored without comment - removed both dev-linked packages from the document
    // entirely while the run exited 0. `.yalc` is laid out exactly like `node_modules`.
    const dir = path.join(repo, '.yalc', '@scope', 'linked');
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(
      path.join(dir, 'package.json'),
      JSON.stringify({ name: '@scope/linked', version: '9.9.9' }),
    );
    expect(packageDirOf(path.join(dir, 'dist', 'index.js'), repo)).toBe(dir);
  });

  it('reports a module under a MISSING `.yalc` package as unresolved, not as first-party', () => {
    expect(
      packageDirOf(path.join(repo, '.yalc', '@scope', 'gone', 'dist', 'index.js'), repo),
    ).toBeUndefined();
  });
});

describe('the module manifests must all come from one build', () => {
  // A set of MIXED VINTAGE is a silent under-report: a stale manifest names modules that are gone,
  // or misses ones that are now there. This repository shipped exactly that state - two extension
  // manifests hours older than the three core ones, still naming modules under a directory a `yalc`
  // refresh had removed - and nothing in a manifest said which build it came from.

  function writeStampedManifest(bundle: string, buildId: string | undefined, modules: string[]) {
    const dir = path.join(repo, '.notices', 'modules');
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(
      path.join(dir, `${bundle}.json`),
      JSON.stringify({ bundle, buildId, modules }),
    );
  }

  it('refuses a set whose stamps disagree, naming the bundles and the remedy', () => {
    const pkg = writePackage('node_modules/dep', 'dep', '1.0.0');
    writeStampedManifest('main', 'build-a', [path.join(pkg, 'index.js')]);
    writeStampedManifest('renderer', 'build-b', [path.join(pkg, 'index.js')]);

    expect(() =>
      collectShippedPackages({ manifestDir: path.join(repo, '.notices', 'modules'), repo }),
    ).toThrow(/different builds[\s\S]*npm run build/);
  });

  it('refuses when a manifest carries no stamp at all', () => {
    // Two manifests that each fail to say which build they came from are not evidence that they
    // came from the same one, so each is counted separately rather than sharing one bucket.
    const pkg = writePackage('node_modules/dep', 'dep', '1.0.0');
    writeStampedManifest('main', undefined, [path.join(pkg, 'index.js')]);
    writeStampedManifest('renderer', undefined, [path.join(pkg, 'index.js')]);

    expect(() =>
      collectShippedPackages({ manifestDir: path.join(repo, '.notices', 'modules'), repo }),
    ).toThrow(/different builds/);
  });

  it('accepts a set that agrees', () => {
    const pkg = writePackage('node_modules/dep', 'dep', '1.0.0');
    writeStampedManifest('main', 'build-a', [path.join(pkg, 'index.js')]);
    writeStampedManifest('renderer', 'build-a', [path.join(pkg, 'index.js')]);

    const { packages } = collectShippedPackages({
      manifestDir: path.join(repo, '.notices', 'modules'),
      repo,
    });
    expect(packages.map((entry) => entry.name)).toEqual(['dep']);
  });
});

describe('a manifest built against a warm filesystem cache is refused', () => {
  // A module webpack restores from a warm persistent cache does not re-run its loader, and a loader
  // that injects new modules AS PART OF running (css-loader emitting require()s for its own runtime
  // helpers) never gets the chance to add them on a cache hit - so the manifest can under-report
  // what the emitted bundle actually contains, silently. See `emit-shipped-modules-plugin.ts`
  // `isWarmFilesystemCache` for how a manifest gets stamped `cacheWarm`.

  function writeManifestWithCacheFlag(bundle, cacheWarm, modules) {
    const dir = path.join(repo, '.notices', 'modules');
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(
      path.join(dir, `${bundle}.json`),
      JSON.stringify({ bundle, buildId: 'one-build', cacheWarm, modules }),
    );
  }

  it('refuses when one manifest is stamped cacheWarm, naming the bundle and the remedy', () => {
    const pkg = writePackage('node_modules/dep', 'dep', '1.0.0');
    writeManifestWithCacheFlag('main', false, [path.join(pkg, 'index.js')]);
    writeManifestWithCacheFlag('renderer', true, [path.join(pkg, 'index.js')]);

    expect(() =>
      collectShippedPackages({ manifestDir: path.join(repo, '.notices', 'modules'), repo }),
    ).toThrow(
      /renderer[\s\S]*warm webpack filesystem cache[\s\S]*rm -rf node_modules\/\.cache\/webpack-\*/,
    );
  });

  it('names every warm bundle, not just the first', () => {
    const pkg = writePackage('node_modules/dep', 'dep', '1.0.0');
    writeManifestWithCacheFlag('main', true, [path.join(pkg, 'index.js')]);
    writeManifestWithCacheFlag('renderer', true, [path.join(pkg, 'index.js')]);

    expect(() =>
      collectShippedPackages({ manifestDir: path.join(repo, '.notices', 'modules'), repo }),
    ).toThrow(/main, renderer/);
  });

  it('accepts a set where no manifest is warm (false or absent)', () => {
    const pkg = writePackage('node_modules/dep', 'dep', '1.0.0');
    writeManifestWithCacheFlag('main', false, [path.join(pkg, 'index.js')]);
    // Omitting the field entirely (an older manifest, or a bundle with no filesystem cache at all)
    // must not be treated as warm - only an explicit `true` should refuse.
    writeManifestWithCacheFlag('renderer', undefined, [path.join(pkg, 'index.js')]);

    const { packages } = collectShippedPackages({
      manifestDir: path.join(repo, '.notices', 'modules'),
      repo,
    });
    expect(packages.map((entry) => entry.name)).toEqual(['dep']);
  });
});

describe('every bundle the application ships must have a manifest', () => {
  // The quietest failure this tool has: an ABSENT manifest just makes the union smaller, every
  // section renumbers, and the run exits 0. It happened - the two extension manifests were emitted
  // only under NODE_ENV=production, which the root `npm run build` does not set for its extensions
  // leg, so a fresh checkout built the shipping set from three manifests and silently dropped
  // `react-reverse-portal`, reached only through an extension web view.

  it('names the missing bundles and the remedy', () => {
    const dep = writePackage('node_modules/dep', 'dep', '1.0.0');
    writeManifest('main', [path.join(dep, 'index.js')]);

    expect(() =>
      collectShippedPackages({
        manifestDir: path.join(repo, '.notices', 'modules'),
        repo,
        requiredBundles: ['main', 'renderer', 'extension-web-view'],
      }),
    ).toThrow(/missing the manifest for extension-web-view, renderer[\s\S]*npm run build/);
  });

  it('accepts a complete set', () => {
    const dep = writePackage('node_modules/dep', 'dep', '1.0.0');
    ['main', 'renderer'].forEach((bundle) => writeManifest(bundle, [path.join(dep, 'index.js')]));

    expect(
      collectShippedPackages({
        manifestDir: path.join(repo, '.notices', 'modules'),
        repo,
        requiredBundles: ['main', 'renderer'],
      }).packages,
    ).toHaveLength(1);
  });

  it('lists every bundle the application actually builds', () => {
    // Coupled to the build graph on purpose: adding a bundle without adding it here, or losing one,
    // is exactly the mistake this list exists to fail on.
    expect(REQUIRED_BUNDLES).toEqual([
      'extension-host',
      'extension-main',
      'extension-web-view',
      'main',
      'renderer',
    ]);
  });
});

describe('the npm shipping set has a plausibility floor', () => {
  // The npm mirror of `DOTNET_MIN_PACKAGES`. `collectShippedPackages` checks that the manifest
  // FILES exist, that the build stamps agree and that no cache was warm - never, apart from the
  // per-bundle emptiness check, that a manifest CONTAINS anything: empty `modules` in
  // `.notices/modules/renderer.json` and the real command writes a 190-package artifact, exit 0;
  // empty all five and it writes 4 packages, exit 0. CI cannot catch it either, because all three
  // legs run the same plugin - short manifests everywhere means
  // Linux regenerates a correspondingly short document, `verify-changed-files` sees no diff, and
  // the per-platform check compares short against short.

  it('refuses a set smaller than the floor, naming the remedy', () => {
    const short = new Array(NPM_MIN_PACKAGES - 1).fill({ name: 'p', version: '1.0.0' });
    expect(() => assertNpmFloor(short)).toThrow(new RegExp(`at least ${NPM_MIN_PACKAGES}`));
    expect(() => assertNpmFloor(short)).toThrow(/npm ci && npm run build/);
  });

  it('accepts a set at the floor', () => {
    // Pins the boundary: a mutant flipping `<` to `<=` fails here rather than passing unnoticed.
    const atFloor = new Array(NPM_MIN_PACKAGES).fill({ name: 'p', version: '1.0.0' });
    expect(() => assertNpmFloor(atFloor)).not.toThrow();
  });

  it('the floor is well below the real set but far above any degraded one', () => {
    // A floor nobody can justify gets raised or lowered on a hunch. 120 against a current 217
    // leaves 45% of shrink room, which no single dependency change in this closure approaches,
    // while every degradation observed lands in the single or double digits.
    expect(NPM_MIN_PACKAGES).toBeGreaterThan(20);
    expect(NPM_MIN_PACKAGES).toBeLessThan(217);
  });

  // The relative half of the floor. The literal above is frozen, so the room it leaves grows with
  // the closure; this one is measured against the npm half of the committed lock, which moves with
  // it. Both apply: the literal owes nothing to the artifact, and still holds if the lock is short.
  describe('and a limit on how far it may shrink against the committed lock', () => {
    const setOf = (count: number) => new Array(count).fill({ name: 'p', version: '1.0.0' });

    it('refuses a set that shrank past the limit, naming both counts and the percentage', () => {
      // 217 -> 190 is a 12% drop, past the 10% limit.
      expect(() => assertNpmNotShrunk(setOf(190), 217)).toThrow(/190 packages, against 217/);
      expect(() => assertNpmNotShrunk(setOf(190), 217)).toThrow(/12%/);
      expect(() => assertNpmNotShrunk(setOf(190), 217)).toThrow(/npm ci && npm run build/);
    });

    it('accepts a set exactly at the limit', () => {
      // Pins the boundary the same way the absolute floor's case above does: 10% of 200 is 20, so
      // 180 is the smallest set that still passes.
      expect(NPM_MAX_SHRINK).toBe(0.1);
      expect(() => assertNpmNotShrunk(setOf(180), 200)).not.toThrow();
      expect(() => assertNpmNotShrunk(setOf(179), 200)).toThrow();
    });

    it('accepts a set that GREW, however far', () => {
      // Only shrinkage is suspicious: packages arrive in ordinary dependency changes, and a set
      // that grew cannot be a manifest that came back short.
      expect(() => assertNpmNotShrunk(setOf(400), 217)).not.toThrow();
    });

    it('can be acknowledged explicitly, because the remedy for a real removal is to regenerate', () => {
      // Without an escape this is a trap: a genuine large removal blocks the very regeneration the
      // message asks for. The escape is deliberate rather than a judgement call made here.
      expect(() => assertNpmNotShrunk(setOf(10), 217, { accepted: true })).not.toThrow();
      expect(() => assertNpmNotShrunk(setOf(10), 217, { accepted: false })).toThrow();
      // The refusal names the acknowledgement, or nobody finds it.
      expect(() => assertNpmNotShrunk(setOf(10), 217)).toThrow(new RegExp(ACCEPT_SHRINK_ENV));
    });

    it('is a no-op when there is no committed lock to compare against', () => {
      // A fresh repository, or a fixture. `assertNpmFloor` is then the only floor, which is the
      // right answer rather than refusing every set for want of a baseline.
      expect(() => assertNpmNotShrunk(setOf(1), undefined)).not.toThrow();
      expect(() => assertNpmNotShrunk(setOf(1), 0)).not.toThrow();
    });
  });

  it('refuses a required bundle whose module list is empty', () => {
    // Present-and-empty is the same silent under-report as absent. Every bundle this application
    // ships compiles at least dozens of modules; zero means the plugin did not observe the
    // compilation, never that the bundle genuinely contains nothing.
    writePackage('node_modules/dep', 'dep', '1.0.0');
    writeManifest('main', [path.join(repo, 'node_modules', 'dep', 'index.js')]);
    writeManifest('renderer', []);
    expect(() =>
      collectShippedPackages({
        manifestDir: path.join(repo, '.notices', 'modules'),
        repo,
        requiredBundles: ['main', 'renderer'],
      }),
    ).toThrow(/empty module list for renderer/);
  });

  it('refuses a required bundle whose modules key is missing entirely', () => {
    fs.mkdirSync(path.join(repo, '.notices', 'modules'), { recursive: true });
    fs.writeFileSync(
      path.join(repo, '.notices', 'modules', 'main.json'),
      JSON.stringify({ bundle: 'main', buildId: 'one-build' }),
    );
    expect(() =>
      collectShippedPackages({
        manifestDir: path.join(repo, '.notices', 'modules'),
        repo,
        requiredBundles: ['main'],
      }),
    ).toThrow(/empty module list for main/);
  });

  it('leaves a NON-required bundle free to be empty, so fixtures stay usable', () => {
    // The emptiness check is scoped exactly as the missing-manifest check above it is: `main.json`
    // with no modules is how most of the cases in this file satisfy the "at least one manifest"
    // precondition while testing something else entirely.
    writeManifest('main', []);
    expect(() =>
      collectShippedPackages({ manifestDir: path.join(repo, '.notices', 'modules'), repo }),
    ).not.toThrow();
  });
});

describe('the shipping set is ordered by byte comparison, not ICU collation', () => {
  it('orders 9.0.0 before 10.0.0, which localeCompare does not', () => {
    // `compare.js` exists because this pipeline's output is committed and byte-compared. Both
    // `localeCompare` and plain string order put '10.0.0' before '9.0.0', and this repository really
    // does ship the same package at two major versions (lucide-react at 0.475.0 and 1.8.0).
    writePackage('node_modules/dup', 'dup', '9.0.0');
    writePackage('node_modules/other/node_modules/dup', 'dup', '10.0.0');
    writePackage('node_modules/other', 'other', '1.0.0');
    writeManifest('main', [
      path.join(repo, 'node_modules', 'dup', 'index.js'),
      path.join(repo, 'node_modules', 'other', 'node_modules', 'dup', 'index.js'),
    ]);
    const { packages } = collectShippedPackages({
      manifestDir: path.join(repo, '.notices', 'modules'),
      repo,
    });
    expect(packages.map((p) => `${p.name}@${p.version}`)).toEqual(['dup@9.0.0', 'dup@10.0.0']);
  });
});
