import { useEffect } from 'react';

/** What {@link useMarkerPaletteCompositionClose} needs from its consumer. */
export interface UseMarkerPaletteCompositionCloseOptions {
  /** Whether a marker-palette session is open right now. Read at event time, never captured. */
  isSessionOpen: () => boolean;
  /** Closes the open palette. */
  dismiss: () => void;
  /**
   * Where to listen. The main editor's web view listens on its `window`; the footnote popover
   * listens on its `document`. Defaults to `document`, which is the narrower of the two.
   */
  target?: Window | Document;
}

/**
 * Closes an open marker palette when a composition starts in the editor, letting the composed text
 * land as ordinary typing.
 *
 * THE ONE ACCEPTED GAP IN THE DESIGN, and the reason it is accepted, written once rather than in
 * each consumer. A palette focuses its LIST, where no composition can start — but the session is
 * created synchronously in the trigger's keydown, and for the short window before the palette
 * actually has focus the editor still does. A composition begun in that window cannot be forwarded
 * (it is not a sequence of keydowns the table can read) and cannot be cancelled either:
 * `beforeinput` for `insertCompositionText` is not cancelable, and `compositionstart` accepts
 * `preventDefault` and composes anyway.
 *
 * So the honest options are to let it land with the palette gone, or to make the editor
 * non-editable for the duration — an input lock, which costs the caret, sends stray keys to the
 * page body and leaves focus stranded when the palette closes. This takes the first: close, and let
 * the user see their character.
 *
 * Capture phase, so it runs before anything inside the editor can act on the composition.
 */
export function useMarkerPaletteCompositionClose({
  isSessionOpen,
  dismiss,
  target,
}: UseMarkerPaletteCompositionCloseOptions): void {
  useEffect(() => {
    const listenOn = target ?? document;
    const handleCompositionStart = () => {
      if (isSessionOpen()) dismiss();
    };
    listenOn.addEventListener('compositionstart', handleCompositionStart, { capture: true });
    return () => {
      listenOn.removeEventListener('compositionstart', handleCompositionStart, { capture: true });
    };
  }, [isSessionOpen, dismiss, target]);
}
