/**
 * Pure-TypeScript presentation module that adapts the C# `DictionaryEntryData` DTO (returned by
 * PAPI command `object:platform.enhancedResources.readDictionaryEntry`, see
 * `.context/features/enhanced-resources/data-contracts.md` §4.8) to the React UI types consumed by
 * `DictionaryTab` / `DictionaryEntryDetail` / `DictionarySenseItem`.
 *
 * Intentionally pure: no React, no PAPI, no async, no I/O. All settings, translation lookups,
 * transliteration, and per-token relevance/occurrence data are injected by the caller via
 * {@link DictionaryPresenterOptions}.
 *
 * Forward-note coverage:
 *
 * - **FN-019** — Backend C# loader gaps for `Sense.Comments`, `Lexicon_Note`, `LEXSubDomains`. Inputs
 *   may arrive with these fields undefined; the presenter still emits the entry with empty strings
 *   and `domains: []`. The UI ships visually-empty rows; backend fills the data later without a
 *   presenter change.
 * - **FN-021** — Dictionary `Domain:` rows must be clickable, opening SDV filtered-by-domain. Each
 *   domain is emitted as a structured {@link DomainLink} carrying both the display label and the
 *   click payload.
 * - **FN-022** — Sense-level occurrences link is number-only with a descriptive tooltip. Each sense
 *   gets `senseOccurrences: { count, tooltip }`.
 */

// ---------------------------------------------------------------------------
// Input types
// ---------------------------------------------------------------------------

/** Minimal verse reference shape consumed by `formatVerseRange`. */
export interface VerseRef {
  book: number;
  chapter: number;
  verse: number;
}

/** Gloss as emitted by the C# DTO. */
interface DictionaryGlossInput {
  language: string;
  text: string;
}

/** Domain entry as it (will) arrive from the C# DTO once FN-019 lands. */
interface DictionarySubDomainInput {
  id: string;
  label: string;
  domainPath: string;
}

/**
 * Sense as it arrives today, plus the FN-019 forward fields admitted as optional so the presenter
 * handles both today's and post-FN-019 backend payloads without a type change.
 */
interface DictionarySenseInput {
  senseId: string;
  definition: string;
  glosses: DictionaryGlossInput[];
  /** Total occurrences of this sense across all loaded references (from LEXReferences in XML). */
  occurrenceCount?: number;
  /** FN-019 forward field: backend `Sense.Comments`. */
  comments?: string;
  /** FN-019 forward field: backend `Lexicon_Note`. */
  lexiconNote?: string;
  /** FN-019 forward field: backend `LEXSubDomains` flattened to display rows. */
  subDomains?: DictionarySubDomainInput[];
}

/** Related lexeme cross-reference. */
interface RelatedLexemeInput {
  lemma: string;
  entryId: string;
  relationship: string;
  gloss: string;
}

/**
 * Extended `DictionaryEntryData` input — the contract DTO plus optional FN-019 forward fields on
 * senses. Any present field is honored; any absent field collapses to the documented default in the
 * output.
 */
export interface DictionaryEntryDataInput {
  entryId: string;
  lemma: string;
  morphology: string;
  semanticDomains: string[];
  relatedLexemes: RelatedLexemeInput[];
  senses: DictionarySenseInput[];
}

// ---------------------------------------------------------------------------
// Options
// ---------------------------------------------------------------------------

export interface DictionaryPresenterOptions {
  /** Preferred gloss language (e.g. `'en'`). */
  glossLanguage: string;
  /** Drives `dictionaryId` and which display-mode setting applies. */
  resourceLanguage: 'heb' | 'grc';
  hebrewDisplayMode: 'script' | 'translit' | 'both';
  greekDisplayMode: 'script' | 'translit' | 'both';
  /** When true, non-relevant senses are filtered out (and survivors are renumbered). */
  hideLessRelevantSenses: boolean;
  /** Senses whose `senseId` is in this set are considered relevant. */
  relevantSenseIds: Set<string>;
  /** The lexeme being shown (used in tooltips and elsewhere by the caller's templates). */
  lexeme: string;
  /** Total occurrences of this lemma across all loaded books. */
  totalOccurrencesCount: number;
  /** Pure transliteration helper (caller supplies — keeps presenter pure). */
  transliterate: (lemma: string) => string;
  /** Pure POS translator (e.g. localized lookup). Not invoked when morphology is empty. */
  translatePartOfSpeech: (raw: string) => string;
  /** Sparse map: senseId -> verse references. Missing senses => count 0. */
  verseOccurrencesBySenseId: Record<string, VerseRef[]>;
  /** Caller-owned (localized) tooltip template builder for sense-level occurrences. */
  formatSenseOccurrencesTooltip: (args: {
    senseNumber: number;
    lexeme: string;
    count: number;
    verseRangeLabel: string;
  }) => string;
  /** Caller-owned verse-range summary formatter; receives the same refs the count was derived from. */
  formatVerseRange: (refs: VerseRef[]) => string;
}

