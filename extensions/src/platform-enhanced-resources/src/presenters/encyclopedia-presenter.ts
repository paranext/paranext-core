/**
 * Pure-TypeScript presentation module that adapts the C# encyclopedia DTOs (returned by PAPI
 * commands `object:platform.enhancedResources.loadEncyclopedia` and
 * `object:platform.enhancedResources.readArticle`, see
 * `.context/features/enhanced-resources/data-contracts.md` §3.8 / §4.10) to the React UI types
 * consumed by `EncyclopediaTab` / `EncyclopediaDisplayItem` / `EncyclopediaEntryDetail` /
 * `ArticleRenderer`.
 *
 * Intentionally pure: no React, no PAPI, no async, no I/O. All settings, transliteration, and
 * display-mode helpers are injected by the caller via {@link EncyclopediaPresenterOptions}.
 *
 * Forward-note coverage:
 *
 * - **FN-023** — Encyclopedia rows must render source-language fields the same way
 *   `SourceLanguageIndexedList` does for dictionary entries: original-script lemma +
 *   transliteration driven by the active Hebrew/Greek display-mode setting. The presenter selects
 *   which display mode applies (Hebrew vs Greek), computes the lemma transliteration via the
 *   caller's pure helper, and emits `displaySource` (the script form per the active display mode),
 *   `translit` (the headline used as `primaryText` in the SLI), and the original-script `lemma`
 *   (mapped onto the SLI item's `sourceLanguageText`). Caller threads this through the SLI props so
 *   `script` shows the original alone, `translit` shows only the Latin form, and `both` stacks
 *   them.
 * - **FN-020** — Filter propagation. The presenter does NOT own filter state, but it preserves the
 *   `tokenId` (used by the wiring layer's `filteredTokenId` / FN-020(c-e) state machine) and emits
 *   the same `tokenId` regardless of filter, so the wiring layer can drive selection from a
 *   scripture-pane click without re-running the presenter.
 */

// ---------------------------------------------------------------------------
// Input types
// ---------------------------------------------------------------------------

/**
 * Single encyclopedia article reference attached to a display row (mirrors C#
 * EncyclopediaEntryRef).
 */
export interface EncyclopediaEntryRefInput {
  articleId: string;
  key: string;
  title: string;
  teaserText: string;
  formatVersion: 1 | 2;
  inlineImageIds?: string[];
}

/**
 * Encyclopedia display row as returned by the C# loader (mirrors `EncyclopediaDisplayItem` in
 * data-contracts.md §3.8). `lemma` is the original-script form; `sourceText` is the rendered
 * source-language form (may be a comma-separated set when the lemma includes related forms);
 * `translit` is the transliteration. `entries` carries the per-article references (multiple when
 * SDBH/SDBG group several articles under one lemma).
 */
export interface EncyclopediaDisplayItemInput {
  tokenId: string;
  lemma: string;
  sourceText: string;
  translit: string;
  glosses: string[];
  entries: EncyclopediaEntryRefInput[];
  imageIds: string[];
  collection: string;
}

// ---------------------------------------------------------------------------
// Options
// ---------------------------------------------------------------------------

/** Active script-display mode per language (matches the toolbar's `ScriptDisplayMode` semantics). */
export type EncyclopediaDisplayMode = 'script' | 'translit' | 'both';

export interface EncyclopediaPresenterOptions {
  /**
   * Drives which display-mode setting applies. Hebrew → SDBH (`hebrewDisplayMode`); Greek → SDBG
   * (`greekDisplayMode`).
   */
  resourceLanguage: 'heb' | 'grc';
  hebrewDisplayMode: EncyclopediaDisplayMode;
  greekDisplayMode: EncyclopediaDisplayMode;
  /**
   * Pure transliteration helper. Caller supplies; the presenter never reads transliteration off
   * `EncyclopediaDisplayItemInput` directly because the row-level `translit` may be empty when the
   * loader runs without a transliteration service. Falling back through this helper keeps the
   * presenter pure while still letting the wiring layer pass `() => row.translit ?? ''`.
   */
  transliterate: (lemma: string) => string;
}

// ---------------------------------------------------------------------------
// Output types
// ---------------------------------------------------------------------------

