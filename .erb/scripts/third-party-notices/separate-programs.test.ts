import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
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
    // The corpus does not hold PSF-2.0 until Task 5 adds it, so this uses a program whose
    // identifiers are all GPL-2.0-or-later - Task 5 flips it back to exercise `alsoContains` too.
    const allGpl: SeparateProgram = {
      ...mercurial,
      deliveries: [{ ...mercurial.deliveries[0], alsoContains: [] }],
    };
    expect(() => assertSeparateProgramTextsAvailable({ Mercurial: allGpl })).not.toThrow();
  });

  it('refuses an identifier the corpus does not hold', () => {
    expect(() =>
      assertSeparateProgramTextsAvailable({ X: { ...mercurial, spdx: ['Not-A-License-1.0'] } }),
    ).toThrow(/Not-A-License-1\.0.*build:third-party-notices:corpus/s);
  });
});
