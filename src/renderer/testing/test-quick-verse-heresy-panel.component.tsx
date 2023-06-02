import './test-buttons-panel.component.css';
import useData from '@renderer/hooks/papi-hooks/use-data.hook';
import { TabInfo } from '@shared/data/web-view.model';
import { debounce } from '@shared/utils/util';
import { useState, useMemo, useCallback } from 'react';
import { QuickVerseDataTypes } from '@extensions/quick-verse/quick-verse';
import { TextField } from 'papi-components';

function TestQuickVerseHeresyPanel() {
  const [verseRef, setVerseRef] = useState<string>('John 11:35');
  // Displayed verse ref while debouncing the actual verse ref
  const [verseRefIntermediate, setVerseRefIntermediate] = useState<string>(verseRef);
  const setVerseRefDebounced = useMemo(
    () =>
      debounce((newVerseRef: string) => {
        setVerseRef(newVerseRef);
        setVerseRefIntermediate(newVerseRef);
      }, 250),
    [],
  );
  const updateVerseRef = useCallback(
    (newVerseRef: string) => {
      setVerseRefDebounced(newVerseRef);
      setVerseRefIntermediate(newVerseRef);
    },
    [setVerseRefDebounced],
  );

  const [heresyText, setHeresyText] = useData.Heresy<QuickVerseDataTypes, 'Heresy'>(
    'quick-verse.quick-verse',
    verseRef,
    'Verse text goes here',
  );

  return (
    <div className="buttons-panel">
      <div className="hello">
        <img
          src="papi-extension://quick-verse/assets/letter-q.png"
          alt="Q icon"
          style={{
            maxHeight: '40px',
            maxWidth: '40px',
          }}
        />
        <p />
        <TextField
          label="Verse Ref"
          value={verseRefIntermediate}
          onChange={(e) => {
            updateVerseRef(e.target.value);
          }}
        />
        <textarea
          className="scr-verse-text-area"
          value={heresyText}
          onChange={(e) => {
            if (setHeresyText) setHeresyText(e.target.value);
          }}
        />
      </div>
    </div>
  );
}

export default function createQuickVerseHeresyPanel(): TabInfo {
  return {
    title: 'Quick Verse Heresy',
    content: <TestQuickVerseHeresyPanel />,
  };
}
