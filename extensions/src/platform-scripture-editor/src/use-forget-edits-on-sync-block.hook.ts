import { MutableRefObject, useEffect, useRef } from 'react';

/**
 * Forgets the last edits when a Send/Receive starts: no typing is possible while blocked, so the
 * merged chapter must win.
 */
export function useForgetEditsOnSyncBlock(
  isSyncBlocked: boolean | undefined,
  ...editTimestampRefs: MutableRefObject<number | undefined>[]
): void {
  const wasSyncBlocked = useRef(false);
  // Runs on the false → true edge only, so re-running with a new rest-parameter array each render
  // clears nothing a caller stamped after the block began.
  useEffect(() => {
    if (isSyncBlocked && !wasSyncBlocked.current)
      editTimestampRefs.forEach((editTimestampRef) => {
        editTimestampRef.current = undefined;
      });
    wasSyncBlocked.current = !!isSyncBlocked;
  }, [isSyncBlocked, editTimestampRefs]);
}
