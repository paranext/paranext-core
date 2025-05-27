import { Separator } from '@radix-ui/react-dropdown-menu';
import type React from 'react';
import { formatScrRef, scrRefToBBBCCC } from 'platform-bible-utils';
import { DictionaryEntry } from './dictionary-list-item.component';

/** Props for the DictionaryEntryDisplay component */
type DictionaryEntryDisplayProps = {
  /** Dictionary entry object to display */
  dictionaryEntry: DictionaryEntry;
  /** JSX element representing the back button */
  backToListButton: React.JSX.Element;
  /** Label for the definition */
  definitionLabel: string;
  /** Label for the occurrences */
  occurrencesLabel: string;
};

/**
 * Renders a detailed view of a dictionary entry, displaying its key properties such as Hebrew text,
 * transliteration, Strong's number, part of speech, definition, and usage occurrences. Includes a
 * back button to navigate back to the list view.
 *
 * @param {DictionaryEntryDisplayProps} props - The props for the component.
 * @param {DictionaryEntry} props.dictionaryEntry - The dictionary entry object to display.
 * @param {JSX.Element} props.backToListButton - JSX element representing the back button. event.\
 * @param {string} props.definitionLabel - Label for the definition section.
 * @param {string} props.occurrencesLabel - Label for the occurrences section.
 */
export function DictionaryEntryDisplay({
  dictionaryEntry,
  backToListButton,
  definitionLabel,
  occurrencesLabel,
}: DictionaryEntryDisplayProps) {
  return (
    <div className="tw-p-4">
      <div className="tw-mb-4 tw-flex tw-items-center tw-justify-between">{backToListButton}</div>

      <div className="tw-mb-4">
        <div className="tw-flex tw-items-baseline tw-gap-2">
          <span className="tw-text-2xl tw-font-bold">{dictionaryEntry.hebrew}</span>
          <span className="tw-text-lg tw-text-muted-foreground">
            {dictionaryEntry.transliteration}
          </span>
          <span className="tw-ml-auto tw-rounded tw-bg-blue-100 tw-px-2 tw-py-0.5 tw-text-sm">
            {dictionaryEntry.strongsNumber}
          </span>
        </div>
        <div className="tw-text-sm tw-italic tw-text-muted-foreground">
          {dictionaryEntry.partOfSpeech}
        </div>
      </div>

      <Separator className="tw-my-3" />

      <div className="tw-mb-4">
        <h3 className="tw-mb-1 tw-font-semibold">{definitionLabel}</h3>
        <p>{dictionaryEntry.definition}</p>
      </div>

      <div>
        <h3 className="tw-mb-1 tw-font-semibold">{occurrencesLabel}</h3>
        <ul className="tw-list-inside tw-list-disc">
          {dictionaryEntry.usage.map((serializedVerseReference) => (
            <li key={scrRefToBBBCCC(serializedVerseReference)} className="tw-py-0.5 tw-text-sm">
              {formatScrRef(serializedVerseReference, 'English')}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
