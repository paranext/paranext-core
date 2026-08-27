/**
 * Resolves which npm packages ship, from THREE sources, unioned inside `collectShippedPackages`:
 *
 * 1. Webpack's own module manifests (`.notices/modules/*.json`, produced by the webpack plugin - see
 *    `.erb/configs/emit-shipped-modules-plugin.ts`) - what actually compiled into a JS/TS bundle.
 * 2. A stylesheet scan over production CSS/SCSS (see "Stylesheet leaf scan" below) - what a bare
 *    `@import`/`@use`/`url()`, or one of Tailwind v4's own `@plugin`/`@source`/`@config` at-rules,
 *    in first-party CSS pulls in, which webpack's `finishModules` hook cannot see for every
 *    stylesheet pipeline in this repo (see below).
 * 3. `collectUnbundledPackages` - `release/app/package.json`'s own `dependencies`, resolved against
 *    `release/app`'s own separate install (see below), tagged `reachedVia: ['release/app']`.
 *
 * `collectShippedPackages` also returns `unresolvedStylesheetSpecifiers` alongside `packages`: a
 * specifier the stylesheet scan could not resolve to any installed package. This is NOT a failure -
 * see `resolvePackageLeaf` for why throwing here would be wrong - but it must not be silent either.
 * A `node_modules` tree missing only a CSS-only package (a pruned font, lockfile-vs-tree drift in
 * CI) is otherwise indistinguishable from a clean run: this tool exits 0 and ships a shorter, wrong
 * legal disclosure, and nothing else in the pipeline can see the loss. `main.ts` prints the list as
 * an informational note.
 *
 * **Why the module manifests rather than a source scan.** `package.json` `dependencies` alone lies
 * about what a bundler includes, but a regex scan over source text infers what the compiler already
 * reports exactly: every module it resolved into a bundle. `react-reverse-portal` is the package
 * that shows the difference - a `dependencies`-section approach misses it entirely (see
 * `adr-notices-derived-from-what-ships`), and it is reached only through a bundled import, so it
 * appears in `extension-web-view.json`'s module list.
 *
 * **The module graph alone is not enough - stylesheets need their own source.**
 * `adr-notices-derived-from-what-ships` states why: "webpack resolves a bare specifier in a CSS
 * `@import` through `node_modules` and inlines the result, so a package can ship without ever being
 * named in a `.ts` file". The module manifests cannot observe that, because every extension's
 * `tailwind.css` is processed by a standalone Tailwind prebuild
 * (`extensions/lib/prebuild-tailwind.ts`, driven by `TailwindPrebuildWebpackCompilerPlugin`'s
 * `beforeCompile` hook) that runs `postcss([tailwindcssPostcss()])` directly, in plain Node, BEFORE
 * webpack starts. Tailwind v4's own bundler resolves and inlines every `@import` in that file -
 * `tailwindcss`, `tw-animate-css`, `shadcn/tailwind.css`, `@fontsource-variable/ibm-plex-sans` -
 * itself, outside any webpack `Compilation`. `EmitShippedModulesPlugin` can only observe
 * `NormalModule`s that pass through `compilation.hooks.finishModules`; by the time webpack's own
 * `tailwind-prebuild-webpack-style-loader.ts` substitutes the already-bundled result back in, those
 * four packages have already been consumed and inlined, and never become a webpack module. The
 * `main`/`renderer` entry's own Tailwind rule (`.erb/configs/tailwind-css-rule.ts`) similarly
 * resolves `@import`s via `@tailwindcss/postcss` inside a `postcss-loader` step - real webpack
 * module resolution never even reaches those bare specifiers because Tailwind's own bundler
 * consumes them first. Reading the stylesheet source directly is the only source that observes
 * these packages regardless of which pipeline resolved them.
 *
 * **Why not the repo-root `npm ls --omit=dev` closure.** It has **no packaging basis**:
 * `electron-builder.json5`'s `directories.app` points electron-builder at `release/app`, not the
 * repo root, so `electron-builder` packs `release/app`'s dependency closure - never anything the
 * root `package.json` alone declares. `collectUnbundledPackages` reads that closure instead: it is
 * what electron-builder copies into the packaged app's `node_modules` unbundled (this is where a
 * future native module, unable to survive being webpacked, would be declared). Empty today because
 * `release/app/package.json` declares no `dependencies` yet - that emptiness is expected, not an
 * error.
 */

import * as fs from 'fs';
import * as ts from 'typescript';
import * as path from 'path';
import { builtinModules } from 'module';
import { buildIdFile } from '../notices-build-id';
import { compareByNameThenVersion, compareStrings } from './compare';
import { declaredLicenseField } from './package-files';
import { readJsonFile } from './read-json';
import type { Lockfile, LockfileEntry, LockIndex, ShippedPackage } from './types';

/**
 * The fields this module reads off an INSTALLED package's `package.json`.
 *
 * `name` and `version` are required rather than optional because every read of this shape happens
 * at a directory `isPackageRoot` (or npm's own lockfile) has already established as a package root,
 * and a row in the shipping set with no name is not a package this pipeline can describe. The one
 * read that asks WHETHER a manifest names a package types the field loosely, on purpose.
 */
type PackageManifest = {
  name: string;
  version: string;
  license?: unknown;
  licenses?: unknown;
};

/** The dependency edges a root manifest declares - `release/app`'s, here. */
type RootManifest = {
  dependencies?: Record<string, string>;
  optionalDependencies?: Record<string, string>;
};

/**
 * One bundle's module manifest, as `EmitShippedModulesPlugin` writes it.
 *
 * `modules` is optional and `bundle` is not, because the two are checked differently: any `*.json`
 * left in the manifest directory reaches this read, and the `Array.isArray(modules)` guard below is
 * what rejects a file that is not a manifest at all. Everything after that guard has been
 * established as one.
 */
type ModuleManifest = {
  bundle: string;
  buildId?: string;
  /** The webpack `mode` this bundle was compiled in - see `assertOneMode`. */
  mode?: string;
  cacheWarm?: boolean;
  modules?: string[];
};

/** A package a leaf scan reached, and which scan reached it. */
type Leaf = { dir: string; bundle: string };

/**
 * The id `prebuild` minted for the most recent `npm run build` to START.
 *
 * Read from the same file `EmitShippedModulesPlugin` stamps its manifests from, so the two are
 * comparable by construction. Absent means `prebuild` has never run in this tree, in which case
 * every manifest carries its own `unstamped-` value and the mixed-vintage check above has already
 * refused - there is nothing left for this to add.
 */
export function readBuildId(manifestDir: string): string | undefined {
  try {
    return fs.readFileSync(buildIdFile(manifestDir), 'utf8').trim() || undefined;
  } catch (error) {
    // Only "there is no build id", which is a normal state. A permission error or a directory in
    // its place is a broken tree reading as an unstamped one, and the mixed-vintage check that
    // depends on this id then compares against nothing and passes.
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') return undefined;
    throw error;
  }
}

/**
 * Every bundle the packaged application ships, and therefore every manifest that must be present.
 *
 * A manifest that is simply ABSENT is the quietest failure this tool has: the union just comes out
 * smaller, every section renumbers, and the run exits 0. A shipping set built from three of these
 * five manifests drops `react-reverse-portal`, which is reached only through an extension web view.
 * Naming the bundles couples this list to the build graph on purpose: adding a bundle without
 * adding it here is a mistake worth failing on, and so is losing one.
 *
 * Passed IN by `main.ts` rather than defaulted inside `collectShippedPackages`, so the requirement
 * lives at the one call site that describes the real application, and the function itself stays
 * general enough for a fixture to name a single bundle.
 */
export const REQUIRED_BUNDLES = [
  'extension-host',
  'extension-main',
  'extension-web-view',
  'main',
  'renderer',
];

/**
 * The plausibility floor for the npm shipping set, the direct mirror of `nuget-set.ts`'s
 * `DOTNET_MIN_PACKAGES`.
 *
 * `collectShippedPackages` checks that every required manifest FILE exists, that the build stamps
 * agree, and that no cache was warm - never that a manifest CONTAINS anything beyond the per-bundle
 * emptiness check below. Empty `modules` in `.notices/modules/renderer.json` and the real command
 * writes a 190-package artifact and exits 0; empty all five and it writes 4 packages and still
 * exits 0. CI cannot catch that either, because all three legs run the same plugin - a plugin
 * regression produces short manifests everywhere, Linux regenerates a correspondingly short
 * document, `verify-changed-files` sees no diff, and the per-platform shipping-set check compares
 * short against short and passes.
 *
 * 120 against a current 217. The .NET floor sits at roughly 45% of its real closure; this leaves 97
 * packages (45%) of legitimate shrink room, far beyond any single dependency change this closure
 * has ever seen - it is dominated by the transitive trees of React, Electron tooling and
 * `@radix-ui/*`, none of which leaves in one commit - while the degradations above land in the
 * single or double digits and trip it decisively. It is a FLOOR, not a count: the per-bundle
 * emptiness check is the sensitive instrument, and this is the blunt backstop underneath it for
 * whatever shape nobody predicted.
 */
export const NPM_MIN_PACKAGES = 120;

/**
 * Refuses an npm shipping set too small to be this application's.
 *
 * Applied by `main.ts` at the one call site that describes the real application, exactly as
 * `requiredBundles` is, so that a fixture naming three packages stays a usable fixture.
 */
export function assertNpmFloor(packages: ShippedPackage[]): ShippedPackage[] {
  if (packages.length < NPM_MIN_PACKAGES)
    throw new Error(
      `npm shipping set has ${packages.length} packages; expected at least ${NPM_MIN_PACKAGES}. ` +
        'The module manifests are short or the dependency tree is incomplete, and a notices ' +
        'document is never produced from an incomplete set.\n' +
        'Run: rm -rf .notices && npm ci && npm run build',
    );
  return packages;
}

/** One runtime dependency a first-party `package.json` declares, and where it declares it. */
export type DirectDependency = {
  name: string;
  /** The semver range or `file:` link as written, so `missingDirectDependencies` can read it. */
  range: string;
  /** Repo-relative path of the manifest declaring it, for the failure message. */
  declaredIn: string;
};

/**
 * Every `package.json` in this repository that describes something this repository SHIPS.
 *
 * The root manifest, `release/app`'s, the extensions aggregate and every extension, and every
 * `lib/*` package. Deliberately the same breadth as `productionStylesheetRoots`, and for the same
 * reason: a dependency added where it naturally belongs must be seen wherever that is.
 */
function firstPartyManifests(repo: string): string[] {
  const candidates = ['package.json', 'release/app/package.json', 'extensions/package.json'];
  ['extensions/src', 'lib'].forEach((base) => {
    const dir = path.join(repo, base);
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .forEach((entry) => candidates.push(`${base}/${entry.name}/package.json`));
  });
  return candidates.filter((relative) => fs.existsSync(path.join(repo, relative)));
}

/**
 * The runtime dependencies this repository DECLARES, as a second source for what it ships.
 *
 * `dependencies` only. `devDependencies` are not distributed, and `peerDependencies` are a
 * requirement placed on the host rather than this package's own statement that it carries
 * something
 *
 * - The same distinction `readDirectPackageReferences` draws when it discounts a reference whose
 *   `ExcludeAssets` names `runtime`.
 */
export function readDirectDependencies(repo: string): DirectDependency[] {
  return firstPartyManifests(repo).flatMap((relative) => {
    const manifest = readJsonFile<{ dependencies?: Record<string, string> }>(
      path.join(repo, relative),
      `${relative}`,
    );
    return Object.entries(manifest.dependencies || {}).map(([name, range]) => ({
      name,
      range: String(range),
      declaredIn: relative,
    }));
  });
}

