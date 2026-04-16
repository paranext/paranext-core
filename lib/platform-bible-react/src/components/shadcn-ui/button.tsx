import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/shadcn-ui/utils';

/**
 * Style variants for the Button component.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/button}
 */
export const buttonVariants = cva(
  'pr-twp tw:inline-flex tw:items-center tw:justify-center tw:gap-2 tw:whitespace-nowrap tw:rounded-md tw:text-sm tw:font-medium tw:ring-offset-background tw:transition-colors tw:focus-visible:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:size-4 tw:[&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'tw:bg-primary tw:text-primary-foreground tw:hover:bg-primary/90',
        destructive: 'tw:bg-destructive tw:text-destructive-foreground tw:hover:bg-destructive/90',
        outline:
          'tw:border tw:border-input tw:bg-background tw:hover:bg-accent tw:hover:text-accent-foreground',
        secondary: 'tw:bg-secondary tw:text-secondary-foreground tw:hover:bg-secondary/80',
        ghost: 'tw:hover:bg-accent tw:hover:text-accent-foreground',
        link: 'tw:text-primary tw:underline-offset-4 tw:hover:underline',
      },
      size: {
        default: 'tw:h-10 tw:px-4 tw:py-2',
        sm: 'tw:h-9 tw:rounded-md tw:px-3',
        lg: 'tw:h-11 tw:rounded-md tw:px-8',
        icon: 'tw:h-10 tw:w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

/**
 * Props for Button component
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/button}
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

/**
 * The Button component displays a button or a component that looks like a button. The component is
 * built and styled by Shadcn UI.
 *
 * @param ButtonProps
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/button}
 */
export function Button({
  className,
  variant,
  size,
  asChild = false,
  ref,
  ...props
}: ButtonProps & { ref?: React.Ref<HTMLButtonElement> }) {
  const Comp = asChild ? Slot : 'button';
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
}
