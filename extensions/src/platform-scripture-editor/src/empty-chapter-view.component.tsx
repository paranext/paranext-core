import { Button, DisabledActionTooltip } from 'platform-bible-react';
import {
  EMPTY_CHAPTER_VIEW_KEYS,
  type EmptyChapterViewLocalizedStrings,
  type EmptyChapterViewStringKey,
} from './empty-chapter-view.const';
import { useFocusReplacedContent } from './use-focus-replaced-content.hook';

const { MESSAGE_KEY, MESSAGE_RESOURCE_KEY, ADD_CHAPTER_NUMBER_BUTTON_KEY, PROTECTED_TOOLTIP_KEY } =
  EMPTY_CHAPTER_VIEW_KEYS;

// Re-exported so consumers keep importing the view's contract from the view.
export {
  EMPTY_CHAPTER_VIEW_STRING_KEYS,
  type EmptyChapterViewLocalizedStrings,
  type EmptyChapterViewStringKey,
} from './empty-chapter-view.const';

const localize = (strings: EmptyChapterViewLocalizedStrings, key: EmptyChapterViewStringKey) =>
  strings[key] ?? key;

export type EmptyChapterViewProps = {
  /** Localized strings for the message, button label, and disabled tooltip. */
  localizedStrings?: EmptyChapterViewLocalizedStrings;
  /** Whether structure protection is active — disables the button and shows an explanatory tooltip. */
  isStructureProtected: boolean;
  /**
   * Whether the text being displayed is a published resource. Resources get a message naming the
   * resource, since "this chapter is empty" reads as an invitation to fill it in a text the reader
   * cannot edit.
   */
  isResource?: boolean;
  /**
   * Whether the button should render at all (hidden for read-only projects or while versification
   * data is still loading).
   */
  showButton: boolean;
  /** Invoked when the user clicks "Add Chapter Number". */
  onAddChapterNumber: () => void;
  /**
   * Identifies WHICH blank chapter this message is about, e.g. `${projectId}:${book}
   * ${chapterNum}`. None of the strings name the chapter, so moving between two blank chapters
   * leaves a mounted region with byte-identical text — which `aria-live` cannot see as a change.
   * Changing this key remounts the region and repairs focus again, so the second blank chapter is
   * not silent.
   */
  announcementKey?: string;
};

/**
 * Replaces the editor canvas when the current chapter is effectively blank (Simple mode only): an
 * explanatory message followed by a button that generates a blank chapter+verse scaffold. Anchored
 * top-left of the content area, message and button in one row.
 *
 * Accessibility: the editing surface this stands in for is hidden with `display: none`, which takes
 * it out of the accessibility tree and the tab order — so arriving here is a content swap a
 * screen-reader user gets no other notice of, and whatever held focus inside the editor stops being
 * focusable. The message region is therefore `role="status"` and takes focus on mount via
 * {@link useFocusReplacedContent}, which repairs focus only when it actually fell to the body, so
 * navigating here from the toolbar's book/chapter control does not yank focus out of the control
 * the user is still using. Pass `announcementKey` so moving from one blank chapter to another is
 * not silent; see that prop.
 *
 * The sibling `BookNotAvailableView` renders the shared `Empty` composition, which centers its
 * content. This view keeps its own top-left one-row layout instead: a blank chapter is transient —
 * the scaffold button flips it straight back to the editor — so the message sits where the first
 * line of text is about to appear rather than pulling the eye to the middle of the canvas.
 */
export function EmptyChapterView({
  localizedStrings = {},
  isStructureProtected,
  isResource = false,
  showButton,
  onAddChapterNumber,
  announcementKey,
}: EmptyChapterViewProps) {
  const regionRef = useFocusReplacedContent<HTMLDivElement>(announcementKey);

  return (
    // Keyed so a new blank chapter remounts the live region. `aria-live` reports content that
    // CHANGES; the same sentence about a different chapter is not a change it can see.
    <div
      key={announcementKey}
      ref={regionRef}
      role="status"
      tabIndex={-1}
      className="tw:flex tw:items-start tw:justify-start tw:h-full tw:px-4 tw:pt-4 tw:outline-none"
    >
      <div className="tw:flex tw:items-center tw:gap-2">
        <span>{localize(localizedStrings, isResource ? MESSAGE_RESOURCE_KEY : MESSAGE_KEY)}</span>
        {showButton && (
          <DisabledActionTooltip
            disabled={isStructureProtected}
            tooltipText={localize(localizedStrings, PROTECTED_TOOLTIP_KEY)}
          >
            <Button className="tw:h-8" disabled={isStructureProtected} onClick={onAddChapterNumber}>
              {localize(localizedStrings, ADD_CHAPTER_NUMBER_BUTTON_KEY)}
            </Button>
          </DisabledActionTooltip>
        )}
      </div>
    </div>
  );
}
