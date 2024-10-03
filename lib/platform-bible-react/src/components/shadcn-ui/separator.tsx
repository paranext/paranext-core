import React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';

import { cn } from '@/utils/shadcn-ui.util';

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(({ className, orientation = 'horizontal', decorative = true, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn(
      'pr-twp pr-shrink-0 pr-bg-border',
      orientation === 'horizontal' ? 'pr-h-[1px] pr-w-full' : 'pr-h-full pr-w-[1px]',
      className,
    )}
    {...props}
  />
));
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
