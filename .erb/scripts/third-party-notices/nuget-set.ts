import { execFileSync } from 'child_process';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { compareByNameThenVersion, compareVersions, isNumericVersion } from './compare';
import { readNugetLicenseFiles, readPackageNotices } from './package-files';
import { readJsonFile } from './read-json';
import type { DotnetAssets, MergedNugetPackage, NugetLicenseEntry } from './types';

const REPO = path.resolve(__dirname, '..', '..', '..');
export const DOTNET_PROJECT = path.join(REPO, 'c-sharp', 'ParanextDataProvider.csproj');
const DOTNET_ASSETS = path.join(REPO, 'c-sharp', 'obj', 'project.assets.json');

/**
 * Every runtime the application is published for. The NuGet closure is RID-dependent, and a notices
 * file generated from one RID silently omits the others' packages - which matters now that the
 * artifact ships inside every platform's installer.
 */
export const RIDS = ['linux-x64', 'win-x64', 'osx-x64', 'osx-arm64'];

/**
 * A believable restore closure is well over a hundred packages. Anything near the eight direct
 * PackageReference entries means the assets file is stale or partial, and a short .NET section is
 * precisely the failure this generator exists to prevent - so it is a hard error, never a quietly
 * truncated file.
 */
export const DOTNET_MIN_PACKAGES = 40;

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
    .map(([id, version]): [string, string] => [id.toLowerCase(), version]),
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
export function isFrameworkPackage(id: string, version: string): boolean {
  // `runtime.*` packages carry no code of their own - they are per-RID asset shims that route .NET
  // platform assemblies and native libraries. Their payload belongs to the .NET runtime, which the
  // ".NET runtime" note in the generated file covers as a whole.
  if (/^runtime\./i.test(id)) return true;
  const supersededThrough = frameworkOverrides.get(id.toLowerCase());
  if (supersededThrough === undefined) return false;
  // `compareVersions` is a total order, so a component it cannot read sorts as `0` and `4.4.x`
  // compares EQUAL to `4.4.0` - which `<=` reads as superseded. Dropping is the irreversible
  // direction here: the package leaves the closure before the copyleft gate ever sees it, and no
  // count reveals the loss. A version this comparison cannot actually order is kept and disclosed.
  if (!isNumericVersion(version) || !isNumericVersion(supersededThrough)) return false;
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
 * existing (see `adr-notices-derived-from-what-ships`). Silently, and with the count still looking
 * healthy. So each RID's own result is checked before it is merged, and the union is checked
 * after.
 *
 * @param scope What was counted, when it is not the whole closure.
 */
export function assertFloor<T extends { length: number }>(packages: T, scope = ''): T {
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
function shipsSomething(assetGroup: Record<string, unknown> | undefined): boolean {
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
 * ANY target shows a real asset. This matters because a single-RID restore's assets file has (at
 * least) two targets: a RID-agnostic one (e.g. `net8.0`) and a RID-specific one (e.g.
 * `net8.0/win-x64`), and `runtimeTargets` - exactly where cross-platform native assets live - hangs
 * off the RID-agnostic target, not the RID-specific one. `Icu4c.Win.Min` is the concrete case: its
 * win7-x64 native ICU DLLs resolve under the `net8.0` target's `runtimeTargets`, while its
 * `net8.0/<rid>` target entry contributes only a `_._` placeholder. Reading only the RID-specific
 * target would silently drop it, and every other package shipping a native asset the same way.
 *
 * @param assets Parsed project.assets.json.
 * @param rid Used only to sanity-check the assets file was actually restored for this RID.
 */
export function parseShippingSet(assets: DotnetAssets, rid: string): Map<string, string[]> {
  const targets = assets.targets || {};
  if (!Object.keys(targets).some((key) => key.endsWith(`/${rid}`)))
    throw new Error(
      `project.assets.json has no ${rid}-specific target - was it restored with ` +
        `'dotnet restore ${DOTNET_PROJECT} -r ${rid}'?`,
    );

  const ships = new Map<string, string[]>();
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
function readShippingSet(rid: string): Map<string, string[]> {
  return parseShippingSet(
    readJsonFile<DotnetAssets>(DOTNET_ASSETS, 'the .NET restore assets file'),
    rid,
  );
}

/**
 * The NuGet package folders named by a restore, filtered to the ones that exist on this machine.
 *
 * These are the roots the packages themselves were unpacked into - normally `~/.nuget/packages/` -
 * and they are what makes reproducing a package's own licence text possible without a network:
 * everything is already on disk from the restore this function's caller just performed.
 *
 * @param assets Parsed project.assets.json.
 */
export function parsePackageFolders(assets: DotnetAssets): string[] {
  return Object.keys(assets.packageFolders || {}).filter((folder) => fs.existsSync(folder));
}

/**
 * Where a package was unpacked, or `undefined` when no folder holds it.
 *
 * NuGet lowercases both segments on disk, and ids and versions are matched case-insensitively.
 */
export function resolvePackageDir(
  folders: string[],
  name: string,
  version: string,
): string | undefined {
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
 * This is REPRODUCTION only, never classification: the text is not fed to `policy.ts` as a second
 * signal, because `nuget-license` reports nuspec metadata and there is no independent manifest to
 * reconcile against. Verdicts are unaffected by what is found here.
 *
 * Throws when no package folder exists, and equally when one PACKAGE's folder does not, rather than
 * quietly reporting the package as shipping no text: that failure looks exactly like a package that
 * bundles no licence, and it would silently drop its own notice from a legal artifact.
 */
export function attachLicenseFiles(
  packages: MergedNugetPackage[],
  folders: string[],
): MergedNugetPackage[] {
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
      // on this side as well as the npm one, or `render.ts`'s NOTICE section can never fire for a
      // NuGet package: four in the current closure ship one (all MIT today, so none is owed, but
      // two NuGet packages here are Apache-2.0 and the next one to ship a NOTICE would be).
      notices: readPackageNotices(dir),
    };
  });
}

/**
 * Whether a JSON value is ABSENT: the key was omitted, or its value was JSON `null`.
 *
 * Both mean the tool reported nothing, and neither is the same as a value present in a shape this
 * cannot read - `0`, `""`, `false` and a bare string are all the latter, so a plain falsy test
 * would reopen exactly the fail-open this distinction exists to close. Written as a predicate
 * because this repository bans the `null` literal (`no-null/no-null`), and a comparison against it
 * is the one place the distinction genuinely has to be made.
 */
function isAbsentJsonValue(value: unknown): boolean {
  return value === undefined || (typeof value === 'object' && !value);
}

/** A value in an error message, without letting `JSON.stringify` return `undefined` for one. */
function describeValue(value: unknown): string {
  try {
    return JSON.stringify(value) ?? String(value);
  } catch {
    return String(value);
  }
}

/**
 * Turns nuget-license's structured `ValidationErrors` (`{ Error, Context }` objects) into the plain
 * strings policy.ts's contract expects (`validationErrors: string[]`, later joined with `'; '` into
 * a block message - an unnormalized object would render as `[object Object]` there, on the one path
 * where the message IS the entire value of the tool). `Context` is the absolute path to the project
 * file nuget-license was run against - identical across every entry in a single-project invocation,
 * and a local machine path besides - so only `Error` carries information worth keeping.
 * Deduplicated because nuget-license reports the same finding once per resolved target in the
 * restore, which would otherwise repeat verbatim in a block message.
 *
 * An ABSENT value means the tool found nothing to report and is the ordinary shape. A value that is
 * PRESENT in a shape this does not recognise means nuget-license's output contract has moved, and
 * it throws rather than reading as "no findings": these strings are the only channel by which "No
 * license information found" reaches `policy.ts`, so quietly discarding them clears every SIL
 * package - the ones whose nuspecs establish nothing - past the one gate this pipeline exists to
 * enforce. It is not narrowed to the one package either, because a changed output shape invalidates
 * what was read for every package in the same run.
 */
export function normalizeValidationErrors(errors: unknown): string[] {
  if (isAbsentJsonValue(errors)) return [];
  if (!Array.isArray(errors))
    throw new Error(
      `nuget-license reported a ValidationErrors value that is not an array: ${describeValue(
        errors,
      )}. This pipeline reads those strings to decide whether the tool could establish a licence ` +
        'at all, so it cannot treat an unreadable value as an empty one.',
    );
  const messages: string[] = errors.map((error: unknown) => {
    if (typeof error === 'string') return error;
    if (error && typeof error === 'object' && 'Error' in error && typeof error.Error === 'string')
      return error.Error;
    throw new Error(
      `nuget-license reported a validation error this pipeline cannot read: ${describeValue(
        error,
      )}. Expected a string or an object with a string "Error" field.`,
    );
  });
  return [...new Set(messages.filter((message) => message.length > 0))];
}

/** Merges per-RID nuget-license output into one set, recording which RIDs each package came from. */
export function mergeRidResults(
  runs: { rid: string; packages: NugetLicenseEntry[] }[],
): MergedNugetPackage[] {
  const byKey = new Map<string, MergedNugetPackage>();
  // NuGet ids and versions are case-insensitive, and every other id/version comparison in this file
  // already lowercases before matching (`parseShippingSet`, `resolvePackageDir`,
  // `missingDirectReferences`). Keying on the raw spelling here would let two RIDs that spell an id
  // or a pre-release version differently produce two rows for one shipped component.
  const keyOf = (p: NugetLicenseEntry) => `${p.PackageId}@${p.PackageVersion}`.toLowerCase();

  runs.forEach(({ rid, packages }) => {
    packages.forEach((p) => {
      const key = keyOf(p);
      const declaredField =
        // Origin 2 is "Unknown": nuget-license could not establish a license. Leaving the field
        // undefined routes it to the same block path as any other undeclared package rather than
        // letting an absence of information read as permission.
        p.LicenseInformationOrigin === 2 ? undefined : p.License || undefined;
      // One `get`, whose result narrows: `has` followed by `get` leaves the second call's
      // `undefined` to be ruled out by hand at every use below.
      const existing = byKey.get(key);
      if (!existing) {
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
          rids: [rid],
        });
        return;
      }

      // Everything below is what a LATER RID contributes. Keeping only the first occurrence
      // discards an "Unknown" origin, a validation error, or an assembly reported for the second,
      // third or fourth RID - and `policy.ts` treats `validationErrors` as an authoritative "never
      // a permissive result" signal. Each merge below moves in the conservative direction, so no
      // RID's finding can be lost to the order the RIDs happen to run in.
      const merged = existing;
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

  // The byte comparators rather than `localeCompare` - see the matching note in `shipping-set.ts`.
  return [...byKey.values()].sort(compareByNameThenVersion);
}

/** Whether a child process was stopped by a signal rather than exiting with a status of its own. */
function killedBySignal(error: unknown): boolean {
  return !!error && typeof error === 'object' && 'signal' in error && !!error.signal;
}

/**
 * Refuses a nuget-license result that does not describe every package the restore says ships.
 *
 * The two sources are independent: `shipping` comes from `project.assets.json` - MSBuild's own
 * record of what the restore resolved - and `closure` is what nuget-license reported reading from
 * it. They enumerate the same restore, so nuget-license reporting FEWER packages than the assets
 * file names is the tool having stopped early: a dropped feed connection, an OOM, a write that was
 * cut short. That output still parses, and it is still filtered down to a plausible-looking list.
 *
 * `assertFloor` cannot see this. It counts, and a closure short by exactly the RID-unique packages
 * the four-RID union exists to capture stays far above a floor set for the whole closure - so the
 * union of the other three RIDs keeps the count healthy while the packages that RID alone
 * contributes vanish from a legal document with exit 0.
 */
export function assertClosureCoversShippingSet(
  closure: NugetLicenseEntry[],
  shipping: Map<string, string[]>,
  rid: string,
): void {
  const reported = new Set(closure.map((p) => `${p.PackageId}@${p.PackageVersion}`.toLowerCase()));
  const missing = [...shipping.keys()].filter((key) => !reported.has(key));
  if (missing.length)
    throw new Error(
      `nuget-license reported ${closure.length} packages for ${rid}, but ${missing.length} ` +
        `package(s) the restore says ship are not among them:\n${missing
          .slice(0, 10)
          .map((key) => `  ${key}`)
          .join('\n')}\n` +
        'The two read the same restore, so the tool stopped before it enumerated the whole ' +
        'closure. Re-run; a licence document is never written from a partial one.',
    );
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
 */
export function collectNugetPackages({
  project = DOTNET_PROJECT,
  rids = RIDS,
}: { project?: string; rids?: string[] } = {}): MergedNugetPackage[] {
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
  // The four RID restores overwrite `c-sharp/obj/project.assets.json`, which belongs to the ORDINARY
  // build, not to this pipeline - so a run left the tree restored for whichever RID happened to run
  // last (`osx-arm64`) whatever the host is. `npm run verify:third-party-notices` is billed as a
  // read-only report and did this too, and `dotnet test c-sharp-tests/` is the next step in CI.
  // Captured before the first restore and put back in the `finally`, so the tree is as this found
  // it whether the run succeeds or throws.
  const assetsBefore = fs.existsSync(DOTNET_ASSETS) ? fs.readFileSync(DOTNET_ASSETS) : undefined;
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
        // mergeRidResults/policy.ts already gate on via LicenseInformationOrigin and
        // ValidationErrors, so re-throw only if the run did not FINISH.
        //
        // A process killed by a signal never reported a count of anything - it was stopped, by an
        // OOM killer or by a job timeout - so whatever it left on disk describes no complete run.
        // The existence of the output file is not evidence either way, which is why it is no longer
        // the whole test: `assertClosureCoversShippingSet` below is.
        if (killedBySignal(error) || !fs.existsSync(out)) throw error;
      }
      const closure = readJsonFile<NugetLicenseEntry[]>(out, "nuget-license's output");
      assertClosureCoversShippingSet(closure, shipping, rid);
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
    const folders = parsePackageFolders(
      readJsonFile<DotnetAssets>(DOTNET_ASSETS, 'the .NET restore assets file'),
    );
    return attachLicenseFiles(assertFloor(mergeRidResults(runs)), folders);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
    // Restoring the bytes rather than re-running `dotnet restore` for the host RID: this has to run
    // on the failure path too, and a second restore there would be slow, could fail on its own, and
    // would still not reproduce a state this never observed. If there was no assets file to begin
    // with, the tree had not been restored and is left that way.
    if (assetsBefore) fs.writeFileSync(DOTNET_ASSETS, assetsBefore);
    else fs.rmSync(DOTNET_ASSETS, { force: true });
  }
}

/**
 * The project file with its XML comments removed.
 *
 * A `PackageReference` inside `<!-- … -->` is not a reference: MSBuild never sees it, no restore
 * resolves it, and nothing can ever appear in the closure to satisfy it - so the cross-check below
 * would report it missing and refuse to write the artifact. Commenting a reference out while
 * debugging a build is an ordinary thing to do, and this project file already carries four comment
 * blocks around its `ItemGroup`s.
 */
function withoutXmlComments(xml: string): string {
  return xml.replace(/<!--[\s\S]*?-->/g, '');
}

/** An `Include`/`Version`/`ExcludeAssets`/`IncludeAssets` attribute, in either quoting style. */
function attributeOf(element: string, name: string): string | undefined {
  return new RegExp(String.raw`\b${name}\s*=\s*("([^"]*)"|'([^']*)')`, 'i')
    .exec(element)
    ?.slice(2)
    .find((value) => value !== undefined);
}

/**
 * The value of an attribute OR of the child element MSBuild treats as its equivalent.
 *
 * `<PackageReference Include="X" PrivateAssets="all" />` and `<PackageReference
 * Include="X"><PrivateAssets>all</PrivateAssets></PackageReference>` mean the same thing to
 * MSBuild, and a scan that sees only the opening tag reads the second as carrying no metadata at
 * all.
 */
function metadataOf(element: string, name: string): string | undefined {
  return (
    attributeOf(element, name) ??
    new RegExp(String.raw`<${name}\s*>([^<]*)</${name}\s*>`, 'i').exec(element)?.[1]?.trim()
  );
}

/** One direct `PackageReference`, with the asset metadata that decides whether it can ship. */
export type DirectPackageReference = {
  id: string;
  version: string | undefined;
  /** False where the reference excludes runtime assets, so it contributes no shipped file. */
  shipsRuntimeAssets: boolean;
};

/**
 * The direct `PackageReference` entries declared in the data provider's project file.
 *
 * Attributes are matched independently because their order is not significant in MSBuild, and a
 * reference this pattern does not see is one the cross-check below cannot miss the absence of. Both
 * quoting styles are read: MSBuild accepts `Include='X'`, and a scan that took only double quotes
 * would silently not see such a reference at all - the failure mode this cross-check exists to
 * prevent, arrived at from the other direction.
 *
 * A version that is an MSBuild property reference (`Version="$(ParatextPackageVersion)"`) is
 * reported as `undefined`: the literal `$(…)` is not a version and must never reach the artifact.
 *
 * `shipsRuntimeAssets` reads NuGet's own asset model rather than guessing at package names. A
 * reference whose `ExcludeAssets` names `runtime` or `all`, or whose `IncludeAssets` names neither,
 * contributes no file to the publish output by definition - which is how analyzers and source
 * generators are declared. Such a reference can never appear in the shipping closure, so requiring
 * it to would make adding a Roslyn analyzer a permanent build failure whose only escape is
 * `alwaysList`, an instrument documented as reserved for platform-conditional packages.
 */
export function readDirectPackageReferences(
  projectFile = DOTNET_PROJECT,
): DirectPackageReference[] {
  const csproj = withoutXmlComments(fs.readFileSync(projectFile, 'utf8'));
  // Self-closing and paired forms both, so child-element metadata is part of the match.
  const elements = [
    ...csproj.matchAll(
      /<PackageReference\b[^>]*?\/>|<PackageReference\b[\s\S]*?<\/PackageReference\s*>/g,
    ),
  ].map((match) => match[0]);

  return elements.flatMap((element) => {
    const id = attributeOf(element, 'Include');
    if (!id) return [];
    const version = attributeOf(element, 'Version');
    const excluded = (metadataOf(element, 'ExcludeAssets') || '').toLowerCase();
    const included = metadataOf(element, 'IncludeAssets');
    const namesRuntime = (assets: string) =>
      assets
        .split(';')
        .map((asset) => asset.trim())
        .some((asset) => asset === 'runtime' || asset === 'all');
    return [
      {
        id,
        version: version?.includes('$(') ? undefined : version,
        shipsRuntimeAssets:
          !namesRuntime(excluded) &&
          (included === undefined || namesRuntime(included.toLowerCase())),
      },
    ];
  });
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
 */
export function missingDirectReferences(
  packages: { name: string }[],
  directReferences: { id: string; shipsRuntimeAssets?: boolean }[],
  exemptIds: string[] = [],
): string[] {
  const present = new Set(packages.map((pkg) => pkg.name.toLowerCase()));
  const exempt = new Set(exemptIds.map((id) => id.toLowerCase()));
  return (
    directReferences
      // A reference that excludes runtime assets contributes no file to the publish output, so it
      // can never be in the shipping closure and its absence says nothing - see
      // `readDirectPackageReferences`. Defaulted to `true` so a caller passing bare ids (the tests
      // below, and any future one) still gets the strict check.
      .filter((reference) => reference.shipsRuntimeAssets !== false)
      .map((reference) => reference.id)
      .filter((id) => !present.has(id.toLowerCase()) && !exempt.has(id.toLowerCase()))
  );
}
