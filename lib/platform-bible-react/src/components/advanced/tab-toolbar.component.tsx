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
}>;

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
}: TabToolbarProps) {
  return (
    <div
      className={cn(
        'tw-box-border tw-flex tw-h-12 tw-w-full tw-columns-5 tw-flex-row tw-content-start tw-items-center tw-justify-between tw-gap-2 tw-overflow-clip tw-border tw-px-4 tw-py-2 tw-text-foreground tw-@container/toolbar',
        className,
      )}
      id={id}
    >
      <div
        id={{ id } + 'toolbarStartArea'}
        className="tw-flex tw-h-full tw-min-w-0 tw-flex-1 tw-flex-row tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-bg-green-500 tw-@container/toolbar-start @[17rem]:tw-bg-blue-500"
      >
        {projectMenuData && (
          <TabDropdownMenu
            commandHandler={projectMenuCommandHandler}
            menuData={projectMenuData}
            tabLabel="Project"
            icon={<Menu />}
            className="tw-h-full"
          />
        )}
        {startAreaChildren}
      </div>
      <div className="*:min-width:fit-content tw-flex-0 tw-flex tw-h-full tw-flex-row tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/toolbar-center @[17rem]:tw-bg-blue-500 @sm:tw-flex-1">
        {centerAreaChildren}
      </div>
      <div className="*:min-width:fit-content tw-flex tw-h-full tw-flex-1 tw-flex-row tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/toolbar-end @[17rem]:tw-bg-blue-500">
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
    </div>
  );
}

export default TabToolbar;
