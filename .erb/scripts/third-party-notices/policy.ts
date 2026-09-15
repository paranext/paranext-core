import correct from 'spdx-correct';
import { compareStrings } from './compare';
import { parseDeclared } from './declared';
import type { ParsedDeclaration as Declared } from './declared';
import { readJsonFile } from './read-json';
import type { DetectedFile, Election, Override, Policy, Verdict } from './types';

/**
 * Licensee's own default (`Licensee::CONFIDENCE_THRESHOLD`). Named here rather than inlined so
 * lowering it is a visible policy change in review, not a buried literal.
 */
export const CONFIDENCE_THRESHOLD = 98;

/** Licensee returns these instead of an SPDX id when it cannot identify the text. */
const SENTINELS = new Set(['NOASSERTION', 'NONE']);

/**
 * Normalizes a licensee-detected id through `spdx-correct` before ANY policy lookup or comparison.
 *
 * Licensee emits deprecated SPDX ids for several copyleft licenses - `GPL-3.0`, `AGPL-3.0`,
 * `GPL-2.0`, `LGPL-2.1`, `LGPL-3.0` - while `notices-policy.json`, like the rest of the SPDX
 * ecosystem, uses their current forms (`GPL-3.0-or-later`, etc). Comparing the raw id poisons both
 * the declared-vs-detected agreement check (a real match reads as a disagreement, so a package
 * declaring the current id blocks for a bogus reason) and the allow/copyleft lookups (a real
 * copyleft id reads as unlisted). 15 of the shipped policy's 21 copyleft entries are ids licensee
 * can never emit without this normalization, so skipping it disables most of the copyleft list.
 *
 * `spdx-correct` returns `null` for anything it cannot recognize, including licensee's own
 * NOASSERTION/NONE sentinels - map those to the NOASSERTION sentinel too, so the one
 * `SENTINELS.has` check downstream still catches "not identified" regardless of why.
 */
function normalizeDetectedId(id: string): string {
  if (!id || SENTINELS.has(id)) return 'NOASSERTION';
  // spdx-correct returns a corrected id, the id unchanged if it was already canonical, or a
  // library-internal "cannot correct" sentinel for anything unrecognized - never an empty string,
  // so a plain truthiness check (rather than comparing against that sentinel by name, which this
  // repo's `no-null/no-null` rule forbids anyway) distinguishes the two cases correctly.
  const corrected = correct(id);
  return corrected || 'NOASSERTION';
}

/** The environment variable naming a second policy file to merge over the committed one. */
export const OVERLAY_ENV = 'NOTICES_POLICY_OVERLAY';

/**
 * The overlay path the environment names, or `undefined` when it names none.
 *
 * Read by VALUE like `inCi` and `acceptShrinkFromEnv`: a blank value is "no overlay", never a file
 * called "". A downstream repository that builds a product from this source sets this to its own
 * policy file, so its determinations live beside its build rather than in a patch to this file.
 */
export function overlayFromEnv(env: typeof process.env = process.env): string | undefined {
  const raw = (env[OVERLAY_ENV] || '').trim();
  return raw || undefined;
}

/**
 * Refuses an overlay field that is not a list of strings.
 *
 * `readJsonFile<Partial<Policy>>` is a cast, so every value an overlay contributes is untyped until
 * something tests it. A single identifier written as `"allowed": "Apache-2.0"` rather than
 * `["Apache-2.0"]` would otherwise spread character by character into the classification list, and
 * the identifier the author meant to admit would not be in it.
 */
function requireList(field: string, value: unknown, overlayName: string): void {
  if (value === undefined) return;
  if (!Array.isArray(value) || value.some((entry) => typeof entry !== 'string'))
    throw new Error(
      `${overlayName} records "${field}" as ${Array.isArray(value) ? 'a list holding something other than a string' : `a ${typeof value}`}. ` +
        'It is a list of strings; a single value still has to be written as a one-item list.',
    );
}

/** The two lists' union, in base order then overlay order, each name once. */
function unionLists(base: string[] | undefined, overlay: string[] | undefined): string[] {
  return [...new Set([...(base || []), ...(overlay || [])])];
}

/**
 * One keyed table merged, refusing a key both files record.
 *
 * An overlay ADDS determinations. Letting it replace one would let a downstream file silently
 * change what this repository's reviewers established about a package both ship.
 */
function mergeTable<T>(
  table: string,
  base: Record<string, T> | undefined,
  overlay: Record<string, T> | undefined,
  names: { base: string; overlay: string },
): Record<string, T> {
  const collisions = Object.keys(overlay || {})
    .filter((key) => base && Object.hasOwn(base, key))
    .sort(compareStrings);
  if (collisions.length)
    throw new Error(
      `${names.overlay} redefines ${table} ${collisions.join(', ')}, which ${names.base} already ` +
        'records. An overlay adds determinations; it never replaces one. Remove the entry from ' +
        'the overlay, or change the committed policy.',
    );
  return { ...(base || {}), ...(overlay || {}) };
}

/**
 * How each `Policy` field combines when an overlay is merged over the committed file.
 *
 * Declared as a table rather than spelled out per field in `mergePolicies`, because the merge
 * returns `Policy` by spreading the base: a field added to `Policy` later would satisfy the return
 * type while being silently taken from the base, with the overlay's value dropped and no type
 * error. `satisfies Record<keyof Policy, MergeKind>` makes a field that declares nothing a compile
 * error - it has to say how it merges before this file builds. It cannot make the merge IMPLEMENT
 * what the field declares, and `OVERLAY_KEYS` is derived from here, so a key declared and left
 * unwired would be accepted on the way in and dropped on the way out; `policy.test.ts` walks this
 * table and fails on exactly that.
 *
 * - `union` - the two lists' union, in base order then overlay order.
 * - `concat` - appended; `assertOneExceptionPerPackage` then rejects a duplicate key.
 * - `table` - keyed, with a key both files record refused outright.
 * - `base-only` - the committed value stands; an overlay may not contribute one.
 * - `overlay-only` - the overlay's value alone, and the committed file may not carry one.
 */
type MergeKind = 'union' | 'concat' | 'table' | 'base-only' | 'overlay-only';

export const MERGE_KINDS = {
  allowed: 'union',
  copyleft: 'union',
  platformOnlyPackages: 'union',
  exceptions: 'concat',
  elections: 'table',
  overrides: 'table',
  copyrightNotices: 'table',
  licenseTexts: 'table',
  unbundledDependencies: 'table',
  snapStagePackages: 'table',
  staticAssetNotices: 'table',
  copiedPlatformLibraries: 'table',
  separatePrograms: 'table',
  externalExtensions: 'table',
  product: 'overlay-only',
  // The `*Note` fields document the table they precede for a reader of the committed file. They
  // are read by nothing, so a downstream has nothing to add to them.
  exceptionsNote: 'base-only',
  copyrightNoticesNote: 'base-only',
  licenseTextsNote: 'base-only',
  platformOnlyPackagesNote: 'base-only',
  unbundledDependenciesNote: 'base-only',
  snapStagePackagesNote: 'base-only',
  staticAssetNoticesNote: 'base-only',
  copiedPlatformLibrariesNote: 'base-only',
  separateProgramsNote: 'base-only',
  externalExtensionsNote: 'base-only',
  productNote: 'base-only',
} as const satisfies Record<keyof Policy, MergeKind>;

/** Every key an overlay may carry, which is every `Policy` field the merge does not reserve. */
const OVERLAY_KEYS = new Set(
  Object.entries(MERGE_KINDS)
    .filter(([, kind]) => kind !== 'base-only')
    .map(([key]) => key),
);

/**
 * The committed policy with a downstream overlay merged over it.
 *
 * Every field combines the way `MERGE_KINDS` records. An overlay key the table does not name is
 * REFUSED rather than ignored: the merge copies only what it enumerates, so a misspelled table
 * (`seperatePrograms`) would otherwise leave the committed empty one in place and every gate below
 * would pass over it - a redistributed program omitted from a legal document with the run exiting
 * 0.
 */
export function mergePolicies(
  base: Policy,
  overlay: Partial<Policy>,
  names: { base: string; overlay: string },
): Policy {
  // The document itself, before any field of it. `readJsonFile` parses and does not check a shape,
  // so a `null` overlay would reach `Object.keys` and throw naming neither the file nor a remedy,
  // and a JSON array, number or boolean would yield no keys at all - passing both refusals below
  // and merging to the committed policy unchanged, which is the silent drop those refusals exist to
  // prevent, reached through a different door.
  if (!overlay || typeof overlay !== 'object' || Array.isArray(overlay))
    throw new Error(
      `${names.overlay} does not hold a JSON object. An overlay is a policy file with the same ` +
        'shape as the committed one, carrying only the fields it contributes.',
    );
  // Split, because the two cases send an author to different places: a key the policy has no field
  // for at all is a misspelling, while a `base-only` key is spelled correctly and simply reserved -
  // telling its author to check the spelling would send them hunting a typo that is not there.
  const refused = Object.keys(overlay).filter((key) => !OVERLAY_KEYS.has(key));
  const misspelled = refused.filter((key) => !Object.hasOwn(MERGE_KINDS, key)).sort(compareStrings);
  const reserved = refused.filter((key) => Object.hasOwn(MERGE_KINDS, key)).sort(compareStrings);
  if (misspelled.length)
    throw new Error(
      `${names.overlay} records ${misspelled.map((key) => `"${key}"`).join(', ')}, which the ` +
        'notices policy has no such field for. An overlay key this merge does not know is dropped ' +
        'in silence, so what it was meant to declare would go undisclosed - check the spelling ' +
        `against ${names.base}.`,
    );
  if (reserved.length)
    throw new Error(
      `${names.overlay} records ${reserved.map((key) => `"${key}"`).join(', ')}, which ` +
        `${names.base} reserves to itself. The field exists and is spelled correctly, but an ` +
        'overlay may not contribute one - these describe the committed file for a reader of it, ' +
        'and nothing in the pipeline reads them.',
    );
  if (base.product)
    throw new Error(
      `${names.base} declares a "product" block. It describes what a DOWNSTREAM build produces, so ` +
        "it belongs in that build's overlay; this repository's own document uses the no-product " +
        'wording. Remove it.',
    );
  (['allowed', 'copyleft', 'platformOnlyPackages'] as const).forEach((field) =>
    requireList(field, overlay[field], names.overlay),
  );
  if (overlay.exceptions !== undefined && !Array.isArray(overlay.exceptions))
    throw new Error(
      `${names.overlay} records "exceptions" as a ${typeof overlay.exceptions}. It is a list of ` +
        'exception entries; a single exception still has to be written as a one-item list.',
    );
  const merged: Policy = {
    ...base,
    allowed: unionLists(base.allowed, overlay.allowed),
    copyleft: unionLists(base.copyleft, overlay.copyleft),
    platformOnlyPackages: unionLists(base.platformOnlyPackages, overlay.platformOnlyPackages),
    exceptions: [...(base.exceptions || []), ...(overlay.exceptions || [])],
    elections: mergeTable('elections', base.elections, overlay.elections, names),
    overrides: mergeTable('overrides', base.overrides, overlay.overrides, names),
    copyrightNotices: mergeTable(
      'copyrightNotices',
      base.copyrightNotices,
      overlay.copyrightNotices,
      names,
    ),
    licenseTexts: mergeTable('licenseTexts', base.licenseTexts, overlay.licenseTexts, names),
    unbundledDependencies: mergeTable(
      'unbundledDependencies',
      base.unbundledDependencies,
      overlay.unbundledDependencies,
      names,
    ),
    snapStagePackages: mergeTable(
      'snapStagePackages',
      base.snapStagePackages,
      overlay.snapStagePackages,
      names,
    ),
    staticAssetNotices: mergeTable(
      'staticAssetNotices',
      base.staticAssetNotices,
      overlay.staticAssetNotices,
      names,
    ),
    copiedPlatformLibraries: mergeTable(
      'copiedPlatformLibraries',
      base.copiedPlatformLibraries,
      overlay.copiedPlatformLibraries,
      names,
    ),
    separatePrograms: mergeTable(
      'separatePrograms',
      base.separatePrograms,
      overlay.separatePrograms,
      names,
    ),
    externalExtensions: mergeTable(
      'externalExtensions',
      base.externalExtensions,
      overlay.externalExtensions,
      names,
    ),
    product: overlay.product,
  };
  assertListsDisjoint(merged, names);
  return merged;
}

