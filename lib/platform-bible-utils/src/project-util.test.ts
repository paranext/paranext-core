import { describe, expect, it } from 'vitest';
import { normalizeProjectId } from './project-util';

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