/**
 * Declared runtime dependencies that the derived shipping set does not contain.
 *
 * The npm half's guards are all measures of SIZE - `assertNpmFloor` against a literal,
 * `assertNpmNotShrunk` against the committed lock - and size cannot see the failure that matters
 * most here. Everything downstream of `collectShippedPackages` trusts webpack's module manifests,
 * and nothing else in this repository observes an emitted bundle's contents, so a package whose
 * modules are never recorded is simply absent: no row, no removal to notice in a diff, no failing
 * check. The NuGet half has had the answer to this from the start - `missingDirectReferences`
 * cross-checks the restore closure against the project file's own `PackageReference` entries - and
 * this is that guard for npm, reading the one second source npm offers.
 *
 * Deletion is not the dangerous case; a dropped row is at least visible in a PR diff. OMISSION is:
 * when a newly added dependency's modules are never recorded, the correct artifact would have
 * gained a row and the actual one gains nothing, so THIRD-PARTY-NOTICES.md does not appear among
 * the changed files at all and there is nothing for a reviewer to sign off on.
 *
 * Two kinds of declaration are discounted rather than exempted by hand:
 *
 * - A `file:` range is a workspace link to first-party code, which is covered by this repository's
 *   own license and correctly has no row. Reading these from the range rather than a policy list
 *   means adding a package under `lib/` never needs an entry.
 * - `optionalDependencies` are not read at all: npm installs one only where its `os`/`cpu`
 *   constraints match, which is what `platformOnlyPackages` already describes.
 *
 * Everything else must be in the set or recorded in `unbundledDependencies` with a reason. A
 * declared dependency that nothing imports is the ordinary case there - it is still a real
 * statement that this repository intends to depend on something, so the answer belongs in a file
 * somebody reviews rather than in this function.
 */
export function missingDirectDependencies(
  packages: { name: string }[],
  directDependencies: DirectDependency[],
  exemptNames: string[] = [],
): DirectDependency[] {
  const present = new Set(packages.map((pkg) => pkg.name));
  const exempt = new Set(exemptNames);
  const missing = new Map<string, DirectDependency>();
  directDependencies
    .filter((dependency) => !dependency.range.startsWith('file:'))
    .filter((dependency) => !present.has(dependency.name) && !exempt.has(dependency.name))
    // One entry per NAME: `platform-bible-utils` is declared by fourteen manifests, and a failure
    // listing it fourteen times buries whatever else is wrong beside it.
    .forEach((dependency) => {
      if (!missing.has(dependency.name)) missing.set(dependency.name, dependency);
    });
  return [...missing.values()].sort((a, b) => compareStrings(a.name, b.name));
}

/**
 * How far the derived npm set may fall below the COMMITTED one before it is refused, as a fraction.
 *
 * `NPM_MIN_PACKAGES` is a frozen literal, so the room it leaves grows every time the closure does -
 * at 120 against 217 it accepts a 45% collapse. This is the same guard measured against the number
 * that moves with the application: the npm half of `THIRD-PARTY-NOTICES.lock.json`. 10% of the
 * current closure is 21 packages, which is larger than any single dependency change this closure
 * has seen and far smaller than any degradation the manifests can produce.
 *
 * The two are not redundant. This one is relative and sensitive but reads its expectation from the
 * artifact's own sidecar; the literal is absolute and blunt but owes nothing to the artifact, so it
 * still holds if the lock itself is short. A drop past either has to be acknowledged by a human.
 */
export const NPM_MAX_SHRINK = 0.1;

/** The env var that acknowledges a real, large removal - see `assertNpmNotShrunk`. */
export const ACCEPT_SHRINK_ENV = 'NOTICES_ACCEPT_SHRINK';

/**
 * Reads {@link ACCEPT_SHRINK_ENV} as the deliberate acknowledgement it is meant to be.
 *
 * Only `1` and `true` open the escape. A truthiness test on the raw value accepts `0`, `false`,
 * `off` and `no` as well - so the single documented way to turn this gate OFF would also turn it
 * off when spelled as an attempt to turn it ON, and `assertNpmNotShrunk`'s promise that the escape
 * is "impossible to do by accident" would not hold of the only thing that reads it.
 *
 * Returns `ignored` rather than throwing on an unrecognised value. Anyone who has set this variable
 * at all is reaching for the escape; failing the run would make a typo a build failure in the one
 * command a developer runs to get UNBLOCKED, while silence would leave them believing the
 * acknowledgement was made. The caller prints it.
 */
export function acceptShrinkFromEnv(env: typeof process.env): {
  accepted: boolean;
  ignored?: string;
} {
  const raw = env[ACCEPT_SHRINK_ENV];
  if (raw === undefined || raw.trim() === '') return { accepted: false };
  const normalized = raw.trim().toLowerCase();
  if (normalized === '1' || normalized === 'true') return { accepted: true };
  return { accepted: false, ignored: raw };
}

/**
 * Refuses an npm shipping set that has shrunk sharply against the committed lock.
 *
 * A LEGITIMATE drop (a dependency genuinely removed) trips this too, and must: the two are
 * indistinguishable from here, and a shipping set that quietly loses a fifth of itself is exactly
 * what this pipeline exists to refuse. So the way past it is an explicit acknowledgement rather
 * than a judgement call this function is in no position to make - `NOTICES_ACCEPT_SHRINK=1` in
 * front of the regenerate command, which is greppable in a shell history and impossible to do by
 * accident. Without that escape the check would be a trap: the remedy for a real removal is to
 * regenerate, and regeneration is the thing being blocked.
 *
 * `committedNpmCount` is `undefined` where there is no committed lock to compare against (a fresh
 * repository, a fixture), and this is then a no-op - `assertNpmFloor` is the floor that always
 * applies.
 *
 * @param opts `accepted` skips the check outright; the caller sets it from `NOTICES_ACCEPT_SHRINK`
 *   and says so on stdout, so a run that used it is visible in the log.
 */
export function assertNpmNotShrunk(
  packages: ShippedPackage[],
  committedNpmCount: number | undefined,
  { accepted = false }: { accepted?: boolean } = {},
): ShippedPackage[] {
  // `=== undefined`, not falsy: `0` is the most degraded lock state there is - an npm half
  // truncated to `[]` - and treating it as "no lock to compare against" turns the relative gate off
  // on the one input it most needs to catch, leaving only the frozen absolute floor.
  if (committedNpmCount === undefined || accepted) return packages;
  const floor = Math.ceil(committedNpmCount * (1 - NPM_MAX_SHRINK));
  if (packages.length < floor)
    throw new Error(
      `the derived npm shipping set has ${packages.length} packages, against ` +
        `${committedNpmCount} in the committed lock - a drop of ` +
        `${Math.round((1 - packages.length / committedNpmCount) * 100)}%, past the ` +
        `${Math.round(NPM_MAX_SHRINK * 100)}% this refuses at.\n` +
        'If the tree or the build is incomplete, which is the usual cause:\n' +
        '    rm -rf .notices && npm ci && npm run build\n' +
        'If dependencies really were removed and this drop is meant, say so and regenerate:\n' +
        `    ${ACCEPT_SHRINK_ENV}=1 npm run build:third-party-notices`,
    );
  return packages;
}

/**
 * Marks a resolved package directory that npm filled from a `yalc` dev link rather than from the
 * registry.
 *
 * `postinstall` runs `link-dev-packages`, which clones an external repository at the revision named
 * in `dev-packages.json` and yalc-links the packages it publishes over the installed ones. That
 * revision is a BRANCH, so what is on disk is whatever that branch last published - and CI runs
 * `postinstall` too, so describing the link would make this repository's committed legal artifact a
 * function of another repository's moving branch: a push over there would turn `main` red here with
 * no commit here at all. The two are routinely out of step - `.yalc` can hold
 * `@eten-tech-foundation/platform-editor` 0.8.15 while `package-lock.json` pins 0.8.14.
 *
 * A dev-linked package is therefore described from `package-lock.json` - the version this
 * repository pins and the license recorded against it - and NOTHING is read from its directory,
 * which is also why no license text is reproduced for it: the published tarball is not unpacked
 * anywhere to read one from. Its copyright notice comes instead from `notices-policy.json`'s
 * `copyrightNotices`, a table that exists for exactly these packages.
 *
 * Without this, a developer with a link generates a different artifact than CI does and meets a
 * diff failure with nothing in the commit to explain it.
 */
const DEV_LINK = /(^|[\\/])\.yalc([\\/]|$)/;

/**
 * Whether a resolved package directory reaches its contents through `.yalc` - see `DEV_LINK`.
 *
 * Tests the REAL path: yalc installs itself as a symlink from `node_modules/<name>` into `.yalc`,
 * so the path webpack reports names `node_modules` and says nothing about the link.
 */
function isDevLinked(dir: string): boolean {
  try {
    return DEV_LINK.test(fs.realpathSync(dir));
  } catch {
    // A broken link resolves to nothing; the literal path is then the only evidence there is.
    return DEV_LINK.test(dir);
  }
}

/**
 * `package-lock.json`, indexed by install path and by bare package name.
 *
 * The lockfile's keys ARE install paths (`node_modules/x`, `node_modules/a/node_modules/b`), so a
 * package directory looks up exactly. The by-name index is the fallback for a link installed
 * somewhere the key does not spell out; first entry wins, which is the top-level one.
 *
 * The raw document comes back alongside them because `resolveFromLock` walks KEYS rather than
 * reading an index - it mirrors node's resolution, which is a property of the key structure.
 */
