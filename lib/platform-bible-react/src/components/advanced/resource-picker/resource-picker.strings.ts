/**
 * Localized strings shared by {@link ResourcePicker} and {@link ResourcePickerCompact}.
 *
 * Each key carries a `// meaning:` comment describing _what the string is for_ — not just how it's
 * translated. Translators and future devs should read the comment before changing the English
 * default. The English defaults serve as a reference implementation; they're applied automatically
 * when a key isn't provided in `localizedStrings`.
 *
 * Usage:
 *
 * 1. Pass `RESOURCE_PICKER_STRING_KEYS` to `useLocalizedStrings` (or your localization hook).
 * 2. Forward the result as the component's `localizedStrings` prop.
 */
export const RESOURCE_PICKER_STRING_KEYS = Object.freeze([
  '%resourcePicker_search_placeholder%',
  '%resourcePicker_group_included%',
  '%resourcePicker_group_installed%',
  '%resourcePicker_group_available%',
  '%resourcePicker_group_maybeYouMeant%',
  '%resourcePicker_empty_nothingIncluded%',
  '%resourcePicker_empty_noMatches%',
  '%resourcePicker_empty_noResults%',
  '%resourcePicker_listbox_label%',
  '%resourcePicker_status_downloading%',
  '%resourcePicker_status_installed%',
  '%resourcePicker_status_available%',
  '%resourcePicker_lock_short%',
  '%resourcePicker_lock_tooltipTitle%',
  '%resourcePicker_lock_tooltipBody%',
  '%resourcePicker_chip_ariaLabel%',
  '%resourcePicker_chip_tooltipHint%',
  '%resourcePicker_row_remove%',
  '%resourcePicker_row_remove_keyboardHint%',
  '%resourcePicker_compact_browseLibrary%',
  '%resourcePicker_compact_empty%',
] as const);

export type ResourcePickerLocalizedStrings = {
  [k in (typeof RESOURCE_PICKER_STRING_KEYS)[number]]?: string;
};

/**
 * English defaults. Each value is paired with a `// meaning:` comment that conveys _intent_ — meant
 * to help translators and reviewers understand what's being communicated, not just substitute the
 * words.
 */
export const RESOURCE_PICKER_DEFAULTS: Required<ResourcePickerLocalizedStrings> = {
  // meaning: placeholder in the search input. Suggests both jobs the picker does — searching
  // already-included resources AND discovering more to add. Should remain short.
  '%resourcePicker_search_placeholder%': 'Search resources…',

  // meaning: group heading for resources already in the project. Plural-noun-as-label, low contrast.
  '%resourcePicker_group_included%': 'Included',

  // meaning: group heading for resources on disk but not yet attached to this project. Click adds.
  // We say "On your computer" rather than the more technical "Installed" because what the user
  // cares about is that these are local and ready to go — no download needed.
  '%resourcePicker_group_installed%': 'On your computer',

  // meaning: group heading for resources not yet on disk. Click starts a download and includes.
  '%resourcePicker_group_available%': 'Available to download',

  // meaning: heading for "we relaxed your language filter because you got few hits" results.
  // Suggests the user *might* have wanted these. Should feel gentle/conversational, not technical.
  '%resourcePicker_group_maybeYouMeant%': 'Maybe you meant',

  // meaning: shown in the included-only context when the project has zero included resources.
  // In the compact picker it's a hint that the user should use Browse library to add one.
  '%resourcePicker_empty_nothingIncluded%': 'Nothing included yet',

  // meaning: shown when search returns nothing matching.
  '%resourcePicker_empty_noMatches%': 'No matches',

  // meaning: catch-all empty state when no items exist at all (rare). Distinct from no-matches.
  '%resourcePicker_empty_noResults%': 'No results',

  // meaning: accessible label for the listbox region. Heard by screen readers.
  '%resourcePicker_listbox_label%': 'Resources',

  // meaning: accessible label for the spinner icon on an item that's currently downloading.
  '%resourcePicker_status_downloading%': 'Downloading',

  // meaning: accessible label for the "this is on the user's computer, click to add it to the
  // project and start displaying it" status icon.
  '%resourcePicker_status_installed%': 'On your computer — click to include and display',

  // meaning: accessible label for the "this is available, click to download, include + display" icon.
  '%resourcePicker_status_available%':
    'Available to download — click to download, include, and display',

  // meaning: very short accessible label for the lock icon — used when no tooltip is visible.
  '%resourcePicker_lock_short%': 'Cannot be removed from this project',

  // meaning: tooltip title (bold first line) on the lock icon.
  '%resourcePicker_lock_tooltipTitle%': 'Locked in project',

  // meaning: tooltip body (second line) on the lock icon — explains *why* it's locked.
  '%resourcePicker_lock_tooltipBody%': 'This resource is required and cannot be removed',

  // meaning: accessible label for the clickable language chip on each row. `{language}` is
  // substituted with the language name. Pressing the chip filters the list by that language.
  '%resourcePicker_chip_ariaLabel%': 'Filter by {language}',

  // meaning: small hint at the bottom of the language-chip hover tooltip telling users they
  // can click the chip to filter. Tertiary text.
  '%resourcePicker_chip_tooltipHint%': 'Click to filter',

  // meaning: accessible label for the X (remove) button on a non-locked included row.
  '%resourcePicker_row_remove%': 'Remove from project',

  // meaning: tooltip text on the same X button mentioning the keyboard shortcut. Mouse users
  // see this on hover; keyboard users learn that pressing Delete on the focused row removes it.
  '%resourcePicker_row_remove_keyboardHint%': 'Remove from project (Delete)',

  // meaning: default footer-button label in ResourcePickerCompact that opens the full library
  // (typically a dialog rendering the full ResourcePicker). Consumers can override per resource
  // type — e.g. "Browse all scripture texts" or "Browse all commentaries" — by passing the
  // already-localized `browseLabel` prop.
  '%resourcePicker_compact_browseLibrary%': 'Browse library',

  // meaning: empty state in the compact picker when the project has no included resources at all.
  // Encourages the user to click the Browse library button below.
  '%resourcePicker_compact_empty%': 'No resources in this project yet',
};

export function localizeResourcePicker(
  strings: ResourcePickerLocalizedStrings | undefined,
  key: (typeof RESOURCE_PICKER_STRING_KEYS)[number],
): string {
  return strings?.[key] ?? RESOURCE_PICKER_DEFAULTS[key];
}
