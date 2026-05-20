import { describe, it, expect } from 'vitest';
import { parseGitHubOrgFromRemoteUrl } from '../lib/download-db';

describe('parseGitHubOrgFromRemoteUrl', () => {
  it('parses HTTPS URL with .git suffix (paranext)', () => {
    expect(parseGitHubOrgFromRemoteUrl('https://github.com/paranext/paranext-core.git')).toEqual({
      org: 'paranext',
    });
  });

  it('parses HTTPS URL with .git suffix (fork)', () => {
    expect(parseGitHubOrgFromRemoteUrl('https://github.com/tjcouch-sil/paranext-core.git')).toEqual(
      { org: 'tjcouch-sil' },
    );
  });

  it('parses SSH URL with .git suffix (paranext)', () => {
    expect(parseGitHubOrgFromRemoteUrl('git@github.com:paranext/paranext-core.git')).toEqual({
      org: 'paranext',
    });
  });

  it('parses SSH URL with .git suffix (fork)', () => {
    expect(parseGitHubOrgFromRemoteUrl('git@github.com:tjcouch-sil/paranext-core.git')).toEqual({
      org: 'tjcouch-sil',
    });
  });

  it('parses HTTPS URL without .git suffix', () => {
    expect(parseGitHubOrgFromRemoteUrl('https://github.com/paranext/paranext-core')).toEqual({
      org: 'paranext',
    });
  });

  it('returns undefined with reason for non-github host', () => {
    expect(parseGitHubOrgFromRemoteUrl('https://gitlab.com/foo/bar.git')).toEqual({
      org: undefined,
      reason: expect.stringContaining('https://gitlab.com/foo/bar.git'),
    });
  });

  it('returns undefined with reason for empty string', () => {
    expect(parseGitHubOrgFromRemoteUrl('')).toEqual({
      org: undefined,
      reason: expect.stringMatching(/.+/),
    });
  });

  it('trims whitespace before parsing', () => {
    expect(
      parseGitHubOrgFromRemoteUrl('  https://github.com/paranext/paranext-core.git\n'),
    ).toEqual({ org: 'paranext' });
  });
});
