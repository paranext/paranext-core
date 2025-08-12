// adapted from: https://github.com/shadcn-ui/ui/discussions/752

'use client';

import { TabsContentProps, TabsListProps, TabsTriggerProps } from '@/components/shadcn-ui/tabs';
import { Direction, readDirection } from '@/utils/dir-helper.util';
import { cn } from '@/utils/shadcn-ui.util';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import React from 'react';

export type VerticalTabsProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> & {
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
  React.ElementRef<typeof TabsPrimitive.Root>,
  VerticalTabsProps
>(({ className, ...props }, ref) => {
  const dir: Direction = readDirection();
  return (
    <TabsPrimitive.Root
      orientation="vertical"
      ref={ref}
      className={cn('tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground', className)}
      {...props}
      dir={dir}
    />
  );
});

VerticalTabs.displayName = TabsPrimitive.List.displayName;

/** @inheritdoc VerticalTabs */
export const VerticalTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground',
      className,
    )}
    {...props}
  />
));
VerticalTabsList.displayName = TabsPrimitive.List.displayName;

/** @inheritdoc VerticalTabs */
export const VerticalTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  LeftTabsTriggerProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    {...props}
    className={cn(
      'overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm',
      className,
    )}
  />
));

/** @inheritdoc VerticalTabs */
export const VerticalTabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      // Removed tw-mt-2 because Sebastian said so
      'tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2',
      className,
    )}
    {...props}
  />
));
VerticalTabsContent.displayName = TabsPrimitive.Content.displayName;
