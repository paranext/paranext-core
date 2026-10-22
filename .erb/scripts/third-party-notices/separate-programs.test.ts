import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { nugetNote } from './main';
import {
  assertSeparateProgramLinksRecorded,
  assertSeparateProgramTextsAvailable,
  assertSeparateProgramsRecorded,
  separateProgramIds,
} from './separate-programs';
import type { SeparateProgram } from './types';

let repo: string;
beforeEach(() => {
  repo = fs.mkdtempSync(path.join(os.tmpdir(), 'notices-separate-programs-'));
});
afterEach(() => {
  fs.rmSync(repo, { recursive: true, force: true });
});

function write(relative: string, contents: string) {
  const full = path.join(repo, relative);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, contents);
}

const mercurial: SeparateProgram = {
  spdx: ['GPL-2.0-or-later'],
  copyright: 'Copyright (C) 2005-2025 Olivia Mackall and others',
  reviewer: 'someone@example.org',
  date: '2026-09-04',
  reason: 'Invoked as a subprocess; aggregation, not derivation.',
  sourceAvailability: 'Source is published beside the binaries.',
  deliveries: [
    {
      platform: 'Windows',
      version: '6.3.1',
      mechanism: 'NuGet package hgWindows-6.3.1',
      evidence: {
        file: 'c-sharp/ParanextDataProvider.csproj',
        contains: 'Include="hgWindows-6.3.1"',
      },
      carriesNotices: 'Repository/HgResources/Mercurial/Copying.txt',
      alsoContains: [{ name: 'Python', version: '3.9', spdx: ['PSF-2.0'] }],
    },
  ],
};

describe('separateProgramIds', () => {
  it('names every identifier the entry and its bundled components carry, once each', () => {
    expect(separateProgramIds({ Mercurial: mercurial })).toEqual(['GPL-2.0-or-later', 'PSF-2.0']);
  });
});

