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
    // PAPI deserializes a C# `null` entry to `undefined`, so the declared type has no `null`; a
    // `null` that got through anyway must still read as no limit, so the literal is cast.
    // eslint-disable-next-line no-null/no-null, no-type-assertion/no-type-assertion
    const value = [undefined, null, 5] as unknown as (number | undefined)[];
    expect(resolveCopyLimit({ value, isLoading: false, chapterNum: 1 })).toBeUndefined();
  });
  it('treats a chapter past the end of the book as no limit, since it has no text', () => {
    expect(
      resolveCopyLimit({ value: [undefined, 12, 30], isLoading: false, chapterNum: 9 }),
    ).toBeUndefined();
  });
  it("uses chapter 1's limit for chapter 0, which is shown as the start of chapter 1", () => {
    expect(resolveCopyLimit({ value: [undefined, 12, 30], isLoading: false, chapterNum: 0 })).toBe(
      12,
    );
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
