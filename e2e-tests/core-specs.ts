/**
 * What CI's `e2e-core` job runs, read from the repository: the two core spec lists and the
 * `editor_paths` entries in `.github/workflows/test.yml` that decide whether a pull request also
 * runs the editor list, plus where the isolated specs live and the command that runs them.
 * `core-specs.test.ts` checks them against the repository; `e2e-recommendations.ts` reports from
 * them what CI runs for a branch.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const REPOSITORY_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/** Where the isolated specs live, repository-relative, with a trailing `/`. */
export const ISOLATED_PREFIX = 'e2e-tests/tests/isolated/';

/**
 * The command that runs isolated specs. `target` is a subset directory name, or a path filter such
 * as a spec's repository-relative path.
 */
export const isolatedCommand = (target: string) => `npm run test:e2e:isolated ${target}`;

/**
 * The entries of a spec list: one repository path per line; `#` starts a comment line. Lines are
 * returned untrimmed, as the CI workflow reads them; `core-specs.test.ts` rejects a list whose
 * lines carry stray whitespace.
 */
export function readSpecList(filePath: string): string[] {
  return fs
    .readFileSync(filePath, 'utf8')
    .split('\n')
    .filter((line) => line.trim() !== '' && !line.startsWith('#'));
}

/** The text of `.github/workflows/test.yml`. */
export function readWorkflow(repositoryRoot: string = REPOSITORY_ROOT): string {
  return fs.readFileSync(path.join(repositoryRoot, '.github', 'workflows', 'test.yml'), 'utf8');
}

/**
 * The entries of `editor_paths` in `.github/workflows/test.yml`'s `e2e-core-selection` job, one per
 * `editor_paths+=('…')` line: the paths whose change makes the pull-request job run
 * `core-specs-editor.txt` too. Each is a POSIX extended regular expression (for `grep -E`), whose
 * syntax these entries share with JavaScript.
 */
export function parseEditorPathEntries(workflow: string): string[] {
  const lines = workflow.split('\n').filter((line) => line.includes('editor_paths+='));
  // Bash accepts other forms (double quotes, a trailing comment) that this parse would skip, and a
  // skipped entry would silently escape the checks that rely on it.
  const unreadable = lines.filter((line) => !/^\s*editor_paths\+=\('[^']+'\)\s*$/.test(line));
  if (unreadable.length > 0)
    throw new Error(
      `Write each editor_paths entry as editor_paths+=('<extended regular expression>') on a line of its own: ${unreadable
        .map((line) => line.trim())
        .join(' | ')}`,
    );
  const entries = lines.map((line) => /'([^']+)'/.exec(line)?.[1] ?? '');
  if (entries.length === 0) throw new Error("test.yml has no editor_paths+=('…') lines");
  return entries;
}

/** The pattern the workflow builds from the entries: `^(` + the entries joined with `|` + `)`. */
export function editorPathsPattern(entries: string[]): RegExp {
  return new RegExp(`^(${entries.join('|')})`);
}

/** The `editor_paths` entries of the workflow in the repository at `repositoryRoot`. */
export function readEditorPathEntries(repositoryRoot: string = REPOSITORY_ROOT): string[] {
  return parseEditorPathEntries(readWorkflow(repositoryRoot));
}
