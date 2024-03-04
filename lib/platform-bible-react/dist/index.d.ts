// Generated by dts-bundle-generator v9.2.4

import { AutocompleteChangeDetails, AutocompleteChangeReason, AutocompleteValue, SnackbarCloseReason, SnackbarOrigin } from '@mui/material';
import React$1 from 'react';
import { ChangeEvent, ChangeEventHandler, FocusEventHandler, Key, MouseEvent as MouseEvent$1, MouseEventHandler, PropsWithChildren, ReactElement, ReactNode, SyntheticEvent } from 'react';
import { CellClickArgs, CellKeyDownArgs, CellKeyboardEvent, CellMouseEvent, CopyEvent, PasteEvent, RenderCellProps, RowsChangeData, SortColumn } from 'react-data-grid';

export type ButtonProps = React$1.PropsWithChildren<{
	/** Optional unique identifier */
	id?: string;
	/**
	 * Enabled status of button
	 *
	 * @default false
	 */
	isDisabled?: boolean;
	/** Additional css classes to help with unique styling of the button */
	className?: string;
	/** Optional click handler */
	onClick?: React$1.MouseEventHandler<HTMLButtonElement>;
	/** Optional context menu handler */
	onContextMenu?: React$1.MouseEventHandler<HTMLButtonElement>;
}>;
/**
 * Button a user can click to do something
 *
 * Thanks to MUI for heavy inspiration and documentation
 * https://mui.com/material-ui/getting-started/overview/
 */
export declare function Button({ id, isDisabled, className, onClick, onContextMenu, children, }: ButtonProps): import("react/jsx-runtime").JSX.Element;
export type ChapterRangeSelectorProps = {
	startChapter: number;
	endChapter: number;
	handleSelectStartChapter: (chapter: number) => void;
	handleSelectEndChapter: (chapter: number) => void;
	isDisabled?: boolean;
	chapterCount: number;
};
export function ChapterRangeSelector({ startChapter, endChapter, handleSelectStartChapter, handleSelectEndChapter, isDisabled, chapterCount, }: ChapterRangeSelectorProps): import("react/jsx-runtime").JSX.Element;
export declare enum LabelPosition {
	After = "after",
	Before = "before",
	Above = "above",
	Below = "below"
}
export type CheckboxProps = {
	/** Optional unique identifier */
	id?: string;
	/** If `true`, the component is checked. */
	isChecked?: boolean;
	/**
	 * If specified, the label that will appear associated with the checkbox.
	 *
	 * @default '' (no label will be shown)
	 */
	labelText?: string;
	/**
	 * Indicates the position of the label relative to the checkbox.
	 *
	 * @default 'after'
	 */
	labelPosition?: LabelPosition;
	/**
	 * If `true`, the component is in the indeterminate state.
	 *
	 * @default false
	 */
	isIndeterminate?: boolean;
	/** If `true`, the component is checked by default. */
	isDefaultChecked?: boolean;
	/**
	 * Enabled status of switch
	 *
	 * @default false
	 */
	isDisabled?: boolean;
	/**
	 * True when (input related to) switch is erroneous
	 *
	 * @default false
	 */
	hasError?: boolean;
	/** Additional css classes to help with unique styling of the switch */
	className?: string;
	/**
	 * Callback fired when the state is changed.
	 *
	 * @param event The event source of the callback. You can pull out the new value by accessing
	 *   event.target.value (string). You can pull out the new checked state by accessing
	 *   event.target.checked (boolean).
	 */
	onChange?: (event: React$1.ChangeEvent<HTMLInputElement>) => void;
};
/** Primary UI component for user interaction */
export declare function Checkbox({ id, isChecked, labelText, labelPosition, isIndeterminate, isDefaultChecked, isDisabled, hasError, className, onChange, }: CheckboxProps): import("react/jsx-runtime").JSX.Element;
export type ComboBoxLabelOption = {
	label: string;
};
export type ComboBoxOption = string | number | ComboBoxLabelOption;
export type ComboBoxValue<T, X, Y, Z> = AutocompleteValue<T, X, Y, Z>;
export type ComboBoxChangeDetails<T> = AutocompleteChangeDetails<T>;
export type ComboBoxChangeReason = AutocompleteChangeReason;
export type ComboBoxProps<T> = {
	/** Optional unique identifier */
	id?: string;
	/** Text label title for combobox */
	title?: string;
	/**
	 * If `true`, the component is disabled.
	 *
	 * @default false
	 */
	isDisabled?: boolean;
	/**
	 * If `true`, the component can be cleared, and will have a button to do so
	 *
	 * @default true
	 */
	isClearable?: boolean;
	/**
	 * True when (input related to) switch is erroneous
	 *
	 * @default false
	 */
	hasError?: boolean;
	/**
	 * If `true`, the input will take up the full width of its container.
	 *
	 * @default false
	 */
	isFullWidth?: boolean;
	/** Width of the combobox in pixels. Setting this prop overrides the `isFullWidth` prop */
	width?: number;
	/** List of available options for the dropdown menu */
	options?: readonly T[];
	/** Additional css classes to help with unique styling of the combo box */
	className?: string;
	/**
	 * The selected value that the combo box currently holds. Must be shallow equal to one of the
	 * options entries.
	 */
	value?: T;
	/** Triggers when content of textfield is changed */
	onChange?: (event: React$1.SyntheticEvent<Element, Event>, value: ComboBoxValue<T, boolean | undefined, boolean | undefined, boolean | undefined>, reason?: ComboBoxChangeReason, details?: ComboBoxChangeDetails<T> | undefined) => void;
	/** Triggers when textfield gets focus */
	onFocus?: React$1.FocusEventHandler<HTMLDivElement>;
	/** Triggers when textfield loses focus */
	onBlur?: React$1.FocusEventHandler<HTMLDivElement>;
	/** Used to determine the string value for a given option. */
	getOptionLabel?: (option: ComboBoxOption) => string;
};
/**
 * Dropdown selector displaying various options from which to choose
 *
 * Thanks to MUI for heavy inspiration and documentation
 * https://mui.com/material-ui/getting-started/overview/
 */