/**
 * Refuses a merged policy whose two classification lists both name an identifier.
 *
 * `isDisallowedId` consults `copyleft` first, so an id on both still blocks and nothing unsafe
 * ships - but the overlay author who added it to `allowed` gets a silent no-op and a later block
 * message that never mentions their edit. The committed file is guarded by a test; the MERGED
 * object is what every consumer actually receives, so it is checked here.
 */
function assertListsDisjoint(policy: Policy, names: { base: string; overlay: string }): void {
  const copyleft = new Set(policy.copyleft);
  const both = policy.allowed.filter((id) => copyleft.has(id)).sort(compareStrings);
  if (both.length)
    throw new Error(
      `${names.overlay} merged over ${names.base} puts ${both.join(', ')} on both "allowed" and ` +
        '"copyleft". Copyleft is tested first, so the identifier still blocks and the "allowed" ' +
        'entry does nothing - decide which list it belongs on.',
    );
}

/**
 * Reads the policy document from disk - the single source of every repository-specific licensing
 * decision - merges the overlay the environment names (if any), and refuses the shapes no consumer
 * can act on.
 *
 * `overlayFile` defaults from the environment AT CALL TIME, so every caller - the generator, both
 * verify modes, the corpus index builder - sees the same merged policy without passing anything.
 *
 * `copyrightNotices` and `overrides` are the two hand-maintained tables in this file. Their
 * rationale is recorded here because it is the part a future reader cannot reconstruct:
 *
 * - **`copyrightNotices`** (keyed `npm:<name>`) carries the copyright line for an npm package whose
 *   own license file cannot be read on the generating machine. An npm manifest has no copyright
 *   field, so a package shipping no readable license file leaves the canonical SPDX text with
 *   nothing to pair against - and MIT, BSD and ISC all require the copyright notice to travel with
 *   copies, which SPDX's `<copyright holders>` placeholder does not satisfy. Every entry is a
 *   notice read from the package's own LICENSE, never a holder inferred from `author`.
 *
 *   Where a package publishes NO license file in its tarball - the `@radix-ui/*` family, which
 *   publishes dozens of packages from one monorepo, is the bulk of it - the notice is read from the
 *   license file in the repository that package's own `package.json` names, which is the same
 *   document by a different route. Two packages carry their license text inside `README.md` and the
 *   notice comes from there. `npm:rc-new-window` has no entry on purpose: its Apache-2.0 LICENSE
 *   leaves the boilerplate appendix unfilled (`Copyright [yyyy] [name of copyright owner]`) and it
 *   ships no NOTICE, so the project asserts no copyright notice and inventing one would be worse
 *   than the document saying none was found.
 *
 *   Verify an entry against the package when its major version changes - and for a notice read from a
 *   repository rather than a tarball, that the repository still publishes that package.
 *
 *   `copyrightNoticesNote` states the same provenance rule for a reader of the policy file alone, and
 *   records what was searched for `rc-new-window` so nobody repeats it.
 * - **`overrides`** (keyed `<ecosystem>:<name>`) is the curated answer for a package whose own
 *   metadata establishes nothing. `alwaysList` marks one that must appear in the document even
 *   though no restore on this machine resolves it: `Microsoft.ICU.ICU4C.Runtime` is referenced
 *   under `Condition="$([MSBuild]::IsOsPlatform('Windows'))"`, which MSBuild evaluates against the
 *   HOST OS rather than the target runtime identifier, so `dotnet restore -r win-x64` on Linux
 *   still does not pull it in and the four-RID union does not surface it. Without `alwaysList` a
 *   genuinely shipped Windows dependency would be silently absent.
 *
 *   An override's `note` is REPRODUCED in the document, in the Notes column, where it displaces the
 *   nuspec's own copyright notice (see `nugetVerdict`) - so a package that has no license text to
 *   pair a copyright with must not carry one, or its copyright appears nowhere at all. `reason` is
 *   the field for rationale that belongs to the reviewer rather than to the artifact: it is read by
 *   nothing here and exists to make the determination reviewable in this file, which is where a
 *   `<licenseUrl>` override has to be justified. The three legacy-`<licenseUrl>` NuGet packages use
 *   it for exactly that.
 *
 *   `nonSpdx` records that an entry's `license` is deliberately free text - "Proprietary - SIL…",
 *   "MICROSOFT .NET LIBRARY" - rather than an SPDX expression. It is REQUIRED on such an entry,
 *   because an unparseable value cannot be tested against `allowed` or `copyleft` at all. The flag
 *   does not make the value checkable; it makes the fact that nothing checked it visible in the
 *   policy file and in review, rather than a silently skipped test. An entry whose value IS an SPDX
 *   expression must not carry it - that one is checked, and the two ICU packages
 *   (`Unicode-DFS-2016`) and `Spart` (`Zlib`) are the live examples.
 *
 * The `*Note` fields carry no data the pipeline reads. JSON has no comments, so they are how a
 * reader of the policy file alone learns what each table is for and what an entry has to establish
 * before it is added. Each sits immediately before the table it describes. The fuller
 * situation-to-instrument guide is `.erb/scripts/third-party-notices/README.md`.
 */
export function loadPolicy(
  file: string,
  overlayFile: string | undefined = overlayFromEnv(),
): Policy {
  const base = readJsonFile<Policy>(file, 'the notices policy');
  const policy = overlayFile
    ? mergePolicies(
        base,
        readJsonFile<Partial<Policy>>(overlayFile, 'the notices policy overlay'),
        { base: file, overlay: overlayFile },
      )
    : base;
  assertOneExceptionPerPackage(policy);
  assertLicenseTextsAreNuget(policy);
  return policy;
}

/**
 * Refuses a `licenseTexts` key under any ecosystem but `nuget:`.
 *
 * `vendoredLicenseText` is consulted only by `nugetVerdict`, which always builds the key as
 * `nuget:<name>`, so an entry under any other prefix is a legal text checked in, hash-pinned and
 * reproduced nowhere. `stalePolicyEntries` cannot report it either - the package it names is in the
 * shipping set, so the entry looks used. Refusing it where the policy is READ puts the failure at
 * the moment someone edits the file, which is when they can act on it; a guard at the consumer can
 * never fire, because the consumer only ever asks about NuGet packages.
 */
function assertLicenseTextsAreNuget(policy: Policy): void {
  const wrongEcosystem = Object.keys(policy.licenseTexts || {})
    .filter((key) => !key.startsWith('nuget:'))
    .sort(compareStrings);
  if (wrongEcosystem.length)
    throw new Error(
      `the notices policy holds vendored license texts for ${wrongEcosystem.join(', ')}, but only ` +
        'NuGet packages read that table - an npm package that ships no license file has its ' +
        'declared identifier\u2019s canonical SPDX text reproduced instead. Remove the entry, or ' +
        'say which reader should consult it.',
    );
}

/**
 * Refuses a policy holding two `exceptions` entries for the same `package`.
 *
 * `applyException` looks an entry up with `find`, so the FIRST match wins and every later one is
 * dead data - and appending rather than editing in place is the natural thing to do, because that
 * is the shape the paste-ready template in `report.ts` produces. Re-review a package after its
 * license text changes, append the new entry, and the stale one stays in force: the run blocks on
 * "the recorded textSha256 is stale" while the correct determination sits unread a few lines below.
 * The mirror case is worse - two entries recording different identifiers, where whichever sorts
 * first silently decides what the document claims.
 *
 * `stalePolicyEntries` cannot report this: both entries key the same live package, so both look
 * used. It has to be refused where the file is read.
 */
function assertOneExceptionPerPackage(policy: Policy): void {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  (policy.exceptions || []).forEach((entry) => {
    const key = String(entry?.package ?? '');
    if (seen.has(key)) duplicates.add(key);
    seen.add(key);
  });
  if (duplicates.size)
    throw new Error(
      `the notices policy records more than one "exceptions" entry for ` +
        `${[...duplicates].sort(compareStrings).join(', ')}. Only the first is ever applied, so a ` +
        'later one is a determination nobody made - edit the existing entry in place rather than ' +
        'appending a second.',
    );
}

/**
 * The parse of a declaration that IS an SPDX expression. Every resolver below runs only after
 * `declared.ok` has been checked, so they take the narrowed branch rather than the union - the
 * narrowing happens once at the call site instead of in each of them.
 */
type ParsedDeclaration = Extract<Declared, { ok: true }>;

