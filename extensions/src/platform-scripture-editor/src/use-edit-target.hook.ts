import { useEffect, useRef, useState } from 'react';
import {
  classifySelectionAnchor,
  EditTarget,
  EditTargetRoots,
  FootnotesSelectionState,
  NO_FOOTNOTES_SELECTION,
  readFootnotesSelectionState,
} from './edit-target.util';

/** What {@link useEditTarget} reads. */
export type UseEditTargetOptions = {
  /** Reads the regions a selection is classified against, at the moment it changes */
  getRoots: () => EditTargetRoots;
  /** Whether the footnotes pane has a row editor open */
  isRowEditorOpen: boolean;
  /**
   * Changes whenever the nodes the footnote selection sits in may have been replaced or removed
   * (another row opened, the pane hidden); the hook then re-reads the browser selection.
   */
  recheckToken?: string;
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
  /** The target accepts edits: false only while it is a read-only footnote row */
  isEditable: boolean;
  /** Whether the selection the user last made in the footnotes pane is inside the row editor */
  isSelectionInRowEditor: boolean;
};

/**
 * Tracks which editor the user last worked in. One signal decides it: the document's selection
 * (watched through `selectionchange` and `focusin`). A selection in the main editor makes the
 * target `'main'`, one in the footnotes pane's rows makes it `'footnotes'`, and one anywhere else
 * (or none, as when a menu opens) changes nothing, so the target is sticky.
 *
 * The main editor's own selection report does not move the target; it only feeds `hasSelection`
 * while the target is `'main'`.
 */
export function useEditTarget({
  getRoots,
  isRowEditorOpen,
  recheckToken,
  resetToken,
  mainHasSelection,
}: UseEditTargetOptions): EditTargetState {
  const [target, setTarget] = useState<EditTarget>('main');
  const [footnotesSelection, setFootnotesSelection] =
    useState<FootnotesSelectionState>(NO_FOOTNOTES_SELECTION);

  const getRootsRef = useRef(getRoots);
  useEffect(() => {
    getRootsRef.current = getRoots;
  }, [getRoots]);

  useEffect(() => {
    const onSelectionMaybeChanged = () => {
      const roots = getRootsRef.current();
      const selection = document.getSelection();
      const next = classifySelectionAnchor(selection?.anchorNode, roots);
      if (!next) return;
      setTarget(next);
      if (next === 'footnotes')
        setFootnotesSelection((previous) => {
          const state = readFootnotesSelectionState(selection, roots.footnotesRows);
          return previous.hasSelection === state.hasSelection &&
            previous.inRowEditor === state.inRowEditor
            ? previous
            : state;
        });
    };
    document.addEventListener('selectionchange', onSelectionMaybeChanged);
    document.addEventListener('focusin', onSelectionMaybeChanged);
    return () => {
      document.removeEventListener('selectionchange', onSelectionMaybeChanged);
      document.removeEventListener('focusin', onSelectionMaybeChanged);
    };
  }, []);

  // A row editor opening or closing replaces the nodes the selection was in, so what was last read
  // from the pane no longer holds. The target itself stays where it is.
  useEffect(() => {
    setFootnotesSelection(
      readFootnotesSelectionState(document.getSelection(), getRootsRef.current().footnotesRows),
    );
  }, [isRowEditorOpen, recheckToken]);

  useEffect(() => {
    setTarget('main');
    setFootnotesSelection(NO_FOOTNOTES_SELECTION);
  }, [resetToken]);

  const isMain = target === 'main';
  return {
    target,
    hasSelection: isMain ? mainHasSelection : footnotesSelection.hasSelection,
    isEditable: isMain || (footnotesSelection.inRowEditor && isRowEditorOpen),
    isSelectionInRowEditor: footnotesSelection.inRowEditor,
  };
}
