import ScriptureResultsViewer from '@/components/advanced/scripture-results-viewer/scripture-results-viewer.component';
import { Button } from '@/components/shadcn-ui/button';
import { useState } from 'react';
import generateRandomCheckingData from '../data-sources/generate-random-checking-data';

export default function ScriptureResultsViewerExample() {
  const checks = [
    {
      id: 'preview.repeatedWords',
      displayName: 'Repeated Words',
      possibleErrors: ['Word repeated'],
    },
    {
      id: 'preview.characters',
      displayName: 'Characters',
      possibleErrors: ['Invalid character', 'Unknown character'],
    },
    {
      id: 'preview.quotationMarks',
      displayName: 'Quotation Marks',
      possibleErrors: [
        'Closing first-level quotation mark missing',
        'Closing second-level quotation mark missing',
        'Closing third-level quotation mark missing',
        'Missing continuer',
      ],
    },
    {
      id: 'preview.chapterVerseNumbers',
      displayName: 'Chapter/Verse Numbers',
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
    checks.map((check) => ({
      source: check,
      data: generateRandomCheckingData(check.possibleErrors),
    })),
  );

  const updateSource = (index: number) => {
    const newData = generateRandomCheckingData(checks[index].possibleErrors);
    const updatedSource = {
      ...sources[index],
      data: newData,
    };

    // Create a new array with the updated source
    const updatedSources = [...sources];
    updatedSources[index] = updatedSource;

    // Set the new array as the state
    setSources(updatedSources);
  };

  return (
    <div className="tw-h-96 tw-overflow-y-hidden">
      <div>
        {checks.map((check, index) => (
          <Button
            key={check.id}
            type="button"
            onClick={() => updateSource(index)}
            style={{ margin: '0px 6px 10px 0px' }}
          >
            Update {check.displayName} check results
          </Button>
        ))}
      </div>
      <ScriptureResultsViewer
        sources={sources}
        scriptureReferenceColumnName="Scripture Reference"
        typeColumnName="Check Type"
        detailsColumnName="Error Details"
      />
    </div>
  );
}