export declare function ComboBox<T extends ComboBoxOption = ComboBoxOption>({ id, title, isDisabled, isClearable, hasError, isFullWidth, width, options, className, value, onChange, onFocus, onBlur, getOptionLabel, }: ComboBoxProps<T>): import("react/jsx-runtime").JSX.Element;
/** Function to run to dispose of something. Returns true if successfully unsubscribed */
export type Unsubscriber = () => boolean;
/**
 * Function to run to dispose of something that runs asynchronously. The promise resolves to true if
 * successfully unsubscribed
 */
export type UnsubscriberAsync = () => Promise<boolean>;
/** Callback function that accepts an event and should run when an event is emitted */
export type PlatformEventHandler<T> = (event: T) => void;
/**
 * Function that subscribes the provided callback to run when this event is emitted.
 *
 * @param callback Function to run with the event when it is emitted
 * @returns Unsubscriber function to run to stop calling the passed-in function when the event is
 *   emitted
 */
export type PlatformEvent<T> = (callback: PlatformEventHandler<T>) => Unsubscriber;
/**
 * A PapiEvent that subscribes asynchronously and resolves an asynchronous unsubscriber.
 *
 * Note: The callback itself is not asynchronous.
 */
export type PlatformEventAsync<T> = (callback: PlatformEventHandler<T>) => Promise<UnsubscriberAsync>;
export interface ScriptureReference {
	bookNum: number;
	chapterNum: number;
	verseNum: number;
}
/** Within type T, recursively change properties that were of type A to be of type B */
export type ReplaceType<T, A, B> = T extends A ? B : T extends object ? {
	[K in keyof T]: ReplaceType<T[K], A, B>;
} : T;
/** Identifier for a string that will be localized in a menu based on the user's UI language */
export type LocalizeKey = `%${string}%`;
/** Name of some UI element (i.e., tab, column, group, menu item) or some PAPI object (i.e., command) */
export type ReferencedItem = `${string}.${string}`;
export type OrderedItem = {
	/** Relative order of this item compared to other items in the same parent/scope (sorted ascending) */
	order: number;
};
export type OrderedExtensibleContainer = OrderedItem & {
	/** Determines whether other items can be added to this after it has been defined */
	isExtensible?: boolean;
};
/** Group of menu items that belongs in a column */
export type MenuGroupDetailsInColumn = OrderedExtensibleContainer & {
	/** ID of column in which this group resides */
	column: ReferencedItem;
};
/** Group of menu items that belongs in a submenu */
export type MenuGroupDetailsInSubMenu = OrderedExtensibleContainer & {
	/** ID of menu item hosting the submenu in which this group resides */
	menuItem: ReferencedItem;
};
/** Column that includes header text in a menu */
export type MenuColumnWithHeader = OrderedExtensibleContainer & {
	/** Key that represents the text of the header text of the column */
	label: LocalizeKey;
};
export type MenuItemBase = OrderedItem & {
	/** Menu group to which this menu item belongs */
	group: ReferencedItem;
	/** Key that represents the text of this menu item to display */
	label: LocalizeKey;
	/** Key that represents words the platform should reference when users are searching for menu items */
	searchTerms?: LocalizeKey;
	/** Key that represents the text to display if a mouse pointer hovers over the menu item */
	tooltip?: LocalizeKey;
	/** Additional information provided by developers to help people who perform localization */
	localizeNotes: string;
};
/** Menu item that hosts a submenu */
export type MenuItemContainingSubmenu = MenuItemBase & {
	/** ID for this menu item that holds a submenu */
	id: ReferencedItem;
};
/** Menu item that runs a command */
export type MenuItemContainingCommand = MenuItemBase & {
	/** Name of the PAPI command to run when this menu item is selected. */
	command: ReferencedItem;
	/** Path to the icon to display after the menu text */
	iconPathAfter?: string;
	/** Path to the icon to display before the menu text */
	iconPathBefore?: string;
};
/**
 * Group of menu items that can be combined with other groups to form a single context menu/submenu.
 * Groups are separated using a line within the menu/submenu.
 */
