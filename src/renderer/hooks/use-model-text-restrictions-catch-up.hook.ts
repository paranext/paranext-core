import { isModelTextRestrictionPending } from '@renderer/components/dialogs/restricted-model-text.utils';
import { DblResourceData } from 'platform-bible-utils';
import { useEffect, useState } from 'react';

/** How long to wait before reading again rows whose model-text restrictions are not known yet */
export const MODEL_TEXT_RESTRICTIONS_RECHECK_MS = 2000;

/**
 * `rows` with their model-text restrictions filled in once the backend knows them.
 *
 * Rows read before the backend first answers come without `isRestrictedAsModelText`, and a picker
 * disables them until it is known. While any row lacks it, this reads the rows again every
 * {@link MODEL_TEXT_RESTRICTIONS_RECHECK_MS} and returns the latest read, so the picker catches up
 * without being reopened. It replaces the rows quietly rather than through the caller's own fetch,
 * which would show the whole list as loading again on every check.
 *
 * @param rows The rows as the caller fetched them, or `undefined` while there are none
 * @param rereadRows Reads the rows again. MUST BE STABLE: a new function every render restarts the
 *   wait for the next check
 * @param isEnabled Whether the caller reads `isRestrictedAsModelText`; when not, nothing is re-read
 * @returns The latest rows: `rows` until a re-read answers, and `rows` again whenever it changes
 */
export function useModelTextRestrictionsCatchUp(
  rows: DblResourceData[] | undefined,
  rereadRows: () => Promise<DblResourceData[] | undefined>,
  isEnabled: boolean,
): DblResourceData[] | undefined {
  // Keyed by the rows it re-read, so a new fetch by the caller replaces an older re-read
  const [reread, setReread] = useState<{ of: DblResourceData[]; rows: DblResourceData[] }>();
  // Bumped after every check, so one that answers with rows still pending, or fails, schedules the next
  const [checkCount, setCheckCount] = useState(0);

  const latestRows = rows && reread?.of === rows ? reread.rows : rows;
  const isPending = isEnabled && !!latestRows?.some(isModelTextRestrictionPending);

  useEffect(() => {
    if (!isPending || !rows) return undefined;
    let isCurrent = true;
    const timeoutId = setTimeout(async () => {
      try {
        const newRows = await rereadRows();
        if (isCurrent && newRows) setReread({ of: rows, rows: newRows });
      } catch {
        // Nothing to do: the rows on screen stay disabled, and the next check tries again
      } finally {
        if (isCurrent) setCheckCount((count) => count + 1);
      }
    }, MODEL_TEXT_RESTRICTIONS_RECHECK_MS);
    return () => {
      isCurrent = false;
      clearTimeout(timeoutId);
    };
  }, [isPending, rows, rereadRows, checkCount]);

  return latestRows;
}
