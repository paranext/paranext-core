import { Input } from '@/components/shadcn-ui/input';
import { Search } from 'lucide-react';
import { LanguageMultipicker } from '@/components/advanced/language-multipicker/language-multipicker.component';
import { languageMatchesQuery } from '@/components/advanced/language-multipicker/language-info';
import { ResourceItem } from './resource-picker.types';
import {
  ResourcePickerLocalizedStrings,
  localizeResourcePicker as L,
} from './resource-picker.strings';

interface SearchRowProps {
  search: string;
  onSearch: (v: string) => void;
  selectedLanguages: string[];
  preferredLanguages?: string[];
  onLanguagesChange: (langs: string[]) => void;
  allLanguages: string[];
  localizedStrings?: ResourcePickerLocalizedStrings;
}

/**
 * Search input + `LanguageMultipicker` on a single line. The multipicker is tertiary — it sits to
 * the right and stays visually quiet until interacted with.
 */
export function SearchRow({
  search,
  onSearch,
  selectedLanguages,
  preferredLanguages,
  onLanguagesChange,
  allLanguages,
  localizedStrings,
}: SearchRowProps) {
  return (
    <div className="tw:flex tw:items-center tw:gap-2 tw:p-2">
      <div className="tw:relative tw:flex-1">
        <Search className="tw:pointer-events-none tw:absolute tw:left-2.5 tw:top-1/2 tw:size-4 tw:-translate-y-1/2 tw:text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder={L(localizedStrings, '%resourcePicker_search_placeholder%')}
          className="tw:h-8 tw:pl-8 tw:text-sm"
        />
      </div>
      <LanguageMultipicker
        value={selectedLanguages}
        options={allLanguages}
        preferred={preferredLanguages}
        onChange={onLanguagesChange}
      />
    </div>
  );
}

/** Matches name/fullName/language name/autonym/code. */
export function matchesSearch(item: ResourceItem, search: string): boolean {
  if (!search) return true;
  const q = search.toLowerCase();
  if (
    item.data.displayName.toLowerCase().includes(q) ||
    item.data.fullName.toLowerCase().includes(q)
  )
    return true;
  return languageMatchesQuery(item.data.bestLanguageName, q);
}

export function groupItems(items: ResourceItem[]) {
  return {
    included: items.filter((i) => i.status.kind === 'included'),
    installed: items.filter((i) => i.status.kind === 'installed'),
    available: items.filter((i) => i.status.kind === 'available'),
  };
}

/** Split items by whether their language is in the selected-language filter. */
export function partitionByLanguage(items: ResourceItem[], selectedLanguages: string[]) {
  const empty: ResourceItem[] = [];
  if (selectedLanguages.length === 0) return { inFilter: items, outOfFilter: empty };
  const inFilter: ResourceItem[] = [];
  const outOfFilter: ResourceItem[] = [];
  items.forEach((it) => {
    if (selectedLanguages.includes(it.data.bestLanguageName)) inFilter.push(it);
    else outOfFilter.push(it);
  });
  return { inFilter, outOfFilter };
}

/** Below this in-filter count, show out-of-filter "Maybe you meant…" results. */
export const FEW_RESULTS_THRESHOLD = 3;
