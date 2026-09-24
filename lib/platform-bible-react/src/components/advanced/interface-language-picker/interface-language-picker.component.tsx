import { useLayoutEffect, useMemo, useRef, useState } from 'react';
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

/**
 * Folds text for searching: decomposes characters and drops the Combining Diacritical Marks
 * (U+0300–U+036F), so an unaccented query (`francais`) still matches an accented name (`Français`),
 * and likewise for Greek tonos and Vietnamese tone marks. Marks outside that block, such as
 * Devanagari matras and Khmer vowel signs, survive untouched.
 *
 * The block is not specific to one script, so this also merges some letters that are distinct
 * rather than accented, such as Cyrillic `й`/`и` and `ё`/`е`. The query is folded the same way as
 * the names, so that only broadens what matches. Letters whose diacritic does not decompose (`Ø`,
 * `Ł`, `Đ`, `Æ`, `ß`) are not folded: `foroyskt` does not find `Føroyskt`.
 */
function foldForSearch(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

type LanguageEntry = {
  tag: string;
  info: LanguageInfo;
  /** Folded names this entry matches on. Never displayed. */
  keywords: string[];
};

/** Entries with at least one keyword containing the query. An empty query matches everything. */
function filterEntries(entries: LanguageEntry[], query: string): LanguageEntry[] {
  if (!query) return entries;
  const folded = foldForSearch(query);
  return entries.filter(({ keywords }) => keywords.some((keyword) => keyword.includes(folded)));
}

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

  // The row the user moved cmdk's highlight onto (arrow keys, hover, or click). Cleared whenever the
  // query changes, so a row chosen under the old query doesn't outrank the new query's matches.
  const [preferredTag, setPreferredTag] = useState<string>();

  // null is the canonical initial value for React DOM refs.
  // eslint-disable-next-line no-null/no-null
  const inputRef = useRef<HTMLInputElement>(null);
  // null is the canonical initial value for React DOM refs.
  // eslint-disable-next-line no-null/no-null
  const listRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef(new Map<string, HTMLDivElement>());
  const [listId, setListId] = useState<string>();

  // Precompute the folded search keywords per language here so they aren't rebuilt on every render.
  const entries = useMemo(
    () =>
      sortLanguages(Object.entries(languages)).map(([tag, info]) => ({
        tag,
        info,
        keywords: [
          info.autonym,
          ...Object.values(info.uiNames ?? {}),
          ...(info.otherNames ?? []),
        ].map(foldForSearch),
      })),
    [languages],
  );

  const visibleEntries = useMemo(() => filterEntries(entries, search), [entries, search]);

  // cmdk's keyboard highlight: the row Enter chooses. With `shouldFilter={false}` cmdk can't tell
  // the list changed, and a controlled cmdk value naming no rendered row highlights nothing and
  // swallows Enter. So derive it from what is rendered now, however that changed (typing, or
  // `value` / `languages` arriving after mount): the row the user moved to, else the current
  // language (so Enter without typing re-picks it), else the top match.
  const highlightedTag = useMemo(() => {
    const isVisible = (tag: string | undefined): tag is string =>
      !!tag && visibleEntries.some((entry) => entry.tag === tag);
    if (isVisible(preferredTag)) return preferredTag;
    if (isVisible(value)) return value;
    return visibleEntries[0]?.tag ?? '';
  }, [preferredTag, value, visibleEntries]);

  const showSearch = entries.length > 1;

  // cmdk overwrites the ids of its list and rows with its own, so they are read back from the DOM.
  useLayoutEffect(() => {
    setListId(listRef.current?.id);
  }, []);

  // A controlled cmdk value skips the follow-up cmdk does when it moves the highlight itself, so
  // do it here. The active descendant changes on every highlight move, so it is written straight to
  // the input rather than through state, which would render twice per keystroke. Scroll only when
  // this component moved the highlight: cmdk already scrolls for arrow keys, and deliberately never
  // scrolls the row under the pointer.
  useLayoutEffect(() => {
    const row = rowRefs.current.get(highlightedTag);
    // Absent while there is only one language; `showSearch` re-runs this when the box appears.
    const input = showSearch ? inputRef.current : undefined;
    if (input) {
      if (row) input.setAttribute('aria-activedescendant', row.id);
      else input.removeAttribute('aria-activedescendant');
    }
    if (row && highlightedTag !== preferredTag) row.scrollIntoView({ block: 'nearest' });
  }, [highlightedTag, preferredTag, showSearch]);

  const searchPlaceholder = localizedStrings['%firstRun_language_search_placeholder%'] ?? '';
  const noResults = localizedStrings['%firstRun_language_noResults%'] ?? '';
  const selectedLabel = localizedStrings['%firstRun_language_selected%'] ?? '';

  return (
    <Command
      id={id}
      className={cn('pr-twp', className)}
      shouldFilter={false}
      value={highlightedTag}
      onValueChange={setPreferredTag}
    >
      {showSearch && (
        // Plain <input> (not CommandPrimitive.Input) so cmdk cannot update this field after
        // item selection. Arrow-key and Enter events from here bubble to the Command root div
        // where cmdk's keydown handler picks them up for list navigation.
        <div data-slot="command-input-wrapper" className="tw:p-1 tw:pb-0">
          <InputGroup className="tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!">
            <input
              ref={inputRef}
              data-slot="command-input"
              type="text"
              // The list is always shown, so this is an always-expanded combobox.
              // `aria-activedescendant` is set in the layout effect above.
              role="combobox"
              aria-expanded
              aria-controls={listId}
              aria-autocomplete="list"
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              value={search}
              onChange={(e) => {
                setSearch(e.currentTarget.value);
                setPreferredTag(undefined);
              }}
              className="tw:w-full tw:text-sm tw:outline-hidden tw:disabled:cursor-not-allowed tw:disabled:opacity-50"
            />
            <InputGroupAddon>
              <IconSearch className="tw:size-4 tw:shrink-0 tw:opacity-50" />
            </InputGroupAddon>
          </InputGroup>
        </div>
      )}
      <CommandList ref={listRef}>
        <CommandEmpty>{noResults}</CommandEmpty>
        {visibleEntries.map(({ tag, info }) => {
          const isSelected = tag === value;
          return (
            <CommandItem
              key={tag}
              ref={(row) => {
                if (row) rowRefs.current.set(tag, row);
                else rowRefs.current.delete(tag);
              }}
              value={tag}
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
