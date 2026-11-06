import { ContentZoomRoot } from 'platform-bible-react';
import { ReactNode } from 'react';
import { CharacterMarkerBarOverlay } from './character-marker-bar/character-marker-bar-overlay.component';
import { ParagraphMarkerTooltipOverlay } from './paragraph-marker-tooltip/paragraph-marker-tooltip-overlay.component';
import { TwoStepDeleteTooltipOverlay } from './two-step-delete-tooltip/two-step-delete-tooltip-overlay.component';

export type EditorSurfaceProps = {
  /** The Scripture editor. The only thing inside the text's `main` content zoom area. */
  editor: ReactNode;
  /** Simple mode's character-marker bar, pinned beside the active line. Absent shows no bar. */
  characterMarkerBar?: ReactNode;
  /** Whether hovering a paragraph marker in the gutter shows its tooltip (Simple mode) */
  areParagraphMarkerTooltipsEnabled: boolean;
  /**
   * The view shown in place of a blank chapter. When given, the editor and its overlays are hidden
   * (not unmounted) and this shows instead.
   */
  emptyChapterView?: ReactNode;
};

/**
 * The Scripture editor with the overlays that annotate it: the Backspace/Delete hint, the
 * paragraph-marker tooltips, and Simple mode's character-marker bar.
 *
 * The Scripture text's `main` zoom area holds the editor and nothing else. The overlays around it
 * stay at interface scale and place themselves from rect differences, which a zoomed element
 * reports in the same viewport pixels. The area sits INSIDE the overlays rather than around them
 * because each overlay positions its UI relative to its own wrapper: inside the zoom, the UI's CSS
 * offsets would be multiplied by the zoom factor and land away from the text. No wrapper holds text
 * itself. The empty-chapter view and every other state the web view shows instead of the editor are
 * UI, not project text, so they are outside the area too.
 */
export function EditorSurface({
  editor,
  characterMarkerBar,
  areParagraphMarkerTooltipsEnabled,
  emptyChapterView,
}: EditorSurfaceProps) {
  return (
    <>
      {emptyChapterView}
      {/* The empty-chapter view HIDES this subtree rather than replacing it, for the same reason
          the overlay below is mounted in both modes: unmounting would take Lexical's undo history
          and the scroll position with it, and a blank chapter is transient — adding a chapter
          number flips it straight back. The overlay lives INSIDE this wrapper so the bar is hidden
          along with the text it annotates rather than painting beside an empty chapter.

          Being hidden HERE is not the case the overlay's `useViewVisibility` deferral handles:
          that hook reports on this iframe's own visibility (whether the tab is active), so it
          still reads visible while this inner subtree is `display: none`. What covers this case
          is the overlay's zero-geometry guard — it declines to position, and crucially declines
          to latch `hasPositionedRef`, when the editor root has no layout — plus its
          ResizeObserver, which fires when the subtree regains layout because `display: none`
          collapses the observed anchor to a 0x0 box. */}
      <div className={emptyChapterView ? 'tw:hidden' : undefined}>
        {/* The overlay is mounted in BOTH modes and only its `bar` slot is gated, so the element
            type at this position never changes. Choosing between two different wrappers here would
            make React unmount and remount the editor whenever the mode changes — including the
            very first resolution of `platform.interfaceMode`, which starts at its 'simple' default
            before the stored value arrives — taking Lexical's undo history and the scroll position
            with it. An empty slot renders nothing beside the editor. */}
        <CharacterMarkerBarOverlay bar={characterMarkerBar}>
          <ParagraphMarkerTooltipOverlay enabled={areParagraphMarkerTooltipsEnabled}>
            <TwoStepDeleteTooltipOverlay>
              <ContentZoomRoot>{editor}</ContentZoomRoot>
            </TwoStepDeleteTooltipOverlay>
          </ParagraphMarkerTooltipOverlay>
        </CharacterMarkerBarOverlay>
      </div>
    </>
  );
}
