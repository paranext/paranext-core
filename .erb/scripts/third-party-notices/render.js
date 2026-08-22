/**
 * Renders the notices document from a resolved report: preamble, per-ecosystem tables, licence-text
 * sections, canonical-text section, `NOTICE` section.
 *
 * Pure: every input arrives as an argument, nothing is read from disk, and the same report always
 * produces the same bytes. That is what makes the golden test in `render.test.ts` meaningful and
 * what lets CI compare the committed artifact byte for byte.
 */

const crypto = require('crypto');
const { compareByNameThenVersion, compareStrings } = require('./compare');
const { canonicalText } = require('./corpus');
const { parseDeclared } = require('./declared');

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
 * identifiers: reproducing the unmodified text of a licence the package is NOT under would be worse
 * than reproducing none, and the corpus holds no exception texts.
 */
function spdxIdsOf(spdxId) {
  const parsed = parseDeclared(spdxId);
  if (!parsed.ok || parsed.exceptions.length) return [];
  return parsed.ids;
}

/** How each ecosystem is spelled in the document. The verdict carries the internal key. */
const ECOSYSTEM_LABEL = { npm: 'npm', nuget: 'NuGet' };

/**
 * A Markdown code fence long enough to enclose `text`.
 *
 * Licence texts are third-party content reproduced verbatim, and a fixed ``` fence is closed by the
 * first line in that content that happens to start one - after which the rest of the licence, and
 * everything written after it, renders as prose. Markdown closes a fence only on a run at least as
 * long as the opening one, so opening with one backtick more than the longest run in the text
 * cannot be closed early.
 *
 * @param {string | undefined} text @returns {string}
 */
