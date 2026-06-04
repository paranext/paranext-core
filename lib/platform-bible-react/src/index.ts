import './index.css';

// Components and Types
export { default as BookChapterControl } from './components/advanced/book-chapter-control/book-chapter-control.component';
export type { BookChapterControlProps } from './components/advanced/book-chapter-control/book-chapter-control.types';
export {
  BOOK_CHAPTER_CONTROL_STRING_KEYS,
  type BookChapterControlLocalizedStrings,
} from './components/advanced/book-chapter-control/book-chapter-control.types';
export { default as BookSelector } from './components/advanced/book-selector.component';
export {
  BOOK_SELECTOR_STRING_KEYS,
  BookSelectionMode,
} from './components/advanced/book-selector.component';
export {
  default as RecentSearches,
  useRecentSearches,
} from './components/advanced/recent-searches.component';
export type { RecentSearchesProps } from './components/advanced/recent-searches.component';
export type { BookSelectorLocalizedStrings } from './components/advanced/book-selector.component';
export {
  default as CommentEditor,
  type CommentEditorProps,
} from './components/advanced/comment-editor/comment-editor.component';
export {
  COMMENT_EDITOR_STRING_KEYS,
  type CommentEditorLocalizedStrings,
} from './components/advanced/comment-editor/comment-editor.types';
export type {
  CommentListProps,
  AddCommentToThreadOptions,
} from './components/advanced/comment-list/comment-list.types';
export { COMMENT_LIST_STRING_KEYS } from './components/advanced/comment-list/comment-list.types';
export { default as CommentList } from './components/advanced/comment-list/comment-list.component';
export { default as DataTable } from './components/advanced/data-table/data-table.component';
export type {
  ColumnDef,
  RowContents,
  SortDirection,
  TableContents,
} from './components/advanced/data-table/data-table.component';
// ManageBooksDialog moved to extensions/src/platform-scripture/src/manage-books-dialog/ (FN-009).
// The unified Paratext-specific dialog is no longer part of the platform-bible-react surface.
export {
  default as ProjectSelector,
  type ProjectSelectorProject,
  type ProjectSelectorOpenTab,
  type ProjectSelectorProjectPair,
  type ProjectSelectorLocalizedStrings,
} from './components/advanced/project-selector/project-selector.component';
export { default as MarkdownRenderer } from './components/advanced/extension-marketplace/markdown-renderer.component';
export {
  ErrorPopover,
  ERROR_POPOVER_STRING_KEYS,
} from './components/advanced/error-popover.component';
export type { ErrorPopoverLocalizedStrings } from './components/advanced/error-popover.component';
export {
  default as FilterDropdown,
  DropdownMenuItemType,
  type DropdownItem,
  type DropdownGroup,
} from './components/advanced/extension-marketplace/filter-dropdown.component';
export { MoreInfo } from './components/advanced/extension-marketplace/more-info.component';
export type { VersionHistoryType } from './components/advanced/extension-marketplace/version-history.component';
export { default as Footer } from './components/advanced/extension-marketplace/footer.component';
export { default as Filter } from './components/advanced/filter.component';
export type {
  FootnoteItemProps,
  FootnoteLayout,
  FootnoteListProps,
} from './components/advanced/footnotes/footnotes.types';
export {
  default as FootnoteEditor,
  type FootnoteEditorProps,
} from './components/advanced/footnote-editor/footnote-editor.component';
export {
  FOOTNOTE_EDITOR_STRING_KEYS,
  type FootnoteEditorLocalizedStrings,
  type FootnoteCallerType,
} from './components/advanced/footnote-editor/footnote-editor.types';
export { default as FootnoteItem } from './components/advanced/footnotes/footnote-item.component';
export { default as FootnoteList } from './components/advanced/footnotes/footnote-list.component';
export {
  default as Inventory,
  type InventoryItem,
  type InventorySummaryItem,
} from './components/advanced/inventory/inventory.component';
export { INVENTORY_STRING_KEYS } from './components/advanced/inventory/inventory.component';
export type { InventoryLocalizedStrings } from './components/advanced/inventory/inventory.component';
export {
  getLinesFromUSFM,
  getNumberFromUSFM,
  getBookIdFromUSFM,
  getStatusForItem,
} from './components/advanced/inventory/inventory-utils';
export type {
  InventoryTableData,
  InventoryItemOccurrence,
} from './components/advanced/inventory/inventory-utils';
export {
  inventoryItemColumn,
  inventoryCountColumn,
  inventoryStatusColumn,
  getInventoryHeader,
} from './components/advanced/inventory/inventory-columns';
export { MarkerMenu, MARKER_MENU_STRING_KEYS } from './components/advanced/marker-menu.component';
export type {
  MarkerMenuProps,
  MarkerMenuItem,
  MarkerMenuLocalizedStrings,
} from './components/advanced/marker-menu.component';
export {
  default as MultiSelectComboBox,
  type MultiSelectComboBoxEntry,
} from './components/advanced/multi-select-combo-box.component';
export type { SelectMenuItemHandler } from './components/advanced/menus/platform-menubar.component';
export {
  default as ResourcePickerDialog,
  type ResourcePickerDialogProps,
  type ResourcePickerDialogLocalizedStrings,
  RESOURCE_PICKER_DIALOG_STRING_KEYS,
} from './components/advanced/resource-picker-dialog/resource-picker-dialog.component';
export {
  default as SettingsSidebar,
  type SettingsSidebarProps,
  type ProjectInfo,
  type SelectedSettingsSidebarItem,
} from './components/advanced/settings-components/settings-sidebar.component';
export { default as SettingsSidebarContentSearch } from './components/advanced/settings-components/settings-sidebar-content-search.component';
export { default as ScriptureResultsViewer } from './components/advanced/scripture-results-viewer/scripture-results-viewer.component';
export type {
  ResultsSet,
  ResultsSource,
  ScriptureItemDetail,
  ScriptureResultsViewerColumnInfo,
  ScriptureResultsViewerProps,
  ScriptureSrcItemDetail,
} from './components/advanced/scripture-results-viewer/scripture-results-viewer.component';
export { default as ScopeSelector } from './components/advanced/scope-selector/scope-selector.component';
export { SCOPE_SELECTOR_STRING_KEYS } from './components/advanced/scope-selector/scope-selector.component';
export type {
  ScopeSelectorLocalizedStrings,
  ScopeSelectorVariant,
} from './components/advanced/scope-selector/scope-selector.component';
export { SelectBooks } from './components/advanced/scope-selector/select-books.component';
export { SelectBooksPicker } from './components/advanced/scope-selector/select-books-picker.component';
export {
  SELECT_BOOKS_STRING_KEYS,
  type SelectBooksLocalizedStrings,
} from './components/advanced/scope-selector/select-books.types';
export {
  default as ScrollGroupSelector,
  type ScrollGroupSelectorProps,
} from './components/advanced/scroll-group-selector.component';
export {
  SettingsList,
  SettingsListHeader,
  SettingsListItem,
} from './components/advanced/settings-components/settings-list.component';
export { default as TabDropdownMenu } from './components/advanced/menus/tab-dropdown-menu.component';
export { default as TabToolbar } from './components/advanced/tab-toolbar/tab-toolbar.component';
export type { TabToolbarProps } from './components/advanced/tab-toolbar/tab-toolbar.component';
export { default as TabFloatingMenu } from './components/advanced/tab-toolbar/tab-floating-menu.component';
export {
  default as NavigationContentSearch,
  type TabKeyValueContent,
} from './components/advanced/tab-navigation-content-search.component';
export { default as Toolbar } from './components/advanced/toolbar.component';
export type { ToolbarProps } from './components/advanced/toolbar.component';
export {
  default as UiLanguageSelector,
  type LanguageInfo,
  type UiLanguageSelectorProps,
} from './components/advanced/ui-language-selector.component';
export { default as SourceLanguageIndexedList } from './components/advanced/source-language-indexed-list/source-language-indexed-list.component';
export type {
  IndexedListItem,
  EntryDomain,
  SourceLanguageIndexedListProps,
  ErDictionaryListProps,
  ErDictionaryFilteredListProps,
  ErEncyclopediaListProps,
  ErMediaListProps,
  LexicalDictionaryListProps,
  SemanticDomain,
  EncyclopediaTeaser,
  MediaItem,
  LexicalDictionaryEntry,
  SourceLanguageIndexedListLocalizedStrings,
} from './components/advanced/source-language-indexed-list/source-language-indexed-list.types';
export { SOURCE_LANGUAGE_INDEXED_LIST_STRING_KEYS } from './components/advanced/source-language-indexed-list/source-language-indexed-list.types';
export { default as ErDictionaryList } from './components/advanced/source-language-indexed-list/er-dictionary-list.component';
export { default as ErDictionaryFilteredList } from './components/advanced/source-language-indexed-list/er-dictionary-filtered-list.component';
export { default as ErEncyclopediaList } from './components/advanced/source-language-indexed-list/er-encyclopedia-list.component';
export { default as ErMediaList } from './components/advanced/source-language-indexed-list/er-media-list.component';
export { default as LexicalDictionaryList } from './components/advanced/source-language-indexed-list/lexical-dictionary-list.component';