function readLockIndex(repo: string): LockIndex {
  const lock = readJsonFile<Lockfile>(path.join(repo, 'package-lock.json'), 'the npm lockfile');
  const byPath = new Map<string, LockfileEntry>();
  const byName = new Map<string, LockfileEntry>();
  const keyByName = new Map<string, string>();
  Object.entries(lock.packages || {}).forEach(([key, entry]) => {
    if (!key || !entry || !entry.version || !/(^|\/)node_modules\//.test(key)) return;
    byPath.set(key, entry);
    const name = key.replace(/^.*node_modules\//, '');
    // The TOP-LEVEL copy wins, not the first key seen. Lock keys sort lexicographically, so
    // `extensions/src/<ext>/node_modules/<name>` precedes `node_modules/<name>` - and taking the
    // first made this index answer with a workspace-nested copy for 166 names in this repository's
    // own lockfile. Two of them ship: `lucide-react` resolved to a nested 0.475.0 over the
    // top-level 1.8.0 that the shipping set actually reaches (and whose reviewed exception is
    // pinned `@1.8.0`), and `tailwindcss` to 3.4.19 over 4.2.2. The consumers - `describePackage`'s
    // dev-link fallback and `collectPlatformOnlyPackages` - are asking "what does the tree resolve
    // for this bare name", which is the hoisted copy.
    const topLevel = `node_modules/${name}`;
    if (!byName.has(name) || key === topLevel) {
      byName.set(name, entry);
      keyByName.set(name, key);
    }
  });
  return { lock, byPath, byName, keyByName };
}

/**
 * Resolves a path against `dir`, or `undefined` when it escapes it.
 *
 * `path.relative` happily produces `../..` for a directory outside the repository, and a lockfile
 * key derived from that would be nonsense - it would either miss silently or, worse, collide with a
 * real key. Separators are normalized as well, so a Windows-shaped path resolves the same way.
 */
export function containedPath(dir: string, candidate: string): string | undefined {
  const root = path.resolve(dir);
  const target = path.resolve(root, String(candidate ?? '').replace(/\\/g, '/'));
  if (target !== root && !target.startsWith(root + path.sep)) return undefined;
  return target;
}

/** The repository's real path, or the path as given when it cannot be resolved. */
function realPathOf(dir: string): string {
  try {
    return fs.realpathSync(dir);
  } catch {
    return dir;
  }
}

/**
 * A module path, respelled the way THIS repository is spelled.
 *
 * Webpack resolves symlinks, so every module it reports is a REAL path - while everything else here
 * is expressed against `repo` as the caller spells it. Where the repository is reached through a
 * symlink the two disagree, and every module then reads as "outside the repository": the walk
 * returns `undefined`, `collectShippedPackages` counts it unresolved, and the run dies claiming the
 * dependency tree is incomplete when nothing is wrong with it.
 *
 * MacOS hits this by default rather than exotically - `/var` is a symlink to `/private/var`, and
 * `os.tmpdir()` returns the former - and so does any checkout under a symlinked parent, a `/home` →
 * `/System/Volumes/Data/home` mount, or a symlinked worktree.
 *
 * Respelling rather than comparing both ways on purpose: the directory this yields becomes a key in
 * the shipping set, a lockfile key (`lockKeyOf`), and a path licensee is asked to read. One
 * spelling throughout is what keeps those consistent; accepting either would let the same package
 * arrive twice under two names.
 */
export function inRepoSpelling(resource: string, repo: string, repoReal: string): string {
  if (repoReal === repo || !resource.startsWith(repoReal + path.sep)) return resource;
  return path.join(repo, resource.slice(repoReal.length + 1));
}

/**
 * The `package-lock.json` key for an on-disk package directory, or `undefined` when the directory
 * is not inside the repository.
 *
 * The lockfile's keys ARE install paths relative to the repository root, with forward slashes, so
 * this is the exact inverse of how npm lays the tree out.
 */
export function lockKeyOf(dir: string, repo: string): string | undefined {
  const contained = containedPath(repo, dir);
  if (!contained) return undefined;
  return path.relative(repo, contained).split(path.sep).join('/');
}

/**
 * A lockfile entry, following a workspace link to the workspace's own entry.
 *
 * The link key and the workspace key are both kept, and they are not interchangeable: the link key
 * (`node_modules/hello-rock3`) is what NAMES the package, while the workspace key
 * (`extensions/src/hello-rock3`) is where its version and dependencies are recorded and where its
 * own dependencies resolve FROM.
 */
export function lockEntry(
  lock: Lockfile,
  key: string,
): { key: string; dependsFrom: string; entry: LockfileEntry | undefined } {
  const packages = lock.packages || {};
  const entry = packages[key];
  if (entry && entry.link && entry.resolved)
    return { key, dependsFrom: entry.resolved, entry: packages[entry.resolved] };
  return { key, dependsFrom: key, entry };
}

/**
 * The lockfile key `name` resolves to when required from `fromKey`, or `undefined`.
 *
 * Mirrors node's resolution: try the importer's own `node_modules`, then each ancestor's, ending at
 * the root. Resolving by bare name instead would pick whichever copy the lockfile lists first, and
 * the copies differ - which is the entire point here, since a nested copy at a different version is
 * exactly what a dev link erases from disk.
 */
export function resolveFromLock(lock: Lockfile, fromKey: string, name: string): string | undefined {
  const segments = fromKey ? fromKey.split('/') : [];
  for (let depth = segments.length; depth >= 0; depth -= 1) {
    const prefix = segments.slice(0, depth).join('/');
    const key = prefix ? `${prefix}/node_modules/${name}` : `node_modules/${name}`;
    if ((lock.packages || {})[key]) return key;
  }
  return undefined;
}

/** Whether a lockfile entry declares a dependency on `name`, by any of the three edge kinds. */
function lockDependsOn(lock: Lockfile, key: string, name: string): boolean {
  const { entry } = lockEntry(lock, key);
  if (!entry) return false;
  // `devDependencies` counts here, unlike anywhere a runtime closure is being walked. The keys this
  // is asked about include this repository's own workspace manifests, and a package a first-party
  // manifest BUNDLES is normally declared there - a bundled dependency is consumed at build time,
  // which is what the code style guide asks for. Omitting the section made the correction below
  // unreachable for exactly the manifests it exists to serve, so a hoisted copy webpack really
  // compiled was re-described as a nested version it never saw.
  return [
    entry.dependencies,
    entry.devDependencies,
    entry.optionalDependencies,
    entry.peerDependencies,
  ].some((edges) => Object.prototype.hasOwnProperty.call(edges || {}, name));
}

/**
 * Re-describes packages whose ON-DISK resolution a `yalc` dev link distorted.
 *
 * This is the other half of the dev-link guard, and the version pin in `describePackage` is not
 * sufficient without it. `yalc` replaces `node_modules/<linked>` with a symlink, which takes the
 * package's own nested `node_modules` with it - so a dependency that `package-lock.json` NESTS
 * under the linked package is simply not on disk any more, and webpack resolves the hoisted copy
 * instead. The live case: the lockfile nests `@xmldom/xmldom` 0.9.10 under
 * `@eten-tech-foundation/scripture-utilities`, but a linked tree bundles the hoisted 0.8.13. Two
 * developers, one linked and one not, would commit different artifacts from the same commit.
 *
 * Nothing is ADDED and nothing is DROPPED here - only re-described. Walking the linked package's
 * whole lockfile closure and adding it would re-introduce exactly what deriving the shipping set
 * from webpack's module graph exists to remove (`adr-notices-derived-from-what-ships`): dozens of
 * declared-but-tree-shaken packages that never reach the bundle. What webpack compiled is still the
 * set; the lockfile only answers WHICH COPY of it that was.
 *
 * A correction applies only when all of these hold, which is deliberately narrow:
 *
 * 1. The entry resolved to the HOISTED key `node_modules/<name>` - a nested resolution was not
 *    distorted, because a nested directory that exists on disk is the one the lockfile records.
 * 2. Some dev-linked package resolves that same name, through the LOCKFILE, to a different key. A
 *    nested key exists only where npm could not satisfy the dependency with the hoisted copy, so
 *    this says the link genuinely needs a different version than the one on disk.
 * 3. No other shipped, non-dev-linked package resolves that name to the hoisted key. If one does, the
 *    hoisted copy genuinely ships as well and an unlinked tree would carry BOTH - so both stay.
 *
 * A corrected package is marked `fromLock` (but not `devLinked`): its version and declaration come
 * from the lockfile, and nothing is read from its directory, because the directory holds the wrong
 * copy.
 *
 * What this does NOT do, stated plainly because "nothing is ADDED" makes it easy to assume
 * otherwise: it does not make the shipping set LINK-INVARIANT. Where condition 3 does not hold - no
 * other shipped package reaches the hoisted copy - a linked tree compiles one copy of that name and
 * an unlinked tree compiles TWO (the hoisted one and the nested one), so the unlinked tree's set
 * has an entry the linked tree's does not. The live pair is `@xmldom/xmldom` 0.8.13 and 0.9.10. CI
 * runs `postinstall`, so CI is linked and agrees with a linked developer; an UNLINKED developer
 * running the verify sees `added: @xmldom/xmldom@0.8.13` and must not simply regenerate over it -
 * that would commit the unlinked tree's set, and CI would then report the reverse. Unlinking is
 * therefore not a supported way to regenerate this artifact.
 */
function correctLinkDistortedResolutions(
  packages: ShippedPackage[],
  repo: string,
  readLock: () => LockIndex,
): ShippedPackage[] {
  const linked = packages.filter((pkg) => pkg.devLinked);
  if (!linked.length) return packages;

  const { lock } = readLock();
  const keyOf = (pkg: ShippedPackage) => lockKeyOf(pkg.dir, repo);
  // A link's LOCKFILE key, not its directory's: a link reported by its `.yalc` real path has no
  // lockfile key, and resolving its dependencies from `.yalc/...` would walk a tree npm never
  // wrote and find only the hoisted copy - silently skipping the correction this exists for.
  const linkedKeys = linked.flatMap((pkg) => {
    const linkedKey = pkg.lockKey || keyOf(pkg);
    return linkedKey ? [linkedKey] : [];
  });

  return packages.map((pkg) => {
    if (pkg.devLinked) return pkg;
    const key = keyOf(pkg);
    if (key !== `node_modules/${pkg.name}`) return pkg;

    const nested = [
      ...new Set(
        linkedKeys.flatMap((linkedKey) => {
          const resolved = resolveFromLock(lock, linkedKey, pkg.name);
          return resolved && resolved !== key ? [resolved] : [];
        }),
      ),
    ];
    if (!nested.length) return pkg;
    if (nested.length > 1)
      // Two links needing two different nested copies of one name has no single answer, and
      // guessing one would put a version nobody can reproduce into a legal document.
      throw new Error(
        `${pkg.name} resolves to more than one nested copy through the yalc dev links ` +
          `(${nested.join(', ')}), so which one the bundle would have used is ambiguous. ` +
          'Run: npm run unlink-dev-packages, then regenerate.',
      );

    // Third-party packages AND this repository's own, which is not a widening for tidiness: the
    // hoisted copy is reached by first-party source at least as often as by another dependency, and
    // scanning only `packages` made that reach invisible. Live case:
    // `extensions/src/platform-enhanced-resources` imports `@xmldom/xmldom` directly, resolving the
    // hoisted 0.8.13, which every extension web-view manifest records - while this correction
    // rewrote the row to the 0.9.10 the lockfile nests under a dev-linked package. The document
    // named a version the bundle does not contain, with no license text read from the copy that
    // does, and `--verify` agreed with itself throughout.
    //
    // First-party keys are the root (`''`) and the workspace directories, which are exactly the
    // lockfile keys that name no `node_modules` segment.
    const firstPartyKeys = Object.keys(lock.packages || {}).filter(
      (candidate) => !candidate.includes('node_modules/'),
    );
    const reachesHoisted = (fromKey: string) =>
      lockDependsOn(lock, fromKey, pkg.name) &&
      resolveFromLock(lock, lockEntry(lock, fromKey).dependsFrom, pkg.name) === key;
    const alsoReachedDirectly =
      packages.some((other) => {
        if (other === pkg || other.devLinked) return false;
        const otherKey = keyOf(other);
        return !!otherKey && reachesHoisted(otherKey);
      }) || firstPartyKeys.some(reachesHoisted);
    if (alsoReachedDirectly) return pkg;

    // `nested` has exactly one element here - the length checks above returned otherwise -
    // and the key came out of the lockfile, so the entry is present.
    const entry = (lock.packages || {})[nested[0]];
    if (!entry) return pkg;
    return {
      ...pkg,
      version: entry.version,
      fromLock: true,
      declaredField: declaredLicenseField(entry),
    };
  });
}

/**
 * Reads `package-lock.json` at most once, and only if something actually needs it.
 *
 * Lazy on purpose: a tree with no dev link never reads the lockfile at all, which keeps a repo
 * fixture that has no `package-lock.json` (every test fixture, and the degraded-environment cases)
 * failing on the thing under test rather than on a missing lockfile.
 */
function lockIndexReader(repo: string): () => LockIndex {
  let index: LockIndex | undefined;
  return () => {
    if (!index) index = readLockIndex(repo);
    return index;
  };
}

/**
 * How one resolved package directory is described: from `package-lock.json` when it is a `yalc` dev
 * link (see `DEV_LINK`), from its own manifest otherwise.
 *
 * `declaredField` is carried here only for a dev link, because that is the only case where the
 * declaration must NOT be read from the manifest on disk. Every other package's declaration is read
 * where every other reader expects it, from its own `package.json`.
 */
function describePackage(
  dir: string,
  repo: string,
  readLock: () => LockIndex,
  reachedVia: string[],
): ShippedPackage {
  const manifest = readJsonFile<PackageManifest>(
    path.join(dir, 'package.json'),
    "an installed package's manifest",
  );
  if (!isDevLinked(dir))
    return {
      ecosystem: 'npm',
      name: manifest.name,
      version: manifest.version,
      dir,
      reachedVia,
    };

  // `lockKeyOf` rather than an inlined `path.relative`: the two differ only by `containedPath`,
  // and that is the whole check. A directory resolving OUTSIDE the repository
  // yields a `../..`-shaped string that matches no lockfile key, misses `byPath` silently, and
  // falls through to the bare-name lookup - describing this link from whatever unrelated entry
  // happens to share its name, at that entry's version.
  const key = lockKeyOf(dir, repo);
  const { byPath, byName, keyByName } = readLock();
  const lockKeyOfName = (name: string) => keyByName.get(name);
  const entry = (key === undefined ? undefined : byPath.get(key)) || byName.get(manifest.name);
  if (!entry)
    throw new Error(
      `${manifest.name} resolves through a yalc dev link (${key ?? dir}), but package-lock.json ` +
        'pins no version for it - and a dev link is never described from the link itself, because ' +
        'that points at a moving branch of another repository. Run: npm install',
    );
  return {
    ecosystem: 'npm',
    name: manifest.name,
    version: entry.version,
    dir,
    reachedVia,
    devLinked: true,
    // Where this package's OWN dependencies resolve from in the lockfile, which is not derivable
    // from its directory: a link reported by its `.yalc` real path has no lockfile key at all, and
    // `.yalc/<name>/node_modules/...` is not a path npm ever writes.
    lockKey: key !== undefined && byPath.has(key) ? key : lockKeyOfName(manifest.name),
    // `fromLock` is the broader fact - described from package-lock.json, nothing read from the
    // directory - and `correctLinkDistortedResolutions` sets it on packages a link DISPLACED as
    // well as on the link itself. Readers that only care "was this read from disk?" use this one.
    fromLock: true,
    // From the lockfile too: reading the linked manifest would put the branch's own declaration
    // into the artifact, which is the thing this guard exists to keep out of it.
    declaredField: declaredLicenseField(entry),
  };
}

/**
 * True when a package.json is an actual package root, not a directory-scoped marker.
 *
 * Some packages drop a minimal package.json partway down their own tree purely to flip Node's
 * module-resolution algorithm for that subtree - `@babel/runtime/helpers/esm/package.json` is the
 * real, on-disk case this project bundles: its entire content is `{"type":"module"}`. That is not a
 * package boundary, so a `name` field (which every real npm package.json carries) is what
 * distinguishes it from one.
 */
const packageRootCache = new Map<string, boolean>();

function isPackageRoot(packageJsonPath: string): boolean {
  // Memoized because the same few hundred manifests are probed once per MODULE: a full run asked
  // this about 213 distinct files roughly 65,000 times, parsing 17,000 of them. The cache is keyed
  // by absolute path and lives for one process, which is exactly the lifetime of one derivation -
  // nothing rewrites a manifest mid-run.
  const cached = packageRootCache.get(packageJsonPath);
  if (cached !== undefined) return cached;

  let answer = false;
  if (fs.existsSync(packageJsonPath)) {
    // Loosely typed on purpose: this function's whole question is whether the manifest names a
    // package, so it cannot start from a shape that assumes one.
    const manifest = readJsonFile<{ name?: unknown }>(
      packageJsonPath,
      "an installed package's manifest",
    );
    answer = typeof manifest.name === 'string' && manifest.name.length > 0;
  }
  packageRootCache.set(packageJsonPath, answer);
  return answer;
}

/**
 * Directories that hold installed packages, laid out identically: `<container>/<name>` or
 * `<container>/@scope/<name>`.
 *
 * `.yalc` belongs here, and leaving it out is a silent under-report rather than a failure. webpack
 * resolves symlinks to their real path, so a package installed as a `node_modules` symlink into
 * `.yalc` is reported by its `.yalc` path - and a path with no `node_modules` segment reads as
 * FIRST-PARTY source, which is ignored without comment. That drops both dev-linked packages from
 * the document entirely: `@eten-tech-foundation/platform-editor` and
 * `@eten-tech-foundation/scripture-utilities`, which genuinely ship.
 */
const PACKAGE_CONTAINERS = ['node_modules', '.yalc'];

/**
 * The package directory a module path NAMES, from the path alone: the `<container>/<name>` (or
 * `<container>/@scope/<name>`) segment closest to the file.
 *
 * The LAST container in the path is the right one - for
 * `node_modules/outer/node_modules/inner/lib/x.js` the owner is `inner`, whose license applies to
 * that code, not `outer`.
 */
function packageBoundaryOf(resource: string): string | undefined {
  const segments = resource.split(path.sep);
  const marker = Math.max(...PACKAGE_CONTAINERS.map((name) => segments.lastIndexOf(name)));
  if (marker < 0) return undefined;
  const scoped = (segments[marker + 1] || '').startsWith('@');
  const depth = marker + (scoped ? 3 : 2);
  if (segments.length < depth) return undefined;
  return segments.slice(0, depth).join(path.sep);
}

/** Whether a path runs through a directory that holds installed packages. */
function isInstalledPath(resource: string): boolean {
  return PACKAGE_CONTAINERS.some((name) => resource.includes(`${path.sep}${name}${path.sep}`));
}

/**
 * Walks up from a module path to the package directory that owns it.
 *
 * Walks to the NEAREST enclosing package.json rather than parsing the path outright, so a package
 * that drops a resolution-scoped `package.json` partway down its own tree does not become a false
 * boundary (see `isPackageRoot` - `@babel/runtime/helpers/esm/package.json` is the real case).
 *
 * The walk STOPS at the package directory the path names (`packageBoundaryOf`), and that stop is
 * the difference between failing closed and failing open. Without it, a module under a package
 * directory that does not exist - a nested copy a `yalc` link took off disk, a pruned tree, a
 * lockfile-vs-tree mismatch in CI - keeps walking and is silently attributed to the ENCLOSING
 * package, which reports a real directory, resolves, and exits 0 with that package's modules
 * miscredited and the missing one absent from the document entirely. The shape to picture: sixteen
 * modules under
 * `node_modules/@eten-tech-foundation/scripture-utilities/node_modules/@xmldom/xmldom/` when that
 * directory is gone, all credited to `scripture-utilities`.
 *
 * Reaching the boundary with no readable `package.json` therefore returns `undefined`, which
 * `collectShippedPackages` treats as UNRESOLVED and throws on - the same answer it already gave for
 * a missing TOP-LEVEL package, where the walk simply ran out of path.
 *
 * @returns Undefined for first-party source outside node_modules, and for a module whose own
 *   package directory has no readable package.json.
 */
export function packageDirOf(resource: string, repo: string): string | undefined {
  if (!isInstalledPath(resource)) return undefined;

  const boundary = packageBoundaryOf(resource);
  // `containedPath` rather than `boundary.startsWith(repo)`: a plain prefix test also accepts a
  // SIBLING directory whose name merely starts with the repository's (`/src/paranext-core-2`
  // "starts with" `/src/paranext-core`), which would attribute another checkout's module to this
  // one. It is the tested helper the rest of this module already resolves lockfile keys with.
  if (!boundary || !containedPath(repo, boundary)) return undefined;

  // The BOUNDARY first, not the nearest manifest walking up. A `name` field does not distinguish a
  // package root from a resolution marker the way `isPackageRoot` assumes: this tree installs
  // `terser/dist/package.json` as `{"name":"dist","version":"1.0.0"}`,
  // `detect-port/dist/package.json` as `{"name":"detect-port","version":"2.1.0"}` and
  // `web-streams-polyfill/es2018/package.json` as `{"name":"web-streams-polyfill-es2018"}` with no
  // version at all. A module bundled from such a subdirectory produced a row named `dist@1.0.0`,
  // pointed licensee at a directory holding no LICENSE, and left the real package with no row.
  //
  // The path already names the owner unambiguously, so where that directory carries a manifest it
  // is the answer and no walk can improve on it. The walk below is kept for the case the boundary
  // itself cannot answer - a package directory taken off disk by a `yalc` link, a pruned tree - and
  // still stops AT the boundary, so a missing package is never attributed to the one enclosing it.
  if (isPackageRoot(path.join(boundary, 'package.json'))) return boundary;

  let dir = path.dirname(resource);
  while (dir === boundary || dir.startsWith(boundary + path.sep)) {
    if (isPackageRoot(path.join(dir, 'package.json'))) return dir;
    if (dir === boundary) break;
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return undefined;
}

// --- Stylesheet leaf scan -------------------------------------------------------------------
//
// stylesheetImportSpecifiers, packageOfSpecifier, MODULE_SPECIFIER and SOURCE_ALIAS below read
// STYLESHEET source, which webpack's module graph cannot answer for: extension stylesheets are
// processed by a standalone Tailwind CLI outside any webpack compilation. They are unprefixed
// because this file has no JS/TS-import counterpart to distinguish them from.

/**
 * A stylesheet's source with its comments removed, so prose cannot be read as an import.
 *
 * A commented-out or merely DESCRIBED import is not an import, but it is written in the same syntax
 * the scan matches - `// … but `@import 'something.css'` is passed through as a runtime CSS
 *
 * @import` is a sentence explaining sass-loader, not a dependency. The scan's outputs feed the
 * shipping set, so a specifier read out of prose that happens to name an installed package puts a
 * row into a legal document for something this repository does not redistribute.
 *
 * Strings are tracked because a comment marker inside one opens nothing, and `//` is only a
 * comment when it does not begin a URL scheme (`https://…`) or a protocol-relative `url(//…)`.
 */
function withoutStylesheetComments(text: string): string {
  let out = '';
  let index = 0;
  let urlDepth = 0;
  while (index < text.length) {
    const char = text[index];
    if (char === '"' || char === "'") {
      const start = index;
      index += 1;
      while (index < text.length && text[index] !== char) index += text[index] === '\\' ? 2 : 1;
      out += text.slice(start, index + 1);
      index += 1;
    } else if (char === '/' && text[index + 1] === '*') {
      const end = text.indexOf('*/', index + 2);
      index = end < 0 ? text.length : end + 2;
    } else if (char === '/' && text[index + 1] === '/' && urlDepth === 0 && out.at(-1) !== ':') {
      const end = text.indexOf('\n', index);
      index = end < 0 ? text.length : end;
    } else {
      if (char === '(' && /url\s*$/i.test(out)) urlDepth += 1;
      else if (char === ')' && urlDepth > 0) urlDepth -= 1;
      out += char;
      index += 1;
    }
  }
  return out;
}

/** A module specifier, as opposed to whatever else a quoted string in source may hold. */
const MODULE_SPECIFIER = /^(@[\w.-]+\/)?[\w.-]+(\/[\w.@-]+)*$/;
/** Path aliases declared in `tsconfig.json`; they name first-party source, never a package. */
const SOURCE_ALIAS = /^@(assets|client|main|node|extension-host|renderer|shared)\//;

/**
 * Specifiers a stylesheet pulls in: `@import`, `@use`, `@forward`, `url()`, and Tailwind v4's
 * `@plugin`, `@source` and `@config`.
 *
 * Stylesheets reach the bundle the same way modules do - a bare specifier in an `@import` resolves
 * through `node_modules`, fonts and all. A leading `~` is webpack's older "this is a module, not a
 * path" marker and is stripped.
 *
 * Tailwind v4's own at-rules resolve bare specifiers through `node_modules` exactly as `@import`
 * does, and a package reached through one ships its CSS into the bundle the same way - but it is
 * reached by NEITHER of this pipeline's other two sources, so matching `@import` alone is not
 * enough. `lib/platform-bible-react/src/index.css`'s `@plugin 'tailwindcss-scoped-preflight'` is
 * the live case: the package's generated CSS ships inside every bundle, and nothing else in this
 * pipeline would put it in the notices document or its lock, leaving its MIT copyright-notice
 * obligation undischarged. `@source` and `@config` name a local path today (`packageOfSpecifier`
 * discards those), and are matched for the same reason `@plugin` now is - the next one to name a
 * package must not be lost silently.
 *
 * `@forward` is matched for a stronger reason than symmetry: it emits a module's CSS exactly as
 * `@use` does, so a package reached only through one ships in every bundle, and this scan is the
 * only source in this pipeline that can see pre-webpack Sass resolution at all - it would reach
 * neither the module graph nor an `unresolvedStylesheetSpecifiers` note.
 *
 * EVERY quoted string in the statement is recorded, not the first: `@import 'a', 'b';` is one
 * statement naming two stylesheets, and reading only the head silently drops the rest. The
 * statement is bounded by `;` or `{` so a `@plugin` options block does not swallow the rest of the
 * file.
 */
function stylesheetImportSpecifiers(text: string): string[] {
  const source = withoutStylesheetComments(text);
  const specifiers: string[] = [];
  const record = (value: string | undefined) => {
    if (value) specifiers.push(value.replace(/^~/, '').split('?')[0]);
  };
  // Matched in two steps - the statement, then every quoted string inside it - because a single
  // pattern can capture only one specifier per match, and these at-rules may name several.
  [...source.matchAll(/@(?:import|use|forward|plugin|source|config)\b([^;{]*)/g)].forEach(
    (statement) =>
      [...statement[1].matchAll(/['"]([^'"\n]+)['"]/g)].forEach((quoted) => record(quoted[1])),
  );
  [...source.matchAll(/url\(\s*['"]?([^'")\n]+)['"]?\s*\)/g)].forEach((match) => record(match[1]));
  return specifiers.filter(Boolean);
}

/** The filenames Sass will load for a specifier, in the order it tries them. */
function sassCandidates(specifier: string): string[] {
  const dir = path.dirname(specifier);
  const base = path.basename(specifier);
  const stems = base.startsWith('_') ? [base] : [base, `_${base}`];
  const names = stems.flatMap((stem) =>
    path.extname(stem)
      ? [stem]
      : ['.scss', '.sass', '.css'].flatMap((ext) => [
          `${stem}${ext}`,
          path.join(stem, `index${ext}`),
          path.join(stem, `_index${ext}`),
        ]),
  );
  return names.map((name) => (dir === '.' ? name : path.join(dir, name)));
}

/**
 * Whether a stylesheet specifier names a file of this repository's own rather than a package.
 *
 * Sass resolves relative to the IMPORTING file before it consults any load path, and it does not
 * require a `./` to do so - `@use 'styles/vars'` in `src/renderer/app.component.scss` loads
 * `src/renderer/styles/_vars.scss`. Such a specifier is bare by `packageOfSpecifier`'s test and
 * resolves against no `node_modules`, so without this it is reported as an unresolved package on
 * every single run.
 *
 * That matters more than the one row it would never have added. `unresolvedStylesheetSpecifiers`
 * exists to surface a CSS-only package missing from the tree - a pruned font, lockfile-vs-tree
 * drift in CI - which is a real and otherwise invisible way this artifact ships short. A note that
 * always fires for a benign reason is a note nobody reads, and the day it names something real it
 * gets skipped with the rest.
 *
 * Discounting is the direction that could hide a package, so it is taken ONLY on evidence: a file
 * Sass would actually load has to exist on disk. Where one does, Sass loads it in preference to
 * anything on a load path, so the specifier cannot be reaching a package in that build either.
 */
function firstPartyStylesheetSpecifier(specifier: string, fromDir: string): boolean {
  return sassCandidates(specifier).some((candidate) => {
    const full = path.join(fromDir, candidate);
    return fs.existsSync(full) && fs.statSync(full).isFile();
  });
}

/** The package a module specifier names, or `undefined` when it names something else. */
function packageOfSpecifier(specifier: string): string | undefined {
  const bare = specifier.split('?')[0];
  // A relative or absolute specifier names first-party source, never a package. Tested before the
  // pattern below, which allows `.` inside a name (`lodash.merge`) and so would otherwise read
  // `./thing` as a package called `.`.
  if (bare.startsWith('.') || bare.startsWith('/')) return undefined;
  if (!MODULE_SPECIFIER.test(bare) || bare.startsWith('node:') || SOURCE_ALIAS.test(bare))
    return undefined;
  const segments = bare.split('/');
  const name = bare.startsWith('@') ? segments.slice(0, 2).join('/') : segments[0];
  return builtinModules.includes(name) ? undefined : name;
}

/** Every `<dir>/<child>/src` that exists, for a directory holding one source tree per child. */
function childSourceRoots(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return (
    fs
      .readdirSync(dir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => path.join(dir, entry.name, 'src'))
      // A child without a `src/` is not an error - `lib/papi-dts` is generated output with no source
      // tree - but every caller walks these roots, and a caller that forgot to filter crashed with a
      // bare unnamed ENOENT from inside a recursive `readdirSync`. Guarding the PARENT and leaving
      // each child to the caller put the same condition in two places and kept it in only one.
      .filter((root) => fs.existsSync(root))
  );
}

/**
 * The production source roots the module manifests cover, for the stylesheet scan to mirror.
 *
 * `lib/*` is in the list for the same reason `extensions/src/*` is, and leaving it out is a real
 * gap rather than a theoretical one. `lib/platform-bible-react/src/index.css` imports
 * `tailwindcss`, `tw-animate-css`, `shadcn/tailwind.css` and `@fontsource-variable/ibm-plex-sans`,
 * and Vite inlines the compiled CSS into `lib/platform-bible-react/dist/index.js` - a path with no
 * `node_modules` segment, so `packageDirOf` returns nothing for it and the module manifests cannot
 * see those packages either. Without this entry three of the four reach the document ONLY through
 * the ten extension `tailwind.css` files, which are marked in their own headers as copies of that
 * very file: a coincidence, not a mechanism. A new CSS or font package added where it naturally
 * belongs (in the component library the whole application styles itself from) would then ship
 * embedded in every bundle and appear nowhere in the notices, with the run exiting 0.
 *
 * The glob is deliberately wide: `lib/eslint-plugin-paranext` and `lib/browserslist-config-detect-
 * electron` are build-time tooling, so a stylesheet there would be over-reported. That is the safe
 * direction and a visible one (a new row in the committed artifact), unlike the under-report it
 * closes, and neither ships a stylesheet today.
 */
function productionStylesheetRoots(repo: string): string[] {
  const coreRoots = ['main', 'renderer', 'extension-host', 'shared', 'node', 'client'].map((name) =>
    path.join(repo, 'src', name),
  );
  // `childSourceRoots` filters its own output; this covers `coreRoots`, which is a fixed list.
  return [
    ...coreRoots,
    ...childSourceRoots(path.join(repo, 'extensions', 'src')),
    ...childSourceRoots(path.join(repo, 'lib')),
  ].filter((root) => fs.existsSync(root));
}

const STYLESHEET_FILE = /\.s?css$/i;

/** Every stylesheet under `dir`, recursing but never descending into a `node_modules`. */
function findStylesheets(dir: string, found: string[] = []): string[] {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    if (entry.name === 'node_modules') return;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) findStylesheets(full, found);
    else if (STYLESHEET_FILE.test(entry.name)) found.push(full);
  });
  return found;
}

/**
 * Resolves a bare specifier's package name to its directory, walking up from the importing
 * stylesheet's own directory the way Node's `require()` resolution does -
 * `<dir>/node_modules/<name>` at each ancestor, ending at `repo`'s own `node_modules`. This is a
 * LEAF resolution only: it finds where the package lives and stops there. `collectShippedPackages`
 * must never walk a stylesheet-reached package's own `dependencies` - what ships is that package's
 * CSS and the assets that CSS references (a typeface, a keyframe animation), not the toolchain that
 * built it. Walking `@import 'tailwindcss'` into its `dependencies` would incorporate roughly three
 * hundred build-only packages (esbuild, jiti, the PostCSS plugin chain) that never reach the
 * output
 *
 * - See `adr-notices-derived-from-what-ships`.
 *
 * Returns `undefined` when nothing resolves. This is deliberately NOT an error: unlike a webpack
 * module manifest (which only ever names a file the compiler actually resolved), a regex extraction
 * over raw stylesheet text has real, observed false positives in this repository - a specifier
 * `something.css` that is only the text of a code comment
 * (`extensions/src/platform-enhanced-resources/src/_er-tokens.scss`) is the surviving one. Such a
 * specifier must be silently ignored rather than treated as a degraded environment: it is collected
 * and reported as an informational note (see `collectShippedPackages`'s
 * `unresolvedStylesheetSpecifiers`), never thrown.
 *
 * A bare Sass import of first-party source (`@use 'styles/vars'`) does not reach here at all -
 * `firstPartyStylesheetSpecifier` discounts it on the evidence of the file Sass would load, so the
 * note keeps naming only things worth looking at.
 */
function resolvePackageLeaf(name: string, fromDir: string, repo: string): string | undefined {
  let dir = fromDir;
  // `containedPath` rather than `dir.startsWith(repo)` - see the matching note in `packageDirOf`.
  while (containedPath(repo, dir)) {
    const candidate = path.join(dir, 'node_modules', name);
    if (isPackageRoot(path.join(candidate, 'package.json'))) return candidate;
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return undefined;
}

/**
 * Every package a production stylesheet reaches through a bare `@import`, `@use`, `url()`, or one
 * of Tailwind v4's `@plugin`/`@source`/`@config` at-rules, as LEAF `{ dir, bundle }` pairs -
 * `bundle` is always the literal string `'stylesheet'`, a synthetic `reachedVia` tag (not a real
 * webpack bundle name) marking that this package was found by the stylesheet scan rather than a
 * webpack module manifest.
 *
 * Also returns every specifier name that looked like a real package reference (passed
 * `packageOfSpecifier`'s filtering) but did not resolve against any installed `node_modules`
 * directory - see `resolvePackageLeaf` for why that is surfaced rather than thrown or dropped.
 */
function collectStylesheetLeaves(repo: string): { leaves: Leaf[]; unresolvedNames: string[] } {
  const leaves: Leaf[] = [];
  const unresolvedNames = new Set<string>();
  const libReal = realPathOf(path.join(repo, 'lib'));
  productionStylesheetRoots(repo).forEach((root) => {
    findStylesheets(root).forEach((file) => {
      const text = fs.readFileSync(file, 'utf8');
      stylesheetImportSpecifiers(text).forEach((specifier) => {
        const name = packageOfSpecifier(specifier);
        if (!name) return;
        if (firstPartyStylesheetSpecifier(specifier, path.dirname(file))) return;
        const dir = resolvePackageLeaf(name, path.dirname(file), repo);
        // The same two guards `collectPrebuiltLibLeaves` applies, and for the same reasons: npm
        // installs a workspace package as a SYMLINK, so `@import 'platform-bible-react/dist/...'`
        // resolves to a path that looks like any other dependency until the link is followed, and
        // emitting it would report this repository's own AGPL code as a third-party notice. A
        // dev-linked package is described from `package-lock.json` rather than its on-disk
        // directory, so adding it here would key a second lock entry to the very directory that
        // policy exists to avoid. `firstPartyStylesheetSpecifier` above is a different test - it
        // catches a bare Sass specifier that names a file of this repository's own, not an
        // installed directory that turns out to be first-party.
        if (dir && !containedPath(libReal, realPathOf(dir)) && !isDevLinked(dir))
          leaves.push({ dir, bundle: 'stylesheet' });
        else if (!dir) unresolvedNames.add(name);
      });
    });
  });
  return { leaves, unresolvedNames: [...unresolvedNames].sort() };
}

/** Source files whose imports a `lib/*` package bundles into its own published output. */
const PREBUILT_SOURCE_FILE = /\.(?:m|c)?[jt]sx?$/;

/**
 * Every such file under `dir`, recursing but never descending into a `node_modules` - or into a
 * `stories` directory, whose contents are not part of the published bundle.
 */
function findPrebuiltSources(dir: string, found: string[] = []): string[] {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    if (entry.name === 'node_modules' || entry.name === 'stories') return;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) findPrebuiltSources(full, found);
    else if (PREBUILT_SOURCE_FILE.test(entry.name) && !/\.(?:test|spec|stories)\./.test(entry.name))
      found.push(full);
  });
  return found;
}

