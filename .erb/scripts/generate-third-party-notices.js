/**
 * Generates THIRD-PARTY-NOTICES.md from what the packaged application actually ships.
 *
 * Attribution obligations (MIT/BSD/ISC/Apache) attach to the _distributed binary_, so the file has
 * to describe the binary, not the repository. Two dependency graphs feed it, plus one hand-written
 * section:
 *
 * - **npm** — the production tree reported by `npm ls --omit=dev`, which is what webpack compiles
 *   into `dist/` and what electron-builder packages.
 * - **NuGet** — the resolved restore closure of `c-sharp/ParanextDataProvider.csproj`, read from
 *   `c-sharp/obj/project.assets.json`. The whole .NET publish directory is copied into the packaged
 *   app (`electron-builder.json5` `extraResources` → `./dotnet/`), so every assembly it contains
 *   ships — not just the eight direct `PackageReference` entries.
 * - **Electron**, which ships its own notices inside the packaged app and so is described in prose.
 *
 * `devDependencies` are excluded, but **"devDependency" does not mean "does not ship"**. This is a
 * webpack-bundled Electron app whose `externals` are computed from `release/app/package.json`
 * `dependencies` (`.erb/configs/webpack.config.base.ts`) — a file that declares none, so nothing is
 * externalized. Anything imported from production source (`src/main`, `src/renderer`,
 * `src/extension-host`, `src/shared`, `src/node`, `extensions/src/<extension>/src`) is compiled
 * into the shipped bundle regardless of which `package.json` section names it. Such a package MUST
 * be declared in `dependencies`, or it ships with no notice: `@usersnap/browser` and
 * `electron-devtools-installer` were both moved for exactly that reason. Adding an import of a
 * devDependency to production source is a licensing change, not just a build change.
 *
 * Run it whenever production dependencies change:
 *
 *     npm run build:third-party-notices
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execSync } = require('child_process');
// The pure, side-effect-free half of this generator — license classification, filename matching,
// nuspec text extraction — lives beside it so it can be unit-tested without a node_modules tree.
// See generate-third-party-notices.util.test.ts.
const {
  canonicalTextCredit,
  cell,
  classifyLicense,
  electLicense,
  identifyLicenseFromText,
  isFrameworkPackage,
  isLicenseFileName,
  licenseIdOf,
  xmlMatch,
} = require('./generate-third-party-notices.util');

const REPO = path.resolve(__dirname, '..', '..');
const OUT = path.join(REPO, 'THIRD-PARTY-NOTICES.md');
const MODULE_ROOTS = ['node_modules', 'extensions/node_modules', 'release/app/node_modules'];

/**
 * Verbatim SPDX license texts, one `<SPDX-ID>.txt` file per identifier, checked into the
 * repository.
 *
 * A package that declares a license but ships no copy of it would otherwise appear here as an
 * identifier and a copyright line with no text — which does not discharge "this permission notice
 * shall be included in all copies". These files are what lets the generator reproduce the license
 * anyway, and they are checked in rather than fetched because CI regenerates the artifact on every
 * pull request: nothing in the generation path may open a socket. See
 * `.erb/scripts/license-texts/README.md` for provenance and for how to add one.
 */
const LICENSE_TEXTS_DIR = path.join(__dirname, 'license-texts');

/**
 * Dual-licensed dependencies, and which branch Platform.Bible elects. Recorded explicitly because
 * "MIT OR GPL-3.0-or-later" is not self-resolving: shipping under a license the project has not
 * chosen is exactly the ambiguity a notices file exists to remove.
 */
const ELECTED_LICENSES = {
  jszip: { elected: 'MIT', of: 'MIT OR GPL-3.0-or-later' },
  dompurify: { elected: 'Apache-2.0', of: 'MPL-2.0 OR Apache-2.0' },
  'harmony-reflect': { elected: 'Apache-2.0', of: 'Apache-2.0 OR MPL-1.1' },
};

/**
 * The NuGet half of `ELECTED_LICENSES`, and the same reasoning: an `OR` expression is a choice, and
 * a notices file that never records the choice leaves the recipient to guess which terms apply.
 *
 * `CsvHelper` is elected as **Apache-2.0** rather than MS-PL, and the branch is not interchangeable
 * here. MS-PL is GPL-incompatible (its section 3(C) reciprocity terms cannot be satisfied alongside
 * the GPL's), and `CsvHelper` is linked into `ParanextDataProvider`, whose own source is
 * AGPL-3.0-or-later — so electing MS-PL would combine GPL-incompatible code into an AGPL tree.
 * Apache-2.0 is explicitly compatible with GPLv3/AGPLv3 and additionally carries an express patent
 * grant, which MS-PL's narrower patent language does not match. See LICENSING.md.
 */
const DOTNET_ELECTED_LICENSES = {
  CsvHelper: { elected: 'Apache-2.0', of: 'MS-PL OR Apache-2.0' },
};

