/**
 * Unit test that keeps CI's core e2e spec lists pointing at real specs.
 *
 * The `e2e-core` job in `.github/workflows/test.yml` hands each listed path to Playwright as a
 * filter, and a filter that matches nothing is silently ignored while the other entries still run.
 * So a spec renamed or deleted without updating these lists would drop out of the job with no
 * error, and the job only reports. This test fails on the pull request that makes the list stale.
 */
import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';

const REPOSITORY_ROOT = path.join(__dirname, '..');
const EDITOR_LIST = 'core-specs-editor.txt';
const SPEC_LISTS = ['core-specs.txt', EDITOR_LIST];
const ISOLATED_PREFIX = 'e2e-tests/tests/isolated/';

/**
 * The entries of a spec list: one repository path per line; `#` starts a comment line. Lines are
 * returned untrimmed, as the workflow reads them.
 */
function readSpecList(listName: string): string[] {
  return fs
    .readFileSync(path.join(__dirname, listName), 'utf8')
    .split('\n')
    .filter((line) => line.trim() !== '' && !line.startsWith('#'));
}

/**
 * The entries of `editor_paths` in `.github/workflows/test.yml`'s `e2e-core-selection` job, one per
 * `editor_paths+=('…')` line: the paths whose change makes the pull-request job run
 * `core-specs-editor.txt` too. Each is POSIX ERE (for `grep -E`), whose syntax these entries share
 * with JavaScript.
 */
function readEditorPathEntries(): string[] {
  const workflow = fs.readFileSync(
    path.join(REPOSITORY_ROOT, '.github', 'workflows', 'test.yml'),
    'utf8',
  );
  const entries = [...workflow.matchAll(/^\s*editor_paths\+=\('([^']+)'\)\s*$/gm)].map(
    (match) => match[1],
  );
  if (entries.length === 0) throw new Error("test.yml has no editor_paths+=('…') lines");
  return entries;
}

/** The pattern the workflow builds from the entries: `^(` + the entries joined with `|` + `)`. */
function editorPathsPattern(entries: string[]): RegExp {
  return new RegExp(`^(${entries.join('|')})`);
}

let trackedFilesCache: string[] | undefined;

/** Every path git tracks, as the pull request's changed-files list would name it. */
function trackedFiles(): string[] {
  trackedFilesCache ??= execFileSync('git', ['-C', REPOSITORY_ROOT, 'ls-files'], {
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  })
    .split('\n')
    .filter((line) => line !== '');
  return trackedFilesCache;
}

// Renaming a list and updating only SPEC_LISTS would leave the workflow naming a file that no
// longer exists (or never naming the new one), so the two sets must stay equal.
it('names exactly the SPEC_LISTS files in test.yml', () => {
  const workflow = fs.readFileSync(
    path.join(REPOSITORY_ROOT, '.github', 'workflows', 'test.yml'),
    'utf8',
  );
  const named = new Set(workflow.match(/e2e-tests\/core-specs[A-Za-z0-9_-]*\.txt/g) ?? []);
  expect([...named].sort()).toEqual(SPEC_LISTS.map((list) => `e2e-tests/${list}`).sort());
});

