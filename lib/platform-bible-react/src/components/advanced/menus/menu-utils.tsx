import { cn } from '@/utils/shadcn-ui.util';
import { GroupsInMultiColumnMenu, Localized } from 'platform-bible-utils';

export function getSubMenuKeyForId(
  groups: Localized<GroupsInMultiColumnMenu>,
  id: string,
): string | undefined {
  return Object.entries(groups).find(
    ([, value]) => 'menuItem' in value && value.menuItem === id,
  )?.[0];
}

export function getIcon(icon: string | undefined, menuLabel: string, leading: boolean) {
  return icon ? (
    <img
      className={cn('tw-max-h-5 tw-max-w-5', leading ? 'tw-mr-2' : 'tw-ml-2')}
      src={icon}
      alt={`${leading ? 'Leading' : 'Trailing'} icon for ${menuLabel}`}
    />
  ) : undefined;
}
