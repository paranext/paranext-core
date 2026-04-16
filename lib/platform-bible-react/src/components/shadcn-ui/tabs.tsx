import React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '@/utils/shadcn-ui/utils';
import { Direction, readDirection } from '@/utils/dir-helper.util';

/**
 * Tabs components provide a set of layered sections of content—known as tab panels–that are
 * displayed one at a time. These components are built on Radix UI primitives and styled with Shadcn
 * UI. See Shadcn UI Documentation: https://ui.shadcn.com/docs/components/tabs See Radix UI
 * Documentation: https://www.radix-ui.com/primitives/docs/components/tabs
 */
export const Tabs = TabsPrimitive.Root;

/** @inheritdoc Tabs */
export type TabsListProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
  className?: string;
};

/** @inheritdoc Tabs */
export type TabsTriggerProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
  className?: string;
};

/** @inheritdoc Tabs */
export type TabsContentProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> & {
  className?: string;
};

/** @inheritdoc Tabs */
export function TabsList({
  className,
  ref,
  ...props
}: TabsListProps & {
  ref?: React.Ref<React.ComponentRef<typeof TabsPrimitive.List>>;
}) {
  const dir: Direction = readDirection();
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        'pr-twp tw:inline-flex tw:h-10 tw:items-center tw:justify-center tw:rounded-md tw:bg-muted tw:p-1 tw:text-muted-foreground',
        className,
      )}
      {...props}
      dir={dir}
    />
  );
}

/** @inheritdoc Tabs */
export function TabsTrigger({
  className,
  ref,
  ...props
}: TabsTriggerProps & {
  ref?: React.Ref<React.ComponentRef<typeof TabsPrimitive.Trigger>>;
}) {
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        'pr-twp tw:inline-flex tw:items-center tw:justify-center tw:whitespace-nowrap tw:rounded-sm tw:px-3 tw:py-1.5 tw:text-sm tw:font-medium tw:ring-offset-background tw:transition-all tw:hover:text-foreground tw:focus-visible:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:data-[state=active]:bg-background tw:data-[state=active]:text-foreground tw:data-[state=active]:shadow-sm',
        className,
      )}
      {...props}
    />
  );
}

/** @inheritdoc Tabs */
export function TabsContent({
  className,
  ref,
  ...props
}: TabsContentProps & {
  ref?: React.Ref<React.ComponentRef<typeof TabsPrimitive.Content>>;
}) {
  return (
    <TabsPrimitive.Content
      ref={ref}
      className={cn(
        'pr-twp tw:mt-2 tw:ring-offset-background tw:focus-visible:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2',
        className,
      )}
      {...props}
    />
  );
}
