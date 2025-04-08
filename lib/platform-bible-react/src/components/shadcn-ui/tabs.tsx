import React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '@/utils/shadcn-ui.util';
import { Direction, readDirection } from '@/utils/dir-helper.util';

/**
 * Tabs components provide a set of layered sections of content—known as tab panels–that are
 * displayed one at a time. These components are built on Radix UI primitives and styled with Shadcn
 * UI.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/tabs}
 * @see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/tabs}
 */
export const Tabs = TabsPrimitive.Root;

/**
 * @inheritdoc Tabs
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/tabs}
 * @see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/tabs}
 */
export type TabsListProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
  className?: string;
};

/**
 * @inheritdoc Tabs
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/tabs}
 * @see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/tabs}
 */
export type TabsTriggerProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
  className?: string;
};

/**
 * @inheritdoc Tabs
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/tabs}
 * @see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/tabs}
 */
export type TabsContentProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> & {
  className?: string;
};

/**
 * @inheritdoc Tabs
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/tabs}
 * @see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/tabs}
 */
export const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, ...props }, ref) => {
  const dir: Direction = readDirection();
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        'tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground',
        className,
      )}
      {...props}
      dir={dir}
    />
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

/**
 * @inheritdoc Tabs
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/tabs}
 * @see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/tabs}
 */
export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm',
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

/**
 * @inheritdoc Tabs
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/tabs}
 * @see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/tabs}
 */
export const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2',
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
