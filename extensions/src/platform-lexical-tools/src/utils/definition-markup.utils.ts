/** A piece of a dictionary definition, ready to display */
export type DefinitionSegment =
  | { kind: 'text'; text: string }
  | { kind: 'entryLink'; text: string; dictionaryId: string; targetLemma: string };

/**
 * Matches `{L:display<DICTIONARY:target>}` entry links (groups 1-3), `{A:abbreviation}` (group 4),
 * and `{N:note}` markers.
 */
const DEFINITION_MARKUP_REGEX = /\{L:([^<}]*)<([A-Za-z-]+):([^>}]*)>\}|\{A:([^}]*)\}|\{N:[^}]*\}/g;

/** Some link targets end in a numeric code that is not part of the lemma, e.g. `Βηθζαθά:000000` */
const TARGET_NUMERIC_SUFFIX_REGEX = /:\d+$/;

/**
 * Splits a definition into text and links to other entries, resolving its embedded markup. Other
 * markers (`{S:…}`, `{D:…}`) and malformed markup are left as literal text.
 *
 * @param definition - Definition text as stored in the lexical reference text.
 * @returns The segments of the definition in reading order.
 */
export function parseDefinitionMarkup(definition: string): DefinitionSegment[] {
  const decoded = definition.replaceAll('&lt;', '<').replaceAll('&gt;', '>');
  const segments: DefinitionSegment[] = [];
  let textStart = 0;

  const addText = (text: string) => {
    if (text) segments.push({ kind: 'text', text });
  };

  Array.from(decoded.matchAll(DEFINITION_MARKUP_REGEX)).forEach((match) => {
    addText(decoded.slice(textStart, match.index));
    textStart = match.index + match[0].length;

    const [, linkText, dictionaryId, target, abbreviation] = match;
    if (dictionaryId !== undefined)
      segments.push({
        kind: 'entryLink',
        text: linkText,
        dictionaryId,
        targetLemma: target.replace(TARGET_NUMERIC_SUFFIX_REGEX, ''),
      });
    else if (abbreviation !== undefined) addText(abbreviation);
  });

  addText(decoded.slice(textStart));
  return segments;
}
