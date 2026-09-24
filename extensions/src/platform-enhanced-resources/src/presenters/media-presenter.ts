/**
 * Pure-TypeScript presentation module that adapts the C# `MediaDisplayItem` DTO (returned by PAPI
 * command `object:platform.enhancedResources.loadMedia`, see
 * `.context/features/enhanced-resources/data-contracts.md` §3.9 / §4.11) to the React UI types
 * consumed by `MediaImagesTab` / `MediaMapsTab` / `MediaEntryRow`.
 *
 * Intentionally pure: no React, no PAPI, no async, no I/O. Reference-formatting helpers are
 * injected by the caller via {@link MediaPresenterOptions} so the presenter can stay free of
 * `platform-bible-utils` imports and run as a fast Vitest contract.
 *
 * Forward-note coverage:
 *
 * - **FN-023** — Source-language-aware rendering (Hebrew/Greek script + transliteration)
 *   intentionally does NOT apply to media items. Media entries are verse-ref-keyed (BHV-612) and
 *   PT9 surfaces only `title` + `referenceLabel` + `mediaType` + `collection` for them. The round-2
 *   cutoff strategy explicitly exempts media from the FN-023 SLI rendering rule. The presenter
 *   therefore strips lemma/translit fields so the row data shape is flat; if the C# loader is ever
 *   extended to emit lemma/translit (FN-019 follow-up), a separate presenter pass will pick them
 *   up.
 * - **TS-071 / BHV-601 (Satellite Bible Atlas routing)** — The C# `MediaService.LoadResources`
 *   filters items server-side per `tabType` (Images excludes "Satellite Bible Atlas"; Maps includes
 *   only "Satellite Bible Atlas"). This presenter accepts an already-filtered list and does NOT
 *   re-filter. {@link presentMediaItems} asserts the contract via a runtime check (in dev) so
 *   regressions are caught before they reach the UI.
 */

// ---------------------------------------------------------------------------
// Input types
// ---------------------------------------------------------------------------

/**
 * Verse reference shape used by the C# loader. Matches `SerializedVerseRef` enough for the
 * presenter's needs (book id + chapter/verse numerics).
 *
 * The C# `VerseRef` serializes to the canonical PT10 shape with `book` (string id), `chapterNum`,
 * and `verseNum`. The wiring layer narrows the wire DTO to this minimal shape before calling the
 * presenter.
 */
export interface MediaVerseRefInput {
  book: string;
  chapterNum: number;
  verseNum: number;
}

/**
 * Single media display item as returned by the C# loader (mirrors `MediaDisplayItem` in
 * data-contracts.md §3.9). Verse-ref-only per BHV-612 — no lemma / translit fields.
 *
 * The wiring layer drops fields the UI doesn't use (`imageSource`, `thumbnailSource`,
 * `displayIndex`, `languageCode`, `path`, `fileName`) before calling the presenter.
 */
export interface MediaDisplayItemInput {
  imageId: string;
  title: string;
  startRef: MediaVerseRefInput;
  endRef: MediaVerseRefInput;
  collection: string;
}

// ---------------------------------------------------------------------------
// Options
// ---------------------------------------------------------------------------

/** Which tab the items belong to. Matches the C# `MediaTabType` enum string serialization. */
export type MediaTabType = 'Images' | 'Maps';

export interface MediaPresenterOptions {
  /**
   * Which tab the items belong to. Drives the `mediaType` field in the output and is used to verify
   * the SBA-routing contract (Images tab: no "Satellite Bible Atlas"; Maps tab: only "Satellite
   * Bible Atlas").
   */
  tabType: MediaTabType;
  /**
   * Pure reference formatter. Caller supplies a binding around `formatScrRef` (single ref) or
   * `formatScrRefRange` (start/end). Keeps the presenter free of `platform-bible-utils` imports so
   * unit tests run without a heavy module graph.
   */
  formatReferenceLabel: (start: MediaVerseRefInput, end: MediaVerseRefInput) => string;
}

// ---------------------------------------------------------------------------
// Output types
// ---------------------------------------------------------------------------

/**
 * Media row as the UI will render it. Mirrors `MediaEntryRowData` from
 * `components/media-tab/media-entry-row.component.tsx` so the wiring layer can pass the result
 * directly to `MediaImagesTab.items` / `MediaMapsTab.items` without a second adapter pass.
 */
export interface MediaItemPresentation {
  imageId: string;
  title: string;
  /** Pre-formatted localized verse-range label (e.g., "GEN 1:1" or "ACT 2:1-5:42"). */
  referenceLabel: string;
  collection: string;
  /** UI-side enum derived from the active tab. */
  mediaType: 'image' | 'map';
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/**
 * Exact PT9 string used to identify Satellite Bible Atlas entries. Mirrors
 * `MediaService.SatelliteBibleAtlasCollection` in C#. PT9 used a literal, case-sensitive comparison
 * (gm-018), so the presenter does the same.
 */
export const SATELLITE_BIBLE_ATLAS_COLLECTION = 'Satellite Bible Atlas';

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Adapt a single `MediaDisplayItem` DTO into the row presentation the React UI consumes.
 *
 * Returns `undefined` when no input is supplied so the caller can render an empty/loading state
 * without a guard at every call site.
 */
export function presentMediaItem(
  input: MediaDisplayItemInput | undefined,
  options: MediaPresenterOptions,
): MediaItemPresentation | undefined {
  if (!input) return undefined;

  return {
    imageId: input.imageId,
    title: input.title,
    referenceLabel: options.formatReferenceLabel(input.startRef, input.endRef),
    collection: input.collection,
    mediaType: options.tabType === 'Maps' ? 'map' : 'image',
  };
}

/**
 * Adapt a list of media rows in one shot. Convenience wrapper - identical semantics to mapping
 * `presentMediaItem` over the array, but skips the per-row `undefined` branch so callers can rely
 * on the output array length matching the input.
 *
 * Asserts the SBA-routing contract: items appearing on the Images tab MUST NOT belong to the
 * "Satellite Bible Atlas" collection; items appearing on the Maps tab MUST. The C# loader applies
 * this filter server-side; the presenter check is defense-in-depth so a future regression surfaces
 * here rather than in the UI.
 */
export function presentMediaItems(
  inputs: MediaDisplayItemInput[],
  options: MediaPresenterOptions,
): MediaItemPresentation[] {
  inputs.forEach((input) => {
    const isSba = input.collection === SATELLITE_BIBLE_ATLAS_COLLECTION;
    if (options.tabType === 'Images' && isSba) {
      throw new Error(
        `media-presenter: Images tab received a Satellite Bible Atlas item (${input.imageId}); ` +
          'the C# loader is supposed to filter these out. See TS-071 / BHV-601.',
      );
    }
    if (options.tabType === 'Maps' && !isSba) {
      throw new Error(
        `media-presenter: Maps tab received a non-SBA item (${input.imageId}, ` +
          `collection="${input.collection}"); the C# loader is supposed to keep only SBA. See TS-071 / BHV-601.`,
      );
    }
  });

  return inputs.map((row) => {
    const presentation = presentMediaItem(row, options);
    // The function only returns undefined when input is undefined; we filter undefined inputs out
    // upstream, so a non-null assertion here is safe and documents the contract.
    if (!presentation) {
      throw new Error('presentMediaItem returned undefined for a defined row input');
    }
    return presentation;
  });
}
