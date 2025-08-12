import React from 'react';
import { getFocusableElements } from '@/utils/focus.util';
import { cn } from '@/utils/shadcn-ui.util';

/**
 * Table components provide a responsive table. These components are built and styled with Shadcn
 * UI. See Shadcn UI Documentation: https://ui.shadcn.com/docs/components/table
 */
const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement> & { stickyHeader?: boolean }
>(({ className, stickyHeader, ...props }, ref) => {
  // CUSTOM: Use internal ref to manage keyboard navigation and Enter key behavior
  // This ref gets passed into the table row ref property which expects null and not undefined
  // eslint-disable-next-line no-null/no-null
  const tableRef = React.useRef<HTMLTableElement>(null);

  // CUSTOM: Assign internal ref to external ref if provided
  React.useEffect(() => {
    if (typeof ref === 'function') {
      ref(tableRef.current);
    } else if (ref && 'current' in ref) {
      ref.current = tableRef.current;
    }
  }, [ref]);

  // CUSTOM: Force tabindex -1 on all focusable elements within the table to prevent tab navigation
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

  // CUSTOM: Handle keydown events for the table
  const handleKeyDownInTable = (e: React.KeyboardEvent<HTMLDivElement>) => {
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
    <div className={cn('pr-twp tw-relative tw-w-full', { 'tw-p-1': stickyHeader })}>
      {/* Table element is not interactive by default but we need to add a keydown handler */}
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <table
        // Need to add a keydown handler to the table to prevent default behavior of space, enter, and arrow down keys
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0} // CUSTOM: Make table tabbable
        onKeyDown={handleKeyDownInTable} // CUSTOM: Enable keyboard behavior
        ref={tableRef} // CUSTOM: Use internal ref to manage keyboard navigation
        className={cn(
          'tw-w-full tw-caption-bottom tw-text-sm tw-outline-none', // CUSTOM: Add outline-none to remove duplicate outline
          'focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background', // CUSTOM: Add focus styles
          className,
        )}
        aria-label="Table" // CUSTOM: Add aria-label for accessibility
        aria-labelledby="table-label" // CUSTOM: Add aria-labelledby for accessibility
        {...props}
      />
    </div>
  );
});
Table.displayName = 'Table';

/** @inheritdoc Table */
const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement> & { stickyHeader?: boolean }
>(({ className, stickyHeader, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      {
        'tw-sticky tw-top-[-1px] tw-z-20 tw-bg-background tw-drop-shadow-sm': stickyHeader,
      },
      '[&_tr]:tw-border-b',
      className,
    )}
    {...props}
  />
));
TableHeader.displayName = 'TableHeader';

/** @inheritdoc Table */
const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn('[&_tr:last-child]:tw-border-0', className)} {...props} />
));
TableBody.displayName = 'TableBody';

/** @inheritdoc Table */
const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn('tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0', className)}
    {...props}
  />
));
TableFooter.displayName = 'TableFooter';

// CUSTOM: Manage keyboard navigation and Enter key behavior for focusable elements in a row
function useFocusableInRowKeyboardNavigation(rowRef: React.RefObject<HTMLTableRowElement>) {
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

/** @inheritdoc Table */
const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement> & { setFocusAlsoRunsSelect?: boolean }
>(({ className, onKeyDown, onSelect, setFocusAlsoRunsSelect = false, ...props }, ref) => {
  // CUSTOM: Use internal ref to manage keyboard navigation and Enter key behavior
  // This ref gets passed into the table row ref property which expects null and not undefined
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

  // CUSTOM: Use internal ref to manage keyboard navigation and Enter key behavior
  useFocusableInRowKeyboardNavigation(rowRef);

  // CUSTOM: Get all focusable elements in the current row
  const focusablesInRow = React.useMemo(
    () => (rowRef.current ? getFocusableElements(rowRef.current) : []),
    [rowRef],
  );

  // CUSTOM: Handle keydown events for keyboard navigation
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

  const handleFocus = React.useCallback(
    (e: React.FocusEvent<HTMLTableRowElement>) => {
      if (setFocusAlsoRunsSelect) onSelect?.(e);
    },
    [setFocusAlsoRunsSelect, onSelect],
  );

  return (
    <tr
      ref={rowRef}
      tabIndex={-1} // CUSTOM: Make row not tabbable
      onKeyDown={handleKeyDown} // CUSTOM: Enable keyboard behavior
      onFocus={handleFocus} // CUSTOM: Handle focus event
      className={cn(
        // CUSTOM: Add focus styles and add tw-outline-none so there isn't a duplicate outline
        'tw-border-b tw-outline-none tw-transition-colors hover:tw-bg-muted/50',
        'focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background',
        'data-[state=selected]:tw-bg-muted',
        className,
      )}
      {...props}
    />
  );
});
TableRow.displayName = 'TableRow';

/** @inheritdoc Table */
const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      'tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0',
      className,
    )}
    {...props}
  />
));
TableHead.displayName = 'TableHead';

/** @inheritdoc Table */
const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn('tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0', className)}
    {...props}
  />
));
TableCell.displayName = 'TableCell';

/** @inheritdoc Table */
const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn('tw-mt-4 tw-text-sm tw-text-muted-foreground', className)}
    {...props}
  />
));
TableCaption.displayName = 'TableCaption';

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
