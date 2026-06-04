import { Fragment, type ReactNode } from 'react';
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Label,
} from 'platform-bible-react';
import type { LocalizedStringValue } from 'platform-bible-utils';
import { Book, BookOpen, Image as ImageIcon, Info, MapPin } from 'lucide-react';

/**
 * Object containing all keys used for localization in this component. Mirrors the 19 strings from
 * PT9's `MarbleGuideForm.cs` (MarbleGuideForm_1 .. MarbleGuideForm_19) plus 3 chrome strings the
 * shadcn Dialog needs (title is reused for the dialog title, plus close-button label, checkbox
 * label, and an sr-only description).
 */
export const MARBLE_GUIDE_STRING_KEYS = Object.freeze([
  '%enhancedResources_marbleGuide_title%',
  '%enhancedResources_marbleGuide_description%',
  '%enhancedResources_marbleGuide_overview%',
  '%enhancedResources_marbleGuide_chooseMaterial%',
  '%enhancedResources_marbleGuide_aboutBlueHighlight%',
  '%enhancedResources_marbleGuide_blueWordTitle%',
  '%enhancedResources_marbleGuide_aboutBiblicalTerms%',
  '%enhancedResources_marbleGuide_aboutGrayHighlight%',
  '%enhancedResources_marbleGuide_grayWordTitle%',
  '%enhancedResources_marbleGuide_aboutOrangeHighlight%',
  '%enhancedResources_marbleGuide_orangeWordTitle%',
  '%enhancedResources_marbleGuide_thisHelpTopic%',
  '%enhancedResources_marbleGuide_tabsHeader%',
  '%enhancedResources_marbleGuide_tab_dictionary%',
  '%enhancedResources_marbleGuide_tab_encyclopedia%',
  '%enhancedResources_marbleGuide_tab_media%',
  '%enhancedResources_marbleGuide_tab_maps%',
  '%enhancedResources_marbleGuide_updateFrequently%',
  '%enhancedResources_marbleGuide_howToOpenGuide%',
  '%enhancedResources_marbleGuide_moreHelp%',
  '%enhancedResources_marbleGuide_close%',
  '%enhancedResources_marbleGuide_neverShowAgain%',
] as const);

type MarbleGuideLocalizedStringKey = (typeof MARBLE_GUIDE_STRING_KEYS)[number];
type MarbleGuideLocalizedStrings = {
  [key in MarbleGuideLocalizedStringKey]?: LocalizedStringValue;
};

export type MarbleGuideProps = {
  /** Whether the guide dialog is open. Controlled by the parent. */
  open: boolean;
  /**
   * Whether the "Don't show this again" checkbox is currently checked. Controlled by the parent;
   * the parent typically derives this from `!showGuide` and persists `showGuide = !neverShowAgain`
   * on close.
   */
  neverShowAgain: boolean;
  /** Fired when the user closes the dialog (Close button, Escape, or overlay click). */
  onClose?: () => void;
  /** Fired when the user toggles the "Don't show this again" checkbox. */
  onNeverShowAgainChange?: (next: boolean) => void;
  /**
   * Localized strings + loading flag. Loading flag is currently unused but follows the codebase
   * pattern.
   */
  localizedStringsWithLoadingState?: [MarbleGuideLocalizedStrings, boolean];
};

/**
 * Splits a localized template string at named placeholders (e.g. `{colorWord}`) and interleaves
 * React nodes for each placeholder. Returns an array of strings and ReactNode chunks suitable for
 * rendering inside a paragraph. Unknown placeholders are left as the literal placeholder text.
 *
 * Why not `formatReplacementString`? That utility produces a single string and is the right tool
 * for plain-text substitution. Here we need to inject React nodes (color chips, info icon, anchor)
 * without `dangerouslySetInnerHTML`, so we tokenize manually.
 */
