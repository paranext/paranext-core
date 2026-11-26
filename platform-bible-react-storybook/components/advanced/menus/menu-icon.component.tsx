import { IconCheck } from '@tabler/icons-react';
import { isLucideIconName, LucideIcon } from '@/components/basics/lucide-icon.component';
import { cn } from '@/utils/shadcn-ui/utils';
import type { LeadingIconSlot } from './menu.util';

type MenuItemIconProps = {
  /** Uri path of the image to display. Ignored when `iconName` names a known icon. */
  icon?: string;
  /**
   * Lucide icon name to display. Wins over `icon` when both are set, unless the name is not one of
   * the known icons: then `icon` is shown, and with no `icon` the slot counts as having no icon.
   */
  iconName?: string;
  /** The label of the menu item */
  menuLabel: string;
  /** Whether the icon is leading or trailing */
  leading?: boolean;
  /**
   * For a leading icon: the slot its list reserves. An item without an icon renders an empty spacer
   * the size of that slot so its label lines up with the labels of the items that have an icon.
   */
  leadingSlot?: LeadingIconSlot;
};

function MenuItemIcon({ icon, iconName, menuLabel, leading, leadingSlot }: MenuItemIconProps) {
  const spacing = leading ? 'tw:me-2' : 'tw:ms-2';

  if (isLucideIconName(iconName)) return <LucideIcon name={iconName} className={spacing} />;

  if (!icon && leading && leadingSlot === 'icon') {
    return (
      <span
        aria-hidden="true"
        data-slot="menu-icon-spacer"
        className={cn('tw:inline-block tw:w-4 tw:shrink-0', spacing)}
      />
    );
  }

  if (!icon) return undefined;

  const alt = `${leading ? 'Leading' : 'Trailing'} icon for ${menuLabel}`;

  // An image is capped at the 16px of a named icon. A leading image also sits in a box that wide,
  // so its label lines up with the labels beside it whatever the image's own width is. The image
  // keeps its max size so it never upscales.
  if (leading)
    return (
      <span
        data-slot="menu-icon-image-box"
        className={cn(
          'tw:inline-flex tw:w-4 tw:shrink-0 tw:items-center tw:justify-center',
          spacing,
        )}
      >
        <img className="tw:max-h-4 tw:max-w-4" src={icon} alt={alt} />
      </span>
    );

  return <img className={cn('tw:max-h-4 tw:max-w-4', spacing)} src={icon} alt={alt} />;
}

/**
 * The check of a checkbox menu item. It sits after the leading icon slot, where the label would
 * otherwise begin, so the item keeps its own icon. An unchecked item renders the slot empty, so its
 * label starts where a checked item's does. The slot is narrower than an icon (a 12px check, 4px
 * before the label) to keep checkable labels close to the others. The check state reaches assistive
 * technology through the item's `aria-checked`, so the mark itself is decorative.
 *
 * Render it in place of the primitive's own indicator, which the item hides.
 */
export function MenuCheckSlot({ checked }: { checked: boolean }) {
  return (
    <span
      aria-hidden
      data-slot="menu-check-slot"
      // The row's 6px gap follows this slot; the negative margin trims it to 4px
      className="tw:-me-0.5 tw:inline-flex tw:w-3 tw:shrink-0 tw:items-center tw:justify-center"
    >
      {checked && <IconCheck className="tw:size-3" />}
    </span>
  );
}

export default MenuItemIcon;
