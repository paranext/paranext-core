import { Checkbox } from 'platform-bible-react';
import './basic-checks.component.scss';

export type BasicCheck = {
  name: string;
};

export function fetchChecks(): BasicCheck[] {
  return [
    {
      name: 'Chapter/Verse Numbers',
    },
    {
      name: 'Markers',
    },
    {
      name: 'Characters (Combinations)',
    },
    {
      name: 'Punctuation (Sequences)',
    },
    {
      name: 'References',
    },
    {
      name: 'Footnote Quotes',
    },
    {
      name: 'Capitalization',
    },
    {
      name: 'Repeated Words',
    },
    {
      name: 'Unmatched Pairs of Punctuation',
    },
    {
      name: 'Quotations',
    },
    {
      name: 'Quotation types',
    },
    {
      name: 'Numbers',
    },
    {
      name: 'Another Example 1',
    },
    {
      name: 'Another Example 2',
    },
    {
      name: 'Another Example 3',
    },
    {
      name: 'Another Example 4',
    },
    {
      name: 'Another Example 5',
    },
    {
      name: 'Another Example 6',
    },
  ];
}

type BasicCheckProps = {
  handleSelectCheck: (checkName: string) => void;
  selectedChecks: string[];
  checks: BasicCheck[];
};

export default function BasicChecks({
  handleSelectCheck,
  selectedChecks,
  checks,
}: BasicCheckProps) {
  return (
    <>
      {checks.map((check) => (
        <Checkbox
          key={check.name}
          className="check-option"
          isChecked={selectedChecks.includes(check.name)}
          labelText={check.name}
          onChange={() => handleSelectCheck(check.name)}
        />
      ))}
    </>
  );
}
