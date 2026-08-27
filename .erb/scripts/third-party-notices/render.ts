/**
 * Renders the notices document from a resolved report: preamble, per-ecosystem tables, license-text
 * sections, canonical-text section, `NOTICE` section.
 *
 * Pure: every input arrives as an argument, nothing is read from disk, and the same report always
 * produces the same bytes. That is what makes the golden test in `render.test.ts` meaningful and
 * what lets CI compare the committed artifact byte for byte.
 */

import * as crypto from 'crypto';
import { compareByNameThenVersion, compareStrings } from './compare';
import { canonicalText } from './corpus';
import { parseDeclared } from './declared';
import { normalizeText } from './package-files';
import type { NamedText, Report, ReportRow, SnapStagePackage } from './types';

/** A license or NOTICE text, keyed by its own hash, with every package it covers. */
type CollectedTexts = Map<string, { text: string; packages: string[] }>;

/**
 * The SPDX identifiers a resolved `spdxId` names, or `[]` when it names none.
 *
 * `spdxId` is not always a bare identifier. `applyException` records the whole expression a
 * reviewed exception names, and the committed policy has three compound ones (`(MIT AND Zlib)`,
 * `(ISC AND MIT)`, `(BSD-3-Clause AND Apache-2.0)`); a curated override records free text that is
 * no identifier at all ("Proprietary — SIL…"). Treating the field as a bare id matches nothing for
 * a compound one: `pako@1.0.11` is recorded as `(MIT AND Zlib)`, and only its MIT half would be
 * reproduced, with the Zlib half appearing nowhere in the artifact.
 *
 * An expression carrying a `WITH` exception deliberately yields `[]` rather than its base
 * identifiers: reproducing the unmodified text of a license the package is NOT under would be worse
 * than reproducing none, and the corpus holds no exception texts.
 */
const spdxIdsCache = new Map<string | undefined, string[]>();

export function spdxIdsOf(spdxId: string | undefined): string[] {
  // Memoized: every row is asked this three to four times on one pass (the compound test, the
  // canonical-text collection, the credit line and the accounting assertion), and each call reparses
  // the same SPDX expression. Keyed by the expression, which is the whole input.
  const cached = spdxIdsCache.get(spdxId);
  if (cached) return cached;

  const parsed = parseDeclared(spdxId);
  const ids = !parsed.ok || parsed.exceptions.length ? [] : parsed.ids;
  spdxIdsCache.set(spdxId, ids);
  return ids;
}

/** How each ecosystem is spelled in the document. The verdict carries the internal key. */
const ECOSYSTEM_LABEL: Record<string, string> = { npm: 'npm', nuget: 'NuGet' };

/**
 * A Markdown code fence long enough to enclose `text`.
 *
 * License texts are third-party content reproduced verbatim, and a fixed ``` fence is closed by the
 * first line in that content that happens to start one - after which the rest of the license, and
 * everything written after it, renders as prose. Markdown closes a fence only on a run at least as
 * long as the opening one, so opening with one backtick more than the longest run in the text
 * cannot be closed early.
 */
