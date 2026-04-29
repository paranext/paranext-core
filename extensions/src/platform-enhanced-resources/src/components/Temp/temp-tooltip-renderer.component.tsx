import { Card, CardContent } from 'platform-bible-react';
import type { LocalizedStringValue } from 'platform-bible-utils';

/**
 * Object containing all keys used for localization in this component. Pass into the localization
 * hook in the wiring layer to obtain localized strings, then pass the result via
 * `localizedStringsWithLoadingState`.
 */
export const TEMP_TOOLTIP_RENDERER_STRING_KEYS = Object.freeze([
  '%enhancedResources_tooltip_lemma%',
  '%enhancedResources_tooltip_gloss%',
  '%enhancedResources_tooltip_partOfSpeech%',
  '%enhancedResources_tooltip_strongNumber%',
  '%enhancedResources_tooltip_morphology%',
  '%enhancedResources_tooltip_notes%',
] as const);

type TempTooltipRendererLocalizedStringKey = (typeof TEMP_TOOLTIP_RENDERER_STRING_KEYS)[number];
type TempTooltipRendererLocalizedStrings = {
  [key in TempTooltipRendererLocalizedStringKey]?: LocalizedStringValue;
};

/**
 * Tooltip data shape mirroring the `TooltipData` DTO defined in `data-contracts.md` Section 4.14.
 * Reproduced here so the presentational component does not depend on PAPI types during the design
 * phase.
 */
export type TooltipData = {
  lemma: string;
  gloss: string | undefined;
  partOfSpeech: string | undefined;
  strongNumber: string | undefined;
  /** Reserved placeholder per data-contracts.md - usually `[]` until wired up. */
  notes: string[];
  /** Reserved placeholder per data-contracts.md - usually `undefined` until wired up. */
  morphology: string | undefined;
};

export type TempTooltipRendererProps = {
  /** Structured tooltip data to render. */
  data: TooltipData;
  /**
   * Object with all localized strings the component needs, plus a loading flag. When loading is
   * true, the component still renders but values fall back to localization keys.
   */
  localizedStringsWithLoadingState?: [TempTooltipRendererLocalizedStrings, boolean];
};

/**
 * TEMP: Stand-in for the real linked-word tooltip primitive.
 *
 * The current marker-tooltip approach is a design-time placeholder. The real tooltip rendering for
 * linked scripture words will be owned by whichever extension provides the marker-tooltip primitive
 * that integrates with `platform-scripture-editor`'s annotation system.
 *
 * Replacement plan:
 *
 * - Real component: TBD — the editor-side annotation tooltip primitive (see FN-014).
 * - Swap-in phase: phase-3-ui (when `platform-scripture-editor` annotations + tooltip wiring ship).
 * - On swap: delete this file and update imports in `TempScripturePane` (and any other consumer).
 *
 * @see Component-Builder-Patterns.md § Temp Component Convention
 */
export function TempTooltipRenderer({
  data,
  localizedStringsWithLoadingState = [{}, false],
}: TempTooltipRendererProps) {
  const getLocalizedString = (key: TempTooltipRendererLocalizedStringKey) =>
    localizedStringsWithLoadingState[0][key] ?? key;

  const lemmaLabel = getLocalizedString('%enhancedResources_tooltip_lemma%');
  const glossLabel = getLocalizedString('%enhancedResources_tooltip_gloss%');
  const posLabel = getLocalizedString('%enhancedResources_tooltip_partOfSpeech%');
  const strongLabel = getLocalizedString('%enhancedResources_tooltip_strongNumber%');
  const morphLabel = getLocalizedString('%enhancedResources_tooltip_morphology%');
  const notesLabel = getLocalizedString('%enhancedResources_tooltip_notes%');

  return (
    <Card
      role="tooltip"
      className="tw-max-w-sm tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md"
    >
      <CardContent className="tw-flex tw-flex-col tw-gap-1.5 tw-p-3 tw-text-sm">
        <div className="tw-flex tw-items-baseline tw-gap-2">
          <span className="tw-text-xs tw-font-semibold tw-uppercase tw-text-muted-foreground">
            {lemmaLabel}
          </span>
          <span className="tw-text-base tw-font-medium">{data.lemma}</span>
        </div>
        {data.gloss && (
          <div className="tw-flex tw-flex-col">
            <span className="tw-text-xs tw-font-semibold tw-uppercase tw-text-muted-foreground">
              {glossLabel}
            </span>
            <span>{data.gloss}</span>
          </div>
        )}
        {data.partOfSpeech && (
          <div className="tw-flex tw-flex-col">
            <span className="tw-text-xs tw-font-semibold tw-uppercase tw-text-muted-foreground">
              {posLabel}
            </span>
            <span className="tw-italic">{data.partOfSpeech}</span>
          </div>
        )}
        {data.strongNumber && (
          <div className="tw-flex tw-items-baseline tw-gap-2">
            <span className="tw-text-xs tw-font-semibold tw-uppercase tw-text-muted-foreground">
              {strongLabel}
            </span>
            <span className="tw-font-mono tw-text-xs">{data.strongNumber}</span>
          </div>
        )}
        {data.morphology && (
          <div className="tw-flex tw-flex-col">
            <span className="tw-text-xs tw-font-semibold tw-uppercase tw-text-muted-foreground">
              {morphLabel}
            </span>
            <span className="tw-font-mono tw-text-xs">{data.morphology}</span>
          </div>
        )}
        {data.notes.length > 0 && (
          <div className="tw-flex tw-flex-col tw-gap-0.5">
            <span className="tw-text-xs tw-font-semibold tw-uppercase tw-text-muted-foreground">
              {notesLabel}
            </span>
            <ul className="tw-flex tw-flex-col tw-gap-0.5 tw-pl-4 tw-text-xs">
              {data.notes.map((note) => (
                <li key={note} className="tw-list-disc">
                  {note}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default TempTooltipRenderer;
