import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { beforeAll, beforeEach, describe, expect, test, vi } from 'vitest';
import { persistDirection } from '@/utils/dir-helper.util';
import {
  NavigationHistoryButtons,
  NavigationHistoryButtonsProps,
} from './navigation-history-buttons.component';

// jsdom doesn't ship ResizeObserver. Radix's Popper positioning (used by both the Tooltip and
// DropdownMenu content here) instantiates one on mount — with TooltipProvider's delayDuration=0,
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
    expect(screen.getByTestId('navigation-history-back-menu-trigger')).toBeDisabled();
    expect(screen.getByTestId('navigation-history-forward-menu-trigger')).toBeDisabled();
  });

  test('back dropdown lists history items and clicking one navigates by its offset', async () => {
    const user = userEvent.setup();
    render(<NavigationHistoryButtons {...defaultProps} />);
    await user.click(screen.getByTestId('navigation-history-back-menu-trigger'));
    const item = await screen.findByRole('menuitem', { name: 'Exodus 5:1' });
    await user.click(item);
    expect(defaultProps.onNavigate).toHaveBeenCalledWith(-2);
  });

  test('RTL mirrors the pair order', () => {
    persistDirection('rtl');
    render(<NavigationHistoryButtons {...defaultProps} />);
    const group = screen.getByTestId('navigation-history-buttons');
    const buttons = Array.from(group.querySelectorAll('[data-testid$="-button"]')).map((el) =>
      el.getAttribute('data-testid'),
    );
    // In RTL the forward split button renders first (back sits on the right, like Paratext 9)
    expect(buttons[0]).toBe('navigation-history-forward-button');
  });
});
