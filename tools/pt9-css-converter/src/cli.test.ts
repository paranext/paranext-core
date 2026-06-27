import path from 'node:path';
import { describe, expect, test } from 'vitest';
import { normalizeSourcePath } from './cli';

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
