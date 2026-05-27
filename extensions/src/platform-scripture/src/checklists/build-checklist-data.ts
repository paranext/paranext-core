import { Canon, type SerializedVerseRef } from '@sillsdev/scripture';
import type { ScriptureRange } from 'platform-scripture';
import type { LocalizeKey } from 'platform-bible-utils';
import { fetchColumnBookData, type PapiLike, type ColumnBookData } from './fetch-column-book-data';
import { walkParagraphMarkers } from './usj-paragraph-walker';
import { postProcessParagraph } from './post-process-paragraph';
import { buildRowsMergingCells } from './checklist-row-builder';
import { hasSameValue, initializeMarkerMappings } from './match-detection';
import type {
  ChecklistCell,
  ChecklistEmptyResultMessage,
  ChecklistParagraph,
  ChecklistRow,
  EditLinkItem,
  WalkerParagraph,
} from './checklist.types';

/** INV-012 — hard cap on rows returned. C# `ChecklistService.cs` MaxRows = 5000. */
const MAX_ROWS = 5000;

/**
 * Localize KEY emitted in `emptyResultMessage.message` when the result is empty and `markerFilter`
 * is empty. The React layer resolves this key at render-time via `useLocalizedStrings`.
 */
const IDENTICAL_MARKERS_MESSAGE_KEY: LocalizeKey =
  '%markersChecklist_emptyResult_identicalMarkers%';

/**
 * Input request shape for `buildChecklistData`. Matches the existing wire shape exposed by the web
 * view's checklist-request adapter so Phase 6 wiring stays minimal. See
 * `c-sharp/Checklists/Markers/MarkersDataSource.cs` and the existing web view adapter for the
 * authoritative field semantics.
 */
export type ChecklistRequest = {
  /** Primary (left-most column) project. Drives column 0 of the result. */
  projectId: string;
  /** Comparative columns to align against `projectId`. Empty array → single-column mode (INV-002). */
  comparativeTextIds: string[];
  /**
   * Marker settings parsed by Phase 3 helpers. `equivalentMarkers` feeds `initializeMarkerMappings`
   * (lenient); `markerFilter` is whitespace-tokenized into a `Set<string>` after backslash strip (§
   * 7.1 / VAL-001).
   */
  markerSettings: { equivalentMarkers: string; markerFilter: string };
  /**
   * Effective scripture range. `undefined` means "default range" (GEN 1:0 → REV 22:21). VAL-003
   * coerces `GEN 1:1 → GEN 1:0` to ensure intro material at verse 0 is included.
   */
  verseRange: ScriptureRange | undefined;
  /** When true (multi-column only), drop rows where `isMatch === true` and bump `excludedCount`. */
  hideMatches: boolean;
  /** When false, postProcessParagraph emits ONLY the synthetic `\marker` label (BHV-103). */
  showVerseText: boolean;
};

/**
 * Output shape. Mirrors the C# `ChecklistResult` record so the React layer doesn't need a separate
 * adapter for the orchestrator path. Per consumer-inventory § 7.4, the orchestrator emits
 * `undefined` for missing optional fields (Phase 3/4 convention); the React layer doesn't serialize
 * through JSON-RPC so the difference is invisible at the UI boundary.
 */
export type ChecklistResult = {
  rows: ChecklistRow[];
  columnHeaders: string[];
  columnProjectIds: string[];
  excludedCount: number;
  helpText: string | undefined;
  truncated: boolean;
  emptyResultMessage: ChecklistEmptyResultMessage | undefined;
};

/**
 * Thrown when a column projectId fails to resolve to a `platform.base` PDP (e.g. the project was
 * removed or its GUID is malformed). The caller (`useDataProvider` in the web view) maps this to a
 * user-facing error toast.
 */
/**
 * Custom error shape. We avoid `extends Error` because SWC's down-compilation of
 * class-extending-Error generates a polyfill that touches `Function.bind.apply(...)` — and the
 * extension-host sandbox blocks the global `Function` constructor, which causes the entire
 * extension to fail to activate with `ReferenceError: Function is not defined`. Instead we attach a
 * sentinel `name` + `code` to a plain `Error` instance via the factory, and expose an
 * `isProjectNotFoundError(err)` type guard for callers that need to discriminate.
 */
export type ProjectNotFoundErrorType = Error & {
  name: 'ProjectNotFoundError';
  code: 'PROJECT_NOT_FOUND';
  projectId: string;
};