describe('assertSeparateProgramsRecorded', () => {
  beforeEach(() => {
    write('c-sharp/ParanextDataProvider.csproj', '<PackageReference Include="hgWindows-6.3.1" />');
  });

  it('accepts an entry whose evidence is in the tree', () => {
    expect(() => assertSeparateProgramsRecorded(repo, { Mercurial: mercurial })).not.toThrow();
  });

  it('accepts an empty table', () => {
    expect(() => assertSeparateProgramsRecorded(repo, {})).not.toThrow();
  });

  it('refuses evidence that is missing from the tree', () => {
    write('c-sharp/ParanextDataProvider.csproj', '<PackageReference Include="Other" />');
    expect(() => assertSeparateProgramsRecorded(repo, { Mercurial: mercurial })).toThrow(
      /Mercurial.*Windows.*does not contain 'Include="hgWindows-6\.3\.1"'/s,
    );
    fs.rmSync(path.join(repo, 'c-sharp/ParanextDataProvider.csproj'));
    expect(() => assertSeparateProgramsRecorded(repo, { Mercurial: mercurial })).toThrow(
      /does not exist/,
    );
  });

  // Every program-level field `requireText` guards, not a sample of them: this table is ALL that
  // holds them, because the committed policy ships `"separatePrograms": {}` and so exercises none.
  // `copyright` in particular is reproduced as a credit line under a canonical SPDX text, where a
  // placeholder would read as a reviewed attribution.
  it.each([
    ['copyright', '<the program’s own notice>'],
    ['reviewer', ''],
    ['reason', '<why this is aggregation - one paragraph>'],
    ['sourceAvailability', ' '],
    ['date', '4 Sep 2026'],
  ])('refuses a %s that is missing, a placeholder, or malformed', (field, value) => {
    expect(() =>
      assertSeparateProgramsRecorded(repo, { Mercurial: { ...mercurial, [field]: value } }),
    ).toThrow(new RegExp(`Mercurial.*"${field}"`, 's'));
  });

  it.each([
    ['platform', ''],
    ['version', '<version>'],
    ['mechanism', ' '],
    // A JSON number is the natural slip for a version-like field, and coercion would carry it to
    // `inlineText`, which calls `.replace` on it.
    ['version', 6.3],
  ])('refuses a delivery whose %s is missing, a placeholder, or not a string', (field, value) => {
    const delivery = { ...mercurial.deliveries[0], [field]: value };
    expect(() =>
      assertSeparateProgramsRecorded(repo, { Mercurial: { ...mercurial, deliveries: [delivery] } }),
    ).toThrow(new RegExp(`Mercurial.*deliveries\\[\\].${field}`, 's'));
  });

  it('refuses evidence that names no substring to look for', () => {
    // An empty `contains` makes `readFileSync(...).includes('')` vacuously true, so the delivery
    // would pass its evidence check without the file establishing anything at all.
    const evidence = { ...mercurial.deliveries[0].evidence, contains: '' };
    const delivery = { ...mercurial.deliveries[0], evidence };
    expect(() =>
      assertSeparateProgramsRecorded(repo, { Mercurial: { ...mercurial, deliveries: [delivery] } }),
    ).toThrow(/Mercurial.*evidence\.contains/s);
  });

  it('refuses carriesNotices: true, which the document cannot quote', () => {
    // `false` records "this bundle carries none"; anything else is the path the document quotes, so
    // `true` is the natural typo for the first. Without the guard it reaches `inlineText` and dies
    // with `value.replace is not a function`, naming no field.
    const delivery = { ...mercurial.deliveries[0], carriesNotices: true };
    expect(() =>
      assertSeparateProgramsRecorded(repo, { Mercurial: { ...mercurial, deliveries: [delivery] } }),
    ).toThrow(/Mercurial.*carriesNotices/s);
  });

  it('refuses evidence that names a directory rather than a file', () => {
    // `existsSync` is true for a directory, so without the `isFile` test this reaches `readFileSync`
    // and throws a bare EISDIR naming no entry, platform or field.
    fs.mkdirSync(path.join(repo, 'some-directory'), { recursive: true });
    const evidence = { ...mercurial.deliveries[0].evidence, file: 'some-directory' };
    const delivery = { ...mercurial.deliveries[0], evidence };
    expect(() =>
      assertSeparateProgramsRecorded(repo, { Mercurial: { ...mercurial, deliveries: [delivery] } }),
    ).toThrow(/Mercurial.*some-directory.*does not exist/s);
  });

  it('refuses a delivery without evidence or with no deliveries at all', () => {
    expect(() =>
      assertSeparateProgramsRecorded(repo, { Mercurial: { ...mercurial, deliveries: [] } }),
    ).toThrow(/at least one delivery/);
  });

  it.each([
    ['copyright', '<the component’s own notice>'],
    ['version', 3.9],
    ['name', ''],
  ])('refuses a bundled component whose %s is a placeholder or not a string', (field, value) => {
    // `copyright` is reproduced as a credit line directly beneath the canonical SPDX text, so a
    // placeholder there reads as a reviewed attribution; `version` prints beside the name, where a
    // JSON number reaches `.replace`.
    const alsoContains = [{ ...mercurial.deliveries[0].alsoContains?.[0], [field]: value }];
    const delivery = { ...mercurial.deliveries[0], alsoContains };
    expect(() =>
      assertSeparateProgramsRecorded(repo, { Mercurial: { ...mercurial, deliveries: [delivery] } }),
    ).toThrow(new RegExp(`Mercurial.*alsoContains\\[\\].${field}`, 's'));
  });

  it('refuses free-text terms that are not a string', () => {
    // Only checked when `terms` is the recorded alternative to `spdx` - which is when the document
    // reproduces it as the component's whole grant.
    const alsoContains = [{ name: 'mystery', terms: 42, nonSpdx: true }];
    const delivery = { ...mercurial.deliveries[0], alsoContains };
    expect(() =>
      assertSeparateProgramsRecorded(repo, { Mercurial: { ...mercurial, deliveries: [delivery] } }),
    ).toThrow(/Mercurial.*alsoContains\[\].terms/s);
  });

  it('refuses a bundled component that names neither an identifier nor free text', () => {
    const delivery = { ...mercurial.deliveries[0], alsoContains: [{ name: 'mystery' }] };
    expect(() =>
      assertSeparateProgramsRecorded(repo, { Mercurial: { ...mercurial, deliveries: [delivery] } }),
    ).toThrow(/mystery.*"spdx".*"terms"/s);
  });
});

