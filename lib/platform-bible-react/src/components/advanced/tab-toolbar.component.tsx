import { ReactNode } from 'react';
import { Localized, MultiColumnMenu } from 'platform-bible-utils';
import { Menu, EllipsisVertical } from 'lucide-react';
import { SelectMenuItemHandler } from './menus/platform-menubar.component';
import { TabToolbarContainer } from './tab-toolbar/tab-toolbar-container.component';
import TabDropdownMenu from './menus/tab-dropdown-menu.component';

export type TabToolbarProps = {
  /**
   * The handler to use for toolbar item commands related to the project menu. Here is a basic
   * example of how to create this from the hello-rock3 extension:
   *
   *     const projectMenuCommandHandler: CommandHandler = async (command) => {
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
   * The handler to use for toolbar item commands related to the tab view menu. Here is a basic
   * example of how to create this from the hello-rock3 extension:
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
  onSelectViewInfoMenuItem: SelectMenuItemHandler;

  /**
   * Menu data that is used to populate the Menubar component for the project menu. In an extension,
   * the menu data comes from menus.json in the contributions folder. To access that info, use
   * useMemo to get the WebViewMenu.
   */
  projectMenuData?: Localized<MultiColumnMenu>;

  /** Menu data that is used to populate the Menubar component for the view info menu */
  tabViewMenuData?: Localized<MultiColumnMenu>;

  /** Optional unique identifier */
  id?: string;

  /** Additional css classes to help with unique styling of the extensible toolbar */
  className?: string;

  /**
   * Toolbar children to be put at the start of the the toolbar after the project menu icon (left
   * side in ltr, right side in rtl). Recommended for inner navigation.
   */
  startAreaChildren?: ReactNode;

  /** Toolbar children to be put in the center area of the the toolbar. Recommended for tools. */
  centerAreaChildren?: ReactNode;

  /**
   * Toolbar children to be put at the end of the the toolbar before the tab view menu icon (right
   * side in ltr, left side in rtl). Recommended for secondary tools and view options.
   */
  endAreaChildren?: ReactNode;

  /** Icon that will be displayed on the Menu Button. Defaults to the hamburger menu icon. */
  menuButtonIcon?: ReactNode;
};

 * Toolbar that holds the project menu icon on one side followed by three different areas/categories
 * for toolbar icons followed by an optional view info menu icon. See the Tab Floating Menu Button
 * component for a menu component that takes up less screen real estate yet is always visible.
 */
export function TabToolbar({
  onSelectProjectMenuItem,
  onSelectViewInfoMenuItem,
  projectMenuData,
  tabViewMenuData,
  id,
  className,
  startAreaChildren,
  centerAreaChildren,
  endAreaChildren,
  menuButtonIcon,
}: TabToolbarProps) {
  return (
    <TabToolbarContainer className={`tw-w-full tw-border tw-bg-background ${className}`} id={id}>
      {projectMenuData && (
        <TabDropdownMenu
          onSelectMenuItem={onSelectProjectMenuItem}
          menuData={projectMenuData}
          tabLabel="Project"
          icon={menuButtonIcon ?? <Menu />}
          buttonVariant="ghost"
        />
      )}
      <div className="tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-start">
        {startAreaChildren}
      </div>
      <div className="tw-flex tw-h-full tw-shrink tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-center @sm:tw-grow @sm:tw-basis-auto">
        {centerAreaChildren}
      </div>
      <div className="tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-end">
        {tabViewMenuData && (
          <TabDropdownMenu
            onSelectMenuItem={onSelectViewInfoMenuItem}
            menuData={tabViewMenuData}
            tabLabel="View Info"
            icon={<EllipsisVertical />}
            className="tw-h-full"
          />
        )}
        {endAreaChildren}
      </div>
    </TabToolbarContainer>
  );
}

export default TabToolbar;
