import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import { describe, expect, it } from 'vitest';
import { loadPolicy } from './policy';
import { snapCopyrightText, vendoredLicenseText } from './vendored-text';

const DIR = path.join(__dirname, 'vendored-texts');
const POLICY_PATH = path.join(__dirname, 'notices-policy.json');
const policy = loadPolicy(POLICY_PATH);
const entries = Object.entries(policy.licenseTexts || {});

describe('vendoredLicenseText', () => {
  it('returns nothing for a package with no entry', () => {
    expect(vendoredLicenseText(policy, 'nuget:NoSuchPackage', '1.0.0')).toBeUndefined();
  });

  // Reproduced verbatim as the package's licence, so an edited copy is a changed legal claim. The
  // pin is what makes the checked-in file re-checkable against the source it was read from.
  it('refuses a text that no longer hashes to what the policy records', () => {
    const [key, entry] = entries[0];
    const tampered = {
      ...policy,
      licenseTexts: { [key]: { ...entry, sha256: 'f'.repeat(64) } },
    };
    expect(() => vendoredLicenseText(tampered, key, entry.version)).toThrow(/no longer hashes/);
  });

  it('refuses a version other than the one the terms were read from', () => {
    const [key] = entries[0];
    expect(() => vendoredLicenseText(policy, key, '999.0.0')).toThrow(/read from version/);
  });

  it('names the missing file rather than failing with a bare ENOENT', () => {
    const [key, entry] = entries[0];
    const missing = {
      ...policy,
      licenseTexts: { [key]: { ...entry, file: 'not-checked-in.txt' } },
    };
    expect(() => vendoredLicenseText(missing, key, entry.version)).toThrow(/not-checked-in\.txt/);
  });
});

describe('every vendored licence text in the committed policy', () => {
  it.each(entries)('%s is checked in and hashes to what the policy records', (key, entry) => {
    const file = path.join(DIR, entry.file);
    expect(fs.existsSync(file)).toBe(true);
    const text = fs.readFileSync(file, 'utf8');
    expect(crypto.createHash('sha256').update(text).digest('hex')).toBe(entry.sha256);
    expect(entry.source).toMatch(/^https:\/\//);
    expect(entry.reason.length).toBeGreaterThan(40);
    // Pinned to a REF, not to a moving branch: the terms a package is under are the ones at the
    // release it builds from, and `trunk`/`main` moves out from under a recorded determination.
    expect(entry.source).not.toMatch(/\/(?:trunk|main|master)\//);
  });

  it('holds no text for a package no entry names', () => {
    // Files only, not the `snap/` subdirectory: the staged-library copyright texts live there and
    // are named by `snapStagePackages` entries instead, which the suite below covers.
    const named = new Set(entries.map(([, entry]) => entry.file));
    const onDisk = fs.existsSync(DIR)
      ? fs.readdirSync(DIR, { withFileTypes: true }).filter((e) => e.isFile())
      : [];
    expect(onDisk.map((e) => e.name).filter((file) => !named.has(file))).toEqual([]);
  });
});

describe('every staged-library copyright text in the committed policy', () => {
  const SNAP_DIR = path.join(DIR, 'snap');
  const staged = Object.entries(policy.snapStagePackages || {});

  it('names at least one staged library', () => {
    // Otherwise every assertion below iterates an empty list and passes.
    expect(staged.length).toBeGreaterThan(0);
  });

  it.each(staged)('%s is checked in and hashes to what the policy records', (pkg, entry) => {
    const { name, text } = snapCopyrightText(pkg, entry);
    expect(name).toContain(pkg);
    expect(text.length).toBeGreaterThan(0);
  });

  it('records the Ubuntu release each text was read from', () => {
    // The staged set is core22, and a Debian copyright file differs between releases - so a text
    // read from another one is a notice for a different build of the library.
    staged.forEach(([, entry]) => expect(entry.copyright.source).toContain('core22'));
  });

  it('refuses a text that no longer hashes to the recorded value', () => {
    const [pkg, entry] = staged[0];
    expect(() =>
      snapCopyrightText(pkg, { ...entry, copyright: { ...entry.copyright, sha256: 'deadbeef' } }),
    ).toThrow(/no longer hashes/);
  });

  it('holds no staged-library text the policy does not name', () => {
    const named = new Set(staged.map(([, entry]) => entry.copyright.file));
    const onDisk = fs.existsSync(SNAP_DIR) ? fs.readdirSync(SNAP_DIR) : [];
    expect(onDisk.filter((file) => !named.has(file))).toEqual([]);
  });
});
