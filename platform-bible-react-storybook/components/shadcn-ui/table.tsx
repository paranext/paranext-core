import React from 'react';

// CUSTOM: Import getFocusableElements for keyboard navigation within the table
import { getFocusableElements } from '@/utils/focus.util';
import { cn } from '@/utils/shadcn-ui/utils';

// CUSTOM: Added TSDoc with link to shadcn/ui documentation for this component
/**
 * Table components provide a responsive table. These components are built and styled with Shadcn
 * UI.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/table}
 */
function Table({
  className,
  // CUSTOM: Added stickyHeader prop to support sticky table headers with appropriate container padding
  stickyHeader,
  ref,
  ...props
}: React.ComponentProps<'table'> & {
  stickyHeader?: boolean;
  ref?: React.Ref<HTMLTableElement>;
}) {
  // CUSTOM: Use internal ref to manage keyboard navigation and Enter key behavior.
  // This ref gets passed into the table row ref property which expects null and not undefined.
  // eslint-disable-next-line no-null/no-null
  const tableRef = React.useRef<HTMLTableElement>(null);

  // CUSTOM: Assign internal ref to external ref if provided, so consumers can still access the
  // table element while we manage it internally for keyboard navigation.
  React.useEffect(() => {
    if (typeof ref === 'function') {
      ref(tableRef.current);
    } else if (ref && 'current' in ref) {
      ref.current = tableRef.current;
    }
  }, [ref]);

  // CUSTOM: Force tabindex -1 on all focusable elements within the table to prevent tab navigation
  // into cell contents; arrow key navigation is used instead (composite widget pattern).
  React.useEffect(() => {
    const currentTable = tableRef.current;
    if (!currentTable) return;

    const setTabIndexes = () => {
      requestAnimationFrame(() => {
        const focusables = getFocusableElements(currentTable, `[tabindex]:not([tabindex="-1"])`);
        focusables.forEach((el) => {
          el.setAttribute('tabindex', '-1');
        });
      });
    };

    setTabIndexes();

    const observer = new MutationObserver(() => {
      setTabIndexes();
    });

    observer.observe(currentTable, {
      childList: true, // Watch for added/removed elements
      subtree: true, // Include descendants
      attributes: true,
      attributeFilter: ['tabindex'], // Watch for tabindex changes
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // CUSTOM: Handle keydown events for the table. ArrowDown moves focus to the first focusable row;
  // Space prevents default scroll when the table itself has focus.
  const handleKeyDownInTable = (e: React.KeyboardEvent<HTMLTableElement>) => {
    const { current: currentTable } = tableRef;
    if (!currentTable) return;

    if (e.key === 'ArrowDown') {
      // Move focus to the first row in the table (header or body)
      e.preventDefault();
      const firstRow = getFocusableElements(currentTable)[0];
      firstRow.focus();
      return;
    }
    if (e.key === ' ' && document.activeElement === currentTable) {
      e.preventDefault(); // Prevent scrolling
    }
  };

  return (
    // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation. Removed
    // tw:overflow-auto from the boilerplate wrapper so callers control overflow behavior.
    // Added conditional padding when stickyHeader is true to avoid header overlap.
    <div
      data-slot="table-container"
      className={cn('pr-twp tw:relative tw:w-full', { 'tw:p-1': stickyHeader })}
    >
      {/* Table element is not interactive by default but we need to add a keydown handler */}
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <table
        data-slot="table"
        // CUSTOM: Make table tabbable so keyboard users can Tab into it as the entry point
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        // CUSTOM: Use internal ref to manage keyboard navigation
        ref={tableRef}
        // CUSTOM: Handle keyboard navigation directly on the table element (which has tabIndex=0)
        onKeyDown={handleKeyDownInTable}
        className={cn(
          'tw:w-full tw:caption-bottom tw:text-sm',
          // CUSTOM: Add outline-hidden to remove duplicate browser outline and replace with custom focus ring
          'tw:outline-hidden',
          // CUSTOM: Add focus styles so keyboard users see a visible focus indicator on the table
          'tw:focus:relative tw:focus:z-10 tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background',
          className,
        )}
        // CUSTOM: Add aria-label and aria-labelledby for accessibility
        aria-label="Table"
        aria-labelledby="table-label"
        {...props}
      />
    </div>
  );
}

// CUSTOM: Added @inheritdoc TSDoc pointing to Table for documentation inheritance
/** @inheritdoc Table */
function TableHeader({
  className,
  // CUSTOM: Added stickyHeader prop to apply sticky positioning styles when true
  stickyHeader,
  ...props
}: React.ComponentProps<'thead'> & {
  stickyHeader?: boolean;
}) {
  return (
    <thead
      data-slot="table-header"
      className={cn(
        {
          // CUSTOM: Apply sticky header styles when stickyHeader is true so headers remain
          // visible while scrolling through long tables
          'tw:sticky tw:top-[-1px] tw:z-20 tw:bg-background tw:drop-shadow-sm': stickyHeader,
        },
        'tw:[&_tr]:border-b',
        className,
      )}
      {...props}
    />
  );
}

// CUSTOM: Added @inheritdoc TSDoc pointing to Table for documentation inheritance
/** @inheritdoc Table */
function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
  return (
    <tbody
      data-slot="table-body"
      className={cn('tw:[&_tr:last-child]:border-0', className)}
      {...props}
    />
  );
}

// CUSTOM: Added @inheritdoc TSDoc pointing to Table for documentation inheritance
/** @inheritdoc Table */
function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        'tw:border-t tw:bg-muted/50 tw:font-medium tw:[&>tr]:last:border-b-0',
        className,
      )}
      {...props}
    />
  );
}

