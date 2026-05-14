import React, { useMemo, useState } from 'react';
import { DblResourceData } from 'platform-bible-utils';
import { BookOpenText, Plus, Settings2, Star } from 'lucide-react';
import { Button } from '@/components/shadcn-ui/button';
import { Input } from '@/components/shadcn-ui/input';
import { Badge } from '@/components/shadcn-ui/badge';
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
  zeroHeadline: "Choose a model text to get started",
  zeroBody:
    "Your model text is the published scripture this project is translating from. Pick one to anchor your work — you can change it later.",
  primaryCta: 'Choose model text',
  inlinePromptHeadline: 'No model text yet',
  inlinePromptBody: 'Pick the published scripture this project is translating from.',
  inlinePromptCta: 'Choose',
  setupTitle: 'Set up the model text',
  setupBody:
    "The model text is the published scripture this project is translating from. Saroj or Donna picks one — Donna's choice will override on sync.",
  setupSearch: 'Search scripture resources…',
  setupPreferred: 'Preferred for your languages',
  setupAll: 'Other scripture resources',
  setupConfirm: 'Use as model text',
};

export interface ModelTextZeroStateCommonProps {
  /** Triggered when the user wants to launch the picker. Zero-state hands off here. */
  onOpenPicker: () => void;
}

export interface ModelTextSetupPanelProps {
  /** All available DBL resources (filtered to ScriptureResource inside). */
  allResources: DblResourceData[];
  /** Languages Saroj has configured — affects ranking, never hides. */
  userLanguages: string[];
  /** IDs of resources already associated with the project. Shown first. */
  selectedResourceIds: string[];
  /** Called when the user picks a model text inline. */
  onSelect: (resource: DblResourceData) => void;
}

// ---------------------------------------------------------------------------
// Variant A: Illustrated / editorial zero state
// ---------------------------------------------------------------------------

/**
 * Variant A — "Editorial / onboarding".
 *
 * Mental model: a first-run, calm onboarding moment. Centered art-ish icon, friendly
 * headline, one-sentence explanation in plain language, and a single primary CTA. This
 * is the variant Saroj or Donna sees the first time the project loads with nothing set
 * up — it makes the empty column feel intentional, not broken.
 *
 * Trade-off: most "branded" and takes the most vertical space. Best for true first-run.
 */
