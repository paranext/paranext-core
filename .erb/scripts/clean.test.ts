import { execFileSync } from 'child_process';
import * as path from 'path';
import { describe, expect, it } from 'vitest';

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
});