function fenceFor(text) {
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
 *
 * @param {string | undefined} value
 * @returns {string}
 */
function cell(value) {
  return (value || '').replace(/\|/g, '\\|').replace(/\s+/g, ' ').trim();
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
 * The credit line for one package listed beneath a canonical SPDX licence text.
 *
 * A canonical text carries SPDX's placeholders (`<year>`, `<copyright holders>`) rather than any
 * package's holder, so the package's own copyright notice is what pairs the two - reproducing the
 * permission notice without the copyright notice it is supposed to accompany satisfies neither
 * licence. Absence is stated rather than left blank: a blank reads as "nobody looked".
 *
 * @param {{
 *   name: string;
 *   version: string;
 *   ecosystem: string;
 *   copyright?: string;
 *   inspected?: boolean;
 * }} pkg
 * @returns {string}
 */
function canonicalTextCredit({ name, version, ecosystem, copyright, inspected = true }) {
  const notice =
    (copyright || '').replace(/\s+/g, ' ').trim() ||
    MISSING_COPYRIGHT_NOTICE[inspected ? ecosystem : 'uninspected'];
  return `\`${name}@${version}\` (${ecosystem}) — ${notice}`;
}

/** Normalizes reproduced text: LF line endings, no leading or trailing blank lines. */
function normalizeText(text) {
  return String(text ?? '')
    .replace(/\r\n?/g, '\n')
    .trim();
}

/**
 * Several files' texts as one block, each labelled when there is more than one.
 *
 * A dual-licensed package ships one file per branch (`LICENSE-APACHE` and `LICENSE-MIT`), and
 * reproducing only one of them satisfies neither licence, so every file licensee identified is
 * carried rather than only the one the verdict rests on.
 *
 * @param {{ name: string; text: string }[]} files
 * @returns {string | undefined}
 */
function joinTexts(files) {
  const usable = (files || [])
    .map(({ name, text }) => ({ name, text: normalizeText(text) }))
    .filter((entry) => entry.text);
  if (!usable.length) return undefined;
  if (usable.length === 1) return usable[0].text;
  return usable.map(({ name, text }) => `===== ${name} =====\n\n${text}`).join('\n\n');
}

/**
 * Whether a package's own licence obliges this project to redistribute its `NOTICE`.
 *
 * Apache-2.0 section 4(d) is the clause that does, and it is the only one in play here. Under MIT,
 * BSD or ISC the obligation is to carry the copyright and permission notice - which reproducing the
 * licence text discharges - so a `NOTICE` shipped beside them is informational.
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
 *
 * @param {string | undefined} spdxId
 * @returns {'required' | 'not-required' | 'unknown'}
 */
function noticeDisposition(spdxId) {
  const ids = spdxIdsOf(spdxId);
  if (!ids.length) return 'unknown';
  return ids.some((id) => id === 'Apache-2.0') ? 'required' : 'not-required';
}

/** Records `text` under its own hash, crediting `subject`, so identical texts appear once. */
function collectText(collected, text, subject) {
  const normalized = normalizeText(text);
  if (!normalized) return;
  const hash = crypto.createHash('sha1').update(normalized).digest('hex');
  if (!collected.has(hash)) collected.set(hash, { text: normalized, packages: [] });
  collected.get(hash).packages.push(subject);
}

/**
 * The licence a row is displayed as.
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
 *
 * @param {{
 *   verdict: string;
 *   spdxId?: string;
 *   declared?: string;
 *   election?: { elected: string };
 * }} row
 * @returns {string}
 */
function displayLicense(row) {
  if (!row.spdxId) return 'UNKNOWN';
  const elected = row.verdict === 'elected' || row.election?.elected === row.spdxId;
  const markers = [
    ...(elected && row.declared ? [`elected from ${row.declared}`] : []),
    ...(row.verdict === 'excepted' ? ['reviewed exception'] : []),
  ];
  return markers.length ? `${row.spdxId} (${markers.join('; ')})` : row.spdxId;
}

/**
 * @param {{
 *   verdicts: object[];
 *   corpusVersion: string;
 *   licenseeVersion: string;
 * }} report
 * @returns {string} The complete Markdown document, ending in a newline.
 */
function render({ verdicts, corpusVersion, licenseeVersion, snapStagePackages = [] }) {
  const unknownEcosystem = verdicts.find((row) => !ECOSYSTEM_LABEL[row.ecosystem]);
  if (unknownEcosystem)
    // Silently dropping a row whose ecosystem this function does not know how to table would remove
    // a shipped component from a legal artifact with nothing to show it had gone.
    throw new Error(
      `cannot render ${unknownEcosystem.name}@${unknownEcosystem.version}: unknown ecosystem ` +
        `"${unknownEcosystem.ecosystem}"`,
    );

  const rows = verdicts.filter((row) => row.ecosystem === 'npm').sort(compareByNameThenVersion);
  const dotnetRows = verdicts
    .filter((row) => row.ecosystem === 'nuget')
    .sort(compareByNameThenVersion);

  const texts = new Map(); // sha1 of licence text -> { text, packages: [] }
  const notices = new Map(); // sha1 of NOTICE text -> { text, packages: [] }
  const noticesNotReproduced = []; // `name@version (ecosystem)` shipping a NOTICE nothing obliges
  const canonical = new Map(); // SPDX id -> { text, packages: [credit line] }

  /**
   * Reproduces the canonical text of a row's identifier on its behalf, if the corpus holds one;
   * reports whether it could. Both ecosystems route through here so a reader never has to work out
   * which kind of package a text was reproduced for - the credit line beside it says so.
   *
   * Derived from the identifier the row actually resolved to, never from a hand-maintained list of
   * ids: a list reproduces the licences someone thought of, and leaves every other
   * declared-but-untexted package's attribution obligation discharged nowhere.
   */
  const useCanonicalText = (row) => {
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
      if (!canonical.has(id)) canonical.set(id, { text, packages: [] });
      canonical.get(id).packages.push(credit);
    });
    return true;
  };

  const described = [...rows, ...dotnetRows].map((row) => {
    const label = ECOSYSTEM_LABEL[row.ecosystem];
    const subject = `${row.name}@${row.version}`;
    const hasText = !!normalizeText(row.text);
    if (hasText) collectText(texts, row.text, label === 'npm' ? subject : `${subject} (${label})`);
    const noticeText = joinTexts(row.notices);
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
    // recorded as `(MIT AND Zlib)`, the LICENSE it ships carries only the MIT half, and the Zlib
    // half appeared nowhere in this document. So a compound row gets its operands' canonical texts
    // IN ADDITION to its own file, rather than the canonical path being skipped because something
    // was reproduced. The MIT half then appears twice, once as the package's own text and once as
    // SPDX's; that redundancy is the cost of discharging the half that was missing.
    const compound = spdxIdsOf(row.spdxId).length > 1;
    return {
      ...row,
      license: displayLicense(row),
      hasText,
      // Otherwise only reached when the package itself shipped nothing, so a canonical text never
      // displaces a package's own copy of its licence.
      hasCanonicalText: (!hasText || compound) && useCanonicalText(row),
    };
  });

  const npmDescribed = described.filter((row) => row.ecosystem === 'npm');
  const dotnetDescribed = described.filter((row) => row.ecosystem === 'nuget');

  // A Map, not an object: the keys are licence strings taken from third-party manifests, and
  // `counts['__proto__'] = n` on a plain object writes nowhere a later read can see.
  const counts = new Map();
  npmDescribed.forEach((row) => counts.set(row.license, (counts.get(row.license) || 0) + 1));
  const names = (subset) => subset.map((row) => `\`${row.name}\``).join(', ');
  const noText = npmDescribed.filter((row) => !row.hasText);
  // "Ships no license file" is a claim about a directory that was READ. A `fromLock` package's
  // directory is deliberately never read (`main.js` excludes it from `identify` entirely), so
  // asserting it of one states as fact something this run did not establish - and the document did
  // exactly that, naming both `@eten-tech-foundation/*` packages and `@xmldom/xmldom` two
  // paragraphs after correctly saying nothing had been read from them. `canonicalTextCredit`
  // already models the distinction for the credit lines; these paragraphs now do too.
  const readNoText = noText.filter((row) => row.inspected !== false);
  const unreadNoText = noText.filter((row) => row.inspected === false);
  const noTextCanonical = readNoText.filter((row) => row.hasCanonicalText);
  const noTextAtAll = readNoText.filter((row) => !row.hasCanonicalText);
  const unreadCanonical = unreadNoText.filter((row) => row.hasCanonicalText);
  const unreadNoCanonical = unreadNoText.filter((row) => !row.hasCanonicalText);
  // These rows' version and identifier do NOT come from the package on disk, and a legal artifact
  // has to say where each of its claims came from - see `DEV_LINK` and
  // `correctLinkDistortedResolutions` in `shipping-set.js`. They are reported separately because
  // they are different facts: one package was replaced by a link, the other was DISPLACED by one.
  const devLinked = npmDescribed.filter((row) => row.devLinked);
  const displaced = npmDescribed.filter((row) => row.fromLock && !row.devLinked);
  const out = [];

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
    '**Generated on Linux, and the npm half can differ by platform.** The NuGet half does not: it is',
    'the union of the restore closure for every runtime identifier this application is published for',
    '(`linux-x64`, `win-x64`, `osx-x64`, `osx-arm64`), so a package that ships on only one platform',
    'is still listed. The npm half is the platform-specific one, because npm installs an optional',
    'dependency only where its `os`/`cpu` constraints match, so a tree resolved on Windows or macOS',
    'may contain packages this one does not. Regenerate on Linux, or the file will not match what CI',
    'verifies.',
    '',
    '> Generated by `.erb/scripts/third-party-notices/main.js`. Do not edit by hand; run',
    '> `npm run build:third-party-notices` after changing production dependencies. CI regenerates it',
    '> on Linux and fails if the committed copy is out of date. License texts were identified with',
    `> licensee ${licenseeVersion} against the SPDX license list ${corpusVersion}; both versions are`,
    '> recorded in `THIRD-PARTY-NOTICES.lock.json` so a verdict that moved because the matcher was',
    '> upgraded stays distinguishable from one that moved because a license changed.',
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
    'Those that are copied in are unmodified Ubuntu archive builds, linked dynamically, and several',
    'are copyleft \u2014 ALSA and AppIndicator under the LGPL, NSS and NSPR under MPL-2.0 \u2014 while the DRM,',
    'Mesa, X11 and terminfo libraries are permissive.',
    '',
    'Their license texts are **not** currently carried inside the snap: electron-builder unpacks the',
    'shared objects from each `.deb` without the `usr/share/doc/<package>/copyright` file Ubuntu',
    'ships them with, so nothing in the artifact states their terms. That is a known packaging gap,',
    'still open \u2014 stated here rather than left silent, because an omission and an oversight are',
    'indistinguishable to a reader \u2014 and not a determination that no notice is owed.',
    '',
  );

  out.push('## .NET data provider (NuGet)', '');
  out.push(
    'The data provider is published self-contained and its entire publish directory is copied into',
    'the packaged application (`electron-builder.json5` `extraResources` → `./dotnet/`), so every',
    'assembly in the restore closure ships — not only the direct `PackageReference` entries.',
    `The table below is the union of the restore closure for each published runtime identifier`,
    `(${dotnetDescribed.length} packages), with licenses read from each package’s nuspec by \`nuget-license\`. A`,
    '"Ships …" note names the assemblies a package contributes under a different name — including',
    'assemblies of separate projects that it redistributes, whose own upstream notices this',
    'package-level view does not reproduce.',
    '',
    'Excluded from the table: packages that contribute no runtime, native, or resource asset (MSBuild',
    'and analyzer tooling, metapackages), and packages whose assemblies the .NET 8 shared framework',
    'supersedes — including the per-RID `runtime.*` asset shims. Those belong to the .NET runtime',
    'itself, which is bundled by the self-contained publish and is licensed by Microsoft under the',
    'MIT License (<https://github.com/dotnet/runtime/blob/main/LICENSE.TXT>).',
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
    out.push(`| \`${row.name}\` | ${row.version} | ${cell(row.license)} | ${cell(row.note)} |`),
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
      `${names(dotnetNoTextAtAll)}.`,
      '',
    );
  }
  if (dotnetUnreadNoText.length) {
    out.push(
      `A further ${dotnetUnreadNoText.length} (${names(dotnetUnreadNoText)}) ${dotnetUnreadNoText.length === 1 ? 'is' : 'are'} listed from a recorded`,
      'determination rather than from a restore performed here, so no package folder of theirs was',
      'read and whether they bundle a license file is not established in this document. Where the',
      'recorded determination is an SPDX identifier, that identifier’s canonical text is reproduced',
      'below, paired with no copyright notice — there was no package to read one from.',
      '',
    );
  }

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
      `locally: ${names(devLinked)}.`,
      '',
    );
  }
  if (displaced.length) {
    out.push(
      'Resolved differently on this machine than `package-lock.json` records, because a `yalc` dev',
      'link replaces a package with a symlink and takes the copies nested under it off disk with it.',
      'The version and license below are the ones the lockfile resolves, and nothing was read from',
      `the copy this machine happens to hold: ${names(displaced)}.`,
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
      `reproduced under "Canonical license texts for declared identifiers" instead: ${names(noTextCanonical)}.`,
      '',
    );
  }
  if (noTextAtAll.length) {
    out.push(
      'The following ship no license file of their own and declare no identifier the SPDX corpus',
      `holds a canonical text for, so no license text for them appears below at all: ${names(noTextAtAll)}.`,
      '',
    );
  }
  if (unreadCanonical.length) {
    out.push(
      'For the packages named above whose folder was not read, whether they ship a license file of',
      'their own is not established here. The canonical text of the identifier `package-lock.json`',
      'records for each is reproduced under "Canonical license texts for declared identifiers"',
      `instead: ${names(unreadCanonical)}.`,
      '',
    );
  }
  if (unreadNoCanonical.length) {
    out.push(
      'And for these, whose folder was likewise not read, `package-lock.json` records no identifier',
      `the SPDX corpus holds a canonical text for, so no license text appears for them at all: ${names(unreadNoCanonical)}.`,
      '',
    );
  }

  out.push('| Package | Version | License |', '| --- | --- | --- |');
  npmDescribed.forEach((row) =>
    out.push(`| \`${row.name}\` | ${cell(row.version)} | ${cell(row.license)} |`),
  );
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
    const fence = fenceFor(text);
    out.push(`### ${index + 1}. ${covered.join(', ')}`, '', `${fence}text`, text, fence, '');
  });

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
      'Each package is listed with the copyright notice from its own metadata, which is the notice',
      'that belongs with the text beside it. No copyright holder is inferred: where a package records',
      'none, that is stated rather than left blank.',
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
    [...notices.values()].forEach(({ text, packages: covered }, index) => {
      const fence = fenceFor(text);
      out.push(`### ${index + 1}. ${covered.join(', ')}`, '', `${fence}text`, text, fence, '');
    });
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

  return `${out.join('\n')}\n`;
}

module.exports = {
  render,
  cell,
  fenceFor,
  canonicalTextCredit,
  joinTexts,
  noticeDisposition,
  spdxIdsOf,
};
