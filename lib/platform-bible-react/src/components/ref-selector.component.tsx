import { Canon } from '@sillsdev/scripture';
import { useMemo } from 'react';
import {
  offsetBook,
  offsetChapter,
  offsetVerse,
  FIRST_SCR_BOOK_NUM,
  FIRST_SCR_CHAPTER_NUM,
  FIRST_SCR_VERSE_NUM,
  getChaptersForBook,
  ScriptureReference,
} from 'platform-bible-utils';
import '@/components/ref-selector.component.css';
import ComboBox, { ComboBoxLabelOption } from '@/components/combo-box.component';
import Button from '@/components/button.component';
import TextField from '@/components/text-field.component';
import { Label } from '@/components/shadcn-ui/label';

export interface ScrRefSelectorProps {
  scrRef: ScriptureReference;
  handleSubmit: (scrRef: ScriptureReference) => void;
  id?: string;
}

interface BookNameOption extends ComboBoxLabelOption {
  bookId: string;
}

let bookNameOptions: BookNameOption[];

/**
 * Gets ComboBox options for book names. Use the _bookId_ for reference rather than the _label_ to
 * aid in localization.
 *
 * @remarks
 * This can be localized by loading _label_ with the localized book name.
 * @returns An array of ComboBox options for book names.
 */
const getBookNameOptions = () => {
  if (!bookNameOptions) {
    bookNameOptions = Canon.allBookIds.map((bookId) => ({
      bookId,
      label: Canon.bookIdToEnglishName(bookId),
    }));
  }
  return bookNameOptions;
};

function RefSelector({ scrRef, handleSubmit, id }: ScrRefSelectorProps) {
  const onChangeBook = (newRef: ScriptureReference) => {
    handleSubmit(newRef);
  };

  const onSelectBook = (value: BookNameOption) => {
    const bookNum: number = Canon.bookIdToNumber(value.bookId);
    const newRef: ScriptureReference = { bookNum, chapterNum: 1, verseNum: 1 };

    onChangeBook(newRef);
  };

  const onChangeChapter = (event: { target: { value: number | string } }) => {
    handleSubmit({ ...scrRef, chapterNum: +event.target.value });
  };

  const onChangeVerse = (event: { target: { value: number | string } }) => {
    handleSubmit({ ...scrRef, verseNum: +event.target.value });
  };

  const currentBookName = useMemo(() => getBookNameOptions()[scrRef.bookNum - 1], [scrRef.bookNum]);

  return (
    <span id={id} className="pr-flex pr-place-items-center">
      <div className="pr-inline-grid pr-items-center pr-gap-1.5">
        <Label>Book</Label>
        <ComboBox value={currentBookName} options={getBookNameOptions()} onChange={onSelectBook} />
      </div>
      <Button
        onClick={() => onChangeBook(offsetBook(scrRef, -1))}
        isDisabled={scrRef.bookNum <= FIRST_SCR_BOOK_NUM}
      >
        &lt;
      </Button>
      <Button
        onClick={() => onChangeBook(offsetBook(scrRef, 1))}
        isDisabled={scrRef.bookNum >= getBookNameOptions().length}
      >
        &gt;
      </Button>
      <TextField
        className="papi-ref-selector chapter-verse"
        label="Chapter"
        value={scrRef.chapterNum}
        onChange={onChangeChapter}
      />
      <Button
        onClick={() => handleSubmit(offsetChapter(scrRef, -1))}
        isDisabled={scrRef.chapterNum <= FIRST_SCR_CHAPTER_NUM}
      >
        &lt;
      </Button>
      <Button
        onClick={() => handleSubmit(offsetChapter(scrRef, 1))}
        isDisabled={scrRef.chapterNum >= getChaptersForBook(scrRef.bookNum)}
      >
        &gt;
      </Button>
      <TextField
        className="papi-ref-selector chapter-verse"
        label="Verse"
        value={scrRef.verseNum}
        onChange={onChangeVerse}
      />
      <Button
        onClick={() => handleSubmit(offsetVerse(scrRef, -1))}
        isDisabled={scrRef.verseNum <= FIRST_SCR_VERSE_NUM}
      >
        &lt;
      </Button>
      <Button onClick={() => handleSubmit(offsetVerse(scrRef, 1))}>&gt;</Button>
    </span>
  );
}

export default RefSelector;