const DOTNET_PROJECT = path.join('c-sharp', 'ParanextDataProvider.csproj');
const DOTNET_ASSETS = path.join(REPO, 'c-sharp', 'obj', 'project.assets.json');
/**
 * A believable restore closure for the data provider is well over a hundred packages. Anything near
 * the eight direct `PackageReference` entries means the assets file is stale or partial, and a
 * short .NET section is precisely the failure this generator exists to prevent — so it is a hard
 * error, never a quietly truncated file.
 */
const DOTNET_MIN_PACKAGES = 40;

/**
 * NuGet packages whose nuspec metadata is missing or wrong, and the curated answer.
 *
 * `alwaysList` entries are emitted even when absent from the local restore closure: the ICU runtime
 * is referenced under a Windows-only MSBuild condition, so it is missing from any assets file
 * restored on Linux or macOS even though it ships in the Windows build.
 */
const DOTNET_OVERRIDES = {
  ParatextData: { license: 'Proprietary — SIL Global / United Bible Societies' },
  ParatextChecks: { license: 'Proprietary — SIL Global / United Bible Societies' },
  ParatextCorePluginInterfaces: {
    license: 'Proprietary — SIL Global / United Bible Societies',
    note: 'First-party. Its nuspec declares no license and its copyright notice reserves all rights, but it is code of the same SIL Global / United Bible Societies team that owns Platform.Bible, published from a different product release on the same internal feed as ParatextData. Listed here because it ships in the packaged application, not because it carries a third-party disclosure obligation.',
  },
  'Microsoft.ICU.ICU4C.Runtime': {
    license: 'Unicode-3.0',
    note: 'Windows only. Permissive; requires the Unicode copyright and permission notice to travel with copies.',
    alwaysList: true,
  },
};

/** `<licenseUrl>` values (the pre-SPDX nuspec form) whose target license is known. */
const NUGET_LICENSE_URLS = {
  'http://go.microsoft.com/fwlink/?LinkId=329770': 'MICROSOFT .NET LIBRARY',
  'https://github.com/sillsdev/icu4c/blob/trunk/license.html': 'ICU (Unicode-3.0)',
};

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return undefined;
  }
}

function readDirSafe(dir) {
  try {
    return fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return [];
  }
}

/**
 * The package directories directly inside one `node_modules`.
 *
 * A `@scope` entry is **not** a package — it is a directory holding the scope's packages, so the
 * nested tree of a scoped package lives at `node_modules/@scope/<pkg>/node_modules`, never at
 * `node_modules/@scope/node_modules`. Treating a scope directory as a package makes every
 * non-hoisted scoped dependency invisible to the search below: it probes a path that cannot exist,
 * finds nothing, and the package silently falls back to its lockfile identifier with no license
 * text reproduced. Descend one extra level for scopes.
 */
function packageDirsIn(modulesDir) {
  return readDirSafe(modulesDir)
    .filter((entry) => entry.isDirectory())
    .flatMap((entry) => {
      const entryDir = path.join(entry.parentPath ?? entry.path, entry.name);
      if (!entry.name.startsWith('@')) return [entryDir];
      return readDirSafe(entryDir)
        .filter((scoped) => scoped.isDirectory())
        .map((scoped) => path.join(entryDir, scoped.name));
    });
}

/** Resolves a package name to its installed directory, searching nested node_modules. */
function findPackageDir(name) {
  const direct = MODULE_ROOTS.map((root) => path.join(REPO, root, name)).find((dir) =>
    fs.existsSync(path.join(dir, 'package.json')),
  );
  if (direct) return direct;

  const stack = MODULE_ROOTS.map((root) => path.join(REPO, root));
  let found;
  while (stack.length && !found) {
    const nested = packageDirsIn(stack.pop())
      .map((dir) => path.join(dir, 'node_modules'))
      .filter((dir) => fs.existsSync(dir));
    const hit = nested.find((dir) => fs.existsSync(path.join(dir, name, 'package.json')));
    if (hit) found = path.join(hit, name);
    else stack.push(...nested);
  }
  return found;
}

/** Every package in the production tree, deduplicated by name@version. */
function collectProductionPackages() {
  let raw;
  try {
    raw = execSync('npm ls --omit=dev --all --json', {
      cwd: REPO,
      maxBuffer: 1024 * 1024 * 256,
      stdio: ['ignore', 'pipe', 'ignore'],
    }).toString();
  } catch (err) {
    // `npm ls` exits non-zero on extraneous/peer warnings but still emits usable JSON.
    raw = err.stdout?.toString() || '{}';
  }
  const found = new Map();
  const walked = new WeakSet();
  const walk = (node) => {
    if (walked.has(node)) return;
    walked.add(node);
    Object.entries(node.dependencies || {}).forEach(([name, dep]) => {
      // No version means npm listed the edge but resolved nothing — an unmet optional or peer
      // dependency. Nothing is on disk, so nothing ships, and it must not reach the notices file.
      if (!dep || dep.missing || !dep.version) return;
      found.set(`${name}@${dep.version}`, { name, version: dep.version });
      // Recursion is guarded per _node_, never per name@version: when a package appears at more
      // than one point in the tree, `npm ls --all` prints its subtree once and reduces the other
      // occurrences to a bare `{ version }` stub. Skipping a package the second time it is seen
      // therefore drops the whole subtree whenever the stub happens to come first — which is how
      // `jszip`'s twelve transitive dependencies silently fell out of this file.
      walk(dep);
    });
  };
  walk(JSON.parse(raw));
  return [...found.values()];
}