function interleavePlaceholders(
  template: string,
  replacements: Record<string, ReactNode>,
): ReactNode[] {
  // Match {name} placeholders. Capture group 1 is the bare name. Split keeps the captures so we
  // can interleave them.
  const parts = template.split(/\{(\w+)\}/g);
  // Build the key from a stable per-position prefix (`t`/`p`/`u`) plus the template offset of each
  // chunk. The offset is unique per chunk because parts come from a single split, so this avoids
  // both array-index-as-key (chunks are stable across renders) and key collisions when the same
  // placeholder appears twice.
  let offset = 0;
  return parts.map((part, idx) => {
    const chunkOffset = offset;
    offset += part.length;
    // Even indices are literal text between placeholders; odd indices are placeholder names.
    if (idx % 2 === 0) {
      return <Fragment key={`t-${chunkOffset}`}>{part}</Fragment>;
    }
    if (part in replacements) {
      return <Fragment key={`p-${chunkOffset}-${part}`}>{replacements[part]}</Fragment>;
    }
    // Unknown placeholder - render the literal token so missing replacements are visible to
    // localizers rather than silently dropped.
    return <Fragment key={`u-${chunkOffset}-${part}`}>{`{${part}}`}</Fragment>;
  });
}

/**
 * Pure presentational MarbleGuide ("Getting started in Enhanced Resources") rendered as a shadcn
 * Dialog. Implements UI-PKG-008.
 *
 * Scope (design phase only):
 *
 * - Renders the localized 19-string guide content as React elements (no `dangerouslySetInnerHTML`).
 * - Uses theme-token colored chips for the research-term / found-rendering / needs-rendering visual
 *   metaphor (PT9 used hardcoded blue / gray / orange CSS; PT10's design system has no equivalent
 *   color tokens, so the chip uses primary / muted / destructive semantic tokens while the chip's
 *   localized **label** still says "blue" / "gray" / "orange" to match the colors users see in the
 *   actual ER scripture pane).
 * - "Don't show this again" checkbox is a controlled input - parent owns the bool and decides when to
 *   persist on close.
 *
 * Out of scope (phase-3-ui wiring):
 *
 * - Auto-show logic on first ER open per session (BHV-461)
 * - Settings persistence (ShowMarbleGuide read/write)
 * - Suppression handling on subsequent ER opens (TS-066, TS-067)
 * - Owner activation tracking (PT9-specific WinForms quirk; rc-dock handles this in PT10)
 * - Swap from shadcn Dialog to paranext-core overlay-service Dialog (Theme 14 strategic note)
 *
 * Acceptance criteria covered (UI-PKG-008):
 *
 * - Localized HTML content (19 keys) via React structural rendering + placeholder interleaving
 * - Color-coded word highlighting examples (research-term / found-rendering / needs-rendering)
 * - Research tab icon descriptions (4-column grid matching the toolbar tabs)
 * - "Don't show this again" checkbox with controlled initial state
 * - Close button fires `onClose` (parent persists preference)
 * - Shadcn Dialog provides Tab navigation + Escape close + focus management automatically
 * - Accessibility: DialogTitle is announced; sr-only DialogDescription provides a11y context; color
 *   chips have aria-hidden so the localized color word is read once
 */
