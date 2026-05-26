import type { SerializedVerseRef } from '@sillsdev/scripture';
import type { ScriptureRange } from 'platform-scripture';
import type { LocalizeKey } from 'platform-bible-utils';

/**
 * Discriminated-union content item. Mirrors the C# `ChecklistContentItem` hierarchy in
 * `c-sharp/Checklists/ChecklistContentItem.cs`. Structurally aligned with the presentational
 * component's `components/checklist.types.ts` (TextItem uses `characterStyle`); this module is the
 * orchestrator's internal shape, independent from the component's frozen one. Phase 6 will wire a
 * `toChecklistData` adapter between them.
 */
export type ChecklistContentItem =
  | TextItem
  | VerseItem
  | EditLinkItem
  | LinkItem
  | ErrorItem
  | MessageItem;

export type TextItem = {
  type: 'text';
  text: string;
  /**
   * Character marker name (e.g. `ior`, `f`) when this text fragment sits inside a `\marker ...
   * \marker*` span; `undefined` otherwise. Mirrors C# `TextItem.CharacterStyle` (which is `string?`
   * — nullable). The wire emits `null` for empty; the orchestrator can normalize at the
   * serialization boundary.
   */
  characterStyle: string | undefined;
};

export type VerseItem = { type: 'verse'; verseNumber: string };

export type EditLinkItem = {
  type: 'editLink';
  bookNum: number;
  chapterNum: number;
  verseNum: number;
};

/** Reserved — not emitted by the Markers checklist branch; kept for wire-shape parity. */
export type LinkItem = { type: 'link'; reference: ScriptureRange; displayText: string };

export type ErrorItem = { type: 'error'; message: string };

export type MessageItem = { type: 'message'; message: string };

/** USFM paragraph in a cell — wire shape (no walker-internal `verseRefStart` / `isHeading`). */
export type ChecklistParagraph = {
  /** USFM marker name without leading backslash (e.g. `p`, `q1`). */
  marker: string;
  items: ChecklistContentItem[];
};

/**
 * Walker-internal paragraph carrying orchestration metadata (`verseRefStart`, `isHeading`) used by
 * the orchestrator to group paragraphs into cells. NOT serialized to the wire — the orchestrator
 * converts `WalkerParagraph[]` → `ChecklistParagraph[]` by dropping these fields before populating
 * cells.
 */
export type WalkerParagraph = {
  marker: string;
  verseRefStart: SerializedVerseRef;
  isHeading: boolean;
  items: ChecklistContentItem[];
};

export type ChecklistCell = {
  paragraphs: ChecklistParagraph[];
  /** Bridge-capable verse reference; `undefined` for an empty-placeholder cell. */
  reference: ScriptureRange | undefined;
  /** Language tag for the cell's content (from the `GetJoinedTextLanguage` PDP). */
  language: string;
  /** Cell-level error message (overrides paragraph rendering when present). */
  error: string | undefined;
};

export type ChecklistRow = {
  cells: ChecklistCell[];
  isMatch: boolean;
  includeEditLink: boolean;
  /** Always 0 for Markers checklist (the CrossRef checklist uses non-zero scores). */
  score: number;
  /** Earliest verse reference across populated cells; `undefined` when none carries a ref. */
  firstRef: ScriptureRange | undefined;
};

/**
 * Empty-result message. The wire emits `message` as a localize KEY (e.g.
 * `%markersChecklist_emptyResult_identicalMarkers%`); the React layer resolves at render-time. The
 * `noResults` variant carries arrays for the localized template substitution.
 */
export type ChecklistEmptyResultMessage = {
  variant: 'identical' | 'noResults';
  message: LocalizeKey | string;
  searchedMarkers: string[] | undefined;
  searchedBooks: string[] | undefined;
};
