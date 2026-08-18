import {
  Button,
  DisabledActionTooltip,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from 'platform-bible-react';

const SIMPLE_MESSAGE_KEY = '%webView_platformScriptureEditor_bookNotAvailable_simpleMessage%';
const TITLE_KEY = '%webView_platformScriptureEditor_bookNotAvailable_title%';
const DESCRIPTION_KEY = '%webView_platformScriptureEditor_bookNotAvailable_description%';
const MANAGE_BOOKS_BUTTON_KEY =
  '%webView_platformScriptureEditor_bookNotAvailable_manageBooksButton%';
const READ_ONLY_TOOLTIP_KEY = '%webView_platformScriptureEditor_bookNotAvailable_readOnlyTooltip%';
const MARKERS_VIEW_TOOLTIP_KEY =
  '%webView_platformScriptureEditor_bookNotAvailable_markersViewTooltip%';
const SYNC_IN_PROGRESS_TOOLTIP_KEY =
  '%webView_platformScriptureEditor_bookNotAvailable_syncInProgressTooltip%';

/**
 * Localization keys used by {@link BookNotAvailableView}. Spread these into the editor web-view's
 * localized-strings list so the values are loaded and passed into `localizedStrings`.
 */
export const BOOK_NOT_AVAILABLE_VIEW_STRING_KEYS = Object.freeze([
  SIMPLE_MESSAGE_KEY,
  TITLE_KEY,
  DESCRIPTION_KEY,
  MANAGE_BOOKS_BUTTON_KEY,
  READ_ONLY_TOOLTIP_KEY,
  MARKERS_VIEW_TOOLTIP_KEY,
  SYNC_IN_PROGRESS_TOOLTIP_KEY,
] as const);

export type BookNotAvailableViewStringKey = (typeof BOOK_NOT_AVAILABLE_VIEW_STRING_KEYS)[number];

export type BookNotAvailableViewLocalizedStrings = {
  [key in BookNotAvailableViewStringKey]?: string;
};

const localize = (
  strings: BookNotAvailableViewLocalizedStrings,
  key: BookNotAvailableViewStringKey,
) => strings[key] ?? key;

/**
 * Why the Manage books action cannot be taken right now. Each reason maps to its own tooltip text
 * so the disabled button explains the actual cause instead of a generic "unavailable".
 */
export type ManageBooksDisabledReason = 'readOnly' | 'markersView' | 'syncInProgress';

const DISABLED_REASON_TOOLTIP_KEYS: Record<
  ManageBooksDisabledReason,
  BookNotAvailableViewStringKey
> = {
  readOnly: READ_ONLY_TOOLTIP_KEY,
  markersView: MARKERS_VIEW_TOOLTIP_KEY,
  syncInProgress: SYNC_IN_PROGRESS_TOOLTIP_KEY,
};

export type BookNotAvailableViewProps = {
  /** Localized strings for the message, title, description, button label, and disabled tooltips. */
  localizedStrings?: BookNotAvailableViewLocalizedStrings;
  /**
   * Power mode renders the richer `Empty` zero-state (title + description). Simple mode renders
   * only the administrator message — Saroj is pointed at an administrator rather than at a
   * book-management flow, so the button never appears in Simple regardless of editability.
   */
  isPowerMode: boolean;
  /**
   * Whether this surface offers the Manage books action at all (Power mode only). When true the
   * button always renders, because the Power-mode description promises it; whether it can be
   * clicked is `manageBooksDisabledReason`'s job. Pass false only from a surface that has no Manage
   * Books entry point to offer — the editor web view passes true.
   */
  showManageBooksButton: boolean;
  /**
   * When set, the Manage books button renders disabled with a tooltip explaining this reason. Leave
   * undefined when the user can actually add the book.
   */
  manageBooksDisabledReason?: ManageBooksDisabledReason;
  /** Invoked when the user clicks "Manage books". */
  onOpenManageBooks: () => void;
};

/**
 * Replaces the editor canvas when the current book is not present in the active project. Simple
 * mode shows a plain message; Power mode shows a zero-state that can launch Manage Books directly
 * into creating this book. When Manage Books is momentarily unavailable (read-only project, markers
 * view, in-progress Send/Receive) the button stays visible but disabled with a tooltip, so the
 * description's promise of an action is never left unexplained.
 */
export function BookNotAvailableView({
  localizedStrings = {},
  isPowerMode,
  showManageBooksButton,
  manageBooksDisabledReason,
  onOpenManageBooks,
}: BookNotAvailableViewProps) {
  if (!isPowerMode) {
    return (
      <div className="tw:flex tw:h-full tw:items-center tw:justify-center tw:px-4">
        <span>{localize(localizedStrings, SIMPLE_MESSAGE_KEY)}</span>
      </div>
    );
  }

  const isManageBooksDisabled = !!manageBooksDisabledReason;

  return (
    <Empty className="tw:h-full">
      <EmptyHeader>
        <EmptyTitle>{localize(localizedStrings, TITLE_KEY)}</EmptyTitle>
        <EmptyDescription>{localize(localizedStrings, DESCRIPTION_KEY)}</EmptyDescription>
      </EmptyHeader>
      {showManageBooksButton && (
        <EmptyContent>
          <DisabledActionTooltip
            disabled={isManageBooksDisabled}
            tooltipText={
              manageBooksDisabledReason
                ? localize(
                    localizedStrings,
                    DISABLED_REASON_TOOLTIP_KEYS[manageBooksDisabledReason],
                  )
                : ''
            }
          >
            <Button disabled={isManageBooksDisabled} onClick={onOpenManageBooks}>
              {localize(localizedStrings, MANAGE_BOOKS_BUTTON_KEY)}
            </Button>
          </DisabledActionTooltip>
        </EmptyContent>
      )}
    </Empty>
  );
}
