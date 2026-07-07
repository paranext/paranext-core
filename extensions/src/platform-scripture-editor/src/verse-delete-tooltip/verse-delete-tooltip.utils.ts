/**
 * The armed two-step-delete state the editor publishes on its root element. The scripture editor
 * (shared-react's StructureKeyboardPlugin) never renders the hint itself; it sets
 * `data-verse-delete-intent` and `data-verse-delete-kind` on the editor root so the host app can
 * render a localized, ShadCN-styled tooltip. `kind` is only ever `verse` or `selection` — a
 * paragraph merge exposes no hint.
 */
export type ArmedHint = {
  intent: 'deleteBackward' | 'deleteForward';
  kind: 'verse' | 'selection';
};

/**
 * Reads the armed-delete hint the editor published on `root`, or undefined when nothing hint-worthy
 * is armed. Both attributes must be present and valid; anything else (paragraph merge, cleared
 * state, unrelated element) yields undefined so the tooltip stays hidden.
 */
export function readArmedHint(root: Element | null | undefined): ArmedHint | undefined {
  const intent = root?.getAttribute('data-verse-delete-intent');
  const kind = root?.getAttribute('data-verse-delete-kind');
  if (
    (intent === 'deleteBackward' || intent === 'deleteForward') &&
    (kind === 'verse' || kind === 'selection')
  ) {
    return { intent, kind };
  }
  return undefined;
}

export type AnchorRect = { top: number; left: number; width: number; height: number };

/**
 * Computes the armed marker's rect in `positionAnchor` content coordinates, used to place the
 * invisible tooltip trigger over the marker so Radix anchors the tooltip to it.
 *
 * `positionAnchor` is the position:relative wrapper; the editor's scroll container is an ancestor
 * of it, so `marker` and `positionAnchor` move together as the user scrolls and the viewport-space
 * delta already gives the correct content-relative position (no scrollTop addition needed).
 */
export function computeAnchorRect(marker: HTMLElement, positionAnchor: HTMLElement): AnchorRect {
  const anchorRect = positionAnchor.getBoundingClientRect();
  const markerRect = marker.getBoundingClientRect();
  return {
    top: markerRect.top - anchorRect.top,
    left: markerRect.left - anchorRect.left,
    width: markerRect.width,
    height: markerRect.height,
  };
}

/** The physical key whose second press confirms the delete, for the given arming intent. */
export function confirmingKey(intent: ArmedHint['intent']): 'Backspace' | 'Delete' {
  return intent === 'deleteForward' ? 'Delete' : 'Backspace';
}