describe('assertSeparateProgramTextsAvailable', () => {
  it('accepts identifiers the corpus holds', () => {
    expect(() => assertSeparateProgramTextsAvailable({ Mercurial: mercurial })).not.toThrow();
  });

  it('refuses an identifier the corpus does not hold', () => {
    expect(() =>
      assertSeparateProgramTextsAvailable({ X: { ...mercurial, spdx: ['Not-A-License-1.0'] } }),
    ).toThrow(/Not-A-License-1\.0.*build:third-party-notices:corpus/s);
  });
});

describe('the NuGet row for a linked package points at the separate-programs section', () => {
  // The row is the only place a reader meets that package, and under copyleft terms it reads as an
  // ordinary dependency until something says otherwise. Derived from the link rather than typed
  // into the overlay's `note`, so the two cannot disagree.
  const pkg = { name: 'hgWindows', version: '6.3.1', copyright: '(c) Olivia Mackall and others' };

  it('names the program and the section', () => {
    const note = nugetNote(pkg, { license: 'GPL-2.0-or-later', separateProgram: 'Mercurial' });
    expect(note).toContain('Redistributed as the separate program "Mercurial"');
    expect(note).toContain('"Third-party programs redistributed as separate executables"');
  });

  it('keeps the assemblies sentence, the curated note and the nuspec copyright as they were', () => {
    expect(nugetNote({ ...pkg, assemblies: ['hg.exe'] }, {})).toBe(
      'Ships hg.exe. (c) Olivia Mackall and others',
    );
    expect(nugetNote(pkg, { note: 'Windows only.' })).toBe('Windows only.');
    const linked = nugetNote(pkg, { note: 'Windows only.', separateProgram: 'Mercurial' });
    expect(linked.startsWith('Redistributed as the separate program')).toBe(true);
    expect(linked.endsWith('Windows only.')).toBe(true);
  });
});

describe("a program's own identifiers have to be ones the policy classifies", () => {
  // `applyOverride` admits a linked package on the terms recorded for the PROGRAM, returning before
  // the allowed/copyleft test - so if nothing constrains the entry's own `spdx`, that argument is
  // circular. This is the check that closes it.
  //
  // `PSF-2.0` is in the set because the fixture's Windows delivery bundles Python: the bound covers
  // every identifier the entry names, components included, since those are reproduced in the
  // document too.
  const admissible = new Set(['GPL-2.0-or-later', 'MIT', 'PSF-2.0']);

  beforeEach(() => {
    write('c-sharp/ParanextDataProvider.csproj', '<PackageReference Include="hgWindows-6.3.1" />');
  });

  it('accepts identifiers the policy classifies', () => {
    expect(() =>
      assertSeparateProgramsRecorded(repo, { Mercurial: mercurial }, admissible),
    ).not.toThrow();
  });

  it('refuses one it does not', () => {
    const unclassified: SeparateProgram = {
      ...mercurial,
      spdx: ['GPL-2.0-or-later', 'CC-BY-NC-4.0'],
    };

    expect(() =>
      assertSeparateProgramsRecorded(repo, { Mercurial: unclassified }, admissible),
    ).toThrow(/CC-BY-NC-4\.0, which the notices policy classifies on neither/);
  });

  it('refuses one a BUNDLED COMPONENT names, whose text the document reproduces too', () => {
    // The program's own identifiers are all classified here, so only the component's can fail the
    // bound. `separateProgramIds` collects it and `addSeparateProgramTexts` prints its canonical
    // text, so leaving it unchecked would reproduce a licence nothing classified.
    const delivery = {
      ...mercurial.deliveries[0],
      alsoContains: [{ name: 'Python', version: '3.9', spdx: ['CC-BY-NC-4.0'] }],
    };

    expect(() =>
      assertSeparateProgramsRecorded(
        repo,
        { Mercurial: { ...mercurial, deliveries: [delivery] } },
        admissible,
      ),
    ).toThrow(/CC-BY-NC-4\.0, which the notices policy classifies on neither/);
  });

  it('checks nothing when no classification is supplied', () => {
    const unclassified: SeparateProgram = { ...mercurial, spdx: ['CC-BY-NC-4.0'] };

    expect(() => assertSeparateProgramsRecorded(repo, { Mercurial: unclassified })).not.toThrow();
  });
});

