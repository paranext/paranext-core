import type { ChecklistRow } from './checklist.types';

/**
 * Lenient runtime parser for the equivalent-markers string. Silently skips invalid tokens (VAL-005)
 * to preserve runtime robustness — a corrupted settings file must not crash the orchestrator
 * mid-build. Distinct from `parseMarkerSettings`, which is the strict pre-commit UI parser.
 *
 * Returns a bidirectional mapping: every pair `a/b` stores both `a → {b}` and `b → {a}` (INV-005).
 * When the same left-hand marker appears in multiple pairs (e.g. `"q/q1 q/q2"`), the values
 * accumulate into the set.
 *
 * Port of C# `MarkersDataSource.ParseEquivalentMarkerMappings`
 * (`c-sharp/Checklists/Markers/MarkersDataSource.cs:218-240`).
 */
export function initializeMarkerMappings(input: string): ReadonlyMap<string, ReadonlySet<string>> {
  const safeInput = input ?? '';
  const normalized = safeInput.trim().replace(/ +/g, ' ');
  const result = new Map<string, Set<string>>();
  if (normalized.length === 0) return result;

  normalized.split(' ').forEach((token) => {
    const items = token.split('/');
    if (items.length !== 2) return; // VAL-005 — silently skip invalid token.
    const a = items[0].trim();
    const b = items[1].trim();
    if (a.length === 0 || b.length === 0) return; // VAL-005 — empty-side tokens also skipped.
    addBidirectional(result, a, b);
  });

  return result;
}

/** Inserts both `a → b` and `b → a` into the bidirectional map (INV-005). */
function addBidirectional(map: Map<string, Set<string>>, a: string, b: string): void {
  const aSet = map.get(a) ?? new Set<string>();
  aSet.add(b);
  map.set(a, aSet);
  const bSet = map.get(b) ?? new Set<string>();
  bSet.add(a);
  map.set(b, bSet);
}

/**
 * INV-002 / BHV-104: returns true when every adjacent pair of cells in the row has equal paragraph
 * count AND every paragraph is equivalent (identical marker OR mapped via the INV-005 bidirectional
 * mapping).
 *
 * Single-cell (and zero-cell) rows are never a "match" — there's nothing to compare against (PT9
 * line 230).
 *
 * Port of C# `MarkersDataSource.HasSameValue`
 * (`c-sharp/Checklists/Markers/MarkersDataSource.cs:93-124`).
 */
export function hasSameValue(
  row: ChecklistRow,
  markerMappings: ReadonlyMap<string, ReadonlySet<string>>,
): boolean {
  if (row.cells.length <= 1) return false;

  return row.cells.slice(0, -1).every((cell, index) => {
    const nextCell = row.cells[index + 1];
    if (cell.paragraphs.length !== nextCell.paragraphs.length) return false;
    return cell.paragraphs.every((paragraph, paragraphIndex) =>
      isEquivalentMarker(
        paragraph.marker,
        nextCell.paragraphs[paragraphIndex].marker,
        markerMappings,
      ),
    );
  });
}

/**
 * Returns true when `a` and `b` are equal, OR when the forward mapping edge `a → b` is present.
 * Bidirectionality (INV-005) is guaranteed by `initializeMarkerMappings` storing both edges at
 * parse time.
 */
function isEquivalentMarker(
  a: string,
  b: string,
  mappings: ReadonlyMap<string, ReadonlySet<string>>,
): boolean {
  if (a === b) return true;
  return mappings.get(a)?.has(b) ?? false;
}
