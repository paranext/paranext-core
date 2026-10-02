import { describe, expect, it } from 'vitest';
import { toUnsyncedProjectIds } from './home-unsynced.util';

describe('toUnsyncedProjectIds', () => {
  it('merges the send and receive sets', () => {
    expect(toUnsyncedProjectIds({ toSend: ['AAA'], toReceive: ['BBB'] })).toEqual(['AAA', 'BBB']);
  });

  it('lists a project once when it is in both sets', () => {
    expect(toUnsyncedProjectIds({ toSend: ['AAA', 'BBB'], toReceive: ['BBB', 'CCC'] })).toEqual([
      'AAA',
      'BBB',
      'CCC',
    ]);
  });

  it('upper-cases ids and de-duplicates across casing', () => {
    expect(toUnsyncedProjectIds({ toSend: ['abc'], toReceive: ['ABC', 'def'] })).toEqual([
      'ABC',
      'DEF',
    ]);
  });

  it('returns an empty list for two empty sets', () => {
    expect(toUnsyncedProjectIds({ toSend: [], toReceive: [] })).toEqual([]);
  });

  it('returns an empty list when a field is missing', () => {
    expect(toUnsyncedProjectIds({ toSend: ['AAA'] })).toEqual([]);
    expect(toUnsyncedProjectIds({ toReceive: ['AAA'] })).toEqual([]);
  });

  it('returns an empty list when a field is not an array of strings', () => {
    expect(toUnsyncedProjectIds({ toSend: 'AAA', toReceive: [] })).toEqual([]);
    expect(toUnsyncedProjectIds({ toSend: ['AAA', 7], toReceive: [] })).toEqual([]);
    expect(toUnsyncedProjectIds({ toSend: [], toReceive: null })).toEqual([]);
  });

  it('returns an empty list for the old projectIds shape', () => {
    expect(toUnsyncedProjectIds({ projectIds: ['AAA'] })).toEqual([]);
  });

  it('returns an empty list for a non-object snapshot', () => {
    expect(toUnsyncedProjectIds(undefined)).toEqual([]);
    expect(toUnsyncedProjectIds(null)).toEqual([]);
    expect(toUnsyncedProjectIds('AAA')).toEqual([]);
  });
});
