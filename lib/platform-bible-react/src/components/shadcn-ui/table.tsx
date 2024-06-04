import * as React from 'react';

import { cn } from '@/utils/shadcn-ui.util';

export type TableProps = React.HTMLAttributes<HTMLTableElement> & {
  className?: string;
};

export type TableHeaderProps = React.HTMLAttributes<HTMLTableSectionElement> & {
  className?: string;
};

export type TableBodyProps = React.HTMLAttributes<HTMLTableSectionElement> & {
  className?: string;
};

export type TableFooterProps = React.HTMLAttributes<HTMLTableSectionElement> & {
  className?: string;
};

export type TableRowProps = React.HTMLAttributes<HTMLTableRowElement> & {
  className?: string;
};

export type TableHeadProps = React.ThHTMLAttributes<HTMLTableCellElement> & {
  className?: string;
};

export type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement> & {
  className?: string;
};

export type TableCaptionProps = React.HTMLAttributes<HTMLTableCaptionElement> & {
  className?: string;
};

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, ...props }, ref) => (
    <div className="pr-relative pr-w-full pr-overflow-auto">
      <table
        ref={ref}
        className={cn('pr-w-full pr-caption-bottom pr-text-sm', className)}
        {...props}
      />
    </div>
  ),
);
Table.displayName = 'Table';

export const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn('[&_tr]:pr-border-b', className)} {...props} />
  ),
);
TableHeader.displayName = 'TableHeader';

export const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn('[&_tr:last-child]:pr-border-0', className)} {...props} />
  ),
);
TableBody.displayName = 'TableBody';

export const TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ className, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={cn(
        'pr-border-t pr-bg-muted/50 pr-font-medium [&>tr]:last:pr-border-b-0',
        className,
      )}
      {...props}
    />
  ),
);
TableFooter.displayName = 'TableFooter';

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        'pr-border-b pr-transition-colors hover:pr-bg-muted/50 data-[state=selected]:pr-bg-muted',
        className,
      )}
      {...props}
    />
  ),
);
TableRow.displayName = 'TableRow';

export const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        'pr-h-12 pr-px-4 pr-text-left pr-align-middle pr-font-medium pr-text-muted-foreground [&:has([role=checkbox])]:pr-pr-0',
        className,
      )}
      {...props}
    />
  ),
);
TableHead.displayName = 'TableHead';

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={cn('pr-p-4 pr-align-middle [&:has([role=checkbox])]:pr-pr-0', className)}
      {...props}
    />
  ),
);
TableCell.displayName = 'TableCell';

export const TableCaption = React.forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  ({ className, ...props }, ref) => (
    <caption
      ref={ref}
      className={cn('pr-mt-4 pr-text-sm pr-text-muted-foreground', className)}
      {...props}
    />
  ),
);
TableCaption.displayName = 'TableCaption';
