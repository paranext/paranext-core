import { useEffect, useRef } from 'react';

/**
 * Toggles the footnotes pane on a bare F7, from anywhere in the view.
 *
 * This is the view's only keyboard shortcut. The content zoom chords (Ctrl/⌘ with `+`, `-` or `0`)
 * belong to the platform's per-pane content zoom, which reaches this view through the areas it
 * marks: both would listen bubble-phase on `window` and neither stops propagation, so a handler
 * here would make one keypress drive both.
 *
 * @param showFootnotes Whether the footnotes pane is showing
 * @param setShowFootnotes Shows or hides the footnotes pane. Takes a plain value, like a
 *   `useWebViewState` setter, so the latest `showFootnotes` is read from a ref rather than from the
 *   closure the listener was registered with.
 */
export function useFootnotesToggleKey(
  showFootnotes: boolean,
  setShowFootnotes: (showFootnotes: boolean) => void,
): void {
  const showFootnotesRef = useRef(showFootnotes);
  useEffect(() => {
    showFootnotesRef.current = showFootnotes;
  }, [showFootnotes]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === 'F7' &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey &&
        !event.shiftKey
      ) {
        event.preventDefault();
        setShowFootnotes(!showFootnotesRef.current);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setShowFootnotes]);
}
