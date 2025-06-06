import { ReactNode } from 'react';
import { Localized, MultiColumnMenu } from 'platform-bible-utils';
import TabDropdownMenu from '../menus/tab-dropdown-menu.component';
import { SelectMenuItemHandler } from '../menus/platform-menubar.component';
import TabToolbarContainer from './tab-toolbar-container.component';

export type TabFloatingMenuButtonProps = {
  /**
   * The handler to use for toolbar item commands. Here is a basic example of how to create this
   * from the hello-rock3 extension:
   *
   *     const onSelectProjectMenuItem: CommandHandler = async (command) => {
   *       // Assert the more specific type.
   *       // eslint-disable-next-line no-type-assertion/no-type-assertion
   *       const commandName = (command as MenuItemContainingCommand).command;
   *       try {
   *         // Assert the more specific type.
   *         // eslint-disable-next-line no-type-assertion/no-type-assertion
   *         await papi.commands.sendCommand(commandName as CommandNames);
   *       } catch (e) {
   *         throw new Error(
   *           `handleMenuCommand error: command: ${commandName}. ${JSON.stringify(e)}`,
   *         );
   *       }
   *     };
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

/**
 * Renders a button that looks like the menuButtonIcon or like the default of three stacked
 * horizontal lines (aka the hamburger). The button "floats" over the content so it is always
 * visible. When clicked, it displays a dropdown menu with the projectMenuData.
 */
export function TabFloatingMenuButton({
  onSelectProjectMenuItem,
  projectMenuData,
  id,
  className,
  menuButtonIcon,
}: TabFloatingMenuButtonProps) {
  return (
    <TabToolbarContainer className={`tw-pointer-events-none ${className}`} id={id}>
      {projectMenuData && (
        <TabDropdownMenu
          onSelectMenuItem={onSelectProjectMenuItem}
          menuData={projectMenuData}
          tabLabel="Project"
          icon={menuButtonIcon}
          className="tw-pointer-events-auto tw-shadow-lg"
          buttonVariant="outline"
        />
      )}
    </TabToolbarContainer>
  );
}

export default TabFloatingMenuButton;