export type GroupsInSingleColumnMenu = {
	/** Named menu group */
	[property: ReferencedItem]: OrderedExtensibleContainer | MenuGroupDetailsInSubMenu;
};
/**
 * Group of menu items that can be combined with other groups to form a single menu/submenu within a
 * multi-column menu. Groups are separated using a line within the menu/submenu.
 */
export type GroupsInMultiColumnMenu = {
	/** Named menu group */
	[property: ReferencedItem]: MenuGroupDetailsInColumn | MenuGroupDetailsInSubMenu;
};
/** Group of columns that can be combined with other columns to form a multi-column menu */
export type ColumnsWithHeaders = {
	/** Named column of a menu */
	[property: ReferencedItem]: MenuColumnWithHeader;
	/** Defines whether columns can be added to this multi-column menu */
	isExtensible?: boolean;
};
/** Menu that contains a column without a header */
export type SingleColumnMenu = {
	/** Groups that belong in this menu */
	groups: GroupsInSingleColumnMenu;
	/** List of menu items that belong in this menu */
	items: (MenuItemContainingCommand | MenuItemContainingSubmenu)[];
};
/** Menu that contains multiple columns with headers */
export type MultiColumnMenu = {
	/** Columns that belong in this menu */
	columns: ColumnsWithHeaders;
	/** Groups that belong in this menu */
	groups: GroupsInMultiColumnMenu;
	/** List of menu items that belong in this menu */
	items: (MenuItemContainingCommand | MenuItemContainingSubmenu)[];
};
/**
 * Type that converts any menu type before it is localized to what it is after it is localized. This
 * can be applied to any menu type as needed.
 */
export type Localized<T> = ReplaceType<ReplaceType<T, LocalizeKey, string>, ReferencedItem, string>;
export type MenuItemInfoBase = {
	/** Text (displayable in the UI) as the name of the menu item */
	label: string;
	/** Text to display when the mouse hovers over the menu item */
	tooltip?: string;
};
export type Command = MenuItemInfoBase & {
	/** Command to execute (string.string) */
	command: string;
};
export type SubMenu = MenuItemInfoBase & {
	/** Command to execute (string.string) */
	items: MenuItemInfo[];
};
export interface CommandHandler {
	(command: Command): void;
}
export type MenuPropsBase = {
	menuDefinition: Localized<SingleColumnMenu>;
	commandHandler: CommandHandler;
	/**
	 * Additional action to perform when any menu item is clicked. Allows the caller to handle event
	 * (e.g., to close the menu).
	 */
	onClick?: (event: React$1.MouseEvent<HTMLElement>) => void;
};
export type MenuItemListProps = MenuPropsBase & {
	/** Optional unique (column) identifier */
	columnId?: ReferencedItem;
};
export type MenuItemProps = Omit<MenuItemInfo, "command"> & React$1.PropsWithChildren<{
	/** Optional unique identifier */
	id?: string;
	onClick: (event: React$1.MouseEvent<HTMLElement>) => void;
}>;
export type MenuItemInfo = (Command | SubMenu) & {
	/**
	 * If specified, menu item will be inset if it does not have a leading icon.
	 *
	 * @default true
	 */
	allowForLeadingIcons?: boolean;
	/**
	 * If specified, the path to the icon image to display on the leading side of the menu text.
	 *
	 * @default undefined (no leading icon will be shown)
	 */
	iconPathBefore?: string;
	/**
	 * If specified, the path to the icon image to display on the trailing side of the menu text.
	 *
	 * @default undefined (no trailing icon will be shown)
	 */
	iconPathAfter?: string;
	/**
	 * If true, list item is focused during the first mount
	 *
	 * @default false
	 */
	hasAutoFocus?: boolean;
	/** Additional css classes to help with unique styling of the menu item */
	className?: string;
	/**
	 * If true, the menu item will appear disabled and it will not respond to clicks or mouse hovers.
	 *
	 * @default false
	 */
	isDisabled?: boolean;
	/**
	 * If true, compact vertical padding designed for keyboard and mouse input is used.
	 *
	 * @default true
	 */
	isDense?: boolean;
	/**
	 * If true, a right-arrow icon will be displayed (iconPathAfter, if specified, will be ignored).
	 *
	 * @default false
	 */
	isSubMenuParent?: boolean;
	/**
	 * If true, the left and right padding is removed
	 *
	 * @default false
	 */
	hasDisabledGutters?: boolean;
	/**
	 * If true, a 1px light border is added to bottom of menu item
	 *
	 * @default false
	 */
	hasDivider?: boolean;
	/** Help identify which element has keyboard focus */
	focusVisibleClassName?: string;
	/** If it's a submenu, it should have the items property */
	items?: MenuItemInfo[];
};
export function MenuItem(props: MenuItemProps): import("react/jsx-runtime").JSX.Element;
export type GridMenuInfo = {
	/** The menu object containing information about the columns, groups, and items to display. */
	multiColumnMenu: Localized<MultiColumnMenu>;
};
export type GridMenuProps = GridMenuInfo & {
	/** Optional unique identifier */
	id?: string;
	commandHandler: CommandHandler;
	/** Additional css classes to help with unique styling of the grid menu */
	className?: string;
};
export function GridMenu({ commandHandler, className, multiColumnMenu, id, }: GridMenuProps): import("react/jsx-runtime").JSX.Element;
/**
 * All the exported types in this file should be regarded as "internal" (i.e., they should not be
 * exposed via index.ts).
 */
