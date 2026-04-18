import { BookSelector } from '@/components/advanced/scope-selector/book-selector.component';
import { BookChapterControl } from '@/components/advanced/book-chapter-control/book-chapter-control.component';
import { BookChapterControlLocalizedStrings } from '@/components/advanced/book-chapter-control/book-chapter-control.types';
import { Button } from '@/components/shadcn-ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';
import { Label } from '@/components/shadcn-ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/shadcn-ui/radio-group';
import { Scope } from '@/components/utils/scripture.util';
import { cn } from '@/utils/shadcn-ui.util';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { Circle, ChevronDown } from 'lucide-react';
import { defaultScrRef, formatScrRefRange, LocalizedStringValue } from 'platform-bible-utils';
import { KeyboardEvent, PointerEvent, useCallback, useState } from 'react';

/**
 * Object containing all keys used for localization in this component. If you're using this
 * component in an extension, you can pass it into the useLocalizedStrings hook to easily obtain the
 * localized strings and pass them into the localizedStrings prop of this component
 */
export const SCOPE_SELECTOR_STRING_KEYS = Object.freeze([
  '%webView_scope_selector_selected_text%',
  '%webView_scope_selector_current_verse%',
  '%webView_scope_selector_current_chapter%',
  '%webView_scope_selector_current_book%',
  '%webView_scope_selector_choose_books%',
  '%webView_scope_selector_scope%',
  '%webView_scope_selector_select_books%',
  '%webView_scope_selector_range%',
  '%webView_scope_selector_range_start%',
  '%webView_scope_selector_range_end%',
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
   * Optional localized strings passed to the range BCV controls. When omitted, the BCV controls
   * will fall back to their internal defaults.
   */
  bookChapterControlLocalizedStrings?: BookChapterControlLocalizedStrings;
  /**
   * Optional callback returning the number of verses for a given book and chapter. When provided,
   * the range BCV controls enable verse selection. See `BookChapterControlProps.getEndVerse`.
   */
  getEndVerse?: (bookId: string, chapterNum: number) => number;
}

/**
 * Returns the tabbable descendants of a container, in document order. Used to implement manual Tab
 * / Shift+Tab focus cycling inside a dropdown submenu where Radix otherwise closes the menu.
 */
function getTabbableElements(container: HTMLElement): HTMLElement[] {
  const candidates = container.querySelectorAll<HTMLElement>(
    'a[href], area[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
  );
  return Array.from(candidates).filter(
    (el) =>
      !el.hasAttribute('disabled') &&
      el.tabIndex !== -1 &&
      // `offsetParent` returns null for elements that are hidden (display:none) or detached — the
      // standard browser hook for "not currently rendered / focusable"; there is no undefined form.
      // eslint-disable-next-line no-null/no-null
      el.offsetParent !== null,
  );
}

/**
 * Returns the next focus index when cycling Tab / Shift+Tab through a bounded list, wrapping around
 * at both ends. Extracted so the focus handler stays free of nested ternaries.
 */
function computeNextFocusIndex(currentIndex: number, lastIndex: number, reverse: boolean): number {
  if (reverse) {
    if (currentIndex <= 0) return lastIndex;
    return currentIndex - 1;
  }
  if (currentIndex === -1 || currentIndex === lastIndex) return 0;
  return currentIndex + 1;
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
  bookChapterControlLocalizedStrings,
  getEndVerse,
}: ScopeSelectorProps) {
  const selectedTextText = localizeString(
    localizedStrings,
    '%webView_scope_selector_selected_text%',
  );
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
  const rangeStartText = localizeString(localizedStrings, '%webView_scope_selector_range_start%');
  const rangeEndText = localizeString(localizedStrings, '%webView_scope_selector_range_end%');

  const SCOPE_OPTIONS: Array<{ value: Scope; label: string; id: string }> = [
    { value: 'selectedText', label: selectedTextText, id: 'scope-selected-text' },
    { value: 'verse', label: currentVerseText, id: 'scope-verse' },
    { value: 'chapter', label: currentChapterText, id: 'scope-chapter' },
    { value: 'book', label: currentBookText, id: 'scope-book' },
    { value: 'selectedBooks', label: chooseBooksText, id: 'scope-selected' },
    { value: 'range', label: rangeText, id: 'scope-range' },
  ];

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

  // Whenever the user submits a new start reference, mirror it onto the end reference too. The
  // user can then narrow the end independently; the next start change will re-sync both.
  const handleRangeStartChange = useCallback(
    (newStart: SerializedVerseRef) => {
      onRangeStartChange?.(newStart);
      onRangeEndChange?.(newStart);
    },
    [onRangeStartChange, onRangeEndChange],
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

  const currentScopeLabel =
    displayedScopes.find((option) => option.value === scope)?.label ?? scope;

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
    return currentScopeLabel;
  };

  const simpleScopes = displayedScopes.filter(
    (option) => option.value !== 'selectedBooks' && option.value !== 'range',
  );
  const selectedBooksScope = displayedScopes.find((option) => option.value === 'selectedBooks');
  const rangeScope = displayedScopes.find((option) => option.value === 'range');

  const bookSelectorBlock = (
    <BookSelector
      availableBookInfo={availableBookInfo}
      selectedBookIds={selectedBookIds}
      onChangeSelectedBookIds={onSelectedBookIdsChange}
      localizedStrings={localizedStrings}
      localizedBookNames={localizedBookNames}
    />
  );

  const rangeBlock = (
    <div className="tw-flex tw-flex-wrap tw-items-end tw-gap-4">
      <div className="tw-grid tw-gap-2">
        <Label htmlFor="scope-range-start">{rangeStartText}</Label>
        <BookChapterControl
          id="scope-range-start"
          scrRef={resolvedRangeStart}
          handleSubmit={handleRangeStartChange}
          localizedBookNames={localizedBookNames}
          localizedStrings={bookChapterControlLocalizedStrings}
          getEndVerse={getEndVerse}
        />
      </div>
      <div className="tw-grid tw-gap-2">
        <Label htmlFor="scope-range-end">{rangeEndText}</Label>
        <BookChapterControl
          id="scope-range-end"
          scrRef={resolvedRangeEnd}
          handleSubmit={onRangeEndChange ?? noopScrRefChange}
          localizedBookNames={localizedBookNames}
          localizedStrings={bookChapterControlLocalizedStrings}
          getEndVerse={getEndVerse}
          disableReferencesUpTo={resolvedRangeStart}
        />
      </div>
    </div>
  );

  // Keep Tab / Shift+Tab inside the open submenu. Radix's DropdownMenu closes on Tab by design,
  // which both drops the user out of the menu and (via focus-loss) closes any BCV popover the
  // user had opened. preventDefault stops Radix's handler via composeEventHandlers'
  // defaultPrevented check; then we either keep focus pinned inside a portal'd child popover or
  // cycle focus through the submenu's own controls.
  const handleSubContentKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab') return;

    event.preventDefault();

    const subContent = event.currentTarget;
    const active =
      document.activeElement instanceof HTMLElement ? document.activeElement : undefined;

    // If focus lives inside a descendant popover (portal'd outside the sub-content DOM subtree),
    // leave it alone — closing that popover on Tab is exactly the behavior we are avoiding.
    if (active && !subContent.contains(active)) return;

    const focusTargets = getTabbableElements(subContent);
    if (focusTargets.length === 0) return;

    const currentIndex = active ? focusTargets.indexOf(active) : -1;
    const lastIndex = focusTargets.length - 1;
    const nextIndex = computeNextFocusIndex(currentIndex, lastIndex, event.shiftKey);

    focusTargets[nextIndex]?.focus();
  }, []);

  const [openSub, setOpenSub] = useState<Scope | undefined>(undefined);

  // Click-driven open for the submenu. Radix's SubTrigger also fires onOpenChange on hover, but
  // we ignore open=true from onOpenChange (only honor close) — so explicit click / Enter / Space
  // handlers are the only way the submenu opens, matching the requested UX.
  const openSubmenu = useCallback(
    (targetScope: Scope) => {
      handleScopeChange(targetScope);
      setOpenSub(targetScope);
    },
    [handleScopeChange],
  );

  const handleSubTriggerKeyDown = useCallback(
    (targetScope: Scope) => (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openSubmenu(targetScope);
      }
    },
    [openSubmenu],
  );

  // Radix SubTrigger opens the submenu on `pointermove` (hover). preventDefault here blocks that
  // path while still allowing click / keyboard activation to reach our other handlers.
  const handleSubTriggerPointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const renderSubSelectionDot = (subScope: Scope) =>
    scope === subScope ? (
      <span className="tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2">
        <Circle className="tw-h-2 tw-w-2 tw-fill-current" />
      </span>
    ) : undefined;

  return (
    <div id={id} className="tw-grid tw-gap-4">
      <div className="tw-grid tw-gap-2">
        <Label>{scopeText}</Label>
        {variant === 'dropdown' ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="tw-w-full tw-justify-between tw-overflow-hidden tw-font-normal"
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
              className="tw-w-[var(--radix-dropdown-menu-trigger-width)] tw-min-w-[12rem]"
              align="start"
            >
              <DropdownMenuRadioGroup
                value={scope}
                onValueChange={(value) => {
                  const match = displayedScopes.find((option) => option.value === value);
                  if (match) handleScopeChange(match.value);
                }}
              >
                {simpleScopes.map(({ value, label, id: scopeId }) => (
                  <DropdownMenuRadioItem key={scopeId} value={value}>
                    {label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
              {(selectedBooksScope || rangeScope) && <DropdownMenuSeparator />}
              {selectedBooksScope && (
                <DropdownMenuSub
                  open={openSub === 'selectedBooks'}
                  onOpenChange={(open) => {
                    // Only honor the close direction. Ignoring open=true suppresses Radix's hover
                    // and arrow-right auto-open; the submenu opens solely through our explicit
                    // click / keyboard handlers on the trigger.
                    if (!open) setOpenSub(undefined);
                  }}
                >
                  <DropdownMenuSubTrigger
                    className={cn('tw-relative tw-ps-8')}
                    onClick={() => openSubmenu('selectedBooks')}
                    onKeyDown={handleSubTriggerKeyDown('selectedBooks')}
                    onPointerMove={handleSubTriggerPointerMove}
                    data-selected={scope === 'selectedBooks' ? 'true' : undefined}
                  >
                    {renderSubSelectionDot('selectedBooks')}
                    {selectedBooksScope.label}
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent
                    className="tw-p-2"
                    sideOffset={4}
                    onKeyDown={handleSubContentKeyDown}
                  >
                    <div className="tw-grid tw-gap-2">
                      <Label>{selectBooksText}</Label>
                      {bookSelectorBlock}
                    </div>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              )}
              {rangeScope && (
                <DropdownMenuSub
                  open={openSub === 'range'}
                  onOpenChange={(open) => {
                    if (!open) setOpenSub(undefined);
                  }}
                >
                  <DropdownMenuSubTrigger
                    className={cn('tw-relative tw-ps-8')}
                    onClick={() => openSubmenu('range')}
                    onKeyDown={handleSubTriggerKeyDown('range')}
                    onPointerMove={handleSubTriggerPointerMove}
                    data-selected={scope === 'range' ? 'true' : undefined}
                  >
                    {renderSubSelectionDot('range')}
                    {rangeScope.label}
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent
                    className="tw-p-2"
                    sideOffset={4}
                    onKeyDown={handleSubContentKeyDown}
                  >
                    {rangeBlock}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <RadioGroup
            value={scope}
            onValueChange={handleScopeChange}
            className="tw-flex tw-flex-col tw-space-y-1"
          >
            {displayedScopes.map(({ value, label, id: scopeId }) => (
              <div key={scopeId} className="tw-flex tw-items-center">
                <RadioGroupItem className="tw-me-2" value={value} id={scopeId} />
                <Label htmlFor={scopeId}>{label}</Label>
              </div>
            ))}
          </RadioGroup>
        )}
      </div>

      {/* In the radio variant, render the picker inline below the scope chooser. In the dropdown
          variant, the picker lives inside the flyout submenu. */}
      {variant === 'radio' && scope === 'selectedBooks' && (
        <div className="tw-grid tw-gap-2">
          <Label>{selectBooksText}</Label>
          {bookSelectorBlock}
        </div>
      )}

      {variant === 'radio' && scope === 'range' && rangeBlock}
    </div>
  );
}

export default ScopeSelector;
