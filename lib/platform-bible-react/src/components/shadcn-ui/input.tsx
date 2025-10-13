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
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'tw-flex tw-h-9 tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-transparent tw-px-3 tw-py-1 tw-text-base tw-shadow-sm tw-transition-colors file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm',
          className,
        )}
        ref={ref}
        // CUSTOM: Suppress warning produced by imported shadcn code
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
