const fs = require('fs');
const correct = require('spdx-correct');
const { parseDeclared } = require('./declared');

/**
 * Licensee's own default (`Licensee::CONFIDENCE_THRESHOLD`). Named here rather than inlined so
 * lowering it is a visible policy change in review, not a buried literal.
 */
const CONFIDENCE_THRESHOLD = 98;

/** Licensee returns these instead of an SPDX id when it cannot identify the text. */
const SENTINELS = new Set(['NOASSERTION', 'NONE']);

/**
 * @typedef {{
 *   verdict: 'allowed' | 'elected' | 'excepted' | 'overridden' | 'blocked';
 *   spdxId: string | undefined;
 *   reason: string;
 *   declared: string | undefined;
 *   detected: string | undefined;
 *   matchedFile: string | undefined;
 *   textSha256: string | undefined;
 * }} Verdict
 */

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
 *
 * @param {string} id
 * @returns {string}
 */
function normalizeDetectedId(id) {
  if (!id || SENTINELS.has(id)) return 'NOASSERTION';
  // spdx-correct returns a corrected id, the id unchanged if it was already canonical, or a
  // library-internal "cannot correct" sentinel for anything unrecognized - never an empty string,
  // so a plain truthiness check (rather than comparing against that sentinel by name, which this
  // repo's `no-null/no-null` rule forbids anyway) distinguishes the two cases correctly.
  const corrected = correct(id);
  return corrected || 'NOASSERTION';
}

/**
 * Loads the policy document from disk: the single source of every repository-specific licensing
 * decision.
 *
 * `copyrightNotices` and `overrides` were migrated here from the deleted
 * `generate-third-party-notices.js`, whose two hand-maintained tables they replace. Their rationale
 * came with them, because it is the part a future reader cannot reconstruct:
 *
 * - **`copyrightNotices`** (keyed `npm:<name>`) carries the copyright line for an npm package whose
 *   own licence file cannot be read on the generating machine. An npm manifest has no copyright
 *   field, so a package shipping no readable licence file leaves the canonical SPDX text with
 *   nothing to pair against - and MIT, BSD and ISC all require the copyright notice to travel with
 *   copies, which SPDX's `<copyright holders>` placeholder does not satisfy. Every entry is a
 *   notice read from the package's own LICENSE, never a holder inferred from `author`. The packages
 *   here are the `yalc` dev-linked ones, which `dev-packages.json` points at a moving branch of
 *   another repository; verify an entry against the published tarball when its major version
 *   changes.
 * - **`overrides`** (keyed `<ecosystem>:<name>`) is the curated answer for a package whose own
 *   metadata establishes nothing. `alwaysList` marks one that must appear in the document even
 *   though no restore on this machine resolves it: `Microsoft.ICU.ICU4C.Runtime` is referenced
 *   under `Condition="$([MSBuild]::IsOsPlatform('Windows'))"`, which MSBuild evaluates against the
 *   HOST OS rather than the target runtime identifier, so `dotnet restore -r win-x64` on Linux
 *   still does not pull it in and the four-RID union does not surface it. Without `alwaysList` a
 *   genuinely shipped Windows dependency would be silently absent.
 *
 *   An override's `note` is REPRODUCED in the document, in the Notes column, where it displaces the
 *   nuspec's own copyright notice (see `nugetVerdict`) - so a package that has no licence text to
 *   pair a copyright with must not carry one, or its copyright appears nowhere at all. `reason` is
 *   the field for rationale that belongs to the reviewer rather than to the artifact: it is read by
 *   nothing here and exists to make the determination reviewable in this file, which is where a
 *   `<licenseUrl>` override has to be justified. The three legacy-`<licenseUrl>` NuGet packages use
 *   it for exactly that.
 *
 * `exceptionsNote` carries no data the pipeline reads. JSON has no comments, and the status of the
 * `exceptions` entries - drafted by automated analysis of each package's licence file, awaiting
 * human sign-off - is something a reader of the policy file alone has to be able to see without
 * hunting for a report elsewhere. It sits immediately before the array for that reason.
 *
 * @param {string} file
 * @returns {{
 *   allowed: string[];
 *   copyleft: string[];
 *   elections: Record<string, { elected: string; of: string; reason: string }>;
 *   exceptionsNote?: string;
 *   exceptions: {
 *     package: string;
 *     spdx: string;
 *     reason: string;
 *     reviewer: string;
 *     date: string;
 *     textSha256: string;
 *   }[];
 *   copyrightNotices?: Record<string, string>;
 *   overrides?: Record<
 *     string,
 *     { license: string; note?: string; reason?: string; alwaysList?: boolean }
 *   >;
 * }}
 */
