import { PropsWithChildren, ReactNode } from 'react';
import { cn } from '@/utils/shadcn-ui.util';
import { Localized, MultiColumnMenu } from 'platform-bible-utils';
import { Menu, EllipsisVertical } from 'lucide-react';
import { SelectMenuItemHandler } from './menus/platform-menubar.component';
import TabDropdownMenu from './menus/tab-dropdown-menu.component';

export type TabToolbarProps = PropsWithChildren<{
  /** The handler to use for toolbar item commands */
  onSelectProjectMenuItem: SelectMenuItemHandler;

  /** The handler to use for toolbar item commands */
  onSelectViewInfoMenuItem: SelectMenuItemHandler;

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
}>;

/**
 * Component for rendering a customizable tab toolbar.
 *
 * The toolbar includes three main areas to place children components: start, center, and end. It
 * optionally displays dropdown menus for project and view info, populated by the given menu data.
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
}: TabToolbarProps) {
  return (
    <div
      className={cn(
        'tw-box-border tw-flex tw-h-12 tw-w-full tw-flex-row tw-items-start tw-justify-between tw-overflow-clip tw-border-b tw-border-border tw-text-foreground tw-@container/toolbar *:tw-p-2',
        className,
      )}
      id={id}
    >
      {projectMenuData && (
        // div wrapper gets padding instead of the button
        <div>
          <TabDropdownMenu
            onSelectMenuItem={onSelectProjectMenuItem}
            menuData={projectMenuData}
            tabLabel="Project"
            icon={<Menu />}
            className="tw-h-8 tw-w-8"
          />
        </div>
      )}
      {startAreaChildren && (
        <div className="tw-flex tw-shrink tw-grow-[2] tw-flex-row tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-start">
          {startAreaChildren}
        </div>
      )}
      {centerAreaChildren && (
        <div className="tw-flex tw-shrink tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-center @sm:tw-grow @sm:tw-basis-auto">
          {centerAreaChildren}
        </div>
      )}
      <div className="tw-flex tw-shrink tw-grow-[2] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-end">
        {tabViewMenuData && (
          // div wrapper gets padding instead of the button
          <div>
            <TabDropdownMenu
              onSelectMenuItem={onSelectViewInfoMenuItem}
              menuData={tabViewMenuData}
              tabLabel="View Info"
              icon={<EllipsisVertical />}
              className="tw-h-8"
            />
          </div>
        )}
        {endAreaChildren}
      </div>
    </div>
  );
}

export default TabToolbar;
