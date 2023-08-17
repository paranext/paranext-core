import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './app.component.css';
import ParanextDockLayout from '@renderer/components/docking/paranext-dock-layout.component';
import TestContext from '@renderer/context/papi-context/test.context';
import { ScriptureReference } from 'papi-components';
import useSetting from '@renderer/hooks/papi-hooks/use-setting.hook';
import PlatformBibleToolbar from './components/platform-bible-toolbar';

const defaultScrRef = {
  bookNum: 1,
  chapterNum: 1,
  verseNum: 1,
};

function Main() {
  const [scrRef, setScrRef] = useSetting('globalVerseRef', defaultScrRef);

  const handleReferenceChanged = (newScrRef: {
    bookNum: number;
    chapterNum: number;
    verseNum: number;
  }) => {
    console.log('changed the ref in the toolbar');
    setScrRef(newScrRef);
  };

  return (
    <TestContext.Provider value="test">
      <PlatformBibleToolbar
        referenceChanged={handleReferenceChanged}
        scrRef={scrRef as ScriptureReference}
      />
      <ParanextDockLayout />
    </TestContext.Provider>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}
