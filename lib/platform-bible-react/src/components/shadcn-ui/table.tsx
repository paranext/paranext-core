import React from 'react';
import { getCurrentTableSection, getFocusableElements } from '@/utils/focus.util';
import { cn } from '@/utils/shadcn-ui.util';

/**
 * Table components provide a responsive table. These components are built and styled with Shadcn
 * UI. See Shadcn UI Documentation: https://ui.shadcn.com/docs/components/table
 */
const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement> & { stickyHeader?: boolean }
>(({ className, stickyHeader, ...props }, ref) => (
  <div className={cn('pr-twp tw-relative tw-w-full', { 'tw-p-1': stickyHeader })}>
    <table
      ref={ref}
      className={cn('tw-w-full tw-caption-bottom tw-text-sm', className)}
      {...props}
    />
  </div>
));
Table.displayName = 'Table';

/** @inheritdoc Table */
const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement> & { stickyHeader?: boolean }
>(({ className, stickyHeader, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      { 'tw-sticky tw-top-[-1px] tw-bg-background tw-drop-shadow-sm': stickyHeader },
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
>(({ className, ...props }, ref) => {
  // CUSTOM: Enable Shift+Tab from footer to focus the last row of the table body instead of an inner cell
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTableSectionElement>) => {
    if (e.key === 'Tab' && e.shiftKey) {
      const active = document.activeElement;
      const table = active?.closest('table');
      if (!table) return;

      const footer = table.querySelector('tfoot');
      if (!footer?.contains(active)) return;

      e.preventDefault();
      const lastRow = table.querySelector('tbody tr[tabindex="0"]:last-of-type');
      if (lastRow instanceof HTMLElement) {
        lastRow.focus();
      }
    }
  };

  return (
    <tfoot
      ref={ref}
      tabIndex={-1} // CUSTOM: Needed to satisfy a11y rule for key event listener
      role="presentation" // CUSTOM: Declares tfoot as a passive container for keyboard events
      onKeyDown={handleKeyDown}
      className={cn(
        'tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0',
        className,
      )}
      {...props}
    />
  );
});
TableFooter.displayName = 'TableFooter';

// CUSTOM: Add onKeyDown and onSelect props to TableRow
/** @inheritdoc Table */
const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, onKeyDown, onSelect, ...props }, ref) => {
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

    // CUSTOM: Focus the next focusable element outside the table when tabbing out of the last row
    const focusNextOutsideTable = (
      currentRow: HTMLTableRowElement,
      allFocusableElements: HTMLElement[],
    ) => {
      const table = currentRow.closest('table');
      const currentIndex = allFocusableElements.indexOf(currentRow);

      // Move focus to the next focusable element in the document
      let foundNext = false;
      for (let i = currentIndex + 1; i < allFocusableElements.length; i++) {
        const el = allFocusableElements[i];
        if (!table?.contains(el)) {
          el.focus();
          foundNext = true;
          break;
        }
      }
      if (!foundNext) {
        // No focusable element after the table, loop to the top of the document
        allFocusableElements[0]?.focus();
      }
    };

    // CUSTOM: Move focus up or down to adjacent rows in the same table section
    const focusAdjacentRow = (
      rowsInTableSection: HTMLTableRowElement[],
      currentRowIndex: number,
      direction: 'up' | 'down',
    ) => {
      let nextRow: HTMLTableRowElement | undefined;
      if (direction === 'down' && currentRowIndex < rowsInTableSection.length - 1) {
        nextRow = rowsInTableSection[currentRowIndex + 1];
      } else if (direction === 'up' && currentRowIndex > 0) {
        nextRow = rowsInTableSection[currentRowIndex - 1];
      }
      if (nextRow) {
        nextRow.focus();
        return true;
      }
      return false;
    };

    // CUSTOM: Handle Tab key within a row, moving focus to footer or outside table as needed
    const handleTabKey = (
      e: React.KeyboardEvent<HTMLTableRowElement>,
      currentRow: HTMLTableRowElement,
      focusablesInRow: HTMLElement[],
      currentIndexOfFocusables: number,
      allFocusableElements: HTMLElement[],
    ) => {
      const currentSection = getCurrentTableSection(currentRow);
      const table = currentRow.closest('table');

      if (e.shiftKey) {
        e.preventDefault();

        // Shift+Tab in table footer, go to last row in table body
        if (currentSection === 'tfoot') {
          const lastRow = table?.querySelector('tbody tr[tabindex="0"]:last-of-type');
          if (lastRow instanceof HTMLElement) {
            lastRow.focus();
          }
          return;
        }

        // Shift+Tab in table body, go to table header
        if (currentSection === 'tbody') {
          const header = table?.querySelector('thead tr[tabindex="0"]');
          if (header instanceof HTMLElement) {
            header.focus();
          }
          return;
        }
        return;
      }

      if (currentSection === 'tbody') {
        e.preventDefault();
        // If there are no focusable elements or you're on the last focusable element in the row
        if (
          currentIndexOfFocusables === focusablesInRow.length - 1 ||
          focusablesInRow.length === 0
        ) {
          // Move focus to the first row in the footer
          const footer =
            currentRow.parentElement?.parentElement?.querySelector('tfoot tr[tabindex="0"]');
          if (footer) {
            // querySelector returns an Element, so we need to cast it to HTMLElement
            // eslint-disable-next-line no-type-assertion/no-type-assertion
            (footer as HTMLElement).focus();
          } else {
            focusNextOutsideTable(currentRow, allFocusableElements);
          }
        }
        // Else, move through focusable elements in the row
        focusablesInRow[currentIndexOfFocusables + 1]?.focus();
      }
    };

    // CUSTOM: Handle keydown events for keyboard navigation and Enter key selection, delegating to user handler
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTableRowElement>) => {
      const { current: currentRow } = rowRef;
      if (!currentRow || !currentRow.parentElement) return;

      const rowsInTableSection = Array.from(
        currentRow.parentElement.querySelectorAll<HTMLTableRowElement>('tr[tabindex="0"]'),
      );
      const currentRowIndex = rowsInTableSection.indexOf(currentRow);

      const allFocusableElements = getFocusableElements(document.body);
      const focusablesInRow = getFocusableElements(currentRow);
      const currentIndexOfFocusables = focusablesInRow.indexOf(
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement as HTMLElement,
      );

      if (e.key === 'Tab') {
        handleTabKey(
          e,
          currentRow,
          focusablesInRow,
          currentIndexOfFocusables,
          allFocusableElements,
        );
      } else if (e.key === 'ArrowDown') {
        if (focusAdjacentRow(rowsInTableSection, currentRowIndex, 'down')) {
          e.preventDefault();
        }
      } else if (e.key === 'ArrowUp') {
        if (focusAdjacentRow(rowsInTableSection, currentRowIndex, 'up')) {
          e.preventDefault();
        }
      } else if (e.key === 'Enter' && onSelect) {
        // Trigger selection handler on Enter key press, different than click handler
        e.preventDefault();
        onSelect(e);
      }

      // Call user-defined onKeyDown handler if provided
      onKeyDown?.(e);
    };

    return (
      <tr
        ref={rowRef}
        tabIndex={0} // CUSTOM: Make row focusable
        onKeyDown={handleKeyDown} // CUSTOM: Enable keyboard behavior
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
  },
);
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
