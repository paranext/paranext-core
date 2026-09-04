// @vitest-environment jsdom
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { SHRINK_STEP, ShrinkStepOverride } from 'platform-bible-react';
import { beforeAll, describe, expect, it } from 'vitest';
import { ParagraphStyleLabel } from './paragraph-style-label.component';

// jsdom doesn't ship ResizeObserver. Radix's Popper positioning, which the tooltip inside
// ToolbarCompoundLabel uses, instantiates one on mount. Same stub as
// toolbar-compound-label.component.test.tsx.
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

describe('ParagraphStyleLabel', () => {
  it('shows the marker and the style name at full width', () => {
    render(<ParagraphStyleLabel blockMarker="p" styleName="Paragraph" />);

    expect(screen.getByText('p')).toBeInTheDocument();
    expect(screen.getByText('Paragraph')).toBeInTheDocument();
  });

  it('sizes the marker to its own content rather than reserving a fixed slot', () => {
    // A fixed-width slot pads a short marker out to the slot's width, leaving blank characters
    // between it and the separator. Jsdom reports every layout metric as 0, so the rendered width
    // cannot be measured here — the narrowest honest proxy is that the marker carries no fixed
    // width class at all.
    render(<ParagraphStyleLabel blockMarker="p" styleName="Paragraph" />);

    expect(screen.getByText('p').className).not.toMatch(/w-\[\d+ch\]/);
  });

  it('drops the style name at the narrowest step, leaving the marker alone', () => {
    render(
      <ShrinkStepOverride value={SHRINK_STEP.MINIMUM}>
        <ParagraphStyleLabel blockMarker="toc1" styleName="Table of Contents 1" />
      </ShrinkStepOverride>,
    );

    expect(screen.getByText('toc1')).toBeInTheDocument();
    expect(screen.queryByText('Table of Contents 1')).not.toBeInTheDocument();
    // The separator is only ever rendered between two visible fields, so a dropped style name must
    // not leave a dangling ` - ` hanging off the marker.
    expect(screen.getByText('toc1').closest('span')?.textContent).toBe('toc1');
  });

  it('renders the marker alone when no style name has resolved yet', () => {
    // The localized strings arrive asynchronously, so the name is undefined on first paint. Without
    // this the trigger would show a marker, a separator, and nothing after it.
    const { container } = render(<ParagraphStyleLabel blockMarker="p" styleName={undefined} />);

    expect(container.textContent).toBe('p');
  });

  it('offers the full label in a tooltip once the style name has been dropped', async () => {
    const user = userEvent.setup();
    render(
      <ShrinkStepOverride value={SHRINK_STEP.MINIMUM}>
        <ParagraphStyleLabel blockMarker="p" styleName="Paragraph" />
      </ShrinkStepOverride>,
    );

    await user.hover(screen.getByText('p'));

    // The marker alone does not say what the block is, so the name it no longer shows has to stay
    // reachable.
    await waitFor(() => {
      expect(screen.getAllByText('p - Paragraph').length).toBeGreaterThan(0);
    });
  });

  it('does not claim to be abbreviated when it is showing everything', async () => {
    const user = userEvent.setup();
    render(<ParagraphStyleLabel blockMarker="p" styleName="Paragraph" />);

    await user.hover(screen.getByText('p'));

    // A label rendering its full text needs no tooltip repeating it back. Nothing is clipped in
    // jsdom, where every metric reads 0, so any tooltip here would come from an `isPartial` the
    // component should not be setting.
    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });
});
