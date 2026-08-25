import { useEffect, useState } from 'react';

/**
 * A counter that increments whenever the document's selection changes — the freshness signal for
 * anything that must react to a caret move.
 *
 * Why a counter and not the selection itself: consumers need a value that is _different_ on every
 * caret move so React re-renders and effects re-run. A `Selection` object is mutated in place by
 * the browser and is referentially stable, so storing it would never trigger anything.
 *
 * `selectionchange` is a document-level event, so unlike `keydown` it is unaffected by Lexical
 * calling `stopPropagation()` inside the editor — no capture-phase listener is needed.
 *
 * Two consumers depend on this:
 *
 * - `CharacterMarkerBarOverlay` recomputes the bar's `top` when it changes.
 * - `CharacterMarkerBar` re-renders so the trigger's label and `(mixed)` state stay current, which
 *   `useCharacterMarkerState` explicitly requires of its caller.
 *
 * @returns A number that increases by one per selection change, starting at 0
 */
export function useEditorSelectionVersion(): number {
  const [version, setVersion] = useState(0);

  useEffect(() => {
    const handleSelectionChange = () => setVersion((previous) => previous + 1);
    document.addEventListener('selectionchange', handleSelectionChange);
    return () => document.removeEventListener('selectionchange', handleSelectionChange);
  }, []);

  return version;
}

export default useEditorSelectionVersion;
