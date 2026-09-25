import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { getShortcutKeycaps, ShortcutKeys } from './shortcut-keys.component';

describe('getShortcutKeycaps', () => {
  it('splits a macOS combo into its modifier and key, with no separator', () => {
    expect(getShortcutKeycaps('⌃F')).toEqual({ keycaps: ['⌃', 'F'], separator: '' });
  });

  it('splits a macOS combo with two modifiers', () => {
    expect(getShortcutKeycaps('⌥⌘M')).toEqual({ keycaps: ['⌥', '⌘', 'M'], separator: '' });
  });

  it('splits a Windows/Linux combo on the joining plus', () => {
    expect(getShortcutKeycaps('Ctrl+Shift+N')).toEqual({
      keycaps: ['Ctrl', 'Shift', 'N'],
      separator: '+',
    });
  });

  it('treats a trailing plus as the key rather than a separator', () => {
    expect(getShortcutKeycaps('Ctrl++')).toEqual({ keycaps: ['Ctrl', '+'], separator: '+' });
  });

  it('keeps a single key as one keycap', () => {
    expect(getShortcutKeycaps('F7')).toEqual({ keycaps: ['F7'], separator: '+' });
  });
});

describe('ShortcutKeys', () => {
  it('renders a single key as a lone Kbd with no group', () => {
    render(<ShortcutKeys hint="F7" />);
    const keycap = screen.getByText('F7');
    expect(keycap.tagName).toBe('KBD');
    expect(keycap.closest('[data-slot="kbd-group"]')).toBeNull();
  });

  it('renders a macOS combo as adjacent keycaps with no separator text', () => {
    render(<ShortcutKeys hint="⌃F" />);
    expect(screen.getByText('⌃').tagName).toBe('KBD');
    expect(screen.getByText('F').tagName).toBe('KBD');
    expect(screen.queryByText('+')).not.toBeInTheDocument();
  });

  it('renders a Windows/Linux combo with a plain-text plus between the keycaps', () => {
    render(<ShortcutKeys hint="Ctrl+Shift+N" />);
    ['Ctrl', 'Shift', 'N'].forEach((keycap) =>
      expect(screen.getByText(keycap).tagName).toBe('KBD'),
    );
    expect(screen.getAllByText('+')[0].tagName).toBe('SPAN');
    expect(document.querySelectorAll('kbd[data-slot="kbd"]')).toHaveLength(3);
  });

  it.each(['F7', 'Ctrl+Shift+N'])(
    'resets letter spacing on %s so a menu shortcut slot cannot spread the keycap letters apart',
    (hint) => {
      const { container } = render(<ShortcutKeys hint={hint} />);
      expect(container.firstElementChild).toHaveClass('tw:tracking-normal');
    },
  );

  it('gives the group ltr direction so keycap order survives a right-to-left layout', () => {
    render(<ShortcutKeys hint="Ctrl+Shift+N" />);
    const group = screen.getByText('Ctrl').closest('[data-slot="kbd-group"]');
    expect(group).toHaveAttribute('dir', 'ltr');
  });

  it('renders a Ctrl++ hint as two keycaps rather than three', () => {
    render(<ShortcutKeys hint="Ctrl++" />);
    expect(screen.getByText('Ctrl').tagName).toBe('KBD');
    expect(document.querySelectorAll('kbd[data-slot="kbd"]')).toHaveLength(2);
    // One "+" is the separator span, the other is the second keycap's own Kbd.
    const plusElements = screen.getAllByText('+');
    expect(plusElements.map((element) => element.tagName).sort()).toEqual(['KBD', 'SPAN']);
  });
});
