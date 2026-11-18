import {
  getLocalizeKeyForScrollGroupId,
  LanguageStrings,
  ScrollGroupId,
} from 'platform-bible-utils';
import { DEFAULT_SCROLL_GROUP_LOCALIZED_STRINGS } from 'platform-bible-utils/experimental';
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

/** Trigger text start (10px padding + 1px border) minus an option's text start (28px), in pixels */
const SELECT_ITEM_TO_TRIGGER_TEXT_OFFSET = 11 - 28;

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

  /** When true, the selector is disabled */
  disabled?: boolean;
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
  disabled,
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
      disabled={disabled}
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
        // Pulls the list back toward the start edge by the difference between an option's start
        // padding (`tw:ps-7`, 28px, which keeps room for its check) and the trigger's (`tw:ps-2.5`
        // plus its 1px border), so the option names sit directly under the selected name
        alignOffset={SELECT_ITEM_TO_TRIGGER_TEXT_OFFSET}
        // Need to get over the floating web view z-index 200. The min-width replaces the list's
        // default 144px floor, which is far wider than these short names: the list is as wide as
        // the trigger, less the offset that pulls it back, so it ends where the trigger ends.
        style={{
          zIndex: Z_INDEX_ABOVE_DOCK,
          minWidth: `calc(var(--radix-select-trigger-width) - ${SELECT_ITEM_TO_TRIGGER_TEXT_OFFSET}px)`,
        }}
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
