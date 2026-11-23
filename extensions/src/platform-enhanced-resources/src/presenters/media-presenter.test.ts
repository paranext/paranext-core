import { describe, it, expect } from 'vitest';
import {
  presentMediaItem,
  presentMediaItems,
  SATELLITE_BIBLE_ATLAS_COLLECTION,
  type MediaDisplayItemInput,
  type MediaPresenterOptions,
} from './media-presenter';

/**
 * Inline-Vitest contract tests for `media-presenter` — the pure-TypeScript presentation module that
 * adapts the C# `MediaDisplayItem` DTO (returned by PAPI command
 * `object:platform.enhancedResources.loadMedia`, see
 * `.context/features/enhanced-resources/data-contracts.md` §3.9 / §4.11) to the React UI types
 * consumed by `MediaImagesTab` / `MediaMapsTab` / `MediaEntryRow`.
 *
 * Forward-note coverage:
 *
 * - **FN-023** — Source-language-aware rendering (Hebrew/Greek script + transliteration) is NOT
 *   applied to media items. PT9 surfaces only `title` + `referenceLabel` + `mediaType` for media,
 *   and the round-2 cutoff strategy explicitly exempts media from the FN-023 SLI rule. The contract
 *   test "no source-language fields on the output" pins this decision.
 * - **TS-071 / BHV-601** — Satellite Bible Atlas routing. The C# loader applies the filter
 *   server-side; this presenter accepts the already-filtered list and asserts the contract via a
 *   defensive runtime check. Tests cover both the happy path (correct input passes through) and the
 *   regression case (wrong input throws a clear error).
 */

// ---------------------------------------------------------------------------
// Fixture builders
// ---------------------------------------------------------------------------

function buildInput(overrides: Partial<MediaDisplayItemInput> = {}): MediaDisplayItemInput {
  return {
    imageId: 'corinth-ruins',
    title: 'Ruins of ancient Corinth',
    startRef: { book: '1CO', chapterNum: 1, verseNum: 1 },
    endRef: { book: '1CO', chapterNum: 1, verseNum: 1 },
    collection: 'General',
    ...overrides,
  };
}