/**
 * The outcome half of a verdict: what `blocked` and the success paths decide, before the evidence
 * fields in `CommonFields` are spread alongside. Saying these functions return a whole `Verdict`
 * would claim they fill in evidence they deliberately leave to the caller.
 */
type BlockedFields = { verdict: Verdict['verdict']; spdxId: string | undefined; reason: string };

/**
 * The evidence fields every verdict carries, whatever the outcome.
 *
 * Spread into each returned verdict rather than rebuilt, so the record of WHAT WAS READ cannot
 * drift between the paths that allow and the paths that block.
 */
type CommonFields = {
  declared: string | undefined;
  detected: string | undefined;
  matchedFile: string | undefined;
  textSha256: string | undefined;
  usableDisallowedId: string | undefined;
  usableDisallowedFile: string | undefined;
};

/**
 * Everything the declared-expression resolvers need. One object because the two of them share it
 * exactly, and a check added to one must not be able to reach only the other.
 */
type ResolveContext = {
  key: string;
  declared: ParsedDeclaration;
  declaredField: string | undefined;
  policy: Policy;
  allowed: Set<string>;
  copyleft: Set<string>;
  common: CommonFields;
  usableById: Map<string, DetectedFile>;
};

/** Everything `classify` needs to resolve one package. Pure - it reads nothing off disk. */
type ClassifyInput = {
  name: string;
  version: string;
  ecosystem: string;
  declaredField: string | undefined;
  detection: { dir: string; files: DetectedFile[] };
  policy: Policy;
  validationErrors?: string[];
};

function blocked(reason: string, extra: Partial<Verdict> = {}): BlockedFields {
  return { verdict: 'blocked', spdxId: undefined, reason, ...extra };
}

/**
 * A value still spelled as one of the `<…>` placeholders `report.ts` prints in its paste-ready
 * templates, rather than replaced with the thing the placeholder asks for.
 *
 * `[\s\S]` rather than `.` so a placeholder a reviewer pasted across two lines is still caught; `.`
 * stops at a newline, which would let the multi-line case through.
 *
 * A leading URI scheme is excluded because `<https://example.org/>` is a Markdown autolink, not a
 * template: the fields this guards (`SeparateProgram.sourceAvailability`,
 * `ExternalExtension.reason`) are documented as paragraphs that may carry a link, and a bare URL's
 * natural spelling in this document is the autolink form.
 *
 * The carve-out names the two schemes this document's links actually use rather than matching any
 * scheme shape, because a scheme is `word:` and so is the opening of an ordinary note: `<TODO: ask
 * legal where the source lives>` and `<NOTE: fill me in>` are placeholders in every sense that
 * matters here, and a general `[A-Za-z][A-Za-z0-9+.-]*:` lookahead admits both. `http` is kept
 * beside `https` not because this document should carry an insecure link but because refusing one
 * as "a placeholder from the template" is a message that describes the wrong problem.
 */
export const PLACEHOLDER_TEMPLATE_VALUE = /^<(?!(?:https?|mailto):)[\s\S]*>$/;

/**
 * Refuses a policy field that is not a filled-in string.
 *
 * The type is checked rather than coerced, because these values arrive as untyped JSON: a policy
 * that records a number, a boolean or an object reaches the document either as the literal
 * `"[object Object]"` or as a `TypeError` from inside the renderer, both of which say less than
 * naming the field here does.
 *
 * Shared by every policy value the document reproduces verbatim, so one table cannot quietly accept
 * a shape another refuses. `subject` is the caller's own phrase for the thing being checked - "the
 * "separatePrograms" entry for "Mercurial"", "the notices policy "product" block" - because a table
 * keyed by name and a singleton block do not read the same way.
 */
export function requireText(subject: string, field: string, value: unknown): void {
  if (typeof value !== 'string')
    throw new Error(
      `${subject} records "${field}" as ` +
        `${value === undefined ? 'nothing' : `a ${typeof value}`}, and every field of it is ` +
        'reproduced in the document as written. Record it as a string.',
    );
  const text = value.trim();
  if (!text || PLACEHOLDER_TEMPLATE_VALUE.test(text))
    throw new Error(
      `${subject} records no usable "${field}". Every field of it is reproduced in the document ` +
        'as the reviewed determination, so an empty or template value would ship as one - fill ' +
        'it in.',
    );
}

/**
 * Applies a reviewed exception. Exceptions are an override applied AFTER a block, never a path
 * reconciliation can reach on its own, and they are pinned to the exact license TEXT so that a
 * package changing it re-blocks instead of silently inheriting the escape.
 *
 * Keyed by `ecosystem:name`, NOT by `name@version`. The hash is what the determination actually
 * rests on - a human read that text and decided what it is - and it already delivers the stated
 * goal on its own: the block returns the moment the text changes. Adding the version to the key
 * bought one further behaviour, firing on every version bump even when the text is byte-identical,
 * which is the common case: these entries are by definition the packages whose license text cannot
 * be identified automatically, so a bump that found no entry fell through to normal classification
 * and BLOCKED. That made a routine patch release of any of them a hard build failure demanding a
 * fresh legal read, across sixteen packages including `lodash`, `yjs`, `lucide-react` and `jszip`.
 * The weighed cost of dropping it: a new version could add or RELOCATE a license file in a way the
 * recorded hash does not cover. That is real but uncertain, and it was judged smaller than a
 * certain, recurring failure across sixteen moving packages.
 *
 * Requires a non-empty string on BOTH sides of the hash comparison, and a recorded `spdx` id.
 * `undefined !== undefined` is `false` in JavaScript, so an exception with no text found (`sha256`
 * undefined) matched against an entry whose `textSha256` key is simply omitted would otherwise
 * "match" with zero verification on either side - the omitted-key shape is also the one most likely
 * to be hand-authored by mistake, unlike an explicit `textSha256: null`, which a bare `!==`
 * comparison already rejects correctly.
 *
 * The recorded `spdx` is also checked AGAINST THE SAME TWO LISTS every other path in this file is
 * checked against. An exception is the one instrument that clears a blocked verdict, and without
 * this check the mechanism itself imposes no limit on what it can clear TO: an entry naming
 * `AGPL-3.0-or-later` is accepted and returns `excepted AGPL-3.0-or-later`, with only a data-level
 * test over the COMMITTED policy standing against it - which by construction cannot cover an entry
 * added in the same pull request as the policy change that would have to accompany it. The lists
 * are the project's standing decision about what it may ship under, and an exception is a
 * determination about WHICH license a package's unidentifiable text actually is, not a license to
 * ship under different terms. Requiring a new identifier to be added to `allowed` first is the
 * point: that is a visible, reviewable line in the policy rather than one buried in a per-package
 * entry.
 */
function applyException(
  policy: Policy,
  key: string,
  version: string,
  sha256: string | undefined,
  allowed: Set<string>,
  copyleft: Set<string>,
): BlockedFields | undefined {
  const entry = (policy.exceptions || []).find((e) => e.package === key);
  if (!entry) return undefined;
  if (!entry.spdx)
    return blocked(`a reviewed exception exists for ${key}@${version} but has no spdx id recorded`);

  // The instrument is a REVIEWED exception, and nothing here read the two fields that make it one.
  // `policy.test.ts` checks them over the COMMITTED policy - which by construction cannot cover an
  // entry added in the same pull request as the change it accompanies, the identical hole that put
  // the allow/copyleft bound into this function rather than leaving it to a data-level test. An
  // entry with no reviewer and no date is an assertion nobody is recorded as having made.
  const unsigned = [
    ['reviewer', entry.reviewer],
    ['date', entry.date],
    // `reason` too, and for the same reason the other two are here. It is the determination
    // itself - `applyException` puts it verbatim into the verdict - so an entry without one clears
    // the gate recording nothing about WHY, and `undefined` reads back as
    // "reviewed exception: undefined".
    ['reason', entry.reason],
  ]
    .filter(([, value]) => !String(value || '').trim())
    .map(([field]) => field);
  if (unsigned.length)
    return blocked(
      `the reviewed exception for ${key}@${version} records no ${unsigned.join(' and no ')}. An ` +
        "exception is a determination someone made by reading the package's license file; " +
        'without a name, a date and a stated reason it is not reviewable, and nothing else records ' +
        'who accepted it or why.',
    );
  // The template `report.ts` prints carries these literal placeholders for the reader to replace.
  // Pasted and half-filled, each clears every other check and stands as the recorded determination:
  // `<your email>` is a non-empty string, so the "unsigned" test above sees a reviewer, and the
  // entry then reads as a determination somebody made under a name that is not a name.
  const placeholder = [
    ['reason', entry.reason],
    ['reviewer', entry.reviewer],
  ].find(([, value]) => PLACEHOLDER_TEMPLATE_VALUE.test(String(value ?? '')));
  if (placeholder)
    return blocked(
      `the reviewed exception for ${key}@${version} still carries the placeholder ` +
        `${placeholder[0]} from the template ("${placeholder[1]}"). Replace it with the ` +
        'determination you actually made, and with who made it.',
    );
  if (!/^\d{4}-\d{2}-\d{2}$/.test(entry.date))
    return blocked(
      `the reviewed exception for ${key}@${version} records the date "${entry.date}", which is ` +
        'not an ISO calendar date (YYYY-MM-DD). The date is what makes a determination re-checkable ' +
        'against the package as it stood.',
    );
  const recorded = parseDeclared(entry.spdx);
  if (!recorded.ok)
    return blocked(
      `the reviewed exception for ${key}@${version} records an spdx value that is ` +
        `${recorded.reason}: ${entry.spdx}`,
    );
  // An operand whose `+` SPDX cannot express - `Apache-2.0+`, for which there is no
  // `Apache-2.0-or-later` identifier. `resolveDeclaredPrefix` refuses one in a DECLARATION because
  // resolving on the base id records terms narrower than the package offers; a recorded exception
  // is a human's determination about the same package and buys no license to state something
  // narrower than it grants. Without this, `render` reproduces the plain `Apache-2.0` text for a
  // package offering that version or later.
  if (recorded.unrepresentablePlus.length)
    return blocked(
      `the reviewed exception for ${key}@${version} records ${entry.spdx}, and SPDX publishes no ` +
        `"or later" identifier for ${recorded.unrepresentablePlus.join(', ')} - so no identifier ` +
        'states what this package offers, and reproducing the base license text would state terms ' +
        'narrower than it grants. Record the specific version the determination rests on.',
    );
  // An SPDX `WITH` operand names a license EXCEPTION, which modifies the grant its base identifier
  // makes. Bounding `recorded.ids` alone accepted `Apache-2.0 WITH LLVM-exception` on `Apache-2.0`,
  // and would accept `MIT WITH <any-restrictive-clause>` with the clause checked against nothing -
  // the same shape `resolveDeclaredPrefix` refuses for a DECLARATION, for reasons that apply
  // identically here. Downstream, `render.ts#spdxIdsOf` returns nothing for such an expression, so
  // no canonical text is reproduced and the notice disposition degrades to 'unknown' - the row
  // would clear the gate and then describe a license the package is not under.
  if (recorded.exceptions.length)
    return blocked(
      `the reviewed exception for ${key}@${version} records ${entry.spdx}, which carries the ` +
        `license exception ${recorded.exceptions.join(', ')}. An exception modifies the grant its ` +
        'identifier makes and has no text in the SPDX corpus this pipeline reproduces from, so it ' +
        'cannot be admitted by a recorded id alone.',
    );
  const disallowed = recorded.ids.find((id) => isDisallowedId(id, allowed, copyleft));
  if (disallowed)
    return blocked(
      `the reviewed exception for ${key}@${version} records ${entry.spdx}, and ${disallowed} ` +
        `${describeDisallowed(disallowed, copyleft)}. An exception ` +
        'records which license an unidentifiable text actually is; it cannot admit terms the ' +
        'policy does not allow.',
    );
  if (!sha256 || !entry.textSha256)
    return blocked(
      `a reviewed exception exists for ${key}@${version} but the exception is not hash-pinned - ` +
        'both the recorded textSha256 and a detected text hash are required',
    );
  if (entry.textSha256 !== sha256)
    return blocked(
      `a reviewed exception exists for ${key}@${version} but its recorded textSha256 is stale ` +
        `(recorded ${entry.textSha256}, found ${sha256}). The license text changed since it was reviewed.`,
    );
  return { verdict: 'excepted', spdxId: entry.spdx, reason: `reviewed exception: ${entry.reason}` };
}

