import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  KeyboardShortcutsCatalog,
  KeyboardShortcutEntry,
} from './keyboard-shortcuts-catalog.component';

const ENTRIES: KeyboardShortcutEntry[] = [
  {
    id: 'next-tab',
    purpose: 'Switch to the next tab',
    category: 'Navigation',
    context: 'Main process (global)',
    keys: { macOS: '⌘⇧]', windows: 'Ctrl+Tab', linux: 'Ctrl+Tab' },
    locations: ['src/main/main.ts'],
  },
  {
    id: 'undo',
    purpose: 'Undo the last edit',
    category: 'Editing',
    context: 'Editor',
    keys: { macOS: '⌘Z', windows: 'Ctrl+Z', linux: 'Ctrl+Z' },
    locations: ['a.ts', 'b.ts'],
  },
];

describe('KeyboardShortcutsCatalog', () => {
  it('renders a section heading per category', () => {
    render(<KeyboardShortcutsCatalog entries={ENTRIES} />);
    expect(screen.getByRole('heading', { name: 'Navigation' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Editing' })).toBeInTheDocument();
  });

  it('renders each per-OS key combination', () => {
    render(<KeyboardShortcutsCatalog entries={ENTRIES} />);
    expect(screen.getByText('Ctrl+Tab')).toBeInTheDocument();
    expect(screen.getByText('⌘Z')).toBeInTheDocument();
  });

  it('links each location to the repo and shows the location count', () => {
    render(
      <KeyboardShortcutsCatalog entries={ENTRIES} repoBaseUrl="https://example.com/blob/main" />,
    );
    const link = screen.getByRole('link', { name: 'a.ts' });
    expect(link).toHaveAttribute('href', 'https://example.com/blob/main/a.ts');
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('uses provided localized header strings', () => {
    render(
      <KeyboardShortcutsCatalog
        entries={ENTRIES}
        localizedStrings={{ '%keyboardShortcutsCatalog_header_purpose%': 'Purpose-XYZ' }}
      />,
    );
    expect(screen.getByText('Purpose-XYZ')).toBeInTheDocument();
  });

  it('keeps every platform visible, joining labels when combos match', () => {
    render(<KeyboardShortcutsCatalog entries={ENTRIES} />);
    // next-tab: Windows and Linux both use Ctrl+Tab -> one joined row, neither platform dropped.
    // Both ENTRIES have Windows/Linux sharing a combo, so getAllByText checks at least one exists.
    expect(screen.getAllByText('Windows / Linux').length).toBeGreaterThan(0);
    expect(screen.getAllByText('macOS').length).toBeGreaterThan(0);
  });

  it('labels a combo shared across every OS as "All OS" rather than repeating each platform', () => {
    const sharedEntry: KeyboardShortcutEntry = {
      id: 'dev-tools',
      purpose: 'Open developer tools',
      category: 'Developer',
      context: 'Main process (global)',
      keys: { macOS: 'F12', windows: 'F12', linux: 'F12' },
      locations: ['src/main/main.ts'],
    };
    render(<KeyboardShortcutsCatalog entries={[sharedEntry]} />);
    expect(screen.getByText('All OS')).toBeInTheDocument();
    expect(screen.queryByText('macOS / Windows / Linux')).not.toBeInTheDocument();
  });

  it('falls back to default English headers for keys not overridden', () => {
    render(
      <KeyboardShortcutsCatalog
        entries={ENTRIES}
        localizedStrings={{ '%keyboardShortcutsCatalog_header_purpose%': 'Purpose-XYZ' }}
      />,
    );
    expect(screen.getByText('Purpose-XYZ')).toBeInTheDocument();
    expect(screen.getByText('Shortcut')).toBeInTheDocument();
    expect(screen.getByText('Where in code')).toBeInTheDocument();
  });
});
