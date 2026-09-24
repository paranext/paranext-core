import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  cn,
} from 'platform-bible-react';
import type { LocalizedStringValue } from 'platform-bible-utils';
import { Fragment } from 'react';

/** Object containing all keys used for localization in this component. */
export const DICTIONARY_SENSE_ITEM_STRING_KEYS = Object.freeze([
  '%enhancedResources_dictionary_sense_glossesLabel%',
  '%enhancedResources_dictionary_sense_domainLabel%',
  '%enhancedResources_dictionary_sense_notesLabel%',
  '%enhancedResources_dictionary_sense_commentLabel%',
  '%enhancedResources_dictionary_sense_commentsAndNotesLabel%',
  '%enhancedResources_dictionary_sense_occurrencesInAllBooks%',
  '%enhancedResources_dictionary_sense_lessRelevantLabel%',
] as const);

type DictionarySenseItemLocalizedStringKey = (typeof DICTIONARY_SENSE_ITEM_STRING_KEYS)[number];
type DictionarySenseItemLocalizedStrings = {
  [key in DictionarySenseItemLocalizedStringKey]?: LocalizedStringValue;
};

/**
 * A semantic-domain reference label rendered inside a sense row [Revised: UI-PKG-007].
 *
 * `id` and `label` drive the visible display. The optional `domainPath` and `dictionaryId` carry
 * the full {@link DomainLink} payload (FN-021) so the parent can dispatch a
 * SemanticDomainViewer-open with a real filtered-list target. When both are present AND the parent
 * provides `onDomainClick`, the domain row becomes a clickable Button (variant=link) with a stable
 * `data-testid` per row; otherwise the row falls back to plain text (legacy behaviour).
 */
export type DictionarySenseDomain = {
  id: string;
  label: string;
  /** Slash-delimited path from root to this domain (e.g. "5/5.1/5.1.1"). */
  domainPath?: string;
  /** Which marble dictionary this domain belongs to. */
  dictionaryId?: 'SDBH' | 'SDBG';
};

/**
 * Display data for a single dictionary sense [Revised: 2026-04-29 Theme 15]. Mirrors PT9's
 * sense-row layout: a sense number, a description, an "Occurrences in all books" link, and an
 * optional definition table with Glosses/Domain/Notes/Comment/Comments-and-Notes rows.
 *
 * Pure presentational - no domain-specific knowledge.
 */
export type DictionarySenseDisplay = {
  /** Sense id (used as key, callback payload). */
  id: string;
  /** Sense number (1-based; rendered as "1.", "2.", ...). */
  senseNumber: number;
  /** Definition / description text for this sense. */
  definition: string;
  /** Single Glosses string (already localized; PT9 renders one Glosses row even if multiple). */
  glosses?: string;
  /**
   * Repeatable Domain rows (each rendered on its own line). Optional - empty/undefined hides the
   * row entirely. Backend producer is FN-019 (LEXSubDomains for SDBG; SDBH already loads).
   */
  domains?: DictionarySenseDomain[];
  /** Optional Notes row (PT9 sense-level Lexicon_Note; FN-019 backend follow-up). */
  notes?: string;
  /** Optional Comment row (PT9 Sense.Comments; FN-019 backend follow-up). */
  comment?: string;
  /** Optional Comments and Notes row (PT9 combined commentary; FN-019 backend follow-up). */
  commentsAndNotes?: string;
  /**
   * Total occurrences in all books (rendered in the link label, e.g., "Occurrences in all books
   * (32)").
   */
  occurrencesInAllBooksCount?: number;
  /**
   * Whether this sense is "relevant" for the current verse / context. Less-relevant senses are
   * grayed out (when shown) or hidden completely (when hideLessRelevant is true).
   */
  isRelevant: boolean;
  /**
   * FN-022: optional descriptive tooltip displayed on hover/focus of the sense-level occurrences
   * link. When present, the visible label collapses to `(N)` and the localized "Occurrences in all
   * books" prefix moves into the tooltip's prose. The presenter
   * (`presentDictionaryEntry.senses[i].senseOccurrences.tooltip`) supplies the localized text.
   */
  occurrencesTooltip?: string;
};

