import { BookSelector } from '@/components/advanced/scope-selector/book-selector.component';
import { Label } from '@/components/shadcn-ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/shadcn-ui/radio-group';
import { Scope } from '@/components/utils/scripture.util';
import { LocalizedStringValue } from 'platform-bible-utils';

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
}

/**
 * A component that allows users to select the scope of their search or operation. Available scopes
 * are defined in the Scope type. When 'selectedBooks' is chosen as the scope, a BookSelector
 * component is displayed to allow users to choose specific books.
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

  const SCOPE_OPTIONS: Array<{ value: Scope; label: string; id: string }> = [
    { value: 'selectedText', label: selectedTextText, id: 'scope-selected-text' },
    { value: 'verse', label: currentVerseText, id: 'scope-verse' },
    { value: 'chapter', label: currentChapterText, id: 'scope-chapter' },
    { value: 'book', label: currentBookText, id: 'scope-book' },
    { value: 'selectedBooks', label: chooseBooksText, id: 'scope-selected' },
  ];

  const displayedScopes = availableScopes
    ? SCOPE_OPTIONS.filter((option) => availableScopes.includes(option.value))
    : SCOPE_OPTIONS;

  return (
    <div id={id} className="tw-grid tw-gap-4">
      <div className="tw-grid tw-gap-2">
        <Label>{scopeText}</Label>
        <RadioGroup
          value={scope}
          onValueChange={onScopeChange}
          className="tw-flex tw-flex-col tw-space-y-1"
        >
          {displayedScopes.map(({ value, label, id: scopeId }) => (
            <div key={scopeId} className="tw-flex tw-items-center">
              <RadioGroupItem className="tw-me-2" value={value} id={scopeId} />
              <Label htmlFor={scopeId}>{label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {scope === 'selectedBooks' && (
        <div className="tw-grid tw-gap-2">
          <Label>{selectBooksText}</Label>
          <BookSelector
            availableBookInfo={availableBookInfo}
            selectedBookIds={selectedBookIds}
            onChangeSelectedBookIds={onSelectedBookIdsChange}
            localizedStrings={localizedStrings}
            localizedBookNames={localizedBookNames}
          />
        </div>
      )}
    </div>
  );
}

export default ScopeSelector;
