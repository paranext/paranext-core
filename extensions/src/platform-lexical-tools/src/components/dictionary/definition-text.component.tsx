import { Fragment, KeyboardEvent, MouseEvent, useMemo, useState } from 'react';
import { parseDefinitionMarkup } from '../../utils/definition-markup.utils';

/** Opens the entry a definition links to. Resolves to `false` when there is no such entry. */
export type EntryLinkClickHandler = (dictionaryId: string, targetLemma: string) => Promise<boolean>;

/** Dictionaries whose entries can be opened; links to any others display as plain text */
const LINKABLE_DICTIONARY_IDS = ['SDBH', 'SDBG'];

/** Props for the DefinitionText component */
type DefinitionTextProps = {
  /** Definition text as stored in the lexical reference text */
  definition: string;
  /** Callback to open a linked entry. Links display as plain text if this is not provided. */
  onEntryLinkClick?: EntryLinkClickHandler;
};

/**
 * Renders a dictionary definition with its embedded markup resolved into readable text and links to
 * other entries. A link whose entry cannot be found becomes plain text once it is clicked.
 */
export function DefinitionText({ definition, onEntryLinkClick }: DefinitionTextProps) {
  const segments = useMemo(() => parseDefinitionMarkup(definition), [definition]);
  const [unresolvedTargets, setUnresolvedTargets] = useState<ReadonlySet<string>>(new Set());

  return (
    <>
      {segments.map((segment, index) => {
        const targetKey =
          segment.kind === 'entryLink' ? `${segment.dictionaryId}:${segment.targetLemma}` : '';
        const isLink =
          segment.kind === 'entryLink' &&
          onEntryLinkClick &&
          LINKABLE_DICTIONARY_IDS.includes(segment.dictionaryId) &&
          !unresolvedTargets.has(targetKey);

        if (!isLink)
          // Segments are derived from one string and never reorder, so their index is a stable key
          // eslint-disable-next-line react/no-array-index-key
          return <Fragment key={index}>{segment.text}</Fragment>;

        const openEntry = async () => {
          const wasFound = await onEntryLinkClick(segment.dictionaryId, segment.targetLemma).catch(
            () => false,
          );
          if (!wasFound) setUnresolvedTargets((targets) => new Set(targets).add(targetKey));
        };

        const handleClick = (event: MouseEvent) => {
          event.stopPropagation();
          openEntry();
        };

        const handleKeyDown = (event: KeyboardEvent) => {
          if (event.key !== 'Enter' && event.key !== ' ') return;
          event.preventDefault();
          event.stopPropagation();
          openEntry();
        };

        return (
          // The sense card containing this definition is a `<button>`, which cannot contain another
          // `<button>` or `<a>`, so this is a span with the link role.
          <span
            // Segments are derived from one string and never reorder, so their index is a stable key
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            role="link"
            tabIndex={0}
            className="tw:cursor-pointer tw:underline tw:hover:text-foreground"
            onClick={handleClick}
            onKeyDown={handleKeyDown}
          >
            {segment.text}
          </span>
        );
      })}
    </>
  );
}
