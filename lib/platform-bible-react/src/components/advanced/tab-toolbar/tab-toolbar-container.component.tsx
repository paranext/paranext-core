import { Localized, MultiColumnMenu } from 'platform-bible-utils';
import React, { PropsWithChildren, ReactNode } from 'react';
import { SelectMenuItemHandler } from '../menus/platform-menubar.component';

export type TabToolbarCommonProps = {
  /**
   * The handler to use for toolbar item commands related to the project menu. Here is a basic
   * example of how to create this:
   *
   * @example
   *
   * ```tsx
   * const projectMenuCommandHandler: SelectMenuItemHandler = async (selectedMenuItem) => {
   *   const commandName = selectedMenuItem.command;
   *   try {
   *     // Assert the more specific type. Assert the more specific type. The menu data should
   *     // specify a valid command name here. If not, the error will be caught.
   *     // eslint-disable-next-line no-type-assertion/no-type-assertion
   *     await papi.commands.sendCommand(commandName as CommandNames);
   *   } catch (e) {
   *     throw new Error(
   *       `handleMenuCommand error: command: ${commandName}. ${JSON.stringify(e)}`,
   *     );
   *   }
   * };
   * ```
   */
  onSelectProjectMenuItem: SelectMenuItemHandler;

  /**
   * Menu data that is used to populate the Menubar component for the project menu. In an extension,
   * the menu data comes from menus.json in the contributions folder. To access that info, use
   * useMemo to get the WebViewMenu.
   */
  projectMenuData?: Localized<MultiColumnMenu>;

  /** Optional unique identifier */
  id?: string;

  /** Additional css classes to help with unique styling of the extensible toolbar */
  className?: string;

  /** Icon that will be displayed on the Menu Button. Defaults to the hamburger menu icon. */
  menuButtonIcon?: ReactNode;
};

export type TabToolbarContainerProps = PropsWithChildren<{
  /** Optional unique identifier */
  id?: string;
  /** Additional css classes to help with unique styling of the extensible toolbar */
  className?: string;
}>;

/** Wrapper that allows consistent styling for both TabToolbar and TabFloatingMenu. */
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