/**
 * Blocks a declared expression that contains an `AND` conjunction rather than routing it to
 * election handling. `AND` means every operand's terms apply simultaneously - there is no branch to
 * elect, unlike an `OR` disjunction - so an election naming one operand would silently discard the
 * others' obligation. `declared.ids` alone cannot distinguish the two (see `hasConjunction` in
 * `declared.ts`), so this must be checked explicitly wherever `ids.length > 1` is handled.
 */
function conjunctionBlocked(declaredField: string | undefined): BlockedFields {
  return blocked(
    `${declaredField} contains a conjunction (AND) - every operand applies simultaneously, ` +
      'which is not a choice an election can resolve',
  );
}

/**
 * Builds the `elected` verdict, re-deriving `detected`/`matchedFile`/`textSha256` from the usable
 * file that actually matches the elected id, when one exists.
 *
 * `common`'s copy of those fields may already reflect an arbitrary pick among several usable files
 * that all agree with a declared disjunction (see CASE 1 in `classify` - which detected file
 * becomes `best` does not matter to the election logic itself). The elected id is what the verdict
 * actually rests on, so the record should name THAT file, not whichever one happened to be picked
 * first. `usableById` is empty whenever the package ships no license file at all - every NuGet
 * package, and any npm package relying on a monorepo root license - so this is a no-op there and
 * `common`'s existing fields (both `undefined`) pass through unchanged.
 */
function electedResult(
  common: CommonFields,
  usableById: Map<string, DetectedFile>,
  election: Election,
): Verdict {
  const electedFile = usableById.get(election.elected);
  return {
    ...common,
    ...(electedFile
      ? {
          detected: electedFile.spdxId,
          matchedFile: electedFile.filename,
          textSha256: electedFile.sha256,
        }
      : {}),
    verdict: 'elected',
    spdxId: election.elected,
    reason: election.reason,
  };
}

/**
 * Resolves a declared disjunction through the recorded election, or blocks with the reason it could
 * not be resolved.
 *
 * One copy, shared by both paths that reach a multi-operand declaration - the one with identified
 * license text and the one without. Nothing about resolving a CHOICE depends on whether a license
 * file was readable, so the two paths must not be allowed to drift apart.
 */
function resolveElection({
  key,
  declared,
  declaredField,
  policy,
  allowed,
  copyleft,
  common,
  usableById,
}: ResolveContext): Verdict {
  if (declared.hasConjunction) return { ...common, ...conjunctionBlocked(declaredField) };
  const election = (policy.elections || {})[key];
  if (!election)
    return {
      ...common,
      ...blocked(
        `${declaredField} is a choice and no election is recorded. Add an "elections" entry for ` +
          `"${key}" naming which branch this project takes, and why.`,
      ),
    };
  if (!declared.ids.includes(election.elected))
    return {
      ...common,
      ...blocked(`recorded election ${election.elected} is not one of ${declaredField}`),
    };
  if (copyleft.has(election.elected))
    return {
      ...common,
      ...blocked(
        `elected ${election.elected} is copyleft; copyleft cannot be resolved by election`,
      ),
    };
  if (!allowed.has(election.elected))
    return { ...common, ...blocked(`elected ${election.elected} is not on the allowed list`) };
  return electedResult(common, usableById, election);
}

/**
 * The part of resolving a parseable declaration that does not depend on whether a license file was
 * readable: an unverifiable disjunct, a license exception, and a disjunction needing an election.
 *
 * One copy, called by both declared-resolution paths, so a check added here cannot reach only half
 * of them. Returns `undefined` when the declaration is a single identifier the caller must finish
 * resolving itself - the two tails genuinely differ (one reproduces the canonical text on the
 * package's behalf, the other has a detected id to agree with first).
 */
function resolveDeclaredPrefix({
  key,
  declared,
  declaredField,
  policy,
  allowed,
  copyleft,
  common,
  usableById,
}: ResolveContext): Verdict | undefined {
  // A disjunct outside the SPDX list is terms we cannot verify we hold - typically a commercial
  // offer. Electing it would be a procurement decision, so it is never automatic.
  if (declared.hasNonGrantDisjunct)
    return {
      ...common,
      ...blocked(`${declaredField} contains a disjunct that is not a grant we can verify`),
    };

  // An SPDX exception modifies the grant its base identifier makes, and this pipeline reproduces
  // license texts from a corpus that holds no exception texts - so resolving on the base id alone
  // would put a document into the artifact that describes a license the package is not under.
  // Nothing in the current closure declares one; a reviewed exception or a curated override is
  // where the determination belongs when something does.
  // An operand whose `+` SPDX cannot express - see `orLaterId` in declared.ts. Resolving on the
  // base id would record terms NARROWER than the package offers, which is the same class of error
  // as dropping a license exception and is refused for the same reason.
  if (declared.unrepresentablePlus.length)
    return {
      ...common,
      ...blocked(
        `${declaredField} contains ${declared.unrepresentablePlus.join(', ')}, and SPDX publishes ` +
          'no "or later" identifier for it - so no identifier states what this package offers. No ' +
          'policy entry can clear this: `applyException` refuses an unrepresentable "+" by name, ' +
          'and an override applies only where the declaration does not parse. The dependency has ' +
          'to declare a version SPDX can express, or it has to change.',
      ),
    };

  if (declared.exceptions.length)
    return {
      ...common,
      ...blocked(
        `${declaredField} carries the license exception ${declared.exceptions.join(', ')}, which ` +
          'modifies the grant its identifier makes and has no text in the SPDX corpus this ' +
          'pipeline reproduces from. No policy entry can clear this either: `applyException` ' +
          'refuses a "WITH" operand by name, and an override applies only where the declaration ' +
          'does not parse. The dependency has to change.',
      ),
    };

  if (declared.ids.length > 1)
    return resolveElection({
      key,
      declared,
      declaredField,
      policy,
      allowed,
      copyleft,
      common,
      usableById,
    });

  return undefined;
}

/**
 * Whether an identifier is one this project does not admit.
 *
 * An ALLOW LIST with a denylist layered on top, and every gate in this file uses this one
 * predicate. Testing `copyleft` alone is a denylist, and a denylist sees only the identifiers
 * somebody already thought of: `GPL-1.0-*`, `AGPL-1.0-*`, `LGPL-2.0-*`, `MPL-1.0`, `OSL-1.0/2.x`,
 * `CPL-1.0`, `QPL-1.0`, `RPL-*`, `Sleepycat`, `EUPL-1.0/1.1`, `BUSL-1.1`, `Elastic-2.0`,
 * `CC-BY-SA-*` and `CC-BY-NC-*` all read as "not copyleft" and pass, while their text is reproduced
 * into the document either way. An id that is simply unlisted must not default to admissible
 * because it is absent from the copyleft list.
 *
 * `copyleft` is still consulted first, and still carried separately, for one reason: the two answer
 * different questions to a READER. "is copyleft" tells them the dependency has to change; "is not
 * on the allowed list" tells them a policy line may be all that is missing. `describes` is what
 * puts the right one of those in a block message.
 */
export function isDisallowedId(id: string, allowed: Set<string>, copyleft: Set<string>): boolean {
  return copyleft.has(id) || !allowed.has(id);
}

/** How a block message names the reason `isDisallowedId` gave. */
export function describeDisallowed(id: string, copyleft: Set<string>): string {
  return copyleft.has(id) ? 'is copyleft' : 'is not on the allowed list';
}

/**
 * Resolves one declared identifier against the copyleft list and then the allow list, in that
 * order. Copyleft is tested first so a copyleft id that somebody also added to the allow list still
 * blocks, rather than the two lists silently disagreeing in the permissive direction.
 */
function resolveSingleId(
  id: string,
  {
    allowed,
    copyleft,
    common,
    reason,
  }: { allowed: Set<string>; copyleft: Set<string>; common: CommonFields; reason: string },
): Verdict {
  if (copyleft.has(id))
    return { ...common, ...blocked(`${id} is copyleft with no election available`) };
  if (!allowed.has(id)) return { ...common, ...blocked(`${id} is not on the allowed list`) };
  return { ...common, verdict: 'allowed', spdxId: id, reason };
}

/** The detected license files, normalized, and the partitions the reconciliation cases read. */
type DetectedSignals = {
  files: DetectedFile[];
  usable: DetectedFile[];
  usableIds: Set<string>;
  usableById: Map<string, DetectedFile>;
  /** The first file present, whatever it identified as - what an exception is pinned against. */
  anyText: DetectedFile | undefined;
};

