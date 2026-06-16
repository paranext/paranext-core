import { describe, it, expect } from 'vitest';
import { parseGitHubOrgFromRemoteUrl } from './download-db';

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

  it('parses SSH URL without .git suffix', () => {
    expect(parseGitHubOrgFromRemoteUrl('git@github.com:paranext/paranext-core')).toEqual({
      org: 'paranext',
    });
  });

  it('parses HTTPS URL with embedded credentials (user@)', () => {
    expect(
      parseGitHubOrgFromRemoteUrl('https://tjcouch-sil@github.com/paranext/paranext-core.git'),
    ).toEqual({ org: 'paranext' });
  });

  it('parses HTTPS URL with embedded credentials (user:token@)', () => {
    expect(
      parseGitHubOrgFromRemoteUrl(
        'https://tjcouch-sil:ghp_secret@github.com/paranext/paranext-core.git',
      ),
    ).toEqual({ org: 'paranext' });
  });

  it('parses SSH URL form (ssh://git@github.com/...)', () => {
    expect(parseGitHubOrgFromRemoteUrl('ssh://git@github.com/paranext/paranext-core.git')).toEqual({
      org: 'paranext',
    });
  });

  it('parses SSH URL form with explicit port', () => {
    expect(
      parseGitHubOrgFromRemoteUrl('ssh://git@github.com:22/paranext/paranext-core.git'),
    ).toEqual({ org: 'paranext' });
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
