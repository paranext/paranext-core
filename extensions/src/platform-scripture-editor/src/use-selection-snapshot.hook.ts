import { useCallback, useEffect, useRef } from 'react';

/** The element a node lives in — the node itself when it is already an element. */
function elementOf(node: Node | null | undefined): Element | undefined {
  if (node instanceof Element) return node;
  return node?.parentElement ?? undefined;
}

/**
 * Remembers the text that was selected in this web view's text content immediately before the most
 * recent pointer press on the tab's chrome (toolbar buttons, menus).
 *
 * Why this exists: choosing a menu item is a pointer press, and a pointer press collapses the
 * document selection. In Chromium the collapse lands between the press and the resulting `click`,
 * so a menu item's click handler reads an empty `window.getSelection()` even though the selection
 * was still live when the press arrived. A menu command that wants "what the user had selected"
 * needs the value from just before the press. The listener runs in the capture phase so it observes
 * the selection before any component handler moves focus and before the browser's default selection
 * change.
 *
 * Three rules keep the remembered value honest:
 *
 * - Only selections anchored **inside** the text content are remembered. Everything outside it counts
 *   as chrome, and chrome contains its own selectable text (a reference input, a search box) that
 *   is not scripture and must never be handed to the caller as if it were.
 * - A press _outside_ the text content records the live selection when there is one, and otherwise
 *   leaves the previously remembered value alone — a press on chrome (e.g. a toolbar button) can
 *   collapse the selection as its default action, and a later press to open a menu must not let
 *   that collapse erase what was already captured. Only a press _inside_ the text content clears
 *   the snapshot: pressing in the text is the user deliberately re-placing the caret, and that
 *   discarded selection must not resurface.
 * - **Reading consumes.** The snapshot exists to bridge one pointer press, so it is handed out once
 *   and then forgotten. Without this it would survive every interaction that is not a press in the
 *   text, and a selection made long ago could pre-fill — and immediately re-run — a search over
 *   whatever term the user had since typed into an open Find panel.
 *
 * @param contentSelector CSS selector for the tab's text content. A selection anchored inside it is
 *   remembered; a press inside it clears the snapshot. Anything else counts as chrome.
 * @returns A stable getter that returns the remembered selection text (`''` when there is none) and
 *   clears it.
 */
export function useSelectionSnapshot(contentSelector: string): () => string {
  const snapshotRef = useRef('');

  useEffect(() => {
    const captureSelection = (event: Event) => {
      const target = event.target instanceof Element ? event.target : undefined;
      if (target?.closest(contentSelector)) {
        snapshotRef.current = '';
        return;
      }
      const selection = window.getSelection();
      // Only a selection sitting in the text content is scripture; one anchored in the tab's chrome
      // belongs to whatever control owns it.
      const liveText = elementOf(selection?.anchorNode)?.closest(contentSelector)
        ? (selection?.toString() ?? '')
        : '';
      snapshotRef.current = liveText.trim() || snapshotRef.current;
    };

    window.addEventListener('pointerdown', captureSelection, true);
    return () => window.removeEventListener('pointerdown', captureSelection, true);
  }, [contentSelector]);

  return useCallback(() => {
    const snapshot = snapshotRef.current;
    snapshotRef.current = '';
    return snapshot;
  }, []);
}
