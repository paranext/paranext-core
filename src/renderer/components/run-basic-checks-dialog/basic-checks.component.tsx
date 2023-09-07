import { Checkbox } from 'papi-components';
import { useMemo } from 'react';

type BasicCheck = {
  name: string;
};

function fetchChecks() {
  return [
    {
      name: 'Chapter/Verse Numbers',
    } as BasicCheck,
    {
      name: 'Markers',
    } as BasicCheck,
    {
      name: 'Characters (Combinations)',
    } as BasicCheck,
    {
      name: 'Punctuation (Sequences)',
    } as BasicCheck,
    {
      name: 'References',
    } as BasicCheck,
    {
      name: 'Footnote Quotes',
    } as BasicCheck,
    {
      name: 'Capitalization',
    } as BasicCheck,
  ];
}

export default function BasicChecks() {
  const checks = useMemo(() => fetchChecks(), []);

  return (
    <div>
      {checks.map((check) => (
        <Checkbox labelText={check.name} />
      ))}
    </div>
  );
}
