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
    ).toEqual({
      language: 'English',
      type: 'Standard',
      typeName: 'Standard project',
      lastUsedAt: 5,
    });
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
    // Read back in source order. `NaN` stands in for an id the map failed to score, so a missing
    // entry fails the comparisons below rather than being skipped.
    const [first, second, third] = ['a', 'b', 'c'].map((id) => map.get(id) ?? Number.NaN);
    expect(first).toBeGreaterThan(second);
    expect(second).toBeGreaterThan(third);
  });

  it('emits strictly positive scores so every entry passes a typeof-number presence check', () => {
    const scores = [...recencyMapFromOrderedIds(['a', 'b', 'c']).values()];
    // Without the count, an empty map would satisfy the per-score assertion vacuously.
    expect(scores).toHaveLength(3);
    scores.forEach((score) => expect(score).toBeGreaterThan(0));
  });

  it('keeps the first occurrence of a duplicate id, so the most recent position wins', () => {
    // Callers normalize ids on the way in (`orderedProjectIds.map(normalizeProjectId)`), which can
    // collapse two differently-cased raw ids into one entry.
    const map = recencyMapFromOrderedIds(['a', 'b', 'a']);
    expect(map.size).toBe(2);
    // 'a' keeps index 0's score (3), not the trailing index 2's score (1), so it still outranks
    // 'b' — the entry it genuinely preceded.
    expect(map.get('a') ?? Number.NaN).toBeGreaterThan(map.get('b') ?? Number.NaN);
  });

  it('omits ids not in the list so they fall into the Other bucket', () => {
    expect(recencyMapFromOrderedIds(['a']).has('z')).toBe(false);
  });

  it('is deterministic, so calling it at render time is safe', () => {
    expect([...recencyMapFromOrderedIds(['a', 'b'])]).toEqual([
      ...recencyMapFromOrderedIds(['a', 'b']),
    ]);
  });

  it('handles an empty list', () => {
    expect(recencyMapFromOrderedIds([]).size).toBe(0);
  });
});
