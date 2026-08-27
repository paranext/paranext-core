import * as fs from 'fs';
import * as path from 'path';
import { describe, expect, it } from 'vitest';
import { canonicalTextCredit, cell, fenceFor, joinTexts, render } from './render';

const GOLDEN = path.join(__dirname, '__fixtures__', 'golden');

const report = {
  licenseeVersion: '9.18.0',
  corpusVersion: '6.6.0',
  verdicts: [
    {
      ecosystem: 'npm',
      name: 'alpha',
      version: '1.0.0',
      verdict: 'allowed',
      spdxId: 'MIT',
      confidence: 100,
      matchedFile: 'LICENSE',
      textSha256: 'a1',
      reason: 'declared and detected agree on MIT',
      text: 'MIT License\n\nCopyright (c) 2020 Alpha\n',
    },
    {
      ecosystem: 'npm',
      name: 'beta',
      version: '2.0.0',
      verdict: 'elected',
      spdxId: 'Apache-2.0',
      declared: 'MPL-2.0 OR Apache-2.0',
      confidence: 100,
      matchedFile: 'LICENSE-MPL',
      textSha256: 'b1',
      reason: 'elected Apache-2.0',
      text: 'Mozilla Public License 2.0\n',
    },
    {
      ecosystem: 'nuget',
      name: 'Gamma',
      version: '3.0.0',
      verdict: 'allowed',
      spdxId: 'MIT',
      confidence: 100,
      matchedFile: undefined,
      textSha256: 'c1',
      reason: 'declared MIT',
      text: undefined,
    },
    // A conjunction whose own file carries only one of its two halves - the `pako@1.0.11` shape.
    // Every operand applies at once, so BOTH canonical texts have to be reproduced even though the
    // package ships a text of its own.
    {
      ecosystem: 'npm',
      name: 'delta',
      version: '4.0.0',
      verdict: 'excepted',
      spdxId: '(MIT AND Zlib)',
      confidence: 0,
      matchedFile: 'LICENSE',
      textSha256: 'd1',
      reason: 'reviewed exception',
      text: 'MIT License\n\nCopyright (c) 2021 Delta\n',
    },
    // Described from package-lock.json, with its directory never read - the dev-linked shape. The
    // document must not say of it that it "ships no license file of its own".
    {
      ecosystem: 'npm',
      name: 'epsilon',
      version: '5.0.0',
      verdict: 'allowed',
      spdxId: 'ISC',
      confidence: 0,
      matchedFile: undefined,
      textSha256: undefined,
      reason: 'declared ISC; canonical text reproduced',
      text: undefined,
      inspected: false,
      fromLock: true,
    },
    // Installed by npm only on another platform, so this machine has no directory for it. It must
    // NOT be described as a package a dev link displaced, which is the other `fromLock` case.
    {
      ecosystem: 'npm',
      name: 'eta',
      version: '7.0.0',
      verdict: 'allowed',
      spdxId: 'MIT',
      confidence: 0,
      matchedFile: undefined,
      textSha256: undefined,
      reason: 'declared MIT; canonical text reproduced',
      text: undefined,
      inspected: false,
      fromLock: true,
      platformOnly: true,
    },
    // A curated override: free text that is no SPDX expression, so whether its terms oblige
    // carrying the NOTICE it ships is not established - and the document must not claim they do
    // not.
    {
      ecosystem: 'nuget',
      name: 'Zeta',
      version: '6.0.0',
      verdict: 'overridden',
      spdxId: 'Proprietary — Example',
      confidence: 0,
      matchedFile: undefined,
      textSha256: undefined,
      reason: 'recorded determination in the notices policy',
      text: undefined,
      notices: [{ name: 'NOTICE', text: 'Zeta attribution notice\n' }],
    },
  ],
  snapStagePackages: ['libasound2', 'libnss3', 'libdrm2', 'libgtk-3-0'],
  // Deliberately covers all three classifications, including `not-established`: a library whose
  // terms nobody has settled still ships inside the `.snap`, so the document has to name it as
  // such rather than leave it out.
  snapStagePackageLicenses: {
    libasound2: { classification: 'copyleft', terms: 'LGPL' },
    libnss3: { classification: 'copyleft', terms: 'MPL-2.0' },
    libdrm2: { classification: 'permissive' },
    'libgtk-3-0': { classification: 'not-established' },
  },
};

