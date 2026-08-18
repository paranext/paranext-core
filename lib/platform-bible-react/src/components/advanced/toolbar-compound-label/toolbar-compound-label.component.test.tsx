// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { beforeAll, describe, expect, test } from 'vitest';
import { ToolbarCompoundLabel } from './toolbar-compound-label.component';

// jsdom doesn't ship ResizeObserver. Radix's Popper positioning (used by the Tooltip content here)
// instantiates one on mount, and TooltipProvider's delayDuration=0 means a hover opens it
// synchronously. Same stub as navigation-history-buttons.component.test.tsx.
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

/**
 * Jsdom reports every layout metric as 0, so clipping has to be stated explicitly. `scrollWidth >
 * clientWidth` is what `useTruncationTooltip` reads to decide whether the text is actually cut
 * off.
 */
function setClipping(
  element: HTMLElement,
  { scrollWidth, clientWidth }: { scrollWidth: number; clientWidth: number },
) {
  Object.defineProperty(element, 'scrollWidth', { configurable: true, value: scrollWidth });
  Object.defineProperty(element, 'clientWidth', { configurable: true, value: clientWidth });
}

describe('ToolbarCompoundLabel', () => {
  test('shows both fields when the secondary field is shown', () => {
    render(<ToolbarCompoundLabel primary="GEN" secondary="1:1" fullText="Genesis 1:1" />);

    expect(screen.getByText('GEN')).toBeInTheDocument();
    expect(screen.getByText('1:1')).toBeInTheDocument();
  });

  test('drops the secondary field entirely at the narrowest step, keeping the primary', () => {
    render(
      <ToolbarCompoundLabel
        primary="GEN"
        secondary="1:1"
        showSecondary={false}
        fullText="Genesis 1:1"
      />,
    );

    expect(screen.getByText('GEN')).toBeInTheDocument();
    expect(screen.queryByText('1:1')).not.toBeInTheDocument();
  });

  test('renders the secondary field before the primary when asked', () => {
    render(
      <ToolbarCompoundLabel
        primary="(TP1)"
        secondary="Translation Project 1"
        secondaryFirst
        fullText="Translation Project 1 (TP1)"
      />,
    );

    expect(screen.getByText('Translation Project 1').parentElement?.textContent).toBe(
      'Translation Project 1(TP1)',
    );
  });

  test('renders the primary field first by default', () => {
    render(<ToolbarCompoundLabel primary="GEN" secondary="1:1" fullText="Genesis 1:1" />);

    expect(screen.getByText('GEN').parentElement?.textContent).toBe('GEN1:1');
  });

  test('lets only the secondary field shrink and clip', () => {
    render(<ToolbarCompoundLabel primary="GEN" secondary="1:1" fullText="Genesis 1:1" />);

    // The primary field must survive at any width; the secondary is the designated truncation
    // target, so it is the one allowed to shrink below its content width and clip.
    expect(screen.getByText('GEN').className).toMatch(/(?:^|\s)tw:shrink-0(?:\s|$)/);
    expect(screen.getByText('1:1').className).toMatch(/(?:^|\s)tw:truncate(?:\s|$)/);
    expect(screen.getByText('1:1').className).toMatch(/(?:^|\s)tw:min-w-0(?:\s|$)/);
  });

  test('shows no tooltip on hover while the full text already fits', async () => {
    render(<ToolbarCompoundLabel primary="GEN" secondary="1:1" fullText="Genesis 1:1" />);
    const secondary = screen.getByText('1:1');
    setClipping(secondary, { scrollWidth: 40, clientWidth: 40 });

    await userEvent.hover(secondary);

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  test('shows the full text on hover once the secondary field is clipped', async () => {
    render(<ToolbarCompoundLabel primary="GEN" secondary="1:1" fullText="Genesis 1:1" />);
    const secondary = screen.getByText('1:1');
    setClipping(secondary, { scrollWidth: 200, clientWidth: 40 });

    await userEvent.hover(secondary);

    expect(await screen.findByRole('tooltip')).toHaveTextContent('Genesis 1:1');
  });

  test('always shows the full text on hover once the secondary field is dropped', async () => {
    render(
      <ToolbarCompoundLabel
        primary="GEN"
        secondary="1:1"
        showSecondary={false}
        fullText="Genesis 1:1"
      />,
    );

    // Nothing is measurably clipped here — the field is simply gone — so clip detection cannot
    // drive this case. The label is incomplete by construction, so the tooltip is unconditional.
    await userEvent.hover(screen.getByText('GEN'));

    expect(await screen.findByRole('tooltip')).toHaveTextContent('Genesis 1:1');
  });

  test('closes the tooltip when the label is pressed, so it cannot sit on top of the popover it opens', async () => {
    render(
      <ToolbarCompoundLabel
        primary="GEN"
        secondary="1:1"
        showSecondary={false}
        fullText="Genesis 1:1"
      />,
    );
    const primary = screen.getByText('GEN');

    await userEvent.hover(primary);
    expect(await screen.findByRole('tooltip')).toBeInTheDocument();

    await userEvent.click(primary);

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});
