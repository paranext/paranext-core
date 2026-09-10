import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { nugetNote } from './main';
import {
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

  it.each([
    ['reviewer', ''],
    ['reason', '<why this is aggregation - one paragraph>'],
    ['sourceAvailability', ' '],
    ['date', '4 Sep 2026'],
  ])('refuses a %s that is missing, a placeholder, or malformed', (field, value) => {
    expect(() =>
      assertSeparateProgramsRecorded(repo, { Mercurial: { ...mercurial, [field]: value } }),
    ).toThrow(new RegExp(`Mercurial.*"${field}"`, 's'));
  });

  it('refuses a delivery without evidence or with no deliveries at all', () => {
    expect(() =>
      assertSeparateProgramsRecorded(repo, { Mercurial: { ...mercurial, deliveries: [] } }),
    ).toThrow(/at least one delivery/);
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
