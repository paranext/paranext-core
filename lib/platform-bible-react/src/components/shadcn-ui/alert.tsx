import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/shadcn-ui.util';

const alertVariants = cva(
  // CUSTOM: Copied all `svg` arbitrary selector variant classes as `img` variants so we can use
  // images (or svgs from file) as icons
  // Implemented by TJ Couch
  // Approved by Alex Mercado
  // 20 February 2025
  'tw:relative tw:w-full tw:rounded-lg tw:border tw:px-4 tw:py-3 tw:text-sm tw:[&>svg+div]:translate-y-[-3px] tw:[&>svg]:absolute tw:[&>svg]:left-4 tw:[&>svg]:top-4 tw:[&>svg]:text-foreground tw:[&>svg~*]:pl-7 tw:[&>img+div]:translate-y-[-3px] tw:[&>img]:absolute tw:[&>img]:left-4 tw:[&>img]:top-4 tw:[&>img]:text-foreground tw:[&>img~*]:pl-7',
  {
    variants: {
      variant: {
        default: 'tw:bg-background tw:text-foreground',
        destructive:
          // CUSTOM: Copied all `svg` arbitrary selector variant classes as `img` variants so we can
          // use images (or svgs from file) as icons
          // Implemented by TJ Couch
          // Approved by Alex Mercado
          // 20 February 2025
          'tw:border-destructive/50 tw:text-destructive tw:dark:border-destructive tw:[&>svg]:text-destructive tw:[&>img]:text-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

/**
 * The Alert displays a callout for user attention. The component is built and styled by Shadcn UI.
 * See Shadcn UI Documentation https://ui.shadcn.com/docs/components/alert
 */
function Alert({
  className,
  variant,
  ref,
  ...props
}: React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof alertVariants> & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      role="alert"
      className={cn(
        // CUSTOM
        'pr-twp',
        alertVariants({ variant }),
        className,
      )}
      {...props}
    />
  );
}

/** @inheritdoc Alert */
function AlertTitle({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & { ref?: React.Ref<HTMLParagraphElement> }) {
  return (
    <h5
      ref={ref}
      className={cn('tw:mb-1 tw:font-medium tw:leading-none tw:tracking-tight', className)}
      {...props}
    >
      {/* added because of https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/heading-has-content.md  */}
      {props.children}{' '}
    </h5>
  );
}

/** @inheritdoc Alert */
function AlertDescription({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement> & { ref?: React.Ref<HTMLParagraphElement> }) {
  return (
    <div ref={ref} className={cn('tw:text-sm tw:[&_p]:leading-relaxed', className)} {...props} />
  );
}

export { Alert, AlertTitle, AlertDescription };