/** The TypeScript dialect a source file is parsed as, from its extension. */
function scriptKindOf(file: string): ts.ScriptKind {
  if (file.endsWith('.tsx')) return ts.ScriptKind.TSX;
  if (file.endsWith('.jsx')) return ts.ScriptKind.JSX;
  if (/\.(?:m|c)?js$/.test(file)) return ts.ScriptKind.JS;
  return ts.ScriptKind.TS;
}

/**
 * Every module specifier a source file pulls in AT RUNTIME.
 *
 * Parsed with TypeScript's own parser rather than matched with a regular expression, and the reason
 * is the one this module keeps running into: a regex over source text has to encode a guess about
 * what a statement looks like, and every guess it encodes is wrong for some ordinary shape.
 *
 * The obvious pattern - `(?:^|[^\w.])(?:import|export)[\s\S]{0,4000}?from\s*['"]…['"]` - fails two
 * ways, both live in this tree rather than hypothetical:
 *
 * - The clause window CROSSES statement boundaries. On `import 'polyfill';\nimport React from
 *   'react';` the whole thing is one match capturing `react`, so the side-effect import - the
 *   ordinary way a polyfill or a stylesheet enters a bundle, and the exact shape the second
 *   alternative exists to catch - can never be reached.
 * - The start anchor `[^\w.]` matches INSIDE a word, so a hyphenated word in a comment begins a
 *   match. Nine matches in the scanned sources start that way today, and one of them swallows the
 *   `export type { Usj } from '@eten-tech-foundation/scripture-utilities'` two lines below a
 *   comment reading `// Re-exported so consumers can type the argument…` - recording a type-only
 *   re-export as a runtime dependency of `platform-bible-utils`.
 *
 * Comments, template literals, string contents and the exact placement of `type` are the parser's
 * problem now, not this file's. The 4,000-character clause window goes with them: it existed only
 * to bound how far a text scan would run, and a parsed statement has no such need.
 *
 * TYPE-ONLY statements are skipped, because the compiler erases them and counting one would report
 * a build-time package as shipping. Only a WHOLLY type-only statement (`import type { … }`, `export
 * type { … } from`), which is what `isTypeOnly` reports: `import { type A, b }` still brings `b` in
 * at runtime, so it counts.
 */
