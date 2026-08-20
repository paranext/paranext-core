import { LocalizedStringValue } from 'platform-bible-utils';

/**
 * Object containing all keys used for localization in the SelectBooks component. If you're using
 * this component in an extension, you can pass it into the useLocalizedStrings hook to easily
 * obtain the localized strings and pass them into the localizedStrings prop of this component
 */
export const SELECT_BOOKS_STRING_KEYS = Object.freeze([
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

/** Type definition for the localized strings used in the SelectBooks component */
export type SelectBooksLocalizedStrings = {
  [selectBooksKey in (typeof SELECT_BOOKS_STRING_KEYS)[number]]?: LocalizedStringValue;
};
