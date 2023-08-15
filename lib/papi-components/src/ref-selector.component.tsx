import { Canon } from '@sillsdev/scripture';
import { SyntheticEvent, useMemo } from 'react';
import {
  BookNameOption,
  getBookNameOptions,
  offsetBook,
  offsetChapter,
  offsetVerse,
  FIRST_SCR_BOOK_NUM,
  FIRST_SCR_CHAPTER_NUM,
  FIRST_SCR_VERSE_NUM,
  getChaptersForBook,
} from './scripture/scripture-util';
import { ScriptureReference } from './scripture/scripture.model';
import './ref-selector.component.css';
import ComboBox from './combo-box.component';
import Button from './button.component';
import TextField from './text-field.component';

export interface ScrRefSelectorProps {
  scrRef: ScriptureReference;
  handleSubmit: (scrRef: ScriptureReference) => void;
  id?: string;
}

function RefSelector({ scrRef, handleSubmit, id }: ScrRefSelectorProps) {
  const onChangeBook = (newRef: ScriptureReference) => {
    handleSubmit(newRef);
  };

  const onSelectBook = (_event: SyntheticEvent<Element, Event>, value: unknown) => {
    const bookNum: number = Canon.bookIdToNumber((value as BookNameOption).bookId);
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
    <span id={id}>
      <ComboBox
        title="Book"
        className="papi-ref-selector book"
        value={currentBookName}
        options={getBookNameOptions()}
        onChange={onSelectBook}
        isClearable={false}
        width={200}
      />
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
