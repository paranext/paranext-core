import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { afterEach, beforeAll, describe, expect, test, vi } from 'vitest';
import { UndoRedoButtons } from './undo-redo-buttons.component';

// jsdom doesn't ship ResizeObserver. Radix's Popper positioning (used by the Tooltip content
// here) instantiates one on mount. Same stub as navigation-history-buttons.component.test.tsx.
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

const originalUserAgent = navigator.userAgent;

function setUserAgent(userAgent: string) {
  Object.defineProperty(window.navigator, 'userAgent', { value: userAgent, configurable: true });
}

afterEach(() => {
  setUserAgent(originalUserAgent);
});

/**
 * Every rendered copy of `text` has tag name `tagName`. Radix Tooltip can render the content text
 * more than once (a visually-hidden copy for screen readers), so this checks "at least one, and all
 * of them" rather than assuming exactly one match (same precedent as
 * navigation-history-buttons.component.test.tsx).
 */
function allCopiesAre(text: string, tagName: string): boolean {
  const matches = screen.getAllByText(text);
  return matches.length > 0 && matches.every((match) => match.tagName === tagName);
}

describe('UndoRedoButtons keyboard shortcut hints', () => {
  test('shows the Windows/Linux undo chord as separate Ctrl/Z keycaps joined by a plus', async () => {
    const user = userEvent.setup();
    render(<UndoRedoButtons onUndoClick={vi.fn()} onRedoClick={vi.fn()} />);
    await user.hover(screen.getByRole('button', { name: '%undoButton_tooltip%' }));
    await screen.findByRole('tooltip');
    expect(allCopiesAre('Ctrl', 'KBD')).toBe(true);
    expect(allCopiesAre('Z', 'KBD')).toBe(true);
    expect(allCopiesAre('+', 'SPAN')).toBe(true);
  });

  test('shows the Windows/Linux redo chord as separate Ctrl/Y keycaps joined by a plus', async () => {
    const user = userEvent.setup();
    render(<UndoRedoButtons onUndoClick={vi.fn()} onRedoClick={vi.fn()} />);
    await user.hover(screen.getByRole('button', { name: '%redoButton_tooltip%' }));
    await screen.findByRole('tooltip');
    expect(allCopiesAre('Ctrl', 'KBD')).toBe(true);
    expect(allCopiesAre('Y', 'KBD')).toBe(true);
    expect(allCopiesAre('+', 'SPAN')).toBe(true);
  });

  test('shows the macOS undo chord as two adjacent keycaps with no separator', async () => {
    setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36');
    const user = userEvent.setup();
    render(<UndoRedoButtons onUndoClick={vi.fn()} onRedoClick={vi.fn()} />);
    await user.hover(screen.getByRole('button', { name: '%undoButton_tooltip%' }));
    await screen.findByRole('tooltip');
    expect(allCopiesAre('⌘', 'KBD')).toBe(true);
    expect(allCopiesAre('Z', 'KBD')).toBe(true);
    expect(screen.queryByText('+')).not.toBeInTheDocument();
  });

  test('shows the macOS redo chord as three adjacent keycaps with no separator', async () => {
    setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36');
    const user = userEvent.setup();
    render(<UndoRedoButtons onUndoClick={vi.fn()} onRedoClick={vi.fn()} />);
    await user.hover(screen.getByRole('button', { name: '%redoButton_tooltip%' }));
    await screen.findByRole('tooltip');
    expect(allCopiesAre('⌘', 'KBD')).toBe(true);
    expect(allCopiesAre('⇧', 'KBD')).toBe(true);
    expect(allCopiesAre('Z', 'KBD')).toBe(true);
    expect(screen.queryByText('+')).not.toBeInTheDocument();
  });

  test('showKeyboardShortcuts={false} renders no keycap in the tooltip', async () => {
    const user = userEvent.setup();
    render(
      <UndoRedoButtons onUndoClick={vi.fn()} onRedoClick={vi.fn()} showKeyboardShortcuts={false} />,
    );
    await user.hover(screen.getByRole('button', { name: '%undoButton_tooltip%' }));
    await screen.findByRole('tooltip');
    expect(document.querySelector('[data-slot="kbd"]')).toBeNull();
  });
});
