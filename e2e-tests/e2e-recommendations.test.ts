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

/** `main` is the source a subset's specs exist to test; `incidental` is source they only drive. */
type SubsetSources = { main: string[]; incidental: string[] };

const mapping: Record<string, SubsetSources> = JSON.parse(fs.readFileSync(MAPPING_PATH, 'utf8'));
const keys = Object.keys(mapping);
const prefixEntries = keys.flatMap((key) =>
  [...mapping[key].main, ...mapping[key].incidental].map((prefix) => [key, prefix]),
);
const EDITOR_WEB_VIEW =
  'extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx';

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

  it.each(keys)('%s has exactly the lists main and incidental', (key) => {
    expect(Object.keys(mapping[key]).sort()).toEqual(['incidental', 'main']);
    expect(Array.isArray(mapping[key].main)).toBe(true);
    expect(Array.isArray(mapping[key].incidental)).toBe(true);
  });

  it('lists each prefix once per key, across main and incidental', () => {
    keys.forEach((key) => {
      const all = [...mapping[key].main, ...mapping[key].incidental];
      expect(new Set(all).size, key).toBe(all.length);
    });
  });

  it('does not count the editor web view as main source for the zoom subsets', () => {
    const zoomKeys = keys.filter(
      (key) =>
        key.startsWith('content-zoom-') ||
        key === 'notes-content-zoom' ||
        key === 'resources-content-zoom',
    );
    expect(zoomKeys.length).toBeGreaterThan(0);
    zoomKeys.forEach((key) => {
      const covering = mapping[key].main.filter((prefix) =>
        prefix.endsWith('/') ? EDITOR_WEB_VIEW.startsWith(prefix) : prefix === EDITOR_WEB_VIEW,
      );
      expect(covering, key).toEqual([]);
    });
  });
});
