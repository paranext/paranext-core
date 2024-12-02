import { Badge } from '@/components/shadcn-ui/badge';
import { Button } from '@/components/shadcn-ui/button';
import { Blocks, BookOpen, Check, ChevronsUpDown, Languages, Star, X } from 'lucide-react';
import React from 'react';

import SearchBar from '@/components/basics/search-bar.component';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/shadcn-ui/command';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/shadcn-ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn-ui/popover';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shadcn-ui/table';
import { cn } from '@/utils/shadcn-ui.util';
import { DialogTitle } from '@radix-ui/react-dialog';

type MultiSelectComboBoxEntry = {
  value: string;
  label: string;
  starred?: boolean;
};

const types: MultiSelectComboBoxEntry[] = [
  { value: 'resources', label: 'Resource' },
  { value: 'enhanced-resources', label: 'Enhanced Resource' },
  { value: 'source-language-texts', label: 'Source Language Text' },
  { value: 'dictionaries', label: 'Dictionary' },
  { value: 'consultant-notes', label: 'Consultant Note' },
];

const languages: MultiSelectComboBoxEntry[] = [
  { value: 'english', label: 'English', starred: true },
  { value: 'hebrew', label: 'Hebrew', starred: true },
  { value: 'greek', label: 'Greek', starred: true },
  { value: 'latin', label: 'Latin' },
  { value: 'aramaic', label: 'Aramaic' },
  { value: 'arabic', label: 'Arabic' },
  { value: 'coptic', label: 'Coptic' },
  { value: 'syriac', label: 'Syriac' },
  { value: 'ethiopic', label: 'Ethiopic' },
  { value: 'armenian', label: 'Armenian' },
  { value: 'georgian', label: 'Georgian' },
  { value: 'church-slavonic', label: 'Church Slavonic' },
  { value: 'gothic', label: 'Gothic' },
  { value: 'adamawa-fulfulde', label: 'Adamawa Fulfulde' },
  { value: 'himba', label: 'Himba' },
];

// Updated table data to change all "projects" to "resources"
const tableData = [
  {
    id: 1,
    name: 'Byzantine Text 1904',
    language: 'Ancient Greek (to 1453)',
    type: 'source-language-texts',
    size: '4 MB',
    installed: true,
  },
  {
    id: 2,
    name: 'Septuaginta 2006',
    language: 'Ancient Greek (to 1453)',
    type: 'source-language-texts',
    size: '8 MB',
    installed: false,
  },
  {
    id: 3,
    name: 'Hebrew Bible',
    language: 'Hebrew',
    type: 'source-language-texts',
    size: '12 MB',
    installed: false,
  },
  {
    id: 4,
    name: "Strong's Dictionary",
    language: 'English',
    type: 'dictionaries',
    size: '15 MB',
    installed: false,
  },
  {
    id: 5,
    name: 'Translation Notes',
    language: 'English',
    type: 'consultant-notes',
    size: '2 MB',
    installed: false,
  },
  {
    id: 6,
    name: 'Latin Vulgate',
    language: 'Latin',
    type: 'resources',
    size: '6 MB',
    installed: false,
  },
  {
    id: 7,
    name: 'English Standard Version',
    language: 'English',
    type: 'resources',
    size: '10 MB',
    installed: false,
  },
  {
    id: 8,
    name: 'King James Version',
    language: 'English',
    type: 'resources',
    size: '9 MB',
    installed: false,
  },
  {
    id: 9,
    name: 'New International Version',
    language: 'English',
    type: 'resources',
    size: '11 MB',
    installed: false,
  },
  {
    id: 10,
    name: 'Reina Valera 1960',
    language: 'Spanish',
    type: 'resources',
    size: '8 MB',
    installed: false,
  },
  {
    id: 11,
    name: 'Luther Bible',
    language: 'German',
    type: 'resources',
    size: '7.5 MB',
    installed: false,
  },
  {
    id: 12,
    name: 'Nova Vulgata',
    language: 'Latin',
    type: 'resources',
    size: '6.8 MB',
    installed: false,
  },
  {
    id: 50,
    name: 'Traducción en lenguaje actual',
    language: 'Spanish',
    type: 'resources',
    size: '5.9 MB',
    installed: false,
  },
];

interface MultiSelectComboboxProps {
  entries: MultiSelectComboBoxEntry[];
  selected: string[];
  onChange: (values: string[]) => void;
  placeholder: string;
  customSelectedText?: string;
  sortSelected?: boolean;
  showIcon?: boolean;
  isTypeCombobox?: boolean;
}

