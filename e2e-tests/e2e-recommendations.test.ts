/**
 * Unit tests for the mapping from isolated e2e subsets to the source paths they exercise.
 *
 * `tests/isolated/subset-sources.json` drives which isolated e2e subsets get recommended for a
 * branch's changed files. A subset or spec missing from it would never be recommended, and a prefix
 * pointing at a moved path would silently stop matching, so these tests keep it complete and real.
 */
import { execFileSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { describe, expect, it, vi } from 'vitest';
import {
  readGitChanges,
  recommendE2eTests,
  RecommendInput,
  SubsetSources,
} from './e2e-recommendations';

const REPOSITORY_ROOT = path.join(__dirname, '..');
const ISOLATED_DIRECTORY = path.join(__dirname, 'tests', 'isolated');
const MAPPING_PATH = path.join(ISOLATED_DIRECTORY, 'subset-sources.json');

const mapping: SubsetSources = JSON.parse(fs.readFileSync(MAPPING_PATH, 'utf8'));
const keys = Object.keys(mapping);
const prefixEntries = keys.flatMap((key) =>
  [...mapping[key].main, ...mapping[key].incidental].map((prefix) => [key, prefix]),
);
const isZoomKey = (key: string) => key.includes('zoom');
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

  // The recommender collapses these specs into one command only when each has a key of its own.
  it('has a key for every no-unasked-edits spec of the scripture editor', () => {
    const missing = fs
      .readdirSync(path.join(ISOLATED_DIRECTORY, 'scripture-editor'))
      .filter((name) => name.startsWith('no-unasked-edits-') && name.endsWith('.spec.ts'))
      .map((name) => `scripture-editor/${name}`)
      .filter((key) => !keys.includes(key));
    expect(missing).toEqual([]);
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

  // A key without main prefixes is never recommended, and nothing else would notice.
  it.each(keys)('%s lists main prefixes, each a non-empty string', (key) => {
    expect(mapping[key].main.length).toBeGreaterThan(0);
    [...mapping[key].main, ...mapping[key].incidental].forEach((prefix) => {
      expect(typeof prefix === 'string' && prefix.length > 0).toBe(true);
    });
  });

  it('lists each prefix once per key, across main and incidental', () => {
    keys.forEach((key) => {
      const all = [...mapping[key].main, ...mapping[key].incidental];
      expect({ key, size: new Set(all).size }).toEqual({ key, size: all.length });
    });
  });

  it('does not count the editor web view as main source for the zoom subsets', () => {
    const zoomKeys = keys.filter(isZoomKey);
    expect(zoomKeys.length).toBeGreaterThan(0);
    zoomKeys.forEach((key) => {
      const covering = mapping[key].main.filter((prefix) =>
        prefix.endsWith('/') ? EDITOR_WEB_VIEW.startsWith(prefix) : prefix === EDITOR_WEB_VIEW,
      );
      expect({ key, covering }).toEqual({ key, covering: [] });
    });
  });
});

const FIXTURE_SOURCES: SubsetSources = {
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
      alwaysCoreSpecCount: 2,
      editorCoreSpecCount: 0,
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
    const real: SubsetSources = JSON.parse(fs.readFileSync(MAPPING_PATH, 'utf8'));
    const report = recommend([EDITOR_WEB_VIEW], { sources: real });
    expect(recommendedKeys(report).filter(isZoomKey)).toEqual([]);
  });

  // A spec's test ids live in the component that renders them, often in `lib/`; the entry must list
  // that file or a change to the component recommends nothing.
  it.each([
    [
      'lib/platform-bible-react/src/components/advanced/navigation-history-buttons/navigation-history-buttons.component.tsx',
      'navigation-history',
    ],
    ['lib/platform-bible-react/src/components/advanced/toolbar.component.tsx', 'title-bar'],
    [
      'lib/platform-bible-react/src/components/advanced/marker-menu.component.tsx',
      'scripture-editor',
    ],
    [
      'lib/platform-bible-react/src/components/advanced/comment-list/comment-item.component.tsx',
      'comments-tab.spec.ts',
    ],
  ])('recommends the key whose spec drives %s in the real mapping', (file, expectedKey) => {
    const real: SubsetSources = JSON.parse(fs.readFileSync(MAPPING_PATH, 'utf8'));
    expect(recommendedKeys(recommend([file], { sources: real }))).toContain(expectedKey);
  });

  it('collapses the no-unasked-edits specs into one command in the real mapping', () => {
    const real: SubsetSources = JSON.parse(fs.readFileSync(MAPPING_PATH, 'utf8'));
    const editorDirectory = path.join(ISOLATED_DIRECTORY, 'scripture-editor');
    const specNames = fs
      .readdirSync(editorDirectory)
      .filter((name) => name.endsWith('.spec.ts'))
      .sort();
    const expectedMembers = specNames
      .filter((name) => name.startsWith('no-unasked-edits-'))
      .map((name) => `scripture-editor/${name}`);
    expect(expectedMembers.length).toBeGreaterThan(1);
    const report = recommend(['c-sharp/Projects/ParatextProjectDataProvider.cs'], {
      sources: real,
      specFilesBySubset: {
        'scripture-editor': specNames.map(
          (name) => `e2e-tests/tests/isolated/scripture-editor/${name}`,
        ),
      },
    });
    const collapsed = report.recommendations.filter(
      (recommendation) => recommendation.key === 'scripture-editor/no-unasked-edits-',
    );
    expect(collapsed).toHaveLength(1);
    expect(collapsed[0].command).toBe(
      'npm run test:e2e:isolated e2e-tests/tests/isolated/scripture-editor/no-unasked-edits-',
    );
    expect(collapsed[0].memberKeys).toEqual(expectedMembers);
    expect(collapsed[0].ci).toMatchObject({ kind: 'subset', specCount: expectedMembers.length });
    expect(recommendedKeys(report).filter((key) => key.includes('no-unasked-edits-'))).toEqual([
      'scripture-editor/no-unasked-edits-',
    ]);
  });

  it('collapses spec keys of one subset only when they matched the same files', () => {
    const sources: SubsetSources = {
      'a/x-one.spec.ts': { main: ['src/a/'], incidental: [] },
      'a/x-two.spec.ts': { main: ['src/a/', 'src/b/'], incidental: [] },
      'a/y.spec.ts': { main: ['src/a/'], incidental: [] },
    };
    const sameFiles = recommend(['src/a/f.ts'], { sources });
    // x-one, x-two and y share only "a/", which is not longer than the subset, so nothing collapses.
    expect(recommendedKeys(sameFiles)).toEqual([
      'a/x-one.spec.ts',
      'a/x-two.spec.ts',
      'a/y.spec.ts',
    ]);

    // x-one matched only f.ts, x-two matched f.ts and g.ts: their prefix "a/x-" is longer than the
    // subset, so only the differing files keep them apart.
    const differentFiles = recommend(['src/a/f.ts', 'src/b/g.ts'], {
      sources: {
        'a/x-one.spec.ts': { main: ['src/a/'], incidental: [] },
        'a/x-two.spec.ts': { main: ['src/a/', 'src/b/'], incidental: [] },
      },
    });
    expect(recommendedKeys(differentFiles)).toEqual(['a/x-one.spec.ts', 'a/x-two.spec.ts']);
    expect(differentFiles.recommendations.map((r) => r.memberKeys)).toEqual([undefined, undefined]);

    const split = recommend(['src/a/f.ts', 'src/b/g.ts'], {
      sources: {
        'a/x-one.spec.ts': { main: ['src/a/'], incidental: [] },
        'a/x-two.spec.ts': { main: ['src/b/'], incidental: [] },
      },
    });
    expect(recommendedKeys(split)).toEqual(['a/x-one.spec.ts', 'a/x-two.spec.ts']);
  });

  it('does not collapse when the prefix would also run a spec that did not match', () => {
    const sources: SubsetSources = {
      'a/x-one.spec.ts': { main: ['src/a/'], incidental: [] },
      'a/x-two.spec.ts': { main: ['src/a/'], incidental: [] },
    };
    const report = recommend(['src/a/f.ts'], {
      sources,
      specFilesBySubset: {
        a: [
          'e2e-tests/tests/isolated/a/x-one.spec.ts',
          'e2e-tests/tests/isolated/a/x-two.spec.ts',
          'e2e-tests/tests/isolated/a/x-three.spec.ts',
        ],
      },
    });
    expect(recommendedKeys(report)).toEqual(['a/x-one.spec.ts', 'a/x-two.spec.ts']);
  });

  it('collapses spec keys that matched the same files, counting CI specs', () => {
    const sources: SubsetSources = {
      'a/x-one.spec.ts': { main: ['src/a/'], incidental: [] },
      'a/x-two.spec.ts': { main: ['src/a/'], incidental: [] },
    };
    const report = recommend(['src/a/f.ts'], {
      sources,
      coreSpecs: ['e2e-tests/tests/isolated/a/x-one.spec.ts'],
      editorCoreSpecs: ['e2e-tests/tests/isolated/a/x-two.spec.ts'],
    });
    expect(report.recommendations).toEqual([
      {
        key: 'a/x-',
        command: 'npm run test:e2e:isolated e2e-tests/tests/isolated/a/x-',
        matchedFiles: ['src/a/f.ts'],
        ci: { kind: 'subset', alwaysCoreSpecCount: 1, editorCoreSpecCount: 1, specCount: 2 },
        memberKeys: ['a/x-one.spec.ts', 'a/x-two.spec.ts'],
      },
    ]);
  });

  it('checks the exact members of a nested spec key against the top-level group', () => {
    const sources: SubsetSources = {
      'a/b/x-one.spec.ts': { main: ['src/a/'], incidental: [] },
      'a/b/x-two.spec.ts': { main: ['src/a/'], incidental: [] },
    };
    const report = recommend(['src/a/f.ts'], {
      sources,
      specFilesBySubset: {
        a: [
          'e2e-tests/tests/isolated/a/b/x-one.spec.ts',
          'e2e-tests/tests/isolated/a/b/x-two.spec.ts',
          'e2e-tests/tests/isolated/a/b/x-three.spec.ts',
        ],
      },
    });
    expect(recommendedKeys(report)).toEqual(['a/b/x-one.spec.ts', 'a/b/x-two.spec.ts']);
  });

  it('keeps the full common prefix when the subset spec list is unknown', () => {
    const report = recommend(['src/a/f.ts'], {
      sources: {
        'a/chapter-marker-repair.spec.ts': { main: ['src/a/'], incidental: [] },
        'a/chapter-marker-restore.spec.ts': { main: ['src/a/'], incidental: [] },
      },
    });
    expect(recommendedKeys(report)).toEqual(['a/chapter-marker-re']);
  });

  it('trims a collapsed key back to a word boundary when that still runs only the members', () => {
    const sources: SubsetSources = {
      'a/chapter-marker-repair.spec.ts': { main: ['src/a/'], incidental: [] },
      'a/chapter-marker-restore.spec.ts': { main: ['src/a/'], incidental: [] },
    };
    const members = [
      'e2e-tests/tests/isolated/a/chapter-marker-repair.spec.ts',
      'e2e-tests/tests/isolated/a/chapter-marker-restore.spec.ts',
    ];
    const report = recommend(['src/a/f.ts'], {
      sources,
      specFilesBySubset: { a: members },
    });
    expect(recommendedKeys(report)).toEqual(['a/chapter-marker-']);
    expect(report.recommendations[0].command).toBe(
      'npm run test:e2e:isolated e2e-tests/tests/isolated/a/chapter-marker-',
    );

    // The boundary prefix would also run a third spec, so the longer key stays.
    const withThird = recommend(['src/a/f.ts'], {
      sources,
      specFilesBySubset: {
        a: [...members, 'e2e-tests/tests/isolated/a/chapter-marker-empty.spec.ts'],
      },
    });
    expect(recommendedKeys(withThird)).toEqual(['a/chapter-marker-re']);
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

  it('ignores files outside the source roots and localized strings as uncovered', () => {
    const report = recommend([
      'README.md',
      'lib/platform-bible-utils/src/x.ts',
      'extensions/src/x/contributions/localizedStrings.json',
    ]);
    expect(report.recommendations).toEqual([]);
    expect(report.uncoveredFiles).toEqual([]);
  });

  it.each([
    'src/main/app-chords.util.test.ts',
    'src/main/settings-stub.test-util.ts',
    'extensions/src/legacy-comment-manager/src/comment-list.stories.tsx',
    'c-sharp/README.md',
    // No tracked .mdx file sits outside src/stories/, so this row stays synthetic.
    'src/x/guide.mdx',
    'src/renderer/window-controls-overlay.d.ts',
    'src/shared/services/__mocks__/logger.service.ts',
    'src/main/services/__tests__/service-router-test.util.ts',
    'c-sharp/Paranext.Analyzers.Tests/Rules/BanDynamicAnalyzerTests.cs',
    'extensions/src/hello-rock3/assets/offline.svg',
    'extensions/src/hello-rock3/package.json',
    'extensions/src/c-sharp-provider-test/manifest.json',
    'c-sharp/ParanextDataProvider.csproj',
    'c-sharp/Directory.Build.props',
    // No tracked dot-directory sits at this depth under src/, so this row stays synthetic.
    'src/x/.config/settings.ts',
    'extensions/src/platform-get-resources/src/get-resources.web-view.test-utils.tsx',
    'extensions/src/legacy-comment-manager/src/comment-draft.fixtures.ts',
    'c-sharp/ParanextDataProvider.sln',
    'c-sharp/ParanextDataProvider.sln.DotSettings',
    'c-sharp/ai-analyzers.globalconfig',
    'c-sharp/Paranext.Analyzers/DiagnosticIds.cs',
    'c-sharp/Paranext.Analyzers/Rules/BanTraceAnalyzer.cs',
    'extensions/src/hello-rock3/.eslintrc.js',
    'extensions/src/hello-rock3/.prettierrc.js',
    'extensions/src/hello-rock3/.stylelintrc.js',
    'extensions/src/hello-rock3/.eslintignore',
    'extensions/src/hello-rock3/.prettierignore',
    'extensions/src/hello-rock3/.stylelintignore',
    'extensions/src/hello-rock3/.gitignore',
    'extensions/src/hello-rock3/tsconfig.json',
    'extensions/src/hello-rock3/tsconfig.lint.json',
    'extensions/src/hello-rock3/cspell.json',
    'c-sharp/.csharpierrc.yml',
    'c-sharp/.lintstagedrc.yml',
    'c-sharp/.config/dotnet-tools.json',
    'extensions/src/hello-rock3/.editorconfig',
    'extensions/src/hello-rock3/.gitattributes',
    'extensions/src/hello-rock3/.github/CODEOWNERS',
    'extensions/src/hello-rock3/.github/workflows/lint.yml',
    'extensions/src/hello-rock3/.github/actions/bump-versions-action/action.yml',
    'extensions/src/hello-rock3/.vscode/settings.json',
    'extensions/src/hello-rock3/LICENSE',
    'extensions/src/hello-rock3/lib/bump-versions.ts',
    'extensions/src/hello-rock3/lib/git.util.ts',
    'src/stories/platform/ten-layout-shared.tsx',
    'src/stories/keyboard-shortcuts-catalog/keyboard-shortcut-keycaps.util.ts',
    'src/stories/design-ideas/home-unified.component.tsx',
    'extensions/src/platform-enhanced-resources/src/data/media-tab.story-data.ts',
    'extensions/src/platform-scripture/src/data/checklist.story-data.ts',
  ])('treats %s as non-runtime: uncovered nowhere, recommends nothing', (file) => {
    const report = recommend([file], {
      sources: {
        everything: { main: ['src/', 'extensions/src/', 'c-sharp/'], incidental: [] },
        other: { main: [], incidental: ['src/', 'extensions/src/', 'c-sharp/'] },
      },
      filesAddingCommandRegistrations: [file],
    });
    expect(report.recommendations).toEqual([]);
    expect(report.alsoExercised).toEqual([]);
    expect(report.uncoveredFiles).toEqual([]);
    expect(report.entryPointFiles).toEqual([]);
  });

  // Build configuration changes what the bundle contains, so it stays runtime like the code and
  // contribution data it sits beside.
  it.each([
    'extensions/src/hello-rock3/webpack.config.ts',
    'extensions/src/hello-rock3/webpack/webpack.config.base.ts',
    'extensions/src/hello-rock3/postcss.config.ts',
    'extensions/src/hello-rock3/tailwind.config.ts',
    'extensions/src/hello-rock3/src/tailwind.css',
    'extensions/src/hello-rock3/contributions/menus.json',
    'extensions/src/hello-rock3/assets/displayData.json',
    // Its postinstall step fetches the database the extension ships.
    'extensions/src/platform-lexical-tools/lib/download-db.ts',
    // Named after tests, but the renderer imports them.
    'src/renderer/testing/test-panel.component.tsx',
    'src/renderer/context/papi-context/test.context.ts',
    'src/renderer/components/docking/platform-dock-layout-storage.util.ts',
    'c-sharp/icon.ico',
    // No tracked file has this shape; it pins that the TypeScript-configuration match ends at
    // `.json`.
    'src/x/tsconfig-helper.ts',
  ])('treats %s as runtime: uncovered when no prefix lists it', (file) => {
    expect(recommend([file], { sources: {} }).uncoveredFiles).toEqual([file]);
  });

  it('still matches a top-level dot-directory, which holds the app build configuration', () => {
    const file = '.erb/configs/webpack.config.renderer.dev.ts';
    const report = recommend([file], {
      sources: { build: { main: ['.erb/configs/'], incidental: [] } },
    });
    expect(recommendedKeys(report)).toEqual(['build']);
  });

  it('stays silent for a test-only, stories-only or docs-only change in a covered area', () => {
    [
      'src/renderer/components/dialogs/alert-dialog.component.test.tsx',
      'src/renderer/components/dialogs/team-layout.stories.tsx',
      'src/renderer/hooks/README.md',
    ].forEach((file) => {
      const report = recommend([file]);
      expect({ file, keys: recommendedKeys(report) }).toEqual({ file, keys: [] });
      expect({ file, alsoExercised: report.alsoExercised }).toEqual({ file, alsoExercised: [] });
    });
  });

  it('still matches localized strings so visible-text locators are covered', () => {
    const report = recommend([
      'extensions/src/platform-scripture/contributions/localizedStrings.json',
    ]);
    expect(recommendedKeys(report)).toEqual(['find']);
    expect(report.uncoveredFiles).toEqual([]);
  });

  it('only counts registrations inside the source roots', () => {
    const report = recommend([], {
      filesAddingCommandRegistrations: [
        'lib/platform-bible-react/dist/index.js',
        'lib/eslint-rules/x.ts',
        'src/main/commands.test.ts',
        'extensions/src/foo/src/main.ts',
      ],
    });
    expect(report.entryPointFiles).toEqual(['extensions/src/foo/src/main.ts']);
  });

  it('reports runtime data under an assets directory as uncovered, not images', () => {
    expect(recommend(['c-sharp/assets/usfm.sty']).uncoveredFiles).toEqual([
      'c-sharp/assets/usfm.sty',
    ]);
  });

  it('counts a spec listed only in the editor core list toward its subset', () => {
    const report = recommend(['src/renderer/components/docking/dock.tsx'], {
      editorCoreSpecs: ['e2e-tests/tests/isolated/docking/a.spec.ts'],
      specFilesBySubset: {
        docking: [
          'e2e-tests/tests/isolated/docking/a.spec.ts',
          'e2e-tests/tests/isolated/docking/b.spec.ts',
        ],
      },
    });
    expect(report.recommendations[0].ci).toEqual({
      kind: 'subset',
      alwaysCoreSpecCount: 0,
      editorCoreSpecCount: 1,
      specCount: 2,
    });
  });

  it('counts always-run and editor-list specs of a subset separately', () => {
    const report = recommend(['src/renderer/components/docking/dock.tsx'], {
      coreSpecs: ['e2e-tests/tests/isolated/docking/a.spec.ts'],
      editorCoreSpecs: [
        'e2e-tests/tests/isolated/docking/b.spec.ts',
        'e2e-tests/tests/isolated/docking/c.spec.ts',
      ],
      specFilesBySubset: {
        docking: [
          'e2e-tests/tests/isolated/docking/a.spec.ts',
          'e2e-tests/tests/isolated/docking/b.spec.ts',
          'e2e-tests/tests/isolated/docking/c.spec.ts',
          'e2e-tests/tests/isolated/docking/d.spec.ts',
        ],
      },
    });
    expect(report.recommendations[0].ci).toEqual({
      kind: 'subset',
      alwaysCoreSpecCount: 1,
      editorCoreSpecCount: 2,
      specCount: 4,
    });
  });

  it('does not report a file only an incidental prefix lists as uncovered', () => {
    const report = recommend(['src/shared/services/x.ts']);
    expect(report.uncoveredFiles).toEqual([]);
    expect(recommendedKeys(report)).toEqual([]);
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

  it('reports the core menu data file as an entry point', () => {
    expect(recommend(['src/extension-host/data/menu.data.json']).entryPointFiles).toEqual([
      'src/extension-host/data/menu.data.json',
    ]);
  });

  it.each([
    'e2e-tests/tests/isolated/docking/x.spec.ts',
    'e2e-tests/tests/isolated/docking/x.page.ts',
    'e2e-tests/tests/isolated/docking/docking-helpers.ts',
    'e2e-tests/tests/isolated/multi-window/multi-window.util.ts',
    'e2e-tests/tests/isolated/internet-settings.page.ts',
    'e2e-tests/fixtures/isolated.fixture.ts',
    'e2e-tests/global-setup.ts',
    'e2e-tests/playwright.config.ts',
    'e2e-tests/playwright-cdp.config.ts',
    'e2e-tests/global-teardown.ts',
    'e2e-tests/reporters/no-silent-skips.reporter.ts',
  ])('flags %s as a changed e2e spec or its support code', (file) => {
    expect(recommend([file]).specsChanged).toBe(true);
  });

  it.each([
    'e2e-tests/tests/isolated/README.md',
    'e2e-tests/tests/isolated/subset-sources.json',
    'e2e-tests/tests/isolated/docking/x.test.ts',
    'e2e-tests/e2e-recommendations.test.ts',
    'e2e-tests/e2e-recommendations.ts',
    'e2e-tests/global-setup.test.ts',
    'e2e-tests/reporters/no-silent-skips.reporter.test.ts',
    'e2e-tests/fixtures/poll-retry.test.ts',
    'e2e-tests/core-specs.txt',
    'src/main/new-thing.ts',
  ])('does not flag %s as a changed e2e spec or its support code', (file) => {
    expect(recommend([file]).specsChanged).toBe(false);
  });
});

// The rows above pin the shapes someone thought of; this sweep catches the ones nobody did, by
// running the classifier over every tracked file under the source roots.
describe('classifying the tracked source files', () => {
  // Extensions of the files the app loads or bundles from the source roots, taken from what is
  // tracked there: code, style sheets, markup, the data the .NET data provider reads, and images.
  const LOADED_EXTENSIONS = new Set([
    'cs',
    'css',
    'ejs',
    'html',
    'ico',
    'js',
    'json',
    'ldml',
    'png',
    'scss',
    'sfm',
    'sty',
    'svg',
    'ts',
    'tsx',
    'txt',
    'vrs',
    'xml',
    'zip',
  ]);
  // Shapes that are never app code, whatever the extension.
  const NOT_APP_CODE = [
    /(^|\/)\.[^/]/, // A dotfile or a file in a dot-directory (`.github/`, `.vscode/`).
    /(^|\/)LICENSE$/,
    /\.mdx?$/,
    /\.(test|stories|story-data)\./,
    /(^|\/)__(tests|mocks)__\//,
    /^src\/stories\//,
  ];

  const extensionOf = (file: string) => {
    const basename = file.slice(file.lastIndexOf('/') + 1);
    return basename.includes('.')
      ? basename.slice(basename.lastIndexOf('.') + 1).toLowerCase()
      : '';
  };
  const isPlainlyNotAppCode = (file: string) =>
    !LOADED_EXTENSIONS.has(extensionOf(file)) || NOT_APP_CODE.some((shape) => shape.test(file));

  it('recognizes plain non-app files and passes app code', () => {
    expect(isPlainlyNotAppCode('extensions/src/hello-rock3/.github/CODEOWNERS')).toBe(true);
    expect(isPlainlyNotAppCode('extensions/src/hello-rock3/.stylelintignore')).toBe(true);
    expect(isPlainlyNotAppCode('extensions/src/hello-rock3/LICENSE')).toBe(true);
    expect(isPlainlyNotAppCode('src/stories/platform/ten-layout-shared.tsx')).toBe(true);
    expect(isPlainlyNotAppCode('src/renderer/context/papi-context/test.context.ts')).toBe(false);
    expect(isPlainlyNotAppCode('c-sharp/assets/usfm.sty')).toBe(false);
  });

  it('treats every tracked file that is plainly not app code as non-runtime', () => {
    const tracked = execFileSync(
      'git',
      [
        '-C',
        REPOSITORY_ROOT,
        '-c',
        'core.quotePath=false',
        'ls-files',
        '--',
        'src',
        'extensions/src',
        'c-sharp',
      ],
      { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 },
    )
      .split('\n')
      .filter((file) => file !== '');
    // With no prefixes, every runtime file in a source root is reported as uncovered.
    const runtime = recommend(tracked, { sources: {} }).uncoveredFiles;
    expect(runtime).toContain('src/main/main.ts');
    expect(runtime).toContain('c-sharp/Program.cs');

    // One path per line, so a failure lists every file the classifier treats as runtime code.
    expect(runtime.filter(isPlainlyNotAppCode).join('\n')).toBe('');
  });
});

describe('readGitChanges', () => {
  const runGit = (cwd: string, ...args: string[]) =>
    execFileSync(
      'git',
      [
        '-c',
        'user.name=Test',
        '-c',
        'user.email=test@example.com',
        // Keep the user's global signing and hook settings out of the throwaway repository.
        '-c',
        'commit.gpgsign=false',
        '-c',
        'core.hooksPath=/dev/null',
        ...args,
      ],
      { cwd, encoding: 'utf8' },
    ).trim();

  function writeFile(repoRoot: string, file: string, content: string) {
    fs.mkdirSync(path.dirname(path.join(repoRoot, file)), { recursive: true });
    fs.writeFileSync(path.join(repoRoot, file), content);
  }

  /** Runs `body` against a throwaway repository with one commit, then removes it. */
  function withTemporaryRepository(body: (repoRoot: string, baseSha: string) => void) {
    const repoRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'e2e-recommendations-'));
    try {
      runGit(repoRoot, 'init', '--quiet');
      writeFile(repoRoot, 'src/renderer/components/docking/dock.tsx', 'export const dock = 1;\n');
      writeFile(repoRoot, 'c-sharp/Projects/Service.cs', 'Send(\n"command:a");\n');
      runGit(repoRoot, 'add', '-A');
      runGit(repoRoot, 'commit', '--quiet', '-m', 'base');
      body(repoRoot, runGit(repoRoot, 'rev-parse', 'HEAD'));
    } finally {
      fs.rmSync(repoRoot, { recursive: true, force: true });
    }
  }

  it('lists a renamed file under its old path as well as its new one', () => {
    withTemporaryRepository((repoRoot, baseSha) => {
      fs.mkdirSync(path.join(repoRoot, 'src/main'), { recursive: true });
      runGit(repoRoot, 'mv', 'src/renderer/components/docking/dock.tsx', 'src/main/dock.tsx');
      const { changedFiles } = readGitChanges(repoRoot, baseSha);
      expect(changedFiles).toContain('src/renderer/components/docking/dock.tsx');
      expect(changedFiles).toContain('src/main/dock.tsx');
    });
  });

  it('includes an untracked file and the registration it contains', () => {
    withTemporaryRepository((repoRoot, baseSha) => {
      writeFile(repoRoot, 'src/main/new.ts', "registerCommand('a', b);\n");
      writeFile(repoRoot, 'src/main/plain.ts', 'export const a = 1;\n');
      const changes = readGitChanges(repoRoot, baseSha);
      expect(changes.changedFiles).toEqual(
        expect.arrayContaining(['src/main/new.ts', 'src/main/plain.ts']),
      );
      expect(changes.filesAddingCommandRegistrations).toEqual(['src/main/new.ts']);
    });
  });

  it('flags a C# request handler registration, not a call that only sends a command', () => {
    withTemporaryRepository((repoRoot, baseSha) => {
      writeFile(
        repoRoot,
        'c-sharp/Projects/Service.cs',
        'Send(\n"command:a");\nawait Client.RegisterRequestHandlerAsync(\n"command:b", h);\n',
      );
      writeFile(repoRoot, 'c-sharp/Other/Sender.cs', 'Send("command:c");\n');
      runGit(repoRoot, 'add', '-N', 'c-sharp/Other/Sender.cs');
      expect(readGitChanges(repoRoot, baseSha).filesAddingCommandRegistrations).toEqual([
        'c-sharp/Projects/Service.cs',
      ]);
    });
  });

  it('treats a ref that starts with a dash as a ref, not an option', () => {
    withTemporaryRepository((repoRoot) => {
      expect(() => readGitChanges(repoRoot, '--output=injected.txt')).toThrow();
      expect(fs.existsSync(path.join(repoRoot, 'injected.txt'))).toBe(false);
    });
  });

  it('lists a file with a non-ASCII name as written, tracked or untracked', () => {
    withTemporaryRepository((repoRoot, baseSha) => {
      writeFile(repoRoot, 'src/main/café.ts', 'export const a = 1;\n');
      runGit(repoRoot, 'add', '-N', 'src/main/café.ts');
      writeFile(repoRoot, 'src/main/naïve.ts', 'export const b = 1;\n');
      const { changedFiles } = readGitChanges(repoRoot, baseSha);
      expect(changedFiles).toEqual(
        expect.arrayContaining(['src/main/café.ts', 'src/main/naïve.ts']),
      );
    });
  });

  // Creating a symbolic link needs elevated rights on Windows.
  it.skipIf(process.platform === 'win32')(
    'says on stderr when it cannot read an untracked file, and still lists the file',
    () => {
      withTemporaryRepository((repoRoot, baseSha) => {
        // A dangling symbolic link is untracked and cannot be read.
        fs.symlinkSync(
          path.join(repoRoot, 'missing-target'),
          path.join(repoRoot, 'src/main-link.ts'),
        );
        const written: string[] = [];
        const spy = vi.spyOn(process.stderr, 'write').mockImplementation((chunk) => {
          written.push(String(chunk));
          return true;
        });
        try {
          const { changedFiles } = readGitChanges(repoRoot, baseSha);
          expect(changedFiles).toContain('src/main-link.ts');
        } finally {
          spy.mockRestore();
        }
        expect(written.join('')).toContain(
          'e2e-recommendations: could not read untracked file src/main-link.ts: ',
        );
      });
    },
  );
});

describe('command-line entry point', () => {
  // Creating a symbolic link needs elevated rights on Windows.
  it.skipIf(process.platform === 'win32')(
    'runs when started through a symbolic link to the module',
    () => {
      const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'e2e-recommendations-link-'));
      try {
        const link = path.join(directory, 'linked-recommendations.ts');
        fs.symlinkSync(path.join(__dirname, 'e2e-recommendations.ts'), link);
        const output = execFileSync(process.execPath, ['--import', 'tsx', link, 'HEAD'], {
          cwd: REPOSITORY_ROOT,
          encoding: 'utf8',
          timeout: 120_000,
        });
        expect(JSON.parse(output)).toHaveProperty('recommendations');
      } finally {
        fs.rmSync(directory, { recursive: true, force: true });
      }
    },
    150_000,
  );
});
