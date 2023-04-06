import './TestButtonsPanel.css';
import useData from '@renderer/hooks/papi-hooks/useData';
import useDataProvider from '@renderer/hooks/papi-hooks/useDataProvider';
import { TabInfo } from '@shared/data/WebViewTypes';
import { debounce } from '@shared/util/Util';
import { useState, useMemo, useCallback } from 'react';
import { QuickVerseDataProvider } from '@extensions/quick-verse/quick-verse';

function TestQuickVerseHeresyPanel() {
  const [verseRef, setVerseRef] = useState<string>('John 11:35');
  // Displayed verse ref while debouncing the actual verse ref
  const [verseRefIntermediate, setVerseRefIntermediate] =
    useState<string>(verseRef);
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

  // Test a custom setter method on a data provider engine that isn't on the interface to see if you can actually do this
  const [quickVerseDataProvider, quickVerseDataProviderIsDisposed] =
    useDataProvider<QuickVerseDataProvider>('quick-verse.quick-verse');

  const [verseText] = useData(
    [quickVerseDataProvider, quickVerseDataProviderIsDisposed],
    verseRef,
    'Verse text goes here',
  );

  return (
    <div className="buttons-panel">
      <div className="hello">
        <input
          value={verseRefIntermediate}
          onChange={(e) => {
            updateVerseRef(e.target.value);
          }}
        />
        <textarea
          className="scr-verse-text-area"
          value={verseText}
          onChange={(e) => {
            if (quickVerseDataProvider)
              quickVerseDataProvider.setHeresy(verseRef, e.target.value);
          }}
        />
      </div>
    </div>
  );
}

const createQuickVerseHeresyPanel = (): TabInfo => {
  return {
    type: 'buttons',
    title: 'Test Buttons',
    content: <TestQuickVerseHeresyPanel />,
  };
};

export default createQuickVerseHeresyPanel;
