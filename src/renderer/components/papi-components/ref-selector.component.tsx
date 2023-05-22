import { SyntheticEvent, useState } from 'react';
import {
  getAllBookNames,
  getBookNumFromName,
  offsetBook,
  offsetChapter,
  offsetVerse,
  FIRST_SCR_BOOK_NUM,
  FIRST_SCR_CHAPTER_NUM,
  FIRST_SCR_VERSE_NUM,
  getBookLongNameFromNum,
  getChaptersForBook,
} from './shared/scripture-util';
import { ScriptureReference } from './shared/scripture-types';
import './ref-selector.component.css';
import ComboBox from './combo-box.component';
import Button from './button.component';
import TextField from './text-field.component';
// import TextField from './text-field.component';

export interface ScrRefSelectorProps {
  scrRef: ScriptureReference;
  handleSubmit: (scrRef: ScriptureReference) => void;
}

function TJRefSelector({ scrRef, handleSubmit }: ScrRefSelectorProps) {
  const [currentBookName, setCurrentBookName] = useState<string>(
    getBookLongNameFromNum(scrRef.book),
  );

  const onChangeBook = (newRef: ScriptureReference) => {
    setCurrentBookName(getBookLongNameFromNum(newRef.book));
    handleSubmit(newRef);
  };

  const onSelectBook = (_event: SyntheticEvent<Element, Event>, value: unknown) => {
    const bookNum: number = getBookNumFromName(value as string);
    const newRef: ScriptureReference = { book: bookNum, chapter: 1, verse: 1 };

    onChangeBook(newRef);
  };

  const onChangeChapter = (event: { target: { value: number | string } }) => {
    handleSubmit({ ...scrRef, chapter: +event.target.value });
  };

  const onChangeVerse = (event: { target: { value: number | string } }) => {
    handleSubmit({ ...scrRef, verse: +event.target.value });
  };

  return (
    <>
      <ComboBox
        title="Book"
        className="papi-ref-selector book"
        options={getAllBookNames()}
        onChange={onSelectBook}
        value={currentBookName}
        isClearable={false}
        width={200}
      />
      <Button
        onClick={() => onChangeBook(offsetBook(scrRef, -1))}
        isDisabled={scrRef.book <= FIRST_SCR_BOOK_NUM}
      >
        &lt;
      </Button>
      <Button
        onClick={() => onChangeBook(offsetBook(scrRef, 1))}
        isDisabled={scrRef.book >= getAllBookNames().length}
      >
        &gt;
      </Button>
      <TextField
        className="papi-ref-selector chapter-verse"
        label="Chapter"
        value={scrRef.chapter}
        onChange={onChangeChapter}
      />
      <Button
        onClick={() => handleSubmit(offsetChapter(scrRef, -1))}
        isDisabled={scrRef.chapter <= FIRST_SCR_CHAPTER_NUM}
      >
        &lt;
      </Button>
      <Button
        onClick={() => handleSubmit(offsetChapter(scrRef, 1))}
        isDisabled={scrRef.chapter >= getChaptersForBook(scrRef.book)}
      >
        &gt;
      </Button>
      <TextField
        className="papi-ref-selector chapter-verse"
        label="Verse"
        value={scrRef.verse}
        onChange={onChangeVerse}
      />
      <Button
        onClick={() => handleSubmit(offsetVerse(scrRef, -1))}
        isDisabled={scrRef.verse <= FIRST_SCR_VERSE_NUM}
      >
        &lt;
      </Button>
      <Button onClick={() => handleSubmit(offsetVerse(scrRef, 1))}>&gt;</Button>
    </>
  );
}

export default TJRefSelector;