function MultiSelectCombobox({
  entries,
  selected,
  onChange,
  placeholder,
  customSelectedText,
  sortSelected = false,
  showIcon = false,
  isTypeCombobox = false,
}: MultiSelectComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const Icon = isTypeCombobox ? Blocks : Languages;

  const handleSelect = React.useCallback(
    (value: string) => {
      if (isTypeCombobox) {
        // Prevent deselecting if it's the last selected item for types
        if (selected.includes(value) && selected.length === 1) {
          return;
        }
      }

      onChange(
        selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value],
      );
    },
    [selected, onChange, isTypeCombobox],
  );

  const getPlaceholderText = () => {
    if (selected.length === 0) {
      return isTypeCombobox ? 'Any resource type' : 'Any language';
    }
    if (isTypeCombobox && selected.length === entries.length) return 'Any resource type';
    if (selected.length === 1) {
      const selectedOption = entries.find((opt) => opt.value === selected[0]);
      return selectedOption?.label || placeholder;
    }
    if (customSelectedText) return customSelectedText;
    return `${selected.length} ${placeholder.toLowerCase().split(' ')[1]}`;
  };

  const sortedOptions = React.useMemo(() => {
    if (!sortSelected) return entries;

    // For languages, always keep starred items at top
    const starredItems = entries
      .filter((opt) => opt.starred)
      .sort((a, b) => a.label.localeCompare(b.label));
    const nonStarredItems = entries
      .filter((opt) => !opt.starred)
      .sort((a, b) => {
        const aSelected = selected.includes(a.value);
        const bSelected = selected.includes(b.value);
        if (aSelected && !bSelected) return -1;
        if (!aSelected && bSelected) return 1;
        return a.label.localeCompare(b.label);
      });

    return [...starredItems, ...nonStarredItems];
  }, [entries, selected, sortSelected]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('tw-w-full tw-justify-between', {
            'tw-border-primary': selected.length > 0 && selected.length < entries.length,
          })}
        >
          <span className="tw-flex tw-items-center tw-gap-2">
            {showIcon && <Icon className="tw-h-4 tw-w-4" />}
            {getPlaceholderText()}
          </span>
          <ChevronsUpDown className="tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="tw-w-full tw-p-0">
        <Command>
          <div className="tw-relative">
            <CommandInput
              placeholder={`Search ${placeholder.toLowerCase()}...`}
              className="tw-overflow-ellipsis tw-pe-6"
            />
            <Button
              variant="ghost"
              size="icon"
              className="tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-2 hover:tw-bg-transparent"
              onClick={() => {
                const input: HTMLInputElement | null = document.querySelector('[cmdk-input]');
                if (input) {
                  input.value = '';
                  input.dispatchEvent(new Event('input')); // TODO: bug, this is not refreshing the list
                }
              }}
            >
              <X className="tw-h-4 tw-w-4" />
            </Button>
          </div>
          <CommandList>
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup>
              {sortedOptions.map((option) => {
                const count = tableData.filter((item) =>
                  isTypeCombobox
                    ? item.type === option.value
                    : item.language.toLowerCase().includes(option.value.toLowerCase()),
                ).length;
                return (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={handleSelect}
                    className="tw-flex tw-items-center tw-gap-2"
                  >
                    <div className="tw-w-4">
                      <Check
                        className={cn(
                          'tw-h-4 tw-w-4',
                          selected.includes(option.value) ? 'tw-opacity-100' : 'tw-opacity-0',
                        )}
                      />
                    </div>
                    <div className="tw-w-4">
                      {option.starred && <Star className="tw-h-4 tw-w-4" />}
                    </div>
                    {option.label} ({count})
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default function ResourceManager() {
  const [selectedTypes, setSelectedTypes] = React.useState<string[]>(
    types.map((type) => type.value),
  );
  const [selectedLanguages, setSelectedLanguages] = React.useState<string[]>([
    'english',
    'hebrew',
    'greek',
  ]);
  const [searchQuery, setSearchQuery] = React.useState('');

  const removeType = (value: string) => {
    if (selectedTypes.length === 1) return;
    setSelectedTypes(selectedTypes.filter((type) => type !== value));
  };

  const removeLanguage = (value: string) => {
    setSelectedLanguages(selectedLanguages.filter((lang) => lang !== value));
  };

  const matchesSearch = React.useCallback(
    (item: (typeof tableData)[0]) => {
      if (searchQuery === '') return true;
      const searchLower = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(searchLower) ||
        item.language.toLowerCase().includes(searchLower) ||
        types
          .find((t) => t.value === item.type)
          ?.label.toLowerCase()
          .includes(searchLower)
      );
    },
    [searchQuery],
  );

  const matchesFilters = React.useCallback(
    (item: (typeof tableData)[0]) => {
      const matchesType = selectedTypes.includes(item.type);
      const matchesLanguage =
        selectedLanguages.length === 0 ||
        selectedLanguages.some((lang) => item.language.toLowerCase().includes(lang.toLowerCase()));
      return matchesType && matchesLanguage;
    },
    [selectedTypes, selectedLanguages],
  );

  const searchResults = React.useMemo(() => {
    return tableData.filter((item) => matchesSearch(item) && matchesFilters(item));
  }, [matchesSearch, matchesFilters]);

  const hiddenResults = React.useMemo(() => {
    if (!searchQuery) return 0;
    const allMatches = tableData.filter(matchesSearch);
    return allMatches.length - searchResults.length;
  }, [searchQuery, searchResults.length, matchesSearch]);

  return (
    <div className="tw-mx-auto tw-w-full tw-max-w-4xl tw-p-6">
      <div className="tw-mb-6 tw-flex tw-items-start tw-gap-4">
        <BookOpen className="tw-mt-1 tw-h-8 tw-w-8" />
        <div className="tw-flex-1">
          <h1 className="tw-mb-1 tw-text-xl tw-font-semibold">Get Resources</h1>
          <p className="tw-text-sm tw-text-muted-foreground">Add resources to Paratext</p>
        </div>
        <Button variant="ghost" size="icon">
          <X className="tw-h-4 tw-w-4" />
        </Button>
      </div>

      <div className="tw-space-y-4">
        <div className="tw-grid tw-grid-cols-1 tw-gap-4 md:tw-grid-cols-3">
          <SearchBar
            onSearch={setSearchQuery}
            placeholder="Search by name, language, type..."
            className={cn({ 'tw-border-primary': searchQuery })}
          />

          <MultiSelectCombobox
            entries={types}
            selected={selectedTypes}
            onChange={setSelectedTypes}
            placeholder="Select types"
            showIcon
            isTypeCombobox
          />

          <MultiSelectCombobox
            entries={languages}
            selected={selectedLanguages}
            onChange={setSelectedLanguages}
            placeholder="Select languages"
            customSelectedText={
              selectedLanguages.length === 3 &&
              selectedLanguages.includes('english') &&
              selectedLanguages.includes('hebrew') &&
              selectedLanguages.includes('greek')
                ? 'My languages'
                : undefined
            }
            sortSelected
            showIcon
          />
        </div>

        <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-4">
          {selectedTypes.length > 0 && (
            <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-2">
              <span className="tw-text-sm tw-text-muted-foreground">Types:</span>
              {selectedTypes.map((type) => (
                <Badge
                  key={type}
                  variant="muted"
                  className="tw-flex tw-cursor-pointer tw-items-center tw-gap-1"
                  onClick={() => removeType(type)}
                >
                  {types.find((t) => t.value === type)?.label}
                  <X className="tw-h-3 tw-w-3" />
                </Badge>
              ))}
            </div>
          )}

          {selectedLanguages.length > 0 && (
            <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-2">
              <span className="tw-text-sm tw-text-muted-foreground">Languages:</span>
              {selectedLanguages.map((language) => {
                const langInfo = languages.find((l) => l.value === language);
                return (
                  <Badge
                    key={language}
                    variant="muted"
                    className="tw-flex tw-cursor-pointer tw-items-center tw-gap-1"
                    onClick={() => removeLanguage(language)}
                  >
                    {langInfo?.starred && <Star className="tw-h-3 tw-w-3" />}
                    {langInfo?.label}

                    <X className="tw-h-3 tw-w-3" />
                  </Badge>
                );
              })}
            </div>
          )}

          <span className="tw-ml-auto tw-text-sm tw-text-muted-foreground">
            Showing {searchResults.length} results
          </span>
        </div>

        <div className="tw-rounded-lg tw-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="tw-w-[30px]" />
                <TableHead>Full Name</TableHead>
                <TableHead>Language</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="tw-w-[100px]">Size</TableHead>
                <TableHead className="tw-w-[100px] tw-text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {searchResults.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="tw-h-24 tw-text-center tw-text-muted-foreground"
                  >
                    No resources for the current filter
                  </TableCell>
                </TableRow>
              ) : (
                searchResults.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <BookOpen className="tw-h-4 tw-w-4" />
                    </TableCell>
                    <TableCell className="tw-font-medium">{item.name}</TableCell>
                    <TableCell>{item.language}</TableCell>
                    <TableCell>{types.find((t) => t.value === item.type)?.label}</TableCell>
                    <TableCell>{item.size}</TableCell>
                    <TableCell className="tw-text-right">
                      {item.installed ? (
                        <span className="tw-text-sm tw-text-muted-foreground">Installed</span>
                      ) : (
                        <Button variant="secondary" size="sm">
                          Get
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {searchQuery && hiddenResults > 0 && (
        <Dialog>
          <DialogTrigger asChild>
            <div className="tw-fixed tw-left-1/2 tw-top-48 tw--translate-x-1/2 tw-rounded-lg tw-border tw-bg-background tw-p-3 tw-shadow-lg tw-animate-in tw-fade-in tw-slide-in-from-bottom-4">
              <Button
                variant="link"
                className="tw-h-auto tw-p-0 tw-text-sm tw-text-foreground hover:tw-text-primary"
              >
                {hiddenResults} more {hiddenResults === 1 ? 'result' : 'results'} for &quot;
                {searchQuery}
                &quot; that {hiddenResults === 1 ? "doesn't" : "don't"} match your filter
              </Button>
            </div>
          </DialogTrigger>
          <DialogContent className="tw-max-w-sm">
            <DialogHeader>
              <DialogTitle>Clear filters</DialogTitle>
              <DialogDescription>Clear filters to show all results?</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                onClick={(e) => {
                  setSelectedTypes(types.map((t) => t.value));
                  setSelectedLanguages([]);
                  (e.target as HTMLButtonElement).closest('dialog')?.close();
                }}
              >
                Show all results
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
