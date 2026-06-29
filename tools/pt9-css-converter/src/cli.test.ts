import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { main, normalizeSourcePath } from './cli';

describe('normalizeSourcePath', () => {
  test('returns repo-root-relative POSIX path for absolute path inside a git worktree', () => {
    const repoRoot = '/home/op/work/paranext-core';
    const result = normalizeSourcePath(
      '/home/op/work/paranext-core/data/pt9-css/hbkeng-manual.css',
      {
        cwd: '/elsewhere',
        resolveRepoRoot: () => repoRoot,
        pathModule: path.posix,
      },
    );
    expect(result).toBe('data/pt9-css/hbkeng-manual.css');
  });

  test('returns the same relative path unchanged when cwd is the repo root', () => {
    const repoRoot = '/home/op/paranext-core';
    const result = normalizeSourcePath('data/pt9-css/hbkeng-manual.css', {
      cwd: repoRoot,
      resolveRepoRoot: () => repoRoot,
      pathModule: path.posix,
    });
    expect(result).toBe('data/pt9-css/hbkeng-manual.css');
  });

  test('falls back to basename when input is outside any git repo', () => {
    const result = normalizeSourcePath('/tmp/random/hbkeng-manual.css', {
      cwd: '/home/op',
      resolveRepoRoot: () => undefined,
      pathModule: path.posix,
    });
    expect(result).toBe('hbkeng-manual.css');
  });

  test('converts Windows-style backslash separators to forward slashes', () => {
    const repoRoot = 'C:\\Users\\op\\paranext-core';
    const result = normalizeSourcePath(
      'C:\\Users\\op\\paranext-core\\data\\pt9-css\\hbkeng-manual.css',
      {
        cwd: 'C:\\elsewhere',
        resolveRepoRoot: () => repoRoot,
        pathModule: path.win32,
      },
    );
    expect(result).toBe('data/pt9-css/hbkeng-manual.css');
  });
});

// Integration coverage for the real gitRepoRootResolver — exercised through normalizeSourcePath
// without injecting resolveRepoRoot, so it shells out to actual `git`. The unit tests above stub
// the resolver; these confirm the un-stubbed boundary behaves on both branches.
describe('normalizeSourcePath with the real git resolver', () => {
  test('resolves a path inside this repo to a repo-root-relative POSIX path', () => {
    const thisFile = fileURLToPath(import.meta.url);

    const result = normalizeSourcePath(thisFile);

    expect(result).toBe('tools/pt9-css-converter/src/cli.test.ts');
  });

  test('falls back to basename for a path outside any git repo', () => {
    const outsideRepo = mkdtempSync(path.join(os.tmpdir(), 'pt9-css-converter-norepo-'));
    try {
      const result = normalizeSourcePath(path.join(outsideRepo, 'hbkeng-manual.css'));

      expect(result).toBe('hbkeng-manual.css');
    } finally {
      rmSync(outsideRepo, { recursive: true, force: true });
    }
  });
});

describe('main', () => {
  let tmpDir: string;
  let logSpy: ReturnType<typeof vi.spyOn>;
  let exitSpy: ReturnType<typeof vi.spyOn>;
  let originalArgv: string[];

  beforeEach(() => {
    tmpDir = mkdtempSync(path.join(os.tmpdir(), 'pt9-css-converter-main-'));
    originalArgv = process.argv;
    logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    // Guard: surface any unexpected process.exit (e.g. from parseArgs) as a test failure rather
    // than letting it tear down the whole vitest run.
    exitSpy = vi.spyOn(process, 'exit').mockImplementation((code) => {
      throw new Error(`Unexpected process.exit(${String(code)})`);
    });
  });

  afterEach(() => {
    process.argv = originalArgv;
    logSpy.mockRestore();
    exitSpy.mockRestore();
    rmSync(tmpDir, { recursive: true, force: true });
  });

  test('reads --in, converts, and writes the SCSS to --out', () => {
    const inPath = path.join(tmpDir, 'input.css');
    const outPath = path.join(tmpDir, 'output.scss');
    writeFileSync(inPath, '.usfm_id { font-size: 100%; }\n', 'utf-8');
    process.argv = ['node', 'cli.ts', '--in', inPath, '--out', outPath];

    main();

    const written = readFileSync(outPath, 'utf-8');
    expect(written).toContain('.formatted-font .usfm_id {');
    expect(written).toContain('font-size: 100%;');
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(`Wrote ${outPath}`));
  });
});
