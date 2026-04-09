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
export function Input({
  className,
  type,
  ref,
  ...props
}: InputProps & { ref?: React.Ref<HTMLInputElement> }) {
  return (
    <input
      type={type}
      className={cn(
        'pr-twp tw:flex tw:h-9 tw:w-full tw:rounded-md tw:border tw:border-input tw:bg-transparent tw:px-3 tw:py-1 tw:text-base tw:shadow-sm tw:transition-colors tw:file:border-0 tw:file:bg-transparent tw:file:text-sm tw:file:font-medium tw:file:text-foreground tw:placeholder:text-muted-foreground tw:focus-visible:outline-none tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:md:text-sm',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
}
