import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { beforeAll, beforeEach, describe, expect, test, vi } from 'vitest';
import { persistDirection } from '@/utils/dir-helper.util';
import {
  NavigationHistoryButtons,
  NavigationHistoryButtonsProps,
} from './navigation-history-buttons.component';

// jsdom doesn't ship ResizeObserver. Radix's Popper positioning (used by both the Tooltip and
// ContextMenu content here) instantiates one on mount — with TooltipProvider's delayDuration=0,
// a plain click can open the tooltip synchronously, so this is needed even for click-only tests.
// Same stub as project-selector.component.test.tsx.
class NoopResizeObserver implements ResizeObserver {
  private readonly targets = new Set<Element>();

  observe(target: Element) {
    this.targets.add(target);
  }

  unobserve(target: Element) {
    this.targets.delete(target);
  }

  disconnect() {
    this.targets.clear();
  }
}

beforeAll(() => {
  if (typeof globalThis.ResizeObserver === 'undefined') {
    globalThis.ResizeObserver = NoopResizeObserver;
  }
});

const defaultProps: NavigationHistoryButtonsProps = {
  canGoBack: true,
  canGoForward: true,
  backItems: [
    { label: 'Genesis 1:1', offset: -1 },
    { label: 'Exodus 5:1', offset: -2 },
  ],
  forwardItems: [{ label: 'Mark 4:1', offset: 1 }],
  onNavigate: vi.fn(),
};

beforeEach(() => {
  persistDirection('ltr');
  vi.clearAllMocks();
});

