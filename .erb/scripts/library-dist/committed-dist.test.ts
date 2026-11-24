import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { LIBRARY_DIRS } from './library-dist.util';

function trackedDistFiles(libraryDir: string): string[] {
  return execFileSync('git', ['ls-files', `${libraryDir}/dist`], { encoding: 'utf8' })
    .split('\n')
    .filter(Boolean);
}

describe.each(LIBRARY_DIRS)('committed dist of %s', (libraryDir) => {
  const files = trackedDistFiles(libraryDir);

  it('tracks no source maps', () => {
    expect(files.filter((file) => file.endsWith('.map'))).toEqual([]);
  });

  it('has no content-hashed chunk names', () => {
    // Vite's default chunk name is `<name>-<8-character base64url hash>.<ext>`. Source file names are
    // lowercase kebab-case, so a final segment with an uppercase letter, digit or underscore is a hash
    // and a lowercase word such as `markdown-renderer.js` is not.
    const hashedName = /-(?=[a-z-]*[A-Z0-9_])[A-Za-z0-9_-]{8}\.c?js$/;
    expect(files.filter((file) => hashedName.test(file))).toEqual([]);
  });

  it('ends every built script with a sourceMappingURL comment naming its own map', () => {
    files
      .filter((file) => /\.c?js$/.test(file))
      .forEach((file) => {
        const lastLine = readFileSync(file, 'utf8').trimEnd().split('\n').at(-1);
        expect(lastLine).toBe(`//# sourceMappingURL=${path.basename(file)}.map`);
      });
  });
});
