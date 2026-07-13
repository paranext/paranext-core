// Unstable API surface for platform-bible-react.
//
// Everything exported here is importable from `platform-bible-react/experimental`
// but carries NO stability guarantee — symbols may change shape, move, or
// disappear at any time without a deprecation cycle. Extensions may use
// it, but should accept the maintenance burden of breaking changes.
//
// Stable exports live in `./index.ts`. The two entry points are maintained
// as separate, independent API surfaces with different support levels.

import './index.css';

// ManageBooksDialog moved to extensions/src/platform-scripture/src/manage-books-dialog/ (FN-009).
// The unified Paratext-specific dialog is no longer part of the platform-bible-react surface.
export {
  default as ProjectSelector,
  type ProjectSelectorProject,
  type ProjectSelectorOpenTab,
  type ProjectSelectorProjectPair,
  type ProjectSelectorLocalizedStrings,
} from './components/advanced/project-selector/project-selector.component';
export {
  default as ResourcePickerDialog,
  type ResourcePickerDialogProps,
  type ResourcePickerDialogLocalizedStrings,
  RESOURCE_PICKER_DIALOG_STRING_KEYS,
} from './components/advanced/resource-picker-dialog/resource-picker-dialog.component';
export type { ScopeSelectorVariant } from './components/advanced/scope-selector/scope-selector.component';
export { default as SourceLanguageIndexedList } from './components/advanced/source-language-indexed-list/source-language-indexed-list.component';
export type {
  IndexedListItem,
  SourceLanguageIndexedListProps,
  SemanticDomain,
  SourceLanguageIndexedListLocalizedStrings,
} from './components/advanced/source-language-indexed-list/source-language-indexed-list.types';
export { SOURCE_LANGUAGE_INDEXED_LIST_STRING_KEYS } from './components/advanced/source-language-indexed-list/source-language-indexed-list.types';
export {
  default as LinkedScrRefButton,
  type LinkedScrRefButtonProps,
} from './components/basics/linked-scr-ref-button.component';
export type { ScopeWithRange } from './components/utils/scripture.util';
export { Z_INDEX_TOOLTIP } from './components/z-index';
// The books-present-aware scripture navigation math (get*Ref, ScriptureBounds) lives in
// `platform-bible-utils/experimental` (it is pure scripture math, alongside the sibling `offset*`
// helpers); import it from there. `useQuickNavButtons` (the React hook that wraps it) stays in
// `./components/advanced/book-chapter-control/book-chapter-control.navigation`.
export { ALL_BOOK_IDS } from './components/shared/book.utils';
export { readDirection, persistDirection, type Direction } from './utils/dir-helper.util';
export {
  default as NavigationHistoryButtons,
  NAVIGATION_HISTORY_BUTTONS_STRING_KEYS,
  type NavigationHistoryButtonsProps,
  type NavigationHistoryButtonsLocalizedStrings,
  type NavigationHistoryItem,
} from './components/advanced/navigation-history-buttons/navigation-history-buttons.component';