// CUSTOM: Hook that manages ArrowLeft/ArrowRight navigation between focusable elements in a row
// and Escape to return focus to the row itself (composite widget keyboard pattern)
function useFocusableInRowKeyboardNavigation(rowRef: React.RefObject<HTMLTableRowElement | null>) {
  React.useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!row.contains(document.activeElement)) return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        e.stopPropagation(); // Helps override internal widget handlers
        const focusables = rowRef.current ? getFocusableElements(rowRef.current) : [];
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const index = focusables.indexOf(document.activeElement as HTMLElement);
        const nextIndex = e.key === 'ArrowRight' ? index + 1 : index - 1;
        if (nextIndex >= 0 && nextIndex < focusables.length) {
          focusables[nextIndex].focus();
        }
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        row.focus();
      }

      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
      }
    };

    row.addEventListener('keydown', handleKeyDown);

    return () => {
      row.removeEventListener('keydown', handleKeyDown);
    };
  }, [rowRef]);
}

// CUSTOM: Move focus left or right to adjacent focusable items in the same row
function focusAdjacentFocusableElementInRow(
  focusablesInRow: HTMLElement[],
  currentIndexOfFocusables: number,
  direction: 'ArrowLeft' | 'ArrowRight',
) {
  let nextFocusable: HTMLElement | undefined;
  if (direction === 'ArrowLeft' && currentIndexOfFocusables > 0) {
    nextFocusable = focusablesInRow[currentIndexOfFocusables - 1];
  } else if (direction === 'ArrowRight' && currentIndexOfFocusables < focusablesInRow.length - 1) {
    nextFocusable = focusablesInRow[currentIndexOfFocusables + 1];
  }
  if (nextFocusable) {
    requestAnimationFrame(() => nextFocusable.focus());
    return true;
  }
  return false;
}

// CUSTOM: Move focus up or down to adjacent rows in the same table
function focusAdjacentRow(
  rowsInTable: HTMLTableRowElement[],
  currentRowIndex: number,
  direction: 'ArrowDown' | 'ArrowUp',
) {
  let nextRow: HTMLTableRowElement | undefined;
  if (direction === 'ArrowDown' && currentRowIndex < rowsInTable.length - 1) {
    nextRow = rowsInTable[currentRowIndex + 1];
  } else if (direction === 'ArrowUp' && currentRowIndex > 0) {
    nextRow = rowsInTable[currentRowIndex - 1];
  }
  if (nextRow) {
    requestAnimationFrame(() => nextRow.focus());
    return true;
  }
  return false;
}