export type DictionarySenseItemProps = {
  /** The sense data to display. */
  sense: DictionarySenseDisplay;
  /** When true less-relevant senses are hidden entirely; when false they are shown but grayed. */
  hideLessRelevant?: boolean;
  /** Callback when the "Occurrences in all books" link is clicked - parent routes to MarbleForm. */
  onSenseOccurrencesClick?: (senseId: string) => void;
  /**
   * FN-021 [UI-PKG-007]: callback fired when a Domain row in the sense definition table is clicked.
   * When provided AND the domain carries `domainPath` + `dictionaryId`, each Domain row renders as
   * a clickable Button (variant=link) instead of plain text. Parents typically dispatch a
   * SemanticDomainViewer-open with the full DomainLink payload.
   */
  onDomainClick?: (domain: DictionarySenseDomain) => void;
  /** Forwarded localized strings. */
  localizedStringsWithLoadingState?: [DictionarySenseItemLocalizedStrings, boolean];
};

/**
 * Render the value cell of a single row in the sense definition table. Domain rows render as a
 * clickable Button (variant=link) when the parent supplies `onDomainClick` AND the domain carries
 * the full {domainPath, dictionaryId} payload (FN-021 / UI-PKG-007). All other rows render as plain
 * text. Extracted into a helper to avoid nested-ternary lint violations and keep the JSX in
 * `DictionarySenseItem` shallow.
 */
function renderRowValue(
  row:
    | { kind: 'text'; value: string }
    | { kind: 'domain'; index: number; domain: DictionarySenseDomain },
  senseId: string,
  onDomainClick: ((domain: DictionarySenseDomain) => void) | undefined,
) {
  if (row.kind === 'text') return row.value;
  const isClickable =
    onDomainClick !== undefined &&
    row.domain.domainPath !== undefined &&
    row.domain.dictionaryId !== undefined;
  if (!isClickable) return row.domain.label;
  return (
    <Button
      variant="link"
      className="tw:h-auto tw:p-0 tw:text-xs"
      data-testid={`dictionary-sense-domain-${senseId}-${row.index}`}
      onClick={() => onDomainClick?.(row.domain)}
    >
      {row.domain.label}
    </Button>
  );
}

/**
 * Pure presentational sense row used by DictionaryEntryDetail. [Revised: 2026-04-29 Theme 5]
 *
 * Layout matches PT9's sense block:
 *
 * 1. <description> Occurrences in all books (N) Glosses: <gloss> Domain: <domain 1> Domain: <domain 2>
 *    Notes: <notes> Comment: <comment> Comments and Notes: <both>
 *
 * Optional rows are conditionally rendered. Less-relevant senses are dimmed (when shown) or
 * unrendered (when `hideLessRelevant` is true).
 *
 * Note: Domain/Notes/Comment fields require backend FN-019 (load Sense.Comments, Lexicon_Note,
 * LEXSubDomains in C# loader). UI shows blank rows until backend ships.
 */
