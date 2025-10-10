'use client';

import { ComponentProps } from 'react';
import { useTheme } from 'next-themes';
import { toast as sonner, Toaster as Sonner } from 'sonner';

/**
 * Props for Sonner component.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/sonner}
 * @see Sonner Documentation: {@link https://sonner.emilkowal.ski}
 */
type ToasterProps = ComponentProps<typeof Sonner>;

/**
 * The Sonner component is an opinionated toast component for React. It is built on Sonner and
 * styled with Shadcn UI.
 *
 * @param ToasterProps
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/sonner}
 * @see Sonner Documentation: {@link https://sonner.emilkowal.ski}
 */
function Toaster({ ...props }: ToasterProps) {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      // CUSTOM: Suppress warning produced by imported shadcn code
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      theme={theme as ToasterProps['theme']}
      className="tw-toaster tw-group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        },
      }}
      {...props}
    />
  );
}

// CUSTOM: The re-export of the sonner function was added manually
export { Toaster as Sonner, sonner };
