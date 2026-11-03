/*
 * Mock catalog state shared by the unified Home, project picker, and full-app design-ideas stories.
 * Actions visibly mutate the list: Install/Get/Update go in-flight then land as installed, Sync
 * clears the "needs sync" state, Open bumps last-used, Hide/Unhide flip `isHidden`, Remove drops the
 * row. Only the first page is
 * loaded up front; `fetchMore` pages in the rest after a simulated round-trip.
 */

import { useCallback, useMemo, useState } from 'react';
import type { UnifiedItem, UnifiedItemAction } from './home-unified.component';
import { FULL_CATALOG } from './unified-items.data';

export const INITIAL_PAGE = 100;

export type UnifiedCatalog = {
  items: UnifiedItem[];
  inFlightIds: string[];
  hasMore: boolean;
  fetchMore: () => void;
  applyAction: (item: UnifiedItem, action: UnifiedItemAction) => Promise<void>;
  /** Total DBL-not-installed count in the whole catalog — the fast count-only backend call. */
  dblAvailableCount: number;
};

export function useUnifiedCatalog(catalog: UnifiedItem[] = FULL_CATALOG): UnifiedCatalog {
  const [items, setItems] = useState<UnifiedItem[]>(() => catalog.slice(0, INITIAL_PAGE));
  const [inFlightIds, setInFlightIds] = useState<string[]>([]);
  const hasMore = items.length < catalog.length;
  const dblAvailableCount = useMemo(
    () => catalog.filter((item) => item.status === 'dblNotInstalled').length,
    [catalog],
  );

  const fetchMore = useCallback(() => {
    // Simulate a network round-trip so the "Loading more…" affordance is visible.
    setTimeout(() => setItems(catalog), 400);
  }, [catalog]);

  const applyAction = useCallback(
    (item: UnifiedItem, action: UnifiedItemAction): Promise<void> =>
      new Promise<void>((resolve) => {
        switch (action.kind) {
          case 'install':
          case 'get':
          case 'update': {
            setInFlightIds((prev) => [...prev, item.id]);
            setTimeout(() => {
              setInFlightIds((prev) => prev.filter((id) => id !== item.id));
              setItems((prev) =>
                prev.map((current) => {
                  if (current.id !== item.id) return current;
                  // Projects sitting on the S/R server become editable local projects; DBL
                  // resources become installed resources. Updates just clear the update flag.
                  const nextStatus =
                    current.type === 'Project' ? 'installedProject' : 'installedResource';
                  // lastUsedIso stays put — Install/Get/Update change the item's *status*, not the
                  // user's usage history — so the row doesn't jump under "Recent" sort.
                  return { ...current, status: nextStatus };
                }),
              );
              resolve();
            }, 900);
            break;
          }
          case 'sync': {
            setInFlightIds((prev) => [...prev, item.id]);
            setTimeout(() => {
              setInFlightIds((prev) => prev.filter((id) => id !== item.id));
              setItems((prev) =>
                prev.map((current) =>
                  current.id === item.id
                    ? {
                        ...current,
                        status: 'installedProject',
                        // Sync is a status change, not a fresh "opened" event, so lastUsedIso
                        // stays where it was and the row doesn't jump.
                        editedLocallyIso: undefined,
                        editedOnServerIso: undefined,
                      }
                    : current,
                ),
              );
              resolve();
            }, 700);
            break;
          }
          case 'open':
            // Single-click Open bumps lastUsedIso so the row rises under "Recent" sort — that
            // matches what "last used" measures. Batch Open skips the bump so a multiselect Open
            // doesn't cascade-reorder every affected row.
            if (!action.batch) {
              setItems((prev) =>
                prev.map((current) =>
                  current.id === item.id
                    ? { ...current, lastUsedIso: new Date().toISOString() }
                    : current,
                ),
              );
            }
            resolve();
            break;
          case 'hide':
          case 'unhide':
            setItems((prev) =>
              prev.map((current) =>
                current.id === item.id ? { ...current, isHidden: action.kind === 'hide' } : current,
              ),
            );
            resolve();
            break;
          case 'remove':
            setItems((prev) => prev.filter((current) => current.id !== item.id));
            resolve();
            break;
          default:
            resolve();
            break;
        }
      }),
    [],
  );

  return { items, inFlightIds, hasMore, fetchMore, applyAction, dblAvailableCount };
}
