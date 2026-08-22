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
 * legal disclosure, and nothing else in the pipeline can see the loss. `main.js` prints the list as
 * an informational note.
 *
 * **Why the module manifests rather than a source scan.** `package.json` `dependencies` alone lies
 * about what a bundler includes, but a regex scan over source text infers what the compiler already
 * reports exactly: every module it resolved into a bundle. `react-reverse-portal` is the package
 * that shows the difference - a `dependencies`-section approach misses it entirely (see ADR-0022),
 * and it is reached only through a bundled import, so it appears in `extension-web-view.json`'s
 * module list.
 *
 * **The module graph alone is not enough - stylesheets need their own source.** ADR-0022 states
 * why: "webpack resolves a bare specifier in a CSS `@import` through `node_modules` and inlines the
 * result, so a package can ship without ever being named in a `.ts` file". The module manifests
 * cannot observe that, because every extension's `tailwind.css` is processed by a standalone
 * Tailwind prebuild (`extensions/lib/prebuild-tailwind.ts`, driven by
 * `TailwindPrebuildWebpackCompilerPlugin`'s `beforeCompile` hook) that runs
 * `postcss([tailwindcssPostcss()])` directly, in plain Node, BEFORE webpack starts. Tailwind v4's
 * own bundler resolves and inlines every `@import` in that file - `tailwindcss`, `tw-animate-css`,
 * `shadcn/tailwind.css`, `@fontsource-variable/ibm-plex-sans` - itself, outside any webpack
 * `Compilation`. `EmitShippedModulesPlugin` can only observe `NormalModule`s that pass through
 * `compilation.hooks.finishModules`; by the time webpack's own
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

const fs = require('fs');
const path = require('path');
const { builtinModules } = require('module');
const { compareByNameThenVersion, compareStrings } = require('./compare');

/**
 * Every bundle the packaged application ships, and therefore every manifest that must be present.
 *
 * A manifest that is simply ABSENT is the quietest failure this tool has: the union just comes out
 * smaller, every section renumbers, and the run exits 0. A shipping set built from three of these
 * five manifests drops `react-reverse-portal`, which is reached only through an extension web view.
 * Naming the bundles couples this list to the build graph on purpose: adding a bundle without
 * adding it here is a mistake worth failing on, and so is losing one.
 *
 * Passed IN by `main.js` rather than defaulted inside `collectShippedPackages`, so the requirement
 * lives at the one call site that describes the real application, and the function itself stays
 * general enough for a fixture to name a single bundle.
 */
const REQUIRED_BUNDLES = [
  'extension-host',
  'extension-main',
  'extension-web-view',
  'main',
  'renderer',
];

/**
 * The plausibility floor for the npm shipping set, the direct mirror of `nuget-set.js`'s
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
const NPM_MIN_PACKAGES = 120;

/**
 * Refuses an npm shipping set too small to be this application's.
 *
 * Applied by `main.js` at the one call site that describes the real application, exactly as
 * `requiredBundles` is, so that a fixture naming three packages stays a usable fixture.
 *
 * @param {object[]} packages
 * @returns {object[]}
 */
function assertNpmFloor(packages) {
  if (packages.length < NPM_MIN_PACKAGES)
    throw new Error(
      `npm shipping set has ${packages.length} packages; expected at least ${NPM_MIN_PACKAGES}. ` +
        'The module manifests are short or the dependency tree is incomplete, and a notices ' +
        'document is never produced from an incomplete set.\n' +
        'Run: rm -rf .notices && npm ci && npm run build',
    );
  return packages;
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
const NPM_MAX_SHRINK = 0.1;

/** The env var that acknowledges a real, large removal - see `assertNpmNotShrunk`. */
const ACCEPT_SHRINK_ENV = 'NOTICES_ACCEPT_SHRINK';

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
 * @param {object[]} packages
 * @param {number | undefined} committedNpmCount
 * @param {{ accepted?: boolean }} [opts] `accepted` skips the check outright; the caller sets it
 *   from `NOTICES_ACCEPT_SHRINK` and says so on stdout, so a run that used it is visible in the
 *   log.
 * @returns {object[]}
 */
function assertNpmNotShrunk(packages, committedNpmCount, { accepted = false } = {}) {
  if (!committedNpmCount || accepted) return packages;
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
 * repository pins and the licence recorded against it - and NOTHING is read from its directory,
 * which is also why no licence text is reproduced for it: the published tarball is not unpacked
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
 *
 * @param {string} dir
 * @returns {boolean}
 */
function isDevLinked(dir) {
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
 *
 * @param {string} repo
 * @returns {{
 *   lock: object;
 *   byPath: Map<string, object>;
 *   byName: Map<string, object>;
 *   keyByName: Map<string, string>;
 * }}
 */
function readLockIndex(repo) {
  const lock = JSON.parse(fs.readFileSync(path.join(repo, 'package-lock.json'), 'utf8'));
  const byPath = new Map();
  const byName = new Map();
  const keyByName = new Map();
  Object.entries(lock.packages || {}).forEach(([key, entry]) => {
    if (!key || !entry || !entry.version || !/(^|\/)node_modules\//.test(key)) return;
    byPath.set(key, entry);
    const name = key.replace(/^.*node_modules\//, '');
    if (!byName.has(name)) {
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
 *
 * @param {string} dir
 * @param {string} candidate
 * @returns {string | undefined}
 */
function containedPath(dir, candidate) {
  const root = path.resolve(dir);
  const target = path.resolve(root, String(candidate ?? '').replace(/\\/g, '/'));
  if (target !== root && !target.startsWith(root + path.sep)) return undefined;
  return target;
}

/**
 * The `package-lock.json` key for an on-disk package directory, or `undefined` when the directory
 * is not inside the repository.
 *
 * The lockfile's keys ARE install paths relative to the repository root, with forward slashes, so
 * this is the exact inverse of how npm lays the tree out.
 *
 * @param {string} dir
 * @param {string} repo
 * @returns {string | undefined}
 */
function lockKeyOf(dir, repo) {
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
 *
 * @param {object} lock
 * @param {string} key
 * @returns {{ key: string; dependsFrom: string; entry: object | undefined }}
 */
function lockEntry(lock, key) {
  const entry = (lock.packages || {})[key];
  if (entry && entry.link && entry.resolved)
    return { key, dependsFrom: entry.resolved, entry: lock.packages[entry.resolved] };
  return { key, dependsFrom: key, entry };
}

/**
 * The lockfile key `name` resolves to when required from `fromKey`, or `undefined`.
 *
 * Mirrors node's resolution: try the importer's own `node_modules`, then each ancestor's, ending at
 * the root. Resolving by bare name instead would pick whichever copy the lockfile lists first, and
 * the copies differ - which is the entire point here, since a nested copy at a different version is
 * exactly what a dev link erases from disk.
 *
 * @param {object} lock
 * @param {string | undefined} fromKey
 * @param {string} name
 * @returns {string | undefined}
 */
function resolveFromLock(lock, fromKey, name) {
  const segments = fromKey ? fromKey.split('/') : [];
  for (let depth = segments.length; depth >= 0; depth -= 1) {
    const prefix = segments.slice(0, depth).join('/');
    const key = prefix ? `${prefix}/node_modules/${name}` : `node_modules/${name}`;
    if ((lock.packages || {})[key]) return key;
  }
  return undefined;
}

/** Whether a lockfile entry declares a dependency on `name`, by any of the three edge kinds. */
function lockDependsOn(lock, key, name) {
  const { entry } = lockEntry(lock, key);
  if (!entry) return false;
  return ['dependencies', 'optionalDependencies', 'peerDependencies'].some((field) =>
    Object.prototype.hasOwnProperty.call(entry[field] || {}, name),
  );
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
 * from webpack's module graph exists to remove (ADR-0022): dozens of declared-but-tree-shaken
 * packages that never reach the bundle. What webpack compiled is still the set; the lockfile only
 * answers WHICH COPY of it that was.
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
 *
 * @param {object[]} packages
 * @param {string} repo
 * @param {() => { lock: object }} readLock
 * @returns {object[]}
 */
function correctLinkDistortedResolutions(packages, repo, readLock) {
  const linked = packages.filter((pkg) => pkg.devLinked);
  if (!linked.length) return packages;

  const { lock } = readLock();
  const keyOf = (pkg) => lockKeyOf(pkg.dir, repo);
  // A link's LOCKFILE key, not its directory's: a link reported by its `.yalc` real path has no
  // lockfile key, and resolving its dependencies from `.yalc/...` would walk a tree npm never
  // wrote and find only the hoisted copy - silently skipping the correction this exists for.
  const linkedKeys = linked.map((pkg) => pkg.lockKey || keyOf(pkg)).filter(Boolean);

  return packages.map((pkg) => {
    if (pkg.devLinked) return pkg;
    const key = keyOf(pkg);
    if (key !== `node_modules/${pkg.name}`) return pkg;

    const nested = [
      ...new Set(
        linkedKeys
          .map((linkedKey) => resolveFromLock(lock, linkedKey, pkg.name))
          .filter((resolved) => resolved && resolved !== key),
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

    const alsoReachedDirectly = packages.some(
      (other) =>
        other !== pkg &&
        !other.devLinked &&
        lockDependsOn(lock, keyOf(other), pkg.name) &&
        resolveFromLock(lock, lockEntry(lock, keyOf(other)).dependsFrom, pkg.name) === key,
    );
    if (alsoReachedDirectly) return pkg;

    const entry = (lock.packages || {})[nested[0]];
    return {
      ...pkg,
      version: entry.version,
      fromLock: true,
      declaredField: typeof entry.license === 'string' ? entry.license : undefined,
    };
  });
}

/**
 * Reads `package-lock.json` at most once, and only if something actually needs it.
 *
 * Lazy on purpose: a tree with no dev link never reads the lockfile at all, which keeps a repo
 * fixture that has no `package-lock.json` (every test fixture, and the degraded-environment cases)
 * failing on the thing under test rather than on a missing lockfile.
 *
 * @param {string} repo
 * @returns {() => { byPath: Map<string, object>; byName: Map<string, object> }}
 */
function lockIndexReader(repo) {
  let index;
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
 *
 * @param {string} dir
 * @param {string} repo
 * @param {() => { byPath: Map<string, object>; byName: Map<string, object> }} readLock
 * @param {string[]} reachedVia
 * @returns {{
 *   ecosystem: 'npm';
 *   name: string;
 *   version: string;
 *   dir: string;
 *   reachedVia: string[];
 *   devLinked?: true;
 *   declaredField?: string;
 * }}
 */
function describePackage(dir, repo, readLock, reachedVia) {
  const manifest = JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf8'));
  if (!isDevLinked(dir))
    return {
      ecosystem: 'npm',
      name: manifest.name,
      version: manifest.version,
      dir,
      reachedVia,
    };

  const key = path.relative(repo, dir).split(path.sep).join('/');
  const { byPath, byName, keyByName } = readLock();
  const lockKeyOfName = (name) => keyByName.get(name);
  const entry = byPath.get(key) || byName.get(manifest.name);
  if (!entry)
    throw new Error(
      `${manifest.name} resolves through a yalc dev link (${key}), but package-lock.json pins no ` +
        'version for it - and a dev link is never described from the link itself, because that ' +
        'points at a moving branch of another repository. Run: npm install',
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
    lockKey: byPath.has(key) ? key : lockKeyOfName(manifest.name),
    // `fromLock` is the broader fact - described from package-lock.json, nothing read from the
    // directory - and `correctLinkDistortedResolutions` sets it on packages a link DISPLACED as
    // well as on the link itself. Readers that only care "was this read from disk?" use this one.
    fromLock: true,
    // From the lockfile too: reading the linked manifest would put the branch's own declaration
    // into the artifact, which is the thing this guard exists to keep out of it.
    declaredField: typeof entry.license === 'string' ? entry.license : undefined,
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
 *
 * @param {string} packageJsonPath
 * @returns {boolean}
 */
function isPackageRoot(packageJsonPath) {
  if (!fs.existsSync(packageJsonPath)) return false;
  const manifest = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  return typeof manifest.name === 'string' && manifest.name.length > 0;
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
 * `node_modules/outer/node_modules/inner/lib/x.js` the owner is `inner`, whose licence applies to
 * that code, not `outer`.
 *
 * @param {string} resource
 * @returns {string | undefined}
 */
function packageBoundaryOf(resource) {
  const segments = resource.split(path.sep);
  const marker = Math.max(...PACKAGE_CONTAINERS.map((name) => segments.lastIndexOf(name)));
  if (marker < 0) return undefined;
  const scoped = (segments[marker + 1] || '').startsWith('@');
  const depth = marker + (scoped ? 3 : 2);
  if (segments.length < depth) return undefined;
  return segments.slice(0, depth).join(path.sep);
}

/** Whether a path runs through a directory that holds installed packages. */
function isInstalledPath(resource) {
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
 * @param {string} resource
 * @param {string} repo
 * @returns {string | undefined} Undefined for first-party source outside node_modules, and for a
 *   module whose own package directory has no readable package.json.
 */
function packageDirOf(resource, repo) {
  if (!isInstalledPath(resource)) return undefined;

  const boundary = packageBoundaryOf(resource);
  // `containedPath` rather than `boundary.startsWith(repo)`: a plain prefix test also accepts a
  // SIBLING directory whose name merely starts with the repository's (`/src/paranext-core-2`
  // "starts with" `/src/paranext-core`), which would attribute another checkout's module to this
  // one. It is the tested helper the rest of this module already resolves lockfile keys with.
  if (!boundary || !containedPath(repo, boundary)) return undefined;

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
// stylesheetImportSpecifiers, packageOfSpecifier, MODULE_SPECIFIER, and SOURCE_ALIAS below were
// ported (not imported) from the deleted `.erb/scripts/generate-third-party-notices.util.js`, so
// this module never depended on one scheduled for removal. Behavior is unchanged from the original;
// only the names are unprefixed since this file has no JS/TS-import counterpart to distinguish them
// from.

/** A module specifier, as opposed to whatever else a quoted string in source may hold. */
const MODULE_SPECIFIER = /^(@[\w.-]+\/)?[\w.-]+(\/[\w.@-]+)*$/;
/** Path aliases declared in `tsconfig.json`; they name first-party source, never a package. */
const SOURCE_ALIAS = /^@(assets|client|main|node|extension-host|renderer|shared)\//;

/**
 * Specifiers a stylesheet pulls in: `@import`, `@use`, `url()`, and Tailwind v4's `@plugin`,
 * `@source` and `@config`.
 *
 * Stylesheets reach the bundle the same way modules do - a bare specifier in an `@import` resolves
 * through `node_modules`, fonts and all. A leading `~` is webpack's older "this is a module, not a
 * path" marker and is stripped.
 *
 * Tailwind v4's own at-rules resolve bare specifiers through `node_modules` exactly as `@import`
 * does, and a package reached through one ships its CSS into the bundle the same way - but it is
 * reached by NEITHER of this pipeline's other two sources. `@import` was the only form matched
 * here, and `lib/platform-bible-react/src/index.css`'s `@plugin 'tailwindcss-scoped-preflight'` was
 * the live cost: the package's generated CSS ships inside every bundle, and it appeared nowhere in
 * the notices document or its lock, with its MIT copyright-notice obligation undischarged.
 * `@source` and `@config` name a local path today (`packageOfSpecifier` discards those), and are
 * matched for the same reason `@plugin` now is - the next one to name a package must not be lost
 * silently.
 */
function stylesheetImportSpecifiers(text) {
  const specifiers = [];
  const record = (value) => {
    if (value) specifiers.push(value.replace(/^~/, '').split('?')[0]);
  };
  // `@plugin` may be followed by a `{ … }` options block rather than a `;`, so the specifier is
  // matched on the quoted string alone rather than on the statement's terminator.
  [
    ...text.matchAll(/@(?:import|use|plugin|source|config)\s+(?:url\(\s*)?['"]([^'"\n)]+)['"]/g),
  ].forEach((match) => record(match[1]));
  [...text.matchAll(/url\(\s*['"]?([^'")\n]+)['"]?\s*\)/g)].forEach((match) => record(match[1]));
  return specifiers.filter(Boolean);
}

/** The package a module specifier names, or `undefined` when it names something else. */
function packageOfSpecifier(specifier) {
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
function childSourceRoots(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(dir, entry.name, 'src'));
}

/**
 * The production source roots the module manifests cover, for the stylesheet scan to mirror.
 *
 * `lib/*` is in the list for the same reason `extensions/src/*` is, and its absence was a real gap
 * rather than a theoretical one. `lib/platform-bible-react/src/index.css` imports `tailwindcss`,
 * `tw-animate-css`, `shadcn/tailwind.css` and `@fontsource-variable/ibm-plex-sans`, and Vite
 * inlines the compiled CSS into `lib/platform-bible-react/dist/index.js` - a path with no
 * `node_modules` segment, so `packageDirOf` returns nothing for it and the module manifests cannot
 * see those packages either. Three of the four were reaching the document ONLY through the ten
 * extension `tailwind.css` files, which are marked in their own headers as copies of that very
 * file: a coincidence, not a mechanism. A new CSS or font package added where it naturally belongs
 * (in the component library the whole application styles itself from) would have shipped embedded
 * in every bundle and appeared nowhere in the notices, with the run exiting 0.
 *
 * The glob is deliberately wide: `lib/eslint-plugin-paranext` and `lib/browserslist-config-detect-
 * electron` are build-time tooling, so a stylesheet there would be over-reported. That is the safe
 * direction and a visible one (a new row in the committed artifact), unlike the under-report it
 * closes, and neither ships a stylesheet today.
 */
function productionStylesheetRoots(repo) {
  const coreRoots = ['main', 'renderer', 'extension-host', 'shared', 'node'].map((name) =>
    path.join(repo, 'src', name),
  );
  return [
    ...coreRoots,
    ...childSourceRoots(path.join(repo, 'extensions', 'src')),
    ...childSourceRoots(path.join(repo, 'lib')),
  ].filter((root) => fs.existsSync(root));
}

const STYLESHEET_FILE = /\.s?css$/;

/** Every stylesheet under `dir`, recursing but never descending into a `node_modules`. */
function findStylesheets(dir, found = []) {
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
 * - See ADR-0022.
 *
 * Returns `undefined` when nothing resolves. This is deliberately NOT an error: unlike a webpack
 * module manifest (which only ever names a file the compiler actually resolved), a regex extraction
 * over raw stylesheet text has real, observed false positives in this repository - a specifier
 * `something.css` that is only the text of a code comment
 * (`extensions/src/platform-enhanced-resources/src/_er-tokens.scss`), and a bare Sass load-path
 * import (`@use 'styles/vars'` in several `src/renderer` stylesheets, Sass's own "resolve from a
 * configured load path" idiom, not a package reference). Both fail to resolve to any installed
 * package and must be silently ignored rather than treated as a degraded environment. They are
 * collected instead and reported as an informational note (see `collectShippedPackages`'s
 * `unresolvedStylesheetSpecifiers`), never thrown.
 *
 * @param {string} name
 * @param {string} fromDir
 * @param {string} repo
 * @returns {string | undefined}
 */
function resolvePackageLeaf(name, fromDir, repo) {
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
 *
 * @param {string} repo
 * @returns {{ leaves: { dir: string; bundle: string }[]; unresolvedNames: string[] }}
 */
function collectStylesheetLeaves(repo) {
  const leaves = [];
  const unresolvedNames = new Set();
  productionStylesheetRoots(repo).forEach((root) => {
    findStylesheets(root).forEach((file) => {
      const text = fs.readFileSync(file, 'utf8');
      stylesheetImportSpecifiers(text).forEach((specifier) => {
        const name = packageOfSpecifier(specifier);
        if (!name) return;
        const dir = resolvePackageLeaf(name, path.dirname(file), repo);
        if (dir) leaves.push({ dir, bundle: 'stylesheet' });
        else unresolvedNames.add(name);
      });
    });
  });
  return { leaves, unresolvedNames: [...unresolvedNames].sort() };
}

/**
 * Resolves which npm packages ship, from webpack's own module manifests, unioned with the
 * stylesheet leaf scan and the `release/app` unbundled closure above.
 *
 * This replaces a regex scan over source files. The scan was the right instinct - manifests lie
 * about what a bundler includes - but for JS/TS it was inferring something the compiler reports
 * exactly. Stylesheets are the one part of that scan the module graph cannot fully replace - see
 * the module docstring.
 *
 * `warmCache` decides what a warm-cache stamp does here - see the refusal below for what it means.
 * `'throw'` is the default and the only setting under which an ARTIFACT is written; `'report'`
 * returns the warm bundles instead, for a caller whose own answer to "this build cannot be checked"
 * is to say so and stop rather than to fail.
 *
 * @param {{
 *   manifestDir: string;
 *   repo: string;
 *   requiredBundles?: string[];
 *   requireUnbundledClosure?: boolean;
 *   warmCache?: 'throw' | 'report';
 * }} opts
 * @returns {{
 *   packages: {
 *     ecosystem: 'npm';
 *     name: string;
 *     version: string;
 *     dir: string;
 *     reachedVia: string[];
 *   }[];
 *   unresolvedStylesheetSpecifiers: string[];
 *   warmBundles: string[];
 * }}
 */
function collectShippedPackages({
  manifestDir,
  repo,
  requiredBundles = [],
  requireUnbundledClosure = false,
  warmCache = 'throw',
}) {
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
      const { modules } = JSON.parse(
        fs.readFileSync(path.join(manifestDir, `${bundle}.json`), 'utf8'),
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

  const byDir = new Map();
  const unresolved = new Set();
  const stamps = new Map();
  const warmBundles = [];

  files.forEach((file) => {
    const { bundle, buildId, cacheWarm, modules } = JSON.parse(
      fs.readFileSync(path.join(manifestDir, file), 'utf8'),
    );
    // A manifest with no stamp predates the stamping and cannot be placed in any build, so it is
    // recorded under its own name rather than sharing an "unstamped" bucket with other unstamped
    // manifests - two manifests that each fail to say which build they came from are not evidence
    // that they came from the SAME one.
    stamps.set(buildId || `unstamped:${bundle}`, [
      ...(stamps.get(buildId || `unstamped:${bundle}`) || []),
      bundle,
    ]);
    if (cacheWarm) warmBundles.push(bundle);
    modules.forEach((resource) => {
      const dir = packageDirOf(resource, repo);
      if (!dir) {
        // First-party source is expected and ignored. A path under an installed-package directory
        // with no readable package.json is not: it means a degraded tree, which must never quietly
        // shrink the document.
        if (isInstalledPath(resource)) unresolved.add(resource);
        return;
      }
      if (!byDir.has(dir)) byDir.set(dir, new Set());
      byDir.get(dir).add(bundle);
    });
  });

  // A build served from a warm persistent webpack cache can under-report: a module webpack
  // restores from cache does not re-run its loader, and a loader that injects new modules AS PART
  // OF running (css-loader emitting require()s for its own runtime helpers) never gets the chance
  // to add them on a cache hit - so `finishModules` sees fewer modules than the bundle actually
  // contains, silently. Measured directly (see `emit-shipped-modules-plugin.ts`
  // `isWarmFilesystemCache`): a warm `webpack-renderer` cache dropped 3 modules from the manifest
  // while the emitted bundle still shipped them. This is a LOCAL-ONLY trap, not a CI one - CI never
  // caches `node_modules/.cache/webpack-*`, so every CI build is cold - but a developer who
  // regenerates notices on an already-built tree would otherwise commit a silently short artifact
  // with no error at all.
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

  // A set of MIXED VINTAGE is a silent under-report: a stale manifest names modules that are gone,
  // or misses ones that are now there, and either way the document comes out shorter or wrong while
  // the build exits 0. This repository shipped exactly that state - two extension manifests hours
  // older than the three core ones, still naming sixteen modules under a `node_modules` directory a
  // `yalc` refresh had removed. `prebuild` mints one id per `npm run build` and every manifest
  // carries it (see `.erb/scripts/notices-build-id.js`), so disagreement means a partial build.
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

  if (unresolved.size > 0)
    throw new Error(
      `${unresolved.size} bundled module(s) under node_modules have no readable package.json:\n` +
        `${[...unresolved].slice(0, 10).join('\n')}\n` +
        'The dependency tree is incomplete. Run: npm ci && npm run build',
    );

  // Union in the stylesheet leaf scan (see module docstring for why the module graph alone misses
  // these) - as LEAVES, so a package reached only through CSS never pulls its own dependencies in.
  const { leaves, unresolvedNames } = collectStylesheetLeaves(repo);
  leaves.forEach(({ dir, bundle }) => {
    if (!byDir.has(dir)) byDir.set(dir, new Set());
    byDir.get(dir).add(bundle);
  });

  const readLock = lockIndexReader(repo);
  // Ordered with the byte comparators, not `localeCompare`: ICU collation depends on the machine's
  // locale and on the ICU version Node was built against, and `localeCompare` additionally orders
  // `'10.0.0'` before `'9.0.0'` as text. `render.js` and `lock.js` re-sort with these same
  // comparators before anything reaches a committed byte, so the artifact does not rest on this
  // ordering - but a module in a pipeline whose whole premise is byte-reproducible output should
  // not carry the ordering primitive `compare.js` exists to replace.
  const packages = correctLinkDistortedResolutions(
    [...byDir.entries()].map(([dir, bundles]) =>
      describePackage(dir, repo, readLock, [...bundles].sort()),
    ),
    repo,
    readLock,
  ).sort(compareByNameThenVersion);

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

  return {
    packages: [...byDirFinal.values()].sort(compareByNameThenVersion),
    unresolvedStylesheetSpecifiers: unresolvedNames,
    warmBundles,
  };
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
 * describes the real application (`main.js`), exactly as `requiredBundles` and `assertNpmFloor`
 * are, while a fixture repo that has no `release/app` stays a usable fixture. Without it this was
 * the only union source that could contribute nothing for a reason nobody would see - every other
 * source either throws or has a floor.
 *
 * @param {string} repo
 * @param {{ required?: boolean }} [opts]
 * @returns {{
 *   ecosystem: 'npm';
 *   name: string;
 *   version: string;
 *   dir: string;
 *   reachedVia: string[];
 * }[]}
 */
function collectUnbundledPackages(repo, { required = false } = {}) {
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

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
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
  const lock = JSON.parse(fs.readFileSync(lockPath, 'utf8'));

  const missing = (name, fromKey) =>
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
  const keys = [];
  const seen = new Set();
  const queue = rootNames.map((name) => {
    const key = resolveFromLock(lock, '', name);
    if (!key) throw missing(name, '');
    return key;
  });
  while (queue.length) {
    const key = queue.shift();
    if (!seen.has(key)) {
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
    const pkg = JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf8'));
    return {
      ecosystem: 'npm',
      name: pkg.name,
      version: pkg.version,
      dir,
      reachedVia: ['release/app'],
    };
  });
}

module.exports = {
  ACCEPT_SHRINK_ENV,
  NPM_MAX_SHRINK,
  NPM_MIN_PACKAGES,
  REQUIRED_BUNDLES,
  assertNpmFloor,
  assertNpmNotShrunk,
  collectShippedPackages,
  collectUnbundledPackages,
  containedPath,
  lockEntry,
  lockKeyOf,
  packageDirOf,
  resolveFromLock,
};