/** Create a project-not-found error without extending the native `Error` class (see above). */
export function makeProjectNotFoundError(projectId: string): ProjectNotFoundErrorType {
  // Build the error via Object.assign so the return type narrows naturally from the literal
  // object shape — no `as` cast needed, satisfies no-type-assertion.
  return Object.assign(new Error(`Project not found: ${projectId}`), {
    name: 'ProjectNotFoundError' as const,
    code: 'PROJECT_NOT_FOUND' as const,
    projectId,
  });
}

/** Type guard — returns true when `err` is a `ProjectNotFoundError` produced by this module. */
export function isProjectNotFoundError(err: unknown): err is ProjectNotFoundErrorType {
  // `'code' in err` narrows the type to `{ code: unknown }` automatically (TS 4.9+).
  return err instanceof Error && 'code' in err && err.code === 'PROJECT_NOT_FOUND';
}

/**
 * @deprecated Use {@link makeProjectNotFoundError} / {@link isProjectNotFoundError} instead. Kept as
 *   a no-op symbol export so consumers updating from prior drafts still compile until they migrate
 *   to the factory + guard pattern.
 */
export const ProjectNotFoundError = makeProjectNotFoundError;

/**
 * Top-level orchestrator — replaces backend `ChecklistService.BuildChecklistData`.
 *
 * Pipeline: 0. Resolve column project metadata (`platform.name` + `platform.fullName` per § 7.3).
 *
 * 1. Compute effective `[startRef, endRef]` (BHV-118 defaults + VAL-003 GEN 1:1 → GEN 1:0).
 * 2. Parse marker settings via `initializeMarkerMappings` + tokenize `markerFilter` after backslash
 *    strip (§ 7.1 / VAL-001).
 * 3. Compute book-number iteration list (intersect `platformScripture.booksPresent` with range).
 * 4. Per column, per book: `fetchColumnBookData` → `walkParagraphMarkers` → `postProcessParagraph` →
 *    group walker paragraphs by `verseRefStart` into cells (§ 6).
 * 5. Row alignment via `buildRowsMergingCells`.
 * 6. Match detection (`hasSameValue`) + INV-002 single-column override.
 * 7. `hideMatches` filter (drop matches, bump excludedCount).
 * 8. Max-rows cap (INV-012; truncate at 5000).
 * 9. EditLinkItem placement (BHV-114 / VAL-007 cond 4) — per editable cell with non-undefined
 *    reference, append `EditLinkItem` to the LAST paragraph's items.
 * 10. Empty-result-message variant detection (BHV-106 / INV-008; UX-2 #3 backend revision: the
 *     "identical markers" variant is now gated on BOTH `markerFilter.size === 0` AND
 *     `comparativeTextIds.length > 0`. The empty-with-no-comparatives case falls through to the
 *     `noResults` variant — there is no "identical markers" message to show when there are no
 *     comparatives to be identical to.).
 */