export function fenceFor(text: string | undefined): string {
  const longest = [...String(text ?? '').matchAll(/`+/g)].reduce(
    (max, match) => Math.max(max, match[0].length),
    0,
  );
  return '`'.repeat(Math.max(3, longest + 1));
}

/**
 * Escapes a value for a Markdown table cell.
 *
 * Applied to npm rows as well as NuGet ones: an npm `license` field is third-party text like any
 * other, and one `|` in it silently shifts every column of that row.
 */
export function cell(value: string | undefined): string {
  // Backslashes FIRST: escaping the pipe introduces backslashes of its own, so doing it the other
  // way round would double those and leave the pipe live. A value ending in a backslash - a Windows
  // path in a NuGet `Notes` field - otherwise escapes the escape and GFM reads the pipe as a column
  // break, shifting every cell of that row in a document packed into every installer.
  return (value || '').replace(/\\/g, '\\\\').replace(/\|/g, '\\|').replace(/\s+/g, ' ').trim();
}

/**
 * What is said in place of a copyright notice when there is none to quote.
 *
 * Three different facts, and collapsing them would be the lie: "nothing was found in a file that
 * was read" is not "there is no field to find it in", and neither is "the package was never on this
 * machine to read". A notices file must never imply knowledge it does not have.
 */
const MISSING_COPYRIGHT_NOTICE: Record<string, string> = {
  uninspected: 'not present in the local package folder, so no copyright notice could be read',
  NuGet: 'neither its nuspec nor its license files state a copyright notice',
  npm: 'no copyright notice — an npm manifest has no field for one, and its license files state none',
};

/**
 * The credit line for one package listed beneath a canonical SPDX license text.
 *
 * A canonical text carries SPDX's placeholders (`<year>`, `<copyright holders>`) rather than any
 * package's holder, so the package's own copyright notice is what pairs the two - reproducing the
 * permission notice without the copyright notice it is supposed to accompany satisfies neither
 * license. Absence is stated rather than left blank: a blank reads as "nobody looked".
 */
export function canonicalTextCredit({
  name,
  version,
  ecosystem,
  copyright,
  inspected = true,
}: {
  name: string;
  version: string;
  ecosystem: string;
  copyright?: string;
  inspected?: boolean;
}): string {
  const notice =
    (copyright || '').replace(/\s+/g, ' ').trim() ||
    MISSING_COPYRIGHT_NOTICE[inspected ? ecosystem : 'uninspected'];
  return `\`${name}@${version}\` (${ecosystem}) — ${notice}`;
}

/**
 * Several files' texts as one block, each labelled when there is more than one.
 *
 * A dual-licensed package ships one file per branch (`LICENSE-APACHE` and `LICENSE-MIT`), and
 * reproducing only one of them satisfies neither license, so every file licensee identified is
 * carried rather than only the one the verdict rests on.
 */
export function joinTexts(files: NamedText[]): string | undefined {
  const usable = (files || [])
    .map(({ name, text }) => ({ name, text: normalizeText(text) }))
    .filter((entry) => entry.text);
  if (!usable.length) return undefined;
  if (usable.length === 1) return usable[0].text;
  return usable.map(({ name, text }) => `===== ${name} =====\n\n${text}`).join('\n\n');
}

/**
 * Whether a package's own license obliges this project to redistribute its `NOTICE`.
 *
 * Apache-2.0 section 4(d) is the clause that does, and it is the only one in play here. Under MIT,
 * BSD or ISC the obligation is to carry the copyright and permission notice - which reproducing the
 * license text discharges - so a `NOTICE` shipped beside them is informational.
 *
 * THREE answers, not two. A regex over the raw `spdxId` collapsed the third into "not required",
 * which is the one direction a legal artifact must not guess in:
 *
 * - `'required'` - an Apache-2.0 operand is present, so 4(d) applies. Reached through the parser
 *   rather than a substring test so a compound expression such as `(BSD-3-Clause AND Apache-2.0)`
 *   is recognized as the conjunction it is rather than by the letters in it.
 * - `'not-required'` - the expression parses and names no Apache-2.0 operand.
 * - `'unknown'` - the field is not an SPDX expression at all. Every `overridden` row is this: a
 *   free-text determination ("Proprietary — SIL…", "MICROSOFT .NET LIBRARY") whose terms this
 *   pipeline has not read. Saying of one that its terms "do not require redistribution" asserts
 *   something nobody established, so its NOTICE is reproduced instead - over-disclosure is the safe
 *   direction, and a NOTICE is attribution rather than a grant.
 */
export function noticeDisposition(
  spdxId: string | undefined,
): 'required' | 'not-required' | 'unknown' {
  const ids = spdxIdsOf(spdxId);
  if (!ids.length) return 'unknown';
  return ids.some((id) => id === 'Apache-2.0') ? 'required' : 'not-required';
}

/**
 * Emits one numbered fenced section per collected text, crediting the packages it covers.
 *
 * Written out twice, byte for byte, for the license texts and again for the NOTICE texts. The
 * canonical-texts section deliberately differs - it heads each block with the SPDX identifier and
 * lists its credits as bullets - so only the two that are identical are shared here.
 */
function pushFencedSections(out: string[], collected: CollectedTexts): void {
  [...collected.values()].forEach(({ text, packages: covered }, index) => {
    const fence = fenceFor(text);
    out.push(`### ${index + 1}. ${covered.join(', ')}`, '', `${fence}text`, text, fence, '');
  });
}

/** Records `text` under its own hash, crediting `subject`, so identical texts appear once. */
function collectText(collected: CollectedTexts, text: unknown, subject: string): void {
  const normalized = normalizeText(text);
  if (!normalized) return;
  const hash = crypto.createHash('sha1').update(normalized).digest('hex');
  if (!collected.has(hash)) collected.set(hash, { text: normalized, packages: [] });
  collected.get(hash)?.packages.push(subject);
}

/**
 * The license a row is displayed as.
 *
 * `spdxId` is the identifier the verdict actually rests on. An election and a reviewed exception
 * are decisions this repository made rather than facts the package states, so each says so in the
 * cell rather than presenting the resolved identifier as if the package had declared it. A curated
 * override needs no marker: its value is free text naming the determination ("Proprietary — …") or
 * is explained by the Notes cell beside it, and the `.NET data provider` section says where such a
 * row comes from.
 *
 * BOTH markers can apply at once, and `npm:jszip` is the live case: it declares `(MIT OR
 * GPL-3.0-or-later)` and this project elects MIT, but its `LICENSE.markdown` concatenates the
 * complete MIT and GPL-3.0 texts, so no matcher identifies it and the npm rule - which requires
 * positively identified text for every verdict - cannot resolve the election on its own. The
 * exception is what clears the block, but the ELECTION is what a reader of the table needs: it
 * records that a deliberate choice was made between two grants, one of them copyleft. Showing only
 * "reviewed exception" loses that, so a row carrying both shows both.
 *
 * The election marker is driven by the `election` the orchestrator attached from the policy, and
 * only when that election's `elected` id is the one the row actually resolved to - a stale entry
 * naming some other branch must not label a row it did not decide.
 */
function displayLicense(row: {
  verdict: string;
  spdxId?: string;
  declared?: string;
  election?: { elected: string };
}): string {
  if (!row.spdxId) return 'UNKNOWN';
  const elected = row.verdict === 'elected' || row.election?.elected === row.spdxId;
  const markers = [
    ...(elected && row.declared ? [`elected from ${row.declared}`] : []),
    ...(row.verdict === 'excepted' ? ['reviewed exception'] : []),
  ];
  return markers.length ? `${row.spdxId} (${markers.join('; ')})` : row.spdxId;
}

/**
 * The sentences describing what the staged Ubuntu libraries are licensed under, from the policy's
 * `snapStagePackages` table.
 *
 * Grouped by the terms recorded rather than listed one per line, so it stays readable as the set
 * grows. `terms` is deliberately as coarse as the source it is read from ("the LGPL", not
 * `LGPL-2.1-or-later`): recording a version nobody established would be inventing precision.
 *
 * A `not-established` classification is REPRODUCED, not skipped. Those libraries ship inside the
 * `.snap` exactly like the others, and a reader cannot tell an omission from an oversight - the
 * same reason the packaging-gap paragraph below says what it says instead of staying silent.
 */
function snapLicensing(
  staged: string[],
  table: Record<string, { classification: string; terms?: string }>,
): string[] {
  const byTerms = new Map<string, string[]>();
  const permissive: string[] = [];
  const unestablished: string[] = [];
  staged.forEach((pkg) => {
    const entry = table[pkg] || {};
    if (entry.classification === 'copyleft') {
      const key = entry.terms || 'terms not recorded';
      byTerms.set(key, [...(byTerms.get(key) || []), pkg]);
    } else if (entry.classification === 'permissive') permissive.push(pkg);
    else unestablished.push(pkg);
  });

  const list = (names: string[]) => names.map((name) => `\`${name}\``).join(', ');
  const lines: string[] = [];
  if (byTerms.size)
    lines.push(
      `Copyleft: ${[...byTerms.entries()]
        .map(([terms, names]) => `${list(names)} under ${terms}`)
        .join('; ')}.`,
    );
  if (permissive.length) lines.push(`Permissive: ${list(permissive)}.`);
  // One line per sentence, not hand-wrapped: the lists grow with `stagePackages`, and a fixed split
  // would go ragged the moment a name is added. Markdown joins consecutive lines into one paragraph
  // either way, and this document already carries generated lines several hundred characters long.
  if (unestablished.length)
    lines.push(
      `The terms of ${list(unestablished)} have not been established here. ` +
        `${unestablished.length === 1 ? 'It is' : 'They are'} staged and redistributed like the ` +
        'rest; saying so is not the same as saying no notice is owed.',
    );
  return lines;
}

/** One row of the report, plus the derivations the document's tables and paragraphs read. */
type DescribedRow = ReportRow & {
  license: string;
  hasText: boolean;
  compound: boolean;
  hasCanonicalText: boolean;
};

/** What one pass over the verdicts produces: the described rows, and the texts they collected. */
type DescribedReport = {
  described: DescribedRow[];
  texts: CollectedTexts;
  notices: CollectedTexts;
  canonical: CollectedTexts;
  noticesNotReproduced: string[];
};

/**
 * The npm rows grouped by the paragraph that accounts for each.
 *
 * Overlapping filters rather than a partition, which is why `assertNpmRowsAccountedFor` checks the
 * groups against the rows instead of trusting them to cover every one.
 */
type NpmAccount = {
  devLinked: DescribedRow[];
  displaced: DescribedRow[];
  noTextCanonical: DescribedRow[];
  noTextAtAll: DescribedRow[];
  unreadCanonical: DescribedRow[];
  unreadNoCanonical: DescribedRow[];
  platformOnly: DescribedRow[];
  platformOnlyNoCanonical: DescribedRow[];
};

/** Refuses a row whose ecosystem this module has no table for, before anything is rendered. */
function assertKnownEcosystems(verdicts: ReportRow[]): void {
  const unknownEcosystem = verdicts.find((row) => !ECOSYSTEM_LABEL[row.ecosystem]);
  if (unknownEcosystem)
    // Silently dropping a row whose ecosystem this function does not know how to table would remove
    // a shipped component from a legal artifact with nothing to show it has gone.
    throw new Error(
      `cannot render ${unknownEcosystem.name}@${unknownEcosystem.version}: unknown ecosystem ` +
        `"${unknownEcosystem.ecosystem}"`,
    );
}

/**
 * The packages one paragraph names, as a comma-separated list of backticked identifiers.
 *
 * `name@version`, not a bare name. Two versions of one package can both ship - `@xmldom/xmldom`
 * 0.8.13 and 0.9.10 do today - and a paragraph naming only the package leaves the reader unable to
 * tell which of the two rows it is making its claim about.
 */
function packageNames(subset: { name: string; version: string }[]): string {
  return subset.map((row) => `\`${row.name}@${row.version}\``).join(', ');
}

/**
 * Reproduces the canonical text of a row's identifier on its behalf, if the corpus holds one;
 * reports whether it could. Both ecosystems route through here so a reader never has to work out
 * which kind of package a text was reproduced for - the credit line beside it says so.
 *
 * Derived from the identifier the row actually resolved to, never from a hand-maintained list of
 * ids: a list reproduces the licenses someone thought of, and leaves every other
 * declared-but-untexted package's attribution obligation discharged nowhere.
 */
function useCanonicalText(canonical: CollectedTexts, row: ReportRow): boolean {
  const label = ECOSYSTEM_LABEL[row.ecosystem];
  // Every identifier the row resolved to, not the field as one string - see `spdxIdsOf`. A
  // conjunction means every operand's terms apply at once, so reproducing one operand's text and
  // calling the obligation discharged is exactly the half-answer the expression rules out.
  const ids = spdxIdsOf(row.spdxId);
  const corpusTexts = ids.map((id) => ({ id, text: canonicalText(id) }));
  // All or nothing: a row that can only be half reproduced is reported as having no canonical
  // text, which puts it in the document's "no license text is reproduced for these" list rather
  // than leaving a reader to notice the missing half.
  if (!corpusTexts.length || corpusTexts.some(({ text }) => !text)) return false;
  const credit = canonicalTextCredit({
    name: row.name,
    version: row.version,
    ecosystem: label,
    copyright: row.copyright,
    inspected: row.inspected !== false,
  });
  corpusTexts.forEach(({ id, text }) => {
    // `useCanonicalText` returns false above unless EVERY operand has a text, so `text` is a
    // string by the time this runs - the all-or-nothing rule is what makes that true.
    if (!text) return;
    if (!canonical.has(id)) canonical.set(id, { text, packages: [] });
    canonical.get(id)?.packages.push(credit);
  });
  return true;
}

/**
 * Collects every text the document reproduces, and derives what each row is described as.
 *
 * One pass over both ecosystems in document order, so a text two packages ship identically is
 * collected once and credited to both.
 */
function describeReport(rows: ReportRow[]): DescribedReport {
  const texts: CollectedTexts = new Map(); // sha1 of license text -> { text, packages: [] }
  const notices: CollectedTexts = new Map(); // sha1 of NOTICE text -> { text, packages: [] }
  // `name@version (ecosystem)` shipping a NOTICE nothing obliges
  const noticesNotReproduced: string[] = [];
  /** SPDX id -> the canonical text and the credit line of every package it covers. */
  const canonical: CollectedTexts = new Map();

  const described = rows.map((row) => {
    const label = ECOSYSTEM_LABEL[row.ecosystem];
    const subject = `${row.name}@${row.version}`;
    const hasText = !!normalizeText(row.text);
    if (hasText) collectText(texts, row.text, label === 'npm' ? subject : `${subject} (${label})`);
    const noticeText = joinTexts(row.notices ?? []);
    if (noticeText) {
      // Only an established "these terms do not require it" leaves a NOTICE unreproduced; both
      // 'required' and 'unknown' reproduce it - see `noticeDisposition`.
      if (noticeDisposition(row.spdxId) === 'not-required')
        noticesNotReproduced.push(`${subject} (${label})`);
      else collectText(notices, noticeText, `${subject} (${label})`);
    }
    // A conjunction means every operand's terms apply at once, and a package under one routinely
    // ships the text of only SOME of them - which is exactly why it needed a reviewed exception in
    // the first place (no matcher could identify the file). `pako@1.0.11` is the live case: it is
    // recorded as `(MIT AND Zlib)` and the LICENSE it ships carries only the MIT half, so nothing
    // it bundles discharges the Zlib half. A compound row therefore gets its operands' canonical
    // texts IN ADDITION to its own file, rather than the canonical path being skipped because
    // something was reproduced. The MIT half then appears twice, once as the package's own text and
    // once as SPDX's; that redundancy is the cost of discharging the half the package omits.
    const compound = spdxIdsOf(row.spdxId).length > 1;
    return {
      ...row,
      license: displayLicense(row),
      hasText,
      // Carried onto the row because the accounting below has to tell the two "has its own text"
      // shapes apart: a simple row is fully described by its own file, a compound one is not
      // (every operand of a conjunction applies at once, and the file it ships typically carries
      // only some of them), so a compound row whose canonical halves are refused is a row with
      // something genuinely missing.
      compound,
      // Otherwise only reached when the package itself shipped nothing, so a canonical text never
      // displaces a package's own copy of its license.
      hasCanonicalText: (!hasText || compound) && useCanonicalText(canonical, row),
    };
  });

  return { described, texts, notices, canonical, noticesNotReproduced };
}

/**
 * Groups the npm rows into what the paragraphs beneath the license-distribution table claim about
 * each.
 */
function accountNpmRows(npmDescribed: DescribedRow[]): NpmAccount {
  const noText = npmDescribed.filter((row) => !row.hasText);
  // "Ships no license file" is a claim about a directory that was READ. A `fromLock` package's
  // directory is deliberately never read (`main.ts` excludes it from `identify` entirely), so
  // asserting it of one states as fact something this run did not establish. The live cases are the
  // two `@eten-tech-foundation/*` packages and `@xmldom/xmldom`, which instead get the paragraphs
  // that correctly say nothing was read from them. `canonicalTextCredit` models the same
  // distinction for the credit lines.
  const readNoText = noText.filter((row) => row.inspected !== false);
  // A platform-only package is unread for a DIFFERENT reason than a dev link is - npm never
  // installed it here at all - and it gets its own paragraph rather than being folded into the
  // dev-link one, which says "the packages named above" and would then name a package it never
  // named.
  const unreadNoText = noText.filter((row) => row.inspected === false && !row.platformOnly);
  // Split on whether a canonical text was actually reproduced, because the paragraph these feed
  // ASSERTS that it was. `useCanonicalText` is all-or-nothing and returns false for an identifier
  // the corpus holds no text for, so an unsplit list states of some row that its terms appear below
  // when nothing of it appears anywhere - the one claim a legal artifact must not make loosely.
  const platformOnlyAll = npmDescribed.filter((row) => row.platformOnly);
  const platformOnly = platformOnlyAll.filter((row) => row.hasCanonicalText);
  const platformOnlyNoCanonical = platformOnlyAll.filter((row) => !row.hasCanonicalText);

  const noTextCanonical = readNoText.filter((row) => row.hasCanonicalText);
  const noTextAtAll = readNoText.filter((row) => !row.hasCanonicalText);
  const unreadCanonical = unreadNoText.filter((row) => row.hasCanonicalText);
  const unreadNoCanonical = unreadNoText.filter((row) => !row.hasCanonicalText);
  // These rows' version and identifier do NOT come from the package on disk, and a legal artifact
  // has to say where each of its claims came from - see `DEV_LINK` and
  // `correctLinkDistortedResolutions` in `shipping-set.ts`. They are reported separately because
  // they are different facts: one package was replaced by a link, the other was DISPLACED by one.
  const devLinked = npmDescribed.filter((row) => row.devLinked);
  // A platform-only row is `fromLock` too, but nothing DISPLACED it - npm simply never installs
  // it here. It has its own paragraph below.
  const displaced = npmDescribed.filter(
    (row) => row.fromLock && !row.devLinked && !row.platformOnly,
  );

  return {
    devLinked,
    displaced,
    noTextCanonical,
    noTextAtAll,
    unreadCanonical,
    unreadNoCanonical,
    platformOnly,
    platformOnlyNoCanonical,
  };
}

/** The title, the statement of what the document covers, and the generation provenance. */
function pushPreamble(out: string[], corpusVersion: string, licenseeVersion: string): void {
  out.push('# Third-party notices', '');
  out.push(
    'Platform.Bible incorporates the third-party components listed below. Where a component ships a',
    'license file of its own, that text is reproduced in full, as those licenses require; where it ships',
    'none but declares an SPDX identifier, the canonical text of that license is reproduced instead,',
    'marked as coming from SPDX rather than from the component. Apache-style `NOTICE` files are',
    'accounted for separately in the last section. This file covers the redistributable',
    'closure of **this repository**: the npm packages webpack actually compiled into `dist/` (plus the',
    'stylesheet-only packages Tailwind inlines before webpack runs, and anything `release/app` ships',
    'unbundled beside the bundle), the NuGet closure of the bundled .NET data provider, and Electron.',
    'Build and test tooling is excluded because it is not distributed.',
    '',
    'Two things this repository distributes are neither npm nor NuGet packages, so no scan of either',
    'graph can reach them and neither appears as a row below: the UBS lexical database, and the',
    'system libraries the Linux snap stages from Ubuntu. Both are described in their own sections,',
    'because a component that ships without a row is indistinguishable from one nobody considered.',
    '',
    '**This is a reference, not the notices for any shipped product.** A distributed application',
    'built on paranext-core carries its own dependencies on top of these, and must generate its own',
    'notices covering both.',
    '',
    '**Generated on Linux, and it covers every platform.** The NuGet half is the union of the restore',
    'closure for every runtime identifier this application is published for (`linux-x64`, `win-x64`,',
    '`osx-x64`, `osx-arm64`), so a package that ships on only one platform is still listed. The npm',
    'half is derived from a Linux tree, where npm installs an optional dependency only if its',
    '`os`/`cpu` constraints match — so the packages another platform installs and this one does not',
    'are described from `package-lock.json` instead, and named as such below. Regenerate on Linux, or',
    'the file will not match what CI verifies.',
    '',
    '> Generated by `.erb/scripts/third-party-notices/main.ts`. Do not edit by hand; run',
    '> `npm run build:third-party-notices` after changing production dependencies. CI regenerates it',
    '> on Linux and fails if the committed copy is out of date. License texts were identified with',
    `> licensee ${licenseeVersion} against the SPDX license list ${corpusVersion}; both versions are`,
    '> recorded in `THIRD-PARTY-NOTICES.lock.json` so a verdict that moved because the matcher was',
    '> upgraded stays distinguishable from one that moved because a license changed.',
    '',
    'For the license covering Platform.Bible itself, see [LICENSING.md](./LICENSING.md).',
    '',
  );
}

/**
 * The section naming the determinations this repository deliberately left open.
 *
 * A determination deferred BY DECISION rather than by oversight. The generator has always computed
 * these and printed them to the console with the words "they are listed in the document", and the
 * document listed none of them: `nuget:System.Net.Http`'s unanswered AGPL-compatibility question
 * appeared in the table as an ordinary row with no marker at all. A console line nobody reads after
 * the build is not a disclosure, and a legal artifact that records an open question nowhere is one
 * that claims to have settled it.
 */
function pushOpenQuestions(out: string[], openPolicyQuestions: string[]): void {
  if (openPolicyQuestions.length) {
    out.push('## Open questions', '');
    out.push(
      'The determinations below were deferred deliberately, not overlooked. Each names a component',
      'whose terms this repository has recorded but whose effect it has NOT settled. They do not',
      'block the build, and they are not resolved by anything else in this file.',
      '',
    );
    openPolicyQuestions.forEach((question) => out.push(`- ${question}`, ''));
  }
}

/** Electron and what it bundles, which carry their own notices inside the packaged app. */
function pushElectronSection(out: string[]): void {
  out.push('## Electron, Chromium, and Node.js', '');
  out.push(
    'The packaged application embeds Electron (MIT), which in turn bundles Chromium, V8, and',
    'Node.js under their own licenses. Electron ships those notices inside the packaged',
    'application as `LICENSE.electron.txt` and `LICENSES.chromium.html`; both are installed',
    'alongside the executable and are the authoritative text for those components.',
    '',
  );
}

/** The UBS lexical database, which is redistributed data and belongs to neither package graph. */
function pushLexicalDatabaseSection(out: string[]): void {
  out.push('## Bundled data \u2014 UBS lexical database', '');
  out.push(
    'The `platform-lexical-tools` extension ships a prebuilt SQLite lexical database. It is fetched',
    'from the `dependencies` repository during `npm install` and copied into the packaged application',
    "with the rest of that extension's assets (`extensions/dist/` \u2192 `extraResources`), so it reaches",
    'every installer on every platform. It is data rather than code and belongs to neither dependency',
    'graph above, but it is redistributed and it carries terms of its own. `LICENSE.md` and',
    '`SOURCE.md` are downloaded alongside it and ship in the same directory: `LICENSE.md` is the',
    'CC BY-SA 4.0 text, and `SOURCE.md` is where the attributions below come from. On one point they',
    "differ \u2014 `SOURCE.md` as published upstream describes UBS's permission for the non-open portions",
    'more broadly than the paragraph below does \u2014 and the narrower reading below is the one this',
    'project relies on.',
    '',
    'UBS Dictionary of Biblical Hebrew \u00a9 United Bible Societies, 2023. Adapted from Semantic Dictionary',
    'of Biblical Hebrew \u00a9 2000-2023 United Bible Societies. Licensed under',
    '[CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).',
    '',
    'UBS Dictionary of the Greek New Testament \u00a9 United Bible Societies, 2023. Adapted from Semantic',
    'Dictionary of Biblical Greek \u00a9 United Bible Societies 2018-2023, which is adapted from',
    'Greek-English Lexicon of the New Testament: Based on Semantic Domains, Eds. J P Louw, Eugene',
    'Albert Nida \u00a9 United Bible Societies 1988, 1989. Licensed under',
    '[CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).',
    '',
    'Portions of the database are \u00a9 United Bible Societies and are **not** available under an open',
    'source license. UBS permits their distribution in **Paratext**. That permission is specific to',
    'Paratext: it does not extend to Platform.Bible, nor to anyone else redistributing the database,',
    'including a third party building from this repository \u2014 see LICENSING.md. The open-licensed',
    'content can be obtained separately from <https://github.com/ubsicap/ubs-open-license>.',
    '',
  );
}

/** The notices stated by third-party files copied verbatim out of an extension's asset trees. */
function pushStaticAssetSection(out: string[], staticAssetNotices: NamedText[]): void {
  if (staticAssetNotices.length) {
    out.push('## Files copied into extensions', '');
    out.push(
      "Each extension's `assets/` and `public/` directories are copied into `extensions/dist`",
      'verbatim and packed into every installer, so a third-party file placed there is',
      'redistributed without being compiled into anything. Nothing in the module graph can see one,',
      'which is why the notices policy carries an inventory of them and the build refuses a file it',
      'does not record. The notices those files state are reproduced here.',
      '',
    );
    staticAssetNotices.forEach(({ name, text }) => {
      const fence = fenceFor(text);
      out.push(`### \`${name}\``, '', fence, normalizeText(text) || '', fence, '');
    });
  }
}

/** The Ubuntu libraries snapcraft stages inside the Linux `.snap`, and their copyright files. */
function pushSnapSection(
  out: string[],
  snapStagePackages: string[],
  snapStagePackageLicenses: Record<string, SnapStagePackage>,
  snapCopyrightTexts: NamedText[],
): void {
  out.push('## Linux snap \u2014 staged system libraries', '');
  out.push(
    'The Linux artifact is a snap, and snapcraft stages Ubuntu `core22` shared libraries inside it',
    '(`electron-builder.json5` \u2192 `snap.stagePackages`), so those libraries are redistributed within',
    'the `.snap` itself rather than merely linked against a system copy. The declared set is:',
    '',
  );
  out.push(
    ...(snapStagePackages.length
      ? snapStagePackages.map((pkg) => `- \`${pkg}\``)
      : ['- (none declared)']),
    '',
  );
  out.push(
    'The set actually staged can be a subset of that list: libraries also provided by the GNOME',
    'content snap the application plugs into are satisfied at runtime and are not copied in.',
    'Those that are copied in are unmodified Ubuntu archive builds, linked dynamically.',
    '',
    // Generated from the policy's own table rather than written as prose, so the clauses cannot
    // name a different set of libraries than `snap.stagePackages` stages. Hand-written prose here
    // would leave the next library added to the installer described by nothing;
    // `assertSnapStagePackagesClassified` is what makes an unclassified staged package a build
    // failure rather than a silent omission.
    ...snapLicensing(snapStagePackages, snapStagePackageLicenses),
    '',
    'Their notices travel in this document. electron-builder unpacks the shared objects from each',
    '`.deb` without the `usr/share/doc/<package>/copyright` file Ubuntu ships them with \u2014 its',
    "snapcraft template excludes `usr/share` from the app part's stage list \u2014 so each library's",
    'own copyright file is checked into this repository, hash-pinned, and reproduced verbatim below.',
    'This file is packed into the snap (`electron-builder.json5` `extraResources`), so the notices',
    'are inside the artifact that redistributes the libraries.',
    '',
  );

  // Verbatim, and each under its own heading. A Debian `copyright` file names per-file licenses and
  // copyright holders that no SPDX identifier reproduces - `libgtk-3-0`'s spans LGPL-2+, LGPL-2.1+,
  // Expat, SWL, ZPL-2.1 and X11R5 - so summarising one would discharge some obligations and drop
  // others. Read and hash-checked in `main.ts`, which refuses the run before anything is written.
  snapCopyrightTexts.forEach(({ name, text }) => {
    const fence = fenceFor(text);
    out.push(`### ${name}`, '', fence, normalizeText(text) || '', fence, '');
  });
}

/** The NuGet closure: its prose, its table, and the account of the rows with no text. */
function pushDotnetSection(out: string[], dotnetDescribed: DescribedRow[]): void {
  // Split because the sentence describes a PROVENANCE, and the two halves have different ones.
  // Counting them together stated that every row came out of a restore with its nuspec read by
  // `nuget-license`, while `Microsoft.ICU.ICU4C.Runtime` - referenced under an MSBuild condition on
  // the host OS - is resolved by no restore on any machine that runs this, and its license comes
  // from a recorded determination. The same paragraph said so four sentences later.
  const fromPolicy = dotnetDescribed.filter((row) => row.inspected === false);
  const fromClosure = dotnetDescribed.filter((row) => row.inspected !== false);
  out.push('## .NET data provider (NuGet)', '');
  out.push(
    'The data provider is published self-contained and its entire publish directory is copied into',
    'the packaged application (`electron-builder.json5` `extraResources` → `./dotnet/`), so every',
    'assembly in the restore closure ships — not only the direct `PackageReference` entries.',
    `The table below is the union of the restore closure for each published runtime identifier`,
    `(${fromClosure.length} packages), with licenses read from each package’s nuspec by \`nuget-license\`${
      fromPolicy.length
        ? `, plus ${fromPolicy.length} package${fromPolicy.length === 1 ? '' : 's'} that no restore ` +
          'on this machine resolves and whose terms are a recorded determination in the notices ' +
          'policy (see below)'
        : ''
    }. A`,
    '"Ships …" note names the assemblies a package contributes under a different name — including',
    'assemblies of separate projects that it redistributes, whose own upstream notices this',
    'package-level view does not reproduce.',
    '',
    'Excluded from the table: packages that contribute no runtime, native, or resource asset (MSBuild',
    'and analyzer tooling, metapackages), and packages whose assemblies the .NET 8 shared framework',
    'supersedes. Those belong to the .NET runtime itself, which is bundled by the self-contained',
    'publish and is licensed by Microsoft under the MIT License',
    '(<https://github.com/dotnet/runtime/blob/main/LICENSE.TXT>).',
    '',
    'The per-RID `runtime.*` asset shims are excluded too, but for a different reason, and it is',
    'worth stating separately because the first reason does not always apply to them. A shim carries',
    'one platform’s native file on behalf of a managed package, and it is that managed package —',
    'listed below in its own right — whose terms cover the file. Where the managed package ships out',
    'of band rather than in the shared framework, its native file is genuinely redistributed by this',
    'application, and the row to read for it is the managed package’s rather than the runtime’s.',
    '',
    'A NuGet package’s license is read from its nuspec metadata, but the text reproduced for it is',
    'the license file it bundles, read from the restored package folder — a bundled file carries its',
    'own copyright notice, which is the notice MIT, BSD and ISC oblige to travel with copies, and',
    'SPDX’s `<copyright holders>` placeholder is not a substitute for it. Only where a package',
    'bundles no license file is the canonical text of its declared identifier reproduced under',
    '"Canonical license texts for declared identifiers" instead, paired with the nuspec’s copyright.',
    '',
    'The build also copies the platform ICU C libraries next to the executable (`libicu*` from the',
    'build machine on Linux and macOS; the `Microsoft.ICU.ICU4C.Runtime` package on Windows). ICU is',
    'distributed under the Unicode license, which requires its copyright and permission notice to',
    'travel with copies. That package is referenced under an MSBuild condition on the *host* OS, so',
    'no restore performed on Linux resolves it whatever runtime identifier is requested; it is listed',
    'here from a recorded determination in `notices-policy.json` rather than from the closure.',
    '',
  );
  out.push('| Package | Version | License | Notes |', '| --- | --- | --- | --- |');
  dotnetDescribed.forEach((row) =>
    out.push(
      `| \`${row.name}\` | ${cell(row.version)} | ${cell(row.license)} | ${cell(row.note)} |`,
    ),
  );
  out.push('');
  // `!hasText` first, not `!hasCanonicalText` alone: a package that reproduces its OWN bundled
  // license has no canonical text precisely because it does not need one, and counting it as
  // "no license text reproduced anywhere" would understate the artifact by ~60 packages.
  const dotnetNoText = dotnetDescribed.filter((row) => !row.hasText);
  // Split on `inspected` for the same reason the npm half is: "bundles no license file" is a claim
  // about a package folder that was read, and a package no restore on this machine resolves (the
  // `alwaysList` overrides) has no folder here to read.
  const dotnetReadNoText = dotnetNoText.filter((row) => row.inspected !== false);
  const dotnetUnreadNoText = dotnetNoText.filter((row) => row.inspected === false);
  const dotnetNoTextAtAll = dotnetReadNoText.filter((row) => !row.hasCanonicalText);
  if (dotnetReadNoText.length) {
    out.push(
      `${dotnetReadNoText.length} of these packages bundle no license file, so nothing of theirs appears in the "License`,
      `texts" section. For the ${dotnetReadNoText.length - dotnetNoTextAtAll.length} of them whose declared license is an SPDX identifier, the`,
      'canonical text of that identifier is reproduced under "Canonical license texts for declared',
      'identifiers" below — SPDX’s text, not the package’s.',
      '',
    );
  }
  if (dotnetNoTextAtAll.length) {
    out.push(
      `No license text is reproduced anywhere for the remaining ${dotnetNoTextAtAll.length}, whose license is recorded as`,
      'free text rather than as an SPDX identifier the corpus holds a canonical text for:',
      `${packageNames(dotnetNoTextAtAll)}.`,
      '',
    );
  }
  if (dotnetUnreadNoText.length) {
    out.push(
      `A further ${dotnetUnreadNoText.length} (${packageNames(dotnetUnreadNoText)}) ${dotnetUnreadNoText.length === 1 ? 'is' : 'are'} listed from a recorded`,
      'determination rather than from a restore performed here, so no package folder of theirs was',
      'read and whether they bundle a license file is not established in this document. Where the',
      'recorded determination is an SPDX identifier, that identifier’s canonical text is reproduced',
      'below, paired with no copyright notice — there was no package to read one from.',
      '',
    );
  }
}

/**
 * The npm closure: its license distribution, and the paragraphs accounting for every row whose
 * license text is not reproduced in full.
 */
function pushNpmSection(
  out: string[],
  npmDescribed: DescribedRow[],
  {
    devLinked,
    displaced,
    noTextCanonical,
    noTextAtAll,
    unreadCanonical,
    unreadNoCanonical,
    platformOnly,
    platformOnlyNoCanonical,
  }: NpmAccount,
): void {
  // A Map, not an object: the keys are license strings taken from third-party manifests, and
  // `counts['__proto__'] = n` on a plain object writes nowhere a later read can see.
  const counts = new Map<string, number>();
  npmDescribed.forEach((row) => counts.set(row.license, (counts.get(row.license) || 0) + 1));

  out.push('## npm production dependencies', '');
  const npmCount = npmDescribed.length;
  out.push(`${npmCount} package${npmCount === 1 ? '' : 's'}. License distribution:`, '');
  out.push('| License | Packages |', '| --- | --- |');
  [...counts.entries()]
    .sort(
      ([firstLicense, firstCount], [secondLicense, secondCount]) =>
        secondCount - firstCount || compareStrings(firstLicense, secondLicense),
    )
    .forEach(([license, count]) => out.push(`| ${cell(license)} | ${count} |`));
  out.push('');

  if (devLinked.length) {
    out.push(
      'Replaced on this machine by a `yalc` dev link (see `dev-packages.json`), which points at a',
      'branch of another repository rather than at a published release. The version and license',
      'below are the ones `package-lock.json` pins, and nothing was read from the link, so this file',
      'describes what this repository depends on rather than what a developer happens to have built',
      `locally: ${packageNames(devLinked)}.`,
      '',
    );
  }
  if (displaced.length) {
    out.push(
      'Resolved differently on this machine than `package-lock.json` records, because a `yalc` dev',
      'link replaces a package with a symlink and takes the copies nested under it off disk with it.',
      'The version and license below are the ones the lockfile resolves, and nothing was read from',
      `the copy this machine happens to hold: ${packageNames(displaced)}.`,
      '',
    );
  }
  if (noTextCanonical.length) {
    out.push(
      'The following ship no license file of their own, so the identifier in the table below comes',
      devLinked.length || displaced.length
        ? 'from their `package.json` (or, where a dev link is involved, from `package-lock.json`)'
        : 'from their `package.json`',
      'and nothing of',
      'theirs appears under "License texts". The canonical text of the license each one declares is',
      `reproduced under "Canonical license texts for declared identifiers" instead: ${packageNames(noTextCanonical)}.`,
      '',
    );
  }
  if (noTextAtAll.length) {
    out.push(
      'The following ship no license file of their own and declare no identifier the SPDX corpus',
      `holds a canonical text for, so no license text for them appears below at all: ${packageNames(noTextAtAll)}.`,
      '',
    );
  }
  if (unreadCanonical.length) {
    out.push(
      'For the packages named above whose folder was not read, whether they ship a license file of',
      'their own is not established here. The canonical text of the identifier `package-lock.json`',
      'records for each is reproduced under "Canonical license texts for declared identifiers"',
      `instead: ${packageNames(unreadCanonical)}.`,
      '',
    );
  }
  if (unreadNoCanonical.length) {
    out.push(
      'And for these, whose folder was likewise not read, `package-lock.json` records no identifier',
      `the SPDX corpus holds a canonical text for, so no license text appears for them at all: ${packageNames(unreadNoCanonical)}.`,
      '',
    );
  }
  if (platformOnly.length) {
    out.push(
      'Installed by npm only where a package’s `os`/`cpu` constraints match, so the machine this',
      'file was generated on does not have them — but the installer for the platform that does is',
      'the one that redistributes them, and this file covers every platform’s. Their version and',
      'license come from `package-lock.json` and nothing of theirs was read, so the canonical text of',
      'the license each declares is reproduced under "Canonical license texts for declared',
      `identifiers": ${packageNames(platformOnly)}.`,
      '',
    );
  }
  if (platformOnlyNoCanonical.length) {
    out.push(
      'And these, likewise installed only on another platform, declare no identifier the SPDX',
      'corpus holds a canonical text for, so no license text appears for them at all:',
      `${packageNames(platformOnlyNoCanonical)}.`,
      '',
    );
  }
}

/**
 * Every npm row is accounted for, and the paragraphs are checked against the rows rather than
 * trusted to have stayed in step with them. The buckets above are overlapping filters built from
 * three independent predicates (`hasText`, `hasCanonicalText`, `inspected`) plus two provenance
 * flags, and nothing makes them a partition: a row can satisfy none of them and be named nowhere.
 * Both directions are checked, because they fail differently - one drops a package from the
 * document's account of itself, the other has the document assert an obligation was discharged when
 * it was not.
 *
 * The live case this leaves deliberately unbucketed is a COMPOUND row that ships its own file while
 * the corpus lacks one of its other operands (`pako@1.0.11`, `(MIT AND Zlib)`, ships only the MIT
 * half). No such row can exist today - every valid SPDX identifier, current and deprecated, has a
 * text in the pinned `spdx-license-list`, and `corpus-texts.test.ts` asserts it for the policy's
 * own ids - so a paragraph for it would be prose that can never render. If a corpus bump ever drops
 * a text, this throws and a human decides what the document should say, which is the right failure
 * for a legal artifact and better than quietly growing a sentence.
 *
 * Keyed by `name@version`, which is what identifies a ROW. Keying on the bare name let two versions
 * of one package - `@xmldom/xmldom` 0.8.13 and 0.9.10 both ship - cover for each other: one is
 * named in a paragraph, and the other passes this check having been named nowhere.
 */
function assertNpmRowsAccountedFor(
  npmDescribed: DescribedRow[],
  {
    noTextCanonical,
    noTextAtAll,
    unreadCanonical,
    unreadNoCanonical,
    platformOnly,
    platformOnlyNoCanonical,
  }: NpmAccount,
  canonical: CollectedTexts,
): void {
  const rowKey = (row: { name: string; version: string }) => `${row.name}@${row.version}`;
  const named = new Set(
    [
      ...noTextCanonical,
      ...noTextAtAll,
      ...unreadCanonical,
      ...unreadNoCanonical,
      ...platformOnly,
      ...platformOnlyNoCanonical,
    ].map(rowKey),
  );
  // "Fully reproduced" is its own file AND, for a conjunction, the canonical texts of the operands
  // it does not carry. Anything else owes the reader a sentence saying so.
  const unaccounted = npmDescribed.filter(
    (row) => !(row.hasText && (!row.compound || row.hasCanonicalText)) && !named.has(rowKey(row)),
  );
  if (unaccounted.length)
    throw new Error(
      `${unaccounted.length} npm package(s) have no license text reproduced in full and are named ` +
        'in none of the paragraphs that account for that: ' +
        `${unaccounted.map((row) => `${row.name}@${row.version}`).join(', ')}. ` +
        'Every such package must appear in one of them - the document otherwise omits, silently, ' +
        'the fact that nothing of theirs is reproduced.',
    );
  // Tested against the section the document actually renders, not against the flag that put the row
  // in these buckets: all three are DEFINED by filtering on `hasCanonicalText`, so re-reading it
  // here can only ever be true and the check could never fire. What can diverge is the flag and the
  // texts - `useCanonicalText` sets one and populates the other in the same pass - so the question
  // worth asking is whether every identifier the row claims is reproduced is present in
  // `canonical`.
  const overclaimed = [...platformOnly, ...noTextCanonical, ...unreadCanonical].filter((row) => {
    const ids = spdxIdsOf(row.spdxId);
    return !ids.length || ids.some((id) => !canonical.has(id));
  });
  if (overclaimed.length)
    throw new Error(
      `${overclaimed.length} npm package(s) are named in a paragraph stating their canonical ` +
        'license text is reproduced, but no canonical text was reproduced for them: ' +
        `${overclaimed.map((row) => `${row.name}@${row.version}`).join(', ')}.`,
    );
}

/** One row per shipped npm package, after the paragraphs that account for them. */
function pushNpmTable(out: string[], npmDescribed: DescribedRow[]): void {
  out.push('| Package | Version | License |', '| --- | --- | --- |');
  npmDescribed.forEach((row) =>
    out.push(`| \`${row.name}\` | ${cell(row.version)} | ${cell(row.license)} |`),
  );
  out.push('');
}

/** The license texts read from the packages that ship them, one numbered section each. */
function pushLicenseTextsSection(
  out: string[],
  texts: CollectedTexts,
  canonical: CollectedTexts,
): void {
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
  pushFencedSections(out, texts);
}

/** SPDX's own texts, reproduced for the packages that declare an identifier and ship no copy. */
function pushCanonicalTextsSection(out: string[], canonical: CollectedTexts): void {
  if (canonical.size) {
    out.push('## Canonical license texts for declared identifiers', '');
    out.push(
      'The packages below declare a license but ship no copy of it, so there is nothing of theirs to',
      'reproduce above — and an identifier alone does not discharge "this permission notice shall be',
      'included in all copies". A package whose license is a conjunction of several identifiers is',
      'listed here as well, even where it does ship a text of its own: every operand of a conjunction',
      'applies at once, and the file such a package ships typically carries only one of them.',
      '**The texts in this section come from the SPDX license list, not from',
      'the packages.** Each is the license exactly as SPDX publishes it, with SPDX’s own placeholders',
      '(`<year>`, `<copyright holders>`, `[yyyy]`) left unfilled. They are read from the pinned',
      '`spdx-license-list` dependency and verified against the checksum index committed at',
      '`.erb/scripts/third-party-notices/spdx-corpus/index.json`; nothing is fetched when this file',
      'is generated.',
      '',
      'Each package is listed with its own copyright notice, which is the notice that belongs with',
      'the text beside it: from the package’s metadata where it records one (a nuspec has a',
      'copyright field; an npm manifest has none), otherwise read from the first copyright line of',
      'the license file the package itself ships. No copyright holder is inferred, and an unfilled',
      'placeholder is not read as one: where a package records no notice anywhere, that is stated',
      'rather than left blank.',
      '',
    );
    [...canonical.entries()]
      .sort(([first], [second]) => compareStrings(first, second))
      .forEach(([id, { text, packages: covered }]) => {
        out.push(
          `### ${id} — canonical text, ${covered.length} package${covered.length === 1 ? '' : 's'}`,
          '',
        );
        covered.forEach((credit) => out.push(`- ${credit}`));
        const fence = fenceFor(text);
        out.push('', `${fence}text`, text, fence, '');
      });
  }
}

/** The `NOTICE` files, split into those reproduced here and those only recorded as shipping. */
function pushNoticeSection(
  out: string[],
  notices: CollectedTexts,
  noticesNotReproduced: string[],
): void {
  if (notices.size || noticesNotReproduced.length) {
    out.push('## Attribution notices (NOTICE files)', '');
    out.push(
      'A `NOTICE` file is not a license and grants nothing, but Apache-2.0 section 4(d) requires the',
      'attributions in one to be carried into every redistribution — an obligation that reproducing',
      'the license text alone does not discharge.',
      '',
    );
    // Two different sentences, because one claim cannot cover both cases: emitting "every one is
    // reproduced here" whenever EITHER collection is non-empty means a section whose sole content
    // is a list of NOTICEs deliberately NOT reproduced still opens by saying they were. A reader
    // cannot tell "no shipped package requires this" from "the collection silently came back
    // empty", and a regression that empties it renders identically to a closure that genuinely has
    // none - so CI's byte comparison would see no change at all.
    out.push(
      ...(notices.size
        ? [
            'Every package below whose terms require its NOTICE to be carried, and every one whose',
            'terms this file records as free text rather than as an SPDX identifier, has it',
            'reproduced here.',
            '',
          ]
        : [
            'No package in this closure ships a NOTICE that its terms require to be carried, so',
            'nothing is reproduced under this heading. The NOTICEs that do ship, under terms that do',
            'not require it, are listed at the end of this section.',
            '',
          ]),
    );
  }
  if (notices.size) {
    pushFencedSections(out, notices);
  }
  if (noticesNotReproduced.length) {
    out.push(
      'These packages also ship a NOTICE, but are licensed under terms that do not require it to be',
      'redistributed (MIT, BSD and ISC oblige only that the copyright and permission notice travel',
      'with copies, which the license texts above do). Theirs are aggregate notices describing their',
      'own dependency closures rather than attributions for the package itself, and are recorded here',
      'rather than reproduced — read them in the package if you need them:',
      `${noticesNotReproduced.map((subject) => `\`${subject}\``).join(', ')}.`,
      '',
    );
  }
}

/** @returns The complete Markdown document, ending in a newline. */
export function render({
  verdicts,
  corpusVersion,
  licenseeVersion,
  openPolicyQuestions = [],
  snapStagePackages = [],
  snapStagePackageLicenses = {},
  snapCopyrightTexts = [],
  staticAssetNotices = [],
}: Report): string {
  assertKnownEcosystems(verdicts);

  const rows = verdicts.filter((row) => row.ecosystem === 'npm').sort(compareByNameThenVersion);
  const dotnetRows = verdicts
    .filter((row) => row.ecosystem === 'nuget')
    .sort(compareByNameThenVersion);

  const { described, texts, notices, canonical, noticesNotReproduced } = describeReport([
    ...rows,
    ...dotnetRows,
  ]);
  const npmDescribed = described.filter((row) => row.ecosystem === 'npm');
  const dotnetDescribed = described.filter((row) => row.ecosystem === 'nuget');
  const npmAccount = accountNpmRows(npmDescribed);

  const out: string[] = [];
  pushPreamble(out, corpusVersion, licenseeVersion);
  pushOpenQuestions(out, openPolicyQuestions);
  pushElectronSection(out);
  pushLexicalDatabaseSection(out);
  pushStaticAssetSection(out, staticAssetNotices);
  pushSnapSection(out, snapStagePackages, snapStagePackageLicenses, snapCopyrightTexts);
  pushDotnetSection(out, dotnetDescribed);
  pushNpmSection(out, npmDescribed, npmAccount);
  assertNpmRowsAccountedFor(npmDescribed, npmAccount, canonical);
  pushNpmTable(out, npmDescribed);
  pushLicenseTextsSection(out, texts, canonical);
  pushCanonicalTextsSection(out, canonical);
  pushNoticeSection(out, notices, noticesNotReproduced);

  return `${out.join('\n')}\n`;
}
