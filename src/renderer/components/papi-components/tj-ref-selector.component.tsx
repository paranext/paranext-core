import React, { useCallback, useEffect, useState } from 'react';
import {
  getTextFromScrRef,
  getScrRefFromText,
  getBookLongNameFromNum,
  areScrRefsEqual,
  offsetBook,
  offsetChapter,
  offsetVerse,
  FIRST_SCR_BOOK_NUM,
  FIRST_SCR_CHAPTER_NUM,
  FIRST_SCR_VERSE_NUM,
} from './tj-shared/ScriptureUtil';
import { ScriptureReference } from './tj-shared/ScriptureTypes';
import './tj-ref-selector.component.css';

export interface ScrRefSelectorProps {
  scrRef: ScriptureReference;
  handleSubmit: (scrRef: ScriptureReference) => void;
}

function TJRefSelector({ scrRef, handleSubmit }: ScrRefSelectorProps) {
  const [currentRefText, setCurrentRefText] = useState<string>(getTextFromScrRef(scrRef));

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentRefText(e.target.value);
  }, []);

  useEffect(() => {
    setCurrentRefText(getTextFromScrRef(scrRef));
  }, [scrRef]);

  const isScrRefChanged = !areScrRefsEqual(currentRefText, scrRef);

  return (
    <form
      className="scr-toolbar"
      onSubmit={(e: React.FormEvent) => {
        e.preventDefault();
        handleSubmit(getScrRefFromText(currentRefText));
      }}
    >
      <span className={`selector-area${isScrRefChanged ? ' changed' : ''}`}>
        <span className="book">{getBookLongNameFromNum(scrRef.book)}</span>
        <span className="change-btns">
          <button
            type="button"
            className="change-btn left"
            onClick={() => handleSubmit(offsetBook(scrRef, -1))}
            disabled={isScrRefChanged || scrRef.book <= FIRST_SCR_BOOK_NUM}
          >
            &lt;
          </button>
          <span className={`splitter${isScrRefChanged ? ' changed' : ''}`} />
          <button
            type="button"
            className="change-btn"
            onClick={() => handleSubmit(offsetBook(scrRef, 1))}
            disabled={isScrRefChanged}
          >
            &gt;
          </button>
        </span>
        <span className="chapter">{scrRef.chapter}:</span>
        <span className="change-btns">
          <button
            type="button"
            className="change-btn left"
            onClick={() => handleSubmit(offsetChapter(scrRef, -1))}
            disabled={isScrRefChanged || scrRef.chapter <= FIRST_SCR_CHAPTER_NUM}
          >
            &lt;
          </button>
          <span className={`splitter${isScrRefChanged ? ' changed' : ''}`} />
          <button
            type="button"
            className="change-btn"
            onClick={() => handleSubmit(offsetChapter(scrRef, 1))}
            disabled={isScrRefChanged}
          >
            &gt;
          </button>
        </span>
        <span>{scrRef.verse}</span>
        <span className="change-btns">
          <button
            type="button"
            className="change-btn left"
            onClick={() => handleSubmit(offsetVerse(scrRef, -1))}
            disabled={isScrRefChanged || scrRef.verse <= FIRST_SCR_VERSE_NUM}
          >
            &lt;
          </button>
          <span className={`splitter${isScrRefChanged ? ' changed' : ''}`} />
          <button
            type="button"
            className="change-btn"
            onClick={() => handleSubmit(offsetVerse(scrRef, 1))}
            disabled={isScrRefChanged}
          >
            &gt;
          </button>
        </span>
      </span>
      <span className="input-area">
        <input
          type="text"
          className={`${isScrRefChanged ? 'changed' : ''}`}
          value={currentRefText}
          onChange={handleChange}
        />
        <button type="submit" className="enter-button" disabled={!isScrRefChanged}>
          Go!
        </button>
      </span>
    </form>
  );
}

export default TJRefSelector;
