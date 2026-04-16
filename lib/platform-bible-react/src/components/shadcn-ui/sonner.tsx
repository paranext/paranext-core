import { ComponentProps } from 'react';
import { Toaster as Sonner, toast as sonner } from 'sonner';

/**
 * Props for Sonner component.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/sonner}
 * @see Sonner Documentation: {@link https://sonner.emilkowal.ski}
 */
type SonnerProps = ComponentProps<typeof Sonner>;

/**
 * The Sonner component is an opinionated toast component for React. It is built on Sonner and
 * styled with Shadcn UI.
 *
 * @param SonnerProps
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/sonner}
 * @see Sonner Documentation: {@link https://sonner.emilkowal.ski}
 */
function Toaster({ ...props }: SonnerProps) {
  return (
    <Sonner
      className="tw:toaster tw:group"
      toastOptions={{
        classNames: {
          toast:
            'tw:group tw:toast tw:group-[.tw\\:toaster]:bg-background tw:group-[.tw\\:toaster]:text-foreground tw:group-[.tw\\:toaster]:border-border tw:group-[.tw\\:toaster]:shadow-lg',
          description: 'tw:group-[.tw\\:toast]:text-muted-foreground',
          actionButton:
            'tw:group-[.tw\\:toast]:bg-primary tw:group-[.tw\\:toast]:text-primary-foreground',
          cancelButton:
            'tw:group-[.tw\\:toast]:bg-muted tw:group-[.tw\\:toast]:text-muted-foreground',
        },
      }}
      {...props}
    />
  );
}

// Toaster exported as Sonner to maintain the API names
// The re-export of the sonner function was added manually
export { Toaster as Sonner, sonner };
