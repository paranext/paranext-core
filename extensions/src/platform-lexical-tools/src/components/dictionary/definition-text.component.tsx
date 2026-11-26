import { SerializedVerseRef } from '@sillsdev/scripture';
import { Fragment, KeyboardEvent, MouseEvent, ReactNode, useMemo, useState } from 'react';
import { DefinitionSegment, parseDefinitionMarkup } from '../../utils/definition-markup.utils';

/** Opens the entry a definition links to. Resolves to `false` when there is no such entry. */
export type EntryLinkClickHandler = (dictionaryId: string, targetLemma: string) => Promise<boolean>;

/** Dictionaries whose entries can be opened; links to any others display as plain text */
const LINKABLE_DICTIONARY_IDS = ['SDBH', 'SDBG'];

/** Props for the DefinitionText component */
type DefinitionTextProps = {
  /** Definition or gloss text as stored in the lexical reference text */
  definition: string;
  /** Callback to open a linked entry. Links display as plain text if this is not provided. */
  onEntryLinkClick?: EntryLinkClickHandler;
  /** Callback to go to a Bible reference. References display as plain text if this is not provided. */
  onScriptureLinkClick?: (verseRef: SerializedVerseRef) => void;
};

/** Props for the MarkupLink component */
type MarkupLinkProps = {
  /** Called when the link is clicked or activated from the keyboard */
  onActivate: () => void;
  /** Text of the link */
  children: ReactNode;
};

/** A link inside a definition, activated by click, Enter or Space */
function MarkupLink({ onActivate, children }: MarkupLinkProps) {
  const handleClick = (event: MouseEvent) => {
    event.stopPropagation();
    onActivate();
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    event.stopPropagation();
    onActivate();
  };

  return (
    // The sense card containing this definition is a `<button>`, which cannot contain another
    // `<button>` or `<a>`, so this is a span with the link role.
    <span
      role="link"
      tabIndex={0}
      className="tw:cursor-pointer tw:underline tw:hover:text-foreground"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {children}
    </span>
  );
}

/** Renders text with the emphasis its markup gives it */
function StyledText({ segment }: { segment: Extract<DefinitionSegment, { kind: 'text' }> }) {
  if (segment.style === 'italic') return <em>{segment.text}</em>;
  if (segment.style === 'underline') return <u>{segment.text}</u>;
  if (segment.style === 'bold') return <strong>{segment.text}</strong>;
  return segment.text;
}

/**
 * Renders a dictionary definition or gloss with its embedded markup resolved into readable text,
 * styling, line breaks, links to other entries and links to Bible references. A link whose entry
 * cannot be found becomes plain text once it is clicked.
 */
export function DefinitionText({
  definition,
  onEntryLinkClick,
  onScriptureLinkClick,
}: DefinitionTextProps) {
  const segments = useMemo(() => parseDefinitionMarkup(definition), [definition]);
  const [unresolvedTargets, setUnresolvedTargets] = useState<ReadonlySet<string>>(new Set());

  const renderSegment = (segment: DefinitionSegment) => {
    if (segment.kind === 'lineBreak') return <br />;
    if (segment.kind === 'text') return <StyledText segment={segment} />;

    if (segment.kind === 'scriptureLink') {
      if (!onScriptureLinkClick) return segment.text;
      return (
        <MarkupLink onActivate={() => onScriptureLinkClick(segment.verseRef)}>
          {segment.text}
        </MarkupLink>
      );
    }

    const targetKey = `${segment.dictionaryId}:${segment.targetLemma}`;
    if (
      !onEntryLinkClick ||
      !LINKABLE_DICTIONARY_IDS.includes(segment.dictionaryId) ||
      unresolvedTargets.has(targetKey)
    )
      return segment.text;

    const openEntry = async () => {
      const wasFound = await onEntryLinkClick(segment.dictionaryId, segment.targetLemma).catch(
        () => false,
      );
      if (!wasFound) setUnresolvedTargets((targets) => new Set(targets).add(targetKey));
    };

    return <MarkupLink onActivate={openEntry}>{segment.text}</MarkupLink>;
  };

  return (
    <>
      {segments.map((segment, index) => (
        // Segments are derived from one string and never reorder, so their index is a stable key
        // eslint-disable-next-line react/no-array-index-key
        <Fragment key={index}>{renderSegment(segment)}</Fragment>
      ))}
    </>
  );
}