export type GroupedMenuPropsBase = MenuPropsBase & {
	/** Optional unique (column) identifier */
	columnId?: ReferencedItem;
};
export type ContextMenuProps = GroupedMenuPropsBase & {
	/** Additional css classes to help with styling of the context menu */
	className?: string;
};
/**
 * A component that wraps its children, making them the "target" of a context menu so that the
 * context menu is displayed when the target is right-clicked.
 *
 * @param {ContextMenuProps & PropsWithChildren} props - The properties for the ContextMenu
 *   component which define what menu items to display and supply a command handler for when a menu
 *   item is clicked.
 * @returns {JSX.Element} The ContextMenu component (including the wrapped children)
 */
export function ContextMenu({ className, commandHandler, menuDefinition, children, }: React$1.PropsWithChildren<ContextMenuProps>): string | number | boolean | Iterable<React$1.ReactNode> | import("react/jsx-runtime").JSX.Element | null | undefined;
export type IconButtonProps = React$1.PropsWithChildren<{
	/** Optional unique identifier */
	id?: string;
	/**
	 * Required. Used as both the tooltip (aka, title) and the aria-label (used for accessibility,
	 * testing, etc.), unless a distinct tooltip is supplied.
	 */
	label: string;
	/**
	 * Enabled status of button
	 *
	 * @default false
	 */
	isDisabled?: boolean;
	/** Optional tooltip to display if different from the aria-label. */
	tooltip?: string;
	/** If true, no tooltip will be displayed. */
	isTooltipSuppressed?: boolean;
	/**
	 * If given, uses a negative margin to counteract the padding on one side (this is often helpful
	 * for aligning the left or right side of the icon with content above or below, without ruining
	 * the border size and shape).
	 *
	 * @default false
	 */
	adjustMarginToAlignToEdge?: "end" | "start" | false;
	/**
	 * The size of the component. small is equivalent to the dense button styling.
	 *
	 * @default false
	 */
	size: "small" | "medium" | "large";
	/** Additional css classes to help with unique styling of the button */
	className?: string;
	/** Optional click handler */
	onClick?: React$1.MouseEventHandler<HTMLButtonElement>;
}>;
/**
 * Iconic button a user can click to do something
 *
 * Thanks to MUI for heavy inspiration and documentation
 * https://mui.com/material-ui/getting-started/overview/
 */