export async function buildChecklistData(
  request: ChecklistRequest,
  papi: PapiLike,
): Promise<ChecklistResult> {
  const columnProjectIds = [request.projectId, ...request.comparativeTextIds];

  // Step 0: resolve column project metadata (name + fullName). Both are fetched; only `name` is
  // currently surfaced in the column header (§ 7.3) — `fullName` is reserved for the tooltip.
  const columnMetas = await Promise.all(
    columnProjectIds.map(async (id) => {
      try {
        const basePdp = await papi.projectDataProviders.get('platform.base', id);
        const name = await basePdp.getSetting('platform.name');
        const fullName = await basePdp.getSetting('platform.fullName');
        return {
          id,
          name: typeof name === 'string' ? name : id,
          fullName: typeof fullName === 'string' ? fullName : id,
        };
      } catch {
        throw makeProjectNotFoundError(id);
      }
    }),
  );

  // Step 1: effective verse range. Per the `ScriptureRange` contract (mirrors PT9's
  // `ChecklistService.ResolveVerseRange`):
  //   - `verseRange === undefined` → entire project (GEN 1:0 → REV 22:21).
  //   - `verseRange.start` defined, `verseRange.end` undefined → single-verse range AT `start`
  //     (collapse `end` to `start`). Previously we fell back to REV 22:21 here, which expanded a
  //     single-verse request into a whole-project scan.
  //   - `verseRange.end` defined → use both ends as-is.
  // VAL-003 (GEN 1:1 → GEN 1:0) is applied to the start so intro material is included; the end is
  // left as-supplied so a single-verse request at GEN 1:1 still resolves to GEN 1:1 on the end.
  let startRef: SerializedVerseRef;
  let endRef: SerializedVerseRef;
  if (request.verseRange === undefined) {
    startRef = defaultStartRef();
    endRef = defaultEndRef();
  } else {
    startRef = applyVal003(request.verseRange.start);
    endRef = request.verseRange.end ?? request.verseRange.start;
  }

  // Step 2: parse marker settings.
  const markerMappings = initializeMarkerMappings(request.markerSettings.equivalentMarkers);
  const markerFilter = parseMarkerFilter(request.markerSettings.markerFilter);

  // Step 3: book-number iteration list (intersect booksPresent with range).
  const primaryBasePdp = await papi.projectDataProviders.get('platform.base', request.projectId);
  const booksPresentSetting = await primaryBasePdp.getSetting('platformScripture.booksPresent');
  const booksPresent =
    typeof booksPresentSetting === 'string' ? booksPresentSetting : `1${'0'.repeat(122)}`;
  const bookNumbers = computeBookNumbers(booksPresent, startRef, endRef);

  // Step 4: per (column, book) → cells. Walk + post-process + group by verseRefStart. We dispatch
  // all (column, book) fetches in parallel via Promise.all — PDP fetches dominate the wall-clock
  // cost, so the parallelism is meaningful; the synchronous walker/post-process/grouping work
  // happens deterministically in the same order regardless.
  const perColumnBookData = await Promise.all(
    columnProjectIds.map((projectId) =>
      Promise.all(bookNumbers.map((bookNum) => fetchColumnBookData(papi, projectId, bookNum))),
    ),
  );

  const columnsCells: ChecklistCell[][] = perColumnBookData.map((bookDataList) =>
    bookDataList.flatMap((data, bookIndex) => {
      const walkerParagraphs = walkParagraphMarkers(
        data.usj,
        bookNumbers[bookIndex],
        markerFilter,
        data.headingMarkers,
      );
      // Filter walker paragraphs to those whose verseRefStart falls within [startRef, endRef].
      // The walker emits every paragraph in the book; the orchestrator restricts to the request's
      // verseRange so single-book single-chapter requests don't pull in the rest of the book.
      const inRangeParagraphs = walkerParagraphs.filter((p) =>
        isVerseRefInRange(p.verseRefStart, startRef, endRef),
      );
      const processed = inRangeParagraphs.map((p) =>
        postProcessParagraph(p, { showVerseText: request.showVerseText }),
      );
      return groupParagraphsIntoCells(processed, data);
    }),
  );

  // Editability is per-(project, book); for the EditLink gate we treat the column as editable
  // when any book in that column is editable. In practice `isEditable` is a project-level setting,
  // so this OR-reduce simply mirrors the project's flag — but doing it per-book keeps us correct
  // if PDP-side gating ever differentiates.
  const columnsEditability: boolean[] = perColumnBookData.map((bookDataList) =>
    bookDataList.some((data) => data.isEditable),
  );

  // Step 5: row alignment.
  let rows = buildRowsMergingCells(columnsCells);

  // Populate row-level `includeEditLink` per c-sharp/Checklists/ChecklistRowBuilder.cs:712 —
  // VAL-007 cond 2 row-level signal: the first cell of the row has a non-undefined reference.
  rows = rows.map((r) => ({
    ...r,
    includeEditLink: r.cells.length > 0 && r.cells[0].reference !== undefined,
  }));

  // Step 6: match detection (+ INV-002 single-column override).
  if (columnProjectIds.length === 1) {
    rows = rows.map((r) => ({ ...r, isMatch: true }));
  } else {
    rows = rows.map((r) => ({ ...r, isMatch: hasSameValue(r, markerMappings) }));
  }

  // Step 7: hideMatches filter (multi-column only — there's nothing to compare against in a
  // single-column layout, so INV-002 forces every row to match and we'd drop everything).
  let excludedCount = 0;
  if (request.hideMatches && columnProjectIds.length > 1) {
    const filtered: ChecklistRow[] = [];
    rows.forEach((row) => {
      if (row.isMatch) excludedCount += 1;
      else filtered.push(row);
    });
    rows = filtered;
  }

  // Step 8: max-rows cap (INV-012).
  const truncated = rows.length > MAX_ROWS;
  if (truncated) rows = rows.slice(0, MAX_ROWS);

  // Step 9: EditLinkItem placement (BHV-114 / VAL-007 cond 4). Gate per-cell on per-column
  // `isEditable` AND non-undefined `cell.reference` (an empty-placeholder cell has reference
  // undefined). The link payload reads bookNum/chapterNum/verseNum from the cell's reference.start.
  rows = rows.map((row) => ({
    ...row,
    cells: row.cells.map((cell, columnIndex) =>
      maybeAppendEditLink(cell, columnsEditability[columnIndex]),
    ),
  }));

  // Step 10: empty-result-message variant detection.
  const emptyResultMessage =
    rows.length === 0
      ? buildEmptyResultMessage(markerFilter, bookNumbers, request.comparativeTextIds.length > 0)
      : undefined;

  return {
    rows,
    columnHeaders: columnMetas.map((m) => m.name),
    columnProjectIds,
    excludedCount,
    helpText: undefined,
    truncated,
    emptyResultMessage,
  };
}

