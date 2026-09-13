import { describe, it, expect } from 'vitest';
import {
  makeProjectSelectorCustomData,
  recencyMapFromOrderedIds,
  PROJECT_SELECTOR_CUSTOM_DATA_KEYS,
} from './project-selector-custom-data';

describe('makeProjectSelectorCustomData', () => {
  it('packs every well-known key when all are supplied', () => {
    expect(
      makeProjectSelectorCustomData({
        language: 'English',
        type: 'Standard',
        typeName: 'Standard project',
        lastUsedAt: 5,
      }),
    ).toEqual({ language: 'English', type: 'Standard', typeName: 'Standard project', lastUsedAt: 5 });
  });

  it('omits empty strings so a grouping reads them as missing, not as an empty bucket', () => {
    expect(makeProjectSelectorCustomData({ language: '', type: '' })).toEqual({});
  });

  it('omits undefined values', () => {
    expect(makeProjectSelectorCustomData({ language: undefined })).toEqual({});
  });

  it('omits a non-finite lastUsedAt rather than bucketing on NaN', () => {
    expect(makeProjectSelectorCustomData({ lastUsedAt: Number.NaN })).toEqual({});
    expect(makeProjectSelectorCustomData({ lastUsedAt: Number.POSITIVE_INFINITY })).toEqual({});
  });

  it('packs lastUsedAt 0, since presence is what the grouping reads', () => {
    // recencyMapFromOrderedIds never emits 0 (scores run total..1), so a 0 here means a caller
    // computed a score wrong. It still packs — presence is what the grouping reads.
    expect(makeProjectSelectorCustomData({ lastUsedAt: 0 })).toEqual({ lastUsedAt: 0 });
  });

  it('exposes the key names it writes', () => {
    expect(Object.values(PROJECT_SELECTOR_CUSTOM_DATA_KEYS)).toEqual(
      expect.arrayContaining(['language', 'type', 'typeName', 'lastUsedAt']),
    );
  });
});

describe('recencyMapFromOrderedIds', () => {
  it('scores most-recent-first input descending, so the values rank the source order', () => {
    const map = recencyMapFromOrderedIds(['a', 'b', 'c']);
    expect(map.get('a')).toBeGreaterThan(map.get('b')!);
    expect(map.get('b')).toBeGreaterThan(map.get('c')!);
  });

  it('emits strictly positive scores so every entry passes a typeof-number presence check', () => {
    for (const score of recencyMapFromOrderedIds(['a', 'b', 'c']).values()) {
      expect(score).toBeGreaterThan(0);
    }
  });

  it('omits ids not in the list so they fall into the Other bucket', () => {
    expect(recencyMapFromOrderedIds(['a']).has('z')).toBe(false);
  });

  it('is deterministic, so calling it at render time is safe', () => {
    expect([...recencyMapFromOrderedIds(['a', 'b'])]).toEqual([...recencyMapFromOrderedIds(['a', 'b'])]);
  });

  it('handles an empty list', () => {
    expect(recencyMapFromOrderedIds([]).size).toBe(0);
  });
});