/** What reconciling the two signals decided: the file a verdict may rest on, or why none may. */
type Reconciliation = {
  best: DetectedFile | undefined;
  reconciliationBlocked: BlockedFields | undefined;
  /**
   * The bundled file that RAISED the objection, where one did.
   *
   * Carried out because it, not `best`, is what the verdict rests on in that case - and a reviewed
   * exception is hash-pinned to whatever the verdict names. Pinning `best` instead let upstream
   * change the objecting file at the same version with the exception still clearing it.
   */
  objectingFile: DetectedFile | undefined;
};

/**
 * Everything the decision stages below read, once `classify` has normalized its two signals.
 *
 * One object because the stages are alternative paths through the SAME evidence - a check added to
 * one must be able to see exactly what the others see.
 */
type ClassifyContext = {
  key: string;
  version: string;
  declaredField: string | undefined;
  policy: Policy;
  allowed: Set<string>;
  copyleft: Set<string>;
  common: CommonFields;
  declared: Declared;
  usableById: Map<string, DetectedFile>;
};

/**
 * Normalizes every detected id, then partitions the files into the ones that may resolve a verdict
 * and the ones that may only raise an objection.
 */
function readDetectedFiles(detection: ClassifyInput['detection']): DetectedSignals {
  // Normalize every detected id through spdx-correct before it can reach a policy lookup or
  // comparison - see `normalizeDetectedId`.
  const files = (detection.files || []).map((f) => ({
    ...f,
    spdxId: normalizeDetectedId(f.spdxId),
  }));
  const usable = files.filter(
    (f) => f.confidence >= CONFIDENCE_THRESHOLD && !SENTINELS.has(f.spdxId),
  );
  const usableIds = new Set(usable.map((f) => f.spdxId));
  // The FIRST file with a given identifier wins, never the last: `detect.rb` orders files by
  // filename score, so a package's own `LICENSE` must not be displaced by a bundled
  // `LICENSE.thirdparty` identifying as the same license - as `new Map(usable.map(...))` would let
  // it. The verdict then names the bundled file, and `buildLock` pins its hash: after which
  // `diffLock`'s
  // "license text changed under the same version and identifier" - the one drift signal the lock
  // exists for - watches a third-party file, and the package relicensing its OWN text produces no
  // drift at all. Filename score is the closest thing available to "which file is this package's
  // own grant", so the first is the one to keep.
  const usableById = new Map<string, DetectedFile>();
  usable.forEach((file) => {
    if (!usableById.has(file.spdxId)) usableById.set(file.spdxId, file);
  });
  const anyText = files[0];

  return { files, usable, usableIds, usableById, anyText };
}

/**
 * The confidence threshold decides which files may RESOLVE a verdict. It must not also decide which
 * files may raise an objection. Without this check, a package declaring MIT that also ships a
 * `LICENSE.GPL` identifying as GPL-3.0 at 95% leaves `usableIds` a single MIT entry: CASE 0's guard
 * (`declared.ids.length > 1`) does not apply, CASE 2's `badExtra` scan searches `usable` only, CASE
 * 3 is unreachable - so the verdict is `allowed MIT` while `joinTexts` reproduces the GPL text into
 * the shipped document. Licensee routinely lands in the low-to-mid nineties on a real match (its
 * Dice matcher scores by content similarity, and its Reference matcher is hard-coded to 90), so
 * that is the ordinary shape of the hazard rather than a corner of it - and the same file as the
 * ONLY file blocks, which would leave the rule inverted exactly where a second signal exists. A
 * reviewed exception can clear it, because there is a text to pin one against.
 *
 * An ALLOWLIST, and deliberately the same predicate CASE 2's `badExtra` scan applies to the files
 * that ARE usable: `copyleft.has(id) || !allowed.has(id)`. Testing the copyleft list alone would
 * make this the one admission path in the file shaped as a denylist, seeing only the 21 ids
 * somebody already thought of - `GPL-1.0-*`, `AGPL-1.0-*`, `LGPL-2.0-*`, `MPL-1.0`, `OSL-*`,
 * `CPL-1.0`, `QPL-1.0`, `RPL-*`, `Sleepycat`, `EUPL-1.0/1.1`, `BUSL-1.1`, `Elastic-2.0` and
 * `CC-BY-SA-*` all read as "not copyleft" and pass, while their text is reproduced either way. An
 * id that is simply unlisted must not default to allowed just because it is absent from the
 * copyleft list; the same sentence is already written about the text-derived path below.
 *
 * Sentinels are excluded explicitly. `copyleft.has('NOASSERTION')` is false, so the denylist form
 * skips an unidentified file for free; `!allowed.has('NOASSERTION')` is TRUE, so without this every
 * package shipping a file licensee could not identify would block - which is case (2) below's job,
 * decided there with the declaration in hand rather than here.
 */
function objectingUnusableFile(
  files: DetectedFile[],
  usable: DetectedFile[],
  allowed: Set<string>,
  copyleft: Set<string>,
): { fields: BlockedFields; file: DetectedFile } | undefined {
  const unusableDisallowed = files.find(
    (file) =>
      !usable.includes(file) &&
      !SENTINELS.has(file.spdxId) &&
      isDisallowedId(file.spdxId, allowed, copyleft),
  );
  if (!unusableDisallowed) return undefined;
  // The file is returned with the message because the verdict has to be PINNED to it - see
  // `Reconciliation.objectingFile`.
  return {
    file: unusableDisallowed,
    fields: blocked(
      `bundles ${unusableDisallowed.filename}, which identifies as ${unusableDisallowed.spdxId} ` +
        `at ${unusableDisallowed.confidence}% confidence - below the ${CONFIDENCE_THRESHOLD}% ` +
        `threshold that would let it resolve a verdict, but ${
          copyleft.has(unusableDisallowed.spdxId) ? 'copyleft' : 'not on the allowed list'
        } either way and reproduced in the document either way`,
    ),
  };
}

/**
 * Reconciles multiple usable license files against the DECLARED expression, rather than blocking on
 * any disagreement outright. Two usable ids are the normal shape for a dual-licensed package (it
 * ships both texts) and for a package that bundles a third-party attribution alongside its own
 * license text - neither is a real disagreement once checked against what the manifest actually
 * declares.
 */
function reconcileDetection({
  signals,
  declared,
  declaredField,
  allowed,
  copyleft,
}: {
  signals: DetectedSignals;
  declared: Declared;
  declaredField: string | undefined;
  allowed: Set<string>;
  copyleft: Set<string>;
}): Reconciliation {
  const { files, usable, usableIds, usableById } = signals;
  let best;
  let reconciliationBlocked;
  if (usableIds.size <= 1) {
    [best] = usable;
    // CASE 0: exactly one identified id, against a declaration naming several. The single-id
    // declaration path below compares `declaredId !== best.spdxId`, and CASE 1/CASE 2 below compare
    // the multi-file shapes, but neither covers this shape: `resolveElection` reads only
    // `declared.ids` and the recorded election, so without this check a package declaring
    // `(MIT OR Apache-2.0)` whose only license file identifies as `AGPL-3.0-or-later` at 100%
    // confidence resolves to `elected MIT`. That is the disagreement the two independent signals
    // exist to catch, resolving on the PERMISSIVE side - the one direction a licensing tool must
    // never fail in. No package in the current closure takes this branch (`dompurify` ships both
    // texts and so takes CASE 1; `jszip` and `nuget:CsvHelper` have no usable detection at all), so
    // nothing but this check stands between that shape and a wrong verdict.
    if (best && declared.ok && declared.ids.length > 1 && !declared.ids.includes(best.spdxId))
      reconciliationBlocked = blocked(
        `declares ${declaredField} but its ${best.filename} identifies as ${best.spdxId} ` +
          `(${best.confidence}% confidence), which is not one of the declared operands`,
      );
  } else if (
    declared.ok &&
    !declared.hasConjunction &&
    declared.ids.length > 1 &&
    [...usableIds].every((id) => declared.ids.includes(id))
  ) {
    // CASE 1: the declared field is a disjunction, and every detected id is one of its operands -
    // e.g. npm:dompurify ships both LICENSE (Apache-2.0) and LICENSE-MPL (MPL-2.0), and declares
    // "(MPL-2.0 OR Apache-2.0)". This is the expected shape of a dual-licensed package, not a
    // disagreement - fall through to the normal disjunction/election logic below. Which usable
    // file becomes `best` here does not matter to that logic (it reads only `declared.ids` and
    // the policy's `elections` entry); the election success paths re-derive `detected`/
    // `matchedFile`/`textSha256` from `usableById` for whichever id is actually elected.
    [best] = usable;
  } else if (declared.ok && declared.ids.length === 1 && usableById.has(declared.ids[0])) {
    // CASE 2: the declared field is a single id, and it IS among the detected ids - e.g.
    // npm:doctrine declares plain Apache-2.0 and bundles esprima's BSD-2-Clause
    // LICENSE.esprima alongside its own LICENSE. The other usable file(s) are bundled
    // third-party attributions, not the package's own grant, so resolve on the declared id - but
    // an extra that is copyleft, or otherwise unlisted, is an undisclosed obligation hiding
    // behind a permissive primary license. That is exactly the hazard this reconciliation exists
    // to catch, so it still blocks (the extra is still reproduced in the notices output either
    // way - this only decides which id the VERDICT rests on).
    best = usableById.get(declared.ids[0]);
    const badExtra = usable.find(
      (f) => f.spdxId !== declared.ids[0] && isDisallowedId(f.spdxId, allowed, copyleft),
    );
    if (badExtra)
      reconciliationBlocked = blocked(
        `bundles ${badExtra.filename} (${badExtra.spdxId}), which ${describeDisallowed(
          badExtra.spdxId,
          copyleft,
        )} and is not the package's own declared license`,
      );
  } else if (
    declared.ok &&
    declared.hasConjunction &&
    [...usableIds].every((id) => declared.ids.includes(id))
  ) {
    // CASE 2b: the declaration is a CONJUNCTION and every detected id is one of its operands - a
    // package that ships `LICENSE-MIT` and `LICENSE-APACHE` and declares `MIT AND Apache-2.0`. The
    // files do not disagree; they agree exactly, with each other and with the declaration. CASE 1
    // excludes this shape (`!declared.hasConjunction`) because a conjunction is not a choice an
    // election can resolve, and CASE 2 excludes it (`ids.length === 1`), so it fell to CASE 3 and
    // blocked with `license files disagree` - a reason that is not merely unhelpful but false, and
    // one that sends the reader looking for a conflict between two files that are consistent.
    //
    // It still BLOCKS: every operand of a conjunction applies at once, and resolving it
    // automatically would need a rule for reproducing several sets of terms that this pipeline
    // does not have. What it needs is a human recording the compound expression, which is what the
    // three conjunction packages in the current closure carry (`pako` `(MIT AND Zlib)`,
    // `chroma-js`, `lucide-react`) - so the reason now names the real obstacle, and `report.ts`
    // offers the instrument that actually clears it.
    reconciliationBlocked = conjunctionBlocked(declaredField);
  } else {
    // CASE 3: no detected id matches the declaration at all - a real conflict, not an absence of
    // information. detect.rb orders files by filename score, not confidence or severity, so
    // picking one arbitrarily could silently choose the permissive one and ignore a file naming a
    // stricter license right next to it.
    reconciliationBlocked = blocked(
      `license files disagree: ${usable.map((f) => `${f.filename}=${f.spdxId}`).join(', ')}`,
    );
  }

  let objectingFile: DetectedFile | undefined;
  if (!reconciliationBlocked) {
    const objection = objectingUnusableFile(files, usable, allowed, copyleft);
    reconciliationBlocked = objection?.fields;
    objectingFile = objection?.file;
  }

  return { best, reconciliationBlocked, objectingFile };
}

