import * as React from 'react';
import { useMemo, useState } from 'react';
import { DblResourceData } from 'platform-bible-utils';
import { BookOpen, Check, Search, Star, X } from 'lucide-react';
import { Button } from '@/components/shadcn-ui/button';
import { Badge } from '@/components/shadcn-ui/badge';
import { Input } from '@/components/shadcn-ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn-ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn-ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/shadcn-ui/command';
import {
  filterResourcesByUserLanguages,
  matchesSearch,
  modelTextCandidates,
  rankByRelevance,
} from './model-text-zero-state.utils';

// ---------------------------------------------------------------------------
// Shared types & strings
// ---------------------------------------------------------------------------

const STRINGS = {
  title: 'Choose a model text',
  description:
    'Your model text is the published scripture this translation is based on. You can change it later in project settings.',
  searchPlaceholder: 'Search by name or language…',
  preferred: 'Preferred for your languages',
  allResources: 'All scripture resources',
  alreadyInProject: 'Already in your project',
  empty: 'No scripture resources match.',
  use: 'Use as model text',
  useShort: 'Use',
  projectAffordance: 'Use a project as model text…',
  hint: 'Tip: Press ↑ ↓ to move, Enter to select, Esc to close.',
  scriptureBadge: 'Scripture',
};

export interface ModelTextPickerCommonProps {
  /** Pool of candidate resources (will be filtered to ScriptureResource for model text). */
  allResources: DblResourceData[];
  /** Languages Saroj has configured — affects ranking, never hides. */
  userLanguages: string[];
  /** IDs of resources already associated with the project (Donna-or-Saroj). Shown first. */
  selectedResourceIds: string[];
  /** Confirms the selection. */
  onSelect: (resource: DblResourceData) => void;
  /** Closes the picker without selecting. */
  onClose: () => void;
  /** Optional secondary affordance — pass a handler to show the rare project-as-reference link. */
  onUseProjectAsModelText?: () => void;
}

/** Tiny row used by the modal / popover variants. Single-select — clicking it confirms. */
function ResourceRow({
  resource,
  isSelectedInProject,
  isPreferredLanguage,
  onSelect,
}: {
  resource: DblResourceData;
  isSelectedInProject: boolean;
  isPreferredLanguage: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={[
        'tw:flex tw:w-full tw:items-center tw:gap-3 tw:rounded-md tw:px-3 tw:py-2 tw:text-left',
        'tw:border tw:border-transparent hover:tw:bg-accent hover:tw:text-accent-foreground',
        'focus-visible:tw:outline-none focus-visible:tw:ring-2 focus-visible:tw:ring-ring',
        isSelectedInProject ? 'tw:bg-muted/40' : '',
      ].join(' ')}
    >
      <BookOpen className="tw:h-4 tw:w-4 tw:shrink-0 tw:text-muted-foreground" aria-hidden />
      <div className="tw:flex tw:min-w-0 tw:flex-1 tw:flex-col">
        <div className="tw:flex tw:items-center tw:gap-2">
          <span className="tw:truncate tw:font-medium">{resource.displayName}</span>
          <span className="tw:truncate tw:text-xs tw:text-muted-foreground">
            {resource.fullName}
          </span>
        </div>
        <div className="tw:flex tw:items-center tw:gap-2 tw:text-xs tw:text-muted-foreground">
          <span>{resource.bestLanguageName}</span>
          {!resource.installed && <span>• Not installed</span>}
        </div>
      </div>
      <div className="tw:flex tw:items-center tw:gap-1">
        {isPreferredLanguage && (
          <Badge variant="secondary" className="tw:gap-1">
            <Star className="tw:h-3 tw:w-3" aria-hidden /> Preferred
          </Badge>
        )}
        {isSelectedInProject && (
          <Badge variant="outline" className="tw:gap-1">
            <Check className="tw:h-3 tw:w-3" aria-hidden /> In project
          </Badge>
        )}
      </div>
    </button>
  );
}

