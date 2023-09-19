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
    {
      name: 'Repeated Words',
    } as BasicCheck,
    {
      name: 'Unmatched Pairs of Punctuation',
    } as BasicCheck,
    {
      name: 'Quotations',
    } as BasicCheck,
    {
      name: 'Quotation types',
    } as BasicCheck,
    {
      name: 'Numbers',
    } as BasicCheck,
  ];
}

export default function BasicChecks() {
  const checks = useMemo(() => fetchChecks(), []);

  return (
    <>
      {checks.map((check) => (
        <span className="check-option">
          <Checkbox labelText={check.name} />
        </span>
      ))}
    </>
  );
}