function runtimeModuleSpecifiers(text: string, file: string): string[] {
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, false, scriptKindOf(file));
  const specifiers: string[] = [];
  const literalText = (node: ts.Node | undefined) =>
    node && ts.isStringLiteralLike(node) ? node.text : undefined;

  const visit = (node: ts.Node): void => {
    if (ts.isImportDeclaration(node)) {
      // No import clause at all is a SIDE-EFFECT import (`import 'polyfill'`), which is the one
      // shape that puts a package in the bundle and names it nowhere else.
      if (!node.importClause?.isTypeOnly) specifiers.push(literalText(node.moduleSpecifier) ?? '');
    } else if (ts.isExportDeclaration(node)) {
      if (!node.isTypeOnly) specifiers.push(literalText(node.moduleSpecifier) ?? '');
    } else if (
      ts.isImportEqualsDeclaration(node) &&
      ts.isExternalModuleReference(node.moduleReference)
    ) {
      specifiers.push(literalText(node.moduleReference.expression) ?? '');
    } else if (ts.isCallExpression(node)) {
      // `require('x')` and dynamic `import('x')`. A non-literal argument names no package that can
      // be resolved here, and `literalText` returns undefined for it.
      const isRequire = ts.isIdentifier(node.expression) && node.expression.text === 'require';
      const isDynamicImport = node.expression.kind === ts.SyntaxKind.ImportKeyword;
      if (isRequire || isDynamicImport) specifiers.push(literalText(node.arguments[0]) ?? '');
    }
    ts.forEachChild(node, visit);
  };
  visit(source);

  return specifiers.filter(Boolean);
}

