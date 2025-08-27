import TabDropdownMenu from '../menus/tab-dropdown-menu.component';
import { TabToolbarCommonProps, TabToolbarContainer } from './tab-toolbar-container.component';

/**
 * Renders a TabDropdownMenu with a trigger button that looks like the menuButtonIcon or like the
 * default of three stacked horizontal lines (aka the hamburger). The menu "floats" over the content
 * so it is always visible. When clicked, it displays a dropdown menu with the projectMenuData.
 */
export function TabFloatingMenu({
  onSelectProjectMenuItem,
  projectMenuData,
  id,
  className,
  menuButtonIcon,
}: TabToolbarCommonProps) {
  return (
    <TabToolbarContainer className="tw-pointer-events-none" id={id}>
      {projectMenuData && (
        <TabDropdownMenu
          onSelectMenuItem={onSelectProjectMenuItem}
          menuData={projectMenuData}
          tabLabel="Project"
          icon={menuButtonIcon}
          className={`tw-pointer-events-auto tw-shadow-lg ${className}`}
          buttonVariant="outline"
        />
      )}
    </TabToolbarContainer>
  );
}

export default TabFloatingMenu;
