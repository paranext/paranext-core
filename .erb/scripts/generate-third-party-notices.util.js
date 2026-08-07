/**
 * Pure, side-effect-free logic behind `generate-third-party-notices.js`.
 *
 * Everything here is a total function of its arguments: no filesystem, no `execSync`, no
 * `process.exit`, no console output. That is the whole point — the copyleft gate this generator
 * enforces is only as trustworthy as its classifier, and a classifier that can only be exercised by
 * running the whole generator against a real `node_modules` tree is not one anybody checks. Three
 * separate defects were found in these functions by reading alone (`LICENSE-MIT` files never
 * matching, `AND` never being split so `"MIT AND GPL-3.0-only"` passed the gate, and non-SPDX
 * values reading as permissive), so the behavior is pinned by
 * `generate-third-party-notices.util.test.ts`.
 *
 * **CommonJS on purpose.** The generator is plain `.js` run by bare `node`
 * (`"build:third-party-notices": "node ./.erb/scripts/generate-third-party-notices.js"`) and also
 * runs in CI on every pull request. Keeping this module CommonJS lets the generator `require` it
 * with no change to how it is invoked and no ts-node/tsx in that path; the colocated test is still
 * TypeScript, because Vitest resolves a CommonJS module's named exports fine and `vitest.config.ts`
 * already collects every `.test.ts` file under `.erb/scripts`.
 */

/**
 * Matches the license files a package may ship.
 *
 * The suffix separator has to allow `-` and `_`, not just `.`: dual-licensed packages routinely
 * ship `LICENSE-MIT` / `LICENSE-APACHE` (`cssesc`, `postcss-selector-parser`), and a dot-only
 * pattern silently reports those packages as shipping no license text at all.
 */
const LICENSE_FILE = /^(LICEN[CS]E|COPYING)([._-].*)?$/i;

/**
 * Extensions that a license file never has, applied on top of `LICENSE_FILE`.
 *
 * A package root may hold `license.js` or `license.svg`; reproducing one of those verbatim inside a
 * legal document would be worse than reporting no text at all, and nothing about the filename says
 * it is not a license.
 */
const NOT_LICENSE_TEXT = /\.(js|cjs|mjs|jsx|tsx?|map|json|svg|png|jpe?g|gif|ico|css|node|wasm)$/i;

/** Whether a file name (not a path) is one whose contents should be reproduced as license text. */
function isLicenseFileName(name) {
  return LICENSE_FILE.test(name) && !NOT_LICENSE_TEXT.test(name);
}

/**
 * Strong copyleft. A dependency under one of these would force the _distributed application_ to be
 * offered under the same terms, which is incompatible with shipping the binary under separate
 * end-user terms (see LICENSING.md). Reaching one is a build-stopping error, not a warning —
 * discovering it after release is not a recoverable position.
 */
const BLOCKING_COPYLEFT = /^\s*(AGPL|GPL|LGPL|SSPL|OSL|EUPL|CPAL|CeCILL)\b/i;

/**
 * File-level copyleft. Compatible with proprietary distribution provided the covered files' source
 * stays available and is not further restricted, so these warn rather than block — but each one is
 * a deliberate acceptance, not something to wave through.
 */
const WEAK_COPYLEFT = /^\s*(MPL|CDDL|EPL|MS-RL)\b/i;

/**
 * An SPDX identifier: one token, optionally qualified by a `WITH <exception>` clause. Anything with
 * internal spaces is free text, not an identifier — npm records custom terms as `SEE LICENSE IN
 * <file>`, and NuGet's pre-SPDX metadata is prose.
 */
const SPDX_IDENTIFIER = /^[A-Za-z0-9.+-]+(?:\s+WITH\s+[A-Za-z0-9.+-]+)?$/i;

/**
 * Npm's non-SPDX placeholders. `UNLICENSED` means "no license granted" — the opposite of a
 * permissive grant, and a single token, so it would otherwise pass the identifier test above.
 */
const NON_SPDX_PLACEHOLDER = /^(UNLICENSED|UNKNOWN|NONE)$/i;

/**
 * Free-text license values a human has already assessed, and the verdict reached. Everything else
 * that is not an SPDX identifier classifies as `unknown` and warns, so this map is what keeps the
 * warning meaningful: a recorded determination stays quiet, an unassessed one does not.
 */
const ASSESSED_NON_SPDX = {
  // Kept in sync with the curated `DOTNET_OVERRIDES` values in generate-third-party-notices.js —
  // the lookup is an exact whole-string match, so a wording change on one side without the other
  // silently reclassifies those packages as `unknown` and warns.
  'Proprietary — SIL Global / United Bible Societies': 'ok',
  'MICROSOFT .NET LIBRARY': 'ok',
  'ICU (Unicode-3.0)': 'ok',
};

