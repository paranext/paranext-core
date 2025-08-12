import React from 'react';
import { cn } from '@/utils/shadcn-ui.util';

/**
 * Props for Input component
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/input}
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

/**
 * Input component displays a form input field or a component that looks like an input field. This
 * components is built and styled with Shadcn UI.
 *
 * @param InputProps
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/input}
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50',
          className,
        )}
        ref={ref}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';
