/**
 * Unit test that keeps `PARKED_ENHANCED_RESOURCES_SPECS` in step with the spec files on disk.
 *
 * Playwright's `testIgnore` silently skips a glob that matches nothing, so a renamed spec or a
 * mistyped entry would put a parked file back into the runs without any error, and a file carrying
 * a PARKED header could be listed nowhere.
 */
import fs from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';
import { PARKED_ENHANCED_RESOURCES_SPECS } from './parked-enhanced-resources';

const SPEC_DIRECTORY = path.join(__dirname, 'tests', 'enhanced-resources');
const ENTRY_PREFIX = '**/enhanced-resources/';

const specFileNames = fs.readdirSync(SPEC_DIRECTORY).filter((name) => name.endsWith('.spec.ts'));

/** Whether the first comment block of a spec starts with the word PARKED (after an optional ⚠). */
function hasParkedHeader(fileName: string): boolean {
  const source = fs.readFileSync(path.join(SPEC_DIRECTORY, fileName), 'utf8');
  const headerLines = /^\/\*\*([\s\S]*?)\*\//.exec(source)?.[1].split('\n') ?? [];
  const firstText = headerLines
    .map((line) => line.replace(/^\s*\*?\s?/, '').trim())
    .find((line) => line.length > 0);
  return /^(⚠\s*)?PARKED\b/.test(firstText ?? '');
}

/** The spec file names an entry matches. An entry of any other shape matches none. */
function filesMatchedByEntry(entry: string): string[] {
  if (!entry.startsWith(ENTRY_PREFIX)) return [];
  const pattern = entry.slice(ENTRY_PREFIX.length);
  return specFileNames.filter((name) => name === pattern);
}

describe('parked Enhanced Resources specs', () => {
  it('lists every parked entry as a glob that matches exactly one existing spec file', () => {
    const unmatched = PARKED_ENHANCED_RESOURCES_SPECS.filter(
      (entry) => filesMatchedByEntry(entry).length !== 1,
    );

    expect(unmatched).toEqual([]);
  });

  it('lists every spec whose header says PARKED', () => {
    const matchedFiles = new Set(PARKED_ENHANCED_RESOURCES_SPECS.flatMap(filesMatchedByEntry));
    const unlisted = specFileNames.filter(
      (name) => hasParkedHeader(name) && !matchedFiles.has(name),
    );

    expect(unlisted).toEqual([]);
  });

  it('lists no spec that lacks a PARKED header', () => {
    const listedWithoutHeader = PARKED_ENHANCED_RESOURCES_SPECS.flatMap(filesMatchedByEntry).filter(
      (name) => !hasParkedHeader(name),
    );

    expect(listedWithoutHeader).toEqual([]);
  });

  it('finds the PARKED headers it checks against, so the header checks cannot pass on nothing', () => {
    expect(specFileNames.filter(hasParkedHeader).length).toBeGreaterThan(0);
  });
});