describe('render', () => {
  it('matches the golden document', () => {
    // Regenerating the fixture can never leave this test GREEN. An
    // `if (process.env.UPDATE_GOLDEN) fs.writeFileSync(file, actual)` immediately above the
    // assertion lets the test rewrite the git-tracked fixture whenever that variable is set
    // anywhere in the environment, and then assert against what it just wrote: permanently passing,
    // whatever the renderer does. CI cannot catch the rewrite either - `verify-changed-files` runs
    // before `npm test`. Rewriting FAILS the run that does it, so the new fixture has to be read
    // and re-run deliberately:
    //
    //     UPDATE_NOTICES_GOLDEN=1 npx vitest run .erb/scripts/third-party-notices/render.test.ts
    //     git diff .erb/scripts/third-party-notices/__fixtures__/golden/expected.md
    const file = path.join(GOLDEN, 'expected.md');
    const actual = render(report);
    const expected = fs.readFileSync(file, 'utf8');
    if (actual !== expected && process.env.UPDATE_NOTICES_GOLDEN) {
      fs.writeFileSync(file, actual);
      throw new Error(
        `rewrote ${path.relative(process.cwd(), file)} from this run. Read the diff, then re-run ` +
          'without UPDATE_NOTICES_GOLDEN.',
      );
    }
    expect(actual).toBe(expected);
  });

  // The paragraph asserts a PROVENANCE - "the union of the restore closure … with licenses read
  // from each package's nuspec" - and an `alwaysList` package is resolved by no restore and has no
  // nuspec read. Counting the two together put `Microsoft.ICU.ICU4C.Runtime` inside a number the
  // same paragraph then contradicted four sentences later.
  it('counts a package no restore resolves separately from the restore closure', () => {
    const out = render({
      ...report,
      verdicts: [
        ...report.verdicts,
        {
          ecosystem: 'nuget',
          name: 'OnlyOnWindows',
          version: '72.1.0.3',
          verdict: 'overridden',
          spdxId: 'Unicode-3.0',
          confidence: 0,
          matchedFile: undefined,
          textSha256: undefined,
          reason: 'recorded determination in the notices policy: Unicode-3.0',
          text: undefined,
          inspected: false,
        },
      ],
    });
    expect(out).toContain('(2 packages), with licenses read from each package’s nuspec');
    expect(out).toContain('plus 1 package that no restore on this machine resolves');
  });

  // The invariant that every npm row is accounted for has to be keyed on `name@version`, which is
  // what every row it guards is. Two versions of one package both ship today (`@xmldom/xmldom`
  // 0.8.13 and 0.9.10), so keyed on the bare NAME, one of them being named in a paragraph lets the
  // other pass the check having been named nowhere.
  it('does not let one version of a package account for another', () => {
    const compoundWithMissingHalf = {
      ecosystem: 'npm',
      name: 'twinned',
      version: '2.0.0',
      verdict: 'excepted',
      spdxId: '(MIT AND LicenseRef-NotInTheCorpus)',
      confidence: 0,
      matchedFile: 'LICENSE',
      textSha256: 't2',
      reason: 'reviewed exception',
      text: 'MIT License\n\nCopyright (c) 2020 Twinned\n',
    };
    const bucketed = {
      ecosystem: 'npm',
      name: 'twinned',
      version: '1.0.0',
      verdict: 'allowed',
      spdxId: 'MIT',
      confidence: 0,
      matchedFile: undefined,
      textSha256: undefined,
      reason: 'declared MIT',
      text: undefined,
    };
    expect(() =>
      render({ ...report, verdicts: [...report.verdicts, bucketed, compoundWithMissingHalf] }),
    ).toThrow(/twinned@2\.0\.0/);
  });

  it('reproduces every operand of a conjunction, including one the package ships no text for', () => {
    // `spdxId` is not always a bare identifier: a reviewed exception records the whole expression.
    // An exact corpus lookup on the field matches nothing for a compound one, which leaves
    // `pako@1.0.11`'s documented `(MIT AND Zlib)` with only its MIT half reproduced - from its own
    // LICENSE - and the Zlib half nowhere in the artifact.
    const out = render(report);
    expect(out).toContain('### Zlib — canonical text');
    expect(out).toMatch(/### Zlib — canonical text[^#]*`delta@4\.0\.0`/);
    expect(out).toMatch(/### MIT — canonical text[^#]*`delta@4\.0\.0`/);
  });

  it('does not say a package ships no license file when its folder was never read', () => {
    // A `fromLock` package's directory is deliberately never read, so "ships no license file of
    // its own" is a claim this pipeline cannot make about one - least of all two paragraphs after
    // saying nothing was read from it.
    const out = render(report);
    expect(out).toMatch(/whose folder was not read[^#]*`epsilon`/);
    expect(out).not.toMatch(/ship no license file of their own[^#]*`epsilon`/);
  });

  it('describes a package only another platform installs without calling it displaced', () => {
    // Both are `fromLock`, and the dev-link paragraph would otherwise claim this one was resolved
    // differently "because a yalc dev link replaces a package with a symlink" - which is not what
    // happened: npm never installed it here at all.
    // Asserted per PARAGRAPH: the two paragraphs are adjacent with no heading between them, so a
    // pattern spanning from one to the other matches whatever the renderer does.
    const paragraphs = render(report).split('\n\n');
    const named = (needle: string) => paragraphs.filter((p) => p.includes(needle));
    const platformOnly = named('Installed by npm only where');
    const displacedParagraph = named('link replaces a package with a symlink');
    expect(platformOnly).toHaveLength(1);
    expect(platformOnly[0]).toContain('`eta@7.0.0`');
    expect(displacedParagraph).toHaveLength(1);
    expect(displacedParagraph[0]).not.toContain('`eta@7.0.0`');
  });

  it('does not claim a canonical text for a platform-only package that has none', () => {
    // The platform-only paragraph ASSERTS that the canonical text of the license each row declares
    // is reproduced. `useCanonicalText` returns false for an identifier that is not a parseable
    // SPDX expression, so an unsplit list states of such a row that its terms appear below when
    // nothing of it appears anywhere - the one claim a legal artifact must not make loosely.
    const paragraphs = render({
      ...report,
      verdicts: [
        ...report.verdicts,
        {
          ecosystem: 'npm',
          name: 'theta',
          version: '7.0.0',
          verdict: 'overridden',
          spdxId: 'Proprietary — Example',
          confidence: 0,
          matchedFile: undefined,
          textSha256: undefined,
          reason: 'recorded determination in the notices policy',
          text: undefined,
          inspected: false,
          fromLock: true,
          platformOnly: true,
        },
      ],
    }).split('\n\n');
    const named = (needle: string) => paragraphs.filter((p) => p.includes(needle));
    const claimsCanonical = named('Installed by npm only where');
    const claimsNothing = named('declare no identifier the SPDX');
    expect(claimsCanonical).toHaveLength(1);
    expect(claimsCanonical[0]).not.toContain('`theta@7.0.0`');
    expect(claimsCanonical[0]).toContain('`eta@7.0.0`');
    expect(claimsNothing).toHaveLength(1);
    expect(claimsNothing[0]).toContain('`theta@7.0.0`');
  });

  it('names a read package that has neither its own text nor a canonical one', () => {
    // Deliberately NOT named "refuses to render an unaccounted package": the partition assertion in
    // `render` cannot be falsified from out here, because with the buckets as they stand every row
    // lands in one - which is the property the assertion exists to keep true through future edits
    // to those filters, not a behaviour a fixture can provoke today. What this DOES check is the
    // half that is observable: a row with no text of its own and no canonical text is named, and
    // the assertion does not spuriously throw on it.
    const orphan = {
      ecosystem: 'npm',
      name: 'iota',
      version: '8.0.0',
      verdict: 'overridden',
      spdxId: 'Proprietary — Example',
      confidence: 0,
      matchedFile: undefined,
      textSha256: undefined,
      reason: 'recorded determination in the notices policy',
      text: undefined,
    };
    const paragraphs = render({ ...report, verdicts: [...report.verdicts, orphan] }).split('\n\n');
    const claimsNothing = paragraphs.filter((p) =>
      p.includes('declare no identifier the SPDX corpus'),
    );
    expect(claimsNothing).toHaveLength(1);
    expect(claimsNothing[0]).toContain('`iota@8.0.0`');
  });

  it('reproduces a NOTICE whose terms it cannot establish rather than excusing it', () => {
    // `requiresNoticeRedistribution` regex-tested the resolved id and collapsed "these terms do not
    // require it" together with "these terms were never established". Every `overridden` row is the
    // second: free text naming a determination, not an expression anything here has read.
    const out = render(report);
    expect(out).toContain('Zeta attribution notice');
    expect(out).not.toMatch(/do not require it to be\nredistributed[^#]*`Zeta@6\.0\.0`/);
  });

  // Two things ship that are in neither dependency graph: the UBS lexical database and the Ubuntu
  // libraries staged into the snap. Nothing upstream in this pipeline can see either, so if these
  // sections were dropped the document would look complete while omitting a 35 MB third-party
  // database and every copyleft library in the Linux artifact.
  it('discloses the bundled lexical database and the terms attached to it', () => {
    const out = render(report);
    expect(out).toContain('## Bundled data \u2014 UBS lexical database');
    expect(out).toContain('UBS Dictionary of Biblical Hebrew');
    expect(out).toContain('UBS Dictionary of the Greek New Testament');
    expect(out).toContain('https://creativecommons.org/licenses/by-sa/4.0/');
    // The closed portions are the half a reader is most likely to get wrong, so the document has to
    // say so rather than leaving CC BY-SA to imply the whole file is open.
    expect(out).toContain('**not** available under an open');
    expect(out).toContain('https://github.com/ubsicap/ubs-open-license');
  });

  it('lists the snap-staged system libraries it is given', () => {
    const out = render(report);
    expect(out).toContain('## Linux snap \u2014 staged system libraries');
    expect(out).toContain('- `libasound2`');
    expect(out).toContain('- `libnss3`');
  });

  it("reproduces each staged library's copyright text verbatim", () => {
    // The snap carries no notice of its own for these - electron-builder's snapcraft template
    // excludes `usr/share` from the app part - so this document is where the notice travels, and
    // it has to travel whole rather than as a summary.
    const out = render({
      ...report,
      snapCopyrightTexts: [
        {
          name: 'libasound2 \u2014 usr/share/doc/libasound2/copyright, Ubuntu 22.04 (core22)',
          text: 'Copyright (c) alsa-lib authors\nLGPL-2.1+ terms follow.\n',
        },
      ],
    });
    expect(out).toContain('### libasound2 \u2014 usr/share/doc/libasound2/copyright');
    expect(out).toContain('Copyright (c) alsa-lib authors');
    expect(out).toContain('LGPL-2.1+ terms follow.');
  });

  it('states that the notices travel in this document rather than in the snap', () => {
    // The claim a reader needs is not that the gap exists but that it is closed, and by what
    // mechanism - THIRD-PARTY-NOTICES.md being packed into the snap as an extraResources entry.
    const out = render(report);
    expect(out).toContain('Their notices travel in this document');
    expect(out).not.toContain('are **not** currently carried inside the snap');
  });

  // The list is read from `electron-builder.json5` by `main.ts` rather than restated here, so a
  // staged package added to the packaging config cannot leave the notices describing a set the
  // artifact no longer matches.
  it('renders the staged-library list from its input, not a hardcoded copy', () => {
    const out = render({ ...report, snapStagePackages: ['libwidget9'] });
    expect(out).toContain('- `libwidget9`');
    expect(out).not.toContain('- `libasound2`');
  });

  it("defers to LICENSING.md for the application's own license", () => {
    // The source is AGPL and the binary is licensed under the Terms of Service; which applies to
    // what is stated in LICENSING.md and nowhere else. This document is about third-party
    // components, so the deferral is asserted rather than left to convention.
    expect(render(report)).toContain('LICENSING.md');
    expect(render(report)).not.toMatch(/Platform\.Bible is (licensed|distributed) under/);
  });

  it('is deterministic across runs', () => {
    expect(render(report)).toBe(render(report));
  });

  it('orders packages stably regardless of input order', () => {
    const shuffled = { ...report, verdicts: [...report.verdicts].reverse() };
    expect(render(shuffled)).toBe(render(report));
  });

  // Reproduced for whatever identifier a row resolved to, not for a hardcoded list: a list covers
  // the licenses someone thought of, and every package declaring anything else discharges its
  // attribution obligation nowhere.
  it('reproduces the canonical text of any declared identifier the corpus holds', () => {
    const out = render({
      ...report,
      verdicts: [
        {
          ecosystem: 'npm',
          name: 'delta',
          version: '4.0.0',
          verdict: 'allowed',
          spdxId: 'ISC',
          confidence: 0,
          matchedFile: undefined,
          textSha256: undefined,
          reason: 'declared ISC',
          text: undefined,
        },
      ],
    });
    expect(out).toContain('### ISC — canonical text, 1 package');
    expect(out).toContain('Permission to use, copy, modify, and/or distribute this software');
  });

  // A row this function does not know how to table is a shipped component that would silently
  // disappear from a legal artifact.
  it('refuses to render a package from an ecosystem it has no table for', () => {
    expect(() =>
      render({
        ...report,
        verdicts: [{ ...report.verdicts[0], ecosystem: 'cargo' }],
      }),
    ).toThrow(/unknown ecosystem/);
  });

  // Apache-2.0 section 4(d) is the only clause in play that obliges a NOTICE to be redistributed.
  // Under MIT/BSD/ISC the NOTICE is informational, and reproducing an aggregate one would bury this
  // repository's own disclosures without discharging anything.
  it('reproduces a NOTICE for an Apache-2.0 package and records one for a permissive package', () => {
    const out = render({
      ...report,
      verdicts: [
        {
          ...report.verdicts[1],
          spdxId: 'Apache-2.0',
          notices: [{ name: 'NOTICE', text: 'Apache attribution for beta' }],
        },
        {
          ...report.verdicts[0],
          notices: [{ name: 'NOTICE', text: 'aggregate notice for alpha' }],
        },
      ],
    });
    expect(out).toContain('Apache attribution for beta');
    expect(out).not.toContain('aggregate notice for alpha');
    expect(out).toContain('`alpha@1.0.0 (npm)`');
  });
});

describe('joinTexts', () => {
  // A dual-licensed package ships one file per branch, and reproducing only the elected one
  // satisfies neither license.
  it('labels each file when a package ships more than one license text', () => {
    expect(
      joinTexts([
        { name: 'LICENSE-MIT', text: 'mit' },
        { name: 'LICENSE-APACHE', text: 'ap' },
      ]),
    ).toBe(`===== LICENSE-MIT =====

mit

===== LICENSE-APACHE =====

ap`);
  });

  it('leaves a single text unlabelled', () => {
    expect(joinTexts([{ name: 'LICENSE', text: 'mit' }])).toBe('mit');
  });

  // Some upstream licenses are CRLF and git normalizes them on commit, so without this the
  // committed artifact would show a spurious diff on every run.
  it('normalizes line endings and trims, so the committed artifact is byte-stable', () => {
    expect(joinTexts([{ name: 'LICENSE', text: '\r\nmit\r\ntext\r\n' }])).toBe('mit\ntext');
  });

  it('reports nothing rather than an empty block when there is no text', () => {
    expect(joinTexts([])).toBeUndefined();
    expect(joinTexts([{ name: 'LICENSE', text: '   ' }])).toBeUndefined();
  });
});

describe('canonicalTextCredit', () => {
  // A canonical text carries SPDX's placeholder rather than any package's holder, so the package's
  // own copyright notice is what pairs the two.
  it('quotes the copyright notice a package records', () => {
    expect(
      canonicalTextCredit({
        name: 'CsvHelper',
        version: '33.1.0',
        ecosystem: 'NuGet',
        copyright: 'Copyright © 2009-2024 Josh Close',
      }),
    ).toBe('`CsvHelper@33.1.0` (NuGet) — Copyright © 2009-2024 Josh Close');
  });

  it('collapses a multi-line copyright notice onto one line', () => {
    expect(
      canonicalTextCredit({
        name: 'x',
        version: '1.0.0',
        ecosystem: 'NuGet',
        copyright: '  Copyright (c)\n  Example   Corp  ',
      }),
    ).toBe('`x@1.0.0` (NuGet) — Copyright (c) Example Corp');
  });

  // Three distinct facts that must never collapse into one another, because each says something
  // different about what was actually checked. A blank would read as "nobody looked". Both sources
  // are named because a NuGet notice can come from either the nuspec or the package's own license
  // text, so "the nuspec is empty" alone is not the whole reason there is nothing to quote.
  it('names both places a NuGet notice could have come from', () => {
    expect(
      canonicalTextCredit({ name: 'ParatextChecks', version: '9.5.0', ecosystem: 'NuGet' }),
    ).toBe(
      '`ParatextChecks@9.5.0` (NuGet) — neither its nuspec nor its license files state a copyright notice',
    );
  });

  it('names both places an npm notice could have come from', () => {
    expect(canonicalTextCredit({ name: 'dlv', version: '1.1.3', ecosystem: 'npm' })).toBe(
      '`dlv@1.1.3` (npm) — no copyright notice — an npm manifest has no field for one, and its license files state none',
    );
  });

  // "Never read" is not "read and found empty": `Microsoft.ICU.ICU4C.Runtime` is restored only on
  // Windows, so claiming its nuspec declares nothing would assert something never checked.
  it('distinguishes a package that was never on disk from one with no notice', () => {
    expect(
      canonicalTextCredit({
        name: 'Microsoft.ICU.ICU4C.Runtime',
        version: '72.1.0.3',
        ecosystem: 'NuGet',
        inspected: false,
      }),
    ).toBe(
      '`Microsoft.ICU.ICU4C.Runtime@72.1.0.3` (NuGet) — not present in the local package folder, ' +
        'so no copyright notice could be read',
    );
  });

  it('prefers a recorded notice over the not-inspected fallback', () => {
    expect(
      canonicalTextCredit({
        name: 'x',
        version: '1.0.0',
        ecosystem: 'NuGet',
        copyright: '© Example',
        inspected: false,
      }),
    ).toBe('`x@1.0.0` (NuGet) — © Example');
  });
});

describe('fenceFor', () => {
  it('uses the ordinary three backticks for text that contains none', () => {
    expect(fenceFor('MIT License\n\nCopyright (c) 2026')).toBe('```');
    expect(fenceFor('')).toBe('```');
    expect(fenceFor(undefined)).toBe('```');
  });

  it('leaves a run shorter than a fence alone', () => {
    expect(fenceFor('use `npm install` first')).toBe('```');
  });

  // License texts are reproduced verbatim from third parties. A fixed fence is closed by the first
  // line in one that opens a code block of its own, after which the rest of that license - and
  // everything written after it - renders as prose rather than as quoted text.
  it.each([
    ['```', '````'],
    ['a\n```js\ncode\n```\nb', '````'],
    ['`````', '``````'],
  ])('outgrows the longest run in %j', (text, expected) => {
    expect(fenceFor(text)).toBe(expected);
  });

  it('produces a fence that Markdown cannot close early', () => {
    const text = 'before\n```\ninside\n```\nafter';
    const fence = fenceFor(text);
    expect(fence.length).toBeGreaterThan(3);
    expect(text.split('\n').some((line) => line.startsWith(fence))).toBe(false);
  });
});

describe('cell', () => {
  it('escapes pipes so a license value cannot break the Markdown table', () => {
    expect(cell('MIT | GPL')).toBe('MIT \\| GPL');
  });

  it('collapses newlines and runs of whitespace, and trims', () => {
    expect(cell('  Copyright (c)\n  Example   Corp  ')).toBe('Copyright (c) Example Corp');
  });

  it('renders a missing value as an empty cell', () => {
    expect(cell(undefined)).toBe('');
  });
});

describe('the license cell for a row that was both elected and excepted', () => {
  // npm:jszip is the live case. It declares `(MIT OR GPL-3.0-or-later)`, this project elects MIT,
  // and its LICENSE.markdown concatenates the complete MIT and GPL-3.0 texts - so no matcher
  // identifies it, the npm rule cannot resolve the election on text alone, and a reviewed exception
  // is what actually clears the block. Reporting only the exception would drop the one fact the
  // table exists to carry: that a deliberate choice was made between two grants, one copyleft.
  const row = (extra: object) => ({
    ecosystem: 'npm' as const,
    name: 'dual',
    version: '1.0.0',
    spdxId: 'MIT',
    confidence: 0,
    matchedFile: undefined,
    textSha256: 'x',
    reason: 'r',
    text: 'a license text',
    ...extra,
  });

  const licenseCellFor = (extra: object) => {
    const document = render({ ...report, verdicts: [row(extra)] });
    const line = document.split('\n').find((entry) => entry.startsWith('| `dual` |'));
    if (!line) throw new Error(`no table row for the package under test:\n${document}`);
    return line;
  };

  it('shows the election and the exception together', () => {
    expect(
      licenseCellFor({
        verdict: 'excepted',
        declared: '(MIT OR GPL-3.0-or-later)',
        election: { elected: 'MIT' },
      }),
    ).toContain('| MIT (elected from (MIT OR GPL-3.0-or-later); reviewed exception) |');
  });

  it('shows only the exception when no election was recorded', () => {
    expect(licenseCellFor({ verdict: 'excepted', declared: 'MIT' })).toContain(
      '| MIT (reviewed exception) |',
    );
  });

  it('ignores an election that named a different branch than the row resolved to', () => {
    // A stale entry must not label a row it did not decide.
    expect(
      licenseCellFor({
        verdict: 'excepted',
        declared: '(MIT OR GPL-3.0-or-later)',
        election: { elected: 'GPL-3.0-or-later' },
      }),
    ).toContain('| MIT (reviewed exception) |');
  });

  it('still shows a plain election on its own', () => {
    expect(
      licenseCellFor({ verdict: 'elected', declared: '(MPL-2.0 OR Apache-2.0)', spdxId: 'MIT' }),
    ).toContain('| MIT (elected from (MPL-2.0 OR Apache-2.0)) |');
  });
});
