/**
 * Blocks input into an editor's content element for the life of a standard-view marker-palette
 * session — the one lock both consumers (`platform-scripture-editor.web-view.tsx` and
 * `footnote-editor.component.tsx`) use, so the product rule holds in both: while a palette is open,
 * only selecting a marker may change the scripture text.
 *
 * Two holes the keydown forwarding table cannot close, because neither arrives as a claimable
 * keydown:
 *
 * - Composed text (dead keys, and every IME — how most non-Latin scripts are typed) arrives through
 *   the input path. In this Electron build `beforeinput` for `insertCompositionText` reports
 *   `cancelable: false`, and `compositionstart` accepts `preventDefault()` and composes anyway, so
 *   making the element non-editable is the only thing that stops it.
 * - Clipboard and drag-and-drop edits (`paste`, `cut`, `drop`) are dispatched at the element holding
 *   the DOM selection, and the editor's own listeners check its editable FLAG, not the DOM
 *   attribute — so they would still edit the text under a non-editable element. They are cancelled
 *   in the capture phase while locked. A palette whose session a chord ends (the `\` palette on
 *   Cmd/Ctrl+V) is unlocked before the clipboard event fires, so its paste proceeds normally.
 */

/** Clipboard and drag events that edit the text without a claimable keydown. */
const BLOCKED_EDIT_EVENTS = ['paste', 'cut', 'drop'] as const;

/** See the module header. */
export interface MarkerPaletteInputLock {
  /**
   * Locks `element`. Locking the element already locked is a no-op; locking a different element
   * (the editor remounted) releases the old one first.
   */
  lock(element: HTMLElement): void;
  /**
   * Releases the lock and restores `contenteditable` to `editable` — the editor's REAL editable
   * state, not a hard-coded `true`, which would hand the user a browser-editable document the
   * editor itself considers read-only. A no-op when nothing is locked. An element that has left the
   * document is released without being written to.
   */
  unlock(editable: boolean): void;
}

/** Creates an unlocked {@link MarkerPaletteInputLock}. Each editor instance owns one. */
export function createMarkerPaletteInputLock(): MarkerPaletteInputLock {
  let locked: { element: HTMLElement; release: () => void } | undefined;

  const release = () => {
    const current = locked;
    locked = undefined;
    current?.release();
    return current?.element;
  };

  return {
    lock(element) {
      if (locked?.element === element) return;
      release();

      element.setAttribute('contenteditable', 'false');
      // The attribute belongs to the editor (Lexical's `ContentEditable` renders it from its
      // editable flag), so a mid-session editable flip would write `true` straight back and
      // silently reopen the composed-text hole. Re-assert instead of assuming one write sticks.
      const observer = new MutationObserver(() => {
        if (element.getAttribute('contenteditable') !== 'false')
          element.setAttribute('contenteditable', 'false');
      });
      observer.observe(element, { attributes: true, attributeFilter: ['contenteditable'] });

      // Document capture runs ahead of the editor's own element listeners.
      const blockEdit = (event: Event) => {
        if (!(event.target instanceof Node) || !element.contains(event.target)) return;
        event.preventDefault();
        event.stopPropagation();
      };
      const doc = element.ownerDocument;
      BLOCKED_EDIT_EVENTS.forEach((type) => doc.addEventListener(type, blockEdit, true));

      locked = {
        element,
        release: () => {
          observer.disconnect();
          BLOCKED_EDIT_EVENTS.forEach((type) => doc.removeEventListener(type, blockEdit, true));
        },
      };
    },
    unlock(editable) {
      const element = release();
      if (element?.isConnected)
        element.setAttribute('contenteditable', editable ? 'true' : 'false');
    },
  };
}
