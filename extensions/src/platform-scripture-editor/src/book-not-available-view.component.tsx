import {
  Button,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from 'platform-bible-react';

const SIMPLE_MESSAGE_KEY = '%webView_platformScriptureEditor_error_bookNotFoundProject%';
const TITLE_KEY = '%webView_platformScriptureEditor_bookNotAvailable_title%';
const DESCRIPTION_KEY = '%webView_platformScriptureEditor_bookNotAvailable_description%';
const MANAGE_BOOKS_BUTTON_KEY =
  '%webView_platformScriptureEditor_bookNotAvailable_manageBooksButton%';

/**
 * Localization keys used by {@link BookNotAvailableView}. Spread these into the editor web-view's
 * localized-strings list so the values are loaded and passed into `localizedStrings`.
 */
export const BOOK_NOT_AVAILABLE_VIEW_STRING_KEYS = Object.freeze([
  SIMPLE_MESSAGE_KEY,
  TITLE_KEY,
  DESCRIPTION_KEY,
  MANAGE_BOOKS_BUTTON_KEY,
] as const);

export type BookNotAvailableViewStringKey = (typeof BOOK_NOT_AVAILABLE_VIEW_STRING_KEYS)[number];

export type BookNotAvailableViewLocalizedStrings = {
  [key in BookNotAvailableViewStringKey]?: string;
};

const localize = (
  strings: BookNotAvailableViewLocalizedStrings,
  key: BookNotAvailableViewStringKey,
) => strings[key] ?? key;

export type BookNotAvailableViewProps = {
  /** Localized strings for the message, title, description, and button label. */
  localizedStrings?: BookNotAvailableViewLocalizedStrings;
  /**
   * Power mode renders the richer `Empty` zero-state (title + description). Simple mode renders
   * only the administrator message — Saroj is pointed at an administrator rather than at a
   * book-management flow, so the button never appears in Simple regardless of editability.
   */
  isPowerMode: boolean;
  /**
   * Whether to offer the Manage books button. Callers pass `isPowerMode && isProjectEditable`; a
   * non-editable project gets the same zero-state with no action, so Donna is never handed a button
   * that lands on a locked section.
   */
  showManageBooksButton: boolean;
  /** Invoked when the user clicks "Manage books". */
  onOpenManageBooks: () => void;
};

/**
 * Replaces the editor canvas when the current book is not present in the active project. Simple
 * mode shows a plain message; Power mode shows a zero-state that can launch Manage Books directly
 * into creating this book.
 */
export function BookNotAvailableView({
  localizedStrings = {},
  isPowerMode,
  showManageBooksButton,
  onOpenManageBooks,
}: BookNotAvailableViewProps) {
  if (!isPowerMode) {
    return (
      <div className="tw:flex tw:h-full tw:items-center tw:justify-center tw:px-4">
        <span>{localize(localizedStrings, SIMPLE_MESSAGE_KEY)}</span>
      </div>
    );
  }

  return (
    <Empty className="tw:h-full">
      <EmptyHeader>
        <EmptyTitle>{localize(localizedStrings, TITLE_KEY)}</EmptyTitle>
        <EmptyDescription>{localize(localizedStrings, DESCRIPTION_KEY)}</EmptyDescription>
      </EmptyHeader>
      {showManageBooksButton && (
        <EmptyContent>
          <Button onClick={onOpenManageBooks}>
            {localize(localizedStrings, MANAGE_BOOKS_BUTTON_KEY)}
          </Button>
        </EmptyContent>
      )}
    </Empty>
  );
}
