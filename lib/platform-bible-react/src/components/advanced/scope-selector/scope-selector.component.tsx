import { BookSelector } from '@/components/advanced/scope-selector/book-selector.component';
import { BookChapterControl } from '@/components/advanced/book-chapter-control/book-chapter-control.component';
import { BookChapterControlLocalizedStrings } from '@/components/advanced/book-chapter-control/book-chapter-control.types';
import { Button } from '@/components/shadcn-ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn-ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';
import { Label } from '@/components/shadcn-ui/label';
import { PopoverPortalContainerProvider } from '@/components/shadcn-ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/shadcn-ui/radio-group';
import { Scope } from '@/components/utils/scripture.util';
import { cn } from '@/utils/shadcn-ui.util';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { Check, ChevronDown } from 'lucide-react';
import {
  defaultScrRef,
  formatScrRef,
  formatScrRefRange,
  LocalizedStringValue,
} from 'platform-bible-utils';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Object containing all keys used for localization in this component. If you're using this
 * component in an extension, you can pass it into the useLocalizedStrings hook to easily obtain the
 * localized strings and pass them into the localizedStrings prop of this component
 */
export const SCOPE_SELECTOR_STRING_KEYS = Object.freeze([
  '%webView_scope_selector_selected_text%',
  '%webView_scope_selector_verse%',
  '%webView_scope_selector_chapter%',
  '%webView_scope_selector_book%',
  '%webView_scope_selector_current_verse%',
  '%webView_scope_selector_current_chapter%',
  '%webView_scope_selector_current_book%',
  '%webView_scope_selector_choose_books%',
  '%webView_scope_selector_scope%',
  '%webView_scope_selector_select_books%',
  '%webView_scope_selector_range%',
  '%webView_scope_selector_select_range%',
  '%webView_scope_selector_range_start%',
  '%webView_scope_selector_range_end%',
  '%webView_scope_selector_ok%',
  '%webView_scope_selector_cancel%',
  '%webView_scope_selector_navigate%',
  '%webView_book_selector_books_selected%',
  '%webView_book_selector_select_books%',
  '%webView_book_selector_search_books%',
  '%webView_book_selector_select_all%',
  '%webView_book_selector_clear_all%',
  '%webView_book_selector_no_book_found%',
  '%webView_book_selector_more%',
  '%scripture_section_ot_long%',
  '%scripture_section_ot_short%',
  '%scripture_section_nt_long%',
  '%scripture_section_nt_short%',
  '%scripture_section_dc_long%',
  '%scripture_section_dc_short%',
  '%scripture_section_extra_long%',
  '%scripture_section_extra_short%',
] as const);

/** Type definition for the localized strings used in this component */
export type ScopeSelectorLocalizedStrings = {
  [localizedInventoryKey in (typeof SCOPE_SELECTOR_STRING_KEYS)[number]]?: LocalizedStringValue;
};

/**
 * Gets the localized value for the provided key
 *
 * @param strings Object containing localized string
 * @param key Key for a localized string
 * @returns The localized value for the provided key, if available. Returns the key if no localized
 *   value is available
 */
const localizeString = (
  strings: ScopeSelectorLocalizedStrings,
  key: keyof ScopeSelectorLocalizedStrings,
) => {
  return strings[key] ?? key;
};

/** Visual layout variant for the scope options. */
export type ScopeSelectorVariant = 'radio' | 'dropdown';

/**
 * Keys that submit the start reference in the range picker in addition to Enter. Space and `-` are
 * the natural separators a user types between a start and end reference, so we treat them as "I'm
 * done with the start, take me to the end" signals.
 */
const RANGE_START_SUBMIT_KEYS = Object.freeze([' ', '-']);

/** Props for configuring the ScopeSelector component */
interface ScopeSelectorProps {
  /** The current scope selection */
  scope: Scope;

  /**
   * Optional array of scopes that should be available in the selector. If not provided, all scopes
   * will be shown as defined in the Scope type
   */
  availableScopes?: Scope[];

  /** Callback function that is executed when the user changes the scope selection */
  onScopeChange: (scope: Scope) => void;

  /**
   * Information about available books, formatted as a 123 character long string as defined in a
   * projects BooksPresent setting
   */
  availableBookInfo: string;

  /** Array of currently selected book IDs */
  selectedBookIds: string[];

  /** Callback function that is executed when the user changes the book selection */
  onSelectedBookIdsChange: (books: string[]) => void;

  /**
   * Object with all localized strings that the component needs to work well across multiple
   * languages. When using this component with Platform.Bible, you can import
   * `SCOPE_SELECTOR_STRING_KEYS` from this library, pass it in to the Platform's localization hook,
   * and pass the localized keys that are returned by the hook into this prop.
   */
  localizedStrings: ScopeSelectorLocalizedStrings;
  /**
   * Optional map of localized book IDs/short names and full names. Key is the (English) book ID,
   * value contains localized versions of the ID and full book name
   */
  localizedBookNames?: Map<string, { localizedId: string; localizedName: string }>;
  /** Optional ID that is applied to the root element of this component */
  id?: string;

  /**
   * Controls how the scope options are presented. `'radio'` (default) renders a vertical list of
   * radio buttons. `'dropdown'` renders a single Select trigger whose popover contains the
   * options.
   */
  variant?: ScopeSelectorVariant;

