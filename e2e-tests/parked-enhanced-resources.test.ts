/**
 * Unit test that keeps the parked specs out of every Playwright run.
 *
 * Playwright's `testIgnore` silently skips a glob that matches nothing, so a renamed spec or a
 * mistyped entry would put a parked file back into the runs without any error, and a file carrying
 * a PARKED header could be listed nowhere. The second half checks that `playwright-cdp.config.ts`
 * ignores the list and the parked `manage-books/` (destructive to real projects) and
 * `markers-checklist/` directories, and that no `playwright.config.ts` project collects those two
 * or `enhanced-resources/`. That last ban is deliberate: the Enhanced Resources specs attach to a
 * running app, which that config's globalSetup rejects, so a project there could never pass. Give
 * the directory a project only once its specs launch their own app, and change this test with it.
 * The checks compare `testIgnore` entries and `testDir` paths; they do not model Playwright's glob
 * matching, so a project whose `testMatch` reaches into one of those directories is not caught.
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
/**
 * Directories no `playwright.config.ts` project may collect: the two parked suites, and
 * `enhanced-resources/`, whose specs attach to a running app that config's globalSetup rejects.
 */
const DIRECTORIES_THE_MAIN_CONFIG_MUST_NOT_COLLECT = [
  path.join(TESTS_DIRECTORY, 'manage-books'),
  path.join(TESTS_DIRECTORY, 'markers-checklist'),
  SPEC_DIRECTORY,
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

describe('the Playwright configs keep the parked and attach-only specs out of the wrong runs', () => {
  it('playwright-cdp.config.ts ignores every parked entry and both parked directories', () => {
    expect(stringPatterns(cdpConfig.testIgnore)).toEqual(
      expect.arrayContaining([...PARKED_ENHANCED_RESOURCES_SPECS, ...PARKED_DIRECTORY_GLOBS]),
    );
  });

  // If this fails because a project for `tests/enhanced-resources/` was added: its specs attach
  // to a running app, which `playwright.config.ts`'s globalSetup rejects, so they run through
  // `playwright-cdp.config.ts` instead (see `tests/enhanced-resources/README.md`). Add a project
  // there only once those specs launch their own app, and update this test in the same change.
  it('no playwright.config.ts project collects manage-books, markers-checklist or enhanced-resources', () => {
    const projects = mainConfig.projects ?? [];
    // A project without its own testDir inherits `tests/`, which holds all three directories.
    const collectingTestDirectories = projects.map(({ name, testDir }) => ({
      name,
      directory: path.resolve(__dirname, testDir ?? mainConfig.testDir ?? '.'),
    }));
    const offending = collectingTestDirectories.filter(({ directory }) =>
      DIRECTORIES_THE_MAIN_CONFIG_MUST_NOT_COLLECT.some(
        (excluded) => isSameOrInside(directory, excluded) || isSameOrInside(excluded, directory),
      ),
    );

    expect(projects.length).toBeGreaterThan(0);
    expect(offending).toEqual([]);
  });
});
