const { execFileSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { compareByNameThenVersion, compareVersions } = require('./compare');
const { readNugetLicenseFiles, readPackageNotices } = require('./package-files');

const REPO = path.resolve(__dirname, '..', '..', '..');
const DOTNET_PROJECT = path.join(REPO, 'c-sharp', 'ParanextDataProvider.csproj');
const DOTNET_ASSETS = path.join(REPO, 'c-sharp', 'obj', 'project.assets.json');

/**
 * Every runtime the application is published for. The NuGet closure is RID-dependent, and a notices
 * file generated from one RID silently omits the others' packages - which matters now that the
 * artifact ships inside every platform's installer.
 */
const RIDS = ['linux-x64', 'win-x64', 'osx-x64', 'osx-arm64'];

/**
 * A believable restore closure is well over a hundred packages. Anything near the eight direct
 * PackageReference entries means the assets file is stale or partial, and a short .NET section is
 * precisely the failure this generator exists to prevent - so it is a hard error, never a quietly
 * truncated file.
 */
const DOTNET_MIN_PACKAGES = 40;

/**
 * Packages the .NET 8 shared framework supersedes, as `<id>|<version>`.
 *
 * Verbatim from `packs/Microsoft.NETCore.App.Ref/8.0.x/data/PackageOverrides.txt` in the .NET 8
 * SDK, which is the same list the SDK itself uses to discard a package's assembly in favour of the
 * framework's. The `runtime.*` entries are omitted because those are dropped wholesale (see
 * `isFrameworkPackage`). Refresh this if the data provider ever retargets past net8.0.
 */
const NET8_FRAMEWORK_OVERRIDES = `
Microsoft.CSharp|4.4.0 Microsoft.Win32.Primitives|4.3.0 Microsoft.Win32.Registry|4.4.0
System.AppContext|4.3.0 System.Buffers|4.4.0 System.Collections.Concurrent|4.3.0
System.Collections.Immutable|1.4.0 System.Collections.NonGeneric|4.3.0
System.Collections.Specialized|4.3.0 System.Collections|4.3.0
System.ComponentModel.EventBasedAsync|4.3.0 System.ComponentModel.Primitives|4.3.0
System.ComponentModel.TypeConverter|4.3.0 System.ComponentModel|4.3.0 System.Console|4.3.0
System.Data.Common|4.3.0 System.Diagnostics.Contracts|4.3.0 System.Diagnostics.Debug|4.3.0
System.Diagnostics.DiagnosticSource|4.4.0 System.Diagnostics.FileVersionInfo|4.3.0
System.Diagnostics.Process|4.3.0 System.Diagnostics.StackTrace|4.3.0
System.Diagnostics.TextWriterTraceListener|4.3.0 System.Diagnostics.Tools|4.3.0
System.Diagnostics.TraceSource|4.3.0 System.Diagnostics.Tracing|4.3.0
System.Dynamic.Runtime|4.3.0 System.Globalization.Calendars|4.3.0
System.Globalization.Extensions|4.3.0 System.Globalization|4.3.0
System.IO.Compression.ZipFile|4.3.0 System.IO.Compression|4.3.0
System.IO.FileSystem.AccessControl|4.4.0 System.IO.FileSystem.DriveInfo|4.3.0
System.IO.FileSystem.Primitives|4.3.0 System.IO.FileSystem.Watcher|4.3.0
System.IO.FileSystem|4.3.0 System.IO.IsolatedStorage|4.3.0 System.IO.MemoryMappedFiles|4.3.0
System.IO.Pipes|4.3.0 System.IO.UnmanagedMemoryStream|4.3.0 System.IO|4.3.0
System.Linq.Expressions|4.3.0 System.Linq.Queryable|4.3.0 System.Linq|4.3.0
System.Net.Http|4.3.0 System.Net.NameResolution|4.3.0 System.Net.Primitives|4.3.0
System.Net.Requests|4.3.0 System.Net.Security|4.3.0 System.Net.Sockets|4.3.0
System.Net.WebHeaderCollection|4.3.0 System.ObjectModel|4.3.0
System.Private.DataContractSerialization|4.3.0 System.Reflection.Emit.ILGeneration|4.3.0
System.Reflection.Emit.Lightweight|4.3.0 System.Reflection.Emit|4.3.0
System.Reflection.Extensions|4.3.0 System.Reflection.Metadata|1.5.0
System.Reflection.Primitives|4.3.0 System.Reflection.TypeExtensions|4.3.0
System.Reflection|4.3.0 System.Resources.ResourceManager|4.3.0 System.Runtime.Extensions|4.3.0
System.Runtime.Handles|4.3.0 System.Runtime.InteropServices.RuntimeInformation|4.3.0
System.Runtime.InteropServices|4.3.0 System.Runtime.Loader|4.3.0 System.Runtime.Numerics|4.3.0
System.Runtime.Serialization.Formatters|4.3.0 System.Runtime.Serialization.Json|4.3.0
System.Runtime.Serialization.Primitives|4.3.0 System.Runtime|4.3.0
System.Security.AccessControl|4.4.0 System.Security.Claims|4.3.0
System.Security.Cryptography.Algorithms|4.3.0 System.Security.Cryptography.Cng|4.4.0
System.Security.Cryptography.Csp|4.3.0 System.Security.Cryptography.Encoding|4.3.0
System.Security.Cryptography.OpenSsl|4.4.0 System.Security.Cryptography.Primitives|4.3.0
System.Security.Cryptography.X509Certificates|4.3.0 System.Security.Cryptography.Xml|4.4.0
System.Security.Principal.Windows|4.4.0 System.Security.Principal|4.3.0
System.Text.Encoding.Extensions|4.3.0 System.Text.Encoding|4.3.0
System.Text.RegularExpressions|4.3.0 System.Threading.Overlapped|4.3.0
System.Threading.Tasks.Extensions|4.3.0 System.Threading.Tasks.Parallel|4.3.0
System.Threading.Tasks|4.3.0 System.Threading.ThreadPool|4.3.0 System.Threading.Thread|4.3.0
System.Threading.Timer|4.3.0 System.Threading|4.3.0 System.ValueTuple|4.3.0
System.Xml.ReaderWriter|4.3.0 System.Xml.XDocument|4.3.0 System.Xml.XPath.XDocument|4.3.0
System.Xml.XPath|4.3.0 System.Xml.XmlDocument|4.3.0 System.Xml.XmlSerializer|4.3.0
`;

const frameworkOverrides = new Map(
  NET8_FRAMEWORK_OVERRIDES.trim()
    .split(/\s+/)
    .map((entry) => entry.split('|'))
    .map(([id, version]) => [id.toLowerCase(), version]),
);

/**
 * Whether a NuGet package's assemblies come from the .NET 8 shared framework rather than the
 * package.
 *
 * The SDK discards such a package's assembly at publish time in favour of the framework's, so it
 * contributes nothing to the shipped output and is not a separately-licensed component.
 *
 * The comparison is `<=` over the whole version, which is what the SDK's own `PackageOverrides`
 * handling does. Comparing majors alone drops packages that genuinely ship: `System.Buffers 4.6.1`
 * is newer than the 4.4.0 the framework supersedes, so its assembly is the one that lands in the
 * publish output - and dropping it removes a real component from the notices _before_ it reaches
 * the copyleft gate, silently and with no count that would reveal the loss.
 */
function isFrameworkPackage(id, version) {
  // `runtime.*` packages carry no code of their own - they are per-RID asset shims that route .NET
  // platform assemblies and native libraries. Their payload belongs to the .NET runtime, which the
  // ".NET runtime" note in the generated file covers as a whole.
  if (/^runtime\./i.test(id)) return true;
  const supersededThrough = frameworkOverrides.get(id.toLowerCase());
  if (supersededThrough === undefined) return false;
  return compareVersions(version, supersededThrough) <= 0;
}

/**
 * Refuses a NuGet closure too small to be this project's.
 *
 * `scope` names WHICH closure, because this now runs twice at different granularities and the
 * distinction is the whole point of the per-RID call. Run only on the post-merge union, this cannot
 * see a partial or empty result for ONE runtime identifier: the union of the other three stays far
 * above the floor, and the only thing lost is that RID's UNIQUE packages - the six Windows-only
 * shims `win-x64` alone contributes, which is exactly the four-RID union's entire reason for
 * existing (see ADR-0023). Silently, and with the count still looking healthy. So each RID's own
 * result is checked before it is merged, and the union is checked after.
 *
 * @param {object[]} packages
 * @param {string} [scope] What was counted, when it is not the whole closure.
 * @returns {object[]}
 */
function assertFloor(packages, scope = '') {
  if (packages.length < DOTNET_MIN_PACKAGES)
    throw new Error(
      `NuGet closure${scope ? ` for ${scope}` : ''} has ${packages.length} packages; expected at ` +
        `least ${DOTNET_MIN_PACKAGES}. ` +
        'The restore is stale or partial. Run: dotnet restore c-sharp/ParanextDataProvider.csproj',
    );
  return packages;
}

/**
 * True when an asset group contributes at least one real file. `_._` is NuGet's placeholder for
 * "this package deliberately has nothing for this group" - present on analyzer-only and
 * MSBuild-tooling packages so the group is never literally absent, only empty of anything shipped.
 */
function shipsSomething(assetGroup) {
  return !!assetGroup && Object.keys(assetGroup).some((file) => !file.endsWith('_._'));
}

/**
 * The shipping determination `nuget-license -t` does not make.
 *
 * `nuget-license` answers "what is in the restore closure" - every package the closure resolves,
 * including analyzers, MSBuild-only tooling, metapackages, and packages the .NET 8 shared framework
 * supersedes. None of those contribute a file to the published app, so listing them would assert
 * this project redistributes ~100 Microsoft framework components it does not - over-disclosure that
 * misstates the closure as badly as under-disclosure does. This mirrors the two filters the old
 * project.assets.json walk applies:
 *
 * 1. The package must contribute a real (non-placeholder) asset in `runtime`, `runtimeTargets`,
 *    `native`, or `resource`.
 * 2. `isFrameworkPackage(id, version)` must be false.
 *
 * Returns a Map from `<id>@<version>` (lowercased, for case-insensitive NuGet id/version matching)
 * to the assembly filenames that package ships under a name other than its own id (`SharpZipLib`
 * ships `ICSharpCode.SharpZipLib.dll`; `GlyssenCharacters` redistributes `FuzzySharp.dll`, a
 * separate project) - the mapping that lets a reader trace a file under `dotnet/` back to the row
 * carrying its notice.
 *
 * Every target in the assets file is scanned, not only the RID-specific one, and a package ships if
 * ANY target shows a real asset - exactly what the old walker's
 * `Object.keys(assets.targets).sort()` loop with a `found.has(key)` dedup did. This matters because
 * a single-RID restore's assets file has (at least) two targets: a RID-agnostic one (e.g. `net8.0`)
 * and a RID-specific one (e.g. `net8.0/win-x64`), and `runtimeTargets` - exactly where
 * cross-platform native assets live - hangs off the RID-agnostic target, not the RID-specific one.
 * `Icu4c.Win.Min` is the concrete case: its win7-x64 native ICU DLLs resolve under the `net8.0`
 * target's `runtimeTargets`, while its `net8.0/<rid>` target entry contributes only a `_._`
 * placeholder. Reading only the RID-specific target would silently drop it, and every other package
 * shipping a native asset the same way.
 *
 * @param {{ targets?: Record<string, Record<string, object>> }} assets Parsed project.assets.json.
 * @param {string} rid Used only to sanity-check the assets file was actually restored for this RID.
 * @returns {Map<string, string[]>}
 */
function parseShippingSet(assets, rid) {
  const targets = assets.targets || {};
  if (!Object.keys(targets).some((key) => key.endsWith(`/${rid}`)))
    throw new Error(
      `project.assets.json has no ${rid}-specific target - was it restored with ` +
        `'dotnet restore ${DOTNET_PROJECT} -r ${rid}'?`,
    );

  const ships = new Map();
  Object.keys(targets)
    .sort()
    .forEach((targetKey) => {
      Object.entries(targets[targetKey]).forEach(([key, entry]) => {
        const [id, version] = key.split('/');
        if (!id || !version) return;
        const mapKey = `${id}@${version}`.toLowerCase();
        // Already established as shipping from an earlier (sorted-first) target - no need to
        // re-evaluate, and re-evaluating could only ever narrow a decision this loop already made
        // to include the package.
        if (ships.has(mapKey)) return;
        if (
          !shipsSomething(entry.runtime) &&
          !shipsSomething(entry.runtimeTargets) &&
          !shipsSomething(entry.native) &&
          !shipsSomething(entry.resource)
        )
          return;
        if (isFrameworkPackage(id, version)) return;

        const assemblies = Object.keys(entry.runtime || {})
          .filter((file) => !file.endsWith('_._'))
          .map((file) => path.basename(file))
          .filter((file) => file.replace(/\.dll$/i, '').toLowerCase() !== id.toLowerCase())
          .sort();
        ships.set(mapKey, assemblies);
      });
    });
  return ships;
}

/** I/O wrapper around parseShippingSet: reads whatever project.assets.json the last restore left. */
function readShippingSet(rid) {
  return parseShippingSet(JSON.parse(fs.readFileSync(DOTNET_ASSETS, 'utf8')), rid);
}

/**
 * The NuGet package folders named by a restore, filtered to the ones that exist on this machine.
 *
 * These are the roots the packages themselves were unpacked into - normally `~/.nuget/packages/` -
 * and they are what makes reproducing a package's own licence text possible without a network:
 * everything is already on disk from the restore this function's caller just performed.
 *
 * @param {{ packageFolders?: Record<string, object> }} assets Parsed project.assets.json.
 * @returns {string[]}
 */
function parsePackageFolders(assets) {
  return Object.keys(assets.packageFolders || {}).filter((folder) => fs.existsSync(folder));
}

/**
 * Where a package was unpacked, or `undefined` when no folder holds it.
 *
 * NuGet lowercases both segments on disk, and ids and versions are matched case-insensitively.
 *
 * @param {string[]} folders
 * @param {string} name
 * @param {string} version
 * @returns {string | undefined}
 */
function resolvePackageDir(folders, name, version) {
  return folders
    .map((folder) => path.join(folder, name.toLowerCase(), version.toLowerCase()))
    .find((candidate) => fs.existsSync(candidate));
}

/**
 * Attaches each package's own bundled licence file(s), read from the package folder.
 *
 * A NuGet package that ships a licence file must have THAT text reproduced, not the canonical SPDX
 * text of whatever its nuspec declares. The two are not interchangeable: 58 packages in this
 * closure bundle the shared Microsoft `LICENSE.TXT`, whose copyright notice names ".NET Foundation
 * and Contributors", while their nuspecs name "© Microsoft Corporation". MIT obliges "the above
 * copyright notice ... shall be included in all copies", and the notice it means is the one in the
 * licence file - so substituting SPDX's `<copyright holders>` placeholder plus a different entity's
 * credit line discharges nothing.
 *
 * This is REPRODUCTION only, never classification: the text is not fed to `policy.js` as a second
 * signal, because `nuget-license` reports nuspec metadata and there is no independent manifest to
 * reconcile against. Verdicts are unaffected by what is found here.
 *
 * Throws when no package folder exists, and equally when one PACKAGE's folder does not, rather than
 * quietly reporting the package as shipping no text: that failure looks exactly like a package that
 * bundles no licence, and it would silently drop its own notice from a legal artifact.
 *
 * @param {object[]} packages
 * @param {string[]} folders
 * @returns {object[]}
 */
function attachLicenseFiles(packages, folders) {
  if (!folders.length)
    throw new Error(
      'none of the NuGet package folders named in ' +
        `${path.relative(REPO, DOTNET_ASSETS)} exist on this machine, so no package's own license ` +
        `text could be read.\nRun: dotnet restore ${DOTNET_PROJECT}`,
    );
  // The all-or-nothing case was guarded above; this is the per-package one, and it fails the same
  // way for the same reason. `resolvePackageDir` answers `undefined` for a folder that is not there
  // - a version NuGet normalized differently on disk, a package pruned out of `~/.nuget/packages`
  // since the restore - and `readNugetLicenseFiles(undefined)` then answers `[]`, which is
  // indistinguishable from a package that genuinely bundles no licence file. The document would say
  // so, and substitute SPDX's `<copyright holders>` placeholder for a real ".NET Foundation and
  // Contributors" notice that MIT obliges to travel with copies.
  const unresolved = packages.filter((pkg) => !resolvePackageDir(folders, pkg.name, pkg.version));
  if (unresolved.length)
    throw new Error(
      `${unresolved.length} restored NuGet package(s) have no folder under any of the package ` +
        `folders named in ${path.relative(REPO, DOTNET_ASSETS)}, so their own license text could ` +
        `not be read:\n${unresolved
          .slice(0, 10)
          .map((pkg) => `  ${pkg.name}@${pkg.version}`)
          .join('\n')}\n` +
        `Run: dotnet restore ${DOTNET_PROJECT}`,
    );
  return packages.map((pkg) => {
    const dir = resolvePackageDir(folders, pkg.name, pkg.version);
    return {
      ...pkg,
      licenseFiles: readNugetLicenseFiles(dir),
      // A NOTICE is not a licence, but Apache-2.0 section 4(d) requires its attributions to travel
      // with every redistribution - an obligation the licence text alone does not discharge. Read
      // on this side as well as the npm one, or `render.js`'s NOTICE section can never fire for a
      // NuGet package: four in the current closure ship one (all MIT today, so none is owed, but
      // two NuGet packages here are Apache-2.0 and the next one to ship a NOTICE would be).
      notices: readPackageNotices(dir),
    };
  });
}

/**
 * Turns nuget-license's structured `ValidationErrors` (`{ Error, Context }` objects) into the plain
 * strings policy.js's contract expects (`validationErrors: string[]`, later joined with `'; '` into
 * a block message - an unnormalized object would render as `[object Object]` there, on the one path
 * where the message IS the entire value of the tool). `Context` is the absolute path to the project
 * file nuget-license was run against - identical across every entry in a single-project invocation,
 * and a local machine path besides - so only `Error` carries information worth keeping.
 * Deduplicated because nuget-license reports the same finding once per resolved target in the
 * restore, which would otherwise repeat verbatim in a block message.
 *
 * @param {unknown} errors
 * @returns {string[]}
 */
function normalizeValidationErrors(errors) {
  if (!Array.isArray(errors)) return [];
  const messages = errors
    .map((error) => {
      if (typeof error === 'string') return error;
      return error && typeof error === 'object' && typeof error.Error === 'string'
        ? error.Error
        : undefined;
    })
    .filter((message) => typeof message === 'string' && message.length > 0);
  return [...new Set(messages)];
}

/**
 * Merges per-RID nuget-license output into one set, recording which RIDs each package came from.
 *
 * @param {{ rid: string; packages: object[] }[]} runs
 * @returns {object[]}
 */
function mergeRidResults(runs) {
  const byKey = new Map();
  // NuGet ids and versions are case-insensitive, and every other id/version comparison in this file
  // already lowercases before matching (`parseShippingSet`, `resolvePackageDir`,
  // `missingDirectReferences`). Keying on the raw spelling here would let two RIDs that spell an id
  // or a pre-release version differently produce two rows for one shipped component.
  const keyOf = (p) => `${p.PackageId}@${p.PackageVersion}`.toLowerCase();

  runs.forEach(({ rid, packages }) => {
    packages.forEach((p) => {
      const key = keyOf(p);
      const declaredField =
        // Origin 2 is "Unknown": nuget-license could not establish a license. Leaving the field
        // undefined routes it to the same block path as any other undeclared package rather than
        // letting an absence of information read as permission.
        p.LicenseInformationOrigin === 2 ? undefined : p.License || undefined;
      if (!byKey.has(key)) {
        byKey.set(key, {
          ecosystem: 'nuget',
          name: p.PackageId,
          version: p.PackageVersion,
          declaredField,
          copyright: p.Copyright || undefined,
          validationErrors: normalizeValidationErrors(p.ValidationErrors),
          // Set by collectNugetPackages from parseShippingSet - absent when a caller passes packages
          // straight from nuget-license (e.g. in tests) without going through the shipping filter.
          assemblies: p.Assemblies || [],
          rids: [],
        });
        byKey.get(key).rids.push(rid);
        return;
      }

      // Everything below is what a LATER RID contributes. Keeping only the first occurrence
      // discards an "Unknown" origin, a validation error, or an assembly reported for the second,
      // third or fourth RID - and `policy.js` treats `validationErrors` as an authoritative "never
      // a permissive result" signal. Each merge below moves in the conservative direction, so no
      // RID's finding can be lost to the order the RIDs happen to run in.
      const merged = byKey.get(key);
      merged.rids.push(rid);
      merged.validationErrors = [
        ...new Set([...merged.validationErrors, ...normalizeValidationErrors(p.ValidationErrors)]),
      ];
      // An assembly that only one RID's publish output carries is still shipped, by that platform's
      // installer, so the "Ships …" note is the union rather than whichever RID ran first.
      merged.assemblies = [...new Set([...merged.assemblies, ...(p.Assemblies || [])])].sort();
      if (!merged.copyright && p.Copyright) merged.copyright = p.Copyright;
      if (!declaredField) {
        // One RID establishing nothing is enough to make the package undeclared: the same nuspec is
        // read every time, so a disagreement means the reading is unreliable, and the undeclared
        // path is the one that blocks.
        merged.declaredField = undefined;
      } else if (merged.declaredField && merged.declaredField !== declaredField) {
        merged.validationErrors = [
          ...new Set([
            ...merged.validationErrors,
            `nuget-license reported different licenses for this package across runtime ` +
              `identifiers: "${merged.declaredField}" and "${declaredField}"`,
          ]),
        ];
      }
    });
  });

  // The byte comparators rather than `localeCompare` - see the matching note in `shipping-set.js`.
  return [...byKey.values()].sort(compareByNameThenVersion);
}

/**
 * Restores and reads the NuGet closure once per RID, then narrows nuget-license's full restore
 * closure down to what actually ships (see parseShippingSet).
 *
 * The `nuget-license` CLI does NOT restore; it reads whatever `project.assets.json` the last
 * restore left behind. `dotnet restore -r <rid>` overwrites that file, so this must be four
 * restore-then-read pairs in sequence, not four restores followed by one read - and the shipping
 * set for a RID must be read from that same freshly-restored file, before the next RID's restore
 * overwrites it again.
 *
 * @param {{ project?: string; rids?: string[] }} [opts]
 * @returns {object[]}
 */
function collectNugetPackages({ project = DOTNET_PROJECT, rids = RIDS } = {}) {
  // `nuget-license` is a LOCAL dotnet tool, pinned in the repository-root `.config/
  // dotnet-tools.json`. Nothing restored that manifest: the repo's only `dotnet tool restore` runs
  // in `c-sharp/`, whose own manifest sets `"isRoot": true`, so the manifest walk stops there and
  // never reaches the root file. On any machine without a matching GLOBAL install - every CI runner,
  // every fresh checkout - the `dotnet nuget-license` call below therefore failed, and this whole
  // pipeline worked only where someone had installed the tool by hand. Restoring here rather than in
  // a workflow step keeps the requirement with the one call that has it, and pins the version the
  // manifest names rather than whatever a global install happens to be.
  execFileSync('dotnet', ['tool', 'restore'], { cwd: REPO, stdio: 'inherit' });
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'notices-nuget-'));
  try {
    const runs = rids.map((rid) => {
      execFileSync('dotnet', ['restore', project, '-r', rid], { cwd: REPO, stdio: 'inherit' });
      const shipping = readShippingSet(rid);
      const out = path.join(tmp, `${rid}.json`);
      try {
        execFileSync(
          'dotnet',
          ['nuget-license', '-i', project, '-t', '-o', 'JsonPretty', '-fo', out],
          { cwd: REPO, stdio: 'inherit' },
        );
      } catch (error) {
        // nuget-license exits non-zero with the COUNT of packages it could not validate (e.g. the
        // SIL-internal ParatextData/ParatextChecks/ParatextCorePluginInterfaces packages, which
        // carry no discoverable license) - that is a summary of its own findings, not a run
        // failure, and it still writes a complete output file first. It is exactly the case
        // mergeRidResults/policy.js already gate on via LicenseInformationOrigin and
        // ValidationErrors, so re-throw only if nuget-license produced no output at all (a real
        // crash, e.g. an unreadable project file).
        if (!fs.existsSync(out)) throw error;
      }
      const closure = JSON.parse(fs.readFileSync(out, 'utf8'));
      const packages = closure
        .filter((p) => shipping.has(`${p.PackageId}@${p.PackageVersion}`.toLowerCase()))
        .map((p) => ({
          ...p,
          Assemblies: shipping.get(`${p.PackageId}@${p.PackageVersion}`.toLowerCase()),
        }));
      // Per RID, BEFORE the merge - see `assertFloor`. A RID whose restore or whose nuget-license
      // run came back partial contributes only its unique packages to the union, so the union's own
      // floor cannot see it.
      return { rid, packages: assertFloor(packages, rid) };
    });
    // Any RID's assets file names the same package folders, and the last restore's copy is still on
    // disk here, so this is read once rather than per RID.
    const folders = parsePackageFolders(JSON.parse(fs.readFileSync(DOTNET_ASSETS, 'utf8')));
    return attachLicenseFiles(assertFloor(mergeRidResults(runs)), folders);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

/**
 * The direct `PackageReference` entries declared in the data provider's project file.
 *
 * Attributes are matched independently because their order is not significant in MSBuild, and a
 * reference this pattern does not see is one the cross-check below cannot miss the absence of. A
 * version that is an MSBuild property reference (`Version="$(ParatextPackageVersion)"`) is reported
 * as `undefined`: the literal `$(…)` is not a version and must never reach the artifact.
 *
 * @param {string} [projectFile]
 * @returns {{ id: string; version: string | undefined }[]}
 */
function readDirectPackageReferences(projectFile = DOTNET_PROJECT) {
  const csproj = fs.readFileSync(projectFile, 'utf8');
  return [...csproj.matchAll(/<PackageReference\b[^>]*\/?>/g)]
    .map((match) => ({
      id: /\bInclude="([^"]+)"/.exec(match[0])?.[1],
      version: /\bVersion="([^"]+)"/.exec(match[0])?.[1],
    }))
    .filter((reference) => reference.id)
    .map((reference) => ({
      ...reference,
      version: reference.version?.includes('$(') ? undefined : reference.version,
    }));
}

