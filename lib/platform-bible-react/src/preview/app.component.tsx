import { useState } from 'react';
import './app.component.css';
import ScriptureRefKeyedList from '@/components/scripture-ref-keyed-list.component';
import ResultsSource from '@/components/results-source.class';
import generateRandomCheckingData from './generate-random-checking-data';

function App() {
  const checks = [
    {
      id: 'Repeated Words',
      possibleErrors: ['Word repeated'],
    },
    {
      id: 'Characters',
      possibleErrors: ['Invalid character', 'Unknown character'],
    },
    {
      id: 'Quotation marks',
      possibleErrors: [
        'Closing first-level quotation mark missing',
        'Closing second-level quotation mark missing',
        'Closing third-level quotation mark missing',
        'Missing continuer',
      ],
    },
    {
      id: 'Chapter/Verse Numbers',
      possibleErrors: [
        'Missing Verse number',
        'Missing chapter',
        'Empty verse',
        'Verse out of order',
        'Repeated verse number',
      ],
    },
  ];

  const [sources, setSources] = useState(() =>
    checks.map(
      (check) => new ResultsSource(generateRandomCheckingData(check.possibleErrors), check.id),
    ),
  );

  const updateSource = (index: number) => {
    const newData = generateRandomCheckingData(checks[index].possibleErrors);
    const updatedSource = sources[index];
    updatedSource.updateData(newData);
    setSources([...sources]);
  };

  return (
    <>
      <h1>platform-bible-react Preview</h1>
      <p>
        Edit <code>lib\platform-bible-react\src\preview\app.component.tsx</code> and save to see
        updates
      </p>
      <div>
        {checks.map((check, index) => (
          <button
            key={check.id}
            type="button"
            onClick={() => updateSource(index)}
            style={{ margin: '0px 6px 10px 0px' }}
          >
            Update {check.id} check results
          </button>
        ))}
      </div>
      <ScriptureRefKeyedList
        sources={sources}
        scriptureReferenceColumnName="Scripture Reference"
        typeColumnName="Check Type"
        detailsColumnName="Error Details"
      />
    </>
  );
}

export default App;
