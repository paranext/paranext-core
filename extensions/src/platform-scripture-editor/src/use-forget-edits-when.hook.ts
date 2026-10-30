import { MutableRefObject, useEffect, useRef } from 'react';

/**
 * Forgets the last edits when `shouldForget` turns true, which ends the claim they give the editor
 * to the chapter until the next edit is stamped. Refs that are `undefined` are skipped.
 */
export function useForgetEditsWhen(
  shouldForget: boolean | undefined,
  ...editTimestampRefs: (MutableRefObject<number | undefined> | undefined)[]
): void {
  const wasTrue = useRef(false);
  // Runs on the false → true edge only, so re-running with a new rest-parameter array each render
  // clears nothing a caller stamped after `shouldForget` turned true.
  useEffect(() => {
    if (shouldForget && !wasTrue.current)
      editTimestampRefs.forEach((editTimestampRef) => {
        if (editTimestampRef) editTimestampRef.current = undefined;
      });
    wasTrue.current = !!shouldForget;
  }, [shouldForget, editTimestampRefs]);
}
