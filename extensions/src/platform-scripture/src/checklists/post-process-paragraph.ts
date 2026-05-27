import type { WalkerParagraph } from './checklist.types';

/**
 * U+202B — Right-to-Left Embedding character. Mirrors libpalaso `StringUtils.rtlMarker`. Exported
 * for the USJ-walker phase, which applies it to text items at extraction time
 * (`c-sharp/Checklists/ChecklistService.cs:1088`). `postProcessParagraph` does NOT use this
 * directly — the walker has already prefixed any RTL text by the time items arrive here.
 */
export const RTL_MARKER = '‫';

/**
 * Per-paragraph post-processor. One behavior (UX-2 #13 / WP1 revision of INV-004):
 *
 * - When `showVerseText` is true, pass through the walker's items unchanged.
 * - When `showVerseText` is false, return an empty items list.
 *
 * The synthetic `\marker` label that previously sat at items[0] (former INV-004) was removed in
 * WP1: the UI now renders the marker label from `paragraph.marker` separately (see
 * `checklist.component.tsx` `renderParagraphLine`), so emitting it as a TextItem here caused a
 * duplicate label in the UI.
 *
 * RTL handling: per `c-sharp/Checklists/ChecklistService.cs:1088`, the upstream walker applies the
 * RTL prefix to original text items at extraction time. `postProcessParagraph` does NOT re-prefix
 * those items.
 *
 * Returns a new paragraph; never mutates the input.
 *
 * Port of C# `MarkersDataSource.PostProcessParagraph`
 * (`c-sharp/Checklists/Markers/MarkersDataSource.cs:67-79`) after UX-2 #13's revision (the C# copy
 * was deleted in PR #2276 along with the rest of the C# orchestrator; the semantic intent of that
 * revision is ported here).
 */
export function postProcessParagraph(
  paragraph: WalkerParagraph,
  options: { showVerseText: boolean },
): WalkerParagraph {
  return { ...paragraph, items: options.showVerseText ? paragraph.items : [] };
}
