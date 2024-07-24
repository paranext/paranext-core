// adapted from: https://github.com/shadcn-ui/ui/discussions/752

'use client';

import React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/utils/shadcn-ui.util';
import { TabsContentProps, TabsListProps, TabsTriggerProps } from '../shadcn-ui/tabs';

export type VerticalTabsProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> & {
  className?: string;
};

export type LeftTabsTriggerProps = TabsTriggerProps & {
  value: string;
  ref?: React.Ref<HTMLButtonElement>;
};

export const VerticalTabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  VerticalTabsProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Root
    orientation="vertical"
    ref={ref}
    className={cn('pr-flex pr-gap-1 pr-rounded-md pr-text-muted-foreground', className)}
    {...props}
  />
));

VerticalTabs.displayName = TabsPrimitive.List.displayName;

export const VerticalTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'pr-flex-fit pr-mlk-items-center pr-w-[124px] pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground',
      className,
    )}
    {...props}
  />
));
VerticalTabsList.displayName = TabsPrimitive.List.displayName;

export const VerticalTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  LeftTabsTriggerProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    {...props}
    className={cn(
      'overflow-clip pr-inline-flex pr-w-[116px] pr-cursor-pointer pr-items-center pr-justify-center pr-break-words pr-rounded-sm pr-border-0 pr-bg-muted pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-text-inherit pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm',
      className,
    )}
  />
));

export const VerticalTabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-2 pr-ms-5 pr-flex-grow pr-text-foreground pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2',
      className,
    )}
    {...props}
  />
));
VerticalTabsContent.displayName = TabsPrimitive.Content.displayName;
