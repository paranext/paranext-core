import './test-buttons-panel.component.css';
import useData from '@renderer/hooks/papi-hooks/use-data.hook';
import { SavedTabInfo, TabInfo } from '@shared/models/docking-framework.model';
import { debounce } from 'platform-bible-utils';
import { useState, useMemo, useCallback } from 'react';
import { TextField } from 'platform-bible-react';

export const TAB_TYPE_QUICK_VERSE_HERESY = 'quick-verse-heresy';

export function TestQuickVerseHeresyPanel() {
  const [verseRef, setVerseRef] = useState<string>('JHN 11:35');
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

  const [heresyText, setHeresyText] = useData('quickVerse.quickVerse').Heresy(
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

export function loadQuickVerseHeresyTab(savedTabInfo: SavedTabInfo): TabInfo {
  return {
    ...savedTabInfo,
    tabTitle: 'Quick Verse Heresy',
    content: <TestQuickVerseHeresyPanel />,
  };
}
