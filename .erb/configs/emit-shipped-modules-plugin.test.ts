import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { isWarmFilesystemCache } from './emit-shipped-modules-plugin';

let dir: string;

beforeEach(() => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'warm-cache-'));
});
afterEach(() => {
  fs.rmSync(dir, { recursive: true, force: true });
});

describe('isWarmFilesystemCache', () => {
  // What this predicate protects: making it always return `false`, or removing the
  // `warmBundles.length` refusal in `shipping-set.ts`, is what `shipping-set.test.ts`'s "a manifest
  // built against a warm filesystem cache is refused" suite catches. Keep the two in step.

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

  // The one branch that could answer permissively from absent information. "Which directory is
  // this cache in?" has an answer when the config names none - webpack's default - and that
  // directory is warm on any tree built twice, so reporting COLD here would let a manifest written
  // over a warm cache be trusted for a legal artifact.
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
    // a cache hit has shortened then goes into a legal artifact. Reproduced here as ENOTDIR, which
    // is the same class: a path that exists and is not a readable directory.
    const notADirectory = path.join(dir, 'cache-is-a-file');
    fs.writeFileSync(notADirectory, 'not a directory');
    expect(() =>
      isWarmFilesystemCache({ type: 'filesystem', cacheDirectory: notADirectory }),
    ).toThrow(/could not read the webpack cache directory/);
  });
});
