import {
  getLocalizeKeyForScrollGroupId,
  LanguageStrings,
  ScrollGroupId,
} from 'platform-bible-utils';
import { DEFAULT_SCROLL_GROUP_LOCALIZED_STRINGS } from 'platform-bible-utils/internal';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn-ui/select';
import { Direction, readDirection } from '@/utils/dir-helper.util';
import { cn } from '@/utils/shadcn-ui/utils';
import { Z_INDEX_ABOVE_DOCK } from '@/components/z-index';

export type ScrollGroupSelectorProps = {
  /**
   * List of scroll group ids to show to the user. Either a `ScrollGroupId` or `undefined` for no
   * scroll group
   */
  availableScrollGroupIds: (ScrollGroupId | undefined)[];
  /** Currently selected scroll group id. `undefined` for no scroll group */
  scrollGroupId: ScrollGroupId | undefined;
  /** Callback function run when the user tries to change the scroll group id */
  onChangeScrollGroupId: (newScrollGroupId: ScrollGroupId | undefined) => void;
  /**
   * Localized strings to use for displaying scroll group ids. Must be an object whose keys are
   * `getLocalizeKeyForScrollGroupId(scrollGroupId)` for all scroll group ids (and `undefined` if
   * included) in {@link ScrollGroupSelectorProps.availableScrollGroupIds} and whose values are the
   * localized strings to use for those scroll group ids.
   *
   * Defaults to English localizations of English alphabet for scroll groups 0-25 (e.g. 0 is A) and
   * Ø for `undefined`. Will fill in any that are not provided with these English localizations.
   * Also, if any values match the keys, the English localization will be used. This is useful in
   * case you want to pass in a temporary version of the localized strings while your localized
   * strings load.
   *
   * @example
   *
   * ```typescript
   * const myScrollGroupIdLocalizedStrings = {
   *   [getLocalizeKeyForScrollGroupId('undefined')]: 'Ø',
   *   [getLocalizeKeyForScrollGroupId(0)]: 'A',
   *   [getLocalizeKeyForScrollGroupId(1)]: 'B',
   *   [getLocalizeKeyForScrollGroupId(2)]: 'C',
   *   [getLocalizeKeyForScrollGroupId(3)]: 'D',
   *   [getLocalizeKeyForScrollGroupId(4)]: 'E',
   * };
   * ```
   *
   * @example
   *
   * ```tsx
   * const availableScrollGroupIds = [undefined, 0, 1, 2, 3, 4];
   *
   * const localizeKeys = getLocalizeKeysForScrollGroupIds();
   *
   * const [localizedStrings] = useLocalizedStrings(localizeKeys);
   *
   * ...
   *
   * <ScrollGroupSelector localizedStrings={localizedStrings} />
   * ```
   */
  localizedStrings?: LanguageStrings;

  /** Size of the scroll group dropdown button. Defaults to 'sm' */
  size?: 'default' | 'sm';

  /** Additional css classes to help with unique styling */
  className?: string;

  /** Optional id for the select element */
  id?: string;
};

/** Selector component for choosing a scroll group */
export function ScrollGroupSelector({
  availableScrollGroupIds,
  scrollGroupId,
  onChangeScrollGroupId,
  localizedStrings = {},
  size = 'sm',
  className,
  id,
}: ScrollGroupSelectorProps) {
  const localizedStringsDefaulted = {
    ...DEFAULT_SCROLL_GROUP_LOCALIZED_STRINGS,
    ...Object.fromEntries(
      Object.entries(localizedStrings).map(
        ([localizedStringKey, localizedStringValue]: [string, string]) => [
          localizedStringKey,
          localizedStringKey === localizedStringValue &&
          localizedStringKey in DEFAULT_SCROLL_GROUP_LOCALIZED_STRINGS
            ? DEFAULT_SCROLL_GROUP_LOCALIZED_STRINGS[localizedStringKey]
            : localizedStringValue,
        ],
      ),
    ),
  };

  const dir: Direction = readDirection();

  return (
    <Select
      value={`${scrollGroupId}`}
      onValueChange={(newScrollGroupString) =>
        onChangeScrollGroupId(
          newScrollGroupString === 'undefined' ? undefined : parseInt(newScrollGroupString, 10),
        )
      }
    >
      <SelectTrigger size={size} className={cn('pr-twp tw:w-auto', className)}>
        <SelectValue
          placeholder={
            localizedStringsDefaulted[getLocalizeKeyForScrollGroupId(scrollGroupId)] ??
            scrollGroupId
          }
        />
      </SelectTrigger>
      <SelectContent
        id={id}
        align={dir === 'rtl' ? 'end' : 'start'}
        // Need to get over the floating web view z-index 200
        style={{ zIndex: Z_INDEX_ABOVE_DOCK }}
      >
        {availableScrollGroupIds.map((scrollGroupOptionId) => (
          <SelectItem key={`${scrollGroupOptionId}`} value={`${scrollGroupOptionId}`}>
            {localizedStringsDefaulted[getLocalizeKeyForScrollGroupId(scrollGroupOptionId)]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default ScrollGroupSelector;
