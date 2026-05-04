import { ComponentProps } from 'react';
import { toast as sonner, Toaster } from 'sonner';

/**
 * Props for Sonner component.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/sonner}
 * @see Sonner Documentation: {@link https://sonner.emilkowal.ski}
 */
type SonnerProps = ComponentProps<typeof Toaster>;

/**
 * The Sonner component is an opinionated toast component for React. It is built on Sonner and
 * styled with Shadcn UI.
 *
 * @param SonnerProps
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/sonner}
 * @see Sonner Documentation: {@link https://sonner.emilkowal.ski}
 */
function Sonner({ ...props }: SonnerProps) {
  return (
    <Toaster
      className="tw-toaster tw-group"
      toastOptions={{
        classNames: {
          toast:
            'tw-group tw-toast group-[.tw-toaster]:tw-bg-background group-[.tw-toaster]:tw-text-foreground group-[.tw-toaster]:tw-border-border group-[.tw-toaster]:tw-shadow-lg',
          description: 'group-[.tw-toast]:tw-text-muted-foreground',
          actionButton:
            'group-[.tw-toast]:tw-bg-primary group-[.tw-toast]:tw-text-primary-foreground',
          cancelButton: 'group-[.tw-toast]:tw-bg-muted group-[.tw-toast]:tw-text-muted-foreground',
        },
      }}
      {...props}
    />
  );
}

// The re-export of the sonner function was added manually
export { Sonner, sonner };