/**
 * Every package a PREBUILT `lib/*` package inlines into its own published bundle.
 *
 * Webpack's module graph cannot see these. `lib/platform-bible-react` resolves to `dist/index.js`
 * (its `exports`/`module` entry), which vite has already flattened - so whatever vite INLINED is
 * one file to webpack, and its own dependencies are gone as separate modules. Vite externalizes
 * only `peerDependencies` and `dependencies`, so anything imported from production source that sits
 * in `devDependencies` is inlined: 44 of `platform-bible-react`'s devDependencies are outside its
 * externals list today. The stylesheet scan compensates for the same blind spot on the CSS side
 * only, so without this scan a runtime devDependency shipped inside `dist/index.js` appears in
 * neither the document nor its lock.
 *
 * Scoped to the `lib/*` packages the module manifests show actually compiling into a bundle, which
 * `collectShippedPackages` collects while it reads them and passes in as `shippedLibNames`. That is
 * the same evidence the rest of this file rests on: webpack resolves the workspace symlink, so a
 * `lib/*` package consumed at runtime appears in a manifest under its real `lib/<name>/dist/…`
 * path. The build-time packages (`eslint-plugin-paranext`, `browserslist-config-detect-electron`,
 * `papi-dts`) appear in no manifest, and scanning them would put lint and Storybook tooling into a
 * document about what ships - not a safe direction, a wrong one.
 *
 * Selecting them by `license === 'MIT'` instead used the license as a proxy for "ships at runtime".
 * The two coincide today because LICENSING.md draws the carve-out at runtime linkage, but they are
 * not the same fact, and tying one to the other means RELICENSING a package silently stops this
 * scan covering it - taking dozens of vite-inlined dependencies out of the document with it, in a
 * repository that has just moved three of five `lib/` packages across that boundary.
 *
 * First-party packages are dropped from the RESULT for a different reason: `platform-bible-react`
 * imports `platform-bible-utils`, and a workspace package of this repository is not a third-party
 * notice.
 *
 * A specifier that IS externalized also reaches webpack's graph, so it is already in the set and
 * dedupes away by directory. Test, spec and story files are skipped - they are not published.
 */
function collectPrebuiltLibLeaves(
  repo: string,
  shippedLibNames: Set<string>,
): { leaves: Leaf[]; unresolvedNames: string[] } {
  const leaves: Leaf[] = [];
  const unresolvedNames = new Set<string>();
  const libReal = realPathOf(path.join(repo, 'lib'));
  const shipped = childSourceRoots(path.join(repo, 'lib')).filter((root) =>
    shippedLibNames.has(path.basename(path.dirname(root))),
  );
  shipped.forEach((root) => {
    findPrebuiltSources(root).forEach((file) => {
      const text = fs.readFileSync(file, 'utf8');
      runtimeModuleSpecifiers(text, file).forEach((specifier) => {
        const name = packageOfSpecifier(specifier);
        if (!name) return;
        const dir = resolvePackageLeaf(name, path.dirname(file), repo);
        // A first-party workspace package is not a third-party notice - and it has to be tested
        // through `realPathOf`, because npm installs a workspace package as a SYMLINK:
        // `node_modules/platform-bible-utils` points at `lib/platform-bible-utils`, so the resolved
        // path looks like any other installed dependency until the link is followed.
        // A dev-linked package is deliberately described from `package-lock.json` and never from
        // its on-disk directory, and it already reaches the set through the module graph. Adding it
        // here would key it by a SECOND directory - webpack reports the resolved `.yalc/...` real
        // path while this resolves the `node_modules` symlink - putting two entries in the lock for
        // one package, the second described from the very directory that policy exists to avoid.
        // Both sides of the test have to be REAL paths. `realPathOf` follows the workspace
        // symlink, so the `lib/` root it is measured against has to be followed too: where the
        // repository itself is reached through a symlink - macOS `/var` -> `/private/var`, a
        // symlinked worktree - a repo-spelled root contains no real path at all, and every
        // first-party package reads as third-party. `inRepoSpelling` carries the same caution for
        // the module-graph side.
        if (dir && !containedPath(libReal, realPathOf(dir)) && !isDevLinked(dir))
          leaves.push({ dir, bundle: 'prebuilt-lib' });
        else if (!dir) unresolvedNames.add(name);
      });
    });
  });
  return { leaves, unresolvedNames: [...unresolvedNames].sort() };
}

/** What one pass over the module manifests accumulates. */
type ManifestScan = {
  /** Installed-package directory -> the bundles that compiled a module out of it. */
  byDir: Map<string, Set<string>>;
  /** Module paths under `node_modules` whose package directory could not be read. */
  unresolved: Set<string>;
  /** Build id -> the bundles stamped with it. */
  stamps: Map<string, string[]>;
  /** Webpack mode -> the required bundles compiled in it. */
  modes: Map<string, string[]>;
  /** Bundles whose manifest was written against a warm webpack filesystem cache. */
  warmBundles: string[];
  /** The `lib/*` workspace packages webpack compiled into a bundle. */
  shippedLibNames: Set<string>;
};

/**
 * The module manifests in `manifestDir`, refused unless every required bundle is present and
 * carries a non-empty module list.
 */
function readManifestFiles(manifestDir: string, requiredBundles: string[]): string[] {
  const files = fs.existsSync(manifestDir)
    ? fs.readdirSync(manifestDir).filter((f) => f.endsWith('.json'))
    : [];

  if (files.length === 0)
    throw new Error(
      `no module manifests in ${manifestDir}. The notices generator reads what webpack compiled, ` +
        'so a production build must run first: npm run build',
    );

  const missingBundles = requiredBundles
    .filter((bundle) => !files.includes(`${bundle}.json`))
    .sort(compareStrings);
  if (missingBundles.length)
    throw new Error(
      `${manifestDir} is missing the manifest for ${missingBundles.join(', ')}. Every bundle the ` +
        'application ships has to be represented, or the shipping set is silently short by ' +
        'whatever only that bundle reaches.\nRun: npm run build',
    );

  // A manifest that is PRESENT AND EMPTY is the same silent under-report as one that is absent:
  // empty `modules` in `renderer.json` and the real command writes a 190-package artifact and exits
  // 0. Every bundle this application ships compiles at least dozens of modules (the smallest,
  // `extension-main`, is 93; the largest, `renderer`, is 8,568), so zero means the plugin did not
  // observe the compilation - never that the bundle genuinely contains nothing. Checked for the
  // REQUIRED bundles only, for the same reason the check above is: a fixture may legitimately
  // declare a bundle with nothing in it.
  const emptyBundles = requiredBundles
    .filter((bundle) => {
      const { modules } = readJsonFile<ModuleManifest>(
        path.join(manifestDir, `${bundle}.json`),
        'a webpack module manifest',
      );
      return !Array.isArray(modules) || modules.length === 0;
    })
    .sort(compareStrings);
  if (emptyBundles.length)
    throw new Error(
      `${manifestDir} has an empty module list for ${emptyBundles.join(', ')}. A bundle that ` +
        'compiled nothing did not compile: the manifest was written without the plugin observing ' +
        'the compilation, so the shipping set is short by everything that bundle reaches.\n' +
        'Run: rm -rf .notices && npm run build',
    );

  return files;
}

/**
 * Reads every manifest in the directory into one accumulated view of what the bundles compiled, and
 * of what each manifest says about the build that wrote it.
 */
