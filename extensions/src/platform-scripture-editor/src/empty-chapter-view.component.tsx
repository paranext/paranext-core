import { Button, DisabledActionTooltip } from 'platform-bible-react';
import {
  EMPTY_CHAPTER_VIEW_KEYS,
  type EmptyChapterViewLocalizedStrings,
  type EmptyChapterViewStringKey,
} from './empty-chapter-view.const';

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
};

/**
 * Replaces the editor canvas when the current chapter is effectively blank (Simple mode only): an
 * explanatory message followed by a button that generates a blank chapter+verse scaffold. Anchored
 * top-left of the content area, message and button in one row.
 */
export function EmptyChapterView({
  localizedStrings = {},
  isStructureProtected,
  isResource = false,
  showButton,
  onAddChapterNumber,
}: EmptyChapterViewProps) {
  return (
    <div className="tw:flex tw:items-start tw:justify-start tw:h-full tw:px-4 tw:pt-4">
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