/**
 * Every return path in this function - including the success ones - routes through `settle`, which
 * delegates here, so the `result.verdict === 'blocked'` guard is load-bearing: a package that
 * already resolves to `allowed`/`elected` on its own must never be silently overridden by an
 * exception recorded for it, even one that is validly hash-pinned. Only a result that has actually
 * failed may be reconsidered.
 */
function withException(
  result: Verdict,
  ctx: ClassifyContext,
  exception: BlockedFields | undefined,
  usableDisallowed: DetectedFile | undefined,
): Verdict {
  const { common, key, version, copyleft } = ctx;
  if (result.verdict !== 'blocked' || !exception) return result;
  // Only when the exception would actually CLEAR the block. `applyException` returns its own
  // blocked verdicts for a malformed or stale entry, and those messages name the specific defect
  // in the entry, which is more use to the reader than this one.
  if (exception.verdict !== 'blocked' && usableDisallowed)
    return {
      ...common,
      ...blocked(
        `a reviewed exception exists for ${key}@${version}, but its ${usableDisallowed.filename} ` +
          `identifies as ${usableDisallowed.spdxId} at ${usableDisallowed.confidence}% ` +
          `confidence, and ${usableDisallowed.spdxId} ` +
          `${describeDisallowed(usableDisallowed.spdxId, copyleft)}. An exception records which ` +
          'license an unidentifiable text actually is; it cannot override a positive ' +
          'identification of terms the policy does not admit.',
      ),
    };
  return { ...common, ...exception };
}

/**
 * Refuses an override whose reviewable boolean is not actually a boolean.
 *
 * `versionIndependent` and `nonSpdx` each stand for a decision a human made, and each is read below
 * as a plain truthiness test. The template `report.ts` prints supplies both as PLACEHOLDER STRINGS
 * for the reader to replace - `"<true instead of \"version\" if it holds at any version>"` and
 * `"<true if \"license\" above is free text rather than an SPDX expression>"` - and a non-empty
 * string is truthy, so a paste left half-filled answers "yes" to the very question the placeholder
 * is asking. `loadPolicy` does no type validation and `types.ts` only DECLARES both as `boolean?`,
 * so this is the one place the declared type is enforced against what the file actually holds.
 */
function nonBooleanOverrideFlag(
  key: string,
  field: 'versionIndependent' | 'nonSpdx',
  value: unknown,
): BlockedFields | undefined {
  if (value === undefined || typeof value === 'boolean') return undefined;
  return blocked(
    `the "overrides" entry for "${key}" records ${JSON.stringify(value)} for "${field}", which is ` +
      'not a boolean. The field records a decision a reviewer made, and any non-empty value at all ' +
      'would otherwise read as "yes" - the placeholder the template prints included. Record true, ' +
      'or drop the field.',
  );
}

/**
 * Applies a curated override to a result the reviewed-exception path left blocked, or blocks again
 * naming what the entry itself fails to establish.
 */
function applyOverride(ctx: ClassifyContext, override: Override): Verdict {
  const { common, key, version, allowed, copyleft } = ctx;

  // An override's value is free text by design ("Proprietary — SIL…" is not an SPDX identifier
  // any list could hold), so it cannot be checked against `allowed` the way `applyException`
  // checks its own recorded id. These two checks are what an unvalidated read of
  // `override.license` costs instead:
  //
  //  - An entry with the `license` key MISSING produces `verdict: 'overridden'` with
  //    `spdxId: undefined`, which `main.ts`'s block filter does not catch, `displayLicense`
  //    renders as a bare `UNKNOWN` row in the shipped document, and `buildLock` records with no
  //    identifier at all. The same package with no override entry AT ALL blocks - so the malformed
  //    entry is strictly more permissive than no entry.
  //  - An override naming a copyleft identifier would have cleared a package past the one gate
  //    this pipeline exists to enforce, from an instrument that is not pinned to a version or to
  //    a license text. `applyException` refuses exactly that, for exactly that reason.
  if (typeof override.license !== 'string' || !override.license.trim())
    return {
      ...common,
      ...blocked(
        `the notices policy has an "overrides" entry for "${key}" with no "license" recorded, ` +
          'so there is no determination to apply. An override records what a human established ' +
          'about a package whose own metadata establishes nothing; an entry that establishes ' +
          'nothing either cannot clear it.',
      ),
    };
  // An override is keyed by NAME, and is pinned to neither a version nor a license text - so a
  // determination someone made by reading one version's nuspec keeps applying, unreviewed, to
  // whatever comes back under that name. `version` is optional (most entries are about a package
  // whose metadata establishes nothing at any version), but where a reviewer recorded WHICH
  // version they read, a different one has to come back for review rather than inherit the
  // answer. `stalePolicyEntries` reports an override matching no package; it could never report
  // one matching a DIFFERENT package than the reviewer had in front of them.
  if (override.version && override.version !== version)
    return {
      ...common,
      ...blocked(
        `the "overrides" entry for "${key}" records a determination made against version ` +
          `${override.version}, and this is ${version}. An override is not pinned to a license ` +
          'text, so it does not carry across a version change on its own - re-read the package ' +
          'and update the entry, or replace "version" with "versionIndependent": true if the ' +
          'determination holds at any version.',
      ),
    };
  // An entry with NEITHER field states nothing about what the reviewer read, and the two cases it
  // conflates need opposite handling: a determination drawn from one version's own metadata (a
  // nuspec `licenseUrl`, an ICU release's terms) must come back for review when that version
  // moves, while a first-party "all rights reserved" holds at every version and re-reviewing it
  // on each release bump is friction with nothing to find. Neither is the default, so the entry
  // has to say which it is - the same shape as `nonSpdx`, one reviewable boolean in the policy
  // file rather than an absence nobody can see from the diff.
  const malformedFlag =
    nonBooleanOverrideFlag(key, 'versionIndependent', override.versionIndependent) ??
    nonBooleanOverrideFlag(key, 'nonSpdx', override.nonSpdx);
  if (malformedFlag) return { ...common, ...malformedFlag };
  // Every placeholder `report.ts` prints is a non-empty string like any other, so an entry pasted
  // and left half-filled clears each check that only asks whether the field is set.
  //
  // `license` matters most and is the least obvious, because the fields around it are the ones a
  // reader thinks to fill: an entry supplying `note`, `nonSpdx: true` and `versionIndependent: true`
  // satisfies every other gate here while `license` still reads
  // `<SPDX identifier, or a short free-text determination>` - and `nonSpdx` is precisely what stops
  // that value being parsed, so nothing downstream looks at it again. The template's own wording
  // then travels into the document and the lock as the terms a shipped package is under.
  const placeholderField = (['license', 'note'] as const).find((field) =>
    PLACEHOLDER_TEMPLATE_VALUE.test(String(override[field] ?? '')),
  );
  if (placeholderField)
    return {
      ...common,
      ...blocked(
        `the "overrides" entry for "${key}" still carries the placeholder ${placeholderField} from ` +
          `the template ("${override[placeholderField]}"). Replace it with the determination you ` +
          'actually made.',
      ),
    };
  if (!override.version && override.versionIndependent !== true)
    return {
      ...common,
      ...blocked(
        `the "overrides" entry for "${key}" records neither the "version" the determination was ` +
          'made against nor "versionIndependent": true. An override is keyed by name and pinned ' +
          'to no license text, so without one of the two it applies unreviewed to whatever ' +
          'comes back under that name. Add "version": ' +
          `"${version}" if the determination rests on what this version says, or ` +
          '"versionIndependent": true if it holds at any version.',
      ),
    };

  const recorded = parseDeclared(override.license);
  // A `recorded.ok &&` guard would short-circuit the copyleft test to `false`, applying the check
  // below ONLY to an override that happens to be spelled as an SPDX expression - and free text is
  // what this field is designed to hold (five of the seven live entries use it). An entry reading
  // "GNU General Public License v3" would then return `overridden` while the same determination
  // spelled `GPL-3.0-only` blocks: a gate strictest on the input class it can actually check, and
  // silent on the one it cannot.
  //
  // An unparseable value cannot be tested against either list, so the answer is not to test it
  // but to stop the bypass being invisible: the entry must say, in the policy file, that its
  // value is deliberately not an SPDX expression. That is the same shape as `alwaysList` - one
  // reviewable boolean on the entry - and it makes a copyleft determination smuggled in as prose
  // a line a reviewer sees rather than a short-circuit nobody can see from the diff.
  if (!recorded.ok && override.nonSpdx !== true)
    return {
      ...common,
      ...blocked(
        `the "overrides" entry for "${key}" records ${override.license}, which is not an SPDX ` +
          "expression, so it cannot be checked against the policy's allowed and copyleft " +
          'lists. Spell it as an SPDX identifier, or add "nonSpdx": true to the entry to record ' +
          'that the value is deliberately free text and the determination was made by a human.',
      ),
    };

  // A package that IS a separately redistributed program - the NuGet route for one - is admitted
  // by the reviewed `separatePrograms` entry it names, not by this override's own fields. The
  // link has to resolve, and the license has to be an SPDX expression, because the document
  // reproduces that identifier's canonical text on the program's behalf.
  if (override.separateProgram !== undefined) {
    const programName = String(override.separateProgram).trim();
    const programs = ctx.policy.separatePrograms || {};
    // `Object.hasOwn` rather than a bare index, as `mergeTable` and `assertExternalExtensionsRecorded`
    // both do: indexing answers every `Object.prototype` member, so a name like `constructor` would
    // resolve truthy and skip the refusal below in favour of a message about reviewed identifiers.
    const program = Object.hasOwn(programs, programName) ? programs[programName] : undefined;
    if (!program)
      return {
        ...common,
        ...blocked(
          `the "overrides" entry for "${key}" names separate program "${programName}", and ` +
            `"separatePrograms" records no entry named "${programName}". Record the program ` +
            'there - reviewer, date, reason, source availability and each delivery - or remove ' +
            'the link.',
        ),
      };
    if (!recorded.ok)
      return {
        ...common,
        ...blocked(
          `the "overrides" entry for "${key}" is linked to separate program "${programName}", ` +
            `so its "license" must be an SPDX expression, and "${override.license}" is not. The ` +
            "document reproduces the program's canonical license text under that identifier.",
        ),
      };
    // The ENTRY admits, not the override. This path returns before the allowed/copyleft test
    // below - deliberately, because a separately redistributed program is admitted under terms
    // the policy's lists do not have to allow (Mercurial's GPL-2.0-or-later is the live case).
    // What makes that safe is that a human read THOSE terms and recorded them on the program:
    // so an override may only name an identifier the reviewed entry itself names. Otherwise a
    // link to a reviewed GPL-2.0-or-later program would carry any identifier at all - an
    // unreviewed copyleft one, or one on neither list - past the one gate this pipeline exists
    // to enforce, and the document would reproduce a text the reviewer never read.
    // A `WITH` exception, an unrepresentable `+`, or a conjunction is refused BEFORE the identifier
    // test, because `recorded.ids` is flattened: `declared.ts` keeps the operands separately and
    // says why - the verdict, the lock and the reproduced text all describe the UNMODIFIED license.
    // Compared against a program's plain identifiers, `GPL-2.0-or-later WITH Classpath-exception-2.0`
    // would pass on its base operand alone, and the row and lock would then record terms - base plus
    // exception - that nobody reviewed. The same gate the exception and declared paths already
    // apply.
    if (
      recorded.exceptions.length ||
      recorded.unrepresentablePlus.length ||
      recorded.hasConjunction
    )
      return {
        ...common,
        ...blocked(
          `the "overrides" entry for "${key}" records ${override.license}, which carries an ` +
            'exception, an unrepresentable "+" or a conjunction. A linked override is admitted by ' +
            'the terms a human read for the separate program, and those are recorded as plain ' +
            `identifiers on "${programName}" - record the whole expression there, or name just the ` +
            'identifier the entry carries.',
        ),
      };
    // `Array.isArray`, because `program.spdx` is untyped overlay JSON until
    // `assertSeparateProgramsRecorded` runs, and classification runs BEFORE it: a bare string would
    // make this `String.prototype.includes`, so a narrower identifier would clear the gate merely by
    // being a substring of the reviewed one. An empty list here blocks, and the assertion names the
    // field a step later.
    const reviewedIds = Array.isArray(program.spdx) ? program.spdx : [];
    const unreviewedId = recorded.ids.find((id) => !reviewedIds.includes(id));
    if (unreviewedId)
      return {
        ...common,
        ...blocked(
          `the "overrides" entry for "${key}" records ${override.license} and is linked to ` +
            `separate program "${programName}", whose reviewed identifiers are ` +
            `${reviewedIds.join(', ') || '(none)'}. A linked override is admitted by ` +
            'the terms a human read for the program, so it cannot name ' +
            `${unreviewedId} - fix whichever is wrong.`,
        ),
      };
    return {
      ...common,
      verdict: 'overridden',
      spdxId: override.license,
      reason:
        `recorded determination in the notices policy: ${override.license}, redistributed as ` +
        `the separate program "${programName}"`,
    };
  }

  // The same predicate the exception path applies, for the same reason. Testing `copyleft` alone
  // makes this a denylist over 21 ids, under which an override spelled as a real SPDX identifier
  // the policy has never admitted - `CC-BY-NC-4.0`, `BUSL-1.1` - is recorded as the license of a
  // shipped package with nothing checking it. An override still bypasses the allow list where its
  // value
  // is deliberately NOT an SPDX expression; that is what `nonSpdx` records, and it is checked
  // above. Where the value DOES parse, there is a list to check it against and no reason not to.
  const disallowedId =
    recorded.ok && recorded.ids.find((id) => isDisallowedId(id, allowed, copyleft));
  if (disallowedId)
    return {
      ...common,
      ...blocked(
        `the "overrides" entry for "${key}" records ${override.license}, and ${disallowedId} ` +
          `${describeDisallowed(disallowedId, copyleft)}. An override records which license ` +
          'applies to a package that states nothing; it cannot admit terms the policy does not ' +
          'allow.',
      ),
    };

  return {
    ...common,
    verdict: 'overridden',
    spdxId: override.license,
    reason: `recorded determination in the notices policy: ${override.license}`,
  };
}