function readModuleManifests({
  files,
  manifestDir,
  repo,
  requiredBundles,
}: {
  files: string[];
  manifestDir: string;
  repo: string;
  requiredBundles: string[];
}): ManifestScan {
  const byDir = new Map<string, Set<string>>();
  const unresolved = new Set<string>();
  const stamps = new Map<string, string[]>();
  const modes = new Map<string, string[]>();
  const warmBundles: string[] = [];
  // Which `lib/*` packages webpack actually compiled into a bundle. Their modules resolve to a real
  // `lib/<name>/…` path (npm installs a workspace package as a symlink, and webpack reports the
  // target), so they are invisible to `packageDirOf` - which is right, they are first-party - but
  // they are the direct evidence of which prebuilt bundles ship. See `collectPrebuiltLibLeaves`.
  const shippedLibNames = new Set<string>();
  const libRoot = path.join(repo, 'lib');

  // Resolved once: every module path the manifests carry is respelled against this, so a repository
  // reached through a symlink is not read as a tree of modules that live outside itself.
  const repoReal = realPathOf(repo);

  files.forEach((file) => {
    const { bundle, buildId, mode, cacheWarm, modules } = readJsonFile<ModuleManifest>(
      path.join(manifestDir, file),
      'a webpack module manifest',
    );
    // The `Array.isArray` guard above covers the REQUIRED bundles only, while this loop reads every
    // `*.json` in the directory. `.notices/` is gitignored, and only `npm run package` clears it
    // (see `clean.ts`) - an ordinary build does not - so a bundle renamed in a later commit leaves
    // its old manifest behind indefinitely, and any file here that is not a manifest reaches this
    // line. Unguarded, that surfaces as a bare `TypeError: modules.forEach is not a function`
    // naming no file, in a pipeline where every other failure names the file and the command that
    // repairs it.
    if (!Array.isArray(modules))
      throw new Error(
        `${path.join(manifestDir, file)} has no "modules" array, so it is not a webpack module ` +
          'manifest. Stale manifests are not cleaned up automatically; delete it if the bundle it ' +
          'names no longer exists.\n' +
          'Run: rm -rf .notices && npm run build',
      );
    // A manifest with no stamp predates the stamping and cannot be placed in any build, so it is
    // recorded under its own name rather than sharing an "unstamped" bucket with other unstamped
    // manifests - two manifests that each fail to say which build they came from are not evidence
    // that they came from the SAME one.
    // Only the REQUIRED bundles are placed on the mode check: a fixture manifest, or one left
    // behind by a renamed bundle, says nothing about what the application is compiled as.
    if (requiredBundles.includes(bundle))
      modes.set(mode || 'unrecorded', [...(modes.get(mode || 'unrecorded') || []), bundle]);
    stamps.set(buildId || `unstamped:${bundle}`, [
      ...(stamps.get(buildId || `unstamped:${bundle}`) || []),
      bundle,
    ]);
    if (cacheWarm) warmBundles.push(bundle);
    modules.forEach((rawResource) => {
      const resource = inRepoSpelling(rawResource, repo, repoReal);
      const inLib = containedPath(libRoot, resource);
      if (inLib) shippedLibNames.add(path.relative(libRoot, inLib).split(path.sep)[0]);
      const dir = packageDirOf(resource, repo);
      if (!dir) {
        // First-party source is expected and ignored. A path under an installed-package directory
        // with no readable package.json is not: it means a degraded tree, which must never quietly
        // shrink the document.
        if (isInstalledPath(resource)) unresolved.add(resource);
        return;
      }
      const bundles = byDir.get(dir) ?? new Set<string>();
      byDir.set(dir, bundles);
      bundles.add(bundle);
    });
  });

  return { byDir, unresolved, stamps, modes, warmBundles, shippedLibNames };
}

/**
 * Orders the warm bundles, and under `'throw'` refuses to derive anything from them.
 *
 * A build served from a warm persistent webpack cache can under-report: a module webpack restores
 * from cache does not re-run its loader, and a loader that injects new modules AS PART OF running
 * (css-loader emitting require()s for its own runtime helpers) never gets the chance to add them on
 * a cache hit - so `finishModules` sees fewer modules than the bundle actually contains, silently.
 * Measured directly (see `emit-shipped-modules-plugin.ts` `isWarmFilesystemCache`): a warm
 * `webpack-renderer` cache dropped 3 modules from the manifest while the emitted bundle still
 * shipped them.
 *
 * The refusal is about the MANIFEST, never about the build: a warm rebuild compiles and emits
 * exactly as it always did, and `cacheWarm` is a stamp the compiler writes beside it. Ordinary
 * local rebuilds are therefore unaffected; what refuses is deriving a legal document from a
 * manifest whose module list cannot be trusted.
 *
 * It reaches CI as well as a developer's tree. `npm ci` wipes `node_modules`, so a CI job's first
 * build is cold - but a release job builds twice from one commit (development extensions, then
 * production ones), and each extension bundle caches per bundle AND per mode
 * (`extensionCacheDirectory`) precisely so the second build is the first to touch its own
 * directories. Without that split, the production build inherits the development build's cache and
 * the per-platform check can only run BEFORE it, verifying a graph the job does not ship.
 */
function refuseWarmCacheManifests(warmBundles: string[], warmCache: 'throw' | 'report'): void {
  warmBundles.sort(compareStrings);
  if (warmBundles.length && warmCache === 'throw') {
    throw new Error(
      `${warmBundles.join(', ')} ${warmBundles.length === 1 ? 'was' : 'were'} ` +
        'built against a warm webpack filesystem cache, which can under-report modules that were ' +
        'served from cache instead of rebuilt - the emitted bundle still contains them, but this ' +
        "manifest may not. A cached build's module list cannot be trusted for a legal artifact.\n" +
        'Delete the cache and rebuild: rm -rf node_modules/.cache/webpack-* && npm run build',
    );
  }
}

/**
 * Refuses a manifest set that is not one whole, current build: mixed vintages, mixed webpack modes,
 * a stamp older than the last build to start, or a module tree that could not be read.
 */
function assertOneBuildGraph({
  manifestDir,
  stamps,
  modes,
  unresolved,
}: {
  manifestDir: string;
  stamps: Map<string, string[]>;
  modes: Map<string, string[]>;
  unresolved: Set<string>;
}): void {
  // A set of MIXED VINTAGE is a silent under-report: a stale manifest names modules that are gone,
  // or misses ones that are now there, and either way the document comes out shorter or wrong while
  // the build exits 0. This repository shipped exactly that state - two extension manifests hours
  // older than the three core ones, still naming sixteen modules under a `node_modules` directory a
  // `yalc` refresh had removed. `prebuild` mints one id per `npm run build` and every manifest
  // carries it (see `.erb/scripts/notices-build-id.ts`), so disagreement means a partial build.
  if (stamps.size > 1) {
    const vintages = [...stamps.entries()]
      .map(([id, bundles]) => `  ${bundles.sort(compareStrings).join(', ')}: ${id}`)
      .join('\n');
    throw new Error(
      `the module manifests in ${manifestDir} come from ${stamps.size} different builds:\n` +
        `${vintages}\n` +
        'A manifest from an earlier build names modules that may no longer exist, which would ' +
        'silently\nshorten the notices document. Rebuild them all: npm run build',
    );
  }

  // The graph the application is compiled as has to be ONE graph. `npm run build` compiles main,
  // renderer and extension-host with `NODE_ENV=production` but its extensions leg sets no
  // `NODE_ENV` at all, so it leaves a set of five manifests describing two different compilations -
  // and every job that packages an installer then runs `npm run build:extensions:production`, which
  // overwrites the two extension manifests with the graph it actually ships. The build id cannot
  // tell those apart (`prebuild` fires only for the root `build`, so the production run re-stamps
  // the same id), which is why the mode is recorded and checked: whatever the notices document is
  // derived from has to be the thing the installer carries, and "these agree" must not be satisfied
  // by a set that is half of one build and half of another.
  if (modes.size > 1) {
    const split = [...modes.entries()]
      .sort(([a], [b]) => compareStrings(a, b))
      .map(([mode, bundles]) => `  ${bundles.sort(compareStrings).join(', ')}: ${mode}`)
      .join('\n');
    throw new Error(
      `the module manifests in ${manifestDir} describe ${modes.size} different webpack modes:\n` +
        `${split}\n` +
        'A notices document derived from a mixed set describes neither graph. Build the ' +
        'extensions the way the installers ship them:\n' +
        '    npm run build && npm run build:extensions:production',
    );
  }

  // Agreeing with EACH OTHER is not the same as being current. `prebuild` mints the id before any
  // webpack starts, so a `npm run build` that dies early - `concurrently --kill-others-on-fail`
  // stopping the others when one leg fails - leaves a NEW id in `.notices/build-id` beside a
  // complete set of manifests all still carrying the PREVIOUS one. Every check above passes: five
  // files, none empty, one stamp, cache cold. The document would then be written from the graph of
  // a build that has since been superseded and failed, with the run exiting 0. Comparing the set's
  // stamp to the id on disk is what tells those two apart.
  const [manifestStamp] = [...stamps.keys()];
  const currentBuildId = readBuildId(manifestDir);
  if (manifestStamp && currentBuildId && manifestStamp !== currentBuildId)
    throw new Error(
      `the module manifests in ${manifestDir} were written by build ${manifestStamp}, but the ` +
        `last build to start was ${currentBuildId}.\nA build minted that id and then did not ` +
        'write these manifests, so they describe an earlier module graph.\nRebuild: npm run build',
    );

  if (unresolved.size > 0)
    throw new Error(
      `${unresolved.size} bundled module(s) under node_modules have no readable package.json:\n` +
        `${[...unresolved].slice(0, 10).join('\n')}\n` +
        'The dependency tree is incomplete. Run: npm ci && npm run build',
    );
}

/**
 * Unions the stylesheet and prebuilt-lib leaf scans into the directories the module graph reached.
 *
 * @returns The specifiers those scans resolved to no installed package.
 */
function addLeafScannedPackages(
  byDir: Map<string, Set<string>>,
  repo: string,
  shippedLibNames: Set<string>,
): string[] {
  // Union in the stylesheet leaf scan (see module docstring for why the module graph alone misses
  // these) - as LEAVES, so a package reached only through CSS never pulls its own dependencies in.
  // Both compensating scans, for the two things webpack's graph cannot see through: a stylesheet
  // pipeline that never enters a webpack compilation, and a `lib/*` package consumed as its own
  // prebuilt bundle. Same LEAF treatment for the same reason.
  const stylesheet = collectStylesheetLeaves(repo);
  const prebuiltLib = collectPrebuiltLibLeaves(repo, shippedLibNames);
  const leaves = [...stylesheet.leaves, ...prebuiltLib.leaves];
  const unresolvedNames = [
    ...new Set([...stylesheet.unresolvedNames, ...prebuiltLib.unresolvedNames]),
  ].sort();
  leaves.forEach(({ dir, bundle }) => {
    const bundles = byDir.get(dir) ?? new Set<string>();
    byDir.set(dir, bundles);
    bundles.add(bundle);
  });

  return unresolvedNames;
}

/** Describes every reached directory as a package, with the lockfile in hand to correct it. */
function describeShippedPackages(byDir: Map<string, Set<string>>, repo: string): ShippedPackage[] {
  const readLock = lockIndexReader(repo);
  // Ordered with the byte comparators, not `localeCompare`: ICU collation depends on the machine's
  // locale and on the ICU version Node was built against, and `localeCompare` additionally orders
  // `'10.0.0'` before `'9.0.0'` as text. `render.ts` and `lock.ts` re-sort with these same
  // comparators before anything reaches a committed byte, so the artifact does not rest on this
  // ordering - but a module in a pipeline whose whole premise is byte-reproducible output should
  // not carry the ordering primitive `compare.ts` exists to replace.
  const packages = correctLinkDistortedResolutions(
    [...byDir.entries()].map(([dir, bundles]) =>
      describePackage(dir, repo, readLock, [...bundles].sort()),
    ),
    repo,
    readLock,
  ).sort(compareByNameThenVersion);

  return packages;
}

/** The described packages, unioned with `release/app`'s own unbundled closure. */
function withUnbundledPackages(
  packages: ShippedPackage[],
  repo: string,
  requireUnbundledClosure: boolean,
): ShippedPackage[] {
  // Union in release/app's own unbundled closure, keyed by directory like the sources above, so a
  // package this and an earlier source both reach (a currently-hypothetical case: release/app has
  // no dependencies today) merges its reachedVia tags instead of duplicating the entry.
  const byDirFinal = new Map(packages.map((pkg) => [pkg.dir, pkg]));
  collectUnbundledPackages(repo, { required: requireUnbundledClosure }).forEach((pkg) => {
    const existing = byDirFinal.get(pkg.dir);
    if (existing)
      existing.reachedVia = [...new Set([...existing.reachedVia, ...pkg.reachedVia])].sort();
    else byDirFinal.set(pkg.dir, pkg);
  });

  return [...byDirFinal.values()].sort(compareByNameThenVersion);
}

