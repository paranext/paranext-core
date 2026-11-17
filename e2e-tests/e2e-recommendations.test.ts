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
import { recommendE2eTests, RecommendInput, SubsetSources as Sources } from './e2e-recommendations';

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
    expect(key.endsWith('.spec.ts') ? stat?.isFile() : stat?.isDirectory()).toBe(true);
  });

  it.each(prefixEntries)('%s → %s exists', (_key, prefix) => {
    const stat = fs.statSync(path.join(REPOSITORY_ROOT, prefix), { throwIfNoEntry: false });
    expect(prefix.endsWith('/') ? stat?.isDirectory() : stat?.isFile()).toBe(true);
  });

  it.each(keys)('%s has exactly the lists main and incidental', (key) => {
    expect(Object.keys(mapping[key]).sort()).toEqual(['incidental', 'main']);
    expect(Array.isArray(mapping[key].main)).toBe(true);
    expect(Array.isArray(mapping[key].incidental)).toBe(true);
  });

  it('lists each prefix once per key, across main and incidental', () => {
    keys.forEach((key) => {
      const all = [...mapping[key].main, ...mapping[key].incidental];
      expect({ key, size: new Set(all).size }).toEqual({ key, size: all.length });
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
      expect({ key, covering }).toEqual({ key, covering: [] });
    });
  });
});

const FIXTURE_SOURCES: Sources = {
  docking: { main: ['src/renderer/components/docking/'], incidental: [] },
  'scripture-editor': { main: ['extensions/src/platform-scripture-editor/'], incidental: [] },
  'scripture-editor/no-unasked.spec.ts': {
    main: ['extensions/src/platform-scripture-editor/src/no-unasked.ts'],
    incidental: [],
  },
  'comments-tab.spec.ts': {
    main: ['extensions/src/legacy-comment-manager/'],
    incidental: ['src/shared/services/'],
  },
  find: { main: ['extensions/src/platform-scripture/'], incidental: ['src/shared/services/'] },
};

function recommend(changedFiles: string[], overrides: Partial<RecommendInput> = {}) {
  return recommendE2eTests({
    changedFiles,
    filesAddingCommandRegistrations: [],
    sources: FIXTURE_SOURCES,
    coreSpecs: [],
    editorCoreSpecs: [],
    specFilesBySubset: {},
    ...overrides,
  });
}

const recommendedKeys = (report: ReturnType<typeof recommend>) =>
  report.recommendations.map((recommendation) => recommendation.key);