/**
 * Severity order. `unknown` outranks `weak` because an unreadable grant has not been shown to be
 * distributable at all, while file-level copyleft has — but it stays below `blocking` so an
 * unassessed term raises a warning rather than stopping a build on something unproven.
 */
const CLASSIFICATION_RANK = { ok: 0, weak: 1, unknown: 2, blocking: 3 };

/** Classifies a single SPDX term — no operators, already unwrapped from any parentheses. */
function classifyTerm(term) {
  if (NON_SPDX_PLACEHOLDER.test(term) || !SPDX_IDENTIFIER.test(term)) return 'unknown';
  if (BLOCKING_COPYLEFT.test(term)) return 'blocking';
  if (WEAK_COPYLEFT.test(term)) return 'weak';
  return 'ok';
}

/**
 * Classifies a license expression as 'ok', 'weak', 'blocking', or 'unknown'.
 *
 * The two SPDX operators pull in opposite directions and both have to be split. `OR` is a choice
 * the recipient makes, so a disjunction is as permissive as its _best_ branch: "MIT OR
 * GPL-3.0-or-later" ships as MIT. `AND` is cumulative — every named license applies at once — so a
 * conjunction is only as permissive as its _worst_ term: "MIT AND GPL-3.0-only" carries the GPL
 * obligation in full.
 *
 * A term that is not an SPDX identifier is 'unknown' rather than 'ok'. `UNLICENSED` and `SEE
 * LICENSE IN <file>` are the values npm records for proprietary and custom terms, and reading an
 * unreadable grant as permissive is exactly how a proprietary dependency would clear this gate
 * unnoticed. Free-text values a human has already ruled on live in ASSESSED_NON_SPDX.
 */
function classifyLicense(expression) {
  if (!expression) return 'unknown';
  // Checked before splitting: these are whole free-text values, and the operator split would
  // mangle them (stripping parentheses turns "ICU (Unicode-3.0)" into something that matches
  // nothing).
  const assessed = ASSESSED_NON_SPDX[expression.trim()];
  if (assessed) return assessed;
  const branches = expression
    .split(/\s+OR\s+/i)
    .map((branch) => branch.replace(/[()]/g, '').trim())
    .filter(Boolean);
  if (!branches.length) return 'unknown';

  const worse = (current, candidate) =>
    CLASSIFICATION_RANK[candidate] > CLASSIFICATION_RANK[current] ? candidate : current;
  const better = (current, candidate) =>
    CLASSIFICATION_RANK[candidate] < CLASSIFICATION_RANK[current] ? candidate : current;

  return branches
    .map((branch) =>
      branch
        .split(/\s+AND\s+/i)
        .map((term) => term.trim())
        .filter(Boolean)
        .map(classifyTerm)
        .reduce(worse, 'ok'),
    )
    .reduce(better);
}

/**
 * Applies a recorded dual-license election to a declared expression.
 *
 * Returns both halves of the answer because they are not the same string and must not be conflated:
 * `license` is what the table shows, and it names the branch elected _and_ the expression it was
 * elected from, so the choice is visible in the artifact rather than buried in the generator;
 * `effective` is the bare identifier the copyleft gate classifies, because an election resolves the
 * expression and the gate must judge what is actually relied on. `jszip` declares "MIT OR
 * GPL-3.0-or-later" and ships to users as MIT; `CsvHelper` declares "MS-PL OR Apache-2.0" and ships
 * as Apache-2.0.
 *
 * With no election recorded, both are the declared expression unchanged — `classifyLicense` already
 * reads a disjunction as its best branch, so an unelected `OR` still passes the gate. What it does
 * not do is say _which_ branch was taken, which is the ambiguity an election exists to remove.
 */
function electLicense(declared, election) {
  if (!election) return { license: declared, effective: declared };
  return {
    license: `${election.elected} (elected from ${election.of})`,
    effective: election.elected,
  };
}

/**
 * What is said in place of a copyright notice when there is none to quote.
 *
 * Three different facts, and collapsing them would be the lie: "nothing was found in a file that
 * was read" is not "there is no field to find it in", and neither is "the package was never on this
 * machine to read". A notices file must never imply knowledge it does not have.
 */
const MISSING_COPYRIGHT_NOTICE = {
  uninspected: 'not present in the local package folder, so no copyright notice could be read',
  NuGet: 'its nuspec declares no copyright notice',
  npm: 'no copyright notice — an npm manifest has no field for one',
};

