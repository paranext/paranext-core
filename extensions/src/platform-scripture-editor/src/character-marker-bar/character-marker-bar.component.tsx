import { EditorRef } from '@eten-tech-foundation/platform-editor';
import { LanguageStrings } from 'platform-bible-utils';
import { MutableRefObject } from 'react';
import {
  CharacterMarkerControl,
  CharacterMarkerControlLocalizedStrings,
  CharacterMarkerToolbar,
} from '../character-marker-control.component';
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
  /** Localized strings for the control, its tooltips, and the menu. */
  localizedStrings: CharacterMarkerControlLocalizedStrings & LanguageStrings;
};

/**
 * The character-marker bar: the shipped {@link CharacterMarkerControl} wired to editor state, ready
 * to be dropped into a placement wrapper's slot.
 *
 * Two deliberate choices live here rather than in the control, which stays placement-agnostic:
 *
 * - **`currentMarkerLabel` is intentionally NOT passed.** The control falls back to the bare marker
 *   code (`bd` rather than `bd - Bold`), which is what fits the narrow inline-end gutter without
 *   editing the control at all. The full localized name still appears in the popover's list.
 * - **`useEditorSelectionVersion` forces a re-render on every caret move.** `useCharacterMarkerState`
 *   computes `isMixed` inline on each render specifically so that a fresh render is what keeps the
 *   trigger current, and it documents that its caller must provide one. The editor web view's own
 *   `handleSelectionChange` only writes a ref, and `contextMarker` only changes when the marker
 *   itself does — so without this the trigger would show a stale `(mixed)`.
 *
 * The Simple-mode gate lives in `CharacterMarkerToolbar`, so nothing renders in Power mode.
 */
export function CharacterMarkerBar({
  editorRef,
  getSelection,
  blockMarker,
  contextMarker,
  isSyncBlocked,
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

  return (
    <CharacterMarkerToolbar className="tw:m-1">
      <CharacterMarkerControl
        {...characterMarkerState}
        // Omitted deliberately — see the note above; the bare marker code is what fits the gutter.
        currentMarkerLabel={undefined}
        isSyncBlocked={isSyncBlocked}
        localizedStrings={localizedStrings}
        // tw:w-full + tw:min-w-0 + tw:overflow-hidden make the trigger FILL the gutter width the
        // overlay's container sets and clip inside it, instead of shrink-wrapping its label and
        // growing inline-start over project text. `(mixed)`/`(none)` are localized, so their width
        // is not knowable here; the button's own tw:shrink-0 and tw:whitespace-nowrap would
        // otherwise let a longer translation push the bar out of the reserved gutter.
        // tw:justify-between keeps the label at the leading edge (the chevron, not the value, is
        // what clips first in that case).
        className="tw:h-8 tw:w-full tw:min-w-0 tw:justify-between tw:overflow-hidden tw:px-2"
      />
    </CharacterMarkerToolbar>
  );
}

export default CharacterMarkerBar;
