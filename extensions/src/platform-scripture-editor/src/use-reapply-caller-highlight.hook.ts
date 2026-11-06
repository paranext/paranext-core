import { useEffect } from 'react';

/**
 * Re-applies the caller highlight on every change of view or of whether the view uses the
 * footnotes-pane note model, in both directions.
 *
 * A caller highlight means something only in a view using the pane note model, and no other view
 * would ever clear one left behind. Leaving a pane-model view drops it, whether or not a session is
 * open, since a selected pane row holds a highlight on its own. Coming BACK restores it: the pane
 * survives the round trip with its row still selected, and cycling the view moves no DOM focus, so
 * nothing else would re-apply the border. An interface-mode switch can change the note model
 * without changing the view, so the model is watched as well as the view.
 *
 * @param applyCallerHighlight Decides and applies the highlight from the current inputs
 * @param viewType The displayed view type
 * @param usesPaneModel Whether the view uses the footnotes-pane note model
 */
export function useReapplyCallerHighlight(
  applyCallerHighlight: () => void,
  viewType: string,
  usesPaneModel: boolean,
): void {
  useEffect(() => {
    applyCallerHighlight();
  }, [viewType, usesPaneModel, applyCallerHighlight]);
}
