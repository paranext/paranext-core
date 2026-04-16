import React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';

import { cn } from '@/utils/shadcn-ui/utils';

/**
 * The Avatar component displays a user's profile picture or initials. The component is built and
 * styled by Shadcn UI. See Shadcn UI Documentation https://ui.shadcn.com/docs/components/avatar
 */
function Avatar({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & {
  ref?: React.Ref<React.ComponentRef<typeof AvatarPrimitive.Root>>;
}) {
  return (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(
        'pr-twp tw:relative tw:flex tw:h-10 tw:w-10 tw:shrink-0 tw:overflow-hidden tw:rounded-full',
        className,
      )}
      {...props}
    />
  );
}

/** @inheritdoc Avatar */
function AvatarImage({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> & {
  ref?: React.Ref<React.ComponentRef<typeof AvatarPrimitive.Image>>;
}) {
  return (
    <AvatarPrimitive.Image
      ref={ref}
      className={cn('pr-twp tw:aspect-square tw:h-full tw:w-full', className)}
      {...props}
    />
  );
}

/** @inheritdoc Avatar */
function AvatarFallback({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> & {
  ref?: React.Ref<React.ComponentRef<typeof AvatarPrimitive.Fallback>>;
}) {
  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn(
        'pr-twp tw:flex tw:h-full tw:w-full tw:items-center tw:justify-center tw:rounded-full tw:bg-muted',
        className,
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };
