import { MutableRefObject, useEffect, useRef } from 'react';

/**
 * Forgets the last edit when `shouldForget` turns true, which ends the claim it gives the editor to
 * the chapter until the next edit is stamped.
 */
export function useForgetEditsWhen(
  shouldForget: boolean | undefined,
  editTimestampRef: MutableRefObject<number | undefined>,
): void {
  const wasTrue = useRef(false);
  // Runs on the false → true edge only, so a re-run clears nothing a caller stamped after
  // `shouldForget` turned true.
  useEffect(() => {
    if (shouldForget && !wasTrue.current) editTimestampRef.current = undefined;
    wasTrue.current = !!shouldForget;
  }, [shouldForget, editTimestampRef]);
}
