import { useCallback, useEffect, useState } from 'react';

/** Inputs to {@link useParagraphMenuOpenState}. */
export type UseParagraphMenuOpenStateOptions = {
  /** Whether the editor is read-only; the toolbar has no paragraph menu then. */
  isReadOnly: boolean;
  /** Whether the project's structure is protected, which disables changing a paragraph's style. */
  isStructureProtected: boolean;
  /**
   * Whether there is a block marker for the toolbar trigger to show; it renders nothing without
   * one.
   */
  hasBlockMarker: boolean;
  /** Tells the user the structure is locked, for a request the lock refuses. */
  notifyStructureProtected: () => void;
};

/**
 * Holds whether the toolbar paragraph menu is open, and turns the editor's keyboard request (Enter
 * or Alt+Down on a selected paragraph marker, delivered as `onParaMarkerMenuRequest`) into opening
 * it.
 *
 * A request the structure lock refuses is reported with the lock notification rather than dropped.
 * A request in a read-only project, or with no block marker to show, is ignored: there is no menu
 * to open. Whenever the menu stops being available it is closed, so it cannot spring open on its
 * own when the lock lifts or the caret re-enters a block.
 *
 * @returns `isMenuOpen` for `ParagraphStyleTrigger`, `setIsMenuOpen` for its `onMenuOpenChange`,
 *   and `requestMenuFromEditor` for `<Editorial onParaMarkerMenuRequest>`
 */
export function useParagraphMenuOpenState({
  isReadOnly,
  isStructureProtected,
  hasBlockMarker,
  notifyStructureProtected,
}: UseParagraphMenuOpenStateOptions) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMenuAvailable = !isReadOnly && !isStructureProtected && hasBlockMarker;

  useEffect(() => {
    if (!isMenuAvailable) setIsMenuOpen(false);
  }, [isMenuAvailable]);

  const requestMenuFromEditor = useCallback(() => {
    if (isReadOnly || !hasBlockMarker) return;
    if (isStructureProtected) {
      notifyStructureProtected();
      return;
    }
    setIsMenuOpen(true);
  }, [isReadOnly, hasBlockMarker, isStructureProtected, notifyStructureProtected]);

  return { isMenuOpen, setIsMenuOpen, requestMenuFromEditor };
}
