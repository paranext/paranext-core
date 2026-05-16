/**
 * Pure-TypeScript presentation module that adapts the C# `TooltipData` DTO (returned by the
 * `EnhancedResourcesNetworkObject.buildTooltipData` proxy method - see
 * `lib/use-enhanced-resources-proxy.ts` and
 * `.context/features/enhanced-resources/data-contracts.md`) to the UI-ready view model consumed by
 * `renderTooltipMarkdown` in `scripture-pane.component.tsx`.
 *
 * Intentionally pure: no React, no PAPI, no async, no I/O. Optional helpers (POS localization) are
 * injected by the caller via {@link TooltipPresenterHelpers}.
 *
 * Owns: gloss filtering (port of PT9 `MarbleForm.cs` `FilterGlosses`), phrase detection from raw
 * POS code, first-gloss selection, pass-through of the rendering-status block.
 *
 * Does not own: markdown emission, localization key lookup, format-string substitution,
 * `escapeMarkdown`. Those live in `scripture-pane.component.tsx`.
 */
import type { TooltipDataDto } from '../lib/enhanced-resources-dto';

/**
 * Raw tooltip data as returned by the C# `buildTooltipData` network-object method. Aliases the
 * canonical wire DTO (`TooltipDataDto` in `lib/enhanced-resources-dto.ts`) so the presenter
 * consumes it without introducing a second source of truth for the field shape.
 */
export type TooltipDataInput = TooltipDataDto;

// Re-export for callers that already imported the DTO via this module.
export type { TooltipDataDto };

/**
 * UI-ready tooltip view model. `kind: 'phrase'` collapses to the short PT9-fidelity layout
 * (sourceForm + "(phrase)" line); `kind: 'word'` carries the full structured fields.
 */
export type TooltipViewModel =
  | { kind: 'phrase'; sourceForm: string }
  | {
      kind: 'word';
      sourceForm: string;
      lemma: string;
      posRaw: string;
      posLocalized: string | undefined;
      gloss: string | undefined;
      renderingStatus?: TooltipDataInput['renderingStatus'];
    };

export interface TooltipPresenterHelpers {
  /**
   * Map a raw POS code (e.g. "noun") to a localized display string (e.g. "noun (feminine)").
   * Optional - when omitted or returning undefined, the markdown emitter falls back to the raw POS
   * code. No new POS lookup tables are introduced; this helper is wired only if an existing PT10
   * mechanism is found in audit.
   */
  localizePartOfSpeech?: (posRaw: string) => string | undefined;
}

/** Raw POS value that flags the token as a phrase. Matches PT9 `MarbleToken.phrasePartOfSpeech`. */
export const PHRASE_POS_RAW = 'phrase';

/**
 * Strip PT9's brace-annotation blocks from a single gloss. Mirrors MarbleForm.cs:`RemoveBraces` -
 * `Regex.Replace(gloss, @"\{.*?\}", "")`.
 *
 * Non-greedy match per gloss; nested braces are not a documented case in PT9.
 */
export function stripGlossBraces(gloss: string): string {
  return gloss.replace(/\{.*?\}/g, '');
}

/**
 * Port of PT9 `MarbleForm.cs` `FilterGlosses`. Strips brace blocks from each gloss; drops glosses
 * that become empty (or were empty / whitespace-only to begin with). Returns the filtered list in
 * original order so callers can pick the first one as the canonical gloss.
 */
export function filterGlosses(rawGlosses: string[]): string[] {
  return rawGlosses.map((g) => stripGlossBraces(g).trim()).filter((g) => g.length > 0);
}

/** Adapt a raw tooltip DTO into a UI-ready view model. Pure - no I/O, no React, no async. */
export function presentTooltip(
  input: TooltipDataInput,
  helpers: TooltipPresenterHelpers = {},
): TooltipViewModel {
  if (input.partOfSpeechRaw === PHRASE_POS_RAW) {
    return { kind: 'phrase', sourceForm: input.sourceForm };
  }
  const filtered = filterGlosses(input.rawGlosses);
  return {
    kind: 'word',
    sourceForm: input.sourceForm,
    lemma: input.lemma,
    posRaw: input.partOfSpeechRaw,
    posLocalized: helpers.localizePartOfSpeech?.(input.partOfSpeechRaw),
    gloss: filtered[0],
    renderingStatus: input.renderingStatus,
  };
}
