import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import '@testing-library/jest-dom';
import { createContext, ReactNode } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';
import {
  ShortcutKeysLocalizedStrings,
  ShortcutKeysLocalizedStringsProvider,
} from '@/context/shortcut-keys-strings.context';
import { getSharedContextKey } from '@/context/shared-context.util';
import { installNoopResizeObserver } from '@/test-utils/resize-observer.util';
import {
  READOUT_OPEN_DELAY_MS,
  getInlineEndSide,
  getShortcutKeyNames,
  getShortcutKeycaps,
  ShortcutKeys,
} from './shortcut-keys.component';

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

describe('getInlineEndSide', () => {
  afterEach(() => localStorage.removeItem('layoutDirection'));

  // The tooltip's requested side; jsdom has no layout room, so the placed side is not testable
  it.each([
    ['rtl', 'left'],
    ['ltr', 'right'],
  ])('puts the tooltip at the inline end of a %s layout: %s', (direction, side) => {
    localStorage.setItem('layoutDirection', direction);
    expect(getInlineEndSide()).toBe(side);
  });
});

describe('ShortcutKeys tooltip', () => {
  // The tooltip's popper measures itself with ResizeObserver, which jsdom lacks
  beforeAll(() => {
    installNoopResizeObserver();
  });

  // Fake timeouts so a test skips the readout's open delay instead of waiting it out. Only the
  // timeouts, so the popper keeps its real scheduling. Assert with `getBy*`, not `findBy*`: a
  // `findBy*` timeout is itself a faked timeout, so a missing tooltip would hang instead of failing.
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  /** A user whose pauses between actions move the fake clock instead of waiting on it */
  function setUpUser() {
    return userEvent.setup({ advanceTimers: vi.advanceTimersByTime, pointerEventsCheck: 0 });
  }

  /** Lets the pointer rest on the keycaps for as long as the readout waits before opening */
  function waitOutOpenDelay() {
    act(() => {
      vi.advanceTimersByTime(READOUT_OPEN_DELAY_MS);
    });
  }

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
    await setUpUser().hover(trigger);
  }

  /** Hovers the keycaps and rests there until the readout opens */
  async function restOnKeycaps() {
    await hoverKeycaps();
    waitOutOpenDelay();
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
    await restOnKeycaps();
    expect(screen.getByRole('tooltip')).toHaveTextContent(expected);
  });

  it('joins the keys in the language of the strings, not the runtime locale', async () => {
    renderWithStrings(
      <ShortcutKeys hint="Ctrl+Shift+N" />,
      { '%shortcutKeys_tooltip%': 'Presione {keys}' },
      'es',
    );
    await restOnKeycaps();
    expect(screen.getByRole('tooltip')).toHaveTextContent('Presione Control, Shift y N');
  });

  it.each([
    // The last separator follows the last key on its own: Spanish writes "e" before an "i" sound
    ['Ctrl+Shift+I', 'Presione Control, Shift e I'],
    ['Ctrl+I', 'Presione Control e I'],
  ])('keeps the form the language gives the last key in %s', async (hint, expected) => {
    renderWithStrings(
      <ShortcutKeys hint={hint} />,
      { '%shortcutKeys_tooltip%': 'Presione {keys}' },
      'es',
    );
    await restOnKeycaps();
    expect(screen.getByRole('tooltip')).toHaveTextContent(expected);
  });

  it('falls back to the runtime locale for a malformed language tag instead of failing', async () => {
    renderWithStrings(<ShortcutKeys hint="Ctrl++" />, localizedStrings, 'en_US');
    await restOnKeycaps();
    // The template still renders; only the language of the "and" may differ
    expect(screen.getByRole('tooltip')).toHaveTextContent(/^Press Control .*\+$/);
  });

  it('reads strings from the context another copy of this library put in the shared slot', async () => {
    // What a web view's frame holds once the platform copied the main window's slot into it: a
    // context this module instance did not create
    const key = getSharedContextKey('shortcutKeysLocalization');
    // `globalThis` has no symbol index signature; the test reads and resets the one slot it touches
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const registry = globalThis as unknown as Record<symbol, unknown>;
    const original = registry[key];
    const OtherCopysContext = createContext<unknown>({ localizedStrings: {} });
    registry[key] = OtherCopysContext;
    vi.resetModules();
    try {
      const { ShortcutKeys: ShortcutKeysFromThisCopy } = await import('./shortcut-keys.component');
      render(
        <OtherCopysContext.Provider value={{ localizedStrings, locale: 'en' }}>
          <ShortcutKeysFromThisCopy hint="Ctrl++" />
        </OtherCopysContext.Provider>,
      );
      await restOnKeycaps();
      expect(screen.getByRole('tooltip')).toHaveTextContent('Press Control and +');
    } finally {
      registry[key] = original;
      vi.resetModules();
    }
  });

  it('waits for the pointer to rest on the keycaps before opening', async () => {
    renderWithStrings(<ShortcutKeys hint="Ctrl++" />);
    await hoverKeycaps();
    // Not yet: a pointer passing over the keycaps opens nothing, even just short of the delay
    act(() => {
      vi.advanceTimersByTime(READOUT_OPEN_DELAY_MS - 1);
    });
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    // Positive control: resting there opens it once the delay has passed
    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(screen.getByRole('tooltip')).toHaveTextContent('Press Control and +');
  });

  it('shows each key name in the tooltip as a keycap', async () => {
    renderWithStrings(<ShortcutKeys hint="Ctrl++" />);
    await restOnKeycaps();
    const tooltip = screen.getByRole('tooltip');
    expect(Array.from(tooltip.querySelectorAll('kbd')).map((kbd) => kbd.textContent)).toEqual([
      'Control',
      '+',
    ]);
  });

  describe('in a menu', () => {
    function renderMenu() {
      renderWithStrings(
        <DropdownMenu>
          <DropdownMenuTrigger>Project</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              Zoom in
              <DropdownMenuShortcut>
                <ShortcutKeys hint="Ctrl++" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Zoom out
              <DropdownMenuShortcut>
                <ShortcutKeys hint="Ctrl+-" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>,
      );
    }

    async function openMenuAndHoverFirstKeycaps() {
      const user = setUpUser();
      await user.click(screen.getByRole('button', { name: 'Project' }));
      screen.getByRole('menu');
      const trigger = document.querySelector('[role="menu"] [data-slot="tooltip-trigger"]');
      if (!trigger) throw new Error('No keycap tooltip trigger in the menu');
      await user.hover(trigger);
      waitOutOpenDelay();
      // Positive control: the keycap tooltip is open, so it is the topmost layer
      screen.getByRole('tooltip');
      return user;
    }

    it('closes the menu with one Escape while the pointer rests on its keycaps', async () => {
      renderMenu();
      const user = await openMenuAndHoverFirstKeycaps();

      await user.keyboard('{Escape}');

      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });

    it('gives the keycap tooltip no exit animation, so its layer goes before the menu sees the key', async () => {
      // jsdom runs no CSS animations, so the test above passes even with one. In a browser, Radix
      // keeps the content (and the layer that swallows Escape) mounted until an exit animation ends,
      // so this class is what the single-Escape behavior depends on there.
      renderMenu();
      await openMenuAndHoverFirstKeycaps();
      expect(document.querySelector('[data-slot="tooltip-content"]')).toHaveClass(
        'tw:data-closed:animate-none!',
      );
    });

    it('closes the keycap tooltip when a key moves through the menu', async () => {
      renderMenu();
      const user = await openMenuAndHoverFirstKeycaps();

      await user.keyboard('{ArrowDown}');

      // Positive control: the key reached the menu, which is still open
      expect(screen.getByRole('menu')).toBeInTheDocument();
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
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
    await setUpUser().hover(screen.getByRole('button', { name: 'Undo' }));
    const outerTooltip = screen.getByRole('tooltip');
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
