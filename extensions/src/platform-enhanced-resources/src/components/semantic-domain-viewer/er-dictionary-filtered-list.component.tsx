import {
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Z_INDEX_MODAL,
  cn,
} from 'platform-bible-react';
import { type IndexedListItem, type SemanticDomain } from 'platform-bible-react/internal';
import { ArrowUp, ChevronRight, MoreHorizontal } from 'lucide-react';
import type { ErDictionaryFilteredListProps } from './er-dictionary-filtered-list.types';

/** Minimum width in pixels for the list panel when shown side-by-side with details. */
const LIST_MIN_PX = 100;
/** Minimum width in pixels for the detail panel when shown side-by-side with the list. */
const DETAIL_MIN_PX = 150;

/**
 * ER Dictionary list filtered by semantic domain with breadcrumb navigation.
 *
 * Each breadcrumb segment opens a DropdownMenu with a keyboard-navigable domain tree. The list
 * supports arrow-key navigation: in wide mode arrows immediately select items; in narrow mode
 * arrows move focus and Enter/Space submits.
 */
export default function ErDictionaryFilteredList<T extends IndexedListItem>({
  items,
  renderItem,
  renderDetailContent,
  onItemClick,
  selectedItemId,
  emptyStateMessage,
  isLoading,
  domainPath,
  allDomains,
  onDomainChange,
  onClose,
  className,
}: ErDictionaryFilteredListProps<T>) {
  const [selectedId, setSelectedId] = useState<string | undefined>(selectedItemId);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  // React useRef requires null initial value
  // eslint-disable-next-line no-null/no-null
  const containerRef = useRef<HTMLDivElement>(null);
  // React useRef requires null initial value
  // eslint-disable-next-line no-null/no-null
  const listRef = useRef<HTMLUListElement>(null);
  const [narrow, setNarrow] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;
    const observer = new ResizeObserver(([entry]) => {
      const width = entry?.contentRect.width ?? 0;
      setContainerWidth(width);
      setNarrow(width < 350);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // react-resizable-panels only accepts percentages; convert the pixel minima
  // to percentages based on the observed container width.
  const listMinPct = containerWidth > 0 ? (LIST_MIN_PX / containerWidth) * 100 : 20;
  const detailMinPct = containerWidth > 0 ? (DETAIL_MIN_PX / containerWidth) * 100 : 30;

  // Focus the list on mount so the user can arrow-navigate immediately when
  // the drawer / dialog opens. :focus-visible stays off because the last user
  // input was a click (domain link / tab), which is the desired behavior.
  useEffect(() => {
    listRef.current?.focus();
  }, []);

  const handleDomainSelect = useCallback(
    (path: SemanticDomain[]) => {
      onDomainChange(path);
      setSelectedId(undefined);
    },
    [onDomainChange],
  );

  const selectedItem = items.find((item) => item.id === selectedId);
  const showSideBySide = selectedItem && !narrow;
  const showFullDetail = selectedItem && narrow;

  const selectItem = useCallback(
    (item: T) => {
      onItemClick?.(item);
      setSelectedId(item.id === selectedId ? undefined : item.id);
    },
    [onItemClick, selectedId],
  );

  // List keyboard: arrow keys navigate, behavior depends on narrow/wide.
  // First keypress starts from the selected item (or first/last if none selected).
  // At the boundaries the list stays put (no wrap, no reselect).
  const handleListKeyDown = useCallback(
    (e: ReactKeyboardEvent) => {
      if (items.length === 0) return;
      const selectedIdx = selectedId ? items.findIndex((i) => i.id === selectedId) : -1;
      const startIdx = focusedIndex >= 0 ? focusedIndex : selectedIdx;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = startIdx < 0 ? 0 : Math.min(startIdx + 1, items.length - 1);
        if (next === focusedIndex) return;
        setFocusedIndex(next);
        if (!narrow) selectItem(items[next]);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = startIdx < 0 ? items.length - 1 : Math.max(startIdx - 1, 0);
        if (prev === focusedIndex) return;
        setFocusedIndex(prev);
        if (!narrow) selectItem(items[prev]);
      } else if ((e.key === 'Enter' || e.key === ' ') && narrow && focusedIndex >= 0) {
        e.preventDefault();
        selectItem(items[focusedIndex]);
      }
    },
    [items, focusedIndex, narrow, selectItem, selectedId],
  );

  // On close, restore focus to the list and set the focused index to the
  // previously-selected item so ArrowUp/Down pick up from there.
  const handleCloseDetail = useCallback(() => {
    const closingId = selectedId;
    setSelectedId(undefined);
    if (closingId) {
      const idx = items.findIndex((i) => i.id === closingId);
      if (idx >= 0) setFocusedIndex(idx);
      requestAnimationFrame(() => {
        listRef.current?.focus();
      });
    }
  }, [items, selectedId]);

  // Scroll focused item into view
  useEffect(() => {
    if (focusedIndex < 0 || !listRef.current) return;
    const li = listRef.current.children[focusedIndex];
    if (li instanceof HTMLElement) li.scrollIntoView({ block: 'nearest' });
  }, [focusedIndex]);

  // When detail opens in narrow (full-detail) mode the list is unmounted, so
  // move focus to the Back button. In side-by-side mode focus stays on the
  // list so repeated Up/Down arrows continue to work.
  // React useRef requires null initial value
  // eslint-disable-next-line no-null/no-null
  const detailPanelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!narrow || !selectedId) return;
    const back = detailPanelRef.current?.querySelector<HTMLButtonElement>('[data-back-to-list]');
    back?.focus();
  }, [narrow, selectedId]);

  // Switching from list-only to side-by-side replaces the list's wrapper with
  // a ResizablePanelGroup, which remounts the <ul> and drops keyboard focus.
  // Re-focus it so repeated Up/Down after the first selection keep working.
  const isSideBySide = !!showSideBySide;
  useEffect(() => {
    if (isSideBySide) listRef.current?.focus();
  }, [isSideBySide]);

  const renderListBody = (): ReactNode => {
    if (isLoading) {
      return <div className="tw:p-4 tw:text-sm tw:text-muted-foreground">Loading...</div>;
    }
    if (items.length === 0) {
      return (
        <div className="tw:p-4 tw:text-sm tw:text-muted-foreground">
          {emptyStateMessage ?? 'No items found'}
        </div>
      );
    }
    return (
      <ul
        ref={listRef}
        role="listbox"
        tabIndex={0}
        className="tw:p-0.5 tw:outline-none tw:focus-visible:ring-2 tw:focus-visible:ring-inset tw:focus-visible:ring-ring"
        onKeyDown={handleListKeyDown}
      >
        {items.map((item, idx) => {
          const isSelected = selectedId === item.id;
          const isFocused = focusedIndex === idx;
          return (
            // Keyboard activation is handled at the parent <ul role="listbox">
            // via handleListKeyDown (Arrow/Enter/Space). Each <li role="option">
            // is selected by listbox semantics, not its own keydown handler.
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <li
              key={item.id}
              role="option"
              aria-selected={isSelected}
              onClick={() => {
                setFocusedIndex(-1);
                selectItem(item);
              }}
              className={cn('tw:cursor-pointer tw:border-b tw:p-2', {
                'tw:bg-muted': isSelected,
                'tw:hover:bg-muted': !isSelected,
                'tw:ring-1 tw:ring-inset tw:ring-ring': isFocused && !isSelected,
              })}
            >
              {renderItem ? (
                renderItem(item)
              ) : (
                <span className="tw:text-sm">{item.primaryText}</span>
              )}
            </li>
          );
        })}
      </ul>
    );
  };
  const listElement = renderListBody();

  return (
    <div className={cn('tw:flex tw:h-full tw:flex-col tw:overflow-hidden', className)}>
      {/* Header: breadcrumbs + back */}
      <div className="tw:flex tw:items-center tw:gap-1 tw:border-b tw:px-2 tw:py-1.5">
        <div className="tw:min-w-0 tw:flex-1">
          <BreadcrumbBar
            path={domainPath}
            allDomains={allDomains}
            onDomainSelect={handleDomainSelect}
          />
        </div>
        {onClose && (
          <Button variant="ghost" size="sm" className="tw:shrink-0 tw:gap-1" onClick={onClose}>
            <ArrowUp className="tw:h-4 tw:w-4" />
            Back
          </Button>
        )}
      </div>

      {/* Inline list + detail */}
      <div ref={containerRef} className="tw:relative tw:flex tw:flex-1 tw:overflow-hidden">
        {renderListAndDetail({
          showSideBySide: !!showSideBySide,
          showFullDetail: !!showFullDetail,
          listElement,
          detailElement:
            selectedItem && renderDetailContent
              ? renderDetailContent(selectedItem, handleCloseDetail)
              : undefined,
          listMinPct,
          detailMinPct,
          detailPanelRef,
        })}
      </div>
    </div>
  );
}

