import React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/shadcn-ui.util';

/**
 * Style variants for the Label component.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/label}
 * @see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/label}
 */
const labelVariants = cva(
  'tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70',
);

/**
 * The Label component renders an accessible label associated with controls. This components is
 * built on Radix UI primitives and styled with Shadcn UI.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/label}
 * @see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/label}
 */
export const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn('pr-twp', labelVariants(), className)} {...props} />
));
Label.displayName = LabelPrimitive.Root.displayName;
