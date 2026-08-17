import { useCallback, useEffect, useRef } from 'react';

/**
 * Remembers the text that was selected in this web view immediately before the most recent pointer
 * press on the tab's chrome (toolbar buttons, menus).
 *
 * Why this exists: opening a dropdown is a pointer press, and a pointer press normally collapses
 * the document selection. By the time a menu item is chosen, `window.getSelection()` can be empty —
 * so a menu command that wants "what the user had selected" needs the value from just before the
 * press. The listener runs in the capture phase so it observes the selection before any component
 * handler moves focus and before the browser's default selection change.
 *
 * A press _outside_ the text content records the live selection when there is one, and otherwise
 * leaves the previously remembered value alone — a press on chrome (e.g. a toolbar button) can
 * collapse the selection as its default action, and a later press to open a menu must not let that
 * collapse erase what was already captured. Only a press _inside_ the text content clears the
 * snapshot: pressing in the text is the user deliberately re-placing the caret, and that discarded
 * selection must not resurface.
 *
 * Deliberate tradeoff: the remembered value can outlive the selection that produced it (e.g. it
 * survives across an intervening chrome press that had nothing selected). This is acceptable
 * because callers always prefer the live selection and only consult this snapshot when nothing is
 * currently selected.
 *
 * @param contentSelector CSS selector for the tab's text content (a press inside it clears the
 *   snapshot). Anything not inside a match counts as chrome.
 * @returns A stable getter for the remembered selection text (`''` when there is none).
 */
export function useSelectionSnapshot(contentSelector: string): () => string {
  const snapshotRef = useRef('');

  useEffect(() => {
    const captureSelection = (event: Event) => {
      const target = event.target instanceof Element ? event.target : undefined;
      const liveText = window.getSelection()?.toString() ?? '';
      snapshotRef.current = target?.closest(contentSelector)
        ? ''
        : liveText.trim() || snapshotRef.current;
    };

    window.addEventListener('pointerdown', captureSelection, true);
    return () => window.removeEventListener('pointerdown', captureSelection, true);
  }, [contentSelector]);

  return useCallback(() => snapshotRef.current, []);
}