  /**
   * The start of the verse range. Only used when `scope === 'range'`. Defaults to `defaultScrRef`
   * (GEN 1:1) if neither this nor `currentScrRef` is provided.
   */
  rangeStart?: SerializedVerseRef;
  /**
   * The end of the verse range. Only used when `scope === 'range'`. Every time the user submits a
   * new `rangeStart`, `onRangeEndChange` is also fired with that same reference so the end mirrors
   * the start; the user is free to narrow the end afterward. Defaults to `defaultScrRef` (GEN 1:1)
   * if neither this nor `currentScrRef` is provided.
   */
  rangeEnd?: SerializedVerseRef;
  /** Callback when the range start reference changes. Required to make the range UI functional. */
  onRangeStartChange?: (scrRef: SerializedVerseRef) => void;
  /** Callback when the range end reference changes. Required to make the range UI functional. */
  onRangeEndChange?: (scrRef: SerializedVerseRef) => void;
  /**
   * Optional current scripture reference. When provided and no explicit `rangeStart` or `rangeEnd`
   * is supplied, it is used as the initial value for the range controls.
   */
  currentScrRef?: SerializedVerseRef;
  /**
   * Optional callback fired when the user picks a new scripture reference from the "Navigate"
   * footer entry at the bottom of the dropdown variant. Provide this alongside `currentScrRef` (and
   * using `variant="dropdown"`) to surface the footer button — a BookChapterControl picker prefixed
   * with a "Navigate" headline and the current reference. Without this callback the footer is not
   * rendered.
   */
  onCurrentScrRefChange?: (scrRef: SerializedVerseRef) => void;
  /**
   * Optional localized strings passed to the range BCV controls. When omitted, the BCV controls
   * will fall back to their internal defaults.
   */
  bookChapterControlLocalizedStrings?: BookChapterControlLocalizedStrings;
  /**
   * Optional callback returning the number of verses for a given book and chapter. When provided,
   * the range BCV controls enable verse selection. See `BookChapterControlProps.getEndVerse`.
   */
  getEndVerse?: (bookId: string, chapterNum: number) => number;
  /**
   * When true, suppresses the "Scope" label rendered above the trigger. Useful for compact
   * placements (e.g. inside a tab toolbar) where the trigger speaks for itself and the extra
   * vertical space pushes the trigger off-screen.
   */
  hideLabel?: boolean;
  /**
   * Additional Tailwind classes applied to the trigger button. Use this to control the trigger
   * height in compact contexts (e.g. `'tw-h-8'` to align with other toolbar controls).
   */
  buttonClassName?: string;
}

/**
 * A component that allows users to select the scope of their search or operation. Available scopes
 * are defined in the Scope type. When 'selectedBooks' is chosen as the scope, a BookSelector
 * component is displayed to allow users to choose specific books. When 'range' is chosen, two
 * BookChapterControl pickers are displayed for selecting the start and end verse of the range.
 */
