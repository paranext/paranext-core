import { useState } from 'react';
import './app.component.css';
import { ScriptureReference } from 'platform-bible-utils';
import { RefSelector } from '..';

const defaultScrRef: ScriptureReference = {
  bookNum: 1,
  chapterNum: 1,
  verseNum: 1,
};

function App() {
  const [scrRef, setScrRef] = useState(defaultScrRef);

  return (
    <>
      <h1>platform-bible-react Preview</h1>
      <p>
        Edit <code>lib\platform-bible-react\src\preview\app.component.tsx</code> and save to see
        updates
      </p>
      <p>
        <RefSelector scrRef={scrRef} handleSubmit={setScrRef} />
      </p>
    </>
  );
}

export default App;
