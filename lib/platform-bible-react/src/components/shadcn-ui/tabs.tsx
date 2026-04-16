'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Tabs as TabsPrimitive } from 'radix-ui';

import { cn } from '@/utils/shadcn-ui/utils';
// CUSTOM: Import readDirection for RTL keyboard navigation support in TabsList
import { Direction, readDirection } from '@/utils/dir-helper.util';

// CUSTOM: Added TSDoc with links to shadcn/ui and Radix UI documentation for this component
/**
 * Tabs components provide a set of layered sections of content—known as tab panels—that are
 * displayed one at a time. These components are built on Radix UI primitives and styled with Shadcn
 * UI.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/tabs}
 * @see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/tabs}
 */
function Tabs({
  className,
  orientation = 'horizontal',
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn('tw:group/tabs tw:flex tw:gap-2 tw:data-horizontal:flex-col', className)}
      {...props}
    />
  );
}

// CUSTOM: Exported prop type alias for TabsList so consumers can type their props without
// importing from radix-ui directly
/** @inheritdoc Tabs */
export type TabsListProps = React.ComponentProps<typeof TabsPrimitive.List> & {
  className?: string;
};

// CUSTOM: Exported prop type alias for TabsTrigger so consumers can type their props without
// importing from radix-ui directly
/** @inheritdoc Tabs */
export type TabsTriggerProps = React.ComponentProps<typeof TabsPrimitive.Trigger> & {
  className?: string;
};

// CUSTOM: Exported prop type alias for TabsContent so consumers can type their props without
// importing from radix-ui directly
/** @inheritdoc Tabs */
export type TabsContentProps = React.ComponentProps<typeof TabsPrimitive.Content> & {
  className?: string;
};

const tabsListVariants = cva(
  'tw:group/tabs-list tw:inline-flex tw:w-fit tw:items-center tw:justify-center tw:rounded-lg tw:p-[3px] tw:text-muted-foreground tw:group-data-horizontal/tabs:h-8 tw:group-data-vertical/tabs:h-fit tw:group-data-vertical/tabs:flex-col tw:data-[variant=line]:rounded-none',
  {
    variants: {
      variant: {
        default: 'tw:bg-muted',
        line: 'tw:gap-1 tw:bg-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

// CUSTOM: Added @inheritdoc TSDoc pointing to Tabs for documentation inheritance
/** @inheritdoc Tabs */
function TabsList({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> & VariantProps<typeof tabsListVariants>) {
  // CUSTOM: Read text direction so TabsList passes dir to Radix, enabling RTL keyboard navigation
  const dir: Direction = readDirection();
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
      className={cn('pr-twp', tabsListVariants({ variant }), className)}
      // CUSTOM: Pass dir to Radix UI so it uses correct RTL keyboard navigation direction
      dir={dir}
      {...props}
    />
  );
}

// CUSTOM: Added @inheritdoc TSDoc pointing to Tabs for documentation inheritance
/** @inheritdoc Tabs */
function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
      className={cn(
        'pr-twp tw:relative tw:inline-flex tw:h-[calc(100%-1px)] tw:flex-1 tw:items-center tw:justify-center tw:gap-1.5 tw:rounded-md tw:border tw:border-transparent tw:px-1.5 tw:py-0.5 tw:text-sm tw:font-medium tw:whitespace-nowrap tw:text-foreground/60 tw:transition-all tw:group-data-vertical/tabs:w-full tw:group-data-vertical/tabs:justify-start tw:hover:text-foreground tw:focus-visible:border-ring tw:focus-visible:ring-[3px] tw:focus-visible:ring-ring/50 tw:focus-visible:outline-1 tw:focus-visible:outline-ring tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:has-data-[icon=inline-end]:pe-1 tw:has-data-[icon=inline-start]:ps-1 tw:dark:text-muted-foreground tw:dark:hover:text-foreground tw:group-data-[variant=default]/tabs-list:data-active:shadow-sm tw:group-data-[variant=line]/tabs-list:data-active:shadow-none tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4',
        'tw:group-data-[variant=line]/tabs-list:bg-transparent tw:group-data-[variant=line]/tabs-list:data-active:bg-transparent tw:dark:group-data-[variant=line]/tabs-list:data-active:border-transparent tw:dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent',
        'tw:data-active:bg-background tw:data-active:text-foreground tw:dark:data-active:border-input tw:dark:data-active:bg-input/30 tw:dark:data-active:text-foreground',
        'tw:after:absolute tw:after:bg-foreground tw:after:opacity-0 tw:after:transition-opacity tw:group-data-horizontal/tabs:after:inset-x-0 tw:group-data-horizontal/tabs:after:bottom-[-5px] tw:group-data-horizontal/tabs:after:h-0.5 tw:group-data-vertical/tabs:after:inset-y-0 tw:group-data-vertical/tabs:after:-end-1 tw:group-data-vertical/tabs:after:w-0.5 tw:group-data-[variant=line]/tabs-list:data-active:after:opacity-100',
        className,
      )}
      {...props}
    />
  );
}

// CUSTOM: Added @inheritdoc TSDoc pointing to Tabs for documentation inheritance
/** @inheritdoc Tabs */
function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
      className={cn('pr-twp tw:flex-1 tw:text-sm tw:outline-none', className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants };
