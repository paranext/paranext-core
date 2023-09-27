import { Checkbox } from 'papi-components';
import './basic-checks.component.scss';

export type BasicCheck = {
  name: string;
};

export function fetchChecks() {
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
    {
      name: 'Another Example 1',
    } as BasicCheck,
    {
      name: 'Another Example 2',
    } as BasicCheck,
    {
      name: 'Another Example 3',
    } as BasicCheck,
    {
      name: 'Another Example 4',
    } as BasicCheck,
    {
      name: 'Another Example 5',
    } as BasicCheck,
    {
      name: 'Another Example 6',
    } as BasicCheck,
  ];
}

type BasicCheckProps = {
  handleSelectChecks: (checkName: string) => void;
  selectedChecks: { [key: string]: boolean };
  checks: BasicCheck[];
};

export default function BasicChecks({
  handleSelectChecks,
  selectedChecks,
  checks,
}: BasicCheckProps) {
  return (
    <>
      {checks.map((check) => (
        <Checkbox
          className="check-option"
          isChecked={selectedChecks[check.name]}
          labelText={check.name}
          onChange={() => handleSelectChecks(check.name)}
        />
      ))}
    </>
  );
}
