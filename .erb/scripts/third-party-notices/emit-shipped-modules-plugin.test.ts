import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { isWarmFilesystemCache } from '../../configs/emit-shipped-modules-plugin';

// Lives under `.erb/scripts/third-party-notices/` rather than beside the plugin in `.erb/configs/`
// because only `.erb/scripts/**/*.test.ts` is in the root `vitest.config.ts` include list - a test
// file next to the plugin itself would silently never run.

let dir: string;

beforeEach(() => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'warm-cache-'));
});
afterEach(() => {
  fs.rmSync(dir, { recursive: true, force: true });
});

describe('isWarmFilesystemCache', () => {
  // The revert test for this suite: comment out the `warmBundles.length` refusal in
  // `shipping-set.ts` (or make this function always return `false`) and `shipping-set.test.ts`'s
  // "a manifest built against a warm filesystem cache is refused" suite fails - confirmed by hand
  // during this fix, per the repo's TDD discipline.

  it('is cold when the configured cache directory does not exist yet', () => {
    const neverBuilt = path.join(dir, 'never-built');
    expect(isWarmFilesystemCache({ type: 'filesystem', cacheDirectory: neverBuilt })).toBe(false);
  });

  it('is cold when the cache directory exists but is empty', () => {
    expect(isWarmFilesystemCache({ type: 'filesystem', cacheDirectory: dir })).toBe(false);
  });

  it('is warm when the cache directory holds content from a prior run', () => {
    fs.writeFileSync(path.join(dir, '0.pack'), '');
    expect(isWarmFilesystemCache({ type: 'filesystem', cacheDirectory: dir })).toBe(true);
  });

  it('is cold for a memory cache, regardless of any directory on disk', () => {
    fs.writeFileSync(path.join(dir, '0.pack'), '');
    expect(isWarmFilesystemCache({ type: 'memory' })).toBe(false);
  });

  it('is cold when caching is disabled', () => {
    expect(isWarmFilesystemCache(false)).toBe(false);
  });

  // Reporting COLD here was the one branch that produced a permissive verdict from absent
  // information: webpack's default directory is warm on any tree built twice, so a manifest written
  // over it would have been trusted for a legal artifact. The answer to "which directory is this
  // cache in?" is webpack's default, not "there isn't one".
  it('falls back to webpack’s default directory when a filesystem cache names none', () => {
    const cwd = process.cwd();
    const defaultDir = path.join(dir, 'node_modules', '.cache', 'webpack');
    fs.mkdirSync(defaultDir, { recursive: true });
    process.chdir(dir);
    try {
      expect(isWarmFilesystemCache({ type: 'filesystem' })).toBe(false);
      fs.writeFileSync(path.join(defaultDir, '0.pack'), '');
      expect(isWarmFilesystemCache({ type: 'filesystem' })).toBe(true);
    } finally {
      process.chdir(cwd);
    }
  });
});

describe('isWarmFilesystemCache when the directory cannot be read', () => {
  it('answers cold for a directory that does not exist', () => {
    // ENOENT is the one read failure that IS an answer: nothing was ever cached here.
    const missing = path.join(dir, 'never-built');
    expect(isWarmFilesystemCache({ type: 'filesystem', cacheDirectory: missing })).toBe(false);
  });

  it('refuses to answer when the read fails for any other reason', () => {
    // A directory that may well be full and simply could not be read - EACCES after a container
    // build, EMFILE under the five webpacks `npm run build` runs at once. Answering "cold" there
    // stamps the manifest trustworthy on the strength of information nobody has, and a module list
    // a cache hit had shortened then goes into a legal artifact. Reproduced here as ENOTDIR, which
    // is the same class: a path that exists and is not a readable directory.
    const notADirectory = path.join(dir, 'cache-is-a-file');
    fs.writeFileSync(notADirectory, 'not a directory');
    expect(() =>
      isWarmFilesystemCache({ type: 'filesystem', cacheDirectory: notADirectory }),
    ).toThrow(/could not read the webpack cache directory/);
  });
});