describe('assertSeparateProgramLinksRecorded', () => {
  // `nugetNote` derives the "see the separate-programs section" sentence from the link alone, and
  // `applyOverride` only sees the links classification routes through it - never a package cleared
  // by its own declared license. Without this gate that row points at a section that is not there.
  const programs = { Mercurial: mercurial };

  it('accepts a link the table records', () => {
    expect(() =>
      assertSeparateProgramLinksRecorded(
        { 'nuget:hgWindows': { license: 'GPL-2.0-or-later', separateProgram: 'Mercurial' } },
        programs,
      ),
    ).not.toThrow();
  });

  it('refuses a link the table does not record', () => {
    expect(() =>
      assertSeparateProgramLinksRecorded(
        { 'nuget:hgWindows': { separateProgram: 'Mercurail' } },
        programs,
      ),
    ).toThrow(/"nuget:hgWindows".*"Mercurail".*records no entry by that name/s);
  });

  it('refuses a link on a package its own declared license clears, which applyOverride never sees', () => {
    expect(() =>
      assertSeparateProgramLinksRecorded(
        { 'nuget:hgWindows': { license: 'MIT', separateProgram: 'Mercurail' } },
        programs,
      ),
    ).toThrow(/records no entry by that name/);
  });

  it('ignores an override that records no link, and an empty table', () => {
    expect(() =>
      assertSeparateProgramLinksRecorded({ 'nuget:hgWindows': { note: 'Windows only.' } }, {}),
    ).not.toThrow();
    expect(() => assertSeparateProgramLinksRecorded({}, {})).not.toThrow();
  });

  it('refuses a link that would resolve only against Object.prototype', () => {
    expect(() =>
      assertSeparateProgramLinksRecorded({ 'nuget:x': { separateProgram: 'toString' } }, programs),
    ).toThrow(/records no entry by that name/);
  });

  it('trims the link the way applyOverride and nugetNote do', () => {
    expect(() =>
      assertSeparateProgramLinksRecorded(
        { 'nuget:x': { separateProgram: '  Mercurial ' } },
        programs,
      ),
    ).not.toThrow();
  });

  it('refuses a link on a package whose section renders no pointer to it', () => {
    // The sentence the link produces is rendered into the NuGet section's Notes column, and that
    // column exists nowhere else. An `npm:` key would take the link's copyleft admission in
    // `applyOverride` and then appear as an ordinary dependency with nothing pointing at the entry
    // it was admitted on the strength of - the promise `nugetNote` makes, broken silently.
    expect(() =>
      assertSeparateProgramLinksRecorded(
        { 'npm:some-package': { separateProgram: 'Mercurial' } },
        programs,
      ),
    ).toThrow(/only a "nuget:" package renders that link/);
  });
});