function loadPolicy(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function blocked(reason, extra = {}) {
  return { verdict: 'blocked', spdxId: undefined, reason, ...extra };
}

/**
 * Applies a reviewed exception. Exceptions are an override applied AFTER a block, never a path
 * reconciliation can reach on its own, and they are pinned to name@version AND the exact text hash
 * so that a package changing its license text re-blocks instead of silently inheriting the escape.
 *
 * Requires a non-empty string on BOTH sides of the hash comparison, and a recorded `spdx` id.
 * `undefined !== undefined` is `false` in JavaScript, so an exception with no text found (`sha256`
 * undefined) matched against an entry whose `textSha256` key is simply omitted would otherwise
 * "match" with zero verification on either side - the omitted-key shape is also the one most likely
 * to be hand-authored by mistake, unlike an explicit `textSha256: null`, which already failed the
 * old `!==` comparison correctly.
 *
 * The recorded `spdx` is also checked AGAINST THE SAME TWO LISTS every other path in this file is
 * checked against. An exception is the one instrument that clears a blocked verdict, and until this
 * check existed the mechanism itself imposed no limit on what it could clear TO: an entry naming
 * `AGPL-3.0-or-later` was accepted and returned `excepted AGPL-3.0-or-later`, and the only thing
 * standing against that was a data-level test over the COMMITTED policy - which by construction
 * cannot cover an entry added in the same pull request as the policy change that would have to
 * accompany it. The lists are the project's standing decision about what it may ship under, and an
 * exception is a determination about WHICH licence a package's unidentifiable text actually is, not
 * a licence to ship under different terms. Requiring a new identifier to be added to `allowed`
 * first is the point: that is a visible, reviewable line in the policy rather than one buried in a
 * per-package entry.
 */
function applyException(policy, key, version, sha256, allowed, copyleft) {
  const entry = (policy.exceptions || []).find((e) => e.package === `${key}@${version}`);
  if (!entry) return undefined;
  if (!entry.spdx)
    return blocked(`a reviewed exception exists for ${key}@${version} but has no spdx id recorded`);
  const recorded = parseDeclared(entry.spdx);
  if (!recorded.ok)
    return blocked(
      `the reviewed exception for ${key}@${version} records an spdx value that is ` +
        `${recorded.reason}: ${entry.spdx}`,
    );
  const disallowed = recorded.ids.find((id) => copyleft.has(id) || !allowed.has(id));
  if (disallowed)
    return blocked(
      `the reviewed exception for ${key}@${version} records ${entry.spdx}, and ${disallowed} ` +
        `${copyleft.has(disallowed) ? 'is copyleft' : 'is not on the allowed list'}. An exception ` +
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
 * `declared.js`), so this must be checked explicitly wherever `ids.length > 1` is handled.
 */
function conjunctionBlocked(declaredField) {
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
function electedResult(common, usableById, election) {
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
 * licence text and the one without. Nothing about resolving a CHOICE depends on whether a licence
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
}) {
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
 * The part of resolving a parseable declaration that does not depend on whether a licence file was
 * readable: an unverifiable disjunct, a licence exception, and a disjunction needing an election.
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
}) {
  // A disjunct outside the SPDX list is terms we cannot verify we hold - typically a commercial
  // offer. Electing it would be a procurement decision, so it is never automatic.
  if (declared.hasNonGrantDisjunct)
    return {
      ...common,
      ...blocked(`${declaredField} contains a disjunct that is not a grant we can verify`),
    };

  // An SPDX exception modifies the grant its base identifier makes, and this pipeline reproduces
  // license texts from a corpus that holds no exception texts - so resolving on the base id alone
  // would put a document into the artifact that describes a licence the package is not under.
  // Nothing in the current closure declares one; a reviewed exception or a curated override is
  // where the determination belongs when something does.
  if (declared.exceptions.length)
    return {
      ...common,
      ...blocked(
        `${declaredField} carries the license exception ${declared.exceptions.join(', ')}, which ` +
          'modifies the grant its identifier makes and has no text in the SPDX corpus this ' +
          'pipeline reproduces from, so it is recorded by a human rather than resolved',
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
 * Resolves one declared identifier against the copyleft list and then the allow list, in that
 * order. Copyleft is tested first so a copyleft id that somebody also added to the allow list still
 * blocks, rather than the two lists silently disagreeing in the permissive direction.
 */
function resolveSingleId(id, { allowed, copyleft, common, reason }) {
  if (copyleft.has(id))
    return { ...common, ...blocked(`${id} is copyleft with no election available`) };
  if (!allowed.has(id)) return { ...common, ...blocked(`${id} is not on the allowed list`) };
  return { ...common, verdict: 'allowed', spdxId: id, reason };
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
 *
 * @param {{
 *   name: string;
 *   version: string;
 *   ecosystem: string;
 *   declaredField: string | undefined;
 *   detection: {
 *     dir: string;
 *     files: {
 *       filename: string;
 *       spdxId: string;
 *       matcher: string;
 *       confidence: number;
 *       sha256: string;
 *       text: string;
 *     }[];
 *   };
 *   policy: {
 *     allowed: string[];
 *     copyleft: string[];
 *     elections: Record<string, { elected: string; of: string; reason: string }>;
 *     exceptions: {
 *       package: string;
 *       spdx: string;
 *       reason: string;
 *       reviewer: string;
 *       date: string;
 *       textSha256: string;
 *     }[];
 *     overrides?: Record<string, { license: string; note?: string; alwaysList?: boolean }>;
 *   };
 *   validationErrors?: string[];
 * }} input
 * @returns {Verdict}
 */
function classify({
  name,
  version,
  ecosystem,
  declaredField,
  detection,
  policy,
  validationErrors = [],
}) {
  const key = `${ecosystem}:${name}`;
  const allowed = new Set(policy.allowed);
  const copyleft = new Set(policy.copyleft);

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
  const usableById = new Map(usable.map((f) => [f.spdxId, f]));
  const anyText = files[0];

  const declared = parseDeclared(declaredField);

  // Reconciles multiple usable license files against the DECLARED expression, rather than
  // blocking on any disagreement outright. Two usable ids are the normal shape for a
  // dual-licensed package (it ships both texts) and for a package that bundles a third-party
  // attribution alongside its own license text - neither is a real disagreement once checked
  // against what the manifest actually declares.
  let best;
  let reconciliationBlocked;
  if (usableIds.size <= 1) {
    [best] = usable;
    // CASE 0: exactly one identified id, against a declaration naming several. The single-id
    // declaration path below compares `declaredId !== best.spdxId`, and CASE 1/CASE 2 below compare
    // the multi-file shapes, but neither covers this shape: `resolveElection` reads only
    // `declared.ids` and the recorded election, so without this check a package declaring
    // `(MIT OR Apache-2.0)` whose only licence file identifies as `AGPL-3.0-or-later` at 100%
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
      (f) => f.spdxId !== declared.ids[0] && (copyleft.has(f.spdxId) || !allowed.has(f.spdxId)),
    );
    if (badExtra)
      reconciliationBlocked = blocked(
        `bundles ${badExtra.filename} (${badExtra.spdxId}), which ${
          copyleft.has(badExtra.spdxId) ? 'is copyleft' : 'is not on the allowed list'
        } and is not the package's own declared license`,
      );
  } else {
    // CASE 3: no detected id matches the declaration at all - a real conflict, not an absence of
    // information. detect.rb orders files by filename score, not confidence or severity, so
    // picking one arbitrarily could silently choose the permissive one and ignore a file naming a
    // stricter license right next to it.
    reconciliationBlocked = blocked(
      `license files disagree: ${usable.map((f) => `${f.filename}=${f.spdxId}`).join(', ')}`,
    );
  }

  // The confidence threshold decides which files may RESOLVE a verdict. It must not also decide
  // which files may raise an objection. Without this check, a package declaring MIT that also ships
  // a `LICENSE.GPL` identifying as GPL-3.0 at 95% leaves `usableIds` a single MIT entry: CASE 0's
  // guard (`declared.ids.length > 1`) does not apply, CASE 2's `badExtra` scan searches `usable`
  // only, CASE 3 is unreachable - so the verdict is `allowed MIT` while `joinTexts` reproduces the
  // GPL text into the shipped document. Licensee routinely lands in the low-to-mid nineties on a
  // real match (its Dice matcher scores by content similarity, and its Reference matcher is
  // hard-coded to 90), so that is the ordinary shape of the hazard rather than a corner of it - and
  // the same file as the ONLY file blocks, which would leave the rule inverted exactly where a
  // second signal exists. A reviewed exception can clear it, because there is a text to pin one
  // against.
  if (!reconciliationBlocked) {
    const unusableCopyleft = files.find(
      (file) => copyleft.has(file.spdxId) && !usable.includes(file),
    );
    if (unusableCopyleft)
      reconciliationBlocked = blocked(
        `bundles ${unusableCopyleft.filename}, which identifies as ${unusableCopyleft.spdxId} ` +
          `at ${unusableCopyleft.confidence}% confidence - below the ${CONFIDENCE_THRESHOLD}% ` +
          'threshold that would let it resolve a verdict, but copyleft either way and reproduced ' +
          'in the document either way',
      );
  }

  // Hashes the file that actually produced the verdict (`best`), not an arbitrary "first file in
  // the array" - a package can change the license text of its matched file while an unrelated
  // file at index 0 stays untouched, which would otherwise let a hash-pinned exception silently
  // survive a real license change. Falls back to the first file present only when there is no
  // usable match at all, so an exception can still be pinned against unidentified text (e.g. a
  // NOASSERTION compound document).
  const sha256 = (best || anyText)?.sha256;

  const common = {
    declared: declaredField,
    detected: best ? best.spdxId : undefined,
    matchedFile: best ? best.filename : undefined,
    textSha256: sha256,
  };

  const exception = applyException(policy, key, version, sha256, allowed, copyleft);
  // Every return path in this function - including the success ones - routes through `settle`,
  // which delegates here, so the `result.verdict === 'blocked'` guard is load-bearing: a package
  // that already resolves to `allowed`/`elected` on its own must never be silently overridden by an
  // exception recorded for it, even one that is validly hash-pinned. Only a result that has
  // actually failed may be reconsidered.
  const withException = (result) =>
    result.verdict === 'blocked' && exception ? { ...common, ...exception } : result;

  // A curated override records what a human established about a package whose own metadata
  // establishes nothing - the SIL packages whose nuspecs declare no licence at all, and the
  // Windows-only ICU runtime that no restore on this machine resolves. It is applied ONLY where the
  // package declares nothing parseable AND no licence text was identified, so an override can never
  // mask or contradict something a package actually says: if `ParatextData` ever starts declaring a
  // copyleft licence, it blocks exactly as it would with no entry here.
  //
  // Like an exception, an override bypasses the allow-list rather than being checked against it: its
  // value is a recorded determination, and free text such as "Proprietary - …" is not an SPDX
  // identifier any list could hold. A reviewed exception is the more specific instrument (pinned to
  // one version AND one licence text), so it is consulted first and an override never rescues a
  // package whose exception failed its own pinning.
  const override = (policy.overrides || {})[key];
  const overridable = !!override && !declared.ok && !best;

  // The upstream tool could not establish the license. Never a permissive result. Requires an
  // actual array: `{}.length` is `undefined`, which duck-types as "no errors" and would silently
  // disable this gate for any caller passing a malformed value instead of an array. Deliberately
  // routed through `withException` rather than `settle`: this reports a CALLER BUG, not a licensing
  // fact, and a curated override must never make a malformed input look resolved.
  if (!Array.isArray(validationErrors))
    return withException({
      ...common,
      ...blocked(
        `upstream reported a malformed validationErrors value: ${JSON.stringify(validationErrors)}`,
      ),
    });

  /** Reconsiders a blocked result against a reviewed exception first, then a curated override. */
  const settle = (result) => {
    const afterException = withException(result);
    if (afterException.verdict !== 'blocked' || exception || !overridable) return afterException;

    // An override's value is free text by design ("Proprietary — SIL…" is not an SPDX identifier
    // any list could hold), so it cannot be checked against `allowed` the way `applyException`
    // checks its own recorded id. These two checks are what an unvalidated read of
    // `override.license` cost instead:
    //
    //  - An entry with the `license` key MISSING produced `verdict: 'overridden'` with
    //    `spdxId: undefined`, which `main.js`'s block filter does not catch, `displayLicense`
    //    renders as a bare `UNKNOWN` row in the shipped document, and `buildLock` records with no
    //    identifier at all. The same package with no override entry AT ALL would have blocked - so
    //    the malformed entry was strictly more permissive than no entry.
    //  - An override naming a copyleft identifier would have cleared a package past the one gate
    //    this pipeline exists to enforce, from an instrument that is not pinned to a version or to
    //    a licence text. `applyException` refuses exactly that, for exactly that reason.
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
    const recorded = parseDeclared(override.license);
    const copyleftId = recorded.ok && recorded.ids.find((id) => copyleft.has(id));
    if (copyleftId)
      return {
        ...common,
        ...blocked(
          `the "overrides" entry for "${key}" records ${override.license}, and ${copyleftId} is ` +
            'copyleft. An override records which license applies to a package that states nothing; ' +
            'it cannot admit terms the policy does not allow.',
        ),
      };

    return {
      ...common,
      verdict: 'overridden',
      spdxId: override.license,
      reason: `recorded determination in the notices policy: ${override.license}`,
    };
  };

  if (validationErrors.length)
    return settle({
      ...common,
      ...blocked(`upstream reported: ${validationErrors.join('; ')}`),
    });

  if (reconciliationBlocked) return settle({ ...common, ...reconciliationBlocked });

  // No usable detection, which is TWO different facts that must not be collapsed into one.
  //
  //  (2) Licence file(s) EXIST but none of them identifies - licensee returned NOASSERTION/NONE, or
  //      matched below the confidence threshold. An unidentifiable licence text is evidence that
  //      something is unusual (a concatenated multi-licence document, a modified grant), so it
  //      blocks and a human decides. `npm:jszip` is the live case - its `LICENSE.markdown`
  //      concatenates the full MIT and GPLv3 texts - and so is `npm:argparse`, whose LICENSE is
  //      CPython's own four-licence HISTORY document. Both SHOULD block, and both can be cleared by
  //      a reviewed exception, because there IS a text to hash-pin one against.
  //
  //  (3) There is NO licence file at all. That is NORMAL, not a missing signal: monorepo-published
  //      families such as `@radix-ui/*` publish dozens of packages against one root licence, and
  //      every NuGet package is described from nuspec metadata with no file to read. Resolve on the
  //      declared expression and reproduce the canonical SPDX text on the package's behalf, paired
  //      with whatever copyright notice its metadata carries - that is what discharges "this
  //      permission notice shall be included in all copies". The declaration still has to be
  //      unambiguous, on the allow list and not copyleft; a disjunction still needs a recorded
  //      election, and a conjunction still blocks.
  //
  // This rule is ecosystem-independent, and deliberately so. Requiring positively identified text
  // for every npm verdict - on the premise that npm offers two signals, so a missing file means an
  // expected one is absent - is a tempting variation, and it is wrong: 14 packages in this closure
  // declare plain `MIT` and ship no file, and NO instrument could clear them under that rule.
  // `applyException` rejects an exception that is not pinned to a text hash, and a curated override
  // applies only where nothing parseable is declared. NuGet needs no special case here either; it
  // simply always lands in (3).
  if (!best) {
    if (files.length > 0)
      return settle({
        ...common,
        ...blocked(
          declaredField
            ? `declares ${declaredField} but no license text could be identified at or above ` +
                `${CONFIDENCE_THRESHOLD}% confidence`
            : 'declares no license and no license text could be identified',
        ),
      });

    if (!declared.ok)
      return settle({
        ...common,
        ...blocked(
          declared.reason === 'no license declared'
            ? 'ships no license file and declares no license'
            : `ships no license file, and its declared license is ${declared.reason}: ${declaredField}`,
        ),
      });

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
    if (prefix) return settle(prefix);

    return settle(
      resolveSingleId(declared.ids[0], {
        allowed,
        copyleft,
        common,
        reason: `declared ${declared.ids[0]}; canonical text reproduced`,
      }),
    );
  }

  // Nothing declared: the text is the only signal, and it is a good one at this confidence. Keyed
  // off `declared.reason` rather than `declaredField`'s truthiness, because `parseDeclared` already
  // treats `''` and `'   '` identically ('no license declared') and this must not diverge from that
  // by re-deciding on raw truthiness.
  if (!declared.ok && declared.reason === 'no license declared') {
    if (copyleft.has(best.spdxId))
      return settle({
        ...common,
        ...blocked(`text-derived ${best.spdxId} is copyleft with no election available`),
      });
    // An allowlist, like every other path in this file: an id that is simply unlisted (neither
    // vetted-permissive nor known-copyleft) must not default to allowed just because it is absent
    // from the copyleft list.
    if (!allowed.has(best.spdxId))
      return settle({
        ...common,
        ...blocked(`text-derived ${best.spdxId} is not on the allowed list`),
      });
    return settle({
      ...common,
      verdict: 'allowed',
      spdxId: best.spdxId,
      reason: `text-derived ${best.spdxId}`,
    });
  }

  if (!declared.ok)
    return settle({
      ...common,
      ...blocked(`declared license is ${declared.reason}: ${declaredField}`),
    });

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
  if (prefix) return settle(prefix);

  const declaredId = declared.ids[0];
  if (declaredId !== best.spdxId)
    return settle({
      ...common,
      ...blocked(
        `declares ${declaredId} but its ${best.filename} identifies as ${best.spdxId} ` +
          `(${best.confidence}% confidence)`,
      ),
    });

  if (copyleft.has(declaredId))
    return settle({
      ...common,
      ...blocked(`${declaredId} is copyleft with no election available`),
    });

  if (!allowed.has(declaredId))
    return settle({ ...common, ...blocked(`${declaredId} is not on the allowed list`) });

  return settle({
    ...common,
    verdict: 'allowed',
    spdxId: declaredId,
    reason: `declared and detected agree on ${declaredId}`,
  });
}

module.exports = { classify, loadPolicy, CONFIDENCE_THRESHOLD };
