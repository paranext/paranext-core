import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import {
  getTextFromScrRef,
  getScrRefFromText,
  getAllBookNames,
  getBookNumFromName,
  areScrRefsEqual,
  offsetBook,
  offsetChapter,
  offsetVerse,
  FIRST_SCR_BOOK_NUM,
  FIRST_SCR_CHAPTER_NUM,
  FIRST_SCR_VERSE_NUM,
  getBookLongNameFromNum,
} from './tj-shared/ScriptureUtil';
import { ScriptureReference } from './tj-shared/ScriptureTypes';
import './tj-ref-selector.component.css';
import ComboBox from './combo-box.component';
import Button from './button.component';
import TextField from './text-field.component';

export interface ScrRefSelectorProps {
  scrRef: ScriptureReference;
  handleSubmit: (scrRef: ScriptureReference) => void;
}

function TJRefSelector({ scrRef, handleSubmit }: ScrRefSelectorProps) {
  const [currentRefText, setCurrentRefText] = useState<string>(getTextFromScrRef(scrRef));
  const [currentBookName, setCurrentBookName] = useState<string>(
    getBookLongNameFromNum(scrRef.book),
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentRefText(e.target.value);
  }, []);

  const onChangeBook = (newRef: ScriptureReference) => {
    setCurrentBookName(getBookLongNameFromNum(newRef.book));
    handleSubmit(newRef);
  };

  const onSelectBook = (_event: SyntheticEvent<Element, Event>, value: unknown) => {
    const bookNum: number = getBookNumFromName(value as string);
    const newRef: ScriptureReference = { ...scrRef, book: bookNum };

    handleSubmit(newRef);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentRef = getScrRefFromText(currentRefText);
    setCurrentBookName(getBookLongNameFromNum(currentRef.book));
    handleSubmit(currentRef);
  };

  useEffect(() => {
    setCurrentRefText(getTextFromScrRef(scrRef));
  }, [scrRef]);

  const isScrRefChanged = !areScrRefsEqual(currentRefText, scrRef);

  return (
    <form className="scr-toolbar" onSubmit={onSubmit}>
      <span className={`selector-area${isScrRefChanged ? ' changed' : ''}`}>
        {/* <span className="book">{getBookLongNameFromNum(scrRef.book)}</span> */}
        <ComboBox
          className="book"
          options={getAllBookNames()}
          onChange={onSelectBook}
          value={currentBookName}
          isFullWidth
          isClearable={false}
        />
        <span className="change-btns">
          <Button
            className="change-btn left"
            onClick={() => onChangeBook(offsetBook(scrRef, -1))}
            isDisabled={isScrRefChanged || scrRef.book <= FIRST_SCR_BOOK_NUM}
          >
            &lt;
          </Button>
          <span className={`splitter${isScrRefChanged ? ' changed' : ''}`} />
          <Button
            className="change-btn"
            onClick={() => onChangeBook(offsetBook(scrRef, 1))}
            isDisabled={isScrRefChanged}
          >
            &gt;
          </Button>
        </span>
        <span className="chapter">{scrRef.chapter}:</span>
        <span className="change-btns">
          <Button
            className="change-btn left"
            onClick={() => handleSubmit(offsetChapter(scrRef, -1))}
            isDisabled={isScrRefChanged || scrRef.chapter <= FIRST_SCR_CHAPTER_NUM}
          >
            &lt;
          </Button>
          <span className={`splitter${isScrRefChanged ? ' changed' : ''}`} />
          <Button
            className="change-btn"
            onClick={() => handleSubmit(offsetChapter(scrRef, 1))}
            isDisabled={isScrRefChanged}
          >
            &gt;
          </Button>
        </span>
        <span>{scrRef.verse}</span>
        <span className="change-btns">
          <Button
            className="change-btn left"
            onClick={() => handleSubmit(offsetVerse(scrRef, -1))}
            isDisabled={isScrRefChanged || scrRef.verse <= FIRST_SCR_VERSE_NUM}
          >
            &lt;
          </Button>
          <span className={`splitter${isScrRefChanged ? ' changed' : ''}`} />
          <Button
            className="change-btn"
            onClick={() => handleSubmit(offsetVerse(scrRef, 1))}
            isDisabled={isScrRefChanged}
          >
            &gt;
          </Button>
        </span>
      </span>
      <span className="input-area">
        <TextField
          className={`input-reference ${isScrRefChanged ? 'changed' : ''}`}
          value={currentRefText}
          onChange={handleChange}
        />
        <Button className="enter-button" onClick={onSubmit} isDisabled={!isScrRefChanged}>
          Go!
        </Button>
      </span>
    </form>
  );
}

export default TJRefSelector;