export declare function IconButton({ id, label, isDisabled, tooltip, isTooltipSuppressed, adjustMarginToAlignToEdge, size, className, onClick, children, }: IconButtonProps): import("react/jsx-runtime").JSX.Element;
export interface ScrRefSelectorProps {
	scrRef: ScriptureReference;
	handleSubmit: (scrRef: ScriptureReference) => void;
	id?: string;
}
export declare function RefSelector({ scrRef, handleSubmit, id }: ScrRefSelectorProps): import("react/jsx-runtime").JSX.Element;
export type SearchBarProps = {
	/**
	 * Callback fired to handle the search query when button pressed
	 *
	 * @param searchQuery
	 */
	onSearch: (searchQuery: string) => void;
	/** Optional string that appears in the search bar without a search string */
	placeholder?: string;
	/** Optional boolean to set the input base to full width */
	isFullWidth?: boolean;
};
export function SearchBar({ onSearch, placeholder, isFullWidth }: SearchBarProps): import("react/jsx-runtime").JSX.Element;
export type SliderProps = {
	/** Optional unique identifier */
	id?: string;
	/**
	 * If `true`, the component is disabled.
	 *
	 * @default false
	 */
	isDisabled?: boolean;
	/**
	 * The component orientation.
	 *
	 * @default 'horizontal'
	 */
	orientation?: "horizontal" | "vertical";
	/**
	 * The minimum allowed value of the slider. Should not be equal to max.
	 *
	 * @default 0
	 */
	min?: number;
	/**
	 * The maximum allowed value of the slider. Should not be equal to min.
	 *
	 * @default 100
	 */
	max?: number;
	/**
	 * The granularity with which the slider can step through values. (A "discrete" slider.) The `min`
	 * prop serves as the origin for the valid values. We recommend (max - min) to be evenly divisible
	 * by the step.
	 *
	 * @default 1
	 */
	step?: number;
	/**
	 * Marks indicate predetermined values to which the user can move the slider. If `true` the marks
	 * are spaced according the value of the `step` prop.
	 *
	 * @default false
	 */
	showMarks?: boolean;
	/** The default value. Use when the component is not controlled. */
	defaultValue?: number;
	/** The value of the slider. For ranged sliders, provide an array with two values. */
	value?: number | number[];
	/**
	 * Controls when the value label is displayed:
	 *
	 * - `auto` the value label will display when the thumb is hovered or focused.
	 * - `on` will display persistently.
	 * - `off` will never display.
	 *
	 * @default 'off'
	 */
	valueLabelDisplay?: "on" | "auto" | "off";
	/** Additional css classes to help with unique styling of the button */
	className?: string;
	/**
	 * Callback function that is fired when the slider's value changed.
	 *
	 * @param event The event source of the callback. You can pull out the new value by accessing
	 *   event.target.value (any). Warning: This is a generic event not a change event.
	 * @param value The new value.
	 * @param activeThumb Index of the currently moved thumb.
	 */
	onChange?: (event: Event, value: number | number[], activeThumb: number) => void;
	/**
	 * Callback function that is fired when the mouseup is triggered.
	 *
	 * @param event The event source of the callback. Warning: This is a generic event not a change
	 *   event.
	 * @param value The new value.
	 */
	onChangeCommitted?: (event: Event | React$1.SyntheticEvent<Element, Event>, value: number | number[]) => void;
};
/**
 * Slider that allows selecting a value from a range
 *
 * Thanks to MUI for heavy inspiration and documentation
 * https://mui.com/material-ui/getting-started/overview/
 */
export declare function Slider({ id, isDisabled, orientation, min, max, step, showMarks, defaultValue, value, valueLabelDisplay, className, onChange, onChangeCommitted, }: SliderProps): import("react/jsx-runtime").JSX.Element;
export type CloseReason = SnackbarCloseReason;
export type AnchorOrigin = SnackbarOrigin;
export type SnackbarContentProps = {
	/** The action to display, renders after the message */
	action?: React$1.ReactNode;
	/** The message to display */
	message?: React$1.ReactNode;
	/** Additional css classes to help with unique styling of the snackbar, internal */
	className?: string;
};
export type SnackbarProps = React$1.PropsWithChildren<{
	/** Optional unique identifier */
	id?: string;
	/**
	 * If true, the component is shown
	 *
	 * @default false
	 */
	isOpen?: boolean;
	/**
	 * The number of milliseconds to wait before automatically calling onClose()
	 *
	 * @default undefined
	 */
	autoHideDuration?: number;
	/** Additional css classes to help with unique styling of the snackbar, external */
	className?: string;
	/**
	 * Optional, used to control the open prop event: Event | SyntheticEvent<Element, Event>, reason:
	 * string
	 */
	onClose?: (event: Event | React$1.SyntheticEvent<Element, Event>, reason: CloseReason) => void;
	/**
	 * The anchor of the `Snackbar`. The horizontal alignment is ignored.
	 *
	 * @default { vertical: 'bottom', horizontal: 'left' }
	 */
	anchorOrigin?: AnchorOrigin;
	/** Props applied to the [`SnackbarContent`](/material-ui/api/snackbar-content/) element. */
	ContentProps?: SnackbarContentProps;
}>;
/**
 * Snackbar that provides brief notifications
 *
 * Thanks to MUI for heavy inspiration and documentation
 * https://mui.com/material-ui/getting-started/overview/
 */
export declare function Snackbar({ autoHideDuration, id, isOpen, className, onClose, anchorOrigin, ContentProps, children, }: SnackbarProps): import("react/jsx-runtime").JSX.Element;
export type SwitchProps = {
	/** Optional unique identifier */
	id?: string;
	/** If `true`, the component is checked. */
	isChecked?: boolean;
	/**
	 * Enabled status of switch
	 *
	 * @default false
	 */
	isDisabled?: boolean;
	/**
	 * True when (input related to) switch is erroneous
	 *
	 * @default false
	 */
	hasError?: boolean;
	/** Additional css classes to help with unique styling of the switch */
	className?: string;
	/**
	 * Callback fired when the state is changed.
	 *
	 * @param event The event source of the callback. You can pull out the new value by accessing
	 *   event.target.value (string). You can pull out the new checked state by accessing
	 *   event.target.checked (boolean).
	 */
	onChange?: (event: React$1.ChangeEvent<HTMLInputElement>) => void;
};
/**
 * Switch to toggle on and off
 *
 * Thanks to MUI for heavy inspiration and documentation
 * https://mui.com/material-ui/getting-started/overview/
 */
