import { ReactNode } from 'react';
import { Localized, MultiColumnMenu } from 'platform-bible-utils';
import { Menu, EllipsisVertical } from 'lucide-react';
import TabDropdownMenu from '../menus/tab-dropdown-menu.component';
import { SelectMenuItemHandler } from '../menus/platform-menubar.component';
import { TabToolbarCommonProps, TabToolbarContainer } from './tab-toolbar-container.component';

export type TabToolbarProps = TabToolbarCommonProps & {
  /**
   * The handler to use for toolbar item commands related to the tab view menu. Here is a basic
   * example of how to create this from the hello-rock3 extension:
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
  onSelectViewInfoMenuItem: SelectMenuItemHandler;

  /** Menu data that is used to populate the Menubar component for the view info menu */
  tabViewMenuData?: Localized<MultiColumnMenu>;

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

  /**
   * Overrides the shrink step this toolbar would otherwise measure from its own width, and
   * publishes it to descendants. Higher means narrower.
   *
   * For stories and tests: measuring needs a layout engine, which jsdom does not have. In the app,
   * leave it unset and let the toolbar measure itself.
   */
  shrinkStep?: number;
};

/**
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
  shrinkStep,
}: TabToolbarProps) {
  return (
    <TabToolbarContainer
      className={`tw:w-full tw:border-b ${className}`}
      id={id}
      shrinkStep={shrinkStep}
    >
      {projectMenuData && (
        <TabDropdownMenu
          onSelectMenuItem={onSelectProjectMenuItem}
          menuData={projectMenuData}
          tabLabel="Project"
          icon={menuButtonIcon ?? <Menu />}
          buttonVariant="ghost"
        />
      )}
      {/* Absorbing zone. `tw:min-w-0` is what lets the flex algorithm shrink this below its content
          width — without it a flex item's `min-width: auto` pins it at min-content, and the space
          is taken out of the end zone instead, which the container then clips. That is the
          "toolbar items silently disappear" bug. `tw:overflow-clip` stays as the backstop for
          consumers whose children have no shorter form of their own. */}
      {startAreaChildren && (
        <div className="tw:flex tw:min-w-0 tw:shrink tw:grow-[10] tw:flex-row tw:flex-nowrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip">
          {startAreaChildren}
        </div>
      )}
      {centerAreaChildren && (
        <div className="tw:flex tw:min-w-0 tw:shrink tw:grow-[1] tw:basis-0 tw:flex-row tw:flex-nowrap tw:items-start tw:justify-center tw:gap-x-1 tw:gap-y-2 tw:overflow-clip tw:@sm:basis-auto">
          {centerAreaChildren}
        </div>
      )}
      {/* Rigid zone: `tw:shrink-0` and deliberately NOT `tw:min-w-0`. This holds the view-info menu
          and small icon buttons, none of which have a shorter form to fall back to, so shrinking
          must flow to the start and center zones instead. `tw:grow-[1]` is kept — grow and shrink
          are independent, and dropping it would change how leftover space is split at wide widths
          and visibly shift the center zone. */}
      <div className="tw:flex tw:shrink-0 tw:grow-[1] tw:flex-row-reverse tw:flex-nowrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip">
        {tabViewMenuData && (
          <TabDropdownMenu
            onSelectMenuItem={onSelectViewInfoMenuItem}
            menuData={tabViewMenuData}
            tabLabel="View Info"
            icon={<EllipsisVertical />}
            className="tw:h-full"
          />
        )}
        {endAreaChildren}
      </div>
    </TabToolbarContainer>
  );
}

export default TabToolbar;