/**
 * No usable detection, which is TWO different facts that must not be collapsed into one.
 *
 * (2) License file(s) EXIST but none of them identifies - licensee returned NOASSERTION/NONE, or
 * matched below the confidence threshold. An unidentifiable license text is evidence that something
 * is unusual (a concatenated multi-license document, a modified grant), so it blocks and a human
 * decides. `npm:jszip` is the live case - its `LICENSE.markdown` concatenates the full MIT and
 * GPLv3 texts - and so is `npm:argparse`, whose LICENSE is CPython's own four-license HISTORY
 * document. Both SHOULD block, and both can be cleared by a reviewed exception, because there IS a
 * text to hash-pin one against.
 *
 * (3) There is NO license file at all. That is NORMAL, not a missing signal: monorepo-published
 * families such as `@radix-ui/*` publish dozens of packages against one root license, and every
 * NuGet package is described from nuspec metadata with no file to read. Resolve on the declared
 * expression and reproduce the canonical SPDX text on the package's behalf, paired with whatever
 * copyright notice its metadata carries - that is what discharges "this permission notice shall be
 * included in all copies". The declaration still has to be unambiguous, on the allow list and not
 * copyleft; a disjunction still needs a recorded election, and a conjunction still blocks.
 *
 * This rule is ecosystem-independent, and deliberately so. Requiring positively identified text for
 * every npm verdict - on the premise that npm offers two signals, so a missing file means an
 * expected one is absent - is a tempting variation, and it is wrong: 14 packages in this closure
 * declare plain `MIT` and ship no file, and NO instrument could clear them under that rule.
 * `applyException` rejects an exception that is not pinned to a text hash, and a curated override
 * applies only where nothing parseable is declared. NuGet needs no special case here either; it
 * simply always lands in (3).
 */
function resolveWithoutText(ctx: ClassifyContext, files: DetectedFile[]): Verdict {
  const { key, declared, declaredField, policy, allowed, copyleft, common, usableById } = ctx;

  if (files.length > 0)
    return {
      ...common,
      ...blocked(
        declaredField
          ? `declares ${declaredField} but no license text could be identified at or above ` +
              `${CONFIDENCE_THRESHOLD}% confidence`
          : 'declares no license and no license text could be identified',
      ),
    };

  if (!declared.ok)
    return {
      ...common,
      ...blocked(
        declared.reason === 'no license declared'
          ? 'ships no license file and declares no license'
          : `ships no license file, and its declared license is ${declared.reason}: ${declaredField}`,
      ),
    };

  const prefix = resolveDeclaredPrefix({
    key,
    declared,
    declaredField,
    policy,
    allowed,
    copyleft,
    common,
    usableById,
  });
  if (prefix) return prefix;

  return resolveSingleId(declared.ids[0], {
    allowed,
    copyleft,
    common,
    reason: `declared ${declared.ids[0]}; canonical text reproduced`,
  });
}

/**
 * Resolves a package whose license text licensee positively identified: on the text alone where the
 * package declares nothing, and otherwise on the declaration the text has to agree with.
 */
function resolveWithText(ctx: ClassifyContext, best: DetectedFile): Verdict {
  const { key, declared, declaredField, policy, allowed, copyleft, common, usableById } = ctx;

  // Nothing declared: the text is the only signal, and it is a good one at this confidence. Keyed
  // off `declared.reason` rather than `declaredField`'s truthiness, because `parseDeclared` already
  // treats `''` and `'   '` identically ('no license declared') and this must not diverge from that
  // by re-deciding on raw truthiness.
  if (!declared.ok && declared.reason === 'no license declared') {
    if (copyleft.has(best.spdxId))
      return {
        ...common,
        ...blocked(`text-derived ${best.spdxId} is copyleft with no election available`),
      };
    // An allowlist, like every other path in this file: an id that is simply unlisted (neither
    // vetted-permissive nor known-copyleft) must not default to allowed just because it is absent
    // from the copyleft list.
    if (!allowed.has(best.spdxId))
      return {
        ...common,
        ...blocked(`text-derived ${best.spdxId} is not on the allowed list`),
      };
    return {
      ...common,
      verdict: 'allowed',
      spdxId: best.spdxId,
      reason: `text-derived ${best.spdxId}`,
    };
  }

  if (!declared.ok)
    return {
      ...common,
      ...blocked(`declared license is ${declared.reason}: ${declaredField}`),
    };

  const prefix = resolveDeclaredPrefix({
    key,
    declared,
    declaredField,
    policy,
    allowed,
    copyleft,
    common,
    usableById,
  });
  if (prefix) return prefix;

  const declaredId = declared.ids[0];
  if (declaredId !== best.spdxId)
    return {
      ...common,
      ...blocked(
        `declares ${declaredId} but its ${best.filename} identifies as ${best.spdxId} ` +
          `(${best.confidence}% confidence)`,
      ),
    };

  // The same three branches `resolveSingleId` applies, so the two cannot drift into disagreeing
  // about what a single identifier resolves to - only the recorded reason differs here.
  return resolveSingleId(declaredId, {
    allowed,
    copyleft,
    common,
    reason: `declared and detected agree on ${declaredId}`,
  });
}