/**
 * Renders the list / detail area in one of three layouts (side-by-side with a draggable separator,
 * full-detail in narrow mode, or list only). Extracted as a helper so the main component body
 * avoids nested ternaries.
 */
function renderListAndDetail({
  showSideBySide,
  showFullDetail,
  listElement,
  detailElement,
  listMinPct,
  detailMinPct,
  detailPanelRef,
}: {
  showSideBySide: boolean;
  showFullDetail: boolean;
  listElement: ReactNode;
  detailElement: ReactNode;
  listMinPct: number;
  detailMinPct: number;
  detailPanelRef: RefObject<HTMLDivElement | null>;
}): ReactNode {
  if (showSideBySide && detailElement !== undefined) {
    return (
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={33.3333} minSize={listMinPct}>
          <div className="tw:h-full tw:overflow-y-auto">{listElement}</div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={66.6667} minSize={detailMinPct}>
          <div className="tw:h-full tw:overflow-y-auto tw:bg-background tw:p-4">
            {detailElement}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    );
  }
  if (showFullDetail && detailElement !== undefined) {
    return (
      <div
        ref={detailPanelRef}
        className="tw:h-full tw:w-full tw:overflow-y-auto tw:bg-background tw:p-4"
      >
        {detailElement}
      </div>
    );
  }
  return <div className="tw:h-full tw:w-full tw:overflow-y-auto">{listElement}</div>;
}