export declare function Switch({ id, isChecked: checked, isDisabled, hasError, className, onChange, }: SwitchProps): import("react/jsx-runtime").JSX.Element;
export interface TableCalculatedColumn<R> extends TableColumn<R> {
	readonly idx: number;
	readonly width: number | string;
	readonly minWidth: number;
	readonly maxWidth: number | undefined;
	readonly resizable: boolean;
	readonly sortable: boolean;
	readonly frozen: boolean;
	readonly isLastFrozenColumn: boolean;
	readonly rowGroup: boolean;
	readonly renderCell: (props: RenderCellProps<R>) => React$1.ReactNode;
}
export type TableCellClickArgs<R> = CellClickArgs<R>;
export type TableCellKeyboardEvent = CellKeyboardEvent;
export type TableCellKeyDownArgs<R> = CellKeyDownArgs<R>;
export type TableCellMouseEvent = CellMouseEvent;
export type TableColumn<R> = {
	/** The name of the column. By default it will be displayed in the header cell */
	readonly name: string | React$1.ReactElement;
	/** A unique key to distinguish each column */
	readonly key: string;
	/**
	 * Column width. If not specified, it will be determined automatically based on grid width and
	 * specified widths of other columns
	 */
	readonly width?: number | string;
	/** Minimum column width in px. */
	readonly minWidth?: number;
	/** Maximum column width in px. */
	readonly maxWidth?: number;
	/**
	 * If `true`, editing is enabled. If no custom cell editor is provided through `renderEditCell`
	 * the default text editor will be used for editing. Note: If `editable` is set to 'true' and no
	 * custom `renderEditCell` is provided, the internal logic that sets the `renderEditCell` will
	 * shallow clone the column.
	 */
	readonly editable?: boolean | ((row: R) => boolean) | null;
	/** Determines whether column is frozen or not */
	readonly frozen?: boolean;
	/** Enable resizing of a column */
	readonly resizable?: boolean;
	/** Enable sorting of a column */
	readonly sortable?: boolean;
	/**
	 * Sets the column sort order to be descending instead of ascending the first time the column is
	 * sorted
	 */
	readonly sortDescendingFirst?: boolean | null;
	/**
	 * Editor to be rendered when cell of column is being edited. Don't forget to also set the
	 * `editable` prop to true in order to enable editing.
	 */
	readonly renderEditCell?: ((props: TableEditorProps<R>) => React$1.ReactNode) | null;
};
export type TableCopyEvent<R> = CopyEvent<R>;
export type TableEditorProps<R> = {
	column: TableCalculatedColumn<R>;
	row: R;
	onRowChange: (row: R, commitChanges?: boolean) => void;
	onClose: (commitChanges?: boolean) => void;
};
export type TablePasteEvent<R> = PasteEvent<R>;
export type TableRowsChangeData<R> = RowsChangeData<R>;
export type TableSortColumn = SortColumn;
export type TableProps<R> = {
	/** An array of objects representing each column on the grid */
	columns: readonly TableColumn<R>[];
	/** Whether or not a column with checkboxes is inserted that allows you to select rows */
	enableSelectColumn?: boolean;
	/**
	 * Specifies the width of the select column. Only relevant when enableSelectColumn is true
	 *
	 * @default 50
	 */
	selectColumnWidth?: number;
	/** An array of objects representing the currently sorted columns */
	sortColumns?: readonly TableSortColumn[];
	/**
	 * A callback function that is called when the sorted columns change
	 *
	 * @param sortColumns An array of objects representing the currently sorted columns in the table.
	 */
	onSortColumnsChange?: (sortColumns: TableSortColumn[]) => void;
	/**
	 * A callback function that is called when a column is resized
	 *
	 * @param idx The index of the column being resized
	 * @param width The new width of the column in pixels
	 */
	onColumnResize?: (idx: number, width: number) => void;
	/**
	 * Default column width. If not specified, it will be determined automatically based on grid width
	 * and specified widths of other columns
	 */
	defaultColumnWidth?: number;
	/** Minimum column width in px. */
	defaultColumnMinWidth?: number;
	/** Maximum column width in px. */
	defaultColumnMaxWidth?: number;
	/**
	 * Whether or not columns are sortable by default
	 *
	 * @default true
	 */
	defaultColumnSortable?: boolean;
	/**
	 * Whether or not columns are resizable by default
	 *
	 * @default true
	 */
	defaultColumnResizable?: boolean;
	/** An array of objects representing the rows in the grid */
	rows: readonly R[];
	/** A function that returns the key for a given row */
	rowKeyGetter?: (row: R) => React$1.Key;
	/**
	 * The height of each row in pixels
	 *
	 * @default 35
	 */
	rowHeight?: number;
	/**
	 * The height of the header row in pixels
	 *
	 * @default 35
	 */
	headerRowHeight?: number;
	/** A set of keys representing the currently selected rows */
	selectedRows?: ReadonlySet<React$1.Key>;
	/** A callback function that is called when the selected rows change */
	onSelectedRowsChange?: (selectedRows: Set<React$1.Key>) => void;
	/** A callback function that is called when the rows in the grid change */
	onRowsChange?: (rows: R[], data: TableRowsChangeData<R>) => void;
	/**
	 * A callback function that is called when a cell is clicked
	 *
	 * @param event The event source of the callback
	 */
	onCellClick?: (args: TableCellClickArgs<R>, event: TableCellMouseEvent) => void;
	/**
	 * A callback function that is called when a cell is double-clicked
	 *
	 * @param event The event source of the callback
	 */
	onCellDoubleClick?: (args: TableCellClickArgs<R>, event: TableCellMouseEvent) => void;
	/**
	 * A callback function that is called when a cell is right-clicked
	 *
	 * @param event The event source of the callback
	 */
	onCellContextMenu?: (args: TableCellClickArgs<R>, event: TableCellMouseEvent) => void;
	/**
	 * A callback function that is called when a key is pressed while a cell is focused
	 *
	 * @param event The event source of the callback
	 */
	onCellKeyDown?: (args: TableCellKeyDownArgs<R>, event: TableCellKeyboardEvent) => void;
	/**
	 * The text direction of the table
	 *
	 * @default 'ltr'
	 */
	direction?: "ltr" | "rtl";
	/**
	 * Whether or not virtualization is enabled for the table
	 *
	 * @default true
	 */
	enableVirtualization?: boolean;
	/**
	 * A callback function that is called when the table is scrolled
	 *
	 * @param event The event source of the callback
	 */
	onScroll?: (event: React$1.UIEvent<HTMLDivElement>) => void;
	/**
	 * A callback function that is called when the user copies data from the table.
	 *
	 * @param event The event source of the callback
	 */
	onCopy?: (event: TableCopyEvent<R>) => void;
	/**
	 * A callback function that is called when the user pastes data into the table.
	 *
	 * @param event The event source of the callback
	 */
	onPaste?: (event: TablePasteEvent<R>) => R;
	/** Additional css classes to help with unique styling of the table */
	className?: string;
	/** Optional unique identifier */
	id?: string;
};
/**
 * Configurable table component
 *
 * Thanks to Adazzle for heavy inspiration and documentation
 * https://adazzle.github.io/react-data-grid/
 */
