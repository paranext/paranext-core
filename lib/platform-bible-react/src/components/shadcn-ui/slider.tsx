import React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '@/utils/shadcn-ui.util';
import { Direction, readDirection } from '@/utils/dir-helper.util';

/**
 * The Slider component is an input where the user selects a value from within a given range. This
 * component is built on Radix UI primitives and styled with Shadcn UI.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/slider}
 * @see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/slider}
 */
function Slider({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
  ref?: React.Ref<React.ComponentRef<typeof SliderPrimitive.Root>>;
}) {
  const dir: Direction = readDirection();
  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        'pr-twp tw:relative tw:flex tw:w-full tw:touch-none tw:select-none tw:items-center',
        className,
      )}
      {...props}
      dir={dir}
    >
      <SliderPrimitive.Track className="tw:relative tw:h-2 tw:w-full tw:grow tw:overflow-hidden tw:rounded-full tw:bg-secondary">
        <SliderPrimitive.Range className="tw:absolute tw:h-full tw:bg-primary" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="tw:block tw:h-5 tw:w-5 tw:rounded-full tw:border-2 tw:border-primary tw:bg-background tw:ring-offset-background tw:transition-colors tw:focus-visible:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:disabled:pointer-events-none tw:disabled:opacity-50" />
    </SliderPrimitive.Root>
  );
}

export { Slider };
