import { EditorRef } from '@eten-tech-foundation/platform-editor';
import { LanguageStrings } from 'platform-bible-utils';
import { MutableRefObject, useMemo } from 'react';
import { CharacterMarkerControl } from '../character-marker-control/character-marker-control.component';
import { CharacterMarkerToolbar } from '../character-marker-control/character-marker-toolbar.component';
import { CharacterMarkerSelection } from '../character-marker-coverage.utils';
import { useCharacterMarkerState } from '../use-character-marker-state.hook';
import { useEditorSelectionVersion } from './use-editor-selection-version.hook';

export type CharacterMarkerBarProps = {
  /** The editor, used to insert markers and to read USJ when the menu opens. */
  editorRef: MutableRefObject<EditorRef | null>;
  /** Reads the current selection on demand, so it is never stale. */
  getSelection: () => CharacterMarkerSelection | undefined;
  /** The editor's `blockMarker` — scopes which character markers apply. */
  blockMarker?: string;
  /** The editor's `contextMarker` — the marker at the anchor. */
  contextMarker?: string;
  /** `true` while an automatic Send/Receive has editing paused. */
  isSyncBlocked: boolean;
  /**
   * The project text's direction, as the editor itself is given it. Passed on to the menu so it
   * mirrors its alignment in an RTL project — see `menuDirection` on `CharacterMarkerControl` for
   * why this cannot be inferred from the document.
   *
   * Required for the same reason `menuDirection` is: the popover is portaled outside every element
   * this app gives a `dir`, so an omitted direction resolves physically and an RTL project's menu
   * runs off the iframe's inline-start edge.
   */
  textDirection: 'ltr' | 'rtl';
  /** Localized strings for the control, its tooltips, and the menu. */
  localizedStrings: LanguageStrings;
};

/**
 * The character-marker bar: the shipped {@link CharacterMarkerControl} wired to editor state, ready
 * to be dropped into a placement wrapper's slot.
 *
 * Two deliberate choices live here rather than in the control, which stays placement-agnostic:
 *
 * - **`useEditorSelectionVersion` forces a re-render on every caret move.** `useCharacterMarkerState`
 *   computes `isMixed` inline on each render specifically so that a fresh render is what keeps the
 *   trigger current, and it documents that its caller must provide one. The editor web view's own
 *   `handleSelectionChange` only writes a ref, and `contextMarker` only changes when the marker
 *   itself does — so without this the trigger would show a stale `(mixed)`.
 * - **`localizedStrings` is re-keyed once for the control.** `LanguageStrings` declares its index
 *   signature as `[k: LocalizeKey]` (the `%…%` template-literal type), while the control declares
 *   `[key: string]`. TypeScript does not consider a `LocalizeKey`-keyed type assignable to a
 *   `string`-keyed one, so the bar takes the `LanguageStrings` every caller actually has — which is
 *   also what `useCharacterMarkerState` requires — and rebuilds it as a plain string-keyed object
 *   for the control. Typing `CharacterMarkerControlLocalizedStrings` as `LanguageStrings` would
 *   delete both the clone and the memo below; left alone here because the control is shared with
 *   the toolbar placement and the change belongs with it, not with this placement.
 *
 * The Simple-mode gate lives in `CharacterMarkerToolbar`, so nothing renders in Power mode.
 */
export function CharacterMarkerBar({
  editorRef,
  getSelection,
  blockMarker,
  contextMarker,
  isSyncBlocked,
  textDirection,
  localizedStrings,
}: CharacterMarkerBarProps) {
  // Read for its re-render side effect; the value itself is not needed here.
  useEditorSelectionVersion();

  const characterMarkerState = useCharacterMarkerState({
    editorRef,
    getSelection,
    blockMarker,
    contextMarker,
    localizedStrings,
  });

  // See the note above: the control's index signature is keyed by `string`, not `LocalizeKey`, so
  // the same object has to be handed over re-keyed. Memoized so it is not rebuilt on every caret
  // move (`useEditorSelectionVersion` re-renders this component constantly).
  const controlLocalizedStrings = useMemo(
    () => Object.fromEntries(Object.entries(localizedStrings)),
    [localizedStrings],
  );

  return (
    <CharacterMarkerToolbar className="tw:m-1">
      <CharacterMarkerControl
        {...characterMarkerState}
        isSyncBlocked={isSyncBlocked}
        localizedStrings={controlLocalizedStrings}
        // Both of these are consequences of the 64px reservation in `_simple-mode.scss`, which is
        // why they are decided HERE and not in the control: the control stays placement-agnostic and
        // the placement owns what its own width implies.
        //
        // 64px fits the icon-only chrome exactly, with no slack for a label — so there is no label;
        // the current marker is read from the trigger's tooltip (which is `max-w-xs`, so it has room
        // for the full `bd - Bold`) and from the menu's tri-state rows.
        isLabelHidden
        // The trigger sits on the text column's trailing edge, so there is no room inline-end of it
        // for a 200px menu — it opens inline-start instead, over the lines BELOW the caret's line,
        // never over the current verse. This deliberately departs from the stated requirement
        // ("menu's leading edge at the trigger's centre"): at a 64px gutter the trigger's centre is
        // ~32px from the iframe edge, so a 200px menu would overhang by ~168px and Radix's collision
        // handling would shift it back to within a few pixels of this position anyway. `align="end"`
        // makes that outcome deterministic instead of a function of window width.
        menuAlign="end"
        // The direction the menu's `align` is resolved against. Passed explicitly because the popover
        // content is portaled to `document.body`, which is OUTSIDE the editor's `dir` element — the
        // only place this app sets a direction — so without this the menu would align physically and
        // an RTL project's 200px menu would run off the iframe's inline-start edge.
        menuDirection={textDirection}
        // `tw:overflow-hidden` is the STRUCTURAL guarantee that the trigger's CONTENT can never paint
        // over project text. The 64px reservation fits the chrome with ZERO slack, so any future
        // content change (a second icon, a wider chevron, a localized badge) would otherwise spill
        // inline-start the moment the arithmetic stops holding. With this class, spill is impossible
        // regardless of the arithmetic. Do not remove it on the reasoning that an icon-only trigger
        // has nothing to clip.
        //
        // The Button's own `focus-visible:ring-3` is a box-shadow on the button's box, so
        // `overflow-hidden` does not clip it — the 3px it paints outside the border fits inside
        // `CharacterMarkerToolbar`'s 4px `tw:m-1` margin, which is why the reservation must be in
        // pixels (see the note in `_simple-mode.scss`): an `em` reservation shrinks that margin away.
        className="tw:h-8 tw:w-full tw:px-2 tw:overflow-hidden"
      />
    </CharacterMarkerToolbar>
  );
}

export default CharacterMarkerBar;