export declare function Table<R>({ columns, sortColumns, onSortColumnsChange, onColumnResize, defaultColumnWidth, defaultColumnMinWidth, defaultColumnMaxWidth, defaultColumnSortable, defaultColumnResizable, rows, enableSelectColumn, selectColumnWidth, rowKeyGetter, rowHeight, headerRowHeight, selectedRows, onSelectedRowsChange, onRowsChange, onCellClick, onCellDoubleClick, onCellContextMenu, onCellKeyDown, direction, enableVirtualization, onCopy, onPaste, onScroll, className, id, }: TableProps<R>): import("react/jsx-runtime").JSX.Element;
export type TextFieldProps = {
	/**
	 * The variant to use.
	 *
	 * @default 'outlined'
	 */
	variant?: "outlined" | "filled";
	/** Optional unique identifier */
	id?: string;
	/**
	 * If `true`, the component is disabled.
	 *
	 * @default false
	 */
	isDisabled?: boolean;
	/**
	 * If `true`, the label is displayed in an error state.
	 *
	 * @default false
	 */
	hasError?: boolean;
	/**
	 * If `true`, the input will take up the full width of its container.
	 *
	 * @default false
	 */
	isFullWidth?: boolean;
	/** Text that gives the user instructions on what contents the TextField expects */
	helperText?: string;
	/** The title of the TextField */
	label?: string;
	/** The short hint displayed in the `input` before the user enters a value. */
	placeholder?: string;
	/**
	 * If `true`, the label is displayed as required and the `input` element is required.
	 *
	 * @default false
	 */
	isRequired?: boolean;
	/** Additional css classes to help with unique styling of the text field */
	className?: string;
	/** Starting value for the text field if it is not controlled */
	defaultValue?: unknown;
	/** Value of the text field if controlled */
	value?: unknown;
	/** Triggers when content of textfield is changed */
	onChange?: React$1.ChangeEventHandler<HTMLInputElement>;
	/** Triggers when textfield gets focus */
	onFocus?: React$1.FocusEventHandler<HTMLInputElement>;
	/** Triggers when textfield loses focus */
	onBlur?: React$1.FocusEventHandler<HTMLInputElement>;
};
/**
 * Text input field
 *
 * Thanks to MUI for heavy inspiration and documentation
 * https://mui.com/material-ui/getting-started/overview/
 */
