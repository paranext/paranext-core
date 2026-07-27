import { useMemo, useState } from 'react';
import { LocalizedStringValue } from 'platform-bible-utils';
import { IconSearch } from '@tabler/icons-react';
import { cn } from '@/utils/shadcn-ui/utils';
import { InputGroup, InputGroupAddon } from '@/components/shadcn-ui/input-group';
import { Command, CommandEmpty, CommandItem, CommandList } from '../../shadcn-ui/command';
import { LanguageInfo } from '../ui-language-selector.component';

/**
 * Immutable array of localization keys this component uses. Pass into `useLocalizedStrings` and
 * feed the result to the `localizedStrings` prop.
 *
 * @experimental
 */
export const INTERFACE_LANGUAGE_PICKER_STRING_KEYS = Object.freeze([
  '%firstRun_language_search_placeholder%',
  '%firstRun_language_noResults%',
  '%firstRun_language_selected%',
] as const);

/** @experimental */
export type InterfaceLanguagePickerLocalizedStrings = {
  [K in (typeof INTERFACE_LANGUAGE_PICKER_STRING_KEYS)[number]]?: LocalizedStringValue;
};

/** @experimental */
export type InterfaceLanguagePickerProps = {
  /** Languages to offer, keyed by BCP-47 tag. Displayed by autonym (native script). */
  languages: Record<string, LanguageInfo>;
  /** Currently selected BCP-47 tag. */
  value: string;
  /** Called with the chosen BCP-47 tag. */
  onChange: (tag: string) => void;
  /** Localized strings (search placeholder, no-results, selected label). */
  localizedStrings: InterfaceLanguagePickerLocalizedStrings;
  className?: string;
  id?: string;
};

/** English first, then by autonym (locale-aware). */
function sortLanguages(entries: [string, LanguageInfo][]): [string, LanguageInfo][] {
  return [...entries].sort(([aTag, aInfo], [bTag, bInfo]) => {
    if (aTag === 'en' && bTag !== 'en') return -1;
    if (bTag === 'en' && aTag !== 'en') return 1;
    return aInfo.autonym.localeCompare(bInfo.autonym);
  });
}

/**
 * Searchable, scrollable list for choosing the interface language. Each option is shown by its
 * autonym (native script); search matches the autonym, names in other UI languages, and other known
 * names (the latter for matching only — never displayed). Scales to hundreds of languages.
 *
 * @experimental
 */
export function InterfaceLanguagePicker({
  languages,
  value,
  onChange,
  localizedStrings,
  className,
  id,
}: InterfaceLanguagePickerProps) {
  // Using a plain <input> instead of cmdk's CommandPrimitive.Input entirely decouples the
  // search box from cmdk's internal store. cmdk v1 updates CommandPrimitive.Input's value
  // after item selection (whether via onValueChange or store sync), contaminating the search
  // and triggering our visibleEntries filter. A plain <input> with React-controlled
  // value={search} is immune to cmdk touching it; keydown events still bubble up to the
  // Command root div so arrow-key / Enter navigation continues to work.
  const [search, setSearch] = useState('');

  // Precompute the search keywords per language here so they aren't rebuilt on every render.
  const entries = useMemo(
    () =>
      sortLanguages(Object.entries(languages)).map(([tag, info]) => ({
        tag,
        info,
        keywords: [info.autonym, ...Object.values(info.uiNames ?? {}), ...(info.otherNames ?? [])],
      })),
    [languages],
  );

  const visibleEntries = useMemo(() => {
    if (!search) return entries;
    const lower = search.toLowerCase();
    return entries.filter(({ keywords }) => keywords.some((k) => k.toLowerCase().includes(lower)));
  }, [entries, search]);

  const showSearch = entries.length > 1;
  const searchPlaceholder = localizedStrings['%firstRun_language_search_placeholder%'] ?? '';
  const noResults = localizedStrings['%firstRun_language_noResults%'] ?? '';
  const selectedLabel = localizedStrings['%firstRun_language_selected%'] ?? '';

  return (
    <Command id={id} className={cn('pr-twp', className)} shouldFilter={false}>
      {showSearch && (
        // Plain <input> (not CommandPrimitive.Input) so cmdk cannot update this field after
        // item selection. Arrow-key and Enter events from here bubble to the Command root div
        // where cmdk's keydown handler picks them up for list navigation.
        <div data-slot="command-input-wrapper" className="tw:p-1 tw:pb-0">
          <InputGroup className="tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!">
            <input
              data-slot="command-input"
              type="text"
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
              className="tw:w-full tw:text-sm tw:outline-hidden tw:disabled:cursor-not-allowed tw:disabled:opacity-50"
            />
            <InputGroupAddon>
              <IconSearch className="tw:size-4 tw:shrink-0 tw:opacity-50" />
            </InputGroupAddon>
          </InputGroup>
        </div>
      )}
      <CommandList>
        <CommandEmpty>{noResults}</CommandEmpty>
        {visibleEntries.map(({ tag, info, keywords }) => {
          const isSelected = tag === value;
          return (
            <CommandItem
              key={tag}
              value={tag}
              keywords={keywords}
              // aria-current (not aria-selected, which cmdk uses for the keyboard-highlighted item).
              // `data-checked` drives the check mark the vendored CommandItem ALREADY renders
              // (command.tsx appends an IconCheck gated on `group-data-[checked=true]`), so we don't
              // render our own icon (that would double it up). We still add a visually-hidden label
              // so screen readers announce the selection.
              aria-current={isSelected ? 'true' : undefined}
              data-checked={isSelected ? 'true' : undefined}
              onSelect={() => onChange(tag)}
            >
              {/* dir="auto" so each autonym lays out per its own script (e.g. RTL Arabic, or the
                  parentheses in 中文（简体）) regardless of the wizard's ambient direction. */}
              <span dir="auto">{info.autonym}</span>
              {isSelected && <span className="tw:sr-only">{selectedLabel}</span>}
            </CommandItem>
          );
        })}
      </CommandList>
    </Command>
  );
}

export default InterfaceLanguagePicker;
