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
        'pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm',
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
      className={cn('pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6', className)}
      {...props}
    />
  ),
);
CardHeader.displayName = 'CardHeader';

/** @inheritdoc Card */
const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        'pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight',
        className,
      )}
      {...props}
    >
      {/* added because of https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/heading-has-content.md  */}
      {props.children}
    </h3>
  ),
);
CardTitle.displayName = 'CardTitle';

/** @inheritdoc Card */
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('pr-twp tw-text-sm tw-text-muted-foreground', className)} {...props} />
));
CardDescription.displayName = 'CardDescription';

/** @inheritdoc Card */
const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('pr-twp tw-p-6 tw-pt-0', className)} {...props} />
  ),
);
CardContent.displayName = 'CardContent';

/** @inheritdoc Card */
const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0', className)}
      {...props}
    />
  ),
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