function buildOptions(overrides: Partial<MediaPresenterOptions> = {}): MediaPresenterOptions {
  return {
    tabType: 'Images',
    formatReferenceLabel: (start, end) =>
      start.book === end.book &&
      start.chapterNum === end.chapterNum &&
      start.verseNum === end.verseNum
        ? `${start.book} ${start.chapterNum}:${start.verseNum}`
        : `${start.book} ${start.chapterNum}:${start.verseNum}-${end.chapterNum}:${end.verseNum}`,
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('media-presenter', () => {
  describe('happy path — Images tab, single-verse', () => {
    it('produces a complete MediaItemPresentation with the expected fields', () => {
      const input = buildInput();
      const options = buildOptions({ tabType: 'Images' });

      const result = presentMediaItem(input, options);

      expect(result).toEqual({
        imageId: 'corinth-ruins',
        title: 'Ruins of ancient Corinth',
        referenceLabel: '1CO 1:1',
        collection: 'General',
        mediaType: 'image',
      });
    });
  });

  describe('happy path — Images tab, verse range', () => {
    it('formats a multi-verse reference label via the caller-supplied formatter', () => {
      const input = buildInput({
        imageId: 'pentecost-jerusalem',
        title: 'Pentecost gathering in Jerusalem',
        startRef: { book: 'ACT', chapterNum: 2, verseNum: 1 },
        endRef: { book: 'ACT', chapterNum: 5, verseNum: 42 },
      });
      const options = buildOptions({ tabType: 'Images' });

      const result = presentMediaItem(input, options);

      expect(result?.referenceLabel).toBe('ACT 2:1-5:42');
      expect(result?.mediaType).toBe('image');
    });
  });

  describe('Maps tab routing', () => {
    it('emits mediaType="map" when tabType === "Maps"', () => {
      const input = buildInput({
        imageId: 'sba-galilee',
        title: 'Galilee region (Satellite Bible Atlas)',
        startRef: { book: 'MAT', chapterNum: 4, verseNum: 12 },
        endRef: { book: 'MAT', chapterNum: 4, verseNum: 25 },
        collection: SATELLITE_BIBLE_ATLAS_COLLECTION,
      });
      const options = buildOptions({ tabType: 'Maps' });

      const result = presentMediaItem(input, options);

      expect(result?.mediaType).toBe('map');
    });
  });

  describe('FN-023 cutoff: no source-language fields on output', () => {
    it('does NOT carry lemma/translit/displaySource fields', () => {
      const input = buildInput();
      const options = buildOptions();

      const result = presentMediaItem(input, options);

      // Negative assertion - the output shape is intentionally flat (no SLI fields).
      const keys = Object.keys(result ?? {});
      expect(keys).not.toContain('lemma');
      expect(keys).not.toContain('translit');
      expect(keys).not.toContain('displaySource');
      expect(keys).not.toContain('sourceText');
      expect(keys).toEqual(
        expect.arrayContaining(['imageId', 'title', 'referenceLabel', 'collection', 'mediaType']),
      );
    });
  });

  describe('undefined input', () => {
    it('returns undefined when input is undefined', () => {
      expect(presentMediaItem(undefined, buildOptions())).toBeUndefined();
    });
  });

  describe('presentMediaItems — list adaptation', () => {
    it('maps a list 1:1 preserving order', () => {
      const inputs: MediaDisplayItemInput[] = [
        buildInput({ imageId: 'a', title: 'A', collection: 'General' }),
        buildInput({ imageId: 'b', title: 'B', collection: 'General' }),
        buildInput({ imageId: 'c', title: 'C', collection: 'General' }),
      ];
      const options = buildOptions({ tabType: 'Images' });

      const result = presentMediaItems(inputs, options);

      expect(result.map((r) => r.imageId)).toEqual(['a', 'b', 'c']);
      expect(result.every((r) => r.mediaType === 'image')).toBe(true);
    });

    it('returns an empty array for empty input', () => {
      expect(presentMediaItems([], buildOptions())).toEqual([]);
    });
  });

  describe('TS-071 / BHV-601 — SBA-routing contract enforcement', () => {
    it('throws when the Images tab receives a Satellite Bible Atlas item', () => {
      const inputs = [
        buildInput({
          imageId: 'sba-leak',
          collection: SATELLITE_BIBLE_ATLAS_COLLECTION,
        }),
      ];
      const options = buildOptions({ tabType: 'Images' });

      expect(() => presentMediaItems(inputs, options)).toThrow(/Satellite Bible Atlas/);
    });

    it('throws when the Maps tab receives a non-SBA item', () => {
      const inputs = [buildInput({ imageId: 'general-leak', collection: 'General' })];
      const options = buildOptions({ tabType: 'Maps' });

      expect(() => presentMediaItems(inputs, options)).toThrow(/non-SBA/);
    });

    it('passes through a clean Images-tab list (no SBA entries)', () => {
      const inputs = [
        buildInput({ imageId: 'a', collection: 'General' }),
        buildInput({ imageId: 'b', collection: 'TyndaleBibleDictionary' }),
      ];
      const options = buildOptions({ tabType: 'Images' });

      const result = presentMediaItems(inputs, options);
      expect(result).toHaveLength(2);
    });

    it('passes through a clean Maps-tab list (only SBA entries)', () => {
      const inputs = [
        buildInput({
          imageId: 'sba-1',
          collection: SATELLITE_BIBLE_ATLAS_COLLECTION,
        }),
        buildInput({
          imageId: 'sba-2',
          collection: SATELLITE_BIBLE_ATLAS_COLLECTION,
        }),
      ];
      const options = buildOptions({ tabType: 'Maps' });

      const result = presentMediaItems(inputs, options);
      expect(result).toHaveLength(2);
      expect(result.every((r) => r.mediaType === 'map')).toBe(true);
    });
  });

  describe('passthrough fields', () => {
    it('forwards imageId, title, collection unchanged', () => {
      const input = buildInput({
        imageId: 'unique-id-42',
        title: 'A very specific title with Unicode: דשׁא',
        collection: 'TyndaleBibleDictionary',
      });
      const options = buildOptions();

      const result = presentMediaItem(input, options);

      expect(result?.imageId).toBe('unique-id-42');
      expect(result?.title).toBe('A very specific title with Unicode: דשׁא');
      expect(result?.collection).toBe('TyndaleBibleDictionary');
    });
  });
});