/**
 * Workspace packages are first-party; they belong in LICENSING.md, not a third-party file.
 *
 * Resolved by reading each workspace's declared `name` rather than taking the last path segment —
 * the two differ (`extensions/` is published as `paranext-extensions`), and guessing from the path
 * silently leaks a first-party package into the third-party report.
 */
function collectOwnPackageNames(lock) {
  const own = new Set();
  Object.entries(lock.packages || {}).forEach(([key, entry]) => {
    if (!key) return;
    if (entry.resolved?.startsWith('file:')) own.add(key.replace(/^node_modules\//, ''));
    if (key.startsWith('node_modules')) return;
    const manifest = readJson(path.join(REPO, key, 'package.json'));
    if (manifest?.name) own.add(manifest.name);
  });
  return own;
}

/**
 * Licenses recorded in the lockfile, for packages not installed on this platform, keyed
 * `name@version`.
 *
 * Keyed by version and not by bare name because a lockfile routinely holds several versions of the
 * same package, and a package that relicenses carries one license before the switch and another
 * after. Keying by name alone attributes whichever entry the walk reached first to every version of
 * it — a wrong identifier in a legal document, which is worse than the admitted gap of UNKNOWN.
 */
function lockfileLicenses(lock) {
  const byNameAndVersion = new Map();
  Object.entries(lock.packages || {}).forEach(([key, entry]) => {
    if (!entry.license || !entry.version) return;
    const name = key.replace(/^.*node_modules\//, '');
    const id = `${name}@${entry.version}`;
    if (name && !byNameAndVersion.has(id)) byNameAndVersion.set(id, entry.license);
  });
  return byNameAndVersion;
}

/**
 * Reads a file as license text, or `undefined` if it cannot be read.
 *
 * Line endings are normalized to LF: some upstream licenses are CRLF, and git normalizes them on
 * commit. Without this the committed file would never match freshly generated output, so the
 * generated artifact would show a spurious diff on every run.
 */
function readLicenseFile(file) {
  try {
    return fs.readFileSync(file, 'utf8').replace(/\r\n?/g, '\n').trim();
  } catch {
    return undefined;
  }
}

/**
 * Reads _every_ license file a package ships, not just the first one found.
 *
 * A dual-licensed package ships one file per branch (`LICENSE-APACHE` and `LICENSE-MIT`), and
 * reproducing only one of them satisfies neither license. Files are read in filename order so the
 * committed artifact stays byte-stable across runs and platforms, and each is labelled when there
 * is more than one so it is obvious which text came from where.
 */
function readLicenseText(dir) {
  if (!dir) return undefined;
  const names = readDirSafe(dir)
    .filter((entry) => entry.isFile() && isLicenseFileName(entry.name))
    .map((entry) => entry.name)
    .sort();
  const texts = names
    .map((name) => ({ name, text: readLicenseFile(path.join(dir, name)) }))
    .filter((entry) => entry.text);
  if (!texts.length) return undefined;
  if (texts.length === 1) return texts[0].text;
  return texts.map(({ name, text }) => `===== ${name} =====\n\n${text}`).join('\n\n');
}

/**
 * The checked-in canonical license texts, keyed by lowercased SPDX identifier.
 *
 * Keyed lowercase because the identifier being looked up comes from third-party metadata — a nuspec
 * expression or an npm `license` field — and nothing obliges those to match SPDX's own casing. The
 * file name is kept as the canonical identifier for display; the key is only for matching.
 */
function canonicalLicenseTexts() {
  const entries = readDirSafe(LICENSE_TEXTS_DIR)
    .filter((entry) => entry.isFile() && entry.name.endsWith('.txt'))
    .map((entry) => ({
      id: path.basename(entry.name, '.txt'),
      text: readLicenseFile(path.join(LICENSE_TEXTS_DIR, entry.name)),
    }))
    .filter((entry) => entry.text);
  return new Map(entries.map((entry) => [entry.id.toLowerCase(), entry]));
}

/**
 * The NuGet packages that contribute a file to the .NET publish output, from the restore closure.
 *
 * Derived rather than hand-listed: `extraResources` copies the entire publish directory into the
 * packaged app, so the shipped set is the full transitive closure, not the direct
 * `PackageReference` entries. Two kinds of package are dropped, and the bias in every unclear case
 * is to keep the package:
 *
 * 1. Packages with no non-placeholder runtime, native, or resource asset in any target — analyzers,
 *    MSBuild-only tooling, and metapackages. They produce no shipped assembly.
 * 2. Packages superseded by the .NET 8 shared framework (see `isFrameworkPackage`).
 *
 * Throws if the assets file is unreadable or implausibly small; see `DOTNET_MIN_PACKAGES`.
 */
function collectDotnetPackages() {
  const assets = readJson(DOTNET_ASSETS);
  if (!assets || !assets.targets) {
    throw new Error(
      `Cannot read the .NET restore closure from ${path.relative(REPO, DOTNET_ASSETS)}.\n` +
        `Run: dotnet restore ${DOTNET_PROJECT}\n` +
        'Without it the .NET section would silently omit every bundled assembly, which is the exact\n' +
        'under-reporting this generator exists to prevent.',
    );
  }

  const shipsSomething = (assetGroup) =>
    !!assetGroup && Object.keys(assetGroup).some((file) => !file.endsWith('_._'));
  const found = new Map();
  Object.keys(assets.targets)
    .sort()
    .forEach((target) => {
      Object.entries(assets.targets[target]).forEach(([key, entry]) => {
        const [id, version] = key.split('/');
        if (!id || !version || found.has(key)) return;
        if (
          !shipsSomething(entry.runtime) &&
          !shipsSomething(entry.runtimeTargets) &&
          !shipsSomething(entry.native) &&
          !shipsSomething(entry.resource)
        )
          return;
        if (isFrameworkPackage(id, version)) return;
        // A package does not always ship an assembly named after itself: `SharpZipLib` ships
        // `ICSharpCode.SharpZipLib.dll`, and `GlyssenCharacters` redistributes `FuzzySharp.dll`,
        // a separate project. Recording the mismatches is what lets a reader map a file under
        // `dotnet/` back to the row that carries its notice. Only the platform-neutral `runtime`
        // group is read, so the list does not change with the RID the assets file was restored for.
        const assemblies = Object.keys(entry.runtime || {})
          .filter((file) => !file.endsWith('_._'))
          .map((file) => path.basename(file))
          .filter((file) => file.replace(/\.dll$/i, '').toLowerCase() !== id.toLowerCase())
          .sort();
        found.set(key, { name: id, version, assemblies });
      });
    });

  if (found.size < DOTNET_MIN_PACKAGES) {
    throw new Error(
      `${path.relative(REPO, DOTNET_ASSETS)} resolved only ${found.size} shipped NuGet packages, ` +
        `which is below the plausibility floor of ${DOTNET_MIN_PACKAGES}.\n` +
        `Run: dotnet restore ${DOTNET_PROJECT}\n` +
        'A short .NET section is worse than no file at all, so this is a hard failure.',
    );
  }

  // Direct references are the one set that can be checked against a second source. A missing one
  // means the assets file does not match the project, whatever its size.
  const csproj = fs.readFileSync(path.join(REPO, DOTNET_PROJECT), 'utf8');
  const direct = [...csproj.matchAll(/<PackageReference\s+Include="([^"]+)"\s+Version="([^"]+)"/g)];
  const listed = new Set([...found.values()].map((pkg) => pkg.name.toLowerCase()));
  const missing = direct
    .map(([, id]) => id)
    .filter((id) => !listed.has(id.toLowerCase()) && !DOTNET_OVERRIDES[id]);
  if (missing.length) {
    throw new Error(
      `${path.relative(REPO, DOTNET_ASSETS)} is missing direct PackageReference(s): ${missing.join(
        ', ',
      )}.\nRun: dotnet restore ${DOTNET_PROJECT}`,
    );
  }

  Object.entries(DOTNET_OVERRIDES)
    .filter(([id, override]) => override.alwaysList && !listed.has(id.toLowerCase()))
    .forEach(([id]) => {
      const declared = direct.find(([, refId]) => refId === id);
      found.set(`${id}/curated`, {
        name: id,
        version: declared ? declared[2] : '—',
        assemblies: [],
      });
    });

  return [...found.values()].sort(
    (first, second) =>
      first.name.localeCompare(second.name) || first.version.localeCompare(second.version),
  );
}

/**
 * Resolves one NuGet package's license from its nuspec in the global packages folder.
 *
 * Handles both nuspec forms: the SPDX `<license type="expression">`, and the deprecated
 * `<licenseUrl>` that predates it. A `<license type="file">` reference is followed so the bundled
 * text is reproduced; when a package bundles license files without pointing at them
 * (Newtonsoft.Json ships `LICENSE.md` under an expression), the directory scan picks them up
 * anyway.
 */
function resolveNugetPackage(folders, { name, version, assemblies }) {
  const override = DOTNET_OVERRIDES[name] || {};
  const ships = assemblies?.length ? `Ships ${assemblies.join(', ')}.` : '';
  const dir = folders
    .map((folder) => path.join(folder, name.toLowerCase(), version.toLowerCase()))
    .find((candidate) => fs.existsSync(candidate));
  if (!dir) {
    return {
      name,
      version,
      license: override.license || 'UNKNOWN (verify)',
      // A curated override is a recorded human determination, so it classifies even though nothing
      // could be read from disk. Without this, every `alwaysList` package — restored only on the
      // platform it ships for — would warn as unresolved on every other platform.
      licenseId: override.license,
      note: [ships, override.note || 'Not present in the local NuGet packages folder.']
        .filter(Boolean)
        .join(' '),
      // No nuspec was read, so nothing is known about its copyright notice — which is not the same
      // as knowing it has none, and must not be reported as if it were.
      inspected: false,
    };
  }

  const nuspec = readLicenseFile(path.join(dir, `${name.toLowerCase()}.nuspec`)) || '';
  const expression = xmlMatch(nuspec, /<license\s+type="expression"[^>]*>([\s\S]*?)<\/license>/i);
  const licenseFile = xmlMatch(nuspec, /<license\s+type="file"[^>]*>([\s\S]*?)<\/license>/i);
  const url = xmlMatch(nuspec, /<licenseUrl>([\s\S]*?)<\/licenseUrl>/i);
  const copyright = xmlMatch(nuspec, /<copyright>([\s\S]*?)<\/copyright>/i);

  let text = readLicenseText(dir);
  if (!text && licenseFile) text = readLicenseFile(path.join(dir, licenseFile));

  // `license` is what the table displays and may carry provenance ("MIT (from bundled `LICENSE`)");
  // `licenseId` is the bare value the copyleft gate classifies. Keeping them apart matters: the
  // display form is not a parseable SPDX expression, so classifying it would report every
  // provenance-annotated package as unresolved.
  let { license } = override;
  let licenseId = override.license;
  if (!license && expression) {
    // An election only ever applies to a declared SPDX expression, so it is resolved here rather
    // than over the final display value: the `licenseUrl` and bundled-file branches below produce
    // prose, and electing a branch of prose is not a thing.
    ({ license, effective: licenseId } = electLicense(expression, DOTNET_ELECTED_LICENSES[name]));
  }
  if (!license && url && !/aka\.ms\/deprecateLicenseUrl/i.test(url)) {
    const opensource = /opensource\.org\/licenses\/([A-Za-z0-9.+-]+)/.exec(url);
    licenseId =
      NUGET_LICENSE_URLS[url] ||
      (opensource ? opensource[1] : undefined) ||
      (/apache\.org\/licenses\/LICENSE-2\.0/i.test(url) ? 'Apache-2.0' : undefined);
    license = licenseId || `UNKNOWN (verify) — ${url}`;
  }
  if (!license && licenseFile && text) {
    const identified = identifyLicenseFromText(text);
    licenseId = identified;
    license = identified
      ? `${identified} (from bundled \`${licenseFile}\`)`
      : `See reproduced \`${licenseFile}\` (verify)`;
  }
  if (!license) license = 'UNKNOWN (verify)';

  return {
    name,
    version,
    license,
    licenseId,
    note: [ships, override.note || copyright].filter(Boolean).join(' '),
    // Kept separate from `note`, which is display prose the override may have replaced wholesale. A
    // canonical license text has to be paired with the package's own copyright notice, and that
    // pairing needs the notice itself, not a sentence that happens to contain it.
    copyright,
    inspected: true,
    text,
  };
}

function buildDotnetReport(texts, useCanonicalText) {
  // Validates the assets file before anything else, so a missing restore reports itself rather than
  // surfacing as a downstream symptom.
  const packages = collectDotnetPackages();
  // Without a readable packages folder every license resolves to UNKNOWN, which is a silently
  // useless .NET section rather than a missing one — so treat it the same as a missing assets file.
  const folders = Object.keys(readJson(DOTNET_ASSETS).packageFolders || {}).filter((folder) =>
    fs.existsSync(folder),
  );
  if (!folders.length) {
    throw new Error(
      'None of the NuGet package folders named in ' +
        `${path.relative(REPO, DOTNET_ASSETS)} exist on this machine, so no license could be read ` +
        `from any nuspec.\nRun: dotnet restore ${DOTNET_PROJECT}`,
    );
  }
  return packages.map((pkg) => {
    const resolved = resolveNugetPackage(folders, pkg);
    if (resolved.text) {
      const hash = crypto.createHash('sha1').update(resolved.text).digest('hex');
      if (!texts.has(hash)) texts.set(hash, { text: resolved.text, packages: [] });
      texts.get(hash).packages.push(`${pkg.name}@${pkg.version} (NuGet)`);
    }
    return {
      name: resolved.name,
      version: resolved.version,
      license: resolved.license,
      note: resolved.note,
      // A `(verify)` marker means the license could not be resolved from metadata, so the value
      // beside it is an inference. Classify it as unresolved rather than trusting the guess — the
      // whole point of the marker is that a human has yet to confirm it.
      classification: resolved.license.includes('(verify)')
        ? 'unknown'
        : classifyLicense(resolved.licenseId),
      hasText: !!resolved.text,
      // Only reached when the package itself shipped nothing, so a canonical text never displaces a
      // package's own copy of its license.
      hasCanonicalText:
        !resolved.text &&
        useCanonicalText(resolved.licenseId, {
          name: resolved.name,
          version: resolved.version,
          ecosystem: 'NuGet',
          copyright: resolved.copyright,
          inspected: resolved.inspected,
        }),
    };
  });
}

function buildReport() {
  // One read, two consumers: the lockfile is several megabytes, and parsing it twice to walk the
  // same `packages` map twice is pure waste.
  const lock = readJson(path.join(REPO, 'package-lock.json')) || {};
  const own = collectOwnPackageNames(lock);
  const fromLock = lockfileLicenses(lock);
  const packages = collectProductionPackages()
    .filter((pkg) => !own.has(pkg.name))
    .sort(
      (first, second) =>
        first.name.localeCompare(second.name) || first.version.localeCompare(second.version),
    );

  const texts = new Map(); // sha1 of license text -> { text, packages: [] }
  const canonical = new Map(); // SPDX id -> { text, packages: [credit line] }
  const rows = [];
  const notInstalled = [];

  const available = canonicalLicenseTexts();
  /**
   * Reproduces the canonical text of `licenseId` on `pkg`'s behalf, if one is checked in; reports
   * whether it could. Both ecosystems route through here so a reader never has to work out which
   * kind of package a text was reproduced for — the credit line beside it says so.
   */
  const useCanonicalText = (licenseId, pkg) => {
    const entry = licenseId ? available.get(licenseId.trim().toLowerCase()) : undefined;
    if (!entry) return false;
    if (!canonical.has(entry.id)) canonical.set(entry.id, { text: entry.text, packages: [] });
    canonical.get(entry.id).packages.push(canonicalTextCredit(pkg));
    return true;
  };

  packages.forEach((pkg) => {
    const dir = findPackageDir(pkg.name);
    const manifest = dir ? readJson(path.join(dir, 'package.json')) : undefined;
    // A miss on the exact `name@version` reports UNKNOWN rather than retrying by bare name. A
    // bare-name retry would reinstate the mis-attribution the versioned key removes — and UNKNOWN
    // is loud (it classifies as `unknown`, so the gate warns), whereas a confidently wrong
    // identifier is silent. An admitted gap beats a wrong answer in a legal document.
    const declared = manifest
      ? licenseIdOf(manifest)
      : fromLock.get(`${pkg.name}@${pkg.version}`) || 'UNKNOWN';
    const text = readLicenseText(dir);

    if (!dir) notInstalled.push(pkg.name);
    if (text) {
      const hash = crypto.createHash('sha1').update(text).digest('hex');
      if (!texts.has(hash)) texts.set(hash, { text, packages: [] });
      texts.get(hash).packages.push(`${pkg.name}@${pkg.version}`);
    }
    const { license, effective } = electLicense(declared, ELECTED_LICENSES[pkg.name]);
    rows.push({
      ...pkg,
      license,
      classification: classifyLicense(effective),
      hasText: !!text,
      // An npm manifest has no copyright field, so a canonical text reproduced here carries SPDX's
      // placeholder and says as much — inventing a holder from `author` would be worse than the gap.
      hasCanonicalText:
        !text &&
        useCanonicalText(effective, {
          name: pkg.name,
          version: pkg.version,
          ecosystem: 'npm',
          inspected: !!dir,
        }),
    });
  });

  return {
    rows,
    texts,
    canonical,
    notInstalled,
    dotnetRows: buildDotnetReport(texts, useCanonicalText),
  };
}

function render({ rows, texts, canonical, notInstalled, dotnetRows }) {
  const counts = rows.reduce(
    (acc, row) => ({ ...acc, [row.license]: (acc[row.license] || 0) + 1 }),
    {},
  );
  const names = (subset) => subset.map((row) => `\`${row.name}\``).join(', ');
  const noText = rows.filter((row) => !row.hasText);
  const noTextCanonical = noText.filter((row) => row.hasCanonicalText);
  const noTextAtAll = noText.filter((row) => !row.hasCanonicalText);
  const out = [];

  out.push('# Third-party notices', '');
  out.push(
    'Platform.Bible incorporates the third-party components listed below. Where a component ships a',
    'license file of its own, that text is reproduced in full, as those licenses require; where it ships',
    'none but declares an SPDX identifier, the canonical text of that license is reproduced instead,',
    'marked as coming from SPDX rather than from the component. This file covers the redistributable',
    'closure of **this repository**: the npm production dependency tree that webpack compiles into',
    '`dist/`, the NuGet closure of the bundled .NET data provider, and Electron. Build and test tooling',
    'is excluded because it is not distributed.',
    '',
    '**This is a reference, not the notices for any shipped product.** A distributed application',
    'built on paranext-core carries its own dependencies on top of these, and must generate its own',
    'notices covering both. This file is also generated on Linux, so the NuGet closure is the Linux',
    'one — a Windows build additionally resolves `Microsoft.ICU.ICU4C.Runtime` (listed here anyway)',
    'and platform-specific native packages that do not appear below.',
    '',
    '> Generated by `.erb/scripts/generate-third-party-notices.js`. Do not edit by hand; run',
    '> `npm run build:third-party-notices` after changing production dependencies. CI regenerates it',
    '> on Linux and fails if the committed copy is out of date.',
    '',
    'For the license covering Platform.Bible itself, see [LICENSING.md](./LICENSING.md).',
    '',
  );

  out.push('## Electron, Chromium, and Node.js', '');
  out.push(
    'The packaged application embeds Electron (MIT), which in turn bundles Chromium, V8, and',
    'Node.js under their own licenses. Electron ships those notices inside the packaged',
    'application as `LICENSE.electron.txt` and `LICENSES.chromium.html`; both are installed',
    'alongside the executable and are the authoritative text for those components.',
    '',
  );

  out.push('## .NET data provider (NuGet)', '');
  out.push(
    'The data provider is published self-contained and its entire publish directory is copied into',
    'the packaged application (`electron-builder.json5` `extraResources` → `./dotnet/`), so every',
    'assembly in the restore closure ships — not only the direct `PackageReference` entries.',
    `The ${dotnetRows.length} packages below are derived from \`c-sharp/obj/project.assets.json\`,`,
    'with licenses read from each package’s nuspec. A "Ships …" note names the assemblies a package',
    'contributes under a different name — including assemblies of separate projects that it',
    'redistributes, whose own upstream notices this package-level view does not reproduce.',
    '',
    'Excluded from the table: packages that contribute no runtime, native, or resource asset (MSBuild',
    'and analyzer tooling, metapackages), and packages whose assemblies the .NET 8 shared framework',
    'supersedes — including the per-RID `runtime.*` asset shims. Those belong to the .NET runtime',
    'itself, which is bundled by the self-contained publish and is licensed by Microsoft under the',
    'MIT License (<https://github.com/dotnet/runtime/blob/main/LICENSE.TXT>).',
    '',
    'The build also copies the platform ICU C libraries next to the executable (`libicu*` from the',
    'build machine on Linux and macOS; the `Microsoft.ICU.ICU4C.Runtime` package on Windows). ICU is',
    'distributed under the Unicode license, which requires its copyright and permission notice to',
    'travel with copies.',
    '',
  );
  out.push('| Package | Version | License | Notes |', '| --- | --- | --- | --- |');
  dotnetRows.forEach((row) =>
    out.push(`| \`${row.name}\` | ${row.version} | ${cell(row.license)} | ${cell(row.note)} |`),
  );
  out.push('');
  const dotnetNoText = dotnetRows.filter((row) => !row.hasText);
  const dotnetNoTextAtAll = dotnetNoText.filter((row) => !row.hasCanonicalText);
  if (dotnetNoText.length) {
    out.push(
      `${dotnetNoText.length} of these packages bundle no license file, so nothing of theirs appears in the "License`,
      'texts" section and the Notes column carries the copyright line from their nuspec instead. For the',
      `${dotnetNoText.length - dotnetNoTextAtAll.length} of them whose declared license is an SPDX identifier, the canonical text of that`,
      'identifier is reproduced under "Canonical license texts for declared identifiers" below — SPDX’s',
      'text, not the package’s.',
      '',
    );
  }
  if (dotnetNoTextAtAll.length) {
    out.push(
      `No license text is reproduced anywhere for the remaining ${dotnetNoTextAtAll.length}, whose license is recorded as free`,
      'text rather than as an SPDX identifier a canonical text is checked in for:',
      `${names(dotnetNoTextAtAll)}.`,
      '',
    );
  }
  const dotnetVerify = dotnetRows.filter((row) => row.license.includes('(verify)'));
  if (dotnetVerify.length) {
    out.push(
      'Entries marked `(verify)` could not be resolved from local nuspec metadata and need',
      `confirmation against the published package before a binary release: ${dotnetVerify
        .map((row) => `\`${row.name}\``)
        .join(', ')}.`,
      '',
    );
  }

  out.push('## npm production dependencies', '');
  out.push(`${rows.length} packages. License distribution:`, '');
  out.push('| License | Packages |', '| --- | --- |');
  Object.entries(counts)
    .sort(([, firstCount], [, secondCount]) => secondCount - firstCount)
    .forEach(([license, count]) => out.push(`| ${license} | ${count} |`));
  out.push('');

  if (notInstalled.length) {
    out.push(
      `Not installed on the generating platform, so the license below comes from \`package-lock.json\`: ${notInstalled
        .map((name) => `\`${name}\``)
        .join(', ')}.`,
      '',
    );
  }
  if (noTextCanonical.length) {
    out.push(
      'The following ship no license file of their own, so the identifier in the table below comes',
      'from their `package.json` (or the lockfile) and nothing of theirs appears under "License',
      'texts". The canonical text of the license each one declares is reproduced under "Canonical',
      `license texts for declared identifiers" instead: ${names(noTextCanonical)}.`,
      '',
    );
  }
  if (noTextAtAll.length) {
    out.push(
      'The following ship no license file of their own and declare no identifier a canonical text is',
      `checked in for, so no license text for them appears below at all: ${names(noTextAtAll)}.`,
      '',
    );
  }

  out.push('| Package | Version | License |', '| --- | --- | --- |');
  rows.forEach((row) => out.push(`| \`${row.name}\` | ${row.version} | ${row.license} |`));
  out.push('');

  out.push('## License texts', '');
  out.push(
    `The ${texts.size} distinct license texts below cover the packages named beneath each heading.`,
    ...(canonical.size
      ? [
          'Every one of them was read from a package that ships it. Texts reproduced from SPDX, for',
          'packages that ship none, are in the section after this one instead.',
        ]
      : []),
    '',
  );
  [...texts.values()].forEach(({ text, packages: covered }, index) => {
    out.push(`### ${index + 1}. ${covered.join(', ')}`, '', '```text', text, '```', '');
  });

  if (canonical.size) {
    out.push('## Canonical license texts for declared identifiers', '');
    out.push(
      'The packages below declare a license but ship no copy of it, so there is nothing of theirs to',
      'reproduce above — and an identifier alone does not discharge "this permission notice shall be',
      'included in all copies". **The texts in this section come from the SPDX license list, not from',
      'the packages.** Each is the license exactly as SPDX publishes it, with SPDX’s own placeholders',
      '(`<year>`, `<copyright holders>`, `[yyyy]`) left unfilled. They are checked into',
      '`.erb/scripts/license-texts/`, whose README records where each came from; nothing is fetched',
      'when this file is generated.',
      '',
      'Each package is listed with the copyright notice from its own metadata, which is the notice',
      'that belongs with the text beside it. No copyright holder is inferred: where a package records',
      'none, that is stated rather than left blank.',
      '',
    );
    [...canonical.entries()]
      .sort(([first], [second]) => first.localeCompare(second))
      .forEach(([id, { text, packages: covered }]) => {
        out.push(
          `### ${id} — canonical text, ${covered.length} package${covered.length === 1 ? '' : 's'}`,
          '',
        );
        covered.forEach((credit) => out.push(`- ${credit}`));
        out.push('', '```text', text, '```', '');
      });
  }

  return `${out.join('\n')}\n`;
}

