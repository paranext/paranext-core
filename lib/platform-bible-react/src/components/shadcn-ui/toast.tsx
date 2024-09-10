import React from 'react';
import * as ToastPrimitives from '@radix-ui/react-toast';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';

import { cn } from '@/utils/shadcn-ui.util';

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      'pr-fixed pr-top-0 pr-z-[100] pr-flex pr-max-h-screen pr-w-full pr-flex-col-reverse pr-p-4 sm:pr-bottom-0 sm:pr-right-0 sm:pr-top-auto sm:pr-flex-col md:pr-max-w-[420px]',
      className,
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
  'pr-group pr-pointer-events-auto pr-relative pr-flex pr-w-full pr-items-center pr-justify-between pr-space-x-4 pr-overflow-hidden pr-rounded-md pr-border pr-p-6 pr-pr-8 pr-shadow-lg pr-transition-all data-[swipe=cancel]:pr-translate-x-0 data-[swipe=end]:pr-translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:pr-translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:pr-transition-none data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[swipe=end]:pr-animate-out data-[state=closed]:pr-fade-out-80 data-[state=closed]:pr-slide-out-to-right-full data-[state=open]:pr-slide-in-from-top-full data-[state=open]:sm:pr-slide-in-from-bottom-full',
  {
    variants: {
      variant: {
        default: 'pr-border pr-bg-background pr-text-foreground',
        destructive:
          'pr-destructive pr-group pr-border-destructive pr-bg-destructive pr-text-destructive-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn('pr-twp', toastVariants({ variant }), className)}
      {...props}
    />
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      'pr-inline-flex pr-h-8 pr-shrink-0 pr-items-center pr-justify-center pr-rounded-md pr-border pr-bg-transparent pr-px-3 pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-colors hover:pr-bg-secondary focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 group-[.destructive]:pr-border-muted/40 group-[.destructive]:hover:pr-border-destructive/30 group-[.destructive]:hover:pr-bg-destructive group-[.destructive]:hover:pr-text-destructive-foreground group-[.destructive]:focus:pr-ring-destructive',
      className,
    )}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      'pr-absolute pr-right-2 pr-top-2 pr-rounded-md pr-p-1 pr-text-foreground/50 pr-opacity-0 pr-transition-opacity hover:pr-text-foreground focus:pr-opacity-100 focus:pr-outline-none focus:pr-ring-2 group-hover:pr-opacity-100 group-[.destructive]:pr-text-red-300 group-[.destructive]:hover:pr-text-red-50 group-[.destructive]:focus:pr-ring-red-400 group-[.destructive]:focus:pr-ring-offset-red-600',
      className,
    )}
    toast-close=""
    {...props}
  >
    <X className="pr-h-4 pr-w-4" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn('pr-text-sm pr-font-semibold', className)}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn('pr-text-sm pr-opacity-90', className)}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};
