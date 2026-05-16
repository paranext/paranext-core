/**
 * Localized strings for `ScriptureTextPickerProgressive`.
 *
 * Each key below carries a **meaning** comment describing *what the string is for* — not just
 * how it's translated. Translators and future devs should read the comment before changing the
 * English default. The English defaults serve as a reference implementation; they're applied
 * automatically when a key isn't provided in `localizedStrings`.
 *
 * Following the same pattern as `ResourcePickerDialog` and other components in this lib:
 *  1. Pass `SCRIPTURE_TEXT_PICKER_STRING_KEYS` to `useLocalizedStrings` (or your localization
 *     hook of choice).
 *  2. Forward the result as the component's `localizedStrings` prop.
 */
export const SCRIPTURE_TEXT_PICKER_STRING_KEYS = Object.freeze([
  '%scriptureTextPicker_search_placeholder%',
  '%scriptureTextPicker_group_included%',
  '%scriptureTextPicker_group_installed%',
  '%scriptureTextPicker_group_available%',
  '%scriptureTextPicker_group_maybeYouMeant%',
  '%scriptureTextPicker_empty_nothingIncluded%',
  '%scriptureTextPicker_empty_noMatches%',
  '%scriptureTextPicker_empty_noResults%',
  '%scriptureTextPicker_footer_browseAll%',
  '%scriptureTextPicker_footer_showOnlyIncluded%',
  '%scriptureTextPicker_footer_clearSearchHint%',
  '%scriptureTextPicker_listbox_label%',
  '%scriptureTextPicker_status_downloading%',
  '%scriptureTextPicker_status_installed%',
  '%scriptureTextPicker_status_available%',
  '%scriptureTextPicker_lock_short%',
  '%scriptureTextPicker_lock_tooltipTitle%',
  '%scriptureTextPicker_lock_tooltipBody%',
  '%scriptureTextPicker_chip_ariaLabel%',
  '%scriptureTextPicker_chip_tooltipHint%',
  '%scriptureTextPicker_row_remove%',
  '%scriptureTextPicker_row_remove_keyboardHint%',
] as const);

export type ScriptureTextPickerLocalizedStrings = {
  [k in (typeof SCRIPTURE_TEXT_PICKER_STRING_KEYS)[number]]?: string;
};

/**
 * English defaults. Each value is paired with a `// meaning:` comment that conveys *intent* —
 * meant to help translators and reviewers understand what's being communicated, not just
 * substitute the words.
 */
export const SCRIPTURE_TEXT_PICKER_DEFAULTS: Required<ScriptureTextPickerLocalizedStrings> = {
  // meaning: placeholder in the search input. Suggests both jobs the picker does — searching
  // already-included texts AND discovering more to add. Should remain short.
  '%scriptureTextPicker_search_placeholder%': 'Search scripture texts…',

  // meaning: group heading for texts already in the project. Plural-noun-as-label, low contrast.
  '%scriptureTextPicker_group_included%': 'Included',

  // meaning: group heading for texts on disk but not yet attached to this project. Click adds.
  // We say "On your computer" rather than the more technical "Installed" because what the
  // user cares about is that these are local and ready to go — no download needed.
  '%scriptureTextPicker_group_installed%': 'On your computer',

  // meaning: group heading for texts not yet on disk. Click starts a download and includes.
  '%scriptureTextPicker_group_available%': 'Available to download',

  // meaning: heading for "we relaxed your language filter because you got few hits" results.
  // Suggests the user *might* have wanted these. Should feel gentle/conversational, not technical.
  '%scriptureTextPicker_group_maybeYouMeant%': 'Maybe you meant',

  // meaning: shown in the included-only view when the project has zero included texts. Implies
  // the user should switch to Browse-all to add one.
  '%scriptureTextPicker_empty_nothingIncluded%': 'Nothing included yet',

  // meaning: shown in the all-view when search returns nothing matching.
  '%scriptureTextPicker_empty_noMatches%': 'No matches',

  // meaning: catch-all empty state when no items exist at all (rare). Distinct from no-matches.
  '%scriptureTextPicker_empty_noResults%': 'No results',

  // meaning: footer button label that expands the list to include Installed + Available items.
  // The `{count}` placeholder is substituted with the number of addable items currently in scope.
  '%scriptureTextPicker_footer_browseAll%': 'Browse all texts ({count})',

  // meaning: footer button label that collapses back to just Included items.
  '%scriptureTextPicker_footer_showOnlyIncluded%': 'Show only included',

  // meaning: tooltip on the footer button when it's disabled. Explains the disable reason:
  // an active search keeps the user in browse-all view, so the button can't toggle back.
  '%scriptureTextPicker_footer_clearSearchHint%': 'Clear search to return to included only',

  // meaning: accessible label for the listbox region. Heard by screen readers.
  '%scriptureTextPicker_listbox_label%': 'Scripture texts',

  // meaning: accessible label for the spinner icon on an item that's currently downloading.
  '%scriptureTextPicker_status_downloading%': 'Downloading',

  // meaning: accessible label for the "this is on the user's computer, click to add it to
  // the project and start displaying it" status icon.
  '%scriptureTextPicker_status_installed%': 'On your computer — click to include and display',

  // meaning: accessible label for the "this is available, click to download and include + display" icon.
  '%scriptureTextPicker_status_available%':
    'Available to download — click to download, include, and display',

  // meaning: very short accessible label for the lock icon — used when no tooltip is visible.
  '%scriptureTextPicker_lock_short%': 'Cannot be removed from this project',

  // meaning: tooltip title (bold first line) on the lock icon.
  '%scriptureTextPicker_lock_tooltipTitle%': 'Locked in project',

  // meaning: tooltip body (second line) on the lock icon — explains *why* it's locked.
  '%scriptureTextPicker_lock_tooltipBody%': 'This text is required and cannot be removed',

  // meaning: accessible label for the clickable language chip on each row. `{language}` is
  // substituted with the language name. Pressing the chip filters the list by that language.
  '%scriptureTextPicker_chip_ariaLabel%': 'Filter by {language}',

  // meaning: small hint at the bottom of the language-chip hover tooltip telling users they
  // can click the chip to filter. Tertiary text.
  '%scriptureTextPicker_chip_tooltipHint%': 'Click to filter',

  // meaning: accessible label for the X (remove) button on a non-locked included row.
  '%scriptureTextPicker_row_remove%': 'Remove from project',

  // meaning: tooltip text on the same X button mentioning the keyboard shortcut. Mouse users
  // see this on hover; keyboard users learn that pressing Delete on the focused row removes it.
  '%scriptureTextPicker_row_remove_keyboardHint%': 'Remove from project (Delete)',
};

export function localizeScriptureTextPicker(
  strings: ScriptureTextPickerLocalizedStrings | undefined,
  key: (typeof SCRIPTURE_TEXT_PICKER_STRING_KEYS)[number],
): string {
  return strings?.[key] ?? SCRIPTURE_TEXT_PICKER_DEFAULTS[key];
}
