import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './app.component.css';
import { ScriptureReference } from 'papi-components';
import ParanextDockLayout from '@renderer/components/docking/paranext-dock-layout.component';
import TestContext from '@renderer/context/papi-context/test.context';
import { useState } from 'react';
import PlatformBibleToolbar from './components/platform-bible-toolbar';


function Main() {
  const [scrRef, setScrRef] = useState({ bookNum: 40, chapterNum: 1, verseNum: 1 });

  const handleReferenceChanged = (newScrRef: ScriptureReference) => {
    setScrRef(newScrRef);
  };

  return (
    <TestContext.Provider value="test">
      <PlatformBibleToolbar referenceChanged={handleReferenceChanged} scrRef={scrRef} />
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
