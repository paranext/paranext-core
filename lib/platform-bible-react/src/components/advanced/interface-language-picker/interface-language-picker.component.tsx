import { useMemo } from 'react';
import { LocalizedStringValue } from 'platform-bible-utils';
import { cn } from '@/utils/shadcn-ui/utils';
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '../../shadcn-ui/command';
import { LanguageInfo } from '../ui-language-selector.component';

/**
 * Immutable array of localization keys this component uses. Pass into `useLocalizedStrings` and
 * feed the result to the `localizedStrings` prop.
 */
export const INTERFACE_LANGUAGE_PICKER_STRING_KEYS = Object.freeze([
  '%firstRun_language_search_placeholder%',
  '%firstRun_language_noResults%',
  '%firstRun_language_selected%',
] as const);

export type InterfaceLanguagePickerLocalizedStrings = {
  [K in (typeof INTERFACE_LANGUAGE_PICKER_STRING_KEYS)[number]]?: LocalizedStringValue;
};

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
 */
export function InterfaceLanguagePicker({
  languages,
  value,
  onChange,
  localizedStrings,
  className,
  id,
}: InterfaceLanguagePickerProps) {
  const entries = useMemo(() => sortLanguages(Object.entries(languages)), [languages]);
  const showSearch = entries.length > 1;
  const searchPlaceholder = localizedStrings['%firstRun_language_search_placeholder%'] ?? '';
  const noResults = localizedStrings['%firstRun_language_noResults%'] ?? '';
  const selectedLabel = localizedStrings['%firstRun_language_selected%'] ?? '';

  return (
    <Command id={id} className={cn('pr-twp', className)}>
      {/* aria-label mirrors the placeholder so the combobox keeps an accessible name after typing
          (cmdk's CommandInput has no name of its own). */}
      {showSearch && (
        <CommandInput placeholder={searchPlaceholder} aria-label={searchPlaceholder} />
      )}
      <CommandList>
        <CommandEmpty>{noResults}</CommandEmpty>
        {entries.map(([tag, info]) => {
          const isSelected = tag === value;
          return (
            <CommandItem
              key={tag}
              value={tag}
              keywords={[
                info.autonym,
                ...Object.values(info.uiNames ?? {}),
                ...(info.otherNames ?? []),
              ]}
              // aria-current (not aria-selected, which cmdk uses for the keyboard-highlighted item).
              // `data-checked` drives the check mark the vendored CommandItem ALREADY renders
              // (command.tsx appends an IconCheck gated on `group-data-[checked=true]`), so we don't
              // render our own icon (that would double it up). We still add a visually-hidden label
              // so screen readers announce the selection.
              aria-current={isSelected ? 'true' : undefined}
              data-checked={isSelected ? 'true' : undefined}
              onSelect={() => onChange(tag)}
            >
              <span>{info.autonym}</span>
              {isSelected && <span className="tw:sr-only">{selectedLabel}</span>}
            </CommandItem>
          );
        })}
      </CommandList>
    </Command>
  );
}

export default InterfaceLanguagePicker;
