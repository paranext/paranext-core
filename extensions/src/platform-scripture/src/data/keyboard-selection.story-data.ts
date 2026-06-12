import type { KeyboardSelectionKeyboardOption } from '../keyboard-selection.component';

// Shared mock data for keyboard-selection.stories.tsx. Derived from the keyboard-switching
// golden masters (gm-004 dropdown population, gm-005 RTL dropdown content, gm-008 missing
// persisted keyboard) — do not invent values that have no golden-master counterpart.

/**
 * OS keyboard list captured in gm-004 (`expected-output.json`): sentinel + 3 OS keyboards in
 * OS-reported order.
 */
export const STANDARD_AVAILABLE_KEYBOARDS: readonly KeyboardSelectionKeyboardOption[] = [
  { id: 'en-US-qwerty', name: 'English (US)' },
  { id: 'ar-SA', name: 'Arabic (Saudi Arabia)' },
  { id: 'he-IL', name: 'Hebrew' },
];

/**
 * OS keyboard list for the RTL/bidi scenario. IDs and the Windows-format Latin display strings come
 * from gm-005 (`observedKeyboardNames`); the two native-script names exercise FN-012's "at least
 * one RTL-script keyboard name" requirement (non-Windows OS keyboard layers report native-script
 * names).
 */
export const RTL_AVAILABLE_KEYBOARDS: readonly KeyboardSelectionKeyboardOption[] = [
  { id: 'en-US', name: 'US - en-US' },
  { id: 'ja-JP', name: 'Microsoft IME - ja-JP' },
  { id: 'ar-JO', name: 'Arabic (101) - ar-JO' },
  { id: 'ar-SA-native', name: 'العربية (المملكة العربية السعودية)', isRtlScript: true },
  { id: 'he-IL-native', name: 'עברית', isRtlScript: true },
  { id: 'es-419', name: 'Latin American - es-419' },
];

/**
 * ProjectInterfaces for a standard project (scripture + comments — both dropdowns rendered and
 * enabled). Values mirror real PT10 projectInterface identifiers; the keyboard-selection predicates
 * match on the `scripture` / `comments` substrings.
 */
export const STANDARD_PROJECT_INTERFACES: readonly string[] = [
  'platformScripture.USFM_BookChapterVerse',
  'legacyCommentManager.comments',
];

/** ProjectInterfaces for a resource (scripture, no comments — single "Keyboard:" dropdown). */
export const RESOURCE_PROJECT_INTERFACES: readonly string[] = [
  'platformScripture.USFM_BookChapterVerse',
];

/**
 * ProjectInterfaces for a note-type project (comments, no scripture — vernacular dropdown rendered
 * but disabled). Dormant in PT10 today; exercised via Storybook fixture per the strategic plan.
 */
export const NOTE_TYPE_PROJECT_INTERFACES: readonly string[] = ['legacyCommentManager.comments'];

/**
 * Persisted-but-uninstalled keyboard ID from gm-008: the project had `tha-Thai` persisted, the user
 * uninstalled it, and the dialog must fall back to the sentinel.
 */
export const MISSING_PERSISTED_KEYBOARD_ID = 'tha-Thai';
