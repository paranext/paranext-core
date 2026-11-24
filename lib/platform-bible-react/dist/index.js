var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { cn, getLocalizedBookName, getLocalizedBookId, CommandItem, LIST_ITEM_KEYBOARD_FOCUS_RING, trackInteractionModality, useTruncationTooltip, TooltipProvider, Tooltip, TooltipTrigger, TooltipContent, getLastInteractionModality, ALL_ENGLISH_BOOK_NAMES, resolveLocalizedString, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, Button, getPreviousChapterRef, getNextChapterRef, getPreviousVerseRef, getNextVerseRef, doesBookMatchQuery, CommandGroup, readDirection, ALL_BOOK_IDS, getSectionLongName, Popover, PopoverTrigger, PopoverContent, Command, CommandInput, ButtonGroup, ButtonGroupSeparator, CommandList, CommandEmpty, Label, RadioGroup, RadioGroupItem, Dialog, DialogContent, DialogHeader, DialogTitle, isMacOs, CancelAcceptButtons, CANCEL_ACCEPT_BUTTONS_STRING_KEYS, Badge, Separator, Skeleton, useListbox, DropdownMenuSeparator, DropdownMenuCheckboxItem, useGatedCloseAutoFocus, Z_INDEX_ABOVE_DOCK, TableRow, TableCell, Table, TableHeader, TableHead, TableBody, DropdownMenuGroup, DropdownMenuRadioGroup, DropdownMenuRadioItem, MultiSelectComboBox, MARKER_MENU_STRING_KEYS, UNDO_REDO_BUTTONS_STRING_KEYS, Input, isLucideIconName, ProjectSelector, SearchBar, getAvailableBookIds, getBooksForSection, CommandSeparator, getSectionShortName, isSectionFullySelected, PopoverPortalContainerProvider, focusUnlessSuppressed, DialogFooter, DEFAULT_SCROLL_GROUP_LOCALIZED_STRINGS, LucideIcon, QUIET_FOCUS_RING_SUPPRESSION, showFocusRing, DropdownMenuShortcut, ShortcutKeys, DropdownMenuSubTrigger, DropdownMenuSub, DropdownMenuPortal, DropdownMenuSubContent, hideFocusRing, MenuContext, useMenuContext, menuVariants, useDismissOnWindowBlur, InputGroup, InputGroupAddon, Kbd } from "./resizable.js";
import { Alert, AlertDescription, AlertTitle, ButtonGroupText, DialogClose, DialogDescription, DialogOverlay, DialogPortal, DialogTrigger, EditorKeyboardShortcuts, Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyState, EmptyTitle, FootnoteEditor, INLINE_APPLY_DEBOUNCE_MS, KbdGroup, MarkerMenu, PopoverAnchor, PopoverDescription, PopoverHeader, PopoverTitle, ResizableHandle, ResizablePanel, ResizablePanelGroup, RetryableErrorView, Spinner, TableCaption, TableFooter, TooltipPortalContainerProvider, UndoRedoButtons, Z_INDEX_ABOVE_POPOVER, Z_INDEX_CONNECTION_LOST, Z_INDEX_FIRST_RUN, Z_INDEX_MODAL, Z_INDEX_MODAL_BACKDROP, Z_INDEX_NESTED_MODAL, Z_INDEX_NESTED_MODAL_BACKDROP, Z_INDEX_ONBOARDING_TOUR, Z_INDEX_OVERLAY, badgeVariants, buttonGroupVariants, buttonVariants, isRunningInWebView, isUnclosedNoteOp, isWindows, leftEdgeRect, measureBox, shouldSuppressFocusReturn, useHasContentBelow, useLivePopoverAnchor } from "./resizable.js";
import { jsx, jsxs, Fragment as Fragment$1 } from "react/jsx-runtime";
import { Canon } from "@sillsdev/scripture";
import { Check, Clock, ChevronsLeft, ChevronsRight, ChevronUp, ChevronDown, ArrowLeft, ArrowRight, BoldIcon, ItalicIcon, AtSign, Pencil, Trash2, Undo2, ArrowUp, MoreHorizontal, MailOpen, Mail, FilterIcon, ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon, ArrowRightIcon, Copy, Filter as Filter$1, User, Link, CircleHelp, X as X$2, AlertCircle, CircleCheckIcon, CircleXIcon, CircleHelpIcon, ArrowUpIcon, ArrowDownIcon, ScrollText, ChevronRight, ChevronLeft, ChevronsUpDown, MenuIcon, Menu, EllipsisVertical, MoreVertical } from "lucide-react";
import { Section, compareScrRefs, getChaptersForBook, formatScrRef, formatReplacementString, getSectionForBook, formatRelativeDate, sanitizeHtml, NumberFormat, formatBytes, getCurrentLocale, usfmMarkers, getFormatCallerFunction, deepEqual, isString, scrRefToBBBCCCVVV, defaultScrRef, formatScrRefRange, getLocalizeKeyForScrollGroupId, formatReplacementStringToArray, collectUsjMarkers } from "platform-bible-utils";
import React, { useRef, useMemo, createContext, useContext, useEffect, useState, useCallback, useId, useImperativeHandle, useLayoutEffect, Fragment, Component, createElement, Suspense, forwardRef, memo } from "react";
import { IconSelector, IconCheck, IconChevronDown, IconChevronUp, IconLayoutSidebar, IconLayoutSidebarRight, IconChevronRight, IconSearch, IconLoader, IconAlertOctagon, IconAlertTriangle, IconInfoCircle, IconCircleCheck } from "@tabler/icons-react";
import { createEditor, $getRoot, $createParagraphNode, $getSelection, HISTORY_MERGE_TAG, ParagraphNode, TextNode, $getPreviousSelection, $isRangeSelection, $caretFromPoint, $getSiblingCaret, $getChildCaret, $getAdjacentChildCaret, $isChildCaret, $normalizeCaret, $setSelectionFromCaretRange, $getCollapsedCaretRange, $getCaretInDirection, $splitAtPointCaretNext, $isTextPointCaret, $findMatchingParent, $isElementNode, mergeRegister, getDOMTextNode, isHTMLElement, CLEAR_EDITOR_COMMAND, COMMAND_PRIORITY_EDITOR, shallowMergeConfig, defineExtension, safeCast, createState, FORMAT_TEXT_COMMAND, $isNodeSelection, COMMAND_PRIORITY_LOW, RootNode, LineBreakNode, TabNode, $isEditorState, createCommand, CLICK_COMMAND, isDOMNode, $getNodeFromDOMNode, $createNodeSelection, $setSelection, $getEditor, DecoratorNode, $getState, toggleTextFormatType, TEXT_TYPE_TO_FORMAT, $setState, addClassNamesToElement, $create, $getNodeByKey, removeClassNamesFromElement, KEY_TAB_COMMAND, $isBlockElementNode, $createRangeSelection, $normalizeSelection__EXPERIMENTAL, OUTDENT_CONTENT_COMMAND, INDENT_CONTENT_COMMAND, INSERT_TAB_COMMAND, COMMAND_PRIORITY_CRITICAL, $isDecoratorNode, $isParagraphNode, $isTextNode, SELECTION_CHANGE_COMMAND, $insertNodes } from "lexical";
import { HeadingNode, QuoteNode, registerRichText } from "@lexical/rich-text";
import { flushSync, createPortal } from "react-dom";
import { $isTableSelection } from "@lexical/table";
import { ToggleGroup as ToggleGroup$1, Avatar as Avatar$1, Select as Select$1, Checkbox as Checkbox$1, Slot, Tabs as Tabs$1, Menubar as Menubar$1, ContextMenu as ContextMenu$1, Progress as Progress$1, Slider as Slider$1, Switch as Switch$1 } from "radix-ui";
import { cva } from "class-variance-authority";
import { createHeadlessEditor } from "@lexical/headless";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { useReactTable, getFilteredRowModel, getSortedRowModel, getPaginationRowModel, getCoreRowModel, flexRender, getGroupedRowModel, getExpandedRowModel } from "@tanstack/react-table";
import Markdown from "markdown-to-jsx";
import { useHotkeys } from "react-hotkeys-hook";
import { Drawer as Drawer$1 } from "vaul";
import { useTheme } from "next-themes";
import { Toaster as Toaster$1 } from "sonner";
import { toast } from "sonner";
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:field-sizing-content tw:min-h-16 tw:w-full tw:rounded-lg tw:border tw:border-input tw:bg-transparent tw:px-2.5 tw:py-2 tw:text-base tw:transition-colors tw:outline-none tw:placeholder:text-muted-foreground tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:bg-input/50 tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:md:text-sm tw:dark:bg-input/30 tw:dark:disabled:bg-input/80 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40",
        className
      ),
      ...props
    }
  );
}
function BookItem({
  ref,
  bookId,
  isSelected,
  onSelect,
  onMouseDown,
  section,
  className,
  showCheck = false,
  localizedBookNames,
  commandValue,
  suppressKeyboardHighlight = false,
  disabled = false,
  dimmedReason,
  dimmedDescription
}) {
  const isMouseClick = useRef(false);
  const handleSelect = () => {
    if (disabled) return;
    if (!isMouseClick.current) {
      onSelect == null ? void 0 : onSelect(bookId);
    }
    setTimeout(() => {
      isMouseClick.current = false;
    }, 100);
  };
  const handleMouseDown = (e) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    isMouseClick.current = true;
    if (onMouseDown) {
      onMouseDown(e);
    } else {
      onSelect == null ? void 0 : onSelect(bookId);
    }
  };
  const bookDisplayName = useMemo(
    () => getLocalizedBookName(bookId, localizedBookNames),
    [bookId, localizedBookNames]
  );
  const bookDisplayId = useMemo(
    () => getLocalizedBookId(bookId, localizedBookNames),
    [bookId, localizedBookNames]
  );
  const isDimmed = !!dimmedReason && !disabled;
  const baseAriaLabel = `${bookDisplayName} (${bookDisplayId})`;
  const ariaLabel = isDimmed ? dimmedDescription || `${baseAriaLabel}, ${dimmedReason}` : baseAriaLabel;
  const commandItem = /* @__PURE__ */ jsxs(
    CommandItem,
    {
      ref,
      value: commandValue || `${bookId} ${Canon.bookIdToEnglishName(bookId)}`,
      onSelect: handleSelect,
      onMouseDown: handleMouseDown,
      role: "option",
      "aria-selected": isSelected,
      "aria-disabled": disabled || void 0,
      "aria-label": ariaLabel,
      disabled,
      className: cn(
        !suppressKeyboardHighlight && LIST_ITEM_KEYBOARD_FOCUS_RING,
        // Suppress CommandItem's own data-selected background and text color so the keyboard
        // highlight is the ring alone. Book rows and grid cells belong to one control and share one
        // highlight language; a background here would make the same keyboard state look different
        // depending on which view the user is in.
        "tw:data-selected:bg-transparent tw:data-selected:text-inherit",
        // Hover keeps its own background so pointer feedback stays distinct from the ring, which
        // marks the item Enter will submit.
        "tw:hover:bg-muted",
        // Hide CommandItem's own trailing check icon — this component's own `showCheck` icon
        // (rendered as the first child below, so it is never the last child) is the one shown.
        "tw:[&>svg:last-child]:hidden",
        className,
        disabled && "tw:cursor-not-allowed tw:opacity-50",
        // Mirrors NumberedItemGrid's dimmed-vs-disabled split — same tokens, so chapter/verse cells
        // and book rows grey identically inside one popover: dimmed is presentation only, so it
        // never sets aria-disabled or blocks onSelect, and it yields to disabled. Restated under
        // data-selected so a dimmed row keeps its dimming while the keyboard highlight is on it,
        // rather than losing it to the suppression rule above.
        isDimmed && "tw:bg-muted/50 tw:text-muted-foreground/50 tw:data-selected:bg-muted/50 tw:data-selected:text-muted-foreground/50"
      ),
      children: [
        showCheck && /* @__PURE__ */ jsx(
          Check,
          {
            className: cn(
              "tw:me-2 tw:h-4 tw:w-4 tw:shrink-0",
              isSelected ? "tw:opacity-100" : "tw:opacity-0"
            )
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "tw:min-w-0 tw:flex-1", children: bookDisplayName }),
        isDimmed && // Visible rather than hover-only: cmdk never moves DOM focus onto an item (the input keeps
        // it and highlights via data-selected), so a tooltip would never open for a keyboard user.
        // Rendered text also survives the highlight, which recolours the row.
        /* @__PURE__ */ jsx("span", { className: "tw:ms-2 tw:shrink-0 tw:text-xs tw:italic", children: dimmedReason }),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: cn(
              "tw:ms-2 tw:shrink-0 tw:text-xs",
              // Inherits the row's dimmed colour instead of setting its own, so the whole row dims
              // evenly rather than leaving the id at full strength beside a dimmed name.
              !isDimmed && "tw:text-muted-foreground"
            ),
            children: bookDisplayId
          }
        )
      ]
    }
  );
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "tw:mx-1 tw:my-1 tw:border-b-0 tw:border-e-0 tw:border-s-2 tw:border-t-0 tw:border-solid",
        {
          "tw:border-s-red-200": section === Section.OT,
          "tw:border-s-purple-200": section === Section.NT,
          "tw:border-s-indigo-200": section === Section.DC,
          "tw:border-s-amber-200": section === Section.Extra
        }
      ),
      children: commandItem
    }
  );
}
const ARROW_KEYS = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
function isArrowKey(key) {
  return ARROW_KEYS.some((arrowKey) => arrowKey === key);
}
function getKeyCharacterType(key) {
  const isLetter = new RegExp("^\\p{L}$", "u").test(key);
  const isDigit = /^[0-9]$/.test(key);
  return { isLetter, isDigit };
}
const SHRINK_STEP = Object.freeze({
  /** Full labels. */
  WIDE: 0,
  /** Abbreviated primary label form. */
  TIGHT: 1,
  /** Secondary field clipped with an ellipsis — CSS does this on its own. */
  TIGHTER: 2,
  /** Secondary field dropped entirely; primary field alone. */
  MINIMUM: 3
});
const ShrinkStepContext = createContext(SHRINK_STEP.WIDE);
function useShrinkStepValue() {
  return useContext(ShrinkStepContext);
}
const ShrinkStepOverrideContext = createContext(void 0);
function useShrinkStepOverride() {
  return useContext(ShrinkStepOverrideContext);
}
function useInteractionModality() {
  useEffect(() => {
    trackInteractionModality();
  }, []);
}
function ToolbarCompoundLabel({
  primary,
  secondary,
  separator = " ",
  secondaryFirst = false,
  showSecondary = true,
  isPartial,
  fullText,
  className
}) {
  const {
    ref: secondaryRef,
    open: isSecondaryClipHovered,
    onPointerEnter: onSecondaryClipPointerEnter,
    onPointerLeave: onSecondaryClipPointerLeave
  } = useTruncationTooltip();
  const {
    ref: primaryRef,
    open: isPrimaryClipHovered,
    onPointerEnter: onPrimaryClipPointerEnter,
    onPointerLeave: onPrimaryClipPointerLeave
  } = useTruncationTooltip();
  const [isIncompleteHovered, setIsIncompleteHovered] = useState(false);
  const [isFocusRevealed, setIsFocusRevealed] = useState(false);
  const rootRef = useRef(
    // React's ref API requires `null` as the initial value for DOM refs.
    // eslint-disable-next-line no-null/no-null
    null
  );
  const isSecondaryRendered = showSecondary && secondary !== void 0;
  const isShowingPartialLabel = isPartial ?? (secondary !== void 0 && !showSecondary);
  useInteractionModality();
  useEffect(() => {
    var _a;
    const focusable = (_a = rootRef.current) == null ? void 0 : _a.closest('button, [role="combobox"], [tabindex]');
    if (!focusable) return void 0;
    const isClipped = (element) => !!element && element.scrollWidth > element.clientWidth;
    const reveal = () => {
      if (getLastInteractionModality() === "pointer") return;
      if (isShowingPartialLabel || isClipped(primaryRef.current) || isClipped(secondaryRef.current))
        setIsFocusRevealed(true);
    };
    const hide = () => setIsFocusRevealed(false);
    focusable.addEventListener("focus", reveal);
    focusable.addEventListener("blur", hide);
    return () => {
      focusable.removeEventListener("focus", reveal);
      focusable.removeEventListener("blur", hide);
    };
  }, [isShowingPartialLabel, primaryRef, secondaryRef]);
  const handlePointerEnter = useCallback(() => {
    if (isShowingPartialLabel) setIsIncompleteHovered(true);
    onPrimaryClipPointerEnter();
    if (isSecondaryRendered) onSecondaryClipPointerEnter();
  }, [
    isShowingPartialLabel,
    isSecondaryRendered,
    onPrimaryClipPointerEnter,
    onSecondaryClipPointerEnter
  ]);
  const closeTooltip = useCallback(() => {
    setIsIncompleteHovered(false);
    setIsFocusRevealed(false);
    onPrimaryClipPointerLeave();
    onSecondaryClipPointerLeave();
  }, [onPrimaryClipPointerLeave, onSecondaryClipPointerLeave]);
  useEffect(() => {
    if (!isShowingPartialLabel) setIsIncompleteHovered(false);
  }, [isShowingPartialLabel]);
  const primaryNode = /* @__PURE__ */ jsx("span", { ref: primaryRef, className: "tw:min-w-0 tw:shrink tw:truncate", children: primary }, "primary");
  const secondaryNode = isSecondaryRendered ? (
    // Weighted to absorb essentially all of the shrinking, so the primary field only starts losing
    // characters once this one has none left.
    /* @__PURE__ */ jsx("span", { ref: secondaryRef, className: "tw:min-w-0 tw:shrink-[9999] tw:truncate", children: secondary }, "secondary")
  ) : void 0;
  const [first, second] = secondaryFirst ? [secondaryNode, primaryNode] : [primaryNode, secondaryNode];
  return (
    // Nested TooltipProviders are harmless in Radix, so carrying our own means this works in any
    // host, including toolbars that never set one up.
    /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(
      Tooltip,
      {
        open: isPrimaryClipHovered || isSecondaryClipHovered || isIncompleteHovered || isFocusRevealed,
        onOpenChange: (isOpen) => {
          if (!isOpen) closeTooltip();
        },
        children: [
          /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
            "span",
            {
              ref: rootRef,
              onPointerEnter: handlePointerEnter,
              onPointerLeave: closeTooltip,
              onPointerDown: closeTooltip,
              className: cn("tw:flex tw:min-w-0 tw:items-center", className),
              children: [
                first,
                first && second && /* @__PURE__ */ jsx("span", { className: "tw:shrink-0 tw:whitespace-pre", children: separator }, "separator"),
                second
              ]
            }
          ) }),
          /* @__PURE__ */ jsx(TooltipContent, { dir: "auto", children: fullText })
        ]
      }
    ) })
  );
}
function generateCommandValue(bookId, localizedBookNames) {
  return `${bookId} ${ALL_ENGLISH_BOOK_NAMES[bookId]}${localizedBookNames ? ` ${getLocalizedBookId(bookId, localizedBookNames)} ${getLocalizedBookName(bookId, localizedBookNames)}` : ""}`;
}
function chapterItemValue(bookId, chapter) {
  return `${bookId} ${ALL_ENGLISH_BOOK_NAMES[bookId] || ""} ${chapter}`;
}
function verseItemValue(bookId, chapterNum, verse) {
  return `${chapterItemValue(bookId, chapterNum)}:${verse}`;
}
function parseChapterFromItemValue(value) {
  if (value.includes(":")) return void 0;
  const match = /(\d+)$/.exec(value);
  if (!match) return void 0;
  const chapter = parseInt(match[1], 10);
  const firstSpaceIndex = value.indexOf(" ");
  if (firstSpaceIndex < 0) return void 0;
  const bookId = value.slice(0, firstSpaceIndex);
  return value === chapterItemValue(bookId, chapter) ? chapter : void 0;
}
function parseVerseFromItemValue(value) {
  const match = /:(\d+)$/.exec(value);
  if (!match) return void 0;
  const chapterPart = value.slice(0, value.length - match[0].length);
  if (parseChapterFromItemValue(chapterPart) === void 0) return void 0;
  return parseInt(match[1], 10);
}
const TOP_MATCH_ITEM_VALUE = "top-match";
const DEFAULT_ARIA_LABEL = "Show recent searches";
const DEFAULT_GROUP_HEADING = "Recent";
function RecentSearches({
  recentSearches,
  onSearchItemSelect,
  renderItem = (item) => String(item),
  getItemKey = (item) => String(item),
  ariaLabel,
  groupHeading,
  id,
  classNameForItems,
  buttonClassName = "tw:absolute tw:end-0 tw:top-0 tw:h-full tw:px-3 tw:py-2",
  buttonVariant = "ghost",
  open: openProp,
  onOpenChange
}) {
  const [isOpenInternal, setIsOpenInternal] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const headingId = useId();
  const isRestoringFocusFromListRef = useRef(false);
  const isControlled = openProp !== void 0;
  const isOpen = isControlled ? openProp : isOpenInternal;
  const resolvedAriaLabel = ariaLabel === "" ? "" : resolveLocalizedString(ariaLabel, DEFAULT_ARIA_LABEL);
  const resolvedGroupHeading = resolveLocalizedString(groupHeading, DEFAULT_GROUP_HEADING);
  const setIsOpen = (value) => {
    if (!value) {
      isRestoringFocusFromListRef.current = true;
      setIsTooltipOpen(false);
    }
    if (!isControlled) setIsOpenInternal(value);
    onOpenChange == null ? void 0 : onOpenChange(value);
  };
  const handleTooltipOpenChange = (value) => {
    if (value && isRestoringFocusFromListRef.current) {
      isRestoringFocusFromListRef.current = false;
      return;
    }
    setIsTooltipOpen(value);
  };
  if (recentSearches.length === 0) {
    return void 0;
  }
  const handleSearchItemSelect = (item) => {
    onSearchItemSelect(item);
  };
  const button = /* @__PURE__ */ jsx(
    Button,
    {
      variant: buttonVariant,
      size: "icon",
      className: buttonClassName,
      "aria-label": resolvedAriaLabel,
      ...id !== void 0 ? { "aria-controls": isOpen ? id : void 0 } : {},
      onPointerEnter: () => {
        isRestoringFocusFromListRef.current = false;
      },
      children: /* @__PURE__ */ jsx(Clock, { className: "tw:h-4 tw:w-4" })
    }
  );
  return /* @__PURE__ */ jsxs(DropdownMenu, { open: isOpen, onOpenChange: setIsOpen, modal: false, children: [
    /* @__PURE__ */ jsx(TooltipProvider, { children: resolvedAriaLabel ? /* @__PURE__ */ jsxs(Tooltip, { open: isTooltipOpen, onOpenChange: handleTooltipOpenChange, children: [
      /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: button }) }),
      /* @__PURE__ */ jsx(TooltipContent, { children: resolvedAriaLabel })
    ] }) : /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: button }) }),
    /* @__PURE__ */ jsxs(
      DropdownMenuContent,
      {
        ...id !== void 0 ? { id } : {},
        "aria-labelledby": headingId,
        className: "tw:w-[300px]",
        align: "start",
        onKeyDown: (event) => event.stopPropagation(),
        children: [
          /* @__PURE__ */ jsx(DropdownMenuLabel, { id: headingId, children: resolvedGroupHeading }),
          recentSearches.map((item) => /* @__PURE__ */ jsxs(
            DropdownMenuItem,
            {
              onSelect: () => handleSearchItemSelect(item),
              className: cn("tw:flex tw:items-center", classNameForItems),
              children: [
                /* @__PURE__ */ jsx(Clock, { className: "tw:me-2 tw:h-4 tw:w-4 tw:opacity-50" }),
                /* @__PURE__ */ jsx("span", { children: renderItem(item) })
              ]
            },
            getItemKey(item)
          ))
        ]
      }
    )
  ] });
}
function useRecentSearches(recentSearches, setRecentSearches, areItemsEqual = (a2, b2) => a2 === b2, maxItems = 15) {
  return (item) => {
    const recentSearchesWithoutCurrent = recentSearches.filter(
      (existingItem) => !areItemsEqual(existingItem, item)
    );
    const updatedRecentSearches = [item, ...recentSearchesWithoutCurrent.slice(0, maxItems - 1)];
    setRecentSearches(updatedRecentSearches);
  };
}
function isNoOpNavigation(scrRef, newRef) {
  return !newRef || compareScrRefs(scrRef, newRef) === 0;
}
function useQuickNavButtons(scrRef, availableBooks, direction, handleSubmit, localizedStrings) {
  const previousChapterRef = useMemo(
    () => getPreviousChapterRef(scrRef, availableBooks),
    [scrRef, availableBooks]
  );
  const nextChapterRef = useMemo(
    () => getNextChapterRef(scrRef, availableBooks),
    [scrRef, availableBooks]
  );
  const previousVerseRef = useMemo(
    () => getPreviousVerseRef(scrRef, availableBooks),
    [scrRef, availableBooks]
  );
  const nextVerseRef = useMemo(
    () => getNextVerseRef(scrRef, availableBooks),
    [scrRef, availableBooks]
  );
  const submitIfChanged = useCallback(
    (newRef) => {
      if (newRef) handleSubmit(newRef);
    },
    [handleSubmit]
  );
  return useMemo(() => {
    return [
      {
        onClick: () => submitIfChanged(previousChapterRef),
        disabled: isNoOpNavigation(scrRef, previousChapterRef),
        title: resolveLocalizedString(
          localizedStrings == null ? void 0 : localizedStrings["%webView_bookChapterControl_previousChapter%"],
          "Previous chapter"
        ),
        icon: direction === "ltr" ? ChevronsLeft : ChevronsRight,
        group: "chapter"
      },
      {
        onClick: () => submitIfChanged(nextChapterRef),
        disabled: isNoOpNavigation(scrRef, nextChapterRef),
        title: resolveLocalizedString(
          localizedStrings == null ? void 0 : localizedStrings["%webView_bookChapterControl_nextChapter%"],
          "Next chapter"
        ),
        icon: direction === "ltr" ? ChevronsRight : ChevronsLeft,
        group: "chapter"
      },
      {
        onClick: () => submitIfChanged(previousVerseRef),
        disabled: isNoOpNavigation(scrRef, previousVerseRef),
        title: resolveLocalizedString(
          localizedStrings == null ? void 0 : localizedStrings["%webView_bookChapterControl_previousVerse%"],
          "Previous verse"
        ),
        icon: ChevronUp,
        group: "verse"
      },
      {
        onClick: () => submitIfChanged(nextVerseRef),
        disabled: isNoOpNavigation(scrRef, nextVerseRef),
        title: resolveLocalizedString(
          localizedStrings == null ? void 0 : localizedStrings["%webView_bookChapterControl_nextVerse%"],
          "Next verse"
        ),
        icon: ChevronDown,
        group: "verse"
      }
    ];
  }, [
    scrRef,
    direction,
    submitIfChanged,
    previousChapterRef,
    previousVerseRef,
    nextVerseRef,
    nextChapterRef,
    localizedStrings
  ]);
}
const SCRIPTURE_REGEX_PATTERNS = {
  // Matches start of string (`^`), one or more non-colon/space words, optionally followed by space and more words (`([^:\s]+(?:\s+[^:\s]+)*)`), end of string (`$`), case-insensitive (`i`)
  BOOK_ONLY: /^([^:\s]+(?:\s+[^:\s]+)*)$/i,
  // Same as above, but followed by a space and a chapter number (`\s+(\d+)`)
  BOOK_CHAPTER: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,
  // Same as above, but followed by a colon and optionally a verse number (`:(\d*)`)
  BOOK_CHAPTER_VERSE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i
};
const SEARCH_QUERY_FORMATS = [
  SCRIPTURE_REGEX_PATTERNS.BOOK_ONLY,
  SCRIPTURE_REGEX_PATTERNS.BOOK_CHAPTER,
  SCRIPTURE_REGEX_PATTERNS.BOOK_CHAPTER_VERSE
];
function hasChapterVerseSeparator(query) {
  return SCRIPTURE_REGEX_PATTERNS.BOOK_CHAPTER_VERSE.test(query.trim());
}
function isBookBefore(bookId, lowerBound) {
  return Canon.bookIdToNumber(bookId) < Canon.bookIdToNumber(lowerBound.book);
}
function isChapterBefore(bookId, chapterNum, lowerBound) {
  const bookCmp = Canon.bookIdToNumber(bookId) - Canon.bookIdToNumber(lowerBound.book);
  if (bookCmp < 0) return true;
  if (bookCmp > 0) return false;
  return chapterNum < lowerBound.chapterNum;
}
function isVerseBefore(bookId, chapterNum, verseNum, lowerBound) {
  const bookCmp = Canon.bookIdToNumber(bookId) - Canon.bookIdToNumber(lowerBound.book);
  if (bookCmp < 0) return true;
  if (bookCmp > 0) return false;
  if (chapterNum < lowerBound.chapterNum) return true;
  if (chapterNum > lowerBound.chapterNum) return false;
  return verseNum < lowerBound.verseNum;
}
function fetchEndChapter(bookId) {
  return getChaptersForBook(Canon.bookIdToNumber(bookId));
}
function calculateTopMatch(query, availableBooks, localizedBookNames) {
  if (!query.trim() || availableBooks.length === 0) return void 0;
  const topMatch = SEARCH_QUERY_FORMATS.reduce(
    (result, format) => {
      if (result) return result;
      const matches = format.exec(query.trim());
      if (matches) {
        const [book, chapter = void 0, verse = void 0] = matches.slice(1);
        let validBookId;
        const allPotentialMatches = availableBooks.filter((bookId) => {
          return doesBookMatchQuery(bookId, book, localizedBookNames);
        });
        if (allPotentialMatches.length === 1) {
          [validBookId] = allPotentialMatches;
        }
        if (!validBookId && chapter) {
          if (Canon.isBookIdValid(book)) {
            const bookIdUpperCase = book.toUpperCase();
            if (availableBooks.includes(bookIdUpperCase)) {
              validBookId = bookIdUpperCase;
            }
          }
          if (!validBookId && localizedBookNames) {
            const matchingLocalizedBookId = Array.from(localizedBookNames.entries()).find(
              ([, localizedBook]) => localizedBook.localizedId.toLowerCase() === book.toLowerCase()
            );
            if (matchingLocalizedBookId && availableBooks.includes(matchingLocalizedBookId[0])) {
              [validBookId] = matchingLocalizedBookId;
            }
          }
        }
        if (!validBookId && chapter) {
          const getBookIdFromEnglishName = (bookName) => {
            return Object.keys(ALL_ENGLISH_BOOK_NAMES).find(
              (bookId) => ALL_ENGLISH_BOOK_NAMES[bookId].toLowerCase() === bookName.toLowerCase()
            );
          };
          const matchingBookIdForFullName = getBookIdFromEnglishName(book);
          if (matchingBookIdForFullName && availableBooks.includes(matchingBookIdForFullName)) {
            validBookId = matchingBookIdForFullName;
          }
          if (!validBookId && localizedBookNames) {
            const matchingLocalizedBookName = Array.from(localizedBookNames.entries()).find(
              ([, localizedBook]) => localizedBook.localizedName.toLowerCase() === book.toLowerCase()
            );
            if (matchingLocalizedBookName && availableBooks.includes(matchingLocalizedBookName[0])) {
              [validBookId] = matchingLocalizedBookName;
            }
          }
        }
        if (validBookId) {
          let chapterNum = chapter ? parseInt(chapter, 10) : void 0;
          if (chapterNum && chapterNum > fetchEndChapter(validBookId))
            chapterNum = Math.max(fetchEndChapter(validBookId), 1);
          const verseNum = verse ? parseInt(verse, 10) : void 0;
          return {
            book: validBookId,
            chapterNum,
            verseNum
          };
        }
      }
      return void 0;
    },
    void 0
  );
  if (topMatch) return topMatch;
  return void 0;
}
function groupBooksBySection(bookIds) {
  return {
    [Section.OT]: bookIds.filter((bookId) => Canon.isBookOT(bookId)),
    [Section.NT]: bookIds.filter((bookId) => Canon.isBookNT(bookId)),
    [Section.DC]: bookIds.filter((bookId) => Canon.isBookDC(bookId)),
    [Section.Extra]: bookIds.filter((bookId) => Canon.extraBooks().includes(bookId))
  };
}
function deriveBookChapterControlBookLists(projectBookIds, additionalBookIds) {
  const projectBookIdSet = new Set(projectBookIds);
  const extraBookIds = additionalBookIds.filter((bookId) => !projectBookIdSet.has(bookId));
  const extraBookIdSet = new Set(extraBookIds);
  const reachableBookIds = extraBookIdSet.size === 0 ? projectBookIds : Canon.allBookIds.filter(
    (bookId) => projectBookIdSet.has(bookId) || extraBookIdSet.has(bookId)
  );
  const reachableBooksBySection = groupBooksBySection(reachableBookIds);
  const reachableBooks = Object.values(reachableBooksBySection).flat();
  const projectBooksBySection = groupBooksBySection(projectBookIds);
  return {
    projectBooksBySection,
    reachableBooksBySection,
    reachableBooks,
    // Grouped and flattened like `reachableBooks`, so it inherits the same peripheral-id exclusion.
    projectBooks: Object.values(projectBooksBySection).flat(),
    // Derived from the grouped-and-flattened list, so a peripheral id that grouping dropped can
    // never be marked dimmed for a list it is not part of.
    booksOutsideProject: new Set(reachableBooks.filter((bookId) => !projectBookIdSet.has(bookId)))
  };
}
const GRID_COLUMNS = 6;
function mirrorHorizontalKey(key) {
  if (key === "ArrowLeft") return "ArrowRight";
  if (key === "ArrowRight") return "ArrowLeft";
  return key;
}
function computeTargetGridItem({
  current,
  key,
  max,
  direction = "ltr"
}) {
  if (max <= 0) return current;
  if (current < 1 || current > max) return 1;
  const effectiveKey = direction === "rtl" ? mirrorHorizontalKey(key) : key;
  switch (effectiveKey) {
    case "ArrowLeft":
      return current > 1 ? current - 1 : max;
    case "ArrowRight":
      return current < max ? current + 1 : 1;
    case "ArrowUp":
      return Math.max(1, current - GRID_COLUMNS);
    case "ArrowDown":
      return Math.min(max, current + GRID_COLUMNS);
    default:
      return current;
  }
}
function NumberedItemGrid({
  count,
  valueBuilder,
  onSelect,
  itemRef,
  isDisabled,
  isDimmed,
  isSelected,
  suppressKeyboardHighlight = false,
  className
}) {
  if (count <= 0) return void 0;
  return /* @__PURE__ */ jsx(CommandGroup, { children: /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("tw:grid tw:gap-1", className),
      style: { gridTemplateColumns: `repeat(${GRID_COLUMNS}, minmax(0, 1fr))` },
      children: Array.from({ length: count }, (_, i2) => i2 + 1).map((n2) => {
        const disabled = (isDisabled == null ? void 0 : isDisabled(n2)) ?? false;
        return /* @__PURE__ */ jsx(
          CommandItem,
          {
            value: valueBuilder(n2),
            onSelect: () => {
              if (disabled) return;
              onSelect(n2);
            },
            ref: itemRef(n2),
            disabled,
            "aria-disabled": disabled || void 0,
            className: cn(
              "tw:h-8 tw:w-8 tw:cursor-pointer tw:justify-center tw:rounded-md tw:text-center tw:text-sm",
              // Hide CommandItem's own trailing check icon (a multiselect affordance this grid
              // doesn't use) and give cells pointer feedback distinct from the keyboard focus ring.
              "tw:[&>svg]:hidden tw:hover:bg-muted",
              !suppressKeyboardHighlight && LIST_ITEM_KEYBOARD_FOCUS_RING,
              // cmdk highlights the focused cell with its own data-selected background/text; this
              // grid shows keyboard focus with the ring above instead, so neutralize that here.
              // The selected-cell rule below re-asserts its own colors under data-selected so the
              // current chapter/verse keeps its highlight even while the keyboard focus is on it.
              "tw:data-selected:bg-transparent tw:data-selected:text-inherit",
              {
                // The keyboard ring switches to `ring-primary-foreground` on this cell. The shared
                // `ring-ring/50` composites to within ~0.04 lightness of `bg-primary`, which makes
                // the ring all but invisible on exactly the cell the highlight is seeded onto when
                // the popover opens. `primary-foreground` is the token already guaranteed to read
                // against `primary`. `cn` merges away the earlier ring color, so this wins by
                // argument order rather than by CSS output order.
                //
                // Hover keeps the filled treatment (`bg-primary`) instead of taking the shared
                // `hover:bg-muted` above. This cell's text is `primary-foreground` — near-white,
                // chosen to read against the fill — so swapping the fill for a pale muted
                // background on hover leaves near-white text on a near-white ground and the
                // current chapter all but disappears under the pointer. `/90` keeps the pointer
                // feedback that hover owes the user without touching the contrast.
                "tw:bg-primary tw:text-primary-foreground tw:hover:bg-primary/90 tw:data-selected:bg-primary tw:data-selected:text-primary-foreground tw:data-selected:ring-primary-foreground/70": (isSelected == null ? void 0 : isSelected(n2)) ?? false
              },
              {
                // Same tokens as BookItem, so book rows and chapter/verse cells grey identically
                // inside one popover. Restated under data-selected so a dimmed cell keeps its
                // dimming while the keyboard highlight is on it, rather than losing it to the
                // suppression rule above.
                "tw:bg-muted/50 tw:text-muted-foreground/50 tw:data-selected:bg-muted/50 tw:data-selected:text-muted-foreground/50": ((isDimmed == null ? void 0 : isDimmed(n2)) ?? false) && !disabled
              },
              disabled && "tw:cursor-not-allowed tw:opacity-40"
            ),
            children: n2
          },
          n2
        );
      })
    }
  ) });
}
function ChapterGrid({
  bookId,
  scrRef,
  onChapterSelect,
  setChapterRef,
  isChapterDimmed,
  isChapterDisabled,
  suppressKeyboardHighlight,
  className
}) {
  if (!bookId) return void 0;
  return /* @__PURE__ */ jsx(
    NumberedItemGrid,
    {
      count: fetchEndChapter(bookId),
      valueBuilder: (chapter) => chapterItemValue(bookId, chapter),
      onSelect: onChapterSelect,
      itemRef: setChapterRef,
      isDisabled: isChapterDisabled,
      isDimmed: isChapterDimmed,
      isSelected: (chapter) => bookId === scrRef.book && chapter === scrRef.chapterNum,
      suppressKeyboardHighlight,
      className
    }
  );
}
function VerseGrid({
  bookId,
  chapterNum,
  endVerse,
  scrRef,
  onVerseSelect,
  setVerseRef,
  isVerseDimmed,
  isVerseDisabled,
  suppressKeyboardHighlight,
  className
}) {
  if (!bookId || endVerse <= 0) return void 0;
  return /* @__PURE__ */ jsx(
    NumberedItemGrid,
    {
      count: endVerse,
      valueBuilder: (verse) => verseItemValue(bookId, chapterNum, verse),
      onSelect: onVerseSelect,
      itemRef: setVerseRef,
      isDisabled: isVerseDisabled,
      isDimmed: isVerseDimmed,
      isSelected: (verse) => bookId === scrRef.book && chapterNum === scrRef.chapterNum && verse === scrRef.verseNum,
      suppressKeyboardHighlight,
      className
    }
  );
}
const TAB_STOP_SELECTOR = "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]";
function getTabStops(container) {
  return Array.from(container.querySelectorAll(TAB_STOP_SELECTOR)).filter(
    (element) => element.tabIndex >= 0
  );
}
function BookChapterControl({
  scrRef,
  handleSubmit,
  className,
  getActiveBookIds,
  getAdditionalBookIds,
  localizedBookNames,
  localizedStrings,
  recentSearches,
  onAddRecentSearch,
  id,
  getEndVerse,
  disableReferencesUpTo,
  submitKeys,
  triggerContent,
  triggerVariant = "outline",
  showTriggerChevron = false,
  onOpenChange,
  onCloseAutoFocus,
  modal = false,
  align = "center",
  ref,
  disabled
}) {
  const direction = readDirection();
  const shrinkStep = useShrinkStepValue();
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [commandValue, setCommandValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [viewMode, setViewMode] = useState("books");
  const [selectedBookForChaptersView, setSelectedBookForChaptersView] = useState(void 0);
  const [selectedBookForVersesView, setSelectedBookForVersesView] = useState(
    void 0
  );
  const [selectedChapterForVersesView, setSelectedChapterForVersesView] = useState(void 0);
  const [isCommandListHidden, setIsCommandListHidden] = useState(false);
  const [isShowingMoreBooks, setIsShowingMoreBooks] = useState(false);
  const [isHeaderControlFocused, setIsHeaderControlFocused] = useState(false);
  const [hasPreviewGridKeyboardControl, setHasPreviewGridKeyboardControl] = useState(false);
  const triggerRef = useRef(null);
  const justClosedByTriggerRef = useRef(false);
  const contentRef = useRef(null);
  const commandRef = useRef(void 0);
  const commandInputRef = useRef(void 0);
  const commandListRef = useRef(void 0);
  const selectedBookItemRef = useRef(void 0);
  const chapterRefs = useRef({});
  const verseRefs = useRef({});
  const handleSubmitAndAddToRecent = useCallback(
    (newScrRef) => {
      handleSubmit(newScrRef);
      if (onAddRecentSearch) {
        onAddRecentSearch(newScrRef);
      }
    },
    [handleSubmit, onAddRecentSearch]
  );
  const activeBookIds = useMemo(() => {
    return getActiveBookIds ? getActiveBookIds() : ALL_BOOK_IDS;
  }, [getActiveBookIds]);
  const additionalBookIds = useMemo(
    () => getActiveBookIds && getAdditionalBookIds ? getAdditionalBookIds() : [],
    [getActiveBookIds, getAdditionalBookIds]
  );
  const {
    projectBooksBySection,
    reachableBooksBySection,
    reachableBooks,
    projectBooks,
    booksOutsideProject
  } = useMemo(
    () => deriveBookChapterControlBookLists(activeBookIds, additionalBookIds),
    [activeBookIds, additionalBookIds]
  );
  const isCurrentBookOutsideProject = booksOutsideProject.has(scrRef.book);
  const filteredBooksByType = useMemo(() => {
    if (!inputValue.trim())
      return isShowingMoreBooks ? reachableBooksBySection : projectBooksBySection;
    return groupBooksBySection(
      reachableBooks.filter((bookId) => doesBookMatchQuery(bookId, inputValue, localizedBookNames))
    );
  }, [
    projectBooksBySection,
    reachableBooksBySection,
    reachableBooks,
    isShowingMoreBooks,
    inputValue,
    localizedBookNames
  ]);
  const topMatch = useMemo(
    () => calculateTopMatch(inputValue, reachableBooks, localizedBookNames),
    [inputValue, reachableBooks, localizedBookNames]
  );
  const topMatchReference = useMemo(() => {
    if (!topMatch) return void 0;
    const highlight = commandValue.startsWith(`${topMatch.book} `) ? commandValue : "";
    const highlightedVerse = parseVerseFromItemValue(highlight);
    const highlightedChapter = parseChapterFromItemValue(highlight);
    return {
      book: topMatch.book,
      chapterNum: highlightedChapter ?? topMatch.chapterNum ?? 1,
      verseNum: highlightedVerse ?? topMatch.verseNum ?? 1
    };
  }, [topMatch, commandValue]);
  const didMountRef = useRef(false);
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    onOpenChange == null ? void 0 : onOpenChange(isCommandOpen);
  }, [isCommandOpen, onOpenChange]);
  const handleTopMatchSelect = useCallback(() => {
    if (!topMatchReference) return;
    if (disableReferencesUpTo && isVerseBefore(
      topMatchReference.book,
      topMatchReference.chapterNum,
      topMatchReference.verseNum,
      disableReferencesUpTo
    )) {
      return;
    }
    handleSubmitAndAddToRecent(topMatchReference);
    setIsCommandOpen(false);
    setInputValue("");
    setCommandValue("");
  }, [handleSubmitAndAddToRecent, topMatchReference, disableReferencesUpTo]);
  const handleVerseSelect = useCallback(
    (verseNumber) => {
      const bookId = selectedBookForVersesView ?? (topMatch == null ? void 0 : topMatch.book);
      const chapterNum = selectedChapterForVersesView ?? (topMatch == null ? void 0 : topMatch.chapterNum);
      if (!bookId || !chapterNum) return;
      handleSubmitAndAddToRecent({
        book: bookId,
        chapterNum,
        verseNum: verseNumber
      });
      setIsCommandOpen(false);
    },
    [handleSubmitAndAddToRecent, selectedBookForVersesView, selectedChapterForVersesView, topMatch]
  );
  const handleBookSelect = useCallback(
    (bookId) => {
      if (disableReferencesUpTo && isBookBefore(bookId, disableReferencesUpTo)) return;
      const endChapter = fetchEndChapter(bookId);
      if (endChapter <= 1) {
        handleSubmitAndAddToRecent({
          book: bookId,
          chapterNum: 1,
          verseNum: 1
        });
        setIsCommandOpen(false);
        setInputValue("");
        return;
      }
      setSelectedBookForChaptersView(bookId);
      setViewMode("chapters");
    },
    [handleSubmitAndAddToRecent, disableReferencesUpTo]
  );
  const handleChapterSelect = useCallback(
    (chapterNumber) => {
      const bookId = viewMode === "chapters" ? selectedBookForChaptersView : topMatch == null ? void 0 : topMatch.book;
      if (!bookId) return;
      if (getEndVerse) {
        const endVerse = getEndVerse(bookId, chapterNumber);
        if (endVerse > 1) {
          setSelectedBookForVersesView(bookId);
          setSelectedChapterForVersesView(chapterNumber);
          setViewMode("verses");
          setCommandValue("");
          return;
        }
      }
      handleSubmitAndAddToRecent({
        book: bookId,
        chapterNum: chapterNumber,
        verseNum: 1
      });
      setIsCommandOpen(false);
    },
    [handleSubmitAndAddToRecent, viewMode, selectedBookForChaptersView, topMatch, getEndVerse]
  );
  const handleRecentItemSelect = useCallback(
    (item) => {
      handleSubmitAndAddToRecent(item);
      setIsCommandOpen(false);
      setInputValue("");
    },
    [handleSubmitAndAddToRecent]
  );
  const quickNavButtons = useQuickNavButtons(
    scrRef,
    isShowingMoreBooks ? reachableBooks : projectBooks,
    direction,
    handleSubmit,
    localizedStrings
  );
  const handleInputValueChange = useCallback((nextInputValue) => {
    setInputValue(nextInputValue);
    setHasPreviewGridKeyboardControl(false);
  }, []);
  const handleBackToBooks = useCallback(() => {
    setViewMode("books");
    setSelectedBookForChaptersView(void 0);
    setSelectedBookForVersesView(void 0);
    setSelectedChapterForVersesView(void 0);
    setHasPreviewGridKeyboardControl(false);
    setTimeout(() => {
      var _a;
      (_a = commandInputRef.current) == null ? void 0 : _a.focus();
    }, 0);
  }, []);
  const handleBackToChapters = useCallback(() => {
    const previouslySelectedBook = selectedBookForVersesView;
    setSelectedBookForVersesView(void 0);
    setSelectedChapterForVersesView(void 0);
    if (previouslySelectedBook) {
      setSelectedBookForChaptersView(previouslySelectedBook);
      setViewMode("chapters");
      setCommandValue("");
    } else {
      handleBackToBooks();
    }
  }, [selectedBookForVersesView, handleBackToBooks]);
  const handleOpenChange = useCallback(
    (shouldCommandBeOpen) => {
      setIsCommandOpen(shouldCommandBeOpen);
      if (shouldCommandBeOpen) {
        setViewMode("books");
        setSelectedBookForChaptersView(void 0);
        setSelectedBookForVersesView(void 0);
        setSelectedChapterForVersesView(void 0);
        setInputValue("");
        setHasPreviewGridKeyboardControl(false);
        setIsHeaderControlFocused(false);
        setIsCommandListHidden(false);
        setIsShowingMoreBooks(isCurrentBookOutsideProject);
      }
    },
    [isCurrentBookOutsideProject]
  );
  useEffect(() => {
    if (disabled) handleOpenChange(false);
  }, [disabled, handleOpenChange]);
  const [focusSearchInputRequestId, setFocusSearchInputRequestId] = useState(0);
  useEffect(() => {
    var _a;
    if (focusSearchInputRequestId === 0) return;
    (_a = commandInputRef.current) == null ? void 0 : _a.focus();
  }, [focusSearchInputRequestId]);
  useImperativeHandle(
    ref,
    () => ({
      open: () => {
        if (disabled) return;
        handleOpenChange(true);
        setFocusSearchInputRequestId((requestId) => requestId + 1);
      }
    }),
    [handleOpenChange, disabled]
  );
  const { otLong, ntLong, dcLong, extraLong } = {
    otLong: localizedStrings == null ? void 0 : localizedStrings["%scripture_section_ot_long%"],
    ntLong: localizedStrings == null ? void 0 : localizedStrings["%scripture_section_nt_long%"],
    dcLong: localizedStrings == null ? void 0 : localizedStrings["%scripture_section_dc_long%"],
    extraLong: localizedStrings == null ? void 0 : localizedStrings["%scripture_section_extra_long%"]
  };
  const getSectionLabel = useCallback(
    (section) => {
      return getSectionLongName(section, otLong, ntLong, dcLong, extraLong);
    },
    [otLong, ntLong, dcLong, extraLong]
  );
  const doesChapterMatch = useCallback(
    (chapter) => {
      if (!topMatch) return false;
      return !!topMatch.chapterNum && !chapter.toString().includes(topMatch.chapterNum.toString());
    },
    [topMatch]
  );
  const currentDisplayValue = useMemo(
    () => formatScrRef(
      scrRef,
      localizedBookNames ? getLocalizedBookName(scrRef.book, localizedBookNames) : "English"
    ),
    [scrRef, localizedBookNames]
  );
  const bookLabel = useMemo(
    () => shrinkStep >= SHRINK_STEP.TIGHT ? getLocalizedBookId(scrRef.book, localizedBookNames) : getLocalizedBookName(scrRef.book, localizedBookNames),
    [scrRef.book, localizedBookNames, shrinkStep]
  );
  const chapterVerseLabel = `${scrRef.chapterNum}:${scrRef.verseNum}`;
  const setChapterRef = useCallback((chapter) => {
    return (element) => {
      chapterRefs.current[chapter] = element;
    };
  }, []);
  const setVerseRef = useCallback((verse) => {
    return (element) => {
      verseRefs.current[verse] = element;
    };
  }, []);
  const hasVerseSeparatorInInput = useMemo(
    () => hasChapterVerseSeparator(inputValue),
    [inputValue]
  );
  const shouldShowVerseGridForTopMatch = useMemo(() => {
    if (!getEndVerse || !topMatch || !topMatch.chapterNum) return false;
    if (!hasVerseSeparatorInInput) return false;
    return getEndVerse(topMatch.book, topMatch.chapterNum) > 0;
  }, [getEndVerse, topMatch, hasVerseSeparatorInInput]);
  const canShowMoreBooksToggle = viewMode === "books" && !isCommandListHidden && !inputValue.trim() && booksOutsideProject.size > 0;
  const isBookDisabled = useCallback(
    (bookId) => disableReferencesUpTo ? isBookBefore(bookId, disableReferencesUpTo) : false,
    [disableReferencesUpTo]
  );
  const makeIsChapterDisabled = useCallback(
    (bookId) => (chapter) => disableReferencesUpTo ? isChapterBefore(bookId, chapter, disableReferencesUpTo) : false,
    [disableReferencesUpTo]
  );
  const makeIsVerseDisabled = useCallback(
    (bookId, chapterNum) => (verse) => disableReferencesUpTo ? isVerseBefore(bookId, chapterNum, verse, disableReferencesUpTo) : false,
    [disableReferencesUpTo]
  );
  const selectChapterTitle = resolveLocalizedString(
    localizedStrings == null ? void 0 : localizedStrings["%webView_bookChapterControl_selectChapter%"],
    "Select chapter"
  );
  const selectVerseTitle = resolveLocalizedString(
    localizedStrings == null ? void 0 : localizedStrings["%webView_bookChapterControl_selectVerse%"],
    "Select verse"
  );
  const backLabel = viewMode === "verses" ? resolveLocalizedString(
    localizedStrings == null ? void 0 : localizedStrings["%webView_bookChapterControl_backToChapters%"],
    "Back to chapters"
  ) : resolveLocalizedString(
    localizedStrings == null ? void 0 : localizedStrings["%webView_bookChapterControl_backToBooks%"],
    "Back to books"
  );
  const bookNotInProjectLabel = resolveLocalizedString(
    localizedStrings == null ? void 0 : localizedStrings["%webView_bookChapterControl_bookNotInProject%"],
    "Not in project"
  );
  const bookNotInProjectDescriptionTemplate = resolveLocalizedString(
    localizedStrings == null ? void 0 : localizedStrings["%webView_bookChapterControl_bookNotInProjectDescription%"],
    "{book} is not in this project"
  );
  const getBookNotInProjectDescription = useCallback(
    (bookId) => formatReplacementString(bookNotInProjectDescriptionTemplate, {
      book: `${getLocalizedBookName(bookId, localizedBookNames)} (${getLocalizedBookId(
        bookId,
        localizedBookNames
      )})`
    }),
    [bookNotInProjectDescriptionTemplate, localizedBookNames]
  );
  const showMoreBooksLabel = resolveLocalizedString(
    localizedStrings == null ? void 0 : localizedStrings["%webView_bookChapterControl_showMoreBooks%"],
    "Show more books"
  );
  const showProjectBooksOnlyLabel = resolveLocalizedString(
    localizedStrings == null ? void 0 : localizedStrings["%webView_bookChapterControl_showProjectBooksOnly%"],
    "Show project books only"
  );
  const handleInputKeyDown = useCallback(
    (event) => {
      if (event.key === "Home" || event.key === "End") {
        event.stopPropagation();
      }
      if (submitKeys && submitKeys.includes(event.key) && topMatch && topMatch.chapterNum !== void 0 && topMatch.verseNum !== void 0) {
        event.preventDefault();
        event.stopPropagation();
        handleTopMatchSelect();
      }
    },
    [submitKeys, topMatch, handleTopMatchSelect]
  );
  const handleCommandKeyDown = useCallback(
    (event) => {
      var _a, _b;
      if (event.ctrlKey) return;
      const eventTarget = event.target instanceof HTMLElement ? event.target : void 0;
      const isInOwnCommandSurface = !!eventTarget && !!((_a = commandRef.current) == null ? void 0 : _a.contains(eventTarget));
      if (!isInOwnCommandSurface && (eventTarget == null ? void 0 : eventTarget.closest('[role="menu"], [role="menuitem"]')))
        return;
      if (event.key === "Tab") {
        const tabStops = commandRef.current ? getTabStops(commandRef.current) : [];
        if (tabStops.length === 0) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }
        const lastStop = tabStops[tabStops.length - 1];
        const edge = event.shiftKey ? tabStops[0] : lastStop;
        if (document.activeElement === edge) {
          event.preventDefault();
          event.stopPropagation();
          (event.shiftKey ? lastStop : tabStops[0]).focus();
        }
        return;
      }
      const { isLetter, isDigit } = getKeyCharacterType(event.key);
      if ((viewMode === "chapters" || viewMode === "verses") && (event.key === " " || event.key === "Enter")) {
        const isTargetInteractive = !!(eventTarget == null ? void 0 : eventTarget.closest(
          'button, a, input, select, textarea, [role="button"]'
        ));
        if (isTargetInteractive) {
          event.stopPropagation();
          return;
        }
        const activation = (() => {
          if (viewMode === "verses") {
            const bookId2 = selectedBookForVersesView;
            const chapterNum = selectedChapterForVersesView;
            const verse = parseVerseFromItemValue(commandValue);
            if (!bookId2 || !chapterNum || verse === void 0) return void 0;
            return {
              isDisabled: makeIsVerseDisabled(bookId2, chapterNum)(verse),
              activate: () => handleVerseSelect(verse)
            };
          }
          const bookId = selectedBookForChaptersView;
          const chapter = parseChapterFromItemValue(commandValue);
          if (!bookId || chapter === void 0) return void 0;
          return {
            isDisabled: makeIsChapterDisabled(bookId)(chapter),
            activate: () => handleChapterSelect(chapter)
          };
        })();
        if (activation) {
          event.preventDefault();
          event.stopPropagation();
          if (!activation.isDisabled) activation.activate();
          return;
        }
      }
      if (viewMode === "books" && topMatch && !isCommandListHidden && event.key === "Enter") {
        const isTargetInteractive = eventTarget !== commandInputRef.current && !!(eventTarget == null ? void 0 : eventTarget.closest('button, a, input, select, textarea, [role="button"]'));
        if (!isTargetInteractive) {
          event.preventDefault();
          event.stopPropagation();
          handleTopMatchSelect();
          return;
        }
      }
      if ((viewMode === "chapters" || viewMode === "verses") && (isLetter || isDigit)) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      if (event.key === "Backspace" && (viewMode === "chapters" || viewMode === "verses")) {
        event.preventDefault();
        event.stopPropagation();
        if (viewMode === "verses") handleBackToChapters();
        else handleBackToBooks();
        return;
      }
      if (!isArrowKey(event.key)) return;
      if (isCommandListHidden) return;
      if (viewMode === "books" && !hasPreviewGridKeyboardControl && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
        const input = eventTarget === commandInputRef.current ? commandInputRef.current : void 0;
        const caretStart = (input == null ? void 0 : input.selectionStart) ?? 0;
        const caretEnd = (input == null ? void 0 : input.selectionEnd) ?? 0;
        const isTowardTextStart = direction === "rtl" ? event.key === "ArrowRight" : event.key === "ArrowLeft";
        const canCaretMove = !!input && (caretStart !== caretEnd || (isTowardTextStart ? caretStart > 0 : caretEnd < input.value.length));
        if (canCaretMove) return;
      }
      if (event.shiftKey) return;
      if (viewMode === "books" && eventTarget !== commandInputRef.current && (eventTarget == null ? void 0 : eventTarget.closest('button, a, [role="button"]')))
        return;
      const grid = (() => {
        const versePreviewInBooksView = viewMode === "books" && topMatch && shouldShowVerseGridForTopMatch && topMatch.chapterNum ? { bookId: topMatch.book, chapterNum: topMatch.chapterNum } : void 0;
        const verseTarget = viewMode === "verses" ? { bookId: selectedBookForVersesView, chapterNum: selectedChapterForVersesView } : versePreviewInBooksView;
        if (verseTarget) {
          const { bookId, chapterNum } = verseTarget;
          if (!bookId || !chapterNum || !getEndVerse) return void 0;
          return {
            max: getEndVerse(bookId, chapterNum),
            current: parseVerseFromItemValue(commandValue) ?? 0,
            buildValue: (item) => verseItemValue(bookId, chapterNum, item),
            refs: verseRefs,
            // In books view focus stays on the CommandInput so the user can keep typing; only
            // the dedicated grid views pull focus off the back button.
            takeFocus: viewMode === "verses"
          };
        }
        if (viewMode === "chapters" || viewMode === "books" && topMatch && fetchEndChapter(topMatch.book) > 1) {
          const bookId = viewMode === "chapters" ? selectedBookForChaptersView : topMatch == null ? void 0 : topMatch.book;
          if (!bookId) return void 0;
          return {
            max: fetchEndChapter(bookId),
            current: parseChapterFromItemValue(commandValue) ?? 0,
            buildValue: (item) => chapterItemValue(bookId, item),
            refs: chapterRefs,
            takeFocus: viewMode === "chapters"
          };
        }
        return void 0;
      })();
      if (!grid) return;
      if (grid.max <= 0) return;
      if (viewMode === "books") setHasPreviewGridKeyboardControl(true);
      if (grid.takeFocus) {
        (_b = commandRef.current) == null ? void 0 : _b.focus();
      }
      const target = computeTargetGridItem({
        current: grid.current,
        key: event.key,
        max: grid.max,
        direction
      });
      event.preventDefault();
      event.stopPropagation();
      if (target === grid.current) return;
      setCommandValue(grid.buildValue(target));
      const targetElement = grid.refs.current[target];
      if (targetElement) targetElement.scrollIntoView({ block: "nearest", behavior: "smooth" });
    },
    [
      viewMode,
      topMatch,
      shouldShowVerseGridForTopMatch,
      isCommandListHidden,
      hasPreviewGridKeyboardControl,
      direction,
      handleBackToBooks,
      handleBackToChapters,
      handleChapterSelect,
      handleTopMatchSelect,
      handleVerseSelect,
      makeIsChapterDisabled,
      makeIsVerseDisabled,
      selectedBookForChaptersView,
      selectedBookForVersesView,
      selectedChapterForVersesView,
      getEndVerse,
      commandValue
    ]
  );
  const handleQuickNavButtonKeyDown = useCallback((event) => {
    var _a, _b;
    if (event.shiftKey || event.key === "Tab" || event.key === " ") return;
    if (event.key === "Enter") {
      event.stopPropagation();
      return;
    }
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      (_a = commandInputRef.current) == null ? void 0 : _a.focus();
      return;
    }
    const { isLetter, isDigit } = getKeyCharacterType(event.key);
    if (isLetter || isDigit) {
      event.preventDefault();
      setInputValue((prevValue) => prevValue + event.key);
      (_b = commandInputRef.current) == null ? void 0 : _b.focus();
      setIsCommandListHidden(false);
    }
  }, []);
  useLayoutEffect(() => {
    const scrollTimeout = setTimeout(() => {
      if (isCommandOpen && viewMode === "books" && commandListRef.current && selectedBookItemRef.current) {
        const listElement = commandListRef.current;
        const itemElement = selectedBookItemRef.current;
        const itemOffsetTop = itemElement.offsetTop;
        const listHeight = listElement.clientHeight;
        const itemHeight = itemElement.clientHeight;
        const scrollPosition = itemOffsetTop - listHeight / 2 + itemHeight / 2;
        listElement.scrollTo({
          top: Math.max(0, scrollPosition),
          behavior: "smooth"
        });
        setCommandValue(generateCommandValue(scrRef.book));
      }
    }, 0);
    return () => {
      clearTimeout(scrollTimeout);
    };
  }, [isCommandOpen, viewMode, inputValue, topMatch, scrRef.book]);
  useLayoutEffect(() => {
    if (viewMode === "chapters" && selectedBookForChaptersView) {
      const isCurrentlySelectedBook = selectedBookForChaptersView === scrRef.book;
      const initialChapter = isCurrentlySelectedBook ? scrRef.chapterNum : 1;
      setCommandValue(chapterItemValue(selectedBookForChaptersView, initialChapter));
      setTimeout(() => {
        if (commandListRef.current) {
          if (isCurrentlySelectedBook) {
            const targetElement = chapterRefs.current[scrRef.chapterNum];
            if (targetElement) {
              targetElement.scrollIntoView({ block: "center", behavior: "smooth" });
            }
          } else {
            commandListRef.current.scrollTo({ top: 0 });
          }
        }
        if (commandRef.current) {
          commandRef.current.focus();
        }
      }, 0);
    }
  }, [viewMode, selectedBookForChaptersView, topMatch, scrRef.book, scrRef.chapterNum]);
  useLayoutEffect(() => {
    if (viewMode === "verses" && selectedBookForVersesView && selectedChapterForVersesView !== void 0) {
      const isCurrentlySelectedChapter = selectedBookForVersesView === scrRef.book && selectedChapterForVersesView === scrRef.chapterNum;
      const initialVerse = isCurrentlySelectedChapter ? scrRef.verseNum : 1;
      setCommandValue(
        verseItemValue(selectedBookForVersesView, selectedChapterForVersesView, initialVerse)
      );
      setTimeout(() => {
        if (commandListRef.current) {
          if (isCurrentlySelectedChapter) {
            const targetElement = verseRefs.current[scrRef.verseNum];
            if (targetElement) {
              targetElement.scrollIntoView({ block: "center", behavior: "smooth" });
            }
          } else {
            commandListRef.current.scrollTo({ top: 0 });
          }
        }
        if (commandRef.current) {
          commandRef.current.focus();
        }
      }, 0);
    }
  }, [
    viewMode,
    selectedBookForVersesView,
    selectedChapterForVersesView,
    scrRef.book,
    scrRef.chapterNum,
    scrRef.verseNum
  ]);
  const previewSeedKey = topMatch ? `${topMatch.book} ${topMatch.chapterNum ?? ""} ${topMatch.verseNum ?? ""} ${shouldShowVerseGridForTopMatch}` : "";
  const seededPreviewKeyRef = useRef("");
  const highlightedPreviewCellRef = useRef("");
  const previewGrid = useMemo(() => {
    if (viewMode !== "books" || !topMatch || isCommandListHidden) return void 0;
    const { book, chapterNum, verseNum } = topMatch;
    if (shouldShowVerseGridForTopMatch && chapterNum && getEndVerse) {
      return {
        max: getEndVerse(book, chapterNum),
        initial: verseNum ?? (book === scrRef.book && chapterNum === scrRef.chapterNum ? scrRef.verseNum : 1),
        parse: parseVerseFromItemValue,
        buildValue: (item) => verseItemValue(book, chapterNum, item)
      };
    }
    const endChapter = fetchEndChapter(book);
    if (endChapter <= 1) return void 0;
    return {
      max: endChapter,
      initial: chapterNum ?? (book === scrRef.book ? scrRef.chapterNum : 1),
      parse: parseChapterFromItemValue,
      buildValue: (item) => chapterItemValue(book, item)
    };
  }, [
    viewMode,
    topMatch,
    isCommandListHidden,
    shouldShowVerseGridForTopMatch,
    getEndVerse,
    scrRef.book,
    scrRef.chapterNum,
    scrRef.verseNum
  ]);
  useLayoutEffect(() => {
    if (viewMode !== "books" || !topMatch || !previewGrid || previewGrid.max <= 0) {
      seededPreviewKeyRef.current = "";
      return;
    }
    const { max, initial, parse, buildValue } = previewGrid;
    const cellNamedBy = (value) => {
      const item = parse(value);
      return item !== void 0 && item >= 1 && item <= max && value === buildValue(item) ? item : void 0;
    };
    if (seededPreviewKeyRef.current !== previewSeedKey) {
      seededPreviewKeyRef.current = previewSeedKey;
      const seeded = buildValue(Math.min(Math.max(initial, 1), max));
      highlightedPreviewCellRef.current = seeded;
      setCommandValue(seeded);
      return;
    }
    if (cellNamedBy(commandValue) !== void 0) {
      highlightedPreviewCellRef.current = commandValue;
      return;
    }
    setCommandValue(
      cellNamedBy(highlightedPreviewCellRef.current) !== void 0 ? highlightedPreviewCellRef.current : buildValue(Math.min(Math.max(initial, 1), max))
    );
  }, [viewMode, topMatch, previewGrid, previewSeedKey, commandValue]);
  return /* @__PURE__ */ jsxs(Popover, { open: isCommandOpen, onOpenChange: handleOpenChange, modal, children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
      Button,
      {
        ref: triggerRef,
        "aria-label": "book-chapter-trigger",
        variant: triggerVariant,
        role: "combobox",
        "aria-expanded": isCommandOpen,
        ...id !== void 0 ? { "aria-controls": id } : {},
        disabled,
        className: cn(
          "tw:h-8 tw:w-full tw:min-w-16 tw:max-w-48 tw:shrink tw:overflow-hidden tw:px-1",
          className
        ),
        onClick: (event) => {
          if (justClosedByTriggerRef.current) {
            justClosedByTriggerRef.current = false;
            event.preventDefault();
          }
        },
        children: [
          triggerContent ?? /* @__PURE__ */ jsx(
            ToolbarCompoundLabel,
            {
              primary: bookLabel,
              secondary: chapterVerseLabel,
              showSecondary: shrinkStep < SHRINK_STEP.MINIMUM,
              isPartial: shrinkStep >= SHRINK_STEP.TIGHT,
              fullText: currentDisplayValue
            }
          ),
          showTriggerChevron && /* @__PURE__ */ jsx(
            IconSelector,
            {
              "data-testid": "book-chapter-control-chevron",
              className: "tw:ms-2 tw:size-4 tw:shrink-0 tw:opacity-50"
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(
      PopoverContent,
      {
        ...id !== void 0 ? { id } : {},
        ref: contentRef,
        forceMount: true,
        className: "tw:w-[280px] tw:p-0",
        align,
        onKeyDownCapture: handleCommandKeyDown,
        onKeyDown: (event) => event.stopPropagation(),
        onPointerDownOutside: (event) => {
          const { target } = event;
          if (isCommandOpen && triggerRef.current && target instanceof Node && triggerRef.current.contains(target)) {
            justClosedByTriggerRef.current = true;
            handleOpenChange(false);
          }
        },
        onInteractOutside: (event) => {
          if (!modal && isCommandOpen && isCommandListHidden) event.preventDefault();
        },
        onEscapeKeyDown: (event) => {
          var _a, _b;
          if (modal || !isCommandOpen || !isCommandListHidden) return;
          const { target } = event;
          const isFocusInPicker = target instanceof Node && (!!((_a = contentRef.current) == null ? void 0 : _a.contains(target)) || !!((_b = triggerRef.current) == null ? void 0 : _b.contains(target)));
          if (!isFocusInPicker) event.preventDefault();
        },
        onCloseAutoFocus,
        children: /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(
          Command,
          {
            ref: commandRef,
            loop: true,
            value: commandValue,
            onValueChange: setCommandValue,
            disablePointerSelection: true,
            shouldFilter: false,
            children: [
              viewMode === "books" ? /* @__PURE__ */ jsxs(
                "div",
                {
                  className: cn("tw:flex tw:items-end", isCommandListHidden && "tw:pb-1"),
                  onFocus: (event) => {
                    setIsHeaderControlFocused(event.target !== commandInputRef.current);
                  },
                  onBlur: (event) => {
                    if (event.currentTarget.contains(event.relatedTarget)) return;
                    setIsHeaderControlFocused(false);
                  },
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "tw:relative tw:flex-1", children: [
                      /* @__PURE__ */ jsx(
                        CommandInput,
                        {
                          ref: commandInputRef,
                          value: inputValue,
                          onValueChange: handleInputValueChange,
                          onKeyDown: handleInputKeyDown,
                          onFocus: () => setIsCommandListHidden(false),
                          className: recentSearches && recentSearches.length > 0 ? "tw:pe-8!" : "",
                          spaceSelectsHighlightedItem: true
                        }
                      ),
                      recentSearches && recentSearches.length > 0 && /* @__PURE__ */ jsx(
                        RecentSearches,
                        {
                          recentSearches,
                          onSearchItemSelect: handleRecentItemSelect,
                          renderItem: (verseRef) => formatScrRef(verseRef, "English"),
                          getItemKey: (verseRef) => `${verseRef.book}-${verseRef.chapterNum}-${verseRef.verseNum}`,
                          ariaLabel: localizedStrings == null ? void 0 : localizedStrings["%history_recentSearches_ariaLabel%"],
                          groupHeading: localizedStrings == null ? void 0 : localizedStrings["%history_recent%"],
                          buttonClassName: "tw:absolute tw:end-1 tw:top-1"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsx(ButtonGroup, { className: "tw:translate-y-px tw:gap-1 tw:pe-2", children: quickNavButtons.map(
                      ({ onClick, disabled: isQuickNavDisabled, title, icon: Icon, group }, index) => {
                        const quickNavButton = /* @__PURE__ */ jsx(
                          Button,
                          {
                            variant: "ghost",
                            size: "sm",
                            onClick: () => {
                              if (isQuickNavDisabled) return;
                              setIsCommandListHidden(true);
                              onClick();
                            },
                            "aria-disabled": isQuickNavDisabled,
                            className: "tw:h-8.5 tw:w-6 tw:rounded-lg! tw:p-0 tw:aria-disabled:cursor-default tw:aria-disabled:opacity-50 tw:aria-disabled:hover:bg-transparent! tw:aria-disabled:hover:text-inherit! tw:dark:aria-disabled:hover:bg-transparent! tw:aria-disabled:active:transform-none!",
                            "aria-label": title,
                            onKeyDown: handleQuickNavButtonKeyDown,
                            children: /* @__PURE__ */ jsx(Icon, {})
                          }
                        );
                        return (
                          // Keyed by position, not by `title`: the titles are localized, so they all
                          // change together the moment the strings resolve or the UI language does.
                          // Keying on them would remount all four buttons at that instant, dropping
                          // focus off whichever one the user was on and destroying an open tooltip.
                          // The set is fixed in size and order, so the index is stable.
                          // eslint-disable-next-line react/no-array-index-key
                          /* @__PURE__ */ jsxs(Fragment, { children: [
                            index > 0 && group !== quickNavButtons[index - 1].group && /* @__PURE__ */ jsx(ButtonGroupSeparator, {}),
                            /* @__PURE__ */ jsxs(Tooltip, { children: [
                              /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: quickNavButton }),
                              /* @__PURE__ */ jsx(TooltipContent, { children: title })
                            ] })
                          ] }, `${group}-${index}`)
                        );
                      }
                    ) })
                  ]
                }
              ) : /* @__PURE__ */ jsxs("div", { className: "tw:flex tw:items-center tw:border-b tw:px-3 tw:py-1", children: [
                /* @__PURE__ */ jsxs(Tooltip, { children: [
                  /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
                    Button,
                    {
                      variant: "ghost",
                      size: "sm",
                      onClick: viewMode === "verses" ? handleBackToChapters : handleBackToBooks,
                      className: "tw:me-2 tw:h-6 tw:w-6 tw:p-0",
                      tabIndex: -1,
                      "aria-label": backLabel,
                      children: direction === "ltr" ? /* @__PURE__ */ jsx(ArrowLeft, { className: "tw:h-4 tw:w-4" }) : /* @__PURE__ */ jsx(ArrowRight, { className: "tw:h-4 tw:w-4" })
                    }
                  ) }),
                  /* @__PURE__ */ jsx(TooltipContent, { children: backLabel })
                ] }),
                viewMode === "chapters" && selectedBookForChaptersView && /* @__PURE__ */ jsx("span", { tabIndex: -1, className: "tw:text-sm tw:font-medium", children: getLocalizedBookName(selectedBookForChaptersView, localizedBookNames) }),
                viewMode === "verses" && selectedBookForVersesView && selectedChapterForVersesView !== void 0 && /* @__PURE__ */ jsx("span", { tabIndex: -1, className: "tw:text-sm tw:font-medium", children: `${getLocalizedBookName(selectedBookForVersesView, localizedBookNames)} ${selectedChapterForVersesView}` }),
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    tabIndex: -1,
                    className: "tw:ms-auto tw:text-sm tw:font-medium tw:text-muted-foreground",
                    children: viewMode === "verses" ? selectVerseTitle : selectChapterTitle
                  }
                )
              ] }),
              !isCommandListHidden && /* @__PURE__ */ jsxs(CommandList, { ref: commandListRef, children: [
                viewMode === "books" && /* @__PURE__ */ jsxs(Fragment$1, { children: [
                  !topMatch && Object.entries(filteredBooksByType).map(([type, books]) => {
                    if (books.length === 0) return void 0;
                    return (
                      // We are mapping over filteredBooksByType, which uses Section as key type
                      // eslint-disable-next-line no-type-assertion/no-type-assertion
                      /* @__PURE__ */ jsx(CommandGroup, { heading: getSectionLabel(type), children: books.map((bookId) => /* @__PURE__ */ jsx(
                        BookItem,
                        {
                          bookId,
                          onSelect: (selectedBookId) => handleBookSelect(selectedBookId),
                          section: getSectionForBook(bookId),
                          commandValue: generateCommandValue(bookId),
                          suppressKeyboardHighlight: isHeaderControlFocused,
                          ref: bookId === scrRef.book ? selectedBookItemRef : void 0,
                          localizedBookNames,
                          disabled: isBookDisabled(bookId),
                          dimmedReason: booksOutsideProject.has(bookId) ? bookNotInProjectLabel : void 0,
                          dimmedDescription: booksOutsideProject.has(bookId) ? getBookNotInProjectDescription(bookId) : void 0
                        },
                        bookId
                      )) }, type)
                    );
                  }),
                  topMatch && topMatchReference && /* @__PURE__ */ jsx(CommandGroup, { children: /* @__PURE__ */ jsxs(
                    CommandItem,
                    {
                      value: TOP_MATCH_ITEM_VALUE,
                      onSelect: handleTopMatchSelect,
                      disabled: !!disableReferencesUpTo && isVerseBefore(
                        topMatchReference.book,
                        topMatchReference.chapterNum,
                        topMatchReference.verseNum,
                        disableReferencesUpTo
                      ),
                      className: "tw:font-semibold tw:text-primary tw:hover:bg-muted tw:[&>svg:last-child]:hidden",
                      children: [
                        /* @__PURE__ */ jsx("span", { className: "tw:min-w-0 tw:flex-1", children: formatScrRef(
                          topMatchReference,
                          getLocalizedBookName(topMatch.book, localizedBookNames)
                        ) }),
                        /* @__PURE__ */ jsx("span", { className: "tw:ms-2 tw:shrink-0 tw:text-xs tw:text-muted-foreground", children: getLocalizedBookId(topMatch.book, localizedBookNames) })
                      ]
                    },
                    "top-match"
                  ) }),
                  topMatch && shouldShowVerseGridForTopMatch && topMatch.chapterNum && getEndVerse && // No heading over this grid: the top-match row sits directly above it and
                  // already names the book and the reference the grid is refining, so a
                  // heading here only repeated the book back to the user one line later. The
                  // dedicated verses view still carries one, because there it is the only
                  // thing naming the book.
                  /* @__PURE__ */ jsx(
                    VerseGrid,
                    {
                      bookId: topMatch.book,
                      chapterNum: topMatch.chapterNum,
                      endVerse: getEndVerse(topMatch.book, topMatch.chapterNum),
                      scrRef,
                      onVerseSelect: handleVerseSelect,
                      setVerseRef,
                      isVerseDisabled: makeIsVerseDisabled(topMatch.book, topMatch.chapterNum),
                      suppressKeyboardHighlight: isHeaderControlFocused,
                      className: "tw:px-4 tw:pb-4"
                    }
                  ),
                  topMatch && !shouldShowVerseGridForTopMatch && fetchEndChapter(topMatch.book) > 1 && // No heading here either, for the same reason as the verse preview above:
                  // the top-match row directly above already names the book.
                  /* @__PURE__ */ jsx(
                    ChapterGrid,
                    {
                      bookId: topMatch.book,
                      scrRef,
                      onChapterSelect: handleChapterSelect,
                      setChapterRef,
                      isChapterDimmed: doesChapterMatch,
                      isChapterDisabled: makeIsChapterDisabled(topMatch.book),
                      suppressKeyboardHighlight: isHeaderControlFocused,
                      className: "tw:px-4 tw:pb-4"
                    }
                  )
                ] }),
                viewMode === "chapters" && selectedBookForChaptersView && /* @__PURE__ */ jsx(
                  ChapterGrid,
                  {
                    bookId: selectedBookForChaptersView,
                    scrRef,
                    onChapterSelect: handleChapterSelect,
                    setChapterRef,
                    isChapterDisabled: makeIsChapterDisabled(selectedBookForChaptersView),
                    className: "tw:p-4"
                  }
                ),
                viewMode === "verses" && selectedBookForVersesView && selectedChapterForVersesView !== void 0 && getEndVerse && /* @__PURE__ */ jsx(
                  VerseGrid,
                  {
                    bookId: selectedBookForVersesView,
                    chapterNum: selectedChapterForVersesView,
                    endVerse: getEndVerse(
                      selectedBookForVersesView,
                      selectedChapterForVersesView
                    ),
                    scrRef,
                    onVerseSelect: handleVerseSelect,
                    setVerseRef,
                    isVerseDisabled: makeIsVerseDisabled(
                      selectedBookForVersesView,
                      selectedChapterForVersesView
                    ),
                    className: "tw:p-4"
                  }
                )
              ] }),
              canShowMoreBooksToggle && /* @__PURE__ */ jsx("div", { className: "tw:border-t tw:p-1", children: /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "tw:w-full tw:justify-start tw:font-normal",
                  onClick: () => setIsShowingMoreBooks((wasShowing) => !wasShowing),
                  children: isShowingMoreBooks ? showProjectBooksOnlyLabel : showMoreBooksLabel
                }
              ) })
            ]
          }
        ) })
      }
    )
  ] });
}
const BOOK_CHAPTER_CONTROL_STRING_KEYS = Object.freeze([
  "%scripture_section_ot_long%",
  "%scripture_section_nt_long%",
  "%scripture_section_dc_long%",
  "%scripture_section_extra_long%",
  "%history_recent%",
  "%history_recentSearches_ariaLabel%",
  "%webView_bookChapterControl_bookNotInProject%",
  "%webView_bookChapterControl_bookNotInProjectDescription%",
  "%webView_bookChapterControl_selectChapter%",
  "%webView_bookChapterControl_selectVerse%",
  "%webView_bookChapterControl_showMoreBooks%",
  "%webView_bookChapterControl_showProjectBooksOnly%",
  "%webView_bookChapterControl_previousChapter%",
  "%webView_bookChapterControl_nextChapter%",
  "%webView_bookChapterControl_previousVerse%",
  "%webView_bookChapterControl_nextVerse%",
  "%webView_bookChapterControl_backToBooks%",
  "%webView_bookChapterControl_backToChapters%"
]);
function getOptionLabelDefault(option) {
  if (typeof option === "string") {
    return option;
  }
  if (typeof option === "number") {
    return option.toString();
  }
  return option.label;
}
function ComboBox({
  id,
  options = [],
  className,
  buttonClassName,
  popoverContentClassName,
  popoverContentStyle,
  value,
  onChange = () => {
  },
  getOptionLabel = getOptionLabelDefault,
  getButtonLabel,
  icon = void 0,
  buttonPlaceholder = "",
  textPlaceholder = "",
  commandEmptyMessage = "No option found",
  buttonVariant = "outline",
  alignDropDown = "start",
  isDisabled = false,
  ariaLabel,
  ...props
}) {
  const [open, setOpen] = useState(false);
  const buttonLabel = getButtonLabel ?? getOptionLabel;
  const isGroupedOptions = (groupOptions) => {
    return Boolean(
      groupOptions.length > 0 && typeof groupOptions[0] === "object" && "options" in groupOptions[0]
    );
  };
  const renderCommandItem = (option, groupHeading) => {
    const optionLabel = getOptionLabel(option);
    const secondaryLabel = typeof option === "object" && "secondaryLabel" in option ? option.secondaryLabel : void 0;
    const key = `${groupHeading ?? ""}${optionLabel}${secondaryLabel ?? ""}`;
    return /* @__PURE__ */ jsxs(
      CommandItem,
      {
        value: optionLabel,
        onSelect: () => {
          onChange(option);
          setOpen(false);
        },
        className: "tw:gap-1.5!",
        children: [
          /* @__PURE__ */ jsx(
            Check,
            {
              className: cn("tw:h-4 tw:w-4 tw:shrink-0", {
                "tw:opacity-0": !value || getOptionLabel(value) !== optionLabel
              })
            }
          ),
          /* @__PURE__ */ jsxs("span", { className: "tw:flex-1 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap", children: [
            optionLabel,
            secondaryLabel && /* @__PURE__ */ jsxs("span", { className: "tw:text-muted-foreground", children: [
              " · ",
              secondaryLabel
            ] })
          ] })
        ]
      },
      key
    );
  };
  return /* @__PURE__ */ jsxs(Popover, { open, onOpenChange: setOpen, ...props, children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
      Button,
      {
        variant: buttonVariant,
        role: "combobox",
        "aria-expanded": open,
        "aria-label": ariaLabel,
        id,
        className: cn(
          "tw:flex tw:w-[200px] tw:items-center tw:justify-between tw:overflow-hidden",
          buttonClassName ?? className
        ),
        disabled: isDisabled,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:overflow-hidden", children: [
            icon && /* @__PURE__ */ jsx("div", { className: "tw:shrink-0 tw:pe-2", children: icon }),
            /* @__PURE__ */ jsx(
              "span",
              {
                className: cn(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start"
                ),
                children: value ? buttonLabel(value) : buttonPlaceholder
              }
            )
          ] }),
          /* @__PURE__ */ jsx(ChevronDown, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(
      PopoverContent,
      {
        align: alignDropDown,
        className: cn("tw:w-[200px] tw:p-0", popoverContentClassName),
        style: popoverContentStyle,
        children: /* @__PURE__ */ jsxs(Command, { children: [
          /* @__PURE__ */ jsx(
            CommandInput,
            {
              placeholder: textPlaceholder,
              className: "tw:text-inherit",
              spaceSelectsHighlightedItem: true
            }
          ),
          /* @__PURE__ */ jsx(CommandEmpty, { children: commandEmptyMessage }),
          /* @__PURE__ */ jsx(CommandList, { children: isGroupedOptions(options) ? options.map((group) => /* @__PURE__ */ jsx(CommandGroup, { heading: group.groupHeading, children: group.options.map((option) => renderCommandItem(option, group.groupHeading)) }, group.groupHeading)) : /* @__PURE__ */ jsx(CommandGroup, { children: options.map((option) => renderCommandItem(option)) }) })
        ] })
      }
    )
  ] });
}
function ChapterRangeSelector({
  startChapter,
  endChapter,
  handleSelectStartChapter,
  handleSelectEndChapter,
  isDisabled = false,
  chapterCount
}) {
  const chapterOptions = useMemo(
    () => Array.from({ length: chapterCount }, (_, index) => index + 1),
    [chapterCount]
  );
  const onChangeStartChapter = (value) => {
    handleSelectStartChapter(value);
    if (value > endChapter) {
      handleSelectEndChapter(value);
    }
  };
  const onChangeEndChapter = (value) => {
    handleSelectEndChapter(value);
    if (value < startChapter) {
      handleSelectStartChapter(value);
    }
  };
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx(Label, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ jsx(
      ComboBox,
      {
        isDisabled,
        onChange: onChangeStartChapter,
        buttonClassName: "tw:me-2 tw:ms-2 tw:w-20",
        options: chapterOptions,
        getOptionLabel: (option) => option.toString(),
        value: startChapter
      },
      "start chapter"
    ),
    /* @__PURE__ */ jsx(Label, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ jsx(
      ComboBox,
      {
        isDisabled,
        onChange: onChangeEndChapter,
        buttonClassName: "tw:ms-2 tw:w-20",
        options: chapterOptions,
        getOptionLabel: (option) => option.toString(),
        value: endChapter
      },
      "end chapter"
    )
  ] });
}
var BookSelectionMode = /* @__PURE__ */ ((BookSelectionMode2) => {
  BookSelectionMode2["CurrentBook"] = "current book";
  BookSelectionMode2["ChooseBooks"] = "choose books";
  return BookSelectionMode2;
})(BookSelectionMode || {});
((BookSelectionMode2) => {
  BookSelectionMode2.CURRENT_BOOK = "current book";
  BookSelectionMode2.CHOOSE_BOOKS = "choose books";
})(BookSelectionMode || (BookSelectionMode = {}));
const BOOK_SELECTOR_STRING_KEYS = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]);
const localizeString$4 = (strings, key) => {
  return strings[key] ?? key;
};
function BookSelector({
  handleBookSelectionModeChange,
  currentBookName,
  onSelectBooks,
  selectedBookIds,
  chapterCount,
  endChapter,
  handleSelectEndChapter,
  startChapter,
  handleSelectStartChapter,
  localizedStrings
}) {
  const currentBookText = localizeString$4(localizedStrings, "%webView_bookSelector_currentBook%");
  const chooseText = localizeString$4(localizedStrings, "%webView_bookSelector_choose%");
  const chooseBooksText = localizeString$4(localizedStrings, "%webView_bookSelector_chooseBooks%");
  const [bookSelectionMode, setBookSelectionMode] = useState(
    "current book"
    /* CurrentBook */
  );
  const onSelectionModeChange = (newMode) => {
    setBookSelectionMode(newMode);
    handleBookSelectionModeChange(newMode);
  };
  return /* @__PURE__ */ jsx(
    RadioGroup,
    {
      className: "pr-twp tw:flex",
      value: bookSelectionMode,
      onValueChange: (value) => onSelectionModeChange(value),
      children: /* @__PURE__ */ jsxs("div", { className: "tw:flex tw:w-full tw:flex-col tw:gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "tw:grid tw:grid-cols-[25%_25%_50%]", children: [
          /* @__PURE__ */ jsxs("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ jsx(RadioGroupItem, {
              value: "current book"
              /* CurrentBook */
            }),
            /* @__PURE__ */ jsx(Label, { className: "tw:ms-1", children: currentBookText })
          ] }),
          /* @__PURE__ */ jsx(Label, { className: "tw:flex tw:items-center", children: currentBookName }),
          /* @__PURE__ */ jsx("div", { className: "tw:flex tw:items-center tw:justify-end", children: /* @__PURE__ */ jsx(
            ChapterRangeSelector,
            {
              isDisabled: bookSelectionMode === "choose books",
              handleSelectStartChapter,
              handleSelectEndChapter,
              chapterCount,
              startChapter,
              endChapter
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "tw:grid tw:grid-cols-[25%_50%_25%]", children: [
          /* @__PURE__ */ jsxs("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ jsx(RadioGroupItem, {
              value: "choose books"
              /* ChooseBooks */
            }),
            /* @__PURE__ */ jsx(Label, { className: "tw:ms-1", children: chooseBooksText })
          ] }),
          /* @__PURE__ */ jsx(Label, { className: "tw:flex tw:items-center", children: selectedBookIds.map((bookId) => Canon.bookIdToEnglishName(bookId)).join(", ") }),
          /* @__PURE__ */ jsx(
            Button,
            {
              disabled: bookSelectionMode === "current book",
              onClick: () => onSelectBooks(),
              children: chooseText
            }
          )
        ] })
      ] })
    }
  );
}
const r$3 = createContext(null);
function t(n2, e) {
  return { getTheme: function() {
    return null != e ? e : null;
  } };
}
function o$1() {
  const n2 = useContext(r$3);
  return null == n2 && function(n3, ...e) {
    const r2 = new URL("https://lexical.dev/docs/error"), t2 = new URLSearchParams();
    t2.append("code", n3);
    for (const n4 of e) t2.append("v", n4);
    throw r2.search = t2.toString(), Error(`Minified Lexical error #${n3}; visit ${r2.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
  }(8), n2;
}
const m$1 = "undefined" != typeof window && void 0 !== window.document && void 0 !== window.document.createElement, u$1 = m$1 ? useLayoutEffect : useEffect, p$1 = { tag: HISTORY_MERGE_TAG };
function f$2({ initialConfig: a2, children: c2 }) {
  const l = useMemo(() => {
    const { theme: t$1, namespace: c3, nodes: l2, onError: d, editorState: s2, html: u2 } = a2, f2 = t(null, t$1), E2 = createEditor({ editable: a2.editable, html: u2, namespace: c3, nodes: l2, onError: (e) => d(e, E2), theme: t$1 });
    return function(e, t2) {
      if (null === t2) return;
      if (void 0 === t2) e.update(() => {
        const t3 = $getRoot();
        if (t3.isEmpty()) {
          const o2 = $createParagraphNode();
          t3.append(o2);
          const n2 = m$1 ? document.activeElement : null;
          (null !== $getSelection() || null !== n2 && n2 === e.getRootElement()) && o2.select();
        }
      }, p$1);
      else if (null !== t2) switch (typeof t2) {
        case "string": {
          const o2 = e.parseEditorState(t2);
          e.setEditorState(o2, p$1);
          break;
        }
        case "object":
          e.setEditorState(t2, p$1);
          break;
        case "function":
          e.update(() => {
            $getRoot().isEmpty() && t2(e);
          }, p$1);
      }
    }(E2, s2), [E2, f2];
  }, []);
  return u$1(() => {
    const e = a2.editable, [t2] = l;
    t2.setEditable(void 0 === e || e);
  }, []), jsx(r$3.Provider, { value: l, children: c2 });
}
const r$2 = "undefined" != typeof window && void 0 !== window.document && void 0 !== window.document.createElement ? useLayoutEffect : useEffect;
function n$1({ ignoreHistoryMergeTagChange: o2 = true, ignoreSelectionChange: i2 = false, onChange: n2 }) {
  const [a2] = o$1();
  return r$2(() => {
    if (n2) return a2.registerUpdateListener(({ editorState: e, dirtyElements: r2, dirtyLeaves: d, prevEditorState: s2, tags: c2 }) => {
      i2 && 0 === r2.size && 0 === d.size || o2 && c2.has(HISTORY_MERGE_TAG) || s2.isEmpty() || n2(e, a2, c2);
    });
  }, [a2, o2, i2, n2]), null;
}
const editorTheme = {
  ltr: "tw:text-left",
  rtl: "tw:text-right",
  heading: {
    h1: "tw:scroll-m-20 tw:text-4xl tw:font-extrabold tw:tracking-tight tw:lg:text-5xl",
    h2: "tw:scroll-m-20 tw:border-b tw:pb-2 tw:text-3xl tw:font-semibold tw:tracking-tight tw:first:mt-0",
    h3: "tw:scroll-m-20 tw:text-2xl tw:font-semibold tw:tracking-tight",
    h4: "tw:scroll-m-20 tw:text-xl tw:font-semibold tw:tracking-tight",
    h5: "tw:scroll-m-20 tw:text-lg tw:font-semibold tw:tracking-tight",
    h6: "tw:scroll-m-20 tw:text-base tw:font-semibold tw:tracking-tight"
  },
  paragraph: "tw:outline-hidden",
  quote: "tw:mt-6 tw:border-l-2 tw:pl-6 tw:italic",
  link: "tw:text-blue-600 tw:hover:underline tw:hover:cursor-pointer",
  list: {
    checklist: "tw:relative",
    listitem: "tw:mx-8",
    listitemChecked: 'tw:relative tw:mx-2 tw:px-6 tw:list-none tw:outline-hidden tw:line-through tw:before:content-[""] tw:before:w-4 tw:before:h-4 tw:before:top-0.5 tw:before:left-0 tw:before:cursor-pointer tw:before:block tw:before:bg-cover tw:before:absolute tw:before:border tw:before:border-primary tw:before:rounded tw:before:bg-primary tw:before:bg-no-repeat tw:after:content-[""] tw:after:cursor-pointer tw:after:border-white tw:after:border-solid tw:after:absolute tw:after:block tw:after:top-[6px] tw:after:w-[3px] tw:after:left-[7px] tw:after:right-[7px] tw:after:h-[6px] tw:after:rotate-45 tw:after:border-r-2 tw:after:border-b-2 tw:after:border-l-0 tw:after:border-t-0',
    listitemUnchecked: 'tw:relative tw:mx-2 tw:px-6 tw:list-none tw:outline-hidden tw:before:content-[""] tw:before:w-4 tw:before:h-4 tw:before:top-0.5 tw:before:left-0 tw:before:cursor-pointer tw:before:block tw:before:bg-cover tw:before:absolute tw:before:border tw:before:border-primary tw:before:rounded',
    nested: {
      listitem: "tw:list-none tw:before:hidden tw:after:hidden"
    },
    ol: "tw:m-0 tw:p-0 tw:list-decimal tw:[&>li]:mt-2",
    olDepth: [
      "tw:list-outside tw:!list-decimal",
      "tw:list-outside tw:!list-[upper-roman]",
      "tw:list-outside tw:!list-[lower-roman]",
      "tw:list-outside tw:!list-[upper-alpha]",
      "tw:list-outside tw:!list-[lower-alpha]"
    ],
    ul: "tw:m-0 tw:p-0 tw:list-outside tw:[&>li]:mt-2",
    ulDepth: [
      "tw:list-outside tw:!list-disc",
      "tw:list-outside tw:!list-disc",
      "tw:list-outside tw:!list-disc",
      "tw:list-outside tw:!list-disc",
      "tw:list-outside tw:!list-disc"
    ]
  },
  hashtag: "tw:text-blue-600 tw:bg-blue-100 tw:rounded-md tw:px-1",
  text: {
    bold: "tw:font-bold",
    code: "tw:bg-gray-100 tw:p-1 tw:rounded-md",
    italic: "tw:italic",
    strikethrough: "tw:line-through",
    subscript: "tw:sub",
    superscript: "tw:sup",
    underline: "tw:underline",
    underlineStrikethrough: "tw:underline tw:line-through"
  },
  image: "tw:relative tw:inline-block tw:user-select-none tw:cursor-default editor-image",
  inlineImage: "tw:relative tw:inline-block tw:user-select-none tw:cursor-default inline-editor-image",
  keyword: "tw:text-purple-900 tw:font-bold",
  code: "EditorTheme__code",
  codeHighlight: {
    atrule: "EditorTheme__tokenAttr",
    attr: "EditorTheme__tokenAttr",
    boolean: "EditorTheme__tokenProperty",
    builtin: "EditorTheme__tokenSelector",
    cdata: "EditorTheme__tokenComment",
    char: "EditorTheme__tokenSelector",
    class: "EditorTheme__tokenFunction",
    "class-name": "EditorTheme__tokenFunction",
    comment: "EditorTheme__tokenComment",
    constant: "EditorTheme__tokenProperty",
    deleted: "EditorTheme__tokenProperty",
    doctype: "EditorTheme__tokenComment",
    entity: "EditorTheme__tokenOperator",
    function: "EditorTheme__tokenFunction",
    important: "EditorTheme__tokenVariable",
    inserted: "EditorTheme__tokenSelector",
    keyword: "EditorTheme__tokenAttr",
    namespace: "EditorTheme__tokenVariable",
    number: "EditorTheme__tokenProperty",
    operator: "EditorTheme__tokenOperator",
    prolog: "EditorTheme__tokenComment",
    property: "EditorTheme__tokenProperty",
    punctuation: "EditorTheme__tokenPunctuation",
    regex: "EditorTheme__tokenVariable",
    selector: "EditorTheme__tokenSelector",
    string: "EditorTheme__tokenSelector",
    symbol: "EditorTheme__tokenProperty",
    tag: "EditorTheme__tokenProperty",
    url: "EditorTheme__tokenOperator",
    variable: "EditorTheme__tokenVariable"
  },
  characterLimit: "tw:!bg-destructive/50",
  table: "EditorTheme__table tw:w-fit tw:overflow-scroll tw:border-collapse",
  tableCell: "EditorTheme__tableCell tw:w-24 tw:relative tw:border tw:px-4 tw:py-2 tw:text-left tw:[&[align=center]]:text-center tw:[&[align=right]]:text-right",
  tableCellActionButton: "EditorTheme__tableCellActionButton tw:bg-background tw:block tw:border-0 tw:rounded-2xl tw:w-5 tw:h-5 tw:text-foreground tw:cursor-pointer",
  tableCellActionButtonContainer: "EditorTheme__tableCellActionButtonContainer tw:block tw:right-1 tw:top-1.5 tw:absolute tw:z-10 tw:w-5 tw:h-5",
  tableCellEditing: "EditorTheme__tableCellEditing tw:rounded-sm tw:shadow-sm",
  tableCellHeader: "EditorTheme__tableCellHeader tw:bg-muted tw:border tw:px-4 tw:py-2 tw:text-left tw:font-bold tw:[&[align=center]]:text-center tw:[&[align=right]]:text-right",
  tableCellPrimarySelected: "EditorTheme__tableCellPrimarySelected tw:border tw:border-primary tw:border-solid tw:block tw:h-[calc(100%-2px)] tw:w-[calc(100%-2px)] tw:absolute tw:-left-[1px] tw:-top-[1px] tw:z-10 ",
  tableCellResizer: "EditorTheme__tableCellResizer tw:absolute tw:-right-1 tw:h-full tw:w-2 tw:cursor-ew-resize tw:z-10 tw:top-0",
  tableCellSelected: "EditorTheme__tableCellSelected tw:bg-muted",
  tableCellSortedIndicator: "EditorTheme__tableCellSortedIndicator tw:block tw:opacity-50 tw:absolute tw:bottom-0 tw:left-0 tw:w-full tw:h-1 tw:bg-muted",
  tableResizeRuler: "EditorTheme__tableCellResizeRuler tw:block tw:absolute tw:w-[1px] tw:h-full tw:bg-primary tw:top-0",
  tableRowStriping: "EditorTheme__tableRowStriping tw:m-0 tw:border-t tw:p-0 tw:even:bg-muted",
  tableSelected: "EditorTheme__tableSelected tw:ring-2 tw:ring-primary tw:ring-offset-2",
  tableSelection: "EditorTheme__tableSelection tw:bg-transparent",
  layoutItem: "tw:border tw:border-dashed tw:px-4 tw:py-2",
  layoutContainer: "tw:grid tw:gap-2.5 tw:my-2.5 tw:mx-0",
  autocomplete: "tw:text-muted-foreground",
  blockCursor: "",
  embedBlock: {
    base: "tw:user-select-none",
    focus: "tw:ring-2 tw:ring-primary tw:ring-offset-2"
  },
  hr: 'tw:p-0.5 tw:border-none tw:my-1 tw:mx-0 tw:cursor-pointer tw:after:content-[""] tw:after:block tw:after:h-0.5 tw:after:bg-muted tw:selected:ring-2 tw:selected:ring-primary tw:selected:ring-offset-2 tw:selected:user-select-none',
  indent: "[--lexical-indent-base-value:40px]",
  mark: "",
  markOverlap: ""
};
const nodes = [
  HeadingNode,
  ParagraphNode,
  TextNode,
  QuoteNode
];
const ErrorBoundaryContext = createContext(null);
const initialState = {
  didCatch: false,
  error: null
};
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.resetErrorBoundary = this.resetErrorBoundary.bind(this);
    this.state = initialState;
  }
  static getDerivedStateFromError(error) {
    return {
      didCatch: true,
      error
    };
  }
  resetErrorBoundary() {
    const {
      error
    } = this.state;
    if (error !== null) {
      var _this$props$onReset, _this$props;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      (_this$props$onReset = (_this$props = this.props).onReset) === null || _this$props$onReset === void 0 ? void 0 : _this$props$onReset.call(_this$props, {
        args,
        reason: "imperative-api"
      });
      this.setState(initialState);
    }
  }
  componentDidCatch(error, info) {
    var _this$props$onError, _this$props2;
    (_this$props$onError = (_this$props2 = this.props).onError) === null || _this$props$onError === void 0 ? void 0 : _this$props$onError.call(_this$props2, error, info);
  }
  componentDidUpdate(prevProps, prevState) {
    const {
      didCatch
    } = this.state;
    const {
      resetKeys
    } = this.props;
    if (didCatch && prevState.error !== null && hasArrayChanged(prevProps.resetKeys, resetKeys)) {
      var _this$props$onReset2, _this$props3;
      (_this$props$onReset2 = (_this$props3 = this.props).onReset) === null || _this$props$onReset2 === void 0 ? void 0 : _this$props$onReset2.call(_this$props3, {
        next: resetKeys,
        prev: prevProps.resetKeys,
        reason: "keys"
      });
      this.setState(initialState);
    }
  }
  render() {
    const {
      children,
      fallbackRender,
      FallbackComponent,
      fallback
    } = this.props;
    const {
      didCatch,
      error
    } = this.state;
    let childToRender = children;
    if (didCatch) {
      const props = {
        error,
        resetErrorBoundary: this.resetErrorBoundary
      };
      if (typeof fallbackRender === "function") {
        childToRender = fallbackRender(props);
      } else if (FallbackComponent) {
        childToRender = createElement(FallbackComponent, props);
      } else if (fallback !== void 0) {
        childToRender = fallback;
      } else {
        throw error;
      }
    }
    return createElement(ErrorBoundaryContext.Provider, {
      value: {
        didCatch,
        error,
        resetErrorBoundary: this.resetErrorBoundary
      }
    }, childToRender);
  }
}
function hasArrayChanged() {
  let a2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
  let b2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return a2.length !== b2.length || a2.some((item, index) => !Object.is(item, b2[index]));
}
function n({ children: n2, onError: e }) {
  return jsx(ErrorBoundary, { fallback: jsx("div", { style: { border: "1px solid #f00", color: "#f00", padding: "8px" }, children: "An error was thrown." }), onError: e, children: n2 });
}
const c$1 = "undefined" != typeof window && void 0 !== window.document && void 0 !== window.document.createElement ? useLayoutEffect : useEffect;
function u(e) {
  return { initialValueFn: () => e.isEditable(), subscribe: (n2) => e.registerEditableListener(n2) };
}
function a() {
  return function(n2) {
    const [t2] = o$1(), u2 = useMemo(() => n2(t2), [t2, n2]), [a2, l] = useState(() => u2.initialValueFn()), d = useRef(a2);
    return c$1(() => {
      const { initialValueFn: e, subscribe: n3 } = u2, t3 = e();
      return d.current !== t3 && (d.current = t3, l(t3)), n3((e2) => {
        d.current = e2, l(e2);
      });
    }, [u2, n2]), a2;
  }(u);
}
function B$1(e, t2) {
  const n2 = e.getRootElement();
  if (null === n2) return [];
  const o2 = n2.getBoundingClientRect(), l = getComputedStyle(n2), r2 = parseFloat(l.paddingLeft) + parseFloat(l.paddingRight), s2 = Array.from(t2.getClientRects());
  let i2, c2 = s2.length;
  s2.sort((e2, t3) => {
    const n3 = e2.top - t3.top;
    return Math.abs(n3) <= 3 ? e2.left - t3.left : n3;
  });
  for (let e2 = 0; e2 < c2; e2++) {
    const t3 = s2[e2], n3 = i2 && i2.top <= t3.top && i2.top + i2.height > t3.top && i2.left + i2.width > t3.left, l2 = t3.width + r2 === o2.width;
    n3 || l2 ? (s2.splice(e2--, 1), c2--) : i2 = t3;
  }
  return s2;
}
function k(t2, ...e) {
  const n2 = new URL("https://lexical.dev/docs/error"), o2 = new URLSearchParams();
  o2.append("code", t2);
  for (const t3 of e) o2.append("v", t3);
  throw n2.search = o2.toString(), Error(`Minified Lexical error #${t2}; visit ${n2.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const $ = "undefined" != typeof window && void 0 !== window.document && void 0 !== window.document.createElement, I = $ && "documentMode" in document ? document.documentMode : null;
!(!$ || !("InputEvent" in window) || I) && "getTargetRanges" in new window.InputEvent("input");
function G(t2) {
  return `${t2}px`;
}
const q$1 = { attributes: true, characterData: true, childList: true, subtree: true };
function J(e, n2, o2) {
  let r2 = null, i2 = null, l = null, s2 = [];
  const u2 = document.createElement("div");
  function c2() {
    null === r2 && k(182), null === i2 && k(183);
    const { left: t2, top: l2 } = i2.getBoundingClientRect(), c3 = B$1(e, n2);
    var a3, f3;
    u2.isConnected || (f3 = u2, (a3 = i2).insertBefore(f3, a3.firstChild));
    let d = false;
    for (let e2 = 0; e2 < c3.length; e2++) {
      const n3 = c3[e2], o3 = s2[e2] || document.createElement("div"), r3 = o3.style;
      "absolute" !== r3.position && (r3.position = "absolute", d = true);
      const i3 = G(n3.left - t2);
      r3.left !== i3 && (r3.left = i3, d = true);
      const a4 = G(n3.top - l2);
      r3.top !== a4 && (o3.style.top = a4, d = true);
      const f4 = G(n3.width);
      r3.width !== f4 && (o3.style.width = f4, d = true);
      const g2 = G(n3.height);
      r3.height !== g2 && (o3.style.height = g2, d = true), o3.parentNode !== u2 && (u2.append(o3), d = true), s2[e2] = o3;
    }
    for (; s2.length > c3.length; ) s2.pop();
    d && o2(s2);
  }
  function a2() {
    i2 = null, r2 = null, null !== l && l.disconnect(), l = null, u2.remove();
    for (const t2 of s2) t2.remove();
    s2 = [];
  }
  u2.style.position = "relative";
  const f2 = e.registerRootListener(function n3() {
    const o3 = e.getRootElement();
    if (null === o3) return a2();
    const s3 = o3.parentElement;
    if (!isHTMLElement(s3)) return a2();
    a2(), r2 = o3, i2 = s3, l = new MutationObserver((t2) => {
      const o4 = e.getRootElement(), l2 = o4 && o4.parentElement;
      if (o4 !== r2 || l2 !== i2) return n3();
      for (const e2 of t2) if (!u2.contains(e2.target)) return c2();
    }), l.observe(s3, q$1), c2();
  });
  return () => {
    f2(), a2();
  };
}
function Q$1(t2, e, n2) {
  if ("text" !== t2.type && $isElementNode(e)) {
    const o2 = e.getDOMSlot(n2);
    return [o2.element, o2.getFirstChildOffset() + t2.offset];
  }
  return [getDOMTextNode(n2) || n2, t2.offset];
}
function X$1(t2) {
  for (const e of t2) {
    const t3 = e.style;
    "Highlight" !== t3.background && (t3.background = "Highlight"), "HighlightText" !== t3.color && (t3.color = "HighlightText"), t3.marginTop !== G(-1.5) && (t3.marginTop = G(-1.5)), t3.paddingTop !== G(4) && (t3.paddingTop = G(4)), t3.paddingBottom !== G(0) && (t3.paddingBottom = G(0));
  }
}
function Y$1(t2, r2 = X$1) {
  let i2 = null, l = null, s2 = null, u2 = null, c2 = null, a2 = null, f2 = () => {
  };
  function d(e) {
    e.read(() => {
      const e2 = $getSelection();
      if (!$isRangeSelection(e2)) return i2 = null, s2 = null, u2 = null, a2 = null, f2(), void (f2 = () => {
      });
      const [d2, g2] = function(t3) {
        const e3 = t3.getStartEndPoints();
        return t3.isBackward() ? [e3[1], e3[0]] : e3;
      }(e2), p2 = d2.getNode(), m2 = p2.getKey(), h = d2.offset, v2 = g2.getNode(), y2 = v2.getKey(), w2 = g2.offset, x2 = t2.getElementByKey(m2), E2 = t2.getElementByKey(y2), S = null === i2 || x2 !== l || h !== s2 || m2 !== i2.getKey(), C = null === u2 || E2 !== c2 || w2 !== a2 || y2 !== u2.getKey();
      if ((S || C) && null !== x2 && null !== E2) {
        const e3 = function(t3, e4, n2, o2, r3, i3, l2) {
          const s3 = (t3._window ? t3._window.document : document).createRange();
          return s3.setStart(...Q$1(e4, n2, o2)), s3.setEnd(...Q$1(r3, i3, l2)), s3;
        }(t2, d2, p2, x2, g2, v2, E2);
        f2(), f2 = J(t2, e3, r2);
      }
      i2 = p2, l = x2, s2 = h, u2 = v2, c2 = E2, a2 = w2;
    });
  }
  return d(t2.getEditorState()), mergeRegister(t2.registerUpdateListener(({ editorState: t3 }) => d(t3)), () => {
    f2();
  });
}
function Z(t2, e) {
  let n2 = null;
  const o2 = () => {
    const o3 = getSelection(), r2 = o3 && o3.anchorNode, i2 = t2.getRootElement();
    null !== r2 && null !== i2 && i2.contains(r2) ? null !== n2 && (n2(), n2 = null) : null === n2 && (n2 = Y$1(t2, e));
  };
  return t2.registerRootListener((t3) => {
    if (t3) {
      const e2 = t3.ownerDocument;
      return e2.addEventListener("selectionchange", o2), o2(), () => {
        null !== n2 && n2(), e2.removeEventListener("selectionchange", o2);
      };
    }
  });
}
function Ct$1(t2) {
  const e = $findMatchingParent(t2, (t3) => $isElementNode(t3) && !t3.isInline());
  return $isElementNode(e) || k(4, t2.__key), e;
}
function bt(t2) {
  const e = $getSelection() || $getPreviousSelection();
  let r2;
  if ($isRangeSelection(e)) r2 = $caretFromPoint(e.focus, "next");
  else {
    if (null != e) {
      const t3 = e.getNodes(), n2 = t3[t3.length - 1];
      n2 && (r2 = $getSiblingCaret(n2, "next"));
    }
    r2 = r2 || $getChildCaret($getRoot(), "previous").getFlipped().insert($createParagraphNode());
  }
  const i2 = Lt$1(t2, r2), s2 = $getAdjacentChildCaret(i2), u2 = $isChildCaret(s2) ? $normalizeCaret(s2) : i2;
  return $setSelectionFromCaretRange($getCollapsedCaretRange(u2)), t2.getLatest();
}
function Lt$1(t2, e, n2) {
  let o2 = $getCaretInDirection(e, "next");
  for (let t3 = o2; t3; t3 = $splitAtPointCaretNext(t3, n2)) o2 = t3;
  return $isTextPointCaret(o2) && k(283), o2.insert(t2.isInline() ? $createParagraphNode().append(t2) : t2), $getCaretInDirection($getSiblingCaret(t2.getLatest(), "next"), e.direction);
}
function Bt$1(t2) {
  const e = $getSelection();
  if (!$isRangeSelection(e)) return false;
  const i2 = /* @__PURE__ */ new Set(), l = e.getNodes();
  for (let e2 = 0; e2 < l.length; e2++) {
    const n2 = l[e2], o2 = n2.getKey();
    if (i2.has(o2)) continue;
    const u2 = $findMatchingParent(n2, (t3) => $isElementNode(t3) && !t3.isInline());
    if (null === u2) continue;
    const c2 = u2.getKey();
    u2.canIndent() && !i2.has(c2) && (i2.add(c2), t2(u2));
  }
  return i2.size > 0;
}
const q = Symbol.for("preact-signals");
function Q() {
  if (it > 1) return void it--;
  let t2, e = false;
  for (!function() {
    let t3 = nt;
    for (nt = void 0; void 0 !== t3; ) t3.S.v === t3.v && (t3.S.i = t3.i), t3 = t3.o;
  }(); void 0 !== tt; ) {
    let n2 = tt;
    for (tt = void 0, ot++; void 0 !== n2; ) {
      const i2 = n2.u;
      if (n2.u = void 0, n2.f &= -3, !(8 & n2.f) && ft(n2)) try {
        n2.c();
      } catch (n3) {
        e || (t2 = n3, e = true);
      }
      n2 = i2;
    }
  }
  if (ot = 0, it--, e) throw t2;
}
function X(t2) {
  if (it > 0) return t2();
  rt = ++st, it++;
  try {
    return t2();
  } finally {
    Q();
  }
}
let Y, tt;
function et(t2) {
  const e = Y;
  Y = void 0;
  try {
    return t2();
  } finally {
    Y = e;
  }
}
let nt, it = 0, ot = 0, st = 0, rt = 0, ct = 0;
function at(t2) {
  if (void 0 === Y) return;
  let e = t2.n;
  return void 0 === e || e.t !== Y ? (e = { i: 0, S: t2, p: Y.s, n: void 0, t: Y, e: void 0, x: void 0, r: e }, void 0 !== Y.s && (Y.s.n = e), Y.s = e, t2.n = e, 32 & Y.f && t2.S(e), e) : -1 === e.i ? (e.i = 0, void 0 !== e.n && (e.n.p = e.p, void 0 !== e.p && (e.p.n = e.n), e.p = Y.s, e.n = void 0, Y.s.n = e, Y.s = e), e) : void 0;
}
function dt(t2, e) {
  this.v = t2, this.i = 0, this.n = void 0, this.t = void 0, this.l = 0, this.W = null == e ? void 0 : e.watched, this.Z = null == e ? void 0 : e.unwatched, this.name = null == e ? void 0 : e.name;
}
function ut(t2, e) {
  return new dt(t2, e);
}
function ft(t2) {
  for (let e = t2.s; void 0 !== e; e = e.n) if (e.S.i !== e.i || !e.S.h() || e.S.i !== e.i) return true;
  return false;
}
function lt(t2) {
  for (let e = t2.s; void 0 !== e; e = e.n) {
    const n2 = e.S.n;
    if (void 0 !== n2 && (e.r = n2), e.S.n = e, e.i = -1, void 0 === e.n) {
      t2.s = e;
      break;
    }
  }
}
function ht(t2) {
  let e, n2 = t2.s;
  for (; void 0 !== n2; ) {
    const t3 = n2.p;
    -1 === n2.i ? (n2.S.U(n2), void 0 !== t3 && (t3.n = n2.n), void 0 !== n2.n && (n2.n.p = t3)) : e = n2, n2.S.n = n2.r, void 0 !== n2.r && (n2.r = void 0), n2 = t3;
  }
  t2.s = e;
}
function gt(t2, e) {
  dt.call(this, void 0), this.x = t2, this.s = void 0, this.g = ct - 1, this.f = 4, this.W = null == e ? void 0 : e.watched, this.Z = null == e ? void 0 : e.unwatched, this.name = null == e ? void 0 : e.name;
}
function pt(t2, e) {
  return new gt(t2, e);
}
function mt(t2) {
  const e = t2.m;
  if (t2.m = void 0, "function" == typeof e) {
    it++;
    const n2 = Y;
    Y = void 0;
    try {
      e();
    } catch (e2) {
      throw t2.f &= -2, t2.f |= 8, vt(t2), e2;
    } finally {
      Y = n2, Q();
    }
  }
}
function vt(t2) {
  for (let e = t2.s; void 0 !== e; e = e.n) e.S.U(e);
  t2.x = void 0, t2.s = void 0, mt(t2);
}
function xt(t2) {
  if (Y !== this) throw new Error("Out-of-order effect");
  ht(this), Y = t2, this.f &= -2, 8 & this.f && vt(this), Q();
}
function Et(t2, e) {
  this.x = t2, this.m = void 0, this.s = void 0, this.u = void 0, this.f = 32, this.name = null == e ? void 0 : e.name;
}
function yt(t2, e) {
  const n2 = new Et(t2, e);
  try {
    n2.c();
  } catch (t3) {
    throw n2.d(), t3;
  }
  const i2 = n2.d.bind(n2);
  return i2[Symbol.dispose] = i2, i2;
}
function St(t2, e = {}) {
  const n2 = {};
  for (const i2 in t2) {
    const o2 = e[i2], s2 = ut(void 0 === o2 ? t2[i2] : o2);
    n2[i2] = s2;
  }
  return n2;
}
dt.prototype.brand = q, dt.prototype.h = function() {
  return true;
}, dt.prototype.S = function(t2) {
  const e = this.t;
  e !== t2 && void 0 === t2.e && (t2.x = e, this.t = t2, void 0 !== e ? e.e = t2 : et(() => {
    var t3;
    null == (t3 = this.W) || t3.call(this);
  }));
}, dt.prototype.U = function(t2) {
  if (void 0 !== this.t) {
    const e = t2.e, n2 = t2.x;
    void 0 !== e && (e.x = n2, t2.e = void 0), void 0 !== n2 && (n2.e = e, t2.x = void 0), t2 === this.t && (this.t = n2, void 0 === n2 && et(() => {
      var t3;
      null == (t3 = this.Z) || t3.call(this);
    }));
  }
}, dt.prototype.subscribe = function(t2) {
  return yt(() => {
    const e = this.value, n2 = Y;
    Y = void 0;
    try {
      t2(e);
    } finally {
      Y = n2;
    }
  }, { name: "sub" });
}, dt.prototype.valueOf = function() {
  return this.value;
}, dt.prototype.toString = function() {
  return this.value + "";
}, dt.prototype.toJSON = function() {
  return this.value;
}, dt.prototype.peek = function() {
  const t2 = Y;
  Y = void 0;
  try {
    return this.value;
  } finally {
    Y = t2;
  }
}, Object.defineProperty(dt.prototype, "value", { get() {
  const t2 = at(this);
  return void 0 !== t2 && (t2.i = this.i), this.v;
}, set(t2) {
  if (t2 !== this.v) {
    if (ot > 100) throw new Error("Cycle detected");
    !function(t3) {
      0 !== it && 0 === ot && t3.l !== rt && (t3.l = rt, nt = { S: t3, v: t3.v, i: t3.i, o: nt });
    }(this), this.v = t2, this.i++, ct++, it++;
    try {
      for (let t3 = this.t; void 0 !== t3; t3 = t3.x) t3.t.N();
    } finally {
      Q();
    }
  }
} }), gt.prototype = new dt(), gt.prototype.h = function() {
  if (this.f &= -3, 1 & this.f) return false;
  if (32 == (36 & this.f)) return true;
  if (this.f &= -5, this.g === ct) return true;
  if (this.g = ct, this.f |= 1, this.i > 0 && !ft(this)) return this.f &= -2, true;
  const t2 = Y;
  try {
    lt(this), Y = this;
    const t3 = this.x();
    (16 & this.f || this.v !== t3 || 0 === this.i) && (this.v = t3, this.f &= -17, this.i++);
  } catch (t3) {
    this.v = t3, this.f |= 16, this.i++;
  }
  return Y = t2, ht(this), this.f &= -2, true;
}, gt.prototype.S = function(t2) {
  if (void 0 === this.t) {
    this.f |= 36;
    for (let t3 = this.s; void 0 !== t3; t3 = t3.n) t3.S.S(t3);
  }
  dt.prototype.S.call(this, t2);
}, gt.prototype.U = function(t2) {
  if (void 0 !== this.t && (dt.prototype.U.call(this, t2), void 0 === this.t)) {
    this.f &= -33;
    for (let t3 = this.s; void 0 !== t3; t3 = t3.n) t3.S.U(t3);
  }
}, gt.prototype.N = function() {
  if (!(2 & this.f)) {
    this.f |= 6;
    for (let t2 = this.t; void 0 !== t2; t2 = t2.x) t2.t.N();
  }
}, Object.defineProperty(gt.prototype, "value", { get() {
  if (1 & this.f) throw new Error("Cycle detected");
  const t2 = at(this);
  if (this.h(), void 0 !== t2 && (t2.i = this.i), 16 & this.f) throw this.v;
  return this.v;
} }), Et.prototype.c = function() {
  const t2 = this.S();
  try {
    if (8 & this.f) return;
    if (void 0 === this.x) return;
    const t3 = this.x();
    "function" == typeof t3 && (this.m = t3);
  } finally {
    t2();
  }
}, Et.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1, this.f &= -9, mt(this), lt(this), it++;
  const t2 = Y;
  return Y = this, xt.bind(this, t2);
}, Et.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.u = tt, tt = this);
}, Et.prototype.d = function() {
  this.f |= 8, 1 & this.f || vt(this);
}, Et.prototype.dispose = function() {
  this.d();
};
defineExtension({ build: (t2, e, n2) => St(e), config: safeCast({ defaultSelection: "rootEnd", disabled: false }), name: "@lexical/extension/AutoFocus", register(t2, e, n2) {
  const i2 = n2.getOutput();
  return yt(() => i2.disabled.value ? void 0 : t2.registerRootListener((e2) => {
    t2.focus(() => {
      const t3 = document.activeElement;
      null === e2 || null !== t3 && e2.contains(t3) || e2.focus({ preventScroll: true });
    }, { defaultSelection: i2.defaultSelection.peek() });
  }));
} });
function wt() {
  const t2 = $getRoot(), e = $getSelection(), n2 = $createParagraphNode();
  t2.clear(), t2.append(n2), null !== e && n2.select(), $isRangeSelection(e) && (e.format = 0);
}
function Nt(t2, e = wt) {
  return t2.registerCommand(CLEAR_EDITOR_COMMAND, (n2) => (t2.update(e), true), COMMAND_PRIORITY_EDITOR);
}
defineExtension({ build: (t2, e, n2) => St(e), config: safeCast({ $onClear: wt }), name: "@lexical/extension/ClearEditor", register(t2, e, n2) {
  const { $onClear: i2 } = n2.getOutput();
  return yt(() => Nt(t2, i2.value));
} });
function Ct(t2) {
  return ("function" == typeof t2.nodes ? t2.nodes() : t2.nodes) || [];
}
const Dt = createState("format", { parse: (t2) => "number" == typeof t2 ? t2 : 0 });
class Ft extends DecoratorNode {
  $config() {
    return this.config("decorator-text", { extends: DecoratorNode, stateConfigs: [{ flat: true, stateConfig: Dt }] });
  }
  getFormat() {
    return $getState(this, Dt);
  }
  getFormatFlags(t2, e) {
    return toggleTextFormatType(this.getFormat(), t2, e);
  }
  hasFormat(t2) {
    const e = TEXT_TYPE_TO_FORMAT[t2];
    return 0 !== (this.getFormat() & e);
  }
  setFormat(t2) {
    return $setState(this, Dt, t2);
  }
  toggleFormat(t2) {
    const e = this.getFormat(), n2 = toggleTextFormatType(e, t2, null);
    return this.setFormat(n2);
  }
  isInline() {
    return true;
  }
  createDOM() {
    return document.createElement("span");
  }
  updateDOM() {
    return false;
  }
}
function Mt(t2) {
  return t2 instanceof Ft;
}
defineExtension({ name: "@lexical/extension/DecoratorText", nodes: () => [Ft], register: (t2, e, n2) => t2.registerCommand(FORMAT_TEXT_COMMAND, (t3) => {
  const e2 = $getSelection();
  if ($isNodeSelection(e2) || $isRangeSelection(e2)) for (const n3 of e2.getNodes()) Mt(n3) && n3.toggleFormat(t3);
  return false;
}, COMMAND_PRIORITY_LOW) });
function kt(t2, e) {
  let n2;
  return ut(t2(), { unwatched() {
    n2 && (n2(), n2 = void 0);
  }, watched() {
    this.value = t2(), n2 = e(this);
  } });
}
const $t = defineExtension({ build: (t2) => kt(() => t2.getEditorState(), (e) => t2.registerUpdateListener((t3) => {
  e.value = t3.editorState;
})), name: "@lexical/extension/EditorState" });
function Kt(t2, ...e) {
  const n2 = new URL("https://lexical.dev/docs/error"), i2 = new URLSearchParams();
  i2.append("code", t2);
  for (const t3 of e) i2.append("v", t3);
  throw n2.search = i2.toString(), Error(`Minified Lexical error #${t2}; visit ${n2.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
function zt(t2, e) {
  if (t2 && e && !Array.isArray(e) && "object" == typeof t2 && "object" == typeof e) {
    const n2 = t2, i2 = e;
    for (const t3 in i2) n2[t3] = zt(n2[t3], i2[t3]);
    return t2;
  }
  return e;
}
const Lt = 0, Ut = 1, Tt = 2, Bt = 3, Wt = 4, Gt = 5, Vt = 6, Zt = 7;
function Jt(t2) {
  return t2.id === Lt;
}
function Ht(t2) {
  return t2.id === Tt;
}
function qt(t2) {
  return function(t3) {
    return t3.id === Ut;
  }(t2) || Kt(305, String(t2.id), String(Ut)), Object.assign(t2, { id: Tt });
}
const Qt = /* @__PURE__ */ new Set();
class Xt {
  constructor(t2, e) {
    __publicField(this, "builder");
    __publicField(this, "configs");
    __publicField(this, "_dependency");
    __publicField(this, "_peerNameSet");
    __publicField(this, "extension");
    __publicField(this, "state");
    __publicField(this, "_signal");
    this.builder = t2, this.extension = e, this.configs = /* @__PURE__ */ new Set(), this.state = { id: Lt };
  }
  mergeConfigs() {
    let t2 = this.extension.config || {};
    const e = this.extension.mergeConfig ? this.extension.mergeConfig.bind(this.extension) : shallowMergeConfig;
    for (const n2 of this.configs) t2 = e(t2, n2);
    return t2;
  }
  init(t2) {
    const e = this.state;
    Ht(e) || Kt(306, String(e.id));
    const n2 = { getDependency: this.getInitDependency.bind(this), getDirectDependentNames: this.getDirectDependentNames.bind(this), getPeer: this.getInitPeer.bind(this), getPeerNameSet: this.getPeerNameSet.bind(this) }, i2 = { ...n2, getDependency: this.getDependency.bind(this), getInitResult: this.getInitResult.bind(this), getPeer: this.getPeer.bind(this) }, o2 = function(t3, e2, n3) {
      return Object.assign(t3, { config: e2, id: Bt, registerState: n3 });
    }(e, this.mergeConfigs(), n2);
    let s2;
    this.state = o2, this.extension.init && (s2 = this.extension.init(t2, o2.config, n2)), this.state = function(t3, e2, n3) {
      return Object.assign(t3, { id: Wt, initResult: e2, registerState: n3 });
    }(o2, s2, i2);
  }
  build(t2) {
    const e = this.state;
    let n2;
    e.id !== Wt && Kt(307, String(e.id), String(Gt)), this.extension.build && (n2 = this.extension.build(t2, e.config, e.registerState));
    const i2 = { ...e.registerState, getOutput: () => n2, getSignal: this.getSignal.bind(this) };
    this.state = function(t3, e2, n3) {
      return Object.assign(t3, { id: Gt, output: e2, registerState: n3 });
    }(e, n2, i2);
  }
  register(t2, e) {
    this._signal = e;
    const n2 = this.state;
    n2.id !== Gt && Kt(308, String(n2.id), String(Gt));
    const i2 = this.extension.register && this.extension.register(t2, n2.config, n2.registerState);
    return this.state = function(t3) {
      return Object.assign(t3, { id: Vt });
    }(n2), () => {
      const t3 = this.state;
      t3.id !== Zt && Kt(309, String(n2.id), String(Zt)), this.state = function(t4) {
        return Object.assign(t4, { id: Gt });
      }(t3), i2 && i2();
    };
  }
  afterRegistration(t2) {
    const e = this.state;
    let n2;
    return e.id !== Vt && Kt(310, String(e.id), String(Vt)), this.extension.afterRegistration && (n2 = this.extension.afterRegistration(t2, e.config, e.registerState)), this.state = function(t3) {
      return Object.assign(t3, { id: Zt });
    }(e), n2;
  }
  getSignal() {
    return void 0 === this._signal && Kt(311), this._signal;
  }
  getInitResult() {
    void 0 === this.extension.init && Kt(312, this.extension.name);
    const t2 = this.state;
    return function(t3) {
      return t3.id >= Wt;
    }(t2) || Kt(313, String(t2.id), String(Wt)), t2.initResult;
  }
  getInitPeer(t2) {
    const e = this.builder.extensionNameMap.get(t2);
    return e ? e.getExtensionInitDependency() : void 0;
  }
  getExtensionInitDependency() {
    const t2 = this.state;
    return function(t3) {
      return t3.id >= Bt;
    }(t2) || Kt(314, String(t2.id), String(Bt)), { config: t2.config };
  }
  getPeer(t2) {
    const e = this.builder.extensionNameMap.get(t2);
    return e ? e.getExtensionDependency() : void 0;
  }
  getInitDependency(t2) {
    const e = this.builder.getExtensionRep(t2);
    return void 0 === e && Kt(315, this.extension.name, t2.name), e.getExtensionInitDependency();
  }
  getDependency(t2) {
    const e = this.builder.getExtensionRep(t2);
    return void 0 === e && Kt(315, this.extension.name, t2.name), e.getExtensionDependency();
  }
  getState() {
    const t2 = this.state;
    return function(t3) {
      return t3.id >= Zt;
    }(t2) || Kt(316, String(t2.id), String(Zt)), t2;
  }
  getDirectDependentNames() {
    return this.builder.incomingEdges.get(this.extension.name) || Qt;
  }
  getPeerNameSet() {
    let t2 = this._peerNameSet;
    return t2 || (t2 = new Set((this.extension.peerDependencies || []).map(([t3]) => t3)), this._peerNameSet = t2), t2;
  }
  getExtensionDependency() {
    if (!this._dependency) {
      const t2 = this.state;
      (function(t3) {
        return t3.id >= Gt;
      })(t2) || Kt(317, this.extension.name), this._dependency = { config: t2.config, init: t2.initResult, output: t2.output };
    }
    return this._dependency;
  }
}
const Yt = { tag: HISTORY_MERGE_TAG };
function te() {
  const t2 = $getRoot();
  t2.isEmpty() && t2.append($createParagraphNode());
}
const ee = defineExtension({ config: safeCast({ setOptions: Yt, updateOptions: Yt }), init: ({ $initialEditorState: t2 = te }) => ({ $initialEditorState: t2, initialized: false }), afterRegistration(t2, { updateOptions: e, setOptions: n2 }, i2) {
  const o2 = i2.getInitResult();
  if (!o2.initialized) {
    o2.initialized = true;
    const { $initialEditorState: i3 } = o2;
    if ($isEditorState(i3)) t2.setEditorState(i3, n2);
    else if ("function" == typeof i3) t2.update(() => {
      i3(t2);
    }, e);
    else if (i3 && ("string" == typeof i3 || "object" == typeof i3)) {
      const e2 = t2.parseEditorState(i3);
      t2.setEditorState(e2, n2);
    }
  }
  return () => {
  };
}, name: "@lexical/extension/InitialState", nodes: [RootNode, TextNode, LineBreakNode, TabNode, ParagraphNode] }), ne = Symbol.for("@lexical/extension/LexicalBuilder");
function oe() {
}
function se(t2) {
  throw t2;
}
function re(t2) {
  return Array.isArray(t2) ? t2 : [t2];
}
const ce = "0.43.0+prod.esm";
class ae {
  constructor(t2) {
    __publicField(this, "roots");
    __publicField(this, "extensionNameMap");
    __publicField(this, "outgoingConfigEdges");
    __publicField(this, "incomingEdges");
    __publicField(this, "conflicts");
    __publicField(this, "_sortedExtensionReps");
    __publicField(this, "PACKAGE_VERSION");
    this.outgoingConfigEdges = /* @__PURE__ */ new Map(), this.incomingEdges = /* @__PURE__ */ new Map(), this.extensionNameMap = /* @__PURE__ */ new Map(), this.conflicts = /* @__PURE__ */ new Map(), this.PACKAGE_VERSION = ce, this.roots = t2;
    for (const e of t2) this.addExtension(e);
  }
  static fromExtensions(t2) {
    const e = [re(ee)];
    for (const n2 of t2) e.push(re(n2));
    return new ae(e);
  }
  static maybeFromEditor(t2) {
    const e = t2[ne];
    return e && (e.PACKAGE_VERSION !== ce && Kt(292, e.PACKAGE_VERSION, ce), e instanceof ae || Kt(293)), e;
  }
  static fromEditor(t2) {
    const e = ae.maybeFromEditor(t2);
    return void 0 === e && Kt(294), e;
  }
  constructEditor() {
    const { $initialEditorState: t2, onError: e, ...n2 } = this.buildCreateEditorArgs(), i2 = Object.assign(createEditor({ ...n2, ...e ? { onError: (t3) => {
      e(t3, i2);
    } } : {} }), { [ne]: this });
    for (const t3 of this.sortedExtensionReps()) t3.build(i2);
    return i2;
  }
  buildEditor() {
    let t2 = oe;
    function e() {
      try {
        t2();
      } finally {
        t2 = oe;
      }
    }
    const n2 = Object.assign(this.constructEditor(), { dispose: e, [Symbol.dispose]: e });
    return t2 = mergeRegister(this.registerEditor(n2), () => n2.setRootElement(null)), n2;
  }
  hasExtensionByName(t2) {
    return this.extensionNameMap.has(t2);
  }
  getExtensionRep(t2) {
    const e = this.extensionNameMap.get(t2.name);
    if (e) return e.extension !== t2 && Kt(295, t2.name), e;
  }
  addEdge(t2, e, n2) {
    const i2 = this.outgoingConfigEdges.get(t2);
    i2 ? i2.set(e, n2) : this.outgoingConfigEdges.set(t2, /* @__PURE__ */ new Map([[e, n2]]));
    const o2 = this.incomingEdges.get(e);
    o2 ? o2.add(t2) : this.incomingEdges.set(e, /* @__PURE__ */ new Set([t2]));
  }
  addExtension(t2) {
    void 0 !== this._sortedExtensionReps && Kt(296);
    const e = re(t2), [n2] = e;
    "string" != typeof n2.name && Kt(297, typeof n2.name);
    let i2 = this.extensionNameMap.get(n2.name);
    if (void 0 !== i2 && i2.extension !== n2 && Kt(298, n2.name), !i2) {
      i2 = new Xt(this, n2), this.extensionNameMap.set(n2.name, i2);
      const t3 = this.conflicts.get(n2.name);
      "string" == typeof t3 && Kt(299, n2.name, t3);
      for (const t4 of n2.conflictsWith || []) this.extensionNameMap.has(t4) && Kt(299, n2.name, t4), this.conflicts.set(t4, n2.name);
      for (const t4 of n2.dependencies || []) {
        const e2 = re(t4);
        this.addEdge(n2.name, e2[0].name, e2.slice(1)), this.addExtension(e2);
      }
      for (const [t4, e2] of n2.peerDependencies || []) this.addEdge(n2.name, t4, e2 ? [e2] : []);
    }
  }
  sortedExtensionReps() {
    if (this._sortedExtensionReps) return this._sortedExtensionReps;
    const t2 = [], e = (n2, i2) => {
      let o2 = n2.state;
      if (Ht(o2)) return;
      const s2 = n2.extension.name;
      var r2;
      Jt(o2) || Kt(300, s2, i2 || "[unknown]"), Jt(r2 = o2) || Kt(304, String(r2.id), String(Lt)), o2 = Object.assign(r2, { id: Ut }), n2.state = o2;
      const c2 = this.outgoingConfigEdges.get(s2);
      if (c2) for (const t3 of c2.keys()) {
        const n3 = this.extensionNameMap.get(t3);
        n3 && e(n3, s2);
      }
      o2 = qt(o2), n2.state = o2, t2.push(n2);
    };
    for (const t3 of this.extensionNameMap.values()) Jt(t3.state) && e(t3);
    for (const e2 of t2) for (const [t3, n2] of this.outgoingConfigEdges.get(e2.extension.name) || []) if (n2.length > 0) {
      const e3 = this.extensionNameMap.get(t3);
      if (e3) for (const t4 of n2) e3.configs.add(t4);
    }
    for (const [t3, ...e2] of this.roots) if (e2.length > 0) {
      const n2 = this.extensionNameMap.get(t3.name);
      void 0 === n2 && Kt(301, t3.name);
      for (const t4 of e2) n2.configs.add(t4);
    }
    return this._sortedExtensionReps = t2, this._sortedExtensionReps;
  }
  registerEditor(t2) {
    const e = this.sortedExtensionReps(), n2 = new AbortController(), i2 = [() => n2.abort()], o2 = n2.signal;
    for (const n3 of e) {
      const e2 = n3.register(t2, o2);
      e2 && i2.push(e2);
    }
    for (const n3 of e) {
      const e2 = n3.afterRegistration(t2);
      e2 && i2.push(e2);
    }
    return mergeRegister(...i2);
  }
  buildCreateEditorArgs() {
    const t2 = {}, e = /* @__PURE__ */ new Set(), n2 = /* @__PURE__ */ new Map(), i2 = /* @__PURE__ */ new Map(), o2 = {}, s2 = {}, r2 = this.sortedExtensionReps();
    for (const c3 of r2) {
      const { extension: r3 } = c3;
      if (void 0 !== r3.onError && (t2.onError = r3.onError), void 0 !== r3.disableEvents && (t2.disableEvents = r3.disableEvents), void 0 !== r3.parentEditor && (t2.parentEditor = r3.parentEditor), void 0 !== r3.editable && (t2.editable = r3.editable), void 0 !== r3.namespace && (t2.namespace = r3.namespace), void 0 !== r3.$initialEditorState && (t2.$initialEditorState = r3.$initialEditorState), r3.nodes) for (const t3 of Ct(r3)) {
        if ("function" != typeof t3) {
          const e2 = n2.get(t3.replace);
          e2 && Kt(302, r3.name, t3.replace.name, e2.extension.name), n2.set(t3.replace, c3);
        }
        e.add(t3);
      }
      if (r3.html) {
        if (r3.html.export) for (const [t3, e2] of r3.html.export.entries()) i2.set(t3, e2);
        r3.html.import && Object.assign(o2, r3.html.import);
      }
      r3.theme && zt(s2, r3.theme);
    }
    Object.keys(s2).length > 0 && (t2.theme = s2), e.size && (t2.nodes = [...e]);
    const c2 = Object.keys(o2).length > 0, a2 = i2.size > 0;
    (c2 || a2) && (t2.html = {}, c2 && (t2.html.import = o2), a2 && (t2.html.export = i2));
    for (const e2 of r2) e2.init(t2);
    return t2.onError || (t2.onError = se), t2;
  }
}
const le = /* @__PURE__ */ new Set(), he = defineExtension({ build(t2, e, n2) {
  const i2 = n2.getDependency($t).output, o2 = ut({ watchedNodeKeys: /* @__PURE__ */ new Map() }), r2 = kt(() => {
  }, () => yt(() => {
    const t3 = r2.peek(), { watchedNodeKeys: e2 } = o2.value;
    let n3, c2 = false;
    i2.value.read(() => {
      if ($getSelection()) for (const [i3, o3] of e2.entries()) {
        if (0 === o3.size) {
          e2.delete(i3);
          continue;
        }
        const s2 = $getNodeByKey(i3), r3 = s2 && s2.isSelected() || false;
        c2 = c2 || r3 !== (!!t3 && t3.has(i3)), r3 && (n3 = n3 || /* @__PURE__ */ new Set(), n3.add(i3));
      }
    }), !c2 && n3 && t3 && n3.size === t3.size || (r2.value = n3);
  }));
  return { watchNodeKey: function(t3) {
    const e2 = pt(() => (r2.value || le).has(t3)), { watchedNodeKeys: n3 } = o2.peek();
    let i3 = n3.get(t3);
    const s2 = void 0 !== i3;
    return i3 = i3 || /* @__PURE__ */ new Set(), i3.add(e2), s2 || (n3.set(t3, i3), o2.value = { watchedNodeKeys: n3 }), e2;
  } };
}, dependencies: [$t], name: "@lexical/extension/NodeSelection" }), ge = createCommand("INSERT_HORIZONTAL_RULE_COMMAND");
class pe extends DecoratorNode {
  static getType() {
    return "horizontalrule";
  }
  static clone(t2) {
    return new pe(t2.__key);
  }
  static importJSON(t2) {
    return ve().updateFromJSON(t2);
  }
  static importDOM() {
    return { hr: () => ({ conversion: me, priority: 0 }) };
  }
  exportDOM() {
    return { element: document.createElement("hr") };
  }
  createDOM(t2) {
    const e = document.createElement("hr");
    return addClassNamesToElement(e, t2.theme.hr), e;
  }
  getTextContent() {
    return "\n";
  }
  isInline() {
    return false;
  }
  updateDOM() {
    return false;
  }
}
function me() {
  return { node: ve() };
}
function ve() {
  return $create(pe);
}
function xe(t2) {
  return t2 instanceof pe;
}
defineExtension({ dependencies: [$t, he], name: "@lexical/extension/HorizontalRule", nodes: () => [pe], register(t2, e, n2) {
  const { watchNodeKey: o2 } = n2.getDependency(he).output, r2 = ut({ nodeSelections: /* @__PURE__ */ new Map() }), a2 = t2._config.theme.hrSelected ?? "selected";
  return mergeRegister(t2.registerCommand(ge, (t3) => {
    const e2 = $getSelection();
    if (!$isRangeSelection(e2)) return false;
    if (null !== e2.focus.getNode()) {
      const t4 = ve();
      bt(t4);
    }
    return true;
  }, COMMAND_PRIORITY_EDITOR), t2.registerCommand(CLICK_COMMAND, (t3) => {
    if (isDOMNode(t3.target)) {
      const e2 = $getNodeFromDOMNode(t3.target);
      if (xe(e2)) return function(t4, e3 = false) {
        const n3 = $getSelection(), i2 = t4.isSelected(), o3 = t4.getKey();
        let r3;
        e3 && $isNodeSelection(n3) ? r3 = n3 : (r3 = $createNodeSelection(), $setSelection(r3)), i2 ? r3.delete(o3) : r3.add(o3);
      }(e2, t3.shiftKey), true;
    }
    return false;
  }, COMMAND_PRIORITY_LOW), t2.registerMutationListener(pe, (e2, n3) => {
    X(() => {
      let n4 = false;
      const { nodeSelections: i2 } = r2.peek();
      for (const [s2, r3] of e2.entries()) if ("destroyed" === r3) i2.delete(s2), n4 = true;
      else {
        const e3 = i2.get(s2), r4 = t2.getElementByKey(s2);
        e3 ? e3.domNode.value = r4 : (n4 = true, i2.set(s2, { domNode: ut(r4), selectedSignal: o2(s2) }));
      }
      n4 && (r2.value = { nodeSelections: i2 });
    });
  }), yt(() => {
    const t3 = [];
    for (const { domNode: e2, selectedSignal: n3 } of r2.value.nodeSelections.values()) t3.push(yt(() => {
      const t4 = e2.value;
      if (t4) {
        n3.value ? addClassNamesToElement(t4, a2) : removeClassNamesFromElement(t4, a2);
      }
    }));
    return mergeRegister(...t3);
  }));
} });
defineExtension({ build: (t2, e) => St({ inheritEditableFromParent: e.inheritEditableFromParent }), config: safeCast({ $getParentEditor: function() {
  const t2 = $getEditor();
  return ae.fromEditor(t2), t2;
}, inheritEditableFromParent: false }), init: (t2, e, n2) => {
  const i2 = e.$getParentEditor();
  t2.parentEditor = i2, t2.theme = t2.theme || i2._config.theme;
}, name: "@lexical/extension/NestedEditor", register: (t2, e, n2) => yt(() => {
  const e2 = t2._parentEditor;
  if (e2 && n2.getOutput().inheritEditableFromParent.value) return t2.setEditable(e2.isEditable()), e2.registerEditableListener(t2.setEditable.bind(t2));
}) });
defineExtension({ build: (t2, e, n2) => St(e), config: safeCast({ disabled: false, onReposition: void 0 }), name: "@lexical/utils/SelectionAlwaysOnDisplay", register: (t2, e, n2) => {
  const i2 = n2.getOutput();
  return yt(() => {
    if (!i2.disabled.value) return Z(t2, i2.onReposition.value);
  });
} });
function be(t2) {
  return t2.canBeEmpty();
}
function we(t2, e, n2 = be) {
  return mergeRegister(t2.registerCommand(KEY_TAB_COMMAND, (e2) => {
    const n3 = $getSelection();
    if (!$isRangeSelection(n3)) return false;
    e2.preventDefault();
    const i2 = function(t3) {
      if (t3.getNodes().filter((t4) => $isBlockElementNode(t4) && t4.canIndent()).length > 0) return true;
      const e3 = t3.anchor, n4 = t3.focus, i3 = n4.isBefore(e3) ? n4 : e3, o2 = i3.getNode(), s2 = Ct$1(o2);
      if (s2.canIndent()) {
        const t4 = s2.getKey();
        let e4 = $createRangeSelection();
        if (e4.anchor.set(t4, 0, "element"), e4.focus.set(t4, 0, "element"), e4 = $normalizeSelection__EXPERIMENTAL(e4), e4.anchor.is(i3)) return true;
      }
      return false;
    }(n3) ? e2.shiftKey ? OUTDENT_CONTENT_COMMAND : INDENT_CONTENT_COMMAND : INSERT_TAB_COMMAND;
    return t2.dispatchCommand(i2, void 0);
  }, COMMAND_PRIORITY_EDITOR), t2.registerCommand(INDENT_CONTENT_COMMAND, () => {
    const t3 = "number" == typeof e ? e : e ? e.peek() : null, i2 = $getSelection();
    if (!$isRangeSelection(i2)) return false;
    const o2 = "function" == typeof n2 ? n2 : n2.peek();
    return Bt$1((e2) => {
      if (o2(e2)) {
        const n3 = e2.getIndent() + 1;
        (!t3 || n3 < t3) && e2.setIndent(n3);
      }
    });
  }, COMMAND_PRIORITY_CRITICAL));
}
defineExtension({ build: (t2, e, n2) => St(e), config: safeCast({ $canIndent: be, disabled: false, maxIndent: null }), name: "@lexical/extension/TabIndentation", register(t2, e, n2) {
  const { disabled: i2, maxIndent: o2, $canIndent: s2 } = n2.getOutput();
  return yt(() => {
    if (!i2.value) return we(t2, o2, s2);
  });
} });
const r$1 = defineExtension({ name: "@lexical/react/ReactProvider" });
function s$1() {
  return $getRoot().getTextContent();
}
function f$1(t2, e = true) {
  if (t2) return false;
  let n2 = s$1();
  return e && (n2 = n2.trim()), "" === n2;
}
function c(o2) {
  if (!f$1(o2, false)) return false;
  const l = $getRoot().getChildren(), s2 = l.length;
  if (s2 > 1) return false;
  for (let t2 = 0; t2 < s2; t2++) {
    const o3 = l[t2];
    if ($isDecoratorNode(o3)) return false;
    if ($isElementNode(o3)) {
      if (!$isParagraphNode(o3)) return false;
      if (0 !== o3.__indent) return false;
      const e = o3.getChildren(), n2 = e.length;
      for (let r2 = 0; r2 < n2; r2++) {
        const n3 = e[t2];
        if (!$isTextNode(n3)) return false;
      }
    }
  }
  return true;
}
function g$1(t2) {
  return () => c(t2);
}
function s(e) {
  const t2 = window.location.origin, n2 = (n3) => {
    if (n3.origin !== t2) return;
    const o2 = e.getRootElement();
    if (document.activeElement !== o2) return;
    const s2 = n3.data;
    if ("string" == typeof s2) {
      let t3;
      try {
        t3 = JSON.parse(s2);
      } catch (e2) {
        return;
      }
      if (t3 && "nuanria_messaging" === t3.protocol && "request" === t3.type) {
        const o3 = t3.payload;
        if (o3 && "makeChanges" === o3.functionId) {
          const t4 = o3.args;
          if (t4) {
            const [o4, s3, d, c2, g2] = t4;
            e.update(() => {
              const e2 = $getSelection();
              if ($isRangeSelection(e2)) {
                const t5 = e2.anchor;
                let i2 = t5.getNode(), a2 = 0, l = 0;
                if ($isTextNode(i2) && o4 >= 0 && s3 >= 0 && (a2 = o4, l = o4 + s3, e2.setTextNodeRange(i2, a2, i2, l)), a2 === l && "" === d || (e2.insertRawText(d), i2 = t5.getNode()), $isTextNode(i2)) {
                  a2 = c2, l = c2 + g2;
                  const t6 = i2.getTextContentSize();
                  a2 = a2 > t6 ? t6 : a2, l = l > t6 ? t6 : l, e2.setTextNodeRange(i2, a2, i2, l);
                }
                n3.stopImmediatePropagation();
              }
            });
          }
        }
      }
    }
  };
  return window.addEventListener("message", n2, true), () => {
    window.removeEventListener("message", n2, true);
  };
}
defineExtension({ build: (e, n2, o2) => St(n2), config: safeCast({ disabled: "undefined" == typeof window }), name: "@lexical/dragon", register: (t2, n2, o2) => yt(() => o2.getOutput().disabled.value ? void 0 : s(t2)) });
function g(r2, ...e) {
  const t2 = new URL("https://lexical.dev/docs/error"), o2 = new URLSearchParams();
  o2.append("code", r2);
  for (const r3 of e) o2.append("v", r3);
  throw t2.search = o2.toString(), Error(`Minified Lexical error #${r2}; visit ${t2.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const y = "undefined" != typeof window && void 0 !== window.document && void 0 !== window.document.createElement ? useLayoutEffect : useEffect;
function w({ editor: r2, ErrorBoundary: e }) {
  return function(r3, e2) {
    const [t2, o2] = useState(() => r3.getDecorators());
    return y(() => r3.registerDecoratorListener((r4) => {
      flushSync(() => {
        o2(r4);
      });
    }), [r3]), useEffect(() => {
      o2(r3.getDecorators());
    }, [r3]), useMemo(() => {
      const o3 = [], n2 = Object.keys(t2);
      for (let i2 = 0; i2 < n2.length; i2++) {
        const c2 = n2[i2], a2 = jsx(e2, { onError: (e3) => r3._onError(e3), children: jsx(Suspense, { fallback: null, children: t2[c2] }) }), s2 = r3.getElementByKey(c2);
        null !== s2 && o3.push(createPortal(a2, s2, c2));
      }
      return o3;
    }, [e2, t2, r3]);
  }(r2, e);
}
function v$1({ editor: r2, ErrorBoundary: e }) {
  return function(r3) {
    const e2 = ae.maybeFromEditor(r3);
    if (e2 && e2.hasExtensionByName(r$1.name)) {
      for (const r4 of ["@lexical/plain-text", "@lexical/rich-text"]) e2.hasExtensionByName(r4) && g(320, r4);
      return true;
    }
    return false;
  }(r2) ? null : jsx(w, { editor: r2, ErrorBoundary: e });
}
function B(r2) {
  return r2.getEditorState().read(g$1(r2.isComposing()));
}
function L({ contentEditable: e, placeholder: t2 = null, ErrorBoundary: o2 }) {
  const [n2] = o$1();
  return function(r2) {
    y(() => mergeRegister(registerRichText(r2), s(r2)), [r2]);
  }(n2), jsxs(Fragment$1, { children: [e, jsx(b$1, { content: t2 }), jsx(v$1, { editor: n2, ErrorBoundary: o2 })] });
}
function b$1({ content: t2 }) {
  const [o2] = o$1(), n2 = function(r2) {
    const [e, t3] = useState(() => B(r2));
    return y(() => {
      function e2() {
        const e3 = B(r2);
        t3(e3);
      }
      return e2(), mergeRegister(r2.registerUpdateListener(() => {
        e2();
      }), r2.registerEditableListener(() => {
        e2();
      }));
    }, [r2]), e;
  }(o2), i2 = a();
  return n2 ? "function" == typeof t2 ? t2(i2) : t2 : null;
}
function o({ defaultSelection: o2 }) {
  const [l] = o$1();
  return useEffect(() => {
    l.focus(() => {
      const e = document.activeElement, t2 = l.getRootElement();
      null === t2 || null !== e && t2.contains(e) || t2.focus({ preventScroll: true });
    }, { defaultSelection: o2 });
  }, [o2, l]), null;
}
const i = "undefined" != typeof window && void 0 !== window.document && void 0 !== window.document.createElement ? useLayoutEffect : useEffect;
function r({ onClear: n2 }) {
  const [t2] = o$1();
  return i(() => Nt(t2, n2), [t2, n2]), null;
}
const m = "undefined" != typeof window && void 0 !== window.document && void 0 !== window.document.createElement ? useLayoutEffect : useEffect;
function f({ editor: e, ariaActiveDescendant: t2, ariaAutoComplete: i2, ariaControls: a2, ariaDescribedBy: d, ariaErrorMessage: c2, ariaExpanded: s2, ariaInvalid: u2, ariaLabel: f2, ariaLabelledBy: b2, ariaMultiline: p2, ariaOwns: x2, ariaRequired: E2, autoCapitalize: v2, className: w2, id: y2, role: C = "textbox", spellCheck: g2 = true, style: L2, tabIndex: h, "data-testid": D, ...I2 }, R) {
  const [k2, q2] = useState(e.isEditable()), z = useCallback((t3) => {
    t3 && t3.ownerDocument && t3.ownerDocument.defaultView ? e.setRootElement(t3) : e.setRootElement(null);
  }, [e]), A = useMemo(() => /* @__PURE__ */ function(...e2) {
    return (t3) => {
      for (const i3 of e2) "function" == typeof i3 ? i3(t3) : null != i3 && (i3.current = t3);
    };
  }(R, z), [z, R]);
  return m(() => (q2(e.isEditable()), e.registerEditableListener((e2) => {
    q2(e2);
  })), [e]), jsx("div", { "aria-activedescendant": k2 ? t2 : void 0, "aria-autocomplete": k2 ? i2 : "none", "aria-controls": k2 ? a2 : void 0, "aria-describedby": d, ...null != c2 ? { "aria-errormessage": c2 } : {}, "aria-expanded": k2 && "combobox" === C ? !!s2 : void 0, ...null != u2 ? { "aria-invalid": u2 } : {}, "aria-label": f2, "aria-labelledby": b2, "aria-multiline": p2, "aria-owns": k2 ? x2 : void 0, "aria-readonly": !k2 || void 0, "aria-required": E2, autoCapitalize: v2, className: w2, contentEditable: k2, "data-testid": D, id: y2, ref: A, role: C, spellCheck: g2, style: L2, tabIndex: h, ...I2 });
}
const b = forwardRef(f);
function p(e) {
  return e.getEditorState().read(g$1(e.isComposing()));
}
const x = forwardRef(E);
function E(t2, i2) {
  const { placeholder: a2, ...r2 } = t2, [n2] = o$1();
  return jsxs(Fragment$1, { children: [jsx(b, { editor: n2, ...r2, ref: i2 }), null != a2 && jsx(v, { editor: n2, content: a2 })] });
}
function v({ content: e, editor: i2 }) {
  const a2 = function(e2) {
    const [t2, i3] = useState(() => p(e2));
    return m(() => {
      function t3() {
        const t4 = p(e2);
        i3(t4);
      }
      return t3(), mergeRegister(e2.registerUpdateListener(() => {
        t3();
      }), e2.registerEditableListener(() => {
        t3();
      }));
    }, [e2]), t2;
  }(i2), [n2, o2] = useState(i2.isEditable());
  if (useLayoutEffect(() => (o2(i2.isEditable()), i2.registerEditableListener((e2) => {
    o2(e2);
  })), [i2]), !a2) return null;
  let d = null;
  return "function" == typeof e ? d = e(n2) : null !== e && (d = e), null === d ? null : jsx("div", { "aria-hidden": true, children: d });
}
function ContentEditable({
  placeholder,
  className,
  placeholderClassName
}) {
  return /* @__PURE__ */ jsx(
    x,
    {
      className: className ?? `ContentEditable__root tw:relative tw:block tw:min-h-11 tw:overflow-auto tw:px-3 tw:py-3 tw:text-sm tw:outline-hidden`,
      "aria-placeholder": placeholder,
      placeholder: /* @__PURE__ */ jsx(
        "div",
        {
          className: placeholderClassName ?? `tw:pointer-events-none tw:absolute tw:top-0 tw:select-none tw:overflow-hidden tw:text-ellipsis tw:px-3 tw:py-3 tw:text-sm tw:text-muted-foreground`,
          children: placeholder
        }
      )
    }
  );
}
const Context = createContext(void 0);
function ToolbarContext({
  activeEditor,
  $updateToolbar,
  blockType,
  setBlockType,
  showModal,
  children
}) {
  const contextValue = useMemo(
    () => ({
      activeEditor,
      $updateToolbar,
      blockType,
      setBlockType,
      showModal
    }),
    [activeEditor, $updateToolbar, blockType, setBlockType, showModal]
  );
  return /* @__PURE__ */ jsx(Context.Provider, { value: contextValue, children });
}
function useToolbarContext() {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useToolbarContext must be used within a ToolbarContext provider");
  }
  return context;
}
function useEditorModal() {
  const [modalContent, setModalContent] = useState(void 0);
  const onClose = useCallback(() => {
    setModalContent(void 0);
  }, []);
  const modal = useMemo(() => {
    if (modalContent === void 0) {
      return void 0;
    }
    const { title, content } = modalContent;
    return /* @__PURE__ */ jsx(Dialog, { open: true, onOpenChange: onClose, children: /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: title }) }),
      content
    ] }) });
  }, [modalContent, onClose]);
  const showModal = useCallback(
    (title, getContent, closeOnClickOutside = false) => {
      setModalContent({
        closeOnClickOutside,
        content: getContent(onClose),
        title
      });
    },
    [onClose]
  );
  return [modal, showModal];
}
function ToolbarPlugin({
  children
}) {
  const [editor] = o$1();
  const [activeEditor, setActiveEditor] = useState(editor);
  const [blockType, setBlockType] = useState("paragraph");
  const [modal, showModal] = useEditorModal();
  const $updateToolbar = () => {
  };
  useEffect(() => {
    return activeEditor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        setActiveEditor(newEditor);
        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    );
  }, [activeEditor]);
  return /* @__PURE__ */ jsxs(
    ToolbarContext,
    {
      activeEditor,
      $updateToolbar,
      blockType,
      setBlockType,
      showModal,
      children: [
        modal,
        children({ blockType })
      ]
    }
  );
}
function useUpdateToolbarHandler(callback) {
  const [editor] = o$1();
  const { activeEditor } = useToolbarContext();
  useEffect(() => {
    return activeEditor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        const selection = $getSelection();
        if (selection) {
          callback(selection);
        }
        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    );
  }, [editor, callback]);
  useEffect(() => {
    activeEditor.getEditorState().read(() => {
      const selection = $getSelection();
      if (selection) {
        callback(selection);
      }
    });
  }, [activeEditor, callback]);
}
const toggleVariants = cva(
  // CUSTOM: Added pr-twp at the front of the base class string to apply Platform.Bible's Tailwind
  // CSS scope isolation; all Toggle and ToggleGroupItem components inherit this via toggleVariants
  "pr-twp tw:group/toggle tw:inline-flex tw:items-center tw:justify-center tw:gap-1 tw:rounded-lg tw:text-sm tw:font-medium tw:whitespace-nowrap tw:transition-all tw:outline-none tw:hover:bg-muted tw:hover:text-foreground tw:focus-visible:border-ring tw:focus-visible:ring-[3px] tw:focus-visible:ring-ring/50 tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-destructive/20 tw:aria-pressed:bg-muted tw:data-[state=on]:bg-muted tw:dark:aria-invalid:ring-destructive/40 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
  {
    variants: {
      variant: {
        default: "tw:bg-transparent",
        outline: "tw:border tw:border-input tw:bg-transparent tw:hover:bg-muted"
      },
      size: {
        default: "tw:h-8 tw:min-w-8 tw:px-2.5 tw:has-data-[icon=inline-end]:pe-2 tw:has-data-[icon=inline-start]:ps-2",
        sm: "tw:h-7 tw:min-w-7 tw:rounded-[min(var(--tw-radius-md),12px)] tw:px-2.5 tw:text-[0.8rem] tw:has-data-[icon=inline-end]:pe-1.5 tw:has-data-[icon=inline-start]:ps-1.5 tw:[&_svg:not([class*=size-])]:size-3.5",
        lg: "tw:h-9 tw:min-w-9 tw:px-2.5 tw:has-data-[icon=inline-end]:pe-2 tw:has-data-[icon=inline-start]:ps-2"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const ToggleGroupContext = React.createContext({
  size: "default",
  variant: "default",
  spacing: 0,
  orientation: "horizontal"
});
function ToggleGroup({
  className,
  variant,
  size,
  spacing = 0,
  orientation = "horizontal",
  children,
  ...props
}) {
  const dir = readDirection();
  return /* @__PURE__ */ jsx(
    ToggleGroup$1.Root,
    {
      "data-slot": "toggle-group",
      "data-variant": variant,
      "data-size": size,
      "data-spacing": spacing,
      "data-orientation": orientation,
      style: { "--gap": spacing },
      className: cn(
        "pr-twp tw:group/toggle-group tw:flex tw:w-fit tw:flex-row tw:items-center tw:gap-[--spacing(var(--gap))] tw:rounded-lg tw:data-[size=sm]:rounded-[min(var(--tw-radius-md),10px)] tw:data-vertical:flex-col tw:data-vertical:items-stretch",
        className
      ),
      dir,
      ...props,
      children: /* @__PURE__ */ jsx(
        ToggleGroupContext.Provider,
        {
          value: React.useMemo(
            () => ({ variant, size, spacing, orientation }),
            [variant, size, spacing, orientation]
          ),
          children
        }
      )
    }
  );
}
function ToggleGroupItem({
  className,
  children,
  variant = "default",
  size = "default",
  ...props
}) {
  const context = React.useContext(ToggleGroupContext);
  return /* @__PURE__ */ jsx(
    ToggleGroup$1.Item,
    {
      "data-slot": "toggle-group-item",
      "data-variant": context.variant || variant,
      "data-size": context.size || size,
      "data-spacing": context.spacing,
      className: cn(
        "tw:shrink-0 tw:group-data-[spacing=0]/toggle-group:rounded-none tw:group-data-[spacing=0]/toggle-group:px-2 tw:focus:z-10 tw:focus-visible:z-10 tw:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pe-1.5 tw:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:ps-1.5 tw:group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-s-lg tw:group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-lg tw:group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-e-lg tw:group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-lg tw:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-s-0 tw:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 tw:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-s tw:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t",
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size
        }),
        className
      ),
      ...props,
      children
    }
  );
}
const FORMATS = [
  { format: "bold", icon: BoldIcon, label: "Bold" },
  { format: "italic", icon: ItalicIcon, label: "Italic" }
  // CUSTOM: TJ removed underline and strikethrough as they are not supported by the current comment
  // data conversion and are not in P9 anyway. We can add these back if we ever get this supported.
  /* { format: 'underline', icon: UnderlineIcon, label: 'Underline' },
  { format: 'strikethrough', icon: StrikethroughIcon, label: 'Strikethrough' }, */
];
function FontFormatToolbarPlugin() {
  const { activeEditor } = useToolbarContext();
  const [activeFormats, setActiveFormats] = useState([]);
  const $updateToolbar = useCallback((selection) => {
    if ($isRangeSelection(selection) || $isTableSelection(selection)) {
      const formats = [];
      FORMATS.forEach(({ format }) => {
        if (selection.hasFormat(format)) {
          formats.push(format);
        }
      });
      setActiveFormats((prev) => {
        if (prev.length !== formats.length || !formats.every((f2) => prev.includes(f2))) {
          return formats;
        }
        return prev;
      });
    }
  }, []);
  useUpdateToolbarHandler($updateToolbar);
  return /* @__PURE__ */ jsx(
    ToggleGroup,
    {
      type: "multiple",
      value: activeFormats,
      onValueChange: setActiveFormats,
      variant: "outline",
      size: "sm",
      children: FORMATS.map(({ format, icon: Icon, label }) => /* @__PURE__ */ jsx(
        ToggleGroupItem,
        {
          value: format,
          "aria-label": label,
          onClick: () => {
            activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
          },
          children: /* @__PURE__ */ jsx(Icon, { className: "tw:h-4 tw:w-4" })
        },
        format
      ))
    }
  );
}
const CONTENT_ZOOM_ROOT_ATTRIBUTE = "data-platform-content-zoom-root";
const CONTENT_ZOOM_SCOPE_ATTRIBUTE = "data-platform-content-zoom-scope";
const CONTENT_ZOOM_LABEL_ATTRIBUTE = "data-platform-content-zoom-label";
const ContentZoomTextContext = createContext(void 0);
function ContentZoomTextProvider({ area, label, children }) {
  const marking = useMemo(
    () => ({
      [CONTENT_ZOOM_ROOT_ATTRIBUTE]: area ?? "",
      // An empty label names nothing, so it writes no attribute, as on `ContentZoomRoot`.
      ...label ? { [CONTENT_ZOOM_LABEL_ATTRIBUTE]: label } : {}
    }),
    [area, label]
  );
  return /* @__PURE__ */ jsx(ContentZoomTextContext.Provider, { value: marking, children });
}
function useContentZoomTextProps() {
  return useContext(ContentZoomTextContext) ?? {};
}
function ClearEditorBridge({ onClear }) {
  const [editor] = o$1();
  useEffect(() => {
    if (onClear) {
      onClear(() => {
        editor.dispatchCommand(CLEAR_EDITOR_COMMAND, void 0);
      });
    }
  }, [editor, onClear]);
  return void 0;
}
function Plugins({
  placeholder = "Start typing ...",
  autoFocus = false,
  onClear,
  actions
}) {
  const contentZoomTextProps = useContentZoomTextProps();
  const [, setFloatingAnchorElem] = useState(void 0);
  const onRef = (_floatingAnchorElem) => {
    if (_floatingAnchorElem !== void 0) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "tw:relative", children: [
    /* @__PURE__ */ jsx(ToolbarPlugin, { children: () => (
      // Sticky, but deliberately with no z-index of its own. `position: sticky` pins relative
      // to the nearest scrolling ancestor, not this element's own overflow — `Plugins` is
      // shared by consumers (e.g. the comments panel's editor, whose scrolling ancestor is the
      // thread list) where the toolbar does need to stay pinned while its container scrolls.
      // With z-index left at its default (auto), this box establishes no stacking level of its
      // own, so a host's positioned chrome with an explicit z-index (e.g. a sticky panel
      // header) paints above it on stacking order rather than losing to it on DOM position.
      /* @__PURE__ */ jsx(
        "div",
        {
          "data-testid": "editor-format-toolbar",
          className: "tw:sticky tw:top-0 tw:flex tw:gap-2 tw:overflow-auto tw:border-b tw:p-1",
          children: /* @__PURE__ */ jsx(FontFormatToolbarPlugin, {})
        }
      )
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "tw:relative", children: [
      /* @__PURE__ */ jsx(
        L,
        {
          contentEditable: (
            // CUSTOM: Spread the content-zoom text marker onto the content-editable wrapper so text
            // typed into a comment zooms like the saved note beside it, while the format toolbar
            // above and the actions below keep interface scale. It marks nothing outside a
            // ContentZoomTextProvider (the Scripture editor's comment pop-up has none).
            /* @__PURE__ */ jsx(
              "div",
              {
                ref: onRef,
                ...contentZoomTextProps,
                children: /* @__PURE__ */ jsx(ContentEditable, { placeholder })
              }
            )
          ),
          ErrorBoundary: n
        }
      ),
      autoFocus && /* @__PURE__ */ jsx(o, { defaultSelection: "rootEnd" }),
      /* @__PURE__ */ jsx(ClearEditorBridge, { onClear }),
      /* @__PURE__ */ jsx(r, {})
    ] }),
    actions && /* @__PURE__ */ jsx(
      "div",
      {
        "data-slot": "editor-actions",
        className: "tw:flex tw:flex-row tw:items-center tw:gap-2 tw:border-t tw:px-2 tw:py-1.5",
        children: actions
      }
    )
  ] });
}
const editorConfig = {
  namespace: "commentEditor",
  theme: editorTheme,
  nodes,
  onError: (error) => {
    console.error(error);
  }
};
function Editor({
  editorState,
  editorSerializedState,
  onChange,
  onSerializedChange,
  placeholder = "Start typing…",
  autoFocus = false,
  onClear,
  className,
  actions
}) {
  const [initialConfig] = useState(() => ({
    ...editorConfig,
    ...editorState ? { editorState } : {},
    ...editorSerializedState ? { editorState: JSON.stringify(editorSerializedState) } : {}
  }));
  const handleChange = useCallback(
    (latestEditorState) => {
      onChange == null ? void 0 : onChange(latestEditorState);
      onSerializedChange == null ? void 0 : onSerializedChange(latestEditorState.toJSON());
    },
    [onChange, onSerializedChange]
  );
  return (
    // CUSTOM: Added `className` prop
    /* @__PURE__ */ jsx(
      "div",
      {
        className: cn(
          "pr-twp tw:overflow-hidden tw:rounded-lg tw:border tw:bg-background tw:shadow",
          className
        ),
        children: /* @__PURE__ */ jsx(f$2, { initialConfig, children: /* @__PURE__ */ jsxs(TooltipProvider, { children: [
          /* @__PURE__ */ jsx(
            Plugins,
            {
              placeholder,
              autoFocus,
              onClear,
              actions
            }
          ),
          /* @__PURE__ */ jsx(n$1, { ignoreSelectionChange: true, onChange: handleChange })
        ] }) })
      }
    )
  );
}
function focusContentEditable(container) {
  const contentEditableField = container.querySelector('[contenteditable="true"]');
  if (!contentEditableField) return false;
  contentEditableField.focus();
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(contentEditableField);
  range.collapse(false);
  selection == null ? void 0 : selection.removeAllRanges();
  selection == null ? void 0 : selection.addRange(range);
  return true;
}
function doChildrenHaveEditorContent(children) {
  if (!children) return false;
  return children.some(
    (child) => {
      if (child && "text" in child && child.text.trim().length > 0) return true;
      if (!child || !("children" in child)) return false;
      return doChildrenHaveEditorContent(child.children);
    }
  );
}
function hasEditorContent(editorState) {
  var _a;
  if (!((_a = editorState == null ? void 0 : editorState.root) == null ? void 0 : _a.children)) return false;
  return doChildrenHaveEditorContent(editorState.root.children);
}
function htmlToEditorState(html) {
  if (!html || html.trim() === "") {
    throw new Error("Input HTML is empty");
  }
  const editor = createHeadlessEditor({
    namespace: "EditorUtils",
    theme: editorTheme,
    nodes,
    onError: (error) => {
      console.error(error);
    }
  });
  let serializedState;
  editor.update(
    () => {
      const parser = new DOMParser();
      const dom = parser.parseFromString(html, "text/html");
      const generatedNodes = $generateNodesFromDOM(editor, dom);
      $getRoot().clear();
      $insertNodes(generatedNodes);
    },
    {
      discrete: true
    }
  );
  editor.getEditorState().read(() => {
    serializedState = editor.getEditorState().toJSON();
  });
  if (!serializedState) {
    throw new Error("Failed to convert HTML to editor state");
  }
  return serializedState;
}
function editorStateToHtml(editorState) {
  const editor = createHeadlessEditor({
    namespace: "EditorUtils",
    theme: editorTheme,
    nodes,
    onError: (error) => {
      console.error(error);
    }
  });
  const parsedEditorState = editor.parseEditorState(JSON.stringify(editorState));
  editor.setEditorState(parsedEditorState);
  let html = "";
  editor.getEditorState().read(() => {
    html = $generateHtmlFromNodes(editor);
  });
  html = html.replace(/\s+style="[^"]*"/g, "").replace(/\s+class="[^"]*"/g, "").replace(/<span>(.*?)<\/span>/g, "$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g, "<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g, "<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g, "<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g, "<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g, "<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g, "<s>$1</s>").replace(/<br\s*\/?>/gi, "<br/>");
  return html;
}
function handleEditorKeyNavigation(event) {
  const navigationKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"];
  if (navigationKeys.includes(event.key)) {
    event.stopPropagation();
    return true;
  }
  return false;
}
const VERSE_TEXT_CONFLICT = "verseText";
const CONFLICT_NOTE_STRING_KEYS = Object.freeze([
  "%conflict_note_description_verseText%",
  // Accessible name for the resolution radio group (the group has no other visible <label>).
  "%conflict_note_choose_aria_label%",
  "%conflict_note_stale_notice%",
  "%conflict_note_resolve_failed%",
  "%conflict_note_choose_prompt%",
  "%conflict_note_option_keep_current%",
  "%conflict_note_option_use_other%",
  "%conflict_note_option_combine%",
  "%conflict_note_save_and_resolve%",
  // Tooltip when Save is disabled (keeping the current text is a no-op).
  "%conflict_note_save_disabled_tooltip%",
  // Tooltip when Save is enabled (the resolution is irreversible).
  "%conflict_note_save_warning%",
  // Neutral placeholder when an already-resolved conflict's Result region has no text to show.
  "%conflict_note_no_result%",
  // Consumed by CommentItem for a conflict thread's resolution banner (not by ConflictNoteCard):
  // the neutral outcome line derived from conflictResolutionAction.
  "%conflict_note_outcome_used_other%",
  "%conflict_note_outcome_combined%",
  // Consumed by ConflictThreadSummary (the collapsed conflict-thread preview): a status-aware
  // one-liner shown instead of the raw PT9 note body. Unresolved shows the prompt plus the diff;
  // resolved shows only the outcome sentence keyed off resolvedResolution.
  "%conflict_note_summary_unresolved%",
  "%conflict_note_summary_resolved_kept_current%",
  "%conflict_note_summary_resolved_used_other%",
  "%conflict_note_summary_resolved_combined%"
]);
function hasCommentEdits(commentEdits) {
  return commentEdits !== void 0 && Object.keys(commentEdits).length > 0;
}
function isCommentDraftEmpty(draft) {
  return draft.editorState === void 0 && draft.assignedUser === void 0 && !hasCommentEdits(draft.commentEdits);
}
const COMMENT_BODY_PROSE_CLASSES = [
  "tw:prose tw:max-w-none tw:break-words tw:text-sm tw:font-normal tw:text-foreground",
  "tw:[&>blockquote]:border-s-0 tw:[&>blockquote]:p-0 tw:[&>blockquote]:ps-0 tw:[&>blockquote]:font-normal tw:[&>blockquote]:not-italic tw:[&>blockquote]:text-foreground",
  "tw:prose-quoteless"
].join(" ");
function isVerseTextConflictNote(comment) {
  return (comment == null ? void 0 : comment.conflictType) === VERSE_TEXT_CONFLICT;
}
function actionToOutcome(action) {
  if (action === "replaced") return "reject";
  if (action === "merged") return "merged";
  return "accept";
}
function getAssignedUserDisplayName$1(user, localizedStrings) {
  if (user === "") {
    return localizedStrings["%comment_assign_unassigned%"] ?? "Unassigned";
  }
  if (user === "Team") {
    return localizedStrings["%comment_assign_team%"] ?? "Team";
  }
  return user;
}
function didPressCtrlOrCmdEnter(event) {
  const isMac = isMacOs();
  return event.key === "Enter" && (isMac && event.metaKey || !isMac && event.ctrlKey);
}
function localizeOrFallback(key, localizedStrings, fallback) {
  const value = localizedStrings[key];
  return value === void 0 || value === key ? fallback : value;
}
const EMPTY_EDITOR_STATE = {
  root: {
    children: [
      {
        children: [],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
        textFormat: 0,
        textStyle: ""
      }
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1
  }
};
const initialValue$1 = {
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "",
            type: "text",
            version: 1
          }
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
        textFormat: 0,
        textStyle: ""
      }
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1
  }
};
function getAssignedUserDisplayName(user, localizedStrings) {
  if (user === "") {
    return localizedStrings["%commentEditor_unassigned%"] ?? "Unassigned";
  }
  if (user === "Team") {
    return localizedStrings["%commentEditor_team%"] ?? "Team";
  }
  return user;
}
function CommentEditor({
  assignableUsers,
  onSave,
  onClose,
  localizedStrings,
  initialAssignedUser
}) {
  const [editorState, setEditorState] = useState(initialValue$1);
  const [selectedUser, setSelectedUser] = useState(initialAssignedUser);
  const [isAssignPopoverOpen, setIsAssignPopoverOpen] = useState(false);
  const clearEditorRef = useRef(void 0);
  const editorContainerRef = useRef(null);
  useEffect(() => {
    let isMounted = true;
    const container = editorContainerRef.current;
    if (!container) return void 0;
    const timeoutId = setTimeout(() => {
      if (!isMounted) return;
      focusContentEditable(container);
    }, 300);
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, []);
  const handleSave = useCallback(() => {
    if (!hasEditorContent(editorState)) return;
    const contents = editorStateToHtml(editorState);
    onSave(contents, selectedUser);
  }, [editorState, onSave, selectedUser]);
  const placeholder = localizedStrings["%commentEditor_placeholder%"] ?? "Type your comment here...";
  const assignToLabel = localizedStrings["%commentEditor_assignTo_label%"] ?? "Assign to";
  return /* @__PURE__ */ jsxs("div", { className: "pr-twp tw:grid tw:gap-3", children: [
    /* @__PURE__ */ jsxs("div", { className: "tw:flex tw:items-center tw:justify-between", children: [
      /* @__PURE__ */ jsx("span", { className: "tw:text-sm tw:font-medium", children: assignToLabel }),
      /* @__PURE__ */ jsx(
        CancelAcceptButtons,
        {
          onCancelClick: onClose,
          onAcceptClick: handleSave,
          canAccept: hasEditorContent(editorState),
          localizedStrings,
          acceptLabel: localizedStrings["%commentEditor_saveButton_tooltip%"]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "tw:flex tw:items-center tw:gap-2", children: /* @__PURE__ */ jsxs(Popover, { open: isAssignPopoverOpen, onOpenChange: setIsAssignPopoverOpen, children: [
      /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "outline",
          className: "tw:flex tw:w-full tw:items-center tw:justify-start tw:gap-2",
          disabled: assignableUsers.length === 0,
          children: [
            /* @__PURE__ */ jsx(AtSign, { className: "tw:h-4 tw:w-4" }),
            /* @__PURE__ */ jsx("span", { children: selectedUser !== void 0 ? getAssignedUserDisplayName(selectedUser, localizedStrings) : getAssignedUserDisplayName("", localizedStrings) })
          ]
        }
      ) }),
      /* @__PURE__ */ jsx(
        PopoverContent,
        {
          className: "tw:w-auto tw:p-0",
          align: "start",
          onKeyDown: (e) => {
            if (e.key === "Escape") {
              e.stopPropagation();
              setIsAssignPopoverOpen(false);
            }
          },
          children: /* @__PURE__ */ jsx(Command, { children: /* @__PURE__ */ jsx(CommandList, { children: assignableUsers.map((user) => /* @__PURE__ */ jsx(
            CommandItem,
            {
              onSelect: () => {
                setSelectedUser(user || void 0);
                setIsAssignPopoverOpen(false);
              },
              className: "tw:flex tw:items-center",
              children: /* @__PURE__ */ jsx("span", { children: getAssignedUserDisplayName(user, localizedStrings) })
            },
            user || "unassigned"
          )) }) })
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: editorContainerRef,
        role: "textbox",
        tabIndex: -1,
        className: "tw:outline-hidden",
        onKeyDownCapture: (e) => {
          if (e.key === "Escape") {
            e.preventDefault();
            e.stopPropagation();
            onClose();
          } else if (didPressCtrlOrCmdEnter(e)) {
            e.preventDefault();
            e.stopPropagation();
            if (hasEditorContent(editorState)) {
              handleSave();
            }
          }
        },
        onKeyDown: (e) => {
          handleEditorKeyNavigation(e);
          if (e.key === "Enter" || e.key === " ") {
            e.stopPropagation();
          }
        },
        children: /* @__PURE__ */ jsx(
          Editor,
          {
            editorSerializedState: editorState,
            onSerializedChange: (value) => setEditorState(value),
            placeholder,
            onClear: (clearFn) => {
              clearEditorRef.current = clearFn;
            }
          }
        )
      }
    )
  ] });
}
const COMMENT_EDITOR_STRING_KEYS = Object.freeze([
  "%commentEditor_placeholder%",
  "%commentEditor_assignTo_label%",
  "%commentEditor_saveButton_tooltip%",
  "%commentEditor_unassigned%",
  "%commentEditor_team%",
  ...CANCEL_ACCEPT_BUTTONS_STRING_KEYS
]);
const COMMENT_LIST_STRING_KEYS = Object.freeze([
  "%comment_assign_team%",
  "%comment_assign_unassigned%",
  "%comment_assigned_to%",
  "%comment_assigning_to%",
  "%comment_dateAtTime%",
  "%comment_date_today%",
  "%comment_date_yesterday%",
  "%comment_deleteComment%",
  "%comment_editComment%",
  "%comment_replyOrAssign%",
  "%comment_reopenResolved%",
  "%comment_status_resolved%",
  "%comment_status_todo%",
  "%comment_thread_multiple_replies%",
  "%comment_thread_single_reply%",
  "%comment_aria_assign_user%",
  "%comment_aria_submit_comment%",
  "%comment_aria_mark_as_read%",
  "%comment_aria_mark_as_unread%",
  "%comment_aria_resolve_thread%",
  "%comment_aria_cancel_edit%",
  "%comment_aria_save_edit%"
]);
const COMMENT_LIST_ELEMENT_ID = "comment-list";
function getCommentThreadElementId(threadId) {
  return threadId;
}
function Card({
  className,
  size = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card",
      "data-size": size,
      className: cn(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:group/card tw:flex tw:flex-col tw:gap-4 tw:overflow-hidden tw:rounded-xl tw:bg-card tw:py-4 tw:text-sm tw:text-card-foreground tw:ring-1 tw:ring-foreground/10 tw:has-data-[slot=card-footer]:pb-0 tw:has-[>img:first-child]:pt-0 tw:data-[size=sm]:gap-3 tw:data-[size=sm]:py-3 tw:data-[size=sm]:has-data-[slot=card-footer]:pb-0 tw:*:[img:first-child]:rounded-t-xl tw:*:[img:last-child]:rounded-b-xl",
        className
      ),
      ...props
    }
  );
}
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-header",
      className: cn(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:group/card-header tw:@container/card-header tw:grid tw:auto-rows-min tw:items-start tw:gap-1 tw:rounded-t-xl tw:px-4 tw:group-data-[size=sm]/card:px-3 tw:has-data-[slot=card-action]:grid-cols-[1fr_auto] tw:has-data-[slot=card-description]:grid-rows-[auto_auto] tw:[.border-b]:pb-4 tw:group-data-[size=sm]/card:[.border-b]:pb-3",
        className
      ),
      ...props
    }
  );
}
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-title",
      className: cn(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:font-heading tw:text-base tw:leading-snug tw:font-medium tw:group-data-[size=sm]/card:text-sm",
        className
      ),
      ...props
    }
  );
}
function CardDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-description",
      className: cn(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:text-sm tw:text-muted-foreground",
        className
      ),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:px-4 tw:group-data-[size=sm]/card:px-3",
        className
      ),
      ...props
    }
  );
}
function CardFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-footer",
      className: cn(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:items-center tw:rounded-b-xl tw:border-t tw:bg-muted/50 tw:p-4 tw:group-data-[size=sm]/card:p-3",
        className
      ),
      ...props
    }
  );
}
function DisabledTooltipWrapper({
  children,
  isDisabled,
  disabledExplanation,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      ...props,
      role: isDisabled ? "group" : void 0,
      tabIndex: isDisabled ? 0 : void 0,
      "aria-label": isDisabled ? disabledExplanation : void 0,
      children
    }
  );
}
function Avatar({
  className,
  size = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Avatar$1.Root,
    {
      "data-slot": "avatar",
      "data-size": size,
      className: cn(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:group/avatar tw:relative tw:flex tw:size-8 tw:shrink-0 tw:rounded-full tw:select-none tw:after:absolute tw:after:inset-0 tw:after:rounded-full tw:after:border tw:after:border-border tw:after:mix-blend-darken tw:data-[size=lg]:size-10 tw:data-[size=sm]:size-6 tw:dark:after:mix-blend-lighten",
        className
      ),
      ...props
    }
  );
}
function AvatarImage({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    Avatar$1.Image,
    {
      "data-slot": "avatar-image",
      className: cn(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:aspect-square tw:size-full tw:rounded-full tw:object-cover",
        className
      ),
      ...props
    }
  );
}
function AvatarFallback({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Avatar$1.Fallback,
    {
      "data-slot": "avatar-fallback",
      className: cn(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:size-full tw:items-center tw:justify-center tw:rounded-full tw:bg-muted tw:text-sm tw:text-muted-foreground tw:group-data-[size=sm]/avatar:text-xs",
        className
      ),
      ...props
    }
  );
}
function CommentItem({
  comment,
  isReply = false,
  localizedStrings,
  isThreadExpanded = false,
  handleUpdateComment,
  handleDeleteComment,
  onEditingChange,
  canEditOrDelete = false,
  draftEditorState,
  onDraftEditorStateChange
}) {
  const contentZoomTextProps = useContentZoomTextProps();
  const [internalEditorState, setInternalEditorState] = useState();
  const editorState = draftEditorState ?? internalEditorState;
  const isEditing = editorState !== void 0;
  const showEditingUi = isEditing && isThreadExpanded;
  const isControlled = onDraftEditorStateChange !== void 0;
  const setEditorState = useCallback(
    (value) => {
      if (!isControlled) setInternalEditorState(value);
      onDraftEditorStateChange == null ? void 0 : onDraftEditorStateChange(value);
    },
    [isControlled, onDraftEditorStateChange]
  );
  const editContainerRef = useRef(null);
  const shouldFocusOnEditRef = useRef(false);
  useEffect(() => {
    if (!showEditingUi) return void 0;
    if (!shouldFocusOnEditRef.current) return void 0;
    shouldFocusOnEditRef.current = false;
    let isMounted = true;
    const container = editContainerRef.current;
    if (!container) return void 0;
    const timeoutId = setTimeout(() => {
      if (!isMounted) return;
      focusContentEditable(container);
    }, 300);
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [showEditingUi]);
  const handleCancelEdit = useCallback(
    (e) => {
      if (e) e.stopPropagation();
      setEditorState(void 0);
      onEditingChange == null ? void 0 : onEditingChange(false);
    },
    [onEditingChange, setEditorState]
  );
  const handleSaveEdit = useCallback(
    async (e) => {
      if (e) e.stopPropagation();
      if (!editorState || !handleUpdateComment) return;
      const isUpdateSuccessful = await handleUpdateComment(
        comment.id,
        editorStateToHtml(editorState)
      );
      if (isUpdateSuccessful) {
        setEditorState(void 0);
        onEditingChange == null ? void 0 : onEditingChange(false);
      }
    },
    [editorState, handleUpdateComment, comment.id, onEditingChange, setEditorState]
  );
  const displayDate = useMemo(() => {
    const date = new Date(comment.date);
    const relativeDate = formatRelativeDate(
      date,
      localizedStrings["%comment_date_today%"],
      localizedStrings["%comment_date_yesterday%"]
    );
    const time = date.toLocaleTimeString(void 0, {
      hour: "numeric",
      minute: "2-digit"
    });
    return formatReplacementString(localizedStrings["%comment_dateAtTime%"], {
      date: relativeDate,
      time
    });
  }, [comment.date, localizedStrings]);
  const userLabel = useMemo(() => comment.user, [comment.user]);
  const initials = useMemo(
    () => comment.user.split(" ").map((name) => name[0]).join("").toUpperCase().slice(0, 2),
    [comment.user]
  );
  const sanitizedContent = useMemo(() => sanitizeHtml(comment.contents), [comment.contents]);
  const hasResolutionBodyText = useMemo(
    () => comment.contents.replace(/<[^>]*>/g, "").trim().length > 0,
    [comment.contents]
  );
  const showsConflictOutcome = !!comment.conflictResolutionAction && !hasResolutionBodyText;
  const dropdownContent = useMemo(() => {
    if (!isThreadExpanded) return void 0;
    if (!canEditOrDelete) return void 0;
    return /* @__PURE__ */ jsxs(Fragment$1, { children: [
      /* @__PURE__ */ jsxs(
        DropdownMenuItem,
        {
          onClick: (e) => {
            e.stopPropagation();
            shouldFocusOnEditRef.current = true;
            const hasBody = comment.contents.trim() !== "";
            setEditorState(hasBody ? htmlToEditorState(comment.contents) : EMPTY_EDITOR_STATE);
            onEditingChange == null ? void 0 : onEditingChange(true);
          },
          children: [
            /* @__PURE__ */ jsx(Pencil, { className: "tw:me-2 tw:h-4 tw:w-4" }),
            localizedStrings["%comment_editComment%"]
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        DropdownMenuItem,
        {
          onClick: async (e) => {
            e.stopPropagation();
            if (handleDeleteComment) {
              await handleDeleteComment(comment.id);
            }
          },
          children: [
            /* @__PURE__ */ jsx(Trash2, { className: "tw:me-2 tw:h-4 tw:w-4" }),
            localizedStrings["%comment_deleteComment%"]
          ]
        }
      )
    ] });
  }, [
    canEditOrDelete,
    isThreadExpanded,
    localizedStrings,
    comment.contents,
    comment.id,
    handleDeleteComment,
    onEditingChange,
    setEditorState
  ]);
  const isSaveDisabled = !hasEditorContent(editorState);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn("tw:flex tw:w-full tw:flex-row tw:items-baseline tw:gap-2", {
        "tw:text-sm": isReply
      }),
      children: [
        /* @__PURE__ */ jsx(Avatar, { className: "tw:h-8 tw:w-8", children: /* @__PURE__ */ jsx(AvatarFallback, { className: "tw:text-xs tw:font-medium", children: initials }) }),
        /* @__PURE__ */ jsxs("div", { className: "tw:flex tw:flex-1 tw:flex-col tw:gap-1", children: [
          /* @__PURE__ */ jsxs("div", { className: "tw:flex tw:w-full tw:flex-row tw:flex-wrap tw:items-baseline tw:gap-x-2", children: [
            /* @__PURE__ */ jsx("p", { className: "tw:text-sm tw:font-medium", children: userLabel }),
            /* @__PURE__ */ jsx("p", { className: "tw:text-xs tw:font-normal tw:text-muted-foreground", children: displayDate }),
            /* @__PURE__ */ jsx("div", { className: "tw:flex-1" }),
            isReply && comment.assignedUser !== void 0 && /* @__PURE__ */ jsxs(Badge, { variant: "secondary", className: "tw:text-xs tw:font-normal", children: [
              "→ ",
              getAssignedUserDisplayName$1(comment.assignedUser, localizedStrings)
            ] })
          ] }),
          showEditingUi && /* @__PURE__ */ jsx(
            "div",
            {
              role: "textbox",
              tabIndex: -1,
              className: "tw:flex tw:flex-col tw:gap-2",
              ref: editContainerRef,
              onKeyDownCapture: (e) => {
                if (e.key === "Escape") {
                  e.preventDefault();
                  e.stopPropagation();
                  handleCancelEdit();
                } else if (didPressCtrlOrCmdEnter(e)) {
                  e.preventDefault();
                  e.stopPropagation();
                  if (hasEditorContent(editorState)) {
                    handleSaveEdit();
                  }
                }
              },
              onKeyDown: (e) => {
                handleEditorKeyNavigation(e);
                if (e.key === "Enter" || e.key === " ") {
                  e.stopPropagation();
                }
              },
              onClick: (e) => {
                e.stopPropagation();
              },
              children: /* @__PURE__ */ jsx(
                Editor,
                {
                  className: cn(
                    // Don't render blockquote on the first child. All comments are wrapped in blockquote
                    // that has text-align corresponding to LTR or RTL, so the blockquote is important.
                    // But we don't want it to look like there's a blockquote there. Target the
                    // lowest-level Lexical editor element by attribute so Tailwind can apply styles to
                    // the blockquote directly inside the editor.
                    'tw:[&_[data-lexical-editor="true"]>blockquote]:mt-0 tw:[&_[data-lexical-editor="true"]>blockquote]:border-s-0 tw:[&_[data-lexical-editor="true"]>blockquote]:ps-0 tw:[&_[data-lexical-editor="true"]>blockquote]:font-normal tw:[&_[data-lexical-editor="true"]>blockquote]:not-italic tw:[&_[data-lexical-editor="true"]>blockquote]:text-foreground'
                  ),
                  editorSerializedState: editorState,
                  onSerializedChange: (value) => setEditorState(value),
                  actions: /* @__PURE__ */ jsxs(Fragment$1, { children: [
                    /* @__PURE__ */ jsx("div", { className: "tw:flex-1" }),
                    /* @__PURE__ */ jsxs(Tooltip, { children: [
                      /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
                        Button,
                        {
                          size: "icon-sm",
                          onClick: handleCancelEdit,
                          variant: "outline",
                          className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                          "aria-label": localizeOrFallback(
                            "%comment_aria_cancel_edit%",
                            localizedStrings,
                            "Cancel edit"
                          ),
                          children: /* @__PURE__ */ jsx(Undo2, {})
                        }
                      ) }),
                      /* @__PURE__ */ jsx(TooltipContent, { children: localizeOrFallback(
                        "%comment_aria_cancel_edit%",
                        localizedStrings,
                        "Cancel edit"
                      ) })
                    ] }),
                    /* @__PURE__ */ jsxs(Tooltip, { children: [
                      /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
                        DisabledTooltipWrapper,
                        {
                          isDisabled: isSaveDisabled,
                          disabledExplanation: localizeOrFallback(
                            "%comment_aria_save_edit%",
                            localizedStrings,
                            "Save edit"
                          ),
                          className: "tw:inline-flex",
                          children: /* @__PURE__ */ jsx(
                            Button,
                            {
                              size: "icon-sm",
                              onClick: handleSaveEdit,
                              className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                              disabled: isSaveDisabled,
                              "aria-label": localizeOrFallback(
                                "%comment_aria_save_edit%",
                                localizedStrings,
                                "Save edit"
                              ),
                              children: /* @__PURE__ */ jsx(ArrowUp, {})
                            }
                          )
                        }
                      ) }),
                      /* @__PURE__ */ jsx(TooltipContent, { children: localizeOrFallback(
                        "%comment_aria_save_edit%",
                        localizedStrings,
                        "Save edit"
                      ) })
                    ] })
                  ] })
                }
              )
            }
          ),
          !showEditingUi && /* @__PURE__ */ jsxs(Fragment$1, { children: [
            comment.status === "Resolved" && !showsConflictOutcome && /* @__PURE__ */ jsx("div", { className: "tw:text-sm tw:italic", children: localizedStrings["%comment_status_resolved%"] }),
            comment.status === "Todo" && isReply && /* @__PURE__ */ jsx("div", { className: "tw:text-sm tw:italic", children: localizedStrings["%comment_status_todo%"] }),
            showsConflictOutcome ? (
              // A platform-created conflict resolution comment carries an empty body — PT9 renders
              // its banner UI-side from conflictResolutionAction, it never stores text. So render the
              // localized, neutral outcome line here instead of the (empty) contents, styled like the
              // italic status lines above. These are the same neutral keys ConflictNoteCard's Result
              // region used to render inline. Only when the body IS empty: a resolution synced from
              // PT9 can carry the resolver's typed note alongside the action, and PT9 shows that text,
              // so the body branch below keeps it visible rather than discarding it for this banner.
              /* @__PURE__ */ jsx("div", { className: "tw:text-sm tw:italic", children: actionToOutcome(comment.conflictResolutionAction) === "merged" ? localizedStrings["%conflict_note_outcome_combined%"] ?? "Combined both changes." : localizedStrings["%conflict_note_outcome_used_other%"] ?? "Used the other change instead of the current text." })
            ) : /* @__PURE__ */ jsx(
              "div",
              {
                className: cn(
                  // Shared note-body prose/blockquote treatment (also used by conflict-diff's
                  // DIFF_HTML_CLASSES). Layer this comment item's own extras on top: items-start +
                  // gap-2 for layout, and line-clamp while the thread is collapsed.
                  COMMENT_BODY_PROSE_CLASSES,
                  "tw:items-start tw:gap-2",
                  {
                    "tw:line-clamp-3": !isThreadExpanded
                  }
                ),
                ...contentZoomTextProps,
                dangerouslySetInnerHTML: { __html: sanitizedContent }
              }
            )
          ] })
        ] }),
        dropdownContent && /* @__PURE__ */ jsxs(DropdownMenu, { children: [
          /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", children: /* @__PURE__ */ jsx(MoreHorizontal, {}) }) }),
          /* @__PURE__ */ jsx(DropdownMenuContent, { align: "end", children: dropdownContent })
        ] })
      ]
    }
  );
}
function ResolveCheckButton({
  show,
  disabled = false,
  onClick,
  ariaLabel
}) {
  if (!show) return void 0;
  return /* @__PURE__ */ jsx(
    Button,
    {
      variant: "ghost",
      size: "icon",
      disabled,
      className: cn(
        "tw:ms-auto",
        "tw:text-primary tw:transition-opacity tw:duration-200 tw:hover:bg-primary/10",
        "tw:opacity-0 tw:group-hover:opacity-100"
      ),
      onClick: (e) => {
        e.stopPropagation();
        onClick();
      },
      "aria-label": ariaLabel,
      children: /* @__PURE__ */ jsx(Check, { className: "tw:h-4 tw:w-4" })
    }
  );
}
const initialValue = {
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "",
            type: "text",
            version: 1
          }
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
        textFormat: 0,
        textStyle: ""
      }
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1
  }
};
const CommentThread = memo(function CommentThread2({
  classNameForVerseText,
  comments,
  localizedStrings,
  isSelected = false,
  verseRef,
  assignedUser,
  currentUser,
  handleSelectThread,
  threadId,
  thread,
  threadStatus,
  handleAddCommentToThread,
  handleUpdateComment,
  handleDeleteComment,
  handleReadStatusChange,
  assignableUsers,
  canUserAddCommentToThread,
  canUserAssignThreadCallback,
  canUserResolveThreadCallback,
  canUserEditOrDeleteCommentCallback,
  isRead: isReadProp = false,
  autoReadDelay = 5,
  onVerseRefClick,
  initialAssignedUser,
  activeComments: providedActiveComments,
  rootContentSlot,
  resolveActionSlot,
  spaceRootContentFromReplies = false,
  draft,
  onDraftChange
}) {
  var _a;
  const contentZoomTextProps = useContentZoomTextProps();
  const [internalDraft, setInternalDraft] = useState({});
  const effectiveDraft = draft ?? internalDraft;
  const pendingCommentEditorState = effectiveDraft.editorState ?? initialValue;
  const pendingCommentAssignedUser = effectiveDraft.assignedUser;
  const isControlled = onDraftChange !== void 0;
  const effectiveDraftRef = useRef(effectiveDraft);
  effectiveDraftRef.current = effectiveDraft;
  const updateDraft = useCallback(
    (patch) => {
      const next = { ...effectiveDraftRef.current, ...patch };
      effectiveDraftRef.current = next;
      if (!isControlled) setInternalDraft(next);
      onDraftChange == null ? void 0 : onDraftChange(threadId, isCommentDraftEmpty(next) ? void 0 : next);
    },
    [isControlled, onDraftChange, threadId]
  );
  const updateCommentEditDraft = useCallback(
    (commentId, value) => {
      const nextCommentEdits = { ...effectiveDraft.commentEdits };
      if (value === void 0) {
        delete nextCommentEdits[commentId];
      } else {
        nextCommentEdits[commentId] = value;
      }
      updateDraft({
        commentEdits: hasCommentEdits(nextCommentEdits) ? nextCommentEdits : void 0
      });
    },
    [effectiveDraft.commentEdits, updateDraft]
  );
  const [lastSubmittedAssignedUser, setLastSubmittedAssignedUser] = useState();
  const isVerseExpanded = isSelected;
  const [showAllReplies, setShowAllReplies] = useState(false);
  const [isAnyCommentEditingLocal, setIsAnyCommentEditingLocal] = useState(false);
  const [isAssignPopoverOpen, setIsAssignPopoverOpen] = useState(false);
  const [canAssign, setCanAssign] = useState(false);
  const [canResolve, setCanResolve] = useState(false);
  const [isRead, setIsRead] = useState(isReadProp);
  const [manuallyUnread, setManuallyUnread] = useState(false);
  const autoReadTimerRef = useRef(void 0);
  const [commentEditDeletePermissions, setCommentEditDeletePermissions] = useState(/* @__PURE__ */ new Map());
  useEffect(() => {
    let isPromiseCurrent = true;
    const checkResolvePermission = async () => {
      const resolveResult = canUserResolveThreadCallback ? await canUserResolveThreadCallback(threadId) : false;
      if (!isPromiseCurrent) return;
      setCanResolve(resolveResult);
    };
    checkResolvePermission();
    return () => {
      isPromiseCurrent = false;
    };
  }, [threadId, canUserResolveThreadCallback]);
  useEffect(() => {
    let isPromiseCurrent = true;
    if (!isSelected) {
      setCanAssign(false);
      setCommentEditDeletePermissions(/* @__PURE__ */ new Map());
      return void 0;
    }
    const checkPermissions = async () => {
      const assignResult = canUserAssignThreadCallback ? await canUserAssignThreadCallback(threadId) : false;
      if (!isPromiseCurrent) return;
      setCanAssign(assignResult);
    };
    checkPermissions();
    return () => {
      isPromiseCurrent = false;
    };
  }, [isSelected, threadId, canUserAssignThreadCallback]);
  const assigneeSelectionStateRef = useRef("idle");
  useEffect(() => {
    if (!isSelected) {
      if (assigneeSelectionStateRef.current !== "idle") {
        updateDraft({ assignedUser: void 0 });
        setLastSubmittedAssignedUser(void 0);
        assigneeSelectionStateRef.current = "idle";
      }
      return;
    }
    if (assigneeSelectionStateRef.current === "idle") {
      assigneeSelectionStateRef.current = "pending";
    }
    if (canAssign) {
      if (assigneeSelectionStateRef.current === "pending" && initialAssignedUser !== void 0 && // Skip pre-population if the thread is already assigned to this user — doing so
      // would show "Assigning to: Alice" and enable the submit button for a no-op call.
      initialAssignedUser !== assignedUser) {
        updateDraft({ assignedUser: initialAssignedUser });
        assigneeSelectionStateRef.current = "auto-populated";
      }
    } else if (assigneeSelectionStateRef.current === "auto-populated") {
      updateDraft({ assignedUser: void 0 });
      assigneeSelectionStateRef.current = "pending";
    }
  }, [isSelected, initialAssignedUser, canAssign, assignedUser, updateDraft]);
  const lastSubmittedAssignedUserRef = useRef(lastSubmittedAssignedUser);
  lastSubmittedAssignedUserRef.current = lastSubmittedAssignedUser;
  const onDraftChangeRef = useRef(onDraftChange);
  onDraftChangeRef.current = onDraftChange;
  const threadIdRef = useRef(threadId);
  threadIdRef.current = threadId;
  useEffect(() => {
    return () => {
      var _a2;
      const { current } = effectiveDraftRef;
      if (current.assignedUser !== void 0 && current.assignedUser === lastSubmittedAssignedUserRef.current && current.editorState === void 0 && !hasCommentEdits(current.commentEdits)) {
        (_a2 = onDraftChangeRef.current) == null ? void 0 : _a2.call(onDraftChangeRef, threadIdRef.current, void 0);
      }
    };
  }, []);
  const activeComments = useMemo(
    () => providedActiveComments ?? comments.filter((comment) => !comment.deleted),
    [providedActiveComments, comments]
  );
  const activeCommentEdits = useMemo(() => {
    const { commentEdits } = effectiveDraft;
    if (!commentEdits) return commentEdits;
    const activeIds = new Set(activeComments.map((comment) => comment.id));
    const filtered = Object.fromEntries(
      Object.entries(commentEdits).filter(([commentId]) => activeIds.has(commentId))
    );
    return hasCommentEdits(filtered) ? filtered : void 0;
  }, [effectiveDraft, activeComments]);
  const isAnyCommentEditing = isAnyCommentEditingLocal || hasCommentEdits(activeCommentEdits);
  useEffect(() => {
    let isPromiseCurrent = true;
    if (!isSelected || !canUserEditOrDeleteCommentCallback) {
      setCommentEditDeletePermissions(/* @__PURE__ */ new Map());
      return void 0;
    }
    const checkCommentPermissions = async () => {
      const permissionsMap = /* @__PURE__ */ new Map();
      await Promise.all(
        activeComments.map(async (comment) => {
          const canEdit = await canUserEditOrDeleteCommentCallback(comment.id);
          if (isPromiseCurrent) {
            permissionsMap.set(comment.id, canEdit);
          }
        })
      );
      if (isPromiseCurrent) {
        setCommentEditDeletePermissions(permissionsMap);
      }
    };
    checkCommentPermissions();
    return () => {
      isPromiseCurrent = false;
    };
  }, [isSelected, activeComments, canUserEditOrDeleteCommentCallback]);
  const firstComment = useMemo(() => activeComments[0], [activeComments]);
  const verseTextRef = useRef(null);
  const clearEditorRef = useRef(void 0);
  const clearEditor = useCallback(() => {
    var _a2;
    (_a2 = clearEditorRef.current) == null ? void 0 : _a2.call(clearEditorRef);
    updateDraft({ editorState: void 0 });
  }, [updateDraft]);
  const handleEditorSerializedChange = useCallback(
    (value) => {
      updateDraft({ editorState: hasEditorContent(value) ? value : void 0 });
    },
    [updateDraft]
  );
  const toggleRead = useCallback(() => {
    const newIsRead = !isRead;
    setIsRead(newIsRead);
    if (!newIsRead) {
      setManuallyUnread(true);
    } else {
      setManuallyUnread(false);
    }
    handleReadStatusChange == null ? void 0 : handleReadStatusChange(threadId, newIsRead);
  }, [isRead, handleReadStatusChange, threadId]);
  useEffect(() => {
    setShowAllReplies(false);
  }, [isSelected]);
  useEffect(() => {
    if (isSelected && !isRead && !manuallyUnread && isCommentDraftEmpty(effectiveDraft)) {
      const timer = setTimeout(() => {
        setIsRead(true);
        handleReadStatusChange == null ? void 0 : handleReadStatusChange(threadId, true);
      }, autoReadDelay * 1e3);
      autoReadTimerRef.current = timer;
      return () => clearTimeout(timer);
    }
    if (autoReadTimerRef.current) {
      clearTimeout(autoReadTimerRef.current);
      autoReadTimerRef.current = void 0;
    }
  }, [
    isSelected,
    isRead,
    manuallyUnread,
    autoReadDelay,
    threadId,
    handleReadStatusChange,
    effectiveDraft
  ]);
  const localizedReplies = useMemo(
    () => ({
      singleReply: localizedStrings["%comment_thread_single_reply%"],
      multipleReplies: localizedStrings["%comment_thread_multiple_replies%"]
    }),
    [localizedStrings]
  );
  const localizedAssignedToText = useMemo(() => {
    if (assignedUser === void 0) {
      return void 0;
    }
    if (assignedUser === "") {
      return localizedStrings["%comment_assign_unassigned%"] ?? "Unassigned";
    }
    const displayName = getAssignedUserDisplayName$1(assignedUser, localizedStrings);
    return formatReplacementString(localizedStrings["%comment_assigned_to%"], {
      assignedUser: displayName
    });
  }, [assignedUser, localizedStrings]);
  const replies = useMemo(() => activeComments.slice(1), [activeComments]);
  const replyCount = useMemo(() => replies.length ?? 0, [replies.length]);
  const hasReplies = useMemo(() => replyCount > 0, [replyCount]);
  const visibleReplies = useMemo(() => {
    if (showAllReplies || replyCount <= 2) {
      return replies;
    }
    const lastTwoIds = new Set(replies.slice(-2).map((reply) => reply.id));
    return replies.filter(
      (reply) => {
        var _a2;
        return lastTwoIds.has(reply.id) || ((_a2 = effectiveDraft.commentEdits) == null ? void 0 : _a2[reply.id]) !== void 0;
      }
    );
  }, [replies, replyCount, showAllReplies, effectiveDraft.commentEdits]);
  const hiddenReplyCount = useMemo(() => {
    if (showAllReplies || replyCount <= 2) {
      return 0;
    }
    return replyCount - visibleReplies.length;
  }, [replyCount, showAllReplies, visibleReplies.length]);
  const replyText = useMemo(
    () => replyCount === 1 ? localizedReplies.singleReply : formatReplacementString(localizedReplies.multipleReplies, { count: replyCount }),
    [replyCount, localizedReplies]
  );
  const hiddenReplyText = useMemo(
    () => hiddenReplyCount === 1 ? localizedReplies.singleReply : formatReplacementString(localizedReplies.multipleReplies, { count: hiddenReplyCount }),
    [hiddenReplyCount, localizedReplies]
  );
  useEffect(() => {
    if (!isSelected && isAnyCommentEditing && hasReplies) {
      setIsAnyCommentEditingLocal(false);
    }
  }, [isSelected, isAnyCommentEditing, hasReplies]);
  const handleSubmitComment = useCallback(
    async (e) => {
      if (e) e.stopPropagation();
      const contents = hasEditorContent(pendingCommentEditorState) ? editorStateToHtml(pendingCommentEditorState) : void 0;
      if (pendingCommentAssignedUser !== void 0) {
        const success = await handleAddCommentToThread({
          threadId,
          contents,
          assignedUser: pendingCommentAssignedUser
        });
        if (success) {
          setLastSubmittedAssignedUser(pendingCommentAssignedUser);
          if (contents) {
            clearEditor();
          }
        }
        return;
      }
      if (contents) {
        const newCommentId = await handleAddCommentToThread({ threadId, contents });
        if (newCommentId) {
          clearEditor();
        }
      }
    },
    [
      clearEditor,
      pendingCommentEditorState,
      handleAddCommentToThread,
      pendingCommentAssignedUser,
      threadId
    ]
  );
  const handleAddCommentToThreadWithContents = useCallback(
    async (options) => {
      const contents = hasEditorContent(pendingCommentEditorState) ? editorStateToHtml(pendingCommentEditorState) : void 0;
      const resolvedAssignedUser = options.status ? options.assignedUser : pendingCommentAssignedUser ?? options.assignedUser;
      const success = await handleAddCommentToThread({
        ...options,
        contents,
        assignedUser: resolvedAssignedUser
      });
      if (success) {
        if (resolvedAssignedUser !== void 0) {
          setLastSubmittedAssignedUser(resolvedAssignedUser);
        }
        if (contents) {
          clearEditor();
        }
      }
      return success;
    },
    [clearEditor, pendingCommentEditorState, handleAddCommentToThread, pendingCommentAssignedUser]
  );
  if (activeComments.length === 0) return void 0;
  const isAssignDisabled = !canAssign || !assignableUsers || assignableUsers.length === 0 || !assignableUsers.includes(currentUser);
  const isSubmitDisabled = !hasEditorContent(pendingCommentEditorState) && (pendingCommentAssignedUser === void 0 || pendingCommentAssignedUser === lastSubmittedAssignedUser);
  const defaultRootComment = /* @__PURE__ */ jsx(
    CommentItem,
    {
      comment: firstComment,
      localizedStrings,
      isThreadExpanded: isSelected,
      threadStatus,
      handleAddCommentToThread: handleAddCommentToThreadWithContents,
      handleUpdateComment,
      handleDeleteComment,
      onEditingChange: setIsAnyCommentEditingLocal,
      canEditOrDelete: (!isAnyCommentEditing && commentEditDeletePermissions.get(firstComment.id)) ?? false,
      canUserResolveThread: canResolve,
      draftEditorState: (_a = effectiveDraft.commentEdits) == null ? void 0 : _a[firstComment.id],
      onDraftEditorStateChange: (value) => updateCommentEditDraft(firstComment.id, value)
    }
  );
  return /* @__PURE__ */ jsx(
    Card,
    {
      role: "option",
      "aria-selected": isSelected,
      id: getCommentThreadElementId(threadId),
      className: cn(
        // `border-s-4` is always present so the bar's width is reserved on every card and
        // selecting one does not shift its content sideways. Logical property, so it follows RTL.
        "tw:group tw:w-full tw:rounded-none tw:border-s-4 tw:p-3 tw:outline-hidden tw:transition-all tw:duration-200 tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
        { "tw:cursor-pointer tw:hover:shadow-md": !isSelected },
        // Selection rides the leading bar and elevation, never the background. The background
        // channel already carries three meanings (unread, resolved, read) and cannot express a
        // fourth. The bar is `foreground` rather than `primary` because `primary` measures 2.38:1
        // against the card in paratext-dark, below the 3:1 non-text minimum — see
        // active-comment-bar-contrast.test.ts.
        {
          "tw:border-foreground tw:shadow-md": isSelected,
          "tw:border-transparent": !isSelected
        },
        // Status keeps the background channel. `--card` is the surface token; text-on-* tokens
        // like `--primary-foreground` are not surfaces and render near-white in paratext-dark.
        {
          "tw:bg-card": threadStatus !== "Resolved" && isRead,
          "tw:bg-muted": threadStatus === "Resolved",
          "tw:bg-accent": !isRead && threadStatus !== "Resolved"
        }
      ),
      onClick: () => {
        handleSelectThread(threadId);
      },
      tabIndex: -1,
      children: /* @__PURE__ */ jsxs(CardContent, { className: "tw:flex tw:flex-col tw:gap-2 tw:p-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "tw:flex tw:flex-col tw:content-center tw:items-start tw:gap-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
            localizedAssignedToText && /* @__PURE__ */ jsx(Badge, { className: "tw:rounded-sm tw:bg-input tw:text-sm tw:font-normal tw:text-primary tw:hover:bg-input", children: localizedAssignedToText }),
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                onClick: (e) => {
                  e.stopPropagation();
                  toggleRead();
                },
                className: "tw:text-muted-foreground tw:transition tw:hover:text-foreground",
                "aria-label": isRead ? localizedStrings["%comment_aria_mark_as_unread%"] ?? "Mark as unread" : localizedStrings["%comment_aria_mark_as_read%"] ?? "Mark as read",
                children: isRead ? /* @__PURE__ */ jsx(MailOpen, {}) : /* @__PURE__ */ jsx(Mail, {})
              }
            ),
            resolveActionSlot === void 0 ? (
              // Generic status-resolve check (used by non-conflict threads and, via ConflictThread
              // leaving this slot undefined, by non-verseText conflicts, which resolve through a
              // plain status change). ConflictThread overrides this slot for verseText conflicts.
              /* @__PURE__ */ jsx(
                ResolveCheckButton,
                {
                  show: canResolve && threadStatus !== "Resolved",
                  onClick: () => handleAddCommentToThreadWithContents({ threadId, status: "Resolved" }),
                  ariaLabel: localizedStrings["%comment_aria_resolve_thread%"] ?? "Resolve thread"
                }
              )
            ) : resolveActionSlot
          ] }),
          /* @__PURE__ */ jsx("div", { className: "tw:flex tw:max-w-full tw:flex-wrap tw:items-baseline tw:gap-2", children: /* @__PURE__ */ jsxs(
            "p",
            {
              ref: verseTextRef,
              className: cn(
                "tw:flex-1 tw:overflow-hidden tw:text-ellipsis tw:text-sm tw:font-normal tw:text-muted-foreground",
                {
                  "tw:overflow-visible tw:text-clip tw:whitespace-normal tw:break-words": isVerseExpanded
                },
                { "tw:whitespace-nowrap": !isVerseExpanded }
              ),
              children: [
                verseRef && onVerseRefClick ? /* @__PURE__ */ jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "tw:h-auto tw:px-1 tw:py-0 tw:text-sm tw:font-normal tw:text-muted-foreground",
                    onClick: (e) => {
                      e.stopPropagation();
                      onVerseRefClick(thread);
                    },
                    children: verseRef
                  }
                ) : verseRef,
                /* @__PURE__ */ jsxs(
                  "span",
                  {
                    className: classNameForVerseText,
                    ...contentZoomTextProps,
                    children: [
                      firstComment.contextBefore,
                      /* @__PURE__ */ jsx("span", { className: "tw:font-bold", children: firstComment.selectedText }),
                      firstComment.contextAfter
                    ]
                  }
                )
              ]
            }
          ) }),
          rootContentSlot ?? defaultRootComment
        ] }),
        /* @__PURE__ */ jsxs(Fragment$1, { children: [
          hasReplies && !isSelected && /* @__PURE__ */ jsxs("div", { className: "tw:flex tw:items-center tw:gap-5", children: [
            /* @__PURE__ */ jsx("div", { className: "tw:w-8", children: /* @__PURE__ */ jsx(Separator, {}) }),
            /* @__PURE__ */ jsx("p", { className: "tw:text-sm tw:text-muted-foreground", children: replyText })
          ] }),
          !isSelected && hasEditorContent(pendingCommentEditorState) && /* @__PURE__ */ jsx(
            Editor,
            {
              editorSerializedState: pendingCommentEditorState,
              onSerializedChange: handleEditorSerializedChange,
              placeholder: localizedStrings["%comment_replyOrAssign%"]
            }
          ),
          isSelected && /* @__PURE__ */ jsxs(Fragment$1, { children: [
            spaceRootContentFromReplies && visibleReplies.length > 0 && /* @__PURE__ */ jsx("div", { className: "tw:h-2", "data-slot": "root-content-reply-gap", "aria-hidden": "true" }),
            hiddenReplyCount > 0 && /* @__PURE__ */ jsxs(
              "div",
              {
                className: "tw:flex tw:cursor-pointer tw:items-center tw:gap-5 tw:py-2",
                onClick: (e) => {
                  e.stopPropagation();
                  setShowAllReplies(true);
                },
                role: "button",
                tabIndex: 0,
                onKeyDown: (e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowAllReplies(true);
                  }
                },
                children: [
                  /* @__PURE__ */ jsx("div", { className: "tw:w-8", children: /* @__PURE__ */ jsx(Separator, {}) }),
                  /* @__PURE__ */ jsxs("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
                    /* @__PURE__ */ jsx("p", { className: "tw:text-sm tw:text-muted-foreground", children: hiddenReplyText }),
                    showAllReplies ? /* @__PURE__ */ jsx(ChevronUp, {}) : /* @__PURE__ */ jsx(ChevronDown, {})
                  ] })
                ]
              }
            ),
            visibleReplies.map((reply) => {
              var _a2;
              return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
                CommentItem,
                {
                  comment: reply,
                  localizedStrings,
                  isReply: true,
                  isThreadExpanded: isSelected,
                  handleUpdateComment,
                  handleDeleteComment,
                  onEditingChange: setIsAnyCommentEditingLocal,
                  canEditOrDelete: (!isAnyCommentEditing && commentEditDeletePermissions.get(reply.id)) ?? false,
                  draftEditorState: (_a2 = effectiveDraft.commentEdits) == null ? void 0 : _a2[reply.id],
                  onDraftEditorStateChange: (value) => updateCommentEditDraft(reply.id, value)
                }
              ) }, reply.id);
            }),
            canUserAddCommentToThread !== false && (!isAnyCommentEditing || hasEditorContent(pendingCommentEditorState)) && /* @__PURE__ */ jsx(
              "div",
              {
                role: "textbox",
                tabIndex: -1,
                className: "tw:w-full tw:space-y-2",
                onClick: (e) => e.stopPropagation(),
                onKeyDownCapture: (e) => {
                  if (didPressCtrlOrCmdEnter(e)) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (hasEditorContent(pendingCommentEditorState) || pendingCommentAssignedUser !== void 0 && pendingCommentAssignedUser !== lastSubmittedAssignedUser) {
                      handleSubmitComment();
                    }
                  }
                },
                onKeyDown: (e) => {
                  handleEditorKeyNavigation(e);
                  if (e.key === "Enter" || e.key === " ") {
                    e.stopPropagation();
                  }
                },
                children: /* @__PURE__ */ jsx(
                  Editor,
                  {
                    editorSerializedState: pendingCommentEditorState,
                    onSerializedChange: handleEditorSerializedChange,
                    placeholder: threadStatus === "Resolved" ? localizedStrings["%comment_reopenResolved%"] : localizedStrings["%comment_replyOrAssign%"],
                    autoFocus: true,
                    onClear: (clearFn) => {
                      clearEditorRef.current = clearFn;
                    },
                    actions: /* @__PURE__ */ jsxs(Fragment$1, { children: [
                      pendingCommentAssignedUser !== void 0 && (hasEditorContent(pendingCommentEditorState) || pendingCommentAssignedUser !== lastSubmittedAssignedUser) ? /* @__PURE__ */ jsx("span", { className: "tw:flex-1 tw:text-sm tw:text-muted-foreground", children: formatReplacementString(
                        localizeOrFallback(
                          "%comment_assigning_to%",
                          localizedStrings,
                          "Assigning to: {assignedUser}"
                        ),
                        {
                          assignedUser: getAssignedUserDisplayName$1(
                            pendingCommentAssignedUser,
                            localizedStrings
                          )
                        }
                      ) }) : /* @__PURE__ */ jsx("div", { className: "tw:flex-1" }),
                      /* @__PURE__ */ jsxs(Popover, { open: isAssignPopoverOpen, onOpenChange: setIsAssignPopoverOpen, children: [
                        /* @__PURE__ */ jsxs(Tooltip, { children: [
                          /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
                            DisabledTooltipWrapper,
                            {
                              isDisabled: isAssignDisabled,
                              disabledExplanation: localizeOrFallback(
                                "%comment_aria_assign_user%",
                                localizedStrings,
                                "Assign user"
                              ),
                              children: /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
                                Button,
                                {
                                  size: "icon-sm",
                                  variant: "outline",
                                  className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                                  disabled: isAssignDisabled,
                                  "aria-label": localizeOrFallback(
                                    "%comment_aria_assign_user%",
                                    localizedStrings,
                                    "Assign user"
                                  ),
                                  children: /* @__PURE__ */ jsx(AtSign, {})
                                }
                              ) })
                            }
                          ) }),
                          /* @__PURE__ */ jsx(TooltipContent, { children: localizeOrFallback(
                            "%comment_aria_assign_user%",
                            localizedStrings,
                            "Assign user"
                          ) })
                        ] }),
                        /* @__PURE__ */ jsx(
                          PopoverContent,
                          {
                            className: "tw:w-auto tw:p-0",
                            align: "end",
                            onKeyDown: (e) => {
                              if (e.key === "Escape") {
                                e.stopPropagation();
                                setIsAssignPopoverOpen(false);
                              }
                            },
                            children: /* @__PURE__ */ jsx(Command, { children: /* @__PURE__ */ jsx(CommandList, { children: assignableUsers == null ? void 0 : assignableUsers.map((user) => /* @__PURE__ */ jsx(
                              CommandItem,
                              {
                                onSelect: () => {
                                  updateDraft({
                                    assignedUser: user !== assignedUser ? user : void 0
                                  });
                                  assigneeSelectionStateRef.current = "user-selected";
                                  setLastSubmittedAssignedUser(void 0);
                                  setIsAssignPopoverOpen(false);
                                },
                                className: "tw:flex tw:items-center",
                                children: /* @__PURE__ */ jsx("span", { children: getAssignedUserDisplayName$1(user, localizedStrings) })
                              },
                              user || "unassigned"
                            )) }) })
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxs(Tooltip, { children: [
                        /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
                          DisabledTooltipWrapper,
                          {
                            isDisabled: isSubmitDisabled,
                            disabledExplanation: localizeOrFallback(
                              "%comment_aria_submit_comment%",
                              localizedStrings,
                              "Submit comment"
                            ),
                            className: "tw:inline-flex",
                            children: /* @__PURE__ */ jsx(
                              Button,
                              {
                                size: "icon-sm",
                                onClick: handleSubmitComment,
                                className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                                disabled: isSubmitDisabled,
                                "aria-label": localizeOrFallback(
                                  "%comment_aria_submit_comment%",
                                  localizedStrings,
                                  "Submit comment"
                                ),
                                children: /* @__PURE__ */ jsx(ArrowUp, {})
                              }
                            )
                          }
                        ) }),
                        /* @__PURE__ */ jsx(TooltipContent, { children: localizeOrFallback(
                          "%comment_aria_submit_comment%",
                          localizedStrings,
                          "Submit comment"
                        ) })
                      ] })
                    ] })
                  }
                )
              }
            )
          ] })
        ] })
      ] })
    }
  );
});
const DIFF_HTML_CLASSES = cn(
  COMMENT_BODY_PROSE_CLASSES,
  // `prose` gives block children (the top-level blockquote wrapper, and any p — whether nested
  // inside that blockquote or, in the non-verseText fallback, a direct child) vertical margins that
  // make these already-compact cards feel bulky. Zero both so the diff sits flush inside the card.
  "tw:[&>blockquote]:my-0 tw:[&_p]:my-0",
  "tw:[&_u]:font-semibold tw:[&_u]:text-success-foreground tw:[&_u]:no-underline",
  "tw:[&_s]:text-destructive tw:[&_s]:line-through"
);
const trimDiffSpanWhitespace = (html) => html.replace(/(\s+)(<\/[us]>)/g, "$2$1");
const sanitizeDiffHtml = (html) => trimDiffSpanWhitespace(sanitizeHtml(html));
function DiffHtml({ html }) {
  const contentZoomTextProps = useContentZoomTextProps();
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: DIFF_HTML_CLASSES,
      ...contentZoomTextProps,
      dangerouslySetInnerHTML: { __html: html }
    }
  );
}
function ConflictNoteCard({
  comment,
  localizedStrings,
  availableActions = "acceptOrReject",
  resolvedResolution,
  onResolve,
  isResolving = false
}) {
  const [internalResolution, setInternalResolution] = useState("accept");
  const staleNoticeId = useId();
  const optionIdPrefix = useId();
  const contentZoomTextProps = useContentZoomTextProps();
  const isLoading = availableActions === "loading";
  const isStale = availableActions === "accept";
  const isReadOnly = availableActions === "none";
  const showMerge = availableActions === "acceptRejectOrMerge";
  const effectiveResolution = isStale ? "accept" : internalResolution;
  const sanitizedRejected = useMemo(
    () => sanitizeDiffHtml(comment.rejectedText ?? ""),
    [comment.rejectedText]
  );
  const sanitizedAccepted = useMemo(
    () => sanitizeDiffHtml(comment.acceptedText ?? ""),
    [comment.acceptedText]
  );
  const sanitizedMerged = useMemo(
    () => sanitizeDiffHtml(comment.mergedText ?? ""),
    [comment.mergedText]
  );
  const sanitizedContents = useMemo(() => sanitizeHtml(comment.contents), [comment.contents]);
  if (!isVerseTextConflictNote(comment)) {
    return /* @__PURE__ */ jsx(DiffHtml, { html: sanitizedContents });
  }
  const handleChange = (value) => {
    const next = value === "reject" || value === "merge" ? value : "accept";
    setInternalResolution(next);
  };
  const staleNotice = localizedStrings["%conflict_note_stale_notice%"] ?? "The verse was edited after this conflict was recorded, so 'Use the other change' is no longer available. Keep the current text to resolve.";
  const mergeOption = showMerge ? [
    {
      value: "merge",
      label: localizedStrings["%conflict_note_option_combine%"] ?? "Combine both changes",
      html: sanitizedMerged
    }
  ] : [];
  const radioOptions = [
    {
      value: "accept",
      label: localizedStrings["%conflict_note_option_keep_current%"] ?? "Keep the current text",
      html: sanitizedAccepted
    },
    {
      value: "reject",
      label: localizedStrings["%conflict_note_option_use_other%"] ?? "Use the other change",
      html: sanitizedRejected
    },
    ...mergeOption
  ];
  const isNoChangeSelected = effectiveResolution === "accept";
  const isSaveDisabled = isResolving || isNoChangeSelected;
  let saveTooltip;
  if (isNoChangeSelected) {
    saveTooltip = localizedStrings["%conflict_note_save_disabled_tooltip%"] ?? "Keeping the current text makes no change — resolve the thread with the ✓ to keep it.";
  } else if (!isResolving) {
    saveTooltip = localizedStrings["%conflict_note_save_warning%"] ?? "This can't be undone.";
  }
  const noResultText = localizedStrings["%conflict_note_no_result%"] ?? "No result preview available.";
  const noResultPreview = /* @__PURE__ */ jsx("p", { className: "tw:text-muted-foreground", children: noResultText });
  const renderResolvedText = (text) => text ? /* @__PURE__ */ jsx(
    "p",
    {
      className: "tw:whitespace-pre-wrap tw:text-foreground",
      ...contentZoomTextProps,
      children: text
    }
  ) : noResultPreview;
  const renderResolvedResult = () => {
    const outcome = resolvedResolution ?? "accept";
    if (outcome === "merged")
      return comment.mergedText ? /* @__PURE__ */ jsx(DiffHtml, { html: sanitizedMerged }) : noResultPreview;
    if (outcome === "reject") return renderResolvedText(comment.rejectedResultText);
    return renderResolvedText(comment.resultText);
  };
  const isStaleRejectOption = (option) => isStale && option.value === "reject";
  const renderOptionCard = (option) => {
    const isSelected = effectiveResolution === option.value;
    const optionId = `${optionIdPrefix}-${option.value}`;
    const isStaleReject = isStaleRejectOption(option);
    return (
      // The whole card is a label, so a click anywhere in it forwards to the radio and selects the
      // option (no separate click handler needed). The radio keeps role=radio / aria-checked /
      // arrow-key navigation; its aria-label names the option so the inline diff isn't pulled into
      // the accessible name. The visible label text is aria-hidden to avoid announcing it twice (once
      // as the radio's name, once as adjacent text). The radio and title sit side by side on one flex
      // row (a `gap`, not a directional margin, so the browser's own RTL mirroring of `flex-row`
      // puts the radio on the correct logical side without extra dir-aware classes), with the diff
      // below as a sibling.
      /* @__PURE__ */ jsxs(
        "label",
        {
          htmlFor: optionId,
          "data-slot": "conflict-resolution-option",
          "data-value": option.value,
          className: cn(
            "tw:flex tw:flex-col tw:gap-1 tw:rounded-md tw:border tw:p-2",
            "tw:focus-within:ring-2 tw:focus-within:ring-ring tw:focus-within:ring-offset-1",
            isSelected ? "tw:border-border tw:bg-accent/50" : "tw:border-transparent tw:hover:bg-accent/30",
            isStaleReject ? "tw:cursor-not-allowed tw:opacity-60" : "tw:cursor-pointer"
          ),
          children: [
            /* @__PURE__ */ jsxs("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
              /* @__PURE__ */ jsx(
                RadioGroupItem,
                {
                  id: optionId,
                  value: option.value,
                  "aria-label": option.label,
                  disabled: isStaleReject,
                  "aria-describedby": isStaleReject ? staleNoticeId : void 0
                }
              ),
              /* @__PURE__ */ jsx("span", { "aria-hidden": true, className: "tw:font-medium", children: option.label })
            ] }),
            isStaleReject && // aria-describedby links the option to this visually-hidden notice so assistive tech
            // announces why the choice is read-only.
            /* @__PURE__ */ jsx("span", { id: staleNoticeId, className: "tw:sr-only", children: staleNotice }),
            /* @__PURE__ */ jsx(DiffHtml, { html: option.html })
          ]
        },
        option.value
      )
    );
  };
  return (
    // Contain every click inside the card (selecting an option, pressing Save) so it never bubbles
    // up to toggle the enclosing CommentThread open/closed. The thread toggles on click only, so a
    // single onClick guard at the root is enough; this container is not itself an interactive control
    // and needs no keyboard handler (the thread has no keyboard toggle to intercept).
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    /* @__PURE__ */ jsxs("div", { className: "tw:flex tw:flex-col tw:gap-3 tw:text-sm", onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsx("p", { children: localizedStrings["%conflict_note_description_verseText%"] ?? "Conflicting changes were made to the verse text." }),
      isLoading && /* @__PURE__ */ jsxs("div", { className: "tw:flex tw:flex-col tw:gap-2", "data-slot": "conflict-loading", children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "tw:h-8 tw:w-full" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "tw:h-8 tw:w-full" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "tw:h-8 tw:w-24" })
      ] }),
      !isLoading && isReadOnly && renderResolvedResult(),
      !isLoading && !isReadOnly && /* @__PURE__ */ jsxs(Fragment$1, { children: [
        /* @__PURE__ */ jsx("p", { children: localizedStrings["%conflict_note_choose_prompt%"] ?? "Select which change to keep:" }),
        /* @__PURE__ */ jsx(
          RadioGroup,
          {
            value: effectiveResolution,
            onValueChange: handleChange,
            disabled: isResolving,
            "aria-label": localizedStrings["%conflict_note_choose_aria_label%"] ?? "Choose resolution",
            children: radioOptions.map((option) => {
              const isStaleReject = isStaleRejectOption(option);
              if (!isStaleReject) return renderOptionCard(option);
              return /* @__PURE__ */ jsx(TooltipProvider, { delayDuration: 0, children: /* @__PURE__ */ jsxs(Tooltip, { children: [
                /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: renderOptionCard(option) }),
                /* @__PURE__ */ jsx(TooltipContent, { children: staleNotice })
              ] }) }, option.value);
            })
          }
        ),
        /* @__PURE__ */ jsx(TooltipProvider, { delayDuration: 0, children: /* @__PURE__ */ jsxs(Tooltip, { children: [
          /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
            DisabledTooltipWrapper,
            {
              isDisabled: isSaveDisabled && saveTooltip !== void 0,
              disabledExplanation: saveTooltip,
              className: "tw:inline-flex tw:self-start",
              children: /* @__PURE__ */ jsx(
                Button,
                {
                  size: "sm",
                  disabled: isSaveDisabled,
                  onClick: () => onResolve == null ? void 0 : onResolve(effectiveResolution),
                  children: localizedStrings["%conflict_note_save_and_resolve%"] ?? "Save and resolve"
                }
              )
            }
          ) }),
          saveTooltip && /* @__PURE__ */ jsx(TooltipContent, { children: saveTooltip })
        ] }) })
      ] })
    ] })
  );
}
const RESOLVED_SUMMARY = {
  accept: {
    key: "%conflict_note_summary_resolved_kept_current%",
    fallback: "Conflicting edits were resolved. Kept the current text."
  },
  reject: {
    key: "%conflict_note_summary_resolved_used_other%",
    fallback: "Conflicting edits were resolved. Used the other change."
  },
  merged: {
    key: "%conflict_note_summary_resolved_combined%",
    fallback: "Conflicting edits were resolved. Combined both changes."
  }
};
function ConflictThreadSummary({
  comment,
  localizedStrings,
  resolvedResolution
}) {
  const diffHtml = useMemo(
    () => sanitizeDiffHtml(comment.rejectedText ?? ""),
    [comment.rejectedText]
  );
  if (resolvedResolution) {
    const { key, fallback } = RESOLVED_SUMMARY[resolvedResolution];
    return /* @__PURE__ */ jsx("p", { className: "tw:text-sm tw:font-normal tw:text-muted-foreground", children: localizedStrings[key] ?? fallback });
  }
  const prompt = localizedStrings["%conflict_note_summary_unresolved%"] ?? "Conflicting edits. Choose which change to keep.";
  return /* @__PURE__ */ jsxs("div", { className: "tw:flex tw:flex-col tw:gap-1", children: [
    /* @__PURE__ */ jsx("p", { className: "tw:text-sm tw:font-normal tw:text-muted-foreground", children: prompt }),
    diffHtml ? /* @__PURE__ */ jsx(DiffHtml, { html: diffHtml }) : void 0
  ] });
}
function resolutionToOutcome(resolution) {
  if (resolution === "reject") return "reject";
  if (resolution === "merge") return "merged";
  return "accept";
}
function useConflictResolution({
  threadId,
  threadStatus,
  isSelected,
  activeComments,
  conflictResolution
}) {
  const [conflictOptions, setConflictOptions] = useState("loading");
  const [isResolving, setIsResolving] = useState(false);
  const [optimisticOutcome, setOptimisticOutcome] = useState();
  const getOptions = conflictResolution == null ? void 0 : conflictResolution.getOptions;
  const resolveCallback = conflictResolution == null ? void 0 : conflictResolution.resolve;
  useEffect(() => {
    let isCurrent = true;
    if (!isSelected) {
      setConflictOptions("loading");
      return void 0;
    }
    const check = async () => {
      let options;
      try {
        options = getOptions ? await getOptions(threadId) : "none";
      } catch {
        options = "none";
      }
      if (!isCurrent) return;
      setConflictOptions(options);
      if (options !== "none") setOptimisticOutcome(void 0);
    };
    check();
    return () => {
      isCurrent = false;
    };
  }, [isSelected, threadId, threadStatus, getOptions]);
  const isResolvingRef = useRef(false);
  const resolve = useCallback(
    async (resolution) => {
      if (!resolveCallback || isResolvingRef.current) return;
      isResolvingRef.current = true;
      setIsResolving(true);
      try {
        const success = await resolveCallback(threadId, resolution);
        if (success) {
          setOptimisticOutcome(resolutionToOutcome(resolution));
          setConflictOptions("none");
        }
      } catch {
      } finally {
        isResolvingRef.current = false;
        setIsResolving(false);
      }
    },
    [resolveCallback, threadId]
  );
  const derivedResolution = useMemo(() => {
    if (threadStatus !== "Resolved") return void 0;
    for (let i2 = activeComments.length - 1; i2 >= 0; i2 -= 1) {
      if (activeComments[i2].status === "Resolved") {
        return actionToOutcome(activeComments[i2].conflictResolutionAction);
      }
    }
    return "accept";
  }, [threadStatus, activeComments]);
  const resolvedResolution = derivedResolution ?? optimisticOutcome;
  const showResolveCheck = conflictOptions !== "loading" && conflictOptions !== "none";
  return { conflictOptions, isResolving, resolve, resolvedResolution, showResolveCheck };
}
const ConflictThread = memo(function ConflictThread2(props) {
  const {
    comments,
    localizedStrings,
    isSelected = false,
    threadId,
    threadStatus,
    conflictResolution
  } = props;
  const activeComments = useMemo(() => comments.filter((comment) => !comment.deleted), [comments]);
  const rootComment = useMemo(
    () => activeComments.find((comment) => comment.conflictType) ?? activeComments[0],
    [activeComments]
  );
  const { conflictOptions, isResolving, resolve, resolvedResolution, showResolveCheck } = useConflictResolution({
    threadId,
    threadStatus,
    isSelected,
    activeComments,
    conflictResolution
  });
  const isVerseText = isVerseTextConflictNote(rootComment);
  let rootContentSlot;
  if (isVerseText && rootComment) {
    rootContentSlot = isSelected ? /* @__PURE__ */ jsx(
      ConflictNoteCard,
      {
        comment: rootComment,
        localizedStrings,
        availableActions: conflictOptions,
        resolvedResolution,
        onResolve: resolve,
        isResolving
      }
    ) : /* @__PURE__ */ jsx(
      ConflictThreadSummary,
      {
        comment: rootComment,
        localizedStrings,
        resolvedResolution
      }
    );
  }
  let resolveActionSlot;
  if (isVerseText) {
    resolveActionSlot = /* @__PURE__ */ jsx(
      ResolveCheckButton,
      {
        show: showResolveCheck,
        disabled: isResolving,
        onClick: () => resolve("accept"),
        ariaLabel: localizedStrings["%comment_aria_resolve_thread%"] ?? "Resolve thread"
      }
    );
  }
  return /* @__PURE__ */ jsx(
    CommentThread,
    {
      ...props,
      activeComments,
      rootContentSlot,
      resolveActionSlot,
      spaceRootContentFromReplies: isVerseText && isSelected
    }
  );
});
function CommentList({
  className = "",
  classNameForVerseText,
  threads,
  currentUser,
  localizedStrings,
  handleAddCommentToThread,
  handleUpdateComment,
  handleDeleteComment,
  handleReadStatusChange,
  assignableUsers,
  canUserAddCommentToThread,
  canUserAssignThreadCallback,
  canUserResolveThreadCallback,
  canUserEditOrDeleteCommentCallback,
  selectedThreadId: externalSelectedThreadId,
  onSelectedThreadChange,
  onVerseRefClick,
  conflictResolution,
  drafts,
  onDraftChange
}) {
  const [expandedThreadIds, setExpandedThreadIds] = useState(/* @__PURE__ */ new Set());
  const [lastInteractedThreadId, setLastInteractedThreadId] = useState();
  const [lastAssignedUser, setLastAssignedUser] = useState();
  const handleAddCommentToThreadWithTracking = useCallback(
    async (options2) => {
      const result = await handleAddCommentToThread(options2);
      if (result !== void 0 && options2.assignedUser !== void 0 && options2.assignedUser !== "") {
        setLastAssignedUser(options2.assignedUser);
      }
      return result;
    },
    [handleAddCommentToThread]
  );
  useEffect(() => {
    if (externalSelectedThreadId) {
      setExpandedThreadIds((prev) => new Set(prev).add(externalSelectedThreadId));
      setLastInteractedThreadId(externalSelectedThreadId);
    }
  }, [externalSelectedThreadId]);
  const activeThreads = threads.filter(
    (thread) => thread.comments.some((comment) => !comment.deleted)
  );
  const options = activeThreads.map((thread) => ({ id: thread.id }));
  const handleKeyboardSelectThread = useCallback(
    (option) => {
      setExpandedThreadIds((prev) => new Set(prev).add(option.id));
      setLastInteractedThreadId(option.id);
      onSelectedThreadChange == null ? void 0 : onSelectedThreadChange(option.id);
    },
    [onSelectedThreadChange]
  );
  const handleSelectThread = useCallback(
    (threadId) => {
      const isCollapsing = expandedThreadIds.has(threadId);
      setExpandedThreadIds((prev) => {
        const next = new Set(prev);
        if (next.has(threadId)) {
          next.delete(threadId);
        } else {
          next.add(threadId);
        }
        return next;
      });
      setLastInteractedThreadId(threadId);
      onSelectedThreadChange == null ? void 0 : onSelectedThreadChange(isCollapsing ? void 0 : threadId);
    },
    [expandedThreadIds, onSelectedThreadChange]
  );
  const { listboxRef, activeId, handleKeyDown } = useListbox({
    options,
    onOptionSelect: handleKeyboardSelectThread
  });
  const handleKeyDownWithEscape = useCallback(
    (event) => {
      if (event.key === "Escape") {
        if (lastInteractedThreadId && expandedThreadIds.has(lastInteractedThreadId)) {
          setExpandedThreadIds((prev) => {
            const next = new Set(prev);
            next.delete(lastInteractedThreadId);
            return next;
          });
          setLastInteractedThreadId(void 0);
          onSelectedThreadChange == null ? void 0 : onSelectedThreadChange(void 0);
        }
        event.preventDefault();
        event.stopPropagation();
      } else {
        handleKeyDown(event);
      }
    },
    [lastInteractedThreadId, expandedThreadIds, handleKeyDown, onSelectedThreadChange]
  );
  return /* @__PURE__ */ jsx(
    "div",
    {
      id: COMMENT_LIST_ELEMENT_ID,
      role: "listbox",
      tabIndex: 0,
      ref: listboxRef,
      "aria-activedescendant": activeId ?? void 0,
      "aria-label": "Comments",
      className: cn(
        "tw:flex tw:w-full tw:flex-col tw:outline-hidden tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
        className
      ),
      onKeyDown: handleKeyDownWithEscape,
      children: activeThreads.map((thread) => {
        const commonThreadProps = {
          classNameForVerseText,
          comments: thread.comments,
          localizedStrings,
          verseRef: thread.verseRef,
          handleSelectThread,
          threadId: thread.id,
          thread,
          isRead: thread.isRead,
          isSelected: expandedThreadIds.has(thread.id),
          currentUser,
          assignedUser: thread.assignedUser,
          threadStatus: thread.status,
          handleAddCommentToThread: handleAddCommentToThreadWithTracking,
          handleUpdateComment,
          handleDeleteComment,
          handleReadStatusChange,
          assignableUsers,
          canUserAddCommentToThread,
          canUserAssignThreadCallback,
          canUserResolveThreadCallback,
          canUserEditOrDeleteCommentCallback,
          onVerseRefClick,
          initialAssignedUser: lastAssignedUser,
          draft: drafts == null ? void 0 : drafts[thread.id],
          onDraftChange
        };
        return /* @__PURE__ */ jsx(
          "div",
          {
            className: cn("tw:border-b tw:border-border tw:last:border-b-0", {
              "tw:opacity-60": thread.status === "Resolved"
            }),
            children: thread.type === "Conflict" ? /* @__PURE__ */ jsx(ConflictThread, { ...commonThreadProps, conflictResolution }) : /* @__PURE__ */ jsx(CommentThread, { ...commonThreadProps })
          },
          thread.id
        );
      })
    }
  );
}
const ContentZoomRoot = forwardRef(
  function ContentZoomRoot2({ area, as = "div", label, ...props }, ref) {
    const markerAttributes = {
      [CONTENT_ZOOM_ROOT_ATTRIBUTE]: area ?? "",
      ...label ? { [CONTENT_ZOOM_LABEL_ATTRIBUTE]: label } : {}
    };
    return createElement(as, { ...props, ...markerAttributes, ref });
  }
);
ContentZoomRoot.displayName = "ContentZoomRoot";
function DataTableViewOptions({ table }) {
  return /* @__PURE__ */ jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", className: "tw:ml-auto tw:hidden tw:h-8 tw:lg:flex", children: [
      /* @__PURE__ */ jsx(FilterIcon, { className: "tw:mr-2 tw:h-4 tw:w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "end", className: "tw:w-[150px]", children: [
      /* @__PURE__ */ jsx(DropdownMenuLabel, { children: "Toggle columns" }),
      /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
      table.getAllColumns().filter((column) => column.getCanHide()).map((column) => {
        return /* @__PURE__ */ jsx(
          DropdownMenuCheckboxItem,
          {
            className: "tw:capitalize",
            checked: column.getIsVisible(),
            onCheckedChange: (value) => column.toggleVisibility(!!value),
            children: column.id
          },
          column.id
        );
      })
    ] })
  ] });
}
function Select({ ...props }) {
  return /* @__PURE__ */ jsx(Select$1.Root, { "data-slot": "select", ...props });
}
function SelectGroup({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    Select$1.Group,
    {
      "data-slot": "select-group",
      className: cn("tw:scroll-my-1 tw:p-1", className),
      ...props
    }
  );
}
function SelectValue({ ...props }) {
  return /* @__PURE__ */ jsx(Select$1.Value, { "data-slot": "select-value", ...props });
}
function SelectTrigger({ className, size = "default", children, ...props }) {
  const dir = readDirection();
  return /* @__PURE__ */ jsxs(
    Select$1.Trigger,
    {
      "data-slot": "select-trigger",
      "data-size": size,
      className: cn(
        "pr-twp tw:flex tw:w-fit tw:items-center tw:gap-2 tw:rounded-lg tw:border tw:border-input tw:bg-transparent tw:py-2 tw:pe-2 tw:ps-2.5 tw:text-sm tw:whitespace-nowrap tw:transition-colors tw:outline-none tw:select-none tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:data-placeholder:text-muted-foreground tw:data-[size=default]:h-8 tw:data-[size=sm]:h-7 tw:data-[size=sm]:rounded-[min(var(--tw-radius-md),10px)] tw:*:data-[slot=select-value]:line-clamp-1 tw:*:data-[slot=select-value]:flex tw:*:data-[slot=select-value]:flex-1 tw:*:data-[slot=select-value]:items-center tw:*:data-[slot=select-value]:gap-1.5 tw:*:data-[slot=select-value]:text-start tw:dark:bg-input/30 tw:dark:hover:bg-input/50 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        className
      ),
      dir,
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(Select$1.Icon, { asChild: true, children: /* @__PURE__ */ jsx(IconSelector, { className: "tw:pointer-events-none tw:size-4 tw:text-muted-foreground" }) })
      ]
    }
  );
}
function SelectContent({
  className,
  children,
  // CUSTOM: Restored 'popper' as the default position (was changed to 'item-aligned' by the shadcn
  // upgrade). In 'popper' mode Radix exposes --radix-select-trigger-width, which is required for
  // min-w-(--radix-select-trigger-width) to work. In 'item-aligned' mode that variable is not set,
  // making the popup width unconstrained. Existing callers all expected popper (dropdown) behavior.
  position = "popper",
  align = "center",
  // CUSTOM: Destructure style to merge with the shared z-index constant below
  style,
  // CUSTOM: Destructure onCloseAutoFocus so the caller's handler runs inside the gated handler below
  onCloseAutoFocus,
  ...props
}) {
  const handleCloseAutoFocus = useGatedCloseAutoFocus(onCloseAutoFocus);
  const dir = readDirection();
  return /* @__PURE__ */ jsx(Select$1.Portal, { children: /* @__PURE__ */ jsxs(
    Select$1.Content,
    {
      "data-slot": "select-content",
      "data-align-trigger": position === "item-aligned",
      className: cn(
        "pr-twp tw:relative tw:max-h-(--radix-select-content-available-height) tw:data-[align-trigger=true]:min-w-(--radix-select-trigger-width) tw:data-[align-trigger=false]:min-w-36 tw:origin-(--radix-select-content-transform-origin) tw:overflow-x-hidden tw:overflow-y-auto tw:rounded-lg tw:bg-popover tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[align-trigger=true]:animate-none tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative",
        position === "popper" && "tw:data-[side=bottom]:translate-y-1 tw:data-[side=left]:-translate-x-1 tw:rtl:data-[side=left]:translate-x-1 tw:data-[side=right]:translate-x-1 tw:rtl:data-[side=right]:-translate-x-1 tw:data-[side=top]:-translate-y-1",
        className
      ),
      style: { zIndex: Z_INDEX_ABOVE_DOCK, ...style },
      position,
      align,
      onCloseAutoFocus: handleCloseAutoFocus,
      ...props,
      children: [
        /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
        /* @__PURE__ */ jsx(
          Select$1.Viewport,
          {
            "data-position": position,
            className: cn(
              "tw:data-[position=popper]:h-(--radix-select-trigger-height) tw:data-[position=popper]:w-full tw:data-[position=popper]:min-w-(--radix-select-trigger-width)",
              position === "popper" && "tw:"
            ),
            children: /* @__PURE__ */ jsx("div", { dir, children })
          }
        ),
        /* @__PURE__ */ jsx(SelectScrollDownButton, {})
      ]
    }
  ) });
}
function SelectLabel({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    Select$1.Label,
    {
      "data-slot": "select-label",
      className: cn("pr-twp tw:px-1.5 tw:py-1 tw:text-xs tw:text-muted-foreground", className),
      ...props
    }
  );
}
function SelectItem({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    Select$1.Item,
    {
      "data-slot": "select-item",
      className: cn(
        "pr-twp tw:relative tw:flex tw:w-full tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:*:[span]:last:flex tw:*:[span]:last:items-center tw:*:[span]:last:gap-2",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx("span", { className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:size-4 tw:items-center tw:justify-center", children: /* @__PURE__ */ jsx(Select$1.ItemIndicator, { children: /* @__PURE__ */ jsx(IconCheck, { className: "tw:pointer-events-none" }) }) }),
        /* @__PURE__ */ jsx(Select$1.ItemText, { children })
      ]
    }
  );
}
function SelectSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Select$1.Separator,
    {
      "data-slot": "select-separator",
      className: cn(
        "pr-twp tw:pointer-events-none tw:-mx-1 tw:my-1 tw:h-px tw:bg-border",
        className
      ),
      ...props
    }
  );
}
function SelectScrollUpButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Select$1.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: cn(
        "pr-twp tw:z-10 tw:flex tw:cursor-default tw:items-center tw:justify-center tw:bg-popover tw:py-1 tw:[&_svg:not([class*=size-])]:size-4",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(IconChevronUp, {})
    }
  );
}
function SelectScrollDownButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Select$1.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: cn(
        "pr-twp tw:z-10 tw:flex tw:cursor-default tw:items-center tw:justify-center tw:bg-popover tw:py-1 tw:[&_svg:not([class*=size-])]:size-4",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(IconChevronDown, {})
    }
  );
}
function DataTablePagination({ table }) {
  return /* @__PURE__ */ jsx("div", { className: "tw:flex tw:items-center tw:justify-between tw:px-2 tw:pb-3 tw:pt-3", children: /* @__PURE__ */ jsxs("div", { className: "tw:flex tw:items-center tw:space-x-6 tw:lg:space-x-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "tw:flex-1 tw:text-sm tw:text-muted-foreground", children: [
      table.getFilteredSelectedRowModel().rows.length,
      " of",
      " ",
      table.getFilteredRowModel().rows.length,
      " row(s) selected"
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "tw:flex tw:items-center tw:space-x-2", children: [
      /* @__PURE__ */ jsx("p", { className: "tw:text-nowrap tw:text-sm tw:font-medium", children: "Rows per page" }),
      /* @__PURE__ */ jsxs(
        Select,
        {
          value: `${table.getState().pagination.pageSize}`,
          onValueChange: (value) => {
            table.setPageSize(Number(value));
          },
          children: [
            /* @__PURE__ */ jsx(SelectTrigger, { className: "tw:h-8 tw:w-[70px]", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: table.getState().pagination.pageSize }) }),
            /* @__PURE__ */ jsx(SelectContent, { side: "top", children: [10, 20, 30, 40, 50].map((pageSize) => /* @__PURE__ */ jsx(SelectItem, { value: `${pageSize}`, children: pageSize }, pageSize)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "tw:flex tw:w-[100px] tw:items-center tw:justify-center tw:text-sm tw:font-medium", children: [
      "Page ",
      table.getState().pagination.pageIndex + 1,
      " of ",
      table.getPageCount()
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "tw:flex tw:items-center tw:space-x-2", children: [
      /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "outline",
          size: "icon",
          className: "tw:hidden tw:h-8 tw:w-8 tw:p-0 tw:lg:flex",
          onClick: () => table.setPageIndex(0),
          disabled: !table.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ jsx("span", { className: "tw:sr-only", children: "Go to first page" }),
            /* @__PURE__ */ jsx(ArrowLeftIcon, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "outline",
          size: "icon",
          className: "tw:h-8 tw:w-8 tw:p-0",
          onClick: () => table.previousPage(),
          disabled: !table.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ jsx("span", { className: "tw:sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ jsx(ChevronLeftIcon, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "outline",
          size: "icon",
          className: "tw:h-8 tw:w-8 tw:p-0",
          onClick: () => table.nextPage(),
          disabled: !table.getCanNextPage(),
          children: [
            /* @__PURE__ */ jsx("span", { className: "tw:sr-only", children: "Go to next page" }),
            /* @__PURE__ */ jsx(ChevronRightIcon, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "outline",
          size: "icon",
          className: "tw:hidden tw:h-8 tw:w-8 tw:p-0 tw:lg:flex",
          onClick: () => table.setPageIndex(table.getPageCount() - 1),
          disabled: !table.getCanNextPage(),
          children: [
            /* @__PURE__ */ jsx("span", { className: "tw:sr-only", children: "Go to last page" }),
            /* @__PURE__ */ jsx(ArrowRightIcon, { className: "tw:h-4 tw:w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
function DataTable({
  columns,
  data,
  enablePagination = false,
  showPaginationControls = false,
  showColumnVisibilityControls = false,
  stickyHeader = false,
  onRowClickHandler = () => {
  },
  id,
  isLoading = false,
  noResultsMessage
}) {
  var _a;
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const normalizedData = useMemo(() => data ?? [], [data]);
  const table = useReactTable({
    data: normalizedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    ...enablePagination && { getPaginationRowModel: getPaginationRowModel() },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  });
  const visibleColumns = table.getVisibleFlatColumns();
  let bodyContent;
  if (isLoading) {
    const rowCount = 10;
    const skeletonRowIds = Array.from({ length: rowCount }).map((_, idx) => `skeleton-row-${idx}`);
    bodyContent = skeletonRowIds.map((rowId) => /* @__PURE__ */ jsx(TableRow, { className: "tw:hover:bg-transparent", children: /* @__PURE__ */ jsx(TableCell, { colSpan: visibleColumns.length ?? columns.length, className: "tw:border-0 tw:p-0", children: /* @__PURE__ */ jsx("div", { className: "tw:w-full tw:py-2", children: /* @__PURE__ */ jsx(Skeleton, { className: "tw:h-14 tw:w-full tw:rounded-md" }) }) }) }, rowId));
  } else if (((_a = table.getRowModel().rows) == null ? void 0 : _a.length) > 0) {
    bodyContent = table.getRowModel().rows.map((row) => /* @__PURE__ */ jsx(
      TableRow,
      {
        onClick: () => onRowClickHandler(row, table),
        "data-state": row.getIsSelected() && "selected",
        children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx(TableCell, { children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id))
      },
      row.id
    ));
  } else {
    bodyContent = /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: columns.length, className: "tw:h-24 tw:text-center", children: noResultsMessage }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "pr-twp", id, children: [
    showColumnVisibilityControls && /* @__PURE__ */ jsx(DataTableViewOptions, { table }),
    /* @__PURE__ */ jsxs(Table, { stickyHeader, children: [
      /* @__PURE__ */ jsx(TableHeader, { stickyHeader, children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsx(TableRow, { children: headerGroup.headers.map((header) => {
        return /* @__PURE__ */ jsx(TableHead, { className: "tw:p-0", children: header.isPlaceholder ? void 0 : flexRender(header.column.columnDef.header, header.getContext()) }, header.id);
      }) }, headerGroup.id)) }),
      /* @__PURE__ */ jsx(TableBody, { children: bodyContent })
    ] }),
    enablePagination && /* @__PURE__ */ jsxs("div", { className: "tw:flex tw:items-center tw:justify-end tw:space-x-2 tw:py-4", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => table.previousPage(),
          disabled: !table.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => table.nextPage(),
          disabled: !table.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    enablePagination && showPaginationControls && /* @__PURE__ */ jsx(DataTablePagination, { table })
  ] });
}
function MarkdownRenderer({
  id,
  markdown,
  className,
  anchorTarget,
  truncate
}) {
  const options = useMemo(
    () => ({
      overrides: {
        a: {
          props: {
            target: anchorTarget,
            // Harden links opened in a new tab against reverse-tabnabbing (the opened page can
            // otherwise reach back through window.opener).
            rel: anchorTarget === "_blank" ? "noopener noreferrer" : void 0
          }
        }
      }
    }),
    [anchorTarget]
  );
  return /* @__PURE__ */ jsx(
    "div",
    {
      id,
      className: cn(
        "pr-twp tw:prose",
        {
          "tw:line-clamp-3 tw:max-h-10 tw:overflow-hidden tw:text-ellipsis tw:break-words": truncate
        },
        className
      ),
      children: /* @__PURE__ */ jsx(Markdown, { options, children: markdown })
    }
  );
}
const ERROR_DUMP_STRING_KEYS = Object.freeze([
  "%webView_error_dump_copy_button%",
  "%webView_error_dump_header%",
  "%webView_error_dump_info_message%"
]);
const localizeString$3 = (strings, key) => {
  return strings[key] ?? key;
};
function ErrorDump({
  errorDetails,
  handleCopyNotify,
  localizedStrings,
  id
}) {
  const headerText = localizeString$3(localizedStrings, "%webView_error_dump_header%");
  const infoMessage = localizeString$3(localizedStrings, "%webView_error_dump_info_message%");
  const copyButtonLabel = localizeString$3(localizedStrings, "%webView_error_dump_copy_button%");
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(errorDetails);
    } catch {
      return;
    }
    if (handleCopyNotify) {
      handleCopyNotify();
    }
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      id,
      className: "tw:inline-flex tw:w-full tw:flex-col tw:items-start tw:justify-start tw:gap-4",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "tw:inline-flex tw:items-start tw:justify-start tw:gap-4 tw:self-stretch", children: [
          /* @__PURE__ */ jsxs("div", { className: "tw:inline-flex tw:flex-1 tw:flex-col tw:items-start tw:justify-start", children: [
            /* @__PURE__ */ jsx("div", { className: "tw:text-color-text tw:justify-center tw:text-center tw:text-lg tw:font-semibold tw:leading-loose", children: headerText }),
            /* @__PURE__ */ jsx("div", { className: "tw:justify-center tw:self-stretch tw:text-sm tw:font-normal tw:leading-tight tw:text-muted-foreground", children: infoMessage })
          ] }),
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "secondary",
              size: "icon",
              "aria-label": copyButtonLabel,
              onClick: () => {
                handleCopy();
              },
              children: /* @__PURE__ */ jsx(Copy, {})
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "tw:prose tw:w-full", children: /* @__PURE__ */ jsx("pre", { className: "tw:text-xs", children: errorDetails }) })
      ]
    }
  );
}
const ERROR_POPOVER_STRING_KEYS = Object.freeze([
  ...ERROR_DUMP_STRING_KEYS,
  "%webView_error_dump_copied_message%"
]);
function ErrorPopover({
  errorDetails,
  handleCopyNotify,
  localizedStrings,
  children,
  className,
  id
}) {
  const [isCopySuccess, setIsCopySuccess] = useState(false);
  const handleCopyWithNotification = () => {
    setIsCopySuccess(true);
    if (handleCopyNotify) {
      handleCopyNotify();
    }
  };
  const handleOpenChange = (open) => {
    if (!open) {
      setIsCopySuccess(false);
    }
  };
  return /* @__PURE__ */ jsxs(Popover, { onOpenChange: handleOpenChange, children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, ...id !== void 0 ? { "aria-controls": id } : {}, children }),
    /* @__PURE__ */ jsxs(
      PopoverContent,
      {
        ...id !== void 0 ? { id } : {},
        className: cn("tw:min-w-80 tw:max-w-96", className),
        children: [
          isCopySuccess && localizedStrings["%webView_error_dump_copied_message%"] && /* @__PURE__ */ jsx(Label, { children: localizedStrings["%webView_error_dump_copied_message%"] }),
          /* @__PURE__ */ jsx(
            ErrorDump,
            {
              errorDetails,
              handleCopyNotify: handleCopyWithNotification,
              localizedStrings
            }
          )
        ]
      }
    )
  ] });
}
var DropdownMenuItemType = /* @__PURE__ */ ((DropdownMenuItemType2) => {
  DropdownMenuItemType2[DropdownMenuItemType2["Check"] = 0] = "Check";
  DropdownMenuItemType2[DropdownMenuItemType2["Radio"] = 1] = "Radio";
  return DropdownMenuItemType2;
})(DropdownMenuItemType || {});
function FilterDropdown({ id, label, groups }) {
  const [checkedStates, setCheckedStates] = useState(
    Object.fromEntries(
      groups.map(
        (group, index) => group.itemType === 0 ? [index, []] : void 0
      ).filter((entry) => !!entry)
    )
  );
  const [radioStates, setRadioStates] = useState({});
  const handleCheckboxUpdate = (groupIndex, index) => {
    const newCheckedState = !checkedStates[groupIndex][index];
    setCheckedStates((oldCheckedStates) => {
      oldCheckedStates[groupIndex][index] = newCheckedState;
      return { ...oldCheckedStates };
    });
    const item = groups[groupIndex].items[index];
    item.onUpdate(item.id, newCheckedState);
  };
  const handleRadioUpdate = (groupIndex, value) => {
    setRadioStates((oldRadioStates) => {
      oldRadioStates[groupIndex] = value;
      return { ...oldRadioStates };
    });
    const currentItem = groups[groupIndex].items.find((item) => item.id === value);
    if (currentItem) {
      currentItem.onUpdate(value);
    } else {
      console.error(`Could not find dropdown radio item with id '${value}'!`);
    }
  };
  return /* @__PURE__ */ jsx("div", { id, children: /* @__PURE__ */ jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "default", children: [
      /* @__PURE__ */ jsx(Filter$1, { size: 16, className: "tw:mr-2 tw:h-4 tw:w-4" }),
      label,
      /* @__PURE__ */ jsx(ChevronDown, { size: 16, className: "tw:ml-2 tw:h-4 tw:w-4" })
    ] }) }),
    /* @__PURE__ */ jsx(DropdownMenuContent, { children: groups.map((group, groupIndex) => /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(DropdownMenuLabel, { children: group.label }),
      /* @__PURE__ */ jsx(DropdownMenuGroup, { children: group.itemType === 0 ? /* @__PURE__ */ jsx(Fragment$1, { children: group.items.map((item, index) => /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
        DropdownMenuCheckboxItem,
        {
          checked: checkedStates[groupIndex][index],
          onCheckedChange: () => handleCheckboxUpdate(groupIndex, index),
          children: item.label
        }
      ) }, item.id)) }) : /* @__PURE__ */ jsx(
        DropdownMenuRadioGroup,
        {
          value: radioStates[groupIndex],
          onValueChange: (value) => handleRadioUpdate(groupIndex, value),
          children: group.items.map((item) => /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(DropdownMenuRadioItem, { value: item.id, children: item.label }) }, item.id))
        }
      ) }),
      /* @__PURE__ */ jsx(DropdownMenuSeparator, {})
    ] }, group.label)) })
  ] }) });
}
function MoreInfo({
  id,
  category,
  downloads,
  languages,
  moreInfoUrl,
  handleMoreInfoLinkClick,
  supportUrl,
  handleSupportLinkClick
}) {
  const numberFormatted = new NumberFormat("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(downloads).reduce((a2, b2) => a2 + b2, 0));
  const handleScrollToBottom = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      id,
      className: "pr-twp tw:flex tw:items-center tw:justify-center tw:divide-x tw:border-b tw:border-t tw:py-2 tw:text-center",
      children: [
        category && /* @__PURE__ */ jsxs("div", { className: "tw:flex tw:flex-col tw:items-center tw:gap-1 tw:px-4", children: [
          /* @__PURE__ */ jsx("div", { className: "tw:flex", children: /* @__PURE__ */ jsx("span", { className: "tw:text-xs tw:font-semibold tw:text-foreground", children: category }) }),
          /* @__PURE__ */ jsx("span", { className: "tw:text-xs tw:text-foreground", children: "CATEGORY" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "tw:flex tw:flex-col tw:items-center tw:gap-1 tw:px-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "tw:flex tw:gap-1", children: [
            /* @__PURE__ */ jsx(User, { className: "tw:h-4 tw:w-4" }),
            /* @__PURE__ */ jsx("span", { className: "tw:text-xs tw:font-semibold tw:text-foreground", children: numberFormatted })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "tw:text-xs tw:text-foreground", children: "USERS" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "tw:flex tw:flex-col tw:items-center tw:gap-1 tw:px-4", children: [
          /* @__PURE__ */ jsx("div", { className: "tw:flex tw:gap-2", children: languages.slice(0, 3).map((locale) => /* @__PURE__ */ jsx("span", { className: "tw:text-xs tw:font-semibold tw:text-foreground", children: locale.toUpperCase() }, locale)) }),
          languages.length > 3 && /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => handleScrollToBottom(),
              className: "tw:text-xs tw:text-foreground tw:underline",
              children: [
                "+",
                languages.length - 3,
                " more languages"
              ]
            }
          )
        ] }),
        (moreInfoUrl || supportUrl) && /* @__PURE__ */ jsxs("div", { className: "tw:flex tw:flex-col tw:gap-1 tw:px-4", children: [
          moreInfoUrl && /* @__PURE__ */ jsx("div", { className: "tw:flex tw:gap-1", children: /* @__PURE__ */ jsxs(
            Button,
            {
              onClick: () => handleMoreInfoLinkClick(),
              variant: "link",
              className: "tw:flex tw:h-auto tw:gap-1 tw:py-0 tw:text-xs tw:font-semibold tw:text-foreground",
              children: [
                "Website",
                /* @__PURE__ */ jsx(Link, { className: "tw:h-4 tw:w-4" })
              ]
            }
          ) }),
          supportUrl && /* @__PURE__ */ jsx("div", { className: "tw:flex tw:gap-1", children: /* @__PURE__ */ jsxs(
            Button,
            {
              onClick: () => handleSupportLinkClick(),
              variant: "link",
              className: "tw:flex tw:h-auto tw:gap-1 tw:py-0 tw:text-xs tw:font-semibold tw:text-foreground",
              children: [
                "Support",
                /* @__PURE__ */ jsx(CircleHelp, { className: "tw:h-4 tw:w-4" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
function VersionHistory({ id, versionHistory }) {
  const [showAllVersions, setShowAllVersions] = useState(false);
  const currentDate = /* @__PURE__ */ new Date();
  function formatTimeString(dateString) {
    const date = new Date(dateString);
    const dateDiff = new Date(currentDate.getTime() - date.getTime());
    const yearDiff = dateDiff.getUTCFullYear() - 1970;
    const monthDiff = dateDiff.getUTCMonth();
    const dayDiff = dateDiff.getUTCDate() - 1;
    let timeString = "";
    if (yearDiff > 0) {
      timeString = `${yearDiff.toString()} year${yearDiff === 1 ? "" : "s"} ago`;
    } else if (monthDiff > 0) {
      timeString = `${monthDiff.toString()} month${monthDiff === 1 ? "" : "s"} ago`;
    } else if (dayDiff === 0) {
      timeString = "today";
    } else {
      timeString = `${dayDiff.toString()} day${dayDiff === 1 ? "" : "s"} ago`;
    }
    return timeString;
  }
  const sortedEntries = Object.entries(versionHistory).sort((a2, b2) => b2[0].localeCompare(a2[0]));
  return /* @__PURE__ */ jsxs("div", { className: "pr-twp", id, children: [
    /* @__PURE__ */ jsx("h3", { className: "tw:text-md tw:font-semibold", children: "What`s New" }),
    /* @__PURE__ */ jsx("ul", { className: "tw:list-disc tw:pl-5 tw:pr-4 tw:text-xs tw:text-foreground", children: (showAllVersions ? sortedEntries : sortedEntries.slice(0, 5)).map((entry) => /* @__PURE__ */ jsxs("div", { className: "tw:mt-3 tw:flex tw:justify-between", children: [
      /* @__PURE__ */ jsx("div", { className: "tw:text-foreground", children: /* @__PURE__ */ jsx("li", { className: "tw:prose tw:text-xs", children: /* @__PURE__ */ jsx("span", { children: entry[1].description }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "tw:justify-end tw:text-right", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          "Version ",
          entry[0]
        ] }),
        /* @__PURE__ */ jsx("div", { children: formatTimeString(entry[1].date) })
      ] })
    ] }, entry[0])) }),
    sortedEntries.length > 5 && /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: () => setShowAllVersions(!showAllVersions),
        className: "tw:text-xs tw:text-foreground tw:underline",
        children: showAllVersions ? "Show Less Version History" : "Show All Version History"
      }
    )
  ] });
}
function Footer({
  id,
  publisherDisplayName,
  fileSize,
  locales,
  versionHistory,
  currentVersion
}) {
  const formattedFileSize = useMemo(() => formatBytes(fileSize), [fileSize]);
  const getLanguageNames = (codes) => {
    const displayNames = new Intl.DisplayNames(getCurrentLocale(), { type: "language" });
    return codes.map((code) => displayNames.of(code));
  };
  const languageNames = getLanguageNames(locales);
  return /* @__PURE__ */ jsx("div", { id, className: "pr-twp tw:border-t tw:py-2", children: /* @__PURE__ */ jsxs("div", { className: "tw:flex tw:flex-col tw:gap-2 tw:divide-y", children: [
    Object.entries(versionHistory).length > 0 && /* @__PURE__ */ jsx(VersionHistory, { versionHistory }),
    /* @__PURE__ */ jsxs("div", { className: "tw:flex tw:flex-col tw:gap-2 tw:py-2", children: [
      /* @__PURE__ */ jsx("h2", { className: "tw:text-md tw:font-semibold", children: "Information" }),
      /* @__PURE__ */ jsxs("div", { className: "tw:flex tw:items-start tw:justify-between tw:text-xs tw:text-foreground", children: [
        /* @__PURE__ */ jsxs("p", { className: "tw:flex tw:flex-col tw:justify-start tw:gap-1", children: [
          /* @__PURE__ */ jsx("span", { children: "Publisher" }),
          /* @__PURE__ */ jsx("span", { className: "tw:font-semibold", children: publisherDisplayName }),
          /* @__PURE__ */ jsx("span", { children: "Size" }),
          /* @__PURE__ */ jsx("span", { className: "tw:font-semibold", children: formattedFileSize })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "tw:flex tw:w-3/4 tw:items-center tw:justify-between tw:text-xs tw:text-foreground", children: /* @__PURE__ */ jsxs("p", { className: "tw:flex tw:flex-col tw:justify-start tw:gap-1", children: [
          /* @__PURE__ */ jsx("span", { children: "Version" }),
          /* @__PURE__ */ jsx("span", { className: "tw:font-semibold", children: currentVersion }),
          /* @__PURE__ */ jsx("span", { children: "Languages" }),
          /* @__PURE__ */ jsx("span", { className: "tw:font-semibold", children: languageNames.join(", ") })
        ] }) })
      ] })
    ] })
  ] }) });
}
function Filter({
  entries,
  selected,
  onChange,
  placeholder,
  searchPlaceholder,
  commandEmptyMessage,
  customSelectedText,
  isDisabled,
  sortSelected,
  showScrollCue,
  icon,
  className,
  badgesPlaceholder,
  id
}) {
  return /* @__PURE__ */ jsxs("div", { id, className: "tw:flex tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ jsx(
      MultiSelectComboBox,
      {
        entries,
        selected,
        onChange,
        placeholder,
        searchPlaceholder,
        commandEmptyMessage,
        customSelectedText,
        isDisabled,
        sortSelected,
        showScrollCue,
        icon,
        className
      }
    ),
    selected.length > 0 ? /* @__PURE__ */ jsx("div", { className: "tw:flex tw:flex-wrap tw:items-center tw:gap-2", children: selected.map((type) => {
      var _a;
      return /* @__PURE__ */ jsxs(Badge, { variant: "muted", className: "tw:flex tw:items-center tw:gap-1", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            className: "tw:h-4 tw:w-4 tw:p-0 tw:hover:bg-transparent",
            onClick: () => onChange(selected.filter((selectedType) => selectedType !== type)),
            children: /* @__PURE__ */ jsx(X$2, { className: "tw:h-3 tw:w-3" })
          }
        ),
        (_a = entries.find((entry) => entry.value === type)) == null ? void 0 : _a.label
      ] }, type);
    }) }) : /* @__PURE__ */ jsx(Label, { children: badgesPlaceholder })
  ] });
}
const MARKER_SEPARATOR$1 = " ";
function classify(node, body) {
  let kind = "content";
  let ancestor = node.parentElement;
  while (ancestor && ancestor !== body) {
    const { classList } = ancestor;
    if (classList.contains("note-category")) return "category";
    if (classList.contains("note-closer") || classList.contains("note-placeholder"))
      return "display";
    if (classList.contains("marker")) kind = "glyph";
    ancestor = ancestor.parentElement;
  }
  return kind;
}
function nextText(walker) {
  return walker.nextNode() ?? void 0;
}
function glyphLength(node) {
  return node.data.endsWith(MARKER_SEPARATOR$1) ? node.data.length - MARKER_SEPARATOR$1.length : node.data.length;
}
function categoryPosition(category, node, offset) {
  var _a, _b;
  const value = category.querySelector(".note-category-value");
  if (value == null ? void 0 : value.contains(node)) return { utf16Offset: offset, field: "category" };
  const glyph = (_a = node.parentElement) == null ? void 0 : _a.closest(".marker");
  if (!value || !glyph || !category.contains(glyph)) return { utf16Offset: 0 };
  const isOpener = glyph === category.querySelector(".marker");
  const valueLength = ((_b = value.textContent) == null ? void 0 : _b.length) ?? 0;
  const at2 = isOpener ? 0 : valueLength;
  if (offset > glyphLength(node)) return { utf16Offset: at2, field: "category" };
  const index = !isOpener && valueLength === 0 ? 1 : 0;
  return { utf16Offset: at2, field: "category", glyph: { index, offset } };
}
function positionAt(body, target, offset) {
  var _a;
  const walker = document.createTreeWalker(body, NodeFilter.SHOW_TEXT);
  let contentOffset = 0;
  let glyphIndex = 0;
  for (let node = nextText(walker); node; node = nextText(walker)) {
    const kind = classify(node, body);
    if (kind === "category") {
      if (node === target) {
        const category = (_a = node.parentElement) == null ? void 0 : _a.closest(".note-category");
        return category ? categoryPosition(category, node, offset) : { utf16Offset: 0 };
      }
    } else if (kind === "display") {
      if (node === target) return { utf16Offset: contentOffset };
    } else if (kind === "glyph") {
      if (node === target)
        return offset > glyphLength(node) ? { utf16Offset: contentOffset } : { utf16Offset: contentOffset, glyph: { index: glyphIndex, offset } };
      glyphIndex += 1;
    } else {
      if (node === target) return { utf16Offset: contentOffset + offset };
      contentOffset += node.data.length;
      if (node.data.length > 0) glyphIndex = 0;
    }
  }
  return "end";
}
function firstTextNodeWithin(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    return node;
  }
  const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
  return walker.nextNode() ?? void 0;
}
function getCaretPositionFromClick(clientX, clientY, rowElement) {
  var _a;
  const body = rowElement.querySelector(".textual-note-body");
  if (!body) return "end";
  let offsetNode;
  let offset = 0;
  if (typeof document.caretPositionFromPoint === "function") {
    const caret = document.caretPositionFromPoint(clientX, clientY);
    if (caret) {
      offsetNode = caret.offsetNode;
      offset = caret.offset;
    }
  } else if (typeof document.caretRangeFromPoint === "function") {
    const range = document.caretRangeFromPoint(clientX, clientY);
    if (range) {
      offsetNode = range.startContainer;
      offset = range.startOffset;
    }
  }
  if (!offsetNode) return "end";
  if ((_a = rowElement.querySelector(".textual-note-header")) == null ? void 0 : _a.contains(offsetNode)) {
    const first = firstTextNodeWithin(body);
    return first ? positionAt(body, first, 0) : "end";
  }
  if (!body.contains(offsetNode)) return "end";
  if (offsetNode.nodeType === Node.ELEMENT_NODE) {
    const child = offsetNode.childNodes[offset];
    const firstText = child ? firstTextNodeWithin(child) : void 0;
    if (!firstText) return "end";
    offsetNode = firstText;
    offset = 0;
  }
  if (offsetNode.nodeType !== Node.TEXT_NODE) return "end";
  return positionAt(body, offsetNode, offset);
}
const FOOTNOTE_EDITOR_STRING_KEYS = Object.freeze([
  ...MARKER_MENU_STRING_KEYS,
  ...Object.entries(usfmMarkers).map(([, markerDetails]) => markerDetails.description).filter((item) => !!item),
  "%footnoteEditor_callerDropdown_item_custom%",
  "%footnoteEditor_callerDropdown_item_generated%",
  "%footnoteEditor_callerDropdown_item_hidden%",
  "%footnoteEditor_callerDropdown_label%",
  "%footnoteEditor_callerDropdown_tooltip%",
  "%footnoteEditor_copyButton_tooltip%",
  "%footnoteEditor_noteType_crossReference_label%",
  "%footnoteEditor_noteType_endNote_label%",
  "%footnoteEditor_noteType_footnote_label%",
  "%footnoteEditor_noteType_tooltip%",
  "%footnoteEditor_noteTypeDropdown_label%",
  "%footnoteEditor_saveButton_tooltip%",
  ...UNDO_REDO_BUTTONS_STRING_KEYS,
  ...CANCEL_ACCEPT_BUTTONS_STRING_KEYS
]);
const MARKER_SEPARATOR = " ";
const ZERO_WIDTH_NO_BREAK_SPACE = "\uFEFF";
function isRunClosed(markerObj) {
  return markerObj.closed !== "false";
}
function renderParagraphs(parentMarker, content, showMarkers = true, footnoteClosing = void 0, leadingContent = void 0) {
  const paragraphs = [];
  let current = [];
  (content ?? []).forEach((part) => {
    if (typeof part !== "string" && part.marker === "fp") {
      if (current.length > 0) paragraphs.push(current);
      current = [part];
    } else {
      current.push(part);
    }
  });
  if (current.length > 0) paragraphs.push(current);
  const hasBodyContent = paragraphs.length > 0;
  if (!hasBodyContent) paragraphs.push([]);
  return paragraphs.map((para, i2) => {
    const isFirst = i2 === 0;
    const isLast = i2 === paragraphs.length - 1;
    return (
      // PT9 wraps note text in `span.notetext`, whose `unicode-bidi: embed` keeps mixed-direction
      // runs ordered as the note author wrote them. The class must sit on the element that
      // directly contains the inline runs - `unicode-bidi` does not inherit.
      //
      // The index is the key here (and for the runs inside, see `renderContent`) because no
      // content-derived key can be unique: a note may hold several runs with the same marker AND
      // the same text (two `\fqa` runs, say), and paragraphs split from those runs inherit the
      // collision. The rule guards against reordering corrupting state, which cannot happen here -
      // these paragraphs are a pure projection of an immutable USJ node, always in source order,
      // and they hold no state of their own.
      // eslint-disable-next-line react/no-array-index-key
      /* @__PURE__ */ jsxs("p", { className: "notetext", children: [
        isFirst && !hasBodyContent && /* @__PURE__ */ jsx("span", { className: "note-placeholder", children: ZERO_WIDTH_NO_BREAK_SPACE }),
        isFirst && leadingContent,
        renderContent(parentMarker, para, showMarkers),
        isLast && footnoteClosing
      ] }, `${parentMarker ?? "note"}-p${i2}`)
    );
  });
}
function renderContent(parentMarker, content, showMarkers = true, isNestedContent = false) {
  if (!content || content.length === 0) return void 0;
  return content.map((footnotePart, index) => {
    const key = `${parentMarker ?? "note"}-${index}`;
    if (typeof footnotePart === "string") {
      return /* @__PURE__ */ jsx("span", { className: cn(`usfm_${parentMarker}`), children: footnotePart }, key);
    }
    return renderMarkerObject(footnotePart, key, showMarkers, isNestedContent);
  });
}
function renderMarkerObject(markerObj, key, showMarkers, isNested = false) {
  const { marker } = markerObj;
  if (markerObj.type === "unmatched")
    return /* @__PURE__ */ jsx("span", { className: "marker", children: `\\${marker}` }, key);
  const markerName = `${isNested ? "+" : ""}${marker}`;
  return /* @__PURE__ */ jsxs("span", { children: [
    marker ? showMarkers && /* @__PURE__ */ jsx("span", { className: "marker", children: `\\${markerName}${MARKER_SEPARATOR}` }) : /* @__PURE__ */ jsx(
      AlertCircle,
      {
        className: "tw:text-error tw:mr-1 tw:inline-block tw:h-4 tw:w-4",
        "aria-label": "Missing marker"
      }
    ),
    renderContent(
      marker,
      markerObj.content,
      showMarkers,
      /* isNestedContent */
      true
    ),
    marker && showMarkers && isRunClosed(markerObj) && /* @__PURE__ */ jsx("span", { className: "marker", children: `\\${markerName}*` })
  ] }, key);
}
function FootnoteItem({
  footnote,
  layout = "horizontal",
  formatCaller,
  showMarkers = true
}) {
  const caller = formatCaller ? formatCaller(footnote.caller) : footnote.caller;
  const isCallerFormatted = caller !== footnote.caller;
  const footnoteOpening = showMarkers ? /* @__PURE__ */ jsx("span", { className: "marker", children: `\\${footnote.marker}` }) : void 0;
  const footnoteClosing = showMarkers && isRunClosed(footnote) ? /* @__PURE__ */ jsx("span", { className: "marker note-closer", children: `\\${footnote.marker}*` }) : void 0;
  const footnoteCategory = footnote.category ? (
    // Given its own class rather than a `usfm_*` one for the same reason the caller has one:
    // `\cat` delimits the value but is not a style for it. The value is the note's data and stays
    // visible either way; the `\cat` glyphs are marker display and follow the same switch every
    // other marker in this component does.
    //
    // The class is also what keeps the whole run out of the content caret origin (`RowTextKind`
    // in `footnote-caret.utils.ts`): the category is a FIELD on the note, not part of its
    // `content`, and the editor builds its own category display as `attribute`-typed text, which
    // `EditorRef.selectNoteTextOffset` skips. A click in the run maps to the category instead.
    /* @__PURE__ */ jsxs("span", { className: "note-category", children: [
      showMarkers && /* @__PURE__ */ jsx("span", { className: "marker", children: `\\cat${MARKER_SEPARATOR}` }),
      /* @__PURE__ */ jsx("span", { className: "note-category-value", children: footnote.category }),
      showMarkers && /* @__PURE__ */ jsx("span", { className: "marker", children: "\\cat*" }),
      !showMarkers && " "
    ] })
  ) : void 0;
  const footnoteCaller = caller && // USFM does not specify a marker for caller, so instead of a usfm_* class, we use a
  // specific class name in case styling is needed.
  /* @__PURE__ */ jsx("span", { className: cn("note-caller tw:inline-block", { formatted: isCallerFormatted }), children: caller });
  const layoutClass = layout === "horizontal" ? "horizontal" : "vertical";
  const markerClass = showMarkers ? "marker-visible" : "";
  const footnoteBodyClass = layout === "horizontal" ? "tw:col-span-1" : "tw:col-span-2 tw:col-start-1 tw:row-start-2";
  const baseClasses = cn(layoutClass, markerClass);
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsxs("div", { className: cn("textual-note-header tw:col-span-1 tw:w-fit tw:text-nowrap", baseClasses), children: [
      footnoteOpening,
      !!footnoteOpening && !!footnoteCaller && " ",
      footnoteCaller
    ] }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: cn(
          "textual-note-body tw:flex tw:flex-col tw:gap-1",
          footnoteBodyClass,
          baseClasses
        ),
        children: renderParagraphs(
          footnote.marker,
          footnote.content,
          showMarkers,
          footnoteClosing,
          footnoteCategory
        )
      }
    )
  ] });
}
const EDITING_ROW_KEY = "editing-row";
const EDITING_ROW_REVEAL_MS = 1e3;
function getCaretRectIn(element) {
  const selection = element.ownerDocument.getSelection();
  if (!selection || selection.rangeCount === 0 || !element.contains(selection.focusNode))
    return void 0;
  const range = selection.getRangeAt(0).cloneRange();
  range.collapse(false);
  const rangeRect = typeof range.getBoundingClientRect === "function" ? range.getBoundingClientRect() : void 0;
  if (rangeRect && (rangeRect.height > 0 || rangeRect.top !== 0)) return rangeRect;
  const { focusNode } = selection;
  const focusElement = focusNode instanceof Element ? focusNode : focusNode == null ? void 0 : focusNode.parentElement;
  return focusElement == null ? void 0 : focusElement.getBoundingClientRect();
}
function revealEditingRow(row, list) {
  const rowRect = row.getBoundingClientRect();
  const listHeight = (list == null ? void 0 : list.getBoundingClientRect().height) ?? 0;
  const caretRect = getCaretRectIn(row);
  if (!list || rowRect.height <= listHeight || !caretRect) {
    row.scrollIntoView({ block: "nearest" });
    return;
  }
  if (caretRect.bottom - rowRect.top <= listHeight) row.scrollIntoView({ block: "start" });
  else if (rowRect.bottom - caretRect.top <= listHeight) row.scrollIntoView({ block: "end" });
}
function getAdjacentFocusableIndex(from, direction, lastIndex, editingIndex) {
  let next = Math.min(Math.max(from + direction, 0), lastIndex);
  if (next === editingIndex) {
    const hopped = Math.min(Math.max(next + direction, 0), lastIndex);
    next = hopped === next ? from : hopped;
  }
  return next === editingIndex ? from : next;
}
function FootnoteList({
  ariaLabel = "Footnotes",
  className,
  classNameForItems,
  footnotes,
  layout = "horizontal",
  listId,
  selectedFootnote,
  selectionRequest,
  showMarkers = true,
  suppressFormatting = false,
  formatCaller,
  onFootnoteSelected,
  onFootnoteEditRequested,
  onFocusedFootnoteChange,
  editingFootnoteIndex,
  renderEditingFootnote
}) {
  const handleFormatCaller = formatCaller ?? getFormatCallerFunction(footnotes, void 0);
  const editingRowIndex = renderEditingFootnote ? editingFootnoteIndex : void 0;
  const rowRefs = useRef([]);
  const editingRowRef = useRef(null);
  const listRef = useRef(null);
  const handleFootnoteClick = (footnote, index, event) => {
    if (onFootnoteEditRequested) {
      const row = rowRefs.current[index];
      const caretPosition = row ? getCaretPositionFromClick(event.clientX, event.clientY, row) : "end";
      onFootnoteEditRequested(footnote, index, listId, caretPosition);
      return;
    }
    onFootnoteSelected == null ? void 0 : onFootnoteSelected(footnote, index, listId);
  };
  const initialFocusedIndex = selectedFootnote ? footnotes.findIndex((f2) => f2 === selectedFootnote) : -1;
  const [focusedIndex, setFocusedIndex] = useState(initialFocusedIndex);
  const focusRow = (index) => {
    var _a;
    setFocusedIndex(index);
    if (index >= 0 && index < rowRefs.current.length) (_a = rowRefs.current[index]) == null ? void 0 : _a.focus();
  };
  const handleFootnoteKeyDown = (e, footnote, index) => {
    if (!footnotes.length) return;
    switch (e.key) {
      case "Enter":
        e.preventDefault();
        if (onFootnoteEditRequested) {
          onFootnoteEditRequested(footnote, index, listId, "end");
        } else {
          onFootnoteSelected == null ? void 0 : onFootnoteSelected(footnote, index, listId);
        }
        break;
      case " ":
        e.preventDefault();
        onFootnoteSelected == null ? void 0 : onFootnoteSelected(footnote, index, listId);
        break;
    }
  };
  const lastIndex = footnotes.length - 1;
  const handleListKeyDown = (e) => {
    if (!footnotes.length) return;
    if (e.target !== e.currentTarget && !(e.target instanceof HTMLElement && e.target.closest('li[role="option"]'))) {
      return;
    }
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        focusRow(getAdjacentFocusableIndex(focusedIndex, 1, lastIndex, editingRowIndex));
        break;
      case "ArrowUp":
        e.preventDefault();
        focusRow(getAdjacentFocusableIndex(focusedIndex, -1, lastIndex, editingRowIndex));
        break;
    }
  };
  useEffect(() => {
    if (editingRowIndex === void 0 || focusedIndex !== editingRowIndex) return;
    setFocusedIndex((prev) => {
      const forward = getAdjacentFocusableIndex(prev, 1, lastIndex, editingRowIndex);
      if (forward !== prev) return forward;
      const backward = getAdjacentFocusableIndex(prev, -1, lastIndex, editingRowIndex);
      return backward !== prev ? backward : -1;
    });
  }, [editingRowIndex, focusedIndex, lastIndex]);
  const reportedFocusedRowRef = useRef(void 0);
  const reportFocusedRow = (index) => {
    if (reportedFocusedRowRef.current === index) return;
    reportedFocusedRowRef.current = index;
    onFocusedFootnoteChange == null ? void 0 : onFocusedFootnoteChange(index);
  };
  useEffect(() => {
    const reported = reportedFocusedRowRef.current;
    if (reported === void 0) return;
    const row = rowRefs.current[reported];
    if (!row || row.ownerDocument.activeElement !== row) {
      reportedFocusedRowRef.current = void 0;
      onFocusedFootnoteChange == null ? void 0 : onFocusedFootnoteChange(void 0);
    }
  });
  const selectedIndex = selectedFootnote ? footnotes.findIndex((footnote) => footnote === selectedFootnote) : -1;
  useEffect(() => {
    var _a;
    if (selectedIndex < 0 || selectedIndex >= rowRefs.current.length) return;
    (_a = rowRefs.current[selectedIndex]) == null ? void 0 : _a.scrollIntoView({ block: "nearest" });
  }, [selectedIndex, selectionRequest]);
  useEffect(() => {
    const row = editingRowRef.current;
    if (editingRowIndex === void 0 || !row) return void 0;
    const reveal = () => revealEditingRow(row, listRef.current);
    reveal();
    if (typeof ResizeObserver === "undefined") return void 0;
    const observer = new ResizeObserver(reveal);
    observer.observe(row);
    const stopTimeout = setTimeout(() => observer.disconnect(), EDITING_ROW_REVEAL_MS);
    return () => {
      clearTimeout(stopTimeout);
      observer.disconnect();
    };
  }, [editingRowIndex, selectionRequest]);
  return (
    // Every row is its own tab stop (see the row `tabIndex` below), so the list is not one as
    // well - a stop here would put an extra, contentless press between whatever precedes the list
    // and its first note. It stays programmatically focusable (`-1`) because arrow-key navigation
    // starts by focusing it. With NO rows there is no row to be that stop, so the list takes the
    // turn itself rather than leaving the region unreachable by keyboard.
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: listRef,
        role: "listbox",
        "aria-label": ariaLabel,
        tabIndex: footnotes.length === 0 ? 0 : -1,
        className: cn("tw:h-full tw:overflow-y-auto", className),
        onKeyDown: handleListKeyDown,
        children: /* @__PURE__ */ jsx(
          "ul",
          {
            className: cn(
              "tw:p-0.5 tw:pt-1",
              "tw:grid",
              // Two columns in both layouts: the note's marker+caller, then its text. PT9 keeps the
              // `\fr`/`\xo` target reference inside the note text rather than aligning it in a column
              // of its own, so there is no third column to size.
              "tw:grid-cols-[min-content_1fr]",
              !suppressFormatting && "formatted-font"
            ),
            children: footnotes.map((footnote, idx) => {
              const isSelected = footnote === selectedFootnote;
              const isEditing = idx === editingFootnoteIndex && !!renderEditingFootnote;
              const key = isEditing ? EDITING_ROW_KEY : `${listId}-${idx}`;
              const separator = idx < footnotes.length - 1 && layout === "vertical" && /* @__PURE__ */ jsx(Separator, { tabIndex: -1, className: "tw:col-span-2" });
              if (isEditing) {
                return /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx(
                    "li",
                    {
                      ref: editingRowRef,
                      "data-state": "editing",
                      className: cn(
                        "tw:gap-x-3 tw:gap-y-1 tw:p-2",
                        "tw:w-full tw:rounded-sm tw:border-0 tw:shadow-none",
                        // PT9 highlights the entry being edited (light yellow); warning is the theme's
                        // amber-family token so this stays theme-aware in dark mode.
                        "tw:bg-warning/15",
                        "tw:col-span-2",
                        layout === "vertical" && "tw:row-span-2",
                        classNameForItems
                      ),
                      children: renderEditingFootnote(footnote, idx)
                    }
                  ),
                  separator
                ] }, key);
              }
              return (
                // The key belongs on the outermost node returned from the map — the Fragment — not on
                // the `<li>` nested inside it, which leaves the Fragment itself unkeyed.
                /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx(
                    "li",
                    {
                      ref: (el) => {
                        rowRefs.current[idx] = el;
                      },
                      role: "option",
                      "aria-selected": isSelected,
                      "data-marker": footnote.marker,
                      "data-state": isSelected ? "selected" : void 0,
                      tabIndex: 0,
                      className: cn(
                        "tw:gap-x-3 tw:gap-y-1 tw:p-2 tw:data-[state=selected]:bg-muted",
                        // Both handlers make the row a click target, so both earn the hover affordance -
                        // a consumer that only opens rows for editing would otherwise render rows that
                        // respond to a click but look inert.
                        (onFootnoteSelected || onFootnoteEditRequested) && "tw:hover:bg-muted/50",
                        "tw:w-full tw:rounded-sm tw:border-0 tw:bg-transparent tw:shadow-none",
                        "tw:focus:outline-hidden tw:focus-visible:outline-hidden",
                        // The focus ring is drawn INSIDE the row. The list is its own scroll container,
                        // and a scroll container clips whatever a child paints past its edges: a ring
                        // drawn outside the row loses its sides to the list's left and right edges, and
                        // its top or bottom whenever the row is scrolled flush with one. `ring-inset`
                        // also holds under a host's own `:focus-visible` ring rule, which sets the
                        // ring's width and color but leaves `--tw-ring-inset` to this class.
                        "tw:focus-visible:ring-2 tw:focus-visible:ring-inset tw:focus-visible:ring-ring",
                        "tw:grid tw:grid-flow-col tw:grid-cols-subgrid",
                        "tw:col-span-2",
                        layout === "vertical" && "tw:row-span-2",
                        classNameForItems
                      ),
                      onClick: (event) => handleFootnoteClick(footnote, idx, event),
                      onFocus: () => {
                        setFocusedIndex(idx);
                        reportFocusedRow(idx);
                      },
                      onBlur: () => reportFocusedRow(void 0),
                      onKeyDown: (e) => handleFootnoteKeyDown(e, footnote, idx),
                      children: /* @__PURE__ */ jsx(
                        FootnoteItem,
                        {
                          footnote,
                          layout,
                          formatCaller: () => handleFormatCaller(footnote.caller, idx),
                          showMarkers
                        }
                      )
                    }
                  ),
                  separator
                ] }, key)
              );
            })
          }
        )
      }
    )
  );
}
function formatTextWithBold(text) {
  const parts = [];
  let lastIndex = 0;
  const regex = /\\\\(.+?)\\\\/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    parts.push(/* @__PURE__ */ jsx("strong", { children: match[1] }, match.index));
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  return parts.length > 0 ? parts : [text];
}
function OccurrencesTable({
  occurrenceData,
  setScriptureReference,
  localizedStrings,
  classNameForText
}) {
  const zoomTextProps = useContentZoomTextProps();
  const referenceHeaderText = localizedStrings["%webView_inventory_occurrences_table_header_reference%"];
  const occurrenceHeaderText = localizedStrings["%webView_inventory_occurrences_table_header_occurrence%"];
  const occurrences = useMemo(() => {
    const uniqueOccurrences = [];
    const seen = /* @__PURE__ */ new Set();
    occurrenceData.forEach((occurrence) => {
      const key = `${occurrence.reference.book}:${occurrence.reference.chapterNum}:${occurrence.reference.verseNum}:${occurrence.text}`;
      if (!seen.has(key)) {
        seen.add(key);
        uniqueOccurrences.push(occurrence);
      }
    });
    return uniqueOccurrences;
  }, [occurrenceData]);
  return /* @__PURE__ */ jsxs(Table, { stickyHeader: true, children: [
    /* @__PURE__ */ jsx(TableHeader, { stickyHeader: true, children: /* @__PURE__ */ jsxs(TableRow, { children: [
      /* @__PURE__ */ jsx(TableHead, { children: referenceHeaderText }),
      /* @__PURE__ */ jsx(TableHead, { children: occurrenceHeaderText })
    ] }) }),
    /* @__PURE__ */ jsx(TableBody, { children: occurrences.length > 0 && occurrences.map((occurrence) => /* @__PURE__ */ jsxs(
      TableRow,
      {
        onClick: () => {
          setScriptureReference(occurrence.reference);
        },
        children: [
          /* @__PURE__ */ jsx(TableCell, { children: formatScrRef(occurrence.reference, "English") }),
          /* @__PURE__ */ jsx(
            TableCell,
            {
              className: classNameForText,
              "data-platform-content-zoom-root": zoomTextProps["data-platform-content-zoom-root"],
              "data-platform-content-zoom-label": zoomTextProps["data-platform-content-zoom-label"],
              children: formatTextWithBold(occurrence.text)
            }
          )
        ]
      },
      `${occurrence.reference.book} ${occurrence.reference.chapterNum}:${occurrence.reference.verseNum}-${occurrence.text}`
    )) })
  ] });
}
function Checkbox({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    Checkbox$1.Root,
    {
      "data-slot": "checkbox",
      className: cn(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:peer tw:relative tw:flex tw:size-4 tw:shrink-0 tw:items-center tw:justify-center tw:rounded-[4px] tw:border tw:border-input tw:transition-colors tw:outline-none tw:group-has-disabled/field:opacity-50 tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(
        Checkbox$1.Indicator,
        {
          "data-slot": "checkbox-indicator",
          className: "tw:grid tw:place-content-center tw:text-current tw:transition-none tw:[&>svg]:size-3.5",
          children: /* @__PURE__ */ jsx(IconCheck, {})
        }
      )
    }
  );
}
const getSortingIcon = (sortDirection) => {
  if (sortDirection === "asc") {
    return /* @__PURE__ */ jsx(ArrowUpIcon, { className: "tw:h-4 tw:w-4" });
  }
  if (sortDirection === "desc") {
    return /* @__PURE__ */ jsx(ArrowDownIcon, { className: "tw:h-4 tw:w-4" });
  }
  return void 0;
};
const getInventoryHeader = (column, label, buttonClassName) => {
  return /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [
    /* @__PURE__ */ jsxs(
      TooltipTrigger,
      {
        className: cn("tw:flex tw:w-full tw:justify-start", buttonClassName),
        variant: "ghost",
        onClick: () => column.toggleSorting(void 0),
        children: [
          /* @__PURE__ */ jsx("span", { className: "tw:w-6 tw:max-w-fit tw:flex-1 tw:overflow-hidden tw:text-ellipsis", children: label }),
          getSortingIcon(column.getIsSorted())
        ]
      }
    ),
    /* @__PURE__ */ jsx(TooltipContent, { side: "bottom", children: label })
  ] }) });
};
const inventoryItemColumn = (itemLabel) => {
  return {
    accessorKey: "item",
    accessorFn: (row) => row.items[0],
    header: ({ column }) => getInventoryHeader(column, itemLabel)
  };
};
const inventoryAdditionalItemColumn = (additionalItemLabel, additionalItemIndex) => {
  return {
    accessorKey: `item${additionalItemIndex}`,
    accessorFn: (row) => row.items[additionalItemIndex],
    header: ({ column }) => getInventoryHeader(column, additionalItemLabel)
  };
};
const inventoryCountColumn = (countLabel) => {
  return {
    accessorKey: "count",
    header: ({ column }) => getInventoryHeader(column, countLabel, "tw:justify-end"),
    cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "tw:flex tw:justify-end tw:tabular-nums", children: row.getValue("count") })
  };
};
const statusChangeHandler = (changedItems, newStatus, approvedItems, onApprovedItemsChange, unapprovedItems, onUnapprovedItemsChange) => {
  let newApprovedItems = [...approvedItems];
  changedItems.forEach((item) => {
    if (newStatus === "approved") {
      if (!newApprovedItems.includes(item)) {
        newApprovedItems.push(item);
      }
    } else {
      newApprovedItems = newApprovedItems.filter((validItem) => validItem !== item);
    }
  });
  onApprovedItemsChange(newApprovedItems);
  let newUnapprovedItems = [...unapprovedItems];
  changedItems.forEach((item) => {
    if (newStatus === "unapproved") {
      if (!newUnapprovedItems.includes(item)) {
        newUnapprovedItems.push(item);
      }
    } else {
      newUnapprovedItems = newUnapprovedItems.filter((unapprovedItem) => unapprovedItem !== item);
    }
  });
  onUnapprovedItemsChange(newUnapprovedItems);
};
const inventoryStatusColumn = (statusLabel, approvedItems, onApprovedItemsChange, unapprovedItems, onUnapprovedItemsChange) => {
  return {
    accessorKey: "status",
    header: ({ column }) => getInventoryHeader(column, statusLabel, "tw:justify-center"),
    cell: ({ row }) => {
      const status = row.getValue("status");
      const item = row.getValue("item");
      return (
        // Center the status buttons in the cell to match the centered status column header (the
        // ToggleGroup would otherwise sit left-aligned).
        /* @__PURE__ */ jsx("div", { className: "tw:flex tw:justify-center", children: /* @__PURE__ */ jsxs(ToggleGroup, { value: status, variant: "outline", type: "single", className: "tw:gap-0", children: [
          /* @__PURE__ */ jsx(
            ToggleGroupItem,
            {
              onClick: (event) => {
                event.stopPropagation();
                statusChangeHandler(
                  [item],
                  "approved",
                  approvedItems,
                  onApprovedItemsChange,
                  unapprovedItems,
                  onUnapprovedItemsChange
                );
              },
              value: "approved",
              className: "tw:rounded-e-none tw:border-e-0",
              children: /* @__PURE__ */ jsx(CircleCheckIcon, {})
            }
          ),
          /* @__PURE__ */ jsx(
            ToggleGroupItem,
            {
              onClick: (event) => {
                event.stopPropagation();
                statusChangeHandler(
                  [item],
                  "unapproved",
                  approvedItems,
                  onApprovedItemsChange,
                  unapprovedItems,
                  onUnapprovedItemsChange
                );
              },
              value: "unapproved",
              className: "tw:rounded-none",
              children: /* @__PURE__ */ jsx(CircleXIcon, {})
            }
          ),
          /* @__PURE__ */ jsx(
            ToggleGroupItem,
            {
              onClick: (event) => {
                event.stopPropagation();
                statusChangeHandler(
                  [item],
                  "unknown",
                  approvedItems,
                  onApprovedItemsChange,
                  unapprovedItems,
                  onUnapprovedItemsChange
                );
              },
              value: "unknown",
              className: "tw:rounded-s-none tw:border-s-0",
              children: /* @__PURE__ */ jsx(CircleHelpIcon, {})
            }
          )
        ] }) })
      );
    }
  };
};
const getLinesFromUSFM = (text) => {
  return text.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g);
};
const getNumberFromUSFM = (text) => {
  const regex = /^\\[vc]\s+(\d+)/;
  const match = text.match(regex);
  if (match) {
    return +match[1];
  }
  return void 0;
};
const getBookIdFromUSFM = (text) => {
  const match = text.match(/^\\id\s+([A-Za-z]+)/);
  if (match) {
    return match[1];
  }
  return "";
};
const getStatusForItem = (item, approvedItems, unapprovedItems) => {
  if (unapprovedItems.includes(item)) return "unapproved";
  if (approvedItems.includes(item)) return "approved";
  return "unknown";
};
const INVENTORY_STRING_KEYS = Object.freeze([
  "%webView_inventory_all%",
  "%webView_inventory_approved%",
  "%webView_inventory_unapproved%",
  "%webView_inventory_unknown%",
  "%webView_inventory_scope_currentBook%",
  "%webView_inventory_scope_chapter%",
  "%webView_inventory_scope_verse%",
  "%webView_inventory_filter_text%",
  "%webView_inventory_show_additional_items%",
  "%webView_inventory_occurrences_table_header_reference%",
  "%webView_inventory_occurrences_table_header_occurrence%",
  "%webView_inventory_no_results%"
]);
const filterItemData = (itemData, statusFilter, textFilter) => {
  let filteredItemData = itemData;
  if (statusFilter !== "all") {
    filteredItemData = filteredItemData.filter(
      (item) => statusFilter === "approved" && item.status === "approved" || statusFilter === "unapproved" && item.status === "unapproved" || statusFilter === "unknown" && item.status === "unknown"
    );
  }
  if (textFilter !== "")
    filteredItemData = filteredItemData.filter((item) => item.items[0].includes(textFilter));
  return filteredItemData;
};
const processSummaryItems = (inventoryItems, approvedItems, unapprovedItems) => {
  return inventoryItems.map((item) => {
    const itemKey = isString(item.key) ? item.key : item.key[0];
    const items = isString(item.key) ? [item.key] : item.key;
    return {
      items,
      count: item.count,
      status: item.status || getStatusForItem(itemKey, approvedItems, unapprovedItems),
      occurrences: item.occurrences || []
    };
  });
};
const localizeString$2 = (strings, key) => {
  return strings[key] ?? key;
};
function Inventory({
  inventoryItems,
  setVerseRef,
  localizedStrings,
  additionalItemsLabels,
  approvedItems,
  unapprovedItems,
  scope,
  onScopeChange,
  columns,
  id,
  areInventoryItemsLoading = false,
  classNameForVerseText,
  onItemSelected
}) {
  const allItemsText = localizeString$2(localizedStrings, "%webView_inventory_all%");
  const approvedItemsText = localizeString$2(localizedStrings, "%webView_inventory_approved%");
  const unapprovedItemsText = localizeString$2(localizedStrings, "%webView_inventory_unapproved%");
  const unknownItemsText = localizeString$2(localizedStrings, "%webView_inventory_unknown%");
  const scopeBookText = localizeString$2(localizedStrings, "%webView_inventory_scope_currentBook%");
  const scopeChapterText = localizeString$2(localizedStrings, "%webView_inventory_scope_chapter%");
  const scopeVerseText = localizeString$2(localizedStrings, "%webView_inventory_scope_verse%");
  const filterText = localizeString$2(localizedStrings, "%webView_inventory_filter_text%");
  const showAdditionalItemsText = localizeString$2(
    localizedStrings,
    "%webView_inventory_show_additional_items%"
  );
  const noResultsText = localizeString$2(localizedStrings, "%webView_inventory_no_results%");
  const [showAdditionalItems, setShowAdditionalItems] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [textFilter, setTextFilter] = useState("");
  const [selectedItem, setSelectedItem] = useState([]);
  const tableData = useMemo(() => {
    const safeInventoryItems = inventoryItems ?? [];
    if (safeInventoryItems.length === 0) return [];
    return processSummaryItems(safeInventoryItems, approvedItems, unapprovedItems);
  }, [inventoryItems, approvedItems, unapprovedItems]);
  const reducedTableData = useMemo(() => {
    if (showAdditionalItems) return tableData;
    const newTableData = [];
    tableData.forEach((tableEntry) => {
      const firstItem = tableEntry.items[0];
      const existingEntry = newTableData.find(
        (newTableEntry) => newTableEntry.items[0] === firstItem
      );
      if (existingEntry) {
        existingEntry.count += tableEntry.count;
        existingEntry.occurrences = existingEntry.occurrences.concat(tableEntry.occurrences);
      } else {
        newTableData.push({
          items: [firstItem],
          count: tableEntry.count,
          occurrences: tableEntry.occurrences,
          status: tableEntry.status
        });
      }
    });
    return newTableData;
  }, [showAdditionalItems, tableData]);
  const filteredTableData = useMemo(() => {
    if (reducedTableData.length === 0) return [];
    return filterItemData(reducedTableData, statusFilter, textFilter);
  }, [reducedTableData, statusFilter, textFilter]);
  const allColumns = useMemo(() => {
    var _a, _b;
    if (!showAdditionalItems) return columns;
    const numberOfAdditionalItems = (_a = additionalItemsLabels == null ? void 0 : additionalItemsLabels.tableHeaders) == null ? void 0 : _a.length;
    if (!numberOfAdditionalItems) return columns;
    const additionalColumns = [];
    for (let index = 0; index < numberOfAdditionalItems; index++) {
      additionalColumns.push(
        inventoryAdditionalItemColumn(
          ((_b = additionalItemsLabels == null ? void 0 : additionalItemsLabels.tableHeaders) == null ? void 0 : _b[index]) || "Additional Item",
          index + 1
        )
      );
    }
    return [...additionalColumns, ...columns];
  }, [additionalItemsLabels == null ? void 0 : additionalItemsLabels.tableHeaders, columns, showAdditionalItems]);
  useEffect(() => {
    if (filteredTableData.length === 0) {
      setSelectedItem([]);
    } else if (filteredTableData.length === 1) {
      setSelectedItem(filteredTableData[0].items);
    }
  }, [filteredTableData]);
  const rowClickHandler = (row, table) => {
    table.setRowSelection(() => {
      const newSelection = {};
      newSelection[row.index] = true;
      return newSelection;
    });
    const selectedItems = row.original.items;
    setSelectedItem(selectedItems);
    if (onItemSelected && selectedItems.length > 0) {
      onItemSelected(selectedItems[0]);
    }
  };
  const handleScopeChange = (value) => {
    if (value === "book" || value === "chapter" || value === "verse") {
      onScopeChange(value);
    } else {
      throw new Error(`Invalid scope value: ${value}`);
    }
  };
  const handleStatusFilterChange = (value) => {
    if (value === "all" || value === "approved" || value === "unapproved" || value === "unknown") {
      setStatusFilter(value);
    } else {
      throw new Error(`Invalid status filter value: ${value}`);
    }
  };
  const occurrenceData = useMemo(() => {
    if (reducedTableData.length === 0 || selectedItem.length === 0) return [];
    const occurrence = reducedTableData.filter((tableEntry) => {
      return deepEqual(
        showAdditionalItems ? tableEntry.items : [tableEntry.items[0]],
        selectedItem
      );
    });
    if (occurrence.length > 1) throw new Error("Selected item is not unique");
    if (occurrence.length === 0) return [];
    return occurrence[0].occurrences;
  }, [selectedItem, showAdditionalItems, reducedTableData]);
  return /* @__PURE__ */ jsx("div", { id, className: "pr-twp tw:h-full tw:overflow-auto", children: /* @__PURE__ */ jsxs("div", { className: "tw:flex tw:h-full tw:w-full tw:min-w-min tw:flex-col", children: [
    /* @__PURE__ */ jsxs("div", { className: "tw:flex tw:items-stretch", style: { contain: "inline-size" }, children: [
      /* @__PURE__ */ jsxs(
        Select,
        {
          onValueChange: (value) => handleStatusFilterChange(value),
          defaultValue: statusFilter,
          children: [
            /* @__PURE__ */ jsx(SelectTrigger, { className: "tw:m-1 tw:w-auto tw:flex-1", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsx(SelectItem, { value: "all", children: allItemsText }),
              /* @__PURE__ */ jsx(SelectItem, { value: "approved", children: approvedItemsText }),
              /* @__PURE__ */ jsx(SelectItem, { value: "unapproved", children: unapprovedItemsText }),
              /* @__PURE__ */ jsx(SelectItem, { value: "unknown", children: unknownItemsText })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(Select, { onValueChange: (value) => handleScopeChange(value), defaultValue: scope, children: [
        /* @__PURE__ */ jsx(SelectTrigger, { className: "tw:m-1 tw:w-auto tw:flex-1", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsx(SelectItem, { value: "book", children: scopeBookText }),
          /* @__PURE__ */ jsx(SelectItem, { value: "chapter", children: scopeChapterText }),
          /* @__PURE__ */ jsx(SelectItem, { value: "verse", children: scopeVerseText })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        Input,
        {
          className: "tw:m-1 tw:flex-1 tw:rounded-md tw:border",
          placeholder: filterText,
          value: textFilter,
          onChange: (event) => {
            setTextFilter(event.target.value);
          }
        }
      ),
      additionalItemsLabels && /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [
        /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxs("div", { className: "tw:m-1 tw:flex tw:w-fit tw:min-w-[26px] tw:items-center tw:rounded-md tw:border", children: [
          /* @__PURE__ */ jsx(
            Checkbox,
            {
              className: "tw:m-1 tw:shrink-0",
              checked: showAdditionalItems,
              onCheckedChange: (checked) => {
                setShowAdditionalItems(checked);
              }
            }
          ),
          /* @__PURE__ */ jsx(Label, { className: "tw:m-1 tw:truncate", children: (additionalItemsLabels == null ? void 0 : additionalItemsLabels.checkboxText) ?? showAdditionalItemsText })
        ] }) }),
        /* @__PURE__ */ jsx(TooltipContent, { children: (additionalItemsLabels == null ? void 0 : additionalItemsLabels.checkboxText) ?? showAdditionalItemsText })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "tw:m-1 tw:flex-1 tw:overflow-auto tw:rounded-md tw:border", children: /* @__PURE__ */ jsx(
      DataTable,
      {
        columns: allColumns,
        data: filteredTableData,
        onRowClickHandler: rowClickHandler,
        stickyHeader: true,
        isLoading: areInventoryItemsLoading,
        noResultsMessage: noResultsText
      }
    ) }),
    occurrenceData.length > 0 && /* @__PURE__ */ jsx("div", { className: "tw:m-1 tw:flex-1 tw:overflow-auto tw:rounded-md tw:border", children: /* @__PURE__ */ jsx(
      OccurrencesTable,
      {
        classNameForText: classNameForVerseText,
        occurrenceData,
        setScriptureReference: setVerseRef,
        localizedStrings
      }
    ) })
  ] }) });
}
function getSubMenuGroupKeysForMenuItemId(groups, id) {
  return Object.entries(groups).filter(([, value]) => "menuItem" in value && value.menuItem === id).sort(([, a2], [, b2]) => a2.order - b2.order).map(([groupKey]) => groupKey);
}
function getColumnGroupKeys(groups, columnKey) {
  return Object.entries(groups).filter(([key, group]) => isGroupUnderColumnOrSubMenu(key, group, columnKey)).sort(([, a2], [, b2]) => a2.order - b2.order).map(([key]) => key);
}
function getSortedMenuColumns(columns) {
  return Object.entries(columns).flatMap(([columnKey, column]) => typeof column === "object" ? [{ columnKey, column }] : []).sort((a2, b2) => a2.column.order - b2.column.order);
}
function isGroupUnderColumnOrSubMenu(groupKey, group, columnOrSubMenuKey) {
  return "column" in group && group.column === columnOrSubMenuKey || groupKey === columnOrSubMenuKey;
}
function getMenuSectionsWithItems(menuData) {
  const groupKeysWithItems = new Set(menuData.items.map((item) => item.group));
  const groupsWithItems = Object.entries(menuData.groups).filter(
    ([groupKey]) => groupKeysWithItems.has(groupKey)
  );
  return getSortedMenuColumns(menuData.columns).filter(
    ({ columnKey }) => groupsWithItems.some(
      ([groupKey, group]) => isGroupUnderColumnOrSubMenu(groupKey, group, columnKey)
    )
  ).map(({ columnKey, column }) => ({
    columnKey,
    label: column.label,
    isHeaderHidden: column.isHeaderHidden ?? false
  }));
}
function getLeadingIconSlot(items) {
  return items.some(
    (item) => isLucideIconName(item.iconNameBefore) || item.iconPathBefore || item.checked !== void 0
  ) ? "icon" : "none";
}
function joinGroupsWithSeparators(groups, createSeparator) {
  let hasShownItems = false;
  return groups.flatMap(({ groupKey, items }) => {
    if (items.length === 0) return [];
    const separator = hasShownItems ? [createSeparator(groupKey)] : [];
    hasShownItems = true;
    return [...separator, ...items];
  });
}
function buildGroupNodes(menuData, groupKeys) {
  return groupKeys.map((groupKey) => ({
    groupKey,
    items: menuData.items.filter((item) => item.group === groupKey).sort((a2, b2) => a2.order - b2.order).map(
      (item) => "command" in item ? { item } : {
        item,
        subGroups: buildGroupNodes(
          menuData,
          getSubMenuGroupKeysForMenuItemId(menuData.groups, item.id)
        )
      }
    )
  }));
}
function buildMenuTree(menuData) {
  if (!menuData) return { columns: [] };
  return {
    columns: getSortedMenuColumns(menuData.columns).map((entry) => ({
      ...entry,
      groups: buildGroupNodes(menuData, getColumnGroupKeys(menuData.groups, entry.columnKey))
    }))
  };
}
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SidebarContext = React.createContext(void 0);
function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}
function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  // CUSTOM: Added 'side' prop at provider level so direction-aware side can be propagated via context
  side = "primary",
  ...props
}) {
  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = React.useCallback(
    (value) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }
    },
    [setOpenProp, open]
  );
  const toggleSidebar = React.useCallback(() => {
    return setOpen((prevOpen) => !prevOpen);
  }, [setOpen]);
  const state = open ? "expanded" : "collapsed";
  const dir = readDirection();
  const oppositeSide = side === "primary" ? "secondary" : "primary";
  const directionAwareSide = dir === "ltr" ? side : oppositeSide;
  const contextValue = React.useMemo(
    () => ({
      state,
      open,
      setOpen,
      toggleSidebar,
      // CUSTOM: Passes direction-aware side into context so SidebarTrigger icon and Sidebar
      // positioning both respond correctly in RTL layouts
      side: directionAwareSide
    }),
    [state, open, setOpen, toggleSidebar, directionAwareSide]
  );
  const wrapperStyle = {
    "--sidebar-width": SIDEBAR_WIDTH,
    "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
    ...style
  };
  return /* @__PURE__ */ jsx(SidebarContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-wrapper",
      style: wrapperStyle,
      className: cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        // CUSTOM: Removed tw:min-h-svh - not appropriate in Platform.Bible's windowed layout
        "pr-twp tw:group/sidebar-wrapper tw:flex tw:w-full tw:has-data-[variant=inset]:bg-sidebar",
        className
      ),
      ...props,
      children
    }
  ) });
}
function Sidebar({
  // CUSTOM: Removed 'side' prop from Sidebar - it is now read from context (moved to SidebarProvider)
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}) {
  const context = useSidebar();
  if (collapsible === "none") {
    return /* @__PURE__ */ jsx(
      "div",
      {
        "data-slot": "sidebar",
        className: cn(
          "tw:flex tw:h-full tw:w-(--sidebar-width) tw:flex-col tw:bg-sidebar tw:text-sidebar-foreground",
          className
        ),
        ...props,
        children
      }
    );
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "tw:group tw:peer tw:hidden tw:text-sidebar-foreground tw:md:block",
      "data-state": context.state,
      "data-collapsible": context.state === "collapsed" ? collapsible : "",
      "data-variant": variant,
      "data-side": context.side,
      "data-slot": "sidebar",
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            "data-slot": "sidebar-gap",
            className: cn(
              "tw:relative tw:w-(--sidebar-width) tw:bg-transparent tw:transition-[width] tw:duration-200 tw:ease-linear",
              "tw:group-data-[collapsible=offcanvas]:w-0",
              // CUSTOM: Updated selector from data-[side=right] to data-[side=secondary]
              "tw:group-data-[side=secondary]:rotate-180",
              variant === "floating" || variant === "inset" ? "tw:group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]" : "tw:group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
            )
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            "data-slot": "sidebar-container",
            "data-side": context.side,
            className: cn(
              // CUSTOM: Switched tw:fixed to tw:absolute to scope the sidebar inside its container
              // rather than the viewport, matching Platform.Bible's layout model
              "tw:absolute tw:inset-y-0 tw:z-10 tw:hidden tw:h-svh tw:w-(--sidebar-width) tw:transition-[left,right,width] tw:duration-200 tw:ease-linear tw:md:flex",
              // CUSTOM: Use positional side values (primary/secondary) for left/right offset selectors
              context.side === "primary" ? "tw:left-0 tw:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "tw:right-0 tw:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
              // Adjust the padding for floating and inset variants.
              variant === "floating" || variant === "inset" ? "tw:p-2 tw:group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]" : (
                // CUSTOM: Updated border selectors from data-[side=left/right] to data-[side=primary/secondary]
                "tw:group-data-[collapsible=icon]:w-(--sidebar-width-icon) tw:group-data-[side=primary]:border-e tw:group-data-[side=secondary]:border-s"
              ),
              className
            ),
            ...props,
            children: /* @__PURE__ */ jsx(
              "div",
              {
                "data-sidebar": "sidebar",
                "data-slot": "sidebar-inner",
                className: "tw:flex tw:size-full tw:flex-col tw:bg-sidebar tw:group-data-[variant=floating]:rounded-lg tw:group-data-[variant=floating]:shadow-sm tw:group-data-[variant=floating]:ring-1 tw:group-data-[variant=floating]:ring-sidebar-border",
                children
              }
            )
          }
        )
      ]
    }
  );
}
function SidebarTrigger({ className, onClick, ...props }) {
  const { toggleSidebar, side } = useSidebar();
  return /* @__PURE__ */ jsxs(
    Button,
    {
      "data-sidebar": "trigger",
      "data-slot": "sidebar-trigger",
      variant: "ghost",
      size: "icon-sm",
      className: cn(className),
      onClick: (event) => {
        onClick == null ? void 0 : onClick(event);
        toggleSidebar();
      },
      ...props,
      children: [
        side === "primary" ? /* @__PURE__ */ jsx(IconLayoutSidebar, {}) : /* @__PURE__ */ jsx(IconLayoutSidebarRight, {}),
        /* @__PURE__ */ jsx("span", { className: "tw:sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
}
function SidebarRail({ className, ...props }) {
  const { toggleSidebar } = useSidebar();
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      "data-sidebar": "rail",
      "data-slot": "sidebar-rail",
      "aria-label": "Toggle Sidebar",
      tabIndex: -1,
      onClick: toggleSidebar,
      title: "Toggle Sidebar",
      className: cn(
        // CUSTOM: Updated selectors from data-[side=left/right] to data-[side=primary/secondary]
        "tw:absolute tw:inset-y-0 tw:z-20 tw:hidden tw:w-4 tw:transition-all tw:ease-linear tw:group-data-[side=primary]:-right-4 tw:group-data-[side=secondary]:left-0 tw:after:absolute tw:after:inset-y-0 tw:after:start-1/2 tw:after:w-[2px] tw:hover:after:bg-sidebar-border tw:sm:flex tw:ltr:-translate-x-1/2 tw:rtl:translate-x-1/2",
        "tw:in-data-[side=primary]:cursor-w-resize tw:rtl:in-data-[side=primary]:cursor-e-resize tw:in-data-[side=secondary]:cursor-e-resize tw:rtl:in-data-[side=secondary]:cursor-w-resize",
        "tw:[[data-side=primary][data-state=collapsed]_&]:cursor-e-resize tw:rtl:[[data-side=primary][data-state=collapsed]_&]:cursor-w-resize tw:[[data-side=secondary][data-state=collapsed]_&]:cursor-w-resize tw:rtl:[[data-side=secondary][data-state=collapsed]_&]:cursor-e-resize",
        "tw:group-data-[collapsible=offcanvas]:translate-x-0 tw:group-data-[collapsible=offcanvas]:after:start-full tw:hover:group-data-[collapsible=offcanvas]:bg-sidebar",
        // CUSTOM: Updated selectors from data-[side=left/right] to data-[side=primary/secondary]
        "tw:[[data-side=primary][data-collapsible=offcanvas]_&]:-end-2",
        "tw:[[data-side=secondary][data-collapsible=offcanvas]_&]:-start-2",
        className
      ),
      ...props
    }
  );
}
function SidebarInset({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "main",
    {
      "data-slot": "sidebar-inset",
      className: cn(
        // CUSTOM: Removed tw:min-h-svh - not appropriate in Platform.Bible's windowed layout
        "tw:relative tw:flex tw:w-full tw:flex-1 tw:flex-col tw:bg-background tw:md:peer-data-[variant=inset]:m-2 tw:md:peer-data-[variant=inset]:ms-0 tw:md:peer-data-[variant=inset]:rounded-xl tw:md:peer-data-[variant=inset]:shadow-sm tw:md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ms-2",
        className
      ),
      ...props
    }
  );
}
function SidebarInput({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    Input,
    {
      "data-slot": "sidebar-input",
      "data-sidebar": "input",
      className: cn("tw:h-8 tw:w-full tw:bg-background tw:shadow-none", className),
      ...props
    }
  );
}
function SidebarHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-header",
      "data-sidebar": "header",
      className: cn("tw:flex tw:flex-col tw:gap-2 tw:p-2", className),
      ...props
    }
  );
}
function SidebarFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-footer",
      "data-sidebar": "footer",
      className: cn("tw:flex tw:flex-col tw:gap-2 tw:p-2", className),
      ...props
    }
  );
}
function SidebarSeparator({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    Separator,
    {
      "data-slot": "sidebar-separator",
      "data-sidebar": "separator",
      className: cn("tw:mx-2 tw:w-auto tw:bg-sidebar-border", className),
      ...props
    }
  );
}
function SidebarContent({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-content",
      "data-sidebar": "content",
      className: cn(
        "tw:no-scrollbar tw:flex tw:min-h-0 tw:flex-1 tw:flex-col tw:gap-0 tw:overflow-auto tw:group-data-[collapsible=icon]:overflow-hidden",
        className
      ),
      ...props
    }
  );
}
function SidebarGroup({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-group",
      "data-sidebar": "group",
      className: cn("tw:relative tw:flex tw:w-full tw:min-w-0 tw:flex-col tw:p-2", className),
      ...props
    }
  );
}
function SidebarGroupLabel({
  className,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot.Root : "div";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "sidebar-group-label",
      "data-sidebar": "group-label",
      className: cn(
        "tw:flex tw:h-8 tw:shrink-0 tw:items-center tw:rounded-md tw:px-2 tw:text-xs tw:font-medium tw:text-sidebar-foreground/70 tw:ring-sidebar-ring tw:outline-hidden tw:transition-[margin,opacity] tw:duration-200 tw:ease-linear tw:group-data-[collapsible=icon]:-mt-8 tw:group-data-[collapsible=icon]:opacity-0 tw:focus-visible:ring-2 tw:[&>svg]:size-4 tw:[&>svg]:shrink-0",
        className
      ),
      ...props
    }
  );
}
function SidebarGroupAction({
  className,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot.Root : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "sidebar-group-action",
      "data-sidebar": "group-action",
      className: cn(
        "tw:absolute tw:top-3.5 tw:end-3 tw:flex tw:aspect-square tw:w-5 tw:items-center tw:justify-center tw:rounded-md tw:p-0 tw:text-sidebar-foreground tw:ring-sidebar-ring tw:outline-hidden tw:transition-transform tw:group-data-[collapsible=icon]:hidden tw:after:absolute tw:after:-inset-2 tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:focus-visible:ring-2 tw:md:after:hidden tw:[&>svg]:size-4 tw:[&>svg]:shrink-0",
        className
      ),
      ...props
    }
  );
}
function SidebarGroupContent({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-group-content",
      "data-sidebar": "group-content",
      className: cn("tw:w-full tw:text-sm", className),
      ...props
    }
  );
}
function SidebarMenu({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "ul",
    {
      "data-slot": "sidebar-menu",
      "data-sidebar": "menu",
      className: cn("tw:flex tw:w-full tw:min-w-0 tw:flex-col tw:gap-0", className),
      ...props
    }
  );
}
function SidebarMenuItem({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "li",
    {
      "data-slot": "sidebar-menu-item",
      "data-sidebar": "menu-item",
      className: cn("tw:group/menu-item tw:relative", className),
      ...props
    }
  );
}
const sidebarMenuButtonVariants = cva(
  "tw:peer/menu-button tw:group/menu-button tw:flex tw:w-full tw:items-center tw:gap-2 tw:overflow-hidden tw:rounded-md tw:p-2 tw:text-start tw:text-sm tw:ring-sidebar-ring tw:outline-hidden tw:transition-[width,height,padding] tw:group-has-data-[sidebar=menu-action]/menu-item:pe-8 tw:group-data-[collapsible=icon]:size-8! tw:group-data-[collapsible=icon]:p-2! tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:focus-visible:ring-2 tw:active:bg-sidebar-accent tw:active:text-sidebar-accent-foreground tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:aria-disabled:pointer-events-none tw:aria-disabled:opacity-50 tw:data-open:hover:bg-sidebar-accent tw:data-open:hover:text-sidebar-accent-foreground tw:data-active:bg-sidebar-accent tw:data-active:font-medium tw:data-active:text-sidebar-accent-foreground tw:[&_svg]:size-4 tw:[&_svg]:shrink-0 tw:[&>span:last-child]:truncate",
  {
    variants: {
      variant: {
        default: "tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground",
        // CUSTOM: Updated shadow color values from hsl(var(--...)) to var(--...) to use the
        // updated CSS variable format that includes the color space directly in the variable value
        outline: "tw:bg-background tw:shadow-[0_0_0_1px_var(--sidebar-border)] tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:hover:shadow-[0_0_0_1px_var(--sidebar-accent)]"
      },
      size: {
        default: "tw:h-8 tw:text-sm",
        sm: "tw:h-7 tw:text-xs",
        lg: "tw:h-12 tw:text-sm tw:group-data-[collapsible=icon]:p-0!"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}) {
  const Comp = asChild ? Slot.Root : "button";
  const { state } = useSidebar();
  const button = /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "sidebar-menu-button",
      "data-sidebar": "menu-button",
      "data-size": size,
      "data-active": isActive,
      className: cn(sidebarMenuButtonVariants({ variant, size }), className),
      ...props
    }
  );
  if (!tooltip) {
    return button;
  }
  const resolvedTooltip = typeof tooltip === "string" ? { children: tooltip } : tooltip;
  return /* @__PURE__ */ jsxs(Tooltip, { children: [
    /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: button }),
    /* @__PURE__ */ jsx(
      TooltipContent,
      {
        side: "right",
        align: "center",
        hidden: state !== "collapsed",
        ...resolvedTooltip
      }
    )
  ] });
}
function SidebarMenuAction({
  className,
  asChild = false,
  showOnHover = false,
  ...props
}) {
  const Comp = asChild ? Slot.Root : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "sidebar-menu-action",
      "data-sidebar": "menu-action",
      className: cn(
        "tw:absolute tw:top-1.5 tw:end-1 tw:flex tw:aspect-square tw:w-5 tw:items-center tw:justify-center tw:rounded-md tw:p-0 tw:text-sidebar-foreground tw:ring-sidebar-ring tw:outline-hidden tw:transition-transform tw:group-data-[collapsible=icon]:hidden tw:peer-hover/menu-button:text-sidebar-accent-foreground tw:peer-data-[size=default]/menu-button:top-1.5 tw:peer-data-[size=lg]/menu-button:top-2.5 tw:peer-data-[size=sm]/menu-button:top-1 tw:after:absolute tw:after:-inset-2 tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:focus-visible:ring-2 tw:md:after:hidden tw:[&>svg]:size-4 tw:[&>svg]:shrink-0",
        showOnHover && "tw:group-focus-within/menu-item:opacity-100 tw:group-hover/menu-item:opacity-100 tw:peer-data-active/menu-button:text-sidebar-accent-foreground tw:aria-expanded:opacity-100 tw:md:opacity-0",
        className
      ),
      ...props
    }
  );
}
function SidebarMenuBadge({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-menu-badge",
      "data-sidebar": "menu-badge",
      className: cn(
        "tw:pointer-events-none tw:absolute tw:end-1 tw:flex tw:h-5 tw:min-w-5 tw:items-center tw:justify-center tw:rounded-md tw:px-1 tw:text-xs tw:font-medium tw:text-sidebar-foreground tw:tabular-nums tw:select-none tw:group-data-[collapsible=icon]:hidden tw:peer-hover/menu-button:text-sidebar-accent-foreground tw:peer-data-[size=default]/menu-button:top-1.5 tw:peer-data-[size=lg]/menu-button:top-2.5 tw:peer-data-[size=sm]/menu-button:top-1 tw:peer-data-active/menu-button:text-sidebar-accent-foreground",
        className
      ),
      ...props
    }
  );
}
function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}) {
  const [width] = React.useState(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  });
  const skeletonStyle = { "--skeleton-width": width };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      "data-slot": "sidebar-menu-skeleton",
      "data-sidebar": "menu-skeleton",
      className: cn("tw:flex tw:h-8 tw:items-center tw:gap-2 tw:rounded-md tw:px-2", className),
      ...props,
      children: [
        showIcon && /* @__PURE__ */ jsx(Skeleton, { className: "tw:size-4 tw:rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ jsx(
          Skeleton,
          {
            className: "tw:h-4 tw:max-w-(--skeleton-width) tw:flex-1",
            "data-sidebar": "menu-skeleton-text",
            style: skeletonStyle
          }
        )
      ]
    }
  );
}
function SidebarMenuSub({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "ul",
    {
      "data-slot": "sidebar-menu-sub",
      "data-sidebar": "menu-sub",
      className: cn(
        "tw:mx-3.5 tw:flex tw:min-w-0 tw:translate-x-px tw:rtl:-translate-x-px tw:flex-col tw:gap-1 tw:border-s tw:border-sidebar-border tw:px-2.5 tw:py-0.5 tw:group-data-[collapsible=icon]:hidden",
        className
      ),
      ...props
    }
  );
}
function SidebarMenuSubItem({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "li",
    {
      "data-slot": "sidebar-menu-sub-item",
      "data-sidebar": "menu-sub-item",
      className: cn("tw:group/menu-sub-item tw:relative", className),
      ...props
    }
  );
}
function SidebarMenuSubButton({
  asChild = false,
  size = "md",
  isActive = false,
  className,
  ...props
}) {
  const Comp = asChild ? Slot.Root : "a";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "sidebar-menu-sub-button",
      "data-sidebar": "menu-sub-button",
      "data-size": size,
      "data-active": isActive,
      className: cn(
        "tw:flex tw:h-7 tw:min-w-0 tw:-translate-x-px tw:rtl:translate-x-px tw:items-center tw:gap-2 tw:overflow-hidden tw:rounded-md tw:px-2 tw:text-sidebar-foreground tw:ring-sidebar-ring tw:outline-hidden tw:group-data-[collapsible=icon]:hidden tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:focus-visible:ring-2 tw:active:bg-sidebar-accent tw:active:text-sidebar-accent-foreground tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:aria-disabled:pointer-events-none tw:aria-disabled:opacity-50 tw:data-[size=md]:text-sm tw:data-[size=sm]:text-xs tw:data-active:bg-sidebar-accent tw:data-active:text-sidebar-accent-foreground tw:[&>span:last-child]:truncate tw:[&>svg]:size-4 tw:[&>svg]:shrink-0 tw:[&>svg]:text-sidebar-accent-foreground",
        className
      ),
      ...props
    }
  );
}
function SettingsSidebar({
  id,
  extensionLabels,
  projectInfo,
  handleSelectSidebarItem,
  selectedSidebarItem,
  extensionsSidebarGroupLabel,
  projectsSidebarGroupLabel,
  buttonPlaceholderText,
  searchPlaceholderText,
  noResultsText,
  className
}) {
  const handleSelectItem = useCallback(
    (item, projectId) => {
      handleSelectSidebarItem(item, projectId);
    },
    [handleSelectSidebarItem]
  );
  const getProjectNameFromProjectId = useCallback(
    (projectId) => {
      const project = projectInfo.find((info) => info.projectId === projectId);
      return project ? project.projectName : projectId;
    },
    [projectInfo]
  );
  const projectSelectorProjects = useMemo(
    () => projectInfo.map((info) => ({
      id: info.projectId,
      shortName: info.projectName,
      fullName: info.projectFullName
    })),
    [projectInfo]
  );
  const projectSelectorStrings = useMemo(() => {
    const strings = {
      buttonPlaceholder: buttonPlaceholderText,
      ariaLabel: projectsSidebarGroupLabel
    };
    if (searchPlaceholderText) strings.searchPlaceholder = searchPlaceholderText;
    if (noResultsText) strings.commandEmptyMessage = noResultsText;
    return strings;
  }, [buttonPlaceholderText, projectsSidebarGroupLabel, searchPlaceholderText, noResultsText]);
  const getIsActive = useCallback(
    (label) => !selectedSidebarItem.projectId && label === selectedSidebarItem.label,
    [selectedSidebarItem]
  );
  return /* @__PURE__ */ jsx(
    Sidebar,
    {
      id,
      collapsible: "none",
      variant: "inset",
      className: cn("tw:w-96 tw:gap-2 tw:overflow-y-auto", className),
      children: /* @__PURE__ */ jsxs(SidebarContent, { children: [
        /* @__PURE__ */ jsxs(SidebarGroup, { children: [
          /* @__PURE__ */ jsx(SidebarGroupLabel, { className: "tw:text-sm", children: extensionsSidebarGroupLabel }),
          /* @__PURE__ */ jsx(SidebarGroupContent, { children: /* @__PURE__ */ jsx(SidebarMenu, { children: Object.entries(extensionLabels).map(([key, label]) => /* @__PURE__ */ jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsx(
            SidebarMenuButton,
            {
              onClick: () => handleSelectItem(key),
              isActive: getIsActive(key),
              children: /* @__PURE__ */ jsx("span", { className: "tw:pl-3", children: label })
            }
          ) }, key)) }) })
        ] }),
        /* @__PURE__ */ jsxs(SidebarGroup, { children: [
          /* @__PURE__ */ jsx(SidebarGroupLabel, { className: "tw:text-sm", children: projectsSidebarGroupLabel }),
          /* @__PURE__ */ jsx(SidebarGroupContent, { className: "tw:pl-3", children: /* @__PURE__ */ jsxs(
            "div",
            {
              className: cn(
                "tw:flex tw:w-full tw:items-center tw:gap-2 tw:rounded-md tw:px-2 tw:py-1",
                {
                  "tw:bg-sidebar-accent tw:text-sidebar-accent-foreground": selectedSidebarItem == null ? void 0 : selectedSidebarItem.projectId
                }
              ),
              children: [
                /* @__PURE__ */ jsx(ScrollText, { className: "tw:h-4 tw:w-4 tw:shrink-0" }),
                /* @__PURE__ */ jsx(
                  ProjectSelector,
                  {
                    mode: "project",
                    projects: projectSelectorProjects,
                    openTabs: [],
                    selection: { projectId: (selectedSidebarItem == null ? void 0 : selectedSidebarItem.projectId) ?? "" },
                    onChangeSelection: ({ projectId: nextId }) => {
                      if (!nextId) return;
                      const selectedProjectName = getProjectNameFromProjectId(nextId);
                      handleSelectItem(selectedProjectName, nextId);
                    },
                    buttonVariant: "ghost",
                    buttonClassName: "tw:h-8 tw:w-full tw:flex-1 tw:justify-start tw:font-normal",
                    localizedStrings: projectSelectorStrings,
                    triggerLabelFormat: "shortNameAndFullName"
                  }
                )
              ]
            }
          ) })
        ] })
      ] })
    }
  );
}
function SettingsSidebarContentSearch({
  id,
  children,
  searchValue,
  onSearch,
  className,
  // Everything else on this type comes from `SettingsSidebarProps`, so forward it wholesale: a
  // prop added to the sidebar reaches it without a matching edit here. `id` is destructured out
  // because it belongs to the SidebarProvider below, not to the sidebar.
  ...sidebarProps
}) {
  return /* @__PURE__ */ jsxs("div", { className: "tw:box-border tw:flex tw:h-full tw:flex-col", children: [
    /* @__PURE__ */ jsx("div", { className: "tw:box-border tw:flex tw:items-center tw:justify-center tw:py-4", children: /* @__PURE__ */ jsx(
      SearchBar,
      {
        className: "tw:w-9/12",
        value: searchValue,
        onSearch,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ jsxs(
      SidebarProvider,
      {
        id,
        className: "tw:h-full tw:flex-1 tw:gap-4 tw:overflow-auto tw:border-t",
        children: [
          /* @__PURE__ */ jsx(
            SettingsSidebar,
            {
              className: cn("tw:w-1/2 tw:min-w-[140px] tw:max-w-[220px] tw:border-e", className),
              ...sidebarProps
            }
          ),
          /* @__PURE__ */ jsx(SidebarInset, { className: "tw:min-w-[215px]", children })
        ]
      }
    )
  ] });
}
const scrBookColId = "scrBook";
const scrRefColId = "scrRef";
const typeColId = "source";
const detailsColId = "details";
const defaultScrRefColumnName = "Scripture Reference";
const defaultScrBookGroupName = "Scripture Book";
const defaultTypeColumnName = "Type";
const defaultDetailsColumnName = "Details";
function getColumns(colInfo, showSourceColumn) {
  const showSrcCol = showSourceColumn ?? false;
  return [
    {
      accessorFn: (row) => `${row.start.book} ${row.start.chapterNum}:${row.start.verseNum}`,
      id: scrBookColId,
      header: (colInfo == null ? void 0 : colInfo.scriptureReferenceColumnName) ?? defaultScrRefColumnName,
      cell: (info) => {
        const row = info.row.original;
        if (info.row.getIsGrouped()) {
          return Canon.bookIdToEnglishName(row.start.book);
        }
        return info.row.groupingColumnId === scrBookColId ? formatScrRef(row.start) : void 0;
      },
      getGroupingValue: (row) => Canon.bookIdToNumber(row.start.book),
      sortingFn: (a2, b2) => {
        return compareScrRefs(a2.original.start, b2.original.start);
      },
      enableGrouping: true
    },
    {
      accessorFn: (row) => formatScrRef(row.start),
      id: scrRefColId,
      header: void 0,
      cell: (info) => {
        const row = info.row.original;
        return info.row.getIsGrouped() ? void 0 : formatScrRef(row.start);
      },
      sortingFn: (a2, b2) => {
        return compareScrRefs(a2.original.start, b2.original.start);
      },
      enableGrouping: false
    },
    {
      accessorFn: (row) => row.source.displayName,
      id: typeColId,
      header: showSrcCol ? (colInfo == null ? void 0 : colInfo.typeColumnName) ?? defaultTypeColumnName : void 0,
      cell: (info) => showSrcCol || info.row.getIsGrouped() ? info.getValue() : void 0,
      getGroupingValue: (row) => row.source.id,
      sortingFn: (a2, b2) => a2.original.source.displayName.localeCompare(b2.original.source.displayName),
      enableGrouping: true
    },
    {
      accessorFn: (row) => row.detail,
      id: detailsColId,
      header: (colInfo == null ? void 0 : colInfo.detailsColumnName) ?? defaultDetailsColumnName,
      cell: (info) => info.getValue(),
      enableGrouping: false
    }
  ];
}
const toRefOrRange = (scriptureSelection) => {
  if (!("offset" in scriptureSelection.start))
    throw new Error("No offset available in range start");
  if (scriptureSelection.end && !("offset" in scriptureSelection.end))
    throw new Error("No offset available in range end");
  const { offset: offsetStart } = scriptureSelection.start;
  let offsetEnd = 0;
  if (scriptureSelection.end) ({ offset: offsetEnd } = scriptureSelection.end);
  if (!scriptureSelection.end || compareScrRefs(scriptureSelection.start, scriptureSelection.end) === 0)
    return `${scrRefToBBBCCCVVV(scriptureSelection.start)}+${offsetStart}`;
  return `${scrRefToBBBCCCVVV(scriptureSelection.start)}+${offsetStart}-${scrRefToBBBCCCVVV(scriptureSelection.end)}+${offsetEnd}`;
};
const getRowKey = (row) => `${toRefOrRange({ start: row.start, end: row.end })} ${row.source.displayName} ${row.detail}`;
function ScriptureResultsViewer({
  sources,
  showColumnHeaders = false,
  showSourceColumn = false,
  scriptureReferenceColumnName,
  scriptureBookGroupName,
  typeColumnName,
  detailsColumnName,
  onRowSelected,
  id
}) {
  const [grouping, setGrouping] = useState([]);
  const [sorting, setSorting] = useState([{ id: scrBookColId, desc: false }]);
  const [rowSelection, setRowSelection] = useState({});
  const scriptureResults = useMemo(
    () => sources.flatMap((source) => {
      return source.data.map((item) => ({
        ...item,
        source: source.source
      }));
    }),
    [sources]
  );
  const columns = useMemo(
    () => getColumns(
      {
        scriptureReferenceColumnName,
        typeColumnName,
        detailsColumnName
      },
      showSourceColumn
    ),
    [scriptureReferenceColumnName, typeColumnName, detailsColumnName, showSourceColumn]
  );
  useEffect(() => {
    if (grouping.includes(typeColId)) {
      setSorting([
        { id: typeColId, desc: false },
        { id: scrBookColId, desc: false }
      ]);
    } else {
      setSorting([{ id: scrBookColId, desc: false }]);
    }
  }, [grouping]);
  const table = useReactTable({
    data: scriptureResults,
    columns,
    state: {
      grouping,
      sorting,
      rowSelection
    },
    onGroupingChange: setGrouping,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getRowId: getRowKey,
    autoResetExpanded: false,
    enableMultiRowSelection: false,
    enableSubRowSelection: false
  });
  useEffect(() => {
    if (onRowSelected) {
      const selectedRows = table.getSelectedRowModel().rowsById;
      const keys = Object.keys(selectedRows);
      if (keys.length === 1) {
        const selectedRow = scriptureResults.find((row) => getRowKey(row) === keys[0]) || void 0;
        if (selectedRow) onRowSelected(selectedRow);
      }
    }
  }, [rowSelection, scriptureResults, onRowSelected, table]);
  const scrBookGroupName = scriptureBookGroupName ?? defaultScrBookGroupName;
  const typeGroupName = typeColumnName ?? defaultTypeColumnName;
  const groupingOptions = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${scrBookGroupName}`, value: [scrBookColId] },
    { label: `Group by ${typeGroupName}`, value: [typeColId] },
    {
      label: `Group by ${scrBookGroupName} and ${typeGroupName}`,
      value: [scrBookColId, typeColId]
    },
    {
      label: `Group by ${typeGroupName} and ${scrBookGroupName}`,
      value: [typeColId, scrBookColId]
    }
  ];
  const handleSelectChange = (selectedGrouping) => {
    setGrouping(JSON.parse(selectedGrouping));
  };
  const handleRowClick = (row, event) => {
    if (!row.getIsGrouped() && !row.getIsSelected()) {
      row.getToggleSelectedHandler()(event);
    }
  };
  const getEvenOrOddBandingStyle = (row, index) => {
    if (row.getIsGrouped()) return "";
    return cn("banded-row", index % 2 === 0 ? "even" : "odd");
  };
  const getIndent = (groupingState, row, cell) => {
    if ((groupingState == null ? void 0 : groupingState.length) === 0 || row.depth < cell.column.getGroupedIndex()) return void 0;
    if (row.getIsGrouped()) {
      switch (row.depth) {
        case 1:
          return "tw:ps-4";
        default:
          return void 0;
      }
    }
    switch (row.depth) {
      case 1:
        return "tw:ps-8";
      case 2:
        return "tw:ps-12";
      default:
        return void 0;
    }
  };
  return /* @__PURE__ */ jsxs("div", { id, className: "pr-twp tw:flex tw:h-full tw:w-full tw:flex-col", children: [
    !showColumnHeaders && /* @__PURE__ */ jsxs(
      Select,
      {
        value: JSON.stringify(grouping),
        onValueChange: (value) => {
          handleSelectChange(value);
        },
        children: [
          /* @__PURE__ */ jsx(SelectTrigger, { className: "tw:mb-1 tw:mt-2", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsx(SelectContent, { position: "item-aligned", children: /* @__PURE__ */ jsx(SelectGroup, { children: groupingOptions.map((option) => /* @__PURE__ */ jsx(SelectItem, { value: JSON.stringify(option.value), children: option.label }, option.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(Table, { className: "tw:relative tw:flex tw:flex-col tw:overflow-y-auto tw:p-0", children: [
      showColumnHeaders && /* @__PURE__ */ jsx(TableHeader, { children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsx(TableRow, { children: headerGroup.headers.filter((h) => h.column.columnDef.header).map((header) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ jsx(TableHead, { colSpan: header.colSpan, className: "tw:sticky top-0", children: header.isPlaceholder ? void 0 : /* @__PURE__ */ jsxs("div", { children: [
          header.column.getCanGroup() ? /* @__PURE__ */ jsx(
            Button,
            {
              variant: "ghost",
              title: `Toggle grouping by ${header.column.columnDef.header}`,
              onClick: header.column.getToggleGroupingHandler(),
              type: "button",
              children: header.column.getIsGrouped() ? `🛑` : `👊 `
            }
          ) : void 0,
          " ",
          flexRender(header.column.columnDef.header, header.getContext())
        ] }) }, header.id)
      )) }, headerGroup.id)) }),
      /* @__PURE__ */ jsx(TableBody, { children: table.getRowModel().rows.map((row, rowIndex) => {
        const dir = readDirection();
        return /* @__PURE__ */ jsx(
          TableRow,
          {
            "data-state": row.getIsSelected() ? "selected" : "",
            className: cn(getEvenOrOddBandingStyle(row, rowIndex)),
            onClick: (event) => handleRowClick(row, event),
            children: row.getVisibleCells().map((cell) => {
              if (cell.getIsPlaceholder() || cell.column.columnDef.enableGrouping && !cell.getIsGrouped() && (cell.column.columnDef.id !== typeColId || !showSourceColumn))
                return void 0;
              return /* @__PURE__ */ jsx(
                TableCell,
                {
                  className: cn(
                    cell.column.columnDef.id,
                    "tw:p-[1px]",
                    getIndent(grouping, row, cell)
                  ),
                  children: (() => {
                    if (cell.getIsGrouped()) {
                      return /* @__PURE__ */ jsxs(
                        Button,
                        {
                          variant: "link",
                          onClick: row.getToggleExpandedHandler(),
                          type: "button",
                          children: [
                            row.getIsExpanded() && /* @__PURE__ */ jsx(ChevronDown, {}),
                            !row.getIsExpanded() && (dir === "ltr" ? /* @__PURE__ */ jsx(ChevronRight, {}) : /* @__PURE__ */ jsx(ChevronLeft, {})),
                            " ",
                            flexRender(cell.column.columnDef.cell, cell.getContext()),
                            " (",
                            row.subRows.length,
                            ")"
                          ]
                        }
                      );
                    }
                    return flexRender(cell.column.columnDef.cell, cell.getContext());
                  })()
                },
                cell.id
              );
            })
          },
          row.id
        );
      }) })
    ] })
  ] });
}
function SelectBooksPicker({
  availableBookInfo,
  selectedBookIds,
  onChangeSelectedBookIds,
  localizedStrings,
  localizedBookNames,
  disabledSectionExplanations
}) {
  const booksSelectedText = localizedStrings["%webView_book_selector_books_selected%"];
  const selectBooksText = localizedStrings["%webView_book_selector_select_books%"];
  const searchBooksText = localizedStrings["%webView_book_selector_search_books%"];
  const selectAllText = localizedStrings["%webView_book_selector_select_all%"];
  const clearAllText = localizedStrings["%webView_book_selector_clear_all%"];
  const noBookFoundText = localizedStrings["%webView_book_selector_no_book_found%"];
  const { otLong, ntLong, dcLong, extraLong } = {
    otLong: localizedStrings == null ? void 0 : localizedStrings["%scripture_section_ot_long%"],
    ntLong: localizedStrings == null ? void 0 : localizedStrings["%scripture_section_nt_long%"],
    dcLong: localizedStrings == null ? void 0 : localizedStrings["%scripture_section_dc_long%"],
    extraLong: localizedStrings == null ? void 0 : localizedStrings["%scripture_section_extra_long%"]
  };
  const [isBooksSelectorOpen, setIsBooksSelectorOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const lastSelectedBookRef = useRef(void 0);
  const lastKeyEventShiftKey = useRef(false);
  const availableBookIds = useMemo(
    () => getAvailableBookIds(availableBookInfo),
    [availableBookInfo]
  );
  const filteredBooksBySection = useMemo(() => {
    if (!inputValue.trim()) {
      const allBooks = {
        [Section.OT]: [],
        [Section.NT]: [],
        [Section.DC]: [],
        [Section.Extra]: []
      };
      availableBookIds.forEach((bookId) => {
        const section = getSectionForBook(bookId);
        allBooks[section].push(bookId);
      });
      return allBooks;
    }
    const filteredBooks = availableBookIds.filter(
      (bookId) => doesBookMatchQuery(bookId, inputValue, localizedBookNames)
    );
    const matchingBooks = {
      [Section.OT]: [],
      [Section.NT]: [],
      [Section.DC]: [],
      [Section.Extra]: []
    };
    filteredBooks.forEach((bookId) => {
      const section = getSectionForBook(bookId);
      matchingBooks[section].push(bookId);
    });
    return matchingBooks;
  }, [availableBookIds, inputValue, localizedBookNames]);
  const toggleBook = useCallback(
    (bookId, shiftKey = false) => {
      if (!shiftKey || !lastSelectedBookRef.current) {
        onChangeSelectedBookIds(
          selectedBookIds.includes(bookId) ? selectedBookIds.filter((id) => id !== bookId) : [...selectedBookIds, bookId]
        );
        lastSelectedBookRef.current = bookId;
        return;
      }
      const lastIndex = availableBookIds.findIndex((id) => id === lastSelectedBookRef.current);
      const currentIndex = availableBookIds.findIndex((id) => id === bookId);
      if (lastIndex === -1 || currentIndex === -1) return;
      const [startIndex, endIndex] = [
        Math.min(lastIndex, currentIndex),
        Math.max(lastIndex, currentIndex)
      ];
      const booksInRange = availableBookIds.slice(startIndex, endIndex + 1).map((id) => id);
      onChangeSelectedBookIds(
        selectedBookIds.includes(bookId) ? selectedBookIds.filter((shortname) => !booksInRange.includes(shortname)) : [.../* @__PURE__ */ new Set([...selectedBookIds, ...booksInRange])]
      );
    },
    [selectedBookIds, onChangeSelectedBookIds, availableBookIds]
  );
  const handleKeyboardSelect = (bookId) => {
    toggleBook(bookId, lastKeyEventShiftKey.current);
    lastKeyEventShiftKey.current = false;
  };
  const handleMouseDown = (event, bookId) => {
    event.preventDefault();
    toggleBook(bookId, event.shiftKey);
  };
  const handleSelectAll = () => {
    onChangeSelectedBookIds(availableBookIds.map((bookId) => bookId));
  };
  const handleClearAll = () => {
    onChangeSelectedBookIds([]);
  };
  const missingSectionExplanations = useMemo(
    () => Object.values(Section).filter(
      (section) => (disabledSectionExplanations == null ? void 0 : disabledSectionExplanations[section]) !== void 0 && getBooksForSection(availableBookIds, section).length === 0
    ).map((section) => ({ section, explanation: disabledSectionExplanations == null ? void 0 : disabledSectionExplanations[section] })),
    [disabledSectionExplanations, availableBookIds]
  );
  return /* @__PURE__ */ jsxs(
    Popover,
    {
      open: isBooksSelectorOpen,
      onOpenChange: (open) => {
        setIsBooksSelectorOpen(open);
        if (!open) {
          setInputValue("");
        }
      },
      children: [
        /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "outline",
            role: "combobox",
            "aria-expanded": isBooksSelectorOpen,
            className: "tw:max-w-64 tw:justify-between",
            children: [
              selectedBookIds.length > 0 ? `${booksSelectedText}: ${selectedBookIds.length}` : selectBooksText,
              /* @__PURE__ */ jsx(ChevronsUpDown, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx(
          PopoverContent,
          {
            className: "tw:max-h-(--radix-popover-content-available-height) tw:w-[500px] tw:max-w-[calc(100vw-2rem)] tw:p-0",
            align: "start",
            collisionPadding: 8,
            children: /* @__PURE__ */ jsxs(
              Command,
              {
                className: "tw:min-h-0",
                shouldFilter: false,
                onKeyDown: (e) => {
                  if (e.key === "Enter") {
                    lastKeyEventShiftKey.current = e.shiftKey;
                  }
                },
                children: [
                  /* @__PURE__ */ jsx(
                    CommandInput,
                    {
                      className: "tw:shrink-0",
                      placeholder: searchBooksText,
                      value: inputValue,
                      onValueChange: setInputValue,
                      spaceSelectsHighlightedItem: true
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { className: "tw:flex tw:shrink-0 tw:justify-between tw:border-b tw:p-2", children: [
                    /* @__PURE__ */ jsx(
                      Button,
                      {
                        variant: "ghost",
                        size: "sm",
                        onClick: handleSelectAll,
                        disabled: availableBookIds.length === 0,
                        children: selectAllText
                      }
                    ),
                    /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", onClick: handleClearAll, children: clearAllText })
                  ] }),
                  /* @__PURE__ */ jsxs(CommandList, { className: "tw:max-h-72 tw:min-h-0 tw:flex-1", children: [
                    /* @__PURE__ */ jsx(CommandEmpty, { children: noBookFoundText }),
                    Object.values(Section).filter((section) => filteredBooksBySection[section].length > 0).map((section, index) => {
                      const sectionBooks = filteredBooksBySection[section];
                      return /* @__PURE__ */ jsxs(Fragment, { children: [
                        index > 0 && /* @__PURE__ */ jsx(CommandSeparator, { alwaysRender: true }),
                        /* @__PURE__ */ jsx(
                          CommandGroup,
                          {
                            heading: getSectionLongName(section, otLong, ntLong, dcLong, extraLong),
                            children: sectionBooks.map((bookId) => /* @__PURE__ */ jsx(
                              BookItem,
                              {
                                bookId,
                                isSelected: selectedBookIds.includes(bookId),
                                onSelect: () => handleKeyboardSelect(bookId),
                                onMouseDown: (event) => handleMouseDown(event, bookId),
                                section: getSectionForBook(bookId),
                                showCheck: true,
                                localizedBookNames,
                                commandValue: generateCommandValue(bookId, localizedBookNames),
                                className: "tw:flex tw:items-center"
                              },
                              bookId
                            ))
                          }
                        )
                      ] }, section);
                    })
                  ] }),
                  missingSectionExplanations.length > 0 && /* @__PURE__ */ jsx("div", { className: "tw:shrink-0 tw:border-t tw:p-2", children: missingSectionExplanations.map(({ section, explanation }) => /* @__PURE__ */ jsx("p", { className: "tw:text-xs tw:text-muted-foreground", children: explanation }, section)) })
                ]
              }
            )
          }
        )
      ]
    }
  );
}
function DisabledActionTooltip({
  disabled,
  tooltipText,
  children,
  className
}) {
  return /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [
    /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
      DisabledTooltipWrapper,
      {
        className,
        isDisabled: disabled,
        disabledExplanation: tooltipText,
        children
      }
    ) }),
    disabled && /* @__PURE__ */ jsx(TooltipContent, { children: /* @__PURE__ */ jsx("p", { className: "tw:max-w-xs tw:whitespace-pre-line", children: tooltipText }) })
  ] }) });
}
function SectionButton({
  section,
  availableBookIds,
  selectedBookIds,
  onToggle,
  localizedStrings,
  disabledExplanation
}) {
  const isDisabled = getBooksForSection(availableBookIds, section).length === 0;
  const sectionOtShortText = localizedStrings["%scripture_section_ot_short%"];
  const sectionNtShortText = localizedStrings["%scripture_section_nt_short%"];
  const sectionDcShortText = localizedStrings["%scripture_section_dc_short%"];
  const sectionExtraShortText = localizedStrings["%scripture_section_extra_short%"];
  const button = /* @__PURE__ */ jsx(
    Button,
    {
      variant: "outline",
      size: "sm",
      onClick: () => onToggle(section),
      className: cn(
        isSectionFullySelected(availableBookIds, section, selectedBookIds) && !isDisabled && "tw:bg-primary tw:text-primary-foreground tw:hover:bg-primary/70 tw:hover:text-primary-foreground"
      ),
      disabled: isDisabled,
      children: getSectionShortName(
        section,
        sectionOtShortText,
        sectionNtShortText,
        sectionDcShortText,
        sectionExtraShortText
      )
    }
  );
  if (!disabledExplanation) return button;
  return /* @__PURE__ */ jsx(
    DisabledActionTooltip,
    {
      className: "tw:flex",
      disabled: isDisabled,
      tooltipText: disabledExplanation,
      children: button
    }
  );
}
const VISIBLE_BADGES_COUNT = 5;
const MAX_VISIBLE_BADGES = 6;
function SelectBooks({
  availableBookInfo,
  selectedBookIds,
  onChangeSelectedBookIds,
  localizedStrings,
  localizedBookNames,
  disabledSectionExplanations
}) {
  const moreText = localizedStrings["%webView_book_selector_more%"];
  const availableBooksIds = useMemo(
    () => getAvailableBookIds(availableBookInfo),
    [availableBookInfo]
  );
  const toggleSection = useCallback(
    (section) => {
      const sectionBooks = getBooksForSection(availableBooksIds, section).map((bookId) => bookId);
      onChangeSelectedBookIds(
        isSectionFullySelected(availableBooksIds, section, selectedBookIds) ? selectedBookIds.filter((shortname) => !sectionBooks.includes(shortname)) : [.../* @__PURE__ */ new Set([...selectedBookIds, ...sectionBooks])]
      );
    },
    [selectedBookIds, onChangeSelectedBookIds, availableBooksIds]
  );
  return /* @__PURE__ */ jsxs("div", { className: "tw:space-y-2", children: [
    /* @__PURE__ */ jsx("div", { className: "tw:flex tw:flex-wrap tw:gap-2", children: Object.values(Section).map((section) => {
      return /* @__PURE__ */ jsx(
        SectionButton,
        {
          section,
          availableBookIds: availableBooksIds,
          selectedBookIds,
          onToggle: toggleSection,
          localizedStrings,
          disabledExplanation: disabledSectionExplanations == null ? void 0 : disabledSectionExplanations[section]
        },
        section
      );
    }) }),
    /* @__PURE__ */ jsx(
      SelectBooksPicker,
      {
        availableBookInfo,
        selectedBookIds,
        onChangeSelectedBookIds,
        localizedStrings,
        localizedBookNames,
        disabledSectionExplanations
      }
    ),
    selectedBookIds.length > 0 && /* @__PURE__ */ jsxs("div", { className: "tw:mt-2 tw:flex tw:flex-wrap tw:gap-1", children: [
      selectedBookIds.slice(
        0,
        selectedBookIds.length === MAX_VISIBLE_BADGES ? MAX_VISIBLE_BADGES : VISIBLE_BADGES_COUNT
      ).map((bookId) => /* @__PURE__ */ jsx(Badge, { className: "tw:hover:bg-secondary", variant: "secondary", children: getLocalizedBookName(bookId, localizedBookNames) }, bookId)),
      selectedBookIds.length > MAX_VISIBLE_BADGES && /* @__PURE__ */ jsx(
        Badge,
        {
          className: "tw:hover:bg-secondary",
          variant: "secondary",
          children: `+${selectedBookIds.length - VISIBLE_BADGES_COUNT} ${moreText}`
        }
      )
    ] })
  ] });
}
const SELECT_BOOKS_STRING_KEYS = Object.freeze([
  "%webView_book_selector_books_selected%",
  "%webView_book_selector_select_books%",
  "%webView_book_selector_search_books%",
  "%webView_book_selector_select_all%",
  "%webView_book_selector_clear_all%",
  "%webView_book_selector_no_book_found%",
  "%webView_book_selector_more%",
  "%scripture_section_ot_long%",
  "%scripture_section_ot_short%",
  "%scripture_section_nt_long%",
  "%scripture_section_nt_short%",
  "%scripture_section_dc_long%",
  "%scripture_section_dc_short%",
  "%scripture_section_extra_long%",
  "%scripture_section_extra_short%"
]);
const SCOPE_SELECTOR_STRING_KEYS = Object.freeze([
  "%webView_scope_selector_selected_text%",
  "%webView_scope_selector_verse%",
  "%webView_scope_selector_chapter%",
  "%webView_scope_selector_book%",
  "%webView_scope_selector_current_verse%",
  "%webView_scope_selector_current_chapter%",
  "%webView_scope_selector_current_book%",
  "%webView_scope_selector_choose_books%",
  "%webView_scope_selector_scope%",
  "%webView_scope_selector_select_books%",
  "%webView_scope_selector_range%",
  "%webView_scope_selector_select_range%",
  "%webView_scope_selector_range_start%",
  "%webView_scope_selector_range_end%",
  "%webView_scope_selector_ok%",
  "%webView_scope_selector_cancel%",
  "%webView_scope_selector_navigate%",
  // The ScopeSelector renders a SelectBooks component, so it also needs its
  // localized strings (these cover the former inline book_selector and
  // scripture_section keys).
  ...SELECT_BOOKS_STRING_KEYS
]);
const localizeString$1 = (strings, key) => {
  return strings[key] ?? key;
};
const RANGE_START_SUBMIT_KEYS = Object.freeze([" ", "-"]);
function ScopeSelector({
  scope,
  availableScopes,
  onScopeChange,
  availableBookInfo,
  selectedBookIds,
  onSelectedBookIdsChange,
  localizedStrings,
  localizedBookNames,
  disabledSectionExplanations,
  disabledScopeExplanations,
  id,
  variant = "radio",
  rangeStart,
  rangeEnd,
  onRangeStartChange,
  onRangeEndChange,
  currentScrRef,
  onCurrentScrRefChange,
  bookChapterControlLocalizedStrings,
  getEndVerse,
  hideLabel = false,
  buttonClassName
}) {
  const selectedTextText = localizeString$1(
    localizedStrings,
    "%webView_scope_selector_selected_text%"
  );
  const verseText = localizeString$1(localizedStrings, "%webView_scope_selector_verse%");
  const chapterText = localizeString$1(localizedStrings, "%webView_scope_selector_chapter%");
  const bookText = localizeString$1(localizedStrings, "%webView_scope_selector_book%");
  const currentVerseText = localizeString$1(
    localizedStrings,
    "%webView_scope_selector_current_verse%"
  );
  const currentChapterText = localizeString$1(
    localizedStrings,
    "%webView_scope_selector_current_chapter%"
  );
  const currentBookText = localizeString$1(localizedStrings, "%webView_scope_selector_current_book%");
  const chooseBooksText = localizeString$1(localizedStrings, "%webView_scope_selector_choose_books%");
  const scopeText = localizeString$1(localizedStrings, "%webView_scope_selector_scope%");
  const selectBooksText = localizeString$1(localizedStrings, "%webView_scope_selector_select_books%");
  const rangeText = localizeString$1(localizedStrings, "%webView_scope_selector_range%");
  const selectRangeText = localizeString$1(localizedStrings, "%webView_scope_selector_select_range%");
  const rangeStartText = localizeString$1(localizedStrings, "%webView_scope_selector_range_start%");
  const rangeEndText = localizeString$1(localizedStrings, "%webView_scope_selector_range_end%");
  const okText = localizeString$1(localizedStrings, "%webView_scope_selector_ok%");
  const cancelText = localizeString$1(localizedStrings, "%webView_scope_selector_cancel%");
  const navigateText = localizeString$1(localizedStrings, "%webView_scope_selector_navigate%");
  const getScrRefSuffix = (scopeValue) => {
    if (!currentScrRef) return void 0;
    const upperBook = currentScrRef.book.toUpperCase();
    switch (scopeValue) {
      case "verse":
        return formatScrRef(currentScrRef, "id");
      case "chapter":
        return `${upperBook} ${currentScrRef.chapterNum}`;
      case "book":
        return upperBook;
      default:
        return void 0;
    }
  };
  const SCOPE_OPTIONS = [
    { value: "selectedText", label: selectedTextText, id: "scope-selected-text" },
    {
      value: "verse",
      label: verseText,
      dropdownLabel: currentVerseText,
      scrRefSuffix: getScrRefSuffix("verse"),
      id: "scope-verse"
    },
    {
      value: "chapter",
      label: chapterText,
      dropdownLabel: currentChapterText,
      scrRefSuffix: getScrRefSuffix("chapter"),
      id: "scope-chapter"
    },
    {
      value: "book",
      label: bookText,
      dropdownLabel: currentBookText,
      scrRefSuffix: getScrRefSuffix("book"),
      id: "scope-book"
    },
    { value: "selectedBooks", label: chooseBooksText, id: "scope-selected" },
    { value: "range", label: rangeText, id: "scope-range" }
  ];
  const renderScopeLabel = (label, scrRefSuffix, hideScrRef = false) => /* @__PURE__ */ jsxs(Fragment$1, { children: [
    label,
    scrRefSuffix && !hideScrRef && /* @__PURE__ */ jsxs("span", { className: "tw:text-muted-foreground", children: [
      ": ",
      scrRefSuffix
    ] })
  ] });
  const displayedScopes = availableScopes ? SCOPE_OPTIONS.filter((option) => availableScopes.includes(option.value)) : SCOPE_OPTIONS;
  const fallbackScrRef = currentScrRef ?? defaultScrRef;
  const resolvedRangeStart = rangeStart ?? fallbackScrRef;
  const resolvedRangeEnd = rangeEnd ?? fallbackScrRef;
  const noopScrRefChange = () => {
  };
  const rangeEndWrapperRef = useRef(null);
  const navBcvWrapperRef = useRef(null);
  const navBcvPointerActivatedRef = useRef(false);
  const navMenuItemRef = useRef(null);
  const isNavBcvOpenRef = useRef(false);
  const [activeRangeBcv, setActiveRangeBcv] = useState(void 0);
  const pendingAdvanceToEndRef = useRef(false);
  const pendingAdvanceToOkRef = useRef(false);
  const rangeOkButtonRef = useRef(null);
  const handleRangeStartOpenChange = useCallback((open) => {
    if (open) {
      setActiveRangeBcv("start");
      pendingAdvanceToEndRef.current = false;
      return;
    }
    setActiveRangeBcv((prev) => prev === "start" ? void 0 : prev);
    if (pendingAdvanceToEndRef.current) {
      pendingAdvanceToEndRef.current = false;
      requestAnimationFrame(() => {
        var _a;
        const endTrigger = (_a = rangeEndWrapperRef.current) == null ? void 0 : _a.querySelector("button");
        endTrigger == null ? void 0 : endTrigger.click();
      });
    }
  }, []);
  const handleRangeEndOpenChange = useCallback((open) => {
    if (open) {
      setActiveRangeBcv("end");
      pendingAdvanceToOkRef.current = false;
      return;
    }
    setActiveRangeBcv((prev) => prev === "end" ? void 0 : prev);
  }, []);
  const handleRangeStartChange = useCallback(
    (newStart) => {
      onRangeStartChange == null ? void 0 : onRangeStartChange(newStart);
      onRangeEndChange == null ? void 0 : onRangeEndChange(newStart);
      pendingAdvanceToEndRef.current = true;
    },
    [onRangeStartChange, onRangeEndChange]
  );
  const handleRangeEndChangeWrapper = useCallback(
    (newEnd) => {
      onRangeEndChange == null ? void 0 : onRangeEndChange(newEnd);
      pendingAdvanceToOkRef.current = true;
    },
    [onRangeEndChange]
  );
  const handleScopeChange = useCallback(
    (newScope) => {
      onScopeChange(newScope);
      if (newScope === "selectedBooks" && selectedBookIds.length === 0 && (currentScrRef == null ? void 0 : currentScrRef.book)) {
        onSelectedBookIdsChange([currentScrRef.book]);
      }
    },
    [onScopeChange, selectedBookIds, currentScrRef, onSelectedBookIdsChange]
  );
  const currentScopeOption = displayedScopes.find((option) => option.value === scope);
  const renderTriggerContent = () => {
    if (scope === "selectedBooks" && selectedBookIds.length > 0) {
      return selectedBookIds.map((bookId) => bookId.toUpperCase()).join(", ");
    }
    if (scope === "range") {
      return formatScrRefRange(resolvedRangeStart, resolvedRangeEnd, {
        optionOrLocalizedBookName: "id",
        endRefOptionOrLocalizedBookName: "id",
        repeatBookName: true
      });
    }
    if (currentScopeOption) {
      return renderScopeLabel(currentScopeOption.label, currentScopeOption.scrRefSuffix);
    }
    return scope;
  };
  const simpleScopes = displayedScopes.filter(
    (option) => option.value !== "selectedBooks" && option.value !== "range"
  );
  const selectedBooksScope = displayedScopes.find((option) => option.value === "selectedBooks");
  const rangeScope = displayedScopes.find((option) => option.value === "range");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dialogSub, setDialogSub] = useState(void 0);
  const [draftScope, setDraftScope] = useState(void 0);
  const [draftRangeStart, setDraftRangeStart] = useState(void 0);
  const [draftRangeEnd, setDraftRangeEnd] = useState(void 0);
  const [draftSelectedBookIds, setDraftSelectedBookIds] = useState([]);
  const isInBooksDialog = variant === "dropdown" && dialogSub === "selectedBooks";
  const bookSelectorBlock = /* @__PURE__ */ jsx(
    SelectBooks,
    {
      availableBookInfo,
      selectedBookIds: isInBooksDialog ? draftSelectedBookIds : selectedBookIds,
      onChangeSelectedBookIds: isInBooksDialog ? setDraftSelectedBookIds : onSelectedBookIdsChange,
      localizedStrings,
      localizedBookNames,
      disabledSectionExplanations
    }
  );
  const startMuted = activeRangeBcv === "end";
  const endMuted = activeRangeBcv === "start";
  const mutedClass = "tw:text-muted-foreground";
  const isInRangeDialog = variant === "dropdown" && dialogSub === "range";
  const rangeStartSubmit = isInRangeDialog ? setDraftRangeStart : handleRangeStartChange;
  const eagerRangeEndSubmit = onRangeEndChange ? handleRangeEndChangeWrapper : noopScrRefChange;
  const rangeEndSubmit = isInRangeDialog ? setDraftRangeEnd : eagerRangeEndSubmit;
  const rangeBlock = /* @__PURE__ */ jsxs("div", { className: "tw:flex tw:flex-wrap tw:items-end tw:gap-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ jsx(Label, { htmlFor: "scope-range-start", className: cn(startMuted && mutedClass), children: rangeStartText }),
      /* @__PURE__ */ jsx(
        BookChapterControl,
        {
          id: "scope-range-start",
          scrRef: isInRangeDialog ? draftRangeStart ?? resolvedRangeStart : resolvedRangeStart,
          handleSubmit: rangeStartSubmit,
          localizedBookNames,
          localizedStrings: bookChapterControlLocalizedStrings,
          getEndVerse,
          submitKeys: RANGE_START_SUBMIT_KEYS,
          onOpenChange: handleRangeStartOpenChange,
          className: cn(startMuted && mutedClass),
          modal: true
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { ref: rangeEndWrapperRef, className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ jsx(Label, { htmlFor: "scope-range-end", className: cn(endMuted && mutedClass), children: rangeEndText }),
      /* @__PURE__ */ jsx(
        BookChapterControl,
        {
          id: "scope-range-end",
          scrRef: isInRangeDialog ? draftRangeEnd ?? resolvedRangeEnd : resolvedRangeEnd,
          handleSubmit: rangeEndSubmit,
          localizedBookNames,
          localizedStrings: bookChapterControlLocalizedStrings,
          getEndVerse,
          disableReferencesUpTo: isInRangeDialog ? draftRangeStart ?? resolvedRangeStart : resolvedRangeStart,
          onOpenChange: handleRangeEndOpenChange,
          onCloseAutoFocus: (event) => {
            var _a;
            if (pendingAdvanceToOkRef.current) {
              pendingAdvanceToOkRef.current = false;
              event.preventDefault();
              (_a = rangeOkButtonRef.current) == null ? void 0 : _a.focus();
            }
          },
          className: cn(endMuted && mutedClass),
          modal: true,
          align: "start"
        }
      )
    ] })
  ] });
  const scopeItemRefs = useRef({});
  const assignScopeItemRef = useCallback(
    (targetScope) => (node) => {
      scopeItemRefs.current[targetScope] = node;
    },
    []
  );
  const outerTriggerRef = useRef(null);
  useEffect(() => {
    if (!isDropdownOpen) return void 0;
    let secondRaf = 0;
    const firstRaf = requestAnimationFrame(() => {
      secondRaf = requestAnimationFrame(() => {
        var _a;
        (_a = scopeItemRefs.current[scope]) == null ? void 0 : _a.focus();
      });
    });
    return () => {
      cancelAnimationFrame(firstRaf);
      if (secondRaf) cancelAnimationFrame(secondRaf);
    };
  }, [isDropdownOpen, scope]);
  const [rangeDialogEl, setRangeDialogEl] = useState(null);
  const [booksDialogEl, setBooksDialogEl] = useState(null);
  const [dropdownContentEl, setDropdownContentEl] = useState(null);
  const DROPDOWN_NARROW_THRESHOLD_PX = 200;
  const [isDropdownNarrow, setIsDropdownNarrow] = useState(false);
  useEffect(() => {
    if (!dropdownContentEl || typeof ResizeObserver === "undefined") return void 0;
    const observer = new ResizeObserver(([entry]) => {
      setIsDropdownNarrow(entry.contentRect.width < DROPDOWN_NARROW_THRESHOLD_PX);
    });
    observer.observe(dropdownContentEl);
    return () => observer.disconnect();
  }, [dropdownContentEl]);
  const openDialogFallback = useCallback(
    (targetScope) => {
      setDraftScope(targetScope);
      setDraftRangeStart(resolvedRangeStart);
      setDraftRangeEnd(resolvedRangeEnd);
      setDraftSelectedBookIds(selectedBookIds);
      setIsDropdownOpen(false);
      setDialogSub(targetScope);
    },
    [resolvedRangeStart, resolvedRangeEnd, selectedBookIds]
  );
  const commitDialog = useCallback(() => {
    if (draftScope === void 0) return;
    if (draftScope === "range") {
      if (draftRangeStart) onRangeStartChange == null ? void 0 : onRangeStartChange(draftRangeStart);
      if (draftRangeEnd) onRangeEndChange == null ? void 0 : onRangeEndChange(draftRangeEnd);
    } else if (draftScope === "selectedBooks") {
      onSelectedBookIdsChange(draftSelectedBookIds);
    }
    handleScopeChange(draftScope);
    setDialogSub(void 0);
    setDraftScope(void 0);
  }, [
    draftScope,
    draftRangeStart,
    draftRangeEnd,
    draftSelectedBookIds,
    onRangeStartChange,
    onRangeEndChange,
    onSelectedBookIdsChange,
    handleScopeChange
  ]);
  const handleDialogOpenChange = useCallback((open) => {
    if (!open) {
      setDialogSub(void 0);
      setDraftScope(void 0);
    }
  }, []);
  const handleDialogCloseAutoFocus = useCallback((event) => {
    var _a;
    event.preventDefault();
    (_a = outerTriggerRef.current) == null ? void 0 : _a.focus();
  }, []);
  const renderDialogLauncherCheck = (launcherScope) => scope === launcherScope ? /* @__PURE__ */ jsx("span", { className: "tw:absolute tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center tw:ltr:left-2 tw:rtl:right-2", children: /* @__PURE__ */ jsx(Check, { className: "tw:h-4 tw:w-4" }) }) : void 0;
  return /* @__PURE__ */ jsxs("div", { id, className: "tw:grid tw:gap-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "tw:grid tw:gap-2", children: [
      !hideLabel && /* @__PURE__ */ jsx(Label, { children: scopeText }),
      variant === "dropdown" ? /* @__PURE__ */ jsxs(DropdownMenu, { open: isDropdownOpen, onOpenChange: setIsDropdownOpen, children: [
        /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
          Button,
          {
            ref: outerTriggerRef,
            variant: "outline",
            role: "combobox",
            className: cn(
              "tw:w-full tw:justify-between tw:overflow-hidden tw:font-normal",
              buttonClassName
            ),
            children: [
              /* @__PURE__ */ jsx("span", { className: "tw:min-w-0 tw:flex-1 tw:truncate tw:text-start", children: renderTriggerContent() }),
              /* @__PURE__ */ jsx(ChevronDown, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx(
          DropdownMenuContent,
          {
            ref: setDropdownContentEl,
            className: "tw:w-[var(--radix-dropdown-menu-trigger-width)] tw:min-w-[12rem]",
            align: "start",
            children: /* @__PURE__ */ jsxs(PopoverPortalContainerProvider, { container: dropdownContentEl, children: [
              simpleScopes.map(({ value, label, dropdownLabel, scrRefSuffix, id: scopeId }) => {
                const disabledExplanation = disabledScopeExplanations == null ? void 0 : disabledScopeExplanations[value];
                return /* @__PURE__ */ jsxs(
                  DropdownMenuItem,
                  {
                    ref: assignScopeItemRef(value),
                    disabled: !!disabledExplanation,
                    className: "tw:relative tw:ps-8 data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground",
                    onSelect: () => handleScopeChange(value),
                    "data-selected": scope === value ? "true" : void 0,
                    children: [
                      scope === value && /* @__PURE__ */ jsx("span", { className: "tw:absolute tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center tw:ltr:left-2 tw:rtl:right-2", children: /* @__PURE__ */ jsx(Check, { className: "tw:h-4 tw:w-4" }) }),
                      /* @__PURE__ */ jsxs("span", { className: "tw:flex tw:min-w-0 tw:flex-col tw:gap-0.5", children: [
                        /* @__PURE__ */ jsx("span", { className: "tw:flex tw:items-center tw:gap-1.5", children: renderScopeLabel(dropdownLabel ?? label, scrRefSuffix, isDropdownNarrow) }),
                        disabledExplanation && /* @__PURE__ */ jsx("span", { className: "tw:text-xs tw:whitespace-normal tw:text-foreground", children: disabledExplanation })
                      ] })
                    ]
                  },
                  scopeId
                );
              }),
              (selectedBooksScope || rangeScope) && /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
              selectedBooksScope && /* @__PURE__ */ jsxs(
                DropdownMenuItem,
                {
                  ref: assignScopeItemRef("selectedBooks"),
                  className: cn(
                    "tw:relative tw:ps-8",
                    "data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground"
                  ),
                  onSelect: () => openDialogFallback("selectedBooks"),
                  "data-selected": scope === "selectedBooks" ? "true" : void 0,
                  children: [
                    renderDialogLauncherCheck("selectedBooks"),
                    `${selectedBooksScope.label}…`
                  ]
                }
              ),
              rangeScope && /* @__PURE__ */ jsxs(
                DropdownMenuItem,
                {
                  ref: assignScopeItemRef("range"),
                  className: cn(
                    "tw:relative tw:ps-8",
                    "data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground"
                  ),
                  onSelect: () => openDialogFallback("range"),
                  "data-selected": scope === "range" ? "true" : void 0,
                  children: [
                    renderDialogLauncherCheck("range"),
                    `${rangeScope.label}…`
                  ]
                }
              ),
              onCurrentScrRefChange && /* @__PURE__ */ jsxs(Fragment$1, { children: [
                /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
                /* @__PURE__ */ jsx(DropdownMenuLabel, { className: "tw:px-2 tw:py-1.5 tw:text-xs tw:font-medium tw:text-muted-foreground", children: navigateText }),
                /* @__PURE__ */ jsx(
                  DropdownMenuItem,
                  {
                    ref: navMenuItemRef,
                    className: "tw:p-0",
                    onSelect: (event) => {
                      var _a, _b;
                      event.preventDefault();
                      if (navBcvPointerActivatedRef.current) {
                        navBcvPointerActivatedRef.current = false;
                        return;
                      }
                      if (isNavBcvOpenRef.current) return;
                      (_b = (_a = navBcvWrapperRef.current) == null ? void 0 : _a.querySelector("button")) == null ? void 0 : _b.click();
                    },
                    children: /* @__PURE__ */ jsx(
                      "div",
                      {
                        ref: navBcvWrapperRef,
                        className: "tw:w-full tw:px-1 tw:pb-1",
                        onPointerDownCapture: (e) => {
                          const target = e.target instanceof HTMLElement ? e.target : void 0;
                          if (!(target == null ? void 0 : target.closest("button"))) return;
                          navBcvPointerActivatedRef.current = true;
                          requestAnimationFrame(() => {
                            navBcvPointerActivatedRef.current = false;
                          });
                        },
                        children: /* @__PURE__ */ jsx(
                          BookChapterControl,
                          {
                            id: "scope-navigate",
                            scrRef: currentScrRef ?? defaultScrRef,
                            handleSubmit: onCurrentScrRefChange,
                            localizedBookNames,
                            localizedStrings: bookChapterControlLocalizedStrings,
                            getEndVerse,
                            triggerVariant: "ghost",
                            onOpenChange: (open) => {
                              isNavBcvOpenRef.current = open;
                            },
                            onCloseAutoFocus: (event) => {
                              event.preventDefault();
                              focusUnlessSuppressed(() => {
                                var _a;
                                return (_a = navMenuItemRef.current) == null ? void 0 : _a.focus();
                              });
                            },
                            modal: true,
                            className: "tw:w-full tw:min-w-0 tw:max-w-none tw:justify-between tw:px-2 tw:font-normal",
                            triggerContent: /* @__PURE__ */ jsxs(Fragment$1, { children: [
                              /* @__PURE__ */ jsx("span", { className: "tw:min-w-0 tw:flex-1 tw:truncate tw:text-start", children: formatScrRef(currentScrRef ?? defaultScrRef, "id") }),
                              /* @__PURE__ */ jsx(ChevronDown, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
                            ] })
                          }
                        )
                      }
                    )
                  }
                )
              ] })
            ] })
          }
        )
      ] }) : /* @__PURE__ */ jsx(
        RadioGroup,
        {
          value: scope,
          onValueChange: handleScopeChange,
          className: "tw:flex tw:flex-col tw:space-y-1",
          children: displayedScopes.map(({ value, label, scrRefSuffix, id: scopeId }) => {
            const disabledExplanation = disabledScopeExplanations == null ? void 0 : disabledScopeExplanations[value];
            return /* @__PURE__ */ jsxs("div", { className: "tw:flex tw:flex-col tw:gap-0.5", children: [
              /* @__PURE__ */ jsxs("div", { className: "tw:flex tw:items-center", children: [
                /* @__PURE__ */ jsx(
                  RadioGroupItem,
                  {
                    className: "tw:me-2",
                    value,
                    id: scopeId,
                    disabled: !!disabledExplanation,
                    "aria-describedby": disabledExplanation ? `${scopeId}-explanation` : void 0
                  }
                ),
                /* @__PURE__ */ jsx(Label, { htmlFor: scopeId, children: renderScopeLabel(label, scrRefSuffix) })
              ] }),
              disabledExplanation && // Indented to clear the radio so it reads as belonging to this row's label.
              /* @__PURE__ */ jsx(
                "span",
                {
                  id: `${scopeId}-explanation`,
                  className: "tw:ms-6 tw:text-xs tw:whitespace-normal tw:text-muted-foreground",
                  children: disabledExplanation
                }
              )
            ] }, scopeId);
          })
        }
      )
    ] }),
    variant === "radio" && scope === "selectedBooks" && /* @__PURE__ */ jsxs("div", { className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ jsx(Label, { children: selectBooksText }),
      bookSelectorBlock
    ] }),
    variant === "radio" && scope === "range" && rangeBlock,
    variant === "dropdown" && selectedBooksScope && /* @__PURE__ */ jsx(Dialog, { open: dialogSub === "selectedBooks", onOpenChange: handleDialogOpenChange, children: /* @__PURE__ */ jsx(
      DialogContent,
      {
        ref: setBooksDialogEl,
        onCloseAutoFocus: handleDialogCloseAutoFocus,
        onEscapeKeyDown: (event) => {
          if (booksDialogEl == null ? void 0 : booksDialogEl.querySelector('[data-state="open"]')) {
            event.preventDefault();
          }
        },
        children: /* @__PURE__ */ jsxs(PopoverPortalContainerProvider, { container: booksDialogEl, children: [
          /* @__PURE__ */ jsx(DialogHeader, { className: "tw:pe-8", children: /* @__PURE__ */ jsx(DialogTitle, { children: chooseBooksText }) }),
          bookSelectorBlock,
          /* @__PURE__ */ jsxs(DialogFooter, { children: [
            /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => handleDialogOpenChange(false), children: cancelText }),
            /* @__PURE__ */ jsx(Button, { onClick: commitDialog, children: okText })
          ] })
        ] })
      }
    ) }),
    variant === "dropdown" && rangeScope && /* @__PURE__ */ jsx(Dialog, { open: dialogSub === "range", onOpenChange: handleDialogOpenChange, children: /* @__PURE__ */ jsx(
      DialogContent,
      {
        ref: setRangeDialogEl,
        onCloseAutoFocus: handleDialogCloseAutoFocus,
        onEscapeKeyDown: (event) => {
          if (rangeDialogEl == null ? void 0 : rangeDialogEl.querySelector('[data-state="open"]')) {
            event.preventDefault();
          }
        },
        children: /* @__PURE__ */ jsxs(PopoverPortalContainerProvider, { container: rangeDialogEl, children: [
          /* @__PURE__ */ jsx(DialogHeader, { className: "tw:pe-8", children: /* @__PURE__ */ jsx(DialogTitle, { children: selectRangeText }) }),
          rangeBlock,
          /* @__PURE__ */ jsxs(DialogFooter, { children: [
            /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => handleDialogOpenChange(false), children: cancelText }),
            /* @__PURE__ */ jsx(Button, { ref: rangeOkButtonRef, onClick: commitDialog, children: okText })
          ] })
        ] })
      }
    ) })
  ] });
}
function ScrollGroupSelector({
  availableScrollGroupIds,
  scrollGroupId,
  onChangeScrollGroupId,
  localizedStrings = {},
  size = "sm",
  className,
  id,
  disabled
}) {
  const localizedStringsDefaulted = {
    ...DEFAULT_SCROLL_GROUP_LOCALIZED_STRINGS,
    ...Object.fromEntries(
      Object.entries(localizedStrings).map(
        ([localizedStringKey, localizedStringValue]) => [
          localizedStringKey,
          localizedStringKey === localizedStringValue && localizedStringKey in DEFAULT_SCROLL_GROUP_LOCALIZED_STRINGS ? DEFAULT_SCROLL_GROUP_LOCALIZED_STRINGS[localizedStringKey] : localizedStringValue
        ]
      )
    )
  };
  const dir = readDirection();
  return /* @__PURE__ */ jsxs(
    Select,
    {
      value: `${scrollGroupId}`,
      onValueChange: (newScrollGroupString) => onChangeScrollGroupId(
        newScrollGroupString === "undefined" ? void 0 : parseInt(newScrollGroupString, 10)
      ),
      disabled,
      children: [
        /* @__PURE__ */ jsx(SelectTrigger, { size, className: cn("pr-twp tw:w-auto", className), children: /* @__PURE__ */ jsx(
          SelectValue,
          {
            placeholder: localizedStringsDefaulted[getLocalizeKeyForScrollGroupId(scrollGroupId)] ?? scrollGroupId
          }
        ) }),
        /* @__PURE__ */ jsx(
          SelectContent,
          {
            id,
            align: dir === "rtl" ? "end" : "start",
            style: { zIndex: Z_INDEX_ABOVE_DOCK },
            children: availableScrollGroupIds.map((scrollGroupOptionId) => /* @__PURE__ */ jsx(SelectItem, { value: `${scrollGroupOptionId}`, children: localizedStringsDefaulted[getLocalizeKeyForScrollGroupId(scrollGroupOptionId)] }, `${scrollGroupOptionId}`))
          }
        )
      ]
    }
  );
}
function SettingsList({ children }) {
  return /* @__PURE__ */ jsx("div", { className: "pr-twp tw:grid", children });
}
function SettingsListItem({
  primary,
  secondary,
  children,
  isLoading = false,
  loadingMessage
}) {
  return /* @__PURE__ */ jsxs("div", { className: "tw:flex tw:items-center tw:justify-between tw:space-x-4 tw:py-2", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "tw:text-sm tw:font-medium tw:leading-none", children: primary }),
      /* @__PURE__ */ jsx("p", { className: "tw:whitespace-normal tw:break-words tw:text-sm tw:text-muted-foreground", children: secondary })
    ] }),
    isLoading ? /* @__PURE__ */ jsx("p", { className: "tw:text-sm tw:text-muted-foreground", children: loadingMessage }) : /* @__PURE__ */ jsx("div", { children })
  ] });
}
function SettingsListHeader({
  primary,
  secondary,
  includeSeparator = false
}) {
  return /* @__PURE__ */ jsxs("div", { className: "tw:space-y-4 tw:py-2", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h3", { className: "tw:text-lg tw:font-medium", children: primary }),
      /* @__PURE__ */ jsx("p", { className: "tw:text-sm tw:text-muted-foreground", children: secondary })
    ] }),
    includeSeparator ? /* @__PURE__ */ jsx(Separator, {}) : ""
  ] });
}
function MenuItemIcon({ icon, iconName, menuLabel, leading, leadingSlot }) {
  const spacing = leading ? "tw:me-2" : "tw:ms-2";
  if (isLucideIconName(iconName)) return /* @__PURE__ */ jsx(LucideIcon, { name: iconName, className: spacing });
  if (!icon && leading && leadingSlot === "icon") {
    return /* @__PURE__ */ jsx(
      "span",
      {
        "aria-hidden": "true",
        "data-slot": "menu-icon-spacer",
        className: cn("tw:inline-block tw:w-4 tw:shrink-0", spacing)
      }
    );
  }
  if (!icon) return void 0;
  const alt = `${leading ? "Leading" : "Trailing"} icon for ${menuLabel}`;
  if (leading)
    return /* @__PURE__ */ jsx(
      "span",
      {
        "data-slot": "menu-icon-image-box",
        className: cn(
          "tw:inline-flex tw:w-4 tw:shrink-0 tw:items-center tw:justify-center",
          spacing
        ),
        children: /* @__PURE__ */ jsx("img", { className: "tw:max-h-4 tw:max-w-4", src: icon, alt })
      }
    );
  return /* @__PURE__ */ jsx("img", { className: cn("tw:max-h-4 tw:max-w-4", spacing), src: icon, alt });
}
const createDropdownSeparator = (groupKey) => /* @__PURE__ */ jsx(DropdownMenuSeparator, {}, `separator-${groupKey}`);
const withoutCheckedState = (item) => ({ ...item, checked: void 0 });
const getGroupContent = (groups, onSelectMenuItem, leadingSlot) => groups.map(({ groupKey, items }) => ({
  groupKey,
  items: items.map(({ item, subGroups = [] }) => {
    if ("command" in item) {
      const itemContent = /* @__PURE__ */ jsxs(Fragment$1, { children: [
        /* @__PURE__ */ jsx(
          MenuItemIcon,
          {
            iconName: item.iconNameBefore,
            icon: item.iconPathBefore,
            menuLabel: item.label,
            leading: true,
            leadingSlot
          }
        ),
        item.label,
        /* @__PURE__ */ jsx(
          MenuItemIcon,
          {
            iconName: item.iconNameAfter,
            icon: item.iconPathAfter,
            menuLabel: item.label
          }
        ),
        item.shortcut && /* @__PURE__ */ jsx(DropdownMenuShortcut, { className: "tw:ps-4", children: /* @__PURE__ */ jsx(ShortcutKeys, { hint: item.shortcut }) })
      ] });
      const handleSelect = () => {
        onSelectMenuItem(item);
      };
      return /* @__PURE__ */ jsxs(Tooltip, { children: [
        /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: item.checked !== void 0 ? /* @__PURE__ */ jsx(
          DropdownMenuCheckboxItem,
          {
            checked: item.checked,
            disabled: item.disabled,
            onSelect: handleSelect,
            children: itemContent
          },
          `dropdown-menu-item-${item.label}-${item.command}`
        ) : /* @__PURE__ */ jsx(
          DropdownMenuItem,
          {
            disabled: item.disabled,
            onSelect: handleSelect,
            children: itemContent
          },
          `dropdown-menu-item-${item.label}-${item.command}`
        ) }),
        item.tooltip && /* @__PURE__ */ jsx(TooltipContent, { children: item.tooltip })
      ] }, `tooltip-${item.label}-${item.command}`);
    }
    const subTrigger = /* @__PURE__ */ jsxs(DropdownMenuSubTrigger, { disabled: item.disabled, children: [
      /* @__PURE__ */ jsx(
        MenuItemIcon,
        {
          iconName: item.iconNameBefore,
          menuLabel: item.label,
          leading: true,
          leadingSlot
        }
      ),
      item.label,
      /* @__PURE__ */ jsx(MenuItemIcon, { iconName: item.iconNameAfter, menuLabel: item.label })
    ] });
    return /* @__PURE__ */ jsxs(DropdownMenuSub, { children: [
      item.tooltip ? /* @__PURE__ */ jsxs(Tooltip, { children: [
        /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: subTrigger }),
        /* @__PURE__ */ jsx(TooltipContent, { children: item.tooltip })
      ] }) : subTrigger,
      /* @__PURE__ */ jsx(DropdownMenuPortal, { children: /* @__PURE__ */ jsx(DropdownMenuSubContent, { children: joinGroupsWithSeparators(
        getGroupContent(
          subGroups,
          onSelectMenuItem,
          getLeadingIconSlot(
            subGroups.flatMap(
              (group) => group.items.map(({ item: subItem }) => withoutCheckedState(subItem))
            )
          )
        ),
        createDropdownSeparator
      ) }) })
    ] }, `dropdown-menu-sub-${item.label}-${item.id}`);
  })
}));
function TabDropdownMenu({
  onSelectMenuItem,
  menuData,
  tabLabel,
  icon,
  className,
  showSectionHeadings = false,
  variant,
  buttonVariant = "ghost",
  id
}) {
  const headingIdPrefix = useId();
  const menuTree = useMemo(() => buildMenuTree(menuData), [menuData]);
  const sections = getMenuSectionsWithItems(menuData);
  const showHeadings = showSectionHeadings && sections.length > 1;
  const groupsByColumn = new Map(
    menuTree.columns.map(({ columnKey, groups }) => [columnKey, groups])
  );
  const groupsOfSection = (columnKey) => groupsByColumn.get(columnKey) ?? [];
  const leadingSlot = getLeadingIconSlot(
    sections.flatMap(
      ({ columnKey }) => groupsOfSection(columnKey).flatMap(
        (group) => group.items.map(({ item }) => withoutCheckedState(item))
      )
    )
  );
  useInteractionModality();
  const triggerRef = useRef(null);
  const restoreFocusRing = () => showFocusRing(triggerRef.current ?? void 0);
  return /* @__PURE__ */ jsxs(DropdownMenu, { variant, children: [
    /* @__PURE__ */ jsx(DropdownMenuTrigger, { "aria-label": tabLabel, className, asChild: true, id, children: /* @__PURE__ */ jsx(
      Button,
      {
        ref: triggerRef,
        variant: buttonVariant,
        size: "icon",
        className: QUIET_FOCUS_RING_SUPPRESSION,
        onKeyDown: restoreFocusRing,
        onBlur: restoreFocusRing,
        children: icon ?? /* @__PURE__ */ jsx(MenuIcon, {})
      }
    ) }),
    /* @__PURE__ */ jsx(
      DropdownMenuContent,
      {
        align: "start",
        style: { zIndex: Z_INDEX_ABOVE_DOCK },
        onCloseAutoFocus: () => {
          if (getLastInteractionModality() === "pointer")
            hideFocusRing(triggerRef.current ?? void 0);
        },
        children: sections.map(({ columnKey, label, isHeaderHidden }, index) => {
          const headingId = `${headingIdPrefix}-${columnKey}`;
          return /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs(DropdownMenuGroup, { "aria-labelledby": showHeadings ? headingId : void 0, children: [
              showHeadings && // A section shown without its heading keeps it for assistive technology only
              /* @__PURE__ */ jsx(
                DropdownMenuLabel,
                {
                  id: headingId,
                  className: isHeaderHidden ? "tw:sr-only" : void 0,
                  children: label
                }
              ),
              /* @__PURE__ */ jsx(TooltipProvider, { children: getGroupContent(
                groupsOfSection(columnKey),
                onSelectMenuItem,
                leadingSlot
              ).flatMap((group) => group.items) })
            ] }),
            index < sections.length - 1 && /* @__PURE__ */ jsx(DropdownMenuSeparator, {})
          ] }, columnKey);
        })
      }
    )
  ] });
}
const SHRINK_STEP_HYSTERESIS_PX = 8;
function getShrinkStep(width, thresholds, previousStep) {
  const matchedIndex = thresholds.findIndex((threshold) => width >= threshold);
  const nextStep = matchedIndex === -1 ? thresholds.length : matchedIndex;
  if (previousStep === void 0) return nextStep;
  if (nextStep >= previousStep) return nextStep;
  const relaxedStep = thresholds.findIndex(
    (threshold) => width >= threshold + SHRINK_STEP_HYSTERESIS_PX
  );
  if (relaxedStep === -1) return previousStep;
  return Math.min(previousStep, relaxedStep);
}
function useShrinkStep(element, thresholds) {
  const [step, setStep] = useState(0);
  const previousWidthRef = useRef(void 0);
  useLayoutEffect(() => {
    if (!element || typeof ResizeObserver === "undefined") return void 0;
    const measure = () => {
      const { width } = element.getBoundingClientRect();
      const previousWidth = previousWidthRef.current;
      previousWidthRef.current = width;
      const isFirstRealWidth = previousWidth === void 0 || previousWidth === 0;
      setStep(
        (previousStep) => getShrinkStep(width, thresholds, isFirstRealWidth ? void 0 : previousStep)
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [element, thresholds]);
  return step;
}
const TAB_TOOLBAR_SHRINK_THRESHOLDS_PX = Object.freeze([520, 420, 340]);
const TabToolbarContainer = React.forwardRef(
  ({ id, className, children }, ref) => {
    const [rootNode, setRootNode] = useState(void 0);
    const forwardedRef = useRef(ref);
    forwardedRef.current = ref;
    const attachRoot = useCallback((node) => {
      setRootNode(node ?? void 0);
      const currentRef = forwardedRef.current;
      if (typeof currentRef === "function") currentRef(node);
      else if (currentRef) currentRef.current = node;
    }, []);
    const measuredShrinkStep = useShrinkStep(rootNode, TAB_TOOLBAR_SHRINK_THRESHOLDS_PX);
    const shrinkStep = useShrinkStepOverride() ?? measuredShrinkStep;
    const isTightened = shrinkStep >= SHRINK_STEP.MINIMUM;
    return /* @__PURE__ */ jsx(ShrinkStepContext.Provider, { value: shrinkStep, children: /* @__PURE__ */ jsx(
      "div",
      {
        ref: attachRoot,
        className: cn(
          "tw:sticky tw:top-0 tw:box-border tw:h-14 tw:items-center tw:justify-between tw:overflow-clip tw:py-2 tw:text-foreground tw:@container/toolbar",
          isTightened ? "tw:gap-1 tw:px-2" : "tw:gap-2 tw:px-4",
          className,
          // Last, so it survives `cn()`. Everything above is a default a consumer may override,
          // but the flex row is structure this container owns: the zones below it are flex items
          // that shrink and grow against each other, and none of that exists under any other
          // `display`. `cn()` resolves Tailwind conflicts last-wins, so a consumer passing any
          // display utility in `className` would otherwise take `display: flex` away and stack the
          // zones vertically inside a fixed-height, `overflow-clip` row.
          "tw:flex tw:flex-row"
        ),
        id,
        children
      }
    ) });
  }
);
function TabToolbar({
  onSelectProjectMenuItem,
  onSelectViewInfoMenuItem,
  projectMenuData,
  tabViewMenuData,
  id,
  className,
  startAreaChildren,
  centerAreaChildren,
  endAreaChildren,
  menuButtonIcon
}) {
  return /* @__PURE__ */ jsxs(TabToolbarContainer, { className: `tw:w-full tw:border-b ${className}`, id, children: [
    projectMenuData && /* @__PURE__ */ jsx(
      TabDropdownMenu,
      {
        onSelectMenuItem: onSelectProjectMenuItem,
        menuData: projectMenuData,
        tabLabel: "Project",
        icon: menuButtonIcon ?? /* @__PURE__ */ jsx(Menu, {}),
        buttonVariant: "ghost",
        showSectionHeadings: true
      }
    ),
    startAreaChildren && /* @__PURE__ */ jsx("div", { className: "tw:flex tw:min-w-0 tw:shrink tw:grow-[10] tw:flex-row tw:flex-nowrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip", children: startAreaChildren }),
    centerAreaChildren && /* @__PURE__ */ jsx("div", { className: "tw:flex tw:shrink tw:grow-[1] tw:basis-0 tw:flex-row tw:flex-nowrap tw:items-start tw:justify-center tw:gap-x-1 tw:gap-y-2 tw:overflow-clip tw:@sm:basis-auto", children: centerAreaChildren }),
    /* @__PURE__ */ jsxs("div", { className: "tw:flex tw:shrink-0 tw:grow-[1] tw:flex-row-reverse tw:flex-nowrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip", children: [
      tabViewMenuData && /* @__PURE__ */ jsx(
        TabDropdownMenu,
        {
          onSelectMenuItem: onSelectViewInfoMenuItem,
          menuData: tabViewMenuData,
          tabLabel: "View Info",
          icon: /* @__PURE__ */ jsx(EllipsisVertical, {}),
          className: "tw:h-full",
          showSectionHeadings: true
        }
      ),
      endAreaChildren
    ] })
  ] });
}
function TabFloatingMenu({
  onSelectProjectMenuItem,
  projectMenuData,
  id,
  className,
  menuButtonIcon
}) {
  return /* @__PURE__ */ jsx(TabToolbarContainer, { className: "tw:pointer-events-none", id, children: projectMenuData && /* @__PURE__ */ jsx(
    TabDropdownMenu,
    {
      onSelectMenuItem: onSelectProjectMenuItem,
      menuData: projectMenuData,
      tabLabel: "Project",
      icon: menuButtonIcon,
      className: `tw:pointer-events-auto tw:shadow-lg ${className}`,
      buttonVariant: "outline",
      showSectionHeadings: true
    }
  ) });
}
const VerticalTabs = React.forwardRef(({ className, ...props }, ref) => {
  const dir = readDirection();
  return /* @__PURE__ */ jsx(
    Tabs$1.Root,
    {
      orientation: "vertical",
      ref,
      className: cn("tw:flex tw:gap-1 tw:rounded-md tw:text-muted-foreground", className),
      ...props,
      dir
    }
  );
});
VerticalTabs.displayName = Tabs$1.List.displayName;
const VerticalTabsList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Tabs$1.List,
  {
    ref,
    className: cn(
      "tw:flex tw:items-center tw:w-[124px] tw:justify-center tw:rounded-md tw:bg-muted tw:p-1 tw:text-muted-foreground",
      className
    ),
    ...props
  }
));
VerticalTabsList.displayName = Tabs$1.List.displayName;
const VerticalTabsTrigger = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Tabs$1.Trigger,
  {
    ref,
    ...props,
    className: cn(
      "tw:inline-flex tw:w-[116px] tw:cursor-pointer tw:items-center tw:justify-center tw:break-words tw:rounded-sm tw:border-0 tw:bg-muted tw:px-3 tw:py-1.5 tw:text-sm tw:font-medium tw:text-inherit tw:ring-offset-background tw:transition-all tw:hover:text-foreground tw:focus-visible:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:data-[state=active]:bg-background tw:data-[state=active]:text-foreground tw:data-[state=active]:shadow-sm tw:overflow-clip",
      className
    )
  }
));
const VerticalTabsContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Tabs$1.Content,
  {
    ref,
    className: cn(
      // Removed tw:mt-2 because Sebastian said so
      "tw:ms-5 tw:flex-grow tw:text-foreground tw:ring-offset-background tw:focus-visible:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
VerticalTabsContent.displayName = Tabs$1.Content.displayName;
function TabNavigationContentSearch({
  tabList,
  searchValue,
  onSearch,
  searchPlaceholder,
  headerTitle,
  searchClassName,
  id
}) {
  return /* @__PURE__ */ jsxs("div", { id, className: "pr-twp", children: [
    /* @__PURE__ */ jsxs("div", { className: "tw:sticky tw:top-0 tw:space-y-2 tw:pb-2", children: [
      headerTitle ? /* @__PURE__ */ jsx("h1", { children: headerTitle }) : "",
      /* @__PURE__ */ jsx(
        SearchBar,
        {
          className: searchClassName,
          value: searchValue,
          onSearch,
          placeholder: searchPlaceholder
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(VerticalTabs, { children: [
      /* @__PURE__ */ jsx(VerticalTabsList, { children: tabList.map((tab) => /* @__PURE__ */ jsx(VerticalTabsTrigger, { value: tab.value, children: tab.value }, tab.key)) }),
      tabList.map((tab) => /* @__PURE__ */ jsx(VerticalTabsContent, { value: tab.value, children: tab.content }, tab.key))
    ] })
  ] });
}
function Menubar({
  className,
  // CUSTOM: Added variant prop to allow callers to apply visual style variants to all menu items
  variant = "default",
  ...props
}) {
  const contextValue = React.useMemo(
    () => ({
      variant
    }),
    [variant]
  );
  return /* @__PURE__ */ jsx(MenuContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsx(
    Menubar$1.Root,
    {
      "data-slot": "menubar",
      className: cn(
        "tw:flex tw:h-8 tw:items-center tw:gap-0.5 tw:rounded-lg tw:border tw:p-[3px]",
        className
      ),
      ...props
    }
  ) });
}
function MenubarMenu({ ...props }) {
  return /* @__PURE__ */ jsx(Menubar$1.Menu, { "data-slot": "menubar-menu", ...props });
}
function MenubarPortal({ ...props }) {
  return /* @__PURE__ */ jsx(Menubar$1.Portal, { "data-slot": "menubar-portal", ...props });
}
function MenubarTrigger({
  className,
  ...props
}) {
  const context = useMenuContext();
  return /* @__PURE__ */ jsx(
    Menubar$1.Trigger,
    {
      "data-slot": "menubar-trigger",
      className: cn(
        "tw:flex tw:items-center tw:rounded-sm tw:px-1.5 tw:py-[2px] tw:text-sm tw:font-medium tw:outline-hidden tw:select-none tw:hover:bg-muted tw:aria-expanded:bg-muted",
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation (portal-rendered content needs this)
        "pr-twp",
        // CUSTOM: Apply variant-driven styles from menu context
        menuVariants({ variant: context.variant, className })
      ),
      ...props
    }
  );
}
function MenubarContent({
  className,
  align = "start",
  alignOffset = -4,
  sideOffset = 8,
  // CUSTOM: Pull `style` out so the shared z-index can be applied under any caller-supplied style
  style,
  // CUSTOM: Destructure ref (a regular prop in React 19) and onCloseAutoFocus so
  // useDismissOnWindowBlur can compose them with its own
  ref,
  onCloseAutoFocus,
  ...props
}) {
  const blurDismissProps = useDismissOnWindowBlur({ ref, onCloseAutoFocus });
  return /* @__PURE__ */ jsx(MenubarPortal, { children: /* @__PURE__ */ jsx(
    Menubar$1.Content,
    {
      "data-slot": "menubar-content",
      ...blurDismissProps,
      align,
      alignOffset,
      sideOffset,
      className: cn(
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        // CUSTOM: Removed tw:z-50 to use the shared z-index constant below (see style prop)
        // CUSTOM: Removed tw:bg-popover/70 and the tw:before:* backdrop-blur layer that shadcn's
        // translucent menu color adds, so the base tw:bg-popover paints this surface opaque: text
        // behind a menu must not show through it (adr-opaque-menu-surfaces).
        // The muted variant needs no background override here: the base class already paints
        // tw:bg-popover at full opacity.
        "tw:min-w-36 tw:origin-(--radix-menubar-content-transform-origin) tw:overflow-hidden tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:animate-none! tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative",
        // CUSTOM: Added pr-twp to reset styles so that only shadcn styles are applied (portal-rendered content needs this)
        "pr-twp",
        className
      ),
      style: { zIndex: Z_INDEX_ABOVE_DOCK, ...style },
      ...props
    }
  ) });
}
function MenubarItem({
  className,
  inset,
  variant = "default",
  ...props
}) {
  const context = useMenuContext();
  return /* @__PURE__ */ jsx(
    Menubar$1.Item,
    {
      "data-slot": "menubar-item",
      "data-inset": inset,
      "data-variant": variant,
      className: cn(
        "tw:group/menubar-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive!",
        // CUSTOM: Apply variant-driven styles from menu context
        menuVariants({ variant: context.variant, className })
      ),
      ...props
    }
  );
}
function MenubarCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}) {
  const context = useMenuContext();
  return /* @__PURE__ */ jsxs(
    Menubar$1.CheckboxItem,
    {
      "data-slot": "menubar-checkbox-item",
      "data-inset": inset,
      className: cn(
        // CUSTOM: Added `tw:data-disabled:opacity-50` so a disabled checkbox item dims like every other
        // disabled menu item, and `tw:[&_svg:not([class*=size-])]:size-4` so icons inside it get the same
        // 16px size as in MenubarItem. Both were missing from the checkbox item's class list.
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-1.5 tw:ps-7 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        // CUSTOM: Apply variant-driven styles from menu context
        menuVariants({ variant: context.variant, className })
      ),
      checked,
      ...props,
      children: [
        /* @__PURE__ */ jsx("span", { className: "tw:pointer-events-none tw:absolute tw:start-1.5 tw:flex tw:size-4 tw:items-center tw:justify-center tw:[&_svg:not([class*=size-])]:size-4", children: /* @__PURE__ */ jsx(Menubar$1.ItemIndicator, { children: /* @__PURE__ */ jsx(IconCheck, {}) }) }),
        children
      ]
    }
  );
}
function MenubarSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Menubar$1.Separator,
    {
      "data-slot": "menubar-separator",
      className: cn("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", className),
      ...props
    }
  );
}
function MenubarShortcut({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      "data-slot": "menubar-shortcut",
      className: cn(
        // CUSTOM: Added tw:[unicode-bidi:plaintext] so the hint takes its direction from its first
        // letter, keeping macOS symbols in order (⌃F, not F⌃) in RTL menus. Unlike dir="ltr", it
        // keeps the span's direction, so tw:ms-auto still puts the hint at the inline end
        "tw:[unicode-bidi:plaintext] tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground tw:group-focus/menubar-item:text-accent-foreground",
        className
      ),
      ...props
    }
  );
}
function MenubarSub({ ...props }) {
  return /* @__PURE__ */ jsx(Menubar$1.Sub, { "data-slot": "menubar-sub", ...props });
}
function MenubarSubTrigger({
  className,
  inset,
  children,
  ...props
}) {
  const context = useMenuContext();
  return /* @__PURE__ */ jsxs(
    Menubar$1.SubTrigger,
    {
      "data-slot": "menubar-sub-trigger",
      "data-inset": inset,
      className: cn(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-none tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg:not([class*=size-])]:size-4",
        // CUSTOM: Apply variant-driven styles from menu context
        menuVariants({ variant: context.variant, className })
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(IconChevronRight, { className: "tw:ms-auto tw:size-4" })
      ]
    }
  );
}
function MenubarSubContent({
  className,
  // CUSTOM: Pull `style` out so the shared z-index can be applied under any caller-supplied style
  style,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Menubar$1.SubContent,
    {
      "data-slot": "menubar-sub-content",
      className: cn(
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        // CUSTOM: Removed tw:z-50 to use the shared z-index constant below (see style prop), keeping
        // submenus on the same overlay tier as their parent MenubarContent
        // CUSTOM: Removed tw:bg-popover/70 and the tw:before:* backdrop-blur layer that shadcn's
        // translucent menu color adds, so the base tw:bg-popover paints this surface opaque: text
        // behind a menu must not show through it (adr-opaque-menu-surfaces).
        // The muted variant needs no background override here: the base class already paints
        // tw:bg-popover at full opacity.
        "tw:min-w-32 tw:origin-(--radix-menubar-content-transform-origin) tw:overflow-hidden tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-lg tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative",
        className
      ),
      style: { zIndex: Z_INDEX_ABOVE_DOCK, ...style },
      ...props
    }
  );
}
const simulateKeyPress = (ref, keys) => {
  setTimeout(() => {
    keys.forEach((key) => {
      var _a;
      (_a = ref.current) == null ? void 0 : _a.dispatchEvent(new KeyboardEvent("keydown", key));
    });
  }, 0);
};
const createMenubarSeparator = (groupKey) => /* @__PURE__ */ jsx(MenubarSeparator, {}, `separator-${groupKey}`);
const getMenubarContent = (groups, onSelectMenuItem, leadingSlot) => groups.map(({ groupKey, items }) => ({
  groupKey,
  items: items.map(({ item, subGroups = [] }) => {
    let menuEntry;
    if ("command" in item) {
      const isCheckboxItem = item.checked !== void 0;
      const itemContent = /* @__PURE__ */ jsxs(Fragment$1, { children: [
        /* @__PURE__ */ jsx(
          MenuItemIcon,
          {
            iconName: isCheckboxItem ? void 0 : item.iconNameBefore,
            icon: isCheckboxItem ? void 0 : item.iconPathBefore,
            menuLabel: item.label,
            leading: true,
            leadingSlot
          }
        ),
        item.label,
        /* @__PURE__ */ jsx(
          MenuItemIcon,
          {
            iconName: item.iconNameAfter,
            icon: item.iconPathAfter,
            menuLabel: item.label
          }
        ),
        item.shortcut && /* @__PURE__ */ jsx(MenubarShortcut, { className: "tw:ps-4", children: /* @__PURE__ */ jsx(ShortcutKeys, { hint: item.shortcut }) })
      ] });
      const handleSelect = () => {
        onSelectMenuItem(item);
      };
      menuEntry = isCheckboxItem ? /* @__PURE__ */ jsx(
        MenubarCheckboxItem,
        {
          className: "tw:ps-1.5",
          checked: item.checked,
          disabled: item.disabled,
          onSelect: handleSelect,
          children: itemContent
        },
        `menubar-item-${item.label}-${item.command}`
      ) : /* @__PURE__ */ jsx(
        MenubarItem,
        {
          disabled: item.disabled,
          onSelect: handleSelect,
          children: itemContent
        },
        `menubar-item-${item.label}-${item.command}`
      );
    } else {
      menuEntry = /* @__PURE__ */ jsxs(MenubarSub, { children: [
        /* @__PURE__ */ jsxs(MenubarSubTrigger, { disabled: item.disabled, children: [
          /* @__PURE__ */ jsx(
            MenuItemIcon,
            {
              iconName: item.iconNameBefore,
              menuLabel: item.label,
              leading: true,
              leadingSlot
            }
          ),
          item.label,
          /* @__PURE__ */ jsx(MenuItemIcon, { iconName: item.iconNameAfter, menuLabel: item.label })
        ] }),
        /* @__PURE__ */ jsx(MenubarSubContent, { children: joinGroupsWithSeparators(
          getMenubarContent(
            subGroups,
            onSelectMenuItem,
            getLeadingIconSlot(
              subGroups.flatMap((group) => group.items.map((node) => node.item))
            )
          ),
          createMenubarSeparator
        ) })
      ] }, `menubar-sub-${item.label}-${item.id}`);
    }
    return /* @__PURE__ */ jsxs(Tooltip, { children: [
      /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: menuEntry }),
      item.tooltip && /* @__PURE__ */ jsx(TooltipContent, { children: item.tooltip })
    ] }, `tooltip-${item.label}-${"command" in item ? item.command : item.id}`);
  })
}));
function PlatformMenubar({
  menuData,
  onSelectMenuItem,
  onOpenChange,
  variant
}) {
  const menubarRef = useRef(void 0);
  const projectMenuRef = useRef(void 0);
  const windowMenuRef = useRef(void 0);
  const layoutMenuRef = useRef(void 0);
  const helpMenuRef = useRef(void 0);
  const menuTree = useMemo(() => buildMenuTree(menuData), [menuData]);
  const getRefForColumn = (columnKey) => {
    switch (columnKey) {
      case "platform.app":
        return projectMenuRef;
      case "platform.window":
        return windowMenuRef;
      case "platform.layout":
        return layoutMenuRef;
      case "platform.help":
        return helpMenuRef;
      default:
        return void 0;
    }
  };
  useHotkeys(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (event, handler) => {
    var _a, _b, _c, _d;
    event.preventDefault();
    const escKey = { key: "Escape", code: "Escape", keyCode: 27, bubbles: true };
    const spaceKey = { key: " ", code: "Space", keyCode: 32, bubbles: true };
    switch (handler.hotkey) {
      case "alt":
        simulateKeyPress(projectMenuRef, [escKey]);
        break;
      case "alt+p":
        (_a = projectMenuRef.current) == null ? void 0 : _a.focus();
        simulateKeyPress(projectMenuRef, [escKey, spaceKey]);
        break;
      case "alt+l":
        (_b = windowMenuRef.current) == null ? void 0 : _b.focus();
        simulateKeyPress(windowMenuRef, [escKey, spaceKey]);
        break;
      case "alt+n":
        (_c = layoutMenuRef.current) == null ? void 0 : _c.focus();
        simulateKeyPress(layoutMenuRef, [escKey, spaceKey]);
        break;
      case "alt+h":
        (_d = helpMenuRef.current) == null ? void 0 : _d.focus();
        simulateKeyPress(helpMenuRef, [escKey, spaceKey]);
        break;
    }
  });
  useEffect(() => {
    if (!onOpenChange || !menubarRef.current) return;
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-state" && mutation.target instanceof HTMLElement) {
          const state = mutation.target.getAttribute("data-state");
          if (state === "open") {
            onOpenChange(true);
          } else {
            onOpenChange(false);
          }
        }
      });
    });
    const menubarElement = menubarRef.current;
    const dataStateAttributes = menubarElement.querySelectorAll("[data-state]");
    dataStateAttributes.forEach((element) => {
      observer.observe(element, { attributes: true });
    });
    return () => observer.disconnect();
  }, [onOpenChange]);
  if (!menuData) return void 0;
  return /* @__PURE__ */ jsx(Menubar, { ref: menubarRef, className: "pr-twp tw:border-0 tw:bg-transparent", variant, children: menuTree.columns.map(({ columnKey, column, groups }) => {
    return /* @__PURE__ */ jsxs(MenubarMenu, { children: [
      /* @__PURE__ */ jsx(MenubarTrigger, { ref: getRefForColumn(columnKey), children: column.label }),
      /* @__PURE__ */ jsx(
        MenubarContent,
        {
          style: { zIndex: Z_INDEX_ABOVE_DOCK },
          children: /* @__PURE__ */ jsx(TooltipProvider, { children: joinGroupsWithSeparators(
            getMenubarContent(
              groups,
              onSelectMenuItem,
              getLeadingIconSlot(
                groups.flatMap((group) => group.items.map((node) => node.item))
              )
            ),
            createMenubarSeparator
          ) })
        }
      )
    ] }, columnKey);
  }) });
}
const APP_TOOLBAR_SHRINK_THRESHOLDS_PX = Object.freeze([950, 800, 700]);
function getToolbarOSReservedSpaceClassName(operatingSystem) {
  switch (operatingSystem) {
    case void 0:
      return void 0;
    case "darwin":
      return "tw:ps-[85px]";
    default:
      return "tw:pe-[calc(138px+1rem)]";
  }
}
function Toolbar({
  menuData,
  onOpenChange,
  onSelectMenuItem,
  className,
  id,
  children,
  appMenuAreaChildren,
  configAreaChildren,
  shouldUseAsAppDragArea,
  menubarVariant = "default"
}) {
  const [contentRowNode, setContentRowNode] = useState(void 0);
  const attachContentRow = useCallback(
    (node) => setContentRowNode(node ?? void 0),
    []
  );
  const measuredShrinkStep = useShrinkStep(contentRowNode, APP_TOOLBAR_SHRINK_THRESHOLDS_PX);
  const shrinkStep = useShrinkStepOverride() ?? measuredShrinkStep;
  return /* @__PURE__ */ jsx(ShrinkStepContext.Provider, { value: shrinkStep, children: /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("tw:border tw:px-4 tw:text-foreground", className),
      style: { position: "relative" },
      id,
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          "data-testid": "toolbar-content-row",
          className: "tw:flex tw:h-full tw:w-full tw:justify-between tw:overflow-hidden",
          ref: attachContentRow,
          style: shouldUseAsAppDragArea ? { WebkitAppRegion: "drag" } : void 0,
          children: [
            /* @__PURE__ */ jsx("div", { className: "tw:flex tw:shrink-0 tw:grow tw:basis-0", children: /* @__PURE__ */ jsxs(
              "div",
              {
                className: "tw:flex tw:items-center tw:gap-2",
                style: shouldUseAsAppDragArea ? { WebkitAppRegion: "no-drag" } : void 0,
                children: [
                  appMenuAreaChildren,
                  menuData && /* @__PURE__ */ jsx(
                    PlatformMenubar,
                    {
                      menuData,
                      onOpenChange,
                      onSelectMenuItem,
                      variant: menubarVariant
                    }
                  )
                ]
              }
            ) }),
            /* @__PURE__ */ jsx(
              "div",
              {
                "data-testid": "toolbar-content-area",
                className: "tw:flex tw:min-w-0 tw:shrink tw:items-center tw:gap-2 tw:overflow-clip tw:px-2",
                style: shouldUseAsAppDragArea ? { WebkitAppRegion: "no-drag" } : void 0,
                children
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "tw:flex tw:min-w-0 tw:grow tw:basis-0 tw:justify-end", children: /* @__PURE__ */ jsx(
              "div",
              {
                className: "tw:flex tw:min-w-0 tw:items-center tw:gap-2 tw:pe-1",
                style: shouldUseAsAppDragArea ? { WebkitAppRegion: "no-drag" } : void 0,
                children: configAreaChildren
              }
            ) })
          ]
        }
      )
    }
  ) });
}
const localizeString = (strings, key) => {
  return strings[key] ?? key;
};
function UiLanguageSelector({
  knownUiLanguages,
  primaryLanguage = "en",
  fallbackLanguages = [],
  onLanguagesChange,
  onPrimaryLanguageChange,
  onFallbackLanguagesChange,
  localizedStrings,
  className,
  id,
  disabled = false
}) {
  const fallbackLanguagesText = localizeString(
    localizedStrings,
    "%settings_uiLanguageSelector_fallbackLanguages%"
  );
  const [isOpen, setIsOpen] = useState(false);
  const handleLanguageChange = (code) => {
    if (onPrimaryLanguageChange) onPrimaryLanguageChange(code);
    if (onLanguagesChange)
      onLanguagesChange([code, ...fallbackLanguages.filter((lang) => lang !== code)]);
    if (onFallbackLanguagesChange && fallbackLanguages.find((l) => l === code))
      onFallbackLanguagesChange([...fallbackLanguages.filter((lang) => lang !== code)]);
    setIsOpen(false);
  };
  const getLanguageDisplayName = (lang, uiLang) => {
    var _a, _b, _c, _d, _e, _f;
    const altName = uiLang !== lang ? ((_b = (_a = knownUiLanguages[lang]) == null ? void 0 : _a.uiNames) == null ? void 0 : _b[uiLang]) ?? ((_d = (_c = knownUiLanguages[lang]) == null ? void 0 : _c.uiNames) == null ? void 0 : _d.en) : void 0;
    return altName ? `${(_e = knownUiLanguages[lang]) == null ? void 0 : _e.autonym} (${altName})` : (_f = knownUiLanguages[lang]) == null ? void 0 : _f.autonym;
  };
  return /* @__PURE__ */ jsxs("div", { id, className: cn("pr-twp tw:max-w-sm", className), children: [
    /* @__PURE__ */ jsxs(
      Select,
      {
        name: "uiLanguage",
        value: primaryLanguage,
        onValueChange: handleLanguageChange,
        open: isOpen,
        onOpenChange: (open) => setIsOpen(open),
        disabled,
        children: [
          /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsx(
            SelectContent,
            {
              style: { zIndex: Z_INDEX_ABOVE_DOCK },
              children: Object.keys(knownUiLanguages).map((key) => {
                return /* @__PURE__ */ jsx(SelectItem, { value: key, children: getLanguageDisplayName(key, primaryLanguage) }, key);
              })
            }
          )
        ]
      }
    ),
    primaryLanguage !== "en" && /* @__PURE__ */ jsx("div", { className: "tw:pt-3", children: /* @__PURE__ */ jsx(Label, { className: "tw:font-normal tw:text-muted-foreground", children: formatReplacementString(fallbackLanguagesText, {
      fallbackLanguages: (fallbackLanguages == null ? void 0 : fallbackLanguages.length) > 0 ? fallbackLanguages.map((f2) => getLanguageDisplayName(f2, primaryLanguage)).join(", ") : knownUiLanguages.en.autonym
    }) }) })
  ] });
}
const INTERFACE_LANGUAGE_PICKER_STRING_KEYS = Object.freeze([
  "%firstRun_language_search_placeholder%",
  "%firstRun_language_noResults%",
  "%firstRun_language_selected%"
]);
function foldForSearch(text) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
function filterEntries(entries, query) {
  if (!query) return entries;
  const folded = foldForSearch(query);
  return entries.filter(({ keywords }) => keywords.some((keyword) => keyword.includes(folded)));
}
function sortLanguages(entries) {
  return [...entries].sort(([aTag, aInfo], [bTag, bInfo]) => {
    if (aTag === "en" && bTag !== "en") return -1;
    if (bTag === "en" && aTag !== "en") return 1;
    return aInfo.autonym.localeCompare(bInfo.autonym);
  });
}
function InterfaceLanguagePicker({
  languages,
  value,
  onChange,
  localizedStrings,
  className,
  id
}) {
  const [search, setSearch] = useState("");
  const [preferredTag, setPreferredTag] = useState();
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const rowRefs = useRef(/* @__PURE__ */ new Map());
  const [listId, setListId] = useState();
  const entries = useMemo(
    () => sortLanguages(Object.entries(languages)).map(([tag, info]) => ({
      tag,
      info,
      keywords: [
        info.autonym,
        ...Object.values(info.uiNames ?? {}),
        ...info.otherNames ?? []
      ].map(foldForSearch)
    })),
    [languages]
  );
  const visibleEntries = useMemo(() => filterEntries(entries, search), [entries, search]);
  const highlightedTag = useMemo(() => {
    var _a;
    const isVisible = (tag) => !!tag && visibleEntries.some((entry) => entry.tag === tag);
    if (isVisible(preferredTag)) return preferredTag;
    if (isVisible(value)) return value;
    return ((_a = visibleEntries[0]) == null ? void 0 : _a.tag) ?? "";
  }, [preferredTag, value, visibleEntries]);
  const showSearch = entries.length > 1;
  useLayoutEffect(() => {
    var _a;
    setListId((_a = listRef.current) == null ? void 0 : _a.id);
  }, []);
  useLayoutEffect(() => {
    const row = rowRefs.current.get(highlightedTag);
    const input = showSearch ? inputRef.current : void 0;
    if (input) {
      if (row) input.setAttribute("aria-activedescendant", row.id);
      else input.removeAttribute("aria-activedescendant");
    }
    if (row && highlightedTag !== preferredTag) row.scrollIntoView({ block: "nearest" });
  }, [highlightedTag, preferredTag, showSearch]);
  const searchPlaceholder = localizedStrings["%firstRun_language_search_placeholder%"] ?? "";
  const noResults = localizedStrings["%firstRun_language_noResults%"] ?? "";
  const selectedLabel = localizedStrings["%firstRun_language_selected%"] ?? "";
  return /* @__PURE__ */ jsxs(
    Command,
    {
      id,
      className: cn("pr-twp", className),
      shouldFilter: false,
      value: highlightedTag,
      onValueChange: setPreferredTag,
      children: [
        showSearch && // Plain <input> (not CommandPrimitive.Input) so cmdk cannot update this field after
        // item selection. Arrow-key and Enter events from here bubble to the Command root div
        // where cmdk's keydown handler picks them up for list navigation.
        /* @__PURE__ */ jsx("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", children: /* @__PURE__ */ jsxs(InputGroup, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              ref: inputRef,
              "data-slot": "command-input",
              type: "text",
              role: "combobox",
              "aria-expanded": true,
              "aria-controls": listId,
              "aria-autocomplete": "list",
              placeholder: searchPlaceholder,
              "aria-label": searchPlaceholder,
              value: search,
              onChange: (e) => {
                setSearch(e.currentTarget.value);
                setPreferredTag(void 0);
              },
              className: "tw:w-full tw:text-sm tw:outline-hidden tw:disabled:cursor-not-allowed tw:disabled:opacity-50"
            }
          ),
          /* @__PURE__ */ jsx(InputGroupAddon, { children: /* @__PURE__ */ jsx(IconSearch, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
        ] }) }),
        /* @__PURE__ */ jsxs(CommandList, { ref: listRef, children: [
          /* @__PURE__ */ jsx(CommandEmpty, { children: noResults }),
          visibleEntries.map(({ tag, info }) => {
            const isSelected = tag === value;
            return /* @__PURE__ */ jsxs(
              CommandItem,
              {
                ref: (row) => {
                  if (row) rowRefs.current.set(tag, row);
                  else rowRefs.current.delete(tag);
                },
                value: tag,
                "aria-current": isSelected ? "true" : void 0,
                "data-checked": isSelected ? "true" : void 0,
                onSelect: () => onChange(tag),
                children: [
                  /* @__PURE__ */ jsx("span", { dir: "auto", children: info.autonym }),
                  isSelected && /* @__PURE__ */ jsx("span", { className: "tw:sr-only", children: selectedLabel })
                ]
              },
              tag
            );
          })
        ] })
      ]
    }
  );
}
function SmartLabel({ item, createLabel, createComplexLabel }) {
  if (createLabel) {
    return /* @__PURE__ */ jsx(Label, { children: createLabel(item) });
  }
  if (createComplexLabel) {
    return /* @__PURE__ */ jsx(Label, { children: createComplexLabel(item) });
  }
  return /* @__PURE__ */ jsx(Label, { children: item });
}
function Checklist({
  id,
  className,
  listItems,
  selectedListItems,
  handleSelectListItem,
  createLabel,
  createComplexLabel
}) {
  return /* @__PURE__ */ jsx("div", { id, className, children: listItems.map((item) => /* @__PURE__ */ jsxs("div", { className: "tw:m-2 tw:flex tw:items-center", children: [
    /* @__PURE__ */ jsx(
      Checkbox,
      {
        className: "tw:me-2 tw:align-middle",
        checked: selectedListItems.includes(item),
        onCheckedChange: (value) => handleSelectListItem(item, value)
      }
    ),
    /* @__PURE__ */ jsx(
      SmartLabel,
      {
        item,
        createLabel,
        createComplexLabel
      }
    )
  ] }, item)) });
}
const CheckboxGroup = Checklist;
function useFrozenWhileClosed(open, value) {
  const [wasOpen, setWasOpen] = useState(open);
  const [frozen, setFrozen] = useState(value);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) setFrozen(value);
  }
  return open ? value : frozen;
}
function DestructiveKeyConfirmation({
  open,
  anchorRect,
  message,
  confirmingKeyLabel,
  side = "bottom",
  align = "start",
  showArrow = true
}) {
  const srMessage = open ? formatReplacementStringToArray(message, { key: confirmingKeyLabel }).join("") : "";
  const {
    anchorRect: displayAnchorRect,
    message: displayMessage,
    confirmingKeyLabel: displayConfirmingKeyLabel,
    showArrow: displayShowArrow
  } = useFrozenWhileClosed(open, { anchorRect, message, confirmingKeyLabel, showArrow });
  return /* @__PURE__ */ jsxs(TooltipProvider, { children: [
    /* @__PURE__ */ jsx("span", { role: "status", className: "tw:sr-only", children: srMessage }),
    /* @__PURE__ */ jsxs(Tooltip, { open, onOpenChange: () => {
    }, children: [
      /* @__PURE__ */ jsx(
        TooltipTrigger,
        {
          "aria-hidden": "true",
          tabIndex: -1,
          className: cn(
            "tw:absolute tw:opacity-0 tw:pointer-events-none",
            "tw:p-0 tw:border-0 tw:bg-transparent tw:cursor-default tw:min-w-0 tw:min-h-0"
          ),
          style: {
            top: displayAnchorRect.top,
            left: displayAnchorRect.left,
            width: displayAnchorRect.width,
            height: displayAnchorRect.height
          }
        }
      ),
      /* @__PURE__ */ jsx(
        TooltipContent,
        {
          side,
          align,
          showArrow: displayShowArrow,
          arrowPadding: 8,
          className: cn(
            // Rely on TooltipContent's default tw:max-w-xs (320px) and normal wrapping: this hint's
            // text is short and usually fits on one line, but locale length varies (e.g. Spanish runs
            // longer than English), so allow it to wrap rather than force tw:whitespace-nowrap, which
            // could clip or overflow on a narrow webview.
            "tw:p-0 tw:has-data-[slot=kbd]:pe-0 tw:bg-background tw:text-destructive tw:border tw:border-destructive"
          ),
          arrowClassName: "tw:bg-[color-mix(in_oklab,var(--destructive)_10%,var(--background))] tw:fill-[color-mix(in_oklab,var(--destructive)_10%,var(--background))] tw:border tw:border-destructive",
          children: /* @__PURE__ */ jsx("div", { className: "tw:w-full tw:h-full tw:rounded-md tw:bg-destructive/10 tw:px-3 tw:py-1.5", children: formatReplacementStringToArray(displayMessage, {
            key: /* @__PURE__ */ jsx(
              Kbd,
              {
                className: cn(
                  // Kbd's base styling sets text-muted-foreground (unconditioned) plus
                  // in-data-[slot=tooltip-content]:text-background (for the default dark
                  // tooltip). Override both forms explicitly so tailwind-merge drops both base
                  // rules instead of leaving the winner up to CSS cascade order.
                  "tw:border tw:border-destructive tw:in-data-[slot=tooltip-content]:text-destructive",
                  // Kbd is an inline-flex box, which defaults to vertical-align: baseline in
                  // normal inline flow — that sits its bottom edge on the surrounding text's
                  // baseline rather than centering it against the line. Align to the line's
                  // midline instead.
                  "tw:align-middle"
                ),
                children: displayConfirmingKeyLabel
              }
            )
          }).map((part, index) => (
            // The array is static per render (one fixed localized string + one kbd), so index is
            // a stable, safe key — same rationale as source-language-indexed-list.component.tsx's
            // disable.
            // eslint-disable-next-line react/no-array-index-key
            /* @__PURE__ */ jsx(Fragment, { children: part }, `key-${index}`)
          )) })
        }
      )
    ] })
  ] });
}
function ResultsCard({
  cardKey,
  isSelected,
  onSelect,
  isDenied,
  isHidden = false,
  className,
  children,
  selectedButtons,
  hoverButtons,
  dropdownContent,
  additionalContent,
  accentColor,
  showDropdownOnHover = false
}) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      if (event.target !== event.currentTarget) return;
      event.preventDefault();
      onSelect();
    }
  };
  const [hasBeenHovered, setHasBeenHovered] = useState(false);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      hidden: isHidden,
      onClick: onSelect,
      onKeyDown: handleKeyDown,
      onMouseEnter: () => setHasBeenHovered(true),
      onFocus: () => setHasBeenHovered(true),
      role: "button",
      tabIndex: 0,
      "aria-pressed": isSelected,
      className: cn(
        "tw:group tw:relative tw:min-w-36 tw:rounded-xl tw:border tw:shadow-none tw:hover:bg-muted/50",
        { "tw:opacity-50 tw:hover:opacity-100": isDenied && !isSelected },
        { "tw:bg-accent": isSelected },
        { "tw:bg-transparent": !isSelected },
        className
      ),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "tw:flex tw:flex-col tw:gap-2 tw:p-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "tw:flex tw:justify-between tw:overflow-hidden", children: [
            /* @__PURE__ */ jsx("div", { className: "tw:min-w-0 tw:flex-1", children }),
            isSelected && selectedButtons,
            !isSelected && hoverButtons && /* @__PURE__ */ jsx("div", { className: "tw:invisible tw:group-hover:visible", children: hoverButtons }),
            dropdownContent && (isSelected || showDropdownOnHover && hasBeenHovered) && /* @__PURE__ */ jsx(
              "div",
              {
                className: cn(
                  !isSelected && showDropdownOnHover && "tw:invisible tw:group-hover:visible"
                ),
                children: /* @__PURE__ */ jsxs(DropdownMenu, { children: [
                  /* @__PURE__ */ jsx(DropdownMenuTrigger, { className: cn(accentColor && "tw:me-1"), asChild: true, children: /* @__PURE__ */ jsx(
                    Button,
                    {
                      className: "tw:m-1 tw:h-6 tw:w-6",
                      variant: "ghost",
                      size: "icon",
                      onClick: (e) => e.stopPropagation(),
                      onFocus: (e) => e.stopPropagation(),
                      children: /* @__PURE__ */ jsx(MoreVertical, {})
                    }
                  ) }),
                  /* @__PURE__ */ jsx(DropdownMenuContent, { align: "end", children: dropdownContent })
                ] })
              }
            )
          ] }),
          additionalContent && /* @__PURE__ */ jsx("div", { className: "tw:w-fit tw:min-w-0 tw:max-w-full tw:overflow-hidden", children: additionalContent })
        ] }),
        accentColor && /* @__PURE__ */ jsx(
          "div",
          {
            className: `tw:absolute tw:right-0 tw:top-0 tw:h-full tw:w-2 tw:rounded-r-xl ${accentColor}`
          }
        )
      ]
    },
    cardKey
  );
}
function TextField({
  id,
  isDisabled = false,
  hasError = false,
  isFullWidth = false,
  helperText,
  label,
  placeholder,
  isRequired = false,
  className,
  defaultValue,
  value,
  onChange,
  onFocus,
  onBlur
}) {
  return /* @__PURE__ */ jsxs("div", { className: cn("tw:inline-grid tw:items-center tw:gap-1.5", { "tw:w-full": isFullWidth }), children: [
    /* @__PURE__ */ jsx(
      Label,
      {
        htmlFor: id,
        className: cn({
          "tw:text-red-600": hasError,
          "tw:hidden": !label
        }),
        children: `${label}${isRequired ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ jsx(
      Input,
      {
        id,
        disabled: isDisabled,
        placeholder,
        required: isRequired,
        className: cn(className, { "tw:border-red-600": hasError }),
        defaultValue,
        value,
        onChange,
        onFocus,
        onBlur
      }
    ),
    /* @__PURE__ */ jsx("p", { className: cn({ "tw:hidden": !helperText }), children: helperText })
  ] });
}
function WizardStepper({
  currentStep,
  totalSteps,
  locale,
  completedSteps
}) {
  const safeLocale = locale || "en";
  const format = useMemo(() => {
    const numberFormat = new NumberFormat(safeLocale);
    return (n2) => numberFormat.format(n2);
  }, [safeLocale]);
  const clampedStep = Math.min(Math.max(currentStep, 1), totalSteps);
  const stepNumbers = Array.from({ length: totalSteps }, (_, i2) => i2 + 1);
  return /* @__PURE__ */ jsx("div", { className: "tw:flex tw:items-center", "aria-hidden": "true", children: stepNumbers.map((stepNum) => {
    let state = "upcoming";
    if (stepNum === clampedStep) state = "active";
    else if (completedSteps ? completedSteps.includes(stepNum) : stepNum < clampedStep)
      state = "complete";
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      stepNum > 1 && /* @__PURE__ */ jsx("div", { className: "tw:h-px tw:flex-1 tw:bg-border" }),
      /* @__PURE__ */ jsx(
        "div",
        {
          "data-state": state,
          className: cn(
            "tw:flex tw:h-8 tw:w-8 tw:shrink-0 tw:items-center tw:justify-center tw:rounded-full tw:text-sm tw:font-medium",
            state === "active" && "tw:bg-primary tw:text-primary-foreground",
            state === "complete" && "tw:bg-muted tw:text-muted-foreground",
            state === "upcoming" && "tw:border tw:border-input tw:text-muted-foreground"
          ),
          children: state === "complete" ? /* @__PURE__ */ jsx(Check, { className: "tw:h-4 tw:w-4" }) : format(stepNum)
        }
      )
    ] }, stepNum);
  }) });
}
function ContextMenu({ ...props }) {
  return /* @__PURE__ */ jsx(ContextMenu$1.Root, { "data-slot": "context-menu", ...props });
}
function ContextMenuTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    ContextMenu$1.Trigger,
    {
      "data-slot": "context-menu-trigger",
      className: cn("tw:select-none", className),
      ...props
    }
  );
}
function ContextMenuGroup({ ...props }) {
  return /* @__PURE__ */ jsx(ContextMenu$1.Group, { "data-slot": "context-menu-group", ...props });
}
function ContextMenuPortal({ ...props }) {
  return /* @__PURE__ */ jsx(ContextMenu$1.Portal, { "data-slot": "context-menu-portal", ...props });
}
function ContextMenuSub({ ...props }) {
  return /* @__PURE__ */ jsx(ContextMenu$1.Sub, { "data-slot": "context-menu-sub", ...props });
}
function ContextMenuRadioGroup({
  ...props
}) {
  return /* @__PURE__ */ jsx(ContextMenu$1.RadioGroup, { "data-slot": "context-menu-radio-group", ...props });
}
function ContextMenuContent({
  className,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style,
  // CUSTOM: Destructure ref (a regular prop in React 19) and onCloseAutoFocus so
  // useDismissOnWindowBlur can compose them with its own
  ref,
  onCloseAutoFocus,
  ...props
}) {
  const blurDismissProps = useDismissOnWindowBlur({ ref, onCloseAutoFocus });
  return /* @__PURE__ */ jsx(ContextMenu$1.Portal, { children: /* @__PURE__ */ jsx(
    ContextMenu$1.Content,
    {
      "data-slot": "context-menu-content",
      ...blurDismissProps,
      className: cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        // CUSTOM: Removed tw:z-50 to use the shared z-index constant below (see style prop)
        // CUSTOM: Removed tw:bg-popover/70 and the tw:before:* backdrop-blur layer that shadcn's
        // translucent menu color adds, so the base tw:bg-popover paints this surface opaque: text
        // behind a menu must not show through it (adr-opaque-menu-surfaces).
        // A blur layer on a scrolling surface scrolls away with its items and never covers the
        // scrollbar gutter, so this scrolling surface in particular must be painted opaque.
        "pr-twp tw:max-h-(--radix-context-menu-content-available-height) tw:min-w-36 tw:origin-(--radix-context-menu-content-transform-origin) tw:overflow-x-hidden tw:overflow-y-auto tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative",
        className
      ),
      style: { zIndex: Z_INDEX_ABOVE_DOCK, ...style },
      ...props
    }
  ) });
}
function ContextMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    ContextMenu$1.Item,
    {
      "data-slot": "context-menu-item",
      "data-inset": inset,
      "data-variant": variant,
      className: cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/context-menu-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:focus:*:[svg]:text-accent-foreground tw:data-[variant=destructive]:*:[svg]:text-destructive",
        // CUSTOM: Added tw:not-data-[variant=destructive]:focus:**:text-accent-foreground, which
        // recolors every descendant of a highlighted non-destructive item to the accent foreground.
        // A descendant that sets its own color, such as the muted Kbd keycaps in a
        // ContextMenuShortcut, otherwise keeps its muted color on the accent background while the
        // text around it turns accent-foreground. DropdownMenuItem and MenubarItem carry the same
        // rule.
        "tw:not-data-[variant=destructive]:focus:**:text-accent-foreground",
        className
      ),
      ...props
    }
  );
}
function ContextMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    ContextMenu$1.SubTrigger,
    {
      "data-slot": "context-menu-sub-trigger",
      "data-inset": inset,
      className: cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(IconChevronRight, { className: "tw:ms-auto" })
      ]
    }
  );
}
function ContextMenuSubContent({
  className,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    ContextMenu$1.SubContent,
    {
      "data-slot": "context-menu-sub-content",
      className: cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        // CUSTOM: Removed tw:z-50 to use the shared z-index constant below (see style prop), keeping
        // submenus on the same above-dock layer as their parent ContextMenuContent (PT-3877)
        // CUSTOM: Removed tw:bg-popover/70 and the tw:before:* backdrop-blur layer that shadcn's
        // translucent menu color adds, so the base tw:bg-popover paints this surface opaque: text
        // behind a menu must not show through it (adr-opaque-menu-surfaces).
        // CUSTOM: Replaced tw:border with tw:ring-1 tw:ring-foreground/10 so a context submenu draws
        // its edge the same way as ContextMenuContent and DropdownMenuSubContent do, instead of being
        // the one menu surface in the family outlined with the border color.
        "pr-twp tw:min-w-32 tw:origin-(--radix-context-menu-content-transform-origin) tw:overflow-hidden tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-lg tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative",
        className
      ),
      style: { zIndex: Z_INDEX_ABOVE_DOCK, ...style },
      ...props
    }
  );
}
function ContextMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    ContextMenu$1.CheckboxItem,
    {
      "data-slot": "context-menu-checkbox-item",
      "data-inset": inset,
      className: cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        className
      ),
      checked,
      ...props,
      children: [
        /* @__PURE__ */ jsx("span", { className: "tw:pointer-events-none tw:absolute tw:end-2", children: /* @__PURE__ */ jsx(ContextMenu$1.ItemIndicator, { children: /* @__PURE__ */ jsx(IconCheck, {}) }) }),
        children
      ]
    }
  );
}
function ContextMenuRadioItem({
  className,
  children,
  inset,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    ContextMenu$1.RadioItem,
    {
      "data-slot": "context-menu-radio-item",
      "data-inset": inset,
      className: cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx("span", { className: "tw:pointer-events-none tw:absolute tw:end-2", children: /* @__PURE__ */ jsx(ContextMenu$1.ItemIndicator, { children: /* @__PURE__ */ jsx(IconCheck, {}) }) }),
        children
      ]
    }
  );
}
function ContextMenuLabel({
  className,
  inset,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    ContextMenu$1.Label,
    {
      "data-slot": "context-menu-label",
      "data-inset": inset,
      className: cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:px-1.5 tw:py-1 tw:text-xs tw:font-medium tw:text-muted-foreground tw:data-inset:ps-7",
        className
      ),
      ...props
    }
  );
}
function ContextMenuSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    ContextMenu$1.Separator,
    {
      "data-slot": "context-menu-separator",
      className: cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:-mx-1 tw:my-1 tw:h-px tw:bg-border",
        className
      ),
      ...props
    }
  );
}
function ContextMenuShortcut({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      "data-slot": "context-menu-shortcut",
      className: cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; tw:ms-auto uses logical margin for RTL support
        // CUSTOM: Added tw:[unicode-bidi:plaintext] so the hint takes its direction from its first
        // letter, keeping macOS symbols in order (⌃F, not F⌃) in RTL menus. Unlike dir="ltr", it
        // keeps the span's direction, so tw:ms-auto still puts the hint at the inline end
        "pr-twp tw:[unicode-bidi:plaintext] tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground tw:group-focus/context-menu-item:text-accent-foreground",
        className
      ),
      ...props
    }
  );
}
function Drawer({ ...props }) {
  return /* @__PURE__ */ jsx(Drawer$1.Root, { "data-slot": "drawer", ...props });
}
function DrawerTrigger({ ...props }) {
  return /* @__PURE__ */ jsx(Drawer$1.Trigger, { "data-slot": "drawer-trigger", ...props });
}
function DrawerPortal({ ...props }) {
  return /* @__PURE__ */ jsx(Drawer$1.Portal, { "data-slot": "drawer-portal", ...props });
}
function DrawerClose({ ...props }) {
  return /* @__PURE__ */ jsx(Drawer$1.Close, { "data-slot": "drawer-close", ...props });
}
function DrawerOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Drawer$1.Overlay,
    {
      "data-slot": "drawer-overlay",
      className: cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:fixed tw:inset-0 tw:z-50 tw:bg-black/10 tw:supports-backdrop-filter:backdrop-blur-xs tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-closed:animate-out tw:data-closed:fade-out-0",
        className
      ),
      ...props
    }
  );
}
function DrawerContent({
  className,
  children,
  // CUSTOM: Destructure hideDrawerHandle to conditionally render the drag handle
  hideDrawerHandle = false,
  ...props
}) {
  const dir = readDirection();
  return /* @__PURE__ */ jsxs(DrawerPortal, { "data-slot": "drawer-portal", children: [
    /* @__PURE__ */ jsx(DrawerOverlay, {}),
    /* @__PURE__ */ jsxs(
      Drawer$1.Content,
      {
        "data-slot": "drawer-content",
        className: cn(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
          // CUSTOM: Changed left/right drawer positioning from logical (start-0/end-0,
          // rounded-e/s-xl, border-e/s) to physical (left-0/right-0, rounded-r/l-xl, border-r/l).
          // Vaul's slide animation is physical, so logical properties in RTL caused the drawer to
          // appear on the wrong side and cover most of the screen.
          // CUSTOM: Added tw:data-[vaul-drawer-direction=left/right]:flex-row so the drag handle
          // sits on the open edge of left/right drawers instead of at the top.
          "pr-twp tw:group/drawer-content tw:fixed tw:z-50 tw:flex tw:h-auto tw:flex-col tw:bg-popover tw:text-sm tw:text-popover-foreground tw:data-[vaul-drawer-direction=bottom]:inset-x-0 tw:data-[vaul-drawer-direction=bottom]:bottom-0 tw:data-[vaul-drawer-direction=bottom]:mt-24 tw:data-[vaul-drawer-direction=bottom]:max-h-[80vh] tw:data-[vaul-drawer-direction=bottom]:rounded-t-xl tw:data-[vaul-drawer-direction=bottom]:border-t tw:data-[vaul-drawer-direction=left]:inset-y-0 tw:data-[vaul-drawer-direction=left]:left-0 tw:data-[vaul-drawer-direction=left]:w-3/4 tw:data-[vaul-drawer-direction=left]:rounded-r-xl tw:data-[vaul-drawer-direction=left]:border-r tw:data-[vaul-drawer-direction=left]:flex-row tw:data-[vaul-drawer-direction=right]:inset-y-0 tw:data-[vaul-drawer-direction=right]:right-0 tw:data-[vaul-drawer-direction=right]:w-3/4 tw:data-[vaul-drawer-direction=right]:rounded-l-xl tw:data-[vaul-drawer-direction=right]:border-l tw:data-[vaul-drawer-direction=right]:flex-row tw:data-[vaul-drawer-direction=top]:inset-x-0 tw:data-[vaul-drawer-direction=top]:top-0 tw:data-[vaul-drawer-direction=top]:mb-24 tw:data-[vaul-drawer-direction=top]:max-h-[80vh] tw:data-[vaul-drawer-direction=top]:rounded-b-xl tw:data-[vaul-drawer-direction=top]:border-b tw:data-[vaul-drawer-direction=left]:sm:max-w-sm tw:data-[vaul-drawer-direction=right]:sm:max-w-sm",
          className
        ),
        dir: "ltr",
        ...props,
        children: [
          !hideDrawerHandle && /* @__PURE__ */ jsx("div", { className: "tw:hidden tw:shrink-0 tw:rounded-full tw:bg-muted tw:group-data-[vaul-drawer-direction=bottom]/drawer-content:mx-auto tw:group-data-[vaul-drawer-direction=bottom]/drawer-content:mt-4 tw:group-data-[vaul-drawer-direction=bottom]/drawer-content:h-1.5 tw:group-data-[vaul-drawer-direction=bottom]/drawer-content:w-[100px] tw:group-data-[vaul-drawer-direction=bottom]/drawer-content:block tw:group-data-[vaul-drawer-direction=right]/drawer-content:my-auto tw:group-data-[vaul-drawer-direction=right]/drawer-content:ms-4 tw:group-data-[vaul-drawer-direction=right]/drawer-content:h-[100px] tw:group-data-[vaul-drawer-direction=right]/drawer-content:w-1.5 tw:group-data-[vaul-drawer-direction=right]/drawer-content:block" }),
          /* @__PURE__ */ jsx("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:flex-col", dir, children }),
          !hideDrawerHandle && /* @__PURE__ */ jsx("div", { className: "tw:hidden tw:shrink-0 tw:rounded-full tw:bg-muted tw:group-data-[vaul-drawer-direction=top]/drawer-content:mx-auto tw:group-data-[vaul-drawer-direction=top]/drawer-content:mb-4 tw:group-data-[vaul-drawer-direction=top]/drawer-content:h-1.5 tw:group-data-[vaul-drawer-direction=top]/drawer-content:w-[100px] tw:group-data-[vaul-drawer-direction=top]/drawer-content:block tw:group-data-[vaul-drawer-direction=left]/drawer-content:my-auto tw:group-data-[vaul-drawer-direction=left]/drawer-content:me-4 tw:group-data-[vaul-drawer-direction=left]/drawer-content:h-[100px] tw:group-data-[vaul-drawer-direction=left]/drawer-content:w-1.5 tw:group-data-[vaul-drawer-direction=left]/drawer-content:block" })
        ]
      }
    )
  ] });
}
function DrawerHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "drawer-header",
      className: cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:p-4 tw:group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center tw:group-data-[vaul-drawer-direction=top]/drawer-content:text-center tw:md:gap-0.5 tw:md:text-start",
        className
      ),
      ...props
    }
  );
}
function DrawerFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "drawer-footer",
      className: cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:mt-auto tw:flex tw:flex-col tw:gap-2 tw:p-4",
        className
      ),
      ...props
    }
  );
}
function DrawerTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    Drawer$1.Title,
    {
      "data-slot": "drawer-title",
      className: cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:font-heading tw:text-base tw:font-medium tw:text-foreground",
        className
      ),
      ...props
    }
  );
}
function DrawerDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Drawer$1.Description,
    {
      "data-slot": "drawer-description",
      className: cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:text-sm tw:text-muted-foreground",
        className
      ),
      ...props
    }
  );
}
function Progress({
  className,
  value,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Progress$1.Root,
    {
      "data-slot": "progress",
      className: cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:relative tw:flex tw:h-1 tw:w-full tw:items-center tw:overflow-x-hidden tw:rounded-full tw:bg-muted",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(
        Progress$1.Indicator,
        {
          "data-slot": "progress-indicator",
          className: "tw:size-full tw:flex-1 tw:bg-primary tw:transition-all",
          style: { transform: `translateX(-${100 - (value || 0)}%)` }
        }
      )
    }
  );
}
function Toaster({ ...props }) {
  const { theme: rawTheme = "system" } = useTheme();
  const theme = rawTheme === "light" || rawTheme === "dark" || rawTheme === "system" ? rawTheme : "system";
  const toasterStyle = {
    "--normal-bg": "var(--popover)",
    "--normal-text": "var(--popover-foreground)",
    "--normal-border": "var(--border)",
    "--border-radius": "var(--radius)"
  };
  return /* @__PURE__ */ jsx(
    Toaster$1,
    {
      theme,
      className: "tw:toaster tw:group",
      icons: {
        success: /* @__PURE__ */ jsx(IconCircleCheck, { className: "tw:size-4" }),
        info: /* @__PURE__ */ jsx(IconInfoCircle, { className: "tw:size-4" }),
        warning: /* @__PURE__ */ jsx(IconAlertTriangle, { className: "tw:size-4" }),
        error: /* @__PURE__ */ jsx(IconAlertOctagon, { className: "tw:size-4" }),
        loading: /* @__PURE__ */ jsx(IconLoader, { className: "tw:size-4 tw:animate-spin" })
      },
      style: toasterStyle,
      toastOptions: {
        classNames: {
          toast: "cn-toast"
        }
      },
      ...props
    }
  );
}
function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}) {
  const dir = readDirection();
  const _values = React.useMemo(
    () => Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max],
    [value, defaultValue, min, max]
  );
  return /* @__PURE__ */ jsxs(
    Slider$1.Root,
    {
      "data-slot": "slider",
      defaultValue,
      value,
      min,
      max,
      className: cn(
        "pr-twp tw:relative tw:flex tw:w-full tw:touch-none tw:items-center tw:select-none tw:data-disabled:opacity-50 tw:data-vertical:h-full tw:data-vertical:min-h-40 tw:data-vertical:w-auto tw:data-vertical:flex-col",
        className
      ),
      dir,
      ...props,
      children: [
        /* @__PURE__ */ jsx(
          Slider$1.Track,
          {
            "data-slot": "slider-track",
            className: "tw:relative tw:grow tw:overflow-hidden tw:rounded-full tw:bg-muted tw:data-horizontal:h-1 tw:data-horizontal:w-full tw:data-vertical:h-full tw:data-vertical:w-1",
            children: /* @__PURE__ */ jsx(
              Slider$1.Range,
              {
                "data-slot": "slider-range",
                className: "tw:absolute tw:bg-primary tw:select-none tw:data-horizontal:h-full tw:data-vertical:w-full"
              }
            )
          }
        ),
        Array.from({ length: _values.length }, (_, index) => /* @__PURE__ */ jsx(
          Slider$1.Thumb,
          {
            "data-slot": "slider-thumb",
            className: "tw:relative tw:block tw:size-3 tw:shrink-0 tw:rounded-full tw:border tw:border-ring tw:bg-white tw:ring-ring/50 tw:transition-[color,box-shadow] tw:select-none tw:after:absolute tw:after:-inset-2 tw:hover:ring-3 tw:focus-visible:ring-3 tw:focus-visible:outline-hidden tw:active:ring-3 tw:disabled:pointer-events-none tw:disabled:opacity-50"
          },
          index
        ))
      ]
    }
  );
}
function Switch({
  className,
  size = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Switch$1.Root,
    {
      "data-slot": "switch",
      "data-size": size,
      className: cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation. tw:peer
        // precedes pr-twp here because the peer class must be the first peer-related class for
        // Tailwind's peer selector to work correctly; pr-twp is still present as required.
        "tw:peer pr-twp tw:group/switch tw:relative tw:inline-flex tw:shrink-0 tw:items-center tw:rounded-full tw:border tw:border-transparent tw:transition-all tw:outline-none tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:data-[size=default]:h-[18.4px] tw:data-[size=default]:w-[32px] tw:data-[size=sm]:h-[14px] tw:data-[size=sm]:w-[24px] tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:bg-primary tw:data-unchecked:bg-input tw:dark:data-unchecked:bg-input/80 tw:data-disabled:cursor-not-allowed tw:data-disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(
        Switch$1.Thumb,
        {
          "data-slot": "switch-thumb",
          className: "tw:pointer-events-none tw:block tw:rounded-full tw:bg-background tw:ring-0 tw:transition-transform tw:group-data-[size=default]/switch:size-4 tw:group-data-[size=sm]/switch:size-3 tw:group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] tw:rtl:group-data-[size=default]/switch:data-checked:-translate-x-[calc(100%-2px)] tw:group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] tw:rtl:group-data-[size=sm]/switch:data-checked:-translate-x-[calc(100%-2px)] tw:dark:data-checked:bg-primary-foreground tw:group-data-[size=default]/switch:data-unchecked:translate-x-0 tw:rtl:group-data-[size=default]/switch:data-unchecked:-translate-x-0 tw:group-data-[size=sm]/switch:data-unchecked:translate-x-0 tw:rtl:group-data-[size=sm]/switch:data-unchecked:-translate-x-0 tw:dark:data-unchecked:bg-foreground"
        }
      )
    }
  );
}
function Tabs({
  className,
  orientation = "horizontal",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Tabs$1.Root,
    {
      "data-slot": "tabs",
      "data-orientation": orientation,
      className: cn("tw:group/tabs tw:flex tw:gap-2 tw:data-horizontal:flex-col", className),
      ...props
    }
  );
}
const tabsListVariants = cva(
  "tw:group/tabs-list tw:inline-flex tw:w-fit tw:items-center tw:justify-center tw:rounded-lg tw:p-[3px] tw:text-muted-foreground tw:group-data-horizontal/tabs:h-8 tw:group-data-vertical/tabs:h-fit tw:group-data-vertical/tabs:flex-col tw:data-[variant=line]:rounded-none",
  {
    variants: {
      variant: {
        default: "tw:bg-muted",
        line: "tw:gap-1 tw:bg-transparent"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function TabsList({
  className,
  variant = "default",
  ...props
}) {
  const dir = readDirection();
  return /* @__PURE__ */ jsx(
    Tabs$1.List,
    {
      "data-slot": "tabs-list",
      "data-variant": variant,
      className: cn("pr-twp", tabsListVariants({ variant }), className),
      dir,
      ...props
    }
  );
}
function TabsTrigger({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    Tabs$1.Trigger,
    {
      "data-slot": "tabs-trigger",
      className: cn(
        "pr-twp tw:relative tw:inline-flex tw:h-[calc(100%-1px)] tw:flex-1 tw:items-center tw:justify-center tw:gap-1.5 tw:rounded-md tw:border tw:border-transparent tw:px-1.5 tw:py-0.5 tw:text-sm tw:font-medium tw:whitespace-nowrap tw:text-foreground/60 tw:transition-all tw:group-data-vertical/tabs:w-full tw:group-data-vertical/tabs:justify-start tw:hover:text-foreground tw:focus-visible:border-ring tw:focus-visible:ring-[3px] tw:focus-visible:ring-ring/50 tw:focus-visible:outline-1 tw:focus-visible:outline-ring tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:has-data-[icon=inline-end]:pe-1 tw:has-data-[icon=inline-start]:ps-1 tw:dark:text-muted-foreground tw:dark:hover:text-foreground tw:group-data-[variant=default]/tabs-list:data-active:shadow-sm tw:group-data-[variant=line]/tabs-list:data-active:shadow-none tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        "tw:group-data-[variant=line]/tabs-list:bg-transparent tw:group-data-[variant=line]/tabs-list:data-active:bg-transparent tw:dark:group-data-[variant=line]/tabs-list:data-active:border-transparent tw:dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent",
        "tw:data-active:bg-background tw:data-active:text-foreground tw:dark:data-active:border-input tw:dark:data-active:bg-input/30 tw:dark:data-active:text-foreground",
        "tw:after:absolute tw:after:bg-foreground tw:after:opacity-0 tw:after:transition-opacity tw:group-data-horizontal/tabs:after:inset-x-0 tw:group-data-horizontal/tabs:after:bottom-[-5px] tw:group-data-horizontal/tabs:after:h-0.5 tw:group-data-vertical/tabs:after:inset-y-0 tw:group-data-vertical/tabs:after:-end-1 tw:group-data-vertical/tabs:after:w-0.5 tw:group-data-[variant=line]/tabs-list:data-active:after:opacity-100",
        className
      ),
      ...props
    }
  );
}
function TabsContent({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    Tabs$1.Content,
    {
      "data-slot": "tabs-content",
      className: cn("pr-twp tw:flex-1 tw:text-sm tw:outline-none", className),
      ...props
    }
  );
}
const useEvent = (event, eventHandler) => {
  useEffect(() => {
    if (!event) return void 0;
    let isCancelled = false;
    const guardedHandler = (eventData) => {
      if (!isCancelled) eventHandler(eventData);
    };
    const unsubscriber = event(guardedHandler);
    return () => {
      isCancelled = true;
      try {
        unsubscriber();
      } catch (error) {
        console.error("useEvent: error while unsubscribing from event", error);
      }
    };
  }, [event, eventHandler]);
};
const useEventAsync = (event, eventHandler) => {
  useEffect(() => {
    if (!event) return void 0;
    let isCancelled = false;
    let unsubscribe;
    let hasUnsubscribed = false;
    const guardedHandler = (eventData) => {
      if (!isCancelled) eventHandler(eventData);
    };
    const unsubscribeOnce = () => {
      if (hasUnsubscribed || !unsubscribe) return;
      hasUnsubscribed = true;
      const unsubscribeCaptured = unsubscribe;
      (async () => {
        try {
          await unsubscribeCaptured();
        } catch (error) {
          console.error("useEventAsync: error while unsubscribing from event", error);
        }
      })();
    };
    (async () => {
      try {
        unsubscribe = await Promise.resolve(event(guardedHandler));
        if (isCancelled) unsubscribeOnce();
      } catch (error) {
        console.error("useEventAsync: error while subscribing to event", error);
      }
    })();
    return () => {
      isCancelled = true;
      unsubscribeOnce();
    };
  }, [event, eventHandler]);
};
function getUsePromiseOptionsDefaults(options) {
  return {
    preserveValue: true,
    ...options
  };
}
const usePromise = (promiseFactoryCallback, defaultValue, options = {}) => {
  const defaultValueRef = useRef(defaultValue);
  defaultValueRef.current = defaultValue;
  const optionsDefaultedRef = useRef(options);
  optionsDefaultedRef.current = getUsePromiseOptionsDefaults(optionsDefaultedRef.current);
  const [value, setValue] = useState(() => defaultValueRef.current);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    let promiseIsCurrent = true;
    setIsLoading(!!promiseFactoryCallback);
    (async () => {
      if (promiseFactoryCallback) {
        try {
          const result = await promiseFactoryCallback();
          if (promiseIsCurrent) {
            setValue(() => result);
            setIsLoading(false);
          }
        } catch (error) {
          if (promiseIsCurrent) setIsLoading(false);
          console.error(
            "usePromise: the promise factory rejected, so there is no new value",
            error
          );
        }
      }
    })();
    return () => {
      promiseIsCurrent = false;
      if (!optionsDefaultedRef.current.preserveValue) setValue(() => defaultValueRef.current);
    };
  }, [promiseFactoryCallback]);
  return [value, isLoading];
};
const useRetryablePromise = (promiseFactoryCallback) => {
  const [hasError, setHasError] = useState(false);
  const [hasSettled, setHasSettled] = useState(false);
  const [refetchCount, setRefetchCount] = useState(0);
  const committedFetchRef = useRef(void 0);
  const trackedFetch = useMemo(() => {
    if (!promiseFactoryCallback) return void 0;
    const wrapped = async () => {
      try {
        const result = await promiseFactoryCallback();
        if (committedFetchRef.current === wrapped) {
          setHasError(false);
          setHasSettled(true);
        }
        return result;
      } catch (error) {
        if (committedFetchRef.current === wrapped) {
          setHasError(true);
          setHasSettled(true);
        }
        throw error;
      }
    };
    return wrapped;
  }, [promiseFactoryCallback, refetchCount]);
  useEffect(() => {
    committedFetchRef.current = trackedFetch;
    setHasError(false);
    setHasSettled(!trackedFetch);
  }, [trackedFetch]);
  const [data, isLoading] = usePromise(trackedFetch, void 0);
  const refetch = useCallback(() => {
    if (!committedFetchRef.current) return;
    setHasError(false);
    setHasSettled(false);
    setRefetchCount((count) => count + 1);
  }, []);
  return useMemo(
    () => ({ data, isLoading, hasError, hasSettled, refetch }),
    [data, isLoading, hasError, hasSettled, refetch]
  );
};
const DEFAULT_SEED_RETRIES = 10;
const DEFAULT_SEED_RETRY_DELAY_MS = 3e3;
const NEVER_RECHECK = () => false;
function useEventSeededState({
  read,
  event,
  isValid,
  seedRetries = DEFAULT_SEED_RETRIES,
  seedRetryDelayMs = DEFAULT_SEED_RETRY_DELAY_MS,
  recheckIntervalMs,
  shouldRecheck = NEVER_RECHECK,
  enabled = true
}) {
  const [value, setValue] = useState(void 0);
  const [hasSeedFailed, setHasSeedFailed] = useState(false);
  const eventCountRef = useRef(0);
  const readAndApply = useCallback(
    async (isStillWanted) => {
      const eventCountAtRequest = eventCountRef.current;
      const answer = await read();
      if (!isStillWanted() || eventCountRef.current !== eventCountAtRequest || !isValid(answer))
        return;
      setValue(answer);
      setHasSeedFailed(false);
    },
    [read, isValid]
  );
  useEffect(() => {
    if (!enabled) {
      setValue(void 0);
      setHasSeedFailed(false);
      return void 0;
    }
    let isCurrent = true;
    let retryTimer;
    const eventCountAtSeed = eventCountRef.current;
    const seed = async (retriesLeft) => {
      if (eventCountRef.current !== eventCountAtSeed) return;
      try {
        await readAndApply(() => isCurrent);
      } catch {
        if (!isCurrent || eventCountRef.current !== eventCountAtSeed) return;
        if (retriesLeft > 0) retryTimer = setTimeout(() => seed(retriesLeft - 1), seedRetryDelayMs);
        else setHasSeedFailed(true);
      }
    };
    seed(seedRetries);
    return () => {
      isCurrent = false;
      clearTimeout(retryTimer);
    };
  }, [enabled, readAndApply, seedRetries, seedRetryDelayMs]);
  const needsRecheck = enabled && shouldRecheck(value);
  useEffect(() => {
    if (!needsRecheck || recheckIntervalMs === void 0) return void 0;
    let isCurrent = true;
    const recheckTimer = setInterval(() => {
      readAndApply(() => isCurrent).catch(() => {
      });
    }, recheckIntervalMs);
    return () => {
      isCurrent = false;
      clearInterval(recheckTimer);
    };
  }, [needsRecheck, recheckIntervalMs, readAndApply]);
  useEvent(
    event,
    useCallback(
      (payload) => {
        if (!enabled || !isValid(payload)) return;
        eventCountRef.current += 1;
        setValue(payload);
        setHasSeedFailed(false);
      },
      [enabled, isValid]
    )
  );
  return { value, hasSeedFailed };
}
function useStylesheet(stylesheet) {
  useEffect(() => {
    let styleElement;
    if (stylesheet) {
      styleElement = document.createElement("style");
      styleElement.appendChild(document.createTextNode(stylesheet));
      document.head.appendChild(styleElement);
    }
    return () => {
      if (styleElement) {
        document.head.removeChild(styleElement);
      }
    };
  }, [stylesheet]);
}
function useExtraValidMarkers(usj) {
  const markersKey = useMemo(() => collectUsjMarkers(usj).slice().sort().join(" "), [usj]);
  return useMemo(() => markersKey ? markersKey.split(" ") : [], [markersKey]);
}
const useViewVisibility = () => {
  const [isViewVisible, setIsViewVisible] = useState(
    () => document.body.getBoundingClientRect().height > 0
  );
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const latestEntry = entries[entries.length - 1];
      if (latestEntry) setIsViewVisible(latestEntry.isIntersecting);
    });
    observer.observe(document.body);
    return () => {
      observer.disconnect();
    };
  }, []);
  return isViewVisible;
};
function useRunWhenVisible(isViewVisible, run) {
  const [isRunPending, setIsRunPending] = useState(false);
  const runRef = useRef(run);
  runRef.current = run;
  const isViewVisibleRef = useRef(isViewVisible);
  isViewVisibleRef.current = isViewVisible;
  const requestRun = useCallback(() => {
    if (isViewVisibleRef.current) runRef.current();
    else setIsRunPending(true);
  }, []);
  useEffect(() => {
    if (!isViewVisible || !isRunPending) return;
    setIsRunPending(false);
    runRef.current();
  }, [isViewVisible, isRunPending]);
  return requestRun;
}
function pickTabIconUrl(isDarkTheme, isTabSelected, urls) {
  if (isDarkTheme) return urls.dark;
  if (isTabSelected === void 0) return urls.lightDefault;
  return urls.lightUnselected;
}
function useTabIconSelection(isDarkTheme, tabIconUrls) {
  const isTabSelected = useViewVisibility();
  return pickTabIconUrl(isDarkTheme, isTabSelected, tabIconUrls);
}
function ShrinkStepOverride({ value, children }) {
  return /* @__PURE__ */ jsx(ShrinkStepOverrideContext.Provider, { value, children: /* @__PURE__ */ jsx(ShrinkStepContext.Provider, { value, children }) });
}
const TOOLTIP_DELAY_MS = 300;
function injectStyle(css, insertAt = "top") {
  if (!css || typeof document === "undefined") return;
  const head = document.head || document.querySelector("head");
  const firstChild = head.querySelector(":first-child");
  const style = document.createElement("style");
  style.appendChild(document.createTextNode(css));
  if (insertAt === "top" && firstChild) {
    head.insertBefore(style, firstChild);
  } else {
    head.appendChild(style);
  }
}
injectStyle(`/* By default the editor is too tall for the footnote editor, even while empty, so this makes it
   shorter. */
.footnote-editor .editor-input {
  min-height: 75px;
}

.footnote-editor .typeahead-popover {
  z-index: 300;
}

.footnote-editor .immutable-note-caller {
  display: none;
}

/* Need to be able to override the styles for the editor that happens to have an underscore */
/* stylelint-disable selector-class-pattern */
.footnote-editor .text-spacing .usfm_p {
  text-indent: 0;
}

/* \\fp (footnote paragraph) displays like a paragraph start — a line break before its span —
   while the note stays one inline run in the data (no newline ever enters USJ or USFM). A
   ::before generated line break is used instead of \`display: block\` because it keeps the span
   inline (the trailing \\f* closer glyph stays on the last content line instead of dropping to
   its own line) and the pseudo-element is not in the DOM, so the caret can never land in it and
   the editor's selection/serialization are untouched. Mirrors the structural rule in the
   editor's usj-nodes stylesheet so the popover renders the break even when the host page does
   not load that stylesheet (e.g. Storybook). */
.footnote-editor .note.expanded .usfm_fp::before {
  content: '\\A';
  white-space: pre;
}
.banded-row:hover {
  cursor: pointer;
}

.banded-row[data-state='selected']:hover {
  cursor: default;
}
/*! tailwindcss v4.2.2 | MIT License | https://tailwindcss.com */
@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-translate-x:0;--tw-translate-y:0;--tw-translate-z:0;--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-space-y-reverse:0;--tw-space-x-reverse:0;--tw-divide-x-reverse:0;--tw-border-style:solid;--tw-divide-y-reverse:0;--tw-gradient-position:initial;--tw-gradient-from:#0000;--tw-gradient-via:#0000;--tw-gradient-to:#0000;--tw-gradient-stops:initial;--tw-gradient-via-stops:initial;--tw-gradient-from-position:0%;--tw-gradient-via-position:50%;--tw-gradient-to-position:100%;--tw-leading:initial;--tw-font-weight:initial;--tw-tracking:initial;--tw-ordinal:initial;--tw-slashed-zero:initial;--tw-numeric-figure:initial;--tw-numeric-spacing:initial;--tw-numeric-fraction:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial;--tw-duration:initial;--tw-ease:initial;--tw-content:"";--tw-outline-style:solid;--tw-backdrop-blur:initial;--tw-backdrop-brightness:initial;--tw-backdrop-contrast:initial;--tw-backdrop-grayscale:initial;--tw-backdrop-hue-rotate:initial;--tw-backdrop-invert:initial;--tw-backdrop-opacity:initial;--tw-backdrop-saturate:initial;--tw-backdrop-sepia:initial;--tw-animation-delay:0s;--tw-animation-direction:normal;--tw-animation-duration:initial;--tw-animation-fill-mode:none;--tw-animation-iteration-count:1;--tw-enter-blur:0;--tw-enter-opacity:1;--tw-enter-rotate:0;--tw-enter-scale:1;--tw-enter-translate-x:0;--tw-enter-translate-y:0;--tw-exit-blur:0;--tw-exit-opacity:1;--tw-exit-rotate:0;--tw-exit-scale:1;--tw-exit-translate-x:0;--tw-exit-translate-y:0}}}@layer theme{:root,:host{--tw-font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--tw-color-red-100:oklch(93.6% .032 17.717);--tw-color-red-200:oklch(88.5% .062 18.334);--tw-color-red-300:oklch(80.8% .114 19.571);--tw-color-red-400:oklch(70.4% .191 22.216);--tw-color-red-500:oklch(63.7% .237 25.331);--tw-color-red-600:oklch(57.7% .245 27.325);--tw-color-red-700:oklch(50.5% .213 27.518);--tw-color-red-800:oklch(44.4% .177 26.899);--tw-color-orange-100:oklch(95.4% .038 75.164);--tw-color-orange-800:oklch(47% .157 37.304);--tw-color-amber-200:oklch(92.4% .12 95.746);--tw-color-amber-400:oklch(82.8% .189 84.429);--tw-color-amber-500:oklch(76.9% .188 70.08);--tw-color-amber-600:oklch(66.6% .179 58.318);--tw-color-yellow-50:oklch(98.7% .026 102.212);--tw-color-yellow-100:oklch(97.3% .071 103.193);--tw-color-yellow-400:oklch(85.2% .199 91.936);--tw-color-yellow-500:oklch(79.5% .184 86.047);--tw-color-yellow-600:oklch(68.1% .162 75.834);--tw-color-yellow-700:oklch(55.4% .135 66.442);--tw-color-green-50:oklch(98.2% .018 155.826);--tw-color-green-100:oklch(96.2% .044 156.743);--tw-color-green-500:oklch(72.3% .219 149.579);--tw-color-green-600:oklch(62.7% .194 149.214);--tw-color-green-700:oklch(52.7% .154 150.069);--tw-color-green-800:oklch(44.8% .119 151.328);--tw-color-teal-400:oklch(77.7% .152 181.912);--tw-color-teal-500:oklch(70.4% .14 182.503);--tw-color-teal-600:oklch(60% .118 184.704);--tw-color-sky-400:oklch(74.6% .16 232.661);--tw-color-sky-500:oklch(68.5% .169 237.323);--tw-color-sky-600:oklch(58.8% .158 241.966);--tw-color-blue-50:oklch(97% .014 254.604);--tw-color-blue-100:oklch(93.2% .032 255.585);--tw-color-blue-400:oklch(70.7% .165 254.624);--tw-color-blue-500:oklch(62.3% .214 259.815);--tw-color-blue-600:oklch(54.6% .245 262.881);--tw-color-blue-800:oklch(42.4% .199 265.638);--tw-color-indigo-200:oklch(87% .065 274.039);--tw-color-purple-50:oklch(97.7% .014 308.299);--tw-color-purple-200:oklch(90.2% .063 306.703);--tw-color-purple-900:oklch(38.1% .176 304.987);--tw-color-rose-400:oklch(71.2% .194 13.428);--tw-color-rose-500:oklch(64.5% .246 16.439);--tw-color-rose-600:oklch(58.6% .253 17.585);--tw-color-slate-300:oklch(86.9% .022 252.894);--tw-color-slate-400:oklch(70.4% .04 256.788);--tw-color-slate-900:oklch(20.8% .042 265.755);--tw-color-gray-50:oklch(98.5% .002 247.839);--tw-color-gray-100:oklch(96.7% .003 264.542);--tw-color-gray-300:oklch(87.2% .01 258.338);--tw-color-gray-500:oklch(55.1% .027 264.364);--tw-color-gray-600:oklch(44.6% .03 256.802);--tw-color-gray-700:oklch(37.3% .034 259.733);--tw-color-gray-800:oklch(27.8% .033 256.848);--tw-color-zinc-400:oklch(70.5% .015 286.067);--tw-color-neutral-300:oklch(87% 0 0);--tw-color-black:#000;--tw-color-white:#fff;--tw-container-xs:20rem;--tw-container-sm:24rem;--tw-container-md:28rem;--tw-container-lg:32rem;--tw-container-2xl:42rem;--tw-container-3xl:48rem;--tw-container-4xl:56rem;--tw-container-6xl:72rem;--tw-text-xs:.75rem;--tw-text-xs--line-height:calc(1 / .75);--tw-text-sm:.875rem;--tw-text-sm--line-height:calc(1.25 / .875);--tw-text-base:1rem;--tw-text-base--line-height:calc(1.5 / 1);--tw-text-lg:1.125rem;--tw-text-lg--line-height:calc(1.75 / 1.125);--tw-text-xl:1.25rem;--tw-text-xl--line-height:calc(1.75 / 1.25);--tw-text-2xl:1.5rem;--tw-text-2xl--line-height:calc(2 / 1.5);--tw-text-3xl:1.875rem;--tw-text-3xl--line-height:calc(2.25 / 1.875);--tw-text-4xl:2.25rem;--tw-text-4xl--line-height:calc(2.5 / 2.25);--tw-text-5xl:3rem;--tw-text-5xl--line-height:1;--tw-font-weight-normal:400;--tw-font-weight-medium:500;--tw-font-weight-semibold:600;--tw-font-weight-bold:700;--tw-font-weight-extrabold:800;--tw-tracking-tight:-.025em;--tw-tracking-normal:0em;--tw-tracking-wider:.05em;--tw-tracking-widest:.1em;--tw-leading-tight:1.25;--tw-leading-snug:1.375;--tw-leading-relaxed:1.625;--tw-leading-loose:2;--tw-radius-xs:.125rem;--tw-radius-md:calc(var(--radius) * .8);--tw-drop-shadow-sm:0 1px 2px #00000026;--tw-animate-spin:spin 1s linear infinite;--tw-animate-pulse:pulse 2s cubic-bezier(.4, 0, .6, 1) infinite;--tw-blur-xs:4px;--tw-default-transition-duration:.15s;--tw-default-transition-timing-function:cubic-bezier(.4, 0, .2, 1);--tw-default-font-family:"IBM Plex Sans Variable", sans-serif;--tw-default-mono-font-family:var(--tw-font-mono)}}@layer base{.pr-twp,.pr-twp *{border-color:var(--border);outline-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.pr-twp,.pr-twp *{outline-color:color-mix(in oklab, var(--ring) 50%, transparent)}}body.pr-twp{background-color:var(--background);color:var(--foreground)}html.pr-twp{font-family:IBM Plex Sans Variable,sans-serif}:where(.pr-twp,.pr-twp *),:where(.pr-twp,.pr-twp *):after,:where(.pr-twp,.pr-twp *):before,:where(.pr-twp,.pr-twp *) ::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}:where(.pr-twp,.pr-twp *) ::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}.pr-twp{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--tw-default-font-family,ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:var(--tw-default-font-feature-settings,normal);font-variation-settings:var(--tw-default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr:where(.pr-twp,.pr-twp *){height:0;color:inherit;border-top-width:1px}abbr:where([title]):where(.pr-twp,.pr-twp *){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1:where(.pr-twp,.pr-twp *),h2:where(.pr-twp,.pr-twp *),h3:where(.pr-twp,.pr-twp *),h4:where(.pr-twp,.pr-twp *),h5:where(.pr-twp,.pr-twp *),h6:where(.pr-twp,.pr-twp *){font-size:inherit;font-weight:inherit}a:where(.pr-twp,.pr-twp *){color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b:where(.pr-twp,.pr-twp *),strong:where(.pr-twp,.pr-twp *){font-weight:bolder}code:where(.pr-twp,.pr-twp *),kbd:where(.pr-twp,.pr-twp *),samp:where(.pr-twp,.pr-twp *),pre:where(.pr-twp,.pr-twp *){font-family:var(--tw-default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);font-feature-settings:var(--tw-default-mono-font-feature-settings,normal);font-variation-settings:var(--tw-default-mono-font-variation-settings,normal);font-size:1em}small:where(.pr-twp,.pr-twp *){font-size:80%}sub:where(.pr-twp,.pr-twp *),sup:where(.pr-twp,.pr-twp *){vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub:where(.pr-twp,.pr-twp *){bottom:-.25em}sup:where(.pr-twp,.pr-twp *){top:-.5em}table:where(.pr-twp,.pr-twp *){text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring:where(.pr-twp,.pr-twp *){outline:auto}progress:where(.pr-twp,.pr-twp *){vertical-align:baseline}summary:where(.pr-twp,.pr-twp *){display:list-item}ol:where(.pr-twp,.pr-twp *),ul:where(.pr-twp,.pr-twp *),menu:where(.pr-twp,.pr-twp *){list-style:none}img:where(.pr-twp,.pr-twp *),svg:where(.pr-twp,.pr-twp *),video:where(.pr-twp,.pr-twp *),canvas:where(.pr-twp,.pr-twp *),audio:where(.pr-twp,.pr-twp *),iframe:where(.pr-twp,.pr-twp *),embed:where(.pr-twp,.pr-twp *),object:where(.pr-twp,.pr-twp *){vertical-align:middle;display:block}img:where(.pr-twp,.pr-twp *),video:where(.pr-twp,.pr-twp *){max-width:100%;height:auto}button:where(.pr-twp,.pr-twp *),input:where(.pr-twp,.pr-twp *),select:where(.pr-twp,.pr-twp *),optgroup:where(.pr-twp,.pr-twp *),textarea:where(.pr-twp,.pr-twp *){font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(.pr-twp,.pr-twp *) ::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup:where(.pr-twp,.pr-twp *){font-weight:bolder}:where(select:is([multiple],[size])) optgroup option:where(.pr-twp,.pr-twp *){padding-inline-start:20px}:where(.pr-twp,.pr-twp *) ::file-selector-button{margin-inline-end:4px}:where(.pr-twp,.pr-twp *) ::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){:where(.pr-twp,.pr-twp *) ::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){:where(.pr-twp,.pr-twp *) ::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}textarea:where(.pr-twp,.pr-twp *){resize:vertical}:where(.pr-twp,.pr-twp *) ::-webkit-search-decoration{-webkit-appearance:none}:where(.pr-twp,.pr-twp *) ::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit{display:inline-flex}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-fields-wrapper{padding:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-year-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-month-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-day-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-hour-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-minute-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-second-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-millisecond-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-meridiem-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid:where(.pr-twp,.pr-twp *){box-shadow:none}button:where(.pr-twp,.pr-twp *),input:where([type=button],[type=reset],[type=submit]):where(.pr-twp,.pr-twp *){appearance:button}:where(.pr-twp,.pr-twp *) ::file-selector-button{appearance:button}:where(.pr-twp,.pr-twp *) ::-webkit-inner-spin-button{height:auto}:where(.pr-twp,.pr-twp *) ::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])):where(.pr-twp,.pr-twp *){display:none!important}}@layer components;@layer utilities{.tw\\:\\@container\\/card-header{container:card-header/inline-size}.tw\\:\\@container\\/search{container:search/inline-size}.tw\\:\\@container\\/toolbar{container:toolbar/inline-size}.tw\\:pointer-events-auto{pointer-events:auto}.tw\\:pointer-events-none{pointer-events:none}.tw\\:invisible{visibility:hidden}.tw\\:sr-only{clip-path:inset(50%);white-space:nowrap;border-width:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}.tw\\:absolute{position:absolute}.tw\\:fixed{position:fixed}.tw\\:relative{position:relative}.tw\\:sticky{position:sticky}.tw\\:inset-0{inset:calc(calc(var(--spacing)) * 0)}.tw\\:inset-x-0{inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:inset-y-0{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:inset-s-3{inset-inline-start:calc(calc(var(--spacing)) * 3)}.tw\\:start-1\\.5{inset-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:start-1\\/2{inset-inline-start:50%}.tw\\:end-0{inset-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:end-1{inset-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:end-2{inset-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:end-3{inset-inline-end:calc(calc(var(--spacing)) * 3)}.tw\\:inset-e-0{inset-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:-top-\\[1px\\]{top:-1px}.tw\\:top-0{top:calc(calc(var(--spacing)) * 0)}.tw\\:top-1{top:calc(calc(var(--spacing)) * 1)}.tw\\:top-1\\.5{top:calc(calc(var(--spacing)) * 1.5)}.tw\\:top-1\\/2{top:50%}.tw\\:top-1\\/3{top:33.3333%}.tw\\:top-2{top:calc(calc(var(--spacing)) * 2)}.tw\\:top-2\\.5{top:calc(calc(var(--spacing)) * 2.5)}.tw\\:top-3\\.5{top:calc(calc(var(--spacing)) * 3.5)}.tw\\:top-\\[-1px\\]{top:-1px}.tw\\:top-full{top:100%}.tw\\:-right-1{right:calc(calc(var(--spacing)) * -1)}.tw\\:right-0{right:calc(calc(var(--spacing)) * 0)}.tw\\:right-1{right:calc(calc(var(--spacing)) * 1)}.tw\\:right-3{right:calc(calc(var(--spacing)) * 3)}.tw\\:bottom-0{bottom:calc(calc(var(--spacing)) * 0)}.tw\\:-left-\\[1px\\]{left:-1px}.tw\\:left-0{left:calc(calc(var(--spacing)) * 0)}.tw\\:left-1\\/2{left:50%}.tw\\:left-2{left:calc(calc(var(--spacing)) * 2)}.tw\\:left-3{left:calc(calc(var(--spacing)) * 3)}.tw\\:isolate{isolation:isolate}.tw\\:z-10{z-index:10}.tw\\:z-20{z-index:20}.tw\\:z-50{z-index:50}.tw\\:order-first{order:-9999}.tw\\:order-last{order:9999}.tw\\:col-span-1{grid-column:span 1/span 1}.tw\\:col-span-2{grid-column:span 2/span 2}.tw\\:col-span-3{grid-column:span 3/span 3}.tw\\:col-start-1{grid-column-start:1}.tw\\:col-start-2{grid-column-start:2}.tw\\:row-span-2{grid-row:span 2/span 2}.tw\\:row-start-1{grid-row-start:1}.tw\\:row-start-2{grid-row-start:2}.tw\\:m-0{margin:calc(calc(var(--spacing)) * 0)}.tw\\:m-1{margin:calc(calc(var(--spacing)) * 1)}.tw\\:m-2{margin:calc(calc(var(--spacing)) * 2)}.tw\\:-mx-1{margin-inline:calc(calc(var(--spacing)) * -1)}.tw\\:-mx-4{margin-inline:calc(calc(var(--spacing)) * -4)}.tw\\:mx-0{margin-inline:calc(calc(var(--spacing)) * 0)}.tw\\:mx-1{margin-inline:calc(calc(var(--spacing)) * 1)}.tw\\:mx-2{margin-inline:calc(calc(var(--spacing)) * 2)}.tw\\:mx-3\\.5{margin-inline:calc(calc(var(--spacing)) * 3.5)}.tw\\:mx-4{margin-inline:calc(calc(var(--spacing)) * 4)}.tw\\:mx-8{margin-inline:calc(calc(var(--spacing)) * 8)}.tw\\:my-1{margin-block:calc(calc(var(--spacing)) * 1)}.tw\\:my-2\\.5{margin-block:calc(calc(var(--spacing)) * 2.5)}.tw\\:my-4{margin-block:calc(calc(var(--spacing)) * 4)}.tw\\:my-auto{margin-block:auto}.tw\\:ms-1{margin-inline-start:calc(calc(var(--spacing)) * 1)}.tw\\:ms-2{margin-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:ms-5{margin-inline-start:calc(calc(var(--spacing)) * 5)}.tw\\:ms-6{margin-inline-start:calc(calc(var(--spacing)) * 6)}.tw\\:ms-auto{margin-inline-start:auto}.tw\\:me-1{margin-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:me-2{margin-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:prose{color:var(--tw-prose-body);max-width:65ch}.tw\\:prose :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.tw\\:prose :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-lead);margin-top:1.2em;margin-bottom:1.2em;font-size:1.25em;line-height:1.6}.tw\\:prose :where(a):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-links);font-weight:500;text-decoration:underline}.tw\\:prose :where(strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-bold);font-weight:600}.tw\\:prose :where(a strong):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(blockquote strong):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(thead th strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em;padding-inline-start:1.625em;list-style-type:decimal}.tw\\:prose :where(ol[type=A]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.tw\\:prose :where(ol[type=a]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.tw\\:prose :where(ol[type=A s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.tw\\:prose :where(ol[type=a s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.tw\\:prose :where(ol[type=I]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.tw\\:prose :where(ol[type=i]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.tw\\:prose :where(ol[type=I s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.tw\\:prose :where(ol[type=i s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.tw\\:prose :where(ol[type="1"]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:decimal}.tw\\:prose :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em;padding-inline-start:1.625em;list-style-type:disc}.tw\\:prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{color:var(--tw-prose-counters);font-weight:400}.tw\\:prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{color:var(--tw-prose-bullets)}.tw\\:prose :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.25em;font-weight:600}.tw\\:prose :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){border-color:var(--tw-prose-hr);border-top-width:1px;margin-top:3em;margin-bottom:3em}.tw\\:prose :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-quotes);border-inline-start-width:.25rem;border-inline-start-color:var(--tw-prose-quote-borders);quotes:"“""”""‘""’";margin-top:1.6em;margin-bottom:1.6em;padding-inline-start:1em;font-style:italic;font-weight:500}.tw\\:prose :where(blockquote p:first-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):before{content:open-quote}.tw\\:prose :where(blockquote p:last-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:close-quote}.tw\\:prose :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:0;margin-bottom:.888889em;font-size:2.25em;font-weight:800;line-height:1.11111}.tw\\:prose :where(h1 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:900}.tw\\:prose :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:2em;margin-bottom:1em;font-size:1.5em;font-weight:700;line-height:1.33333}.tw\\:prose :where(h2 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:800}.tw\\:prose :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.6em;margin-bottom:.6em;font-size:1.25em;font-weight:600;line-height:1.6}.tw\\:prose :where(h3 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:700}.tw\\:prose :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.5em;margin-bottom:.5em;font-weight:600;line-height:1.5}.tw\\:prose :where(h4 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:700}.tw\\:prose :where(img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em;display:block}.tw\\:prose :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-kbd);box-shadow:0 0 0 1px rgb(var(--tw-prose-kbd-shadows) / 10%), 0 3px 0 rgb(var(--tw-prose-kbd-shadows) / 10%);padding-top:.1875em;padding-inline-end:.375em;padding-bottom:.1875em;border-radius:.3125rem;padding-inline-start:.375em;font-family:inherit;font-size:.875em;font-weight:500}.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-code);font-size:.875em;font-weight:600}.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:"\`"}.tw\\:prose :where(a code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h1 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.875em}.tw\\:prose :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.9em}.tw\\:prose :where(h4 code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(blockquote code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(thead th code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-pre-code);background-color:var(--tw-prose-pre-bg);padding-top:.857143em;padding-inline-end:1.14286em;padding-bottom:.857143em;border-radius:.375rem;margin-top:1.71429em;margin-bottom:1.71429em;padding-inline-start:1.14286em;font-size:.875em;font-weight:400;line-height:1.71429;overflow-x:auto}.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)){font-weight:inherit;color:inherit;font-size:inherit;font-family:inherit;line-height:inherit;background-color:#0000;border-width:0;border-radius:0;padding:0}.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:none}.tw\\:prose :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){table-layout:auto;width:100%;margin-top:2em;margin-bottom:2em;font-size:.875em;line-height:1.71429}.tw\\:prose :where(thead):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-th-borders)}.tw\\:prose :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);vertical-align:bottom;padding-inline-end:.571429em;padding-bottom:.571429em;padding-inline-start:.571429em;font-weight:600}.tw\\:prose :where(tbody tr):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-td-borders)}.tw\\:prose :where(tbody tr:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:0}.tw\\:prose :where(tbody td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:baseline}.tw\\:prose :where(tfoot):not(:where([class~=not-prose],[class~=not-prose] *)){border-top-width:1px;border-top-color:var(--tw-prose-th-borders)}.tw\\:prose :where(tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:top}.tw\\:prose :where(th,td):not(:where([class~=not-prose],[class~=not-prose] *)){text-align:start}.tw\\:prose :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-captions);margin-top:.857143em;font-size:.875em;line-height:1.42857}.tw\\:prose{--tw-prose-body:var(--foreground);--tw-prose-headings:var(--foreground);--tw-prose-lead:var(--muted-foreground);--tw-prose-links:var(--primary);--tw-prose-bold:var(--foreground);--tw-prose-counters:var(--muted-foreground);--tw-prose-bullets:var(--muted-foreground);--tw-prose-hr:var(--border);--tw-prose-quotes:var(--foreground);--tw-prose-quote-borders:var(--border);--tw-prose-captions:var(--muted-foreground);--tw-prose-kbd:oklch(21% .034 264.665);--tw-prose-kbd-shadows:NaN NaN NaN;--tw-prose-code:var(--foreground);--tw-prose-pre-code:var(--muted-foreground);--tw-prose-pre-bg:var(--muted);--tw-prose-th-borders:var(--border);--tw-prose-td-borders:var(--border);--tw-prose-invert-body:var(--foreground);--tw-prose-invert-headings:var(--foreground);--tw-prose-invert-lead:var(--muted-foreground);--tw-prose-invert-links:var(--primary);--tw-prose-invert-bold:var(--foreground);--tw-prose-invert-counters:var(--muted-foreground);--tw-prose-invert-bullets:var(--muted-foreground);--tw-prose-invert-hr:var(--border);--tw-prose-invert-quotes:var(--foreground);--tw-prose-invert-quote-borders:var(--border);--tw-prose-invert-captions:var(--muted-foreground);--tw-prose-invert-kbd:#fff;--tw-prose-invert-kbd-shadows:255 255 255;--tw-prose-invert-code:var(--foreground);--tw-prose-invert-pre-code:var(--muted-foreground);--tw-prose-invert-pre-bg:var(--muted);--tw-prose-invert-th-borders:var(--border);--tw-prose-invert-td-borders:var(--border);font-size:1rem;line-height:1.75}.tw\\:prose :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;margin-bottom:.5em}.tw\\:prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:.375em}.tw\\:prose :where(.tw\\:prose>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.tw\\:prose :where(.tw\\:prose>ul>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.tw\\:prose :where(.tw\\:prose>ul>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.tw\\:prose :where(.tw\\:prose>ol>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.tw\\:prose :where(.tw\\:prose>ol>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.tw\\:prose :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.tw\\:prose :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.tw\\:prose :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;padding-inline-start:1.625em}.tw\\:prose :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.571429em;padding-inline-end:.571429em;padding-bottom:.571429em;padding-inline-start:.571429em}.tw\\:prose :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(.tw\\:prose>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose :where(.tw\\:prose>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.tw\\:prose-sm{font-size:.875rem;line-height:1.71429}.tw\\:prose-sm :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em}.tw\\:prose-sm :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.888889em;margin-bottom:.888889em;font-size:1.28571em;line-height:1.55556}.tw\\:prose-sm :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.33333em;margin-bottom:1.33333em;padding-inline-start:1.11111em}.tw\\:prose-sm :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:.8em;font-size:2.14286em;line-height:1.2}.tw\\:prose-sm :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.6em;margin-bottom:.8em;font-size:1.42857em;line-height:1.4}.tw\\:prose-sm :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.55556em;margin-bottom:.444444em;font-size:1.28571em;line-height:1.55556}.tw\\:prose-sm :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.42857em;margin-bottom:.571429em;line-height:1.42857}.tw\\:prose-sm :where(img):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose-sm :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.142857em;padding-inline-end:.357143em;padding-bottom:.142857em;border-radius:.3125rem;padding-inline-start:.357143em;font-size:.857143em}.tw\\:prose-sm :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.857143em}.tw\\:prose-sm :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.9em}.tw\\:prose-sm :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.888889em}.tw\\:prose-sm :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.666667em;padding-inline-end:1em;padding-bottom:.666667em;border-radius:.25rem;margin-top:1.66667em;margin-bottom:1.66667em;padding-inline-start:1em;font-size:.857143em;line-height:1.66667}.tw\\:prose-sm :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em;padding-inline-start:1.57143em}.tw\\:prose-sm :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.285714em;margin-bottom:.285714em}.tw\\:prose-sm :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:.428571em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.571429em;margin-bottom:.571429em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ol>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ol>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.14286em}.tw\\:prose-sm :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.571429em;margin-bottom:.571429em}.tw\\:prose-sm :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em}.tw\\:prose-sm :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.285714em;padding-inline-start:1.57143em}.tw\\:prose-sm :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2.85714em;margin-bottom:2.85714em}.tw\\:prose-sm :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose-sm :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.857143em;line-height:1.5}.tw\\:prose-sm :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:1em;padding-bottom:.666667em;padding-inline-start:1em}.tw\\:prose-sm :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose-sm :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose-sm :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.666667em;padding-inline-end:1em;padding-bottom:.666667em;padding-inline-start:1em}.tw\\:prose-sm :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose-sm :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose-sm :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose-sm :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.666667em;font-size:.857143em;line-height:1.33333}.tw\\:prose-sm :where(.tw\\:prose-sm>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose-sm :where(.tw\\:prose-sm>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.tw\\:-mt-4{margin-top:calc(calc(var(--spacing)) * -4)}.tw\\:mt-0\\.5{margin-top:calc(calc(var(--spacing)) * .5)}.tw\\:mt-1{margin-top:calc(calc(var(--spacing)) * 1)}.tw\\:mt-2{margin-top:calc(calc(var(--spacing)) * 2)}.tw\\:mt-3{margin-top:calc(calc(var(--spacing)) * 3)}.tw\\:mt-4{margin-top:calc(calc(var(--spacing)) * 4)}.tw\\:mt-6{margin-top:calc(calc(var(--spacing)) * 6)}.tw\\:mt-auto{margin-top:auto}.tw\\:mr-1{margin-right:calc(calc(var(--spacing)) * 1)}.tw\\:mr-2{margin-right:calc(calc(var(--spacing)) * 2)}.tw\\:mr-3{margin-right:calc(calc(var(--spacing)) * 3)}.tw\\:-mb-4{margin-bottom:calc(calc(var(--spacing)) * -4)}.tw\\:mb-1{margin-bottom:calc(calc(var(--spacing)) * 1)}.tw\\:mb-2{margin-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:mb-3{margin-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:mb-4{margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:ml-1{margin-left:calc(calc(var(--spacing)) * 1)}.tw\\:ml-2{margin-left:calc(calc(var(--spacing)) * 2)}.tw\\:ml-4{margin-left:calc(calc(var(--spacing)) * 4)}.tw\\:ml-auto{margin-left:auto}.tw\\:box-border{box-sizing:border-box}.tw\\:line-clamp-3{-webkit-line-clamp:3;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}.tw\\:no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}.tw\\:no-scrollbar::-webkit-scrollbar{display:none}.tw\\:block{display:block}.tw\\:flex{display:flex}.tw\\:grid{display:grid}.tw\\:hidden{display:none}.tw\\:inline-block{display:inline-block}.tw\\:inline-flex{display:inline-flex}.tw\\:inline-grid{display:inline-grid}.tw\\:field-sizing-content{field-sizing:content}.tw\\:aspect-square{aspect-ratio:1}.tw\\:size-2{width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:size-2\\.5{width:calc(calc(var(--spacing)) * 2.5);height:calc(calc(var(--spacing)) * 2.5)}.tw\\:size-3{width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:size-3\\.5{width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:size-4{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:size-5{width:calc(calc(var(--spacing)) * 5);height:calc(calc(var(--spacing)) * 5)}.tw\\:size-6{width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:size-7{width:calc(calc(var(--spacing)) * 7);height:calc(calc(var(--spacing)) * 7)}.tw\\:size-8{width:calc(calc(var(--spacing)) * 8);height:calc(calc(var(--spacing)) * 8)}.tw\\:size-9{width:calc(calc(var(--spacing)) * 9);height:calc(calc(var(--spacing)) * 9)}.tw\\:size-10{width:calc(calc(var(--spacing)) * 10);height:calc(calc(var(--spacing)) * 10)}.tw\\:size-full{width:100%;height:100%}.tw\\:h-1{height:calc(calc(var(--spacing)) * 1)}.tw\\:h-2{height:calc(calc(var(--spacing)) * 2)}.tw\\:h-3{height:calc(calc(var(--spacing)) * 3)}.tw\\:h-3\\.5{height:calc(calc(var(--spacing)) * 3.5)}.tw\\:h-4{height:calc(calc(var(--spacing)) * 4)}.tw\\:h-5{height:calc(calc(var(--spacing)) * 5)}.tw\\:h-6{height:calc(calc(var(--spacing)) * 6)}.tw\\:h-7{height:calc(calc(var(--spacing)) * 7)}.tw\\:h-8{height:calc(calc(var(--spacing)) * 8)}.tw\\:h-8\\!{height:calc(calc(var(--spacing)) * 8)!important}.tw\\:h-8\\.5{height:calc(calc(var(--spacing)) * 8.5)}.tw\\:h-9{height:calc(calc(var(--spacing)) * 9)}.tw\\:h-10{height:calc(calc(var(--spacing)) * 10)}.tw\\:h-12{height:calc(calc(var(--spacing)) * 12)}.tw\\:h-14{height:calc(calc(var(--spacing)) * 14)}.tw\\:h-20{height:calc(calc(var(--spacing)) * 20)}.tw\\:h-24{height:calc(calc(var(--spacing)) * 24)}.tw\\:h-32{height:calc(calc(var(--spacing)) * 32)}.tw\\:h-40{height:calc(calc(var(--spacing)) * 40)}.tw\\:h-64{height:calc(calc(var(--spacing)) * 64)}.tw\\:h-80{height:calc(calc(var(--spacing)) * 80)}.tw\\:h-96{height:calc(calc(var(--spacing)) * 96)}.tw\\:h-\\[5px\\]{height:5px}.tw\\:h-\\[260px\\]{height:260px}.tw\\:h-\\[300px\\]{height:300px}.tw\\:h-\\[400px\\]{height:400px}.tw\\:h-\\[600px\\]{height:600px}.tw\\:h-\\[calc\\(100\\%-1px\\)\\]{height:calc(100% - 1px)}.tw\\:h-\\[calc\\(100\\%-2px\\)\\]{height:calc(100% - 2px)}.tw\\:h-auto{height:auto}.tw\\:h-full{height:100%}.tw\\:h-px{height:1px}.tw\\:h-screen{height:100vh}.tw\\:h-svh{height:100svh}.tw\\:max-h-\\(--radix-context-menu-content-available-height\\){max-height:var(--radix-context-menu-content-available-height)}.tw\\:max-h-\\(--radix-dropdown-menu-content-available-height\\){max-height:var(--radix-dropdown-menu-content-available-height)}.tw\\:max-h-\\(--radix-popover-content-available-height\\){max-height:var(--radix-popover-content-available-height)}.tw\\:max-h-\\(--radix-select-content-available-height\\){max-height:var(--radix-select-content-available-height)}.tw\\:max-h-4{max-height:calc(calc(var(--spacing)) * 4)}.tw\\:max-h-10{max-height:calc(calc(var(--spacing)) * 10)}.tw\\:max-h-72{max-height:calc(calc(var(--spacing)) * 72)}.tw\\:max-h-80{max-height:calc(calc(var(--spacing)) * 80)}.tw\\:max-h-\\[96\\%\\]{max-height:96%}.tw\\:max-h-\\[300px\\]{max-height:300px}.tw\\:min-h-0{min-height:calc(calc(var(--spacing)) * 0)}.tw\\:min-h-11{min-height:calc(calc(var(--spacing)) * 11)}.tw\\:min-h-16{min-height:calc(calc(var(--spacing)) * 16)}.tw\\:min-h-\\[200px\\]{min-height:200px}.tw\\:min-h-full{min-height:100%}.tw\\:min-h-svh{min-height:100svh}.tw\\:w-\\(--radix-dropdown-menu-trigger-width\\){width:var(--radix-dropdown-menu-trigger-width)}.tw\\:w-\\(--sidebar-width\\){width:var(--sidebar-width)}.tw\\:w-1{width:calc(calc(var(--spacing)) * 1)}.tw\\:w-1\\/2{width:50%}.tw\\:w-1\\/4{width:25%}.tw\\:w-1\\/6{width:16.6667%}.tw\\:w-2{width:calc(calc(var(--spacing)) * 2)}.tw\\:w-3{width:calc(calc(var(--spacing)) * 3)}.tw\\:w-3\\.5{width:calc(calc(var(--spacing)) * 3.5)}.tw\\:w-3\\/4{width:75%}.tw\\:w-4{width:calc(calc(var(--spacing)) * 4)}.tw\\:w-4\\/5{width:80%}.tw\\:w-4\\/6{width:66.6667%}.tw\\:w-5{width:calc(calc(var(--spacing)) * 5)}.tw\\:w-5\\/6{width:83.3333%}.tw\\:w-6{width:calc(calc(var(--spacing)) * 6)}.tw\\:w-7{width:calc(calc(var(--spacing)) * 7)}.tw\\:w-8{width:calc(calc(var(--spacing)) * 8)}.tw\\:w-9{width:calc(calc(var(--spacing)) * 9)}.tw\\:w-9\\/12{width:75%}.tw\\:w-10{width:calc(calc(var(--spacing)) * 10)}.tw\\:w-12{width:calc(calc(var(--spacing)) * 12)}.tw\\:w-14{width:calc(calc(var(--spacing)) * 14)}.tw\\:w-20{width:calc(calc(var(--spacing)) * 20)}.tw\\:w-24{width:calc(calc(var(--spacing)) * 24)}.tw\\:w-32{width:calc(calc(var(--spacing)) * 32)}.tw\\:w-48{width:calc(calc(var(--spacing)) * 48)}.tw\\:w-56{width:calc(calc(var(--spacing)) * 56)}.tw\\:w-60{width:calc(calc(var(--spacing)) * 60)}.tw\\:w-64{width:calc(calc(var(--spacing)) * 64)}.tw\\:w-72{width:calc(calc(var(--spacing)) * 72)}.tw\\:w-80{width:calc(calc(var(--spacing)) * 80)}.tw\\:w-96{width:calc(calc(var(--spacing)) * 96)}.tw\\:w-\\[1px\\]{width:1px}.tw\\:w-\\[5px\\]{width:5px}.tw\\:w-\\[70px\\]{width:70px}.tw\\:w-\\[100px\\]{width:100px}.tw\\:w-\\[116px\\]{width:116px}.tw\\:w-\\[124px\\]{width:124px}.tw\\:w-\\[150px\\]{width:150px}.tw\\:w-\\[180px\\]{width:180px}.tw\\:w-\\[200px\\]{width:200px}.tw\\:w-\\[250px\\]{width:250px}.tw\\:w-\\[260px\\]{width:260px}.tw\\:w-\\[270px\\]{width:270px}.tw\\:w-\\[280px\\]{width:280px}.tw\\:w-\\[300px\\]{width:300px}.tw\\:w-\\[320px\\]{width:320px}.tw\\:w-\\[350px\\]{width:350px}.tw\\:w-\\[380px\\]{width:380px}.tw\\:w-\\[400px\\]{width:400px}.tw\\:w-\\[420px\\]{width:420px}.tw\\:w-\\[500px\\]{width:500px}.tw\\:w-\\[560px\\]{width:560px}.tw\\:w-\\[600px\\]{width:600px}.tw\\:w-\\[700px\\]{width:700px}.tw\\:w-\\[calc\\(100\\%-2px\\)\\]{width:calc(100% - 2px)}.tw\\:w-\\[var\\(--radix-dropdown-menu-trigger-width\\)\\]{width:var(--radix-dropdown-menu-trigger-width)}.tw\\:w-auto{width:auto}.tw\\:w-fit{width:fit-content}.tw\\:w-full{width:100%}.tw\\:w-max{width:max-content}.tw\\:w-px{width:1px}.tw\\:max-w-\\(--skeleton-width\\){max-width:var(--skeleton-width)}.tw\\:max-w-0{max-width:calc(calc(var(--spacing)) * 0)}.tw\\:max-w-2xl{max-width:var(--tw-container-2xl)}.tw\\:max-w-3xl{max-width:var(--tw-container-3xl)}.tw\\:max-w-4{max-width:calc(calc(var(--spacing)) * 4)}.tw\\:max-w-4xl{max-width:var(--tw-container-4xl)}.tw\\:max-w-6xl{max-width:var(--tw-container-6xl)}.tw\\:max-w-40{max-width:calc(calc(var(--spacing)) * 40)}.tw\\:max-w-48{max-width:calc(calc(var(--spacing)) * 48)}.tw\\:max-w-64{max-width:calc(calc(var(--spacing)) * 64)}.tw\\:max-w-96{max-width:calc(calc(var(--spacing)) * 96)}.tw\\:max-w-\\[200px\\]{max-width:200px}.tw\\:max-w-\\[220px\\]{max-width:220px}.tw\\:max-w-\\[600px\\]{max-width:600px}.tw\\:max-w-\\[calc\\(100\\%-2rem\\)\\]{max-width:calc(100% - 2rem)}.tw\\:max-w-\\[calc\\(100vw-2rem\\)\\]{max-width:calc(100vw - 2rem)}.tw\\:max-w-fit{max-width:fit-content}.tw\\:max-w-full{max-width:100%}.tw\\:max-w-lg{max-width:var(--tw-container-lg)}.tw\\:max-w-md{max-width:var(--tw-container-md)}.tw\\:max-w-none{max-width:none}.tw\\:max-w-sm{max-width:var(--tw-container-sm)}.tw\\:max-w-xs{max-width:var(--tw-container-xs)}.tw\\:min-w-0{min-width:calc(calc(var(--spacing)) * 0)}.tw\\:min-w-4{min-width:calc(calc(var(--spacing)) * 4)}.tw\\:min-w-5{min-width:calc(calc(var(--spacing)) * 5)}.tw\\:min-w-7{min-width:calc(calc(var(--spacing)) * 7)}.tw\\:min-w-8{min-width:calc(calc(var(--spacing)) * 8)}.tw\\:min-w-9{min-width:calc(calc(var(--spacing)) * 9)}.tw\\:min-w-16{min-width:calc(calc(var(--spacing)) * 16)}.tw\\:min-w-32{min-width:calc(calc(var(--spacing)) * 32)}.tw\\:min-w-36{min-width:calc(calc(var(--spacing)) * 36)}.tw\\:min-w-80{min-width:calc(calc(var(--spacing)) * 80)}.tw\\:min-w-\\[12rem\\]{min-width:12rem}.tw\\:min-w-\\[26px\\]{min-width:26px}.tw\\:min-w-\\[96px\\]{min-width:96px}.tw\\:min-w-\\[140px\\]{min-width:140px}.tw\\:min-w-\\[215px\\]{min-width:215px}.tw\\:min-w-\\[500px\\]{min-width:500px}.tw\\:min-w-min{min-width:min-content}.tw\\:flex-1{flex:1}.tw\\:shrink{flex-shrink:1}.tw\\:shrink\\!{flex-shrink:1!important}.tw\\:shrink-0{flex-shrink:0}.tw\\:shrink-\\[9999\\]{flex-shrink:9999}.tw\\:flex-grow,.tw\\:grow,.tw\\:grow-\\[1\\]{flex-grow:1}.tw\\:grow-\\[10\\]{flex-grow:10}.tw\\:basis-0{flex-basis:calc(calc(var(--spacing)) * 0)}.tw\\:table-fixed{table-layout:fixed}.tw\\:caption-bottom{caption-side:bottom}.tw\\:border-collapse{border-collapse:collapse}.tw\\:origin-\\(--radix-context-menu-content-transform-origin\\){transform-origin:var(--radix-context-menu-content-transform-origin)}.tw\\:origin-\\(--radix-dropdown-menu-content-transform-origin\\){transform-origin:var(--radix-dropdown-menu-content-transform-origin)}.tw\\:origin-\\(--radix-menubar-content-transform-origin\\){transform-origin:var(--radix-menubar-content-transform-origin)}.tw\\:origin-\\(--radix-popover-content-transform-origin\\){transform-origin:var(--radix-popover-content-transform-origin)}.tw\\:origin-\\(--radix-select-content-transform-origin\\){transform-origin:var(--radix-select-content-transform-origin)}.tw\\:origin-\\(--radix-tooltip-content-transform-origin\\){transform-origin:var(--radix-tooltip-content-transform-origin)}.tw\\:-translate-x-1\\/2{--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:-translate-x-px{--tw-translate-x:-1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-x-px{--tw-translate-x:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:-translate-y-1\\/2{--tw-translate-y:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-y-0{--tw-translate-y:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-y-px{--tw-translate-y:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rotate-45{rotate:45deg}.tw\\:rotate-180{rotate:180deg}.tw\\:transform{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.tw\\:animate-none\\!{animation:none!important}.tw\\:animate-pulse{animation:var(--tw-animate-pulse)}.tw\\:animate-spin{animation:var(--tw-animate-spin)}.tw\\:cursor-default{cursor:default}.tw\\:cursor-ew-resize{cursor:ew-resize}.tw\\:cursor-not-allowed{cursor:not-allowed}.tw\\:cursor-pointer{cursor:pointer}.tw\\:cursor-text{cursor:text}.tw\\:touch-none{touch-action:none}.tw\\:resize{resize:both}.tw\\:resize-none{resize:none}.tw\\:scroll-m-20{scroll-margin:calc(calc(var(--spacing)) * 20)}.tw\\:scroll-my-1{scroll-margin-block:calc(calc(var(--spacing)) * 1)}.tw\\:scroll-py-1{scroll-padding-block:calc(calc(var(--spacing)) * 1)}.tw\\:list-inside{list-style-position:inside}.tw\\:list-outside{list-style-position:outside}.tw\\:\\!list-\\[lower-alpha\\]{list-style-type:lower-alpha!important}.tw\\:\\!list-\\[lower-roman\\]{list-style-type:lower-roman!important}.tw\\:\\!list-\\[upper-alpha\\]{list-style-type:upper-alpha!important}.tw\\:\\!list-\\[upper-roman\\]{list-style-type:upper-roman!important}.tw\\:\\!list-decimal{list-style-type:decimal!important}.tw\\:\\!list-disc{list-style-type:disc!important}.tw\\:list-decimal{list-style-type:decimal}.tw\\:list-disc{list-style-type:disc}.tw\\:list-none{list-style-type:none}.tw\\:grid-flow-col{grid-auto-flow:column}.tw\\:grid-flow-row{grid-auto-flow:row}.tw\\:auto-rows-min{grid-auto-rows:min-content}.tw\\:grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.tw\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.tw\\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.tw\\:grid-cols-\\[25\\%_25\\%_50\\%\\]{grid-template-columns:25% 25% 50%}.tw\\:grid-cols-\\[25\\%_50\\%_25\\%\\]{grid-template-columns:25% 50% 25%}.tw\\:grid-cols-\\[auto_auto_auto_auto\\]{grid-template-columns:auto auto auto auto}.tw\\:grid-cols-\\[min-content_1fr\\]{grid-template-columns:min-content 1fr}.tw\\:grid-cols-subgrid{grid-template-columns:subgrid}.tw\\:flex-col{flex-direction:column}.tw\\:flex-col-reverse{flex-direction:column-reverse}.tw\\:flex-row{flex-direction:row}.tw\\:flex-row-reverse{flex-direction:row-reverse}.tw\\:flex-nowrap{flex-wrap:nowrap}.tw\\:flex-wrap{flex-wrap:wrap}.tw\\:place-content-center{place-content:center}.tw\\:content-center{align-content:center}.tw\\:items-baseline{align-items:baseline}.tw\\:items-center{align-items:center}.tw\\:items-end{align-items:flex-end}.tw\\:items-start{align-items:flex-start}.tw\\:items-stretch{align-items:stretch}.tw\\:justify-between{justify-content:space-between}.tw\\:justify-center{justify-content:center}.tw\\:justify-end{justify-content:flex-end}.tw\\:justify-start{justify-content:flex-start}.tw\\:gap-0{gap:calc(calc(var(--spacing)) * 0)}.tw\\:gap-0\\.5{gap:calc(calc(var(--spacing)) * .5)}.tw\\:gap-1{gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-1\\.5{gap:calc(calc(var(--spacing)) * 1.5)}.tw\\:gap-1\\.5\\!{gap:calc(calc(var(--spacing)) * 1.5)!important}.tw\\:gap-2{gap:calc(calc(var(--spacing)) * 2)}.tw\\:gap-2\\.5{gap:calc(calc(var(--spacing)) * 2.5)}.tw\\:gap-3{gap:calc(calc(var(--spacing)) * 3)}.tw\\:gap-4{gap:calc(calc(var(--spacing)) * 4)}.tw\\:gap-5{gap:calc(calc(var(--spacing)) * 5)}.tw\\:gap-6{gap:calc(calc(var(--spacing)) * 6)}.tw\\:gap-8{gap:calc(calc(var(--spacing)) * 8)}.tw\\:gap-16{gap:calc(calc(var(--spacing)) * 16)}.tw\\:gap-\\[--spacing\\(var\\(--gap\\)\\)\\]{gap:calc(calc(var(--spacing)) * var(--gap))}.tw\\:gap-\\[12px\\]{gap:12px}:where(.tw\\:space-y-1>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 1) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 1) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-1\\.5>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 1.5) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 1.5) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-2>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 2) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 2) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-3>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 3) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 3) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-4>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 4) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 4) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-6>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 6) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 6) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-8>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 8) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 8) * calc(1 - var(--tw-space-y-reverse)))}.tw\\:gap-x-1{column-gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-x-2{column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:gap-x-3{column-gap:calc(calc(var(--spacing)) * 3)}.tw\\:gap-x-4{column-gap:calc(calc(var(--spacing)) * 4)}:where(.tw\\:-space-x-2>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * -2) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * -2) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-2>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 2) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 2) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-3>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 3) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 3) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-4>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 4) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 4) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-6>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 6) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 6) * calc(1 - var(--tw-space-x-reverse)))}.tw\\:gap-y-1{row-gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-y-2{row-gap:calc(calc(var(--spacing)) * 2)}:where(.tw\\:divide-x>:not(:last-child)){--tw-divide-x-reverse:0;border-inline-style:var(--tw-border-style);border-inline-start-width:calc(1px * var(--tw-divide-x-reverse));border-inline-end-width:calc(1px * calc(1 - var(--tw-divide-x-reverse)))}:where(.tw\\:divide-y>:not(:last-child)){--tw-divide-y-reverse:0;border-bottom-style:var(--tw-border-style);border-top-style:var(--tw-border-style);border-top-width:calc(1px * var(--tw-divide-y-reverse));border-bottom-width:calc(1px * calc(1 - var(--tw-divide-y-reverse)))}.tw\\:self-start{align-self:flex-start}.tw\\:self-stretch{align-self:stretch}.tw\\:justify-self-end{justify-self:flex-end}.tw\\:truncate{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.tw\\:overflow-auto{overflow:auto}.tw\\:overflow-clip{overflow:clip}.tw\\:overflow-hidden{overflow:hidden}.tw\\:overflow-scroll{overflow:scroll}.tw\\:overflow-visible{overflow:visible}.tw\\:overflow-x-auto{overflow-x:auto}.tw\\:overflow-x-hidden{overflow-x:hidden}.tw\\:overflow-y-auto{overflow-y:auto}.tw\\:overflow-y-hidden{overflow-y:hidden}.tw\\:rounded{border-radius:.25rem}.tw\\:rounded-2xl{border-radius:calc(var(--radius) * 1.8)}.tw\\:rounded-4xl{border-radius:calc(var(--radius) * 2.6)}.tw\\:rounded-\\[4px\\]{border-radius:4px}.tw\\:rounded-\\[6px\\]{border-radius:6px}.tw\\:rounded-\\[calc\\(var\\(--radius\\)-3px\\)\\]{border-radius:calc(var(--radius) - 3px)}.tw\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,10px\\)\\]{border-radius:min(var(--tw-radius-md), 10px)}.tw\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,12px\\)\\]{border-radius:min(var(--tw-radius-md), 12px)}.tw\\:rounded-full{border-radius:3.40282e38px}.tw\\:rounded-lg{border-radius:var(--radius)}.tw\\:rounded-lg\\!{border-radius:var(--radius)!important}.tw\\:rounded-md{border-radius:calc(var(--radius) * .8)}.tw\\:rounded-none{border-radius:0}.tw\\:rounded-sm{border-radius:calc(var(--radius) * .6)}.tw\\:rounded-xl{border-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-xl\\!{border-radius:calc(var(--radius) * 1.4)!important}.tw\\:rounded-xs{border-radius:var(--tw-radius-xs)}.tw\\:rounded-s-none{border-start-start-radius:0;border-end-start-radius:0}.tw\\:rounded-e-none{border-start-end-radius:0;border-end-end-radius:0}.tw\\:rounded-t-xl{border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-l-lg{border-top-left-radius:var(--radius);border-bottom-left-radius:var(--radius)}.tw\\:rounded-r-xl{border-top-right-radius:calc(var(--radius) * 1.4);border-bottom-right-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-b-xl{border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:border{border-style:var(--tw-border-style);border-width:1px}.tw\\:border-0{border-style:var(--tw-border-style);border-width:0}.tw\\:border-2{border-style:var(--tw-border-style);border-width:2px}.tw\\:border-s{border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:border-s-0{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:border-s-2{border-inline-start-style:var(--tw-border-style);border-inline-start-width:2px}.tw\\:border-s-4{border-inline-start-style:var(--tw-border-style);border-inline-start-width:4px}.tw\\:border-e{border-inline-end-style:var(--tw-border-style);border-inline-end-width:1px}.tw\\:border-e-0{border-inline-end-style:var(--tw-border-style);border-inline-end-width:0}.tw\\:border-t{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:border-t-0{border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:border-b{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.tw\\:border-b-0{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.tw\\:border-l-2{border-left-style:var(--tw-border-style);border-left-width:2px}.tw\\:border-l-4{border-left-style:var(--tw-border-style);border-left-width:4px}.tw\\:border-dashed{--tw-border-style:dashed;border-style:dashed}.tw\\:border-none{--tw-border-style:none;border-style:none}.tw\\:border-solid{--tw-border-style:solid;border-style:solid}.tw\\:border-black{border-color:var(--tw-color-black)}.tw\\:border-blue-400{border-color:var(--tw-color-blue-400)}.tw\\:border-blue-500{border-color:var(--tw-color-blue-500)}.tw\\:border-border,.tw\\:border-border\\/50{border-color:var(--border)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-border\\/50{border-color:color-mix(in oklab, var(--border) 50%, transparent)}}.tw\\:border-destructive{border-color:var(--destructive)}.tw\\:border-foreground{border-color:var(--foreground)}.tw\\:border-gray-300{border-color:var(--tw-color-gray-300)}.tw\\:border-input,.tw\\:border-input\\/30{border-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-input\\/30{border-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:border-muted-foreground,.tw\\:border-muted-foreground\\/40{border-color:var(--muted-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-muted-foreground\\/40{border-color:color-mix(in oklab, var(--muted-foreground) 40%, transparent)}}.tw\\:border-primary{border-color:var(--primary)}.tw\\:border-red-300{border-color:var(--tw-color-red-300)}.tw\\:border-red-400{border-color:var(--tw-color-red-400)}.tw\\:border-red-500{border-color:var(--tw-color-red-500)}.tw\\:border-red-600{border-color:var(--tw-color-red-600)}.tw\\:border-ring{border-color:var(--ring)}.tw\\:border-sidebar-border{border-color:var(--sidebar-border)}.tw\\:border-slate-300{border-color:var(--tw-color-slate-300)}.tw\\:border-transparent{border-color:#0000}.tw\\:border-yellow-400{border-color:var(--tw-color-yellow-400)}.tw\\:border-yellow-500{border-color:var(--tw-color-yellow-500)}.tw\\:border-s-amber-200{border-inline-start-color:var(--tw-color-amber-200)}.tw\\:border-s-indigo-200{border-inline-start-color:var(--tw-color-indigo-200)}.tw\\:border-s-purple-200{border-inline-start-color:var(--tw-color-purple-200)}.tw\\:border-s-red-200{border-inline-start-color:var(--tw-color-red-200)}.tw\\:\\!bg-destructive\\/50{background-color:var(--destructive)!important}@supports (color:color-mix(in lab, red, red)){.tw\\:\\!bg-destructive\\/50{background-color:color-mix(in oklab, var(--destructive) 50%, transparent)!important}}.tw\\:bg-\\[color-mix\\(in_oklab\\,var\\(--destructive\\)_10\\%\\,var\\(--background\\)\\)\\]{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-\\[color-mix\\(in_oklab\\,var\\(--destructive\\)_10\\%\\,var\\(--background\\)\\)\\]{background-color:color-mix(in oklab,var(--destructive) 10%,var(--background))}}.tw\\:bg-accent,.tw\\:bg-accent\\/50{background-color:var(--accent)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-accent\\/50{background-color:color-mix(in oklab, var(--accent) 50%, transparent)}}.tw\\:bg-amber-500,.tw\\:bg-amber-500\\/5{background-color:var(--tw-color-amber-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-amber-500\\/5{background-color:color-mix(in oklab, var(--tw-color-amber-500) 5%, transparent)}}.tw\\:bg-amber-500\\/15{background-color:var(--tw-color-amber-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-amber-500\\/15{background-color:color-mix(in oklab, var(--tw-color-amber-500) 15%, transparent)}}.tw\\:bg-background,.tw\\:bg-background\\/50{background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-background\\/50{background-color:color-mix(in oklab, var(--background) 50%, transparent)}}.tw\\:bg-black\\/10{background-color:var(--tw-color-black)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-black\\/10{background-color:color-mix(in oklab, var(--tw-color-black) 10%, transparent)}}.tw\\:bg-blue-50{background-color:var(--tw-color-blue-50)}.tw\\:bg-blue-100{background-color:var(--tw-color-blue-100)}.tw\\:bg-blue-400{background-color:var(--tw-color-blue-400)}.tw\\:bg-blue-500{background-color:var(--tw-color-blue-500)}.tw\\:bg-border{background-color:var(--border)}.tw\\:bg-card{background-color:var(--card)}.tw\\:bg-destructive\\/10{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-destructive\\/10{background-color:color-mix(in oklab, var(--destructive) 10%, transparent)}}.tw\\:bg-foreground{background-color:var(--foreground)}.tw\\:bg-gray-50{background-color:var(--tw-color-gray-50)}.tw\\:bg-gray-100{background-color:var(--tw-color-gray-100)}.tw\\:bg-gray-500{background-color:var(--tw-color-gray-500)}.tw\\:bg-green-50{background-color:var(--tw-color-green-50)}.tw\\:bg-green-100{background-color:var(--tw-color-green-100)}.tw\\:bg-green-500{background-color:var(--tw-color-green-500)}.tw\\:bg-input,.tw\\:bg-input\\/30{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-input\\/30{background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:bg-muted,.tw\\:bg-muted\\/50{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-muted\\/50{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:bg-neutral-300{background-color:var(--tw-color-neutral-300)}.tw\\:bg-orange-100{background-color:var(--tw-color-orange-100)}.tw\\:bg-popover,.tw\\:bg-popover\\/70{background-color:var(--popover)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-popover\\/70{background-color:color-mix(in oklab, var(--popover) 70%, transparent)}}.tw\\:bg-primary{background-color:var(--primary)}.tw\\:bg-primary-foreground{background-color:var(--primary-foreground)}.tw\\:bg-primary\\/30{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-primary\\/30{background-color:color-mix(in oklab, var(--primary) 30%, transparent)}}.tw\\:bg-purple-50{background-color:var(--tw-color-purple-50)}.tw\\:bg-red-100{background-color:var(--tw-color-red-100)}.tw\\:bg-red-500{background-color:var(--tw-color-red-500)}.tw\\:bg-rose-500,.tw\\:bg-rose-500\\/5{background-color:var(--tw-color-rose-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-rose-500\\/5{background-color:color-mix(in oklab, var(--tw-color-rose-500) 5%, transparent)}}.tw\\:bg-rose-500\\/15{background-color:var(--tw-color-rose-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-rose-500\\/15{background-color:color-mix(in oklab, var(--tw-color-rose-500) 15%, transparent)}}.tw\\:bg-secondary{background-color:var(--secondary)}.tw\\:bg-sidebar{background-color:var(--sidebar)}.tw\\:bg-sidebar-accent{background-color:var(--sidebar-accent)}.tw\\:bg-sidebar-border{background-color:var(--sidebar-border)}.tw\\:bg-sky-500,.tw\\:bg-sky-500\\/5{background-color:var(--tw-color-sky-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-sky-500\\/5{background-color:color-mix(in oklab, var(--tw-color-sky-500) 5%, transparent)}}.tw\\:bg-sky-500\\/15{background-color:var(--tw-color-sky-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-sky-500\\/15{background-color:color-mix(in oklab, var(--tw-color-sky-500) 15%, transparent)}}.tw\\:bg-teal-500,.tw\\:bg-teal-500\\/5{background-color:var(--tw-color-teal-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-teal-500\\/5{background-color:color-mix(in oklab, var(--tw-color-teal-500) 5%, transparent)}}.tw\\:bg-teal-500\\/15{background-color:var(--tw-color-teal-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-teal-500\\/15{background-color:color-mix(in oklab, var(--tw-color-teal-500) 15%, transparent)}}.tw\\:bg-transparent{background-color:#0000}.tw\\:bg-warning\\/15{background-color:var(--warning)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-warning\\/15{background-color:color-mix(in oklab, var(--warning) 15%, transparent)}}.tw\\:bg-white{background-color:var(--tw-color-white)}.tw\\:bg-yellow-50{background-color:var(--tw-color-yellow-50)}.tw\\:bg-yellow-100{background-color:var(--tw-color-yellow-100)}.tw\\:bg-yellow-500{background-color:var(--tw-color-yellow-500)}.tw\\:bg-zinc-400{background-color:var(--tw-color-zinc-400)}.tw\\:bg-gradient-to-t{--tw-gradient-position:to top in oklab;background-image:linear-gradient(var(--tw-gradient-stops))}.tw\\:from-popover{--tw-gradient-from:var(--popover);--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))}.tw\\:to-transparent{--tw-gradient-to:transparent;--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))}.tw\\:bg-clip-padding{background-clip:padding-box}.tw\\:fill-\\[color-mix\\(in_oklab\\,var\\(--destructive\\)_10\\%\\,var\\(--background\\)\\)\\]{fill:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:fill-\\[color-mix\\(in_oklab\\,var\\(--destructive\\)_10\\%\\,var\\(--background\\)\\)\\]{fill:color-mix(in oklab,var(--destructive) 10%,var(--background))}}.tw\\:fill-foreground{fill:var(--foreground)}.tw\\:fill-yellow-400,.tw\\:fill-yellow-400\\/50{fill:var(--tw-color-yellow-400)}@supports (color:color-mix(in lab, red, red)){.tw\\:fill-yellow-400\\/50{fill:color-mix(in oklab, var(--tw-color-yellow-400) 50%, transparent)}}.tw\\:object-cover{object-fit:cover}.tw\\:\\!p-4{padding:calc(calc(var(--spacing)) * 4)!important}.tw\\:p-0{padding:calc(calc(var(--spacing)) * 0)}.tw\\:p-0\\.5{padding:calc(calc(var(--spacing)) * .5)}.tw\\:p-1{padding:calc(calc(var(--spacing)) * 1)}.tw\\:p-2{padding:calc(calc(var(--spacing)) * 2)}.tw\\:p-2\\.5{padding:calc(calc(var(--spacing)) * 2.5)}.tw\\:p-3{padding:calc(calc(var(--spacing)) * 3)}.tw\\:p-4{padding:calc(calc(var(--spacing)) * 4)}.tw\\:p-6{padding:calc(calc(var(--spacing)) * 6)}.tw\\:p-8{padding:calc(calc(var(--spacing)) * 8)}.tw\\:p-\\[1px\\]{padding:1px}.tw\\:p-\\[3px\\]{padding:3px}.tw\\:p-\\[10px\\]{padding:10px}.tw\\:p-\\[16px\\]{padding:16px}.tw\\:px-0{padding-inline:calc(calc(var(--spacing)) * 0)}.tw\\:px-0\\.5{padding-inline:calc(calc(var(--spacing)) * .5)}.tw\\:px-1{padding-inline:calc(calc(var(--spacing)) * 1)}.tw\\:px-1\\.5{padding-inline:calc(calc(var(--spacing)) * 1.5)}.tw\\:px-2{padding-inline:calc(calc(var(--spacing)) * 2)}.tw\\:px-2\\.5{padding-inline:calc(calc(var(--spacing)) * 2.5)}.tw\\:px-3{padding-inline:calc(calc(var(--spacing)) * 3)}.tw\\:px-4{padding-inline:calc(calc(var(--spacing)) * 4)}.tw\\:px-6{padding-inline:calc(calc(var(--spacing)) * 6)}.tw\\:py-0{padding-block:calc(calc(var(--spacing)) * 0)}.tw\\:py-0\\.5{padding-block:calc(calc(var(--spacing)) * .5)}.tw\\:py-1{padding-block:calc(calc(var(--spacing)) * 1)}.tw\\:py-1\\.5{padding-block:calc(calc(var(--spacing)) * 1.5)}.tw\\:py-2{padding-block:calc(calc(var(--spacing)) * 2)}.tw\\:py-3{padding-block:calc(calc(var(--spacing)) * 3)}.tw\\:py-4{padding-block:calc(calc(var(--spacing)) * 4)}.tw\\:py-6{padding-block:calc(calc(var(--spacing)) * 6)}.tw\\:py-8{padding-block:calc(calc(var(--spacing)) * 8)}.tw\\:py-\\[2px\\]{padding-block:2px}.tw\\:ps-1\\.5{padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:ps-2{padding-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:ps-2\\.5{padding-inline-start:calc(calc(var(--spacing)) * 2.5)}.tw\\:ps-4{padding-inline-start:calc(calc(var(--spacing)) * 4)}.tw\\:ps-6{padding-inline-start:calc(calc(var(--spacing)) * 6)}.tw\\:ps-7{padding-inline-start:calc(calc(var(--spacing)) * 7)}.tw\\:ps-8{padding-inline-start:calc(calc(var(--spacing)) * 8)}.tw\\:ps-9{padding-inline-start:calc(calc(var(--spacing)) * 9)}.tw\\:ps-12{padding-inline-start:calc(calc(var(--spacing)) * 12)}.tw\\:ps-\\[85px\\]{padding-inline-start:85px}.tw\\:pe-1{padding-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:pe-1\\.5{padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:pe-2{padding-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:pe-4{padding-inline-end:calc(calc(var(--spacing)) * 4)}.tw\\:pe-8{padding-inline-end:calc(calc(var(--spacing)) * 8)}.tw\\:pe-8\\!{padding-inline-end:calc(calc(var(--spacing)) * 8)!important}.tw\\:pe-9{padding-inline-end:calc(calc(var(--spacing)) * 9)}.tw\\:pe-\\[calc\\(138px\\+1rem\\)\\]{padding-inline-end:calc(138px + 1rem)}.tw\\:pe-\\[…\\]{padding-inline-end:…}.tw\\:pt-0{padding-top:calc(calc(var(--spacing)) * 0)}.tw\\:pt-1{padding-top:calc(calc(var(--spacing)) * 1)}.tw\\:pt-2{padding-top:calc(calc(var(--spacing)) * 2)}.tw\\:pt-3{padding-top:calc(calc(var(--spacing)) * 3)}.tw\\:pt-4{padding-top:calc(calc(var(--spacing)) * 4)}.tw\\:pt-6{padding-top:calc(calc(var(--spacing)) * 6)}.tw\\:pr-0{padding-right:calc(calc(var(--spacing)) * 0)}.tw\\:pr-3{padding-right:calc(calc(var(--spacing)) * 3)}.tw\\:pr-4{padding-right:calc(calc(var(--spacing)) * 4)}.tw\\:pb-0{padding-bottom:calc(calc(var(--spacing)) * 0)}.tw\\:pb-1{padding-bottom:calc(calc(var(--spacing)) * 1)}.tw\\:pb-2{padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:pb-3{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:pb-4{padding-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:pb-8{padding-bottom:calc(calc(var(--spacing)) * 8)}.tw\\:pb-12{padding-bottom:calc(calc(var(--spacing)) * 12)}.tw\\:pb-16{padding-bottom:calc(calc(var(--spacing)) * 16)}.tw\\:pb-24{padding-bottom:calc(calc(var(--spacing)) * 24)}.tw\\:pl-2{padding-left:calc(calc(var(--spacing)) * 2)}.tw\\:pl-3{padding-left:calc(calc(var(--spacing)) * 3)}.tw\\:pl-4{padding-left:calc(calc(var(--spacing)) * 4)}.tw\\:pl-5{padding-left:calc(calc(var(--spacing)) * 5)}.tw\\:pl-6{padding-left:calc(calc(var(--spacing)) * 6)}.tw\\:pl-8{padding-left:calc(calc(var(--spacing)) * 8)}.tw\\:text-center{text-align:center}.tw\\:text-end{text-align:end}.tw\\:text-left{text-align:left}.tw\\:text-right{text-align:right}.tw\\:text-start{text-align:start}.tw\\:align-middle{vertical-align:middle}.tw\\:font-heading{font-family:var(--font-sans)}.tw\\:font-mono{font-family:var(--tw-font-mono)}.tw\\:font-sans{font-family:IBM Plex Sans Variable,sans-serif}.tw\\:text-2xl{font-size:var(--tw-text-2xl);line-height:var(--tw-leading,var(--tw-text-2xl--line-height))}.tw\\:text-3xl{font-size:var(--tw-text-3xl);line-height:var(--tw-leading,var(--tw-text-3xl--line-height))}.tw\\:text-4xl{font-size:var(--tw-text-4xl);line-height:var(--tw-leading,var(--tw-text-4xl--line-height))}.tw\\:text-base{font-size:var(--tw-text-base);line-height:var(--tw-leading,var(--tw-text-base--line-height))}.tw\\:text-lg{font-size:var(--tw-text-lg);line-height:var(--tw-leading,var(--tw-text-lg--line-height))}.tw\\:text-sm{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:text-sm\\/relaxed{font-size:var(--tw-text-sm);line-height:var(--tw-leading-relaxed)}.tw\\:text-xl{font-size:var(--tw-text-xl);line-height:var(--tw-leading,var(--tw-text-xl--line-height))}.tw\\:text-xs{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:text-\\[0\\.8rem\\]{font-size:.8rem}.tw\\:leading-6{--tw-leading:calc(calc(var(--spacing)) * 6);line-height:calc(calc(var(--spacing)) * 6)}.tw\\:leading-loose{--tw-leading:var(--tw-leading-loose);line-height:var(--tw-leading-loose)}.tw\\:leading-none{--tw-leading:1;line-height:1}.tw\\:leading-relaxed{--tw-leading:var(--tw-leading-relaxed);line-height:var(--tw-leading-relaxed)}.tw\\:leading-snug{--tw-leading:var(--tw-leading-snug);line-height:var(--tw-leading-snug)}.tw\\:leading-tight{--tw-leading:var(--tw-leading-tight);line-height:var(--tw-leading-tight)}.tw\\:font-bold{--tw-font-weight:var(--tw-font-weight-bold);font-weight:var(--tw-font-weight-bold)}.tw\\:font-extrabold{--tw-font-weight:var(--tw-font-weight-extrabold);font-weight:var(--tw-font-weight-extrabold)}.tw\\:font-medium{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:font-normal{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:font-semibold{--tw-font-weight:var(--tw-font-weight-semibold);font-weight:var(--tw-font-weight-semibold)}.tw\\:tracking-normal{--tw-tracking:var(--tw-tracking-normal);letter-spacing:var(--tw-tracking-normal)}.tw\\:tracking-tight{--tw-tracking:var(--tw-tracking-tight);letter-spacing:var(--tw-tracking-tight)}.tw\\:tracking-wider{--tw-tracking:var(--tw-tracking-wider);letter-spacing:var(--tw-tracking-wider)}.tw\\:tracking-widest{--tw-tracking:var(--tw-tracking-widest);letter-spacing:var(--tw-tracking-widest)}.tw\\:text-balance{text-wrap:balance}.tw\\:text-nowrap{text-wrap:nowrap}.tw\\:text-wrap{text-wrap:wrap}.tw\\:break-words{overflow-wrap:break-word}.tw\\:text-clip{text-overflow:clip}.tw\\:text-ellipsis{text-overflow:ellipsis}.tw\\:whitespace-normal{white-space:normal}.tw\\:whitespace-nowrap{white-space:nowrap}.tw\\:whitespace-pre{white-space:pre}.tw\\:whitespace-pre-line{white-space:pre-line}.tw\\:whitespace-pre-wrap{white-space:pre-wrap}.tw\\:\\[color\\:blue\\]{color:#00f}.tw\\:text-accent-foreground{color:var(--accent-foreground)}.tw\\:text-amber-600{color:var(--tw-color-amber-600)}.tw\\:text-background{color:var(--background)}.tw\\:text-blue-400{color:var(--tw-color-blue-400)}.tw\\:text-blue-500{color:var(--tw-color-blue-500)}.tw\\:text-blue-600{color:var(--tw-color-blue-600)}.tw\\:text-blue-800{color:var(--tw-color-blue-800)}.tw\\:text-card-foreground{color:var(--card-foreground)}.tw\\:text-current{color:currentColor}.tw\\:text-destructive{color:var(--destructive)}.tw\\:text-foreground{color:var(--foreground)}.tw\\:text-foreground\\!{color:var(--foreground)!important}.tw\\:text-foreground\\/30{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/30{color:color-mix(in oklab, var(--foreground) 30%, transparent)}}.tw\\:text-foreground\\/50{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/50{color:color-mix(in oklab, var(--foreground) 50%, transparent)}}.tw\\:text-foreground\\/60{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/60{color:color-mix(in oklab, var(--foreground) 60%, transparent)}}.tw\\:text-foreground\\/70{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/70{color:color-mix(in oklab, var(--foreground) 70%, transparent)}}.tw\\:text-gray-300{color:var(--tw-color-gray-300)}.tw\\:text-gray-500{color:var(--tw-color-gray-500)}.tw\\:text-gray-600{color:var(--tw-color-gray-600)}.tw\\:text-gray-700{color:var(--tw-color-gray-700)}.tw\\:text-gray-800{color:var(--tw-color-gray-800)}.tw\\:text-green-600{color:var(--tw-color-green-600)}.tw\\:text-green-700{color:var(--tw-color-green-700)}.tw\\:text-green-800{color:var(--tw-color-green-800)}.tw\\:text-inherit{color:inherit}.tw\\:text-muted-foreground,.tw\\:text-muted-foreground\\/50{color:var(--muted-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-muted-foreground\\/50{color:color-mix(in oklab, var(--muted-foreground) 50%, transparent)}}.tw\\:text-orange-800{color:var(--tw-color-orange-800)}.tw\\:text-popover-foreground{color:var(--popover-foreground)}.tw\\:text-primary{color:var(--primary)}.tw\\:text-primary-foreground{color:var(--primary-foreground)}.tw\\:text-purple-900{color:var(--tw-color-purple-900)}.tw\\:text-red-500{color:var(--tw-color-red-500)}.tw\\:text-red-600{color:var(--tw-color-red-600)}.tw\\:text-red-700{color:var(--tw-color-red-700)}.tw\\:text-red-800{color:var(--tw-color-red-800)}.tw\\:text-rose-600{color:var(--tw-color-rose-600)}.tw\\:text-secondary-foreground{color:var(--secondary-foreground)}.tw\\:text-sidebar-accent-foreground{color:var(--sidebar-accent-foreground)}.tw\\:text-sidebar-foreground,.tw\\:text-sidebar-foreground\\/70{color:var(--sidebar-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-sidebar-foreground\\/70{color:color-mix(in oklab, var(--sidebar-foreground) 70%, transparent)}}.tw\\:text-sky-600{color:var(--tw-color-sky-600)}.tw\\:text-slate-900{color:var(--tw-color-slate-900)}.tw\\:text-teal-600{color:var(--tw-color-teal-600)}.tw\\:text-white{color:var(--tw-color-white)}.tw\\:text-yellow-400{color:var(--tw-color-yellow-400)}.tw\\:text-yellow-600{color:var(--tw-color-yellow-600)}.tw\\:text-yellow-700{color:var(--tw-color-yellow-700)}.tw\\:capitalize{text-transform:capitalize}.tw\\:uppercase{text-transform:uppercase}.tw\\:italic{font-style:italic}.tw\\:tabular-nums{--tw-numeric-spacing:tabular-nums;font-variant-numeric:var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)}.tw\\:line-through{text-decoration-line:line-through}.tw\\:underline{text-decoration-line:underline}.tw\\:underline-offset-4{text-underline-offset:4px}.tw\\:opacity-0{opacity:0}.tw\\:opacity-40{opacity:.4}.tw\\:opacity-50{opacity:.5}.tw\\:opacity-60{opacity:.6}.tw\\:opacity-100{opacity:1}.tw\\:bg-blend-color{background-blend-mode:color}.tw\\:shadow{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-\\[0_0_0_1px_var\\(--sidebar-border\\)\\]{--tw-shadow:0 0 0 1px var(--tw-shadow-color,var(--sidebar-border));box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-lg{--tw-shadow:0 10px 15px -3px var(--tw-shadow-color,#0000001a), 0 4px 6px -4px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-md{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a), 0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-none{--tw-shadow:0 0 #0000;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-none\\!{--tw-shadow:0 0 #0000!important;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)!important}.tw\\:shadow-sm{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-xl{--tw-shadow:0 20px 25px -5px var(--tw-shadow-color,#0000001a), 0 8px 10px -6px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-0{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-1{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-2{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-background{--tw-ring-color:var(--background)}.tw\\:ring-foreground\\/10{--tw-ring-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:ring-foreground\\/10{--tw-ring-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}.tw\\:ring-primary{--tw-ring-color:var(--primary)}.tw\\:ring-ring\\/50{--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:ring-ring\\/50{--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:ring-sidebar-ring{--tw-ring-color:var(--sidebar-ring)}.tw\\:ring-offset-2{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:ring-offset-background{--tw-ring-offset-color:var(--background)}.tw\\:ring-offset-white{--tw-ring-offset-color:var(--tw-color-white)}.tw\\:outline-hidden{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:outline-hidden{outline-offset:2px;outline:2px solid #0000}}.tw\\:drop-shadow-sm{--tw-drop-shadow-size:drop-shadow(0 1px 2px var(--tw-drop-shadow-color,#00000026));--tw-drop-shadow:drop-shadow(var(--tw-drop-shadow-sm));filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.tw\\:transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[color\\,box-shadow\\]{transition-property:color,box-shadow;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[left\\,right\\,width\\]{transition-property:left,right,width;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[margin\\,opacity\\]{transition-property:margin,opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[width\\,height\\,padding\\]{transition-property:width,height,padding;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[width\\]{transition-property:width;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-all{transition-property:all;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-colors{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-opacity{transition-property:opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-transform{transition-property:transform,translate,scale,rotate;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-none{transition-property:none}.tw\\:duration-100{--tw-duration:.1s;transition-duration:.1s}.tw\\:duration-200{--tw-duration:.2s;transition-duration:.2s}.tw\\:ease-linear{--tw-ease:linear;transition-timing-function:linear}.tw\\:prose-quoteless :where(blockquote p:first-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose-quoteless :where(blockquote p:last-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:none}.tw\\:outline-none{--tw-outline-style:none;outline-style:none}.tw\\:select-none{-webkit-user-select:none;user-select:none}.tw\\:\\[unicode-bidi\\:plaintext\\]{unicode-bidi:plaintext}.tw\\:group-focus-within\\/menu-item\\:opacity-100:is(:where(.tw\\:group\\/menu-item):focus-within *){opacity:1}@media (hover:hover){.tw\\:group-hover\\:visible:is(:where(.tw\\:group):hover *){visibility:visible}.tw\\:group-hover\\:hidden:is(:where(.tw\\:group):hover *){display:none}.tw\\:group-hover\\:opacity-100:is(:where(.tw\\:group):hover *),.tw\\:group-hover\\/menu-item\\:opacity-100:is(:where(.tw\\:group\\/menu-item):hover *){opacity:1}}.tw\\:group-focus\\/context-menu-item\\:text-accent-foreground:is(:where(.tw\\:group\\/context-menu-item):focus *),.tw\\:group-focus\\/dropdown-menu-item\\:text-accent-foreground:is(:where(.tw\\:group\\/dropdown-menu-item):focus *),.tw\\:group-focus\\/menubar-item\\:text-accent-foreground:is(:where(.tw\\:group\\/menubar-item):focus *){color:var(--accent-foreground)}.tw\\:group-has-disabled\\/field\\:opacity-50:is(:where(.tw\\:group\\/field):has(:disabled) *){opacity:.5}.tw\\:group-has-data-\\[sidebar\\=menu-action\\]\\/menu-item\\:pe-8:is(:where(.tw\\:group\\/menu-item):has([data-sidebar=menu-action]) *){padding-inline-end:calc(calc(var(--spacing)) * 8)}.tw\\:group-has-data-\\[size\\=lg\\]\\/avatar-group\\:size-10:is(:where(.tw\\:group\\/avatar-group):has([data-size=lg]) *){width:calc(calc(var(--spacing)) * 10);height:calc(calc(var(--spacing)) * 10)}.tw\\:group-has-data-\\[size\\=sm\\]\\/avatar-group\\:size-6:is(:where(.tw\\:group\\/avatar-group):has([data-size=sm]) *){width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:group-has-data-\\[slot\\=command-shortcut\\]\\/command-item\\:hidden:is(:where(.tw\\:group\\/command-item):has([data-slot=command-shortcut]) *){display:none}.tw\\:group-has-\\[\\>input\\]\\/input-group\\:pt-2:is(:where(.tw\\:group\\/input-group):has(>input) *){padding-top:calc(calc(var(--spacing)) * 2)}.tw\\:group-has-\\[\\>input\\]\\/input-group\\:pb-2:is(:where(.tw\\:group\\/input-group):has(>input) *){padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:group-has-\\[\\>svg\\]\\/alert\\:col-start-2:is(:where(.tw\\:group\\/alert):has(>svg) *){grid-column-start:2}.tw\\:group-data-\\[checked\\=true\\]\\/command-item\\:opacity-100:is(:where(.tw\\:group\\/command-item)[data-checked=true] *){opacity:1}.tw\\:group-data-\\[collapsible\\=icon\\]\\:-mt-8:is(:where(.tw\\:group)[data-collapsible=icon] *){margin-top:calc(calc(var(--spacing)) * -8)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:hidden:is(:where(.tw\\:group)[data-collapsible=icon] *){display:none}.tw\\:group-data-\\[collapsible\\=icon\\]\\:size-8\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(calc(var(--spacing)) * 8)!important;height:calc(calc(var(--spacing)) * 8)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\(--sidebar-width-icon\\):is(:where(.tw\\:group)[data-collapsible=icon] *){width:var(--sidebar-width-icon)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)\\+\\(--spacing\\(4\\)\\)\\)\\]:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(var(--sidebar-width-icon) + (calc(calc(var(--spacing)) * 4)))}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)\\+\\(--spacing\\(4\\)\\)\\+2px\\)\\]:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(var(--sidebar-width-icon) + (calc(calc(var(--spacing)) * 4)) + 2px)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:overflow-hidden:is(:where(.tw\\:group)[data-collapsible=icon] *){overflow:hidden}.tw\\:group-data-\\[collapsible\\=icon\\]\\:p-0\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){padding:calc(calc(var(--spacing)) * 0)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:p-2\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){padding:calc(calc(var(--spacing)) * 2)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:opacity-0:is(:where(.tw\\:group)[data-collapsible=icon] *){opacity:0}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:right-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\]:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){right:calc(var(--sidebar-width) * -1)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:left-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\]:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){left:calc(var(--sidebar-width) * -1)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:w-0:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){width:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:translate-x-0:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:group-data-\\[disabled\\=true\\]\\:pointer-events-none:is(:where(.tw\\:group)[data-disabled=true] *){pointer-events:none}.tw\\:group-data-\\[disabled\\=true\\]\\:opacity-50:is(:where(.tw\\:group)[data-disabled=true] *),.tw\\:group-data-\\[disabled\\=true\\]\\/input-group\\:opacity-50:is(:where(.tw\\:group\\/input-group)[data-disabled=true] *){opacity:.5}.tw\\:group-data-\\[side\\=primary\\]\\:-right-4:is(:where(.tw\\:group)[data-side=primary] *){right:calc(calc(var(--spacing)) * -4)}.tw\\:group-data-\\[side\\=primary\\]\\:border-e:is(:where(.tw\\:group)[data-side=primary] *){border-inline-end-style:var(--tw-border-style);border-inline-end-width:1px}.tw\\:group-data-\\[side\\=secondary\\]\\:left-0:is(:where(.tw\\:group)[data-side=secondary] *){left:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-\\[side\\=secondary\\]\\:rotate-180:is(:where(.tw\\:group)[data-side=secondary] *){rotate:180deg}.tw\\:group-data-\\[side\\=secondary\\]\\:border-s:is(:where(.tw\\:group)[data-side=secondary] *){border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:group-data-\\[size\\=default\\]\\/avatar\\:size-2\\.5:is(:where(.tw\\:group\\/avatar)[data-size=default] *){width:calc(calc(var(--spacing)) * 2.5);height:calc(calc(var(--spacing)) * 2.5)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:size-4:is(:where(.tw\\:group\\/switch)[data-size=default] *){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[size\\=lg\\]\\/avatar\\:size-3:is(:where(.tw\\:group\\/avatar)[data-size=lg] *){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=sm] *){width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:text-xs:is(:where(.tw\\:group\\/avatar)[data-size=sm] *){font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:p-3:is(:where(.tw\\:group\\/card)[data-size=sm] *){padding:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:px-3:is(:where(.tw\\:group\\/card)[data-size=sm] *){padding-inline:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:text-sm:is(:where(.tw\\:group\\/card)[data-size=sm] *){font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:size-3:is(:where(.tw\\:group\\/switch)[data-size=sm] *){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:rounded-none:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *){border-radius:0}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:px-2:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *){padding-inline:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[variant\\=floating\\]\\:rounded-lg:is(:where(.tw\\:group)[data-variant=floating] *){border-radius:var(--radius)}.tw\\:group-data-\\[variant\\=floating\\]\\:shadow-sm:is(:where(.tw\\:group)[data-variant=floating] *){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=floating\\]\\:ring-1:is(:where(.tw\\:group)[data-variant=floating] *){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=floating\\]\\:ring-sidebar-border:is(:where(.tw\\:group)[data-variant=floating] *){--tw-ring-color:var(--sidebar-border)}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *){background-color:#0000}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:mx-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){margin-inline:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:mt-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){margin-top:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:h-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){height:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:w-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){width:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:text-center:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){text-align:center}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:my-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){margin-block:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:me-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){margin-inline-end:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:h-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){height:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:w-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){width:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:my-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){margin-block:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:ms-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){margin-inline-start:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:h-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){height:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:w-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){width:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:mx-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){margin-inline:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:mb-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:h-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){height:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:w-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){width:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:text-center:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){text-align:center}.tw\\:group-data-selected\\/command-item\\:text-foreground:is(:where(.tw\\:group\\/command-item):where([data-selected=true]) *){color:var(--foreground)}.tw\\:group-data-horizontal\\/tabs\\:h-8:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *){height:calc(calc(var(--spacing)) * 8)}.tw\\:group-data-vertical\\/tabs\\:h-fit:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){height:fit-content}.tw\\:group-data-vertical\\/tabs\\:w-full:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){width:100%}.tw\\:group-data-vertical\\/tabs\\:flex-col:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){flex-direction:column}.tw\\:group-data-vertical\\/tabs\\:justify-start:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){justify-content:flex-start}@media (hover:hover){.tw\\:peer-hover\\/menu-button\\:text-sidebar-accent-foreground:is(:where(.tw\\:peer\\/menu-button):hover~*){color:var(--sidebar-accent-foreground)}.tw\\:peer-focus\\:group-hover\\:text-blue-500:is(:where(.tw\\:peer):focus~*):is(:where(.tw\\:group):hover *){color:var(--tw-color-blue-500)}}.tw\\:peer-disabled\\:cursor-not-allowed:is(:where(.tw\\:peer):disabled~*){cursor:not-allowed}.tw\\:peer-disabled\\:opacity-50:is(:where(.tw\\:peer):disabled~*){opacity:.5}.tw\\:peer-data-\\[size\\=default\\]\\/menu-button\\:top-1\\.5:is(:where(.tw\\:peer\\/menu-button)[data-size=default]~*){top:calc(calc(var(--spacing)) * 1.5)}.tw\\:peer-data-\\[size\\=lg\\]\\/menu-button\\:top-2\\.5:is(:where(.tw\\:peer\\/menu-button)[data-size=lg]~*){top:calc(calc(var(--spacing)) * 2.5)}.tw\\:peer-data-\\[size\\=sm\\]\\/menu-button\\:top-1:is(:where(.tw\\:peer\\/menu-button)[data-size=sm]~*){top:calc(calc(var(--spacing)) * 1)}.tw\\:peer-data-active\\/menu-button\\:text-sidebar-accent-foreground:is(:is(:where(.tw\\:peer\\/menu-button):where([data-state=active]),:where(.tw\\:peer\\/menu-button):where([data-active]:not([data-active=false])))~*){color:var(--sidebar-accent-foreground)}.tw\\:file\\:inline-flex::file-selector-button{display:inline-flex}.tw\\:file\\:h-6::file-selector-button{height:calc(calc(var(--spacing)) * 6)}.tw\\:file\\:border-0::file-selector-button{border-style:var(--tw-border-style);border-width:0}.tw\\:file\\:bg-transparent::file-selector-button{background-color:#0000}.tw\\:file\\:text-sm::file-selector-button{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:file\\:font-medium::file-selector-button{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:file\\:text-foreground::file-selector-button{color:var(--foreground)}.tw\\:placeholder\\:text-muted-foreground::placeholder{color:var(--muted-foreground)}.tw\\:placeholder\\:text-slate-400::placeholder{color:var(--tw-color-slate-400)}.tw\\:before\\:absolute:before{content:var(--tw-content);position:absolute}.tw\\:before\\:top-0\\.5:before{content:var(--tw-content);top:calc(calc(var(--spacing)) * .5)}.tw\\:before\\:left-0:before{content:var(--tw-content);left:calc(calc(var(--spacing)) * 0)}.tw\\:before\\:block:before{content:var(--tw-content);display:block}.tw\\:before\\:hidden:before{content:var(--tw-content);display:none}.tw\\:before\\:h-4:before{content:var(--tw-content);height:calc(calc(var(--spacing)) * 4)}.tw\\:before\\:w-4:before{content:var(--tw-content);width:calc(calc(var(--spacing)) * 4)}.tw\\:before\\:cursor-pointer:before{content:var(--tw-content);cursor:pointer}.tw\\:before\\:rounded:before{content:var(--tw-content);border-radius:.25rem}.tw\\:before\\:border:before{content:var(--tw-content);border-style:var(--tw-border-style);border-width:1px}.tw\\:before\\:border-primary:before{content:var(--tw-content);border-color:var(--primary)}.tw\\:before\\:bg-primary:before{content:var(--tw-content);background-color:var(--primary)}.tw\\:before\\:bg-cover:before{content:var(--tw-content);background-size:cover}.tw\\:before\\:bg-no-repeat:before{content:var(--tw-content);background-repeat:no-repeat}.tw\\:before\\:content-\\[\\"\\"\\]:before{--tw-content:"";content:var(--tw-content)}.tw\\:after\\:absolute:after{content:var(--tw-content);position:absolute}.tw\\:after\\:-inset-2:after{content:var(--tw-content);inset:calc(calc(var(--spacing)) * -2)}.tw\\:after\\:inset-0:after{content:var(--tw-content);inset:calc(calc(var(--spacing)) * 0)}.tw\\:after\\:-inset-x-3:after{content:var(--tw-content);inset-inline:calc(calc(var(--spacing)) * -3)}.tw\\:after\\:-inset-y-2:after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * -2)}.tw\\:after\\:inset-y-0:after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:after\\:start-1\\/2:after{content:var(--tw-content);inset-inline-start:50%}.tw\\:after\\:top-\\[6px\\]:after{content:var(--tw-content);top:6px}.tw\\:after\\:right-\\[7px\\]:after{content:var(--tw-content);right:7px}.tw\\:after\\:left-\\[7px\\]:after{content:var(--tw-content);left:7px}.tw\\:after\\:block:after{content:var(--tw-content);display:block}.tw\\:after\\:hidden:after{content:var(--tw-content);display:none}.tw\\:after\\:h-0\\.5:after{content:var(--tw-content);height:calc(calc(var(--spacing)) * .5)}.tw\\:after\\:h-\\[6px\\]:after{content:var(--tw-content);height:6px}.tw\\:after\\:w-1:after{content:var(--tw-content);width:calc(calc(var(--spacing)) * 1)}.tw\\:after\\:w-\\[2px\\]:after{content:var(--tw-content);width:2px}.tw\\:after\\:w-\\[3px\\]:after{content:var(--tw-content);width:3px}.tw\\:after\\:-translate-x-1\\/2:after{content:var(--tw-content);--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:after\\:rotate-45:after{content:var(--tw-content);rotate:45deg}.tw\\:after\\:cursor-pointer:after{content:var(--tw-content);cursor:pointer}.tw\\:after\\:rounded-full:after{content:var(--tw-content);border-radius:3.40282e38px}.tw\\:after\\:border:after{content:var(--tw-content);border-style:var(--tw-border-style);border-width:1px}.tw\\:after\\:border-t-0:after{content:var(--tw-content);border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:after\\:border-r-2:after{content:var(--tw-content);border-right-style:var(--tw-border-style);border-right-width:2px}.tw\\:after\\:border-b-2:after{content:var(--tw-content);border-bottom-style:var(--tw-border-style);border-bottom-width:2px}.tw\\:after\\:border-l-0:after{content:var(--tw-content);border-left-style:var(--tw-border-style);border-left-width:0}.tw\\:after\\:border-solid:after{content:var(--tw-content);--tw-border-style:solid;border-style:solid}.tw\\:after\\:border-border:after{content:var(--tw-content);border-color:var(--border)}.tw\\:after\\:border-white:after{content:var(--tw-content);border-color:var(--tw-color-white)}.tw\\:after\\:bg-foreground:after{content:var(--tw-content);background-color:var(--foreground)}.tw\\:after\\:bg-muted:after{content:var(--tw-content);background-color:var(--muted)}.tw\\:after\\:opacity-0:after{content:var(--tw-content);opacity:0}.tw\\:after\\:mix-blend-darken:after{content:var(--tw-content);mix-blend-mode:darken}.tw\\:after\\:transition-opacity:after{content:var(--tw-content);transition-property:opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:after\\:content-\\[\\"\\"\\]:after{--tw-content:"";content:var(--tw-content)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:after\\:start-full:is(:where(.tw\\:group)[data-collapsible=offcanvas] *):after{content:var(--tw-content);inset-inline-start:100%}.tw\\:group-data-horizontal\\/tabs\\:after\\:inset-x-0:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-horizontal\\/tabs\\:after\\:bottom-\\[-5px\\]:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);bottom:-5px}.tw\\:group-data-horizontal\\/tabs\\:after\\:h-0\\.5:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);height:calc(calc(var(--spacing)) * .5)}.tw\\:group-data-vertical\\/tabs\\:after\\:inset-y-0:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-vertical\\/tabs\\:after\\:-end-1:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);inset-inline-end:calc(calc(var(--spacing)) * -1)}.tw\\:group-data-vertical\\/tabs\\:after\\:w-0\\.5:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);width:calc(calc(var(--spacing)) * .5)}.tw\\:first\\:mt-0:first-child{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:last\\:border-b-0:last-child{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.tw\\:even\\:bg-muted:nth-child(2n){background-color:var(--muted)}.tw\\:focus-within\\:ring-2:focus-within{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-within\\:ring-ring:focus-within{--tw-ring-color:var(--ring)}.tw\\:focus-within\\:ring-offset-1:focus-within{--tw-ring-offset-width:1px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}@media (hover:hover){.tw\\:hover\\:-mt-4:hover{margin-top:calc(calc(var(--spacing)) * -4)}.tw\\:hover\\:cursor-pointer:hover{cursor:pointer}.tw\\:hover\\:bg-accent:hover,.tw\\:hover\\:bg-accent\\/30:hover{background-color:var(--accent)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-accent\\/30:hover{background-color:color-mix(in oklab, var(--accent) 30%, transparent)}}.tw\\:hover\\:bg-accent\\/80:hover{background-color:var(--accent)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-accent\\/80:hover{background-color:color-mix(in oklab, var(--accent) 80%, transparent)}}.tw\\:hover\\:bg-blue-600:hover{background-color:var(--tw-color-blue-600)}.tw\\:hover\\:bg-destructive\\/20:hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-destructive\\/20:hover{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:hover\\:bg-gray-50:hover{background-color:var(--tw-color-gray-50)}.tw\\:hover\\:bg-input:hover{background-color:var(--input)}.tw\\:hover\\:bg-muted:hover,.tw\\:hover\\:bg-muted\\/50:hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-muted\\/50:hover{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:hover\\:bg-muted\\/80:hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-muted\\/80:hover{background-color:color-mix(in oklab, var(--muted) 80%, transparent)}}.tw\\:hover\\:bg-primary\\/10:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/10:hover{background-color:color-mix(in oklab, var(--primary) 10%, transparent)}}.tw\\:hover\\:bg-primary\\/70:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/70:hover{background-color:color-mix(in oklab, var(--primary) 70%, transparent)}}.tw\\:hover\\:bg-primary\\/90:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/90:hover{background-color:color-mix(in oklab, var(--primary) 90%, transparent)}}.tw\\:hover\\:bg-red-500:hover{background-color:var(--tw-color-red-500)}.tw\\:hover\\:bg-secondary:hover,.tw\\:hover\\:bg-secondary\\/80:hover{background-color:var(--secondary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-secondary\\/80:hover{background-color:color-mix(in oklab, var(--secondary) 80%, transparent)}}.tw\\:hover\\:bg-sidebar-accent:hover{background-color:var(--sidebar-accent)}.tw\\:hover\\:bg-transparent:hover{background-color:#0000}.tw\\:hover\\:text-foreground:hover{color:var(--foreground)}.tw\\:hover\\:text-muted-foreground:hover{color:var(--muted-foreground)}.tw\\:hover\\:text-primary-foreground:hover{color:var(--primary-foreground)}.tw\\:hover\\:text-sidebar-accent-foreground:hover{color:var(--sidebar-accent-foreground)}.tw\\:hover\\:underline:hover{text-decoration-line:underline}.tw\\:hover\\:opacity-80:hover{opacity:.8}.tw\\:hover\\:opacity-100:hover{opacity:1}.tw\\:hover\\:shadow-\\[0_0_0_1px_var\\(--sidebar-accent\\)\\]:hover{--tw-shadow:0 0 0 1px var(--tw-shadow-color,var(--sidebar-accent));box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:shadow-md:hover{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a), 0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:ring-3:hover{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:group-data-\\[collapsible\\=offcanvas\\]\\:bg-sidebar:hover:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){background-color:var(--sidebar)}.tw\\:hover\\:after\\:bg-sidebar-border:hover:after{content:var(--tw-content);background-color:var(--sidebar-border)}}.tw\\:focus\\:relative:focus{position:relative}.tw\\:focus\\:z-10:focus{z-index:10}.tw\\:focus\\:bg-accent:focus{background-color:var(--accent)}.tw\\:focus\\:bg-muted:focus{background-color:var(--muted)}.tw\\:focus\\:text-accent-foreground:focus{color:var(--accent-foreground)}.tw\\:focus\\:text-foreground:focus{color:var(--foreground)}.tw\\:focus\\:ring-2:focus{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus\\:ring-ring:focus{--tw-ring-color:var(--ring)}.tw\\:focus\\:ring-offset-1:focus{--tw-ring-offset-width:1px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:focus\\:ring-offset-background:focus{--tw-ring-offset-color:var(--background)}.tw\\:focus\\:outline-hidden:focus{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:focus\\:outline-hidden:focus{outline-offset:2px;outline:2px solid #0000}}:is(.tw\\:focus\\:\\*\\*\\:text-accent-foreground:focus *),:is(.tw\\:not-data-\\[variant\\=destructive\\]\\:focus\\:\\*\\*\\:text-accent-foreground:not([data-variant=destructive]):focus *){color:var(--accent-foreground)}.tw\\:focus-visible\\:z-10:focus-visible{z-index:10}.tw\\:focus-visible\\:border-destructive\\/40:focus-visible{border-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:border-destructive\\/40:focus-visible{border-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:focus-visible\\:border-ring:focus-visible{border-color:var(--ring)}.tw\\:focus-visible\\:ring-0:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-1:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-2:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-3:focus-visible,.tw\\:focus-visible\\:ring-\\[3px\\]:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-\\[color\\:hsl\\(240\\,5\\%\\,64\\.9\\%\\)\\]:focus-visible{--tw-ring-color:#a1a1aa}.tw\\:focus-visible\\:ring-destructive\\/20:focus-visible{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:ring-destructive\\/20:focus-visible{--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:focus-visible\\:ring-ring:focus-visible,.tw\\:focus-visible\\:ring-ring\\/50:focus-visible{--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:ring-ring\\/50:focus-visible{--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:focus-visible\\:ring-slate-400:focus-visible{--tw-ring-color:var(--tw-color-slate-400)}.tw\\:focus-visible\\:ring-offset-2:focus-visible{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:focus-visible\\:outline-hidden:focus-visible{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:focus-visible\\:outline-hidden:focus-visible{outline-offset:2px;outline:2px solid #0000}}.tw\\:focus-visible\\:outline-1:focus-visible{outline-style:var(--tw-outline-style);outline-width:1px}.tw\\:focus-visible\\:outline-ring:focus-visible{outline-color:var(--ring)}.tw\\:focus-visible\\:outline-none:focus-visible{--tw-outline-style:none;outline-style:none}.tw\\:focus-visible\\:ring-inset:focus-visible{--tw-ring-inset:inset}:is(.tw\\:\\*\\:focus-visible\\:relative>*):focus-visible{position:relative}:is(.tw\\:\\*\\:focus-visible\\:z-10>*):focus-visible{z-index:10}.tw\\:active\\:bg-sidebar-accent:active{background-color:var(--sidebar-accent)}.tw\\:active\\:text-sidebar-accent-foreground:active{color:var(--sidebar-accent-foreground)}.tw\\:active\\:ring-3:active{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:active\\:not-aria-\\[haspopup\\]\\:translate-y-px:active:not([aria-haspopup]){--tw-translate-y:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:active\\:not-aria-\\[haspopup\\]\\:transform-\\[translateY\\(1px\\)\\]:active:not([aria-haspopup]){transform:translateY(1px)}.tw\\:disabled\\:pointer-events-none:disabled{pointer-events:none}.tw\\:disabled\\:cursor-not-allowed:disabled{cursor:not-allowed}.tw\\:disabled\\:bg-input\\/50:disabled{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:disabled\\:bg-input\\/50:disabled{background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:disabled\\:bg-transparent:disabled{background-color:#0000}.tw\\:disabled\\:opacity-50:disabled{opacity:.5}:where([data-side=bottom]) .tw\\:in-data-\\[side\\=bottom\\]\\:translate-y-\\[calc\\(-50\\%-1px\\)\\]{--tw-translate-y:calc(-50% - 1px);translate:var(--tw-translate-x) var(--tw-translate-y)}:where([data-side=bottom]) .tw\\:in-data-\\[side\\=bottom\\]\\:\\[clip-path\\:polygon\\(100\\%_0\\,100\\%_100\\%\\,0_100\\%\\)\\]{clip-path:polygon(100% 0,100% 100%,0 100%)}:where([data-side=primary]) .tw\\:in-data-\\[side\\=primary\\]\\:cursor-w-resize{cursor:w-resize}:where([data-side=secondary]) .tw\\:in-data-\\[side\\=secondary\\]\\:cursor-e-resize{cursor:e-resize}:where([data-side=top]) .tw\\:in-data-\\[side\\=top\\]\\:translate-y-\\[calc\\(-50\\%-1px\\)\\]{--tw-translate-y:calc(-50% - 1px);translate:var(--tw-translate-x) var(--tw-translate-y)}:where([data-side=top]) .tw\\:in-data-\\[side\\=top\\]\\:\\[clip-path\\:polygon\\(100\\%_0\\,100\\%_100\\%\\,0_100\\%\\)\\]{clip-path:polygon(100% 0,100% 100%,0 100%)}:where([data-slot=button-group]) .tw\\:in-data-\\[slot\\=button-group\\]\\:rounded-lg{border-radius:var(--radius)}:where([data-slot=combobox-content]) .tw\\:in-data-\\[slot\\=combobox-content\\]\\:focus-within\\:border-inherit:focus-within{border-color:inherit}:where([data-slot=combobox-content]) .tw\\:in-data-\\[slot\\=combobox-content\\]\\:focus-within\\:ring-0:focus-within{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:where([data-slot=dialog-content]) .tw\\:in-data-\\[slot\\=dialog-content\\]\\:rounded-lg\\!{border-radius:var(--radius)!important}:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/20{background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/20{background-color:color-mix(in oklab, var(--background) 20%, transparent)}}:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:text-background{color:var(--background)}:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:text-destructive{color:var(--destructive)}.tw\\:has-disabled\\:bg-input\\/50:has(:disabled){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-disabled\\:bg-input\\/50:has(:disabled){background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:has-disabled\\:opacity-50:has(:disabled){opacity:.5}.tw\\:has-aria-expanded\\:bg-muted\\/50:has([aria-expanded=true]){background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-aria-expanded\\:bg-muted\\/50:has([aria-expanded=true]){background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-1:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-1\\.5:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-2:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:has-data-\\[icon\\=inline-end\\]\\:pe-1\\.5:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *):has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-1:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-1\\.5:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-2:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:has-data-\\[icon\\=inline-start\\]\\:ps-1\\.5:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *):has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[slot\\=alert-action\\]\\:relative:has([data-slot=alert-action]){position:relative}.tw\\:has-data-\\[slot\\=alert-action\\]\\:pe-18:has([data-slot=alert-action]){padding-inline-end:calc(calc(var(--spacing)) * 18)}.tw\\:has-data-\\[slot\\=card-action\\]\\:grid-cols-\\[1fr_auto\\]:has([data-slot=card-action]){grid-template-columns:1fr auto}.tw\\:has-data-\\[slot\\=card-description\\]\\:grid-rows-\\[auto_auto\\]:has([data-slot=card-description]){grid-template-rows:auto auto}.tw\\:has-data-\\[slot\\=card-footer\\]\\:pb-0:has([data-slot=card-footer]){padding-bottom:calc(calc(var(--spacing)) * 0)}.tw\\:has-data-\\[slot\\=kbd\\]\\:pe-0:has([data-slot=kbd]){padding-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:has-data-\\[slot\\=kbd\\]\\:pe-1\\.5:has([data-slot=kbd]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[variant\\=inset\\]\\:bg-sidebar:has([data-variant=inset]){background-color:var(--sidebar)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:border-ring:has([data-slot=input-group-control]:focus-visible){border-color:var(--ring)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-3:has([data-slot=input-group-control]:focus-visible){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-ring\\/50:has([data-slot=input-group-control]:focus-visible){--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-ring\\/50:has([data-slot=input-group-control]:focus-visible){--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:border-destructive:has([data-slot][aria-invalid=true]){border-color:var(--destructive)}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-3:has([data-slot][aria-invalid=true]){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/20:has([data-slot][aria-invalid=true]){--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/20:has([data-slot][aria-invalid=true]){--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:h-auto:has(>[data-align=block-end]){height:auto}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:flex-col:has(>[data-align=block-end]){flex-direction:column}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:h-auto:has(>[data-align=block-start]){height:auto}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:flex-col:has(>[data-align=block-start]){flex-direction:column}.tw\\:has-\\[\\>\\[data-slot\\=button-group\\]\\]\\:gap-2:has(>[data-slot=button-group]){gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>button\\]\\:ms-\\[-0\\.3rem\\]:has(>button){margin-inline-start:-.3rem}.tw\\:has-\\[\\>button\\]\\:me-\\[-0\\.3rem\\]:has(>button){margin-inline-end:-.3rem}.tw\\:has-\\[\\>img\\]\\:grid-cols-\\[auto_1fr\\]:has(>img){grid-template-columns:auto 1fr}.tw\\:has-\\[\\>img\\]\\:gap-x-2:has(>img){column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>img\\:first-child\\]\\:pt-0:has(>img:first-child){padding-top:calc(calc(var(--spacing)) * 0)}.tw\\:has-\\[\\>kbd\\]\\:ms-\\[-0\\.15rem\\]:has(>kbd){margin-inline-start:-.15rem}.tw\\:has-\\[\\>kbd\\]\\:me-\\[-0\\.15rem\\]:has(>kbd){margin-inline-end:-.15rem}.tw\\:has-\\[\\>svg\\]\\:grid-cols-\\[auto_1fr\\]:has(>svg){grid-template-columns:auto 1fr}.tw\\:has-\\[\\>svg\\]\\:gap-x-2:has(>svg){column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>svg\\]\\:p-0:has(>svg){padding:calc(calc(var(--spacing)) * 0)}.tw\\:has-\\[\\>textarea\\]\\:h-auto:has(>textarea){height:auto}.tw\\:aria-disabled\\:pointer-events-none[aria-disabled=true]{pointer-events:none}.tw\\:aria-disabled\\:cursor-default[aria-disabled=true]{cursor:default}.tw\\:aria-disabled\\:opacity-50[aria-disabled=true]{opacity:.5}@media (hover:hover){.tw\\:aria-disabled\\:hover\\:bg-transparent\\![aria-disabled=true]:hover{background-color:#0000!important}.tw\\:aria-disabled\\:hover\\:text-inherit\\![aria-disabled=true]:hover{color:inherit!important}}.tw\\:aria-disabled\\:active\\:transform-none\\![aria-disabled=true]:active{transform:none!important}.tw\\:aria-expanded\\:bg-muted[aria-expanded=true]{background-color:var(--muted)}.tw\\:aria-expanded\\:bg-secondary[aria-expanded=true]{background-color:var(--secondary)}.tw\\:aria-expanded\\:text-foreground[aria-expanded=true]{color:var(--foreground)}.tw\\:aria-expanded\\:text-secondary-foreground[aria-expanded=true]{color:var(--secondary-foreground)}.tw\\:aria-expanded\\:opacity-100[aria-expanded=true]{opacity:1}.tw\\:aria-invalid\\:border-destructive[aria-invalid=true]{border-color:var(--destructive)}.tw\\:aria-invalid\\:ring-0[aria-invalid=true]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:aria-invalid\\:ring-3[aria-invalid=true]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:aria-invalid\\:ring-destructive\\/20[aria-invalid=true]{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:aria-invalid\\:ring-destructive\\/20[aria-invalid=true]{--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:aria-invalid\\:aria-checked\\:border-primary[aria-invalid=true][aria-checked=true]{border-color:var(--primary)}.tw\\:aria-pressed\\:bg-muted[aria-pressed=true]{background-color:var(--muted)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:h-px[aria-orientation=horizontal]{height:1px}.tw\\:aria-\\[orientation\\=horizontal\\]\\:w-full[aria-orientation=horizontal]{width:100%}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:start-0[aria-orientation=horizontal]:after{content:var(--tw-content);inset-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:h-1[aria-orientation=horizontal]:after{content:var(--tw-content);height:calc(calc(var(--spacing)) * 1)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:w-full[aria-orientation=horizontal]:after{content:var(--tw-content);width:100%}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:translate-x-0[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:-translate-y-1\\/2[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-y:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:aria-\\[orientation\\=vertical\\]\\:flex-col[aria-orientation=vertical]{flex-direction:column}.tw\\:data-inset\\:ps-7[data-inset]{padding-inline-start:calc(calc(var(--spacing)) * 7)}.tw\\:data-placeholder\\:text-muted-foreground[data-placeholder]{color:var(--muted-foreground)}.tw\\:data-quiet-focus\\:focus-visible\\:border-transparent[data-quiet-focus]:focus-visible{border-color:#0000}.tw\\:data-quiet-focus\\:focus-visible\\:ring-0[data-quiet-focus]:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:data-quiet-focus\\:focus-visible\\:outline-none[data-quiet-focus]:focus-visible{--tw-outline-style:none;outline-style:none}.tw\\:data-\\[align-trigger\\=false\\]\\:min-w-36[data-align-trigger=false]{min-width:calc(calc(var(--spacing)) * 36)}.tw\\:data-\\[align-trigger\\=true\\]\\:min-w-\\(--radix-select-trigger-width\\)[data-align-trigger=true]{min-width:var(--radix-select-trigger-width)}.tw\\:data-\\[align-trigger\\=true\\]\\:animate-none[data-align-trigger=true]{animation:none}.tw\\:data-\\[disabled\\=true\\]\\:pointer-events-auto[data-disabled=true]{pointer-events:auto}.tw\\:data-\\[disabled\\=true\\]\\:pointer-events-none[data-disabled=true]{pointer-events:none}.tw\\:data-\\[disabled\\=true\\]\\:cursor-not-allowed[data-disabled=true]{cursor:not-allowed}.tw\\:data-\\[disabled\\=true\\]\\:opacity-50[data-disabled=true]{opacity:.5}.tw\\:data-\\[position\\=popper\\]\\:h-\\(--radix-select-trigger-height\\)[data-position=popper]{height:var(--radix-select-trigger-height)}.tw\\:data-\\[position\\=popper\\]\\:w-full[data-position=popper]{width:100%}.tw\\:data-\\[position\\=popper\\]\\:min-w-\\(--radix-select-trigger-width\\)[data-position=popper]{min-width:var(--radix-select-trigger-width)}.tw\\:data-\\[side\\=bottom\\]\\:translate-y-1[data-side=bottom]{--tw-translate-y:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=bottom\\]\\:slide-in-from-top-2[data-side=bottom]{--tw-enter-translate-y:calc(2*var(--spacing)*-1)}.tw\\:data-\\[side\\=left\\]\\:-translate-x-1[data-side=left]{--tw-translate-x:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=left\\]\\:slide-in-from-right-2[data-side=left]{--tw-enter-translate-x:calc(2*var(--spacing))}.tw\\:data-\\[side\\=right\\]\\:translate-x-1[data-side=right]{--tw-translate-x:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=right\\]\\:slide-in-from-left-2[data-side=right]{--tw-enter-translate-x:calc(2*var(--spacing)*-1)}.tw\\:data-\\[side\\=top\\]\\:-translate-y-1[data-side=top]{--tw-translate-y:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=top\\]\\:slide-in-from-bottom-2[data-side=top]{--tw-enter-translate-y:calc(2*var(--spacing))}.tw\\:data-\\[size\\=default\\]\\:h-8[data-size=default]{height:calc(calc(var(--spacing)) * 8)}.tw\\:data-\\[size\\=default\\]\\:h-\\[18\\.4px\\][data-size=default]{height:18.4px}.tw\\:data-\\[size\\=default\\]\\:w-\\[32px\\][data-size=default]{width:32px}.tw\\:data-\\[size\\=lg\\]\\:size-10[data-size=lg]{width:calc(calc(var(--spacing)) * 10);height:calc(calc(var(--spacing)) * 10)}.tw\\:data-\\[size\\=md\\]\\:text-sm[data-size=md]{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:data-\\[size\\=sm\\]\\:size-6[data-size=sm]{width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:data-\\[size\\=sm\\]\\:h-7[data-size=sm]{height:calc(calc(var(--spacing)) * 7)}.tw\\:data-\\[size\\=sm\\]\\:h-\\[14px\\][data-size=sm]{height:14px}.tw\\:data-\\[size\\=sm\\]\\:w-\\[24px\\][data-size=sm]{width:24px}.tw\\:data-\\[size\\=sm\\]\\:gap-3[data-size=sm]{gap:calc(calc(var(--spacing)) * 3)}.tw\\:data-\\[size\\=sm\\]\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,10px\\)\\][data-size=sm]{border-radius:min(var(--tw-radius-md), 10px)}.tw\\:data-\\[size\\=sm\\]\\:py-3[data-size=sm]{padding-block:calc(calc(var(--spacing)) * 3)}.tw\\:data-\\[size\\=sm\\]\\:text-xs[data-size=sm]{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:data-\\[size\\=sm\\]\\:has-data-\\[slot\\=card-footer\\]\\:pb-0[data-size=sm]:has([data-slot=card-footer]){padding-bottom:calc(calc(var(--spacing)) * 0)}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-item]:focus{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-item]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:data-highlighted\\:bg-foreground\\/10 *)[data-slot$=-item][data-highlighted]{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:data-highlighted\\:bg-foreground\\/10 *)[data-slot$=-item][data-highlighted]{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-separator\\]\\:bg-foreground\\/5 *)[data-slot$=-separator]{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-separator\\]\\:bg-foreground\\/5 *)[data-slot$=-separator]{background-color:color-mix(in oklab, var(--foreground) 5%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-trigger]:focus{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-trigger]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:aria-expanded\\:bg-foreground\\/10\\! *)[data-slot$=-trigger][aria-expanded=true]{background-color:var(--foreground)!important}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:aria-expanded\\:bg-foreground\\/10\\! *)[data-slot$=-trigger][aria-expanded=true]{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)!important}}:is(.tw\\:\\*\\:data-\\[slot\\=alert-description\\]\\:text-destructive\\/90>*)[data-slot=alert-description]{color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\:data-\\[slot\\=alert-description\\]\\:text-destructive\\/90>*)[data-slot=alert-description]{color:color-mix(in oklab, var(--destructive) 90%, transparent)}}:is(.tw\\:\\*\\:data-\\[slot\\=avatar\\]\\:ring-2>*)[data-slot=avatar]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:is(.tw\\:\\*\\:data-\\[slot\\=avatar\\]\\:ring-background>*)[data-slot=avatar]{--tw-ring-color:var(--background)}:is(.tw\\:\\*\\:data-\\[slot\\=input-group-addon\\]\\:ps-2\\!>*)[data-slot=input-group-addon]{padding-inline-start:calc(calc(var(--spacing)) * 2)!important}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:relative *)[data-slot=kbd]{position:relative}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:isolate *)[data-slot=kbd]{isolation:isolate}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:z-50 *)[data-slot=kbd]{z-index:50}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:rounded-sm *)[data-slot=kbd]{border-radius:calc(var(--radius) * .6)}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:line-clamp-1>*)[data-slot=select-value]{-webkit-line-clamp:1;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:flex>*)[data-slot=select-value]{display:flex}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:flex-1>*)[data-slot=select-value]{flex:1}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:items-center>*)[data-slot=select-value]{align-items:center}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:gap-1\\.5>*)[data-slot=select-value]{gap:calc(calc(var(--spacing)) * 1.5)}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:text-start>*)[data-slot=select-value]{text-align:start}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:first\\:rounded-s-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"]:first-child{border-start-start-radius:var(--radius);border-end-start-radius:var(--radius)}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:first\\:rounded-t-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"]:first-child{border-top-left-radius:var(--radius);border-top-right-radius:var(--radius)}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:last\\:rounded-e-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"]:last-child{border-start-end-radius:var(--radius);border-end-end-radius:var(--radius)}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:last\\:rounded-b-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"]:last-child{border-bottom-right-radius:var(--radius);border-bottom-left-radius:var(--radius)}.tw\\:data-\\[state\\=active\\]\\:bg-background[data-state=active]{background-color:var(--background)}.tw\\:data-\\[state\\=active\\]\\:text-foreground[data-state=active]{color:var(--foreground)}.tw\\:data-\\[state\\=active\\]\\:shadow-sm[data-state=active]{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:data-\\[state\\=closed\\]\\:overflow-hidden[data-state=closed]{overflow:hidden}.tw\\:data-\\[state\\=delayed-open\\]\\:animate-in[data-state=delayed-open]{animation:enter var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-\\[state\\=delayed-open\\]\\:fade-in-0[data-state=delayed-open]{--tw-enter-opacity:0}.tw\\:data-\\[state\\=delayed-open\\]\\:zoom-in-95[data-state=delayed-open]{--tw-enter-scale:.95}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-soft-approved\\)\\][data-state=on]{background-color:var(--inv-soft-approved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-soft-unapproved\\)\\][data-state=on]{background-color:var(--inv-soft-unapproved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-soft-unknown\\)\\][data-state=on]{background-color:var(--inv-soft-unknown)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-vivid-approved\\)\\][data-state=on]{background-color:var(--inv-vivid-approved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-vivid-unapproved\\)\\][data-state=on]{background-color:var(--inv-vivid-unapproved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-vivid-unknown\\)\\][data-state=on]{background-color:var(--inv-vivid-unknown)}.tw\\:data-\\[state\\=on\\]\\:bg-muted[data-state=on]{background-color:var(--muted)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-icon-approved\\)\\][data-state=on]{color:var(--inv-icon-approved)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-icon-unapproved\\)\\][data-state=on]{color:var(--inv-icon-unapproved)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-icon-unknown\\)\\][data-state=on]{color:var(--inv-icon-unknown)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-on\\)\\][data-state=on]{color:var(--inv-on)}.tw\\:data-\\[state\\=on\\]\\:text-foreground[data-state=on]{color:var(--foreground)}.tw\\:data-\\[state\\=open\\]\\:bg-accent[data-state=open]{background-color:var(--accent)}.tw\\:data-\\[state\\=open\\]\\:bg-muted[data-state=open]{background-color:var(--muted)}.tw\\:data-\\[state\\=open\\]\\:text-foreground[data-state=open]{color:var(--foreground)}.tw\\:data-\\[state\\=selected\\]\\:bg-muted[data-state=selected]{background-color:var(--muted)}.tw\\:data-\\[variant\\=destructive\\]\\:text-destructive[data-variant=destructive]{color:var(--destructive)}:is(:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:\\*\\*\\:text-accent-foreground\\! *)[data-variant=destructive] *),:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:text-accent-foreground\\! *)[data-variant=destructive]{color:var(--accent-foreground)!important}.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/10[data-variant=destructive]:focus{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/10[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--destructive) 10%, transparent)}}.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:text-destructive[data-variant=destructive]:focus{color:var(--destructive)}:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-foreground\\/10\\! *)[data-variant=destructive]:focus{background-color:var(--foreground)!important}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-foreground\\/10\\! *)[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)!important}}.tw\\:data-\\[variant\\=line\\]\\:rounded-none[data-variant=line]{border-radius:0}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:border-s-0:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"][data-variant=outline]{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:border-t-0:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"][data-variant=outline]{border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:first\\:border-s:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"][data-variant=outline]:first-child{border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:first\\:border-t:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"][data-variant=outline]:first-child{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:inset-x-0[data-vaul-drawer-direction=bottom]{inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:bottom-0[data-vaul-drawer-direction=bottom]{bottom:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:mt-24[data-vaul-drawer-direction=bottom]{margin-top:calc(calc(var(--spacing)) * 24)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:max-h-\\[80vh\\][data-vaul-drawer-direction=bottom]{max-height:80vh}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:rounded-t-xl[data-vaul-drawer-direction=bottom]{border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:border-t[data-vaul-drawer-direction=bottom]{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:inset-y-0[data-vaul-drawer-direction=left]{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:left-0[data-vaul-drawer-direction=left]{left:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:w-3\\/4[data-vaul-drawer-direction=left]{width:75%}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:flex-row[data-vaul-drawer-direction=left]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:rounded-r-xl[data-vaul-drawer-direction=left]{border-top-right-radius:calc(var(--radius) * 1.4);border-bottom-right-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:border-r[data-vaul-drawer-direction=left]{border-right-style:var(--tw-border-style);border-right-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=left\\/right\\]\\:flex-row[data-vaul-drawer-direction=left\\/right]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:inset-y-0[data-vaul-drawer-direction=right]{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:right-0[data-vaul-drawer-direction=right]{right:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:w-3\\/4[data-vaul-drawer-direction=right]{width:75%}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:flex-row[data-vaul-drawer-direction=right]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:rounded-l-xl[data-vaul-drawer-direction=right]{border-top-left-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:border-l[data-vaul-drawer-direction=right]{border-left-style:var(--tw-border-style);border-left-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:inset-x-0[data-vaul-drawer-direction=top]{inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:top-0[data-vaul-drawer-direction=top]{top:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:mb-24[data-vaul-drawer-direction=top]{margin-bottom:calc(calc(var(--spacing)) * 24)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:max-h-\\[80vh\\][data-vaul-drawer-direction=top]{max-height:80vh}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:rounded-b-xl[data-vaul-drawer-direction=top]{border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:border-b[data-vaul-drawer-direction=top]{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}@supports ((-webkit-backdrop-filter:var(--tw)) or (backdrop-filter:var(--tw))){.tw\\:supports-backdrop-filter\\:backdrop-blur-xs{--tw-backdrop-blur:blur(var(--tw-blur-xs));-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}}@media (min-width:40rem){.tw\\:sm\\:flex{display:flex}.tw\\:sm\\:max-w-sm{max-width:var(--tw-container-sm)}.tw\\:sm\\:flex-row{flex-direction:row}.tw\\:sm\\:justify-end{justify-content:flex-end}.tw\\:sm\\:p-8{padding:calc(calc(var(--spacing)) * 8)}.tw\\:sm\\:text-start{text-align:start}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:sm\\:max-w-sm[data-vaul-drawer-direction=left],.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:sm\\:max-w-sm[data-vaul-drawer-direction=right]{max-width:var(--tw-container-sm)}}@media (min-width:48rem){.tw\\:md\\:block{display:block}.tw\\:md\\:flex{display:flex}.tw\\:md\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:md\\:gap-0\\.5{gap:calc(calc(var(--spacing)) * .5)}.tw\\:md\\:text-start{text-align:start}.tw\\:md\\:text-sm{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:md\\:text-pretty{text-wrap:pretty}.tw\\:md\\:opacity-0{opacity:0}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:m-2:is(:where(.tw\\:peer)[data-variant=inset]~*){margin:calc(calc(var(--spacing)) * 2)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:ms-0:is(:where(.tw\\:peer)[data-variant=inset]~*){margin-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:rounded-xl:is(:where(.tw\\:peer)[data-variant=inset]~*){border-radius:calc(var(--radius) * 1.4)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:shadow-sm:is(:where(.tw\\:peer)[data-variant=inset]~*){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:peer-data-\\[state\\=collapsed\\]\\:ms-2:is(:where(.tw\\:peer)[data-variant=inset]~*):is(:where(.tw\\:peer)[data-state=collapsed]~*){margin-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:md\\:after\\:hidden:after{content:var(--tw-content);display:none}}@media (min-width:64rem){.tw\\:lg\\:flex{display:flex}.tw\\:lg\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}:where(.tw\\:lg\\:space-x-8>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 8) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 8) * calc(1 - var(--tw-space-x-reverse)))}.tw\\:lg\\:text-5xl{font-size:var(--tw-text-5xl);line-height:var(--tw-leading,var(--tw-text-5xl--line-height))}}@media (min-width:48rem){@media (min-width:64rem){.tw\\:md\\:lg\\:hidden{display:none}}}@media (min-width:80rem){.tw\\:xl\\:auto-cols-fr{grid-auto-columns:minmax(0,1fr)}.tw\\:xl\\:grid-flow-col{grid-auto-flow:column}.tw\\:xl\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:xl\\:grid-cols-none{grid-template-columns:none}.tw\\:xl\\:grid-rows-2{grid-template-rows:repeat(2,minmax(0,1fr))}}@container search not (min-width:7rem){.tw\\:\\@max-\\[7rem\\]\\/search\\:hidden{display:none}.tw\\:\\@max-\\[7rem\\]\\/search\\:ps-3{padding-inline-start:calc(calc(var(--spacing)) * 3)}}@container search not (min-width:4rem){.tw\\:\\@max-\\[4rem\\]\\/search\\:hidden{display:none}.tw\\:\\@max-\\[4rem\\]\\/search\\:pe-3{padding-inline-end:calc(calc(var(--spacing)) * 3)}}@container search not (min-width:3rem){.tw\\:\\@max-\\[3rem\\]\\/search\\:ps-0{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\@max-\\[3rem\\]\\/search\\:pe-0{padding-inline-end:calc(calc(var(--spacing)) * 0)}}@container (min-width:24rem){.tw\\:\\@sm\\:basis-auto{flex-basis:auto}}.tw\\:ltr\\:left-2:where(:dir(ltr),[dir=ltr],[dir=ltr] *){left:calc(calc(var(--spacing)) * 2)}.tw\\:ltr\\:-translate-x-1\\/2:where(:dir(ltr),[dir=ltr],[dir=ltr] *){--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:right-2:where(:dir(rtl),[dir=rtl],[dir=rtl] *){right:calc(calc(var(--spacing)) * 2)}.tw\\:rtl\\:flex:where(:dir(rtl),[dir=rtl],[dir=rtl] *){display:flex}.tw\\:rtl\\:-translate-x-px:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:-1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:translate-x-1\\/2:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:calc(1 / 2 * 100%);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:translate-x-px:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:after\\:translate-x-1\\/2:where(:dir(rtl),[dir=rtl],[dir=rtl] *):after{content:var(--tw-content);--tw-translate-x:calc(1 / 2 * 100%);translate:var(--tw-translate-x) var(--tw-translate-y)}:where([data-side=primary]) .tw\\:rtl\\:in-data-\\[side\\=primary\\]\\:cursor-e-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:e-resize}:where([data-side=secondary]) .tw\\:rtl\\:in-data-\\[side\\=secondary\\]\\:cursor-w-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:w-resize}.tw\\:rtl\\:aria-\\[orientation\\=horizontal\\]\\:after\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:data-\\[side\\=left\\]\\:translate-x-1:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[data-side=left]{--tw-translate-x:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:data-\\[side\\=right\\]\\:-translate-x-1:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[data-side=right]{--tw-translate-x:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:border-input:is(.dark *){border-color:var(--input)}.tw\\:dark\\:bg-destructive\\/20:is(.dark *){background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:bg-destructive\\/20:is(.dark *){background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:dark\\:bg-input\\/30:is(.dark *){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:bg-input\\/30:is(.dark *){background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:dark\\:bg-transparent:is(.dark *){background-color:#0000}.tw\\:dark\\:text-amber-400:is(.dark *){color:var(--tw-color-amber-400)}.tw\\:dark\\:text-muted-foreground:is(.dark *){color:var(--muted-foreground)}.tw\\:dark\\:text-rose-400:is(.dark *){color:var(--tw-color-rose-400)}.tw\\:dark\\:text-sky-400:is(.dark *){color:var(--tw-color-sky-400)}.tw\\:dark\\:text-teal-400:is(.dark *){color:var(--tw-color-teal-400)}.tw\\:dark\\:after\\:mix-blend-lighten:is(.dark *):after{content:var(--tw-content);mix-blend-mode:lighten}@media (hover:hover){.tw\\:dark\\:hover\\:bg-blue-500:is(.dark *):hover{background-color:var(--tw-color-blue-500)}.tw\\:dark\\:hover\\:bg-destructive\\/30:is(.dark *):hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-destructive\\/30:is(.dark *):hover{background-color:color-mix(in oklab, var(--destructive) 30%, transparent)}}.tw\\:dark\\:hover\\:bg-input\\/50:is(.dark *):hover{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-input\\/50:is(.dark *):hover{background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:dark\\:hover\\:bg-muted\\/50:is(.dark *):hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-muted\\/50:is(.dark *):hover{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:dark\\:hover\\:text-foreground:is(.dark *):hover{color:var(--foreground)}}.tw\\:dark\\:focus-visible\\:ring-destructive\\/40:is(.dark *):focus-visible{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:focus-visible\\:ring-destructive\\/40:is(.dark *):focus-visible{--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:disabled\\:bg-input\\/80:is(.dark *):disabled{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:disabled\\:bg-input\\/80:is(.dark *):disabled{background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:dark\\:disabled\\:bg-transparent:is(.dark *):disabled{background-color:#0000}:where([data-slot=tooltip-content]) .tw\\:dark\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/10:is(.dark *){background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){:where([data-slot=tooltip-content]) .tw\\:dark\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/10:is(.dark *){background-color:color-mix(in oklab, var(--background) 10%, transparent)}}.tw\\:dark\\:has-disabled\\:bg-input\\/80:is(.dark *):has(:disabled){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:has-disabled\\:bg-input\\/80:is(.dark *):has(:disabled){background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:dark\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/40:is(.dark *):has([data-slot][aria-invalid=true]){--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/40:is(.dark *):has([data-slot][aria-invalid=true]){--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}@media (hover:hover){.tw\\:dark\\:aria-disabled\\:hover\\:bg-transparent\\!:is(.dark *)[aria-disabled=true]:hover{background-color:#0000!important}}.tw\\:dark\\:aria-invalid\\:border-destructive\\/50:is(.dark *)[aria-invalid=true]{border-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:aria-invalid\\:border-destructive\\/50:is(.dark *)[aria-invalid=true]{border-color:color-mix(in oklab, var(--destructive) 50%, transparent)}}.tw\\:dark\\:aria-invalid\\:ring-destructive\\/40:is(.dark *)[aria-invalid=true]{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:aria-invalid\\:ring-destructive\\/40:is(.dark *)[aria-invalid=true]{--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/20:is(.dark *)[data-variant=destructive]:focus{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/20:is(.dark *)[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:data-open\\:animate-in:where([data-state=open]),.tw\\:data-open\\:animate-in:where([data-open]:not([data-open=false])){animation:enter var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-open\\:bg-accent:where([data-state=open]),.tw\\:data-open\\:bg-accent:where([data-open]:not([data-open=false])){background-color:var(--accent)}.tw\\:data-open\\:text-accent-foreground:where([data-state=open]),.tw\\:data-open\\:text-accent-foreground:where([data-open]:not([data-open=false])){color:var(--accent-foreground)}.tw\\:data-open\\:fade-in-0:where([data-state=open]),.tw\\:data-open\\:fade-in-0:where([data-open]:not([data-open=false])){--tw-enter-opacity:0}.tw\\:data-open\\:zoom-in-95:where([data-state=open]),.tw\\:data-open\\:zoom-in-95:where([data-open]:not([data-open=false])){--tw-enter-scale:.95}@media (hover:hover){:is(.tw\\:data-open\\:hover\\:bg-sidebar-accent:where([data-state=open]),.tw\\:data-open\\:hover\\:bg-sidebar-accent:where([data-open]:not([data-open=false]))):hover{background-color:var(--sidebar-accent)}:is(.tw\\:data-open\\:hover\\:text-sidebar-accent-foreground:where([data-state=open]),.tw\\:data-open\\:hover\\:text-sidebar-accent-foreground:where([data-open]:not([data-open=false]))):hover{color:var(--sidebar-accent-foreground)}}.tw\\:data-closed\\:animate-out:where([data-state=closed]),.tw\\:data-closed\\:animate-out:where([data-closed]:not([data-closed=false])){animation:exit var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-closed\\:fade-out-0:where([data-state=closed]),.tw\\:data-closed\\:fade-out-0:where([data-closed]:not([data-closed=false])){--tw-exit-opacity:0}.tw\\:data-closed\\:zoom-out-95:where([data-state=closed]),.tw\\:data-closed\\:zoom-out-95:where([data-closed]:not([data-closed=false])){--tw-exit-scale:.95}.tw\\:data-checked\\:border-primary:where([data-state=checked]),.tw\\:data-checked\\:border-primary:where([data-checked]:not([data-checked=false])){border-color:var(--primary)}.tw\\:data-checked\\:bg-primary:where([data-state=checked]),.tw\\:data-checked\\:bg-primary:where([data-checked]:not([data-checked=false])){background-color:var(--primary)}.tw\\:data-checked\\:text-primary-foreground:where([data-state=checked]),.tw\\:data-checked\\:text-primary-foreground:where([data-checked]:not([data-checked=false])){color:var(--primary-foreground)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=checked]),.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-checked]:not([data-checked=false])),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=checked]),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-checked]:not([data-checked=false])){--tw-translate-x:calc(100% - 2px);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=checked]),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-checked]:not([data-checked=false])),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=checked]),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-checked]:not([data-checked=false])){--tw-translate-x:calc(calc(100% - 2px) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:data-checked\\:bg-primary:is(.dark *):where([data-state=checked]),.tw\\:dark\\:data-checked\\:bg-primary:is(.dark *):where([data-checked]:not([data-checked=false])){background-color:var(--primary)}.tw\\:dark\\:data-checked\\:bg-primary-foreground:is(.dark *):where([data-state=checked]),.tw\\:dark\\:data-checked\\:bg-primary-foreground:is(.dark *):where([data-checked]:not([data-checked=false])){background-color:var(--primary-foreground)}.tw\\:data-unchecked\\:bg-input:where([data-state=unchecked]),.tw\\:data-unchecked\\:bg-input:where([data-unchecked]:not([data-unchecked=false])){background-color:var(--input)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=unchecked]),.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=unchecked]),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=unchecked]),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=unchecked]),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-unchecked]:not([data-unchecked=false])){--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:data-unchecked\\:bg-foreground:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-foreground:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:var(--foreground)}.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:data-selected\\:bg-muted:where([data-selected=true]),.tw\\:data-selected\\:bg-muted\\/50:where([data-selected=true]){background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-selected\\:bg-muted\\/50:where([data-selected=true]){background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:data-selected\\:bg-primary:where([data-selected=true]){background-color:var(--primary)}.tw\\:data-selected\\:bg-transparent:where([data-selected=true]){background-color:#0000}.tw\\:data-selected\\:text-foreground:where([data-selected=true]){color:var(--foreground)}.tw\\:data-selected\\:text-inherit:where([data-selected=true]){color:inherit}.tw\\:data-selected\\:text-muted-foreground\\/50:where([data-selected=true]){color:var(--muted-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-selected\\:text-muted-foreground\\/50:where([data-selected=true]){color:color-mix(in oklab, var(--muted-foreground) 50%, transparent)}}.tw\\:data-selected\\:text-primary-foreground:where([data-selected=true]){color:var(--primary-foreground)}.tw\\:data-selected\\:ring-2:where([data-selected=true]){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:data-selected\\:ring-primary-foreground\\/70:where([data-selected=true]){--tw-ring-color:var(--primary-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-selected\\:ring-primary-foreground\\/70:where([data-selected=true]){--tw-ring-color:color-mix(in oklab, var(--primary-foreground) 70%, transparent)}}.tw\\:data-selected\\:ring-ring\\/50:where([data-selected=true]){--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-selected\\:ring-ring\\/50:where([data-selected=true]){--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:data-selected\\:ring-inset:where([data-selected=true]){--tw-ring-inset:inset}@media (forced-colors:active){.tw\\:forced-colors\\:data-selected\\:outline-2:where([data-selected=true]){outline-style:var(--tw-outline-style);outline-width:2px}.tw\\:forced-colors\\:data-selected\\:-outline-offset-2:where([data-selected=true]){outline-offset:calc(2px * -1)}.tw\\:forced-colors\\:data-selected\\:outline-\\[color\\:Highlight\\]:where([data-selected=true]){outline-color:highlight}}.tw\\:data-disabled\\:pointer-events-none:where([data-disabled=true]),.tw\\:data-disabled\\:pointer-events-none:where([data-disabled]:not([data-disabled=false])){pointer-events:none}.tw\\:data-disabled\\:cursor-not-allowed:where([data-disabled=true]),.tw\\:data-disabled\\:cursor-not-allowed:where([data-disabled]:not([data-disabled=false])){cursor:not-allowed}.tw\\:data-disabled\\:opacity-50:where([data-disabled=true]),.tw\\:data-disabled\\:opacity-50:where([data-disabled]:not([data-disabled=false])){opacity:.5}.tw\\:data-active\\:bg-background:where([data-state=active]),.tw\\:data-active\\:bg-background:where([data-active]:not([data-active=false])){background-color:var(--background)}.tw\\:data-active\\:bg-sidebar-accent:where([data-state=active]),.tw\\:data-active\\:bg-sidebar-accent:where([data-active]:not([data-active=false])){background-color:var(--sidebar-accent)}.tw\\:data-active\\:font-medium:where([data-state=active]),.tw\\:data-active\\:font-medium:where([data-active]:not([data-active=false])){--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:data-active\\:text-foreground:where([data-state=active]),.tw\\:data-active\\:text-foreground:where([data-active]:not([data-active=false])){color:var(--foreground)}.tw\\:data-active\\:text-sidebar-accent-foreground:where([data-state=active]),.tw\\:data-active\\:text-sidebar-accent-foreground:where([data-active]:not([data-active=false])){color:var(--sidebar-accent-foreground)}.tw\\:group-data-\\[variant\\=default\\]\\/tabs-list\\:data-active\\:shadow-sm:is(:where(.tw\\:group\\/tabs-list)[data-variant=default] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=default\\]\\/tabs-list\\:data-active\\:shadow-sm:is(:where(.tw\\:group\\/tabs-list)[data-variant=default] *):where([data-active]:not([data-active=false])){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){background-color:#0000}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:shadow-none:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:shadow-none:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){--tw-shadow:0 0 #0000;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:is(.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:after\\:opacity-100:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:after\\:opacity-100:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false]))):after{content:var(--tw-content);opacity:1}.tw\\:dark\\:data-active\\:border-input:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:border-input:is(.dark *):where([data-active]:not([data-active=false])){border-color:var(--input)}.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-active]:not([data-active=false])){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-active]:not([data-active=false])){background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:dark\\:data-active\\:text-foreground:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:text-foreground:is(.dark *):where([data-active]:not([data-active=false])){color:var(--foreground)}.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:border-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:border-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){border-color:#0000}.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){background-color:#0000}.tw\\:data-horizontal\\:mx-px:where([data-orientation=horizontal]){margin-inline:1px}.tw\\:data-horizontal\\:h-1:where([data-orientation=horizontal]){height:calc(calc(var(--spacing)) * 1)}.tw\\:data-horizontal\\:h-full:where([data-orientation=horizontal]){height:100%}.tw\\:data-horizontal\\:h-px:where([data-orientation=horizontal]){height:1px}.tw\\:data-horizontal\\:w-auto:where([data-orientation=horizontal]){width:auto}.tw\\:data-horizontal\\:w-full:where([data-orientation=horizontal]){width:100%}.tw\\:data-horizontal\\:flex-col:where([data-orientation=horizontal]){flex-direction:column}.tw\\:data-vertical\\:my-px:where([data-orientation=vertical]){margin-block:1px}.tw\\:data-vertical\\:h-auto:where([data-orientation=vertical]){height:auto}.tw\\:data-vertical\\:h-full:where([data-orientation=vertical]){height:100%}.tw\\:data-vertical\\:min-h-40:where([data-orientation=vertical]){min-height:calc(calc(var(--spacing)) * 40)}.tw\\:data-vertical\\:w-1:where([data-orientation=vertical]){width:calc(calc(var(--spacing)) * 1)}.tw\\:data-vertical\\:w-auto:where([data-orientation=vertical]){width:auto}.tw\\:data-vertical\\:w-full:where([data-orientation=vertical]){width:100%}.tw\\:data-vertical\\:w-px:where([data-orientation=vertical]){width:1px}.tw\\:data-vertical\\:flex-col:where([data-orientation=vertical]){flex-direction:column}.tw\\:data-vertical\\:items-stretch:where([data-orientation=vertical]){align-items:stretch}.tw\\:data-vertical\\:self-stretch:where([data-orientation=vertical]){align-self:stretch}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:mt-0 [data-lexical-editor=true]>blockquote{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:border-s-0 [data-lexical-editor=true]>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:ps-0 [data-lexical-editor=true]>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:font-normal [data-lexical-editor=true]>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:text-foreground [data-lexical-editor=true]>blockquote{color:var(--foreground)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:not-italic [data-lexical-editor=true]>blockquote{font-style:normal}.tw\\:\\[\\&_a\\]\\:underline a{text-decoration-line:underline}.tw\\:\\[\\&_a\\]\\:underline-offset-3 a{text-underline-offset:3px}@media (hover:hover){.tw\\:\\[\\&_a\\]\\:hover\\:text-foreground a:hover{color:var(--foreground)}}.tw\\:\\[\\&_p\\]\\:my-0 p{margin-block:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_p\\:not\\(\\:last-child\\)\\]\\:mb-4 p:not(:last-child){margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_s\\]\\:text-destructive s{color:var(--destructive)}.tw\\:\\[\\&_s\\]\\:line-through s{text-decoration-line:line-through}.tw\\:\\[\\&_svg\\]\\:pointer-events-none svg{pointer-events:none}.tw\\:\\[\\&_svg\\]\\:size-4 svg{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_svg\\]\\:shrink-0 svg{flex-shrink:0}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3\\.5 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_tr\\]\\:border-b tr{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.tw\\:\\[\\&_tr\\:last-child\\]\\:border-0 tr:last-child{border-style:var(--tw-border-style);border-width:0}.tw\\:\\[\\&_u\\]\\:font-semibold u{--tw-font-weight:var(--tw-font-weight-semibold);font-weight:var(--tw-font-weight-semibold)}.tw\\:\\[\\&_u\\]\\:text-success-foreground u{color:var(--success-foreground)}.tw\\:\\[\\&_u\\]\\:no-underline u{text-decoration-line:none}.tw\\:\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:pe-0:has([role=checkbox]){padding-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\.border-b\\]\\:pb-2.border-b{padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:\\[\\.border-b\\]\\:pb-4.border-b{padding-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:\\[\\.border-b\\]\\:pb-3:is(:where(.tw\\:group\\/card)[data-size=sm] *).border-b{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:\\[\\.border-t\\]\\:pt-2.border-t{padding-top:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:px-2 *)[cmdk-group-heading]{padding-inline:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:py-1\\.5 *)[cmdk-group-heading]{padding-block:calc(calc(var(--spacing)) * 1.5)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:text-xs *)[cmdk-group-heading]{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:font-medium *)[cmdk-group-heading]{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:text-muted-foreground *)[cmdk-group-heading]{color:var(--muted-foreground)}:is(.tw\\:\\*\\:\\[a\\]\\:underline>*):is(a){text-decoration-line:underline}:is(.tw\\:\\*\\:\\[a\\]\\:underline-offset-3>*):is(a){text-underline-offset:3px}@media (hover:hover){.tw\\:\\[a\\]\\:hover\\:bg-destructive\\/20:is(a):hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-destructive\\/20:is(a):hover{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:\\[a\\]\\:hover\\:bg-muted:is(a):hover{background-color:var(--muted)}.tw\\:\\[a\\]\\:hover\\:bg-primary\\/80:is(a):hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-primary\\/80:is(a):hover{background-color:color-mix(in oklab, var(--primary) 80%, transparent)}}.tw\\:\\[a\\]\\:hover\\:bg-secondary\\/80:is(a):hover{background-color:var(--secondary)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-secondary\\/80:is(a):hover{background-color:color-mix(in oklab, var(--secondary) 80%, transparent)}}.tw\\:\\[a\\]\\:hover\\:text-muted-foreground:is(a):hover{color:var(--muted-foreground)}:is(.tw\\:\\*\\:\\[a\\]\\:hover\\:text-foreground>*):is(a):hover{color:var(--foreground)}}:is(.tw\\:\\*\\:\\[img\\]\\:row-span-2>*):is(img){grid-row:span 2/span 2}:is(.tw\\:\\*\\:\\[img\\]\\:translate-y-0\\.5>*):is(img){--tw-translate-y:calc(calc(var(--spacing)) * .5);translate:var(--tw-translate-x) var(--tw-translate-y)}:is(.tw\\:\\*\\:\\[img\\]\\:text-current>*):is(img){color:currentColor}:is(.tw\\:\\*\\:\\[img\\:first-child\\]\\:rounded-t-xl>*):is(img:first-child){border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}:is(.tw\\:\\*\\:\\[img\\:last-child\\]\\:rounded-b-xl>*):is(img:last-child){border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}:is(.tw\\:\\*\\:\\[img\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>*):is(img:not([class*=size-])){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:flex>*):is(span):last-child{display:flex}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:items-center>*):is(span):last-child{align-items:center}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:gap-2>*):is(span):last-child{gap:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\:\\[svg\\]\\:row-span-2>*):is(svg){grid-row:span 2/span 2}:is(.tw\\:\\*\\:\\[svg\\]\\:translate-y-0\\.5>*):is(svg){--tw-translate-y:calc(calc(var(--spacing)) * .5);translate:var(--tw-translate-x) var(--tw-translate-y)}:is(.tw\\:\\*\\:\\[svg\\]\\:text-current>*):is(svg){color:currentColor}:is(.tw\\:focus\\:\\*\\:\\[svg\\]\\:text-accent-foreground:focus>*):is(svg){color:var(--accent-foreground)}:is(.tw\\:data-\\[variant\\=destructive\\]\\:\\*\\:\\[svg\\]\\:text-destructive[data-variant=destructive]>*):is(svg){color:var(--destructive)}:is(.tw\\:data-\\[variant\\=destructive\\]\\:\\*\\:\\[svg\\]\\:text-destructive\\![data-variant=destructive]>*):is(svg){color:var(--destructive)!important}:is(.tw\\:data-selected\\:\\*\\:\\[svg\\]\\:text-foreground:where([data-selected=true])>*):is(svg){color:var(--foreground)}:is(.tw\\:\\*\\:\\[svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>*):is(svg:not([class*=size-])){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:rounded-s-none>:not(:first-child){border-start-start-radius:0;border-end-start-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:rounded-t-none>:not(:first-child){border-top-left-radius:0;border-top-right-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:border-s-0>:not(:first-child){border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:border-t-0>:not(:first-child){border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:rounded-e-none>:not(:last-child){border-start-end-radius:0;border-end-end-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:rounded-b-none>:not(:last-child){border-bottom-right-radius:0;border-bottom-left-radius:0}.tw\\:has-\\[select\\[aria-hidden\\=true\\]\\:last-child\\]\\:\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:last-of-type\\]\\:rounded-e-lg:has(:is(select[aria-hidden=true]:last-child))>[data-slot=select-trigger]:last-of-type{border-start-end-radius:var(--radius);border-end-end-radius:var(--radius)}.tw\\:\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:not\\(\\[class\\*\\=w-\\]\\)\\]\\:w-fit>[data-slot=select-trigger]:not([class*=w-]){width:fit-content}.tw\\:\\[\\&\\>\\[data-slot\\]\\:not\\(\\:has\\(\\~\\[data-slot\\]\\)\\)\\]\\:rounded-e-lg\\!>[data-slot]:not(:has(~[data-slot])){border-start-end-radius:var(--radius)!important;border-end-end-radius:var(--radius)!important}.tw\\:\\[\\&\\>\\[data-slot\\]\\:not\\(\\:has\\(\\~\\[data-slot\\]\\)\\)\\]\\:rounded-b-lg\\!>[data-slot]:not(:has(~[data-slot])){border-bottom-right-radius:var(--radius)!important;border-bottom-left-radius:var(--radius)!important}.tw\\:\\[\\&\\>a\\]\\:underline>a{text-decoration-line:underline}.tw\\:\\[\\&\\>a\\]\\:underline-offset-4>a{text-underline-offset:4px}.tw\\:\\[\\&\\>a\\:hover\\]\\:text-primary>a:hover{color:var(--primary)}.tw\\:\\[\\&\\>blockquote\\]\\:my-0>blockquote{margin-block:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:border-s-0>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&\\>blockquote\\]\\:p-0>blockquote{padding:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:ps-0>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:font-normal>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&\\>blockquote\\]\\:text-foreground>blockquote{color:var(--foreground)}.tw\\:\\[\\&\\>blockquote\\]\\:not-italic>blockquote{font-style:normal}.tw\\:\\[\\&\\>input\\]\\:flex-1>input{flex:1}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:\\[\\&\\>input\\]\\:pt-3:has(>[data-align=block-end])>input{padding-top:calc(calc(var(--spacing)) * 3)}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:\\[\\&\\>input\\]\\:pb-3:has(>[data-align=block-start])>input{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:has-\\[\\>\\[data-align\\=inline-end\\]\\]\\:\\[\\&\\>input\\]\\:pe-1\\.5:has(>[data-align=inline-end])>input{padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-\\[\\>\\[data-align\\=inline-start\\]\\]\\:\\[\\&\\>input\\]\\:ps-1\\.5:has(>[data-align=inline-start])>input{padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:\\[\\&\\>kbd\\]\\:rounded-\\[calc\\(var\\(--radius\\)-5px\\)\\]>kbd{border-radius:calc(var(--radius) - 5px)}.tw\\:\\[\\&\\>li\\]\\:mt-2>li{margin-top:calc(calc(var(--spacing)) * 2)}.tw\\:\\[\\&\\>span\\:last-child\\]\\:truncate>span:last-child{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.tw\\:\\[\\&\\>svg\\]\\:pointer-events-none>svg{pointer-events:none}.tw\\:\\[\\&\\>svg\\]\\:hidden>svg{display:none}.tw\\:\\[\\&\\>svg\\]\\:size-3\\!>svg{width:calc(calc(var(--spacing)) * 3)!important;height:calc(calc(var(--spacing)) * 3)!important}.tw\\:\\[\\&\\>svg\\]\\:size-3\\.5>svg{width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&\\>svg\\]\\:size-4>svg{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>svg\\]\\:shrink-0>svg{flex-shrink:0}.tw\\:\\[\\&\\>svg\\]\\:text-sidebar-accent-foreground>svg{color:var(--sidebar-accent-foreground)}.tw\\:group-has-data-\\[size\\=lg\\]\\/avatar-group\\:\\[\\&\\>svg\\]\\:size-5:is(:where(.tw\\:group\\/avatar-group):has([data-size=lg]) *)>svg{width:calc(calc(var(--spacing)) * 5);height:calc(calc(var(--spacing)) * 5)}.tw\\:group-has-data-\\[size\\=sm\\]\\/avatar-group\\:\\[\\&\\>svg\\]\\:size-3:is(:where(.tw\\:group\\/avatar-group):has([data-size=sm]) *)>svg{width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=default\\]\\/avatar\\:\\[\\&\\>svg\\]\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=default] *)>svg,.tw\\:group-data-\\[size\\=lg\\]\\/avatar\\:\\[\\&\\>svg\\]\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=lg] *)>svg{width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:\\[\\&\\>svg\\]\\:hidden:is(:where(.tw\\:group\\/avatar)[data-size=sm] *)>svg,.tw\\:\\[\\&\\>svg\\:last-child\\]\\:hidden>svg:last-child{display:none}.tw\\:\\[\\&\\>svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3\\.5>svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&\\>svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>tr\\]\\:last\\:border-b-0>tr:last-child{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.tw\\:\\[\\&\\[align\\=center\\]\\]\\:text-center[align=center]{text-align:center}.tw\\:\\[\\&\\[align\\=right\\]\\]\\:text-right[align=right]{text-align:right}.tw\\:\\[\\&\\[aria-orientation\\=horizontal\\]\\>div\\]\\:rotate-90[aria-orientation=horizontal]>div{rotate:90deg}[data-side=primary][data-collapsible=offcanvas] .tw\\:\\[\\[data-side\\=primary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-end-2{inset-inline-end:calc(calc(var(--spacing)) * -2)}[data-side=primary][data-state=collapsed] .tw\\:\\[\\[data-side\\=primary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-e-resize{cursor:e-resize}[data-side=primary][data-state=collapsed] .tw\\:rtl\\:\\[\\[data-side\\=primary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-w-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:w-resize}[data-side=secondary][data-collapsible=offcanvas] .tw\\:\\[\\[data-side\\=secondary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-start-2{inset-inline-start:calc(calc(var(--spacing)) * -2)}[data-side=secondary][data-state=collapsed] .tw\\:\\[\\[data-side\\=secondary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-w-resize{cursor:w-resize}[data-side=secondary][data-state=collapsed] .tw\\:rtl\\:\\[\\[data-side\\=secondary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-e-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:e-resize}}@property --tw-animation-delay{syntax:"*";inherits:false;initial-value:0s}@property --tw-animation-direction{syntax:"*";inherits:false;initial-value:normal}@property --tw-animation-duration{syntax:"*";inherits:false}@property --tw-animation-fill-mode{syntax:"*";inherits:false;initial-value:none}@property --tw-animation-iteration-count{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-blur{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-opacity{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-rotate{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-scale{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-blur{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-opacity{syntax:"*";inherits:false;initial-value:1}@property --tw-exit-rotate{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-scale{syntax:"*";inherits:false;initial-value:1}@property --tw-exit-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-translate-y{syntax:"*";inherits:false;initial-value:0}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-cyrillic-ext-wght-normal.woff2)format("woff2-variations");unicode-range:U+460-52F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-cyrillic-wght-normal.woff2)format("woff2-variations");unicode-range:U+301,U+400-45F,U+490-491,U+4B0-4B1,U+2116}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-greek-wght-normal.woff2)format("woff2-variations");unicode-range:U+370-377,U+37A-37F,U+384-38A,U+38C,U+38E-3A1,U+3A3-3FF}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-vietnamese-wght-normal.woff2)format("woff2-variations");unicode-range:U+102-103,U+110-111,U+128-129,U+168-169,U+1A0-1A1,U+1AF-1B0,U+300-301,U+303-304,U+308-309,U+323,U+329,U+1EA0-1EF9,U+20AB}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-latin-ext-wght-normal.woff2)format("woff2-variations");unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-latin-wght-normal.woff2)format("woff2-variations");unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}.light,:root{--radius:.625rem;--spacing:.25rem;--background:oklch(100% 0 0);--foreground:oklch(13.71% .036 258.53);--card:oklch(100% 0 0);--card-foreground:oklch(13.71% .036 258.53);--popover:oklch(98.43% .0018 248.56);--popover-foreground:oklch(13.71% .036 258.53);--primary:oklch(20.79% .0399 265.73);--primary-foreground:oklch(98.38% .0036 248.23);--secondary:oklch(95.89% .011 248.06);--secondary-foreground:oklch(20.79% .0399 265.73);--muted:oklch(95.89% .011 248.06);--muted-foreground:oklch(55.47% .0408 257.45);--accent:oklch(95.89% .011 248.06);--accent-foreground:oklch(20.79% .0399 265.73);--destructive:oklch(63.69% .2077 25.32);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(62.7% .194 149.214);--diff-deleted:oklch(57.7% .245 27.325);--warning:oklch(84% .16 84);--warning-foreground:oklch(28% .07 46);--border:oklch(92.9% .0127 255.58);--input:oklch(92.9% .0127 255.58);--ring:oklch(13.71% .036 258.53);--chart-1:oklch(64.6% .222 41.116);--chart-2:oklch(60% .118 184.704);--chart-3:oklch(39.8% .07 227.392);--chart-4:oklch(82.8% .189 84.429);--chart-5:oklch(76.9% .188 70.08);--sidebar:oklch(98.43% .0018 248.56);--sidebar-foreground:oklch(13.71% .036 258.53);--sidebar-primary:oklch(20.79% .0399 265.73);--sidebar-primary-foreground:oklch(98.38% .0036 248.23);--sidebar-accent:oklch(95.89% .011 248.06);--sidebar-accent-foreground:oklch(20.79% .0399 265.73);--sidebar-border:oklch(92.9% .0127 255.58);--sidebar-ring:oklch(13.71% .036 258.53)}.dark{--background:oklch(13.71% .036 258.53);--foreground:oklch(98.38% .0036 248.23);--card:oklch(13.71% .036 258.53);--card-foreground:oklch(98.38% .0036 248.23);--popover:oklch(13.71% .036 258.53);--popover-foreground:oklch(98.38% .0036 248.23);--primary:oklch(98.38% .0036 248.23);--primary-foreground:oklch(20.79% .0399 265.73);--secondary:oklch(28% .037 259.98);--secondary-foreground:oklch(98.38% .0036 248.23);--muted:oklch(28% .037 259.98);--muted-foreground:oklch(71.07% .0351 256.8);--accent:oklch(28% .037 259.98);--accent-foreground:oklch(98.38% .0036 248.23);--destructive:oklch(39.6% .1331 25.71);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(79.2% .209 151.711);--diff-deleted:oklch(70.4% .191 22.216);--warning:oklch(41% .11 46);--warning-foreground:oklch(99% .02 95);--border:oklch(44.54% .0374 257.3);--input:oklch(44.54% .0374 257.3);--ring:oklch(86.88% .0199 252.89);--chart-1:oklch(48.8% .243 264.376);--chart-2:oklch(69.6% .17 162.48);--chart-3:oklch(76.9% .188 70.08);--chart-4:oklch(62.7% .265 303.9);--chart-5:oklch(64.5% .246 16.439);--sidebar:oklch(13.71% .036 258.53);--sidebar-foreground:oklch(71.07% .0351 256.8);--sidebar-primary:oklch(98.38% .0036 248.23);--sidebar-primary-foreground:oklch(20.79% .0399 265.73);--sidebar-accent:oklch(28% .037 259.98);--sidebar-accent-foreground:oklch(71.07% .0351 256.8);--sidebar-border:oklch(28% .037 259.98);--sidebar-ring:oklch(86.88% .0199 252.89)}.paratext-light{--background:oklch(100% 0 0);--foreground:oklch(15.3% .006 107.1);--card:oklch(100% 0 0);--card-foreground:oklch(15.3% .006 107.1);--popover:oklch(100% 0 0);--popover-foreground:oklch(15.3% .006 107.1);--primary:oklch(55.5% .163 48.998);--primary-foreground:oklch(98.7% .022 95.277);--secondary:oklch(96.7% .001 286.375);--secondary-foreground:oklch(21% .006 285.885);--muted:oklch(96.6% .005 106.5);--muted-foreground:oklch(58% .031 107.3);--accent:oklch(96.6% .005 106.5);--accent-foreground:oklch(22.8% .013 107.4);--destructive:oklch(57.7% .245 27.325);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(62.7% .194 149.214);--diff-deleted:oklch(57.7% .245 27.325);--warning:oklch(84% .16 84);--warning-foreground:oklch(28% .07 46);--border:oklch(93% .007 106.5);--input:oklch(93% .007 106.5);--ring:oklch(73.7% .021 106.9);--chart-1:oklch(88% .011 106.6);--chart-2:oklch(58% .031 107.3);--chart-3:oklch(46.6% .025 107.3);--chart-4:oklch(39.4% .023 107.4);--chart-5:oklch(28.6% .016 107.4);--sidebar:oklch(98.8% .003 106.5);--sidebar-foreground:oklch(15.3% .006 107.1);--sidebar-primary:oklch(66.6% .179 58.318);--sidebar-primary-foreground:oklch(98.7% .022 95.277);--sidebar-accent:oklch(96.6% .005 106.5);--sidebar-accent-foreground:oklch(22.8% .013 107.4);--sidebar-border:oklch(93% .007 106.5);--sidebar-ring:oklch(73.7% .021 106.9)}.paratext-dark{--background:oklch(15.3% .006 107.1);--foreground:oklch(98.8% .003 106.5);--card:oklch(22.8% .013 107.4);--card-foreground:oklch(98.8% .003 106.5);--popover:oklch(22.8% .013 107.4);--popover-foreground:oklch(98.8% .003 106.5);--primary:oklch(47.3% .137 46.201);--primary-foreground:oklch(98.7% .022 95.277);--secondary:oklch(27.4% .006 286.033);--secondary-foreground:oklch(98.5% 0 0);--muted:oklch(28.6% .016 107.4);--muted-foreground:oklch(73.7% .021 106.9);--accent:oklch(28.6% .016 107.4);--accent-foreground:oklch(98.8% .003 106.5);--destructive:oklch(70.4% .191 22.216);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(79.2% .209 151.711);--diff-deleted:oklch(70.4% .191 22.216);--warning:oklch(41% .11 46);--warning-foreground:oklch(99% .02 95);--border:oklch(100% 0 0/.1);--input:oklch(100% 0 0/.15);--ring:oklch(58% .031 107.3);--chart-1:oklch(88% .011 106.6);--chart-2:oklch(58% .031 107.3);--chart-3:oklch(46.6% .025 107.3);--chart-4:oklch(39.4% .023 107.4);--chart-5:oklch(28.6% .016 107.4);--sidebar:oklch(22.8% .013 107.4);--sidebar-foreground:oklch(98.8% .003 106.5);--sidebar-primary:oklch(76.9% .188 70.08);--sidebar-primary-foreground:oklch(27.9% .077 45.635);--sidebar-accent:oklch(28.6% .016 107.4);--sidebar-accent-foreground:oklch(98.8% .003 106.5);--sidebar-border:oklch(100% 0 0/.1);--sidebar-ring:oklch(58% .031 107.3)}@property --tw-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-z{syntax:"*";inherits:false;initial-value:0}@property --tw-rotate-x{syntax:"*";inherits:false}@property --tw-rotate-y{syntax:"*";inherits:false}@property --tw-rotate-z{syntax:"*";inherits:false}@property --tw-skew-x{syntax:"*";inherits:false}@property --tw-skew-y{syntax:"*";inherits:false}@property --tw-space-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-space-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-divide-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-divide-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-gradient-position{syntax:"*";inherits:false}@property --tw-gradient-from{syntax:"<color>";inherits:false;initial-value:#0000}@property --tw-gradient-via{syntax:"<color>";inherits:false;initial-value:#0000}@property --tw-gradient-to{syntax:"<color>";inherits:false;initial-value:#0000}@property --tw-gradient-stops{syntax:"*";inherits:false}@property --tw-gradient-via-stops{syntax:"*";inherits:false}@property --tw-gradient-from-position{syntax:"<length-percentage>";inherits:false;initial-value:0%}@property --tw-gradient-via-position{syntax:"<length-percentage>";inherits:false;initial-value:50%}@property --tw-gradient-to-position{syntax:"<length-percentage>";inherits:false;initial-value:100%}@property --tw-leading{syntax:"*";inherits:false}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-tracking{syntax:"*";inherits:false}@property --tw-ordinal{syntax:"*";inherits:false}@property --tw-slashed-zero{syntax:"*";inherits:false}@property --tw-numeric-figure{syntax:"*";inherits:false}@property --tw-numeric-spacing{syntax:"*";inherits:false}@property --tw-numeric-fraction{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-blur{syntax:"*";inherits:false}@property --tw-brightness{syntax:"*";inherits:false}@property --tw-contrast{syntax:"*";inherits:false}@property --tw-grayscale{syntax:"*";inherits:false}@property --tw-hue-rotate{syntax:"*";inherits:false}@property --tw-invert{syntax:"*";inherits:false}@property --tw-opacity{syntax:"*";inherits:false}@property --tw-saturate{syntax:"*";inherits:false}@property --tw-sepia{syntax:"*";inherits:false}@property --tw-drop-shadow{syntax:"*";inherits:false}@property --tw-drop-shadow-color{syntax:"*";inherits:false}@property --tw-drop-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:"*";inherits:false}@property --tw-duration{syntax:"*";inherits:false}@property --tw-ease{syntax:"*";inherits:false}@property --tw-content{syntax:"*";inherits:false;initial-value:""}@property --tw-outline-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-backdrop-blur{syntax:"*";inherits:false}@property --tw-backdrop-brightness{syntax:"*";inherits:false}@property --tw-backdrop-contrast{syntax:"*";inherits:false}@property --tw-backdrop-grayscale{syntax:"*";inherits:false}@property --tw-backdrop-hue-rotate{syntax:"*";inherits:false}@property --tw-backdrop-invert{syntax:"*";inherits:false}@property --tw-backdrop-opacity{syntax:"*";inherits:false}@property --tw-backdrop-saturate{syntax:"*";inherits:false}@property --tw-backdrop-sepia{syntax:"*";inherits:false}@keyframes spin{to{transform:rotate(360deg)}}@keyframes pulse{50%{opacity:.5}}@keyframes enter{0%{opacity:var(--tw-enter-opacity,1);transform:translate3d(var(--tw-enter-translate-x,0),var(--tw-enter-translate-y,0),0)scale3d(var(--tw-enter-scale,1),var(--tw-enter-scale,1),var(--tw-enter-scale,1))rotate(var(--tw-enter-rotate,0));filter:blur(var(--tw-enter-blur,0))}}@keyframes exit{to{opacity:var(--tw-exit-opacity,1);transform:translate3d(var(--tw-exit-translate-x,0),var(--tw-exit-translate-y,0),0)scale3d(var(--tw-exit-scale,1),var(--tw-exit-scale,1),var(--tw-exit-scale,1))rotate(var(--tw-exit-rotate,0));filter:blur(var(--tw-exit-blur,0))}}
/**
 * This file was automatically generated on installation of the Shadcn/Lexical editor. The default
 * location of this file has been changed to integrate better with our project structure.
 *
 * Original file location: src/components/editor/themes/editor-theme.css
 *
 * Shadcn/Lexical Editor Documentation: https://shadcn-editor.vercel.app/docs/
 */

/* stylelint-disable selector-class-pattern */
/* Lexical editor theme classes use camelCase naming convention */

.EditorTheme__code {
  background-color: transparent;
  font-family: Menlo, Consolas, Monaco, monospace;
  display: block;
  padding: 8px 8px 8px 52px;
  line-height: 1.53;
  font-size: 13px;
  margin: 0;
  margin-top: 8px;
  margin-bottom: 8px;
  overflow-x: auto;
  border: 1px solid #ccc;
  position: relative;
  border-radius: 8px;
  tab-size: 2;
}

.EditorTheme__code::before {
  content: attr(data-gutter);
  position: absolute;
  background-color: transparent;
  border-right: 1px solid #ccc;
  left: 0;
  top: 0;
  padding: 8px;
  color: #777;
  white-space: pre-wrap;
  text-align: right;
  min-width: 25px;
}

.EditorTheme__table {
  border-collapse: collapse;
  border-spacing: 0;
  overflow-y: scroll;
  overflow-x: scroll;
  table-layout: fixed;
  width: fit-content;
  width: 100%;
  margin: 0 0 30px;
}

.EditorTheme__tokenComment {
  color: slategray;
}

.EditorTheme__tokenPunctuation {
  color: #999;
}

.EditorTheme__tokenProperty {
  color: #905;
}

.EditorTheme__tokenSelector {
  color: #690;
}

.EditorTheme__tokenOperator {
  color: #9a6e3a;
}

.EditorTheme__tokenAttr {
  color: #07a;
}

.EditorTheme__tokenVariable {
  color: #e90;
}

.EditorTheme__tokenFunction {
  color: #dd4a68;
}

.Collapsible__container {
  background-color: var(--background);
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
}

.Collapsible__title {
  padding: 0.25rem;
  padding-left: 1rem;
  position: relative;
  font-weight: bold;
  outline: none;
  cursor: pointer;
  list-style-type: disclosure-closed;
  list-style-position: inside;
}

.Collapsible__title p {
  display: inline-flex;
}

.Collapsible__title::marker {
  color: lightgray;
}

.Collapsible__container[open] > .Collapsible__title {
  list-style-type: disclosure-open;
}
`, "after-all");
export {
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  AvatarFallback,
  AvatarImage,
  BOOK_CHAPTER_CONTROL_STRING_KEYS,
  BOOK_SELECTOR_STRING_KEYS,
  Badge,
  BookChapterControl,
  BookSelectionMode,
  BookSelector,
  Button,
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  CANCEL_ACCEPT_BUTTONS_STRING_KEYS,
  COMMENT_EDITOR_STRING_KEYS,
  COMMENT_LIST_ELEMENT_ID,
  COMMENT_LIST_STRING_KEYS,
  CONFLICT_NOTE_STRING_KEYS,
  CONTENT_ZOOM_LABEL_ATTRIBUTE,
  CONTENT_ZOOM_ROOT_ATTRIBUTE,
  CONTENT_ZOOM_SCOPE_ATTRIBUTE,
  CancelAcceptButtons,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  ChapterRangeSelector,
  Checkbox,
  CheckboxGroup,
  Checklist,
  ComboBox,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommentEditor,
  CommentList,
  ConflictNoteCard,
  ContentZoomRoot,
  ContentZoomTextProvider,
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
  DataTable,
  DestructiveKeyConfirmation,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DisabledActionTooltip,
  DisabledTooltipWrapper,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuItemType,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  ERROR_DUMP_STRING_KEYS,
  ERROR_POPOVER_STRING_KEYS,
  EditorKeyboardShortcuts,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyState,
  EmptyTitle,
  ErrorDump,
  ErrorPopover,
  FOOTNOTE_EDITOR_STRING_KEYS,
  Filter,
  FilterDropdown,
  Footer,
  FootnoteEditor,
  FootnoteItem,
  FootnoteList,
  INLINE_APPLY_DEBOUNCE_MS,
  INTERFACE_LANGUAGE_PICKER_STRING_KEYS,
  INVENTORY_STRING_KEYS,
  Input,
  InterfaceLanguagePicker,
  Inventory,
  Kbd,
  KbdGroup,
  Label,
  MARKER_MENU_STRING_KEYS,
  MarkdownRenderer,
  MarkerMenu,
  MoreInfo,
  MultiSelectComboBox,
  TabNavigationContentSearch as NavigationContentSearch,
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverPortalContainerProvider,
  PopoverTitle,
  PopoverTrigger,
  Progress,
  RadioGroup,
  RadioGroupItem,
  RecentSearches,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  ResultsCard,
  RetryableErrorView,
  SCOPE_SELECTOR_STRING_KEYS,
  SELECT_BOOKS_STRING_KEYS,
  SHRINK_STEP,
  ScopeSelector,
  ScriptureResultsViewer,
  ScrollGroupSelector,
  SearchBar,
  Select,
  SelectBooks,
  SelectBooksPicker,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  Separator,
  SettingsList,
  SettingsListHeader,
  SettingsListItem,
  SettingsSidebar,
  SettingsSidebarContentSearch,
  ShrinkStepContext,
  ShrinkStepOverride,
  ShrinkStepOverrideContext,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  Skeleton,
  Slider,
  Toaster as Sonner,
  Spinner,
  Switch,
  TOOLTIP_DELAY_MS,
  TabDropdownMenu,
  TabFloatingMenu,
  TabToolbar,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TextField,
  Textarea,
  ToggleGroup,
  ToggleGroupItem,
  Toolbar,
  ToolbarCompoundLabel,
  Tooltip,
  TooltipContent,
  TooltipPortalContainerProvider,
  TooltipProvider,
  TooltipTrigger,
  UNDO_REDO_BUTTONS_STRING_KEYS,
  UiLanguageSelector,
  UndoRedoButtons,
  VerticalTabs,
  VerticalTabsContent,
  VerticalTabsList,
  VerticalTabsTrigger,
  WizardStepper,
  Z_INDEX_ABOVE_DOCK,
  Z_INDEX_ABOVE_POPOVER,
  Z_INDEX_CONNECTION_LOST,
  Z_INDEX_FIRST_RUN,
  Z_INDEX_MODAL,
  Z_INDEX_MODAL_BACKDROP,
  Z_INDEX_NESTED_MODAL,
  Z_INDEX_NESTED_MODAL_BACKDROP,
  Z_INDEX_ONBOARDING_TOUR,
  Z_INDEX_OVERLAY,
  badgeVariants,
  buttonGroupVariants,
  buttonVariants,
  cn,
  getBookIdFromUSFM,
  getCaretPositionFromClick,
  getCommentThreadElementId,
  getInventoryHeader,
  getLinesFromUSFM,
  getNumberFromUSFM,
  getStatusForItem,
  getToolbarOSReservedSpaceClassName,
  inventoryCountColumn,
  inventoryItemColumn,
  inventoryStatusColumn,
  isCommentDraftEmpty,
  isGroupUnderColumnOrSubMenu,
  isMacOs,
  isRunningInWebView,
  isUnclosedNoteOp,
  isWindows,
  leftEdgeRect,
  localizeOrFallback,
  measureBox,
  pickTabIconUrl,
  shouldSuppressFocusReturn,
  toast as sonner,
  useContentZoomTextProps,
  useDismissOnWindowBlur,
  useEvent,
  useEventAsync,
  useEventSeededState,
  useExtraValidMarkers,
  useHasContentBelow,
  useListbox,
  useLivePopoverAnchor,
  usePromise,
  useRecentSearches,
  useRetryablePromise,
  useRunWhenVisible,
  useShrinkStep,
  useShrinkStepOverride,
  useShrinkStepValue,
  useSidebar,
  useStylesheet,
  useTabIconSelection,
  useTruncationTooltip,
  useViewVisibility
};
//# sourceMappingURL=index.js.map
