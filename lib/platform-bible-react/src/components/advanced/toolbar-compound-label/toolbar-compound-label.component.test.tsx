// @vitest-environment jsdom
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { beforeAll, beforeEach, describe, expect, test } from 'vitest';
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
  beforeEach(() => {
    // The component tracks input modality document-wide and deliberately lets it persist, which is
    // right in an app and order-dependent in a file of tests: one test's click would otherwise
    // decide whether the next test's focus reveals anything. Reset to keyboard before each.
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
  });

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
      'Translation Project 1 (TP1)',
    );
  });

  test('renders the primary field first by default', () => {
    render(<ToolbarCompoundLabel primary="GEN" secondary="1:1" fullText="Genesis 1:1" />);

    expect(screen.getByText('GEN').parentElement?.textContent).toBe('GEN 1:1');
  });

  test('keeps the separator in textContent, so callers that read the label as text still see one reference', () => {
    // A CSS `gap` would space the fields visually and leave `textContent` reading `GEN1:1`. Several
    // Playwright suites assert on this element's text (`toContainText('Mark 4:2')`), and a screen
    // reader would run the two fields together the same way.
    render(<ToolbarCompoundLabel primary="GEN" secondary="1:1" fullText="Genesis 1:1" />);

    expect(screen.getByText('GEN').parentElement).toHaveTextContent('GEN 1:1');
  });

  test('uses a caller-supplied separator, so a label that reads `p - Paragraph` keeps its dash', () => {
    render(
      <ToolbarCompoundLabel
        primary="p"
        secondary="Paragraph"
        separator=" - "
        fullText="p - Paragraph"
      />,
    );

    expect(screen.getByText('p').parentElement?.textContent).toBe('p - Paragraph');
  });

  test('shows the full text on hover when the primary field is an abbreviation, even though nothing is clipped', async () => {
    // `GEN` for `Genesis` is a substitution, not an overflow, so clip detection cannot see it and
    // the full book name would otherwise be unreachable.
    render(<ToolbarCompoundLabel primary="GEN" secondary="1:1" isPartial fullText="Genesis 1:1" />);
    const secondary = screen.getByText('1:1');
    setClipping(secondary, { scrollWidth: 40, clientWidth: 40 });

    await userEvent.hover(secondary);

    expect(await screen.findByRole('tooltip')).toHaveTextContent('Genesis 1:1');
  });

  test('lets the primary field keep an ellipsis rather than being cut mid-glyph', () => {
    // The trigger around this label is `overflow-hidden` with no ellipsis of its own, so a long
    // localized book name has to truncate here or it is sliced through a character.
    render(<ToolbarCompoundLabel primary="1 Chronicles" secondary="29:30" fullText="x" />);

    expect(screen.getByText('1 Chronicles').className).toMatch(/(?:^|\s)tw:truncate(?:\s|$)/);
  });

  test('weights the secondary field to absorb the shrinking, so the primary clips only as a last resort', () => {
    render(<ToolbarCompoundLabel primary="GEN" secondary="1:1" fullText="Genesis 1:1" />);

    // Both can shrink — the primary needs to, or a long book name is cut mid-glyph by the
    // trigger's overflow-hidden — but the secondary's far larger shrink factor means it clips to
    // nothing before the primary loses a character.
    expect(screen.getByText('1:1').className).toMatch(/(?:^|\s)tw:shrink-\[9999\](?:\s|$)/);
    expect(screen.getByText('GEN').className).toMatch(/(?:^|\s)tw:shrink(?:\s|$)/);
    ['GEN', '1:1'].forEach((text) => {
      expect(screen.getByText(text).className).toMatch(/(?:^|\s)tw:truncate(?:\s|$)/);
      expect(screen.getByText(text).className).toMatch(/(?:^|\s)tw:min-w-0(?:\s|$)/);
    });
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

  test('centres the two fields rather than baseline-aligning them', () => {
    // A field whose content is an `inline-block` with `overflow: hidden` — the paragraph label's
    // fixed marker slot — reports its bottom margin edge as its baseline, so `items-baseline` hangs
    // it off the wrong edge and it sits high next to its style name by a font-dependent amount.
    render(<ToolbarCompoundLabel primary="p" secondary="Paragraph" fullText="p - Paragraph" />);

    const row = screen.getByText('p').parentElement;

    expect(row?.className).toMatch(/(?:^|\s)tw:items-center(?:\s|$)/);
    expect(row?.className).not.toMatch(/(?:^|\s)tw:items-baseline(?:\s|$)/);
  });

  test('reveals the full text when the button around the label takes keyboard focus', async () => {
    // The label is a span inside the trigger, so focus lands on the button and a React `onFocus`
    // here would never fire. Without a listener on that ancestor, the shortened text is reachable
    // by mouse only — a keyboard user tabbing to `GEN` has no way to learn it means `Genesis`.
    render(
      <button type="button">
        <ToolbarCompoundLabel
          primary="GEN"
          secondary="1:1"
          showSecondary={false}
          fullText="Genesis 1:1"
        />
      </button>,
    );

    screen.getByRole('button').focus();

    expect(await screen.findByRole('tooltip')).toHaveTextContent('Genesis 1:1');
  });

  test('hides the revealed text again when focus leaves', async () => {
    render(
      <button type="button">
        <ToolbarCompoundLabel
          primary="GEN"
          secondary="1:1"
          showSecondary={false}
          fullText="Genesis 1:1"
        />
      </button>,
    );
    const button = screen.getByRole('button');

    button.focus();
    expect(await screen.findByRole('tooltip')).toBeInTheDocument();
    button.blur();

    // The close comes from a native blur listener rather than a React handler, so the state update
    // lands outside the synchronous act() window.
    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });

  test('shows nothing on focus while the label already reads in full', () => {
    // Focus must not manufacture a tooltip for a label that is not hiding anything, or every
    // toolbar control would pop one on tab-through.
    render(
      <button type="button">
        <ToolbarCompoundLabel primary="GEN" secondary="1:1" fullText="Genesis 1:1" />
      </button>,
    );
    setClipping(screen.getByText('1:1'), { scrollWidth: 40, clientWidth: 40 });

    screen.getByRole('button').focus();

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
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

  test('stays closed when a dismissed popover hands focus back, rather than only when focus is genuine', async () => {
    // Radix refocuses its trigger on close (`onCloseAutoFocus` / `onUnmountAutoFocus`), so a
    // pointer user who picks a menu item gets a real `focus` event they never asked for. Revealing
    // there puts a tooltip over the toolbar with the pointer already elsewhere, and none of the
    // pointer-leave handlers can close it.
    render(
      <button type="button">
        <ToolbarCompoundLabel
          primary="GEN"
          secondary="1:1"
          showSecondary={false}
          fullText="Genesis 1:1"
        />
      </button>,
    );
    const button = screen.getByRole('button');

    // jsdom ships no `PointerEvent` constructor; the tracker only reads the event's type.
    document.dispatchEvent(new Event('pointerdown', { bubbles: true }));
    button.focus();

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  test('shows the full text on hover once the primary field is clipped, not only the secondary', async () => {
    // The secondary is weighted to give way first, so by the time the primary is clipping there is
    // nothing left to sacrifice — which is exactly when the full text is most worth offering. A
    // watcher on the secondary alone stays silent through that, because the secondary collapsed to
    // zero width long before and reports no overflow.
    render(
      <ToolbarCompoundLabel
        primary="Song of Solomon"
        secondary="1:1"
        fullText="Song of Solomon 1:1"
      />,
    );
    setClipping(screen.getByText('Song of Solomon'), { scrollWidth: 200, clientWidth: 60 });
    setClipping(screen.getByText('1:1'), { scrollWidth: 0, clientWidth: 0 });

    await userEvent.hover(screen.getByText('Song of Solomon'));

    expect(await screen.findByRole('tooltip')).toHaveTextContent('Song of Solomon 1:1');
  });

  test('drops a tooltip that is no longer telling the user anything once the label grows back to full', async () => {
    // The open state is latched at hover time. Widening re-renders the label in full underneath a
    // pointer that never moved, and without a reset the tooltip keeps sitting there repeating text
    // that is now fully on screen.
    const { rerender } = render(
      <ToolbarCompoundLabel
        primary="GEN"
        secondary="1:1"
        showSecondary={false}
        fullText="Genesis 1:1"
      />,
    );

    await userEvent.hover(screen.getByText('GEN'));
    expect(await screen.findByRole('tooltip')).toBeInTheDocument();

    rerender(<ToolbarCompoundLabel primary="Genesis" secondary="1:1" fullText="Genesis 1:1" />);

    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });

  test('routes a Radix-decided close back through its own state, so the tooltip is dismissable', async () => {
    // A controlled `<Tooltip open>` with no `onOpenChange` cannot be closed by Radix at all: its
    // Escape handler runs, calls the setter Radix owns, and nothing happens — while its dismissable
    // layer has already called preventDefault on that keypress, eating it from whatever is below.
    render(
      <button type="button">
        <ToolbarCompoundLabel
          primary="GEN"
          secondary="1:1"
          showSecondary={false}
          fullText="Genesis 1:1"
        />
      </button>,
    );

    await userEvent.hover(screen.getByText('GEN'));
    expect(await screen.findByRole('tooltip')).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');

    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });
});
