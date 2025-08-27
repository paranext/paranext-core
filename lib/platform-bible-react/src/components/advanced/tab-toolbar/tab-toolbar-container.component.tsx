import React, { PropsWithChildren } from 'react';

export type TabToolbarContainerProps = PropsWithChildren<{
  /** Optional unique identifier */
  id?: string;
  /** Additional css classes to help with unique styling of the extensible toolbar */
  className?: string;
}>;

/** Wrapper that allows consistent styling for both TabToolbar and TabFloatingMenuButton. */
export const TabToolbarContainer = React.forwardRef<HTMLDivElement, TabToolbarContainerProps>(
  ({ id, className, children }, ref) => (
    <div
      ref={ref}
      className={`tw-sticky tw-top-0 tw-box-border tw-flex tw-h-14 tw-flex-row tw-items-center tw-justify-between tw-gap-2 tw-overflow-clip tw-px-4 tw-py-2 tw-text-foreground tw-@container/toolbar ${className}`}
      id={id}
    >
      {children}
    </div>
  ),
);

export default TabToolbarContainer;
