/**
 * Unit test that keeps the parked specs out of every Playwright run.
 *
 * Playwright's `testIgnore` silently skips a glob that matches nothing, so a renamed spec or a
 * mistyped entry would put a parked file back into the runs without any error, and a file carrying
 * a PARKED header could be listed nowhere. The second half checks that both configs still use the
 * list and that no config collects the parked `manage-books/` (destructive to real projects) and
 * `markers-checklist/` directories. It compares `testIgnore` entries and `testDir` paths; it does
 * not model Playwright's glob matching, so a project whose `testMatch` reaches into a parked
 * directory is not caught.
 */
import fs from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';
import { PARKED_ENHANCED_RESOURCES_SPECS } from './parked-enhanced-resources';
import cdpConfig from './playwright-cdp.config';
import mainConfig from './playwright.config';

const TESTS_DIRECTORY = path.join(__dirname, 'tests');
const SPEC_DIRECTORY = path.join(TESTS_DIRECTORY, 'enhanced-resources');
const ENTRY_PREFIX = '**/enhanced-resources/';
const PARKED_DIRECTORY_GLOBS = ['**/manage-books/**', '**/markers-checklist/**'];
const PARKED_DIRECTORIES = [
  path.join(TESTS_DIRECTORY, 'manage-books'),
  path.join(TESTS_DIRECTORY, 'markers-checklist'),
];

/** The string patterns of a Playwright `testIgnore` value, whichever of its shapes it takes. */
function stringPatterns(value: string | RegExp | (string | RegExp)[] | undefined): string[] {
  if (value === undefined) return [];
  return [value].flat().filter((pattern): pattern is string => typeof pattern === 'string');
}

/** Whether `inner` is `outer` itself or a path inside it. */
function isSameOrInside(inner: string, outer: string): boolean {
  const relative = path.relative(outer, inner);
  return relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative));
}

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

describe('both Playwright configs keep the parked specs out', () => {
  it('playwright-cdp.config.ts ignores every parked entry and both parked directories', () => {
    expect(stringPatterns(cdpConfig.testIgnore)).toEqual(
      expect.arrayContaining([...PARKED_ENHANCED_RESOURCES_SPECS, ...PARKED_DIRECTORY_GLOBS]),
    );
  });

  it("playwright.config.ts's enhanced-resources project covers that directory and ignores every parked entry", () => {
    const project = mainConfig.projects?.find(({ name }) => name === 'enhanced-resources');

    expect(project?.testDir && path.resolve(__dirname, project.testDir)).toBe(SPEC_DIRECTORY);
    expect(stringPatterns(project?.testIgnore)).toEqual(
      expect.arrayContaining(PARKED_ENHANCED_RESOURCES_SPECS),
    );
  });

  it('no playwright.config.ts project collects a parked directory', () => {
    const projects = mainConfig.projects ?? [];
    // A project without its own testDir inherits `tests/`, which holds the parked directories.
    const collectingTestDirectories = projects.map(({ name, testDir }) => ({
      name,
      directory: path.resolve(__dirname, testDir ?? mainConfig.testDir ?? '.'),
    }));
    const offending = collectingTestDirectories.filter(({ directory }) =>
      PARKED_DIRECTORIES.some(
        (parked) => isSameOrInside(directory, parked) || isSameOrInside(parked, directory),
      ),
    );

    expect(projects.length).toBeGreaterThan(0);
    expect(offending).toEqual([]);
  });
});
