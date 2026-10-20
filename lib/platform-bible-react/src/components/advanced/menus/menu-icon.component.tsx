import { LucideIcon } from '@/components/basics/lucide-icon.component';
import { cn } from '@/utils/shadcn-ui/utils';

type MenuItemIconProps = {
  /** Uri path of the image to display. Ignored when `iconName` is set. */
  icon?: string;
  /** Lucide icon name to display. Wins over `icon` when both are set. */
  iconName?: string;
  /** The label of the menu item */
  menuLabel: string;
  /** Whether the icon is leading or trailing */
  leading?: boolean;
};

function MenuItemIcon({ icon, iconName, menuLabel, leading }: MenuItemIconProps) {
  const spacing = leading ? 'tw:me-2' : 'tw:ms-2';

  if (iconName) return <LucideIcon name={iconName} className={spacing} />;

  return icon ? (
    <img
      className={cn('tw:max-h-5 tw:max-w-5', spacing)}
      src={icon}
      alt={`${leading ? 'Leading' : 'Trailing'} icon for ${menuLabel}`}
    />
  ) : undefined;
}

export default MenuItemIcon;
