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

// The re-export of the sonner function was added manually
export { Sonner, sonner };
