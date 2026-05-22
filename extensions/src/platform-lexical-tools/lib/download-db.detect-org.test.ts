import { describe, it, expect, vi } from 'vitest';
import { detectGitHubOrg, type ExecGitCmd } from './download-db';

describe('detectGitHubOrg', () => {
  it('returns the org parsed from the injected exec output', () => {
    const execGitCmd: ExecGitCmd = vi.fn(() => 'https://github.com/paranext/paranext-core.git\n');
    expect(detectGitHubOrg(execGitCmd)).toEqual({ org: 'paranext' });
    expect(execGitCmd).toHaveBeenCalledWith(
      'git config --get remote.origin.url',
      expect.any(String),
    );
  });

  it('returns reason when exec throws (e.g. not a git repository)', () => {
    const execGitCmd: ExecGitCmd = vi.fn(() => {
      throw new Error('fatal: not a git repository');
    });
    expect(detectGitHubOrg(execGitCmd)).toEqual({
      org: undefined,
      reason: expect.stringContaining('not a git repository'),
    });
  });

  it('returns reason when exec returns an unparseable URL', () => {
    const execGitCmd: ExecGitCmd = vi.fn(() => 'https://gitlab.com/foo/bar.git\n');
    expect(detectGitHubOrg(execGitCmd)).toEqual({
      org: undefined,
      reason: expect.stringContaining('did not match a recognized github.com pattern'),
    });
  });

  it('returns reason when exec returns empty string (no origin remote)', () => {
    const execGitCmd: ExecGitCmd = vi.fn(() => '');
    expect(detectGitHubOrg(execGitCmd)).toEqual({
      org: undefined,
      reason: expect.stringContaining('empty'),
    });
  });
});
