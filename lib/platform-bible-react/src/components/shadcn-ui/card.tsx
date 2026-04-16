import React from 'react';

import { cn } from '@/utils/shadcn-ui/utils';

/**
 * The Card component displays a card with header, content, and footer. This component is built and
 * styled with Shadcn UI. See Shadcn UI Documentation: https://ui.shadcn.com/docs/components/card
 */
function Card({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      className={cn(
        'pr-twp tw:rounded-lg tw:border tw:bg-card tw:text-card-foreground tw:shadow-sm',
        className,
      )}
      {...props}
    />
  );
}

/** @inheritdoc Card */
function CardHeader({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      className={cn('pr-twp tw:flex tw:flex-col tw:space-y-1.5 tw:p-6', className)}
      {...props}
    />
  );
}

/** @inheritdoc Card */
function CardTitle({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & { ref?: React.Ref<HTMLParagraphElement> }) {
  return (
    <h3
      ref={ref}
      className={cn(
        'pr-twp tw:text-2xl tw:font-semibold tw:leading-none tw:tracking-tight',
        className,
      )}
      {...props}
    >
      {/* added because of https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/heading-has-content.md  */}
      {props.children}
    </h3>
  );
}

/** @inheritdoc Card */
function CardDescription({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement> & { ref?: React.Ref<HTMLParagraphElement> }) {
  return (
    <p
      ref={ref}
      className={cn('pr-twp tw:text-sm tw:text-muted-foreground', className)}
      {...props}
    />
  );
}

/** @inheritdoc Card */
function CardContent({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }) {
  return <div ref={ref} className={cn('pr-twp tw:p-6 tw:pt-0', className)} {...props} />;
}

/** @inheritdoc Card */
function CardFooter({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      className={cn('pr-twp tw:flex tw:items-center tw:p-6 tw:pt-0', className)}
      {...props}
    />
  );
}

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