export function ModelTextZeroStateIllustrated({ onOpenPicker }: ModelTextZeroStateCommonProps) {
  return (
    <div className="tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-p-8">
      <div className="tw-flex tw-max-w-sm tw-flex-col tw-items-center tw-gap-4 tw-text-center">
        <div
          className="tw-flex tw-h-16 tw-w-16 tw-items-center tw-justify-center tw-rounded-full tw-bg-muted"
          aria-hidden
        >
          <BookOpenText className="tw-h-8 tw-w-8 tw-text-muted-foreground" />
        </div>
        <div className="tw-flex tw-flex-col tw-gap-2">
          <h2 className="tw-text-lg tw-font-semibold tw-text-foreground">
            {STRINGS.zeroHeadline}
          </h2>
          <p className="tw-text-sm tw-text-muted-foreground">{STRINGS.zeroBody}</p>
        </div>
        <Button onClick={onOpenPicker} className="tw-mt-2">
          <Plus className="tw-h-4 tw-w-4" aria-hidden />
          {STRINGS.primaryCta}
        </Button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Variant B: Inline prompt anchored where the text would appear
// ---------------------------------------------------------------------------

/**
 * Variant B — "Inline prompt".
 *
 * Mental model: the column already looks like it could hold scripture, but instead shows a
 * subtle message anchored where the text would render. Compact. Lower-key than Variant A —
 * better when a user lands on a project mid-stream (e.g. Saroj just synced and Donna's
 * setup hasn't completed yet) and we want to communicate "nothing here yet" without
 * dominating the screen.
 *
 * Trade-off: less hand-holding, doesn't explain the concept at length. Pair with onboarding
 * elsewhere if this is a first-run experience.
 */
export function ModelTextZeroStateInline({ onOpenPicker }: ModelTextZeroStateCommonProps) {
  return (
    <div className="tw-flex tw-h-full tw-w-full tw-flex-col">
      {/* fake verse-line gutter to suggest "this is where text goes" */}
      <div className="tw-flex tw-flex-1 tw-flex-col tw-px-6 tw-py-8">
        <div className="tw-mb-2 tw-flex tw-items-center tw-gap-2 tw-text-[11px] tw-uppercase tw-tracking-wider tw-text-muted-foreground">
          <span>Model text</span>
        </div>
        <div className="tw-rounded-md tw-border tw-border-dashed tw-bg-muted/30 tw-p-4">
          <div className="tw-flex tw-items-start tw-justify-between tw-gap-3">
            <div className="tw-flex tw-flex-col tw-gap-1">
              <p className="tw-text-sm tw-font-medium tw-text-foreground">
                {STRINGS.inlinePromptHeadline}
              </p>
              <p className="tw-text-xs tw-text-muted-foreground">{STRINGS.inlinePromptBody}</p>
            </div>
            <Button size="sm" variant="outline" onClick={onOpenPicker}>
              {STRINGS.inlinePromptCta}
            </Button>
          </div>
        </div>
        {/* faint placeholder lines to reinforce the "text could go here" mental model */}
        <div className="tw-mt-6 tw-flex tw-flex-col tw-gap-2" aria-hidden>
          {[80, 92, 70, 88, 60].map((w, i) => (
            <div
              key={i}
              className="tw-h-3 tw-rounded tw-bg-muted/40"
              style={{ width: `${w}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Variant C: Persistent setup panel — picker rendered inline (no modal)
// ---------------------------------------------------------------------------

/**
 * Variant C — "Setup panel".
 *
 * Mental model: the column itself becomes the configuration surface. No separate dialog —
 * the picker is rendered INLINE as part of the column's zero state. Better for Donna, who
 * is deliberately setting things up, or for the second/third project the team configures
 * (the wow-factor of the editorial variant is gone; they want a faster route to "done").
 *
 * Trade-off: needs more vertical space than the inline prompt, and bakes a specific picker
 * shape (a ranked flat list) into the zero state — variants A and B are flexible about
 * which picker they hand off to.
 */
export function ModelTextZeroStateSetupPanel({
  allResources,
  userLanguages,
  selectedResourceIds,
  onSelect,
}: ModelTextSetupPanelProps) {
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

  const preferred = filtered.filter((r) =>
    preferredLanguageSet.has(r.bestLanguageName.toLowerCase()),
  );
  const others = filtered.filter(
    (r) => !preferredLanguageSet.has(r.bestLanguageName.toLowerCase()),
  );

  return (
    <div className="tw-flex tw-h-full tw-w-full tw-flex-col">
      <div className="tw-flex tw-flex-col tw-gap-2 tw-border-b tw-px-4 tw-py-4">
        <div className="tw-flex tw-items-center tw-gap-2">
          <Settings2 className="tw-h-4 tw-w-4 tw-text-muted-foreground" aria-hidden />
          <h2 className="tw-text-sm tw-font-semibold tw-text-foreground">{STRINGS.setupTitle}</h2>
        </div>
        <p className="tw-text-xs tw-text-muted-foreground">{STRINGS.setupBody}</p>
        <Input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder={STRINGS.setupSearch}
          className="tw-mt-2 tw-h-8"
        />
      </div>
      <div className="tw-flex-1 tw-overflow-y-auto tw-px-3 tw-py-3">
        {preferred.length > 0 && (
          <SetupSection
            title={STRINGS.setupPreferred}
            resources={preferred}
            selectedSet={selectedSet}
            preferredLanguageSet={preferredLanguageSet}
            onSelect={onSelect}
          />
        )}
        {others.length > 0 && (
          <SetupSection
            title={STRINGS.setupAll}
            resources={others}
            selectedSet={selectedSet}
            preferredLanguageSet={preferredLanguageSet}
            onSelect={onSelect}
          />
        )}
        {filtered.length === 0 && (
          <p className="tw-py-8 tw-text-center tw-text-xs tw-text-muted-foreground">
            No scripture resources match your search.
          </p>
        )}
      </div>
    </div>
  );
}

function SetupSection({
  title,
  resources,
  selectedSet,
  preferredLanguageSet,
  onSelect,
}: {
  title: string;
  resources: DblResourceData[];
  selectedSet: Set<string>;
  preferredLanguageSet: Set<string>;
  onSelect: (resource: DblResourceData) => void;
}) {
  return (
    <div className="tw-mb-3">
      <div className="tw-mb-1 tw-px-2 tw-text-[11px] tw-uppercase tw-tracking-wider tw-text-muted-foreground">
        {title}
      </div>
      <div className="tw-flex tw-flex-col tw-gap-1">
        {resources.map((r) => (
          <div
            key={r.dblEntryUid}
            className="tw-flex tw-items-center tw-gap-2 tw-rounded-md tw-px-2 tw-py-1.5 hover:tw-bg-accent/40"
          >
            <div className="tw-flex tw-min-w-0 tw-flex-1 tw-flex-col">
              <div className="tw-flex tw-items-center tw-gap-2">
                <span className="tw-truncate tw-text-sm tw-font-medium">{r.displayName}</span>
                <span className="tw-truncate tw-text-xs tw-text-muted-foreground">
                  {r.fullName}
                </span>
              </div>
              <div className="tw-flex tw-items-center tw-gap-1 tw-text-[11px] tw-text-muted-foreground">
                <span>{r.bestLanguageName}</span>
                {!r.installed && <span>• Not installed</span>}
                {selectedSet.has(r.dblEntryUid) && (
                  <Badge variant="outline" className="tw-ml-1 tw-h-4 tw-px-1 tw-text-[10px]">
                    In project
                  </Badge>
                )}
                {preferredLanguageSet.has(r.bestLanguageName.toLowerCase()) && (
                  <Star
                    className="tw-h-3 tw-w-3 tw-text-amber-500"
                    aria-label="Preferred for your languages"
                  />
                )}
              </div>
            </div>
            <Button size="sm" variant="outline" onClick={() => onSelect(r)}>
              {STRINGS.setupConfirm}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Populated state — proves the column has content after picker selection
// ---------------------------------------------------------------------------

export interface ModelTextPopulatedProps {
  resource: DblResourceData;
  /** Stub paragraph or other text body. */
  body: React.ReactNode;
  /** Triggered when the user wants to swap the model text. */
  onChange?: () => void;
}

/**
 * Populated column — after Saroj or Donna has picked a model text. Header row shows the
 * resource identity + a "Change" affordance; body shows the scripture text. Same column
 * width as the zero-state variants.
 */
export function ModelTextPopulated({ resource, body, onChange }: ModelTextPopulatedProps) {
  return (
    <div className="tw-flex tw-h-full tw-w-full tw-flex-col">
      <div className="tw-flex tw-items-center tw-justify-between tw-gap-2 tw-border-b tw-px-4 tw-py-2">
        <div className="tw-flex tw-min-w-0 tw-items-center tw-gap-2">
          <BookOpenText className="tw-h-4 tw-w-4 tw-text-muted-foreground" aria-hidden />
          <span className="tw-truncate tw-text-sm tw-font-medium">{resource.displayName}</span>
          <span className="tw-truncate tw-text-xs tw-text-muted-foreground">
            {resource.fullName}
          </span>
          <Badge variant="secondary" className="tw-ml-1">
            {resource.bestLanguageName}
          </Badge>
        </div>
        {onChange && (
          <Button size="sm" variant="ghost" onClick={onChange}>
            Change
          </Button>
        )}
      </div>
      <div className="tw-flex-1 tw-overflow-y-auto tw-px-6 tw-py-6 tw-text-sm tw-leading-relaxed">
        {body}
      </div>
    </div>
  );
}
