/**
 * Unit tests for the mapping from isolated e2e subsets to the source paths they exercise.
 *
 * `tests/isolated/subset-sources.json` drives which isolated e2e subsets get recommended for a
 * branch's changed files. A subset or spec missing from it would never be recommended, and a prefix
 * pointing at a moved path would silently stop matching, so these tests keep it complete and real.
 */
import fs from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';

const REPOSITORY_ROOT = path.join(__dirname, '..');
const ISOLATED_DIRECTORY = path.join(__dirname, 'tests', 'isolated');
const MAPPING_PATH = path.join(ISOLATED_DIRECTORY, 'subset-sources.json');

const mapping: Record<string, string[]> = JSON.parse(fs.readFileSync(MAPPING_PATH, 'utf8'));
const keys = Object.keys(mapping);
const prefixEntries = keys.flatMap((key) => mapping[key].map((prefix) => [key, prefix]));

describe('subset-sources.json', () => {
  it('has an entry for every subset directory and every loose spec', () => {
    const expectedKeys = fs
      .readdirSync(ISOLATED_DIRECTORY, { withFileTypes: true })
      .filter((entry) => entry.isDirectory() || entry.name.endsWith('.spec.ts'))
      .map((entry) => entry.name);
    expect(expectedKeys.length).toBeGreaterThan(0);
    expect(expectedKeys.filter((name) => !keys.includes(name))).toEqual([]);
  });

  it.each(keys)('%s names a subset or spec that exists', (key) => {
    const stat = fs.statSync(path.join(ISOLATED_DIRECTORY, key), { throwIfNoEntry: false });
    if (key.endsWith('.spec.ts')) expect(stat?.isFile()).toBe(true);
    else expect(stat?.isDirectory()).toBe(true);
  });

  it.each(prefixEntries)('%s → %s exists', (_key, prefix) => {
    const stat = fs.statSync(path.join(REPOSITORY_ROOT, prefix), { throwIfNoEntry: false });
    if (prefix.endsWith('/')) expect(stat?.isDirectory()).toBe(true);
    else expect(stat?.isFile()).toBe(true);
  });

  it('lists each prefix once per key', () => {
    keys.forEach((key) => {
      expect(new Set(mapping[key]).size, key).toBe(mapping[key].length);
    });
  });
});
