import { useState } from 'react';
import { Clock, Copy, MoreVertical, SearchX, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/shadcn-ui/button';
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/shadcn-ui/command';
import { Card, CardContent } from '@/components/shadcn-ui/card';
import { ScopeSelector } from '@/components/advanced/scope-selector/scope-selector.component';
import { Input } from '@/components/shadcn-ui/input';
import { Label } from '@/components/shadcn-ui/label';
import { Scope } from '@/components/utils/scripture.util';
import { Checkbox } from '@/components/shadcn-ui/checkbox';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn-ui/popover';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';
import { Progress } from '@/components/shadcn-ui/progress';
import { Skeleton } from '@/components/shadcn-ui/skeleton';

const sampleVerseRef: SerializedVerseRef = {
  book: 'GEN',
  chapterNum: 1,
  verseNum: 1,
};

const progressValue = 50; // Example progress value

const projectId: string = 'TPD';

const localizedStrings = {
  '%webView_scope_selector_selected_text%': 'Selected text',
  '%webView_scope_selector_current_verse%': 'Current verse',
  '%webView_scope_selector_current_chapter%': 'Current chapter',
  '%webView_scope_selector_current_book%': 'Current book',
  '%webView_scope_selector_choose_books%': 'Choose books',
  '%webView_scope_selector_scope%': 'Scope',
  '%webView_scope_selector_select_books%': 'Select books',
  '%webView_book_selector_books_selected%': 'Books selected',
  '%webView_book_selector_select_books%': 'Select books...',
  '%webView_book_selector_search_books%': 'Search books...',
  '%webView_book_selector_select_all%': 'Select all',
  '%webView_book_selector_clear_all%': 'Clear all',
  '%webView_book_selector_no_book_found%': 'No book found.',
  '%webView_book_selector_more%': 'more',
  '%scripture_section_ot_long%': 'Oude Testament',
  '%scripture_section_ot_short%': 'OT',
  '%scripture_section_nt_long%': 'Nieuwe Testament',
  '%scripture_section_nt_short%': 'NT',
  '%scripture_section_dc_long%': 'Deuterocanoniek',
  '%scripture_section_dc_short%': 'DC',
  '%scripture_section_extra_long%': 'Extra materiaal',
  '%scripture_section_extra_short%': 'Extra',
};

const booksPresent =
  '100111000000000000110000001000000000010111111111111111111111111111000000000000000000111000000000000000000000000100000001000';

type FindResult = {
  /** The verse reference where the text was found */
  verseRef: SerializedVerseRef;
  /** The text that matched the find operation */
  text: string;
};

const findResults: FindResult[] = [
  {
    verseRef: { book: 'GEN', chapterNum: 1, verseNum: 1 },
    text: 'In the beginning God created the heaven and the earth.',
  },
  {
    verseRef: { book: 'EXO', chapterNum: 20, verseNum: 13 },
    text: 'Thou shalt not kill.',
  },
  {
    verseRef: { book: 'PSA', chapterNum: 23, verseNum: 1 },
    text: 'The LORD is my shepherd; I shall not want.',
  },
  {
    verseRef: { book: 'ROM', chapterNum: 8, verseNum: 28 },
    text: 'And we know that all things work together for good to them that love God.',
  },
  {
    verseRef: { book: 'JHN', chapterNum: 3, verseNum: 16 },
    text: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.',
  },
  {
    verseRef: { book: 'REV', chapterNum: 21, verseNum: 4 },
    text: 'And God shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying, neither shall there be any more pain: for the former things are passed away.',
  },
];

const getScopeText = (
  scope: Scope | undefined,
  verseRef: SerializedVerseRef,
  selectedTextText: string,
  selectedBookIds: string[],
) => {
  switch (scope) {
    case 'selectedText':
      return selectedTextText;
    case 'verse':
      return `${verseRef.book} ${verseRef.chapterNum}:${verseRef.verseNum}`;
    case 'chapter':
      return `${verseRef.book} ${verseRef.chapterNum}`;
    case 'book':
      return verseRef.book;
    case 'selectedBooks':
      return selectedBookIds.join(' ');
    default:
      return 'scope undetermined'; // todo
  }
};

export function FindExamples() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState<string>('');
  const [submittedScope, setSubmittedScope] = useState<Scope>();
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [matchCase, setMatchCase] = useState(false);
  const [showContext, setShowContext] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(['hoi']);
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<FindResult[]>(findResults);
  const [searchPopoverOpen, setSearchPopoverOpen] = useState(false);

  const [scope, setScope] = useState<Scope>('book');
  const [selectedBookIds, setSelectedBookIds] = useState<string[]>([]);
  const [focusedResultIndex, setFocusedResultIndex] = useState(0);

  const handleSearch = () => {
    if (!searchTerm.trim()) return;

    setIsSearching(true);
    setSubmittedSearchTerm(searchTerm);
    setSubmittedScope(scope);

    // Add the current search term to recent searches, moving it to the top if it already exists
    setRecentSearches((prev) => {
      const withoutCurrent = prev.filter((term) => term !== searchTerm);
      return [searchTerm, ...withoutCurrent.slice(0, 9)];
    });

    // Determine which books to search based on scope
    // let booksToSearch: string[] = []
    if (scope === 'chapter') {
      // booksToSearch = [currentBook] // Will be filtered to current chapter in the search function
    } else if (scope === 'book') {
      // booksToSearch = [currentBook]
    } else {
      // booksToSearch = selectedBooks
    }

    // Perform the search

    setResults(findResults);
    setIsSearching(false);
  };

  const abortSearch = (shouldClearResults?: boolean) => {
    setIsSearching(false);
    if (shouldClearResults) setResults([]);
    // Logic to abort the search operation if applicable
  };

  return (
    <div className="tw-container tw-mx-auto tw-flex tw-max-h-screen tw-flex-col tw-gap-6 tw-p-4">
      <Card>
        <CardContent className="tw-space-y-4 tw-p-6">
          <div className="tw-flex tw-gap-2">
            <div className="tw-relative tw-flex-1">
              <Input
                id="search-term"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter search text..."
                className="tw-w-full tw-pr-10"
              />
              {recentSearches.length > 0 && (
                <Popover open={searchPopoverOpen} onOpenChange={setSearchPopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-3 tw-py-2"
                      aria-label="Show recent searches"
                    >
                      <Clock className="tw-h-4 tw-w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="tw-w-[300px] tw-p-0" align="start">
                    <Command>
                      <CommandList>
                        <CommandGroup heading="Recent searches">
                          {recentSearches.map((term) => (
                            <CommandItem
                              key={term}
                              onSelect={() => {}}
                              className="tw-flex tw-items-center"
                            >
                              <Clock className="tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50" />
                              <span>{term}</span>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              )}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setOptionsVisible(!optionsVisible)}
              aria-label="Toggle options"
              className={optionsVisible ? 'tw-bg-muted' : ''}
            >
              <SlidersHorizontal className="tw-h-4 tw-w-4" />
            </Button>
            <Button onClick={handleSearch} disabled={isSearching || !searchTerm.trim()}>
              {isSearching ? <SearchX onClick={() => abortSearch(true)} /> : 'Find'}
            </Button>
          </div>

          {optionsVisible && (
            <div className="tw-space-y-4 tw-border-t tw-pt-4">
              <ScopeSelector
                scope={scope}
                availableScopes={['book', 'chapter', 'selectedBooks']}
                onScopeChange={setScope}
                availableBookInfo={booksPresent}
                selectedBookIds={selectedBookIds}
                onSelectedBookIdsChange={setSelectedBookIds}
                localizedStrings={localizedStrings}
              />

              <div className="tw-flex tw-items-center tw-space-x-2">
                <Checkbox
                  id="match-case"
                  checked={matchCase}
                  onCheckedChange={(checked) => setMatchCase(checked === true)}
                />
                <Label htmlFor="match-case" className="tw-cursor-pointer">
                  Match case
                </Label>
              </div>

              <div className="tw-flex tw-items-center tw-space-x-2">
                <Checkbox
                  id="show-context"
                  checked={showContext}
                  onCheckedChange={(checked) => setShowContext(checked === true)}
                />
                <Label htmlFor="show-context">Show verse context</Label>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      {/* Search Query Summary */}
      {submittedScope && submittedSearchTerm && (
        <div className="tw-text-sm tw-font-medium tw-text-muted-foreground">
          {projectId} ·{' '}
          {getScopeText(
            submittedScope,
            sampleVerseRef,
            localizedStrings['%webView_scope_selector_selected_text%'],
            selectedBookIds,
          )}{' '}
          · Find: {submittedSearchTerm}
        </div>
      )}

      {/* Search Results Placeholder */}
      {results.length === 0 && isSearching && (
        <div className="tw-space-y-2">
          {Array.from({ length: 5 }).map(() => (
            <Card key={crypto.randomUUID()}>
              <CardContent className="tw-flex tw-items-center tw-space-x-4 tw-p-4">
                <div className="tw-space-y-2">
                  <Skeleton className="tw-h-4 tw-w-[250px]" />
                  <Skeleton className="tw-h-4 tw-w-[200px]" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Search Results */}
      <div className="tw-min-h-0 tw-flex-1 tw-space-y-2 tw-overflow-y-auto">
        {results.map((result, index) => (
          <Card
            key={
              result.verseRef.book +
              result.verseRef.chapterNum +
              result.verseRef.verseNum +
              result.text
            }
            className={`tw-cursor-pointer ${index === focusedResultIndex ? 'tw-bg-primary-foreground' : 'tw-bg-primary-foreground/10'}`}
            onClick={() => setFocusedResultIndex(index)}
          >
            <CardContent className="tw-p-4">
              <div className="tw-flex tw-items-start tw-justify-between">
                <div className="tw-font-medium">
                  {result.verseRef.book} {result.verseRef.chapterNum}:{result.verseRef.verseNum}{' '}
                  {submittedSearchTerm}
                </div>
                {index === focusedResultIndex && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="tw-h-8 tw-w-8">
                        <MoreVertical className="tw-h-4 tw-w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem
                        className="tw-flex tw-flex-row"
                        onClick={(e) => {
                          e.stopPropagation();
                          // add stuff here;
                        }}
                      >
                        <Copy className="tw-mr-2 tw-h-4 tw-w-4" />
                        <span>Copy reference</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="tw-flex tw-flex-row"
                        onClick={(e) => {
                          e.stopPropagation();
                          // add stuff here;
                        }}
                      >
                        <Copy className="tw-mr-2 tw-h-4 tw-w-4" />
                        <span>Copy verse text</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="tw-flex tw-flex-row"
                        onClick={(e) => {
                          e.stopPropagation();
                          // add stuff here;
                        }}
                      >
                        <Copy className="tw-mr-2 tw-h-4 tw-w-4" />
                        <span>Copy reference and verse text</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="tw-flex tw-flex-row"
                        onClick={(e) => {
                          e.stopPropagation();
                          // add stuff here;
                        }}
                      >
                        <X className="tw-mr-2 tw-h-4 tw-w-4" />
                        <span>Dismiss</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>

              {index === focusedResultIndex && (
                <div className="tw-mt-2 tw-text-sm tw-text-muted-foreground">{result.text}</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      {isSearching && (
        <div className="tw-flex tw-items-center tw-justify-center tw-gap-4 tw-border-t tw-pt-4">
          <Progress value={progressValue} className="tw-max-w-64" />
          <Button onClick={() => abortSearch(false)}>Abort search</Button>
        </div>
      )}
    </div>
  );
}

export default FindExamples;