let report;
try {
  report = buildReport();
} catch (err) {
  // A stack trace buries the one thing that matters here — what to run to fix it — so report the
  // message alone. The previous artifact is left untouched rather than replaced with a short one.
  console.error(`\nERROR: ${err.message}\n`);
  process.exit(1);
}

// Write before gating, so a failing build still leaves the evidence to inspect.
fs.writeFileSync(OUT, render(report));
console.log(
  `Wrote ${path.relative(REPO, OUT)}: ${report.rows.length} npm packages, ${report.dotnetRows.length} NuGet packages, ${report.texts.size} distinct license texts.`,
);

// The gate covers both ecosystems: a copyleft NuGet package would extend its terms to the packaged
// application exactly as an npm one would, and the .NET publish output ships wholesale.
const allRows = [...report.rows, ...report.dotnetRows];
const blocking = allRows.filter((row) => row.classification === 'blocking');
const weak = allRows.filter((row) => row.classification === 'weak');
const unknown = allRows.filter((row) => row.classification === 'unknown');

weak.forEach((row) =>
  console.warn(`  warning: ${row.name}@${row.version} is file-level copyleft (${row.license}).`),
);
unknown.forEach((row) =>
  console.warn(`  warning: ${row.name}@${row.version} declares no resolvable license.`),
);

if (blocking.length) {
  console.error(
    `\nERROR: ${blocking.length} production dependency/dependencies are under strong copyleft:`,
  );
  blocking.forEach((row) => console.error(`  - ${row.name}@${row.version}: ${row.license}`));
  console.error(
    '\nShipping these would extend their copyleft to the distributed application, which is',
    '\nincompatible with releasing the binary under separate end-user terms (see LICENSING.md).',
    '\nRemove or replace the dependency. If it is genuinely dual-licensed and a permissive branch',
    '\napplies, record that election in this script — ELECTED_LICENSES for npm,',
    '\nDOTNET_ELECTED_LICENSES for NuGet — so the choice is explicit.',
  );
  process.exit(1);
}
