import type { ChecklistContentItem, WalkerParagraph } from './checklist.types';

/**
 * U+202B — Right-to-Left Embedding character. Mirrors libpalaso `StringUtils.rtlMarker`. Exported
 * for the USJ-walker phase, which applies it to text items at extraction time
 * (`c-sharp/Checklists/ChecklistService.cs:1088`). `postProcessParagraph` does NOT use this
 * directly — the walker has already prefixed any RTL text by the time items arrive here.
 */
export const RTL_MARKER = '‫';

/**
 * Per-paragraph post-processor. Two behaviors (BHV-103, INV-004):
 *
 * 1. Prepend a synthetic `TextItem` containing `\marker` at index 0 (INV-004).
 * 2. When `showVerseText` is false, drop the rest of the items (only the marker label remains).
 *
 * RTL handling: per `c-sharp/Checklists/ChecklistService.cs:1088`, the upstream walker applies the
 * RTL prefix to original text items at extraction time. `postProcessParagraph` does NOT re-prefix
 * those items, and the synthetic `\marker` label is NEVER RTL-prefixed. (C#
 * `MarkersDataSource.PostProcessParagraph` at MarkersDataSource.cs:67-79 inserts a
 * backslash-prefixed TextItem with no RTL handling.)
 *
 * Returns a new paragraph; never mutates the input.
 *
 * Port of C# `MarkersDataSource.PostProcessParagraph`
 * (`c-sharp/Checklists/Markers/MarkersDataSource.cs:67-79`).
 */
export function postProcessParagraph(
  paragraph: WalkerParagraph,
  options: { showVerseText: boolean },
): WalkerParagraph {
  const markerLabel: ChecklistContentItem = {
    type: 'text',
    text: `\\${paragraph.marker}`,
    characterStyle: undefined,
  };
  const newItems: ChecklistContentItem[] = options.showVerseText
    ? [markerLabel, ...paragraph.items]
    : [markerLabel];
  return { ...paragraph, items: newItems };
}
