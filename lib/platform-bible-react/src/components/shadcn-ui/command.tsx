import React from 'react';
import { type DialogProps } from '@radix-ui/react-dialog';
import { Command as CommandPrimitive } from 'cmdk';
import { Search } from 'lucide-react';

import { cn } from '@/utils/shadcn-ui.util';
import { Dialog, DialogContent } from '@/components/shadcn-ui/dialog';
import { Direction, readDirection } from '@/utils/dir-helper.util';

/**
 * Command menu for React. These components are built on cmdk and styled with Shadcn UI. See Shadcn
 * UI documentation: https://ui.shadcn.com/docs/components/command See cmdk documentation:
 * https://cmdk.paco.me/
 */
function Command({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive> & {
  ref?: React.Ref<React.ComponentRef<typeof CommandPrimitive>>;
}) {
  return (
    <CommandPrimitive
      ref={ref}
      className={cn(
        'tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground',
        className,
      )}
      {...props}
    />
  );
}

interface CommandDialogProps extends DialogProps {}

/** @inheritdoc Command */
function CommandDialog({ children, ...props }: CommandDialogProps) {
  return (
    <Dialog {...props}>
      <DialogContent className="tw-overflow-hidden tw-p-0 tw-shadow-lg">
        <Command className="[&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:tw-pt-0 [&_[cmdk-group]]:tw-px-2 [&_[cmdk-input-wrapper]_svg]:tw-h-5 [&_[cmdk-input-wrapper]_svg]:tw-w-5 [&_[cmdk-input]]:tw-h-12 [&_[cmdk-item]]:tw-px-2 [&_[cmdk-item]]:tw-py-3 [&_[cmdk-item]_svg]:tw-h-5 [&_[cmdk-item]_svg]:tw-w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
}

/** @inheritdoc Command */
function CommandInput({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input> & {
  ref?: React.Ref<React.ComponentRef<typeof CommandPrimitive.Input>>;
}) {
  const dir: Direction = readDirection();
  return (
    <div className="tw-flex tw-items-center tw-border-b tw-px-3" dir={dir}>
      <Search className="tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" />
      <CommandPrimitive.Input
        ref={ref}
        className={cn(
          'tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50',
          className,
        )}
        {...props}
      />
    </div>
  );
}

/** @inheritdoc Command */
function CommandList({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.List> & {
  ref?: React.Ref<React.ComponentRef<typeof CommandPrimitive.List>>;
}) {
  return (
    <CommandPrimitive.List
      ref={ref}
      className={cn('tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden', className)}
      {...props}
    />
  );
}

/** @inheritdoc Command */
function CommandEmpty({
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty> & {
  ref?: React.Ref<React.ComponentRef<typeof CommandPrimitive.Empty>>;
}) {
  return (
    <CommandPrimitive.Empty ref={ref} className="tw-py-6 tw-text-center tw-text-sm" {...props} />
  );
}

/** @inheritdoc Command */
function CommandGroup({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group> & {
  ref?: React.Ref<React.ComponentRef<typeof CommandPrimitive.Group>>;
}) {
  return (
    <CommandPrimitive.Group
      ref={ref}
      className={cn(
        'tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground',
        className,
      )}
      {...props}
    />
  );
}

/** @inheritdoc Command */
function CommandSeparator({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator> & {
  ref?: React.Ref<React.ComponentRef<typeof CommandPrimitive.Separator>>;
}) {
  return (
    <CommandPrimitive.Separator
      ref={ref}
      className={cn('tw--mx-1 tw-h-px tw-bg-border', className)}
      {...props}
    />
  );
}

/** @inheritdoc Command */
function CommandItem({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item> & {
  ref?: React.Ref<React.ComponentRef<typeof CommandPrimitive.Item>>;
}) {
  return (
    <CommandPrimitive.Item
      ref={ref}
      className={cn(
        'tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50',
        className,
      )}
      {...props}
    />
  );
}

/** @inheritdoc Command */
function CommandShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn('tw-ms-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground', className)}
      {...props}
    />
  );
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
