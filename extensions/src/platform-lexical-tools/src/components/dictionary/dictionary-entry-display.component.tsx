import { Button, Separator } from 'platform-bible-react';
import { formatScrRef } from 'platform-bible-utils';
import { ArrowLeft } from 'lucide-react';
import { DictionaryEntry } from './dictionary-list-item.component';

/** Props for the back to list button */
type BackToListButtonProps = {
  /** Callback function to handle button click */
  handleClick: () => void;
  /** Button text */
  buttonText?: string;
};

function BackToListButton({ handleClick, buttonText }: BackToListButtonProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="tw-pl-0 hover:tw-bg-transparent hover:tw-underline"
      onClick={handleClick}
    >
      <ArrowLeft className="tw-mr-1 tw-h-4 tw-w-4" />
      {buttonText}
    </Button>
  );
}

/** Props for the DictionaryEntryDisplay component */
export type DictionaryEntryDisplayProps = {
  /** Dictionary entry object to display */
  dictionaryEntry: DictionaryEntry;
  /** Label for the definition */
  definitionLabel: string;
  /** Label for the occurrences */
  occurrencesLabel: string;
  /** Callback function to handle back to list button click */
  handleBackToListButtonClick: () => void;
  /** Label for the back to list button */
  backToListButtonText: string;
};

/**
 * Renders a detailed view of a dictionary entry, displaying its key properties such as Hebrew text,
 * transliteration, Strong's number, part of speech, definition, and usage occurrences. Includes a
 * back button to navigate back to the list view.
 */
export function DictionaryEntryDisplay({
  dictionaryEntry,
  definitionLabel,
  occurrencesLabel,
  handleBackToListButtonClick,
  backToListButtonText,
}: DictionaryEntryDisplayProps) {
  return (
    <div className="tw-p-4">
      <div className="tw-mb-4 tw-flex tw-items-center tw-justify-between">
        <BackToListButton
          handleClick={handleBackToListButtonClick}
          buttonText={backToListButtonText}
        />
      </div>

      <div className="tw-mb-4">
        <div className="tw-flex tw-items-baseline tw-gap-2">
          <span className="tw-text-2xl tw-font-bold">{dictionaryEntry.hebrew}</span>
          <span className="tw-text-lg tw-text-muted-foreground">
            {dictionaryEntry.transliteration}
          </span>
          <span className="tw-ml-auto tw-rounded tw-bg-accent tw-px-2 tw-py-0.5 tw-text-sm tw-accent-foreground">
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
            <li
              key={`${dictionaryEntry.id}-${formatScrRef(serializedVerseReference, 'English')}`}
              className="tw-py-0.5 tw-text-sm"
            >
              {formatScrRef(serializedVerseReference, 'English')}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
