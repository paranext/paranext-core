'use client';

import React from 'react';
import { Command as CommandPrimitive } from 'cmdk';

import { cn } from '@/utils/shadcn-ui/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn-ui/dialog';
import { InputGroup, InputGroupAddon } from '@/components/shadcn-ui/input-group';
import { IconSearch, IconCheck } from '@tabler/icons-react';
// CUSTOM: Added readDirection import for RTL support on CommandInput
import { Direction, readDirection } from '@/utils/dir-helper.util';

/**
 * Command menu for React. These components are built on cmdk and styled with Shadcn UI.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/command}
 * @see cmdk Documentation: {@link https://cmdk.paco.me/}
 */
function Command({ className, ...props }: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        'pr-twp tw:flex tw:size-full tw:flex-col tw:overflow-hidden tw:rounded-xl! tw:bg-popover tw:p-1 tw:text-popover-foreground',
        className,
      )}
      {...props}
    />
  );
}

/**
 * Props for {@link CommandDialog}.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/command}
 * @see cmdk Documentation: {@link https://cmdk.paco.me/}
 */
// CUSTOM: Added CommandDialogProps interface to document the dialog-specific props
interface CommandDialogProps extends React.ComponentProps<typeof Dialog> {
  title?: string;
  description?: string;
  className?: string;
  showCloseButton?: boolean;
}

/**
 * Dialog wrapper for the Command component, providing a modal command palette.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/command}
 * @see cmdk Documentation: {@link https://cmdk.paco.me/}
 */
function CommandDialog({
  title = 'Command Palette',
  description = 'Search for a command to run...',
  children,
  className,
  showCloseButton = false,
  ...props
}: CommandDialogProps) {
  return (
    <Dialog {...props}>
      <DialogHeader className="tw:sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        className={cn(
          'tw:top-1/3 tw:translate-y-0 tw:overflow-hidden tw:rounded-xl! tw:p-0',
          className,
        )}
        showCloseButton={showCloseButton}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}

/** @inheritdoc Command */
function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  // CUSTOM: Added readDirection for RTL support — sets dir on the wrapper so icon placement is mirrored
  const dir: Direction = readDirection();
  return (
    // CUSTOM: Added dir prop for RTL support
    <div data-slot="command-input-wrapper" className="tw:p-1 tw:pb-0" dir={dir}>
      <InputGroup className="tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!">
        <CommandPrimitive.Input
          data-slot="command-input"
          className={cn(
            'tw:w-full tw:text-sm tw:outline-hidden tw:disabled:cursor-not-allowed tw:disabled:opacity-50',
            className,
          )}
          {...props}
        />
        <InputGroupAddon>
          <IconSearch className="tw:size-4 tw:shrink-0 tw:opacity-50" />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}

/** @inheritdoc Command */
function CommandList({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        'pr-twp tw:no-scrollbar tw:max-h-72 tw:scroll-py-1 tw:overflow-x-hidden tw:overflow-y-auto tw:outline-none',
        className,
      )}
      {...props}
    />
  );
}

/** @inheritdoc Command */
function CommandEmpty({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className={cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        'pr-twp tw:py-6 tw:text-center tw:text-sm',
        className,
      )}
      {...props}
    />
  );
}

/** @inheritdoc Command */
function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        'pr-twp tw:overflow-hidden tw:p-1 tw:text-foreground tw:**:[[cmdk-group-heading]]:px-2 tw:**:[[cmdk-group-heading]]:py-1.5 tw:**:[[cmdk-group-heading]]:text-xs tw:**:[[cmdk-group-heading]]:font-medium tw:**:[[cmdk-group-heading]]:text-muted-foreground',
        className,
      )}
      {...props}
    />
  );
}

/** @inheritdoc Command */
function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        'pr-twp tw:-mx-1 tw:h-px tw:bg-border',
        className,
      )}
      {...props}
    />
  );
}

/** @inheritdoc Command */
function CommandItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        'pr-twp tw:group/command-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-2 tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:in-data-[slot=dialog-content]:rounded-lg! tw:data-[disabled=true]:pointer-events-none tw:data-[disabled=true]:opacity-50 tw:data-selected:bg-muted tw:data-selected:text-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-selected:*:[svg]:text-foreground',
        className,
      )}
      {...props}
    >
      {children}
      <IconCheck className="tw:ms-auto tw:opacity-0 tw:group-has-data-[slot=command-shortcut]/command-item:hidden tw:group-data-[checked=true]/command-item:opacity-100" />
    </CommandPrimitive.Item>
  );
}

/** @inheritdoc Command */
function CommandShortcut({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; tw:ms-auto uses logical margin for RTL support
        'pr-twp tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground tw:group-data-selected/command-item:text-foreground',
        className,
      )}
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
export type { CommandDialogProps };