// ===== Helpers =====================================================================

/**
 * Group walker paragraphs (carrying `verseRefStart`) into cells by distinct verseRef, preserving
 * document order. Per consumer-inventory § 6, multiple paragraphs at the same verseRef merge into
 * ONE cell — without this grouping, scenario-01's 24-paragraph intro would become 24 rows instead
 * of 1.
 *
 * The walker-internal `verseRefStart` and `isHeading` fields are dropped here when converting
 * `WalkerParagraph` → wire `ChecklistParagraph` (the wire shape carries only `marker` + `items`).
 */
function groupParagraphsIntoCells(
  paragraphs: WalkerParagraph[],
  data: ColumnBookData,
): ChecklistCell[] {
  const cells: ChecklistCell[] = [];
  let currentRef: SerializedVerseRef | undefined;
  let currentParagraphs: ChecklistParagraph[] = [];

  const flush = () => {
    if (currentParagraphs.length === 0 || !currentRef) return;
    cells.push({
      paragraphs: currentParagraphs,
      reference: { start: currentRef },
      language: data.joinedTextLanguage,
      error: undefined,
    });
    currentParagraphs = [];
  };

  paragraphs.forEach((p) => {
    if (!currentRef || !verseRefsEqual(p.verseRefStart, currentRef)) {
      flush();
      currentRef = p.verseRefStart;
    }
    // Convert walker → wire paragraph by stripping verseRefStart + isHeading.
    currentParagraphs.push({ marker: p.marker, items: p.items });
  });
  flush();

  return cells;
}

function verseRefsEqual(a: SerializedVerseRef, b: SerializedVerseRef): boolean {
  return a.book === b.book && a.chapterNum === b.chapterNum && a.verseNum === b.verseNum;
}

/**
 * BHV-114 / VAL-007 cond 4: append an `EditLinkItem` to the cell's LAST paragraph when the column
 * is editable AND the cell has a non-undefined reference (mirrors C#
 * `ChecklistService.ApplyEditLinkGating` at c-sharp/Checklists/ChecklistService.cs:565). Returns
 * the cell unchanged when either gate fails or the cell has zero paragraphs (defensive).
 */
function maybeAppendEditLink(cell: ChecklistCell, columnIsEditable: boolean): ChecklistCell {
  if (!columnIsEditable) return cell;
  if (!cell.reference) return cell;
  if (cell.paragraphs.length === 0) return cell;

  const vref = cell.reference.start;
  const editLink: EditLinkItem = {
    type: 'editLink',
    bookNum: Canon.bookIdToNumber(vref.book),
    chapterNum: vref.chapterNum,
    verseNum: vref.verseNum,
  };

  const lastIndex = cell.paragraphs.length - 1;
  const lastParagraph = cell.paragraphs[lastIndex];
  const updatedParagraphs = cell.paragraphs.map((p, i) =>
    i === lastIndex ? { ...lastParagraph, items: [...lastParagraph.items, editLink] } : p,
  );
  return { ...cell, paragraphs: updatedParagraphs };
}

/** Default range start — intro material (verse 0) of Genesis 1. */
function defaultStartRef(): SerializedVerseRef {
  return { book: 'GEN', chapterNum: 1, verseNum: 0 };
}

/** Default range end — last verse of Revelation. */
function defaultEndRef(): SerializedVerseRef {
  return { book: 'REV', chapterNum: 22, verseNum: 21 };
}

