import React from 'react';
import { Separator as SeparatorPrimitive } from 'radix-ui';

import { cn } from '@/utils/shadcn-ui/utils';

/**
 * The Separator component visually or semantically separates content. This component is built on
 * Radix UI primitives and styled with Shadcn UI.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/separator}
 * @see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/separator}
 */
// CUSTOM: Added TSDoc with links to shadcn/ui and Radix UI documentation
function Separator({
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        'pr-twp tw:shrink-0 tw:bg-border tw:data-horizontal:h-px tw:data-horizontal:w-full tw:data-vertical:w-px tw:data-vertical:self-stretch',
        className,
      )}
      {...props}
    />
  );
}

export { Separator };
