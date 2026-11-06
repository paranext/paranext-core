import { cn } from '@/utils/shadcn-ui/utils';
import { isLucideIconName, LUCIDE_ICON_NAMES, LUCIDE_ICONS_BY_NAME } from './lucide-icons.util';

export { isLucideIconName, LUCIDE_ICON_NAMES };

/** @experimental This export is unstable and may change shape or disappear without notice */
export type LucideIconProps = {
  /**
   * Lucide icon name in kebab-case, e.g. `refresh-cw`. Must be one of {@link LUCIDE_ICON_NAMES}.
   *
   * @experimental This field is unstable and may change or disappear without notice
   */
  name: string;
  /**
   * Extra classes for the svg, appended to the default 16px size
   *
   * @experimental This field is unstable and may change or disappear without notice
   */
  className?: string;
};

/**
 * Renders a lucide icon by name. The svg strokes with `currentColor`, so it follows the text colour
 * of its surroundings (theme, hover, selected and disabled states). Renders nothing for a name that
 * is not in {@link LUCIDE_ICON_NAMES}.
 *
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export function LucideIcon({ name, className }: LucideIconProps) {
  const Icon = isLucideIconName(name) ? LUCIDE_ICONS_BY_NAME[name] : undefined;
  if (!Icon) return undefined;
  return <Icon aria-hidden="true" className={cn('tw:h-4 tw:w-4 tw:shrink-0', className)} />;
}

export default LucideIcon;
