import { projectDataProviders } from '@papi/frontend';
import { LocalizeKey } from 'platform-bible-utils';
import { Entry, Occurrence } from 'platform-lexical-tools';

// Regex to remove any parenthetical statements (including nested)
const REMOVE_PARENTHETICAL_STATEMENTS_REGEX = /\([^()]*\)/g;

export const DICTIONARY_LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%platformLexicalTools_dictionary_allOccurrencesLabel%',
  '%platformLexicalTools_dictionary_backToList%',
  '%platformLexicalTools_dictionary_definitionLabel%',
  '%platformLexicalTools_dictionary_domainTaxonomyLabel%',
  '%platformLexicalTools_dictionary_noResults%',
  '%platformLexicalTools_dictionary_occurrencesInChapterLabel%',
  '%platformLexicalTools_dictionary_occurrencesForSenseLabel%',
  '%platformLexicalTools_dictionary_searchDictionary%',
  '%platformLexicalTools_dictionary_sensesLabel%',
  '%platformLexicalTools_dictionary_scopeSelector_chapter%',
  '%platformLexicalTools_dictionary_scopeSelector_section%',
  '%platformLexicalTools_dictionary_scopeSelector_verse%',
  '%platformLexicalTools_dictionary_strongsCodeLabel%',
  '%platformLexicalTools_dictionary_trackProjectDropdownLabel%',
];

/**
 * Takes a dictionary entry and returns an array of its glosses, with parenthetical statements
 * removed and individual glosses separated by commas. Not intended for a long term solution, will
 * not play well with other data.
 *
 * @param dictionaryEntry - The dictionary entry to format.
 * @returns An array of glosses.
 */
export function getFormatGlossesStringFromDictionaryEntrySenses(dictionaryEntry: Entry): string {
  return [
    ...new Set(
      Object.values(dictionaryEntry.senses).flatMap(
        (sense) =>
          sense?.glosses?.flatMap((gloss) =>
            gloss
              .replace(REMOVE_PARENTHETICAL_STATEMENTS_REGEX, '')
              .split(',')
              .map((g) => g.trim())
              .filter(Boolean),
          ) ?? [],
      ),
    ),
  ].join(', ');
}

/**
 * Calculates the total number of occurrences for all senses within a dictionary entry.
 *
 * @param dictionaryEntry - The dictionary entry containing senses to be counted.
 * @returns The total count of occurrences across all senses in the entry.
 */
export function getOccurrencesCountFromDictionaryEntrySenses(dictionaryEntry: Entry): number {
  const allOccurrences: Occurrence[] = [];
  Object.values(dictionaryEntry.senses).forEach((sense) => {
    if (!sense?.occurrences) return;
    Object.values(sense.occurrences)
      .filter((arr): arr is Occurrence[] => Array.isArray(arr))
      .forEach((arr) => allOccurrences.push(...arr));
  });
  // De-duplicate occurrences using Set and a unique key (e.g., JSON.stringify)
  const uniqueOccurrences = new Set(allOccurrences.map((occ) => JSON.stringify(occ)));
  return uniqueOccurrences.size;
}

/**
 * Gets the short name of a project from its ID.
 *
 * @param projectIdToGetName The ID of the project to get the names of.
 * @returns An object with the short and full names of the project, or undefined if the project is
 *   not editable.
 */
export async function getProjectShortName(projectIdToGetName: string): Promise<string | undefined> {
  const pdp = await projectDataProviders.get('platform.base', projectIdToGetName);

  if (!(await pdp.getSetting('platform.isEditable'))) return undefined;

  const projectShortName = await pdp.getSetting('platform.name');

  return projectShortName;
}
