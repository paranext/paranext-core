import { execFileSync } from 'child_process';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { afterEach, describe, expect, it } from 'vitest';
import { removeGlobs } from './clean';

const SCRIPT = path.join(__dirname, 'clean.ts');

/**
 * Runs the real entry point, which is the only thing that can catch this regression.
 *
 * `webpack.paths.ts` mixes `require()` with `export default`, so it compiles to CommonJS - and what
 * a default import of it resolves to depends on the MODULE KIND OF THE IMPORTER. Resolved wrong,
 * every path below is `undefined`, `fs.existsSync(undefined)` returns false rather than throwing,
 * and `npm run package` cleans NOTHING while exiting 0.
 *
 * Importing the module from a test cannot see that: the test is TypeScript, so it gets the working
 * interop either way. Only spawning the entry point the way npm does exercises the resolution that
 * can break.
 */
function printedFolders(): string[] {
  const out = execFileSync(process.execPath, ['--import', 'tsx', SCRIPT, '--print'], {
    encoding: 'utf8',
    cwd: path.join(__dirname, '..', '..'),
  });
  return out
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

let tempDirs: string[] = [];

afterEach(() => {
  tempDirs.forEach((dir) => fs.rmSync(dir, { recursive: true, force: true }));
  tempDirs = [];
});

describe('clean', () => {
  it('names a real absolute path for every folder it removes', () => {
    const folders = printedFolders();
    expect(folders.length).toBeGreaterThan(0);
    folders.forEach((folder) => {
      expect(folder).not.toContain('undefined');
      expect(path.isAbsolute(folder)).toBe(true);
    });
  });

  it('removes the notices manifests, whose staleness silently shortens a legal document', () => {
    expect(printedFolders().some((folder) => folder.endsWith(`${path.sep}.notices`))).toBe(true);
  });

  it('removes the build output a packaging build must not inherit', () => {
    const folders = printedFolders().join('\n');
    ['dist', 'build', 'dll', `extensions${path.sep}dist`].forEach((expected) => {
      expect(folders).toContain(expected);
    });
  });

  /**
   * The `--print` cases above cannot reach this: they exercise which paths are named, never whether
   * removing them works. The glob wiring is the half that can fail silently - `rimrafSync` returns
   * true for a pattern that matched nothing.
   *
   * Platform note: this reproduces the Windows failure only on Windows, where `path.join` emits the
   * backslashes glob would otherwise consume as escapes. On POSIX it stands as a regression guard
   * on the glob wiring generally.
   */
  it('actually removes the cache directories its glob names', () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'clean-globs-'));
    tempDirs.push(root);
    const cache = path.join(root, 'node_modules', '.cache');
    ['webpack-main', 'webpack-renderer'].forEach((name) =>
      fs.mkdirSync(path.join(cache, name), { recursive: true }),
    );
    const keep = path.join(cache, 'not-webpack');
    fs.mkdirSync(keep, { recursive: true });

    removeGlobs([path.join(root, 'node_modules', '.cache', 'webpack-*')]);

    expect(fs.existsSync(path.join(cache, 'webpack-main'))).toBe(false);
    expect(fs.existsSync(path.join(cache, 'webpack-renderer'))).toBe(false);
    // A glob broad enough to take the whole cache directory with it would also "pass" the two
    // assertions above.
    expect(fs.existsSync(keep)).toBe(true);
  });
});
