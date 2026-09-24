import type { TextCollectionSources } from './scripture-text-grid-contents.utils';
import { getScriptureTextGridContents } from './scripture-text-grid-contents.utils';

/**
 * Orders `refs` by the user's saved `order`: refs whose id appears in `order` come first, in the
 * order's sequence; refs whose id is absent (brand-new resources the user has not reordered yet)
 * are appended at the end in their incoming effective-list order. Pure; never mutates its inputs.
 */
export function applyCellOrder<T extends { id: string }>(refs: T[], order: string[]): T[] {
  const rank = new Map(order.map((id, index) => [id, index]));
  const known: T[] = [];
  const unknown: T[] = [];
  refs.forEach((currentRef) => (rank.has(currentRef.id) ? known : unknown).push(currentRef));
  known.sort((a, b) => (rank.get(a.id) ?? 0) - (rank.get(b.id) ?? 0));
  return [...known, ...unknown];
}

/**
 * Rebuilds the full saved order from a new visible sequence, preserving hidden ids' relative slots
 * (keep-the-slot). Walks `order`; at each position whose id is currently shown, emits the next id
 * from `newShownIdSequence` (re-slotting the shown cells into their new sequence); hidden ids are
 * emitted in place. Shown ids not already in `order` (brand-new) are appended at the end.
 */
export function reorderShownIds(order: string[], newShownIdSequence: string[]): string[] {
  const shownSet = new Set(newShownIdSequence);
  const queue = [...newShownIdSequence];
  const result: string[] = [];
  order.forEach((id) => {
    if (shownSet.has(id)) {
      const next = queue.shift();
      if (next !== undefined) result.push(next);
    } else {
      result.push(id);
    }
  });
  queue.forEach((id) => result.push(id));
  return result;
}

/** Drops ids no longer known (removed from the user's world) from the saved order. */
export function pruneCellOrder(order: string[], knownIds: Iterable<string>): string[] {
  const known = new Set(knownIds);
  return order.filter((id) => known.has(id));
}

/**
 * The saved order with ids absent from `knownIds` removed, or `undefined` when nothing changed.
 * Returning `undefined` on no-op is what makes the reconcile write loop-safe — callers persist only
 * on a defined result.
 */
export function reconcileCellOrder(
  order: string[],
  knownIds: Iterable<string>,
): string[] | undefined {
  const pruned = pruneCellOrder(order, knownIds);
  return pruned.length === order.length ? undefined : pruned;
}

/**
 * Moves `draggedId` to `targetId`'s position within `ids` (the drag-and-drop reorder). Returns the
 * list unchanged when either id is absent or they are the same. Pure; never mutates `ids`.
 */
export function moveId(ids: string[], draggedId: string, targetId: string): string[] {
  if (draggedId === targetId) return ids;
  const from = ids.indexOf(draggedId);
  const to = ids.indexOf(targetId);
  if (from < 0 || to < 0) return ids;
  const next = [...ids];
  next.splice(from, 1);
  next.splice(to, 0, draggedId);
  return next;
}

/** The grid-contents selector with the user's saved order applied; new resources land at the end. */
export function getOrderedScriptureTextGridContents(
  sources: TextCollectionSources,
): ReturnType<typeof getScriptureTextGridContents> {
  return applyCellOrder(getScriptureTextGridContents(sources), sources.order);
}