export function MarbleGuide({
  open,
  neverShowAgain,
  onClose = () => {},
  onNeverShowAgainChange = () => {},
  localizedStringsWithLoadingState = [{}, false],
}: MarbleGuideProps) {
  const getLocalizedString = (key: MarbleGuideLocalizedStringKey) =>
    localizedStringsWithLoadingState[0][key] ?? key;

  const titleLabel = String(getLocalizedString('%enhancedResources_marbleGuide_title%'));
  const descriptionLabel = String(
    getLocalizedString('%enhancedResources_marbleGuide_description%'),
  );
  const overview = String(getLocalizedString('%enhancedResources_marbleGuide_overview%'));
  const chooseMaterial = String(
    getLocalizedString('%enhancedResources_marbleGuide_chooseMaterial%'),
  );
  const aboutBlueTemplate = String(
    getLocalizedString('%enhancedResources_marbleGuide_aboutBlueHighlight%'),
  );
  const blueWord = String(getLocalizedString('%enhancedResources_marbleGuide_blueWordTitle%'));
  const aboutBiblicalTerms = String(
    getLocalizedString('%enhancedResources_marbleGuide_aboutBiblicalTerms%'),
  );
  const aboutGrayTemplate = String(
    getLocalizedString('%enhancedResources_marbleGuide_aboutGrayHighlight%'),
  );
  const grayWord = String(getLocalizedString('%enhancedResources_marbleGuide_grayWordTitle%'));
  const aboutOrangeTemplate = String(
    getLocalizedString('%enhancedResources_marbleGuide_aboutOrangeHighlight%'),
  );
  const orangeWord = String(getLocalizedString('%enhancedResources_marbleGuide_orangeWordTitle%'));
  const thisHelpTopic = String(getLocalizedString('%enhancedResources_marbleGuide_thisHelpTopic%'));
  const tabsHeader = String(getLocalizedString('%enhancedResources_marbleGuide_tabsHeader%'));
  const tabDictionary = String(
    getLocalizedString('%enhancedResources_marbleGuide_tab_dictionary%'),
  );
  const tabEncyclopedia = String(
    getLocalizedString('%enhancedResources_marbleGuide_tab_encyclopedia%'),
  );
  const tabMedia = String(getLocalizedString('%enhancedResources_marbleGuide_tab_media%'));
  const tabMaps = String(getLocalizedString('%enhancedResources_marbleGuide_tab_maps%'));
  const updateFrequently = String(
    getLocalizedString('%enhancedResources_marbleGuide_updateFrequently%'),
  );
  const howToOpenGuideTemplate = String(
    getLocalizedString('%enhancedResources_marbleGuide_howToOpenGuide%'),
  );
  const moreHelp = String(getLocalizedString('%enhancedResources_marbleGuide_moreHelp%'));
  const closeLabel = String(getLocalizedString('%enhancedResources_marbleGuide_close%'));
  const neverShowAgainLabel = String(
    getLocalizedString('%enhancedResources_marbleGuide_neverShowAgain%'),
  );

  // Color chips. The localized color word ("blue", "gray", "orange") is the visible label so the
  // text still names the color users see in the actual ER. The chip background uses semantic
  // theme tokens because the lint rule blocks hardcoded blue/gray/orange Tailwind classes and
  // there are no blue/gray/orange theme tokens in the current design system.
  const blueChip = (
    <span
      className="tw-rounded tw-bg-primary tw-px-1.5 tw-py-0.5 tw-font-medium tw-text-primary-foreground"
      data-testid="marble-guide-color-chip-blue"
    >
      {blueWord}
    </span>
  );
  const grayChip = (
    <span
      className="tw-rounded tw-bg-muted tw-px-1.5 tw-py-0.5 tw-font-medium tw-text-muted-foreground"
      data-testid="marble-guide-color-chip-gray"
    >
      {grayWord}
    </span>
  );
  const orangeChip = (
    <span
      className="tw-rounded tw-bg-destructive tw-px-1.5 tw-py-0.5 tw-font-medium tw-text-destructive-foreground"
      data-testid="marble-guide-color-chip-orange"
    >
      {orangeWord}
    </span>
  );
  const helpLink = (
    // PT9 used a `help:055de6ffc352` URI handler. Phase-3-ui wiring will resolve the help target;
    // for the design phase the link is rendered visually but does not navigate (button-as-link
    // with no-op handler).
    <button
      type="button"
      className="tw-cursor-pointer tw-text-primary tw-underline focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring"
      onClick={() => {}}
      data-testid="marble-guide-help-link"
    >
      {thisHelpTopic}
    </button>
  );
  const infoIconChip = (
    <span
      className="tw-inline-flex tw-h-5 tw-w-5 tw-items-center tw-justify-center tw-rounded tw-border tw-border-border tw-bg-muted tw-align-text-bottom"
      aria-hidden
    >
      <Info className="tw-h-3.5 tw-w-3.5 tw-text-muted-foreground" aria-hidden />
    </span>
  );

  // shadcn Dialog's `onOpenChange` fires for Escape, click-outside, and the built-in close button.
  // Forward `false` through `onClose` so the parent can persist the never-show-again preference.
  const handleOpenChange = (next: boolean) => {
    if (!next) onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="tw-flex tw-max-h-[80vh] tw-max-w-2xl tw-flex-col tw-gap-0 tw-p-0"
        data-testid="marble-guide"
      >
        <DialogHeader className="tw-border-b tw-border-border tw-px-6 tw-py-4">
          <DialogTitle data-testid="marble-guide-title">{titleLabel}</DialogTitle>
          <DialogDescription className="tw-sr-only">{descriptionLabel}</DialogDescription>
        </DialogHeader>

        {/* Scrollable body. PT9 used a 725x465 fixed-size FixedDialog window; PT10 uses a max-
            height + overflow-y so the dialog adapts to viewport while still scrolling content. */}
        <div
          className="tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-3 tw-overflow-y-auto tw-px-6 tw-py-4 tw-text-sm tw-leading-relaxed"
          data-testid="marble-guide-content"
        >
          <p>{overview}</p>

          <p>{chooseMaterial}</p>

          <p>
            <strong>{interleavePlaceholders(aboutBlueTemplate, { colorWord: blueChip })}</strong>
          </p>

          <p>{aboutBiblicalTerms}</p>

          <p>{interleavePlaceholders(aboutGrayTemplate, { colorWord: grayChip })}</p>

          <p>
            {interleavePlaceholders(aboutOrangeTemplate, {
              colorWord: orangeChip,
              helpLink,
            })}
          </p>

          <p className="tw-pt-2 tw-font-semibold">{tabsHeader}</p>
          <div
            className="tw-grid tw-grid-cols-4 tw-gap-2 tw-rounded tw-border tw-border-border tw-bg-muted/30 tw-p-3 tw-text-center"
            data-testid="marble-guide-tab-grid"
          >
            <div className="tw-flex tw-flex-col tw-items-center tw-gap-1">
              <BookOpen className="tw-h-6 tw-w-6 tw-text-foreground" aria-hidden />
              <span className="tw-text-xs">{tabDictionary}</span>
            </div>
            <div className="tw-flex tw-flex-col tw-items-center tw-gap-1">
              <Book className="tw-h-6 tw-w-6 tw-text-foreground" aria-hidden />
              <span className="tw-text-xs">{tabEncyclopedia}</span>
            </div>
            <div className="tw-flex tw-flex-col tw-items-center tw-gap-1">
              <ImageIcon className="tw-h-6 tw-w-6 tw-text-foreground" aria-hidden />
              <span className="tw-text-xs">{tabMedia}</span>
            </div>
            <div className="tw-flex tw-flex-col tw-items-center tw-gap-1">
              <MapPin className="tw-h-6 tw-w-6 tw-text-foreground" aria-hidden />
              <span className="tw-text-xs">{tabMaps}</span>
            </div>
          </div>

          <p className="tw-pt-2">{updateFrequently}</p>

          <p>{interleavePlaceholders(howToOpenGuideTemplate, { infoIcon: infoIconChip })}</p>

          <p>
            <button
              type="button"
              className="tw-cursor-pointer tw-text-primary tw-underline focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring"
              onClick={() => {}}
              data-testid="marble-guide-more-help-link"
            >
              {moreHelp}
            </button>
          </p>
        </div>

        <DialogFooter className="tw-flex tw-flex-row tw-items-center tw-justify-between tw-gap-3 tw-border-t tw-border-border tw-px-6 tw-py-3 sm:tw-justify-between">
          <Button
            type="button"
            variant="default"
            onClick={onClose}
            data-testid="marble-guide-close"
          >
            {closeLabel}
          </Button>
          <div className="tw-flex tw-items-center tw-gap-2">
            <Checkbox
              id="marble-guide-never-show-again"
              checked={neverShowAgain}
              onCheckedChange={(next) => onNeverShowAgainChange(next === true)}
              data-testid="marble-guide-never-show-again"
            />
            <Label
              htmlFor="marble-guide-never-show-again"
              className="tw-cursor-pointer tw-text-sm tw-font-normal"
            >
              {neverShowAgainLabel}
            </Label>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default MarbleGuide;