// ---------------------------------------------------------------------------
// BreadcrumbBar
// ---------------------------------------------------------------------------

function BreadcrumbBar({
  path,
  allDomains,
  onDomainSelect,
}: {
  path: SemanticDomain[];
  allDomains: SemanticDomain[];
  onDomainSelect: (path: SemanticDomain[]) => void;
}) {
  // React useRef requires null initial value
  // eslint-disable-next-line no-null/no-null
  const outerRef = useRef<HTMLDivElement>(null);
  // React useRef requires null initial value
  // eslint-disable-next-line no-null/no-null
  const fullRef = useRef<HTMLDivElement>(null);
  const [hideCount, setHideCount] = useState(0);

  useEffect(() => {
    const outer = outerRef.current;
    const full = fullRef.current;
    if (!outer || !full) return undefined;

    const measure = () => {
      const available = outer.clientWidth;
      const segEls = Array.from(full.children).filter(
        (el): el is HTMLElement => el instanceof HTMLElement,
      );
      if (segEls.length === 0) return;

      const fullWidth = segEls.reduce((sum, el) => sum + el.offsetWidth, 0);
      if (fullWidth <= available - 4) {
        setHideCount(0);
        return;
      }

      const widths = segEls.map((el) => el.offsetWidth);
      const totalSegments = path.length;
      const ellipsisWidth = 44;

      for (let h = 1; h < totalSegments; h += 1) {
        let visibleWidth = ellipsisWidth;
        if (h < totalSegments - 1) {
          visibleWidth += widths[0] ?? 0;
          for (let j = h + 1; j < totalSegments; j += 1) visibleWidth += widths[j] ?? 0;
        } else {
          visibleWidth += widths[totalSegments - 1] ?? 0;
        }
        if (visibleWidth <= available - 4) {
          setHideCount(h);
          return;
        }
      }
      setHideCount(totalSegments - 1);
    };

    const observer = new ResizeObserver(measure);
    observer.observe(outer);
    measure();
    return () => observer.disconnect();
  }, [path]);

  const showEllipsis = hideCount > 0;
  const hideRoot = hideCount >= path.length - 1;
  const computeHiddenSegments = (): SemanticDomain[] => {
    if (!showEllipsis) return [];
    if (hideRoot) return path.slice(0, -1);
    return path.slice(1, hideCount + 1);
  };
  const hiddenSegments = computeHiddenSegments();
  const hiddenTooltip = hiddenSegments.map((d) => d.label).join(' > ');
  const ellipsisExpandId = hiddenSegments[0]?.id ?? path[0]?.id;

  return (
    <div ref={outerRef} className="tw:overflow-hidden">
      {/* Hidden measurement row */}
      <div
        ref={fullRef}
        className="tw:pointer-events-none tw:invisible tw:absolute tw:flex tw:items-center tw:gap-0.5 tw:whitespace-nowrap"
        aria-hidden
      >
        {path.map((d, i) => (
          <span key={d.id} className="tw:flex tw:shrink-0 tw:items-center tw:gap-0.5">
            {i > 0 && <ChevronRight className="tw:h-3 tw:w-3" />}
            <span className="tw:px-1.5 tw:py-1 tw:text-sm">{d.label}</span>
          </span>
        ))}
      </div>

      {/* Visible breadcrumbs */}
      <div className="tw:inline-flex tw:items-center tw:gap-0.5">
        {!hideRoot && path[0] && (
          <SegmentDropdown
            label={path[0].label}
            isLast={path.length === 1}
            allDomains={allDomains}
            currentPath={path}
            expandToId={path[0].id}
            onDomainSelect={onDomainSelect}
          />
        )}

        {showEllipsis && (
          <>
            {!hideRoot && (
              <ChevronRight className="tw:h-3 tw:w-3 tw:shrink-0 tw:text-muted-foreground" />
            )}
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>
                    <SegmentDropdown
                      label={<MoreHorizontal className="tw:h-3 tw:w-3" />}
                      isLast={false}
                      allDomains={allDomains}
                      currentPath={path}
                      expandToId={ellipsisExpandId ?? path[0]?.id ?? ''}
                      onDomainSelect={onDomainSelect}
                      isEllipsis
                    />
                  </span>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p className="tw:text-xs">{hiddenTooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        )}

        {path.map((domain, idx) => {
          if (idx === 0) return undefined;
          const isLast = idx === path.length - 1;
          // Always keep the last segment visible — the most collapsed state is
          // "ellipsis > last item", never just an ellipsis on its own.
          if (idx <= hideCount && !isLast) return undefined;
          return (
            <span key={domain.id} className="tw:flex tw:shrink-0 tw:items-center tw:gap-0.5">
              <ChevronRight className="tw:h-3 tw:w-3 tw:shrink-0 tw:text-muted-foreground" />
              <SegmentDropdown
                label={domain.label}
                isLast={isLast}
                allDomains={allDomains}
                currentPath={path}
                expandToId={domain.id}
                onDomainSelect={onDomainSelect}
              />
            </span>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SegmentDropdown
// ---------------------------------------------------------------------------

function SegmentDropdown({
  label,
  isLast,
  allDomains,
  currentPath,
  expandToId,
  onDomainSelect,
  isEllipsis = false,
}: {
  label: ReactNode;
  isLast: boolean;
  allDomains: SemanticDomain[];
  currentPath: SemanticDomain[];
  expandToId: string;
  onDomainSelect: (path: SemanticDomain[]) => void;
  isEllipsis?: boolean;
}) {
  const [open, setOpen] = useState(false);

  const handleSelect = useCallback(
    (newPath: SemanticDomain[]) => {
      onDomainSelect(newPath);
      setOpen(false);
    },
    [onDomainSelect],
  );

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            'tw:shrink-0 tw:cursor-pointer tw:rounded tw:text-sm tw:hover:bg-muted',
            isEllipsis ? 'tw:flex tw:items-center tw:px-1 tw:py-1' : 'tw:px-1.5 tw:py-1',
            isLast && !isEllipsis && 'tw:font-bold',
          )}
        >
          {label}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="tw:max-h-[500px] tw:w-[300px] tw:overflow-y-auto tw:p-1"
        style={{ zIndex: Z_INDEX_MODAL + 10 }}
        onEscapeKeyDown={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setOpen(false);
        }}
        onKeyDown={(e) => {
          // Prevent all keyboard events from reaching the parent Drawer
          if (e.key === 'Escape') {
            e.stopPropagation();
          }
        }}
      >
        <TreeKeyboardContainer
          domains={allDomains}
          currentPath={currentPath}
          expandToId={expandToId}
          onSelect={handleSelect}
          onClose={() => setOpen(false)}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ---------------------------------------------------------------------------
// Tree with custom keyboard navigation
// ---------------------------------------------------------------------------

/**
 * Wraps the domain tree and implements custom keyboard navigation following the WAI-ARIA tree-view
 * pattern (https://www.w3.org/WAI/ARIA/apg/patterns/treeview/):
 *
 * - ArrowDown / ArrowUp: move focus through all visible buttons (domain labels + expand/collapse).
 *   Tree visit order matches the visible button order (chevron buttons are visited too, by design,
 *   so users can tab through chevrons; see "Two-button row" note below).
 * - ArrowRight: if the current treeitem is collapsed, expand it; if already expanded, move focus to
 *   its first child treeitem. Leaves are no-ops.
 * - ArrowLeft: if the current treeitem is expanded, collapse it; if already collapsed (or a leaf),
 *   move focus to its parent treeitem. Top-level items are no-ops.
 * - Home / End: jump to the first / last visible button.
 * - Tab / Shift+Tab: same as arrow keys (cycle through buttons) - the dropdown traps Tab so it never
 *   escapes into the surrounding Dialog/Drawer.
 * - Enter / Space on a domain label: select it (handled by the button's native click).
 * - Enter / Space on an expand/collapse button: toggle expand (handled by the button's native click).
 * - Escape: close the dropdown (stops propagation so the parent Dialog stays open).
 *
 * Two-button row note: depth-0 rows have a single combined chevron+label button (per SBN-019,
 * depth-0 click only toggles expand); depth>=1 rows have a separate chevron button + label button.
 * For ARIA purposes each `<li>` is one `treeitem` (with `aria-level`, `aria-expanded`,
 * `aria-selected`) and the inner buttons are the focusable activation targets.
 */
function TreeKeyboardContainer({
  domains,
  currentPath,
  expandToId,
  onSelect,
  onClose,
}: {
  domains: SemanticDomain[];
  currentPath: SemanticDomain[];
  expandToId: string;
  onSelect: (path: SemanticDomain[]) => void;
  onClose: () => void;
}) {
  // React useRef requires null initial value
  // eslint-disable-next-line no-null/no-null
  const containerRef = useRef<HTMLDivElement>(null);
  // React useRef requires null initial value
  // eslint-disable-next-line no-null/no-null
  const scrollRef = useRef<HTMLButtonElement>(null);

  // Scroll the selected node into view when the dropdown opens, but do not
  // move focus there — the user can Tab in when they want to navigate.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      scrollRef.current?.scrollIntoView({ block: 'center' });
    });
    return () => cancelAnimationFrame(id);
  }, [expandToId]);

  const getFocusableButtons = (): HTMLButtonElement[] => {
    if (!containerRef.current) return [];
    return Array.from(containerRef.current.querySelectorAll('button'));
  };

  const moveFocus = (direction: 1 | -1) => {
    const buttons = getFocusableButtons();
    if (buttons.length === 0) return;
    const active = document.activeElement;
    const currentIdx = active instanceof HTMLButtonElement ? buttons.indexOf(active) : -1;
    let nextIdx = currentIdx + direction;
    if (nextIdx < 0) nextIdx = buttons.length - 1;
    if (nextIdx >= buttons.length) nextIdx = 0;
    buttons[nextIdx].focus();
  };

  const focusEdge = (edge: 'first' | 'last') => {
    const buttons = getFocusableButtons();
    if (buttons.length === 0) return;
    buttons[edge === 'first' ? 0 : buttons.length - 1].focus();
  };

  // Find the <li role="treeitem"> ancestor for a given element. Returns null if not found.
  const findTreeItem = (el: Element | null): HTMLLIElement | undefined => {
    let cur: Element | null = el;
    while (cur && cur !== containerRef.current) {
      if (cur instanceof HTMLLIElement && cur.getAttribute('role') === 'treeitem') return cur;
      cur = cur.parentElement;
    }
    return undefined;
  };

  /** Focus a treeitem by finding its primary activation button (chevron or combined). */
  const focusTreeItem = (li: HTMLLIElement | undefined) => {
    if (!li) return;
    const button = li.querySelector<HTMLButtonElement>(':scope > div > button');
    button?.focus();
  };

  /** Find direct-child treeitems of an item by descending into its nested <ul role="group">. */
  const getChildTreeItems = (li: HTMLLIElement): HTMLLIElement[] => {
    const group = li.querySelector<HTMLUListElement>(':scope > ul[role="group"]');
    if (!group) return [];
    return Array.from(group.children).filter(
      (c): c is HTMLLIElement =>
        c instanceof HTMLLIElement && c.getAttribute('role') === 'treeitem',
    );
  };

  /** Find the parent treeitem of an item by walking up through the group <ul>. */
  const getParentTreeItem = (li: HTMLLIElement): HTMLLIElement | undefined => {
    const group = li.parentElement;
    if (!(group instanceof HTMLUListElement)) return undefined;
    if (group.getAttribute('role') !== 'group') return undefined;
    const parent = group.parentElement;
    return parent instanceof HTMLLIElement && parent.getAttribute('role') === 'treeitem'
      ? parent
      : undefined;
  };

  const handleArrowRight = (li: HTMLLIElement) => {
    const expanded = li.getAttribute('aria-expanded');
    if (expanded === 'false') {
      // Collapsed with children — click the chevron/combined button to expand.
      const button = li.querySelector<HTMLButtonElement>(':scope > div > button');
      button?.click();
    } else if (expanded === 'true') {
      // Already expanded — move focus to first child treeitem.
      const [firstChild] = getChildTreeItems(li);
      focusTreeItem(firstChild);
    }
    // Leaf (no aria-expanded) — no-op.
  };

  const handleArrowLeft = (li: HTMLLIElement) => {
    const expanded = li.getAttribute('aria-expanded');
    if (expanded === 'true') {
      // Expanded — collapse by clicking the chevron/combined button.
      const button = li.querySelector<HTMLButtonElement>(':scope > div > button');
      button?.click();
    } else {
      // Collapsed or leaf — move focus to parent treeitem.
      focusTreeItem(getParentTreeItem(li));
    }
  };

  const handleKeyDown = (e: ReactKeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        moveFocus(1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        moveFocus(-1);
        break;
      case 'ArrowRight': {
        const li = findTreeItem(document.activeElement);
        if (!li) break;
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        handleArrowRight(li);
        break;
      }
      case 'ArrowLeft': {
        const li = findTreeItem(document.activeElement);
        if (!li) break;
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        handleArrowLeft(li);
        break;
      }
      case 'Home':
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        focusEdge('first');
        break;
      case 'End':
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        focusEdge('last');
        break;
      case 'Tab':
        // Stop native propagation so the surrounding drawer/dialog can't also
        // process this keystroke (would otherwise move focus outside the
        // dropdown or close the surrounding layer).
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        moveFocus(e.shiftKey ? -1 : 1);
        break;
      case 'Escape':
        // Same reasoning as Tab: prevent the ESC from bubbling out of the
        // dropdown to document-level dismiss listeners on the drawer.
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        onClose();
        break;
      default:
        break;
    }
  };

  return (
    // Custom keyboard nav handler attached for arrow/Tab/Escape; element wraps
    // a tree of buttons that retain individual focusability.
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div ref={containerRef} onKeyDown={handleKeyDown}>
      <TreeNodeList
        domains={domains}
        currentPath={currentPath}
        expandToId={expandToId}
        onSelect={onSelect}
        parentPath={[]}
        scrollRef={scrollRef}
        isRoot
      />
    </div>
  );
}

function isAncestorOf(domain: SemanticDomain, targetId: string): boolean {
  if (domain.id === targetId) return true;
  return domain.children?.some((child) => isAncestorOf(child, targetId)) ?? false;
}

function TreeNodeList({
  domains,
  currentPath,
  expandToId,
  onSelect,
  parentPath,
  scrollRef,
  isRoot = false,
}: {
  domains: SemanticDomain[];
  currentPath: SemanticDomain[];
  expandToId: string;
  onSelect: (path: SemanticDomain[]) => void;
  parentPath: SemanticDomain[];
  scrollRef: RefObject<HTMLButtonElement | null>;
  /** When true this is the outermost list — render as `role="tree"`; otherwise `role="group"`. */
  isRoot?: boolean;
}) {
  // Depth = number of ancestors. parentPath.length is 0 for the top-level list,
  // 1 for first-level children, etc. Used by TreeNode to decide whether the
  // chevron and label should be a single expand-only button (depth 0) or two
  // separate controls — chevron toggles expand, label triggers select (depth >= 1).
  const depth = parentPath.length;
  return (
    <ul
      role={isRoot ? 'tree' : 'group'}
      aria-label={isRoot ? 'Semantic domain tree' : undefined}
      className={cn('tw:space-y-0.5', { 'tw:ml-3': parentPath.length > 0 })}
    >
      {domains.map((domain) => {
        const thisPath = [...parentPath, domain];
        // The clicked breadcrumb segment is the selected node in the tree —
        // not the final segment of currentPath, which may be deeper than the
        // segment the user clicked.
        const isSelected = domain.id === expandToId;
        const hasChildren = domain.children && domain.children.length > 0;
        const containsTarget = isAncestorOf(domain, expandToId);
        // Expand only strict ancestors of the clicked breadcrumb segment so
        // the segment itself is visible but its children stay collapsed.
        const shouldExpand = containsTarget && domain.id !== expandToId;
        const isScrollTarget = domain.id === expandToId;

        return (
          <TreeNode
            key={domain.id}
            domain={domain}
            thisPath={thisPath}
            depth={depth}
            isSelected={isSelected}
            hasChildren={hasChildren ?? false}
            defaultExpanded={shouldExpand}
            currentPath={currentPath}
            expandToId={expandToId}
            onSelect={onSelect}
            scrollRef={scrollRef}
            isScrollTarget={isScrollTarget}
          />
        );
      })}
    </ul>
  );
}

/**
 * Renders a single tree node.
 *
 * Behavior depends on `depth`:
 *
 * - `depth === 0` (top-level domains): the chevron and label are rendered as a SINGLE combined
 *   button. Clicking it ONLY toggles expand/collapse — it never calls `onSelect`. This prevents the
 *   surrounding tree from collapsing when a user clicks a top-level entry to drill into it.
 * - `depth >= 1` (nested domains): the chevron and label are SEPARATE buttons. The chevron toggles
 *   expand; the label triggers `onSelect`. The label gains `tw:hover:underline` to make the click
 *   affordance visually clearer. [Revised: 2026-04-29]
 */
function TreeNode({
  domain,
  thisPath,
  depth,
  isSelected,
  hasChildren,
  defaultExpanded,
  currentPath,
  expandToId,
  onSelect,
  scrollRef,
  isScrollTarget,
}: {
  domain: SemanticDomain;
  thisPath: SemanticDomain[];
  depth: number;
  isSelected: boolean;
  hasChildren: boolean;
  defaultExpanded: boolean;
  currentPath: SemanticDomain[];
  expandToId: string;
  onSelect: (path: SemanticDomain[]) => void;
  scrollRef: RefObject<HTMLButtonElement | null>;
  isScrollTarget: boolean;
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  useEffect(() => {
    if (defaultExpanded) setExpanded(true);
  }, [defaultExpanded]);

  const isTopLevelWithChildren = depth === 0 && hasChildren;

  // ARIA tree-view attributes per WAI-ARIA APG. aria-level is 1-indexed; depth here is
  // 0-indexed (depth=0 means top-level). aria-expanded is only set when the item is
  // expandable (has children); omitted on leaves so AT announces them as leaf nodes.
  // aria-selected reflects whether this is the breadcrumb segment that opened the dropdown.
  const ariaExpanded: boolean | undefined = hasChildren ? expanded : undefined;

  return (
    <li
      role="treeitem"
      aria-level={depth + 1}
      aria-selected={isSelected}
      aria-expanded={ariaExpanded}
    >
      <div className="tw:flex tw:items-center tw:gap-0.5">
        {isTopLevelWithChildren ? (
          // Combined chevron + label button. Clicking ONLY expands/collapses; it does not
          // call onSelect. This avoids the bug where clicking a top-level domain selected
          // it (and the parent path collapsed because the new path was rooted elsewhere).
          <button
            type="button"
            ref={isScrollTarget ? scrollRef : undefined}
            className={cn(
              'tw:flex tw:flex-1 tw:items-center tw:gap-0.5 tw:rounded tw:px-1.5 tw:py-0.5 tw:text-left tw:text-sm tw:focus:outline-none tw:focus:ring-1 tw:focus:ring-ring',
              isSelected ? 'tw:bg-accent tw:font-medium' : 'tw:hover:bg-muted',
            )}
            aria-expanded={expanded}
            onClick={() => setExpanded(!expanded)}
          >
            <ChevronRight
              className={cn('tw:h-3 tw:w-3 tw:shrink-0 tw:transition-transform', {
                'tw:rotate-90': expanded,
              })}
            />
            <span>{domain.label}</span>
          </button>
        ) : (
          <>
            {hasChildren ? (
              <button
                type="button"
                className="tw:flex tw:h-5 tw:w-5 tw:shrink-0 tw:items-center tw:justify-center tw:rounded tw:hover:bg-muted tw:focus:outline-none tw:focus:ring-1 tw:focus:ring-ring"
                aria-expanded={expanded}
                aria-label={expanded ? 'Collapse' : 'Expand'}
                onClick={() => setExpanded(!expanded)}
              >
                <ChevronRight
                  className={cn('tw:h-3 tw:w-3 tw:transition-transform', {
                    'tw:rotate-90': expanded,
                  })}
                />
              </button>
            ) : (
              <span className="tw:w-5 tw:shrink-0" />
            )}
            <button
              type="button"
              ref={isScrollTarget ? scrollRef : undefined}
              className={cn(
                'tw:flex-1 tw:rounded tw:px-1.5 tw:py-0.5 tw:text-left tw:text-sm tw:focus:outline-none tw:focus:ring-1 tw:focus:ring-ring',
                isSelected ? 'tw:bg-accent tw:font-medium' : 'tw:hover:bg-muted tw:hover:underline',
              )}
              onClick={() => onSelect(thisPath)}
            >
              {domain.label}
            </button>
          </>
        )}
      </div>
      {expanded && domain.children && domain.children.length > 0 && (
        <TreeNodeList
          domains={domain.children}
          currentPath={currentPath}
          expandToId={expandToId}
          onSelect={onSelect}
          parentPath={thisPath}
          scrollRef={scrollRef}
        />
      )}
    </li>
  );
}