/**
 * Encyclopedia row as the UI will render it. The wiring layer maps these onto
 * `EncyclopediaDisplayItemData` (the component's prop shape) and the SLI's `IndexedListItem`
 * adapter (`primaryText` = `translit`, `sourceLanguageText` = `displaySource`, `transliteration` =
 * `translit`).
 */
export interface EncyclopediaItemPresentation {
  tokenId: string;
  /** Original-script lemma (Hebrew/Greek). */
  lemma: string;
  /**
   * Source-language form rendered into the row's `sourceText` slot. This is the value the row's
   * `data-source-language-text` element renders so FN-023 e2e assertions can match it.
   */
  sourceText: string;
  /** Transliteration headline (clickable in the row). */
  translit: string;
  /**
   * Caller-friendly composite source-form per the active display mode:
   *
   * - `script` → original-script lemma
   * - `translit` → transliteration
   * - `both` → `"<lemma> (<translit>)"`
   *
   * Plays the same role as `displaySource` in the dictionary presenter — it's the single string the
   * SLI shows alongside the translit headline when the row is rendered in PT9-style "source plus
   * translit" form (FN-023).
   */
  displaySource: string;
  /** Which display mode was active for this resource (for the row-level renderer). */
  displayMode: EncyclopediaDisplayMode;
  /** Resource language echo so callers can pivot tooltips / aria-labels. */
  dictionaryId: 'SDBH' | 'SDBG';
  glosses: string[];
  /** Per-article references attached to this lemma (multiple when SDBH/SDBG group articles). */
  entries: EncyclopediaEntryRefInput[];
  imageIds: string[];
  collection: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function buildDisplaySource(
  lemma: string,
  translit: string,
  mode: EncyclopediaDisplayMode,
): string {
  switch (mode) {
    case 'translit':
      return translit;
    case 'both':
      // PT9 stacks lemma + (translit). When translit is empty (no service), gracefully fall back
      // to the lemma alone so we don't render a stray "()" suffix.
      return translit ? `${lemma} (${translit})` : lemma;
    case 'script':
    default:
      return lemma;
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Adapt an `EncyclopediaDisplayItem` DTO into the row presentation the React UI consumes.
 *
 * Returns `undefined` when no input is supplied so the caller can render an empty/loading state
 * without a guard at every call site.
 */
export function presentEncyclopediaItem(
  input: EncyclopediaDisplayItemInput | undefined,
  options: EncyclopediaPresenterOptions,
): EncyclopediaItemPresentation | undefined {
  if (!input) return undefined;

  const dictionaryId: 'SDBH' | 'SDBG' = options.resourceLanguage === 'heb' ? 'SDBH' : 'SDBG';
  const displayMode =
    options.resourceLanguage === 'heb' ? options.hebrewDisplayMode : options.greekDisplayMode;

  // Prefer the row's translit when present, fall back through the caller helper. Some loader
  // configurations leave `translit` empty until a transliteration service is wired up.
  const translit =
    input.translit && input.translit.length > 0
      ? input.translit
      : options.transliterate(input.lemma);

  const displaySource = buildDisplaySource(input.lemma, translit, displayMode);

  return {
    tokenId: input.tokenId,
    lemma: input.lemma,
    sourceText: input.sourceText,
    translit,
    displaySource,
    displayMode,
    dictionaryId,
    glosses: input.glosses,
    entries: input.entries,
    imageIds: input.imageIds,
    collection: input.collection,
  };
}

/**
 * Adapt a list of encyclopedia rows in one shot. Convenience wrapper - identical semantics to
 * mapping `presentEncyclopediaItem` over the array, but skips the per-row `undefined` branch so
 * callers can rely on the output array length matching the input.
 */
export function presentEncyclopediaItems(
  inputs: EncyclopediaDisplayItemInput[],
  options: EncyclopediaPresenterOptions,
): EncyclopediaItemPresentation[] {
  return inputs.map((row) => {
    const presentation = presentEncyclopediaItem(row, options);
    // The function only returns undefined when input is undefined; we filter undefined inputs out
    // upstream, so a non-null assertion here is safe and documents the contract.
    if (!presentation) {
      throw new Error('presentEncyclopediaItem returned undefined for a defined row input');
    }
    return presentation;
  });
}
