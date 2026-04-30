import { Button, cn } from 'platform-bible-react';
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
  '%enhancedResources_dictionary_sense_nonRelevantLabel%',
] as const);

type DictionarySenseItemLocalizedStringKey = (typeof DICTIONARY_SENSE_ITEM_STRING_KEYS)[number];
type DictionarySenseItemLocalizedStrings = {
  [key in DictionarySenseItemLocalizedStringKey]?: LocalizedStringValue;
};

/** A semantic-domain reference label (display-only at the sense level). */
export type DictionarySenseDomain = {
  id: string;
  label: string;
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
   * Whether this sense is "relevant" for the current verse / context. Non-relevant senses are
   * grayed out (when shown) or hidden completely (when hideNonRelevant is true).
   */
  isRelevant: boolean;
};

export type DictionarySenseItemProps = {
  /** The sense data to display. */
  sense: DictionarySenseDisplay;
  /** When true non-relevant senses are hidden entirely; when false they are shown but grayed. */
  hideNonRelevant?: boolean;
  /** Callback when the "Occurrences in all books" link is clicked - parent routes to MarbleForm. */
  onSenseOccurrencesClick?: (senseId: string) => void;
  /** Forwarded localized strings. */
  localizedStringsWithLoadingState?: [DictionarySenseItemLocalizedStrings, boolean];
};

/**
 * Pure presentational sense row used by DictionaryEntryDetail. [Revised: 2026-04-29 Theme 5]
 *
 * Layout matches PT9's sense block:
 *
 * 1. <description> Occurrences in all books (N) Glosses: <gloss> Domain: <domain 1> Domain: <domain 2>
 *    Notes: <notes> Comment: <comment> Comments and Notes: <both>
 *
 * Optional rows are conditionally rendered. Non-relevant senses are dimmed (when shown) or
 * unrendered (when `hideNonRelevant` is true).
 *
 * Note: Domain/Notes/Comment fields require backend FN-019 (load Sense.Comments, Lexicon_Note,
 * LEXSubDomains in C# loader). UI shows blank rows until backend ships.
 */
export function DictionarySenseItem({
  sense,
  hideNonRelevant = false,
  onSenseOccurrencesClick = () => {},
  localizedStringsWithLoadingState = [{}, false],
}: DictionarySenseItemProps) {
  const getLocalizedString = (key: DictionarySenseItemLocalizedStringKey) =>
    localizedStringsWithLoadingState[0][key] ?? key;

  if (!sense.isRelevant && hideNonRelevant) {
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
  const nonRelevantLabel = String(
    getLocalizedString('%enhancedResources_dictionary_sense_nonRelevantLabel%'),
  );

  const occurrenceCount = sense.occurrencesInAllBooksCount;
  const linkText =
    typeof occurrenceCount === 'number'
      ? `${occurrencesLinkLabel} (${occurrenceCount})`
      : occurrencesLinkLabel;

  // Build the table rows declaratively so optional rows are conditionally rendered.
  type Row = { key: string; label: string; value: string };
  const tableRows: Row[] = [];
  if (sense.glosses) {
    tableRows.push({ key: 'glosses', label: glossesLabel, value: sense.glosses });
  }
  (sense.domains ?? []).forEach((domain, idx) => {
    tableRows.push({
      // domain.id may repeat across senses, so include the local index for stability inside
      // this sense block.
      key: `domain-${idx}-${domain.id}`,
      label: domainLabel,
      value: domain.label,
    });
  });
  if (sense.notes) {
    tableRows.push({ key: 'notes', label: notesLabel, value: sense.notes });
  }
  if (sense.comment) {
    tableRows.push({ key: 'comment', label: commentLabel, value: sense.comment });
  }
  if (sense.commentsAndNotes) {
    tableRows.push({
      key: 'comments-and-notes',
      label: commentsAndNotesLabel,
      value: sense.commentsAndNotes,
    });
  }

  return (
    <div
      role="group"
      aria-label={dimmed ? nonRelevantLabel : undefined}
      data-testid={`dictionary-sense-${sense.id}`}
      className={cn(
        'tw-flex tw-flex-col tw-gap-2 tw-rounded tw-border tw-border-border tw-bg-background tw-p-2',
        dimmed && 'tw-opacity-60',
      )}
    >
      <div className="tw-flex tw-flex-wrap tw-items-baseline tw-gap-2">
        <span className="tw-shrink-0 tw-text-sm tw-font-semibold tw-tabular-nums">
          {sense.senseNumber}.
        </span>
        <span className="tw-flex-1 tw-text-sm">{sense.definition}</span>
        <Button
          variant="link"
          className="tw-h-auto tw-shrink-0 tw-p-0 tw-text-xs"
          onClick={() => onSenseOccurrencesClick(sense.id)}
          data-testid={`dictionary-sense-occurrences-${sense.id}`}
        >
          {linkText}
        </Button>
      </div>
      {tableRows.length > 0 && (
        <dl className="tw-grid tw-grid-cols-[max-content_1fr] tw-gap-x-3 tw-gap-y-1 tw-pl-6 tw-text-xs">
          {tableRows.map((row) => (
            <Fragment key={row.key}>
              <dt className="tw-font-semibold tw-text-muted-foreground">{row.label}</dt>
              <dd className="tw-m-0">{row.value}</dd>
            </Fragment>
          ))}
        </dl>
      )}
    </div>
  );
}

export default DictionarySenseItem;