// CUSTOM: Added @inheritdoc TSDoc pointing to Table for documentation inheritance
/** @inheritdoc Table */
function TableRow({
  className,
  onKeyDown,
  // CUSTOM: Added onSelect and setFocusAlsoRunsSelect props to support selection-on-focus behavior
  onSelect,
  setFocusAlsoRunsSelect = false,
  ref,
  ...props
}: React.ComponentProps<'tr'> & {
  setFocusAlsoRunsSelect?: boolean;
  ref?: React.Ref<HTMLTableRowElement>;
}) {
  // CUSTOM: Use internal ref to manage keyboard navigation and Enter key behavior.
  // This ref gets passed into the table row ref property which expects null and not undefined.
  // eslint-disable-next-line no-null/no-null
  const rowRef = React.useRef<HTMLTableRowElement>(null);

  // CUSTOM: Assign internal ref to external ref if provided
  React.useEffect(() => {
    if (typeof ref === 'function') {
      ref(rowRef.current);
    } else if (ref && 'current' in ref) {
      ref.current = rowRef.current;
    }
  }, [ref]);

  // CUSTOM: Use internal ref to manage keyboard navigation between focusable elements in the row
  useFocusableInRowKeyboardNavigation(rowRef);

  // CUSTOM: Get all focusable elements in the current row for arrow key navigation
  const focusablesInRow = React.useMemo(
    () => (rowRef.current ? getFocusableElements(rowRef.current) : []),
    [rowRef],
  );

  // CUSTOM: Handle keydown events for keyboard navigation — ArrowDown/Up between rows,
  // ArrowLeft/Right within a row, Escape to return focus to the table
  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLTableRowElement>) => {
      const { current: currentRow } = rowRef;
      if (!currentRow || !currentRow.parentElement) return;

      const closestTable = currentRow.closest('table');
      const rowsInTable = closestTable
        ? // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          (getFocusableElements(closestTable) as HTMLTableRowElement[]).filter(
            (element) => element.tagName === 'TR',
          )
        : [];
      const currentRowIndex = rowsInTable.indexOf(currentRow);
      const currentIndexOfFocusables = focusablesInRow.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement as HTMLElement,
      );

      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        focusAdjacentRow(rowsInTable, currentRowIndex, e.key);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        focusAdjacentFocusableElementInRow(focusablesInRow, currentIndexOfFocusables, e.key);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        const table = currentRow.closest('table');
        if (table) {
          table.focus();
        }
      }

      // Call user-defined onKeyDown handler if provided
      onKeyDown?.(e);
    },
    [rowRef, focusablesInRow, onKeyDown],
  );

  // CUSTOM: Handle focus event — when setFocusAlsoRunsSelect is true, call onSelect when the row
  // receives focus so that focusing a row also selects it
  const handleFocus = React.useCallback(
    (e: React.FocusEvent<HTMLTableRowElement>) => {
      if (setFocusAlsoRunsSelect) onSelect?.(e);
    },
    [setFocusAlsoRunsSelect, onSelect],
  );

  return (
    <tr
      data-slot="table-row"
      ref={rowRef}
      // CUSTOM: Make row not directly Tab-reachable; rows are reached via arrow keys from the table
      tabIndex={-1}
      // CUSTOM: Enable composite widget keyboard navigation within and between rows
      onKeyDown={handleKeyDown}
      // CUSTOM: Handle focus event for selection-on-focus behavior
      onFocus={handleFocus}
      className={cn(
        'tw:border-b tw:transition-colors tw:hover:bg-muted/50 tw:has-aria-expanded:bg-muted/50 tw:data-[state=selected]:bg-muted',
        // CUSTOM: Add outline-hidden to remove duplicate browser outline and replace with a custom
        // focus ring so keyboard users see a visible, accessible focus indicator on focused rows
        'tw:outline-hidden',
        'tw:focus:relative tw:focus:z-10 tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background',
        className,
      )}
      {...props}
    />
  );
}

// CUSTOM: Added @inheritdoc TSDoc pointing to Table for documentation inheritance
/** @inheritdoc Table */
function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        'tw:h-10 tw:px-2 tw:text-start tw:align-middle tw:font-medium tw:whitespace-nowrap tw:text-foreground tw:[&:has([role=checkbox])]:pe-0',
        className,
      )}
      {...props}
    />
  );
}

// CUSTOM: Added @inheritdoc TSDoc pointing to Table for documentation inheritance
/** @inheritdoc Table */
function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        'tw:p-2 tw:align-middle tw:whitespace-nowrap tw:[&:has([role=checkbox])]:pe-0',
        className,
      )}
      {...props}
    />
  );
}

// CUSTOM: Added @inheritdoc TSDoc pointing to Table for documentation inheritance
/** @inheritdoc Table */
function TableCaption({ className, ...props }: React.ComponentProps<'caption'>) {
  return (
    <caption
      data-slot="table-caption"
      className={cn('tw:mt-4 tw:text-sm tw:text-muted-foreground', className)}
      {...props}
    />
  );
}

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