/**
 * VAL-003: coerce `GEN 1:1` → `GEN 1:0` so intro material (\ip at verse 0) is always included when
 * the request starts at the canonical first verse.
 */
function applyVal003(ref: SerializedVerseRef): SerializedVerseRef {
  // VAL-003: any chapter-1-verse-1 start is coerced to verse 0 so a book's intro material
  // (\ide, \rem, \toc1-3, \mt1, \ip, \io1, etc., all keyed to verseNum 0) is included. Generic
  // across all books — baseline scenarios 01 (GEN) and 10 (MAT) both depend on this.
  if (ref.chapterNum === 1 && ref.verseNum === 1) {
    return { ...ref, verseNum: 0 };
  }
  return ref;
}

/**
 * Returns true when `ref` falls within `[startRef, endRef]` inclusive on the canonical (bookNum,
 * chapterNum, verseNum) lexicographic ordering. Used to filter walker paragraphs to just those
 * inside the request's `verseRange` so a single-chapter request doesn't pull in the rest of the
 * book.
 */
function isVerseRefInRange(
  ref: SerializedVerseRef,
  startRef: SerializedVerseRef,
  endRef: SerializedVerseRef,
): boolean {
  return compareVerseRef(ref, startRef) >= 0 && compareVerseRef(ref, endRef) <= 0;
}

/** Lexicographic compare on (bookNum, chapterNum, verseNum). */
function compareVerseRef(a: SerializedVerseRef, b: SerializedVerseRef): number {
  const aBookNum = Canon.bookIdToNumber(a.book);
  const bBookNum = Canon.bookIdToNumber(b.book);
  if (aBookNum !== bBookNum) return aBookNum - bBookNum;
  if (a.chapterNum !== b.chapterNum) return a.chapterNum - b.chapterNum;
  return a.verseNum - b.verseNum;
}

/**
 * Compute the inclusive book-number iteration list. Intersects the `booksPresent` 123-char binary
 * string (position N = book number N, '1' = present) with the requested `[startBook, endBook]`
 * range. Ordering follows the canonical book-number sequence.
 */
function computeBookNumbers(
  booksPresent: string,
  startRef: SerializedVerseRef,
  endRef: SerializedVerseRef,
): number[] {
  const startBookNum = Canon.bookIdToNumber(startRef.book);
  const endBookNum = Canon.bookIdToNumber(endRef.book);
  const result: number[] = [];
  for (let n = startBookNum; n <= endBookNum; n += 1) {
    if (booksPresent.charAt(n - 1) === '1') result.push(n);
  }
  return result;
}

/**
 * Parse the user-entered `markerFilter` string. § 7.1 / VAL-001: strip backslashes first (a user
 * typing `\p \q` produces `{p, q}`, not `{\p, \q}`), then trim + whitespace-split into a Set.
 */
function parseMarkerFilter(input: string): ReadonlySet<string> {
  const stripped = input.replace(/\\/g, '');
  return new Set(
    stripped
      .trim()
      .split(/\s+/)
      .filter((s) => s.length > 0),
  );
}

/**
 * UX-2 #3 backend (port of WP1's C# revision): gate the `identical` variant on BOTH
 * `markerFilter.size === 0` AND `hasComparativeTexts === true`. When the filter is empty AND there
 * is at least one comparative column, the empty result means "no differences found" → identical
 * markers. When the filter is non-empty, the empty result means "no paragraphs matched the filter"
 * → noResults, carrying searchedMarkers + searchedBooks for the localized template substitution.
 * When the filter is empty but there are NO comparatives, "identical markers" makes no sense (there
 * is nothing to be identical to), so we fall through to `noResults` as well — the UI's
 * `checklist.component.tsx` then resolves a generic "no markers found" message rather than the
 * misleading "Comparative texts have identical markers." string.
 */
function buildEmptyResultMessage(
  markerFilter: ReadonlySet<string>,
  bookNumbers: readonly number[],
  hasComparativeTexts: boolean,
): ChecklistEmptyResultMessage {
  if (markerFilter.size === 0 && hasComparativeTexts) {
    return {
      variant: 'identical',
      message: IDENTICAL_MARKERS_MESSAGE_KEY,
      searchedMarkers: undefined,
      searchedBooks: undefined,
    };
  }
  return {
    variant: 'noResults',
    message: '',
    searchedMarkers: [...markerFilter],
    searchedBooks: bookNumbers.map((n) => Canon.bookNumberToId(n)),
  };
}