/**
 * Direct `PackageReference` ids that the collected closure does not contain.
 *
 * Direct references are the one set that can be checked against a second source, so a missing one
 * means the closure does not match the project whatever its size - a failure `assertFloor` cannot
 * see, because losing the three SIL packages would take 88 to 85, far above the plausibility
 * floor.
 *
 * `exemptIds` is for `alwaysList` overrides only, and for one specific reason: those packages are
 * referenced under a platform condition, so they are legitimately absent from a restore performed
 * anywhere else. Exempting every override instead would exempt `ParatextData` and `ParatextChecks`,
 * the two packages most worth cross-checking.
 *
 * @param {{ name: string }[]} packages
 * @param {{ id: string }[]} directReferences
 * @param {string[]} [exemptIds]
 * @returns {string[]}
 */
function missingDirectReferences(packages, directReferences, exemptIds = []) {
  const present = new Set(packages.map((pkg) => pkg.name.toLowerCase()));
  const exempt = new Set(exemptIds.map((id) => id.toLowerCase()));
  return directReferences
    .map((reference) => reference.id)
    .filter((id) => !present.has(id.toLowerCase()) && !exempt.has(id.toLowerCase()));
}

module.exports = {
  collectNugetPackages,
  mergeRidResults,
  assertFloor,
  parseShippingSet,
  normalizeValidationErrors,
  isFrameworkPackage,
  attachLicenseFiles,
  parsePackageFolders,
  resolvePackageDir,
  readDirectPackageReferences,
  missingDirectReferences,
  DOTNET_MIN_PACKAGES,
  DOTNET_PROJECT,
  RIDS,
};
