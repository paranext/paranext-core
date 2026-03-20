import React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';

import { cn } from '@/utils/shadcn-ui.util';

/**
 * The Separator component visually or semantically separates content. This component is built on
 * Radix UI primitives and styled with Shadcn UI.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/separator}
 * @see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/separator}
 */
function Separator({
  className,
  orientation = 'horizontal',
  decorative = true,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> & {
  ref?: React.Ref<React.ComponentRef<typeof SeparatorPrimitive.Root>>;
}) {
  return (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        'pr-twp tw-shrink-0 tw-bg-border',
        orientation === 'horizontal' ? 'tw-h-[1px] tw-w-full' : 'tw-h-full tw-w-[1px]',
        className,
      )}
      {...props}
    />
  );
}

export { Separator };
