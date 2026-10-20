import { LucideIcon } from '@/components/basics/lucide-icon.component';
import { cn } from '@/utils/shadcn-ui/utils';
import type { LeadingIconSlot } from './menu.util';

type MenuItemIconProps = {
  /** Uri path of the image to display. Ignored when `iconName` is set. */
  icon?: string;
  /** Lucide icon name to display. Wins over `icon` when both are set. */
  iconName?: string;
  /** The label of the menu item */
  menuLabel: string;
  /** Whether the icon is leading or trailing */
  leading?: boolean;
  /**
   * For a leading icon: the slot its list reserves. An item without an icon renders an empty spacer
   * of that size so its label lines up with the labels of the items that have an icon.
   */
  leadingSlot?: LeadingIconSlot;
};

function MenuItemIcon({ icon, iconName, menuLabel, leading, leadingSlot }: MenuItemIconProps) {
  const spacing = leading ? 'tw:me-2' : 'tw:ms-2';

  if (iconName) return <LucideIcon name={iconName} className={spacing} />;

  if (!icon && leading && leadingSlot && leadingSlot !== 'none') {
    return (
      <span
        aria-hidden="true"
        data-slot="menu-icon-spacer"
        className={cn(
          'tw:inline-block tw:shrink-0',
          leadingSlot === 'icon' ? 'tw:w-4' : 'tw:w-5',
          spacing,
        )}
      />
    );
  }

  return icon ? (
    <img
      className={cn('tw:max-h-5 tw:max-w-5', spacing)}
      src={icon}
      alt={`${leading ? 'Leading' : 'Trailing'} icon for ${menuLabel}`}
    />
  ) : undefined;
}

export default MenuItemIcon;
