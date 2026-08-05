import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';

const MESSAGE_KEY = '%webView_platformScriptureEditor_emptyChapter_message%';
const ADD_CHAPTER_NUMBER_BUTTON_KEY =
  '%webView_platformScriptureEditor_emptyChapter_addChapterNumberButton%';
const PROTECTED_TOOLTIP_KEY = '%webView_platformScriptureEditor_emptyChapter_protectedTooltip%';

/**
 * Localization keys used by {@link EmptyChapterView}. Spread these into the editor web-view's
 * localized-strings list so the values are loaded and passed into `localizedStrings`.
 */
export const EMPTY_CHAPTER_VIEW_STRING_KEYS = Object.freeze([
  MESSAGE_KEY,
  ADD_CHAPTER_NUMBER_BUTTON_KEY,
  PROTECTED_TOOLTIP_KEY,
] as const);

export type EmptyChapterViewStringKey = (typeof EMPTY_CHAPTER_VIEW_STRING_KEYS)[number];

export type EmptyChapterViewLocalizedStrings = {
  [key in EmptyChapterViewStringKey]?: string;
};

const localize = (strings: EmptyChapterViewLocalizedStrings, key: EmptyChapterViewStringKey) =>
  strings[key] ?? key;

export type EmptyChapterViewProps = {
  /** Localized strings for the message, button label, and disabled tooltip. */
  localizedStrings?: EmptyChapterViewLocalizedStrings;
  /** Whether structure protection is active — disables the button and shows an explanatory tooltip. */
  isStructureProtected: boolean;
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
  showButton,
  onAddChapterNumber,
}: EmptyChapterViewProps) {
  return (
    <div className="tw:flex tw:items-start tw:justify-start tw:h-full tw:px-4 tw:pt-4">
      <div className="tw:flex tw:items-center tw:gap-2">
        <span>{localize(localizedStrings, MESSAGE_KEY)}</span>
        {showButton && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  role={isStructureProtected ? 'group' : undefined}
                  // Disabled buttons cannot host their own tooltip; the wrapper must be focusable to
                  // surface the structure-protection explanation to keyboard and screen-reader users.
                  // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                  tabIndex={isStructureProtected ? 0 : undefined}
                  aria-label={
                    isStructureProtected
                      ? localize(localizedStrings, PROTECTED_TOOLTIP_KEY)
                      : undefined
                  }
                >
                  <Button
                    className="tw:h-8"
                    disabled={isStructureProtected}
                    onClick={onAddChapterNumber}
                  >
                    {localize(localizedStrings, ADD_CHAPTER_NUMBER_BUTTON_KEY)}
                  </Button>
                </div>
              </TooltipTrigger>
              {isStructureProtected && (
                <TooltipContent>
                  <p className="tw:max-w-xs tw:whitespace-pre-line">
                    {localize(localizedStrings, PROTECTED_TOOLTIP_KEY)}
                  </p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  );
}
