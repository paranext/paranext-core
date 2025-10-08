import React from 'react';

import { cn } from '@/utils/shadcn-ui.util';

/**
 * The Card component displays a card with header, content, and footer. This component is built and
 * styled with Shadcn UI. See Shadcn UI Documentation: https://ui.shadcn.com/docs/components/card
 */
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'pr-twp', // CUSTOM
        'tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm',
        className,
      )}
      {...props}
    />
  ),
);
Card.displayName = 'Card';

/** @inheritdoc Card */
const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'pr-twp', // CUSTOM
        'tw-flex tw-flex-col tw-space-y-1.5 tw-p-6',
        className,
      )}
      {...props}
    />
  ),
);
CardHeader.displayName = 'CardHeader';

/** @inheritdoc Card */
const CardTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'pr-twp', // CUSTOM
        'tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight',
        className,
      )}
      {...props}
    />
  ),
);
CardTitle.displayName = 'CardTitle';

/** @inheritdoc Card */
const CardDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'pr-twp', // CUSTOM
        'tw-text-sm tw-text-muted-foreground',
        className,
      )}
      {...props}
    />
  ),
);
CardDescription.displayName = 'CardDescription';

/** @inheritdoc Card */
const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'pr-twp', // CUSTOM
        'tw-p-6 tw-pt-0',
        className,
      )}
      {...props}
    />
  ),
);
CardContent.displayName = 'CardContent';

/** @inheritdoc Card */
const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'pr-twp', // CUSTOM
        'tw-flex tw-items-center tw-p-6 tw-pt-0',
        className,
      )}
      {...props}
    />
  ),
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
