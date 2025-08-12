import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/shadcn-ui.util';

/**
 * Style variants for the Button component.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/button}
 */
export const buttonVariants = cva(
  'pr-twp tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0',
  {
    variants: {
      variant: {
        default: 'tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90',
        destructive: 'tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90',
        outline:
          'tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground',
        secondary: 'tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80',
        ghost: 'hover:tw-bg-accent hover:tw-text-accent-foreground',
        link: 'tw-text-primary tw-underline-offset-4 hover:tw-underline',
      },
      size: {
        default: 'tw-h-10 tw-px-4 tw-py-2',
        sm: 'tw-h-9 tw-rounded-md tw-px-3',
        lg: 'tw-h-11 tw-rounded-md tw-px-8',
        icon: 'tw-h-10 tw-w-10',
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
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = 'Button';
