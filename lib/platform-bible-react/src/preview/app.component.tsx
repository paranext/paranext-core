import { useState } from 'react';
import { ScriptureReference } from 'platform-bible-utils';
import { Payment, columns } from '@/components/table-v2-cols';
import { BookChapterControl, RefSelector, DataTable } from '..';

const defaultScrRef: ScriptureReference = {
  bookNum: 1,
  chapterNum: 1,
  verseNum: 1,
};

const data: Payment[] = [
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: '728edd52f',
    amount: 1200,
    status: 'success',
    email: 'maaa@example.com',
  },
];

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
      <div className="pr-m-3 pr-flex">
        <BookChapterControl scrRef={scrRef} handleSubmit={setScrRef} />
      </div>
      <div className="pr-m-10 pr-h-[400px] pr-w-[800px]">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}

export default App;
