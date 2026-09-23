import { describe, expect, it } from 'vitest';
import { formatProjectTitle, getProjectDisplayName, normalizeProjectId } from './project-util';
import { newPlatformError } from './platform-error';

describe('normalizeProjectId', () => {
  it('uppercases an id to its canonical case-insensitive key', () => {
    expect(normalizeProjectId('abc123def')).toBe('ABC123DEF');
  });

  it('leaves an already-canonical (uppercase) id unchanged (idempotent)', () => {
    expect(normalizeProjectId('ABC123DEF')).toBe('ABC123DEF');
  });

  it('maps mixed-case variants of the same id to one key', () => {
    expect(normalizeProjectId('aBcDeF')).toBe(normalizeProjectId('ABCDEF'));
  });
});

describe('getProjectDisplayName', () => {
  it('uses the short name when it is a non-empty string', () => {
    expect(getProjectDisplayName('abc123', 'WEB')).toBe('WEB');
  });

  it.each([
    ['an empty name', ''],
    ['a missing name', undefined],
    ['a platform error', newPlatformError('Setting failed')],
    ['a non-string value', 42],
  ])('falls back to the id for %s', (_description, projectName) => {
    expect(getProjectDisplayName('abc123', projectName)).toBe('abc123');
  });
});

describe('formatProjectTitle', () => {
  it('replaces {projectName} with the short name', () => {
    expect(formatProjectTitle('Character Inventory: {projectName}', 'abc123', 'WEB')).toBe(
      'Character Inventory: WEB',
    );
  });

  it('replaces {projectName} with the id when the name is unusable', () => {
    expect(formatProjectTitle('Character Inventory: {projectName}', 'abc123', '')).toBe(
      'Character Inventory: abc123',
    );
  });

  it('fills other placeholders from the replacements', () => {
    expect(
      formatProjectTitle('Results ({resultsCount}): {projectName}', 'abc123', 'WEB', {
        resultsCount: 3,
      }),
    ).toBe('Results (3): WEB');
  });

  it('ignores a projectName replacement in favor of the resolved name', () => {
    expect(formatProjectTitle('{projectName}', 'abc123', 'WEB', { projectName: 'Other' })).toBe(
      'WEB',
    );
  });

  it('leaves a format with no placeholder unchanged', () => {
    expect(formatProjectTitle('Interlinearizer', 'abc123', 'WEB')).toBe('Interlinearizer');
  });
});
