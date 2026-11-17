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

const REPOSITORY_ROOT = path.join(__dirname, '..');
const SPEC_LISTS = ['core-specs.txt', 'core-specs-editor.txt'];
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

describe('the editor list trigger in test.yml', () => {
  const editorPaths = readEditorPathsPattern();

  // A pull request that changes one of the editor-list specs, or the list itself, must run that
  // list; the pattern names them by hand, so it has to follow the list.
  it.each([...readSpecList('core-specs-editor.txt'), 'e2e-tests/core-specs-editor.txt'])(
    'runs the editor list when %s changes',
    (changedPath) => {
      expect(editorPaths.test(changedPath)).toBe(true);
    },
  );

  it('does not run it for an unrelated change', () => {
    expect(editorPaths.test('src/renderer/components/docking/tab.tsx')).toBe(false);
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