/**
 * The credit line for one package listed beneath a canonical SPDX license text.
 *
 * A canonical text carries SPDX's placeholders (`<year>`, `<copyright holders>`) rather than any
 * package's holder, so the package's own copyright notice is what pairs the two — reproducing the
 * permission notice without the copyright notice it is supposed to accompany satisfies neither
 * license. Absence is stated rather than left blank: a blank reads as "nobody looked".
 */
function canonicalTextCredit({ name, version, ecosystem, copyright, inspected = true }) {
  const notice =
    (copyright || '').replace(/\s+/g, ' ').trim() ||
    MISSING_COPYRIGHT_NOTICE[inspected ? ecosystem : 'uninspected'];
  return `\`${name}@${version}\` (${ecosystem}) — ${notice}`;
}

/** Normalizes an npm manifest's `license` / legacy `licenses` field to one expression. */
function licenseIdOf(pkg) {
  if (typeof pkg.license === 'string') return pkg.license;
  if (pkg.license?.type) return pkg.license.type;
  if (Array.isArray(pkg.licenses))
    return pkg.licenses.map((entry) => entry.type || entry).join(' OR ');
  return 'UNKNOWN';
}

/**
 * Identifies a license from its own text, for packages that bundle a file instead of declaring an
 * SPDX expression. Deliberately conservative: anything not matched here stays `(verify)` rather
 * than being guessed at, because a wrong identifier in a notices file is worse than an admitted
 * gap.
 */
const LICENSE_TEXT_SIGNATURES = [
  ['MIT', /\bMIT License\b/i],
  ['Apache-2.0', /Apache License[\s\S]{0,80}Version 2\.0/i],
  ['BSD-3-Clause', /Neither the name of[\s\S]{0,200}endorse or promote products/i],
  ['ISC', /\bISC License\b/i],
];

/** The SPDX id `text` is recognizable as, or `undefined` when no signature matches. */
function identifyLicenseFromText(text) {
  const identified = LICENSE_TEXT_SIGNATURES.find(([, signature]) => signature.test(text));
  return identified ? identified[0] : undefined;
}

/** First capture of `pattern` in `xml`, whitespace-collapsed, or `undefined`. */
function xmlMatch(xml, pattern) {
  const match = pattern.exec(xml);
  return match ? match[1].replace(/\s+/g, ' ').trim() || undefined : undefined;
}

/** Escapes a value for a Markdown table cell. */
function cell(value) {
  return (value || '').replace(/\|/g, '\\|').replace(/\s+/g, ' ').trim();
}

/**
 * Packages the .NET 8 shared framework supersedes, as `<id>|<version>`.
 *
 * Verbatim from `packs/Microsoft.NETCore.App.Ref/8.0.x/data/PackageOverrides.txt` in the .NET 8 SDK
 * — the same list the SDK itself uses to discard a package's assembly in favour of the framework's.
 * The `runtime.*` entries are omitted because those are dropped wholesale (see
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
    .map(([id, version]) => [id.toLowerCase(), Number(version.split('.')[0]) || 0]),
);

/**
 * Whether a NuGet package's assemblies come from the .NET 8 shared framework rather than the
 * package.
 *
 * The SDK discards such a package's assembly at publish time in favour of the framework's, so it
 * contributes nothing to the shipped output and is not a separately-licensed component. Only the
 * major version is compared: the override list is expressed against the last out-of-band release of
 * each family, and every servicing bump inside that family is still superseded, while the modern
 * re-release (`System.Security.Cryptography.Xml` 9.x against an override of 4.4.0) is not.
 */
function isFrameworkPackage(id, version) {
  // `runtime.*` packages carry no code of their own — they are per-RID asset shims that route .NET
  // platform assemblies and native libraries. Their payload belongs to the .NET runtime, which the
  // ".NET runtime" note in the generated file covers as a whole.
  if (/^runtime\./i.test(id)) return true;
  const overriddenAtMajor = frameworkOverrides.get(id.toLowerCase());
  if (overriddenAtMajor === undefined) return false;
  return (Number(version.split('.')[0]) || 0) <= overriddenAtMajor;
}

module.exports = {
  ASSESSED_NON_SPDX,
  MISSING_COPYRIGHT_NOTICE,
  canonicalTextCredit,
  cell,
  classifyLicense,
  classifyTerm,
  electLicense,
  identifyLicenseFromText,
  isFrameworkPackage,
  isLicenseFileName,
  licenseIdOf,
  xmlMatch,
};
