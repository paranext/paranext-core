// CUSTOM: Added the React import that upstream's generated empty.tsx omits; `ensureReactImport` in
// scripts/shadcn-transform-utils.ts now inserts it during `shadcn apply`.
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/shadcn-ui/utils';

/**
 * The Empty component displays a centered zero-state message — typically a title, description, and
 * an optional action — for when there is no content to show. The component is built and styled by
 * Shadcn UI.
 *
 * Use this composition when the zero-state needs media, a heading, or an action. For a plain
 * one-line "nothing to show" message inside a list, grid, or panel, use {@link EmptyState} instead —
 * it takes a single localized `message` and renders it in a `role="status"` region. These
 * primitives set no ARIA role, so pass `role="status"` yourself before the zero-state appears.
 *
 * Two things the caller controls: the root sets `border-dashed` but no border width —
 * Platform.Bible's scoped Tailwind Preflight zeroes borders, so pass `className="tw:border"` to
 * draw the dashed outline — and {@link EmptyTitle} renders a `<div>`, not a heading, so nest your
 * own heading element inside it when the zero-state is a region's entire content.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/radix/empty}
 */
// CUSTOM: Added TSDoc comment with link to upstream shadcn/ui documentation, plus the
// EmptyState-vs-Empty, ARIA-role and border-width guidance consumers would otherwise have to guess.
function Empty({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="empty"
      className={cn(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        'pr-twp tw:flex tw:w-full tw:min-w-0 tw:flex-1 tw:flex-col tw:items-center tw:justify-center tw:gap-4 tw:rounded-xl tw:border-dashed tw:p-6 tw:text-center tw:text-balance',
        className,
      )}
      {...props}
    />
  );
}

/**
 * Container for the Empty component's icon/media, title, and description. The component is built
 * and styled by Shadcn UI.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/radix/empty}
 */
// CUSTOM: Added TSDoc comment with link to upstream shadcn/ui documentation.
function EmptyHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="empty-header"
      className={cn(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        'pr-twp tw:flex tw:max-w-sm tw:flex-col tw:items-center tw:gap-2',
        className,
      )}
      {...props}
    />
  );
}

/**
 * Style variants for the EmptyMedia component.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/radix/empty}
 */
// CUSTOM: Added TSDoc comment with link to upstream shadcn/ui documentation.
const emptyMediaVariants = cva(
  'tw:mb-2 tw:flex tw:shrink-0 tw:items-center tw:justify-center tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'tw:bg-transparent',
        icon: 'tw:flex tw:size-8 tw:shrink-0 tw:items-center tw:justify-center tw:rounded-lg tw:bg-muted tw:text-foreground tw:[&_svg:not([class*=size-])]:size-4',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

/**
 * Container for the Empty component's icon or other media, e.g. an illustration or avatar. The
 * component is built and styled by Shadcn UI.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/radix/empty}
 */
// CUSTOM: Added TSDoc comment with link to upstream shadcn/ui documentation.
function EmptyMedia({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof emptyMediaVariants>) {
  return (
    <div
      // Upstream's data-slot value is kept even though the component is named EmptyMedia: data-slot
      // is shadcn's cross-component styling contract, so snippets from the shadcn docs that select
      // [data-slot=empty-icon] keep working. input-group.tsx does the same for its control slots.
      data-slot="empty-icon"
      data-variant={variant}
      className={cn(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        'pr-twp',
        emptyMediaVariants({ variant }),
        className,
      )}
      {...props}
    />
  );
}

/**
 * The Empty component's title text. The component is built and styled by Shadcn UI.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/radix/empty}
 */
// CUSTOM: Added TSDoc comment with link to upstream shadcn/ui documentation.
function EmptyTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="empty-title"
      className={cn(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        'pr-twp tw:font-heading tw:text-sm tw:font-medium tw:tracking-tight',
        className,
      )}
      {...props}
    />
  );
}

/**
 * The Empty component's description text. The component is built and styled by Shadcn UI.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/radix/empty}
 */
// CUSTOM: Added TSDoc comment with link to upstream shadcn/ui documentation.
// CUSTOM: Changed the props type from upstream's React.ComponentProps<'p'> to
// React.ComponentProps<'div'> so it matches the <div> this component actually renders. Upstream
// advertises a paragraph element it does not render, which mistypes ref and event handlers.
function EmptyDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="empty-description"
      className={cn(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        'pr-twp tw:text-sm/relaxed tw:text-muted-foreground tw:[&>a]:underline tw:[&>a]:underline-offset-4 tw:[&>a:hover]:text-primary',
        className,
      )}
      {...props}
    />
  );
}

/**
 * Container for the Empty component's main content, typically actions such as buttons. The
 * component is built and styled by Shadcn UI.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/radix/empty}
 */
// CUSTOM: Added TSDoc comment with link to upstream shadcn/ui documentation.
function EmptyContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="empty-content"
      className={cn(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        'pr-twp tw:flex tw:w-full tw:max-w-sm tw:min-w-0 tw:flex-col tw:items-center tw:gap-2.5 tw:text-sm tw:text-balance',
        className,
      )}
      {...props}
    />
  );
}

export { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent, EmptyMedia };
