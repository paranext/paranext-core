import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/shadcn-ui/utils';
import { Button } from '@/components/shadcn-ui/button';
import { Input } from '@/components/shadcn-ui/input';
import { Textarea } from '@/components/shadcn-ui/textarea';

/**
 * A compound input group component that wraps an input with optional addons, buttons, or text.
 * Provides focus-ring coordination and layout management for inline input decorations.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/input}
 */
function InputGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        'pr-twp tw:group/input-group tw:relative tw:flex tw:h-8 tw:w-full tw:min-w-0 tw:items-center tw:rounded-lg tw:border tw:border-input tw:transition-colors tw:outline-none tw:in-data-[slot=combobox-content]:focus-within:border-inherit tw:in-data-[slot=combobox-content]:focus-within:ring-0 tw:has-disabled:bg-input/50 tw:has-disabled:opacity-50 tw:has-[[data-slot=input-group-control]:focus-visible]:border-ring tw:has-[[data-slot=input-group-control]:focus-visible]:ring-3 tw:has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 tw:has-[[data-slot][aria-invalid=true]]:border-destructive tw:has-[[data-slot][aria-invalid=true]]:ring-3 tw:has-[[data-slot][aria-invalid=true]]:ring-destructive/20 tw:has-[>[data-align=block-end]]:h-auto tw:has-[>[data-align=block-end]]:flex-col tw:has-[>[data-align=block-start]]:h-auto tw:has-[>[data-align=block-start]]:flex-col tw:has-[>textarea]:h-auto tw:dark:bg-input/30 tw:dark:has-disabled:bg-input/80 tw:dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 tw:has-[>[data-align=block-end]]:[&>input]:pt-3 tw:has-[>[data-align=block-start]]:[&>input]:pb-3 tw:has-[>[data-align=inline-end]]:[&>input]:pe-1.5 tw:has-[>[data-align=inline-start]]:[&>input]:ps-1.5',
        className,
      )}
      {...props}
    />
  );
}

/**
 * Variants for the {@link InputGroupAddon} component controlling its inline or block placement.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/input}
 */
const inputGroupAddonVariants = cva(
  'tw:flex tw:h-auto tw:cursor-text tw:items-center tw:justify-center tw:gap-2 tw:py-1.5 tw:text-sm tw:font-medium tw:text-muted-foreground tw:select-none tw:group-data-[disabled=true]/input-group:opacity-50 tw:[&>kbd]:rounded-[calc(var(--radius)-5px)] tw:[&>svg:not([class*=size-])]:size-4',
  {
    variants: {
      align: {
        'inline-start':
          'tw:order-first tw:ps-2 tw:has-[>button]:ms-[-0.3rem] tw:has-[>kbd]:ms-[-0.15rem]',
        'inline-end':
          'tw:order-last tw:pe-2 tw:has-[>button]:me-[-0.3rem] tw:has-[>kbd]:me-[-0.15rem]',
        'block-start':
          'tw:order-first tw:w-full tw:justify-start tw:px-2.5 tw:pt-2 tw:group-has-[>input]/input-group:pt-2 tw:[.border-b]:pb-2',
        'block-end':
          'tw:order-last tw:w-full tw:justify-start tw:px-2.5 tw:pb-2 tw:group-has-[>input]/input-group:pb-2 tw:[.border-t]:pt-2',
      },
    },
    defaultVariants: {
      align: 'inline-start',
    },
  },
);

/**
 * An addon placed inside an {@link InputGroup}, used to display icons, buttons, or text adjacent to
 * the input. Clicking the addon area proxies focus to the associated input.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/input}
 */
function InputGroupAddon({
  className,
  align = 'inline-start',
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    // CUSTOM: Clicking anywhere in the addon area proxies focus to the associated input — a
    // deliberate UX enhancement. The a11y rules flag a non-interactive role="group" element having
    // a click handler, but removing the handler would degrade the UX. Keyboard focus on the input
    // itself is still accessible and not affected by this handler.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        // CUSTOM: Use instanceof guard instead of 'as HTMLElement' type assertion to safely access .closest()
        if (e.target instanceof HTMLElement && e.target.closest('button')) {
          return;
        }
        e.currentTarget.parentElement?.querySelector('input')?.focus();
      }}
      {...props}
    />
  );
}

/**
 * Variants for the {@link InputGroupButton} component controlling size.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/input}
 */
const inputGroupButtonVariants = cva('tw:flex tw:items-center tw:gap-2 tw:text-sm tw:shadow-none', {
  variants: {
    size: {
      xs: 'tw:h-6 tw:gap-1 tw:rounded-[calc(var(--radius)-3px)] tw:px-1.5 tw:[&>svg:not([class*=size-])]:size-3.5',
      sm: 'tw:',
      'icon-xs': 'tw:size-6 tw:rounded-[calc(var(--radius)-3px)] tw:p-0 tw:has-[>svg]:p-0',
      'icon-sm': 'tw:size-8 tw:p-0 tw:has-[>svg]:p-0',
    },
  },
  defaultVariants: {
    size: 'xs',
  },
});

/**
 * A ghost button sized to fit inside an {@link InputGroup}.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/input}
 */
function InputGroupButton({
  className,
  type = 'button',
  variant = 'ghost',
  size = 'xs',
  ...props
}: Omit<React.ComponentProps<typeof Button>, 'size'> &
  VariantProps<typeof inputGroupButtonVariants>) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  );
}

/**
 * A plain text span styled to fit inline inside an {@link InputGroup}.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/input}
 */
function InputGroupText({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      className={cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        'pr-twp tw:flex tw:items-center tw:gap-2 tw:text-sm tw:text-muted-foreground tw:[&_svg]:pointer-events-none tw:[&_svg:not([class*=size-])]:size-4',
        className,
      )}
      {...props}
    />
  );
}

/**
 * An `<input>` styled to occupy its slot inside an {@link InputGroup}, with borders and rings
 * suppressed so the group provides the visual boundary.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/input}
 */
function InputGroupInput({ className, ...props }: React.ComponentProps<'input'>) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        'tw:flex-1 tw:rounded-none tw:border-0 tw:bg-transparent tw:shadow-none tw:ring-0 tw:focus-visible:ring-0 tw:disabled:bg-transparent tw:aria-invalid:ring-0 tw:dark:bg-transparent tw:dark:disabled:bg-transparent',
        className,
      )}
      {...props}
    />
  );
}

/**
 * A `<textarea>` styled to occupy its slot inside an {@link InputGroup}, with borders and rings
 * suppressed so the group provides the visual boundary.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/input}
 */
function InputGroupTextarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        'tw:flex-1 tw:resize-none tw:rounded-none tw:border-0 tw:bg-transparent tw:py-2 tw:shadow-none tw:ring-0 tw:focus-visible:ring-0 tw:disabled:bg-transparent tw:aria-invalid:ring-0 tw:dark:bg-transparent tw:dark:disabled:bg-transparent',
        className,
      )}
      {...props}
    />
  );
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
};
