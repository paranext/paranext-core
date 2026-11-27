import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import '@testing-library/jest-dom';
import type {
  KeyboardShortcutEntry,
  Paratext9OnlyShortcut,
} from '@shared/data/keyboard-shortcuts.model';
import { detectViewerOs, KeyboardShortcutsCatalog } from './keyboard-shortcuts-catalog.component';

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

  it('renders each key of a combination in its own keycap', () => {
    render(<KeyboardShortcutsCatalog entries={ENTRIES} />);
    ['Ctrl', 'Tab', '⌘', 'Z', '⇧', ']'].forEach((keycap) => {
      expect(screen.getAllByText(keycap)[0].tagName).toBe('KBD');
    });
    expect(screen.queryByText('Ctrl+Tab')).not.toBeInTheDocument();
    expect(screen.queryByText('⌘Z')).not.toBeInTheDocument();
  });

  it('renders the Windows joining plus as plain text outside the keycaps', () => {
    render(<KeyboardShortcutsCatalog entries={ENTRIES} />);
    expect(screen.getAllByText('+')[0].tagName).toBe('SPAN');
  });

  it('renders a single-key shortcut as a lone keycap with no group', () => {
    const singleKeyEntry: KeyboardShortcutEntry = {
      id: 'dev-tools',
      purpose: 'Open developer tools',
      category: 'Developer',
      context: 'Main process (global)',
      keys: { macOS: 'F12', windows: 'F12', linux: 'F12' },
      locations: ['src/main/main.ts'],
    };
    render(<KeyboardShortcutsCatalog entries={[singleKeyEntry]} />);
    const keycap = screen.getByText('F12');
    expect(keycap.tagName).toBe('KBD');
    expect(keycap.closest('[data-slot="kbd-group"]')).toBeNull();
  });

  it('renders a no-equivalent marker as plain text rather than a keycap', () => {
    const macOsOnlyEntry: KeyboardShortcutEntry = {
      id: 'toggle-menu',
      purpose: 'Focus the application menu',
      category: 'Navigation',
      context: 'Main process (global)',
      keys: { macOS: '— (no equivalent)', windows: 'Alt', linux: 'Alt' },
      locations: ['src/main/main.ts'],
    };
    render(<KeyboardShortcutsCatalog entries={[macOsOnlyEntry]} />);
    expect(screen.getByText('— (no equivalent)').tagName).toBe('SPAN');
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
    // Shared-combo OS labels are joined with ` | ` (distinct from the ` / ` used within a combo).
    expect(screen.getAllByText('Windows | Linux').length).toBeGreaterThan(0);
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

  it('shows only the selected OS keys, and every OS again under All', async () => {
    render(<KeyboardShortcutsCatalog defaultOs="windows" entries={ENTRIES} />);
    expect(screen.getAllByText('Ctrl').length).toBeGreaterThan(0);
    expect(screen.queryByText('⌘')).not.toBeInTheDocument();
    expect(screen.queryByText('Windows | Linux')).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('radio', { name: 'macOS' }));
    expect(screen.getAllByText('⌘').length).toBeGreaterThan(0);
    expect(screen.queryByText('Ctrl')).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('radio', { name: 'All' }));
    expect(screen.getAllByText('⌘').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Ctrl').length).toBeGreaterThan(0);
  });

  it.each([
    ['Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36', 'macOS'],
    ['Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 'windows'],
    ['Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36', 'linux'],
    ['SomeBrowser/1.0', 'all'],
  ])('detects the viewer OS from "%s" as %s', (userAgent, expected) => {
    const spy = vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue(userAgent);
    try {
      expect(detectViewerOs()).toBe(expected);
    } finally {
      spy.mockRestore();
    }
  });

  it('marks each side of a conflict and lists the pair once in the Conflicts section', () => {
    const conflicting: KeyboardShortcutEntry[] = [
      {
        ...ENTRIES[1],
        id: 'a',
        purpose: 'Purpose A',
        conflicts: [{ id: 'b', note: 'Note from A' }],
      },
      {
        ...ENTRIES[1],
        id: 'b',
        purpose: 'Purpose B',
        conflicts: [{ id: 'a', note: 'Note from B' }],
      },
    ];
    render(<KeyboardShortcutsCatalog defaultOs="all" entries={conflicting} />);
    expect(screen.getByText('Conflicts with b')).toBeInTheDocument();
    expect(screen.getByText('Conflicts with a')).toBeInTheDocument();
    const section = screen.getByRole('heading', { name: 'Conflicts' }).closest('section');
    expect(section).not.toBeNull();
    if (!section) return;
    expect(within(section).getAllByRole('row')).toHaveLength(2); // header + one pair
    expect(within(section).getByText('Note from A')).toBeInTheDocument();
    expect(within(section).getByText('Note from B')).toBeInTheDocument();
  });

  it('says so when no conflicts are recorded', () => {
    render(<KeyboardShortcutsCatalog defaultOs="all" entries={ENTRIES} />);
    expect(screen.getByText('No conflicts are recorded.')).toBeInTheDocument();
  });

  it('shows the Paratext 9 comparison, or that none is recorded', () => {
    const compared: KeyboardShortcutEntry = {
      ...ENTRIES[1],
      paratext9: {
        status: 'differs',
        keys: 'Ctrl+E',
        note: 'Cycled views',
        source:
          '.context/research/paratext-9-features/01_Translation_Workspace.md § 1.2 Editor Views',
      },
    };
    render(<KeyboardShortcutsCatalog defaultOs="all" entries={[compared, ENTRIES[0]]} />);
    expect(screen.getByText('Differs from Paratext 9')).toBeInTheDocument();
    expect(screen.getByText('Cycled views')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '01_Translation_Workspace.md' })).toHaveAttribute(
      'href',
      'https://github.com/paranext/paranext-core/blob/main/.context/research/paratext-9-features/01_Translation_Workspace.md',
    );
    expect(screen.getByText('Not recorded')).toBeInTheDocument();
  });

  it('lists Paratext 9 shortcuts that have no equivalent in their own section', () => {
    const paratext9Only: Paratext9OnlyShortcut[] = [
      {
        id: 'pt9-quick-reference',
        purpose: 'Open the Quick reference window',
        keys: 'Ctrl+Q',
        note: 'Tools menu',
        source:
          '.context/research/paratext-9-features/01_Translation_Workspace.md § 1.8 Quick Reference Window',
      },
    ];
    render(
      <KeyboardShortcutsCatalog defaultOs="all" entries={ENTRIES} paratext9Only={paratext9Only} />,
    );
    const section = screen
      .getByRole('heading', { name: 'Paratext 9 shortcuts with no equivalent' })
      .closest('section');
    expect(section).not.toBeNull();
    if (!section) return;
    expect(within(section).getByText('Open the Quick reference window')).toBeInTheDocument();
    expect(within(section).getByText('Q').tagName).toBe('KBD');
  });

  it('marks an entry whose chord menus show as a hint', () => {
    render(
      <KeyboardShortcutsCatalog
        entries={[{ ...ENTRIES[1], command: 'platformScriptureEditor.undo' }, ENTRIES[0]]}
      />,
    );
    expect(screen.getAllByText('Shown in menus')).toHaveLength(1);
  });
});