describe('the editor list trigger in test.yml', () => {
  const entries = readEditorPathEntries();
  const editorPaths = editorPathsPattern(entries);

  // An entry that matches no file silently stops triggering the editor list — after a rename, for
  // instance — and the job only reports, so nothing else would notice. Each entry names one thing,
  // so this checks every one of them.
  it.each(entries)('%s matches a file in the repository', (entry) => {
    const entryPattern = new RegExp(`^(${entry})`);
    expect(
      trackedFiles().some((file) => entryPattern.test(file)),
      `No tracked file matches the editor_paths entry '${entry}': update editor_paths in ` +
        '.github/workflows/test.yml to the path the editor now uses.',
    ).toBe(true);
  });

  // A pull request that changes one of the editor-list specs, or the list itself, must run that
  // list; the pattern names them by hand, so it has to follow the list.
  it.each([...readSpecList(EDITOR_LIST), `e2e-tests/${EDITOR_LIST}`])(
    'runs the editor list when %s changes',
    (changedPath) => {
      expect(editorPaths.test(changedPath)).toBe(true);
    },
  );

  // One row per entry, so dropping any one of them fails its own row.
  it.each([
    'extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx',
    'dev-packages.json',
    `e2e-tests/${EDITOR_LIST}`,
    'e2e-tests/fixtures/no-unasked-edits.body.ts',
    'e2e-tests/fixtures/project-write-judging.ts',
    'e2e-tests/fixtures/usfm-units.ts',
    'e2e-tests/tests/isolated/scripture-editor/no-unasked-edits-power-standard.spec.ts',
    'e2e-tests/tests/isolated/scripture-editor/no-unasked-edits-simple-paragraph-structure.spec.ts',
    'extensions/src/platform-scripture/src/project-data-provider/platform-scripture-extender-pdpe.model.ts',
    'src/node/polyfills/dom-globals.polyfill.ts',
    'c-sharp/Projects/ParatextProjectDataProvider.cs',
    'c-sharp/Projects/ChapterMarkerCorrection.cs',
    'c-sharp/ParanextDataProvider.csproj',
    'lib/platform-bible-react/src/components/advanced/footnote-editor/footnote-editor.component.tsx',
    'lib/platform-bible-react/src/components/advanced/marker-menu.component.tsx',
    'lib/platform-bible-react/src/components/advanced/marker-palette-keys.util.ts',
    'lib/platform-bible-react/src/components/advanced/use-marker-palette-session-writers.hook.ts',
    'lib/platform-bible-react/src/components/basics/editor-keyboard-shortcuts.component.tsx',
    'lib/platform-bible-react/src/components/demo/scripture-editor/usj-nodes.css',
  ])('matches an entry for %s', (changedPath) => {
    expect(editorPaths.test(changedPath)).toBe(true);
  });

  it.each([
    'src/renderer/components/docking/tab.tsx',
    'lib/platform-bible-react/src/components/basics/button.component.tsx',
    'lib/platform-bible-react/src/components/advanced/book-chapter-control.component.tsx',
    'c-sharp/Projects/Other.cs',
    'c-sharp/Checks/UsfmLocation.cs',
    'e2e-tests/tests/isolated/docking/other.spec.ts',
  ])('does not run the editor list when %s changes', (changedPath) => {
    expect(editorPaths.test(changedPath)).toBe(false);
  });
});

describe.each(SPEC_LISTS)('%s', (listName) => {
  const entries = readSpecList(listName);

  it('lists at least one spec', () => {
    expect(entries.length).toBeGreaterThan(0);
  });

  // The workflow reads each line as it is, so an entry with a trailing space or a carriage return
  // would pass a trimming reader here and silently match nothing in CI.
  it('has only entries identical to their trimmed form (no stray whitespace or CR)', () => {
    expect(entries.filter((entry) => entry !== entry.trim())).toEqual([]);
  });

  // e2e-isolated.yml joins the lists with `cat`: a list without its final newline would run its
  // last spec into the first line of the next list, and that spec would silently drop out.
  it('ends with a newline, so `cat` keeps its last entry apart from the next list', () => {
    expect(fs.readFileSync(path.join(__dirname, listName), 'utf8').endsWith('\n')).toBe(true);
  });

  it.each(entries)('%s is an isolated spec file that exists', (entry) => {
    expect(entry.startsWith(ISOLATED_PREFIX)).toBe(true);
    expect(entry.endsWith('.spec.ts')).toBe(true);
    expect(
      fs.statSync(path.join(REPOSITORY_ROOT, entry), { throwIfNoEntry: false })?.isFile(),
    ).toBe(true);
  });
});

it('lists no spec twice across the core lists', () => {
  const all = SPEC_LISTS.flatMap(readSpecList);
  expect(new Set(all).size).toBe(all.length);
});
