import React from 'react';

import { cn } from '@/utils/shadcn-ui.util';

/**
 * Table components provide a responsive table. These components are built and styled with Shadcn
 * UI.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/table}
 */
const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement> & { stickyHeader?: boolean }
>(({ className, stickyHeader, ...props }, ref) => (
  <div className={cn('pr-twp tw-relative tw-w-full', { 'tw-overflow-auto': !stickyHeader })}>
    <table
      ref={ref}
      className={cn('tw-w-full tw-caption-bottom tw-text-sm', className)}
      {...props}
    />
  </div>
));
Table.displayName = 'Table';

/**
 * @inheritdoc Table
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/table}
 */
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

/**
 * @inheritdoc Table
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/table}
 */
const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn('[&_tr:last-child]:tw-border-0', className)} {...props} />
));
TableBody.displayName = 'TableBody';

/**
 * @inheritdoc Table
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/table}
 */
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

/**
 * @inheritdoc Table
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/table}
 */
const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        'tw-border-b tw-transition-colors hover:tw-bg-muted/50 data-[state=selected]:tw-bg-muted',
        className,
      )}
      {...props}
    />
  ),
);
TableRow.displayName = 'TableRow';

/**
 * @inheritdoc Table
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/table}
 */
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

/**
 * @inheritdoc Table
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/table}
 */
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

/**
 * @inheritdoc Table
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/table}
 */
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
