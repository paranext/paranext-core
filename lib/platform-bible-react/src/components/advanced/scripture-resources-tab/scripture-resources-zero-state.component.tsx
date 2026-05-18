import * as React from 'react';
import { BookOpen, Plus, Search, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/shadcn-ui/button';
import { Badge } from '@/components/shadcn-ui/badge';
import { Input } from '@/components/shadcn-ui/input';
import { Separator } from '@/components/shadcn-ui/separator';
import { DblResourceData } from 'platform-bible-utils';
import {
  filterResourcesByUserLanguages,
  rankResourcesForPicker,
  searchResources,
  RESOURCES_STRINGS,
} from './scripture-resources-tab.utils';

export type ZeroStateProps = {
  /**
   * Full catalog the picker will draw from when opened. Standard variant doesn't read it directly
   * (it just opens the full picker via onOpenPicker), but Suggestions and Split do.
   */
  // eslint-disable-next-line react/no-unused-prop-types -- See JSDoc; Standard variant doesn't read.
  allResources: DblResourceData[];
  /** Saroj's known languages — drives suggestions. Standard variant doesn't read it. */
  // eslint-disable-next-line react/no-unused-prop-types -- See JSDoc; Standard variant doesn't read.
  userLanguages: string[];
  /**
   * Opens the full (Area 3) picker. Standard and Suggestions call this from the CTA; Split is the
   * inline picker itself and intentionally has no full-picker handoff.
   */
  // eslint-disable-next-line react/no-unused-prop-types -- See JSDoc; Split variant doesn't read.
  onOpenPicker: () => void;
  /**
   * Adds a single resource directly (used by suggestion chips / inline picker). Standard variant
   * has no inline-add affordance, so it doesn't read this.
   */
  // eslint-disable-next-line react/no-unused-prop-types -- See JSDoc; Standard variant doesn't read.
  onAddResource?: (resource: DblResourceData) => void;
};

// ─────────────────────────────────────────────────────────────────────────────
// Variant A — Standard empty state
// Mental model: "You haven't started yet — here's what to do."
// Conventional, calm onboarding. Icon + headline + 1-sentence explanation +
// primary CTA. Best for first-time users who have never seen this column.
// ─────────────────────────────────────────────────────────────────────────────
export function ScriptureResourcesZeroStateStandard({ onOpenPicker }: ZeroStateProps) {
  return (
    <div className="tw:flex tw:h-full tw:w-full tw:flex-col tw:items-center tw:justify-center tw:gap-3 tw:p-6 tw:text-center">
      <div className="tw:flex tw:h-12 tw:w-12 tw:items-center tw:justify-center tw:rounded-full tw:bg-muted">
        <BookOpen className="tw:h-6 tw:w-6 tw:text-muted-foreground" />
      </div>
      <div className="tw:flex tw:flex-col tw:gap-1">
        <h3 className="tw:text-sm tw:font-semibold">{RESOURCES_STRINGS.noResourcesYet}</h3>
        <p className="tw:max-w-xs tw:text-xs tw:text-muted-foreground">
          {RESOURCES_STRINGS.noResourcesBody}
        </p>
      </div>
      <Button size="sm" onClick={onOpenPicker} className="tw:mt-2">
        <Plus className="tw:mr-1 tw:h-4 tw:w-4" />
        {RESOURCES_STRINGS.addMore}
      </Button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Variant B — Suggestions-first
// Mental model: "We already know what you probably want — one tap and you're set."
// Bypasses the full picker for the happy path by surfacing 3 ranked suggestions
// from `filterResourcesByUserLanguages`. The full picker stays available via a
// secondary link for power users / picky users.
// ─────────────────────────────────────────────────────────────────────────────
export function ScriptureResourcesZeroStateSuggestions({
  allResources,
  userLanguages,
  onOpenPicker,
  onAddResource,
}: ZeroStateProps) {
  const suggestions = React.useMemo(
    () => filterResourcesByUserLanguages(allResources, userLanguages, 3),
    [allResources, userLanguages],
  );
  return (
    <div className="tw:flex tw:h-full tw:w-full tw:flex-col tw:gap-3 tw:p-4">
      <div className="tw:flex tw:items-center tw:gap-2">
        <Sparkles className="tw:h-4 tw:w-4 tw:text-muted-foreground" />
        <span className="tw:text-xs tw:font-medium tw:text-muted-foreground">
          {RESOURCES_STRINGS.suggestionsHeading}
        </span>
      </div>
      <p className="tw:text-xs tw:text-muted-foreground">
        Based on your project languages ({userLanguages.join(', ')}). Tap to add one quickly.
      </p>
      <ul className="tw:flex tw:flex-col tw:gap-2">
        {suggestions.map((r) => (
          <li
            key={r.dblEntryUid}
            className="tw:flex tw:items-center tw:justify-between tw:rounded-md tw:border tw:bg-card tw:p-2"
          >
            <div className="tw:min-w-0 tw:flex-1">
              <div className="tw:truncate tw:text-sm tw:font-medium">{r.displayName}</div>
              <div className="tw:truncate tw:text-xs tw:text-muted-foreground">
                {r.fullName} · {r.bestLanguageName}
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onAddResource?.(r)}
              className="tw:shrink-0"
            >
              <Plus className="tw:mr-1 tw:h-3 tw:w-3" />
              Add
            </Button>
          </li>
        ))}
      </ul>
      <Separator className="tw:my-1" />
      <button
        type="button"
        onClick={onOpenPicker}
        className="tw:self-start tw:text-xs tw:text-primary tw:underline-offset-2 hover:tw:underline"
      >
        Browse all Bible texts…
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Variant C — Split-state panel with embedded inline picker
// Mental model: "Don't make me click — show me the choice right here."
// The column is its own picker. Half explains what resource texts are; the
// other half is a compact, scrollable selector. No modal, no second step. Best
// for users who already understand the concept and just want to assemble their
// shelf.
// ─────────────────────────────────────────────────────────────────────────────
export function ScriptureResourcesZeroStateSplit({
  allResources,
  userLanguages,
  onAddResource,
}: ZeroStateProps) {
  const [query, setQuery] = React.useState('');
  const ranked = React.useMemo(() => {
    const suggested = filterResourcesByUserLanguages(allResources, userLanguages, 4);
    const suggestedIds = new Set(suggested.map((r) => r.dblEntryUid));
    const others = allResources.filter((r) => !suggestedIds.has(r.dblEntryUid));
    return searchResources([...suggested, ...others], query);
  }, [allResources, userLanguages, query]);

  return (
    <div className="tw:flex tw:h-full tw:w-full tw:flex-col">
      <div className="tw:flex tw:flex-col tw:gap-1 tw:border-b tw:bg-muted/40 tw:p-3">
        <div className="tw:flex tw:items-center tw:gap-2">
          <BookOpen className="tw:h-4 tw:w-4 tw:text-muted-foreground" />
          <span className="tw:text-sm tw:font-semibold">{RESOURCES_STRINGS.noResourcesYet}</span>
        </div>
        <p className="tw:text-xs tw:text-muted-foreground">
          Pick one or more Bible texts to consult while translating. You can change this anytime.
        </p>
      </div>
      <div className="tw:flex tw:min-h-0 tw:flex-1 tw:flex-col">
        <div className="tw:p-2">
          <div className="tw:relative">
            <Search className="tw:pointer-events-none tw:absolute tw:left-2 tw:top-1/2 tw:h-3.5 tw:w-3.5 -tw:translate-y-1/2 tw:text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={RESOURCES_STRINGS.searchPlaceholder}
              className="tw:h-8 tw:pl-7 tw:text-xs"
            />
          </div>
        </div>
        <ul className="tw:flex tw:min-h-0 tw:flex-1 tw:flex-col tw:gap-1 tw:overflow-y-auto tw:px-2 tw:pb-2">
          {ranked.map((r) => (
            <li
              key={r.dblEntryUid}
              className="tw:flex tw:items-center tw:justify-between tw:rounded tw:px-2 tw:py-1.5 hover:tw:bg-muted/60"
            >
              <div className="tw:min-w-0 tw:flex-1">
                <div className="tw:flex tw:items-center tw:gap-2">
                  <span className="tw:truncate tw:text-sm">{r.displayName}</span>
                  {r.installed && (
                    <Badge variant="secondary" className="tw:h-4 tw:px-1 tw:text-[10px]">
                      {RESOURCES_STRINGS.installedBadge}
                    </Badge>
                  )}
                </div>
                <div className="tw:truncate tw:text-[11px] tw:text-muted-foreground">
                  {r.bestLanguageName}
                </div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onAddResource?.(r)}
                aria-label={`Add ${r.displayName}`}
              >
                <Plus className="tw:h-4 tw:w-4" />
              </Button>
            </li>
          ))}
          {ranked.length === 0 && (
            <li className="tw:flex tw:items-center tw:justify-between tw:px-2 tw:py-4 tw:text-xs tw:text-muted-foreground">
              <span>No matches</span>
              <button
                type="button"
                onClick={() => setQuery('')}
                className="tw:text-primary hover:tw:underline"
              >
                Clear <X className="tw:inline tw:h-3 tw:w-3" />
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

// Ranked helper re-exported for completeness — variants may use it externally.
export { rankResourcesForPicker };