describe('NavigationHistoryButtons', () => {
  test('clicking back/forward calls onNavigate with ±1', async () => {
    const user = userEvent.setup();
    render(<NavigationHistoryButtons {...defaultProps} />);
    await user.click(screen.getByTestId('navigation-history-back-button'));
    expect(defaultProps.onNavigate).toHaveBeenCalledWith(-1);
    await user.click(screen.getByTestId('navigation-history-forward-button'));
    expect(defaultProps.onNavigate).toHaveBeenCalledWith(1);
  });

  test('left-clicking navigates without opening the history menu', async () => {
    const user = userEvent.setup();
    render(<NavigationHistoryButtons {...defaultProps} />);
    await user.click(screen.getByTestId('navigation-history-back-button'));
    expect(defaultProps.onNavigate).toHaveBeenCalledWith(-1);
    expect(screen.queryByRole('menu')).toBeNull();
  });

  test('buttons are disabled when canGoBack/canGoForward are false', () => {
    render(
      <NavigationHistoryButtons
        {...defaultProps}
        canGoBack={false}
        canGoForward={false}
        backItems={[]}
        forwardItems={[]}
      />,
    );
    expect(screen.getByTestId('navigation-history-back-button')).toBeDisabled();
    expect(screen.getByTestId('navigation-history-forward-button')).toBeDisabled();
  });

  test('right-clicking back opens its history menu and clicking an entry navigates by its offset', async () => {
    const user = userEvent.setup();
    render(<NavigationHistoryButtons {...defaultProps} />);
    await user.pointer({
      keys: '[MouseRight]',
      target: screen.getByTestId('navigation-history-back-button'),
    });
    // No localizedStrings passed, so the menu's accessible name falls back to the key itself
    const menu = await screen.findByRole('menu');
    expect(menu).toHaveAccessibleName('%navigationHistory_backList_ariaLabel%');
    const item = screen.getByRole('menuitem', { name: 'Exodus 5:1' });
    await user.click(item);
    expect(defaultProps.onNavigate).toHaveBeenCalledWith(-2);
  });

  test('right-clicking forward opens the forward history menu', async () => {
    const user = userEvent.setup();
    render(<NavigationHistoryButtons {...defaultProps} />);
    await user.pointer({
      keys: '[MouseRight]',
      target: screen.getByTestId('navigation-history-forward-button'),
    });
    const item = await screen.findByRole('menuitem', { name: 'Mark 4:1' });
    await user.click(item);
    expect(defaultProps.onNavigate).toHaveBeenCalledWith(1);
  });

  test('right-clicking a button with no history entries does not open a menu', () => {
    render(<NavigationHistoryButtons {...defaultProps} canGoForward={false} forwardItems={[]} />);
    // fireEvent rather than userEvent: the button is disabled, so a real pointer would hit the
    // wrapper — this asserts the ContextMenuTrigger itself is disabled even if an event lands on it
    fireEvent.contextMenu(screen.getByTestId('navigation-history-forward-button'));
    expect(screen.queryByRole('menu')).toBeNull();
  });

  test('RTL mirrors the pair order', () => {
    persistDirection('rtl');
    render(<NavigationHistoryButtons {...defaultProps} />);
    const group = screen.getByTestId('navigation-history-buttons');
    const buttons = Array.from(group.querySelectorAll('[data-testid$="-button"]')).map((el) =>
      el.getAttribute('data-testid'),
    );
    // In RTL the forward button renders first (back sits on the right, like Paratext 9)
    expect(buttons[0]).toBe('navigation-history-forward-button');
  });

  test('RTL flips the arrow icons and swaps the shortcut hint in the back tooltip', async () => {
    persistDirection('rtl');
    const user = userEvent.setup();
    render(<NavigationHistoryButtons {...defaultProps} />);

    // Arrow glyphs mirror in RTL: back points right, forward points left
    const backButton = screen.getByTestId('navigation-history-back-button');
    const forwardButton = screen.getByTestId('navigation-history-forward-button');
    expect(backButton.querySelector('.lucide-arrow-right')).not.toBeNull();
    expect(backButton.querySelector('.lucide-arrow-left')).toBeNull();
    expect(forwardButton.querySelector('.lucide-arrow-left')).not.toBeNull();
    expect(forwardButton.querySelector('.lucide-arrow-right')).toBeNull();

    // Shortcut hints swap in RTL (physical-direction preserving): back shows the physically-right
    // key. jsdom's userAgent is non-Mac, so the Windows/Linux hints apply.
    await user.hover(backButton);
    // Radix Tooltip can render the content text more than once (a visually-hidden copy for screen
    // readers), so assert on "at least one" rather than exactly one
    const hints = await screen.findAllByText('Alt+→');
    expect(hints.length).toBeGreaterThan(0);
    expect(screen.queryByText('Alt+←')).toBeNull();
  });

  test('LTR back tooltip shows the unswapped shortcut hint', async () => {
    const user = userEvent.setup();
    render(<NavigationHistoryButtons {...defaultProps} />);
    await user.hover(screen.getByTestId('navigation-history-back-button'));
    const hints = await screen.findAllByText('Alt+←');
    expect(hints.length).toBeGreaterThan(0);
    expect(screen.queryByText('Alt+→')).toBeNull();
  });

  test('hovering a disabled button still shows its tooltip (span wrapper is the trigger)', async () => {
    const user = userEvent.setup();
    render(<NavigationHistoryButtons {...defaultProps} canGoForward={false} forwardItems={[]} />);
    // A disabled button gets pointer-events-none, so the cursor actually hits the span wrapper
    const wrapper = screen.getByTestId('navigation-history-forward-button').parentElement;
    if (!wrapper) throw new Error('expected a tooltip-trigger wrapper around the disabled button');
    await user.hover(wrapper);
    const tooltip = await screen.findByRole('tooltip');
    expect(tooltip).toHaveTextContent('%navigationHistory_forward_tooltip%');
  });

  test('showKeyboardShortcuts={false} renders no Kbd hint in the opened tooltip', async () => {
    const user = userEvent.setup();
    render(<NavigationHistoryButtons {...defaultProps} showKeyboardShortcuts={false} />);
    await user.hover(screen.getByTestId('navigation-history-back-button'));
    // Wait until the tooltip content is open before asserting the hint is absent
    await screen.findByRole('tooltip');
    expect(document.querySelector('[data-slot="kbd"]')).toBeNull();
  });
});
