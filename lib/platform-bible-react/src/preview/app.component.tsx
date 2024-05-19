import { useState } from 'react';
import { ScriptureReference } from 'platform-bible-utils';
import { BookChapterControl, RefSelector } from '..';
import './app.component.css';

const defaultScrRef: ScriptureReference = {
  bookNum: 9,
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
      <RefSelector scrRef={scrRef} handleSubmit={setScrRef} />
      <div className="bcv-control-div">
        <BookChapterControl scrRef={scrRef} handleSubmit={setScrRef} />
      </div>
    </>
  );
}

export default App;