/** The two instruments that may reconsider a blocked verdict. */
type Instruments = {
  /** A reviewed exception recorded for this exact `name@version`, where there is one. */
  exception: BlockedFields | undefined;
  /** The curated override, where the package itself establishes nothing to contradict it. */
  overridable: Override | undefined;
};

/** Reads the two instruments that may reconsider a blocked verdict. */
function readInstruments(
  ctx: ClassifyContext,
  signals: DetectedSignals,
  sha256: string | undefined,
): Instruments {
  const { key, version, policy, allowed, copyleft, declared } = ctx;
  const { files } = signals;
  const exception = applyException(policy, key, version, sha256, allowed, copyleft);
  // A curated override records what a human established about a package whose own metadata
  // establishes nothing - the SIL packages whose nuspecs declare no license at all, and the
  // Windows-only ICU runtime that no restore on this machine resolves. Unless it links to a
  // reviewed separate program (see the bound below), it is applied ONLY where the package declares
  // nothing parseable AND no license text was identified, so an override can never mask or
  // contradict something a package actually says: if `ParatextData` ever starts declaring a
  // copyleft license, it blocks exactly as it would with no entry here.
  //
  // An override bypasses the allow list only where its value is deliberately NOT an SPDX expression
  // - free text such as "Proprietary - …" is not an identifier any list could hold - and `nonSpdx`
  // is the reviewable flag that records that. Where the value DOES parse, it is checked against the
  // same predicate an exception's recorded id is (`isDisallowedId`), because there is a list to
  // check it against and nothing is gained by having the two instruments disagree about what the
  // policy admits. A reviewed exception is the more specific instrument (pinned to one version AND
  // one license text), so it is consulted first and an override never rescues a package whose
  // exception failed its own pinning.
  const override = (policy.overrides || {})[key];
  // "No license text was identified" is a statement about the FILES, not about `best`. `best` is
  // also undefined where the files DISAGREE (CASE 3) and where nothing cleared the confidence
  // threshold, so testing `!best` let an override clear a package shipping a GPL text beside an MIT
  // one, and a package whose lone file identifies as GPL-3.0-only at 95%. `applyException` refuses
  // exactly that through `usableCopyleft`, and an override is the weaker of the two instruments -
  // keyed by name, pinned to no license text - so it must not be the more permissive one.
  //
  // The bound is ANY identification at ANY confidence, not just a copyleft one. Below the threshold
  // an id is not reliable enough to resolve a verdict, but it is ample evidence that the package
  // does say something, which is the one premise this whole instrument rests on. Sentinels are
  // excluded because `NOASSERTION`/`NONE` are licensee reporting that it identified nothing, which
  // is the case an override exists for.
  const identifiedText = files.find((file) => !SENTINELS.has(file.spdxId));
  // A `separateProgram` link is exempt from that bound, because it is not the weak instrument the
  // bound exists to hold back. An unlinked override is a claim keyed by name and pinned to nothing;
  // a linked one may only name a program `separatePrograms` records - reviewer, date, reason and
  // source availability included - and may only carry an identifier that reviewed entry itself
  // names (`applyOverride`). The determination behind it is strictly better evidence than a
  // package's own metadata, so it does not have to wait for that metadata to be silent.
  //
  // Bounding it the same way would make the whole route depend on a third party's packaging
  // staying license-silent: the NuGet delivery of a separate program is somebody's repackaging of
  // an upstream release, and the day it declares its licence - the direction NuGet has pushed for
  // years - the package would hard-block with no policy entry able to clear it, on a program a
  // human had already reviewed. That is the reverse of what the reviewed entry is for.
  //
  // What this does NOT do is reconcile a disagreement: where the package declares one licence and
  // the reviewed entry names another, the entry wins and the document records the entry's. That is
  // the right authority - a person read the program's terms - but it is not a check, so a
  // declaration that contradicts a reviewed program is worth noticing by hand.
  const linkedToSeparateProgram = override?.separateProgram !== undefined;
  // `override` itself rather than a boolean, so the stage it clears reads the entry it applies.
  const overridable =
    linkedToSeparateProgram || (!declared.ok && !identifiedText) ? override : undefined;

  return { exception, overridable };
}

/**
 * Resolves one package to exactly one verdict. Pure - all inputs are arguments.
 *
 * The two signals are deliberately independent: `declaredField` comes from the package manifest,
 * `detection` from licensee reading the license text with detect_packages disabled. Because neither
 * derives from the other, a disagreement between them is real information rather than a tautology.
 *
 * The rule is ecosystem-independent and turns on THREE cases, not two - see the `if (!best)` block:
 * a license file that identifies must agree with the declaration; a license file that does NOT
 * identify blocks; and NO license file at all resolves on the declaration, with the canonical SPDX
 * text reproduced on the package's behalf. Shipping no license file is normal, not a missing
 * signal.
 */
export function classify({
  name,
  version,
  ecosystem,
  declaredField,
  detection,
  policy,
  validationErrors = [],
}: ClassifyInput): Verdict {
  const key = `${ecosystem}:${name}`;
  const allowed = new Set(policy.allowed);
  const copyleft = new Set(policy.copyleft);

  const signals = readDetectedFiles(detection);
  const { files, usableById, anyText } = signals;

  const declared = parseDeclared(declaredField);

  const { best, reconciliationBlocked, objectingFile } = reconcileDetection({
    signals,
    declared,
    declaredField,
    allowed,
    copyleft,
  });

  // The file the verdict actually rests on, which is not always `best`.
  //
  // `objectingFile` leads, because where one exists the verdict rests on IT: a package shipping
  // LICENSE (MIT, above threshold) beside LICENSE.gpl (GPL-3.0, below it) is blocked by the second
  // file while `best` is the first. Pinning `best` there let upstream rewrite the objecting file at
  // the same version with a reviewed exception still clearing it - the one drift a hash pin exists
  // to catch, watching the wrong file.
  //
  // Otherwise `best`, not an arbitrary "first file in the array" - a package can change the license
  // text of its matched file while an unrelated file at index 0 stays untouched. `anyText` is the
  // last resort, so an exception can still be pinned against unidentified text (e.g. a NOASSERTION
  // compound document).
  const pinned = objectingFile || best || anyText;
  const sha256 = pinned?.sha256;

  // An INADMISSIBLE id that resolved AT OR ABOVE the confidence threshold - a positive
  // identification, not an ambiguous one. Neither instrument may override it: `applyException`
  // bounds what an exception may record, but nothing bounded what it could record it AGAINST, so an
  // entry saying `MIT` cleared a package whose LICENSE identified as AGPL-3.0 at 100% and
  // `joinTexts` then reproduced the AGPL text under a row labelled MIT. The instrument's own message
  // says it "records which license an unidentifiable text actually is"; a 100% match is the case
  // where the text IS identifiable and the two signals disagree.
  //
  // Bounded by `isDisallowedId`, not by the copyleft list alone - the same predicate
  // `applyException` applies to what an exception may RECORD, and the same one the unusable-file
  // scan applies. Testing copyleft alone leaves this the one admission path in the file still shaped
  // as a denylist: a text identifying as `CC-BY-NC-4.0` or `BUSL-1.1` at 100% is then cleared by an
  // exception recording `MIT`, and its text reproduced under a row labelled MIT.
  //
  // Scoped to `usable` on purpose. A BELOW-threshold match is exactly the unidentifiable text an
  // exception exists to resolve - `npm:jszip`'s LICENSE.markdown concatenates the full MIT and
  // GPLv3 texts - and it is already blocked separately by the unusable-file scan, which a reviewed
  // exception is meant to be able to clear.
  const usableDisallowed = signals.usable.find((file) =>
    isDisallowedId(file.spdxId, allowed, copyleft),
  );

  // `matchedFile` and `textSha256` describe ONE file, so they are both taken from `pinned`.
  // Recording `best`'s filename beside the objecting file's hash would leave a block message naming
  // a permissive license and an exception pinned to a restrictive text - and taking the hash from
  // `anyText` while leaving the filename undefined is what makes `diffLock`'s most important
  // message read "Inspect undefined before accepting", for exactly the packages whose license text
  // nothing identified and which therefore need a hand review.
  //
  // `detected` is the one that legitimately does not follow: on the `anyText` branch nothing
  // identified the text, so there is no identifier to record. `exceptionRemedy` reads `detected` to
  // decide whether an exception could clear the block at all, and an invented id would answer that
  // question wrongly.
  const common = {
    declared: declaredField,
    detected: objectingFile ? objectingFile.spdxId : best?.spdxId,
    matchedFile: pinned?.filename,
    textSha256: sha256,
    // Carried on every verdict, not only the blocked ones, because `common` is what every return
    // path spreads - and because the remedy printed for a block has to be able to tell a positive
    // identification from the below-threshold match `detected` may equally be holding.
    usableDisallowedId: usableDisallowed?.spdxId,
    usableDisallowedFile: usableDisallowed?.filename,
  };

  const ctx: ClassifyContext = {
    key,
    version,
    declaredField,
    policy,
    allowed,
    copyleft,
    common,
    declared,
    usableById,
  };

  const { exception, overridable } = readInstruments(ctx, signals, sha256);

  // The upstream tool could not establish the license. Never a permissive result. Requires an
  // actual array: `{}.length` is `undefined`, which duck-types as "no errors" and would silently
  // disable this gate for any caller passing a malformed value instead of an array. Deliberately
  // routed through `withException` rather than `settle`: this reports a CALLER BUG, not a licensing
  // fact, and a curated override must never make a malformed input look resolved.
  if (!Array.isArray(validationErrors))
    return withException(
      {
        ...common,
        ...blocked(
          `upstream reported a malformed validationErrors value: ${JSON.stringify(
            validationErrors,
          )}`,
        ),
      },
      ctx,
      exception,
      usableDisallowed,
    );

  /** Reconsiders a blocked result against a reviewed exception first, then a curated override. */
  const settle = (result: Verdict): Verdict => {
    const afterException = withException(result, ctx, exception, usableDisallowed);
    if (afterException.verdict !== 'blocked' || exception || !overridable) return afterException;
    return applyOverride(ctx, overridable);
  };

  if (validationErrors.length)
    return settle({
      ...common,
      ...blocked(`upstream reported: ${validationErrors.join('; ')}`),
    });

  if (reconciliationBlocked) return settle({ ...common, ...reconciliationBlocked });

  if (!best) return settle(resolveWithoutText(ctx, files));

  return settle(resolveWithText(ctx, best));
}