describe('recommendE2eTests', () => {
  it('recommends only the subset a docking change touches, with its CI status', () => {
    const report = recommend(['src/renderer/components/docking/dock.tsx'], {
      coreSpecs: [
        'e2e-tests/tests/isolated/docking/a.spec.ts',
        'e2e-tests/tests/isolated/docking/b.spec.ts',
      ],
      specFilesBySubset: {
        docking: [
          'e2e-tests/tests/isolated/docking/a.spec.ts',
          'e2e-tests/tests/isolated/docking/b.spec.ts',
          'e2e-tests/tests/isolated/docking/c.spec.ts',
        ],
      },
    });
    expect(recommendedKeys(report)).toEqual(['docking']);
    expect(report.recommendations[0].command).toBe('npm run test:e2e:isolated docking');
    expect(report.recommendations[0].ci).toEqual({
      kind: 'subset',
      coreSpecCount: 2,
      specCount: 3,
    });
    expect(report.recommendations[0].matchedFiles).toEqual([
      'src/renderer/components/docking/dock.tsx',
    ]);
  });

  it('lets a file-level key win over its subset for the same file', () => {
    const report = recommend([
      'extensions/src/platform-scripture-editor/src/no-unasked.ts',
      'extensions/src/platform-scripture-editor/src/other.ts',
    ]);
    expect(recommendedKeys(report)).toEqual([
      'scripture-editor',
      'scripture-editor/no-unasked.spec.ts',
    ]);
    expect(report.recommendations[0].matchedFiles).toEqual([
      'extensions/src/platform-scripture-editor/src/other.ts',
    ]);
    expect(report.recommendations[1].matchedFiles).toEqual([
      'extensions/src/platform-scripture-editor/src/no-unasked.ts',
    ]);
  });

  it('does not recommend the subset when every changed file reaches a file-level key', () => {
    const report = recommend(['extensions/src/platform-scripture-editor/src/no-unasked.ts']);
    expect(recommendedKeys(report)).toEqual(['scripture-editor/no-unasked.spec.ts']);
    expect(report.recommendations[0].command).toBe(
      'npm run test:e2e:isolated e2e-tests/tests/isolated/scripture-editor/no-unasked.spec.ts',
    );
  });

  it('puts keys matched only through incidental into alsoExercised', () => {
    const report = recommend([
      'src/shared/services/x.ts',
      'extensions/src/platform-scripture/a.ts',
    ]);
    expect(recommendedKeys(report)).toEqual(['find']);
    expect(report.alsoExercised).toEqual([
      { key: 'comments-tab.spec.ts', matchedFiles: ['src/shared/services/x.ts'] },
    ]);
  });

  it('lists a key matched through both main and incidental only as a recommendation', () => {
    const report = recommend([
      'extensions/src/legacy-comment-manager/a.ts',
      'src/shared/services/x.ts',
    ]);
    expect(recommendedKeys(report)).toContain('comments-tab.spec.ts');
    expect(report.alsoExercised.map((entry) => entry.key)).not.toContain('comments-tab.spec.ts');
  });

  it('does not recommend zoom subsets for the editor web view in the real mapping', () => {
    const real: Sources = JSON.parse(fs.readFileSync(MAPPING_PATH, 'utf8'));
    const report = recommend([EDITOR_WEB_VIEW], { sources: real });
    const zoomKeys = (candidates: string[]) =>
      candidates.filter(
        (key) =>
          key.startsWith('content-zoom-') ||
          key === 'notes-content-zoom' ||
          key === 'resources-content-zoom',
      );
    expect(zoomKeys(recommendedKeys(report))).toEqual([]);
  });

  it('matches a deleted path that is not on disk', () => {
    expect(recommendedKeys(recommend(['src/renderer/components/docking/gone.tsx']))).toEqual([
      'docking',
    ]);
  });

  it('reports the core list a spec key belongs to', () => {
    const key = 'comments-tab.spec.ts';
    const specPath = `e2e-tests/tests/isolated/${key}`;
    const files = ['extensions/src/legacy-comment-manager/a.ts'];
    expect(recommend(files, { coreSpecs: [specPath] }).recommendations[0].ci).toEqual({
      kind: 'spec',
      coreList: 'always',
    });
    expect(recommend(files, { editorCoreSpecs: [specPath] }).recommendations[0].ci).toEqual({
      kind: 'spec',
      coreList: 'editor',
    });
    expect(recommend(files).recommendations[0].ci).toEqual({ kind: 'spec', coreList: 'none' });
  });

  it('ignores files outside the source roots, tests, docs and localized strings', () => {
    const report = recommend([
      'README.md',
      'lib/platform-bible-utils/src/x.ts',
      'src/a.test.ts',
      'extensions/src/x/contributions/localizedStrings.json',
    ]);
    expect(report.recommendations).toEqual([]);
    expect(report.uncoveredFiles).toEqual([]);
  });

  it('reports a source file that matches no prefix as uncovered', () => {
    expect(recommend(['src/main/new-thing.ts']).uncoveredFiles).toEqual(['src/main/new-thing.ts']);
  });

  it('reports menus, web view providers and command registrations as entry points', () => {
    const report = recommend(
      [
        'extensions/src/foo/contributions/menus.json',
        'extensions/src/foo/foo.web-view-provider.ts',
      ],
      { filesAddingCommandRegistrations: ['src/main/commands.ts', 'src/main/commands.ts'] },
    );
    expect(report.entryPointFiles).toEqual([
      'extensions/src/foo/contributions/menus.json',
      'extensions/src/foo/foo.web-view-provider.ts',
      'src/main/commands.ts',
    ]);
  });

  it('flags a changed e2e spec', () => {
    expect(recommend(['e2e-tests/tests/isolated/docking/x.spec.ts']).specsChanged).toBe(true);
    expect(recommend(['src/main/new-thing.ts']).specsChanged).toBe(false);
  });
});
