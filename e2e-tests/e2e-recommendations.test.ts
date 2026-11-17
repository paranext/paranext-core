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
import { describe, expect, it } from 'vitest';
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
    const real: SubsetSources = JSON.parse(fs.readFileSync(MAPPING_PATH, 'utf8'));
    const report = recommend([EDITOR_WEB_VIEW], { sources: real });
    expect(recommendedKeys(report).filter(isZoomKey)).toEqual([]);
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
    'src/x/a.test.ts',
    'src/x/a.test-util.ts',
    'src/x/y.stories.tsx',
    'src/x/README.md',
    'src/x/guide.mdx',
    'src/x/types.d.ts',
    'src/x/__mocks__/z.ts',
    'src/x/__tests__/z.ts',
    'c-sharp/Foo.Tests/Bar.cs',
    'src/x/assets/logo.svg',
    'extensions/src/x/package.json',
    'extensions/src/x/manifest.json',
    'c-sharp/Foo.csproj',
    'c-sharp/Directory.Build.props',
    'src/x/.config/settings.ts',
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

  it('stays silent for a test-only, stories-only or docs-only change in a covered area', () => {
    [
      'src/renderer/components/docking/dock.component.test.tsx',
      'src/renderer/components/docking/dock.stories.tsx',
      'src/shared/services/README.md',
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
      coreSpecCount: 1,
      specCount: 2,
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

  it('flags a changed e2e spec or its support code, not other files under e2e-tests', () => {
    const changed = (file: string) => recommend([file]).specsChanged;
    expect(changed('e2e-tests/tests/isolated/docking/x.spec.ts')).toBe(true);
    expect(changed('e2e-tests/tests/isolated/docking/x.page.ts')).toBe(true);
    expect(changed('e2e-tests/fixtures/isolated.fixture.ts')).toBe(true);
    expect(changed('e2e-tests/tests/isolated/README.md')).toBe(false);
    expect(changed('e2e-tests/tests/isolated/subset-sources.json')).toBe(false);
    expect(changed('e2e-tests/e2e-recommendations.test.ts')).toBe(false);
    expect(changed('src/main/new-thing.ts')).toBe(false);
  });
});

describe('readGitChanges', () => {
  const runGit = (cwd: string, ...args: string[]) =>
    execFileSync('git', ['-c', 'user.name=Test', '-c', 'user.email=test@example.com', ...args], {
      cwd,
      encoding: 'utf8',
    }).trim();

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
      expect(() => readGitChanges(repoRoot, '--output=injected.txt')).toThrow(/injected\.txt/);
      expect(fs.existsSync(path.join(repoRoot, 'injected.txt'))).toBe(false);
    });
  });
});
