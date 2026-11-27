import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Check, Sparkles, X } from 'lucide-react';
import { IconCatalog } from './icon-catalog.component';
import type { IconCatalogEntry } from './icon-usage.model';

const ENTRIES: IconCatalogEntry[] = [
  {
    name: 'X',
    library: 'lucide-react',
    component: X,
    usages: [
      { location: 'src/a.tsx', meaning: 'Close the dialog', concept: 'close' },
      { location: 'src/b.tsx', meaning: 'Deny a result', concept: 'deny-check' },
    ],
  },
  {
    name: 'Check',
    library: 'lucide-react',
    component: Check,
    importedAs: ['CheckIcon'],
    usages: [{ location: 'src/c.tsx', meaning: 'Accept', concept: 'submit' }],
  },
  {
    name: 'Sparkles',
    library: 'lucide-react',
    component: Sparkles,
    lucideName: 'sparkles',
    usages: [],
  },
];

describe('IconCatalog', () => {
  it('summarizes each detected conflict with its recommendation and severity', () => {
    render(
      <IconCatalog
        entries={ENTRIES}
        conflictNotes={{ 'icon:X': { severity: 'fix', recommendation: 'Use Ban for deny.' } }}
      />,
    );
    expect(screen.getByText('X used for 2 meanings')).toBeInTheDocument();
    expect(screen.getByText('Use Ban for deny.')).toBeInTheDocument();
    expect(screen.getByText('Fix')).toBeInTheDocument();
  });

  it('still shows a conflict that has no recommendation yet', () => {
    render(<IconCatalog entries={ENTRIES} conflictNotes={{}} />);
    expect(screen.getByText('X used for 2 meanings')).toBeInTheDocument();
    expect(screen.getByText('No assessment recorded yet.')).toBeInTheDocument();
  });

  it('lists each usage with a link to its source, aliases, and unused registered names', () => {
    render(<IconCatalog entries={ENTRIES} conflictNotes={{}} repoBaseUrl="https://repo" />);
    expect(screen.getByRole('link', { name: 'src/a.tsx' })).toHaveAttribute(
      'href',
      'https://repo/src/a.tsx',
    );
    expect(screen.getByText('Deny a result')).toBeInTheDocument();
    expect(screen.getByText('also imported as CheckIcon')).toBeInTheDocument();
    expect(screen.getByText('Registered for use by name; not used yet')).toBeInTheDocument();
  });
});
