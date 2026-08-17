// CUSTOM: Added missing `import React from 'react';` — upstream shadcn's generated empty.tsx has
// no React import at all (it only references `React.ComponentProps` as a type), so the standard
// "replace `import * as React from 'react'` with `import React from 'react'`" file transform had
// nothing to replace and left the file without React in scope, causing `no-undef` lint errors on
// every `React.ComponentProps` reference. Added to match every sibling file in this folder
// (e.g. card.tsx, input.tsx), which all import React the same way.
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/shadcn-ui/utils';

/**
 * The Empty component displays a centered zero-state message — typically a title, description, and
 * an optional action — for when there is no content to show. The component is built and styled by
 * Shadcn UI.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/radix/empty}
 */
// CUSTOM: Added TSDoc comment with link to upstream shadcn/ui documentation.
function Empty({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="empty"
      className={cn(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        'pr-twp',
        'tw:flex tw:w-full tw:min-w-0 tw:flex-1 tw:flex-col tw:items-center tw:justify-center tw:gap-4 tw:rounded-xl tw:border-dashed tw:p-6 tw:text-center tw:text-balance',
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
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        'pr-twp',
        'tw:flex tw:max-w-sm tw:flex-col tw:items-center tw:gap-2',
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
      data-slot="empty-icon"
      data-variant={variant}
      className={cn(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        'pr-twp',
        emptyMediaVariants({ variant, className }),
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
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        'pr-twp',
        'tw:font-heading tw:text-sm tw:font-medium tw:tracking-tight',
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
function EmptyDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <div
      data-slot="empty-description"
      className={cn(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        'pr-twp',
        'tw:text-sm/relaxed tw:text-muted-foreground tw:[&>a]:underline tw:[&>a]:underline-offset-4 tw:[&>a:hover]:text-primary',
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
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        'pr-twp',
        'tw:flex tw:w-full tw:max-w-sm tw:min-w-0 tw:flex-col tw:items-center tw:gap-2.5 tw:text-sm tw:text-balance',
        className,
      )}
      {...props}
    />
  );
}

export { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent, EmptyMedia };
