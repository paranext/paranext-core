import { PropsWithChildren, ReactNode } from 'react';
import { cn } from '@/utils/shadcn-ui.util';
import { Localized, MultiColumnMenu } from 'platform-bible-utils';
import { AlignJustify, EllipsisVertical } from 'lucide-react';
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
        'tw-box-border tw-flex tw-w-full tw-flex-row tw-items-center tw-justify-between tw-gap-2 tw-overflow-hidden tw-border tw-px-4 tw-py-2 tw-text-foreground tw-h-12 tw-content-start',
        className,
      )}
      id={id}
    >
      <div className="tw-flex-shrink-0">
        {!projectMenuData ? (
          <div>{}</div>
        ) : (
          <TabDropdownMenu
            commandHandler={projectMenuCommandHandler}
            menuData={projectMenuData}
            tabLabel="Project"
            icon={<AlignJustify />}
            className="tw-align-middle"
          />
        )}
      </div>
      <div className="tw-h-full xs:tw-gap-0.5 tw-flex tw-min-w-0 tw-flex-shrink tw-flex-row tw-items-start tw-justify-start tw-gap-2 tw-overflow-hidden sm:tw-gap-1 tw-flex-wrap *:min-width:fit-content ">
        {startAreaChildren}
      </div>
      <div className="tw-h-full xs:tw-gap-0.5 tw-flex tw-min-w-0 tw-flex-shrink tw-flex-grow tw-flex-row tw-items-start tw-justify-center tw-gap-2 tw-overflow-hidden sm:tw-gap-1 tw-flex-wrap *:min-width:fit-content">
        {centerAreaChildren}
      </div>
      <div className="tw-h-full xs:tw-gap-0.5 tw-flex tw-min-w-0 tw-flex-shrink tw-flex-row tw-flex-wrap *:min-width:fit-content tw-items-start tw-justify-end tw-gap-2 tw-overflow-hidden  sm:tw-gap-1">
        {endAreaChildren}
      </div>
      <div className="tw-flex-shrink-0">
        {tabViewMenuData && (
          <TabDropdownMenu
            commandHandler={viewInfoMenuCommandHandler}
            menuData={tabViewMenuData}
            tabLabel="View Info"
            icon={<EllipsisVertical />}
          />
        )}
      </div>
    </div>
  );
}

export default TabToolbar;