export { default as ChapterRangeSelector } from './components/basics/chapter-range-selector.component';
export type { ChapterRangeSelectorProps } from './components/basics/chapter-range-selector.component';
export {
  /** @deprecated 2026-06-08 Use {@link CheckboxGroup} instead. */
  default as Checklist,
  CheckboxGroup,
} from './components/basics/checkbox-group.component';
export type {
  /** @deprecated 2026-06-08 Use {@link CheckboxGroupProps} instead. */
  ChecklistProps,
  CheckboxGroupProps,
} from './components/basics/checkbox-group.component';
export { default as ComboBox } from './components/basics/combo-box.component';
export type {
  ComboBoxLabelOption,
  ComboBoxProps,
  ComboBoxOption,
  ComboBoxGroup,
} from './components/basics/combo-box.component';
export { EditorKeyboardShortcuts } from './components/basics/editor-keyboard-shortcuts.component';
export { ErrorDump } from './components/basics/error-dump.component';
export {
  default as LinkedScrRefButton,
  type LinkedScrRefButtonProps,
} from './components/basics/linked-scr-ref-button.component';
export { ERROR_DUMP_STRING_KEYS } from './components/basics/error-dump.component';
export type { ErrorDumpLocalizedStrings } from './components/basics/error-dump.component';
export { default as CancelAcceptButtons } from './components/basics/cancel-accept-buttons.component';
export { CANCEL_ACCEPT_BUTTONS_STRING_KEYS } from './components/basics/cancel-accept-buttons.component';
export type {
  CancelAcceptButtonsLocalizedStrings,
  CancelAcceptButtonsProps,
} from './components/basics/cancel-accept-buttons.component';
export { default as UndoRedoButtons } from './components/basics/undo-redo-buttons.component';
export { UNDO_REDO_BUTTONS_STRING_KEYS } from './components/basics/undo-redo-buttons.component';
export type {
  UndoRedoButtonsLocalizedStrings,
  UndoRedoButtonsProps,
} from './components/basics/undo-redo-buttons.component';
export { default as ResultsCard } from './components/basics/results-card.component';
export { default as SearchBar } from './components/basics/search-bar.component';
export type { SearchBarProps } from './components/basics/search-bar.component';
export { default as Spinner } from './components/basics/spinner.component';
export type { SpinnerProps } from './components/basics/spinner.component';
export { default as TextField } from './components/basics/text-field.component';
export type { TextFieldProps } from './components/basics/text-field.component';
export { Alert, AlertTitle, AlertDescription } from './components/shadcn-ui/alert';
export { Avatar, AvatarFallback, AvatarImage } from './components/shadcn-ui/avatar';
export { Badge, type BadgeProps, badgeVariants } from './components/shadcn-ui/badge';
export { Button, type ButtonProps, buttonVariants } from './components/shadcn-ui/button';
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from './components/shadcn-ui/card';
export { Checkbox } from './components/shadcn-ui/checkbox';
export {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './components/shadcn-ui/command';
export * from './components/shadcn-ui/context-menu';
export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from './components/shadcn-ui/dialog';
export * from './components/shadcn-ui/button-group';
export * from './components/shadcn-ui/drawer';
export * from './components/shadcn-ui/dropdown-menu';
export { Input } from './components/shadcn-ui/input';
export { Kbd } from './components/shadcn-ui/kbd';
export { Label } from './components/shadcn-ui/label';
export * from './components/shadcn-ui/popover';
export { Progress } from './components/shadcn-ui/progress';
export { RadioGroup, RadioGroupItem } from './components/shadcn-ui/radio-group';
export * from './components/shadcn-ui/select';
export * from './components/shadcn-ui/resizable';
export { Separator } from './components/shadcn-ui/separator';
export * from './components/shadcn-ui/sidebar';
export * from './components/shadcn-ui/sonner';
export * from './components/shadcn-ui/skeleton';
export { Slider } from './components/shadcn-ui/slider';
export { Switch } from './components/shadcn-ui/switch';
export * from './components/shadcn-ui/table';
export { Tabs, TabsList, TabsContent, TabsTrigger } from './components/shadcn-ui/tabs';
export {
  VerticalTabs,
  VerticalTabsList,
  VerticalTabsContent,
  VerticalTabsTrigger,
} from './components/basics/tabs-vertical';
export { Textarea } from './components/shadcn-ui/textarea';
export { ToggleGroup, ToggleGroupItem } from './components/shadcn-ui/toggle-group';
export {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './components/shadcn-ui/tooltip';
export type { Scope, ScopeWithRange } from './components/utils/scripture.util';

// Hooks
export { default as useEvent } from './hooks/use-event.hook';
export { default as useEventAsync } from './hooks/use-event-async.hook';
export { default as usePromise } from './hooks/use-promise.hook';
export type { UsePromiseOptions } from './hooks/use-promise.hook';
export { useStylesheet } from './hooks/use-stylesheet.hook';
export {
  useListbox,
  type UseListboxProps,
  type ListboxOption,
} from './hooks/listbox-keyboard-navigation.hook';

// Z-index scale
export {
  Z_INDEX_ABOVE_DOCK,
  Z_INDEX_FOOTNOTE_EDITOR,
  Z_INDEX_OVERLAY,
  Z_INDEX_MODAL_BACKDROP,
  Z_INDEX_MODAL,
  Z_INDEX_TOOLTIP,
} from './components/z-index';

// Utils
export { cn } from './utils/shadcn-ui/utils';
export { getToolbarOSReservedSpaceClassName } from './components/advanced/toolbar.component';
