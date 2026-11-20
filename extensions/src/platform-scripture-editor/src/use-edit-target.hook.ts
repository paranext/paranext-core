import { useCallback, useEffect, useRef, useState } from 'react';
import { classifySelectionAnchor, EditTarget, hasFootnotesRowsSelection } from './edit-target.util';

/** What {@link useEditTarget} reads. */
export type UseEditTargetOptions = {
  /** Reads the main editor's element; called on every selection change */
  getMainEditorRoot: () => Element | null | undefined;
  /**
   * Reads the footnotes pane's list of rows, `null` or `undefined` while the pane is not in the
   * document. Called only for a selection outside the main editor, and on a recheck.
   */
  getFootnotesRows: () => Element | null | undefined;
  /**
   * Changes whenever the nodes the footnote selection sits in may have been replaced or removed
   * (the pane stopped or started rendering, another row opened). The hook then re-reads the browser
   * selection, and returns the target to the main text if the rows are gone.
   */
  recheckToken: string;
  /** Changes whenever the content under the target is replaced; the target returns to `'main'` */
  resetToken: string;
  /** Whether the main editor's own selection is a range */
  mainHasSelection: boolean;
};

/** What {@link useEditTarget} reports. */
export type EditTargetState = {
  /** The editor the user last selected in */
  target: EditTarget;
  /** The target's selection is a range */
  hasSelection: boolean;
};

/**
 * Tracks which editor the user last worked in. One signal decides it: the document's selection
 * (watched through `selectionchange` and `focusin`). A selection in the main editor makes the
 * target `'main'`, one in the footnotes pane's rows makes it `'footnotes'`, and one anywhere else
 * (or none, as when a menu opens) leaves the target where it is while the rows are rendered, so the
 * target is sticky. A selection that moves from the rows to somewhere else ends the pane's
 * selection (`hasSelection` is false) without moving the target. Once the rows are gone from the
 * document the target is `'main'`.
 *
 * The main editor's own selection report does not move the target; it only feeds `hasSelection`
 * while the target is `'main'`.
 */
export function useEditTarget({
  getMainEditorRoot,
  getFootnotesRows,
  recheckToken,
  resetToken,
  mainHasSelection,
}: UseEditTargetOptions): EditTargetState {
  const [target, setTarget] = useState<EditTarget>('main');
  const [hasFootnotesSelection, setHasFootnotesSelection] = useState(false);

  const getMainEditorRootRef = useRef(getMainEditorRoot);
  const getFootnotesRowsRef = useRef(getFootnotesRows);
  useEffect(() => {
    getMainEditorRootRef.current = getMainEditorRoot;
    getFootnotesRowsRef.current = getFootnotesRows;
  }, [getMainEditorRoot, getFootnotesRows]);

  useEffect(() => {
    const onSelectionMaybeChanged = () => {
      const selection = document.getSelection();
      const anchor = selection?.anchorNode;
      if (!anchor) return;
      // The pane's rows are looked up only when the anchor is not in the main text, so typing and
      // selecting there stay cheap.
      if (
        classifySelectionAnchor(anchor, {
          mainEditorRoot: getMainEditorRootRef.current(),
          footnotesRows: undefined,
        }) === 'main'
      ) {
        setTarget('main');
        return;
      }
      const footnotesRows = getFootnotesRowsRef.current();
      if (
        classifySelectionAnchor(anchor, { mainEditorRoot: undefined, footnotesRows }) !==
        'footnotes'
      ) {
        // The target stays, but a selection that left the rows no longer counts as the pane's.
        setHasFootnotesSelection((had) =>
          had ? hasFootnotesRowsSelection(selection, footnotesRows) : had,
        );
        return;
      }
      setTarget('footnotes');
      setHasFootnotesSelection(hasFootnotesRowsSelection(selection, footnotesRows));
    };
    document.addEventListener('selectionchange', onSelectionMaybeChanged);
    document.addEventListener('focusin', onSelectionMaybeChanged);
    return () => {
      document.removeEventListener('selectionchange', onSelectionMaybeChanged);
      document.removeEventListener('focusin', onSelectionMaybeChanged);
    };
  }, []);

  // The pane stopping or starting to render, or another row opening, replaces the nodes the
  // selection was in, so what was last read from the pane no longer holds. While the rows are
  // rendered the target stays where it is. Once they are gone it returns to the main text: the
  // caret is there, but no selection change fires in it to say so.
  const recheckSelection = useCallback(() => {
    const footnotesRows = getFootnotesRowsRef.current();
    if (!footnotesRows) setTarget('main');
    setHasFootnotesSelection(hasFootnotesRowsSelection(document.getSelection(), footnotesRows));
  }, []);

  useEffect(() => {
    recheckSelection();
  }, [recheckToken, recheckSelection]);

  useEffect(() => {
    setTarget('main');
    setHasFootnotesSelection(false);
  }, [resetToken]);

  return {
    target,
    hasSelection: target === 'main' ? mainHasSelection : hasFootnotesSelection,
  };
}