export declare function TextField({ variant, id, isDisabled, hasError, isFullWidth, helperText, label, placeholder, isRequired, className, defaultValue, value, onChange, onFocus, onBlur, }: TextFieldProps): import("react/jsx-runtime").JSX.Element;
export interface MultiColumnMenuProvider {
	(isSupportAndDevelopment: boolean): Promise<Localized<MultiColumnMenu>>;
}
export type ToolbarProps = React$1.PropsWithChildren<{
	/** The handler to use for menu commands (and eventually toolbar commands). */
	commandHandler: CommandHandler;
	/**
	 * The optional delegate to use to get the menu data. If not specified or if it returns undefined,
	 * the "hamburger" menu will not display.
	 */
	menuProvider?: MultiColumnMenuProvider;
	/** Optional unique identifier */
	id?: string;
	/** Additional css classes to help with unique styling of the toolbar */
	className?: string;
}>;
export function Toolbar({ menuProvider, commandHandler, className, id, children, }: ToolbarProps): import("react/jsx-runtime").JSX.Element;
/**
 * Adds an event handler to an event so the event handler runs when the event is emitted. Use
 * `papi.network.getNetworkEvent` to use a networked event with this hook.
 *
 * @param event The event to subscribe to.
 *
 *   - If event is a `PlatformEvent`, that event will be used
 *   - If event is undefined, the callback will not be subscribed. Useful if the event is not yet
 *       available for example
 *
 * @param eventHandler The callback to run when the event is emitted
 *
 *   WARNING: MUST BE STABLE - const or wrapped in useCallback. The reference must not be updated
 *   every render
 */
export declare const useEvent: <T>(event: PlatformEvent<T> | undefined, eventHandler: PlatformEventHandler<T>) => void;
/**
 * Adds an event handler to an asynchronously subscribing/unsubscribing event so the event handler
 * runs when the event is emitted. Use `papi.network.getNetworkEvent` to use a networked event with
 * this hook.
 *
 * @param event The asynchronously (un)subscribing event to subscribe to.
 *
 *   - If event is a `PlatformEvent` or `PlatformEventAsync`, that event will be used
 *   - If event is undefined, the callback will not be subscribed. Useful if the event is not yet
 *       available for example
 *
 * @param eventHandler The callback to run when the event is emitted
 *
 *   WARNING: MUST BE STABLE - const or wrapped in useCallback. The reference must not be updated
 *   every render
 */
export declare const useEventAsync: <T>(event: PlatformEvent<T> | PlatformEventAsync<T> | undefined, eventHandler: PlatformEventHandler<T>) => void;
export type UsePromiseOptions = {
	/**
	 * Whether to leave the value as the most recent resolved promise value or set it back to
	 * defaultValue while running the promise again. Defaults to true
	 */
	preserveValue?: boolean;
};
/**
 * Awaits a promise and returns a loading value while the promise is unresolved
 *
 * @param promiseFactoryCallback A function that returns the promise to await. If this callback is
 *   undefined, the current value will be returned (defaultValue unless it was previously changed
 *   and `options.preserveValue` is true), and there will be no loading.
 *
 *   WARNING: MUST BE STABLE - const or wrapped in useCallback. The reference must not be updated
 *   every render
 * @param defaultValue The initial value to return while first awaiting the promise. If
 *   `options.preserveValue` is false, this value is also shown while awaiting the promise on
 *   subsequent calls.
 *
 *   Note: this parameter is internally assigned to a `ref`, so changing it will not cause any hooks
 *   to re-run with its new value. This means that, if the `promiseFactoryCallback` changes and
 *   `options.preserveValue` is `false`, the returned value will be set to the current
 *   `defaultValue`. However, the returned value will not be updated if`defaultValue` changes.
 * @param options Various options for adjusting how this hook runs the `promiseFactoryCallback`
 *
 *   Note: this parameter is internally assigned to a `ref`, so changing it will not cause any hooks
 *   to re-run with its new value. However, the latest `options.preserveValue` will always be used
 *   appropriately to determine whether to preserve the returned value when changing the
 *   `promiseFactoryCallback`
 * @returns `[value, isLoading]`
 *
 *   - `value`: the current value for the promise, either the defaultValue or the resolved promise value
 *   - `isLoading`: whether the promise is waiting to be resolved
 */
export declare const usePromise: <T>(promiseFactoryCallback: (() => Promise<T>) | undefined, defaultValue: T, options?: UsePromiseOptions) => [
	value: T,
	isLoading: boolean
];

export {};
