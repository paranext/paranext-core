import { ComponentProps } from 'react';
import { toast as sonner, Toaster } from 'sonner';

type SonnerProps = ComponentProps<typeof Toaster>;

function Sonner({ ...props }: SonnerProps) {
  return (
    <Toaster
      className="pr-toaster pr-group"
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