// ---------------------------------------------------------------------------
// Output types
// ---------------------------------------------------------------------------

/** A clickable semantic-domain link, FN-021. */
export interface DomainLink {
  id: string;
  label: string;
  domainPath: string;
  dictionaryId: 'SDBH' | 'SDBG';
}

/** A single sense as the UI will render it. */
export interface DictionarySensePresentation {
  id: string;
  senseNumber: number;
  definition: string;
  glosses: string;
  domains: DomainLink[];
  notes: string;
  comment: string;
  commentsAndNotes: string;
  isRelevant: boolean;
  senseOccurrences: {
    count: number;
    tooltip: string;
  };
}

/** Top-level entry as the UI will render it. */
export interface DictionaryEntryPresentation {
  tokenId: string;
  sourceText: string;
  translit: string;
  displaySource: string;
  partOfSpeech: string;
  totalOccurrencesInAllBooks: number;
  dictionaryId: 'SDBH' | 'SDBG';
  senses: DictionarySensePresentation[];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function pickGloss(glosses: DictionaryGlossInput[], preferredLanguage: string): string {
  if (glosses.length === 0) return '';
  const match = glosses.find((g) => g.language === preferredLanguage);
  if (match) return match.text;
  return glosses[0].text;
}

function buildDisplaySource(
  lemma: string,
  mode: 'script' | 'translit' | 'both',
  transliterate: (lemma: string) => string,
): string {
  switch (mode) {
    case 'translit':
      return transliterate(lemma);
    case 'both':
      return `${lemma} (${transliterate(lemma)})`;
    case 'script':
    default:
      return lemma;
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Adapt a `DictionaryEntryData` DTO into the shape the React UI consumes.
 *
 * Returns `undefined` when no entry is supplied so the caller can render an empty/loading state
 * without a guard at every call site.
 */
export function presentDictionaryEntry(
  input: DictionaryEntryDataInput | undefined,
  options: DictionaryPresenterOptions,
): DictionaryEntryPresentation | undefined {
  if (!input) return undefined;

  const dictionaryId: 'SDBH' | 'SDBG' = options.resourceLanguage === 'heb' ? 'SDBH' : 'SDBG';

  const displayMode =
    options.resourceLanguage === 'heb' ? options.hebrewDisplayMode : options.greekDisplayMode;

  const partOfSpeech = input.morphology ? options.translatePartOfSpeech(input.morphology) : '';

  // Optionally filter out non-relevant senses BEFORE numbering (FN: hide-less-relevant toggle).
  const visibleSenses = options.hideLessRelevantSenses
    ? input.senses.filter((s) => options.relevantSenseIds.has(s.senseId))
    : input.senses;

  const senses: DictionarySensePresentation[] = visibleSenses.map((sense, index) => {
    const senseNumber = index + 1;
    const isRelevant = options.relevantSenseIds.has(sense.senseId);

    const refs = options.verseOccurrencesBySenseId[sense.senseId] ?? [];
    const count = sense.occurrenceCount ?? refs.length;
    const verseRangeLabel = options.formatVerseRange(refs);
    const tooltip = options.formatSenseOccurrencesTooltip({
      senseNumber,
      lexeme: options.lexeme,
      count,
      verseRangeLabel,
    });

    const domains: DomainLink[] = (sense.subDomains ?? []).map((d) => ({
      id: d.id,
      label: d.label,
      domainPath: d.domainPath,
      dictionaryId,
    }));

    return {
      id: sense.senseId,
      senseNumber,
      definition: sense.definition,
      glosses: pickGloss(sense.glosses, options.glossLanguage),
      domains,
      notes: sense.lexiconNote ?? '',
      comment: sense.comments ?? '',
      commentsAndNotes: '',
      isRelevant,
      senseOccurrences: {
        count,
        tooltip,
      },
    };
  });

  return {
    tokenId: input.entryId,
    sourceText: input.lemma,
    translit: options.transliterate(input.lemma),
    displaySource: buildDisplaySource(input.lemma, displayMode, options.transliterate),
    partOfSpeech,
    totalOccurrencesInAllBooks: options.totalOccurrencesCount,
    dictionaryId,
    senses,
  };
}