// ---------------------------------------------------------------------------
// Variant A: Modal + search + flat list (with preference indicators)
// ---------------------------------------------------------------------------

/**
 * Variant A — "Considered choice".
 *
 * Mental model: a deliberate, focusing modal. Picking a model text is an important decision (this
 * is the text the translation is BASED on, not a casual reference) so the modal grabs attention,
 * shows the description prominently, and presents one ranked list. No tabs, no panels — minimize
 * the chrome around the choice itself.
 *
 * Layout: centered shadcn Dialog, search at the top, a single ranked list below (preferred-
 * language entries float to the top with a "Preferred" badge; already-in-project entries get an "In
 * project" badge so Saroj recognises Donna's prior setup). Single click confirms.
 */
export function ModelTextPickerModal({
  allResources,
  userLanguages,
  selectedResourceIds,
  onSelect,
  onClose,
  onUseProjectAsModelText,
}: ModelTextPickerCommonProps) {
  const [searchText, setSearchText] = useState('');

  const candidates = useMemo(() => modelTextCandidates(allResources), [allResources]);

  const ranked = useMemo(() => {
    const byLanguage = filterResourcesByUserLanguages(candidates, userLanguages);
    return rankByRelevance(byLanguage, selectedResourceIds);
  }, [candidates, userLanguages, selectedResourceIds]);

  const filtered = useMemo(
    () => ranked.filter((r) => matchesSearch(r, searchText)),
    [ranked, searchText],
  );

  const preferredLanguageSet = useMemo(
    () => new Set(userLanguages.map((l) => l.toLowerCase())),
    [userLanguages],
  );
  const selectedSet = useMemo(() => new Set(selectedResourceIds), [selectedResourceIds]);

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="tw:flex tw:max-h-[80vh] tw:w-[560px] tw:max-w-[90vw] tw:flex-col tw:gap-0 tw:p-0">
        <DialogHeader className="tw:space-y-2 tw:px-6 tw:pb-3 tw:pt-6">
          <DialogTitle>{STRINGS.title}</DialogTitle>
          <DialogDescription>{STRINGS.description}</DialogDescription>
        </DialogHeader>
        <div className="tw:relative tw:px-6 tw:pb-3">
          <Search
            className="tw:absolute tw:left-9 tw:top-1/2 tw:h-4 tw:w-4 -tw:translate-y-1/2 tw:text-muted-foreground"
            aria-hidden
          />
          <Input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder={STRINGS.searchPlaceholder}
            className="tw:pl-9"
            autoFocus
          />
        </div>
        <div className="tw:flex-1 tw:overflow-y-auto tw:px-3 tw:pb-2">
          {filtered.length === 0 ? (
            <p className="tw:py-10 tw:text-center tw:text-sm tw:text-muted-foreground">
              {STRINGS.empty}
            </p>
          ) : (
            <div className="tw:flex tw:flex-col tw:gap-1 tw:px-1 tw:py-1">
              {filtered.map((r) => (
                <ResourceRow
                  key={r.dblEntryUid}
                  resource={r}
                  isSelectedInProject={selectedSet.has(r.dblEntryUid)}
                  isPreferredLanguage={preferredLanguageSet.has(r.bestLanguageName.toLowerCase())}
                  onSelect={() => onSelect(r)}
                />
              ))}
            </div>
          )}
        </div>
        <div className="tw:flex tw:items-center tw:justify-between tw:gap-2 tw:border-t tw:px-6 tw:py-3">
          {onUseProjectAsModelText ? (
            <button
              type="button"
              onClick={onUseProjectAsModelText}
              className="tw:text-xs tw:text-muted-foreground tw:underline-offset-4 hover:tw:underline"
            >
              {STRINGS.projectAffordance}
            </button>
          ) : (
            <span />
          )}
          <Button variant="ghost" onClick={onClose} size="sm">
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ---------------------------------------------------------------------------
// Variant B: Popover / inline panel anchored to the trigger
// ---------------------------------------------------------------------------

/**
 * Variant B — "Lightweight switcher".
 *
 * Mental model: switching the model text feels closer to changing a dropdown setting than to
 * opening a wizard. Anchoring the picker to the trigger button keeps Saroj in flow — useful when
 * she's already deep in a translation session and just wants to try a different base text for a
 * tricky passage. Less disruptive than a modal; trades focus for context.
 *
 * Layout: shadcn Popover anchored to a trigger you render. Compact search at the top, a single
 * ranked list, no description text (assumes the user already knows what they're doing).
 */
export function ModelTextPickerPopover({
  trigger,
  allResources,
  userLanguages,
  selectedResourceIds,
  onSelect,
  onClose,
  open: openProp,
  defaultOpen,
}: Omit<ModelTextPickerCommonProps, 'onUseProjectAsModelText'> & {
  trigger: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
}) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen ?? false);
  const open = openProp ?? internalOpen;
  const setOpen = (o: boolean) => {
    setInternalOpen(o);
    if (!o) onClose();
  };

  const [searchText, setSearchText] = useState('');

  const candidates = useMemo(() => modelTextCandidates(allResources), [allResources]);
  const ranked = useMemo(() => {
    const byLanguage = filterResourcesByUserLanguages(candidates, userLanguages);
    return rankByRelevance(byLanguage, selectedResourceIds);
  }, [candidates, userLanguages, selectedResourceIds]);
  const filtered = useMemo(
    () => ranked.filter((r) => matchesSearch(r, searchText)),
    [ranked, searchText],
  );

  const preferredLanguageSet = useMemo(
    () => new Set(userLanguages.map((l) => l.toLowerCase())),
    [userLanguages],
  );
  const selectedSet = useMemo(() => new Set(selectedResourceIds), [selectedResourceIds]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent align="start" className="tw:w-[420px] tw:p-0">
        <div className="tw:relative tw:p-2">
          <Search
            className="tw:absolute tw:left-5 tw:top-1/2 tw:h-4 tw:w-4 -tw:translate-y-1/2 tw:text-muted-foreground"
            aria-hidden
          />
          <Input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder={STRINGS.searchPlaceholder}
            className="tw:h-8 tw:pl-9"
            autoFocus
          />
        </div>
        <div className="tw:max-h-[320px] tw:overflow-y-auto tw:px-1 tw:pb-1">
          {filtered.length === 0 ? (
            <p className="tw:py-6 tw:text-center tw:text-xs tw:text-muted-foreground">
              {STRINGS.empty}
            </p>
          ) : (
            filtered.map((r) => (
              <ResourceRow
                key={r.dblEntryUid}
                resource={r}
                isSelectedInProject={selectedSet.has(r.dblEntryUid)}
                isPreferredLanguage={preferredLanguageSet.has(r.bestLanguageName.toLowerCase())}
                onSelect={() => onSelect(r)}
              />
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

// ---------------------------------------------------------------------------
// Variant C: Command palette
// ---------------------------------------------------------------------------

/**
 * Variant C — "Keyboard-first power-user".
 *
 * Mental model: a Cmd-K command palette. Search-dominant, results materialise as you type,
 * arrow-keys + Enter complete the action with no mouse. Aimed at translators who do this a lot
 * (consultants moving between projects, or Donna setting up multiple teams). The picker dedicates
 * almost the entire surface to the input and the ranked result list — preferred-language entries
 * are grouped at the top with a divider, everything else below.
 *
 * Layout: shadcn Command primitive inside a centered Dialog. Two CommandGroups ("Preferred for your
 * languages", "All scripture resources"). Also exposes the project-as-reference affordance as a
 * footer keyboard hint — annotated below as the "one-off project-as-reference" variant per the
 * brief.
 */
export function ModelTextPickerCommandPalette({
  allResources,
  userLanguages,
  selectedResourceIds,
  onSelect,
  onClose,
  onUseProjectAsModelText,
}: ModelTextPickerCommonProps) {
  // NOTE — THIS VARIANT carries the "Use a project as model text…" subtle affordance per the brief.
  const candidates = useMemo(() => modelTextCandidates(allResources), [allResources]);
  const ranked = useMemo(
    () => rankByRelevance(candidates, selectedResourceIds),
    [candidates, selectedResourceIds],
  );

  const preferredLanguageSet = useMemo(
    () => new Set(userLanguages.map((l) => l.toLowerCase())),
    [userLanguages],
  );
  const selectedSet = useMemo(() => new Set(selectedResourceIds), [selectedResourceIds]);

  const preferred = ranked.filter((r) =>
    preferredLanguageSet.has(r.bestLanguageName.toLowerCase()),
  );
  const others = ranked.filter((r) => !preferredLanguageSet.has(r.bestLanguageName.toLowerCase()));

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="tw:w-[560px] tw:max-w-[90vw] tw:overflow-hidden tw:p-0"
      >
        <Command className="tw:flex tw:max-h-[500px] tw:flex-col">
          <CommandInput placeholder={STRINGS.searchPlaceholder} className="tw:h-12" autoFocus />
          <CommandList className="tw:max-h-[400px]">
            <CommandEmpty>{STRINGS.empty}</CommandEmpty>
            {preferred.length > 0 && (
              <CommandGroup heading={STRINGS.preferred}>
                {preferred.map((r) => (
                  <CommandItem
                    key={r.dblEntryUid}
                    value={`${r.displayName} ${r.fullName} ${r.bestLanguageName}`}
                    onSelect={() => onSelect(r)}
                  >
                    <Star className="tw:mr-2 tw:h-4 tw:w-4 tw:text-amber-500" aria-hidden />
                    <span className="tw:font-medium">{r.displayName}</span>
                    <span className="tw:ml-2 tw:text-xs tw:text-muted-foreground">
                      {r.fullName}
                    </span>
                    <span className="tw:ml-auto tw:flex tw:items-center tw:gap-1 tw:text-xs tw:text-muted-foreground">
                      {r.bestLanguageName}
                      {selectedSet.has(r.dblEntryUid) && (
                        <Check className="tw:h-3 tw:w-3" aria-hidden />
                      )}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {preferred.length > 0 && others.length > 0 && <CommandSeparator />}
            {others.length > 0 && (
              <CommandGroup heading={STRINGS.allResources}>
                {others.map((r) => (
                  <CommandItem
                    key={r.dblEntryUid}
                    value={`${r.displayName} ${r.fullName} ${r.bestLanguageName}`}
                    onSelect={() => onSelect(r)}
                  >
                    <BookOpen
                      className="tw:mr-2 tw:h-4 tw:w-4 tw:text-muted-foreground"
                      aria-hidden
                    />
                    <span className="tw:font-medium">{r.displayName}</span>
                    <span className="tw:ml-2 tw:text-xs tw:text-muted-foreground">
                      {r.fullName}
                    </span>
                    <span className="tw:ml-auto tw:flex tw:items-center tw:gap-1 tw:text-xs tw:text-muted-foreground">
                      {r.bestLanguageName}
                      {selectedSet.has(r.dblEntryUid) && (
                        <Check className="tw:h-3 tw:w-3" aria-hidden />
                      )}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {onUseProjectAsModelText && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem onSelect={() => onUseProjectAsModelText()}>
                    <span className="tw:text-muted-foreground">{STRINGS.projectAffordance}</span>
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
          <div className="tw:flex tw:items-center tw:justify-between tw:border-t tw:px-3 tw:py-2 tw:text-[11px] tw:text-muted-foreground">
            <span>{STRINGS.hint}</span>
            <button
              type="button"
              onClick={onClose}
              className="tw:flex tw:items-center tw:gap-1 hover:tw:text-foreground"
            >
              <X className="tw:h-3 tw:w-3" aria-hidden /> Close
            </button>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
