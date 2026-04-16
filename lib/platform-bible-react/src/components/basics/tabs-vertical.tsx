// adapted from: https://github.com/shadcn-ui/ui/discussions/752

'use client';

import { TabsContentProps, TabsListProps, TabsTriggerProps } from '@/components/shadcn-ui/tabs';
import { Direction, readDirection } from '@/utils/dir-helper.util';
import { cn } from '@/utils/shadcn-ui/utils';
import { Tabs as RadixTabs } from 'radix-ui';
import React from 'react';

export type VerticalTabsProps = React.ComponentPropsWithoutRef<typeof RadixTabs.Root> & {
  className?: string;
};

export type LeftTabsTriggerProps = TabsTriggerProps & {
  value: string;
  ref?: React.Ref<HTMLButtonElement>;
};

/**
 * Tabs components provide a set of layered sections of content—known as tab panels–that are
 * displayed one at a time. These components are built on Radix UI primitives and styled with Shadcn
 * UI. See Shadcn UI Documentation: https://ui.shadcn.com/docs/components/tabs See Radix UI
 * Documentation: https://www.radix-ui.com/primitives/docs/components/tabs
 */
export const VerticalTabs = React.forwardRef<
  React.ElementRef<typeof RadixTabs.Root>,
  VerticalTabsProps
>(({ className, ...props }, ref) => {
  const dir: Direction = readDirection();
  return (
    <RadixTabs.Root
      orientation="vertical"
      ref={ref}
      className={cn('tw:flex tw:gap-1 tw:rounded-md tw:text-muted-foreground', className)}
      {...props}
      dir={dir}
    />
  );
});

VerticalTabs.displayName = RadixTabs.List.displayName;

/** @inheritdoc VerticalTabs */
export const VerticalTabsList = React.forwardRef<
  React.ElementRef<typeof RadixTabs.List>,
  TabsListProps
>(({ className, ...props }, ref) => (
  <RadixTabs.List
    ref={ref}
    className={cn(
      'tw:flex tw:items-center tw:w-[124px] tw:justify-center tw:rounded-md tw:bg-muted tw:p-1 tw:text-muted-foreground',
      className,
    )}
    {...props}
  />
));
VerticalTabsList.displayName = RadixTabs.List.displayName;

/** @inheritdoc VerticalTabs */
export const VerticalTabsTrigger = React.forwardRef<
  React.ElementRef<typeof RadixTabs.Trigger>,
  LeftTabsTriggerProps
>(({ className, ...props }, ref) => (
  <RadixTabs.Trigger
    ref={ref}
    {...props}
    className={cn(
      'tw:inline-flex tw:w-[116px] tw:cursor-pointer tw:items-center tw:justify-center tw:break-words tw:rounded-sm tw:border-0 tw:bg-muted tw:px-3 tw:py-1.5 tw:text-sm tw:font-medium tw:text-inherit tw:ring-offset-background tw:transition-all tw:hover:text-foreground tw:focus-visible:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:data-[state=active]:bg-background tw:data-[state=active]:text-foreground tw:data-[state=active]:shadow-sm tw:overflow-clip',
      className,
    )}
  />
));

/** @inheritdoc VerticalTabs */
export const VerticalTabsContent = React.forwardRef<
  React.ElementRef<typeof RadixTabs.Content>,
  TabsContentProps
>(({ className, ...props }, ref) => (
  <RadixTabs.Content
    ref={ref}
    className={cn(
      // Removed tw:mt-2 because Sebastian said so
      'tw:ms-5 tw:flex-grow tw:text-foreground tw:ring-offset-background tw:focus-visible:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2',
      className,
    )}
    {...props}
  />
));
VerticalTabsContent.displayName = RadixTabs.Content.displayName;