export function ScopeSelector({
  scope,
  availableScopes,
  onScopeChange,
  availableBookInfo,
  selectedBookIds,
  onSelectedBookIdsChange,
  localizedStrings,
  localizedBookNames,
  id,
  variant = 'radio',
  rangeStart,
  rangeEnd,
  onRangeStartChange,
  onRangeEndChange,
  currentScrRef,
  onCurrentScrRefChange,
  bookChapterControlLocalizedStrings,
  getEndVerse,
  hideLabel = false,
  buttonClassName,
}: ScopeSelectorProps) {
  const selectedTextText = localizeString(
    localizedStrings,
    '%webView_scope_selector_selected_text%',
  );
  const verseText = localizeString(localizedStrings, '%webView_scope_selector_verse%');
  const chapterText = localizeString(localizedStrings, '%webView_scope_selector_chapter%');
  const bookText = localizeString(localizedStrings, '%webView_scope_selector_book%');
  const currentVerseText = localizeString(
    localizedStrings,
    '%webView_scope_selector_current_verse%',
  );
  const currentChapterText = localizeString(
    localizedStrings,
    '%webView_scope_selector_current_chapter%',
  );
  const currentBookText = localizeString(localizedStrings, '%webView_scope_selector_current_book%');
  const chooseBooksText = localizeString(localizedStrings, '%webView_scope_selector_choose_books%');
  const scopeText = localizeString(localizedStrings, '%webView_scope_selector_scope%');
  const selectBooksText = localizeString(localizedStrings, '%webView_scope_selector_select_books%');
  const rangeText = localizeString(localizedStrings, '%webView_scope_selector_range%');
  const selectRangeText = localizeString(localizedStrings, '%webView_scope_selector_select_range%');
  const rangeStartText = localizeString(localizedStrings, '%webView_scope_selector_range_start%');
  const rangeEndText = localizeString(localizedStrings, '%webView_scope_selector_range_end%');
  const okText = localizeString(localizedStrings, '%webView_scope_selector_ok%');
  const cancelText = localizeString(localizedStrings, '%webView_scope_selector_cancel%');
  const navigateText = localizeString(localizedStrings, '%webView_scope_selector_navigate%');

  // For the verse / chapter / book scopes we surface the current scripture reference alongside the
  // base label (e.g. "Verse: GEN 1:1"). The suffix is kept separate from the base label so the
  // rendering can style it differently (muted foreground). When no `currentScrRef` is provided we
  // fall through to just the bare label.
  const getScrRefSuffix = (scopeValue: Scope): string | undefined => {
    if (!currentScrRef) return undefined;
    const upperBook = currentScrRef.book.toUpperCase();
    switch (scopeValue) {
      case 'verse':
        return formatScrRef(currentScrRef, 'id');
      case 'chapter':
        return `${upperBook} ${currentScrRef.chapterNum}`;
      case 'book':
        return upperBook;
      default:
        return undefined;
    }
  };

  // Each option carries a `label` (used in the trigger button) and an optional `dropdownLabel`
  // (used in the dropdown menu items). For verse / chapter / book the dropdown form prefixes
  // "Current" so users browsing the menu see the semantics up front; the trigger stays terse
  // so the selected value stays compact ("Verse: GEN 1:1" rather than "Current verse: GEN 1:1").
  const SCOPE_OPTIONS: Array<{
    value: Scope;
    label: string;
    dropdownLabel?: string;
    scrRefSuffix?: string;
    id: string;
  }> = [
    { value: 'selectedText', label: selectedTextText, id: 'scope-selected-text' },
    {
      value: 'verse',
      label: verseText,
      dropdownLabel: currentVerseText,
      scrRefSuffix: getScrRefSuffix('verse'),
      id: 'scope-verse',
    },
    {
      value: 'chapter',
      label: chapterText,
      dropdownLabel: currentChapterText,
      scrRefSuffix: getScrRefSuffix('chapter'),
      id: 'scope-chapter',
    },
    {
      value: 'book',
      label: bookText,
      dropdownLabel: currentBookText,
      scrRefSuffix: getScrRefSuffix('book'),
      id: 'scope-book',
    },
    { value: 'selectedBooks', label: chooseBooksText, id: 'scope-selected' },
    { value: 'range', label: rangeText, id: 'scope-range' },
  ];

  // Renders a scope option label with its optional ScrRef suffix styled in muted foreground. Kept
  // inline so every render site (dropdown items, radio labels, trigger content) is visually
  // consistent. `hideScrRef` is true only for the trigger in the dropdown variant when the
  // trigger width is too narrow to fit both the label and the reference — the dropdown menu
  // items and radio labels always show the suffix.
  const renderScopeLabel = (
    label: string,
    scrRefSuffix: string | undefined,
    hideScrRef = false,
  ) => (
    <>
      {label}
      {scrRefSuffix && !hideScrRef && (
        <span className="tw-text-muted-foreground">: {scrRefSuffix}</span>
      )}
    </>
  );

  const displayedScopes = availableScopes
    ? SCOPE_OPTIONS.filter((option) => availableScopes.includes(option.value))
    : SCOPE_OPTIONS;

  // Both range pickers default to the caller-supplied current scripture reference, falling back
  // to GEN 1:1 when nothing is provided. `rangeStart` / `rangeEnd` always win when explicitly
  // supplied so the component stays controlled.
  const fallbackScrRef = currentScrRef ?? defaultScrRef;
  const resolvedRangeStart = rangeStart ?? fallbackScrRef;
  const resolvedRangeEnd = rangeEnd ?? fallbackScrRef;

  const noopScrRefChange = () => {};

  // Wrapper around the end BCV, used to find its trigger button so we can programmatically
  // open the end picker after the user submits the start reference. Clicking a DOM node
  // from a callback is a bit blunt, but BCV doesn't expose an imperative API and the
  // trigger is a stable child of this wrapper (a single `<button>`). `null` is the
  // idiomatic ref "not attached yet" value; there is no `undefined` equivalent.
  // eslint-disable-next-line no-null/no-null
  const rangeEndWrapperRef = useRef<HTMLDivElement | null>(null);

  // Wrapper around the navigate-footer BCV. Same shape as `rangeEndWrapperRef` — we grab
  // the inner trigger button by query rather than threading a ref through BCV. Used by
  // the DropdownMenuItem's onSelect to open the picker on keyboard Enter / Space.
  // eslint-disable-next-line no-null/no-null
  const navBcvWrapperRef = useRef<HTMLDivElement | null>(null);
  // Flag set by a pointerDownCapture on the navigate row when the pointer lands on the
  // BCV trigger button. The trigger's own onClick will open the popover, so the
  // DropdownMenuItem's onSelect (which Radix also fires for pointer activations) must
  // skip re-clicking — otherwise it would immediately toggle the popover closed again.
  const navBcvPointerActivatedRef = useRef(false);
  // Ref to the navigate DropdownMenuItem element. After the BCV popover closes, Radix
  // Popover restores focus to its trigger (the BCV button inside the item) which breaks
  // the outer DropdownMenu's arrow-key navigation — arrow keys require focus on a
  // DropdownMenuItem, not a descendant button. We move focus back to the item so the
  // dropdown behaves normally once the picker dismisses.
  // eslint-disable-next-line no-null/no-null
  const navMenuItemRef = useRef<HTMLDivElement | null>(null);
  // Tracks whether the navigate BCV popover is currently open. Consumed by the
  // DropdownMenuItem's onSelect to skip the programmatic trigger re-click when the
  // picker is already open. Without this guard: Radix `MenuItem.onKeyDown` intercepts
  // Space / Enter by calling `event.currentTarget.click()` on the item, which fires
  // onSelect, which re-clicks the BCV trigger button — toggling the open popover shut.
  // The menu item being "activated" while its content is already visible should be a
  // no-op, not a dismiss.
  const isNavBcvOpenRef = useRef(false);

  // Which range BCV (if any) is currently showing its picker. Used to dim the sibling
  // control so the active picker's focus is visually obvious.
  const [activeRangeBcv, setActiveRangeBcv] = useState<'start' | 'end' | undefined>(undefined);
  // Set when the start BCV submits a new reference; consumed when the start popover closes
  // to decide whether to auto-advance focus into the end picker. Quick-nav arrow buttons
  // inside BCV also call `handleSubmit` but don't close the popover, so they never trigger
  // the advance — the user is still browsing, not picking.
  const pendingAdvanceToEndRef = useRef(false);
  // Same pattern for the end BCV: when it submits, move focus to the dialog's OK button
  // on close so keyboard users can confirm the range with a single Enter.
  const pendingAdvanceToOkRef = useRef(false);
  // Ref to the range dialog's OK button so we can focus it after the end picker submits.
  // React's ref "not attached" marker is `null`.
  // eslint-disable-next-line no-null/no-null
  const rangeOkButtonRef = useRef<HTMLButtonElement | null>(null);
  // Opens update the state to the opening side; closes only clear the state if that same
  // side was active, so a late close event from the non-active BCV can't wipe the active
  // state (e.g. while the user is tabbing rapidly between triggers).
  const handleRangeStartOpenChange = useCallback((open: boolean) => {
    if (open) {
      setActiveRangeBcv('start');
      // A fresh open invalidates any stale advance flag from a prior interaction.
      pendingAdvanceToEndRef.current = false;
      return;
    }
    setActiveRangeBcv((prev) => (prev === 'start' ? undefined : prev));
    if (pendingAdvanceToEndRef.current) {
      pendingAdvanceToEndRef.current = false;
      // Defer so the start popover finishes closing and focus lands back on its trigger
      // before we move it — otherwise the focus hand-off races with Radix's own restore.
      requestAnimationFrame(() => {
        const endTrigger = rangeEndWrapperRef.current?.querySelector('button');
        endTrigger?.click();
      });
    }
  }, []);
  const handleRangeEndOpenChange = useCallback((open: boolean) => {
    if (open) {
      setActiveRangeBcv('end');
      // A fresh open invalidates any stale advance flag from a prior interaction.
      pendingAdvanceToOkRef.current = false;
      return;
    }
    setActiveRangeBcv((prev) => (prev === 'end' ? undefined : prev));
    // The OK focus hand-off lives in the end BCV's `onCloseAutoFocus` (below) —
    // not here — because Radix's own `onCloseAutoFocus` restores focus to the
    // trigger AFTER our `onOpenChange` subscriber would run, which would overwrite
    // the focus. `onCloseAutoFocus` lets us preventDefault that restore in-place.
  }, []);

  // Range pickers: when the user completes a valid start reference from inside the picker
  // (grid click, Enter on the top match, or one of the `RANGE_START_SUBMIT_KEYS` — space or
  // `-` — that also submit), the start picker submits and closes, and we then open the end
  // picker so the user can keep typing without reaching for the mouse. The advance itself is
  // driven from `handleRangeStartOpenChange` on close, so quick-nav arrow submissions (which
  // don't close the popover) correctly skip advancing.
  const handleRangeStartChange = useCallback(
    (newStart: SerializedVerseRef) => {
      onRangeStartChange?.(newStart);
      onRangeEndChange?.(newStart);
      pendingAdvanceToEndRef.current = true;
    },
    [onRangeStartChange, onRangeEndChange],
  );

  // Mirror for the end picker: when the user completes a valid end reference, flag that
  // focus should advance to the dialog's OK button on close. Same caveat as the start —
  // quick-nav arrow submissions keep the popover open, so they never trigger the advance.
  const handleRangeEndChangeWrapper = useCallback(
    (newEnd: SerializedVerseRef) => {
      onRangeEndChange?.(newEnd);
      pendingAdvanceToOkRef.current = true;
    },
    [onRangeEndChange],
  );

  // When the scope switches to selectedBooks and nothing is selected yet, seed the selection with
  // the current book (if known) so the user has a meaningful starting point. When no current ref
  // is provided we leave it empty.
  const handleScopeChange = useCallback(
    (newScope: Scope) => {
      onScopeChange(newScope);
      if (newScope === 'selectedBooks' && selectedBookIds.length === 0 && currentScrRef?.book) {
        onSelectedBookIdsChange([currentScrRef.book]);
      }
    },
    [onScopeChange, selectedBookIds, currentScrRef, onSelectedBookIdsChange],
  );

  const currentScopeOption = displayedScopes.find((option) => option.value === scope);

  // Trigger text used by the dropdown variant. For selectedBooks / range we show a short summary
  // of the active selection. Book IDs are always the uppercase 3-letter English codes (GEN, EXO,
  // MAT, ...) so the trigger width is predictable and doesn't balloon with long localized names.
  const renderTriggerContent = () => {
    if (scope === 'selectedBooks' && selectedBookIds.length > 0) {
      return selectedBookIds.map((bookId) => bookId.toUpperCase()).join(', ');
    }
    if (scope === 'range') {
      return formatScrRefRange(resolvedRangeStart, resolvedRangeEnd, {
        optionOrLocalizedBookName: 'id',
        endRefOptionOrLocalizedBookName: 'id',
        repeatBookName: true,
      });
    }
    if (currentScopeOption) {
      return renderScopeLabel(currentScopeOption.label, currentScopeOption.scrRefSuffix);
    }
    return scope;
  };

  const simpleScopes = displayedScopes.filter(
    (option) => option.value !== 'selectedBooks' && option.value !== 'range',
  );
  const selectedBooksScope = displayedScopes.find((option) => option.value === 'selectedBooks');
  const rangeScope = displayedScopes.find((option) => option.value === 'range');

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // `dialogSub` tracks which scope's content is currently showing in the modal dialog
  // (the selectedBooks / range pickers always open as dialogs rather than as flyout submenus —
  // the dialog form is consistent regardless of viewport size and gives those more complex
  // pickers their own focus scope).
  const [dialogSub, setDialogSub] = useState<Scope | undefined>(undefined);
  // ─── Dialog staging (D1, D2, D3) ──────────────────────────────────────────
  // While a range / selectedBooks dialog is open, edits accumulate into these
  // drafts. They commit (via the prop callbacks) on OK and discard on
  // Cancel/X/Escape. No callback fires while the dialog is open.
  const [draftScope, setDraftScope] = useState<Scope | undefined>(undefined);
  const [draftRangeStart, setDraftRangeStart] = useState<SerializedVerseRef | undefined>(undefined);
  const [draftRangeEnd, setDraftRangeEnd] = useState<SerializedVerseRef | undefined>(undefined);
  const [draftSelectedBookIds, setDraftSelectedBookIds] = useState<string[]>([]);

  const isInBooksDialog = variant === 'dropdown' && dialogSub === 'selectedBooks';
  const bookSelectorBlock = (
    <BookSelector
      availableBookInfo={availableBookInfo}
      selectedBookIds={isInBooksDialog ? draftSelectedBookIds : selectedBookIds}
      onChangeSelectedBookIds={isInBooksDialog ? setDraftSelectedBookIds : onSelectedBookIdsChange}
      localizedStrings={localizedStrings}
      localizedBookNames={localizedBookNames}
    />
  );

  // While one range BCV is showing its picker, fade the other side (label + trigger) to
  // muted-foreground so the active picker visibly owns the user's focus. The fade reverts
  // as soon as that BCV closes.
  const startMuted = activeRangeBcv === 'end';
  const endMuted = activeRangeBcv === 'start';
  const mutedClass = 'tw-text-muted-foreground';

  // When the range dialog is open in the dropdown variant, BCV submits write to drafts
  // (committed on OK). Otherwise (radio variant inline), they fire the prop callbacks
  // eagerly — matching radio-button UX. Per spec D3 / §5.5.
  const isInRangeDialog = variant === 'dropdown' && dialogSub === 'range';
  const rangeStartSubmit = isInRangeDialog ? setDraftRangeStart : handleRangeStartChange;
  const eagerRangeEndSubmit = onRangeEndChange ? handleRangeEndChangeWrapper : noopScrRefChange;
  const rangeEndSubmit = isInRangeDialog ? setDraftRangeEnd : eagerRangeEndSubmit;

  const rangeBlock = (
    <div className="tw-flex tw-flex-wrap tw-items-end tw-gap-4">
      <div className="tw-grid tw-gap-2">
        <Label htmlFor="scope-range-start" className={cn(startMuted && mutedClass)}>
          {rangeStartText}
        </Label>
        <BookChapterControl
          id="scope-range-start"
          scrRef={isInRangeDialog ? (draftRangeStart ?? resolvedRangeStart) : resolvedRangeStart}
          handleSubmit={rangeStartSubmit}
          localizedBookNames={localizedBookNames}
          localizedStrings={bookChapterControlLocalizedStrings}
          getEndVerse={getEndVerse}
          // Space and `-` are natural "separator" keystrokes between a start and end
          // reference (e.g. "GEN 1:5 " or "GEN 1:5-"). When the user types a valid start
          // and presses either, BCV submits the match and `handleRangeStartChange` opens
          // the end picker.
          submitKeys={RANGE_START_SUBMIT_KEYS}
          onOpenChange={handleRangeStartOpenChange}
          className={cn(startMuted && mutedClass)}
          // Modal so the picker owns its own FocusScope when opened from inside the
          // DropdownMenuSubContent or the Dialog fallback. See the navigate footer BCV
          // for the same reasoning — without this, view transitions (book → chapter)
          // collide with the outer focus trap and the popover dismisses.
          modal
        />
      </div>
      <div ref={rangeEndWrapperRef} className="tw-grid tw-gap-2">
        <Label htmlFor="scope-range-end" className={cn(endMuted && mutedClass)}>
          {rangeEndText}
        </Label>
        <BookChapterControl
          id="scope-range-end"
          scrRef={isInRangeDialog ? (draftRangeEnd ?? resolvedRangeEnd) : resolvedRangeEnd}
          handleSubmit={rangeEndSubmit}
          localizedBookNames={localizedBookNames}
          localizedStrings={bookChapterControlLocalizedStrings}
          getEndVerse={getEndVerse}
          disableReferencesUpTo={
            isInRangeDialog ? (draftRangeStart ?? resolvedRangeStart) : resolvedRangeStart
          }
          onOpenChange={handleRangeEndOpenChange}
          onCloseAutoFocus={(event) => {
            // After the user submits the end reference, park focus on the dialog's
            // OK button so a keyboard user can confirm the range with a single Enter.
            // Radix's own `onCloseAutoFocus` for modal popovers normally restores
            // focus to the trigger — composeEventHandlers skips that if we
            // preventDefault here, so this single handler both suppresses the
            // trigger-restore AND parks focus on OK without any timing race.
            if (pendingAdvanceToOkRef.current) {
              pendingAdvanceToOkRef.current = false;
              event.preventDefault();
              rangeOkButtonRef.current?.focus();
            }
          }}
          className={cn(endMuted && mutedClass)}
          // See scope-range-start — modal so the picker owns its own FocusScope.
          modal
          // Align the popover to the leading edge of the trigger. Without this the default
          // `"center"` alignment can push the popover past the dialog's right edge (the end
          // trigger sits on the right side of the flex row).
          align="start"
        />
      </div>
    </div>
  );

  // Refs to every scope entry in the dropdown (simple checkbox items and dialog-launcher
  // items) keyed by scope value. Used by the open-focus effect below to land initial focus
  // on the currently selected scope instead of Radix's default first-item.
  const scopeItemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const assignScopeItemRef = useCallback(
    (targetScope: Scope) => (node: HTMLDivElement | null) => {
      scopeItemRefs.current[targetScope] = node;
    },
    [],
  );
  // The outer combobox button. Focus is returned here when a dialog closes so the UX
  // matches selecting a simple option (Radix's default for DropdownMenuItem
  // selection). React refs use `null` for "not attached"; there is no undefined equivalent
  // in the DOM/ref API.
  // eslint-disable-next-line no-null/no-null
  const outerTriggerRef = useRef<HTMLButtonElement | null>(null);

  // When the dropdown opens, land initial focus on the currently selected scope instead
  // of Radix's default first-item. Radix strips both `onOpenAutoFocus` and `onEntryFocus`
  // from DropdownMenuContent's public prop type (they live in `MenuContentImplPrivateProps`
  // / are explicitly `Omit`ed), so we can't preventDefault Radix's internal auto-focus
  // directly — we run our own focus call after it. A cascaded double-RAF is needed in
  // practice: Radix's layout effect focuses the content wrapper first, then a frame later
  // `RovingFocusGroup`'s `onEntryFocus` focuses the first item. A single RAF races against
  // that second step; the second (nested) RAF runs strictly after it.
  useEffect(() => {
    if (!isDropdownOpen) return undefined;
    let secondRaf = 0;
    const firstRaf = requestAnimationFrame(() => {
      secondRaf = requestAnimationFrame(() => {
        scopeItemRefs.current[scope]?.focus();
      });
    });
    return () => {
      cancelAnimationFrame(firstRaf);
      if (secondRaf) cancelAnimationFrame(secondRaf);
    };
  }, [isDropdownOpen, scope]);

  // Re-portal any BCV / BookSelector popovers opened from inside the fallback dialog into
  // the DialogContent element itself, via `PopoverPortalContainerProvider`. If we left them
  // portaled to document.body (Radix's default), they'd be outside the dialog's focus trap
  // subtree — the trap would yank focus back into the dialog whenever the popover grabbed
  // it, which closed the popover mid-selection. Rendering popovers as DOM descendants of
  // the dialog keeps modal focus trapping intact while letting the pickers work normally.
  // useState's initial value — null is the idiomatic "no element yet" marker that ref
  // callbacks also use, so keep the whole lifecycle on null rather than mixing with
  // undefined.
  // eslint-disable-next-line no-null/no-null
  const [rangeDialogEl, setRangeDialogEl] = useState<HTMLDivElement | null>(null);
  // eslint-disable-next-line no-null/no-null
  const [booksDialogEl, setBooksDialogEl] = useState<HTMLDivElement | null>(null);
  // `null` tracking for the outer dropdown's content element. We portal the inline
  // "change current reference" BCV popover into this container so the picker's portal'd
  // content stays inside the dropdown's DismissableLayer / FocusScope — otherwise the
  // dropdown's focus trap (modal by default) would yank focus out of the BCV popover the
  // moment it opened, and any click inside the BCV popover would read as "outside the
  // dropdown" and dismiss the menu.
  // eslint-disable-next-line no-null/no-null
  const [dropdownContentEl, setDropdownContentEl] = useState<HTMLDivElement | null>(null);
  // When the dropdown's content width drops below this threshold, the ScrRef suffix on
  // the "Current verse / chapter / book" menu items is suppressed — the scope name alone
  // reads better than a truncated "Current verse: GEN…" at narrow widths.
  const DROPDOWN_NARROW_THRESHOLD_PX = 200;
  const [isDropdownNarrow, setIsDropdownNarrow] = useState(false);
  useEffect(() => {
    if (!dropdownContentEl || typeof ResizeObserver === 'undefined') return undefined;
    const observer = new ResizeObserver(([entry]) => {
      setIsDropdownNarrow(entry.contentRect.width < DROPDOWN_NARROW_THRESHOLD_PX);
    });
    observer.observe(dropdownContentEl);
    return () => observer.disconnect();
  }, [dropdownContentEl]);

  // selectedBooks / range launchers: promote the picker to a modal dialog. Closing the outer
  // dropdown here gives the dialog a clean focus handoff — the dialog opens as the dropdown
  // tears down, and when the dialog closes we return focus to the outer trigger (same UX as
  // Radix's default behavior after selecting a simple DropdownMenuItem).
  const openDialogFallback = useCallback(
    (targetScope: Scope) => {
      // D1: seed drafts from current props/state; do NOT commit scope yet.
      // commitDialog (Task SS-T3) fires onScopeChange + range/books callbacks on OK.
      setDraftScope(targetScope);
      setDraftRangeStart(resolvedRangeStart);
      setDraftRangeEnd(resolvedRangeEnd);
      setDraftSelectedBookIds(selectedBookIds);
      setIsDropdownOpen(false);
      setDialogSub(targetScope);
    },
    [resolvedRangeStart, resolvedRangeEnd, selectedBookIds],
  );

  const commitDialog = useCallback(() => {
    if (draftScope === undefined) return;
    if (draftScope === 'range') {
      if (draftRangeStart) onRangeStartChange?.(draftRangeStart);
      if (draftRangeEnd) onRangeEndChange?.(draftRangeEnd);
    } else if (draftScope === 'selectedBooks') {
      onSelectedBookIdsChange(draftSelectedBookIds);
    }
    // Fire onScopeChange last so consumers reading committed range/book values
    // (e.g. markers-checklist post-migration: verseRange computed from rangeStart/rangeEnd
    // when scope === 'range') see updated values when they react to the scope change.
    // React batches these state updates within the same handler invocation.
    handleScopeChange(draftScope);
    setDialogSub(undefined);
    setDraftScope(undefined);
  }, [
    draftScope,
    draftRangeStart,
    draftRangeEnd,
    draftSelectedBookIds,
    onRangeStartChange,
    onRangeEndChange,
    onSelectedBookIdsChange,
    handleScopeChange,
  ]);

  const handleDialogOpenChange = useCallback((open: boolean) => {
    if (!open) {
      // Cancel/X/Escape/clickaway — discard drafts, no callbacks fire.
      setDialogSub(undefined);
      setDraftScope(undefined);
    }
  }, []);
  // Dialog's `onCloseAutoFocus` default restores focus to the element that had focus before
  // the dialog opened — which was the (now-unmounted) DropdownMenuItem inside the closed
  // dropdown. That leaves focus on document.body. PreventDefault and refocus the outer
  // trigger so keyboard users can reopen the menu immediately.
  const handleDialogCloseAutoFocus = useCallback((event: Event) => {
    event.preventDefault();
    outerTriggerRef.current?.focus();
  }, []);

  const renderDialogLauncherCheck = (launcherScope: Scope) =>
    scope === launcherScope ? (
      <span className="tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2">
        <Check className="tw-h-4 tw-w-4" />
      </span>
    ) : undefined;

  return (
    <div id={id} className="tw-grid tw-gap-4">
      <div className="tw-grid tw-gap-2">
        {!hideLabel && <Label>{scopeText}</Label>}
        {variant === 'dropdown' ? (
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                ref={outerTriggerRef}
                variant="outline"
                role="combobox"
                className={cn(
                  'tw-w-full tw-justify-between tw-overflow-hidden tw-font-normal',
                  buttonClassName,
                )}
              >
                {/* tw-min-w-0 lets the span shrink inside the flex Button so tw-truncate can clip
                    the text instead of pushing the chevron out when the selection is long. */}
                <span className="tw-min-w-0 tw-flex-1 tw-truncate tw-text-start">
                  {renderTriggerContent()}
                </span>
                <ChevronDown className="tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              ref={setDropdownContentEl}
              className="tw-w-[var(--radix-dropdown-menu-trigger-width)] tw-min-w-[12rem]"
              align="start"
            >
              <PopoverPortalContainerProvider container={dropdownContentEl}>
                {simpleScopes.map(({ value, label, dropdownLabel, scrRefSuffix, id: scopeId }) => (
                  <DropdownMenuItem
                    key={scopeId}
                    ref={assignScopeItemRef(value)}
                    // Match dialog-launcher items for visual consistency.
                    // tw-ps-8 reserves space for the leading Check indicator.
                    // data-[highlighted] styles trigger on Radix's hover/focus mapping
                    // (D5: pointer hover normally fires data-highlighted; this makes the
                    // tw-bg-accent highlight unambiguous).
                    className="tw-relative tw-ps-8 data-[highlighted]:tw-bg-accent data-[highlighted]:tw-text-accent-foreground"
                    onSelect={() => handleScopeChange(value)}
                    data-selected={scope === value ? 'true' : undefined}
                  >
                    {scope === value && (
                      <span className="tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2">
                        <Check className="tw-h-4 tw-w-4" />
                      </span>
                    )}
                    {renderScopeLabel(dropdownLabel ?? label, scrRefSuffix, isDropdownNarrow)}
                  </DropdownMenuItem>
                ))}
                {(selectedBooksScope || rangeScope) && <DropdownMenuSeparator />}
                {selectedBooksScope && (
                  <DropdownMenuItem
                    ref={assignScopeItemRef('selectedBooks')}
                    // `data-[highlighted]` mirrors the simple scope items so the hover/focus
                    // effect is visually identical across the whole list. `tw-ps-8` keeps the
                    // label aligned with the items above.
                    className={cn(
                      'tw-relative tw-ps-8',
                      'data-[highlighted]:tw-bg-accent data-[highlighted]:tw-text-accent-foreground',
                    )}
                    onSelect={() => openDialogFallback('selectedBooks')}
                    data-selected={scope === 'selectedBooks' ? 'true' : undefined}
                  >
                    {renderDialogLauncherCheck('selectedBooks')}
                    {/* Trailing ellipsis — standard affordance for a menu item that opens a
                      dialog. */}
                    {`${selectedBooksScope.label}…`}
                  </DropdownMenuItem>
                )}
                {rangeScope && (
                  <DropdownMenuItem
                    ref={assignScopeItemRef('range')}
                    className={cn(
                      'tw-relative tw-ps-8',
                      'data-[highlighted]:tw-bg-accent data-[highlighted]:tw-text-accent-foreground',
                    )}
                    onSelect={() => openDialogFallback('range')}
                    data-selected={scope === 'range' ? 'true' : undefined}
                  >
                    {renderDialogLauncherCheck('range')}
                    {`${rangeScope.label}…`}
                  </DropdownMenuItem>
                )}
                {/* Navigate footer: a "Navigate" DropdownMenuLabel headline above a BCV
                    styled as a full-width ghost menu-item-looking button showing the
                    current reference. Only rendered when the caller wires up
                    `onCurrentScrRefChange`, since the footer's whole purpose is to
                    change the current ref. The BCV's own Popover portals inside
                    `DropdownMenuContent` thanks to the enclosing
                    `PopoverPortalContainerProvider`, and the row is wrapped in a
                    DropdownMenuItem so arrow-key navigation can reach it alongside the
                    other menu entries (see onSelect / pointer-down guard below). */}
                {onCurrentScrRefChange && (
                  <>
                    <DropdownMenuSeparator />
                    {/* Match cmdk's `[cmdk-group-heading]` styling used elsewhere in
                        the app (see `CommandGroup`): xs muted-foreground medium-weight
                        text with compact padding. Applied via className override on
                        DropdownMenuLabel so we still get its semantic role while
                        visually aligning with in-app command-palette section headings. */}
                    <DropdownMenuLabel className="tw-px-2 tw-py-1.5 tw-text-xs tw-font-medium tw-text-muted-foreground">
                      {navigateText}
                    </DropdownMenuLabel>
                    <DropdownMenuItem
                      ref={navMenuItemRef}
                      // `tw-p-0` so the nested BCV button can fill the row — the inner
                      // wrapper keeps the original `tw-px-1 tw-pb-1` spacing. The default
                      // `focus:tw-bg-accent` from DropdownMenuItem is kept so arrow-key
                      // navigation lights the row the same way as the other entries; the
                      // BCV ghost button's hover uses the same accent color so a
                      // simultaneous pointer hover still renders as a single highlight.
                      className="tw-p-0"
                      onSelect={(event) => {
                        // Preserve the open dropdown menu: activating this row should
                        // open the BCV popover, not dismiss the outer menu the way a
                        // normal menu item would.
                        event.preventDefault();
                        // Radix fires onSelect for both mouse pointerdown and keyboard
                        // Enter/Space. For a mouse click on the BCV button the button's
                        // own onClick already opened the popover; re-invoking click()
                        // here would toggle it back closed. The capture-phase handler
                        // below flags pointer activations so we can skip re-entry in
                        // that case; keyboard activations fall through and trigger the
                        // BCV via its trigger button.
                        if (navBcvPointerActivatedRef.current) {
                          navBcvPointerActivatedRef.current = false;
                          return;
                        }
                        // When the BCV popover is already open, Space / Enter on the
                        // menu item (or on its descendant trigger button, since React
                        // synthetic events bubble through the virtual tree to the
                        // DropdownMenuItem) would otherwise re-click the trigger and
                        // toggle the popover shut. Treat the activation as a no-op in
                        // that state — the picker is already visible.
                        if (isNavBcvOpenRef.current) return;
                        navBcvWrapperRef.current?.querySelector('button')?.click();
                      }}
                    >
                      <div
                        ref={navBcvWrapperRef}
                        className="tw-w-full tw-px-1 tw-pb-1"
                        onPointerDownCapture={(e) => {
                          // Pointer activations that land inside the BCV button are
                          // handled by the button's own onClick; remember that so the
                          // subsequent DropdownMenuItem onSelect skips the programmatic
                          // re-click. Padding-only clicks fall through to onSelect so
                          // the row still opens BCV when the user clicks near the edge.
                          const target = e.target instanceof HTMLElement ? e.target : undefined;
                          if (!target?.closest('button')) return;
                          navBcvPointerActivatedRef.current = true;
                          // Guarantee the flag doesn't outlive this gesture: click /
                          // onSelect fire synchronously in the same frame as the
                          // pointer gesture, so onSelect still sees the true value;
                          // if the user cancels the click (drag-away), the RAF reset
                          // keeps a later keyboard Enter from being wrongly skipped.
                          requestAnimationFrame(() => {
                            navBcvPointerActivatedRef.current = false;
                          });
                        }}
                      >
                        <BookChapterControl
                          id="scope-navigate"
                          scrRef={currentScrRef ?? defaultScrRef}
                          handleSubmit={onCurrentScrRefChange}
                          localizedBookNames={localizedBookNames}
                          localizedStrings={bookChapterControlLocalizedStrings}
                          getEndVerse={getEndVerse}
                          triggerVariant="ghost"
                          onOpenChange={(open) => {
                            isNavBcvOpenRef.current = open;
                          }}
                          onCloseAutoFocus={(event) => {
                            // By default Radix Popover restores focus to the BCV trigger
                            // button — which lives inside this DropdownMenuItem. The outer
                            // DropdownMenu only routes arrow-key navigation to focused
                            // DropdownMenuItems, so leaving focus on the nested button
                            // dead-ends keyboard navigation (arrow keys would instead
                            // render the button's focus ring). Intercept the restore and
                            // pull focus up to the menu item so the menu's roving focus
                            // picks up from there.
                            event.preventDefault();
                            navMenuItemRef.current?.focus();
                          }}
                          // Modal so the picker gets its own FocusScope: opening BCV
                          // from inside the modal DropdownMenu would otherwise collide
                          // with the dropdown's focus trap whenever BCV's internal
                          // view transitions (books → chapters → verses) cause a focus
                          // blip, and the dropdown would yank focus out mid-transition
                          // causing the popover to close before the user can select
                          // a chapter.
                          modal
                          // Override BCV's default compact trigger into a full-width
                          // left-aligned row that looks at home inside a menu list, and
                          // drop the button's `tw-font-medium` so the reference reads at
                          // normal weight alongside the other menu items. tailwind-merge's
                          // last-wins conflict resolution picks these over BCV's defaults.
                          className="tw-w-full tw-min-w-0 tw-max-w-none tw-justify-between tw-px-2 tw-font-normal"
                          triggerContent={
                            <>
                              <span className="tw-min-w-0 tw-flex-1 tw-truncate tw-text-start">
                                {formatScrRef(currentScrRef ?? defaultScrRef, 'id')}
                              </span>
                              <ChevronDown className="tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" />
                            </>
                          }
                        />
                      </div>
                    </DropdownMenuItem>
                  </>
                )}
              </PopoverPortalContainerProvider>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <RadioGroup
            value={scope}
            onValueChange={handleScopeChange}
            className="tw-flex tw-flex-col tw-space-y-1"
          >
            {displayedScopes.map(({ value, label, scrRefSuffix, id: scopeId }) => (
              <div key={scopeId} className="tw-flex tw-items-center">
                <RadioGroupItem className="tw-me-2" value={value} id={scopeId} />
                <Label htmlFor={scopeId}>{renderScopeLabel(label, scrRefSuffix)}</Label>
              </div>
            ))}
          </RadioGroup>
        )}
      </div>

      {/* In the radio variant, render the picker inline below the scope chooser. In the dropdown
          variant, the picker lives inside a modal dialog (see the Dialog blocks below). */}
      {variant === 'radio' && scope === 'selectedBooks' && (
        <div className="tw-grid tw-gap-2">
          <Label>{selectBooksText}</Label>
          {bookSelectorBlock}
        </div>
      )}

      {variant === 'radio' && scope === 'range' && rangeBlock}

      {/* Dropdown variant: selectedBooks and range entries always open in a modal dialog
          (no flyout submenu path). `tw-pe-8` on the header reserves space for the
          absolute-positioned close button so it can't overlap a long title. */}
      {variant === 'dropdown' && selectedBooksScope && (
        <Dialog open={dialogSub === 'selectedBooks'} onOpenChange={handleDialogOpenChange}>
          <DialogContent
            ref={setBooksDialogEl}
            onCloseAutoFocus={handleDialogCloseAutoFocus}
            // Defense-in-depth for Escape: Radix's DismissableLayer stack already
            // routes ESC to the topmost open layer (the inner BookSelector popover
            // when it's open), so the dialog's own dismiss normally doesn't fire.
            // But if an inner popover is ever open simultaneously, make sure ESC
            // doesn't also dismiss the dialog — search the subtree for a
            // `data-state="open"` descendant (Radix tags every open popover content
            // with it) and preventDefault if one exists. `querySelector` only
            // returns descendants, so the dialog itself can't match.
            onEscapeKeyDown={(event) => {
              if (booksDialogEl?.querySelector('[data-state="open"]')) {
                event.preventDefault();
              }
            }}
          >
            <PopoverPortalContainerProvider container={booksDialogEl}>
              <DialogHeader className="tw-pe-8">
                <DialogTitle>{chooseBooksText}</DialogTitle>
              </DialogHeader>
              {bookSelectorBlock}
              <DialogFooter>
                <Button variant="outline" onClick={() => handleDialogOpenChange(false)}>
                  {cancelText}
                </Button>
                <Button onClick={commitDialog}>{okText}</Button>
              </DialogFooter>
            </PopoverPortalContainerProvider>
          </DialogContent>
        </Dialog>
      )}
      {variant === 'dropdown' && rangeScope && (
        <Dialog open={dialogSub === 'range'} onOpenChange={handleDialogOpenChange}>
          <DialogContent
            ref={setRangeDialogEl}
            onCloseAutoFocus={handleDialogCloseAutoFocus}
            // See the books dialog — same rationale. When a range BCV picker is open,
            // Escape must dismiss only the picker, not the whole dialog.
            onEscapeKeyDown={(event) => {
              if (rangeDialogEl?.querySelector('[data-state="open"]')) {
                event.preventDefault();
              }
            }}
          >
            <PopoverPortalContainerProvider container={rangeDialogEl}>
              <DialogHeader className="tw-pe-8">
                <DialogTitle>{selectRangeText}</DialogTitle>
              </DialogHeader>
              {rangeBlock}
              <DialogFooter>
                <Button variant="outline" onClick={() => handleDialogOpenChange(false)}>
                  {cancelText}
                </Button>
                <Button ref={rangeOkButtonRef} onClick={commitDialog}>
                  {okText}
                </Button>
              </DialogFooter>
            </PopoverPortalContainerProvider>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default ScopeSelector;
