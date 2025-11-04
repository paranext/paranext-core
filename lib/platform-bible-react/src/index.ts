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
export { default as DataTable } from './components/advanced/data-table/data-table.component';
export type {
  ColumnDef,
  RowContents,
  SortDirection,
  TableContents,
} from './components/advanced/data-table/data-table.component';
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
} from './components/advanced/footnotes/footnote-editor.component';
export { default as FootnoteItem } from './components/advanced/footnotes/footnote-item.component';
export { default as FootnoteList } from './components/advanced/footnotes/footnote-list.component';
export { FOOTNOTE_LIST_STRING_KEYS } from './components/advanced/footnotes/footnote-list.component';
export {
  default as Inventory,
  type InventoryItem,
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
} from './components/advanced/inventory/inventory-columns';
export {
  default as MultiSelectComboBox,
  type MultiSelectComboBoxEntry,
} from './components/advanced/multi-select-combo-box.component';
export type { SelectMenuItemHandler } from './components/advanced/menus/platform-menubar.component';
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
export type { ScopeSelectorLocalizedStrings } from './components/advanced/scope-selector/scope-selector.component';
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

export { default as ChapterRangeSelector } from './components/basics/chapter-range-selector.component';
export type { ChapterRangeSelectorProps } from './components/basics/chapter-range-selector.component';
export { default as Checklist } from './components/basics/checklist.component';
export type { ChecklistProps } from './components/basics/checklist.component';
export { default as ComboBox } from './components/basics/combo-box.component';
export type {
  ComboBoxLabelOption,
  ComboBoxProps,
  ComboBoxOption,
} from './components/basics/combo-box.component';
export { ErrorDump } from './components/basics/error-dump.component';
export { ERROR_DUMP_STRING_KEYS } from './components/basics/error-dump.component';
export type { ErrorDumpLocalizedStrings } from './components/basics/error-dump.component';
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
export { default as Checkbox } from './components/shadcn-ui/checkbox';
export {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './components/shadcn-ui/command';
export * from './components/shadcn-ui/context-menu';
export * from './components/shadcn-ui/drawer';
export * from './components/shadcn-ui/dropdown-menu';
export { Input } from './components/shadcn-ui/input';
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
export type { Scope } from './components/utils/scripture.util';

// Hooks
export { default as useEvent } from './hooks/use-event.hook';
export { default as useEventAsync } from './hooks/use-event-async.hook';
export { default as usePromise } from './hooks/use-promise.hook';
export type { UsePromiseOptions } from './hooks/use-promise.hook';
export {
  useListbox,
  type UseListboxProps,
  type ListboxOption,
} from './hooks/listbox-keyboard-navigation.hook';

// Utils
export { cn } from './utils/shadcn-ui.util';
export { getToolbarOSReservedSpaceClassName } from './components/advanced/toolbar.component';
