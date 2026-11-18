import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import React, { ReactNode } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import {
  ShortcutKeysLocalizedStrings,
  ShortcutKeysLocalizedStringsProvider,
} from '@/context/shortcut-keys-strings.context';
import { getSharedContextKey } from '@/context/shared-context.util';
import { installNoopResizeObserver } from '@/test-utils/resize-observer.util';
import { getShortcutKeyNames, getShortcutKeycaps, ShortcutKeys } from './shortcut-keys.component';

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

  it.each([
    // macOS: leading symbols, then one final key however many characters it is spelled with
    ['⌘F8', ['⌘', 'F8']],
    ['⌘F9', ['⌘', 'F9']],
    ['⌃Space', ['⌃', 'Space']],
    ['⌥⇧⌘L', ['⌥', '⇧', '⌘', 'L']],
    ['⌘⌥↑', ['⌘', '⌥', '↑']],
    ['⌃⇧T', ['⌃', '⇧', 'T']],
    ['⇧⌘Z', ['⇧', '⌘', 'Z']],
    ['⌘]', ['⌘', ']']],
    ['⌘[', ['⌘', '[']],
    ['⌘+', ['⌘', '+']],
    ['⌘-', ['⌘', '-']],
    ['⌘0', ['⌘', '0']],
    ['⌘=', ['⌘', '=']],
    ['⌥', ['⌥']],
    ['⌫', ['⌫']],
    ['⎋', ['⎋']],
    ['⇧⇥', ['⇧', '⇥']],
  ])('splits the macOS hint %s into %j, with no separator', (hint, keycaps) => {
    expect(getShortcutKeycaps(hint)).toEqual({ keycaps, separator: '' });
  });

  it.each([
    ['Ctrl+PageDown', ['Ctrl', 'PageDown']],
    ['Alt+←', ['Alt', '←']],
    ['Ctrl+-', ['Ctrl', '-']],
    ['Ctrl+Shift++', ['Ctrl', 'Shift', '+']],
    ['Shift+F10', ['Shift', 'F10']],
    ['F12', ['F12']],
    ['\\', ['\\']],
    ['*', ['*']],
    ['Backspace', ['Backspace']],
    ['', []],
  ])('splits the plus-joined hint %j into %j', (hint, keycaps) => {
    expect(getShortcutKeycaps(hint)).toEqual({ keycaps, separator: '+' });
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

describe('getShortcutKeyNames', () => {
  it.each([
    ['Ctrl++', ['Control', '+']],
    ['Ctrl+Shift+N', ['Control', 'Shift', 'N']],
    ['⌃F', ['Control', 'F']],
    ['⌥⇧⌘L', ['Option', 'Shift', 'Command', 'L']],
    ['Alt+←', ['Alt', 'Left Arrow']],
    ['Ctrl+Up', ['Control', 'Up Arrow']],
    ['Ctrl+PageDown', ['Control', 'Page Down']],
    ['F7', ['F7']],
  ])('names the keys of %s as %j', (hint, names) => {
    expect(getShortcutKeyNames(hint)).toEqual(names);
  });
});

describe('ShortcutKeys tooltip', () => {
  // The tooltip's popper measures itself with ResizeObserver, which jsdom lacks
  beforeAll(() => {
    installNoopResizeObserver();
  });

  const localizedStrings = { '%shortcutKeys_tooltip%': 'Press {keys}' };

  /** Renders the keycaps the way the app does: with the strings provided above them */
  function renderWithStrings(
    ui: ReactNode,
    strings: ShortcutKeysLocalizedStrings = localizedStrings,
    // Pinned so the expected text does not depend on the test machine's own locale
    locale = 'en',
  ) {
    return render(
      <ShortcutKeysLocalizedStringsProvider localizedStrings={strings} locale={locale}>
        {ui}
      </ShortcutKeysLocalizedStringsProvider>,
    );
  }

  async function hoverKeycaps() {
    const trigger = document.querySelector('[data-slot="tooltip-trigger"]');
    if (!trigger) throw new Error('No tooltip trigger rendered');
    await userEvent.hover(trigger);
  }

  it.each([
    ['Ctrl++', 'Press Control and +'],
    ['Ctrl+Shift+N', 'Press Control, Shift and N'],
    ['⌥⇧⌘L', 'Press Option, Shift, Command and L'],
    ['⌘=', 'Press Command and ='],
    ['F7', 'Press F7'],
  ])('reads %s out as "%s" when the keycaps are hovered', async (hint, expected) => {
    // No TooltipProvider above: a menu does not need one for its keycaps to get a tooltip
    renderWithStrings(<ShortcutKeys hint={hint} />);
    await hoverKeycaps();
    expect(await screen.findByRole('tooltip')).toHaveTextContent(expected);
  });

  it('joins the keys in the language of the strings, not the runtime locale', async () => {
    renderWithStrings(
      <ShortcutKeys hint="Ctrl+Shift+N" />,
      { '%shortcutKeys_tooltip%': 'Presione {keys}' },
      'es',
    );
    await hoverKeycaps();
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Presione Control, Shift y N');
  });

  it('reads strings that another copy of this library provides through the shared context', async () => {
    // Another copy (an extension's bundled one, or the platform's) finds the context in this slot.
    // `globalThis` has no symbol index signature, so reading the slot needs the assertion
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const SharedContext = (globalThis as unknown as Record<symbol, React.Context<unknown>>)[
      getSharedContextKey('shortcutKeysLocalization')
    ];
    render(
      <SharedContext.Provider value={{ localizedStrings, locale: 'en' }}>
        <ShortcutKeys hint="Ctrl++" />
      </SharedContext.Provider>,
    );
    await hoverKeycaps();
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Press Control and +');
  });

  it('shows each key name in the tooltip as a keycap', async () => {
    renderWithStrings(<ShortcutKeys hint="Ctrl++" />);
    await hoverKeycaps();
    const tooltip = await screen.findByRole('tooltip');
    expect(Array.from(tooltip.querySelectorAll('kbd')).map((kbd) => kbd.textContent)).toEqual([
      'Control',
      '+',
    ]);
  });

  it('adds no tooltip of its own inside another tooltip', async () => {
    renderWithStrings(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Undo</TooltipTrigger>
          <TooltipContent>
            Undo <ShortcutKeys hint="Ctrl+Z" />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );
    await userEvent.hover(screen.getByRole('button', { name: 'Undo' }));
    const outerTooltip = await screen.findByRole('tooltip');
    // Positive control: the keycaps did render inside the outer tooltip
    expect(outerTooltip).toHaveTextContent('Ctrl+Z');
    expect(
      document.querySelectorAll('[data-slot="tooltip-content"] [data-slot="tooltip-trigger"]'),
    ).toHaveLength(0);
  });

  it.each([
    ['no strings are provided', {}],
    // While the strings load, the value is the key itself
    ['the strings have not loaded', { '%shortcutKeys_tooltip%': '%shortcutKeys_tooltip%' }],
  ])('has no tooltip when %s', (_, strings: ShortcutKeysLocalizedStrings) => {
    renderWithStrings(<ShortcutKeys hint="Ctrl++" />, strings);
    // Positive control: the keycaps rendered
    expect(screen.getByText('Ctrl')).toBeInTheDocument();
    expect(document.querySelector('[data-slot="tooltip-trigger"]')).toBeNull();
  });
});