export function DictionarySenseItem({
  sense,
  hideLessRelevant = false,
  onSenseOccurrencesClick = () => {},
  onDomainClick,
  localizedStringsWithLoadingState = [{}, false],
}: DictionarySenseItemProps) {
  const getLocalizedString = (key: DictionarySenseItemLocalizedStringKey) =>
    localizedStringsWithLoadingState[0][key] ?? key;

  if (!sense.isRelevant && hideLessRelevant) {
    return undefined;
  }

  const dimmed = !sense.isRelevant;
  const glossesLabel = String(
    getLocalizedString('%enhancedResources_dictionary_sense_glossesLabel%'),
  );
  const domainLabel = String(
    getLocalizedString('%enhancedResources_dictionary_sense_domainLabel%'),
  );
  const notesLabel = String(getLocalizedString('%enhancedResources_dictionary_sense_notesLabel%'));
  const commentLabel = String(
    getLocalizedString('%enhancedResources_dictionary_sense_commentLabel%'),
  );
  const commentsAndNotesLabel = String(
    getLocalizedString('%enhancedResources_dictionary_sense_commentsAndNotesLabel%'),
  );
  const occurrencesLinkLabel = String(
    getLocalizedString('%enhancedResources_dictionary_sense_occurrencesInAllBooks%'),
  );
  const lessRelevantLabel = String(
    getLocalizedString('%enhancedResources_dictionary_sense_lessRelevantLabel%'),
  );

  const occurrenceCount = sense.occurrencesInAllBooksCount;
  // FN-022: when the presenter provides a descriptive tooltip, render the link label as `(N)` only
  // and wrap the link in a Tooltip carrying the prose. Without a tooltip we keep the legacy PT9
  // surface ("Occurrences in all books (N)") so existing storybook fixtures stay valid.
  const fn022Mode = typeof sense.occurrencesTooltip === 'string' && sense.occurrencesTooltip !== '';
  let linkText: string;
  if (fn022Mode) {
    linkText = `(${occurrenceCount ?? 0})`;
  } else if (typeof occurrenceCount === 'number') {
    linkText = `${occurrencesLinkLabel} (${occurrenceCount})`;
  } else {
    linkText = occurrencesLinkLabel;
  }

  // Build the table rows declaratively so optional rows are conditionally rendered. Domain rows
  // carry the full DictionarySenseDomain payload so the value cell can render as a clickable
  // Button (FN-021 / UI-PKG-007) when the parent supplies an `onDomainClick` and the domain has
  // a `domainPath` + `dictionaryId`. All other rows are plain text.
  type TextRow = { kind: 'text'; key: string; label: string; value: string };
  type DomainRow = {
    kind: 'domain';
    key: string;
    label: string;
    domain: DictionarySenseDomain;
    /** Stable index inside the row's sense block; drives `data-testid` and React keys. */
    index: number;
  };
  type Row = TextRow | DomainRow;
  const tableRows: Row[] = [];
  if (sense.glosses) {
    tableRows.push({ kind: 'text', key: 'glosses', label: glossesLabel, value: sense.glosses });
  }
  (sense.domains ?? []).forEach((domain, idx) => {
    tableRows.push({
      kind: 'domain',
      // domain.id may repeat across senses, so include the local index for stability inside
      // this sense block.
      key: `domain-${idx}-${domain.id}`,
      label: domainLabel,
      domain,
      index: idx,
    });
  });
  if (sense.notes) {
    tableRows.push({ kind: 'text', key: 'notes', label: notesLabel, value: sense.notes });
  }
  if (sense.comment) {
    tableRows.push({ kind: 'text', key: 'comment', label: commentLabel, value: sense.comment });
  }
  if (sense.commentsAndNotes) {
    tableRows.push({
      kind: 'text',
      key: 'comments-and-notes',
      label: commentsAndNotesLabel,
      value: sense.commentsAndNotes,
    });
  }

  return (
    <div
      role="group"
      aria-label={dimmed ? lessRelevantLabel : undefined}
      data-testid={`dictionary-sense-${sense.id}`}
      className={cn(
        'tw:flex tw:flex-col tw:gap-2 tw:rounded tw:border tw:border-border tw:bg-background tw:p-2',
        dimmed && 'tw:opacity-60',
      )}
    >
      <div className="tw:flex tw:flex-wrap tw:items-baseline tw:gap-2">
        <span className="tw:shrink-0 tw:text-sm tw:font-semibold tw:tabular-nums">
          {sense.senseNumber}.
        </span>
        {sense.definition && <span className="tw:flex-1 tw:text-sm">{sense.definition}</span>}
        {fn022Mode ? (
          <TooltipProvider delayDuration={150}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="link"
                  className="tw:h-auto tw:shrink-0 tw:p-0 tw:text-xs"
                  onClick={() => onSenseOccurrencesClick(sense.id)}
                  aria-label={sense.occurrencesTooltip}
                  data-testid={`dictionary-sense-occurrences-${sense.id}`}
                >
                  {linkText}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{sense.occurrencesTooltip}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <Button
            variant="link"
            className="tw:h-auto tw:shrink-0 tw:p-0 tw:text-xs"
            onClick={() => onSenseOccurrencesClick(sense.id)}
            data-testid={`dictionary-sense-occurrences-${sense.id}`}
          >
            {linkText}
          </Button>
        )}
      </div>
      {tableRows.length > 0 && (
        <dl className="tw:grid tw:grid-cols-[max-content_1fr] tw:gap-x-3 tw:gap-y-1 tw:pl-6 tw:text-xs">
          {tableRows.map((row) => (
            <Fragment key={row.key}>
              <dt className="tw:font-semibold tw:text-muted-foreground">{row.label}</dt>
              <dd className="tw:m-0">{renderRowValue(row, sense.id, onDomainClick)}</dd>
            </Fragment>
          ))}
        </dl>
      )}
    </div>
  );
}

export default DictionarySenseItem;
