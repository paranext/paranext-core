import { describe, it, expect } from 'vitest';
import { newPlatformError } from 'platform-bible-utils';
import { blockCopyWhileChapterLoads, resolveCopyLimit } from './resolve-copy-limit.util';

describe('resolveCopyLimit', () => {
  it("returns the chapter's limit", () => {
    expect(resolveCopyLimit({ value: [undefined, 12, 30], isLoading: false, chapterNum: 2 })).toBe(
      30,
    );
  });
  it('treats a missing array as no limit', () => {
    expect(resolveCopyLimit({ value: undefined, isLoading: false, chapterNum: 1 })).toBeUndefined();
  });
  it('treats a missing or null entry as no limit', () => {
    // A `null` chapter entry is how the value arrives over the wire (C# `null` serializes to JSON
    // null); the mock literal isn't structurally typed as `(number | undefined)[]`.
    // eslint-disable-next-line no-null/no-null, no-type-assertion/no-type-assertion
    const value = [undefined, null, 5] as unknown as (number | undefined)[];
    expect(resolveCopyLimit({ value, isLoading: false, chapterNum: 1 })).toBeUndefined();
    expect(resolveCopyLimit({ value, isLoading: false, chapterNum: 9 })).toBeUndefined();
  });
  it('blocks copying while loading', () => {
    expect(resolveCopyLimit({ value: undefined, isLoading: true, chapterNum: 1 })).toBe(0);
  });
  it('blocks copying when the request fails', () => {
    expect(
      resolveCopyLimit({ value: newPlatformError('boom'), isLoading: false, chapterNum: 1 }),
    ).toBe(0);
  });
});

describe('blockCopyWhileChapterLoads', () => {
  it('blocks copying while the chapter text loads, even for a text with no limit', () => {
    expect(blockCopyWhileChapterLoads(10, true)).toBe(0);
    expect(blockCopyWhileChapterLoads(undefined, true)).toBe(0);
  });
  it('passes the limit through once the chapter text has loaded', () => {
    expect(blockCopyWhileChapterLoads(10, false)).toBe(10);
    expect(blockCopyWhileChapterLoads(undefined, false)).toBeUndefined();
  });
});
