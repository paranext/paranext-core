/**
 * Unit test that keeps CI's core e2e spec lists pointing at real specs.
 *
 * The `e2e-core` job in `.github/workflows/test.yml` hands each listed path to Playwright as a
 * filter, and a filter that matches nothing is silently ignored while the other entries still run.
 * So a spec renamed or deleted without updating these lists would drop out of the job with no
 * error, and the job only reports. This test fails on the pull request that makes the list stale.
 */
import fs from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';
import { readSpecList } from './e2e-recommendations';

const REPOSITORY_ROOT = path.join(__dirname, '..');
const EDITOR_LIST = 'core-specs-editor.txt';
const SPEC_LISTS = ['core-specs.txt', EDITOR_LIST];
const ISOLATED_PREFIX = 'e2e-tests/tests/isolated/';

/**
 * The `editor_paths` pattern in `.github/workflows/test.yml`'s `e2e-core-selection` job: the paths
 * whose change makes the pull-request job run `core-specs-editor.txt` too. It is POSIX ERE (for
 * `grep -E`), which this pattern's syntax shares with JavaScript.
 */
function readEditorPathsPattern(): RegExp {
  const workflow = fs.readFileSync(
    path.join(REPOSITORY_ROOT, '.github', 'workflows', 'test.yml'),
    'utf8',
  );
  const match = /^\s*editor_paths='([^']+)'/m.exec(workflow);
  if (!match) throw new Error('test.yml no longer sets editor_paths');
  return new RegExp(match[1]);
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
  const editorPaths = readEditorPathsPattern();

  // A pull request that changes one of the editor-list specs, or the list itself, must run that
  // list; the pattern names them by hand, so it has to follow the list.
  it.each([...readSpecList(path.join(__dirname, EDITOR_LIST)), `e2e-tests/${EDITOR_LIST}`])(
    'runs the editor list when %s changes',
    (changedPath) => {
      expect(editorPaths.test(changedPath)).toBe(true);
    },
  );

  // One row per alternative of the pattern, so dropping any one of them fails its own row.
  it.each([
    'extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx',
    'dev-packages.json',
    `e2e-tests/${EDITOR_LIST}`,
    'e2e-tests/fixtures/no-unasked-edits.body.ts',
    'e2e-tests/tests/isolated/scripture-editor/no-unasked-edits-power-standard.spec.ts',
    'e2e-tests/tests/isolated/scripture-editor/no-unasked-edits-simple-paragraph-structure.spec.ts',
    'c-sharp/Projects/ParatextProjectDataProvider.cs',
    'c-sharp/Projects/UsfmConverter.cs',
    'c-sharp/Projects/Conversion/UsjWriter.cs',
    'lib/platform-bible-react/src/components/advanced/footnote-editor/footnote-editor.component.tsx',
    'lib/platform-bible-react/src/components/advanced/marker-menu.component.tsx',
    'lib/platform-bible-react/src/components/advanced/marker-palette-keys.util.ts',
    'lib/platform-bible-react/src/components/advanced/use-marker-palette-session-writers.hook.ts',
    'lib/platform-bible-react/src/components/basics/editor-keyboard-shortcuts.component.tsx',
    'lib/platform-bible-react/src/components/demo/scripture-editor/usj-nodes.css',
  ])('matches a pattern alternative for %s', (changedPath) => {
    expect(editorPaths.test(changedPath)).toBe(true);
  });

  it.each([
    'src/renderer/components/docking/tab.tsx',
    'lib/platform-bible-react/src/components/basics/button.component.tsx',
    'lib/platform-bible-react/src/components/advanced/book-chapter-control.component.tsx',
    'c-sharp/Projects/Other.cs',
    'e2e-tests/tests/isolated/docking/other.spec.ts',
  ])('does not run the editor list when %s changes', (changedPath) => {
    expect(editorPaths.test(changedPath)).toBe(false);
  });
});

describe.each(SPEC_LISTS)('%s', (listName) => {
  const entries = readSpecList(path.join(__dirname, listName));

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
  const all = SPEC_LISTS.flatMap((listName) => readSpecList(path.join(__dirname, listName)));
  expect(new Set(all).size).toBe(all.length);
});
