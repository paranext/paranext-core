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
>(({ className, ...props }, ref) => (
  <div className={cn('pr-twp tw-relative tw-w-full')}>
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
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn('tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0', className)}
    {...props}
  />
));
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
      const currentSection = getCurrentTableSection(currentRow);

      let nextRow: HTMLTableRowElement | undefined;

      if (e.key === 'Tab') {
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
              // eslint-disable-next-line no-type-assertion/no-type-assertion
              (footer as HTMLElement).focus();
            } else {
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
                console.log('No focusable after table. Looping to top of document...');
                allFocusableElements[0]?.focus();
              }
            }
          }
          // Else, move through focusable elements in the row
          focusablesInRow[currentIndexOfFocusables + 1]?.focus();
        }
      } else if (e.key === 'ArrowDown' && currentRowIndex < rowsInTableSection.length - 1) {
        nextRow = rowsInTableSection[currentRowIndex + 1];
      } else if (e.key === 'ArrowUp' && currentRowIndex > 0) {
        nextRow = rowsInTableSection[currentRowIndex - 1];
      } else if (e.key === 'Enter' && onSelect) {
        // Trigger selection handler on Enter key press, different than click handler
        e.preventDefault();
        onSelect(e);
      }

      if (nextRow) {
        e.preventDefault();
        nextRow.focus();
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
          'focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background',
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
