'use client';

import React from 'react';
import { Slider as SliderPrimitive } from 'radix-ui';

import { cn } from '@/utils/shadcn-ui/utils';
// CUSTOM: Added Direction and readDirection imports for RTL slider fill direction support
import { type Direction, readDirection } from '@/utils/dir-helper.util';

/**
 * The Slider component is an input where the user selects a value from within a given range. This
 * component is built on Radix UI primitives and styled with Shadcn UI.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/slider}
 * @see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/slider}
 */
// CUSTOM: Added TSDoc with links to shadcn/ui and Radix UI documentation
function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  // CUSTOM: Added readDirection() call and dir prop for RTL slider fill direction support
  const dir: Direction = readDirection();

  const _values = React.useMemo(
    () => (Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max]),
    [value, defaultValue, min, max],
  );

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; added dir prop for RTL support
      className={cn(
        'pr-twp tw:relative tw:flex tw:w-full tw:touch-none tw:items-center tw:select-none tw:data-disabled:opacity-50 tw:data-vertical:h-full tw:data-vertical:min-h-40 tw:data-vertical:w-auto tw:data-vertical:flex-col',
        className,
      )}
      // CUSTOM: Added dir prop so Radix UI reverses fill direction in RTL layouts
      dir={dir}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className="tw:relative tw:grow tw:overflow-hidden tw:rounded-full tw:bg-muted tw:data-horizontal:h-1 tw:data-horizontal:w-full tw:data-vertical:h-full tw:data-vertical:w-1"
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className="tw:absolute tw:bg-primary tw:select-none tw:data-horizontal:h-full tw:data-vertical:w-full"
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="tw:relative tw:block tw:size-3 tw:shrink-0 tw:rounded-full tw:border tw:border-ring tw:bg-white tw:ring-ring/50 tw:transition-[color,box-shadow] tw:select-none tw:after:absolute tw:after:-inset-2 tw:hover:ring-3 tw:focus-visible:ring-3 tw:focus-visible:outline-hidden tw:active:ring-3 tw:disabled:pointer-events-none tw:disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };
