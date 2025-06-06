import { PropsWithChildren, ReactNode } from 'react';
import { cn } from '@/utils/shadcn-ui.util';
import { Localized, MultiColumnMenu } from 'platform-bible-utils';
import { Menu, EllipsisVertical } from 'lucide-react';
import { CommandHandler } from './menus/platform-menubar.component';
import TabDropdownMenu from './menus/tab-dropdown-menu.component';

export type TabToolbarProps = PropsWithChildren<{
  /** The handler to use for toolbar item commands */
  projectMenuCommandHandler: CommandHandler;

  /** The handler to use for toolbar item commands */
  viewInfoMenuCommandHandler: CommandHandler;

  /** Menu data that is used to populate the Menubar component for the project menu. */
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

  /**
   * Variant of the tab toolbar. The menuButton option displays just the project menu as a floating
   * action button that scrolls with the screen.
   */
  tabToolbarVariant?: 'default' | 'menuButton';

  /** Icon that will be displayed on the Menu Button. Defaults to the hamburger menu icon. */
  menuButtonIcon?: ReactNode;
}>;

/**
 * Conditionally render children in start and middle areas of the toolbar based on whether the whole
 * toolbar should be showing or whether just the project menu button should be showing.
 *
 * @param tabToolbarVariant Variant of the tab toolbar. The menuButton option displays just the
 *   project menu as a floating action button that scrolls with the screen.
 * @param className Tailwind CSS classes that should be applied to the container of the children.
 * @param areaChildren Toolbar children to be put in this area of the the toolbar.
 * @returns Nothing for the menuButton variant, otherwise a styled toolbar container with children.
 */
function ToolbarChildren(
  tabToolbarVariant: TabToolbarProps['tabToolbarVariant'],
  className: string,
  areaChildren: ReactNode,
) {
  if (tabToolbarVariant === 'menuButton') return;
  return <div className={className}>{areaChildren}</div>;
}

/**
 * Conditionally render view menu (if it has menu item(s)) and end area children at the end of the
 * toolbar based on whether the whole toolbar should be showing or whether just the project menu
 * button should be showing.
 *
 * @param tabToolbarVariant
 * @param className
 * @param endAreaChildren
 * @param tabViewMenuData
 * @param viewInfoMenuCommandHandler
 * @returns
 */
function ToolbarEnd(
  tabToolbarVariant: TabToolbarProps['tabToolbarVariant'],
  endAreaChildren: ReactNode,
  tabViewMenuData: Localized<MultiColumnMenu> | undefined,
  viewInfoMenuCommandHandler: CommandHandler,
) {
  if (tabToolbarVariant === 'menuButton') return;
  return (
    <div className="tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-end">
      {tabViewMenuData && (
        <TabDropdownMenu
          commandHandler={viewInfoMenuCommandHandler}
          menuData={tabViewMenuData}
          tabLabel="View Info"
          icon={<EllipsisVertical />}
          className="tw-h-full"
        />
      )}
      {endAreaChildren}
    </div>
  );
}

export function TabToolbar({
  projectMenuCommandHandler,
  viewInfoMenuCommandHandler,
  projectMenuData,
  tabViewMenuData,
  id,
  className,
  startAreaChildren,
  centerAreaChildren,
  endAreaChildren,
  tabToolbarVariant,
  menuButtonIcon,
}: TabToolbarProps) {
  return (
    <div
      className={cn(
        `tw-sticky tw-top-0 tw-box-border tw-flex tw-h-14 tw-flex-row tw-items-center tw-justify-between tw-gap-2 tw-overflow-clip tw-px-4 tw-py-2 tw-text-foreground tw-@container/toolbar ${tabToolbarVariant === 'menuButton' ? 'tw-pointer-events-none' : 'tw-w-full tw-border tw-bg-background'}`,
        className,
      )}
      id={id}
    >
      {projectMenuData && (
        <TabDropdownMenu
          commandHandler={projectMenuCommandHandler}
          menuData={projectMenuData}
          tabLabel="Project"
          icon={menuButtonIcon ?? <Menu />}
          className={
            tabToolbarVariant === 'menuButton' ? 'tw-pointer-events-auto tw-shadow-lg' : ''
          }
          buttonVariant={tabToolbarVariant === 'menuButton' ? 'outline' : 'ghost'}
        />
      )}
      {ToolbarChildren(
        tabToolbarVariant,
        'tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-start',
        startAreaChildren,
      )}
      {ToolbarChildren(
        tabToolbarVariant,
        'tw-flex tw-h-full tw-shrink tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-center @sm:tw-grow @sm:tw-basis-auto',
        centerAreaChildren,
      )}
      {ToolbarEnd(tabToolbarVariant, endAreaChildren, tabViewMenuData, viewInfoMenuCommandHandler)}
    </div>
  );
}

export default TabToolbar;
