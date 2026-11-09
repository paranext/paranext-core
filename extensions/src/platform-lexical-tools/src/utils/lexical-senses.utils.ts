import { Entry, Occurrence, OccurrencesBySourceTextId, Sense } from 'platform-lexical-tools';

/**
 * Sense IDs are 15 digits. The last three identify a contextual meaning within its lexical meaning;
 * `000` means the sense is the lexical meaning itself.
 */
const CONTEXTUAL_SENSE_ID_REGEX = /^(\d{12})(?!000)\d{3}$/;

function getParentLexicalSenseId(senseId: string): string | undefined {
  const match = senseId.match(CONTEXTUAL_SENSE_ID_REGEX);
  return match ? `${match[1]}000` : undefined;
}

function getOccurrenceKey({ verseRef, wordNum }: Occurrence): string {
  return `${verseRef.book} ${verseRef.chapterNum}:${verseRef.verseNum} ${wordNum}`;
}

function mergeOccurrences(
  target: OccurrencesBySourceTextId,
  source: OccurrencesBySourceTextId,
): void {
  Object.entries(source).forEach(([sourceTextId, occurrences]) => {
    if (!occurrences) return;
    const merged = target[sourceTextId] ?? [];
    const seen = new Set(merged.map(getOccurrenceKey));
    occurrences.forEach((occurrence) => {
      const key = getOccurrenceKey(occurrence);
      if (seen.has(key)) return;
      seen.add(key);
      merged.push(occurrence);
    });
    target[sourceTextId] = merged;
  });
}

function copyOccurrences(occurrences: OccurrencesBySourceTextId): OccurrencesBySourceTextId {
  const copy: OccurrencesBySourceTextId = {};
  mergeOccurrences(copy, occurrences);
  return copy;
}

/**
 * Returns a copy of the entry that has only lexical meanings as senses. Each contextual meaning's
 * occurrences are added to its parent lexical meaning, so the parent appears everywhere the word
 * does. A contextual meaning whose parent is not in the entry is kept, because filtered queries can
 * return partial entries.
 *
 * @param entry - The entry to collapse. It is not modified.
 * @returns A new entry with contextual meanings folded into their lexical meanings.
 */
export function collapseToLexicalSenses(entry: Entry): Entry {
  const senses = Object.values(entry.senses).filter((sense): sense is Sense => !!sense);
  const collapsedSenses: Entry['senses'] = {};

  senses.forEach((sense) => {
    const parentId = getParentLexicalSenseId(sense.id);
    if (parentId && entry.senses[parentId]) return;
    collapsedSenses[sense.id] = { ...sense, occurrences: copyOccurrences(sense.occurrences ?? {}) };
  });

  senses.forEach((sense) => {
    const parentId = getParentLexicalSenseId(sense.id);
    const parent = parentId ? collapsedSenses[parentId] : undefined;
    if (parent) mergeOccurrences(parent.occurrences, sense.occurrences ?? {});
  });

  return { ...entry, senses: collapsedSenses };
}
