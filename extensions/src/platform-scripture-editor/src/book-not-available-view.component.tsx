import { formatReplacementString } from 'platform-bible-utils';
import {
  Button,
  DisabledActionTooltip,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from 'platform-bible-react';
import {
  BOOK_NOT_AVAILABLE_VIEW_KEYS,
  DISABLED_REASON_TOOLTIP_KEYS,
  type BookNotAvailableViewLocalizedStrings,
  type BookNotAvailableViewStringKey,
  type ManageBooksDisabledReason,
} from './book-not-available-view.const';
import { useFocusReplacedContent } from './use-focus-replaced-content.hook';

const { SIMPLE_MESSAGE_KEY, TITLE_KEY, DESCRIPTION_KEY, MANAGE_BOOKS_BUTTON_KEY } =
  BOOK_NOT_AVAILABLE_VIEW_KEYS;

// Re-exported so consumers keep importing the view's contract from the view.
export {
  BOOK_NOT_AVAILABLE_VIEW_STRING_KEYS,
  type BookNotAvailableViewLocalizedStrings,
  type BookNotAvailableViewStringKey,
  type ManageBooksDisabledReason,
} from './book-not-available-view.const';

const localize = (
  strings: BookNotAvailableViewLocalizedStrings,
  key: BookNotAvailableViewStringKey,
) => strings[key] ?? key;

export type BookNotAvailableViewProps = {
  /** Localized strings for the message, title, description, button label, and disabled tooltips. */
  localizedStrings?: BookNotAvailableViewLocalizedStrings;
  /**
   * Power mode renders the richer `Empty` zero-state (title + description) with the Manage books
   * action. Simple mode renders only the administrator message — Saroj is pointed at an
   * administrator rather than at a book-management flow, so the button never appears in Simple
   * regardless of editability.
   */
  isPowerMode: boolean;
  /**
   * When set, the Manage books button renders disabled with a tooltip explaining this reason. Leave
   * undefined when the user can actually add the book.
   */
  manageBooksDisabledReason?: ManageBooksDisabledReason;
  /** Invoked when the user clicks "Manage books". */
  onOpenManageBooks: () => void;
  /**
   * Identifies WHICH missing book and project this message is about, e.g. `${projectId}:${book}`.
   * No arm's strings name the book, so moving between two books the project lacks leaves a mounted
   * region with byte-identical text — which `aria-live` cannot see as a change. Changing this key
   * remounts the region and repairs focus again, so the second missing book is not silent.
   */
  announcementKey?: string;
};

/**
 * Replaces the editor canvas when the current book is not present in the active project. Simple
 * mode shows a plain message; Power mode shows a zero-state that can launch Manage Books directly
 * into creating this book. When Manage Books is momentarily unavailable (read-only project,
 * in-progress Send/Receive) the button stays visible but disabled with a tooltip, so the
 * description's promise of an action is never left unexplained.
 *
 * Accessibility: this view REPLACES the editor subtree, so its arrival is a content swap a
 * screen-reader user gets no other notice of, and the focused element inside the editor is
 * destroyed along with it. Both modes therefore mark the message region `role="status"`, and the
 * region takes focus on mount via {@link useFocusReplacedContent}, which repairs focus only when it
 * actually fell to the body — so navigating here from the toolbar's book/chapter control does not
 * yank focus out of the control the user is still using. Pass `announcementKey` so that moving from
 * one missing book to another is not silent; see that prop.
 *
 * This deliberately diverges from the sibling `EmptyChapterView`, which keeps the editor
 * mounted-but-hidden and refocuses it: that view has a chapter to return to, whereas a book missing
 * from the project has no editable content to keep mounted.
 */
export function BookNotAvailableView({
  localizedStrings = {},
  isPowerMode,
  manageBooksDisabledReason,
  onOpenManageBooks,
  announcementKey,
}: BookNotAvailableViewProps) {
  const regionRef = useFocusReplacedContent<HTMLDivElement>(announcementKey);

  if (!isPowerMode) {
    return (
      // Keyed so a new subject remounts the live region. `aria-live` reports content that CHANGES;
      // the same sentence about a different book is not a change it can see.
      <div
        key={announcementKey}
        ref={regionRef}
        role="status"
        tabIndex={-1}
        className="tw:flex tw:h-full tw:items-center tw:justify-center tw:px-4 tw:outline-none"
      >
        {/* Same small muted treatment as `EmptyDescription` in the Power branch below and as
            `EmptyState` in the resource surfaces, so a missing book reads identically wherever the
            user meets it. It stays a plain `span` rather than `EmptyState` because the
            `role="status"` live region and the focus target both live on the wrapper above, which
            `EmptyState` has no way to accept. */}
        <span className="tw:text-center tw:text-sm tw:text-muted-foreground">
          {localize(localizedStrings, SIMPLE_MESSAGE_KEY)}
        </span>
      </div>
    );
  }

  const isManageBooksDisabled = !!manageBooksDisabledReason;
  const manageBooksButtonLabel = localize(localizedStrings, MANAGE_BOOKS_BUTTON_KEY);

  return (
    // Keyed for the same reason as the Simple branch above: neither the title nor the description
    // names the book, so without a remount the region's text is identical for the next missing book.
    <Empty
      key={announcementKey}
      ref={regionRef}
      role="status"
      tabIndex={-1}
      className="tw:h-full tw:outline-none"
    >
      <EmptyHeader>
        {/* `EmptyTitle` renders a `div`, not a heading. This zero-state is the entire content of the
          editor panel, so it needs a real heading for structure-based navigation — nesting one inside
          is what the shadcn `Empty` docs prescribe rather than changing the vendored primitive. */}
        <EmptyTitle>
          <h2>{localize(localizedStrings, TITLE_KEY)}</h2>
        </EmptyTitle>
        {/* The button's label is a `{buttonLabel}` placeholder in the description rather than
          concatenated in prose, so each translation decides where the control's name falls in the
          sentence — and there is exactly one localized spelling of the label, shared with the button
          below. */}
        <EmptyDescription>
          {formatReplacementString(localize(localizedStrings, DESCRIPTION_KEY), {
            buttonLabel: manageBooksButtonLabel,
          })}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <DisabledActionTooltip
          disabled={isManageBooksDisabled}
          tooltipText={
            manageBooksDisabledReason
              ? localize(localizedStrings, DISABLED_REASON_TOOLTIP_KEYS[manageBooksDisabledReason])
              : ''
          }
        >
          <Button disabled={isManageBooksDisabled} onClick={onOpenManageBooks}>
            {manageBooksButtonLabel}
          </Button>
        </DisabledActionTooltip>
      </EmptyContent>
    </Empty>
  );
}
