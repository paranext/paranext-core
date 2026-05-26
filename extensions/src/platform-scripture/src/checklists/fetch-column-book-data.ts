import type { Usj } from '@eten-tech-foundation/scripture-utilities';

/**
 * Minimal structural interface satisfied by the real `@papi/frontend` PAPI client at the call sites
 * `fetchColumnBookData` exercises. Defined here so the helper (and its tests) need not depend on
 * `@papi/frontend` directly — that module is React-Electron-bound and not importable from pure-Node
 * test runs. Production callers pass `papi` from `@papi/frontend`; tests construct `vi.fn()`-based
 * mocks. Only the methods this helper invokes are typed.
 */
export type PapiLike = {
  projectDataProviders: {
    get(type: 'platformScripture.USJ_Book', projectId: string): Promise<UsjBookPdpLike>;
    get(type: 'platformScripture.MarkerNames', projectId: string): Promise<MarkerNamesPdpLike>;
    get(type: 'platform.base', projectId: string): Promise<BasePdpLike>;
  };
};

export type UsjBookPdpLike = { getBookUSJ(bookNum: number): Promise<Usj> };

export type MarkerNamesPdpLike = {
  getHeadingMarkers(bookNum: number): Promise<readonly string[]>;
  getJoinedTextLanguage(bookNum: number): Promise<string>;
};

export type BasePdpLike = {
  getSetting(key: string): Promise<unknown>;
};

/**
 * Per-(project, book) data needed by the checklist orchestrator. Aggregates the three PDP fetches
 * (`USJ_Book`, `MarkerNames`, `base`) into a single batched payload so the orchestrator can iterate
 * (column, book) without juggling individual PDP lifetimes.
 */
export type ColumnBookData = {
  /** Raw USJ document for the requested book. Fed to `walkParagraphMarkers`. */
  usj: Usj;
  /**
   * Set of heading-marker names for this project/book (e.g. `s`, `s1`, `ms`). Used by the walker to
   * apply INV-009 forward-scan when computing a heading paragraph's `verseRefStart`.
   */
  headingMarkers: ReadonlySet<string>;
  /**
   * BCP-47 language tag for the joined text content of this (project, book). Surfaced on the cell
   * for downstream language-aware rendering. Mirrors C#
   * `MarkerNamesDataProvider.GetJoinedTextLanguage`.
   */
  joinedTextLanguage: string;
  /**
   * `platform.isEditable` setting — gates the per-cell `EditLinkItem` emission (BHV-114 / VAL-007
   * cond 4). When `false`, the orchestrator skips appending an `EditLinkItem` to the cell's last
   * paragraph.
   */
  isEditable: boolean;
  /**
   * `true` when `platform.textDirection === 'rtl'`. The walker uses this to prefix RTL text runs at
   * extraction time (mirrors C# `ChecklistService.cs:1088`); `fetchColumnBookData` simply surfaces
   * the resolved flag.
   */
  rtl: boolean;
};

/**
 * Batched per-(project, book) PDP fetch. Acquires the three PDPs the orchestrator needs and reads
 * everything in parallel. Centralizes the PDP wiring so `buildChecklistData` stays focused on
 * pipeline composition rather than PDP lifetime management.
 */
export async function fetchColumnBookData(
  papi: PapiLike,
  projectId: string,
  bookNum: number,
): Promise<ColumnBookData> {
  const [usjPdp, markerNamesPdp, basePdp] = await Promise.all([
    papi.projectDataProviders.get('platformScripture.USJ_Book', projectId),
    papi.projectDataProviders.get('platformScripture.MarkerNames', projectId),
    papi.projectDataProviders.get('platform.base', projectId),
  ]);

  const [usj, headingMarkersArray, joinedTextLanguage, isEditableRaw, textDirectionRaw] =
    await Promise.all([
      usjPdp.getBookUSJ(bookNum),
      markerNamesPdp.getHeadingMarkers(bookNum),
      markerNamesPdp.getJoinedTextLanguage(bookNum),
      basePdp.getSetting('platform.isEditable'),
      basePdp.getSetting('platform.textDirection'),
    ]);

  return {
    usj,
    headingMarkers: new Set(headingMarkersArray),
    joinedTextLanguage,
    isEditable: Boolean(isEditableRaw),
    rtl: textDirectionRaw === 'rtl',
  };
}