/**
 * Resolves which npm packages ship, from webpack's own module manifests, unioned with the three
 * scans the module graph cannot answer for: the stylesheet leaf scan, the prebuilt-`lib` leaf scan,
 * and the `release/app` unbundled closure above.
 *
 * A regex scan over source files is the right instinct - a `package.json` lies about what a bundler
 * includes - but for JS/TS it infers something the compiler already reports exactly. Stylesheets
 * are the one part such a scan covers that the module graph cannot fully replace - see the module
 * docstring.
 *
 * `warmCache` decides what a warm-cache stamp does here - see the refusal below for what it means.
 * `'throw'` is the default and the only setting under which an ARTIFACT is written; `'report'`
 * returns the warm bundles instead, for a caller whose own answer to "this build cannot be checked"
 * is to say so and stop rather than to fail.
 */
export function collectShippedPackages({
  manifestDir,
  repo,
  requiredBundles = [],
  requireUnbundledClosure = false,
  warmCache = 'throw',
}: {
  manifestDir: string;
  repo: string;
  requiredBundles?: string[];
  requireUnbundledClosure?: boolean;
  warmCache?: 'throw' | 'report';
}): {
  packages: ShippedPackage[];
  unresolvedStylesheetSpecifiers: string[];
  warmBundles: string[];
} {
  const files = readManifestFiles(manifestDir, requiredBundles);

  const { byDir, unresolved, stamps, modes, warmBundles, shippedLibNames } = readModuleManifests({
    files,
    manifestDir,
    repo,
    requiredBundles,
  });

  refuseWarmCacheManifests(warmBundles, warmCache);
  assertOneBuildGraph({ manifestDir, stamps, modes, unresolved });

  const unresolvedNames = addLeafScannedPackages(byDir, repo, shippedLibNames);

  return {
    packages: withUnbundledPackages(
      describeShippedPackages(byDir, repo),
      repo,
      requireUnbundledClosure,
    ),
    unresolvedStylesheetSpecifiers: unresolvedNames,
    warmBundles,
  };
}

/**
 * The packages npm installs only on ANOTHER platform, described from `package-lock.json`.
 *
 * Npm honours a package's `os`/`cpu` constraints, so a platform-restricted optional dependency is
 * absent from the tree everywhere else - and this artifact is generated on Linux. The macOS
 * installer redistributes `fsevents`, which `chokidar` pulls into the `main` and `extension-host`
 * bundles there and which npm never installs on Linux or Windows: nothing a Linux run can observe
 * reaches it, so without this the document is complete for the Linux artifact and short for the
 * macOS one, and the per-platform check fails on macOS with an `added:` nothing can resolve.
 *
 * This is the npm counterpart of the NuGet half's four-RID union
 * (`adr-notices-derived-from-what-ships`) and of its `alwaysList` overrides: describe what every
 * published platform ships, from Linux. The names are listed in `notices-policy.json` rather than
 * derived, because "which optional dependency actually reaches a bundle on another platform" cannot
 * be answered from this one - a derivation would either take every declared optional edge (listing
 * packages no bundle imports) or miss them entirely. A name that starts shipping and is not listed
 * is not silent: it fails that platform's leg with `added: <name>`, which is the loud direction.
 *
 * Described like a dev link - `fromLock`, `inspected: false` - because that is literally the
 * situation: the version and the declaration come from the lockfile, and no directory is read.
 *
 * @param names Bare package names, from the policy.
 */
export function collectPlatformOnlyPackages(repo: string, names: string[]): ShippedPackage[] {
  if (!names.length) return [];
  const { byName } = readLockIndex(repo);
  return names.map((name) => {
    const entry = byName.get(name);
    if (!entry)
      throw new Error(
        `the notices policy lists "${name}" as a platform-only package, but package-lock.json ` +
          'records no entry for it. Either the dependency is gone - remove the entry - or the ' +
          'lockfile is stale.\nRun: npm ci',
      );
    // A package with no `os`/`cpu` constraint installs everywhere, so this platform's own tree is
    // the authority on whether it ships, and listing it here would put a row into the document that
    // nothing observed. This list is for what this platform CANNOT see, and nothing else.
    if (!entry.os && !entry.cpu)
      throw new Error(
        `the notices policy lists "${name}" as a platform-only package, but package-lock.json ` +
          'records no os/cpu constraint for it, so npm installs it everywhere. A package this ' +
          'platform installs belongs in the shipping set through the module graph, not here.',
      );
    return {
      ecosystem: 'npm',
      name,
      version: entry.version,
      // No directory of it exists here; this is the path npm would install it to.
      dir: path.join(repo, 'node_modules', ...name.split('/')),
      reachedVia: [`platform-only:${(entry.os || entry.cpu || []).join(',')}`],
      fromLock: true,
      platformOnly: true,
      inspected: false,
      declaredField: declaredLicenseField(entry),
    };
  });
}

/**
 * The `release/app` unbundled npm CLOSURE, as full `ShippedPackage` entries tagged `reachedVia:
 * ['release/app']`.
 *
 * Electron-builder packs from `release/app` (`directories.app` in `electron-builder.json5`), so
 * this is the npm closure that genuinely ships alongside the webpack output rather than through it.
 * A native module that cannot survive being webpacked is declared here, which is this path's stated
 * purpose - and a native module never arrives alone. `node-gyp`-built packages bring `bindings`,
 * `node-addon-api`, `prebuild-install` and their trees, and electron-builder packs every one of
 * them; reading only the DIRECT `dependencies` would list the native module and silently omit
 * everything it depends on, in a document whose characteristic failure is exactly that. Empty today
 * (`release/app/package.json` declares no `dependencies`), so the correctness of the walk is pinned
 * by fixtures rather than by the live tree.
 *
 * `release/app` keeps its own, separate installation - `release/app/node_modules` and its own
 * `package-lock.json`, not hoisted into the repo root's tree (see
 * `.erb/scripts/check-native-dep.js` and the `rebuild`/`postinstall` scripts in
 * `release/app/package.json`). So the closure is walked over THAT lockfile, whose keys are install
 * paths relative to `release/app` and therefore also the directories to read, using the same
 * `lockEntry`/`resolveFromLock` helpers the bundled half uses against the root lockfile. Walking
 * the lockfile rather than the directory tree is what makes a nested copy at a different version
 * resolve to the copy that importer actually gets.
 *
 * `dependencies` and `optionalDependencies` are followed; `devDependencies` are not, because
 * electron-builder does not pack them, and neither are `peerDependencies`, which name a constraint
 * on what the consumer supplies rather than an edge in the packed tree - whatever satisfies one is
 * reached through a real `dependencies` edge from something else, or is not there at all.
 *
 * Throws if any reached package is not actually installed: unlike a stylesheet's regex extraction
 * (a heuristic with real, observed false positives - see `resolvePackageLeaf`), a lockfile edge is
 * an exact statement about what npm installed, so a name that fails to resolve here means the
 * `release/app` install is genuinely incomplete - the same class of problem the module-manifest
 * half already fails closed on. A `release/app` that declares NOTHING never reaches any of that:
 * the empty case returns `[]` without requiring the install to exist at all, which matters because
 * `release/app`'s install is a separate step many checkouts have never run.
 *
 * A MISSING `release/app/package.json` is the one thing this cannot read past, and the real
 * application always has one: `electron-builder.json5` points `directories.app` at it, so a
 * checkout without it does not package at all. `required` is therefore set by the call that
 * describes the real application (`main.ts`), exactly as `requiredBundles` and `assertNpmFloor`
 * are, while a fixture repo that has no `release/app` stays a usable fixture. Without it this is
 * the only union source that can contribute nothing for a reason nobody would see - every other
 * source either throws or has a floor.
 */
export function collectUnbundledPackages(
  repo: string,
  { required = false }: { required?: boolean } = {},
): ShippedPackage[] {
  const releaseAppDir = path.join(repo, 'release', 'app');
  const manifestPath = path.join(releaseAppDir, 'package.json');
  if (!fs.existsSync(manifestPath)) {
    if (required)
      throw new Error(
        `${path.relative(repo, manifestPath)} does not exist, so the closure electron-builder ` +
          'packs unbundled beside the webpack output cannot be read. That is where a native module ' +
          'unable to survive bundling is declared, and it ships in every installer.\n' +
          'Run: npm ci',
      );
    return [];
  }

  const manifest = readJsonFile<RootManifest>(manifestPath, "release/app's manifest");
  const rootNames = Object.keys({
    ...manifest.dependencies,
    ...manifest.optionalDependencies,
  });
  if (rootNames.length === 0) return [];

  const lockPath = path.join(releaseAppDir, 'package-lock.json');
  if (!fs.existsSync(lockPath))
    throw new Error(
      `release/app/package.json declares ${rootNames.length} dependenc(ies), but ` +
        'release/app/package-lock.json does not exist, so their transitive closure cannot be ' +
        'resolved. electron-builder packs that whole closure.\n' +
        'Run: cd release/app && npm install',
    );
  const lock = readJsonFile<Lockfile>(lockPath, "release/app's lockfile");

  const missing = (name: string, fromKey: string | undefined) =>
    new Error(
      `release/app's dependency closure reaches "${name}"` +
        `${fromKey ? ` from ${fromKey}` : ''}, but release/app/package-lock.json records no entry ` +
        'for it. The lockfile is out of date with package.json, and electron-builder packs from ' +
        'the installed tree either way.\n' +
        'Run: cd release/app && npm install',
    );

  // Breadth-first over lockfile keys rather than names: `node_modules/a/node_modules/b` and
  // `node_modules/b` are different copies at different versions, and which one an importer gets is
  // decided by where it is required FROM (`resolveFromLock` mirrors node's own walk up).
  const keys: string[] = [];
  const seen = new Set<string>();
  const queue = rootNames.map((name) => {
    const key = resolveFromLock(lock, '', name);
    if (!key) throw missing(name, '');
    return key;
  });
  while (queue.length) {
    const key = queue.shift();
    // `while (queue.length)` guarantees this, but `Array#shift` is typed as possibly undefined and
    // narrowing here is cheaper than asserting - which this repo bans anyway.
    if (key && !seen.has(key)) {
      seen.add(key);
      keys.push(key);
      const { dependsFrom, entry } = lockEntry(lock, key);
      Object.keys({ ...entry?.dependencies, ...entry?.optionalDependencies }).forEach((name) => {
        const next = resolveFromLock(lock, dependsFrom, name);
        if (!next) throw missing(name, key);
        queue.push(next);
      });
    }
  }

  return keys.sort(compareStrings).map((key) => {
    const dir = path.join(releaseAppDir, ...key.split('/'));
    if (!isPackageRoot(path.join(dir, 'package.json')))
      throw new Error(
        `release/app/package-lock.json records "${key}", but ` +
          `release/app/${key}/package.json does not exist or has no name. ` +
          'The release/app install is incomplete. Run: cd release/app && npm install',
      );
    // `release/app` keeps its own lockfile, so a dev link here could not be described from the
    // root one the way `describePackage` describes the bundled closure's links. Nothing links here
    // today - `link-dev-packages` links into the repo root - so this refuses rather than inventing
    // a resolution for a case no tooling produces.
    if (isDevLinked(dir))
      throw new Error(
        `release/app's ${key} resolves through a yalc dev link. A dev link points at a moving ` +
          'branch of another repository, so it cannot be described in a committed legal artifact. ' +
          'Run: npm run editor:unlink (or the matching unlink script) and reinstall release/app.',
      );
    const pkg = readJsonFile<PackageManifest>(
      path.join(dir, 'package.json'),
      "an installed package's manifest",
    );
    return {
      ecosystem: 'npm',
      name: pkg.name,
      version: pkg.version,
      dir,
      reachedVia: ['release/app'],
    };
  });
}
