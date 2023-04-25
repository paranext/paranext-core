import './test-buttons-panel.component.css';
import useData from '@renderer/hooks/papi-hooks/use-data.hook';
import useDataProvider from '@renderer/hooks/papi-hooks/use-data-provider.hook';
import { TabInfo } from '@shared/data/web-view.model';
import { debounce } from '@shared/utils/util';
import { useState, useMemo, useCallback } from 'react';
import TextField from '@renderer/components/papi-components/text-field.component';
import IDataProvider, { DataProviderSubscriber } from 'shared/models/data-provider.interface';

export type QuickVerseSetData = string | { text: string; isHeresy: boolean };

export interface QuickVerseDataProvider
  extends IDataProvider<string, string | undefined, QuickVerseSetData> {
  subscribe: DataProviderSubscriber<string, string>;
  set(selector: string, data: QuickVerseSetData): Promise<boolean>;
  setHeresy(verseRef: string, verseText: string): Promise<boolean>;
  get(selector: string): Promise<string>;
}

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

  // Test a custom setter method on a data provider engine that isn't on the interface to see if you can actually do this
  const quickVerseDataProvider = useDataProvider<QuickVerseDataProvider>('quick-verse.quick-verse');

  const [verseText] = useData(quickVerseDataProvider, verseRef, 'Verse text goes here');

  return (
    <div className="buttons-panel">
      <div className="hello">
        <TextField
          label="Verse Ref"
          value={verseRefIntermediate}
          onChange={(e) => {
            updateVerseRef(e.target.value);
          }}
        />
        <textarea
          className="scr-verse-text-area"
          value={verseText}
          onChange={(e) => {
            if (quickVerseDataProvider) quickVerseDataProvider.setHeresy(verseRef, e.target.value);
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
