import { cn } from '@/utils/shadcn-ui.util';

type MenuItemIconProps = {
  /** The icon to display */
  icon: string;
  /** The label of the menu item */
  menuLabel: string;
  /** Whether the icon is leading or trailing */
  leading?: boolean;
};

function MenuItemIcon({ icon, menuLabel, leading }: MenuItemIconProps) {
  return icon ? (
    <img
      className={cn('tw-max-h-5 tw-max-w-5', leading ? 'tw-me-2' : 'tw-ms-2')}
      src={icon}
      alt={`${leading ? 'Leading' : 'Trailing'} icon for ${menuLabel}`}
    />
  ) : undefined;
}

export default MenuItemIcon;
